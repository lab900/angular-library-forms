import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { Lab900File } from '../../models/Lab900File';

@Component({
  selector: 'lab900-image-preview-modal',
  template: ` <mat-dialog-content>
    <img style="width: 100%" class="image" [src]="image.imageBase64" [alt]="image.fileName" />
  </mat-dialog-content>`,
  imports: [MatDialogContent],
})
export class ImagePreviewModalComponent {
  public readonly image: Lab900File = inject(MAT_DIALOG_DATA).image;
}
