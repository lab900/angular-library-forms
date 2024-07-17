import { EditType } from '../../../models/editType';
import { FormFieldBase } from '../../../models/form-field-base';
import { FormFieldDatePickerOptions } from '../date-field/date-field.model';

export interface FormFieldDateTimePickerOptions<T = Date>
  extends FormFieldDatePickerOptions<T> {
  showSeconds?: boolean;
  defaultTime?: [number, number, number];
  stepMinute?: number;
}

export interface FormFieldDateTimePicker<
  T extends string | number = string,
  D = Date,
> extends FormFieldBase<T, FormFieldDateTimePickerOptions<D>> {
  editType: EditType.DateTime;
}
