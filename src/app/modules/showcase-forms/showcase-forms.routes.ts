import { Routes } from '@angular/router';
import { ShowcaseExample } from '../shared/models/showcase-example.model';
import { ShowcaseRoute } from '../shared/models/showcase-route.model';
import { FormConditionalsExampleComponent } from './examples/form-conditionals-example/form-conditionals-example.component';
import { FormContainerExampleComponent } from './examples/form-container-example/form-container-example.component';
import { FormContainerReadonlyExampleComponent } from './examples/form-container-readonly-example/form-container-readonly-example.component';
import { FormFieldAutocompleteExampleComponent } from './examples/form-field-autocomplete-example/form-field-autocomplete-example.component';
import { FormFieldAutocompleteMultipleExampleComponent } from './examples/form-field-autocomplete-multiple-example/form-field-autocomplete-multiple-example.component';
import { FormFieldButtonExampleComponent } from './examples/form-field-button-example/form-field-button-example.component';
import { FormFieldButtonToggleExampleComponent } from './examples/form-field-button-toggle-example/form-field-button-toggle-example.component';
import { FormFieldDatePickerExampleComponent } from './examples/form-field-date-picker-example/form-field-date-picker-example.component';
import { FormFieldDateRangePickerExampleComponent } from './examples/form-field-date-range-picker-example/form-field-date-range-picker-example.component';
import { FormFieldDateTimePickerExampleComponent } from './examples/form-field-date-time-picker-example/form-field-date-time-picker-example.component';
import { FormFieldDateYearMonthPickerExampleComponent } from './examples/form-field-date-year-month-picker-example/form-field-date-year-month-picker-example.component';
import { FormFieldDragNDropFileFullWidthExampleComponent } from './examples/form-field-drag-n-drop-file-full-width-example/form-field-drag-n-drop-file-full-width-example.component';
import { FormFieldDragNDropFileExampleComponent } from './examples/form-field-drag-n-drop-file-example/form-field-drag-n-drop-file-example.component';
import { FormFieldFileUploadExampleComponent } from './examples/form-field-file-upload-example/form-field-file-upload-example.component';
import { FormFieldInputsExampleComponent } from './examples/form-field-inputs-example/form-field-inputs-example.component';
import { FormFieldMultiLanguageExampleComponent } from './examples/form-field-multi-language-example/form-field-multi-language-example.component';
import { FormFieldNestedGroupsByAttributeExampleComponent } from './examples/form-field-nested-groups-by-attribute-example/form-field-nested-groups-by-attribute-example.component';
import { FormFieldNestedGroupsExampleComponent } from './examples/form-field-nested-groups-example/form-field-nested-groups-example.component';
import { FormFieldRadioButtonsExampleComponent } from './examples/form-field-radio-buttons-example/form-field-radio-buttons-example.component';
import { FormFieldRangeSliderExampleComponent } from './examples/form-field-range-slider-example/form-field-range-slider-example.component';
import { FormFieldRepeaterAdvancedExampleComponent } from './examples/form-field-repeater-advanced-example/form-field-repeater-advanced-example.component';
import { FormFieldRepeaterExampleComponent } from './examples/form-field-repeater-example/form-field-repeater-example.component';
import { FormFieldRepeaterFixedExampleComponent } from './examples/form-field-repeater-fixed-example/form-field-repeater-fixed-example.component';
import { FormFieldRepeaterReadonlyExampleComponent } from './examples/form-field-repeater-readonly-example/form-field-repeater-readonly-example.component';
import { FormFieldSelectAdvancedExampleComponent } from './examples/form-field-select-advanced-example/form-field-select-advanced-example.component';
import { FormFieldSelectExampleComponent } from './examples/form-field-select-example/form-field-select-example.component';
import { FormFieldSlideToggleExampleComponent } from './examples/form-field-slide-toggle-example/form-field-slide-toggle-example.component';
import { FormFieldTextareaExampleComponent } from './examples/form-field-textarea-example/form-field-textarea-example.component';
import { showcaseFormsConfig } from './showcase-forms.constants';
import { showcaseFormsNavItems } from './showcase-forms.nav-items';
import { FormFieldAmountExampleComponent } from './examples/form-field-amount-example/form-field-amount-example.component';
import { FormFieldSearchExampleComponent } from './examples/form-field-search-example/form-field-search-example.component';
import { FormConditionalWithExternalFormExampleComponent } from './examples/form-conditional-with-external-form-example/form-conditional-with-external-form-example.component';
import { FormConditionalValidationExampleComponent } from './examples/form-conditional-validation-example/form-conditional-validation-example.component';
import { FormReactiveOptionsExampleComponent } from './examples/form-reactive-options-example/form-reactive-options-example.component';
import { FormFieldEditorExampleComponent } from './examples/form-field-editor-example/form-field-editor-example.component';
import { FormFieldRepeaterReorderExampleComponent } from './examples/form-field-repeater-reorder-example/form-field-repeater-reorder-example.component';
import { FormFieldCheckboxExampleComponent } from './examples/form-field-checkbox-example/form-field-checkbox-example.component';
import { FormFieldIconExampleComponent } from './examples/form-field-icon-example/form-field-icon-example.component';
import {
  amountFieldApi,
  autocompleteFieldApi,
  buttonFieldApi,
  buttonToggleFieldApi,
  conditionalFormsApi,
  datePickerFieldApi,
  dragNDropFileFieldApi,
  editorFieldApi,
  fileUploadFieldApi,
  formContainerApi,
  inputFieldApi,
  multiLangFieldApi,
  nestedGroupsApi,
  radioButtonsFieldApi,
  rangeSliderFieldApi,
  repeaterFieldApi,
  iconFieldApi,
  searchFieldApi,
  selectFieldApi,
  slideToggleFieldApi,
} from './showcase-forms.api';

export default [
  {
    path: '',
    loadComponent: () => import('../shared/components/showcase-home/showcase-home.component'),
    data: { config: showcaseFormsConfig, nav: showcaseFormsNavItems },
  },
  {
    path: 'getting-started',
    loadComponent: () => import('../shared/components/markdown-page/markdown-page.component'),
    data: { filePath: 'guides/getting-started.md' },
  },
  {
    path: 'ai-agents',
    loadComponent: () => import('../shared/components/markdown-page/markdown-page.component'),
    data: { filePath: 'guides/AGENTS.md' },
  },
  {
    path: 'changelog',
    loadComponent: () => import('../shared/components/markdown-page/markdown-page.component'),
    data: { filePath: 'CHANGELOG.md' },
  },
  new ShowcaseRoute(
    'form-container',
    'Dynamic forms',
    [
      new ShowcaseExample(
        FormContainerExampleComponent,
        'Form container',
        'The minimum: a Lab900FormConfig of fields and a data object. The form builds the FormGroup itself.'
      ),
      new ShowcaseExample(
        FormContainerReadonlyExampleComponent,
        'Readonly form',
        'schema.readonly makes every field readonly. A readonly control is disabled, so it leaves the form value.'
      ),
    ],
    'guides/creating-forms.md',
    formContainerApi
  ),
  new ShowcaseRoute(
    'conditional-forms',
    'Conditional forms',
    [
      new ShowcaseExample(
        FormConditionalsExampleComponent,
        'Conditional fields',
        'A condition depends on another control and flips visibility, disabled state or the select options.',
        ['TS', 'config.ts']
      ),
      new ShowcaseExample(
        FormConditionalValidationExampleComponent,
        'Conditional validation',
        'A condition that adds and removes validators while the form is in use.'
      ),
      new ShowcaseExample(
        FormConditionalWithExternalFormExampleComponent,
        'Conditionals across forms',
        'externalFormId resolves against the externalForms input, so a condition can depend on another form.'
      ),
      new ShowcaseExample(
        FormReactiveOptionsExampleComponent,
        'Reactive options',
        'The lighter alternative: an option that is a function of the form value or a signal, instead of a condition.'
      ),
    ],
    undefined,
    conditionalFormsApi
  ),
  new ShowcaseRoute(
    'form-field-autocomplete',
    'Form Fields: Autocomplete',
    [
      new ShowcaseExample(
        FormFieldAutocompleteExampleComponent,
        'Autocomplete',
        'One value, filtered while you type. requireMatch adds a validator that rejects free text.'
      ),
      new ShowcaseExample(
        FormFieldAutocompleteMultipleExampleComponent,
        'Autocomplete multiple',
        'Several values as chips. The control value is an array.'
      ),
    ],
    undefined,
    autocompleteFieldApi
  ),
  new ShowcaseRoute(
    'form-field-repeater',
    'Form Fields: Repeater',
    [
      new ShowcaseExample(
        FormFieldRepeaterAdvancedExampleComponent,
        'Repeater (nested)',
        'A repeater inside a repeater. Each row is its own FormGroup of nestedFields.'
      ),
      new ShowcaseExample(
        FormFieldRepeaterExampleComponent,
        'Repeater',
        'Add and remove rows. options.minRows keeps a number of rows in place.'
      ),
      new ShowcaseExample(
        FormFieldRepeaterFixedExampleComponent,
        'Repeater fixed',
        'A fixed set of rows: no add or remove buttons.'
      ),
      new ShowcaseExample(
        FormFieldRepeaterReorderExampleComponent,
        'Repeater (reorder)',
        'Drag the rows to reorder them. The form array follows the new order.'
      ),
      new ShowcaseExample(
        FormFieldRepeaterReadonlyExampleComponent,
        'Repeater readonly',
        'A readonly repeater renders the values of every row without the row controls.'
      ),
    ],
    undefined,
    repeaterFieldApi
  ),
  new ShowcaseRoute(
    'form-field-datepicker',
    'Form Fields: Datepicker',
    [
      new ShowcaseExample(FormFieldDatePickerExampleComponent, 'Date picker', 'A single date, with min and max.'),
      new ShowcaseExample(
        FormFieldDateYearMonthPickerExampleComponent,
        'Date year month picker',
        'A year and a month only: the day view never opens.'
      ),
      new ShowcaseExample(
        FormFieldDateRangePickerExampleComponent,
        'Date range picker',
        'A start and an end date in one field. The control value holds both.'
      ),
      new ShowcaseExample(
        FormFieldDateTimePickerExampleComponent,
        'Date time picker',
        'A date with a time, rendered with @ngx-mce/datetime-picker.'
      ),
    ],
    undefined,
    datePickerFieldApi
  ),
  new ShowcaseRoute(
    'form-field-input',
    'Form Fields: Input & Textarea',
    [
      new ShowcaseExample(
        FormFieldInputsExampleComponent,
        'Input',
        'Every input type, with a mask, a prefix and a suffix, and a password field.'
      ),
      new ShowcaseExample(
        FormFieldTextareaExampleComponent,
        'Textarea',
        'Free text over several lines, with autosize between minRows and maxRows.'
      ),
    ],
    undefined,
    inputFieldApi
  ),
  new ShowcaseRoute(
    'form-field-radio-buttons',
    'Form Fields: Radio buttons',
    [
      new ShowcaseExample(
        FormFieldRadioButtonsExampleComponent,
        'Radio buttons',
        'One value out of a list of ValueLabels, laid out in a row or a column.'
      ),
    ],
    undefined,
    radioButtonsFieldApi
  ),
  new ShowcaseRoute(
    'form-field-button-toggle',
    'Form Fields: Button Toggle',
    [
      new ShowcaseExample(
        FormFieldButtonToggleExampleComponent,
        'Button toggle',
        'A row of toggle buttons. It renders its own readonly state.'
      ),
    ],
    undefined,
    buttonToggleFieldApi
  ),
  new ShowcaseRoute(
    'form-field-button',
    'Form Fields: Button',
    [
      new ShowcaseExample(
        FormFieldButtonExampleComponent,
        'Button',
        'A button inside the schema, for an action that belongs with the fields.'
      ),
    ],
    undefined,
    buttonFieldApi
  ),
  new ShowcaseRoute(
    'form-field-slide-toggle',
    'Form Fields: Slide Toggle & Checkbox',
    [
      new ShowcaseExample(
        FormFieldSlideToggleExampleComponent,
        'Slide toggle',
        'A boolean field. It renders its own readonly state.'
      ),
      new ShowcaseExample(
        FormFieldCheckboxExampleComponent,
        'Checkbox',
        'The same boolean, as a checkbox. A null value renders indeterminate unless disabledIndeterminate is set.'
      ),
    ],
    undefined,
    slideToggleFieldApi
  ),
  new ShowcaseRoute(
    'form-field-icon',
    'Form Fields: Icon',
    [
      new ShowcaseExample(
        FormFieldIconExampleComponent,
        'Icon',
        'A read-only icon with an optional text. Both options are reactive, so they can follow the form value.'
      ),
    ],
    undefined,
    iconFieldApi
  ),
  new ShowcaseRoute(
    'form-field-range-slider',
    'Form Fields: Range slider',
    [
      new ShowcaseExample(
        FormFieldRangeSliderExampleComponent,
        'Range slider',
        'A number between min and max, stepped by step.'
      ),
    ],
    undefined,
    rangeSliderFieldApi
  ),
  new ShowcaseRoute(
    'form-field-select',
    'Form Fields: Select',
    [
      new ShowcaseExample(
        FormFieldSelectExampleComponent,
        'Selects',
        'selectOptions as an array, an Observable or a function. Single and multiple.'
      ),
      new ShowcaseExample(
        FormFieldSelectAdvancedExampleComponent,
        'Advanced selects',
        'Search inside the options, infinite scroll, select all, and a custom trigger.'
      ),
    ],
    undefined,
    selectFieldApi
  ),
  new ShowcaseRoute(
    'form-field-file-upload',
    'Form Fields: File upload',
    [
      new ShowcaseExample(
        FormFieldFileUploadExampleComponent,
        'Upload',
        'A file preview list. The value is a list of Lab900Files.'
      ),
    ],
    undefined,
    fileUploadFieldApi
  ),
  new ShowcaseRoute(
    'form-field-drag-n-drop-file-upload',
    'Form Fields: File Drag And Drop',
    [
      new ShowcaseExample(
        FormFieldDragNDropFileExampleComponent,
        'Drag and drop',
        'Drop files on the field. maxFiles, maxFileSize and accept become validators.'
      ),
      new ShowcaseExample(
        FormFieldDragNDropFileFullWidthExampleComponent,
        'Drag and drop full width',
        'The same field over all 12 columns, and its compact variant.'
      ),
    ],
    undefined,
    dragNDropFileFieldApi
  ),
  new ShowcaseRoute(
    'form-field-multi-lang',
    'Form Fields: Multi language',
    [
      new ShowcaseExample(
        FormFieldMultiLanguageExampleComponent,
        'Multi language',
        'One value per language. The control value is an object keyed by language code.'
      ),
    ],
    undefined,
    multiLangFieldApi
  ),
  new ShowcaseRoute(
    'form-field-nested-groups',
    'Form Fields: Nested groups',
    [
      new ShowcaseExample(
        FormFieldNestedGroupsExampleComponent,
        'Nested groups with a row',
        'A row with an attribute creates a nested FormGroup; without one its children are flattened.'
      ),
      new ShowcaseExample(
        FormFieldNestedGroupsByAttributeExampleComponent,
        'Nested groups by attributes',
        'A dotted attribute (a.b.c) creates the intermediate groups on its own.'
      ),
    ],
    undefined,
    nestedGroupsApi
  ),
  new ShowcaseRoute(
    'form-field-amount',
    'Form Fields: Amount',
    [
      new ShowcaseExample(
        FormFieldAmountExampleComponent,
        'Formatted amount field',
        'A number formatted for a locale and a currency. The control keeps the raw number.'
      ),
    ],
    undefined,
    amountFieldApi
  ),
  new ShowcaseRoute(
    'form-field-search',
    'Form Fields: Search',
    [
      new ShowcaseExample(
        FormFieldSearchExampleComponent,
        'Search field',
        'An input with a search icon and a clear button, debounced before it emits.'
      ),
    ],
    undefined,
    searchFieldApi
  ),
  new ShowcaseRoute(
    'form-field-editor',
    'Form Fields: Editor (Wysiwyg)',
    [
      new ShowcaseExample(
        FormFieldEditorExampleComponent,
        'Editor (Wysiwyg)',
        'A rich text editor. The control value is an HTML string.'
      ),
    ],
    undefined,
    editorFieldApi
  ),
] satisfies Routes;
