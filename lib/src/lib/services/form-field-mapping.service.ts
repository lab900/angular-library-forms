import { inject, Injectable, Type } from '@angular/core';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormComponent } from '../components/AbstractFormComponent';
import { EditType } from '../models/editType';
import { LAB900_FORM_FIELD_TYPES } from '../models/Lab900FormModuleSettings';
import { describeField, devWarnOnce } from '../utils/dev-warnings';

/**
 * The key in `LAB900_FORM_FIELD_TYPES` that renders each edit type.
 *
 * The token is keyed by component class name, not by `EditType`, so a consumer overrides one field by
 * providing the token again with the same key and another class. That shape is what it has always
 * been; this map only replaced the switch that restated it.
 *
 * `EditType.File` is deliberately absent. It is deprecated, no component is registered for it, and the
 * switch never had a case for it either: it renders `UnknownFieldComponent`, now with a warning that
 * says to use `EditType.FilePreview`.
 */
const COMPONENT_KEY_BY_EDIT_TYPE: Readonly<Partial<Record<EditType, string>>> = {
  [EditType.Input]: 'InputFieldComponent',
  [EditType.Password]: 'PasswordFieldComponent',
  [EditType.Checkbox]: 'CheckboxFieldComponent',
  [EditType.Wysiwyg]: 'WysiwygFieldComponent',
  [EditType.Date]: 'DateFieldComponent',
  [EditType.DateYearMonth]: 'DateYearMonthFieldComponent',
  [EditType.DateRange]: 'DateRangeFieldComponent',
  [EditType.DateTime]: 'DateTimeFieldComponent',
  [EditType.FilePreview]: 'FilePreviewFieldComponent',
  [EditType.DragNDrop]: 'DragNDropFileFieldComponent',
  [EditType.Select]: 'SelectFieldComponent',
  [EditType.Search]: 'SearchFieldComponent',
  [EditType.TextArea]: 'TextareaFieldComponent',
  [EditType.Repeater]: 'RepeaterFieldComponent',
  [EditType.RadioButtons]: 'RadioButtonsFieldComponent',
  [EditType.RangeSlider]: 'RangeSliderFieldComponent',
  [EditType.Row]: 'FormRowComponent',
  [EditType.Column]: 'FormColumnComponent',
  [EditType.Icon]: 'IconFieldComponent',
  [EditType.ButtonToggle]: 'ButtonToggleFieldComponent',
  [EditType.Button]: 'ButtonFieldComponent',
  [EditType.SlideToggle]: 'SlideToggleFieldComponent',
  [EditType.MultiLangInput]: 'MultiLangInputFieldComponent',
  [EditType.Amount]: 'AmountFieldComponent',
  [EditType.Autocomplete]: 'AutocompleteFieldComponent',
  [EditType.AutocompleteMultiple]: 'AutocompleteMultipleFieldComponent',
};

/** The key of the fallback, rendered whenever an edit type resolves to nothing. */
const UNKNOWN_FIELD_KEY = 'UnknownFieldComponent';

@Injectable()
export class FormFieldMappingService {
  private readonly lab900FormFieldTypes = inject(LAB900_FORM_FIELD_TYPES);

  /**
   * The component that renders a field. An edit type with no component renders
   * `UnknownFieldComponent`, which looks like a rendered form and asserts nothing in a test, so in
   * development both ways of getting there also warn.
   */
  public mapToComponent = (field: Lab900FormField): Type<FormComponent> => {
    const editType = field?.editType;
    const key = COMPONENT_KEY_BY_EDIT_TYPE[editType];
    if (!key) {
      // `EditType.File` is not part of the Lab900FormField union, so only an untyped schema reaches it.
      const deprecatedFile = String(editType) === EditType.File;
      devWarnOnce(
        `unknown-edit-type:${editType}`,
        `Unknown editType "${editType}" on ${describeField(field?.attribute, String(editType))}. ` +
          `It renders UnknownFieldComponent. Pick a member of the EditType enum` +
          `${deprecatedFile ? '; EditType.File is deprecated, use EditType.FilePreview' : ''}.`
      );
      return this.lab900FormFieldTypes[UNKNOWN_FIELD_KEY];
    }
    const component = this.lab900FormFieldTypes[key];
    if (!component) {
      devWarnOnce(
        `unregistered-component:${key}`,
        `No component registered under "${key}" for editType "${editType}", so ${describeField(
          field?.attribute,
          String(editType)
        )} renders UnknownFieldComponent. A custom LAB900_FORM_FIELD_TYPES value has to carry every key ` +
          `that provideLab900Forms() registers.`
      );
      return this.lab900FormFieldTypes[UNKNOWN_FIELD_KEY];
    }
    return component;
  };
}
