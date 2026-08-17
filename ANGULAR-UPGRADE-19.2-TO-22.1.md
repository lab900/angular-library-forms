# Angular upgrade 19.2 -> 22.1

Date: 2026-08-17
Level: Advanced (l=3) — Angular Material enabled
Branch: chore/angular-upgrade-v22

## Final state

| Check | Command | Result | Measured at | Measured by |
| --- | --- | --- | --- | --- |
| type check (app) | `npx tsc -p tsconfig.app.json --noEmit` | pass | `4a9a190f` | skill |
| type check (spec) | `npx tsc -p tsconfig.spec.json --noEmit` | pass | `4a9a190f` | skill |
| type check (library) | `npx tsc -p lib/tsconfig.lib.json --noEmit` | pass | `4a9a190f` | skill |
| build library (dev) | `npx ng build forms` | pass | `4a9a190f` | skill |
| build library (prod) | `npm run build:forms:prod` | pass | `4a9a190f` | skill |
| build application | `npx ng build lab900-forms` | pass | `4a9a190f` | skill |
| tests | `npm test` | pass — 4 suites, 32 tests | `4a9a190f` | skill |
| lint | `npm run lint` | **fail — 20 errors (kept opt-out, see Decisions)** + 1 pre-existing warning | `4a9a190f` | skill |
| forced rebuild | watch build, touch 1 library + 1 app file | pass — 2 rebuilds each, 0 errors | `4a9a190f` | skill |
| runtime behaviour | manual click-through | not verified — handed to the user | — | user |

Measured in one pass at `4a9a190f`, the last code commit. Later commits on this branch are documentation
only, which does not invalidate the table, so the hash stays. No result is carried over from an earlier
run — the whole pass was re-run when `marked` was removed, because that changed `package.json`.

**About the lint failure.** All 20 errors are
`@angular-eslint/prefer-on-push-component-change-detection`, one per component that carries the
`ChangeDetectionStrategy.Eager` opt-out the user chose to keep. 19 are in the library project and 1 in the
application project. This is the reported cost of that decision, not an accident: no `eslint-disable` was
added and no rule was relaxed. The 1 warning is a pre-existing unused `eslint-disable` directive at
`lib/src/lib/components/form-container/form-container.component.ts:20`, unrelated to the upgrade.

The library build also emits 13 extended-diagnostic **warnings** (12 × `NG8107`, 1 × `NG8102`) across 8
files. They are warnings, not errors, and are under Follow-ups.

### Final dependency table

Changed entries only. 31 of them.

| Package | Before | Now | Installed |
| --- | --- | --- | --- |
| `@angular-builders/jest` | `^19.0.0` | `^22.0.1` | 22.0.1 |
| `@angular/animations` | `^19.2.1` | **removed** — bumped to `^22.1.2`, then dropped by Follow-up 7 | — |
| `@angular/build` | `^19.2.1` | `^22.1.4` | 22.1.4 |
| `@angular/cdk` | `^19.2.2` | `^22.1.2` | 22.1.2 |
| `@angular/cli` | `^19.2.1` | `^22.1.4` | 22.1.4 |
| `@angular/common` | `^19.2.1` | `^22.1.2` | 22.1.2 |
| `@angular/compiler` | `^19.2.1` | `^22.1.2` | 22.1.2 |
| `@angular/compiler-cli` | `^19.2.1` | `^22.1.2` | 22.1.2 |
| `@angular/core` | `^19.2.1` | `^22.1.2` | 22.1.2 |
| `@angular/forms` | `^19.2.1` | `^22.1.2` | 22.1.2 |
| `@angular/material` | `^19.2.2` | `^22.1.2` | 22.1.2 |
| `@angular/platform-browser` | `^19.2.1` | `^22.1.2` | 22.1.2 |
| `@angular/platform-browser-dynamic` | `^19.2.1` | `^22.1.2` | 22.1.2 |
| `@angular/router` | `^19.2.1` | `^22.1.2` | 22.1.2 |
| `@kolkov/angular-editor` | `^3.0.0-beta.2` | `^3.1.0` | 3.1.0 |
| `@lab900/ui` | `^19.0.0` | `^22.0.0` | 22.0.0 — bumped after the upgrade, see Follow-up 17 |
| `@ngx-mce/datetime-picker` | *(absent)* | `~22.2.3` | 22.2.3 |
| `@ngxmc/datetime-picker` | `~19.2.2` | **removed** | — |
| `@typescript-eslint/eslint-plugin` | `^8.26.0` | `^8.58.0` | 8.67.0 |
| `@typescript-eslint/parser` | `^8.26.0` | `^8.58.0` | 8.67.0 |
| `angular-eslint` | `19.2.1` | `22.1.0` | 22.1.0 |
| `eslint` | `^9.8.0` | `^9.28.0` | 9.35.0 |
| `jest` | `^29.7.0` | `^30.4.2` | 30.4.2 |
| `jest-preset-angular` | `^14.5.3` | `^17.0.0` | 17.0.0 |
| `marked` | *(absent)* | *(still absent — added, then removed again)* | 18.0.9, as an auto-installed peer of `ngx-markdown` |
| `ng-mocks` | `^14.13.3` | `^14.17.1` | 14.17.1 |
| `ng-packagr` | `^19.2.0` | `^22.1.1` | 22.1.1 |
| `ngx-markdown` | `^19.1.0` | `^22.0.0` | 22.0.0 |
| `ngx-mat-select-search` | `^8.0.0` | `^9.0.0` | 9.0.0 |
| `typescript` | `~5.5.4` | `~6.0.3` | 6.0.3 |
| `typescript-eslint` | *(absent)* | `^8.58.0` | 8.67.0 |

Entries that differ from the plan in the Compatibility check, all for reasons recorded above:
`typescript-eslint` was added, the picker was replaced rather than bumped, and `marked` was added at hop 1
and removed again at the end. `jest` and `eslint` were moved by other packages' migrations, not by hand.
The workspace version went from `19.1.40` to `22.0.0` in both `package.json` files.

The library's own changelog entry for this release is in `CHANGELOG.md` under `## 22.0.0`. It is
repo-facing: `lib/ng-package.json` does not copy it into `dist`, so it is not published with the package.

## Decisions

| Item | Answer | Date | Reason |
| --- | --- | --- | --- |
| Route to Angular 22, blocked by `@ngxmc/datetime-picker` | Upgrade to v20 first, then replace the package with `@ngx-mce/datetime-picker`. Assess a drop-in first; if it is not a drop-in, document every needed change. | 2026-08-17 | User choice at the gate. `@ngxmc/datetime-picker` stopped at Angular 20, so the v21 and v22 hops need a maintained replacement. |
| `skipLibCheck` for the 2 `TS2416` errors inside `@ngxmc/datetime-picker@20.1.0` | Add `skipLibCheck: true` to `lib/tsconfig.lib.json` only, as a temporary measure. Remove it at hop 2 after the swap and prove the library build stays green without it. Report it if removal fails. | 2026-08-17 | The errors are a defect in the package, not in this project: it declares `dateFilter` as `(date: D) => boolean` while its own `NgxMatDatepickerControl` requires `(date: D \| null) => boolean`. 20.1.0 is its only Angular 20 release, and the fork declares the signature correctly. The application and spec configs keep full declaration checking. **Closed at hop 2: removed, and the library build is green without it.** |
| `strictTemplates: false` (3 tsconfigs) | Enable it everywhere and fix all 76 errors. | 2026-08-17 | Measured cost before deciding: 67 errors in 26 library files and 9 in 6 app files. The user chose the full fix over keeping the opt-out. |
| `$safeNavigationMigration()` (63 occurrences, 29 files) | Validated first, then **removed all of them**. 21 fell out with the `strictTemplates` work; the remaining 42 were removed after the analysis. 2 sites got an explicit value instead of a bare removal. | 2026-08-17 | The user asked for evidence before committing to a removal. The validation is written up under "After the checkpoint". Note the assumption behind the request turned out to be wrong in a useful way: the wrapper is invisible to the type checker, so the compiler could **not** have caught a `null` / `undefined` mismatch. The 2 real cases were found by reading what consumes each value. |
| `ChangeDetectionStrategy.Eager` (20 components) | **Keep.** Report the 20 lint errors instead of hiding them. | 2026-08-17 | Removing it changes change detection on 19 published components. That is a runtime risk only a click-through can settle, and the skill forbids the assistant claiming a runtime pass. Lint stays red by choice, not by accident. |
| `@angular-eslint/prefer-inject` (17 errors, 5 files) | Run `ng generate @angular/core:inject`, then review the diff and re-verify. | 2026-08-17 | Verified the rule was absent from angular-eslint 19.2.1's recommended set, so the upgrade introduced it. Angular ships the schematic, so the refactor is mechanical. |
| The explicit `marked` dependency added at hop 1 | **Remove it.** | 2026-08-17 | The user asked whether it was still needed. It is not, and the claim was tested rather than argued: no file imports `marked`; deleting the declaration and regenerating `package-lock.json` from scratch still resolves `marked@18.0.9`; and the whole range `ngx-markdown@22.0.0` allows (`^17 \|\| ^18`) carries the generic `MarkedOptions` / `MarkedExtension` types its `.d.ts` needs, confirmed by unpacking marked 17.0.6 as well as 18.0.9. CI runs plain `npm ci` with no `.npmrc` and no `--legacy-peer-deps`, so the peer comes from the lock. The hop 1 failure was caused by a **retained** `marked@15.0.12` that still satisfied ngx-markdown 20.1.0's `^15 \|\| ^16` peer but predates the generics; that condition no longer exists. |

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
| @lab900/ui | ^19.0.0 | 19.2.3 | 19.2.3 | 19.2.3 | 19.2.3 | ~~OK~~ **wrong — see Follow-up 17** |
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

- [x] **20.0.0_ng_update** — In the application's project directory, run `ng update @angular/core@20 @angular/cli@20` to update your application to Angular v20.
  - **Verdict:** done — one `ng update` call with every lockstep package pinned. See Changes made, hop 1.
- [x] **update @angular/material** — Run `ng update @angular/material@20`.
  - **Verdict:** done — `@angular/material@20.2.14` and `@angular/cdk@20.2.14` were in the same call. Its migration rewrote one SCSS token.
- [x] **20.0.0_rename_afterRender_to_afterEveryRender** — Rename the `afterRender` lifecycle hook to `afterEveryRender`
  - **Verdict:** N/A — `afterRender` appears in no file under `lib/src` or `src`.
- [x] **20.0.0_replace_TestBed_flushEffects_with_tick** — Replace uses of `TestBed.flushEffects()` with `TestBed.tick()`, the closest equivalent to synchronously flush effects.
  - **Verdict:** N/A — `flushEffects` appears in no file.
- [x] **20.0.0_update_provideCheckNoChangesConfig** — Rename `provideExperimentalCheckNoChangesForDebug` to `provideCheckNoChangesConfig`. Note its behavior now applies to all `checkNoChanges` runs. The `useNgZoneOnStable` option is no longer available.
  - **Verdict:** N/A — `provideExperimentalCheckNoChangesForDebug` appears in no file.
- [x] **20.0.0_refactor_ng_reflect_attributes_usage** — Refactor application and test code to avoid relying on `ng-reflect-*` attributes. If needed temporarily for migration, use `provideNgReflectAttributes()` from `@angular/core` in bootstrap providers to re-enable them in dev mode only.
  - **Verdict:** N/A — no `ng-reflect` reference in code or templates.
- [x] **20.0.0_adjust_RedirectFn_return_type_handling** — Adjust code that directly calls functions returning `RedirectFn`. These functions can now also return an `Observable` or `Promise`; ensure your logic correctly handles these asynchronous return types.
  - **Verdict:** N/A — `RedirectFn` appears in no file.
- [x] **20.0.0_rename_resource_request_to_param** — Rename the `request` property passed in resources to `params`.
  - **Verdict:** N/A — the project uses no plain `resource({ ... })`, only `rxResource`. See the next item.
- [x] **20.0.0_rename_rxResource_loader_to_stream** — Rename the `request` and `loader` properties passed in RxResource to `params` and `stream`.
  - **Verdict:** fixed — 4 sites renamed `request`/`loader` to `params`/`stream`. See Changes made, hop 1.
- [x] **20.0.0_replace_ResourceStatus_by_corresponding_strings** — `ResourceStatus` is no longer an enum. Use the corresponding constant string values instead.
  - **Verdict:** N/A — `ResourceStatus` appears in no file.
- [x] **20.0.0_rename_provideExperimentalZonelessChangeDetection** — Rename `provideExperimentalZonelessChangeDetection` to `provideZonelessChangeDetection`.
  - **Verdict:** N/A — the project uses zone change detection and never called the experimental provider.
- [x] **20.0.0_update_template_expressions_using_in_property** — If your templates use `{{ in }}` or `in` in expressions to refer to a component property named 'in', change it to `{{ this.in }}` or `this.in` as 'in' now refers to the JavaScript 'in' operator. If you're using `in` as a template reference, you'd have to rename the reference.
  - **Verdict:** N/A — no component declares a property named `in`.
- [x] **20.0.0_update_router_method_array_parameters_to_readonly** — The type for the commands arrays passed to Router methods (`createUrlTree`, `navigate`, `createUrlTreeFromSnapshot`) have been updated to use `readonly T[]` since the array is not mutated. Code which extracts these types (e.g. with `typeof`) may need to be adjusted if it expects mutable arrays.
  - **Verdict:** N/A — no call to `createUrlTree` or `createUrlTreeFromSnapshot`.
- [x] **20.0.0_update_animation_tests_for_guaranteed_flushing** — Review and update tests asserting on DOM elements involved in animations. Animations are now guaranteed to be flushed with change detection or `ApplicationRef.tick`, potentially altering previous test outcomes.
  - **Verdict:** behaviour changed, no code change — 4 spec files. Verified at step 4.1, after the last hop.
- [x] **20.0.0_handle_uncaught_listener_errors_in_tests** — In tests, uncaught errors in event listeners are now rethrown by default. Previously, these were only logged to the console by default. Catch them if intentional for the test case, or use `rethrowApplicationErrors: false` in `configureTestingModule` as a last resort.
  - **Verdict:** behaviour changed, no code change — verified at step 4.1, after the last hop.
- [x] **20.0.0_update_route_guards_array_types** — The `any` type is removed from the Route guard arrays (canActivate, canDeactivate, etc); ensure guards are functions, `ProviderToken<T>`, or (deprecated) strings. Refactor string guards to `ProviderToken<T>` or functions.
  - **Verdict:** N/A — no route declares `canActivate`, `canDeactivate` or any other guard.
- [x] **20.0.0_update_nodejs_version** — Ensure your Node.js version is at least 20.11.1 and not v18 or v22.0-v22.10 before upgrading to Angular v20. Check the [full list of supported Node.js versions](https://angular.dev/reference/versions).
  - **Verdict:** OK — Node.js 24.15.0 is installed, above the 20.11.1 minimum.
- [x] **20.0.0_replace_TestBed_get_with_TestBed_inject** — Replace all occurrences of the deprecated `TestBed.get()` method with `TestBed.inject()` in your Angular tests for dependency injection.
  - **Verdict:** N/A — migration ran, no changes needed. `TestBed.get` appears in no file.
- [x] **20.0.0_remove_InjectFlags_usage** — Remove `InjectFlags` enum and its usage from `inject`, `Injector.get`, `EnvironmentInjector.get`, and `TestBed.inject` calls. Use options like `{optional: true}` for `inject` or handle null for `*.get` methods.
  - **Verdict:** N/A — migration ran, no changes needed. `InjectFlags` appears in no file.
- [x] **20.0.0_update_injector_get_calls_to_use_ProviderToken** — Update `injector.get()` calls to use a specific `ProviderToken<T>` instead of relying on the removed `any` overload. If using string tokens (deprecated since v4), migrate them to `ProviderToken<T>`.
  - **Verdict:** N/A — no `injector.get(` call.
- [x] **20.0.0_update_typescript_version** — Upgrade your project's TypeScript version to at least 5.8 before upgrading to Angular v20 to ensure compatibility.
  - **Verdict:** done — `ng update` moved typescript from `~5.5.4` to `~5.9.3`.
- [x] **20.0.0_set_moduleResolution_to_bundler** — Set `moduleResolution` to `'bundler'` in your `tsconfig.json`. Angular CLI's `ng update` migration applies this change automatically; if you upgrade manually or override the option in a base tsconfig, set it explicitly so imports of secondary entry-points such as `@angular/core/rxjs-interop` continue to resolve correctly.
  - **Verdict:** migration applied to `tsconfig.json`. It broke 2 deep imports that the old `node` resolution allowed; both are fixed. See Changes made, hop 1.
- [x] **20.0.0_review_AsyncPipe_error_handling_in_tests** — `Unhandled errors in subscriptions/promises of AsyncPipe` are now directly reported to `ErrorHandler`. This may alter test outcomes; ensure tests correctly handle these reported errors.
  - **Verdict:** behaviour changed, no code change — verified at step 4.1, after the last hop.
- [x] **20.0.0_refactor_PendingTasks_run_usage** — If relying on the return value of `PendingTasks.run`, refactor to use `PendingTasks.add`. Handle promise results/rejections manually, especially for SSR to prevent node process shutdown on unhandled rejections.
  - **Verdict:** N/A — `PendingTasks` appears in no file.
- [x] **20.0.0_update_template_expressions_using_void_property** — If your templates use `{{ void }}` or `void` in expressions to refer to a component property named 'void', change it to `{{ this.void }}` or `this.void` as 'void' now refers to the JavaScript `void` operator.
  - **Verdict:** N/A — no component declares a property named `void`.
- [x] **20.0.0_review_date_pipe_formatter_Y_usage** — Review `DatePipe` usages. Using the `Y` (week-numbering year) formatter without also including `w` (week number) is now detected as suspicious. Use `y` (year) if that was the intent, or include `w` alongside `Y`.
  - **Verdict:** N/A — no template uses the `date` pipe.
- [x] **20.0.0_handle_uncaught_listener_errors_in_tests** — In templates parentheses are now always respected. This can lead to runtime breakages when nullish coalescing were nested in parathesis. eg `(foo?.bar).baz` will throw if `foo` is nullish as it would in native JavaScript.
  - **Verdict:** N/A — no template or expression matches the `(a?.b).c` shape.
- [x] **20.0.0_router_generate_error_redirectTo_and_canMatch_incompatible_together** — Route configurations are now validated more rigorously. Routes that combine `redirectTo` and `canMatch` protections will generate an error, as these properties are incompatible together by default.
  - **Verdict:** N/A — no route declares `redirectTo` or `canMatch`.

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

- [x] **21.0.0_ng_update** — In the application's project directory, run `ng update @angular/core@21 @angular/cli@21` to update your application to Angular v21.
  - **Verdict:** done — one `ng update` call, run with `--allow-dirty` because the picker swap was staged in the tree first. See Changes made, hop 2.
- [x] **update @angular/material** — Run `ng update @angular/material@21`.
  - **Verdict:** done — `@angular/material@21.2.14` and `@angular/cdk@21.2.14` were in the same call. Both migrations reported no changes.
- [x] **21.0.0-cdk-overlay-top-layer-stacking** — CDK overlays can now render in the browser's native top layer, causing elements that previously appeared above Material overlays via `z-index` to render beneath them. You can restore the previous behavior by providing `OVERLAY_DEFAULT_CONFIG` from `@angular/cdk/overlay` with the value `{usePopover: false}`.
  - **Verdict:** behaviour changed, no code change. The only `z-index` in the project is `10` on the showcase header (`src/app/app.component.scss:8`), which the CDK overlay container already outranked. `OVERLAY_DEFAULT_CONFIG` was **not** set. In the smoke test.
- [x] **21.0.0-update-signal-input-access-in-custom-elements** — When using signal inputs with Angular custom elements, update property access to be direct (`elementRef.newInput`) instead of a function call (`elementRef.newInput()`) to align with the behavior of decorator-based inputs.
  - **Verdict:** N/A — the project creates no Angular custom elements. `createCustomElement` appears in no file.
- [x] **21.0.0-zone-scheduler-behavior-change** — If using `provideZoneChangeDetection` without the ZoneJS polyfill, note that the internal scheduler is now always enabled. Review your app's timing as this may alter behavior that previously relied on the disabled scheduler.
  - **Verdict:** N/A — the project keeps the zone.js polyfill, so the scheduler behaviour is unchanged for it.
- [x] **21.0.0-provide-zone-change-detection-required** — Zone-based applications should add `provideZoneChangeDetection()` to your application's root providers. For standalone apps, add it to the `bootstrapApplication` call. For NgModule-based apps, add it to your root `AppModule`'s `providers` array. An automated migration should handle this.
  - **Verdict:** migration applied — it added `provideZoneChangeDetection()` to the providers in `src/main.ts`. v21 requires it for a zone-based application, so it is **not** an opt-out.
- [x] **21.0.0-remove-interpolation-option** — Remove the 'interpolation' property from your @Component decorators. Angular now only supports the default '{{' and '}}' interpolation markers.
  - **Verdict:** N/A — no `@Component` sets `interpolation`.
- [x] **21.0.0-remove-moduleid-property** — Remove the 'moduleId' property from your @Component decorators. This property was used for resolving relative URLs for templates and styles, a functionality now handled by modern build tools.
  - **Verdict:** N/A — no `@Component` sets `moduleId`.
- [x] **21.0.0-ng-component-outlet-content-type-change** — The `ngComponentOutletContent` input has been strictly typed from `any[][]` to `Node[][]`. Update the value you pass to this input to match the new `Node[][] | undefined` type.
  - **Verdict:** N/A — `ngComponentOutletContent` appears in no template.
- [x] **21.0.0-stricter-host-binding-type-checking** — Host binding type checking is now enabled by default and may surface new build errors. Resolve any new type errors or set `typeCheckHostBindings: false` in your `tsconfig.json`'s `angularCompilerOptions`.
  - **Verdict:** no code change needed — the option is on by default now, and every type check and build passes. `typeCheckHostBindings: false` was **not** set.
- [x] **21.0.0-typescript-5.9-required** — Update your project's TypeScript version to 5.9 or later. The `ng update` command will typically handle this automatically.
  - **Verdict:** OK — typescript `~5.9.3` was already installed at hop 1, and this hop kept it.
- [x] **21.0.0-remove-application-config-from-platform-browser** — The `ApplicationConfig` export from `@angular/platform-browser` has been removed. Update your imports to use `ApplicationConfig` from `@angular/core` instead.
  - **Verdict:** N/A — migration ran, no changes needed.
- [x] **21.0.0-remove-ignore-changes-outside-zone-option** — The `ignoreChangesOutsideZone` option for configuring ZoneJS is no longer available. Remove this option from your ZoneJS configuration in your polyfills file.
  - **Verdict:** N/A — `ignoreChangesOutsideZone` appears in no file.
- [x] **21.0.0-testbed-rethrows-errors-with-provideZoneChangeDetection** — Update tests using `provideZoneChangeDetection` as TestBed now rethrows errors. Fix the underlying issues in your tests or, as a last resort, configure TestBed with `rethrowApplicationErrors: false` to disable this behavior.
  - **Verdict:** behaviour changed, no code change — verified at step 4.1, after the last hop. `rethrowApplicationErrors: false` was **not** set.
- [x] **21.0.0-router-navigation-timing-changed** — Update tests that rely on router navigation timing. Navigations may now take additional microtasks to complete. Ensure navigations are fully completed before making assertions, for example by using `fakeAsync` with `flush` or waiting for promises/observables to resolve.
  - **Verdict:** behaviour changed, no code change — verified at step 4.1, after the last hop.
- [x] **21.0.0-test-bed-provides-fake-platform-location** — Tests using `TestBed` might be affected by the new fake `PlatformLocation`. If your tests fail, provide the old `MockPlatformLocation` from `@angular/common/testing` via `{provide: PlatformLocation, useClass: MockPlatformLocation}` in your `TestBed` configuration.
  - **Verdict:** behaviour changed, no code change — verified at step 4.1, after the last hop.
- [x] **21.0.0-remove-upgrade-adapter** — The `UpgradeAdapter` has been removed. Update your hybrid Angular/AngularJS application to use the static APIs from the `@angular/upgrade/static` package instead.
  - **Verdict:** N/A — no hybrid AngularJS application. `UpgradeAdapter` appears in no file.
- [x] **21.0.0-form-array-directive-conflict** — The new standalone `formArray` directive might conflict with existing custom directives or inputs. Rename any custom directives named `FormArray` or inputs named `formArray` on elements that also use reactive forms to resolve the conflict.
  - **Verdict:** N/A — no custom directive or input is named `formArray`. The only hits are Angular's own `[formArrayName]` in the repeater template and a local variable in `form-builder.service.ts`.
- [x] **21.0.0-ngmodulefactory-removed** — The deprecated `NgModuleFactory` has been removed. Update any code that uses `NgModuleFactory` to use `NgModule` directly, which is common in dynamic component loading scenarios.
  - **Verdict:** N/A — `NgModuleFactory` appears in no file.
- [x] **21.0.0-emit-declaration-only-not-supported** — The `emitDeclarationOnly` TypeScript compiler option is not supported. Please disable it in your `tsconfig.json` file to allow the Angular compiler to function correctly.
  - **Verdict:** N/A — no tsconfig sets `emitDeclarationOnly`.
- [x] **21.0.0-lastsuccessfulnavigation-is-a-signal** — The `lastSuccessfulNavigation` property on the Router has been converted to a signal. To get its value, you now need to invoke it as a function: `router.lastSuccessfulNavigation()`.
  - **Verdict:** N/A — migration ran, no changes needed.
- [x] **21.0.0-configure-commonengine-allowed-hosts** — Starting `@angular/ssr` 21.1.5, if your application uses SSR with `CommonEngine`, set the `allowedHosts` option in your `server.ts` (for example, `new CommonEngine({allowedHosts: ['localhost', '*.yourdomain.com']})`). Without it, SSR silently falls back to client-side rendering. This requirement comes from security advisory [GHSA-x288-3778-4hhx](https://github.com/angular/angular-cli/security/advisories/GHSA-x288-3778-4hhx) (also backported to 20.3.17 and 19.2.21).
  - **Verdict:** N/A — the project has no SSR. `@angular/ssr` is not a dependency and `CommonEngine` appears in no file.

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

- [x] **22.0.0_ng_update** — In the application's project directory, run `ng update @angular/core@22 @angular/cli@22` to update your application to Angular v22.
  - **Verdict:** done — one `ng update` call with every lockstep package pinned, plus `@ngx-mce/datetime-picker@22.2.3` and `@typescript-eslint/*@8.58.0`. See Changes made, hop 3.
- [x] **update @angular/material** — Run `ng update @angular/material@22`.
  - **Verdict:** done — `@angular/material@22.1.2` and `@angular/cdk@22.1.2` were in the same call. Both migrations reported no changes.
- [x] **22.0.0-update-nodejs-version** — Angular v22 requires Node.js v22.22.3 or v24.15.0 and later. Update your Node.js version to meet this minimum requirement. You can check your current version with `node --version`.
  - **Verdict:** OK — Node.js 24.15.0 satisfies the `^22.22.3 || ^24.15.0 || >=26.0.0` requirement.
- [x] **22.0.0-update-typescript-version** — Update your project to use TypeScript 6.0 or later. Versions older than 6.0 are no longer supported. Use `ng update` which will handle this automatically.
  - **Verdict:** done — `ng update` moved typescript to `~6.0.3`. TypeScript 6.0 also deprecated `baseUrl`, which needed a follow-on fix. See Changes made, hop 3.
- [x] **22.0.0-data-attributes-input-output-binding** — Data-prefixed attributes (e.g., `data-*`) no longer bind to inputs or outputs. If you were relying on this behavior, use explicit property bindings instead (e.g., `[attr.data-value]="value"` or `[dataValue]="value"` for a component input).
  - **Verdict:** N/A — no template binds a `data-*` attribute to an input or output.
- [x] **22.0.0-duplicate-input-output-bindings** — The compiler now throws an error when inputs, outputs, or model are binding to the same property/output. Review your component decorators and ensure no duplicate bindings exist.
  - **Verdict:** N/A — the compiler now errors on this, and every build passes, so no duplicate binding exists.
- [x] **22.0.0-safe-navigation-nullability-narrowing** — Safe navigation (`?.`) and nullish coalescing (`??`) now correctly narrow down nullable types in templates. This may trigger `nullishCoalescingNotNullable` and `optionalChainNotNullable` diagnostics on existing projects. Either fix the diagnostics by updating your templates, or temporarily disable them in your `tsconfig.json` under `angularCompilerOptions`.
  - **Verdict:** migration wrote an **opt-out** that the compiler rejected together with `strictTemplates: false` (NG4003). The `extendedDiagnostics` block was removed from all 4 tsconfigs. It was dead: neither diagnostic can fire while `strictTemplates` is off. See Changes made, hop 3.
- [x] **22.0.0-safe-navigation-returns-undefined** — Angular expressions with optional chaining (`?.`) now return `undefined` instead of `null`. You can use the `$safeNavigationMigration()` magic function to revert to the previous behavior.
  - **Verdict:** migration wrote an **opt-out**: `$safeNavigationMigration()` wrappers in 29 files, 63 occurrences. Listed in Migration opt-outs, decided at step 4.3.
- [x] **22.0.0-resource-stream-synchronous-resolution** — The `stream` property on `Resource`, including `rxResource`, now resolves synchronously when the stream or observable emits synchronously. Tests that assumed asynchronous resolution may need to wait for the value immediately instead.
  - **Verdict:** behaviour changed, no code change. The library uses `rxResource` at 4 sites. Verified at step 4.1, after this hop.
- [x] **22.0.0-remove-in-expressions** — `in` variables in template expressions now throw an error as it does in native JavaScript. If you have variables named `in` in your component or template, update your template expressions to use `this.in` or rename your variable.
  - **Verdict:** N/A — no component declares a property named `in`, checked again at this hop.
- [x] **22.0.0-animation-callback-event-signature-change** — The `AnimationCallbackEvent.animationComplete` signature has changed. Update any code that depends on the old signature of this event. Review your animation event handlers and tests.
  - **Verdict:** N/A — `animationComplete` appears in no file.
- [x] **22.0.0-http-xhr-backend-explicit-opt-in** — If your application uses upload progress reporting through `HttpXhrBackend`, explicitly opt-in by using `provideHttpClient(withXhr())`. The default HTTP client no longer includes XHR support by default.
  - **Verdict:** migration wrote an **opt-out**: `provideHttpClient(withXhr())` in `src/main.ts`. Evidence says it is not needed: `reportProgress` appears in no file and every HTTP call in the project is a `get`. Decided at step 4.3.
- [x] **22.0.0-deprecate-report-progress-option** — The `reportProgress` option in HTTP requests is deprecated. Use `reportUploadProgress` or `reportDownloadProgress` instead for more explicit control over progress reporting.
  - **Verdict:** N/A — `reportProgress` appears in no file.
- [x] **22.0.0-deprecate-server-xhr** — XHR support in `@angular/platform-server` is deprecated and is intended to be removed in Angular 23. The underlying `xhr2` library does not safely handle redirects (e.g. it can forward `Authorization` headers on cross-origin redirects and is susceptible to DoS via redirect loops). For server-side rendering, use the default `fetch` backend instead of `withXhr()`.
  - **Verdict:** N/A — the project has no SSR and does not depend on `@angular/platform-server`.
- [x] **22.0.0-provide-routes-removed** — `provideRoutes()` has been removed. Use `provideRouter()` instead, or configure routes as a multi token using `ROUTES` if necessary. Update your application bootstrap configuration.
  - **Verdict:** N/A — `provideRoutes` appears in no file. The application already uses `provideRouter`.
- [x] **22.0.0-upgrade-angular-js-global-migration** — If using AngularJS interoperability, replace deprecated `getAngularLib()` and `setAngularLib()` with `getAngularJSGlobal()` and `setAngularJSGlobal()` respectively.
  - **Verdict:** N/A — no AngularJS interoperability. `getAngularLib` and `setAngularLib` appear in no file.
- [x] **22.0.0-remove-component-factory-resolver** — `ComponentFactoryResolver` and `ComponentFactory` are no longer available. Pass the component class directly to APIs like `ViewContainerRef.createComponent()` or use the standalone `createComponent()` function instead.
  - **Verdict:** N/A — `ComponentFactoryResolver` appears in no file.
- [x] **22.0.0-remove-create-ng-module-ref** — `createNgModuleRef` has been removed. Use `createNgModule()` instead for dynamic module creation scenarios.
  - **Verdict:** N/A — `createNgModuleRef` appears in no file.
- [x] **22.0.0-compile-time-duplicate-selectors** — Elements with multiple matching selectors now throw a compile-time error. Ensure your components use unique selectors and review any directives that might have conflicting selectors.
  - **Verdict:** N/A — this is now a compile-time error, and every build passes.
- [x] **22.0.0-component-onpush-default** — Components with no `changeDetection` property defined are now `OnPush` by default. To maintain `Eager` (the previous default) change detection, explicitly set `changeDetection: ChangeDetectionStrategy.Eager` in your component decorator.
  - **Verdict:** migration wrote an **opt-out**: `changeDetection: ChangeDetectionStrategy.Eager` on 20 components, 19 in the library and 1 in the showcase app. Listed in Migration opt-outs, decided at step 4.3.
- [x] **22.0.0-remove-check-no-changes** — `ChangeDetectorRef.checkNoChanges()` has been removed. In tests, use `fixture.detectChanges()` instead or verify your component state through other means.
  - **Verdict:** N/A — `checkNoChanges` appears in no file.
- [x] **22.0.0-leave-animations-scope-change** — Leave animations are no longer limited to the element being removed. They now support nested animations scoped to component boundaries. Review your animation configurations if you relied on the previous scoping behavior.
  - **Verdict:** behaviour changed, no code change. The library has one animation trigger, `transitionMessages`, which has an enter transition only and no leave transition. In the smoke test.
- [x] **22.0.0-params-inheritance-strategy-default** — `paramsInheritanceStrategy` now defaults to `"always"` instead of `"emptyOnly"`. This means route parameters are inherited from all parent routes. To restore the previous behavior, explicitly set `paramsInheritanceStrategy: "emptyOnly"` in your router configuration.
  - **Verdict:** behaviour changed, no code change. The default moved to `"always"`, and no migration wrote an opt-out. The showcase app has one nested `loadChildren` route. In the smoke test.
- [x] **22.0.0-can-match-current-snapshot-required** — The `currentSnapshot` parameter in `CanMatchFn` and the `canMatch` method of the `CanMatch` interface is now required. Update any class implementations of `CanMatch` to include this required third argument.
  - **Verdict:** N/A — no route declares `canMatch`, and no class implements `CanMatch`.
- [x] **22.0.0-hammer-js-removed** — Hammer.js integration has been removed from Angular platform-browser. If you need touch gesture support, implement your own gesture detection or use an alternative library.
  - **Verdict:** N/A — no Hammer.js integration. `hammer` appears in no file.
- [x] **22.0.0-app-ref-bootstrap-typing** — The second argument of `appRef.bootstrap()` no longer accepts `any` type. Ensure the element you pass is not nullable and matches the expected type.
  - **Verdict:** N/A — the application uses `bootstrapApplication`, never `appRef.bootstrap`.
- [x] **22.0.0-platform-browser-styles-removal** — Unused styles are now automatically removed when their associated `host` is dropped. Be aware that other DOM on the page may be affected if those styles are used by elements outside of Angular or if not using `ViewEncapsulation.Emulated`.
  - **Verdict:** behaviour changed, no code change. Every component in the library uses the default `ViewEncapsulation.Emulated`. In the smoke test.
- [x] **22.0.0-title-strategy-return-type** — The return type for `TitleStrategy.getResolvedTitleForRoute` has changed from `any` to a stricter type (e.g., `string | undefined`). Update your custom `TitleStrategy` implementations to match the new signature.
  - **Verdict:** N/A — no custom `TitleStrategy` implementation.
- [x] **22.0.0-incremental-hydration-default** — Incremental hydration is now the default behavior for applications using Server-Side Rendering (SSR). Review your application if you relied on the previous non-incremental hydration behavior. You can use `withNoIncrementalHydration()` to restore the previous behavior if needed.
  - **Verdict:** N/A — the project has no SSR, so hydration does not apply.
- [x] **22.0.0-full-template-type-check-removed** — The `fullTemplateTypeCheck` compiler option has been removed. Use `strictTemplates` instead to enable strict template type checking in your `tsconfig.json`.
  - **Verdict:** fixed — `fullTemplateTypeCheck: true` removed from the `angularCompilerOptions` of `tsconfig.json`. The migration did not do this; the option no longer exists in v22.
- [x] **22.0.0-strict-templates-default** — The `strictTemplates` compiler option now defaults to `true`. If your project was not using strict template type checking, you may see new compilation errors. Resolve these errors or explicitly set `strictTemplates: false` in your `tsconfig.json` to opt out.
  - **Verdict:** migration wrote an **opt-out**: `strictTemplates: false` in `tsconfig.app.json`, `tsconfig.spec.json` and `lib/tsconfig.lib.json`. Listed in Migration opt-outs, decided at step 4.3.
- [x] **22.0.0-webpack-builders-deprecated** — Webpack builders (`@angular-devkit/build-angular` and `@angular-devkit/build-webpack`) are now deprecated. Migrate to the `@angular/build` builders (esbuild/application) for your application builds.
  - **Verdict:** N/A — the workspace already uses the `@angular/build` builders: `@angular/build:application`, `:dev-server`, `:extract-i18n` and `:ng-packagr`. Neither deprecated webpack package is a dependency.
- [x] **22.0.0-ssr-commonengine-deprecated** — `CommonEngine` APIs from `@angular/ssr` are deprecated. Migrate to `AngularNodeAppEngine` or `AngularAppEngine` instead.
  - **Verdict:** N/A — `CommonEngine` appears in no file and `@angular/ssr` is not a dependency.
- [x] **22.0.0-istanbul-lib-instrument-optional** — `istanbul-lib-instrument` is now an optional peer dependency. If your project uses Karma with code coverage enabled, ensure `istanbul-lib-instrument` is explicitly installed.
  - **Verdict:** N/A — the project tests with `@angular-builders/jest:run`, not Karma. The `@angular/cli` migration for this checked and made no change.
- [x] **22.0.0-dev-server-port-env-priority** — `ng serve` now gives the highest priority to the `PORT` environment variable. This value overrides any port configured in `angular.json` or provided via the `--port` flag.
  - **Verdict:** behaviour changed, no code change. `npm start` runs `ng serve --port 4900`. A `PORT` environment variable now outranks that flag. Noted for the user.
- [x] **22.0.0-architect-cli-removed** — The `@angular-devkit/architect-cli` package is no longer available. Use the `architect` CLI tool from the `@angular-devkit/architect` package instead.
  - **Verdict:** N/A — `@angular-devkit/architect-cli` is not a dependency.
- [x] **22.0.0-experimental-test-builders-removed** — The experimental `@angular-devkit/build-angular:jest` and `@angular-devkit/build-angular:web-test-runner` test builders have been removed.
  - **Verdict:** N/A — the test target uses `@angular-builders/jest:run`. Neither removed experimental builder is referenced in `angular.json`.

## After you update

Nothing to do after the update.

_37 step(s) total._

## Changes made

### Hop 1 — 19.2 -> 20.3

One `ng update` call, with every Angular-lockstep package pinned to the v20 column of the matrix:

```
npx ng update @angular/core@20.3.28 @angular/cli@20.3.34 @angular/build@20.3.34 \
  @angular/common@20.3.28 @angular/compiler@20.3.28 @angular/compiler-cli@20.3.28 \
  @angular/forms@20.3.28 @angular/animations@20.3.28 @angular/router@20.3.28 \
  @angular/platform-browser@20.3.28 @angular/platform-browser-dynamic@20.3.28 \
  @angular/material@20.2.14 @angular/cdk@20.2.14 \
  ng-packagr@20.3.2 angular-eslint@20.7.0 @angular-builders/jest@20.0.0 \
  ngx-markdown@20.1.0 @kolkov/angular-editor@3.1.0 @ngxmc/datetime-picker@20.1.0
```

No `--force` was needed. The call resolved one consistent tree and ran every package's migrations.

**What the migrations changed by themselves**

| File | Change | Class |
| --- | --- | --- |
| `package.json` | 19 dependency bumps, plus `typescript` `~5.5.4` -> `~5.9.3`. The angular-eslint v20 migration also moved `eslint` to `^9.28.0` and `@typescript-eslint/*` to `^8.33.1`. | required |
| `tsconfig.json` | `moduleResolution` `node` -> `bundler`. Array formatting was expanded as a side effect. | required |
| `angular.json` | new `schematics` block that keeps the old file-naming style. | **opt-out** — see below |
| `lib/.../drag-n-drop-file-field.component.scss` | Material v20 token rename: `--mdc-icon-button-state-layer-size` -> `--mat-icon-button-state-layer-size`. | required |

Three optional migrations were offered and **not** run: `use-application-builder`,
`control-flow-migration` and `router-current-navigation`. They are listed under Follow-ups.

**Code changes the checklist required**

1. `rxResource` renamed `request` -> `params` and `loader` -> `stream`, with the destructured
   parameter renamed to match, at 4 sites:
   - `lib/src/lib/components/AbstractFormComponent.ts` — `controlValue`, `controlValid`, `groupValue`
   - `lib/src/lib/directives/form-field.directive.ts` — `groupValue`

2. `moduleResolution: bundler` honours the `exports` map of a package, so two deep imports stopped
   resolving. Both had a public replacement, so no suppression was needed:
   - `lib/src/lib/models/Lab900FormModuleSettings.ts` — `NgxMaskConfig` now comes from `ngx-mask`
     instead of `ngx-mask/lib/ngx-mask.config`. The root entry point re-exports it.
   - `lib/.../date-time-field/date-time-field.component.ts` — the deep import of
     `NgxMatSingleDateSelectionModel` is gone. See item 3.

3. `@ngxmc/datetime-picker` 19.2.2 -> 20.1.0 dropped its own date-adapter layer:
   - `lib/.../date-time-field.component.ts` — `NgxMatDateAdapter` replaced by `DateAdapter` from
     `@angular/material/core`, typed as `DateAdapter<unknown>`.
   - `lib/.../date-time-field.component.ts` — `NgxMatSingleDateSelectionModel` is no longer public.
     A local `PickerSelectionModel` interface now declares the two members the component reads
     (`selection` and `add`). No `any` was added; the pre-existing `as any` cast on the internal
     `_componentRef` path is unchanged.
   - `src/main.ts` — `provideNgxMatNativeDate()` removed. `provideNativeDateAdapter()` was already
     in the provider list, and it now serves both pickers.
   - `src/guides/getting-started.md` — the setup docs follow the same change. The note that Luxon is
     unavailable for the date-time picker is gone, because the Material adapter now covers it.
   - The template needed no change. Every binding it uses still exists.

4. `marked` added to `dependencies` at `^16.0.0`. `ngx-markdown@20.1.0` peers `marked@^15 || ^16`,
   but its type declarations use the generic `MarkedOptions<string, string>` and
   `MarkedExtension<string, string>` that only exist from v16. npm had **retained** 15.0.12, which still
   satisfied the peer range, and the application type check failed with 2 `TS2315` errors. This is a real
   fix, not a suppression. *(Removed again after the upgrade — see the Decisions table. `ng update` moved
   it to 18.0.9 at hop 2, and a clean resolve now reaches that version without the declaration.)*

5. `angular.json` — the dead `node_modules/marked/marked.min.js` entry removed from the `scripts`
   array. `marked@16` ships `lib/marked.umd.js` and no root `marked.min.js`, so the app build could
   not resolve it. The entry was already dead weight: `ngx-markdown` imports `marked` as an ES module
   and never reads a global. Mechanical, so it needed no question. All five `prismjs` entries were
   checked and still resolve.

6. `lib/tsconfig.lib.json` — `skipLibCheck: true` added, **temporary**, with the reason in a comment.
   See the Decisions table.

**Verify — all green**

| Check | Result |
| --- | --- |
| `npx tsc -p tsconfig.app.json --noEmit` | 0 errors |
| `npx tsc -p tsconfig.spec.json --noEmit` | 0 errors |
| `npx tsc -p lib/tsconfig.lib.json --noEmit` | 0 errors |
| `npx ng build forms` | pass |
| `npm run build:forms:prod` | pass |
| `npm run build` | pass, 2 pre-existing lodash CommonJS warnings |

Lint and tests do not run here. They run once after the last hop.

### Hop 2 — 20.3 -> 21.2, with the picker swap

This hop had to carry the swap. `@ngxmc/datetime-picker` has no Angular 21 release, and the fork peers
`@angular/*@^21`, so neither package can satisfy an intermediate state. The order was:

1. Point the source, the library peer and the docs at `@ngx-mce/datetime-picker`.
2. `npm uninstall @ngxmc/datetime-picker` — removes the `@angular/core@^20` peer that would otherwise
   block the Angular 21 install.
3. `npx ng update --allow-dirty @angular/core@21.2.20 @angular/cli@21.2.21 @angular/build@21.2.21 …`
   with every lockstep package pinned, plus `jest-preset-angular@17.0.0`, `ng-mocks@14.17.1`,
   `ngx-mat-select-search@9.0.0`, `ngx-markdown@21.3.0`, `angular-eslint@21.4.0`,
   `@angular-builders/jest@21.0.4`, `ng-packagr@21.2.7`. `--allow-dirty` was needed because step 1 and
   step 2 had already changed the tree. No `--force` was needed.
4. `npm install @ngx-mce/datetime-picker@21.3.3`.

**What the migrations changed by themselves**

| File | Change | Class |
| --- | --- | --- |
| `package.json` | Angular to 21.2.x, and `marked` `^16.4.2` -> `^18.0.9`. `ng update` did that bump on its own, which is what follow-up 3 of hop 1 asked for. | required |
| `tsconfig.json`, `lib/tsconfig.lib.json` | `lib` array modernised to `es2022`. | required |
| `src/main.ts` | `provideZoneChangeDetection()` added to the providers. v21 requires it for a zone-based application, so it is **not** an opt-out. | required |

No new opt-out was written in this hop.

**The picker swap**

| Item | Before | After |
| --- | --- | --- |
| `package.json` dependency | `@ngxmc/datetime-picker: ~19.2.2` | `@ngx-mce/datetime-picker: ~21.3.3` |
| `lib/package.json` peer | `@ngxmc/datetime-picker: ~19.2.2` | `@ngx-mce/datetime-picker: ~21.3.3` |
| `date-time-field.component.ts` import | `@ngxmc/datetime-picker` | `@ngx-mce/datetime-picker` |
| `src/guides/getting-started.md` | `@ngxmc/datetime-picker` | `@ngx-mce/datetime-picker` |

The import specifier was the only code change. All 7 symbols, the template and the internal
`_componentRef.instance._model` path are identical in the fork, exactly as the assessment predicted.
npm's caret default was changed back to a tilde, to keep the operator the original author used.
`node_modules/@ngxmc` is gone after the install.

**The temporary `skipLibCheck` is removed**

`lib/tsconfig.lib.json` no longer sets `skipLibCheck`, and the comment went with it. The library type
check and both library builds pass without it, which proves the 2 `TS2416` errors came from
`@ngxmc/datetime-picker@20.1.0` alone. The decision is closed.

**Code changes the checklist required**

Angular Material v21 removed the `matFormFieldAnimations` export, which broke 3 components:

- `checkbox-field.component.ts`
- `drag-n-drop-file-field.component.ts`
- `repeater-field.component.ts`

All three bind `[@transitionMessages]="controlValid() ? 'void' : 'enter'"` in their templates, so the
animation is live and could not simply be dropped. All three also render Material's subscript wrapper
by hand (`class="mat-mdc-form-field-subscript-wrapper"`) rather than using a `mat-form-field`, so
Material's own styling does not cover them either.

The trigger now lives in the library, in a new file `lib/src/lib/utils/form-field.animations.ts`. Its
definition was read out of `@angular/material@20.2.14` and reproduced exactly — same trigger name, same
states, same `300ms cubic-bezier(0.55, 0, 0.55, 0.2)` timing — so the templates and the visible
behaviour are unchanged. It is internal and is not added to `public-api.ts`.

Material had already marked that export `@deprecated No longer used` with `@breaking-change 21.0.0`, so
Material's own form fields stopped animating their messages in v20. Matching that by dropping the
animation would be a visual change nobody asked for, so it is a follow-up, not part of this hop.

**Superseded after the upgrade.** Follow-up 7 was done. The trigger is now a CSS keyframe animation in
`lib/src/lib/styles/_form-field-subscript.scss`, and `@angular/animations` is gone from the project.
One statement above is wrong: Material did not stop animating its messages. It replaced the trigger
with the CSS animation `_mat-form-field-subscript-animation`, at the same timings. See Follow-up 7.

**Verify — all green**

| Check | Result |
| --- | --- |
| `npx tsc -p tsconfig.app.json --noEmit` | 0 errors |
| `npx tsc -p tsconfig.spec.json --noEmit` | 0 errors |
| `npx tsc -p lib/tsconfig.lib.json --noEmit` | 0 errors, without `skipLibCheck` |
| `npx ng build forms` | pass |
| `npm run build:forms:prod` | pass |
| `npm run build` | pass |

### Hop 3 — 21.2 -> 22.1

One `ng update` call. The picker only needed a version bump this time, so it went in the same call:

```
npx ng update @angular/core@22.1.2 @angular/cli@22.1.4 @angular/build@22.1.4 … \
  @angular/material@22.1.2 @angular/cdk@22.1.2 ng-packagr@22.1.1 angular-eslint@22.1.0 \
  @angular-builders/jest@22.0.1 ngx-markdown@22.0.0 @ngx-mce/datetime-picker@22.2.3 \
  @typescript-eslint/eslint-plugin@8.58.0 @typescript-eslint/parser@8.58.0
```

No `--force` was needed. The call ran past the 10 minute foreground limit and finished in the
background with exit code 0. `ng update` also bumped `jest` to `^30.4.2` on its own, pulled in by
`@angular-builders/jest@22`.

**What the migrations changed by themselves**

| File(s) | Change | Class |
| --- | --- | --- |
| `package.json` | Angular to 22.1.x, typescript to `~6.0.3`, jest to `^30.4.2` | required |
| 29 files, 63 occurrences | `$safeNavigationMigration()` wrappers around optional-chain expressions | **opt-out** |
| 20 components | `changeDetection: ChangeDetectionStrategy.Eager` | **opt-out** |
| `tsconfig.app.json`, `tsconfig.spec.json`, `lib/tsconfig.lib.json` | `strictTemplates: false` | **opt-out** |
| all 4 tsconfigs | `extendedDiagnostics` suppressing `nullishCoalescingNotNullable` and `optionalChainNotNullable` | **opt-out**, removed — see below |
| `src/main.ts` | `provideHttpClient()` -> `provideHttpClient(withXhr())` | **opt-out** |

Two optional migrations were offered and **not** run: `migrate-karma-to-vitest` (not applicable, the
project uses jest) and `use-application-builder`. `@angular-builders/jest` also printed three advisory
notes; they are under Follow-ups.

**A contradiction between two v22 migrations**

Two migrations of the same major wrote settings that the compiler rejects together:

```
error NG4003: Angular compiler option "extendedDiagnostics" is configured, however "strictTemplates" is disabled.
```

The `extendedDiagnostics` block was the one to go, in all 4 tsconfigs. Neither
`nullishCoalescingNotNullable` nor `optionalChainNotNullable` can fire while `strictTemplates` is off,
so the block was dead weight as well as illegal. `lib/tsconfig.lib.prod.json` had received nothing but
that block, so its whole `angularCompilerOptions` key is gone and the file is back to its original
shape. The hop was **not** reverted, as the skill requires. If step 4.3 turns `strictTemplates` back
on, that decision has to revisit these two diagnostics.

**Code changes the checklist and TypeScript 6.0 required**

1. `tsconfig.json` — `fullTemplateTypeCheck: true` removed from `angularCompilerOptions`. v22 removed
   the option, and no migration cleaned it up.
2. `tsconfig.json` — `baseUrl: "./"` removed. TypeScript 6.0 reports it as deprecated
   (`TS5101`), and `paths` has resolved relative to the tsconfig since TypeScript 5.0. Adding
   `ignoreDeprecations` would have been a suppression, so it was not used. Two follow-on fixes were
   needed, because `baseUrl` had been load-bearing:
   - `tsconfig.json` and `tsconfig.spec.json` — the `paths` value became `./dist/@lab900/forms`.
     Without `baseUrl`, a non-relative `paths` value is an error (`TS5090`).
   - `src/app/modules/showcase-forms/showcase-forms.constants.ts` — `import packageInfo from
     'lib/package.json'` became `'../../../../lib/package.json'`. That import had resolved only
     through `baseUrl`.

**Verify — all green**

| Check | Result |
| --- | --- |
| `npx tsc -p tsconfig.app.json --noEmit` | 0 errors |
| `npx tsc -p tsconfig.spec.json --noEmit` | 0 errors |
| `npx tsc -p lib/tsconfig.lib.json --noEmit` | 0 errors |
| `npx ng build forms` | pass |
| `npm run build:forms:prod` | pass |
| `npm run build` | pass |

### Step 4.1 — tests

`npm test` failed twice before it ran a single test. Both were runner configuration, so no test code was
touched.

**1. The builder dropped two options.**

```
● Unrecognized CLI Parameters:
  Following options were not recognized:
  ["polyfills", "inlineStyleLanguage"]
```

`@angular-builders/jest@22` no longer accepts `polyfills` or `inlineStyleLanguage`. It replaced them
with a single `zoneless` option that **defaults to `true`**. This project uses zone change detection —
hop 2's migration added `provideZoneChangeDetection()` — so the `test` target in `angular.json` now
reads:

```json
"options": {
  "tsConfig": "tsconfig.spec.json",
  "zoneless": false
}
```

The builder wires the zone test environment itself, so `setup-jest.ts` stays empty. Note the `polyfills`
entry in the **build** target is untouched: `@angular/build:application` still accepts it.

**2. The preset stopped installing the jsdom environment.**

```
● Validation Error:
  Test environment jest-environment-jsdom cannot be found.
```

`jest-preset-angular@17` dropped `jest-environment-jsdom`. It now depends on
`@jest/environment-jsdom-abstract`, peers `jsdom >= 26.0.0` (30.0.1 is installed) and ships its own
environment at `environments/jest-jsdom-env`. Its base preset still asks for the `'jsdom'` shorthand,
which Jest resolves to the package that is no longer there. `jest.config.js` now names the shipped
environment instead, which needs no new dependency:

```js
testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
```

**Result: 4 suites passed, 32 tests passed, 0 failed.** No test file was edited.

One warning remains, and it is not a failure: ts-jest reports that its own `isolatedModules` option is
deprecated and asks for `isolatedModules: true` in `tsconfig.spec.json`. The builder sets that option,
not this project. It is under Follow-ups.

## Migration opt-outs

| Opt-out | Class | Sites | Decision |
| --- | --- | --- | --- |
| `schematics` block in `angular.json` that keeps the old file-naming style (`type: "component"`, `typeSeparator: "."`) | generator defaults | 1 block, 8 schematic entries, `angular.json` | **kept, not asked** — see Follow-up 13. Affects only future `ng generate` output. |
| `strictTemplates: false` | strictness flag | 3 files: `tsconfig.app.json`, `tsconfig.spec.json`, `lib/tsconfig.lib.json` | **removed** — enabled everywhere, all 76 errors fixed |
| `$safeNavigationMigration()` wrapper around optional-chain expressions | expression wrapper | 29 files, 63 occurrences: 23 files / 56 in `lib/src`, 6 files / 7 in `src` | **removed** — all 63 gone, 2 sites given an explicit value after validation |
| `changeDetection: ChangeDetectionStrategy.Eager` | behaviour default on a class | 20 components: 19 in `lib/src`, 1 in `src` | **kept** by decision. Causes all 20 lint errors, reported not hidden. |
| `provideHttpClient(withXhr())` | behaviour default | 1 site, `src/main.ts` | **kept, not asked** — see Follow-up 11. Evidence says it is unnecessary, but removing it changes the HTTP backend, so it was not done unasked. |
| `extendedDiagnostics` suppressing `nullishCoalescingNotNullable` and `optionalChainNotNullable` | strictness flag | 4 files | **removed at hop 3** — the compiler rejects it together with `strictTemplates: false` (NG4003), and the checks cannot fire while `strictTemplates` is off |

The block is an escape hatch written by the `@angular/cli` v20 migration. It changes nothing that
exists today; it only decides how `ng generate` names new files. It causes no lint error.

Not an opt-out, recorded here so the reader does not mistake it for one:

- `lib/tsconfig.lib.json` `skipLibCheck: true` — added by this run, not by a migration, with a
  recorded answer in the Decisions table. It is time-boxed to hop 1 and removed at hop 2.

## After the checkpoint

### `refactor: use inject() instead of constructor injection`

**Symptom.** 17 `@angular-eslint/prefer-inject` lint errors across 5 files.

**Cause.** Not a code change. The rule is absent from `@angular-eslint/eslint-plugin@19.2.1`'s
`recommended.json`, which carries only 13 rules, and `eslint.config.js` extends
`angular.configs.tsRecommended`. The upgrade to `angular-eslint@22.1.0` therefore enabled a rule the
existing constructor injections had never been measured against.

**Fix.** `ng generate @angular/core:inject`, the schematic Angular ships for exactly this. It rewrote 10
files, 5 in the library and 5 in the showcase app. The diff was reviewed rather than trusted:

- Injected dependencies became field initializers, so they are assigned before the constructor body
  runs. `auth-image.directive.ts` matters most here, because its constructor body creates an `effect()`
  that reads both injected members. The order is still correct.
- `form-dialog.component.ts` lost its `@Inject(MAT_DIALOG_DATA)` decorator in favour of
  `inject<DialogFormData<T>>(MAT_DIALOG_DATA)`, and `MatDialogRef` likewise. Equivalent.
- The injected fields are placed before the other instance fields, which still satisfies the project's
  `@typescript-eslint/member-ordering` rule.

**Result.** All 17 errors gone. 3 type checks at 0 errors, all 3 builds pass, 32 tests pass. Lint is
down to the 20 errors from the kept `Eager` opt-out.

### `refactor: enable strictTemplates and fix the template types`

**Symptom.** `strictTemplates: true` in all 3 tsconfigs produced 67 errors in 26 library files and 3 in
the showcase app.

**Cause.** Not the `?.` change. TypeScript has always typed `a?.b` as `T | undefined`; what changed is
that `strictTemplates` checks **input binding types**, which the project's previous
`fullTemplateTypeCheck: true` never did. So every `_options()?.x` bound to a Material input that declares
`x` or `x | null` became an error at once.

**Fix.** No `any`, no `$any()`, no suppression, and no `!` assertion — `attribute?` really is optional in
`FormFieldBase`, so an assertion would have been a lie. Six patterns:

1. **`?? null` where the target accepts null** — `[max]`, `[min]`, `[value]`, `[displayWith]`.
2. **`?? <neutral default>` where the target is not nullable** — `?? ''` for `formControlName`,
   `formArrayName`, labels and tooltips; `?? false` for booleans; `?? 'after'` for `labelPosition`,
   which is Material's own default.
3. **Non-null function defaults** — `dateClass` and `matDatepickerFilter` are declared non-nullable by
   Material and by the picker. New computeds fall back to `() => ''` (adds no class) and `() => true`
   (filters nothing).
4. **`@let` before `@if` so narrowing sticks** — a signal call is not narrowed by an enclosing `@if`,
   because each call is a fresh expression. `date-range-field`, `form-row`, `form-column`,
   `search-field` and the multi-language example now bind narrowed `@let` locals.
5. **Typed casts in the component, not the template** — `startControl` / `endControl` return
   `FormControl | null`, and `repeaterRows` returns `UntypedFormGroup[]`.
6. **Host listener arguments** — Angular type-checks them now, and `$event.target` is
   `EventTarget | null`. `amount-input.directive.ts` and `search-input.directive.ts` gained thin
   `onInputEvent` / `onFocusEvent` / `onBlurEvent` / `onPasteEvent` methods that read the element in
   typed TypeScript and delegate. **The existing public handlers keep their exact signatures**, so the
   published API is unchanged.

`defaultTime` on the picker is declared `number[]` but defaults to `null` at runtime, and is read as
`defaultTime()?.[i]` with a truthiness check per element. `?? []` is therefore type-correct and
behaviour-identical; that was verified in the package's own bundle before choosing it.

**Real defects this surfaced.** `strictTemplates` did not only cost work, it found bugs:

| File | Defect | Now |
| --- | --- | --- |
| `button-toggle-field.component.html:22` | `id="mat-button-toggle-{{ elementId }}"` interpolated the **function**, not its value (`NG8109`, `NG8117`) | `{{ elementId() }}` |
| `button-toggle-field.component.html:29` | `<lab900-icon [icon]="value.icon">` rendered with `undefined` whenever a button option had no icon, because `!value?.icon?.position` is true in that case | guarded on `@let icon` |
| `autocomplete-multiple-field.component.html:20` | a bare `matAutocomplete` attribute sat next to the real `[matAutocomplete]="auto"` binding, typing as `string` | the redundant attribute removed |
| `auth-image.directive.ts:15` | `httpCallback` was typed `Observable<Blob>`, but `fetchImageBase64` accepts and converts `ArrayBuffer`, and the showcase passes `responseType: 'arraybuffer'` | widened to `Observable<Blob \| ArrayBuffer>` |
| `mat-range-slider-field.component.ts:67` | `formatValue(undefined)` fell through to `` `${value}` `` and rendered the string `"undefined"` into the input | parameter widened, returns `''` |
| `app.component.html:29` | `[mode]="sideNavMode$ \| async"` bound `null` before the first emission | `?? 'side'` |

**Public API changes, both widening only:** `AuthImageDirective.httpCallback` accepts a callback
returning `ArrayBuffer` as well as `Blob`, and `MatRangeSliderFieldComponent.formatValue` accepts
`number | undefined`. Neither breaks an existing caller.

**Behaviour changes that need eyes.** All are in the smoke test:

- `form-row` and `form-column` now render nothing when the resolved group is missing, instead of
  rendering a field with an undefined `group`. In practice the group always resolves.
- `search-field` renders nothing without `options`, whose `searchFn` and `labelFormatter` are required.
- The two cases in the defect table that stop rendering something broken.

**The probe.** `lib/tsconfig.lib.json` sets `skipTemplateCodegen: true`, which could have silenced the
flag, so it was tested rather than assumed. `[max]="maxDate() ?? null"` in `date-field.component.html`
was reverted to `[max]="maxDate()"`, the build reported exactly
`date-field.component.html:12:8 - error TS2322: Type 'Date | undefined' is not assignable to type
'Date | null'` and failed, and the probe was then reverted. `strictTemplates` is genuinely in effect on
the published build path.

**Formatting.** 7 templates tripped `prettier/prettier` after the edits, so prettier was run on exactly
those 7 files. It removed the parentheses in `(a ?? '') | translate`; that is safe, because Angular's
pipe operator has the lowest precedence, so `a ?? '' | translate` parses the same way.

**Result.** 3 type checks at 0 errors, all 3 builds pass, 32 tests pass. `strictTemplates: false` is gone
from all 3 tsconfigs, and the `extendedDiagnostics` block stayed out — the remaining `NG8107` / `NG8102`
reports are warnings, not errors, and are listed under Follow-ups.

### `refactor: drop the $safeNavigationMigration() wrappers`

The user asked for validation before removal, rather than a removal on trust. This is what the
validation found.

**What the wrapper actually does.** Read out of `@angular/compiler`, not assumed. There are two
handlers, and they behave differently:

| Stage | Handling | Consequence |
| --- | --- | --- |
| Type checking | `$safeNavigationMigration(x)` is emitted into the type-check block as plain `(x)` | **The wrapper is invisible to the type checker.** It changes no type. |
| Code generation | `convertSafeNavigationMigrationCall` rewrites it to a `SafeNavigationMigrationExpr` | The enclosed `?.` yields `null` instead of v22's `undefined`. |

Two conclusions follow, and both matter:

1. **Removing a wrapper can never produce a type error**, so the compiler offers no safety net here. Any
   claim of "the build is green, so removal is safe" would be worthless.
2. Because `strictTemplates` is now on and the checker already sees the *unwrapped*
   `T | undefined` at all 42 sites, **`undefined` is already type-legal at every one of them**. Every
   target input declares a type that admits `undefined`.

So the only real question is runtime semantics: does any consumer distinguish `null` from `undefined`?
Each of the 42 sites was classified by what receives the value.

**Safe — 40 sites.** Nothing distinguishes the two:

- 14 × `@let hint = _options()?.hint`, consumed only through `!!hint?.value` and `hint?.x` truthiness.
- Truthiness-only inputs: `[mask]`, `[patterns]`, `[matDatepickerFilter]`, `[dateClass]`,
  `[buttonColor]`, `[type]`, `[color]`, `[containerClass]`, `[buttonId]`, `[multiple]`, `[filePath]`,
  `[fileDir]`.
- `[disabled]` on `mat-option`, which runs through `booleanAttribute`; `booleanAttribute(null)` and
  `booleanAttribute(undefined)` are both `false`.
- `[value]` on `mat-option`, an `any` input used for identity comparison.
- `[value]` on the two `matSliderStartThumb` / `matSliderEndThumb` inputs, which run through
  `numberAttribute`; both nullish values give `NaN`, which Material clamps identically.
- 3 × `(searchRef?.x$ | async) === true`. `AsyncPipe` returns `null` for a nullish input either way, and
  the comparison is against `true`.
- 4 × `{{ … | json }}` in showcase examples. Cosmetic only: `JSON.stringify(null)` prints `null`,
  `JSON.stringify(undefined)` prints nothing. Showcase docs, not library behaviour.

**Not safe — 2 sites. Both were given an explicit value instead of a bare removal:**

| Site | Why the value matters | Fix |
| --- | --- | --- |
| `file-preview-field.component.html:8` `[accept]` | binds the DOM property `HTMLInputElement.accept`, a `DOMString`. A nullish value is stringified rather than ignored, so the accept filter became the literal text `"null"` before and would have become `"undefined"` after. Both are wrong. | `?? ''` — empty accept, which is the real "no filter" value. This also fixes a pre-existing bug. |
| `select-field.component.html:50` `customerTriggerFn(...)` | the value is handed to a **consumer-supplied callback**, which may legitimately test `=== null`. Silently switching it to `undefined` would change a published contract. | `?? null`, keeping today's value explicitly and permanently. |

`[multiple]` on the same file input was also made explicit (`?? false`) while it was open, since it is
the sibling binding and `false` is its real default.

**Why this is better than keeping the wrappers.** `$safeNavigationMigration()` is a temporary migration
shim in the published templates. Replacing it with an explicit `?? null` at the one site that needs
`null` gives the same runtime behaviour, states the intent in the code, is visible to the type checker,
and does not depend on a shim Angular intends to remove.

**Result.** 42 wrappers gone, 0 remaining anywhere in `lib/src` or `src`. 3 type checks at 0 errors, all
3 builds pass, 32 tests pass. Lint is down to 20 problems — the 19 + 1 from the kept `Eager` opt-out and
one pre-existing unused-`eslint-disable` warning. Prettier was run on the 3 files it flagged afterwards.

### `chore: update the library peer ranges for v22`

Step 4.5. `ng update` never touches these. The table is under "Impact on the published library", including
the new `@angular/animations` peer and why it is not a new runtime requirement. The published
`dist/@lab900/forms/package.json` was read back after the build to confirm the ranges shipped.

### `chore: set the version to 22.0.0 and declare typescript-eslint`

**Version fields (step 4.6).** Both `package.json` files were `19.1.40`, and the Angular major installed
before the upgrade was 19. Equal majors mean the project follows the Angular version, so both are now
`22.0.0`. `lib` is not an npm workspace entry — ng-packagr builds it — so only the root version appears in
`package-lock.json`, and it agrees after the reinstall. The published
`dist/@lab900/forms/package.json` was checked and reads `22.0.0`.

**A latent break the version bump exposed.** Editing `package.json` forced npm to re-resolve, and the
install failed:

```
npm error While resolving: typescript-eslint@8.43.0
npm error Found: typescript@6.0.3
npm error Could not resolve dependency:
npm error peer typescript@">=4.8.4 <6.0.0" from typescript-eslint@8.43.0
```

This is the TypeScript peer conflict the gate predicted, in a package the gate could not see.
`eslint.config.js` does `require('typescript-eslint')`, the **meta** package, but the project never
declared it — it was merely hoisted out of `angular-eslint` and pinned at 8.43.0, which rejects
TypeScript 6. Hop 3 bumped `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` to 8.58.0,
but those are different packages and left the meta package behind. The existing tree kept working, so
nothing failed until a fresh resolve. Anyone deleting `node_modules` on the v22 branch would have hit it.

`typescript-eslint` is now declared in `devDependencies` at `^8.58.0`, whose peer is
`typescript >=4.8.4 <6.1.0`. That both fixes the install and declares a package the eslint config was
already importing. npm resolved 8.67.0, and lint still reports only the kept opt-out.

## Smoke test for the user

**No runtime behaviour in this upgrade was verified.** No browser was driven and no runtime pass is
claimed. Everything below needs a human. The runtime row of the Final state table stays
`not verified — handed to the user` until you report back.

Start the showcase:

```bash
npm run build:forms       # the app imports the library from dist/
npm start                 # http://localhost:4900
```

Watch the browser console for errors throughout. Then work through the list.

### A — the replaced date-time picker (highest risk)

1. Open the **date-time** field example. The field must render, and the calendar must open from the
   suffix toggle.
2. Open the picker **with the field empty**. It must preselect today's date. This walks an internal path
   (`_componentRef.instance._model`) that is not public API in the fork; it was verified to still exist
   in the bundle, but only a click proves it works.
3. Set a date **and a time**, press Save, and confirm the control value includes the time. Press Cancel
   on a second open and confirm nothing changes.
4. Confirm the seconds spinner appears or not, per the field's `showSeconds`, and that a configured
   `defaultTime`, `stepMinute` and `startView` still apply.
5. Check the **date**, **date-range** and **year-month** fields as well — all four share the Material
   date adapter that replaced the picker's own.

### B — CDK overlays now use the browser's native top layer (v21)

6. Open a **select** dropdown, an **autocomplete** panel, a **tooltip** and the **form dialog**. Each
   panel must paint above the page, and specifically above the showcase header, which carries
   `z-index: 10`. If anything now paints *behind* an overlay, the fix is
   `OVERLAY_DEFAULT_CONFIG` with `{usePopover: false}` — it was deliberately not set.
7. Inside the date-time picker, confirm the Cancel and Save buttons still respond. Overlays inside
   elements with their own click handlers are the classic regression here.

### C — the message animation moved into the library

8. Trigger a validation error on the **checkbox**, **drag-and-drop file** and **repeater** fields. The
   error text must fade and slide in, not appear instantly. That trigger used to come from Angular
   Material, which deleted it in v21; it is now defined in the library with Material's original 300 ms
   timing.

### D — things that now render nothing instead of rendering broken

9. Every **form row** and **form column** in the showcase must still render its fields. They are now
   skipped when the form group cannot be resolved.
10. The **search** field must still render. It is now skipped when its `options` are missing.
11. In **button-toggle**, options that have no icon must show only their label, with no empty icon gap.
    Options that do have an icon must show it on the correct side.

### E — the fields whose host listeners were rewired

12. **Amount** field: type a number, confirm the decimal limit still truncates, then blur and confirm it
    formats. Focus it again and confirm it switches to a raw number. **Paste** a formatted amount and
    confirm it parses.
13. **Search** field: type to search, confirm the spinner and the not-found hint appear, then **paste**
    a term and confirm the search fires.

### F — smaller behaviour changes

14. **File preview / upload**: open the file picker and confirm it filters to the configured `accept`
    types, and that multi-select matches the `multiple` option.
15. **Authenticated image** preview: confirm images still load through the `httpCallback`, which the
    showcase supplies with `responseType: 'arraybuffer'`.
16. **Range slider**: confirm both thumbs move and the two number inputs show values. With no value set
    the inputs must be **empty**, not the text `undefined`.
17. **Sidenav**: at desktop width the drawer must be `side`; narrow the window and it must become `over`.
18. **Nested routes**: `paramsInheritanceStrategy` now defaults to `"always"`, so a child route inherits
    parent route params. Click through the showcase navigation and confirm the right page loads.
19. **Autocomplete (multiple)**: confirm the panel opens and chips add and remove. A redundant bare
    `matAutocomplete` attribute was removed; the real binding remains.
20. **`ng serve` port**: `npm start` asks for port 4900. If a `PORT` environment variable is set, v22
    now lets it win over the flag.

## Impact on the published library

`@lab900/forms` is published from `lib/`. Everything a consumer sees is listed here.

### Peer ranges (step 4.5)

Each author's operator was kept. A peer whose major did not move was left alone.

| Peer | Before | After | Why |
| --- | --- | --- | --- |
| `@angular/animations` | *(not declared)* | *(still not declared — added, then removed again)* | Added at hop 3, then dropped after the upgrade when the trigger became CSS. See the note below. |
| `@angular/common` | `">=19.0.0"` | `">=22.0.0"` | major moved |
| `@angular/core` | `">=19.0.0"` | `">=22.0.0"` | major moved |
| `@angular/material` | `">=19.0.0"` | `">=22.0.0"` | major moved |
| `@angular/forms` | `">=19.0.0"` | `">=22.0.0"` | major moved |
| `@kolkov/angular-editor` | `"3.0.0-beta.0"` | `"3.1.0"` | pinned to the installed release, leaving the prerelease behind |
| `ngx-mat-select-search` | `"^8.0.0"` | `"^9.0.0"` | major moved |
| `@ngx-mce/datetime-picker` | `"~19.2.2"` (as `@ngxmc/…`) | `"~22.2.3"` | **package replaced**, see below |
| `@ngx-translate/core` | `">=16.0.4"` | unchanged | still 16.0.4 |
| `@lab900/ui` | `">=19.0.1"` | `">=22.0.0"` | **Breaking.** 19.x is compiled for Angular 19 and crashes at runtime on Angular 22. See Follow-up 17. |
| `ngx-mask` | `"^19.0.6"` | unchanged | still 19.0.7, major did not move |

**About the `@angular/animations` peer.** Hop 3 added it. Angular Material removed
`matFormFieldAnimations` in v21, so the trigger definition moved into this library and the
`@angular/animations` import became direct instead of transitive. The peer only stated a requirement
that was already implicit: three components had always used a `[@transitionMessages]` trigger, which
had always needed the animation engine and therefore `provideAnimations()` in the consuming
application.

Follow-up 7 then removed both. The trigger is now a CSS keyframe animation, so consumers no longer
need `@angular/animations` and no longer need `provideAnimations()` for this library. The peer range
ends where it started: not declared. **This drops a requirement, so it breaks no consumer.** A consumer
that still calls `provideAnimations()` for its own reasons is unaffected.

### The date-time picker was replaced

Consumers must change their own dependency and their setup:

| | Before | After |
| --- | --- | --- |
| Package | `@ngxmc/datetime-picker@~19.2.2` | `@ngx-mce/datetime-picker@~22.2.3` |
| Date adapter | `provideNgxMatNativeDate()` from the picker | `provideNativeDateAdapter()` from `@angular/material/core` |

`@ngxmc/datetime-picker` stopped at Angular 20. `@ngx-mce/datetime-picker` is the maintained fork of the
same upstream project, with an identical public API. `src/guides/getting-started.md` is updated.

### Behaviour and API changes a consumer sees

| Change | Effect |
| --- | --- |
| Components are `ChangeDetectionStrategy.Eager` | explicit now, but the same behaviour as before v22. A consumer sees no change. |
| `strictTemplates` is on for the library build | affects this library's own build, not a consumer's. |
| `AuthImageDirective.httpCallback` | widened to `Observable<Blob \| ArrayBuffer>`. Existing callbacks still fit. |
| `MatRangeSliderFieldComponent.formatValue` | widened to accept `number \| undefined`, and returns `''` instead of the string `"undefined"`. |
| `AmountInputDirective`, `SearchInputDirective` | new `onInputEvent` / `onFocusEvent` / `onBlurEvent` / `onPasteEvent` host handlers. The existing public methods keep their signatures. |
| `select-field` custom trigger callback | still receives `null`, not `undefined`, when there is no control. Made explicit rather than left to a migration shim. |
| `file-preview-field` file input | `accept` is now `''` when unset, instead of a stringified nullish value. |
| Empty icons no longer render | `button-toggle-field` skipped an icon element when a button option had none. |
| `form-row`, `form-column`, `search-field` | render nothing when their required group or options are missing, instead of rendering a broken field. |

## Follow-ups

Open after hop 1:

1. ~~**Remove the `skipLibCheck` in `lib/tsconfig.lib.json`** at hop 2, right after the picker swap.
   Prove the library build stays green without it.~~ Done in the hop 2 commit,
   `chore: update Angular to v21 and replace the date-time picker`. The library type check and both
   library builds pass without it.
2. **Three optional v20 migrations were not run.** Each is a separate piece of work, and none is
   needed for the upgrade:
   - `ng update @angular/cli --name use-application-builder` — moves the application build to the
     new build system.
   - `ng update @angular/core --name control-flow-migration` — converts templates to block control
     flow. Verified as a no-op: `*ngIf`, `*ngFor` and `*ngSwitch` appear in no file, and 33 templates
     already use `@if` / `@for`.
   - `ng update @angular/core --name router-current-navigation` — replaces `Router.getCurrentNavigation`
     with the signal. Verified as a no-op: `getCurrentNavigation` appears in no file.
3. ~~**`marked` needs another bump at hop 2.** `ngx-markdown@21.3.0` and `@22.0.0` peer
   `marked@^17 || ^18`, so `^16` does not span the remaining hops. No single version does.~~ Done in the
   hop 2 commit. `ng update` moved it to `^18.0.9` on its own, which also spans hop 3.
7. ~~**The message animation could follow Material instead.** `lib/src/lib/utils/form-field.animations.ts`
   keeps the animation Material removed in v21. Material's own form fields no longer animate their
   messages. Dropping the trigger and the 3 `[@transitionMessages]` bindings would match Material, and
   would drop one use of `@angular/animations` from the library. It is a visual change, so it is not
   part of this upgrade.~~ Done after the upgrade, in the commit that removed `@angular/animations`.

   **The premise was wrong, and checking it made the change safe.** Material did not stop animating its
   messages. `@angular/material@22.1.2` ships a plain CSS keyframe animation,
   `_mat-form-field-subscript-animation`, gated behind the class `mat-form-field-animations-enabled`,
   with exactly the values the old trigger used: `opacity 0 -> 1`, `translateY(-5px) -> 0`, `300ms`,
   `cubic-bezier(0.55, 0, 0.55, 0.2)`. Material converted the animation; it did not delete it.

   So this was not a visual change after all. The same keyframes now live in
   `lib/src/lib/styles/_form-field-subscript.scss`, which the 3 component stylesheets `@use`. Each
   `[@transitionMessages]="controlValid() ? 'void' : 'enter'"` became
   `[class.lab900-subscript-enter]="!controlValid()"`. Adding the class replays the animation, exactly
   as re-entering the `enter` state did. `checkbox-field.component.css` became `.scss` so it could
   `@use` the partial.

   Removed with it: `lib/src/lib/utils/form-field.animations.ts` (internal, never in `public-api.ts`),
   `provideNoopAnimations()` in `testing/testing.providers.ts`, `provideAnimations()` in `src/main.ts`,
   the `@angular/animations` peer in `lib/package.json`, and the `@angular/animations` dependency in
   `package.json`. Nothing else in the project or in `node_modules` imports the package;
   `@angular/platform-browser` peers it optionally, so it is now absent from `node_modules` entirely.

   Verified: library build, app build and `ng test` (32 tests, 4 suites) all pass, and `ng lint` reports
   the same 20 pre-existing problems as before the change. The built bundle shows Angular scoping the
   keyframes per component (`_ngcontent-%COMP%_lab900-form-field-subscript`), so the 3 copies cannot
   collide.
4. **lodash is bundled as CommonJS.** The app build warns that `lodash` used by
   `dist/@lab900/forms/fesm2022/lab900-forms.mjs` is not ESM, and the same for `lodash/cloneDeep` in
   `@lab900/ui`. This predates the upgrade — lodash has always been CommonJS. Switching the library to
   `lodash-es` changes what consumers bundle, so it is out of scope here.
5. **Pre-existing suspected bug, untouched.** In `AbstractFormComponent.ts` and
   `form-field.directive.ts` the streams open with `defer(() => of(params.getRawValue))`, which emits
   the *function* rather than calling it. Every other line calls `getRawValue()`. Only the property
   names were renamed for v20; the behaviour was left exactly as it was.
6. ~~**`fullTemplateTypeCheck` is removed in v22.** `tsconfig.json` sets
   `angularCompilerOptions.fullTemplateTypeCheck: true`. v22 removes the option and defaults
   `strictTemplates` to `true`, so hop 3 must handle both.~~ Done in the hop 3 commit. The option is
   removed, and `strictTemplates: false` is now a recorded opt-out awaiting step 4.3.
8. **Three advisories from `@angular-builders/jest@22`**, printed during the hop 3 migration and not
   acted on:
   - ts-jest `isolatedModules` now defaults to `true`. A `const enum` used across files, or a type-only
     re-export without the `type` modifier, now errors. Step 4.1 shows whether this project trips it.
   - a TypeScript jest config is now loaded with jiti instead of ts-node, and is no longer type-checked
     at load time. This project uses `jest.config.js`, so it does not apply.
   - per-project coverage now writes to `<projectRoot>/coverage` instead of `./coverage` for the `forms`
     project. Any CI step that reads a hardcoded `./coverage/` path needs updating.
9. **`baseUrl` is gone, so non-relative imports no longer resolve.** One import used it
   (`showcase-forms.constants.ts`) and is now relative. Any new code must use relative paths or a
   `paths` entry.

Opened at the checkpoint, and **not** decided, because the step allows four questions at most and these
four were the smaller items. Nothing was removed or changed for any of them:

10. **The 20 `prefer-on-push` lint errors stand by decision.** Removing
    `ChangeDetectionStrategy.Eager` from the 20 components makes lint green and adopts the v22 default,
    but changes change detection on 19 published components. That needs the click-through in the smoke
    test, so it belongs in its own change, not in an upgrade. The Decisions table records the choice.
11. **`provideHttpClient(withXhr())` is very likely unnecessary.** The v22 migration added it to
    `src/main.ts` to keep the XHR backend. The evidence says nothing needs it: `reportProgress` appears
    in no file, and every HTTP call in the project is a `get` — the translation loader, `FileService`,
    the file-upload example and the openlibrary lookup. Removing it would move the app to the default
    `fetch` backend. It is a one-line change plus a smoke test of the showcase's HTTP.
12. **`@angular/platform-browser-dynamic` looks unused.** It is declared in `dependencies` and bumped to
    22.1.2, but no file under `lib/src` or `src` imports it, and `jest-preset-angular@17` explicitly
    dropped it from its peers. Removing it is a change to the published dependency set, so it needs a
    decision and a check that no installed package still requires it.
13. **The `angular.json` `schematics` opt-out is still in place.** The `@angular/cli` v20 migration wrote
    a block that keeps the old file-naming style (`type: "component"`, `typeSeparator: "."`). It affects
    only what `ng generate` names new files, changes nothing that exists, and causes no lint error.
    Removing it means new files follow the v20+ naming.

Smaller items:

14. **13 extended-diagnostic warnings in the library build**, 12 × `NG8107` (`?.` on a value that is not
    nullable) and 1 × `NG8102` (`??` on a value that is not nullable), across 8 files. They are warnings
    and do not fail the build. Each is a redundant `?.` or `??` that can simply be deleted, which is a
    small tidy-up now that `strictTemplates` proves the operand is not nullable. The v22 migration wanted
    to suppress these; the suppression was removed instead, because the compiler rejects it together with
    `strictTemplates: false` and because the reports are useful.
15. **ts-jest deprecation warning.** ts-jest reports that its own `isolatedModules` option is deprecated
    and will be removed in its v30, and asks for `isolatedModules: true` in `tsconfig.spec.json`. The
    option is set by `@angular-builders/jest`, not by this project. Setting it in the tsconfig would also
    enforce the stricter TypeScript rule, so it deserves its own check.
16. **Pre-existing prettier drift, untouched.** `prettier --check .` also flags `CHANGELOG.md` and
    `lib/src/lib/components/form-fields/icon-field/icon-field.component.scss`. Neither was touched by
    this upgrade, and prettier was already at 3.6.2 before it, so this drift predates the work. Only the
    files this upgrade edited were formatted.

Found after the upgrade:

17. ~~**`@lab900/ui@19.2.3` crashes at runtime on Angular 22.**~~ Fixed after the upgrade, by moving to
    `@lab900/ui@22.0.0`.

    **What it looked like.** Every showcase page logged `ERROR TypeError: (void 0) is not a function`,
    three times per page. Angular's `ErrorHandler` printed it with no useful stack, so it was easy to
    read as noise. It was not noise: the nav items in the sidebar were silently losing their
    `nav-item--depth-N` class on every change detection run.

    **Root cause.** `@lab900/ui@19.2.3` is compiled for Angular 19. Its templates call the compiler
    instruction `ɵɵclassMapInterpolate1`, which `@angular/core@22` no longer exports, so the call
    resolves to `undefined`. It is used 4 times, in the `alert`, `nav-item`, `tab` and `table`
    components. The same package also calls `ɵɵpropertyInterpolate` once, which v22 also dropped.

    **Why the dependency check missed it.** The hop table above marked `@lab900/ui` **OK** at every hop,
    because the check asked whether the declared range still resolved. `^19.0.0` resolves fine on
    Angular 22. It never asked whether the resolved build was *compiled* for the target Angular. A
    package whose peers say `@angular/core: ">=19.0.0"` claims compatibility it cannot have, because
    Angular's private instruction set is not stable across majors. **The lesson: for a package that
    ships compiled Angular templates, a satisfied peer range proves nothing. Only a runtime check
    does.** Nothing in the type check, the builds or the tests catches this — it only appears in a
    browser.

    **The fix.** `@lab900/ui@22.0.0` was published and peers `@angular/core: ">=22.0.0"`. Bumped the
    dependency to `^22.0.0` and the `lib/package.json` peer to `">=22.0.0"`. The old range
    `">=19.0.1"` allowed a combination that is known broken, so narrowing it is correct even though it
    breaks consumers still on `@lab900/ui@19`. The upgraded package uses neither removed instruction.

    **Verified.** Library build, app build and `ng test` (32 tests) pass. In the browser the console is
    clean on the home page and on all 16 showcase routes, and the nav items now render their
    `nav-item--depth-N` class. One unrelated error remains on the file-upload example: a `400` from a
    dead LinkedIn image URL in the demo data.
