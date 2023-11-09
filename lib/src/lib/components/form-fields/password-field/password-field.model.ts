import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
  FormIcon,
} from '../../../models/form-field-base';

export interface FormFieldPasswordOptions extends FormFieldBaseOptions {
  autofocus?: boolean;
  align?: 'left' | 'right';
  style?: string;
  togglePasswordVisibility?: {
    disabled: boolean;
    passwordVisibleIcon?: FormIcon;
    passwordHiddenIcon?: FormIcon;
  };
}

export interface FormFieldPassword<T extends string | number = string>
  extends FormFieldBase<T, FormFieldPasswordOptions> {
  editType: EditType.Password;
  icon?: FormIcon;
}
