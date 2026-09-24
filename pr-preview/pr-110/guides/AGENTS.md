# @lab900/forms: instructions for AI agents

This file tells a coding agent how to use `@lab900/forms` in an Angular application. It ships inside
the npm package at `node_modules/@lab900/forms/AGENTS.md`. Point your agent to it from the `AGENTS.md`
or `CLAUDE.md` of your project:

```md
Forms come from `@lab900/forms`. Read `node_modules/@lab900/forms/AGENTS.md` before you build one.
```

The type definitions in `node_modules/@lab900/forms/` are the source of truth for every signature.
Live examples with their source: https://lab900.github.io/angular-library-forms/

Without the package installed, read https://lab900.github.io/angular-library-forms/llms.txt (an index) or
https://lab900.github.io/angular-library-forms/llms-full.txt (this guide plus the full API reference).

## What this library does

You describe a form as data. `<lab900-form>` takes a `Lab900FormConfig`, builds the reactive
`UntypedFormGroup` from it, and renders every field. There is no template per field and no
`formControlName` to write: the schema is the form.

```ts
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'app-user-form',
  imports: [Lab900Form],
  template: `<lab900-form [schema]="schema" [(data)]="user" />`,
})
export class UserFormComponent {
  public readonly user = signal<User | undefined>(undefined);

  public readonly schema: Lab900FormConfig = {
    fields: [
      { attribute: 'firstName', title: 'label.first-name', editType: EditType.Input, options: { required: true } },
      { attribute: 'email', title: 'label.email', editType: EditType.Input, options: { colspan: 6 } },
    ],
  };
}
```

## Rules

1. Import every symbol from `@lab900/forms`. Never import from a deep path such as
   `@lab900/forms/lib/...`: those paths are not part of the public API.
2. `Lab900Form` is standalone. Add it to the `imports` of the component that uses it. There is no
   `NgModule`.
3. A field is a **config object**, never a template. Pick the field type with `editType`; that
   discriminates the `Lab900FormField` union, so TypeScript then checks `options` against the right
   options interface.
4. Titles, placeholders, hints and error messages are **translation keys**. The library runs them
   through the `translate` pipe of `@ngx-translate/core`. Text without a matching key shows as is.
5. Build the schema in the component class and keep it in a field, not inline in the template. A new
   object on every change detection rebuilds the form and loses the values.
6. The form owns its `FormGroup`. Read it with `form()`, `value` or `valid`; do not build your own
   `FormGroup` and hand it in.
7. Never disable a control yourself to hide or lock a field. Set `options.readonly`, `options.hide`
   or a condition, and the library disables the control for you.
8. The forms are **untyped** on purpose (`UntypedFormGroup`, `UntypedFormControl`): the schema is
   dynamic. Type the *data*, not the controls.

## Setup

### Versions

The major version of `@lab900/forms` matches the Angular major. Version 22 needs Angular 22 or later.
Peer dependencies: `@angular/core`, `common`, `forms`, `material` (>= 22), `@lab900/ui` (>= 22.0.9),
`@ngx-translate/core` (>= 18), `ngx-mask`, `ngx-mat-select-search`, `@kolkov/angular-editor` and
`@ngx-mce/datetime-picker`.

```bash
npm install @lab900/forms @kolkov/angular-editor ngx-mask @ngx-mce/datetime-picker ngx-mat-select-search
```

### Providers

```ts
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideTranslateService } from '@ngx-translate/core';
import { provideLab900Forms } from '@lab900/forms';
import { provideNgxMask } from 'ngx-mask';

bootstrapApplication(AppComponent, {
  providers: [
    provideTranslateService({ lang: 'en', fallbackLang: 'en' }), // required: every label goes through TranslatePipe
    provideNgxMask(), // required for the input masks and the amount field
    provideNativeDateAdapter(), // for the date, date range, year/month and date-time pickers
    provideLab900Forms({
      formField: { appearance: 'outline' },
      amountField: { locale: 'de-DE', maxDecimals: 2 },
    }),
  ],
});
```

`provideLab900Forms()` also registers `LAB900_FORM_FIELD_TYPES`, the map from `EditType` to component.
Without it no field renders. Its settings are `Lab900FormModuleSettings`:

| Setting                     | What it sets                                                              |
| --------------------------- | ------------------------------------------------------------------------- |
| `formField`                 | `MatFormFieldDefaultOptions` plus `showLengthIndicator`                   |
| `fieldMask`                 | `ngx-mask` defaults (`thousandSeparator`, `decimalMarker`)                |
| `amountField`               | `locale`, `minDecimals`, `maxDecimals`                                    |
| `disableBrowserAutocomplete` | sets `autocomplete="off"` on the inputs                                   |

Without a `TranslateService` every field fails with `NullInjectorError`.

### Translations

The library ships its own error messages in `formsTranslations` (English and Dutch). Merge them into
your loader, or the fields show raw keys such as `forms.error.required`.

```ts
import { formsTranslations } from '@lab900/forms';
```

### Styles

```scss
@use '@angular/material' as mat;
@use '@lab900/forms/theming' as forms;

$theme: mat.m2-define-light-theme(
  (
    color: (
      primary: mat.m2-define-palette(mat.$m2-indigo-palette),
      accent: mat.m2-define-palette(mat.$m2-pink-palette),
    ),
  )
);

@include forms.lab900-forms($theme);
```

The mixin needs a Material 2 theme or color config (`m2-define-light-theme` /
`m2-define-dark-theme`), not a Material 3 `mat.theme()` map.

For the Wysiwyg editor, serve its icons from `angular.json`:

```json
{
  "glob": "**/*",
  "input": "node_modules/@kolkov/angular-editor/assets/icons",
  "output": "assets/ae-icons/"
}
```

## `<lab900-form>`

| Binding                 | Type                                   | Notes                                                        |
| ----------------------- | -------------------------------------- | ------------------------------------------------------------ |
| `[schema]`              | `Lab900FormConfig`                     | required                                                      |
| `[(data)]`              | `T \| undefined`                       | two-way; setting it patches the form                          |
| `[externalForms]`       | `Record<string, UntypedFormGroup>`     | forms a condition may depend on, keyed by `formId`            |
| `[emitEventOnDataChange]` | `boolean`                            | default `true`; `false` patches without firing `valueChanges` |
| `[language]`            | `string`                               | the active language of `EditType.MultiLangInput`              |
| `[availableLanguages]`  | `ValueLabel[]`                         | the languages that field offers                               |

Read the state through a `viewChild`:

```ts
private readonly formRef = viewChild.required(Lab900Form<User>);

public save(): void {
  const form = this.formRef();
  if (!form.valid) {
    form.form.markAllAsTouched();
    return;
  }
  this.userService.save(form.value); // getRawValue(), so disabled and readonly fields are included
}
```

`form.value` returns `getRawValue()`, so readonly and hidden fields are in it. `form.valid` is true
when the group is valid **or** entirely disabled. `patchValues(data, emitEvent?)` patches and grows or
shrinks a repeater's `FormArray`; `setValues(data, emitEvent?)` rebuilds a repeater array instead.

## Edit types

| `EditType`        | Renders                      | Options interface                 |
| ----------------- | ---------------------------- | --------------------------------- |
| `Input`           | text input                   | `FormFieldInputOptions`           |
| `Password`        | password input               | `FormFieldPasswordOptions`        |
| `TextArea`        | textarea                     | `FormFieldTextareaOptions`        |
| `Select`          | select, with search          | `FormFieldSelectOptions`          |
| `Search`          | debounced search input       | `FormFieldSearchOptions`          |
| `RadioButtons`    | radio group                  | `FormFieldRadioButtonsOptions`    |
| `ButtonToggle`    | toggle buttons               | `FormFieldButtonToggleOptions`    |
| `SlideToggle`     | slide toggle                 | `FormFieldSlideToggleOptions`     |
| `Checkbox`        | checkbox                     | `FormFieldCheckboxOptions`        |
| `RangeSlider`     | slider                       | `FormFieldRangeSliderOptions`     |
| `Amount`          | formatted number             | `AmountFieldInputOptions`         |
| `Date`            | date picker                  | `FormFieldDatePickerOptions`      |
| `DateYearMonth`   | year and month picker        | `FormFieldDateYearMonthPickerOptions` |
| `DateRange`       | start and end date           | `FormFieldDateRangeOptions`       |
| `DateTime`        | date with a time             | `FormFieldDateTimePickerOptions`  |
| `FilePreview`     | file list with a preview     | `FormFieldFilePreviewOptions`     |
| `DragNDrop`       | drop zone for files          | `FormFieldDragNDropFileOptions`   |
| `MultiLangInput`  | one input per language       | `FormFieldMultiLangOptions`       |
| `Wysiwyg`         | rich text editor             | `FormFieldWysiwgOptions`          |
| `Repeater`        | repeated group of fields     | `FormFieldRepeaterOptions`        |
| `Row` / `Column`  | layout, holds `nestedFields` | `FormRowOptions` / `FormColumnOptions` |
| `Icon`            | a read-only icon and text    | `FormFieldIconOptions`            |
| `Button`          | button inside the schema     | `FormFieldButtonOptions`          |

Deprecated: `Autocomplete` and `AutocompleteMultiple` (use `Select` with `search.enabled`), and
`File` (use `FilePreview`). An unknown `editType` renders `UnknownFieldComponent`, not an error.

## Shared options

Every options interface extends `FormFieldBaseOptions`:

| Option                   | Type                     | Notes                                                    |
| ------------------------ | ------------------------ | -------------------------------------------------------- |
| `hide`                   | `ReactiveBooleanOption`  | hides the field and disables its control                 |
| `required`               | `ReactiveBooleanOption`  | adds or removes `Validators.required`                    |
| `readonly`               | `ReactiveBooleanOption`  | renders the value and disables the control               |
| `placeholder`            | `ReactiveStringOption`   |                                                          |
| `colspan`                | `number`                 | 1 to 12; the layout is a 12 column grid                  |
| `mobileCols`             | `boolean`                | keep the colspan on mobile (form rows only)              |
| `minLength` / `maxLength`| `number`                 | also becomes a validator                                 |
| `min` / `max`            | `number`                 | also becomes a validator                                 |
| `pattern`                | `RegExp`                 | also becomes a validator                                 |
| `defaultValue`           | `any`                    |                                                          |
| `hint`                   | `{ value, ... }`         | hint text under the field                                |
| `infoTooltip`            | object or function       | tooltip next to the label                                |
| `readonlyDisplay`        | `ReadonlyDisplayFn`      | renders the readonly value                               |
| `readonlyLabel`          | `string`                 |                                                          |
| `onChangeFn`             | `(value, control) => void` |                                                        |
| `elementId`              | `string`                 | overrides the generated element id                       |

The field itself (`FormFieldBase`) carries `attribute`, `title`, `validators`, `errorMessages`,
`conditions`, `options` and `nestedFields`.

## Reactive options

`ReactiveOption<T>` is `T | ((groupValue) => T | Signal<T>) | Signal<T>`. Titles, placeholders, `hide`,
`required`, `readonly` and most option values accept all three forms:

```ts
const field: FormFieldInput = {
  attribute: 'vatNumber',
  title: 'label.vat',
  editType: EditType.Input,
  options: {
    hide: data => data?.customerType !== 'company', // a function of the whole form value
    required: this.vatRequired, // a signal
    readonly: true, // a plain value
  },
};
```

Use a signal for state that changes over time: the field reads it in a `computed`, so the view
updates without a new schema object. Inside a custom field component, resolve these with the
`computeReactive*Option()` helpers, never by reading the raw option.

## Layout and nesting

`EditType.Row` and `EditType.Column` hold `nestedFields`:

```ts
{
  editType: EditType.Row,
  attribute: 'address', // with an attribute: a nested FormGroup { address: { street, city } }
  nestedFields: [
    { attribute: 'street', title: 'label.street', editType: EditType.Input, options: { colspan: 8 } },
    { attribute: 'city', title: 'label.city', editType: EditType.Input, options: { colspan: 4 } },
  ],
}
```

Without an `attribute` the children are flattened into the parent group. A dotted attribute
(`address.street`) creates the intermediate groups on its own, so you rarely need a row just to nest.

`EditType.Repeater` creates an `UntypedFormArray` of groups from its `nestedFields`:

```ts
{
  attribute: 'contacts',
  editType: EditType.Repeater,
  options: { minRows: 1, maxRows: 5, addLabel: 'label.add-contact', enableReorder: true },
  nestedFields: [{ attribute: 'name', title: 'label.name', editType: EditType.Input }],
}
```

## Conditions

A condition subscribes to one or more other controls and reacts. Use it when a field depends on
another *control*; use a reactive option when it depends on the form value as a whole.

```ts
{
  attribute: 'otherReason',
  title: 'label.other-reason',
  editType: EditType.Input,
  conditions: [
    {
      dependOn: 'reason',
      showIfEquals: 'other',
      validators: value => (value === 'other' ? [Validators.required] : []),
    },
  ],
}
```

`IFieldConditions` fields: `dependOn`, `hideIfHasValue`, `showIfHasValue`, `disableIfHasValue`,
`enableIfHasValue`, `hideIfEquals`, `showIfEquals`, `disableIfEquals`, `enabledIfEquals`,
`onChangeFn`, `conditionalOptions` (to reload the options of a select), `validators`,
`distinctUntilChangedCompareFn`, `skipIfNotExists` and `externalFormId`.

A condition **throws** when `dependOn` names a control that does not exist. Set `skipIfNotExists: true`
when the control is only there sometimes.

`externalFormId` resolves against the `externalForms` input, so a field can depend on a control in
another form:

```html
<lab900-form [schema]="addressSchema" [externalForms]="{ user: userForm.form }" />
```

## Selects

`selectOptions` takes an array, an `Observable`, or a function of the current filter:

```ts
const field: FormFieldSelect<Country> = {
  attribute: 'country',
  title: 'label.country',
  editType: EditType.Select,
  options: {
    selectOptions: filter => this.countryService.search(filter?.searchQuery), // ValueLabel<Country>[] or Observable
    search: { enabled: true, debounceTime: 300 },
    infiniteScroll: { enabled: true, threshold: '10%' },
    multiple: true,
    selectAll: { enabled: true },
    compareWith: (a, b) => a?.id === b?.id, // needed for object values
    clearFieldButton: { enabled: true },
  },
};
```

Options are `ValueLabel<T>` (`{ value, label, disabled? }`). With object values always set
`compareWith`, otherwise the current value never matches an option and the select looks empty.

## Validation and error messages

Validators come from three places, and they are combined:

1. `field.validators`: `ValidatorFn[]`, exactly as in a hand-written reactive form.
2. `options`: `required`, `minLength`, `maxLength`, `min`, `max`, `pattern`, `requireMatch` and the
   drag-and-drop file rules each add their own validator.
3. `conditions[].validators`: recalculated whenever the control it depends on changes.

The message for an error key resolves as `field.errorMessages[key]` first, then the built-in
`forms.error.*` key:

```ts
{
  attribute: 'email',
  editType: EditType.Input,
  validators: [Validators.email],
  errorMessages: { email: 'label.email-error' },
}
```

Built-in keys: `forms.error.required`, `.minlength`, `.maxlength`, `.min`, `.max`,
`.number-required`, `.requireMatch`, `.generic`.

## Readonly

Three layers make a field readonly, and any one of them is enough:

- `options.readonly` on the field (reactive, so it may be a function or a signal),
- `schema.readonly` for the whole form,
- a condition that disables the control.

A readonly field is swapped for `ReadonlyFieldComponent`, except for the edit types that render their
own readonly state: `Row`, `Column`, `FilePreview`, `ButtonToggle`, `SlideToggle`, `Button` and
`Select`.

`options.readonlyDisplay` renders the value. It must return **one primitive**
(`string | number | boolean | null | undefined`): the result goes through the translate pipe, and an
array throws there. Note the parameter differs per edit type: most fields pass the value of the whole
group, `EditType.Select` passes the value of the field itself.

```ts
options: {
  readonly: true,
  readonlyDisplay: data => `${data?.firstName} ${data?.lastName}`,
}
```

## Forms in a dialog

`FormDialogDirective` (`[lab900FormDialog]`) opens a schema in a `MatDialog` from any element.

## Testing a consumer component

```ts
await TestBed.configureTestingModule({
  imports: [UserFormComponent],
  providers: [provideTranslateService(), provideNgxMask(), provideNativeDateAdapter(), provideLab900Forms()],
}).compileComponents();

const fixture = TestBed.createComponent(UserFormComponent);
fixture.detectChanges();
```

Omitting `provideLab900Forms()` makes every field render as `UnknownFieldComponent`, which is easy to
miss: the test passes but asserts nothing.

## Common mistakes

| Mistake                                                    | Fix                                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| `NullInjectorError: TranslateService`                      | Add `provideTranslateService()` to the app and test providers.            |
| Every field renders empty or as "unknown"                  | Add `provideLab900Forms()`; it registers the edit type map.               |
| Building the schema in the template or a getter            | Keep it in a class field. A new object rebuilds the form and loses values. |
| Calling `control.disable()` to lock a field                | Set `options.readonly`, `options.hide`, or use a condition.               |
| Typed `FormGroup` in the field pipeline                    | The schema is dynamic; the library uses untyped forms.                    |
| A select shows blank although the value is set             | Set `compareWith` for object values.                                      |
| `Can't create conditional ...: no control with name X`     | Fix `dependOn`, or set `skipIfNotExists: true`.                           |
| `readonlyDisplay` returning an array or an object          | Return one primitive; join or format it yourself.                         |
| Reading `options.hide` directly in a custom field          | Resolve it with `computeReactiveBooleanOption()`.                         |
| Error labels showing as `forms.error.required`             | Merge `formsTranslations` into your translate loader.                     |
| Deep import from `@lab900/forms/lib/...`                   | Import from `@lab900/forms`.                                              |
