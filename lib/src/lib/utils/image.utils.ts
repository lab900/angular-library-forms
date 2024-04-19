import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Lab900File } from '../models/Lab900File';

export const fetchImageBase64 = (
  httpCallback: (image: Lab900File) => Observable<Blob>,
  image: Lab900File,
  callback: (result: string | ArrayBuffer | null) => void,
): Observable<void> => {
  return httpCallback(image).pipe(
    map((imageBlob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      return reader.readAsDataURL(imageBlob);
    }),
  );
};

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
