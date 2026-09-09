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
   *
   * Optional. By default the field takes the date format of the application and adds the time to it,
   * in the shape that the application's own `DateAdapter` reads, with seconds when `showSeconds` is
   * true. Set this option to print a different format, or when the application's own date format
   * already contains a time.
   */
  displayFormat?: DateAdapterDisplayFormat;
}

export interface FormFieldDateTimePicker<T extends string | number = string, D = Date>
  extends FormFieldBase<T, FormFieldDateTimePickerOptions<D>> {
  editType: EditType.DateTime;
}
