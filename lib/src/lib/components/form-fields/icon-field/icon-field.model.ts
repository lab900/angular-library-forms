import { EditType } from '../../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
  FormIcon,
} from '../../../models/form-field-base';

export interface FormFieldIconOptions extends FormFieldBaseOptions {
  icon?: FormIcon;
}

export interface FormFieldIcon<T extends string | number = string>
  extends FormFieldBase<T, FormFieldIconOptions> {
  editType: EditType.Icon;
}
