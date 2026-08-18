# Angular upgrade 19.2 -> 22.1

Date: 2026-08-18
Branch: `chore/angular-upgrade-v22`
Route: 19.2 -> 20.3 -> 21.2 -> 22.1, in three `ng update` calls. No hop needed `--force`.

This file records the end state against the Angular 19.2 baseline. It does not record the intermediate
steps.

## 1. Final state

| Check                | Command                                     | Result                                                         |
| -------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| type check (app)     | `npx tsc -p tsconfig.app.json --noEmit`     | pass                                                           |
| type check (spec)    | `npx tsc -p tsconfig.spec.json --noEmit`    | pass                                                           |
| type check (library) | `npx tsc -p lib/tsconfig.lib.json --noEmit` | pass                                                           |
| build library (dev)  | `npx ng build forms`                        | pass — partial compilation mode, 0 warnings                    |
| build library (prod) | `npm run build:forms:prod`                  | pass                                                           |
| build application    | `npx ng build lab900-forms`                 | pass — 2 pre-existing lodash CommonJS warnings                 |
| tests                | `npm test`                                  | pass — 4 suites, 32 tests                                      |
| lint                 | `npm run lint`                              | pass — 0 errors, 9 warnings (8 tracked TODOs + 1 pre-existing) |
| serve application    | `npm start`                                 | pass — an edit in `lib/` rebuilds the showcase in ~1 s         |
| runtime behaviour    | manual click-through, all 16 routes         | pass — maintainer reported no issues                           |

The 9 lint warnings are the 8 components that keep `ChangeDetectionStrategy.Eager` (section 5.1) plus one
pre-existing unused `eslint-disable` in `form-container.component.ts:20`. The rule stays an **error**
everywhere else, so a new component cannot opt out in silence. `npm run lint` now runs in CI, which it
never did before.

## 2. Migrations done

### 2.1 Package changes

| Package                                                                                 | Before          | Now         |
| --------------------------------------------------------------------------------------- | --------------- | ----------- |
| all `@angular/*` (core, common, forms, router, material, cdk, cli, build, compiler-cli) | `^19.2.x`       | `^22.1.x`   |
| `typescript`                                                                            | `~5.5.4`        | `~6.0.3`    |
| `ng-packagr`                                                                            | `^19.2.0`       | `^22.1.1`   |
| `jest`                                                                                  | `^29.7.0`       | `^30.4.2`   |
| `jest-preset-angular`                                                                   | `^14.5.3`       | `^17.0.0`   |
| `@angular-builders/jest`                                                                | `^19.0.0`       | **removed** |
| `ng-mocks`                                                                              | `^14.13.3`      | `^14.17.1`  |
| `angular-eslint`                                                                        | `19.2.1`        | `22.1.0`    |
| `eslint`                                                                                | `^9.8.0`        | `^9.28.0`   |
| `@typescript-eslint/eslint-plugin` / `parser`                                           | `^8.26.0`       | `^8.58.0`   |
| `typescript-eslint` (meta package)                                                      | _absent_        | `^8.58.0`   |
| `@lab900/ui`                                                                            | `^19.0.0`       | `^22.0.4`   |
| `ngx-markdown`                                                                          | `^19.1.0`       | `^22.0.0`   |
| `ngx-mat-select-search`                                                                 | `^8.0.0`        | `^9.0.0`    |
| `@kolkov/angular-editor`                                                                | `^3.0.0-beta.2` | `^3.1.0`    |
| `@ngxmc/datetime-picker`                                                                | `~19.2.2`       | **removed** |
| `@ngx-mce/datetime-picker`                                                              | _absent_        | `~22.2.3`   |
| `@angular/animations`                                                                   | `^19.2.1`       | **removed** |
| `@angular/platform-browser-dynamic`                                                     | `dependencies`  | **removed** |

Both `package.json` files went from version `19.1.40` to `22.0.0`.

Three package facts that need naming:

- **`typescript-eslint` was undeclared.** `eslint.config.js` requires the meta package, but nothing
  declared it. It was only hoisted out of `angular-eslint`, pinned at 8.43.0, whose peer rejects
  TypeScript 6. Nothing failed until a fresh resolve. It is now a declared devDependency.
- **The date-time picker was replaced, not bumped.** `@ngxmc/datetime-picker` stops at Angular 20.
  `@ngx-mce/datetime-picker` is the maintained fork of the same upstream project, with 44 identical
  public exports.
- **`@angular/platform-browser-dynamic` and `@angular-devkit/build-angular` are gone.** Both were only
  non-optional peers of `@angular-builders/jest@22`; no source file imports either, and no
  `angular.json` target uses `@angular-devkit/build-angular`. Dropping the builder dropped both. See
  section 2.4.

### 2.2 Config changes

| File                    | Change                                                                                                                                                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tsconfig.json`         | `moduleResolution` `node` -> `bundler`; `lib` -> `es2022`; `fullTemplateTypeCheck` removed (gone in v22); `baseUrl` removed (deprecated in TS 6.0), so `paths` became workspace-relative. It now reads `./lib/src/public-api.ts`, see section 6          |
| `lib/tsconfig.lib.json` | **`compilationMode: "partial"` added.** `skipTemplateCodegen`, `strictMetadataEmit` and `enableResourceInlining` removed as proven no-ops                                                                                                                |
| all 4 tsconfigs         | the v22 `strictTemplates: false` opt-out removed. The explicit `true` was then removed as well, because it is the v22 default. The v22 `extendedDiagnostics` suppression block is gone                                                                   |
| `angular.json`          | test target: `polyfills` and `inlineStyleLanguage` replaced by `zoneless: false`, then the whole target removed in section 7; the dead `marked.min.js` script entry removed; a `schematics` block from the v20 migration keeps the old file-naming style |
| `jest.config.js`        | `testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env'` — the v17 preset no longer installs `jest-environment-jsdom`. `modulePaths: ['<rootDir>/dist']` later gave way to a `moduleNameMapper`, see section 6                               |
| `src/main.ts`           | `provideZoneChangeDetection()` added (v21 requires it for a zone app); `provideNgxMatNativeDate()`, `withXhr()` and `provideAnimations()` removed                                                                                                        |
| `eslint.config.js`      | one scoped `files:` override downgrades `prefer-on-push-component-change-detection` to `warn` for exactly the 8 named components                                                                                                                         |
| both cloudbuild files   | `--ignore-scripts` removed from the publish step; a `Lint Library` step added                                                                                                                                                                            |

`--ignore-scripts` was hiding ng-packagr's `prepublishOnly` guard, which exists to block a
fully-compiled publish. See section 4.1.

### 2.3 Code changes

| Area                         | Change                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rxResource`, 4 sites        | `request` -> `params`, `loader` -> `stream` in `AbstractFormComponent.ts` and `form-field.directive.ts`                                                                                                                                                                                                                                |
| deep imports, 2 sites        | `moduleResolution: bundler` honours the `exports` map. `NgxMaskConfig` now comes from `ngx-mask`; the picker's `date-selection-model` subpath is replaced by a local `PickerSelectionModel` interface                                                                                                                                  |
| date-time field              | `NgxMatDateAdapter` -> Material's `DateAdapter<unknown>`. New `date-time-field.formats.ts` provides `MAT_DATE_FORMATS` for this field alone, read through a getter so it follows `showSeconds` and the new `displayFormat` option                                                                                                      |
| `$safeNavigationMigration()` | all **63** wrappers in 29 files removed. 2 sites got an explicit value instead: `[accept]` uses `?? ''`, and `select-field`'s consumer callback uses `?? null` to keep its published contract                                                                                                                                          |
| `strictTemplates`            | **76** template type errors fixed with no `any`, no `$any()`, no `!` and no suppression. Patterns used: `?? null` where the target accepts null, `?? <neutral default>` where it does not, non-null function defaults, `@let` before `@if` so narrowing sticks, typed casts in the component, and typed host-listener wrappers         |
| dependency injection         | `ng generate @angular/core:inject` rewrote 10 files. `@Inject(MAT_DIALOG_DATA)` became `inject<DialogFormData<T>>(...)`                                                                                                                                                                                                                |
| change detection             | 12 of the 20 components moved to `OnPush`; 8 keep `Eager` with a `TODO(onpush)` naming their blocker                                                                                                                                                                                                                                   |
| form-field message animation | Material v21 removed the `matFormFieldAnimations` trigger and replaced it with a CSS keyframe animation. This library follows: `lib/src/lib/styles/_form-field-subscript.scss` holds the same keyframes, and `[@transitionMessages]` became `[class.lab900-subscript-enter]`. `@angular/animations` is therefore gone from the project |
| `_fieldAttribute()` bindings | unified on `?? ''`; the 3 pre-existing `!` assertions removed                                                                                                                                                                                                                                                                          |
| templates                    | `self-closing-tags-migration` codemod: 8 conversions in 7 files, all on Angular components / `ng-content` / `ng-container`                                                                                                                                                                                                             |

## 3. Bugs fixed

The `strictTemplates` work and the runtime pass found real defects. Most of them predate the upgrade.

| #   | Site                                            | Defect                                                                                                                                                                                                                 | Fix                                          |
| --- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 1   | `@lab900/ui@19.2.3`                             | `TypeError: (void 0) is not a function`, 3 times per page. It ships fully-compiled Angular 19 templates that call `ɵɵclassMapInterpolate1`, which v22 dropped. Nav items silently lost their `nav-item--depth-N` class | moved to `@lab900/ui@22.0.4`                 |
| 2   | `@lab900/forms` itself                          | published fully-compiled up to 19.1.40, so it would break on the next Angular major for the same reason                                                                                                                | `compilationMode: "partial"`, see 4.1        |
| 3   | `date-time-field`                               | the input printed `8/20/2026` and dropped the time. `MAT_NATIVE_DATE_FORMATS.display.dateInput` is date-only, unlike the picker's own removed format. The control value always kept the time, so no test saw it        | own `MAT_DATE_FORMATS` provider              |
| 4   | `button-toggle-field.component.html:22`         | `id="mat-button-toggle-{{ elementId }}"` interpolated the **function**, not its value                                                                                                                                  | `{{ elementId() }}`                          |
| 5   | `button-toggle-field.component.html:29`         | `<lab900-icon [icon]="value.icon">` rendered with `undefined` when a button option had no icon                                                                                                                         | guarded on `@let icon`                       |
| 6   | `autocomplete-multiple-field.component.html:20` | a bare `matAutocomplete` attribute sat beside the real `[matAutocomplete]="auto"` binding                                                                                                                              | redundant attribute removed                  |
| 7   | `auth-image.directive.ts:15`                    | `httpCallback` was typed `Observable<Blob>`, but the code converts `ArrayBuffer` and the showcase passes `responseType: 'arraybuffer'`                                                                                 | widened to `Observable<Blob \| ArrayBuffer>` |
| 8   | `mat-range-slider-field.component.ts:67`        | `formatValue(undefined)` rendered the literal string `"undefined"` into the input                                                                                                                                      | parameter widened, returns `''`              |
| 9   | `file-preview-field.component.html:8`           | `[accept]` bound a nullish value to a DOM `DOMString`, so the file filter was the literal text `"null"`                                                                                                                | `?? ''`                                      |
| 10  | `app.component.html:29`                         | `[mode]="sideNavMode$ \| async"` bound `null` before the first emission                                                                                                                                                | `?? 'side'`                                  |

## 4. Important, and possibly breaking

### 4.1 The published package is now partial-compiled

This is the most important change for consumers. Up to and including 19.1.40, `@lab900/forms` was
published in **full** compilation mode, which bakes Angular's private `ɵɵ` instruction calls into the
output. Such a package only runs on the Angular major it was built against.

Root cause: `angular.json` points ng-packagr at `lib/tsconfig.lib.json`, and `withTsConfig(...)` makes
ng-packagr treat that file as its **entire** config. Its own `tsconfig.ngc.json`, which sets
`compilationMode: "partial"`, is never read, and the Angular compiler defaults to full. The current
`ng generate library` template ships no `compilationMode` either, so any CLI library can fall into this.

From 22.0.0 the package ships `ɵɵngDeclare*` data, which the Angular linker recompiles at the consumer's
build. Nothing changes in how it is consumed — the Angular CLI runs the linker automatically. A consumer
that builds **without** the Angular CLI must make sure the linker babel plugin runs over `node_modules`.
**Nothing in this repo proves that path.** All 4 spec files compile the library from source, and since
section 6 the showcase app does too, so no check here ever runs the linker over the published bundle.
Only a real consumer app, or an install of the tarball, tests it.

**The lesson for the next upgrade:** for a package that ships compiled Angular templates, a satisfied peer
range proves nothing. `@lab900/ui@19` resolved cleanly under `^19.0.0` on Angular 22 and still crashed.
Only a browser check finds this. No type check, build or test does.

### 4.2 Breaking for consumers

| Change                   | Effect                                                                                                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Peer ranges              | `@angular/core`, `common`, `forms`, `material`: `">=19.0.0"` -> `">=22.0.0"`                                                                                                                                                     |
| `@lab900/ui`             | `">=19.0.1"` -> `">=22.0.4"`. 22.0.4 is the first partial-compiled release; 22.0.0 is full-compiled and would break on Angular 23, so the range excludes it                                                                      |
| The date-time picker     | the consumer must swap `@ngxmc/datetime-picker@~19.2.2` for `@ngx-mce/datetime-picker@~22.2.3`, and replace `provideNgxMatNativeDate()` with Material's `provideNativeDateAdapter()`. `src/guides/getting-started.md` is updated |
| `ngx-mat-select-search`  | `^8.0.0` -> `^9.0.0`                                                                                                                                                                                                             |
| `@kolkov/angular-editor` | `"3.0.0-beta.0"` -> `"3.1.0"`                                                                                                                                                                                                    |
| `@angular/animations`    | no longer needed. This **drops** a requirement, so it breaks nobody                                                                                                                                                              |

### 4.3 Behaviour changes a consumer sees

| Change                                         | Effect                                                                                                                                                                                                                                        |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 12 components are now `OnPush`                 | they repaint only on their own signals, inputs or template events. No build or test can prove this; the maintainer's click-through is the only evidence. If one ever updates late, make the state it reads reactive — do not put `Eager` back |
| `form-row`, `form-column`, `search-field`      | render nothing when their required group or options are missing, instead of rendering a broken field                                                                                                                                          |
| `button-toggle-field`                          | an option without an icon no longer renders an empty icon element                                                                                                                                                                             |
| `file-preview-field`                           | `accept` is `''` when unset, instead of the string `"null"`                                                                                                                                                                                   |
| `select-field` custom trigger callback         | still receives `null`, not `undefined`. Now explicit rather than left to a migration shim                                                                                                                                                     |
| `AuthImageDirective.httpCallback`              | widened to `Observable<Blob \| ArrayBuffer>`. Existing callbacks still fit                                                                                                                                                                    |
| `MatRangeSliderFieldComponent.formatValue`     | accepts `number \| undefined` and returns `''`                                                                                                                                                                                                |
| `AmountInputDirective`, `SearchInputDirective` | new `onInputEvent` / `onFocusEvent` / `onBlurEvent` / `onPasteEvent` host handlers. The existing public methods keep their signatures                                                                                                         |
| `FormFieldDateTimePickerOptions.displayFormat` | new and optional. Sets the format the date-time input prints                                                                                                                                                                                  |

### 4.4 Angular behaviour changes to watch in this repo

- **CDK overlays use the browser's native top layer from v21.** Select panels, autocompletes, tooltips
  and dialogs no longer obey page `z-index`. If anything paints behind an overlay, the escape hatch is
  `OVERLAY_DEFAULT_CONFIG` with `{usePopover: false}`. It was deliberately not set.
- **`paramsInheritanceStrategy` defaults to `"always"` in v22.** A child route now inherits parent route
  params.
- **A zone app needs `provideZoneChangeDetection()` from v21.** It is in `src/main.ts`.
- **The zone test environment is a choice this project now makes itself.** `setup-jest.ts` calls
  `setupZoneTestEnv()`. It replaces the removed builder option `zoneless: false`. See section 7.
- **Per-project jest coverage** was a `@angular-builders/jest@22` change. With plain `jest` the path is
  the jest default `<rootDir>/coverage`, which is the same directory here.
- **`baseUrl` is gone.** New code must use relative paths or a `paths` entry.
- **`ng serve` lets a `PORT` environment variable win over the flag** in v22.

## 5. Follow-ups

### 5.1 Change detection

- [ ] Make the state the 8 remaining `Eager` components read reactive, then flip them to `OnPush` and
      delete the scoped `eslint.config.js` override. `touched` and `valid` are plain getters over
      `AbstractControl`, and `markAllAsTouched()` is called from outside the field components. Derive both
      from `AbstractControl.events`, which emits `TouchedChangeEvent` and `StatusChangeEvent` in v22. That
      covers 7 of the 8: `button-toggle-field`, `slide-toggle-field`, `multi-lang-input-field`,
      `drag-n-drop-file-field`, `range-slider-field`, `search-field`, `form-dialog`.
- [ ] `mat-range-slider-field` is the 8th: `writeValue()` mutates the plain `value` field its template
      reads. Move `value` to a signal.
- [ ] The same work fixes a **pre-existing shipped bug**: `repeater-field` is already `OnPush` and reads
      `touched`, so its error message can fail to appear when a parent calls `markAllAsTouched()`.

### 5.2 Pre-existing defects, left untouched

- [ ] `AbstractFormComponent.ts` and `form-field.directive.ts` open their streams with
      `defer(() => of(params.getRawValue))`, which emits the **function** rather than calling it. Every
      other line calls `getRawValue()`. Only the property names were renamed for v20.
- [ ] lodash is bundled as CommonJS, which the app build warns about for both this library and
      `@lab900/ui`. Moving to `lodash-es` changes what consumers bundle.
- [ ] `prettier --check .` flags `icon-field.component.scss`. Only the files this upgrade edited were
      formatted. `CHANGELOG.md` was on this list too and is now clean.

### 5.3 Toolchain

- [ ] Check every CI step for a hardcoded `./coverage/` path. Per-project coverage moved to
      `<projectRoot>/coverage`.
- [x] ts-jest reported its own `isolatedModules` option as deprecated. `@angular-builders/jest` v22 passes
      that option to the transform, so the warning came from the builder, not from this project. The first
      fix had two parts: `tsconfig.json` sets `isolatedModules: true`, which is both the form ts-jest asks
      for and the Angular v22 default, and `jest.config.js` repeated the builder transform entry with
      `isolatedModules: false` to drop the deprecated option. **Section 7 then removed the builder itself**,
      which removes the warning at its source. The `jest.config.js` transform override is gone;
      `isolatedModules: true` in `tsconfig.json` stays, and `tsconfig.spec.json` still inherits it.
      The stricter TypeScript rule needs no code change: there is no `const enum` and no named type
      re-export. `tsc --noEmit` is clean over `tsconfig.spec.json`, `lib/tsconfig.lib.json` and
      `tsconfig.app.json`, and both builds, the lint and the 32 tests still pass.
- [x] Decide on the `angular.json` `schematics` block. It keeps the old `x.component.ts` naming for
      `ng generate`. Every existing file uses that style, so removing it makes new files inconsistent.

### 5.4 Optional migrations that were declined

All were enumerated from the installed v22 collections and dry-run. None is required by the upgrade.

- [x] `use-application-builder` — reports `No changes made`; the workspace already uses
      `@angular/build:application`.
- [ ] `signal-input-migration` (4 files, 3 inputs cannot migrate), `signal-queries-migration` (3 files,
      1 query cannot migrate) and `output-migration` (1 file). All three change the published API, all
      leave the code half-converted, and all touch the same base class as the `OnPush` follow-up above.

### 5.5 Release

- [x] Tag, publish and promote the `22.0.0` dist-tag. The maintainer does this; it was deliberately out
      of scope for this branch. `latest` on npm is still 19.1.40. The changelog entry is in
      `CHANGELOG.md` under `## 22.0.0`, and is repo-facing only — `lib/ng-package.json` does not copy it
      into `dist`.

## 6. The showcase app builds from library source

Done on this branch, after the upgrade itself. It changes nothing about the published package. It is
recorded here because it rewrites two rows of section 2.2 and voids one claim in section 4.1.

### 6.1 What it fixes

The showcase app used to import the **built** library from `dist/@lab900/forms`. That cost a second
terminal running `npm run watch:forms`, and it put a full ng-packagr cycle between every library edit and
the browser. Worse for this upgrade: `dist/` is a stale artefact by default, so a source change that broke
the app stayed invisible until someone rebuilt.

The app now compiles `lib/src` as part of its own build. One `npm start` serves everything, an edit in
`lib/` rebuilds in about a second, and `dist/` is only ever a release artefact.

### 6.2 The four sync points

`@lab900/forms` stays the import specifier everywhere, so no source file changed. Only the resolution
changed, and it is declared in four places. Change them together.

| File                 | Before                                 | After                                    |
| -------------------- | -------------------------------------- | ---------------------------------------- |
| `tsconfig.json`      | `paths` -> `./dist/@lab900/forms`      | `paths` -> `./lib/src/public-api.ts`     |
| `tsconfig.spec.json` | `paths` -> `./dist/@lab900/forms`      | `paths` -> `./lib/src/public-api.ts`     |
| `jest.config.js`     | `modulePaths: ['<rootDir>/dist']`      | `moduleNameMapper` for `^@lab900/forms$` |
| `src/styles.scss`    | `@use '../dist/@lab900/forms/theming'` | `@use '../lib/theming'`                  |

`jest.config.js` needs a `moduleNameMapper` rather than the tsconfig `paths` entry, because `paths` only
steers the type checker. Jest resolves modules itself. The default (non-ESM) `jest-preset-angular` preset
sets no `moduleNameMapper` of its own, so nothing is overridden.

Two scripts went with it:

- `watch:forms` — deleted. Nothing consumes `dist/` during development any more.
- `predeploy:showcase` — deleted. It ran `build:forms:prod` before `deploy:showcase`, only because the
  GitHub Pages build read `dist/`. `ng deploy` now builds the app straight from source. CI still calls
  `build:forms:prod` itself, in `cloudbuild.yaml` and `cloudbuild-alpha.yaml`, so publishing is untouched.

### 6.3 Two consequences to keep in mind

- **The library is now type checked twice, under two configs.** `tsconfig.lib.json` still governs the
  ng-packagr build, but the app build now compiles the same files under `tsconfig.app.json`. The two agree
  today, because both extend the root `tsconfig.json` and neither opts out of `strictTemplates`. Any
  future compiler option added to one and not the other splits them.
- **No check in this repo touches the published bundle any more.** See section 4.1. A partial-compilation
  regression, or a broken `public-api.ts` export list, would pass every command in section 1. Only
  `npm run build:forms:prod` plus an install of the tarball finds it.

### 6.4 Verified

Every command in section 1 was re-run with `dist/` deleted from disk. All pass, including the production
app build, which still reports the 2 known lodash CommonJS warnings — one of them now names
`lib/src/lib/components/form-container/form-container.component.ts` instead of the bundled file.

## 7. `ng test` replaced by plain `jest`

Done on this branch, after section 6. It changes nothing about the published package. It is recorded here
because it removes two rows of section 2.1, one row of section 2.2, and closes one follow-up in 5.3.

### 7.1 Why

Two deprecated packages were still installed, and both were installed for one reason only: they are
non-optional peers of `@angular-builders/jest@22`.

| Package                             | How it was declared                         |
| ----------------------------------- | ------------------------------------------- |
| `@angular/platform-browser-dynamic` | direct `devDependency` **and** builder peer |
| `@angular-devkit/build-angular`     | builder peer only, never declared here      |

No source file imports either one. No `angular.json` target uses `@angular-devkit/build-angular` — the app
builds with `@angular/build:application` and the library with `@angular/build:ng-packagr`. So the packages
could only go if the builder went, and the builder could only go if `jest` ran directly on
`jest-preset-angular@17`.

### 7.2 What the builder contributed, and where it went

The builder merged its own config under `jest.config.js`. Everything it added is now either in
`jest.config.js`, already in the preset, or dropped as not needed here.

| Builder contribution                                                     | Replacement                                                             |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `preset: 'jest-preset-angular'`                                          | unchanged in `jest.config.js`                                           |
| `setupFilesAfterEnv` -> its own `setup-zone.js`                          | `setup-jest.ts` now calls `setupZoneTestEnv()` itself                   |
| `transform` -> `ts-jest` with `tsconfig` and `stringifyContentPathRegex` | already the preset default, pointed at `<rootDir>/tsconfig.spec.json`   |
| `transform` -> `isolatedModules: true`                                   | dropped. See 7.3                                                        |
| `testMatch` -> `<projectRoot>/**/*.(spec\|test).[tj]s?(x)`               | the jest default, scoped by the existing `roots: ['src', 'lib']`        |
| `coverageDirectory` -> `<projectRoot>/coverage`                          | the jest default, `<rootDir>/coverage`. Same path: the app root is `""` |
| `moduleNameMapper` for `jpg\|jpeg\|png`                                  | dropped. No spec and no source file imports an image                    |
| `globalMocks` (`matchMedia`)                                             | was never enabled in `angular.json`                                     |
| `zoneless: false`                                                        | expressed by choosing `setupZoneTestEnv` over `setupZonelessTestEnv`    |

The `test` target is gone from `angular.json`; `npm test` and `npm run test:silent` call `jest` directly.
CI is untouched, because both cloudbuild files already call `npm run test:silent`.

### 7.3 The ts-jest `isolatedModules` override is no longer needed

Follow-up 5.3 added a `transform` override to `jest.config.js` to silence a ts-jest deprecation warning.
The deprecated option came from the builder, so removing the builder removes the warning at its source.
`jest.config.js` no longer declares a `transform` at all. `isolatedModules: true` stays in `tsconfig.json`,
which `tsconfig.spec.json` inherits, and that is the form ts-jest asks for. The fast transpile-only path is
unchanged.

### 7.4 One implicit dependency to know about

`jsdom` is a non-optional peer of `jest-preset-angular@17` and is not declared in `package.json`. npm
installs it automatically, and `jest.config.js` names the environment that needs it
(`jest-preset-angular/environments/jest-jsdom-env`). If a future install ever leaves it out, declare it as
a devDependency.

### 7.5 Verified

Every command in section 1 was re-run. 4 suites and 32 tests pass, in 4.3s against the 5.1s baseline. The
single-file and single-test filters work in both case forms. `tsc --noEmit -p tsconfig.spec.json` is clean.
`npm run lint` reports 0 errors and only the 9 known `OnPush` warnings. Both builds pass, the app build
still with the 2 known lodash CommonJS warnings.
