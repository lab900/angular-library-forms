import { EditType } from '../../../models/editType';
import { FormFieldBase } from '../../../models/form-field-base';
import { FormFieldDatePickerOptions } from '../date-field/date-field.model';

export interface FormFieldDateRangeOptions<T = Date> extends FormFieldDatePickerOptions<T> {
  /**
   * The placeholder of the start input. A translation key.
   * @default 'Start date'
   */
  startLabel?: string;
  /**
   * The placeholder of the end input. A translation key.
   * @default 'End date'
   */
  endLabel?: string;
  /**
   * The name of the control that holds the start date inside the field's group.
   * @default 'start'
   */
  startKey?: string;
  /**
   * The name of the control that holds the end date inside the field's group.
   * @default 'end'
   */
  endKey?: string;
}

/**
 * A start and an end date in one field. Unlike the other date fields it holds a **group** of two
 * controls, not one value, so the data for it is an object:
 *
 * ```ts
 * { holiday: { start: new Date('2026-07-01'), end: new Date('2026-07-15') } }
 * ```
 *
 * Rename those two keys with `startKey` and `endKey` when the data already uses other names.
 *
 * @example
 * {
 *   attribute: 'holiday',
 *   title: 'label.holiday',
 *   editType: EditType.DateRange,
 *   options: { minDate: new Date(), startKey: 'from', endKey: 'until' },
 * }
 */
export interface FormFieldDateRange<T extends string | number = string, D = Date>
  extends FormFieldBase<T, FormFieldDateRangeOptions<D>> {
  editType: EditType.DateRange;
}
