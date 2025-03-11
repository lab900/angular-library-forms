import { Directive, HostListener, inject, input } from '@angular/core';
import { FormDialogComponent } from '../components/form-dialog/form-dialog.component';
import { Lab900FormConfig } from '../models/Lab900FormConfig';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Directive({
  selector: '[lab900FormDialog]',
  standalone: true,
})
export class FormDialogDirective<T> {
  public readonly dialog: MatDialog = inject(MatDialog);

  public readonly schema = input.required<Lab900FormConfig>();
  public readonly data = input.required<T>();
  public readonly submitFormHandler = input.required<(data: T, originalData?: T) => Promise<boolean>>();
  public readonly dialogOptions = input.required<MatDialogConfig>();
  public readonly disabled = input(false);

  @HostListener('click')
  public onMouseEnter(): void {
    if (this.disabled()) {
      return;
    }
    this.dialog.open(FormDialogComponent, {
      data: {
        schema: this.schema(),
        data: this.data(),
        submit: this.submitFormHandler(),
      },
      ...this.dialogOptions(),
    });
  }
}
