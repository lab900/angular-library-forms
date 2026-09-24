import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
  Icon,
  ReactiveNumberOption,
  ReactiveStringOption,
} from '../../../models/form-field-base';

/**
 * The decimal settings on their own, for formatting an amount outside a form: `getAmountFormatter()`
 * and the `amount` pipe take these. A field takes {@link AmountFieldInputOptions} instead.
 *
 * @example
 * {{ order.total | amount: { minDecimals: 2, maxDecimals: 2 } }}
 */
export interface AmountOptions extends FormFieldBaseOptions {
  /**
   * The most decimals to print.
   * @default 2
   */
  maxDecimals?: number;
  /**
   * The fewest decimals to print, padding with zeroes.
   * @default 0
   */
  minDecimals?: number;
}

export interface AmountFieldInputOptions extends FormFieldBaseOptions {
  /**
   * Focuses the input once it renders.
   * @default false
   */
  autofocus?: boolean;
  /**
   * The most decimals the value is formatted to. Overrides
   * `provideLab900Forms({ amountField: { maxDecimals } })` for this field.
   * @default 2
   */
  maxDecimals?: ReactiveNumberOption;
  /**
   * The fewest decimals the value is padded to. Overrides
   * `provideLab900Forms({ amountField: { minDecimals } })` for this field.
   * @default 0
   */
  minDecimals?: ReactiveNumberOption;
  /** Text after the input, typically a currency. A translation key. */
  suffix?: ReactiveStringOption;
  /** Text before the input, typically a currency. A translation key. */
  prefix?: ReactiveStringOption;
  /**
   * Which way the number is aligned. Amounts usually read better on the right.
   * @default 'left'
   */
  align?: 'left' | 'right';
  /** Inline CSS on the input element itself. */
  style?: string;
}

/**
 * A number input that formats as the user types: thousand separators and a fixed number of decimals,
 * in the locale of `provideLab900Forms({ amountField: { locale } })` or of the application.
 *
 * The control value stays a `number`, so nothing has to be parsed back.
 *
 * @example
 * {
 *   attribute: 'price',
 *   title: 'label.price',
 *   editType: EditType.Amount,
 *   options: { prefix: '€', minDecimals: 2, maxDecimals: 2, align: 'right' },
 * }
 */
export interface FormFieldAmount<T extends string | number = string> extends FormFieldBase<T, AmountFieldInputOptions> {
  editType: EditType.Amount;
  /** An icon inside the form field, before or after the input. */
  icon?: Icon & { position?: 'left' | 'right' };
}
