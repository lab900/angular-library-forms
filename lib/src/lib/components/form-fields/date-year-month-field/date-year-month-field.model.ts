import { EditType } from '../../../models/editType';
import { FormFieldBase } from '../../../models/form-field-base';
import { FormFieldDatePickerOptions } from '../date-field/date-field.model';

export interface FormFieldDateYearMonthPickerOptions<T = Date> extends FormFieldDatePickerOptions<T> {
  startView?: 'year' | 'multi-year';
}

export interface FormFieldDateYearMonthPicker<T extends string | number = string, D = Date>
  extends FormFieldBase<T, FormFieldDateYearMonthPickerOptions<D>> {
  editType: EditType.DateYearMonth;
}
