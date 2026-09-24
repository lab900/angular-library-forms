import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { NgTemplateOutlet } from '@angular/common';
import { ApiDocs, ApiMember, ApiSymbol, ShowcaseApiSection } from '../../models/showcase-api.model';

/** A piece of a type; `link` is set when the name is documented on the same page */
interface TypeToken {
  text: string;
  link?: string;
}

/** A piece of a description; text between backticks is code */
interface TextPart {
  text: string;
  code?: boolean;
}

interface MemberView {
  name: string;
  binding: string;
  typeTokens: TypeToken[];
  required: boolean;
  deprecated?: TextPart[];
  default?: string;
  reactiveHint?: string;
  description: TextPart[];
  example?: string;
  inheritedFrom?: string;
}

interface MemberGroup {
  title?: string;
  members: MemberView[];
}

interface SymbolView {
  name: string;
  /** The name split before each capital, for the page index */
  nameWords: string[];
  kind: string;
  anchor: string;
  /** Not set on inline options that also have their own entry on the page, to keep the ids unique */
  elementId?: string;
  sourceUrl: string;
  selector?: string;
  deprecated?: TextPart[];
  description: TextPart[];
  example?: string;
  extendsTokens: TypeToken[][];
  typeTokens: TypeToken[];
  groups: MemberGroup[];
  /** How the field looks in a `Lab900FormConfig` schema */
  usage?: string;
  /** The options interface of a field, shown inside the field */
  options?: SymbolView;
}

interface SectionView {
  title: string;
  anchor: string;
  description: TextPart[];
  symbols: SymbolView[];
}

const REPOSITORY = 'https://github.com/lab900/angular-library-forms';

const REACTIVE_HINTS: Record<NonNullable<ApiMember['reactive']>, string> = {
  signal: 'Also accepts a function of the data or a signal',
  function: 'Also accepts a function of the data',
};

const MEMBER_GROUPS: { kind: NonNullable<ApiMember['kind']>; title: string }[] = [
  { kind: 'input', title: 'Inputs' },
  { kind: 'model', title: 'Two-way bindings' },
  { kind: 'output', title: 'Outputs' },
];

/**
 * The API tab of a showcase page. It renders the symbols of the sections from `assets/api/api.json`,
 * which `npm run docs:api` generates from the library source.
 */
@Component({
  selector: 'lab900-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class ApiDocsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly symbolElements = viewChildren<ElementRef<HTMLElement>>('symbolElement');

  public readonly sections = input.required<ShowcaseApiSection[]>();

  protected readonly docs = httpResource<ApiDocs>(() => 'assets/api/api.json');
  protected readonly filter = signal('');
  /** The anchor of the symbol at the top of the viewport, highlighted in the page index */
  protected readonly activeAnchor = signal<string | undefined>(undefined);

  private readonly allSections = computed(() => {
    const symbols = this.docs.value()?.symbols;
    if (!symbols) {
      return undefined;
    }
    const views = this.sections().map(section => ({ section, names: section.symbols.filter(name => symbols[name]) }));
    // names that get an anchor, so types can link to them; the options of a field section are shown inline
    const topLevel = new Set(views.flatMap(v => v.names));
    const onPage = new Set(topLevel);
    for (const { names } of views.filter(v => v.section.fieldUsage)) {
      names.forEach(name => {
        const optionsName = optionsNameOf(symbols[name], symbols);
        if (optionsName) {
          onPage.add(optionsName);
        }
      });
    }
    const missing = this.sections()
      .flatMap(s => s.symbols)
      .filter(name => !symbols[name]);
    const sections: SectionView[] = views.map(({ section, names }) => ({
      title: section.title,
      anchor: anchorOf(`section-${section.title}`),
      description: formatText(section.description),
      symbols: names.map(name => toSymbolView(symbols[name], { symbols, onPage, topLevel }, section)),
    }));
    return { sections, missing };
  });

  protected readonly view = computed(() => {
    const all = this.allSections();
    const query = this.filter().trim().toLowerCase();
    if (!all || !query) {
      return all;
    }
    const sections = all.sections
      .map(section => ({
        ...section,
        symbols: section.symbols.map(s => filterSymbol(s, query)).filter((s): s is SymbolView => !!s),
      }))
      .filter(section => section.symbols.length);
    return { ...all, sections };
  });

  public constructor() {
    // highlight the symbol that is at the top of the viewport in the page index
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          this.activeAnchor.set(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );
    effect(() => {
      observer.disconnect();
      this.symbolElements().forEach(el => observer.observe(el.nativeElement));
    });
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  protected scrollTo(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected onFilter(event: Event): void {
    this.filter.set((event.target as HTMLInputElement).value);
  }
}

interface ViewContext {
  symbols: Record<string, ApiSymbol>;
  /** Names with an anchor on the page */
  onPage: Set<string>;
  /** Names with their own entry on the page */
  topLevel: Set<string>;
}

function toSymbolView(
  symbol: ApiSymbol,
  context: ViewContext,
  section?: ShowcaseApiSection,
  nested = false
): SymbolView {
  const { symbols, onPage } = context;
  const isClass = symbol.kind === 'component' || symbol.kind === 'directive';
  const fieldUsage = !!section?.fieldUsage;
  const optionsName = fieldUsage ? optionsNameOf(symbol, symbols) : undefined;
  const members = symbol.members ?? [];
  let groups: MemberGroup[];
  if (isClass) {
    groups = MEMBER_GROUPS.map(({ kind, title }) => ({
      title,
      members: members.filter(m => (m.kind ?? 'input') === kind).map(m => toMemberView(m, true, onPage)),
    })).filter(group => group.members.length);
  } else {
    groups = members.length ? [{ members: members.map(m => toMemberView(m, false, onPage)) }] : [];
  }
  return {
    name: symbol.name,
    nameWords: symbol.name.split(/(?=[A-Z][a-z])/),
    kind: `${symbol.abstract ? 'abstract ' : ''}${symbol.kind}`,
    anchor: anchorOf(symbol.name),
    elementId: nested && context.topLevel.has(symbol.name) ? undefined : anchorOf(symbol.name),
    sourceUrl: `${REPOSITORY}/blob/main/${symbol.source}`,
    selector: symbol.selector,
    deprecated: deprecatedText(symbol.deprecated),
    description: formatText(symbol.description),
    example: symbol.example,
    extendsTokens: (symbol.extends ?? []).map(type => tokenize(type, onPage)),
    typeTokens: symbol.type ? tokenize(symbol.type, onPage) : [],
    groups,
    usage: fieldUsage ? fieldSnippet(symbol, optionsName) : undefined,
    options: optionsName ? toSymbolView(symbols[optionsName], context, undefined, true) : undefined,
  };
}

function toMemberView(member: ApiMember, isClass: boolean, onPage: Set<string>): MemberView {
  return {
    name: member.name,
    binding: isClass ? bindingOf(member) : member.name,
    // an optional input takes undefined anyway, so the union only adds noise
    typeTokens: tokenize(isClass ? member.type.replace(/\s*\|\s*undefined\b/g, '') : member.type, onPage),
    // interface fields without `?` must be set, inputs say so themselves
    required: !!member.required || (!isClass && !member.optional),
    deprecated: deprecatedText(member.deprecated),
    default: member.default,
    reactiveHint: member.reactive ? REACTIVE_HINTS[member.reactive] : undefined,
    description: formatText(member.description),
    example: member.example,
    inheritedFrom: member.inheritedFrom,
  };
}

/** How the field looks in the `fields` of a `Lab900FormConfig`, with the enum member of its edit type */
function fieldSnippet(symbol: ApiSymbol, optionsName?: string): string {
  const editType = symbol.members?.find(m => m.name === 'editType')?.type;
  const lines = [`  attribute: 'myField',`, `  title: 'My field',`];
  if (editType) {
    lines.push(`  editType: ${editType},`);
  }
  if (optionsName) {
    lines.push(`  options: { ... }, // ${optionsName}`);
  }
  return `const field: ${symbol.name} = {\n${lines.join('\n')}\n};`;
}

/** Keeps the symbol when its name matches, otherwise only the members that match */
function filterSymbol(symbol: SymbolView, query: string): SymbolView | undefined {
  if (symbol.name.toLowerCase().includes(query)) {
    return symbol;
  }
  const groups = symbol.groups
    .map(group => ({ ...group, members: group.members.filter(m => m.name.toLowerCase().includes(query)) }))
    .filter(group => group.members.length);
  const options = symbol.options && filterSymbol(symbol.options, query);
  return groups.length || options ? { ...symbol, groups, options } : undefined;
}

/**
 * The options interface of a field. A field model declares it as the type of its `options` property, or
 * inherits it as a type argument of `FormFieldBase`, so look at both and take the first documented interface.
 */
function optionsNameOf(symbol: ApiSymbol, symbols: Record<string, ApiSymbol>): string | undefined {
  const candidates = [symbol.members?.find(m => m.name === 'options')?.type, ...(symbol.extends ?? [])];
  for (const candidate of candidates) {
    const name = candidate?.match(/\b([\w$]*Options)\b/)?.[1];
    if (name && symbols[name]?.kind === 'interface') {
      return name;
    }
  }
  return undefined;
}

function anchorOf(name: string): string {
  return `api-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

/** How the member is bound in a template */
function bindingOf(member: ApiMember): string {
  switch (member.kind) {
    case 'model':
      return `[(${member.name})]`;
    case 'output':
      return `(${member.name})`;
    default:
      return `[${member.name}]`;
  }
}

function deprecatedText(deprecated: string | true | undefined): TextPart[] | undefined {
  if (!deprecated) {
    return undefined;
  }
  return deprecated === true ? [] : formatText(deprecated);
}

/**
 * JSDoc wraps long sentences over several lines. Joins them into one paragraph and marks the code between backticks.
 */
function formatText(text: string | undefined): TextPart[] {
  if (!text) {
    return [];
  }
  return text
    .replace(/\s*\n\s*/g, ' ')
    .split(/`([^`]+)`/)
    .map((part, i) => (i % 2 ? { text: part, code: true } : { text: part }))
    .filter(part => part.text);
}

/** Splits a type into names and the text between them, and links the names that are documented on the page */
function tokenize(type: string, onPage: Set<string>): TypeToken[] {
  return type
    .split(/([A-Za-z_$][\w$]*)/)
    .filter(Boolean)
    .map(text => (onPage.has(text) ? { text, link: anchorOf(text) } : { text }));
}
