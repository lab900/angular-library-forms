import { EditType } from '../../../models/editType';
import { FormFieldBase } from '../../../models/form-field-base';
import { FormFieldDatePickerOptions } from '../date-field/date-field.model';

/**
 * Display format that a `DateAdapter` accepts: `Intl.DateTimeFormat` options for the native adapter,
 * a format string for the Luxon, Moment and date-fns adapters.
 */
export type DateAdapterDisplayFormat = Intl.DateTimeFormatOptions | string;

export interface FormFieldDateTimePickerOptions<T = Date> extends FormFieldDatePickerOptions<T> {
  /**
   * Adds seconds to the time picker and to the default display format.
   * @default false
   */
  showSeconds?: boolean;
  /** The time a freshly picked date starts at, as `[hours, minutes, seconds]`. Midnight when unset. */
  defaultTime?: [number, number, number];
  /**
   * How many minutes one step of the minute picker moves.
   * @default 1
   */
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

/**
 * A date with a time, from `@ngx-mce/datetime-picker`. The control value is one date, with the time
 * set on it.
 *
 * @example
 * {
 *   attribute: 'appointment',
 *   title: 'label.appointment',
 *   editType: EditType.DateTime,
 *   options: { minDate: new Date(), stepMinute: 15, defaultTime: [9, 0, 0] },
 * }
 */
export interface FormFieldDateTimePicker<T extends string | number = string, D = Date>
  extends FormFieldBase<T, FormFieldDateTimePickerOptions<D>> {
  editType: EditType.DateTime;
}
