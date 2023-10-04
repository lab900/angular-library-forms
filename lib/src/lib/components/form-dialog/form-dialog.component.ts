import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { DialogFormData } from '../../models/dialogFormData';
import { Lab900Form } from '../form-container/form-container.component';

@Component({
  selector: 'lab900-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent<T> {
  @ViewChild(Lab900Form)
  public formContainer: Lab900Form<T>;

  public dialogFormData: DialogFormData<T>;
  public loading = false;

  public constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogFormData<T>,
    private dialogRef: MatDialogRef<FormDialogComponent<T>>
  ) {
    this.dialogFormData = data;
  }

  public submit(item: T): void {
    this.loading = true;
    this.dialogFormData
      .submit(item, this.dialogFormData.data)
      .then((result) => {
        if (result) {
          this.dialogRef.close();
        }
      })
      .catch((error) => console.error(error))
      .finally(() => (this.loading = false));
  }
}
