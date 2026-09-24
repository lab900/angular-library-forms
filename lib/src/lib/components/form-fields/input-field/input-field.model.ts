import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions, Icon } from '../../../models/form-field-base';
import { NgxMaskConfig } from 'ngx-mask';

/**
 * An `ngx-mask` configuration. Only `mask` is required; the rest of `NgxMaskConfig` overrides the
 * application defaults from `provideLab900Forms({ fieldMask })` for this one field.
 *
 * @example
 * fieldMask: { mask: '000/0000/0000' } // a Belgian company number
 */
export interface FieldMask extends Partial<NgxMaskConfig> {
  /** The mask pattern, for example `'000.000-00'`. See the ngx-mask documentation for the tokens. */
  mask: string;
}

/**
 * @see https://material.angular.io/components/input/overview#supported-input-types
 */
export type InputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface FormFieldInputOptions extends FormFieldBaseOptions {
  /**
   * The `type` of the native input. `'number'` also makes the control validate as a number.
   * @default 'text'
   */
  type?: InputType;
  /**
   * Focuses the input once it renders. With more than one on a page the last one wins.
   * @default false
   */
  autofocus?: boolean;
  /** Text after the input, inside the form field. A translation key, or a function of the form value. */
  suffix?: string | ((data?: any) => string);
  /** Text before the input, inside the form field. A translation key, or a function of the form value. */
  prefix?: string | ((data?: any) => string);
  /**
   * Which way the text in the input is aligned.
   * @default 'left'
   */
  align?: 'left' | 'right';
  /** Formats what is typed through `ngx-mask`. Requires `provideNgxMask()` in the application. */
  fieldMask?: FieldMask;
  /**
   * Shows a character counter under the field. It needs a `maxLength` to count against. The
   * application-wide default is `provideLab900Forms({ formField: { showLengthIndicator } })`; this
   * option turns it on for one field.
   */
  showLengthIndicator?: boolean;
  /** Inline CSS on the input element itself. */
  style?: string;
}

/**
 * A single line text input, the default field type.
 *
 * @example
 * {
 *   attribute: 'email',
 *   title: 'label.email',
 *   editType: EditType.Input,
 *   validators: [Validators.email],
 *   errorMessages: { email: 'label.email-error' },
 *   options: { type: 'email', colspan: 6, required: true },
 * }
 */
export interface FormFieldInput<T extends string | number = string> extends FormFieldBase<T, FormFieldInputOptions> {
  editType: EditType.Input;
  /** An icon inside the form field, before or after the input. */
  icon?: Icon & { position?: 'left' | 'right' };
}
