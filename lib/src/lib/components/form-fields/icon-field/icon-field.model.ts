import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions, Icon, ReactiveOption } from '../../../models/form-field-base';

export interface FormFieldIconOptions extends FormFieldBaseOptions {
  /** The icon to show. Reactive, so it may follow the form value or a signal. */
  icon?: ReactiveOption<Icon>;
  /** The text next to the icon. A translation key. Reactive, like `icon`. */
  text?: ReactiveOption<string>;
}

/**
 * An icon with a line of text. It reads the form and renders; it holds no value and takes no input,
 * so use it for a status or a hint inside the layout rather than for something to fill in.
 *
 * An `attribute` is not needed. Give it one only when the icon depends on that control's own value.
 *
 * @example
 * {
 *   editType: EditType.Icon,
 *   options: {
 *     colspan: 12,
 *     icon: data => (data?.status === 'blocked' ? { name: 'block' } : { name: 'check_circle' }),
 *     text: data => (data?.status === 'blocked' ? 'label.account-blocked' : 'label.account-active'),
 *   },
 * }
 */
export interface FormFieldIcon<T extends string | number = string> extends FormFieldBase<T, FormFieldIconOptions> {
  editType: EditType.Icon;
}
