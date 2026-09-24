import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions, Icon } from '../../../models/form-field-base';

export interface FormFieldPasswordOptions extends FormFieldBaseOptions {
  /**
   * Focuses the input once it renders.
   * @default false
   */
  autofocus?: boolean;
  /**
   * Which way the text in the input is aligned.
   * @default 'left'
   */
  align?: 'left' | 'right';
  /** Inline CSS on the input element itself. */
  style?: string;
  /** The eye icon that switches the input between `password` and `text`. Shown unless `disabled`. */
  togglePasswordVisibility?: {
    /** Hides the toggle, so the value can never be read back. */
    disabled: boolean;
    /**
     * The icon shown while the password is readable, which switches back to hidden.
     * @default { name: 'visibility_off' }
     */
    passwordVisibleIcon?: Icon;
    /**
     * The icon shown while the password is masked, which reveals it.
     * @default { name: 'visibility' }
     */
    passwordHiddenIcon?: Icon;
  };
}

/**
 * A masked password input with a toggle that reveals the value.
 *
 * Nothing here validates the strength of a password: add `validators` or `options.pattern` for that.
 *
 * @example
 * {
 *   attribute: 'password',
 *   title: 'label.password',
 *   editType: EditType.Password,
 *   options: { required: true, minLength: 12 },
 * }
 */
export interface FormFieldPassword<T extends string | number = string>
  extends FormFieldBase<T, FormFieldPasswordOptions> {
  editType: EditType.Password;
  /** An icon inside the form field, before or after the input. */
  icon?: Icon & { position?: 'left' | 'right' };
}
