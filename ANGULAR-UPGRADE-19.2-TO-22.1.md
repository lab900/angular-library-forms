# Angular upgrade 19.2 -> 22.1

Date: 2026-08-17
Level: Advanced (l=3) — Angular Material enabled
Branch: chore/angular-upgrade-v22

## Final state

| Check | Command | Result | Measured at | Measured by |
| --- | --- | --- | --- | --- |
| type check (app) | `npx tsc -p tsconfig.app.json --noEmit` | not measured yet | — | — |
| type check (spec) | `npx tsc -p tsconfig.spec.json --noEmit` | not measured yet | — | — |
| build library (dev) | `npx ng build forms` | not measured yet | — | — |
| build library (prod) | `npm run build:forms:prod` | not measured yet | — | — |
| build application | `npm run build` | not measured yet | — | — |
| tests | `npm test` | not measured yet | — | — |
| lint | `npm run lint` | not measured yet | — | — |
| runtime behaviour | manual click-through | not verified — handed to the user | — | user |

Filled at step 4.9. Never carried over from an earlier run.

<!-- FINAL DEPENDENCY TABLE: filled at step 4.9 -->

## Decisions

| Item | Answer | Date | Reason |
| --- | --- | --- | --- |
| Route to Angular 22, blocked by `@ngxmc/datetime-picker` | Upgrade to v20 first, then replace the package with `@ngx-mce/datetime-picker`. Assess a drop-in first; if it is not a drop-in, document every needed change. | 2026-08-17 | User choice at the gate. `@ngxmc/datetime-picker` stopped at Angular 20, so the v21 and v22 hops need a maintained replacement. |

## Hop plan

| Hop | From | To | Angular release | Note |
| --- | --- | --- | --- | --- |
| 1 | 19.2 | 20.3 | 20.3.28 | `@ngxmc/datetime-picker` 19.2.2 -> 20.1.0 (breaking, see below) |
| — | — | — | — | Swap the picker: `@ngxmc/datetime-picker` -> `@ngx-mce/datetime-picker@21.3.3`. This unblocks hop 2. |
| 2 | 20.3 | 21.2 | 21.2.20 | needs the swap first |
| 3 | 21.2 | 22.1 | 22.1.2 | `@ngx-mce/datetime-picker@22.2.3` |

## Compatibility check

### Gate verdicts

| Target | Verdict | Blockers |
| --- | --- | --- |
| 22 | STOP | `@ngxmc/datetime-picker` (max Angular 20) |
| 21 | STOP | `@ngxmc/datetime-picker` (max Angular 20) |
| 20 | GO | none — 19 bumps, 0 deferred, 0 unverified |

After the picker swap the only blocker is gone, so 21 and 22 become reachable.

### Toolchain

| Item | Required | Current | Status |
| --- | --- | --- | --- |
| node | `^22.22.3 \|\| ^24.15.0 \|\| >=26.0.0` (at v22) | 24.15.0 | OK |
| typescript (at v20) | `>=5.8 <6.0` | 5.5.4 -> 5.9.3 | BUMP |
| typescript (at v21) | `>=5.9 <6.1` | 5.9.3 (kept) | OK |
| typescript (at v22) | `>=6.0 <6.1` | 5.9.3 -> 6.0.3 | BUMP |
| rxjs | `^6.5.3 \|\| ^7.4.0` | 7.8.2 | OK |
| zone.js | `~0.15.0 \|\| ~0.16.0` | 0.15.1 | OK |

### Package matrix (full path to v22)

| Package | Declared | Installed | v20 | v21 | v22 | Status |
| --- | --- | --- | --- | --- | --- | --- |
| @angular-builders/jest | ^19.0.0 | 19.0.1 | 20.0.0 | 21.0.4 | 22.0.1 | BUMP |
| @angular/animations | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @angular/build | ^19.2.1 | 19.2.15 | 20.3.34 | 21.2.21 | 22.1.4 | BUMP |
| @angular/cdk | ^19.2.2 | 19.2.19 | 20.2.14 | 21.2.14 | 22.1.2 | BUMP |
| @angular/cli | ^19.2.1 | 19.2.15 | 20.3.34 | 21.2.21 | 22.1.4 | BUMP |
| @angular/common | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @angular/compiler | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @angular/compiler-cli | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @angular/core | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @angular/forms | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @angular/material | ^19.2.2 | 19.2.19 | 20.2.14 | 21.2.14 | 22.1.2 | BUMP |
| @angular/platform-browser | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @angular/platform-browser-dynamic | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @angular/router | ^19.2.1 | 19.2.14 | 20.3.28 | 21.2.20 | 22.1.2 | BUMP |
| @eslint/js | ^9.8.0 | 9.35.0 | n/a | n/a | n/a | OK |
| @kolkov/angular-editor | ^3.0.0-beta.2 | 3.0.0-beta.2 | 3.1.0 | 3.1.0 | 3.1.0 | BUMP |
| @lab900/ui | ^19.0.0 | 19.2.3 | 19.2.3 | 19.2.3 | 19.2.3 | OK |
| @ngx-translate/core | ^16.0.4 | 16.0.4 | 16.0.4 | 16.0.4 | 16.0.4 | OK |
| @ngxmc/datetime-picker | ~19.2.2 | 19.2.2 | 20.1.0 | — | — | **BLOCKER — replaced** |
| @types/eslint__js | ^8.42.3 | 8.42.3 | n/a | n/a | n/a | OK |
| @types/jest | ^29.5.14 | 29.5.14 | n/a | n/a | n/a | OK |
| @types/lodash | ^4.17.7 | 4.17.20 | n/a | n/a | n/a | OK |
| @types/node | ^20.11.1 | 20.19.13 | n/a | n/a | n/a | OK |
| @typescript-eslint/eslint-plugin | ^8.26.0 | 8.43.0 | n/a | n/a | n/a | TS-BUMP (at v22) |
| @typescript-eslint/parser | ^8.26.0 | 8.43.0 | n/a | n/a | n/a | TS-BUMP (at v22) |
| angular-cli-ghpages | ^2.0.3 | 2.0.3 | n/a | n/a | n/a | OK |
| angular-eslint | 19.2.1 | 19.2.1 | 20.7.0 | 21.4.0 | 22.1.0 | BUMP |
| eslint | ^9.8.0 | 9.35.0 | n/a | n/a | n/a | OK |
| eslint-config-prettier | ^9.1.0 | 9.1.2 | n/a | n/a | n/a | OK |
| eslint-plugin-prettier | ^5.2.1 | 5.5.4 | n/a | n/a | n/a | OK |
| jest | ^29.7.0 | 29.7.0 | n/a | n/a | n/a | OK |
| jest-preset-angular | ^14.5.3 | 14.6.1 | 14.6.1 | 17.0.0 | 17.0.0 | BUMP (hop 2) |
| ng-mocks | ^14.13.3 | 14.13.5 | 14.13.5 | 14.17.1 | 14.17.1 | BUMP (hop 2) |
| ng-packagr | ^19.2.0 | 19.2.2 | 20.3.2 | 21.2.7 | 22.1.1 | BUMP |
| ngx-markdown | ^19.1.0 | 19.1.1 | 20.1.0 | 21.3.0 | 22.0.0 | BUMP |
| ngx-mask | ^19.0.7 | 19.0.7 | 19.0.7 | 19.0.7 | 19.0.7 | OK |
| ngx-mat-select-search | ^8.0.0 | 8.0.2 | 8.0.2 | 9.0.0 | 9.0.0 | BUMP (hop 2) |
| prettier | ^3.3.3 | 3.6.2 | n/a | n/a | n/a | OK |
| prettier-eslint | ^16.3.0 | 16.4.2 | n/a | n/a | n/a | OK |
| prismjs | ^1.30.0 | 1.30.0 | n/a | n/a | n/a | OK |
| rxjs | ~7.8.1 | 7.8.2 | n/a | n/a | n/a | OK |
| tslib | ^2.8.1 | 2.8.1 | n/a | n/a | n/a | OK |
| typescript | ~5.5.4 | 5.5.4 | 5.9.3 | 5.9.3 | 6.0.3 | BUMP |
| zone.js | ~0.15.0 | 0.15.1 | n/a | n/a | n/a | OK |

### Version bumps per hop (plan)

Hop 1 (19 bumps): every `@angular/*` to 20.3.28 (`cdk`/`material` to 20.2.14, `build`/`cli` to 20.3.34),
`@angular-builders/jest@20.0.0`, `@kolkov/angular-editor@3.1.0`, `@ngxmc/datetime-picker@20.1.0`,
`angular-eslint@20.7.0`, `ng-packagr@20.3.2`, `ngx-markdown@20.1.0`, `typescript@5.9.3`.

Hop 2: every `@angular/*` to 21.2.x, `@angular-builders/jest@21.0.4`, `angular-eslint@21.4.0`,
`ngx-markdown@21.3.0`, `jest-preset-angular@17.0.0`, `ng-mocks@14.17.1`, `ngx-mat-select-search@9.0.0`,
plus the picker swap.

Hop 3: every `@angular/*` to 22.1.x, `@angular-builders/jest@22.0.1`, `angular-eslint@22.1.0`,
`ngx-markdown@22.0.0`, `@typescript-eslint/*@8.58.0` (TypeScript 6.0 peer), `typescript@6.0.3`.

If the result differs from this plan, the final dependency table above is the truth.

### False positive from the gate

`check-compat.mjs --target 22` also reported `@angular/build`, `@angular/compiler-cli` and `ng-packagr`
as `TS-BLOCKER`. That verdict is wrong. The script judged only the **newest** release of each package,
which peers `typescript >=6.0 <6.1`. All three move in Angular lockstep, so each hop installs its own
matching version. Verified on the registry:

| Package | Version at hop | typescript peer | TypeScript that hop installs | Fits |
| --- | --- | --- | --- | --- |
| @angular/build | 20.3.34 | `>=5.8 <6.0` | 5.9.3 | yes |
| @angular/build | 21.2.21 | `>=5.9 <6.0` | 5.9.3 (kept) | yes |
| @angular/compiler-cli | 20.3.28 | `>=5.8 <6.0` | 5.9.3 | yes |
| ng-packagr | 20.3.2 | `>=5.8 <6.0` | 5.9.3 | yes |
| ng-packagr | 21.2.7 | `>=5.9 <6.0` | 5.9.3 (kept) | yes |

The two real TypeScript peer bumps stay: `@typescript-eslint/eslint-plugin` and
`@typescript-eslint/parser` must reach 8.58.0 at hop 3, because TypeScript 6.0.3 arrives there.

## Deferred packages

None.

## Unverified packages

None.

## The blocker and its replacement

### Why `@ngxmc/datetime-picker` blocks

| Fact | Value |
| --- | --- |
| Declared | `~19.2.2` |
| Installed | 19.2.2 |
| Last release | 20.1.0, published 2025-08-01 |
| Angular peer of 20.1.0 | `@angular/core@^20.0.0` |
| Highest Angular supported | 20 |

It is not a leaf dependency. It is a **published peer** of `@lab900/forms` (`lib/package.json`), so every
consumer of the library installs it.

### Usage sites

| File | Line | Use |
| --- | --- | --- |
| `lib/package.json` | 16 | peer range `~19.2.2` |
| `package.json` | 37 | dependency |
| `lib/src/lib/components/form-fields/date-time-field/date-time-field.component.ts` | 9-17 | 7 symbols from the main entry |
| `lib/src/lib/components/form-fields/date-time-field/date-time-field.component.ts` | 18, 71 | deep import `@ngxmc/datetime-picker/lib/date-selection-model` |
| `src/main.ts` | 14, 36 | `provideNgxMatNativeDate()` |
| `src/guides/getting-started.md` | 10, 21, 88 | install and setup docs |

### Drop-in assessment of `@ngx-mce/datetime-picker`

Method: unpacked the npm tarballs of `@ngxmc/datetime-picker@19.2.2` (installed),
`@ngxmc/datetime-picker@20.1.0` and `@ngx-mce/datetime-picker@21.3.3` / `@22.2.3`, then compared the
export block of each `fesm2022` bundle and the type entry points.

**Result: `@ngx-mce/datetime-picker` is an exact drop-in for `@ngxmc/datetime-picker@20.1.0`.**

| Aspect | `@ngxmc@20.1.0` | `@ngx-mce@22.2.3` | Same |
| --- | --- | --- | --- |
| Public exports | 44 | 44 | yes — zero added, zero removed |
| Layout | flat, one entry point | flat, one entry point | yes |
| Bundle | `fesm2022/*.mjs` | `fesm2022/*.mjs` | yes |
| Upstream repo | `angular-material-components` | `angular-material-components` (fork `fbf-prog64`) | same lineage |
| Majors published | 18 -- 20 | 21 -- 22 only | no — no 20.x, so the swap belongs to hop 2 |
| Maintenance | last release 2025-08-01 | last release 2026-08-14 | active |

The fork continues the version line: `@ngxmc` covers Angular 15--20, `@ngx-mce` covers 21+. Its README
states the split.

### The real work is hop 1, not the swap

`@ngxmc/datetime-picker` 19.2.2 -> 20.1.0 is itself a breaking change. 20.1.0 dropped the package's own
date-adapter layer and now uses Angular Material's `DateAdapter`. Five exports disappeared:

| Removed in 20.1.0 | Used here | Replacement |
| --- | --- | --- |
| `NgxMatDateAdapter` | yes | `DateAdapter` from `@angular/material/core` |
| `provideNgxMatNativeDate` | yes | `provideNativeDateAdapter()` from `@angular/material/core` |
| `NgxMatNativeDateAdapter` | no | — |
| `NGX_MAT_DATE_FORMATS` | no | `MAT_DATE_FORMATS` |
| `NGX_MAT_NATIVE_DATE_FORMATS` | no | — |

20.1.0 also flattened its types. The whole `lib/**` `.d.ts` tree is gone, and the `exports` map declares
no subpath, so `@ngxmc/datetime-picker/lib/date-selection-model` no longer resolves.
`NgxMatSingleDateSelectionModel` is not part of the public API; `NgxMatDateSelectionModel` exists in the
bundled types but is marked `@docs-private` and is not exported.

Unchanged and safe:

- `NgxMatDatetimepicker`, `NgxMatDatepickerToggle`, `NgxMatDatepickerInput`, `NgxMatDatepickerActions`,
  `NgxMatDatepickerCancel`, `NgxMatDatepickerApply` — all still exported.
- Every template binding the field uses: `showSpinners`, `showSeconds`, `startView`, `defaultTime`,
  `stepMinute`, `dateClass`, and the `opened` output.
- The internal `_componentRef.instance._model` path that `pickerOpened()` walks, and the `selection`
  property and `add()` method on that model.

So the code changes land once in hop 1. After that the swap is a rename of the import specifier, the
dependency name and the peer name.

## Checklist

### Hop 1 — 19.2 -> 20.3

# Angular update checklist: v19.2 -> v20.3

- Complexity level: Advanced (l=3)
- Options enabled: material
- Guide: https://angular.dev/update-guide?v=19.2-20.3&l=3 (the page rounds to the nearest listed version)

## Before you update

Nothing to do before the update.

## Update to the new version

- [ ] **20.0.0_ng_update** — In the application's project directory, run `ng update @angular/core@20 @angular/cli@20` to update your application to Angular v20.
- [ ] **update @angular/material** — Run `ng update @angular/material@20`.
- [ ] **20.0.0_rename_afterRender_to_afterEveryRender** — Rename the `afterRender` lifecycle hook to `afterEveryRender`
- [ ] **20.0.0_replace_TestBed_flushEffects_with_tick** — Replace uses of `TestBed.flushEffects()` with `TestBed.tick()`, the closest equivalent to synchronously flush effects.
- [ ] **20.0.0_update_provideCheckNoChangesConfig** — Rename `provideExperimentalCheckNoChangesForDebug` to `provideCheckNoChangesConfig`. Note its behavior now applies to all `checkNoChanges` runs. The `useNgZoneOnStable` option is no longer available.
- [ ] **20.0.0_refactor_ng_reflect_attributes_usage** — Refactor application and test code to avoid relying on `ng-reflect-*` attributes. If needed temporarily for migration, use `provideNgReflectAttributes()` from `@angular/core` in bootstrap providers to re-enable them in dev mode only.
- [ ] **20.0.0_adjust_RedirectFn_return_type_handling** — Adjust code that directly calls functions returning `RedirectFn`. These functions can now also return an `Observable` or `Promise`; ensure your logic correctly handles these asynchronous return types.
- [ ] **20.0.0_rename_resource_request_to_param** — Rename the `request` property passed in resources to `params`.
- [ ] **20.0.0_rename_rxResource_loader_to_stream** — Rename the `request` and `loader` properties passed in RxResource to `params` and `stream`.
- [ ] **20.0.0_replace_ResourceStatus_by_corresponding_strings** — `ResourceStatus` is no longer an enum. Use the corresponding constant string values instead.
- [ ] **20.0.0_rename_provideExperimentalZonelessChangeDetection** — Rename `provideExperimentalZonelessChangeDetection` to `provideZonelessChangeDetection`.
- [ ] **20.0.0_update_template_expressions_using_in_property** — If your templates use `{{ in }}` or `in` in expressions to refer to a component property named 'in', change it to `{{ this.in }}` or `this.in` as 'in' now refers to the JavaScript 'in' operator. If you're using `in` as a template reference, you'd have to rename the reference.
- [ ] **20.0.0_update_router_method_array_parameters_to_readonly** — The type for the commands arrays passed to Router methods (`createUrlTree`, `navigate`, `createUrlTreeFromSnapshot`) have been updated to use `readonly T[]` since the array is not mutated. Code which extracts these types (e.g. with `typeof`) may need to be adjusted if it expects mutable arrays.
- [ ] **20.0.0_update_animation_tests_for_guaranteed_flushing** — Review and update tests asserting on DOM elements involved in animations. Animations are now guaranteed to be flushed with change detection or `ApplicationRef.tick`, potentially altering previous test outcomes.
- [ ] **20.0.0_handle_uncaught_listener_errors_in_tests** — In tests, uncaught errors in event listeners are now rethrown by default. Previously, these were only logged to the console by default. Catch them if intentional for the test case, or use `rethrowApplicationErrors: false` in `configureTestingModule` as a last resort.
- [ ] **20.0.0_update_route_guards_array_types** — The `any` type is removed from the Route guard arrays (canActivate, canDeactivate, etc); ensure guards are functions, `ProviderToken<T>`, or (deprecated) strings. Refactor string guards to `ProviderToken<T>` or functions.
- [ ] **20.0.0_update_nodejs_version** — Ensure your Node.js version is at least 20.11.1 and not v18 or v22.0-v22.10 before upgrading to Angular v20. Check the [full list of supported Node.js versions](https://angular.dev/reference/versions).
- [ ] **20.0.0_replace_TestBed_get_with_TestBed_inject** — Replace all occurrences of the deprecated `TestBed.get()` method with `TestBed.inject()` in your Angular tests for dependency injection.
- [ ] **20.0.0_remove_InjectFlags_usage** — Remove `InjectFlags` enum and its usage from `inject`, `Injector.get`, `EnvironmentInjector.get`, and `TestBed.inject` calls. Use options like `{optional: true}` for `inject` or handle null for `*.get` methods.
- [ ] **20.0.0_update_injector_get_calls_to_use_ProviderToken** — Update `injector.get()` calls to use a specific `ProviderToken<T>` instead of relying on the removed `any` overload. If using string tokens (deprecated since v4), migrate them to `ProviderToken<T>`.
- [ ] **20.0.0_update_typescript_version** — Upgrade your project's TypeScript version to at least 5.8 before upgrading to Angular v20 to ensure compatibility.
- [ ] **20.0.0_set_moduleResolution_to_bundler** — Set `moduleResolution` to `'bundler'` in your `tsconfig.json`. Angular CLI's `ng update` migration applies this change automatically; if you upgrade manually or override the option in a base tsconfig, set it explicitly so imports of secondary entry-points such as `@angular/core/rxjs-interop` continue to resolve correctly.
- [ ] **20.0.0_review_AsyncPipe_error_handling_in_tests** — `Unhandled errors in subscriptions/promises of AsyncPipe` are now directly reported to `ErrorHandler`. This may alter test outcomes; ensure tests correctly handle these reported errors.
- [ ] **20.0.0_refactor_PendingTasks_run_usage** — If relying on the return value of `PendingTasks.run`, refactor to use `PendingTasks.add`. Handle promise results/rejections manually, especially for SSR to prevent node process shutdown on unhandled rejections.
- [ ] **20.0.0_update_template_expressions_using_void_property** — If your templates use `{{ void }}` or `void` in expressions to refer to a component property named 'void', change it to `{{ this.void }}` or `this.void` as 'void' now refers to the JavaScript `void` operator.
- [ ] **20.0.0_review_date_pipe_formatter_Y_usage** — Review `DatePipe` usages. Using the `Y` (week-numbering year) formatter without also including `w` (week number) is now detected as suspicious. Use `y` (year) if that was the intent, or include `w` alongside `Y`.
- [ ] **20.0.0_handle_uncaught_listener_errors_in_tests** — In templates parentheses are now always respected. This can lead to runtime breakages when nullish coalescing were nested in parathesis. eg `(foo?.bar).baz` will throw if `foo` is nullish as it would in native JavaScript.
- [ ] **20.0.0_router_generate_error_redirectTo_and_canMatch_incompatible_together** — Route configurations are now validated more rigorously. Routes that combine `redirectTo` and `canMatch` protections will generate an error, as these properties are incompatible together by default.

## After you update

Nothing to do after the update.

_28 step(s) total._

### Hop 2 — 20.3 -> 21.2

# Angular update checklist: v20.3 -> v21.2

- Complexity level: Advanced (l=3)
- Options enabled: material
- Guide: https://angular.dev/update-guide?v=20.3-21.2&l=3 (the page rounds to the nearest listed version)

## Before you update

Nothing to do before the update.

## Update to the new version

- [ ] **21.0.0_ng_update** — In the application's project directory, run `ng update @angular/core@21 @angular/cli@21` to update your application to Angular v21.
- [ ] **update @angular/material** — Run `ng update @angular/material@21`.
- [ ] **21.0.0-cdk-overlay-top-layer-stacking** — CDK overlays can now render in the browser's native top layer, causing elements that previously appeared above Material overlays via `z-index` to render beneath them. You can restore the previous behavior by providing `OVERLAY_DEFAULT_CONFIG` from `@angular/cdk/overlay` with the value `{usePopover: false}`.
- [ ] **21.0.0-update-signal-input-access-in-custom-elements** — When using signal inputs with Angular custom elements, update property access to be direct (`elementRef.newInput`) instead of a function call (`elementRef.newInput()`) to align with the behavior of decorator-based inputs.
- [ ] **21.0.0-zone-scheduler-behavior-change** — If using `provideZoneChangeDetection` without the ZoneJS polyfill, note that the internal scheduler is now always enabled. Review your app's timing as this may alter behavior that previously relied on the disabled scheduler.
- [ ] **21.0.0-provide-zone-change-detection-required** — Zone-based applications should add `provideZoneChangeDetection()` to your application's root providers. For standalone apps, add it to the `bootstrapApplication` call. For NgModule-based apps, add it to your root `AppModule`'s `providers` array. An automated migration should handle this.
- [ ] **21.0.0-remove-interpolation-option** — Remove the 'interpolation' property from your @Component decorators. Angular now only supports the default '{{' and '}}' interpolation markers.
- [ ] **21.0.0-remove-moduleid-property** — Remove the 'moduleId' property from your @Component decorators. This property was used for resolving relative URLs for templates and styles, a functionality now handled by modern build tools.
- [ ] **21.0.0-ng-component-outlet-content-type-change** — The `ngComponentOutletContent` input has been strictly typed from `any[][]` to `Node[][]`. Update the value you pass to this input to match the new `Node[][] | undefined` type.
- [ ] **21.0.0-stricter-host-binding-type-checking** — Host binding type checking is now enabled by default and may surface new build errors. Resolve any new type errors or set `typeCheckHostBindings: false` in your `tsconfig.json`'s `angularCompilerOptions`.
- [ ] **21.0.0-typescript-5.9-required** — Update your project's TypeScript version to 5.9 or later. The `ng update` command will typically handle this automatically.
- [ ] **21.0.0-remove-application-config-from-platform-browser** — The `ApplicationConfig` export from `@angular/platform-browser` has been removed. Update your imports to use `ApplicationConfig` from `@angular/core` instead.
- [ ] **21.0.0-remove-ignore-changes-outside-zone-option** — The `ignoreChangesOutsideZone` option for configuring ZoneJS is no longer available. Remove this option from your ZoneJS configuration in your polyfills file.
- [ ] **21.0.0-testbed-rethrows-errors-with-provideZoneChangeDetection** — Update tests using `provideZoneChangeDetection` as TestBed now rethrows errors. Fix the underlying issues in your tests or, as a last resort, configure TestBed with `rethrowApplicationErrors: false` to disable this behavior.
- [ ] **21.0.0-router-navigation-timing-changed** — Update tests that rely on router navigation timing. Navigations may now take additional microtasks to complete. Ensure navigations are fully completed before making assertions, for example by using `fakeAsync` with `flush` or waiting for promises/observables to resolve.
- [ ] **21.0.0-test-bed-provides-fake-platform-location** — Tests using `TestBed` might be affected by the new fake `PlatformLocation`. If your tests fail, provide the old `MockPlatformLocation` from `@angular/common/testing` via `{provide: PlatformLocation, useClass: MockPlatformLocation}` in your `TestBed` configuration.
- [ ] **21.0.0-remove-upgrade-adapter** — The `UpgradeAdapter` has been removed. Update your hybrid Angular/AngularJS application to use the static APIs from the `@angular/upgrade/static` package instead.
- [ ] **21.0.0-form-array-directive-conflict** — The new standalone `formArray` directive might conflict with existing custom directives or inputs. Rename any custom directives named `FormArray` or inputs named `formArray` on elements that also use reactive forms to resolve the conflict.
- [ ] **21.0.0-ngmodulefactory-removed** — The deprecated `NgModuleFactory` has been removed. Update any code that uses `NgModuleFactory` to use `NgModule` directly, which is common in dynamic component loading scenarios.
- [ ] **21.0.0-emit-declaration-only-not-supported** — The `emitDeclarationOnly` TypeScript compiler option is not supported. Please disable it in your `tsconfig.json` file to allow the Angular compiler to function correctly.
- [ ] **21.0.0-lastsuccessfulnavigation-is-a-signal** — The `lastSuccessfulNavigation` property on the Router has been converted to a signal. To get its value, you now need to invoke it as a function: `router.lastSuccessfulNavigation()`.
- [ ] **21.0.0-configure-commonengine-allowed-hosts** — Starting `@angular/ssr` 21.1.5, if your application uses SSR with `CommonEngine`, set the `allowedHosts` option in your `server.ts` (for example, `new CommonEngine({allowedHosts: ['localhost', '*.yourdomain.com']})`). Without it, SSR silently falls back to client-side rendering. This requirement comes from security advisory [GHSA-x288-3778-4hhx](https://github.com/angular/angular-cli/security/advisories/GHSA-x288-3778-4hhx) (also backported to 20.3.17 and 19.2.21).

## After you update

Nothing to do after the update.

_22 step(s) total._

### Hop 3 — 21.2 -> 22.1

# Angular update checklist: v21.2 -> v22.1

- Complexity level: Advanced (l=3)
- Options enabled: material
- Guide: https://angular.dev/update-guide?v=21.2-22.1&l=3 (the page rounds to the nearest listed version)

## Before you update

Nothing to do before the update.

## Update to the new version

- [ ] **22.0.0_ng_update** — In the application's project directory, run `ng update @angular/core@22 @angular/cli@22` to update your application to Angular v22.
- [ ] **update @angular/material** — Run `ng update @angular/material@22`.
- [ ] **22.0.0-update-nodejs-version** — Angular v22 requires Node.js v22.22.3 or v24.15.0 and later. Update your Node.js version to meet this minimum requirement. You can check your current version with `node --version`.
- [ ] **22.0.0-update-typescript-version** — Update your project to use TypeScript 6.0 or later. Versions older than 6.0 are no longer supported. Use `ng update` which will handle this automatically.
- [ ] **22.0.0-data-attributes-input-output-binding** — Data-prefixed attributes (e.g., `data-*`) no longer bind to inputs or outputs. If you were relying on this behavior, use explicit property bindings instead (e.g., `[attr.data-value]="value"` or `[dataValue]="value"` for a component input).
- [ ] **22.0.0-duplicate-input-output-bindings** — The compiler now throws an error when inputs, outputs, or model are binding to the same property/output. Review your component decorators and ensure no duplicate bindings exist.
- [ ] **22.0.0-safe-navigation-nullability-narrowing** — Safe navigation (`?.`) and nullish coalescing (`??`) now correctly narrow down nullable types in templates. This may trigger `nullishCoalescingNotNullable` and `optionalChainNotNullable` diagnostics on existing projects. Either fix the diagnostics by updating your templates, or temporarily disable them in your `tsconfig.json` under `angularCompilerOptions`.
- [ ] **22.0.0-safe-navigation-returns-undefined** — Angular expressions with optional chaining (`?.`) now return `undefined` instead of `null`. You can use the `$safeNavigationMigration()` magic function to revert to the previous behavior.
- [ ] **22.0.0-resource-stream-synchronous-resolution** — The `stream` property on `Resource`, including `rxResource`, now resolves synchronously when the stream or observable emits synchronously. Tests that assumed asynchronous resolution may need to wait for the value immediately instead.
- [ ] **22.0.0-remove-in-expressions** — `in` variables in template expressions now throw an error as it does in native JavaScript. If you have variables named `in` in your component or template, update your template expressions to use `this.in` or rename your variable.
- [ ] **22.0.0-animation-callback-event-signature-change** — The `AnimationCallbackEvent.animationComplete` signature has changed. Update any code that depends on the old signature of this event. Review your animation event handlers and tests.
- [ ] **22.0.0-http-xhr-backend-explicit-opt-in** — If your application uses upload progress reporting through `HttpXhrBackend`, explicitly opt-in by using `provideHttpClient(withXhr())`. The default HTTP client no longer includes XHR support by default.
- [ ] **22.0.0-deprecate-report-progress-option** — The `reportProgress` option in HTTP requests is deprecated. Use `reportUploadProgress` or `reportDownloadProgress` instead for more explicit control over progress reporting.
- [ ] **22.0.0-deprecate-server-xhr** — XHR support in `@angular/platform-server` is deprecated and is intended to be removed in Angular 23. The underlying `xhr2` library does not safely handle redirects (e.g. it can forward `Authorization` headers on cross-origin redirects and is susceptible to DoS via redirect loops). For server-side rendering, use the default `fetch` backend instead of `withXhr()`.
- [ ] **22.0.0-provide-routes-removed** — `provideRoutes()` has been removed. Use `provideRouter()` instead, or configure routes as a multi token using `ROUTES` if necessary. Update your application bootstrap configuration.
- [ ] **22.0.0-upgrade-angular-js-global-migration** — If using AngularJS interoperability, replace deprecated `getAngularLib()` and `setAngularLib()` with `getAngularJSGlobal()` and `setAngularJSGlobal()` respectively.
- [ ] **22.0.0-remove-component-factory-resolver** — `ComponentFactoryResolver` and `ComponentFactory` are no longer available. Pass the component class directly to APIs like `ViewContainerRef.createComponent()` or use the standalone `createComponent()` function instead.
- [ ] **22.0.0-remove-create-ng-module-ref** — `createNgModuleRef` has been removed. Use `createNgModule()` instead for dynamic module creation scenarios.
- [ ] **22.0.0-compile-time-duplicate-selectors** — Elements with multiple matching selectors now throw a compile-time error. Ensure your components use unique selectors and review any directives that might have conflicting selectors.
- [ ] **22.0.0-component-onpush-default** — Components with no `changeDetection` property defined are now `OnPush` by default. To maintain `Eager` (the previous default) change detection, explicitly set `changeDetection: ChangeDetectionStrategy.Eager` in your component decorator.
- [ ] **22.0.0-remove-check-no-changes** — `ChangeDetectorRef.checkNoChanges()` has been removed. In tests, use `fixture.detectChanges()` instead or verify your component state through other means.
- [ ] **22.0.0-leave-animations-scope-change** — Leave animations are no longer limited to the element being removed. They now support nested animations scoped to component boundaries. Review your animation configurations if you relied on the previous scoping behavior.
- [ ] **22.0.0-params-inheritance-strategy-default** — `paramsInheritanceStrategy` now defaults to `"always"` instead of `"emptyOnly"`. This means route parameters are inherited from all parent routes. To restore the previous behavior, explicitly set `paramsInheritanceStrategy: "emptyOnly"` in your router configuration.
- [ ] **22.0.0-can-match-current-snapshot-required** — The `currentSnapshot` parameter in `CanMatchFn` and the `canMatch` method of the `CanMatch` interface is now required. Update any class implementations of `CanMatch` to include this required third argument.
- [ ] **22.0.0-hammer-js-removed** — Hammer.js integration has been removed from Angular platform-browser. If you need touch gesture support, implement your own gesture detection or use an alternative library.
- [ ] **22.0.0-app-ref-bootstrap-typing** — The second argument of `appRef.bootstrap()` no longer accepts `any` type. Ensure the element you pass is not nullable and matches the expected type.
- [ ] **22.0.0-platform-browser-styles-removal** — Unused styles are now automatically removed when their associated `host` is dropped. Be aware that other DOM on the page may be affected if those styles are used by elements outside of Angular or if not using `ViewEncapsulation.Emulated`.
- [ ] **22.0.0-title-strategy-return-type** — The return type for `TitleStrategy.getResolvedTitleForRoute` has changed from `any` to a stricter type (e.g., `string | undefined`). Update your custom `TitleStrategy` implementations to match the new signature.
- [ ] **22.0.0-incremental-hydration-default** — Incremental hydration is now the default behavior for applications using Server-Side Rendering (SSR). Review your application if you relied on the previous non-incremental hydration behavior. You can use `withNoIncrementalHydration()` to restore the previous behavior if needed.
- [ ] **22.0.0-full-template-type-check-removed** — The `fullTemplateTypeCheck` compiler option has been removed. Use `strictTemplates` instead to enable strict template type checking in your `tsconfig.json`.
- [ ] **22.0.0-strict-templates-default** — The `strictTemplates` compiler option now defaults to `true`. If your project was not using strict template type checking, you may see new compilation errors. Resolve these errors or explicitly set `strictTemplates: false` in your `tsconfig.json` to opt out.
- [ ] **22.0.0-webpack-builders-deprecated** — Webpack builders (`@angular-devkit/build-angular` and `@angular-devkit/build-webpack`) are now deprecated. Migrate to the `@angular/build` builders (esbuild/application) for your application builds.
- [ ] **22.0.0-ssr-commonengine-deprecated** — `CommonEngine` APIs from `@angular/ssr` are deprecated. Migrate to `AngularNodeAppEngine` or `AngularAppEngine` instead.
- [ ] **22.0.0-istanbul-lib-instrument-optional** — `istanbul-lib-instrument` is now an optional peer dependency. If your project uses Karma with code coverage enabled, ensure `istanbul-lib-instrument` is explicitly installed.
- [ ] **22.0.0-dev-server-port-env-priority** — `ng serve` now gives the highest priority to the `PORT` environment variable. This value overrides any port configured in `angular.json` or provided via the `--port` flag.
- [ ] **22.0.0-architect-cli-removed** — The `@angular-devkit/architect-cli` package is no longer available. Use the `architect` CLI tool from the `@angular-devkit/architect` package instead.
- [ ] **22.0.0-experimental-test-builders-removed** — The experimental `@angular-devkit/build-angular:jest` and `@angular-devkit/build-angular:web-test-runner` test builders have been removed.

## After you update

Nothing to do after the update.

_37 step(s) total._

## Changes made

### Hop 1 — 19.2 -> 20.3

_In progress._

## Migration opt-outs

| Opt-out | Class | Sites | Decision |
| --- | --- | --- | --- |
| _filled while reading each migration diff_ | | | |

## After the checkpoint

_Not reached yet._

## Smoke test for the user

_Written at step 4.8._

## Impact on the published library

`@lab900/forms` is published from `lib/`. Filled as the hops land.

## Follow-ups

_None yet._
