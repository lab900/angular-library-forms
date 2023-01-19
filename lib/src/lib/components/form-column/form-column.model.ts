import { EditType } from '../../models/editType';
import {
  FormFieldBase,
  FormFieldBaseOptions,
} from '../../models/form-field-base';

export interface FormColumnOptions extends FormFieldBaseOptions {
  customClass?: string;
  customTitleClass?: string;
}

export interface FormColumn<T extends number | string = string>
  extends FormFieldBase<T, FormColumnOptions> {
  editType: EditType.Column;
}
