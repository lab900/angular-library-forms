import { Component, signal, viewChild, ChangeDetectionStrategy, inject } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatDialogContent, Lab900Form, MatDialogActions, MatButton, MatDialogClose],
})
export class FormDialogComponent<T> {
  dialogFormData = inject<DialogFormData<T>>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<FormDialogComponent<T>>>(MatDialogRef);

  public readonly formContainer = viewChild<Lab900Form<T>>(Lab900Form);
  public readonly loading = signal(false);

  public submit(item: T): void {
    this.loading.set(true);

    const result = this.dialogFormData.submit(item, this.dialogFormData.data);

    if (result) {
      this.dialogRef.close();
    }

    this.loading.set(false);
  }
}
