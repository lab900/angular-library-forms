/**
 * A `File` with what `EditType.FilePreview` needs to render it: a name to show, and the image data
 * once it is loaded.
 *
 * A file the user just picked is a real `File` with `fileName` added. A file that already exists on
 * the server usually is not: build the object yourself with the fields below, and let
 * `options.httpCallback` fetch the bytes when the preview needs them.
 */
export interface Lab900File extends File {
  /** The name shown under the thumbnail. `File.name` is readonly, so the display name lives here. */
  fileName: string;
  /** The URL the thumbnail loads from. Without it the field shows the overlay or nothing. */
  imageSrc?: string;
  /**
   * The image as a data URL, which the preview dialog renders. `options.httpCallback` fills it in on
   * first open, so a file behind an authenticated URL never has to be public.
   */
  imageBase64?: string;
}
