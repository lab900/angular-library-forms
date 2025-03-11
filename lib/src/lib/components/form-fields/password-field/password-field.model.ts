import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions, Icon } from '../../../models/form-field-base';

export interface FormFieldPasswordOptions extends FormFieldBaseOptions {
  autofocus?: boolean;
  align?: 'left' | 'right';
  style?: string;
  togglePasswordVisibility?: {
    disabled: boolean;
    passwordVisibleIcon?: Icon;
    passwordHiddenIcon?: Icon;
  };
}

export interface FormFieldPassword<T extends string | number = string>
  extends FormFieldBase<T, FormFieldPasswordOptions> {
  editType: EditType.Password;
  icon?: Icon & { position?: 'left' | 'right' };
}
