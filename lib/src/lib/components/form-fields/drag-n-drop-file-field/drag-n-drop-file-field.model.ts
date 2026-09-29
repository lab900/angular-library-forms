import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';

export interface FormFieldDragNDropFileOptions extends FormFieldBaseOptions {
  /**
   * How many files the field accepts. It also adds a validator, so more than this many files makes
   * the control invalid rather than dropping the extras. `1` renders the field as a single file
   * picker; anything else, or nothing, allows a multiple selection.
   */
  maxFiles: number;
  /**
   * Renders the drop zone at a reduced height once a file has been picked, for a form where the field
   * is not the main subject.
   * @default false
   */
  compact?: boolean;
  /**
   * The instruction in the drop zone, which is also its accessible name. A translation key.
   * @default 'Drop Files'
   */
  dropFilesText?: string;
  /**
   * The label of the button that opens the file picker. A translation key.
   * @default 'Upload Files'
   */
  dropFilesButton?: string;
}

/**
 * A drop zone that takes files by drag and drop or through a file picker. The control value is a
 * `File[]`; use `EditType.FilePreview` for files that are already stored and have a preview.
 *
 * `options.maxFiles` and `options.required` both become validators, so the form is invalid while the
 * file count is wrong.
 *
 * @example
 * {
 *   attribute: 'attachments',
 *   title: 'label.attachments',
 *   editType: EditType.DragNDrop,
 *   options: { maxFiles: 3, required: true, dropFilesText: 'label.drop-files' },
 * }
 */
export interface FormFieldDragNDropFilePreview<T extends string | number = string>
  extends FormFieldBase<T, FormFieldDragNDropFileOptions> {
  editType: EditType.DragNDrop;
}
