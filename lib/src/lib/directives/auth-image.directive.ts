import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Lab900File } from '../models/Lab900File';
import { Observable } from 'rxjs';
import { fetchImageBase64 } from '../utils/image.utils';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[lab900AuthImage]',
  standalone: true,
})
export class AuthImageDirective implements OnChanges {
  @Input()
  private readonly image: Lab900File;

  @Input()
  private readonly httpCallback: (image: Lab900File) => Observable<Blob>;

  @Input()
  private readonly defaultImage: string;

  public constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes.image || changes.httpCallback) && this.image?.imageSrc) {
      this.elementRef.nativeElement.classList.add('bg-loading');
      if (this.httpCallback == null) {
        this.setSrc(this.image.imageSrc);
      } else {
        fetchImageBase64(this.httpCallback, this.image, (result: string | ArrayBuffer | null) => {
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
    } else {
      this.setPlaceholder();
    }
  }

  private setPlaceholder(): void {
    if (this.defaultImage?.length) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url(${this.defaultImage})`);
      this.elementRef.nativeElement.classList.remove('bg-loading');
      this.elementRef.nativeElement.classList.add('bg-loaded');
    }
  }

  private setSrc(src: string): void {
    if (src?.length) {
      this.image.imageBase64 = src;
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url(${src})`);
      this.elementRef.nativeElement.classList.remove('bg-loading');
      this.elementRef.nativeElement.classList.add('bg-loaded');
    }
  }
}
