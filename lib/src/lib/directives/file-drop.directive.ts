import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[lab900DropFile]',
})
export class FileDropDirective {
  private static SHADOW_ON = 'rgba(0, 0, 0, 0.10) 0px 2px 4px 0px inset';
  private static SHADOW_OFF = 'unset';

  @Output()
  public fileDropped = new EventEmitter<FileList>();

  @HostBinding('style.box-shadow')
  public shadow = FileDropDirective.SHADOW_OFF;

  // Dragover Event
  @HostListener('dragover', ['$event'])
  public dragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.shadow = FileDropDirective.SHADOW_ON;
  }

  // Dragleave Event
  @HostListener('dragleave', ['$event'])
  public dragLeave(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.shadow = FileDropDirective.SHADOW_OFF;
  }

  // Drop Event
  @HostListener('drop', ['$event'])
  public drop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
    this.shadow = FileDropDirective.SHADOW_OFF;
  }
}
