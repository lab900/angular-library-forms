import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions, Icon, ReactiveOption } from '../../../models/form-field-base';

export interface FormFieldIconOptions extends FormFieldBaseOptions {
  icon?: ReactiveOption<Icon>;
}

export interface FormFieldIcon<T extends string | number = string> extends FormFieldBase<T, FormFieldIconOptions> {
  editType: EditType.Icon;
}
