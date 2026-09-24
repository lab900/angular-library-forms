# Changelog

All notable changes to `@lab900/forms` are documented in this file. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The major version follows the Angular major version.
Breaking changes are marked **BREAKING**.

## [22.3.0] - 2026-09-29

### Added

- Development warnings for schema mistakes that render a form that shows the wrong thing without failing: an
  `editType` with no registered component, a `Select` with object values but no `compareWith`, a
  `readonlyDisplay` that returns an object or an array, and a schema rebuilt several times a second (built in a
  template or a getter). Each is logged once, names the field and the fix, and is stripped from production
  builds. Turn them off with `provideLab900Forms({ devWarnings: false })`, or in a spec with
  `setLab900DevWarnings(false)`.
- Translation keys `forms.a11y.drop-zone`, `.remove-file`, `.preview-file`, `.show-password` and
  `.hide-password` (en + nl), and the missing Dutch translation of `form.field.add_new`.
- JSDoc on every public member and a schema example on every field model, so the published
  `types/lab900-forms.d.ts` documents the whole API. `npm run docs:api:check` fails CI on an undocumented member.
- `AGENTS.md` for AI coding agents, shipped at `node_modules/@lab900/forms/AGENTS.md` and shown on the showcase AI
  agents page.
- Showcase serves `llms.txt` and `llms-full.txt` (agent guide + full API reference) at its root.
- Showcase: a generated **API** tab on every page, and the changelog.

### Changed

- Performance: the cost of a keystroke no longer grows with the number of fields. Each form group shares one
  lazily computed value signal, instead of three subscriptions and a `getRawValue()` per field per change. A form
  whose options are all static never walks the control tree.
- Performance: a field without `options.onChangeFn` no longer subscribes to its group.
- Performance: `EditType.Select` deduplicates its options in linear time when there is no `compareWith`, so large
  infinite scroll selects no longer freeze on each load. The chips of a multi select filter once per value
  change, and a select no longer adds a `selectionChange` listener on every option load.
- `FormFieldMappingService` resolves an edit type through one lookup table. Custom `LAB900_FORM_FIELD_TYPES`
  maps keep working unchanged.
- The error for an edit type that nothing renders now only fires when a custom `LAB900_FORM_FIELD_TYPES` leaves
  out `UnknownFieldComponent`, and says so.
- Showcase restyled with the Lab900 design system.

### Deprecated

- `FormFieldRangeSliderOptions.enabledInputs`: it was never read.

### Fixed

- A field with `validators` but no `options` lost its validators.
- A repeater multiplied the validators derived from `options` (`minLength`, `max`, `pattern`, ...) with every
  row, and wrote them into the shared schema.
- The subscriptions of `schema.conditions`, including those on an `externalFormId`, are released when the field
  is destroyed.
- `EditType.File` (deprecated) warns and points at `EditType.FilePreview` instead of silently rendering
  `UnknownFieldComponent`.
- Accessibility:
  - the drag-and-drop zone is a labelled region, the upload button inside it takes focus, and its validation
    error is announced.
  - the password visibility toggle is reachable by keyboard and has a name.
  - the remove and preview icons of the file preview field are reachable by keyboard and have a name.
  - the "select all" row of a multi select is reachable by keyboard.
- Showcase: the source tab of the search, reactive options and full-width drag-and-drop examples showed the wrong
  file.

## [22.2.1] - 2026-09-09

### Changed

- **BREAKING:** reactive options (`hide`, `readonly`, `required`, `title`, `placeholder`) receive the real form
  value on their first evaluation. They used to receive the `getRawValue` method, so a function returned a wrong
  result or threw on the first pass. A field can now start out hidden, readonly or required where it did not
  before. Present since 19.1.10.
- **BREAKING:** a readonly field renders `-` instead of `[object Object]` for a value without a string form (a
  plain object, a `Date` range, a `File`). Set `readonlyDisplay` on those fields. This replaces the 22.1.0 note on
  objects.
- **BREAKING:** each item of an array value in a readonly field is translated on its own, and the items are joined
  with `, `.
- **BREAKING:** `readonlyDisplay` recomputes when any control in its form group changes, not only its own control.

### Fixed

- `EditType.DateTime` shows the selected time on every date adapter without `displayFormat`. The format follows
  your application's `MAT_DATE_FORMATS.display.dateInput`; if that already prints a time, a string adapter
  (Luxon, Moment, date-fns) shows it twice, which `displayFormat` fixes. `displayFormat` still wins.

## [22.1.0] - 2026-09-07

All changes come from the fix for `TypeError: key.split is not a function` in a readonly form with a repeater.

### Added

- `toReadonlyDisplayString()` helper, the conversion a readonly field uses.

### Changed

- **BREAKING:** `options.readonlyDisplay` is typed `ReadonlyDisplayFn` and must return one primitive
  (`string | number | boolean | null | undefined`).
- **BREAKING:** a readonly `EditType.Repeater` renders its own readonly rows, without add, remove or reorder,
  instead of one `.lab900-readonly-field`. Update CSS and DOM tests that relied on the old markup. It shows
  `options.readonlyLabel` instead of `title` when set, and `readonlyDisplay` still wins over the rows.
- **BREAKING:** a readonly `EditType.AutocompleteMultiple` or `EditType.MultiLangInput` renders its own readonly
  state, with the same markup change.
- **BREAKING:** a readonly field stringifies its value before translating it: an array renders its items joined
  with `, `.

## [22.0.4] - 2026-09-01

Upgrade to Angular 22 (22.0.0 - 22.0.4). See [ANGULAR-UPGRADE-19.2-TO-22.1.md](ANGULAR-UPGRADE-19.2-TO-22.1.md)
for details.

### Changed

- **BREAKING:** `@ngxmc/datetime-picker` is replaced by `@ngx-mce/datetime-picker` (`~22.2.3`), the maintained
  fork with the same API.
- [cloudbuild.yaml](cloudbuild.yaml) uses `npm stage publish`.

### Fixed

- Button toggle: no empty icon element for options without an icon, and the element id no longer renders the
  `elementId` function instead of its value.
- Range slider inputs show an empty value instead of `undefined`.
- The file upload input sets an empty `accept` when no `accept` option is given.
- Form rows, form columns and the search field no longer render when their form group or options are missing.

### Security

- Updated npm packages and pipelines.

## [19.1.40] - 2026-03-03

### Fixed

- Error alignment (also in 19.1.38 and 19.1.39).

## [19.1.37] - 2026-03-03

### Fixed

- Drag-and-drop not showing validation errors.

## [19.1.36] - 2025-12-16

### Added

- Reordering option on the repeater field.

## [19.1.35] - 2025-11-25

### Fixed

- Selected option showing empty when searching and the option is not in the search results.

## [19.1.34] - 2025-11-25

**Broken:** depends on a version of `@kolkov/angular-editor` that needs Angular 20. Use 19.1.35 instead.

## [19.1.33] - 2025-10-30

### Fixed

- File preview opening the file select on Enter.

## [19.1.32] - 2025-10-21

### Added

- Option to show the selected options of a multi select as chips.

### Fixed

- Removing a chip in the autocomplete multi select.

## [19.1.31] - 2025-10-15

### Fixed

- Checkbox shown in the no options indicator of a multi select.

## [19.1.30] - 2025-10-14

### Added

- No options indicator when a select has no initial options.

## [19.1.29] - 2025-09-09

### Security

- Updated vulnerable packages (`angular-cli-ghpages` still pending).

## [19.1.28] - 2025-09-02

### Fixed

- Edit metadata of the file preview is reactive.

## [19.1.27] - 2025-09-01

### Fixed

- Repeater dirty and touched state.

## [19.1.26] - 2025-09-01

### Fixed

- Form dialog loading signal.

## [19.1.25] - 2025-09-01

### Fixed

- File preview not showing files.

## [19.1.24] - 2025-08-28

### Fixed

- Visibility check of the button toggle.

## [19.1.23] - 2025-08-12

### Added

- Option to hide the selected option indicator on a toggle.

### Fixed

- Icon position in the password field.

## [19.1.22] - 2025-08-06

### Fixed

- Alignment of readonly and editable checkboxes.

## [19.1.21] - 2025-07-31

### Fixed

- Infinite scroll selects kept requesting data after everything was loaded.

## [19.1.20] - 2025-07-11

### Fixed

- Conditions on rows.

## [19.1.19] - 2025-07-11

### Fixed

- `ngx-mask` issues introduced in 19.1.15 ([ngx-mask#1305](https://github.com/JsDaddy/ngx-mask/issues/1305)).

## [19.1.18] - 2025-06-10

### Fixed

- Search field ignoring the same input after clearing.

## [19.1.17] - 2025-06-10

### Fixed

- Some labels were not translated.

## [19.1.16] - 2025-05-28

### Added

- Reactive field title.

### Fixed

- Validators of a required field.

## [19.1.15] - 2025-05-13

### Fixed

- `ngx-mask` focus state ([ngx-mask#1305](https://github.com/JsDaddy/ngx-mask/issues/1305)).
- Focus state when parent components are `OnPush`.

## [19.1.14] - 2025-05-06

### Fixed

- Amount field triggering `patchValues`.

## [19.1.13] - 2025-04-24

### Added

- The text option of the icon field is translated.

## [19.1.11] - 2025-04-22

### Added

- Text option on the icon field.

## [19.1.10] - 2025-04-17

### Fixed

- Hidden state of columns.

## [19.1.9] - 2025-04-09

### Fixed

- Row labels.

## [19.1.8] - 2025-04-08

### Added

- Reactive field icon.

## [19.1.7] - 2025-04-08

### Fixed

- Hidden `form-col` class.

## [19.1.6] - 2025-04-07

### Fixed

- Tooltips showing on fields hidden by a condition.

## [19.1.5] - 2025-04-07

### Added

- Reactive button labels.

### Fixed

- Tooltips showing on hidden fields.

## [19.1.4] - 2025-04-04

### Fixed

- Reactive options based on form group values.
- Hidden fields.

## [19.1.3] - 2025-04-04

### Added

- `hide`, `readonly` and `required` accept signals.

## [19.1.2] - 2025-04-03

### Fixed

- Readonly state of the select.
- Raw values are checked.

## [19.1.0] - 2025-04-03

### Changed

- Readonly, hidden and required states are reactive.

### Fixed

- Error messages not showing.
- Warnings about disabling and enabling form controls.
- Ids that were not always unique.

## [19.0.5] - 2025-04-02

### Fixed

- Amount field showing the wrong value.

## [19.0.4] - 2025-04-02

### Fixed

- Title of the text area field is translated.

## [19.0.3] - 2025-04-01

### Fixed

- Conditional fields throwing errors.

## [19.0.2] - 2025-04-01

### Fixed

- Repeater issues.

## [19.0.1] - 2025-03-19

### Fixed

- Date picker toggle not appearing.
- Select throwing a nativeElement not found error.

## [19.0.0] - 2025-03-11

### Changed

- Upgrade to Angular 19.
- **BREAKING:** `@angular-material-components/datetime-picker` is replaced by `@ngxmc/datetime-picker`, because
  the former was not updated for the last major version.

## [18.2.1] - 2024-12-03

### Fixed

- `colspan` of form rows.

## [18.2.0] - 2024-12-03

### Added

- Custom ids on form columns, rows, fields and buttons.

## [18.1.2] - 2024-08-30

### Fixed

- Displaying error messages (also in 18.1.1).

## [18.1.0] - 2024-08-26

### Changed

- More signals, to solve change detection issues.

## [18.0.5] - 2024-08-26

### Fixed

- Select reopening with the fetch on focus option.

## [18.0.4] - 2024-08-20

### Fixed

- Masking issues.

## [18.0.3] - 2024-08-05

### Fixed

- Multi language inputs.

## [18.0.0] - 2024-07-23

### Changed

- Upgrade to Angular 18.

## [17.0.4] - 2024-08-20

### Fixed

- Masking issues.

## [17.0.1] - 2024-05-13

### Added

- The configuration is visible in the showcase examples.

### Fixed

- Disabled state of the slide toggle.
- `selectedDisplayFn` error.

### Removed

- **BREAKING:** `displayOptionFn` on selects.

## [17.0.0] - 2024-04-19

### Changed

- Upgrade to Angular 17.
- **BREAKING:** everything is standalone, so forms are imported and provided differently. See the
  [getting started guide](https://lab900.github.io/angular-library-forms/getting-started).

## Older versions

No changelog available.

[Unreleased]: https://github.com/lab900/angular-library-forms/compare/22.3.0...HEAD
[22.3.0]: https://github.com/lab900/angular-library-forms/compare/22.2.1...22.3.0
[22.2.1]: https://github.com/lab900/angular-library-forms/compare/22.1.0...22.2.1
[22.1.0]: https://github.com/lab900/angular-library-forms/compare/22.0.4...22.1.0
[22.0.4]: https://github.com/lab900/angular-library-forms/compare/19.1.40...22.0.4
[19.1.40]: https://github.com/lab900/angular-library-forms/compare/19.1.37...19.1.40
[19.1.37]: https://github.com/lab900/angular-library-forms/compare/19.1.36...19.1.37
[19.1.36]: https://www.npmjs.com/package/@lab900/forms/v/19.1.36
[19.1.35]: https://www.npmjs.com/package/@lab900/forms/v/19.1.35
[19.1.34]: https://www.npmjs.com/package/@lab900/forms/v/19.1.34
[19.1.33]: https://github.com/lab900/angular-library-forms/compare/19.1.32...19.1.33
[19.1.32]: https://github.com/lab900/angular-library-forms/compare/19.1.31...19.1.32
[19.1.31]: https://github.com/lab900/angular-library-forms/compare/19.1.30...19.1.31
[19.1.30]: https://github.com/lab900/angular-library-forms/compare/19.1.29...19.1.30
[19.1.29]: https://github.com/lab900/angular-library-forms/compare/19.1.28...19.1.29
[19.1.28]: https://github.com/lab900/angular-library-forms/compare/19.1.27...19.1.28
[19.1.27]: https://github.com/lab900/angular-library-forms/compare/19.1.26...19.1.27
[19.1.26]: https://github.com/lab900/angular-library-forms/compare/19.1.25...19.1.26
[19.1.25]: https://github.com/lab900/angular-library-forms/compare/19.1.24...19.1.25
[19.1.24]: https://github.com/lab900/angular-library-forms/compare/19.1.23...19.1.24
[19.1.23]: https://github.com/lab900/angular-library-forms/compare/19.1.22...19.1.23
[19.1.22]: https://github.com/lab900/angular-library-forms/compare/19.1.21...19.1.22
[19.1.21]: https://github.com/lab900/angular-library-forms/compare/19.1.20...19.1.21
[19.1.20]: https://github.com/lab900/angular-library-forms/compare/19.1.19...19.1.20
[19.1.19]: https://github.com/lab900/angular-library-forms/compare/19.1.17...19.1.19
[19.1.18]: https://www.npmjs.com/package/@lab900/forms/v/19.1.18
[19.1.17]: https://github.com/lab900/angular-library-forms/compare/19.1.16...19.1.17
[19.1.16]: https://github.com/lab900/angular-library-forms/compare/19.1.15...19.1.16
[19.1.15]: https://github.com/lab900/angular-library-forms/compare/19.1.14...19.1.15
[19.1.14]: https://github.com/lab900/angular-library-forms/compare/19.1.13...19.1.14
[19.1.13]: https://github.com/lab900/angular-library-forms/compare/19.1.10...19.1.13
[19.1.11]: https://www.npmjs.com/package/@lab900/forms/v/19.1.11
[19.1.10]: https://github.com/lab900/angular-library-forms/compare/19.1.9...19.1.10
[19.1.9]: https://github.com/lab900/angular-library-forms/compare/19.1.8...19.1.9
[19.1.8]: https://github.com/lab900/angular-library-forms/compare/19.1.7...19.1.8
[19.1.7]: https://github.com/lab900/angular-library-forms/compare/19.1.6...19.1.7
[19.1.6]: https://github.com/lab900/angular-library-forms/compare/19.1.5...19.1.6
[19.1.5]: https://github.com/lab900/angular-library-forms/compare/19.1.4...19.1.5
[19.1.4]: https://github.com/lab900/angular-library-forms/compare/19.1.3...19.1.4
[19.1.3]: https://github.com/lab900/angular-library-forms/compare/19.1.2...19.1.3
[19.1.2]: https://github.com/lab900/angular-library-forms/compare/19.1.0...19.1.2
[19.1.0]: https://github.com/lab900/angular-library-forms/compare/19.0.5...19.1.0
[19.0.5]: https://github.com/lab900/angular-library-forms/compare/19.0.4...19.0.5
[19.0.4]: https://github.com/lab900/angular-library-forms/compare/19.0.3...19.0.4
[19.0.3]: https://github.com/lab900/angular-library-forms/compare/19.0.2...19.0.3
[19.0.2]: https://github.com/lab900/angular-library-forms/compare/19.0.1...19.0.2
[19.0.1]: https://github.com/lab900/angular-library-forms/compare/19.0.0...19.0.1
[19.0.0]: https://github.com/lab900/angular-library-forms/compare/18.2.1...19.0.0
[18.2.1]: https://github.com/lab900/angular-library-forms/compare/18.2.0...18.2.1
[18.2.0]: https://github.com/lab900/angular-library-forms/compare/18.1.2...18.2.0
[18.1.2]: https://github.com/lab900/angular-library-forms/compare/18.1.0...18.1.2
[18.1.0]: https://github.com/lab900/angular-library-forms/compare/18.0.5...18.1.0
[18.0.5]: https://github.com/lab900/angular-library-forms/compare/18.0.4...18.0.5
[18.0.4]: https://github.com/lab900/angular-library-forms/compare/18.0.3...18.0.4
[18.0.3]: https://github.com/lab900/angular-library-forms/compare/18.0.0...18.0.3
[18.0.0]: https://www.npmjs.com/package/@lab900/forms/v/18.0.0
[17.0.4]: https://www.npmjs.com/package/@lab900/forms/v/17.0.4
[17.0.1]: https://www.npmjs.com/package/@lab900/forms/v/17.0.1
[17.0.0]: https://www.npmjs.com/package/@lab900/forms/v/17.0.0
