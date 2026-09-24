import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';

export interface FormFieldTextareaOptions extends FormFieldBaseOptions {
  /**
   * Shows a character counter under the field. It needs a `maxLength` to count against. The
   * application-wide default is `provideLab900Forms({ formField: { showLengthIndicator } })`; this
   * option turns it on for one field.
   */
  showLengthIndicator?: boolean;
}

/**
 * A multi line text input. The textarea grows with its content.
 *
 * @example
 * {
 *   attribute: 'description',
 *   title: 'label.description',
 *   editType: EditType.TextArea,
 *   options: { maxLength: 500, showLengthIndicator: true, colspan: 12 },
 * }
 */
export interface FormFieldTextarea<T extends string | number = string>
  extends FormFieldBase<T, FormFieldTextareaOptions> {
  editType: EditType.TextArea;
}
