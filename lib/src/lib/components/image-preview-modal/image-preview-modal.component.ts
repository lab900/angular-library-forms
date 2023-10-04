import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lab900File } from '../../models/Lab900File';

interface DialogData {
  image: Lab900File;
}

@Component({
  selector: 'lab900-image-preview-modal',
  template: `<mat-dialog-content>
    <img
      style="width: 100%"
      class="image"
      [src]="image.imageBase64"
      [alt]="image.fileName"
    />
  </mat-dialog-content>`,
})
export class ImagePreviewModalComponent {
  public readonly image: Lab900File;

  public constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData) {
    this.image = data.image;
  }
}
