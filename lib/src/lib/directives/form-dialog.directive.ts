import { Directive, HostListener, Input } from '@angular/core';
import { FormDialogComponent } from '../components/form-dialog/form-dialog.component';
import { Lab900FormConfig } from '../models/Lab900FormConfig';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Directive({
  selector: '[lab900FormDialog]',
  standalone: true,
})
export class FormDialogDirective<T> {
  @Input()
  public schema: Lab900FormConfig;

  @Input()
  public data: T;

  @Input()
  public submitFormHandler: (data: T, originalData?: T) => Promise<boolean>;

  @Input()
  public dialogOptions: MatDialogConfig;

  @Input()
  public disabled = false;

  public constructor(public dialog: MatDialog) {}

  @HostListener('click') public onMouseEnter(): void {
    if (this.disabled) {
      return;
    }
    this.dialog.open(FormDialogComponent, {
      data: {
        schema: this.schema,
        data: this.data,
        submit: this.submitFormHandler,
      },
      ...this.dialogOptions,
    });
  }
}
