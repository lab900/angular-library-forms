import { Type } from '@angular/core';
import { FormComponent } from '../components/AbstractFormComponent';
import { EditType } from './editType';
import { InputFieldComponent } from '../components/form-fields/input-field/input-field.component';
import { PasswordFieldComponent } from '../components/form-fields/password-field/password-field.component';
import { CheckboxFieldComponent } from '../components/form-fields/checkbox-field/checkbox-field.component';
import { WysiwygFieldComponent } from '../components/form-fields/wysiwyg-field/wysiwyg-field.component';
import { DateFieldComponent } from '../components/form-fields/date-field/date-field.component';
import { DateYearMonthFieldComponent } from '../components/form-fields/date-year-month-field/date-year-month-field.component';
import { FilePreviewFieldComponent } from '../components/form-fields/file-preview-field/file-preview-field.component';
import { SelectFieldComponent } from '../components/form-fields/select-field/select-field.component';
import { TextareaFieldComponent } from '../components/form-fields/textarea-field/textarea-field.component';
import { ReadonlyFieldComponent } from '../components/form-fields/readonly-field/readonly-field.component';
import { RadioButtonsFieldComponent } from '../components/form-fields/radio-buttons-field/radio-buttons-field.component';
import { FormRowComponent } from '../components/form-row/form-row.component';
import { FormColumnComponent } from '../components/form-column/form-column.component';
import { RangeSliderFieldComponent } from '../components/form-fields/range-slider-field/range-slider-field.component';
import { IconFieldComponent } from '../components/form-fields/icon-field/icon-field.component';
import { ButtonToggleFieldComponent } from '../components/form-fields/button-toggle-field/button-toggle-field.component';
import { ButtonFieldComponent } from '../components/form-fields/button-field/button-field.component';
import { SlideToggleFieldComponent } from '../components/form-fields/slide-toggle-field/slide-toggle-field.component';
import { DateRangeFieldComponent } from '../components/form-fields/date-range-field/date-range-field.component';
import { DateTimeFieldComponent } from '../components/form-fields/date-time-field/date-time-field.component';
import { MultiLangInputFieldComponent } from '../components/form-fields/multi-lang-input/multi-lang-input-field.component';
import { DragNDropFileFieldComponent } from '../components/form-fields/drag-n-drop-file-field/drag-n-drop-file-field.component';
import { AmountFieldComponent } from '../components/form-fields/amount-field/amount-field.component';
import { SearchFieldComponent } from '../components/form-fields/search-field/search-field.component';
import { UnknownFieldComponent } from '../components/form-fields/unknown-field/unknown-field.component';
import { RepeaterFieldComponent } from '../components/form-fields/repeater-field/repeater-field.component';

export const mapToComponent = (
  editType: EditType,
  readonly: boolean
): Type<FormComponent> => {
  if (
    readonly &&
    ![
      EditType.Row,
      EditType.Column,
      EditType.Select,
      EditType.FilePreview,
      EditType.ButtonToggle,
      EditType.SlideToggle,
      EditType.Button,
    ].includes(editType)
  ) {
    return ReadonlyFieldComponent;
  }
  switch (editType) {
    case EditType.Input:
      return InputFieldComponent;
    case EditType.Password:
      return PasswordFieldComponent;
    case EditType.Checkbox:
      return CheckboxFieldComponent;
    case EditType.Wysiwyg:
      return WysiwygFieldComponent;
    case EditType.Date:
      return DateFieldComponent;
    case EditType.DateYearMonth:
      return DateYearMonthFieldComponent;
    case EditType.FilePreview:
      return FilePreviewFieldComponent;
    case EditType.Select:
      return SelectFieldComponent;
    case EditType.TextArea:
      return TextareaFieldComponent;
    case EditType.Repeater:
      return RepeaterFieldComponent;
    case EditType.RadioButtons:
      return RadioButtonsFieldComponent;
    case EditType.Row:
      return FormRowComponent;
    case EditType.Column:
      return FormColumnComponent;
    case EditType.RangeSlider:
      return RangeSliderFieldComponent;
    case EditType.Icon:
      return IconFieldComponent;
    case EditType.ButtonToggle:
      return ButtonToggleFieldComponent;
    case EditType.Button:
      return ButtonFieldComponent;
    case EditType.SlideToggle:
      return SlideToggleFieldComponent;
    case EditType.DateRange:
      return DateRangeFieldComponent;
    case EditType.DateTime:
      return DateTimeFieldComponent;
    case EditType.MultiLangInput:
      return MultiLangInputFieldComponent;
    case EditType.DragNDrop:
      return DragNDropFileFieldComponent;
    case EditType.Amount:
      return AmountFieldComponent;
    case EditType.Search:
      return SearchFieldComponent;
    default:
      return UnknownFieldComponent;
  }
};
