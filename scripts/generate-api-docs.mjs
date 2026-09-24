/**
 * Generates the API reference of the showcase from the library source.
 *
 * It reads every symbol that `lib/src/public-api.ts` exports and writes one JSON file:
 * - components and directives: selector, and the inputs, models and outputs (signal based or decorated),
 *   including the ones inherited from a base class
 * - interfaces: every property, with the reactive option types marked
 * - type aliases: the type
 * - enums: the members with their values
 *
 * Descriptions come from the JSDoc in the source. The showcase renders the file in the API tab.
 *
 * It also writes `llms.txt` (an index for AI agents, see https://llmstxt.org) and `llms-full.txt` (`lib/AGENTS.md`
 * followed by the API reference in Markdown). The showcase serves both at its root.
 *
 * Usage: node scripts/generate-api-docs.mjs
 */
import ts from 'typescript';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = resolve(root, 'lib/src/public-api.ts');
const tsconfig = resolve(root, 'lib/tsconfig.lib.json');
const outFile = resolve(root, 'src/assets/api/api.json');
const llmsFile = resolve(root, 'src/assets/api/llms.txt');
const llmsFullFile = resolve(root, 'src/assets/api/llms-full.txt');
const agentsGuide = resolve(root, 'lib/AGENTS.md');
/** The deployed showcase, see `baseHref` in `angular.json` */
const siteUrl = 'https://lab900.github.io/angular-library-forms/';

/** The functions that declare a member, and the kind of member they declare */
const SIGNAL_FUNCTIONS = { input: 'input', model: 'model', output: 'output', outputFromObservable: 'output' };
const SIGNAL_TYPES = /^(?:InputSignal|InputSignalWithTransform|ModelSignal|OutputEmitterRef|OutputRef)<(.*)>$/s;

/** Which fields accept more than a plain value, see `ReactiveOption` in `lib/src/lib/models/form-field-base.ts` */
const REACTIVE_TYPES = [{ pattern: /\bReactive(?:Boolean|String|Number)?Option\b/, reactive: 'signal' }];

const config = ts.getParsedCommandLineOfConfigFile(
  tsconfig,
  {},
  { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => {} }
);
if (!config) {
  throw new Error(`Cannot read ${tsconfig}`);
}
const program = ts.createProgram([entry], { ...config.options, noEmit: true });
const checker = program.getTypeChecker();
const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(entry));

const exports = checker.getExportsOfModule(moduleSymbol);
/** Type aliases that are not in this set are private to the library, and are written out in the types */
const exportedNames = new Set(exports.map(e => e.name));

const symbols = {};
for (const exported of exports) {
  const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
  const declaration = symbol.declarations?.[0];
  if (!declaration) {
    continue;
  }
  const doc = describeDeclaration(declaration, symbol);
  if (doc) {
    symbols[exported.name] = doc;
  }
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify({ symbols }, null, 2) + '\n');
console.log(`API docs: ${Object.keys(symbols).length} symbols written to ${relative(root, outFile)}`);

writeFileSync(llmsFile, llmsIndex());
writeFileSync(llmsFullFile, readFileSync(agentsGuide, 'utf8').trimEnd() + '\n\n' + apiMarkdown(symbols));
console.log(`LLM docs: ${relative(root, llmsFile)} and ${relative(root, llmsFullFile)}`);

/** The llms.txt index: a title, a summary and links to the Markdown docs */
function llmsIndex() {
  return `# @lab900/forms

> Schema driven reactive forms for Angular 22+, built on Angular Material. You describe the form as a
> \`Lab900FormConfig\` of typed fields and \`<lab900-form>\` builds the \`FormGroup\` and renders every field.

Fields are config objects from the \`Lab900FormField\` union, picked by their \`editType\`. Titles, placeholders
and most options are reactive: a value, a function of the form value, or a signal. Labels are
\`@ngx-translate/core\` translation keys. Import every symbol from \`@lab900/forms\`.

## Docs

- [Instructions for AI agents](${siteUrl}guides/AGENTS.md): setup, rules, every edit type with examples, common mistakes
- [Getting started](${siteUrl}guides/getting-started.md): installation and theming
- [Creating forms](${siteUrl}guides/creating-forms.md): the schema, nesting, conditions and validation
- [Changelog](${siteUrl}CHANGELOG.md): changes per version, breaking changes included

## Optional

- [Full reference](${siteUrl}llms-full.txt): the agent instructions plus the inputs, outputs and config fields of every public symbol
`;
}

/** The API reference as Markdown, one section per kind of symbol */
function apiMarkdown(symbols) {
  const kinds = [
    { kind: 'component', title: 'Components' },
    { kind: 'directive', title: 'Directives' },
    { kind: 'interface', title: 'Interfaces' },
    { kind: 'type', title: 'Types' },
    { kind: 'enum', title: 'Enums' },
  ];
  const all = Object.values(symbols).sort((a, b) => a.name.localeCompare(b.name));
  const sections = kinds
    .map(({ kind, title }) => {
      const docs = all.filter(s => s.kind === kind).map(symbolMarkdown);
      return docs.length ? `## ${title}\n\n${docs.join('\n\n')}` : undefined;
    })
    .filter(Boolean);
  return `# API reference\n\nGenerated from the source of \`@lab900/forms\`.\n\n${sections.join('\n\n')}\n`;
}

function symbolMarkdown(symbol) {
  const lines = [`### ${symbol.name}${symbol.typeParameters ? `<${symbol.typeParameters}>` : ''}`];
  if (symbol.selector) {
    lines.push(`Selector: \`${symbol.selector}\``);
  }
  if (symbol.extends) {
    lines.push(`Extends: ${symbol.extends.map(e => `\`${e}\``).join(', ')}`);
  }
  if (symbol.deprecated) {
    lines.push(`Deprecated${symbol.deprecated === true ? '' : `: ${symbol.deprecated}`}`);
  }
  if (symbol.description) {
    lines.push(symbol.description);
  }
  if (symbol.type) {
    lines.push('```ts\n' + `${symbol.kind === 'enum' ? 'enum' : 'type'} ${symbol.name} = ${symbol.type}` + '\n```');
  }
  if (symbol.members?.length) {
    lines.push(symbol.members.map(memberMarkdown).join('\n'));
  }
  return lines.join('\n\n');
}

function memberMarkdown(member) {
  const flags = [
    member.kind,
    member.required && 'required',
    member.reactive && `accepts a ${member.reactive}`,
    member.default && `default \`${member.default}\``,
    member.inheritedFrom && `from ${member.inheritedFrom}`,
    member.deprecated && 'deprecated',
  ].filter(Boolean);
  const name = `\`${member.name}${member.optional ? '?' : ''}\``;
  const meta = flags.length ? ` (${flags.join(', ')})` : '';
  const description = member.description ? ` — ${member.description.replace(/\s*\n\s*/g, ' ')}` : '';
  return `- ${name}${meta}: \`${member.type}\`${description}`;
}

function describeDeclaration(declaration, symbol) {
  if (ts.isClassDeclaration(declaration)) {
    return describeClass(declaration, symbol);
  }
  if (ts.isInterfaceDeclaration(declaration)) {
    return {
      ...base('interface', declaration, symbol),
      extends: heritage(declaration),
      members: declaration.members.filter(m => m.name).map(describeInterfaceMember),
    };
  }
  if (ts.isTypeAliasDeclaration(declaration)) {
    return { ...base('type', declaration, symbol), type: text(declaration.type) };
  }
  if (ts.isEnumDeclaration(declaration)) {
    return { ...base('enum', declaration, symbol), type: `{ ${declaration.members.map(m => text(m)).join(', ')} }` };
  }
  return undefined;
}

function describeClass(declaration, symbol) {
  const decorator = findDecorator(declaration, ['Component', 'Directive']);
  if (!decorator) {
    return undefined;
  }
  const metadata = decorator.expression.arguments[0];
  const selector = metadata && ts.isObjectLiteralExpression(metadata) ? readProperty(metadata, 'selector') : undefined;
  return {
    ...base(decorator.expression.expression.getText() === 'Component' ? 'component' : 'directive', declaration, symbol),
    selector: selector && ts.isStringLiteralLike(selector) ? selector.text : undefined,
    abstract: declaration.modifiers?.some(m => m.kind === ts.SyntaxKind.AbstractKeyword) || undefined,
    extends: heritage(declaration),
    members: classMembers(declaration),
  };
}

/** The inputs, models and outputs of a class and its base classes. A member of the class wins over an inherited one. */
function classMembers(declaration, inheritedFrom) {
  const members = new Map();
  for (const member of declaration.members) {
    const doc = describeClassMember(member);
    if (doc && !members.has(doc.name)) {
      members.set(doc.name, inheritedFrom ? { ...doc, inheritedFrom } : doc);
    }
  }
  const baseClass = declaration.heritageClauses?.find(h => h.token === ts.SyntaxKind.ExtendsKeyword)?.types[0];
  const baseDeclaration = baseClass && checker.getTypeAtLocation(baseClass.expression).symbol?.declarations?.[0];
  if (baseDeclaration && ts.isClassDeclaration(baseDeclaration)) {
    for (const doc of classMembers(baseDeclaration, baseDeclaration.name?.text)) {
      if (!members.has(doc.name)) {
        members.set(doc.name, doc);
      }
    }
  }
  return [...members.values()];
}

function describeClassMember(member) {
  if (!member.name || isNotPublic(member)) {
    return undefined;
  }
  const signal = readSignalFunction(member);
  if (signal) {
    return { ...signal, ...jsDoc(checker.getSymbolAtLocation(member.name)) };
  }
  const decorator = findDecorator(member, ['Input', 'Output']);
  if (!decorator) {
    return undefined;
  }
  const kind = decorator.expression.expression.getText() === 'Input' ? 'input' : 'output';
  const alias = decorator.expression.arguments[0];
  const typeNode = ts.isSetAccessor(member) ? member.parameters[0]?.type : member.type;
  return {
    name: alias && ts.isStringLiteralLike(alias) ? alias.text : member.name.getText(),
    kind,
    type: typeNode ? text(typeNode) : checker.typeToString(checker.getTypeAtLocation(member.name)),
    ...reactive(typeNode),
    ...jsDoc(checker.getSymbolAtLocation(member.name)),
  };
}

/** Reads `input()`, `input.required()`, `model()`, `model.required()`, `output()` and `outputFromObservable()` */
function readSignalFunction(member) {
  const call = ts.isPropertyDeclaration(member) ? member.initializer : undefined;
  if (!call || !ts.isCallExpression(call)) {
    return undefined;
  }
  const callee = call.expression;
  const required = ts.isPropertyAccessExpression(callee) && callee.name.text === 'required';
  const fn = (required ? callee.expression : callee).getText();
  const kind = Object.hasOwn(SIGNAL_FUNCTIONS, fn) ? SIGNAL_FUNCTIONS[fn] : undefined;
  if (!kind) {
    return undefined;
  }
  const typeNode = call.typeArguments?.[0];
  const optionsArg = fn === 'output' || required ? call.arguments[0] : call.arguments[1];
  const alias = optionsArg && ts.isObjectLiteralExpression(optionsArg) ? readProperty(optionsArg, 'alias') : undefined;
  const defaultValue = !required && kind !== 'output' ? call.arguments[0]?.getText() : undefined;
  return {
    name: alias && ts.isStringLiteralLike(alias) ? alias.text : member.name.getText(),
    kind,
    type: typeNode ? text(typeNode) : signalValueType(member),
    required: required || undefined,
    default: defaultValue && defaultValue !== 'undefined' ? defaultValue : undefined,
    ...reactive(typeNode),
  };
}

/** The value type of a signal without a type argument, `boolean` for `InputSignal<boolean>` */
function signalValueType(member) {
  const type = checker
    .typeToString(checker.getTypeAtLocation(member.name), member, ts.TypeFormatFlags.NoTruncation)
    // a type the file does not import comes out as `import("@angular/core").OutputRef<T>`
    .replace(/import\("[^"]*"\)\./g, '');
  return (
    type
      .match(SIGNAL_TYPES)?.[1]
      .split(/,(?![^<]*>)/)[0]
      .trim() ?? type
  );
}

function describeInterfaceMember(member) {
  let type;
  if (ts.isMethodSignature(member)) {
    const params = member.parameters.map(p => p.getText()).join(', ');
    type = `(${params}) => ${member.type ? text(member.type) : 'void'}`;
  } else {
    type = member.type ? text(member.type) : 'any';
  }
  return {
    name: member.name.getText(),
    type,
    optional: !!member.questionToken || undefined,
    ...reactive(member.type),
    ...jsDoc(checker.getSymbolAtLocation(member.name)),
  };
}

function base(kind, declaration, symbol) {
  const source = declaration.getSourceFile();
  const { line } = source.getLineAndCharacterOfPosition(declaration.getStart());
  return {
    name: symbol.name,
    kind,
    typeParameters: declaration.typeParameters?.map(p => p.getText()).join(', ') || undefined,
    source: `${relative(root, source.fileName)}#L${line + 1}`,
    ...jsDoc(symbol),
  };
}

function heritage(declaration) {
  const types = declaration.heritageClauses
    ?.filter(h => h.token === ts.SyntaxKind.ExtendsKeyword)
    .flatMap(h => h.types.map(t => text(t)));
  return types?.length ? types : undefined;
}

function jsDoc(symbol) {
  if (!symbol) {
    return {};
  }
  const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
  const tags = symbol.getJsDocTags(checker);
  const tag = name => tags.find(t => t.name.toLowerCase() === name);
  const tagText = t => (t ? ts.displayPartsToString(t.text).trim() : undefined);
  const deprecated = tag('deprecated');
  // only the keys with a value, so a missing @default does not hide the default value of a signal
  return Object.fromEntries(
    Object.entries({
      description,
      default: tagText(tag('default')),
      example: tagText(tag('example'))?.replace(/^:\s*/, ''),
      deprecated: deprecated ? tagText(deprecated) || true : undefined,
    }).filter(([, value]) => value)
  );
}

function reactive(typeNode) {
  if (!typeNode) {
    return {};
  }
  const typeText = typeNode.getText();
  const match = REACTIVE_TYPES.find(r => r.pattern.test(typeText));
  return match ? { reactive: match.reactive } : {};
}

function findDecorator(node, names) {
  return ts
    .getDecorators?.(node)
    ?.find(d => ts.isCallExpression(d.expression) && names.includes(d.expression.expression.getText()));
}

function readProperty(object, name) {
  return object.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText() === name)?.initializer;
}

function isNotPublic(member) {
  return (
    ts.isPrivateIdentifier(member.name) ||
    member.modifiers?.some(
      m =>
        m.kind === ts.SyntaxKind.PrivateKeyword ||
        m.kind === ts.SyntaxKind.ProtectedKeyword ||
        m.kind === ts.SyntaxKind.StaticKeyword
    )
  );
}

/** The source text of a node on one line, with the private type aliases written out */
function text(node) {
  const source = node.getText();
  const start = node.getStart();
  const replacements = [];
  const visit = child => {
    const expanded = ts.isTypeReferenceNode(child) ? expandPrivateAlias(child) : undefined;
    if (expanded) {
      replacements.push({ start: child.getStart() - start, end: child.getEnd() - start, text: expanded });
    } else {
      ts.forEachChild(child, visit);
    }
  };
  visit(node);
  let result = source;
  for (const r of replacements.sort((a, b) => b.start - a.start)) {
    result = result.slice(0, r.start) + r.text + result.slice(r.end);
  }
  return result.replace(/\s+/g, ' ').replace(/;\s*}/g, ' }').replace(/<\s+/g, '<').replace(/\s+>/g, '>').trim();
}

/** `propFunction<T>` becomes `(data: T) => string` when `propFunction` is a type alias that the library does not export */
function expandPrivateAlias(reference) {
  const symbol = checker.getSymbolAtLocation(reference.typeName);
  const declaration = symbol?.declarations?.[0];
  if (
    !declaration ||
    !ts.isTypeAliasDeclaration(declaration) ||
    exportedNames.has(symbol.name) ||
    declaration.getSourceFile().isDeclarationFile
  ) {
    return undefined;
  }
  const args = reference.typeArguments ?? [];
  const values = new Map(
    (declaration.typeParameters ?? []).map((param, i) => [
      param.name.text,
      args[i] ? text(args[i]) : param.default ? text(param.default) : 'unknown',
    ])
  );
  const body = text(declaration.type).replace(/\b[A-Za-z_$][\w$]*\b/g, name => values.get(name) ?? name);
  return /=>|\|/.test(body) ? `(${body})` : body;
}
