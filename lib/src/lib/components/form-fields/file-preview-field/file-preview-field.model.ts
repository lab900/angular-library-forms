import { EditType } from '../../../models/editType';
import { FormFieldBase, FormFieldBaseOptions } from '../../../models/form-field-base';
import { Lab900FormConfig } from '../../../models/Lab900FormConfig';
import { Lab900File } from '../../../models/Lab900File';
import { Observable } from 'rxjs';

export interface FormFieldFilePreviewOptions extends FormFieldBaseOptions {
  /**
   * The label of the upload button. A translation key.
   * @default 'form.button.upload'
   */
  fileUploadButtonText?: string;
  /**
   * Clicking a file opens `fileMetaDataConfig` in a dialog instead of the image preview, and adds a
   * separate preview icon next to the file name.
   * @default false
   */
  canEditFileMetaData?: boolean;
  /** The schema of the metadata dialog. The file itself is the data, so the attributes are its keys. */
  fileMetaDataConfig?: Lab900FormConfig;
  /**
   * Fetches the bytes of a file that the browser cannot load on its own, typically because the URL
   * needs an Authorization header. The thumbnail and the preview both go through it.
   */
  httpCallback?: (image: Lab900File) => Observable<Blob | ArrayBuffer>;
  /**
   * Covers the thumbnail with `overlay` instead of the image. Use the function form to cover only
   * some of the files, for example the ones that are still being processed.
   */
  showOverlay: boolean | ((data?: any) => boolean);
  /**
   * Allows more than one file. The control value is an array either way.
   * @default false
   */
  multiple?: boolean;
  /** The `accept` attribute of the file input, for example `'image/*'` or `'.pdf,.docx'`. */
  accept?: string;
  /** What `showOverlay` puts over the thumbnail. */
  overlay?: {
    backgroundColor: string;
    textColor: string;
    /** A translation key. */
    text: string;
  };
}

/**
 * A list of files with a thumbnail each, an upload button, and a preview or metadata dialog per file.
 * The control value is a `Lab900File[]`.
 *
 * Use `EditType.DragNDrop` for files the user is about to upload, and this for files that already
 * exist and have to be shown.
 *
 * It renders its own readonly state, so a readonly field still shows the thumbnails rather than text.
 *
 * @example
 * {
 *   attribute: 'documents',
 *   title: 'label.documents',
 *   editType: EditType.FilePreview,
 *   options: {
 *     multiple: true,
 *     accept: 'image/*',
 *     showOverlay: file => !file.imageSrc,
 *     overlay: { backgroundColor: '#eee', textColor: '#333', text: 'label.processing' },
 *     httpCallback: file => this.fileService.download(file),
 *   },
 * }
 */
export interface FormFieldFilePreview<T extends string | number = string>
  extends FormFieldBase<T, FormFieldFilePreviewOptions> {
  editType: EditType.FilePreview;
}
