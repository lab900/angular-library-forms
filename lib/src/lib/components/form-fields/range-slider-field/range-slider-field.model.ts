import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';

export interface FormFieldRangeSliderOptions extends FormFieldBaseOptions {
  /**
   * The label of the lower bound. A translation key.
   * @default 'From'
   */
  fromLabel?: string;
  /**
   * The label of the upper bound. A translation key.
   * @default 'To'
   */
  toLabel?: string;
  /**
   * No effect: nothing reads this option. The number inputs next to the slider are always rendered.
   * @deprecated
   */
  enabledInputs?: boolean;
  /** How far one step of the slider moves. Continuous when it is not set. */
  steps?: number;
  /**
   * How the bounds are printed. `'K-M'` shortens thousands to `k` and millions to `m`, and reads them
   * back, so `12 k` is 12000.
   * @default 'DEFAULT'
   */
  format?: 'K-M' | 'DEFAULT';
}

/**
 * A slider with a lower and an upper bound. The control value is a `[from, to]` tuple, and it starts
 * at `[min, max]` when the data holds nothing.
 *
 * `options.min` and `options.max` are the ends of the slider here, not only validators, and they
 * default to 0 and 100.
 *
 * @example
 * {
 *   attribute: 'priceRange',
 *   title: 'label.price-range',
 *   editType: EditType.RangeSlider,
 *   options: { min: 0, max: 1000000, steps: 1000, format: 'K-M' },
 * }
 */
export interface FormFieldRangeSlider<T extends string | number = string>
  extends FormFieldBase<T, FormFieldRangeSliderOptions> {
  editType: EditType.RangeSlider;
}
