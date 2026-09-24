import { EditType } from '../../../models/editType';
import { FormFieldBase } from '../../../models/form-field-base';
import { FormFieldDatePickerOptions } from '../date-field/date-field.model';

export interface FormFieldDateYearMonthPickerOptions<T = Date> extends FormFieldDatePickerOptions<T> {
  /**
   * Which panel the calendar opens on. The month panel is not offered here: picking a month closes
   * the calendar.
   * @default 'multi-year'
   */
  startView?: 'year' | 'multi-year';
}

/**
 * A picker that stops at the month: the calendar closes once a month is chosen and never shows days.
 * The control value is still a full date, on the first day of that month.
 *
 * @example
 * {
 *   attribute: 'expiresOn',
 *   title: 'label.expires-on',
 *   editType: EditType.DateYearMonth,
 *   options: { minDate: new Date(), startView: 'year' },
 * }
 */
export interface FormFieldDateYearMonthPicker<T extends string | number = string, D = Date>
  extends FormFieldBase<T, FormFieldDateYearMonthPickerOptions<D>> {
  editType: EditType.DateYearMonth;
}
