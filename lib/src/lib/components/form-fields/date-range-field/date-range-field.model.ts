import { EditType } from '../../../models/editType';
import { FormFieldBase } from '../../../models/form-field-base';
import { FormFieldDatePickerOptions } from '../date-field/date-field.model';

export interface FormFieldDateRangeOptions<T = Date>
  extends FormFieldDatePickerOptions<T> {
  startLabel?: string;
  endLabel?: string;
  startKey?: string;
  endKey?: string;
}

export interface FormFieldDateRange<
  T extends string | number = string,
  D = Date,
> extends FormFieldBase<T, FormFieldDateRangeOptions<D>> {
  editType: EditType.DateRange;
}
