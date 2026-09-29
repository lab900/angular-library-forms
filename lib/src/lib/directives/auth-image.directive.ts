import { Directive, effect, ElementRef, input, model, Renderer2, inject } from '@angular/core';
import { Lab900File } from '../models/Lab900File';
import { Observable, Subscription } from 'rxjs';
import { fetchImageBase64 } from '../utils/image.utils';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[lab900AuthImage]',
})
export class AuthImageDirective {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * The file to render. Two-way: the directive writes the bytes it fetched back into `imageBase64`,
   * so the preview dialog does not download the same image again.
   */
  public readonly image = model.required<Lab900File>();
  /**
   * Fetches the bytes, for an image the browser cannot load on its own - typically because the URL
   * needs an Authorization header. Without it the element just points at `image.imageSrc`.
   *
   * `fetchImageBase64` accepts and converts an `ArrayBuffer`, so the callback may return either. The
   * showcase passes a request with `responseType: 'arraybuffer'`, which the old `Observable<Blob>` type
   * excluded.
   */
  public readonly httpCallback = input<((image: Lab900File) => Observable<Blob | ArrayBuffer>) | undefined>(undefined);
  /** Shown when the image has no source or the fetch fails. */
  public readonly defaultImage = input<string | undefined>(undefined);

  public constructor() {
    effect(() => {
      const imgSrc = this.image()?.imageSrc;
      let sub: Subscription;
      if (imgSrc) {
        const cb = this.httpCallback();
        this.elementRef.nativeElement.classList.add('bg-loading');
        if (!cb) {
          this.setSrc(imgSrc);
        } else {
          sub = fetchImageBase64(cb, this.image(), (result: string | ArrayBuffer | null) => {
            const fileSrc = result as string;
            this.setSrc(fileSrc);
            const image: HTMLImageElement = document.createElement('img');
            image.src = fileSrc;
            image.onload = () => image.remove();
            image.onerror = () => {
              this.setPlaceholder();
              image.remove();
            };
          })
            .pipe(take(1))
            .subscribe();
        }
      }
      return () => sub?.unsubscribe();
    });
  }

  private setPlaceholder(): void {
    if (this.defaultImage()?.length) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url(${this.defaultImage})`);
      this.elementRef.nativeElement.classList.remove('bg-loading');
      this.elementRef.nativeElement.classList.add('bg-loaded');
    }
  }

  private setSrc(src: string): void {
    if (src?.length) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url(${src})`);
      this.elementRef.nativeElement.classList.remove('bg-loading');
      this.elementRef.nativeElement.classList.add('bg-loaded');
    }
  }
}
