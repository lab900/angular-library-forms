import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AutocompleteFieldComponent } from './components/form-fields/autocomplete-field/autocomplete-field.component';
import { AutocompleteMultipleFieldComponent } from './components/form-fields/autocomplete-multiple-field/autocomplete-multiple-field.component';
import { ButtonFieldComponent } from './components/form-fields/button-field/button-field.component';
import { ButtonToggleFieldComponent } from './components/form-fields/button-toggle-field/button-toggle-field.component';
import { CheckboxFieldComponent } from './components/form-fields/checkbox-field/checkbox-field.component';
import { DateFieldComponent } from './components/form-fields/date-field/date-field.component';
import { DateYearMonthFieldComponent } from './components/form-fields/date-year-month-field/date-year-month-field.component';
import { DateRangeFieldComponent } from './components/form-fields/date-range-field/date-range-field.component';
import { DateTimeFieldComponent } from './components/form-fields/date-time-field/date-time-field.component';
import { DragNDropFileFieldComponent } from './components/form-fields/drag-n-drop-file-field/drag-n-drop-file-field.component';
import { FilePreviewFieldComponent } from './components/form-fields/file-preview-field/file-preview-field.component';
import { IconFieldComponent } from './components/form-fields/icon-field/icon-field.component';
import { InputFieldComponent } from './components/form-fields/input-field/input-field.component';
import { MultiLangInputFieldComponent } from './components/form-fields/multi-lang-input/multi-lang-input-field.component';
import { RadioButtonsFieldComponent } from './components/form-fields/radio-buttons-field/radio-buttons-field.component';
import { RangeSliderFieldComponent } from './components/form-fields/range-slider-field/range-slider-field.component';
import { ReadonlyFieldComponent } from './components/form-fields/readonly-field/readonly-field.component';
import { RepeaterFieldComponent } from './components/form-fields/repeater-field/repeater-field.component';
import { SelectFieldComponent } from './components/form-fields/select-field/select-field.component';
import { SlideToggleFieldComponent } from './components/form-fields/slide-toggle-field/slide-toggle-field.component';
import { TextareaFieldComponent } from './components/form-fields/textarea-field/textarea-field.component';
import { UnknownFieldComponent } from './components/form-fields/unknown-field/unknown-field.component';
import { WysiwygFieldComponent } from './components/form-fields/wysiwyg-field/wysiwyg-field.component';
import { FormRowComponent } from './components/form-row/form-row.component';
import {
  defaultFormModuleSettings,
  LAB900_FORM_FIELD_TYPES,
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from './models/Lab900FormModuleSettings';
import { Lab900FormBuilderService } from './services/form-builder.service';
import { PasswordFieldComponent } from './components/form-fields/password-field/password-field.component';
import { AmountFieldComponent } from './components/form-fields/amount-field/amount-field.component';
import { FormColumnComponent } from './components/form-column/form-column.component';
import { SearchFieldComponent } from './components/form-fields/search-field/search-field.component';
import { FormFieldMappingService } from './services/form-field-mapping.service';

export function provideLab900Forms(
  settings: Lab900FormModuleSettings = defaultFormModuleSettings,
): EnvironmentProviders {
  const formSetting: Lab900FormModuleSettings = {
    formField: {
      ...defaultFormModuleSettings.formField,
      ...(settings?.formField ?? {}),
    },
    fieldMask: {
      ...defaultFormModuleSettings.fieldMask,
      ...(settings?.fieldMask ?? {}),
    },
    amountField: {
      ...defaultFormModuleSettings.amountField,
      ...(settings?.amountField ?? {}),
    },
    disableBrowserAutocomplete: settings?.disableBrowserAutocomplete ?? false,
  };
  return makeEnvironmentProviders([
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: formSetting.formField,
    },
    {
      provide: LAB900_FORM_MODULE_SETTINGS,
      useValue: formSetting,
    },
    {
      provide: LAB900_FORM_FIELD_TYPES,
      useValue: {
        UnknownFieldComponent,
        InputFieldComponent,
        PasswordFieldComponent,
        SelectFieldComponent,
        FilePreviewFieldComponent,
        DragNDropFileFieldComponent,
        CheckboxFieldComponent,
        DateFieldComponent,
        DateYearMonthFieldComponent,
        WysiwygFieldComponent,
        TextareaFieldComponent,
        RepeaterFieldComponent,
        FormRowComponent,
        FormColumnComponent,
        RadioButtonsFieldComponent,
        RangeSliderFieldComponent,
        AutocompleteFieldComponent,
        AutocompleteMultipleFieldComponent,
        IconFieldComponent,
        ButtonToggleFieldComponent,
        ButtonFieldComponent,
        SlideToggleFieldComponent,
        ReadonlyFieldComponent,
        DateRangeFieldComponent,
        DateTimeFieldComponent,
        MultiLangInputFieldComponent,
        AmountFieldComponent,
        SearchFieldComponent,
      },
    },
    Lab900FormBuilderService,
    FormFieldMappingService,
  ]);
}
