import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';
import { AngularEditorConfig } from '@kolkov/angular-editor';

export interface FormFieldWysiwgOptions extends FormFieldBaseOptions {
  /**
   * The `@kolkov/angular-editor` configuration: toolbar buttons, height, fonts, upload handler. The
   * field fills in `editable` and `placeholder` from the schema; everything else is passed through.
   */
  editorConfig?: AngularEditorConfig;
}

/**
 * A rich text editor from `@kolkov/angular-editor`. The control value is an HTML string, so treat it
 * as untrusted on the way back in and sanitize before rendering it anywhere else.
 *
 * The editor's icons are served from the application, not from the library: add the
 * `@kolkov/angular-editor` icon glob to the `assets` of `angular.json` or the toolbar renders blank.
 *
 * @example
 * {
 *   attribute: 'body',
 *   title: 'label.body',
 *   editType: EditType.Wysiwyg,
 *   options: {
 *     colspan: 12,
 *     editorConfig: { minHeight: '20rem', toolbarHiddenButtons: [['insertImage', 'insertVideo']] },
 *   },
 * }
 */
export interface WysiwgFieldModel<T extends string | number = string> extends FormFieldBase<T, FormFieldWysiwgOptions> {
  editType: EditType.Wysiwyg;
}
