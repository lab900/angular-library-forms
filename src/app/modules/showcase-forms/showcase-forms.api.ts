import { ShowcaseApiSection } from '../shared/models/showcase-api.model';

// The API tab of each page. The names must be exported from `@lab900/forms`; run `npm run docs:api` after a change.
//
// A section with `fieldUsage: true` holds field models of the `Lab900FormField` union: the tab then shows a
// schema snippet per field and renders its options interface inline, so only list the field model itself.

export const formContainerApi: ShowcaseApiSection[] = [
  {
    title: 'Component',
    description: 'The form itself. It builds the FormGroup from the schema and renders every field.',
    symbols: ['Lab900Form'],
  },
  {
    title: 'Configuration',
    description: 'A Lab900FormConfig holds the fields. Every field is one member of the Lab900FormField union.',
    symbols: ['Lab900FormConfig', 'Lab900FormField', 'FormFieldBase', 'FormFieldBaseOptions', 'EditType'],
  },
  {
    title: 'Reactive options',
    description:
      'Most option values accept a plain value, a function of the form value, or a signal. Resolve them with the computeReactive*Option helpers, never by reading the raw option.',
    symbols: ['ReactiveOption', 'ReactiveBooleanOption', 'ReactiveStringOption', 'ReactiveNumberOption'],
  },
  {
    title: 'Readonly rendering',
    description: 'How a field renders when it is readonly. `readonlyDisplay` must reduce the field to one primitive.',
    symbols: ['ReadonlyDisplayFn', 'ReadonlyDisplayValue'],
  },
  {
    title: 'Shared types',
    symbols: ['ValueLabel', 'Icon', 'Lab900FormFieldOptions'],
  },
  {
    title: 'Providers',
    description: 'Pass these to provideLab900Forms() to set the defaults of every form in the application.',
    symbols: ['Lab900FormModuleSettings'],
  },
  {
    title: 'Directives',
    description: 'Open a form in a dialog, or focus a field when it renders.',
    symbols: ['FormDialogDirective', 'AutofocusDirective'],
  },
  {
    title: 'Fields without their own page',
    description: 'The remaining members of the union. Every other edit type has its own page.',
    fieldUsage: true,
    symbols: ['FormFieldIcon'],
  },
  {
    title: 'Writing a field component',
    description: 'Every field component extends FormComponent. It owns the per-field contract: state, value, errors.',
    symbols: ['FormComponent'],
  },
];

export const conditionalFormsApi: ShowcaseApiSection[] = [
  {
    title: 'Conditions',
    description:
      'A condition subscribes to one or more dependOn controls and then flips visibility, disabled state, validators or select options. Set externalFormId to depend on a control in another form.',
    symbols: ['IFieldConditions'],
  },
  {
    title: 'Reactive options',
    description: 'The alternative to a condition for simple cases: an option that is a function or a signal.',
    symbols: ['ReactiveOption', 'ReactiveBooleanOption', 'ReactiveStringOption', 'ReactiveNumberOption'],
  },
];

export const inputFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field models',
    description: 'Free text in one line, over several lines, or masked as a password.',
    fieldUsage: true,
    symbols: ['FormFieldInput', 'FormFieldTextarea', 'FormFieldPassword'],
  },
  {
    title: 'Types',
    symbols: ['InputType', 'FieldMask'],
  },
  {
    title: 'Component',
    description: 'The rendered input. Exported so a custom field can reuse it.',
    symbols: ['InputFieldComponent'],
  },
];

export const selectFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    fieldUsage: true,
    symbols: ['FormFieldSelect'],
  },
  {
    title: 'Options',
    description: 'selectOptions takes an array, an Observable, or a function that receives the current filter.',
    symbols: ['FormFieldSelectOptionsFn', 'FormFieldSelectOptionsFilter', 'ValueLabel'],
  },
  {
    title: 'Component and directives',
    description: 'The rendered select, and the directive that emits when the options list scrolls to the end.',
    symbols: ['SelectFieldComponent', 'SelectInfiniteScrollDirective'],
  },
];

export const autocompleteFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field models',
    description: 'One value, or several values as chips. Both share the same options interface.',
    fieldUsage: true,
    symbols: ['FormFieldAutocomplete', 'FormFieldAutocompleteMulti'],
  },
  {
    title: 'Shared types',
    symbols: ['ValueLabel'],
  },
];

export const repeaterFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    description:
      'A repeater creates an UntypedFormArray of groups. patchValues() grows and shrinks it and honours options.minRows.',
    fieldUsage: true,
    symbols: ['FormFieldRepeater'],
  },
];

export const datePickerFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field models',
    description: 'A date, a range, a date with a time, or a year and a month.',
    fieldUsage: true,
    symbols: ['FormFieldDatePicker', 'FormFieldDateRange', 'FormFieldDateTimePicker', 'FormFieldDateYearMonthPicker'],
  },
  {
    title: 'Types',
    symbols: ['DateAdapterDisplayFormat'],
  },
];

export const radioButtonsFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    fieldUsage: true,
    symbols: ['FormFieldRadioButtons'],
  },
  {
    title: 'Shared types',
    symbols: ['ValueLabel'],
  },
];

export const buttonToggleFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    fieldUsage: true,
    symbols: ['FormFieldButtonToggle'],
  },
  {
    title: 'Shared types',
    symbols: ['ValueLabel'],
  },
];

export const buttonFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    description: 'A button inside the form. It renders its own readonly state.',
    fieldUsage: true,
    symbols: ['FormFieldButton'],
  },
];

export const slideToggleFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field models',
    description: 'A slide toggle, or a plain checkbox.',
    fieldUsage: true,
    symbols: ['FormFieldSlideToggle', 'CheckboxFieldModel'],
  },
];

export const rangeSliderFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    fieldUsage: true,
    symbols: ['FormFieldRangeSlider'],
  },
];

export const searchFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    fieldUsage: true,
    symbols: ['FormFieldSearch'],
  },
];

export const amountFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    description: 'A number formatted for a locale and a currency.',
    fieldUsage: true,
    symbols: ['FormFieldAmount'],
  },
  {
    title: 'Formatting',
    description: 'The options of the formatter. Set the defaults of every amount field through provideLab900Forms().',
    symbols: ['AmountOptions', 'AmountFieldInputOptions', 'Lab900AmountFieldOptions'],
  },
  {
    title: 'Directive',
    description: 'Formats an input on its own, outside a form schema.',
    symbols: ['AmountInputDirective'],
  },
];

export const fileUploadFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    fieldUsage: true,
    symbols: ['FormFieldFilePreview'],
  },
  {
    title: 'Configuration',
    symbols: ['Lab900File'],
  },
  {
    title: 'Directive',
    description: 'Loads an image behind an Authorization header and shows it.',
    symbols: ['AuthImageDirective'],
  },
];

export const dragNDropFileFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    description: 'Drop files on the field. The builder derives validators from the file rules in the options.',
    fieldUsage: true,
    symbols: ['FormFieldDragNDropFilePreview'],
  },
  {
    title: 'Configuration',
    symbols: ['Lab900File'],
  },
];

export const multiLangFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    description: 'One value per language. The value of the control is an object keyed by language code.',
    fieldUsage: true,
    symbols: ['FormFieldMultiLang'],
  },
];

export const nestedGroupsApi: ShowcaseApiSection[] = [
  {
    title: 'Layout fields',
    description:
      'A row or a column holds nestedFields. With an attribute they create a nested FormGroup; without one their children are flattened into the parent group.',
    fieldUsage: true,
    symbols: ['FormRow', 'FormColumn'],
  },
];

export const editorFieldApi: ShowcaseApiSection[] = [
  {
    title: 'Field model',
    description: 'A rich text editor, rendered with @kolkov/angular-editor.',
    fieldUsage: true,
    symbols: ['WysiwgFieldModel'],
  },
];
