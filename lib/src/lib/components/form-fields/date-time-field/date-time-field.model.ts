import { EditType } from '../../../models/editType';
import { FormFieldBase } from '../../../models/form-field-base';
import { FormFieldDatePickerOptions } from '../date-field/date-field.model';

/**
 * Display format that a `DateAdapter` accepts: `Intl.DateTimeFormat` options for the native adapter,
 * a format string for the Luxon, Moment and date-fns adapters.
 */
export type DateAdapterDisplayFormat = Intl.DateTimeFormatOptions | string;

export interface FormFieldDateTimePickerOptions<T = Date> extends FormFieldDatePickerOptions<T> {
  showSeconds?: boolean;
  defaultTime?: [number, number, number];
  stepMinute?: number;
  /**
   * Format that the input uses to show the selected date and time. Give a value that the
   * `DateAdapter` of the application accepts.
   * Default: a date-time format for the native adapter, with seconds when `showSeconds` is true.
   */
  displayFormat?: DateAdapterDisplayFormat;
}

export interface FormFieldDateTimePicker<T extends string | number = string, D = Date>
  extends FormFieldBase<T, FormFieldDateTimePickerOptions<D>> {
  editType: EditType.DateTime;
}
