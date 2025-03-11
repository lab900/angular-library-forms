import { Component, Inject, signal, viewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogFormData } from '../../models/dialogFormData';
import { Lab900Form } from '../form-container/form-container.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-dialog',
  templateUrl: './form-dialog.component.html',
  imports: [MatDialogContent, Lab900Form, MatDialogActions, MatButton, MatDialogClose],
})
export class FormDialogComponent<T> {
  public readonly formContainer = viewChild<Lab900Form<T>>(Lab900Form);
  public readonly loading = signal(false);

  public constructor(
    @Inject(MAT_DIALOG_DATA) public dialogFormData: DialogFormData<T>,
    private dialogRef: MatDialogRef<FormDialogComponent<T>>
  ) {}

  public submit(item: T): void {
    this.loading.set(true);
    this.dialogFormData
      .submit(item, this.dialogFormData.data)
      .then(result => {
        if (result) {
          this.dialogRef.close();
        }
      })
      .catch(error => console.error(error))
      .finally(() => this.loading.set(false));
  }
}
