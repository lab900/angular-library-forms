import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
} from '../../../models/form-field-base';

export interface FormFieldDateYearMonthPickerOptions
  extends FormFieldBaseOptions {
  startView?: 'year' | 'multi-year';
  maxDate?: Date;
  minDate?: Date;
}

export interface FormFieldDateYearMonthPicker<
  T extends string | number = string
> extends FormFieldBase<T, FormFieldDateYearMonthPickerOptions> {
  editType: EditType.DateYearMonth;
}
