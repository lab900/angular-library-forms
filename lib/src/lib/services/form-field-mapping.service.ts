import { Inject, Injectable, Type } from '@angular/core';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormComponent } from '../components/AbstractFormComponent';
import { EditType } from '../models/editType';
import { LAB900_FORM_FIELD_TYPES } from '../models/Lab900FormModuleSettings';

@Injectable({ providedIn: 'root' })
export class FormFieldMappingService {
  private readonly inputFieldComponent: Type<FormComponent>;
  private readonly checkboxFieldComponent: Type<FormComponent>;
  private readonly wysiwygFieldComponent: Type<FormComponent>;
  private readonly dateFieldComponent: Type<FormComponent>;
  private readonly fileFieldComponent: Type<FormComponent>;
  private readonly filePreviewFieldComponent: Type<FormComponent>;
  private readonly selectFieldComponent: Type<FormComponent>;
  private readonly textareaFieldComponent: Type<FormComponent>;
  private readonly repeaterFieldComponent: Type<FormComponent>;
  private readonly radioButtonsFieldComponent: Type<FormComponent>;
  private readonly formRowComponent: Type<FormComponent>;
  private readonly rangeSliderFieldComponent: Type<FormComponent>;
  private readonly autocompleteFieldComponent: Type<FormComponent>;
  private readonly autocompleteMultipleFieldComponent: Type<FormComponent>;
  private readonly iconFieldComponent: Type<FormComponent>;
  private readonly buttonToggleFieldComponent: Type<FormComponent>;
  private readonly buttonFieldComponent: Type<FormComponent>;
  private readonly slideToggleFieldComponent: Type<FormComponent>;
  private readonly dateRangeFieldComponent: Type<FormComponent>;
  private readonly dateTimeFieldComponent: Type<FormComponent>;
  private readonly multiLangInputFieldComponent: Type<FormComponent>;
  private readonly dragNDropFileFieldComponent: Type<FormComponent>;
  private readonly unknownFieldComponent: Type<FormComponent>;

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
