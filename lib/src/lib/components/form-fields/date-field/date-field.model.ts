import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

/**
 * The options every date field shares. `T` is the date type of the application's `DateAdapter`:
 * `Date` with `provideNativeDateAdapter()`, or a Luxon, Moment or date-fns type with theirs.
 */
export interface FormFieldDatePickerOptions<T = Date> extends FormFieldBaseOptions {
  /**
   * Which panel the calendar opens on.
   * @default 'month'
   */
  startView?: 'month' | 'year' | 'multi-year';
  /** The latest date that can be picked. It also blocks a later date typed into the input. */
  maxDate?: T;
  /** The earliest date that can be picked. It also blocks an earlier date typed into the input. */
  minDate?: T;
  /**
   * Function to filter which dates are selectable in the datepicker
   */
  dateFilter?: (date: T | null) => boolean;
  /**
   * Function that can be used to add custom CSS classes to dates
   */
  dateClass?: MatCalendarCellClassFunction<T>;
}

/**
 * A date picker. The control value is whatever the application's `DateAdapter` produces, so the form
 * needs `provideNativeDateAdapter()` or another adapter.
 *
 * @example
 * {
 *   attribute: 'birthDate',
 *   title: 'label.birth-date',
 *   editType: EditType.Date,
 *   options: { maxDate: new Date(), startView: 'multi-year' },
 * }
 */
export interface FormFieldDatePicker<T extends string | number = string, D = Date>
  extends FormFieldBase<T, FormFieldDatePickerOptions<D>> {
  editType: EditType.Date;
}
