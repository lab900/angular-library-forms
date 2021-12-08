import { Inject, Injectable, Type } from '@angular/core';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormComponent } from '../components/AbstractFormComponent';
import { EditType } from '../models/editType';
import { LAB900_FORM_FIELD_TYPES } from '../models/Lab900FormModuleSettings';

@Injectable()
export class FormFieldMappingService {
  public inputFieldComponent: Type<FormComponent>;
  public checkboxFieldComponent: Type<FormComponent>;
  public wysiwygFieldComponent: Type<FormComponent>;
  public dateFieldComponent: Type<FormComponent>;
  public fileFieldComponent: Type<FormComponent>;
  public filePreviewFieldComponent: Type<FormComponent>;
  public selectFieldComponent: Type<FormComponent>;
  public textareaFieldComponent: Type<FormComponent>;
  public repeaterFieldComponent: Type<FormComponent>;
  public radioButtonsFieldComponent: Type<FormComponent>;
  public formRowComponent: Type<FormComponent>;
  public rangeSliderFieldComponent: Type<FormComponent>;
  public autocompleteFieldComponent: Type<FormComponent>;
  public autocompleteMultipleFieldComponent: Type<FormComponent>;
  public iconFieldComponent: Type<FormComponent>;
  public buttonToggleFieldComponent: Type<FormComponent>;
  public buttonFieldComponent: Type<FormComponent>;
  public slideToggleFieldComponent: Type<FormComponent>;
  public dateRangeFieldComponent: Type<FormComponent>;
  public dateTimeFieldComponent: Type<FormComponent>;
  public multiLangInputFieldComponent: Type<FormComponent>;
  public dragNDropFileFieldComponent: Type<FormComponent>;
  public unknownFieldComponent: Type<FormComponent>;

  public constructor(@Inject(LAB900_FORM_FIELD_TYPES) lab900FormFieldTypes) {
    this.inputFieldComponent = lab900FormFieldTypes.InputFieldComponent;
    this.checkboxFieldComponent = lab900FormFieldTypes.CheckboxFieldComponent;
    this.wysiwygFieldComponent = lab900FormFieldTypes.WysiwygFieldComponent;
    this.dateFieldComponent = lab900FormFieldTypes.DateFieldComponent;
    this.fileFieldComponent = lab900FormFieldTypes.FileFieldComponent;
    this.filePreviewFieldComponent =
      lab900FormFieldTypes.FilePreviewFieldComponent;
    this.selectFieldComponent = lab900FormFieldTypes.SelectFieldComponent;
    this.textareaFieldComponent = lab900FormFieldTypes.TextareaFieldComponent;
    this.repeaterFieldComponent = lab900FormFieldTypes.RepeaterFieldComponent;
    this.radioButtonsFieldComponent =
      lab900FormFieldTypes.RadioButtonsFieldComponent;
    this.formRowComponent = lab900FormFieldTypes.FormRowComponent;
    this.rangeSliderFieldComponent =
      lab900FormFieldTypes.RangeSliderFieldComponent;
    this.autocompleteFieldComponent =
      lab900FormFieldTypes.AutocompleteFieldComponent;
    this.autocompleteMultipleFieldComponent =
      lab900FormFieldTypes.AutocompleteMultipleFieldComponent;
    this.iconFieldComponent = lab900FormFieldTypes.IconFieldComponent;
    this.buttonToggleFieldComponent =
      lab900FormFieldTypes.ButtonToggleFieldComponent;
    this.buttonFieldComponent = lab900FormFieldTypes.ButtonFieldComponent;
    this.slideToggleFieldComponent =
      lab900FormFieldTypes.SlideToggleFieldComponent;
    this.dateRangeFieldComponent = lab900FormFieldTypes.DateRangeFieldComponent;
    this.dateTimeFieldComponent = lab900FormFieldTypes.DateTimeFieldComponent;
    this.multiLangInputFieldComponent =
      lab900FormFieldTypes.MultiLangInputFieldComponent;
    this.dragNDropFileFieldComponent =
      lab900FormFieldTypes.DragNDropFileFieldComponent;
    this.unknownFieldComponent = lab900FormFieldTypes.UnknownFieldComponent;
  }

  public mapToComponent = (field: Lab900FormField): Type<FormComponent> => {
    switch (field.editType) {
      case EditType.Input:
        return this.inputFieldComponent;
      case EditType.Checkbox:
        return this.checkboxFieldComponent;
      case EditType.Wysiwyg:
        return this.wysiwygFieldComponent;
      case EditType.Date:
        return this.dateFieldComponent;
      case EditType.File:
        return this.fileFieldComponent;
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
      default:
        return this.unknownFieldComponent;
    }
  };
}
