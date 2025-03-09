import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';

export interface FormFieldDragNDropFileOptions extends FormFieldBaseOptions {
  maxFiles: number;
  compact?: boolean;
  dropFilesText?: string;
  dropFilesButton?: string;
}

export interface FormFieldDragNDropFilePreview<T extends string | number = string>
  extends FormFieldBase<T, FormFieldDragNDropFileOptions> {
  editType: EditType.DragNDrop;
}
