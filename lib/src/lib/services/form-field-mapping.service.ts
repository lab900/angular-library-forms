import { inject, Injectable, Type } from '@angular/core';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormComponent } from '../components/AbstractFormComponent';
import { EditType } from '../models/editType';
import { LAB900_FORM_FIELD_TYPES } from '../models/Lab900FormModuleSettings';

@Injectable()
export class FormFieldMappingService {
  private readonly lab900FormFieldTypes = inject(LAB900_FORM_FIELD_TYPES);
  private readonly inputFieldComponent = this.lab900FormFieldTypes.InputFieldComponent;
  private readonly passwordFieldComponent = this.lab900FormFieldTypes.PasswordFieldComponent;
  private readonly checkboxFieldComponent = this.lab900FormFieldTypes.CheckboxFieldComponent;
  private readonly wysiwygFieldComponent = this.lab900FormFieldTypes.WysiwygFieldComponent;
  private readonly dateFieldComponent = this.lab900FormFieldTypes.DateFieldComponent;
  private readonly dateYearMonthFieldComponent = this.lab900FormFieldTypes.DateYearMonthFieldComponent;
  private readonly fileFieldComponent = this.lab900FormFieldTypes.FileFieldComponent;
  private readonly filePreviewFieldComponent = this.lab900FormFieldTypes.FilePreviewFieldComponent;
  private readonly selectFieldComponent = this.lab900FormFieldTypes.SelectFieldComponent;
  private readonly textareaFieldComponent = this.lab900FormFieldTypes.TextareaFieldComponent;
  private readonly repeaterFieldComponent = this.lab900FormFieldTypes.RepeaterFieldComponent;
  private readonly radioButtonsFieldComponent = this.lab900FormFieldTypes.RadioButtonsFieldComponent;
  private readonly formRowComponent = this.lab900FormFieldTypes.FormRowComponent;
  private readonly formColumnComponent = this.lab900FormFieldTypes.FormColumnComponent;
  private readonly rangeSliderFieldComponent = this.lab900FormFieldTypes.RangeSliderFieldComponent;
  private readonly autocompleteFieldComponent = this.lab900FormFieldTypes.AutocompleteFieldComponent;
  private readonly autocompleteMultipleFieldComponent = this.lab900FormFieldTypes.AutocompleteMultipleFieldComponent;
  private readonly iconFieldComponent = this.lab900FormFieldTypes.IconFieldComponent;
  private readonly buttonToggleFieldComponent = this.lab900FormFieldTypes.ButtonToggleFieldComponent;
  private readonly buttonFieldComponent = this.lab900FormFieldTypes.ButtonFieldComponent;
  private readonly slideToggleFieldComponent = this.lab900FormFieldTypes.SlideToggleFieldComponent;
  private readonly dateRangeFieldComponent = this.lab900FormFieldTypes.DateRangeFieldComponent;
  private readonly dateTimeFieldComponent = this.lab900FormFieldTypes.DateTimeFieldComponent;
  private readonly multiLangInputFieldComponent = this.lab900FormFieldTypes.MultiLangInputFieldComponent;
  private readonly dragNDropFileFieldComponent = this.lab900FormFieldTypes.DragNDropFileFieldComponent;
  private readonly unknownFieldComponent = this.lab900FormFieldTypes.UnknownFieldComponent;
  private readonly amountFieldComponent = this.lab900FormFieldTypes.AmountFieldComponent;
  private readonly searchFieldComponent = this.lab900FormFieldTypes.SearchFieldComponent;

  public mapToComponent = (field: Lab900FormField): Type<FormComponent> => {
    switch (field.editType) {
      case EditType.Input:
        return this.inputFieldComponent;
      case EditType.Password:
        return this.passwordFieldComponent;
      case EditType.Checkbox:
        return this.checkboxFieldComponent;
      case EditType.Wysiwyg:
        return this.wysiwygFieldComponent;
      case EditType.Date:
        return this.dateFieldComponent;
      case EditType.DateYearMonth:
        return this.dateYearMonthFieldComponent;
      case EditType.FilePreview:
        return this.filePreviewFieldComponent;
      case EditType.Select:
        return this.selectFieldComponent;
      case EditType.TextArea:
        return this.textareaFieldComponent;
      case EditType.Repeater:
        return this.repeaterFieldComponent;
      case EditType.RadioButtons:
        return this.radioButtonsFieldComponent;
      case EditType.Row:
        return this.formRowComponent;
      case EditType.Column:
        return this.formColumnComponent;
      case EditType.RangeSlider:
        return this.rangeSliderFieldComponent;
      case EditType.Autocomplete:
        return this.autocompleteFieldComponent;
      case EditType.AutocompleteMultiple:
        return this.autocompleteMultipleFieldComponent;
      case EditType.Icon:
        return this.iconFieldComponent;
      case EditType.ButtonToggle:
        return this.buttonToggleFieldComponent;
      case EditType.Button:
        return this.buttonFieldComponent;
      case EditType.SlideToggle:
        return this.slideToggleFieldComponent;
      case EditType.DateRange:
        return this.dateRangeFieldComponent;
      case EditType.DateTime:
        return this.dateTimeFieldComponent;
      case EditType.MultiLangInput:
        return this.multiLangInputFieldComponent;
      case EditType.DragNDrop:
        return this.dragNDropFileFieldComponent;
      case EditType.Amount:
        return this.amountFieldComponent;
      case EditType.Search:
        return this.searchFieldComponent;
      default:
        return this.unknownFieldComponent;
    }
  };
}
