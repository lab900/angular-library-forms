# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

One Angular CLI workspace with two projects (see `angular.json`):

- **`forms`** — the published library, root `lib/`, built with ng-packagr, released as `@lab900/forms`.
- **`lab900-forms`** — the showcase application, root `src/`, deployed to GitHub Pages.

`tsconfig.json` maps `@lab900/forms` to `./lib/src/public-api.ts`. The showcase app consumes the library
**source**, not `dist/`. One `npm start` is enough: the dev server watches `lib/` too, and a change in a
library file rebuilds and reloads the showcase. You never need `dist/` to develop or to test.

Three places hold that source mapping. Change them together:

- `tsconfig.json` -> `paths` (the app build and the IDE).
- `tsconfig.spec.json` -> `paths` (type checking of the specs).
- `jest.config.js` -> `moduleNameMapper` (module resolution at test run time).

`src/styles.scss` uses `../lib/theming` for the same reason. `dist/@lab900/forms` is now only a release
artefact: `npm run build:forms:prod` produces it and CI publishes it.

## Commands

```bash
npm i
npm start                    # serve the showcase on http://localhost:4900, library source included

npm run build:forms:prod     # production library build (what CI publishes)
npm run lint                 # eslint over both projects (ts + html)
npm run prettier             # write formatting over the whole repo
npm test                     # plain jest on jest-preset-angular
```

There is no `ng test` target and no `@angular-builders/jest`. `npm test` runs the `jest` binary, so
`jest.config.js` is the whole test configuration and every jest flag works in either case form. Note that
jest 30 renamed the path flag to the plural `test-path-patterns`. Run one test file or one test:

```bash
npm test -- --testPathPatterns=select-field
npm test -- --testPathPatterns=form-container --testNamePattern="should patch values correctly"
```

Tests live next to the code in `lib/` and import by relative path. `jest.config.js` roots are `src/` and
`lib/`. `setup-jest.ts` calls `setupZoneTestEnv()`, the zone based Angular test environment. The zoneless
variant is `setupZonelessTestEnv()` from `jest-preset-angular/setup-env/zoneless`.

## Architecture

### The schema-to-form pipeline

A consumer passes a `Lab900FormConfig` to `<lab900-form>`; the library builds the reactive form and
renders every field dynamically. Nothing in the render path is a static template.

1. `Lab900Form` (`components/form-container/`, selector `lab900-form`) takes `schema` and `data` inputs.
2. `Lab900FormBuilderService.createFormGroup()` walks `schema.fields` and produces an
   `UntypedFormGroup`. It also derives validators from `options` (`minLength`, `max`, `pattern`,
   `requireMatch`, drag-n-drop file rules) on top of `field.validators`.
3. The template repeats `FormFieldDirective` (`[lab900FormField]`) over the fields.
4. `FormFieldMappingService.mapToComponent()` maps `field.editType` to a component class, read from the
   `LAB900_FORM_FIELD_TYPES` injection token. Unknown types fall back to `UnknownFieldComponent`.
5. The directive creates that component with `ViewContainerRef.createComponent()` and pushes every input
   with `setInput()` inside `effect()`s. A readonly field is swapped for `ReadonlyFieldComponent`, except
   for the edit types that render their own readonly state (Row, Column, FilePreview, ButtonToggle,
   SlideToggle, Button, Select).
6. Every field component extends `FormComponent` (`components/AbstractFormComponent.ts`).

### `FormComponent`, the base class

It owns the whole per-field contract, so field components stay small:

- `_schema()`, `_options()`, `_group()`, `_fieldControl()`, `label()`, `elementId()`, `placeholder`.
- `controlValue`, `controlValid`, `groupValue` — `rxResource` bridges from the control to signals.
- `errorMessage` — resolves `schema.errorMessages` first, then the built-in `forms.error.*` keys.
- State models `fieldIsReadonly`, `fieldIsHidden`, `fieldIsRequired`. Effects push those back onto the
  `AbstractControl`: readonly or hidden disables the control, required adds or removes
  `Validators.required`. Do not disable controls directly from a field component; set the model.

### Field state comes from three layers

- **Static / reactive options** — `options.hide`, `options.readonly`, `options.required`.
- **Conditions** — `schema.conditions: IFieldConditions[]`, implemented by `FieldConditions`
  (`models/IFieldConditions.ts`). Each condition subscribes to one or more `dependOn` controls and then
  flips visibility, disabled state, validators or select options. `externalFormId` resolves against the
  `externalForms` input of `<lab900-form>`, so a condition can depend on a control in another form.
- **The parent form** — `schema.readonly` makes the whole form readonly.

### Reactive options

`ReactiveOption<T>` is `T | ((groupValue) => T | Signal<T>) | Signal<T>`. Titles, placeholders, `hide`,
`required` and most option values accept all three forms. Resolve them with the
`computeReactive*Option()` helpers in `utils/helpers.ts`, or with the `computeReactive*Option(key)`
protected methods of `FormComponent` — never by reading the raw option.

### Layout and nesting

- `EditType.Row` and `EditType.Column` hold `nestedFields`. With an `attribute` they create a nested
  `FormGroup`; without one their children are flattened into the parent group.
- A dotted `attribute` (`a.b.c`) also creates the intermediate groups.
- `EditType.Repeater` creates an `UntypedFormArray` of groups; `patchValues()` grows and shrinks it and
  honours `options.minRows`.
- Layout uses a 12 column grid through `options.colspan`.

## Adding a new field type

Touch every one of these, in order:

1. `lib/src/lib/models/editType.ts` — add the `EditType` member.
2. `lib/src/lib/components/form-fields/<name>-field/<name>-field.model.ts` — an options interface
   extending `FormFieldBaseOptions` and a field interface extending `FormFieldBase` with
   `editType: EditType.X`.
3. `lib/src/lib/models/lab900-form-field.type.ts` — add the interface to the `Lab900FormField` union.
4. The component itself, extending `FormComponent<YourModel>`, standalone, `OnPush`.
5. `lib/src/lib/forms.providers.ts` — register the class in the `LAB900_FORM_FIELD_TYPES` value.
6. `lib/src/lib/services/form-field-mapping.service.ts` — read it from the token and add the `case`.
7. `lib/src/public-api.ts` — export the model, and the component if consumers need it.
8. New error message keys go in `lib/src/assets/i18n.ts` (en + nl) and in
   `FormComponent.getDefaultErrorMessage()`.
9. Add a showcase example (see below).

## Showcase app

- Examples live in `src/app/modules/showcase-forms/examples/<name>-example/`. The filename **must** match
  `*-example.component.*`: `angular.json` serves those files as raw assets so the example viewer can show
  the source.
- Register the example in `showcase-forms.routes.ts` (`ShowcaseRoute` + `ShowcaseExample`) and add the
  route to `showcase-forms.nav-items.ts`.
- Long-form docs are markdown in `src/guides/`, rendered through `markdown-page.component`.

## Conventions

- **Untyped reactive forms everywhere** (`UntypedFormGroup`, `UntypedFormControl`). Do not introduce
  typed forms in the field pipeline; the schema is dynamic.
- **Signals over getters.** The `schema`, `options`, `fieldControl` getters on `FormComponent` are
  deprecated compatibility shims; new code reads `_schema()`, `_options()`, `_fieldControl()`.
- **`OnPush` is the default.** Twenty components still use eager change detection; `eslint.config.js` lists
  them. Moving one to `OnPush` needs a browser check, and eight of them need a code change first because
  their template reads non-reactive state.
- Selectors use the `lab900` prefix: elements kebab-case, attributes camelCase (enforced by eslint).
- Prettier: 120 columns, single quotes, `arrowParens: avoid`, `bracketSameLine: true`.
  `@typescript-eslint/member-ordering` is enforced: static field, instance field, constructor, static
  method, instance method.
- `ng generate` keeps the classic `x.component.ts` naming through the `schematics` block in
  `angular.json`, and skips spec files for the app project.

## Release and publishing

- The library major version tracks the Angular major it is built on. See `README.md` for the full
  SemVer and pre-release rules.
- **`compilationMode: "partial"` in `lib/tsconfig.lib.json` must stay.** Without it ng-packagr falls back
  to full compilation, which bakes Angular private instructions into the output and breaks on the next
  Angular major. Releases up to 19.1.40 had this bug.
- Flow: update `CHANGELOG.md`, `cd lib && npm version <v>`, tag, push the tag. Cloud Build
  (`cloudbuild.yaml`, `cloudbuild-alpha.yaml`) lints, tests, builds and runs `npm stage publish`. A
  maintainer then approves the staged version with 2FA (`npm stage approve <id>`).
- `ANGULAR-UPGRADE-19.2-TO-22.1.md` records the v22 upgrade and an open follow-up list (change detection,
  known defects, declined migrations). Read section 5 before you touch those areas.
