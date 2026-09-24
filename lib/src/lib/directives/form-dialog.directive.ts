import { Directive, HostListener, inject, input } from '@angular/core';
import { FormDialogComponent } from '../components/form-dialog/form-dialog.component';
import { Lab900FormConfig } from '../models/Lab900FormConfig';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

/**
 * Opens a schema in a `MatDialog` when the host element is clicked, so a form can hang off a button
 * or a table row without a dialog component of its own.
 *
 * Every input except `disabled` is required, `dialogOptions` included: pass `{}` when the Material
 * defaults will do.
 *
 * @example
 * <button lab900FormDialog
 *         [schema]="editUserSchema"
 *         [data]="user"
 *         [submitFormHandler]="saveUser"
 *         [dialogOptions]="{ width: '40rem' }">
 *   Edit
 * </button>
 */
@Directive({
  selector: '[lab900FormDialog]',
})
export class FormDialogDirective<T> {
  public readonly dialog: MatDialog = inject(MatDialog);

  /** The schema the dialog renders. */
  public readonly schema = input.required<Lab900FormConfig>();
  /** The record the form starts from. It is not mutated; the edited copy reaches `submitFormHandler`. */
  public readonly data = input.required<T>();
  /**
   * Saves the edited record. The dialog closes when the promise resolves `true` and stays open on
   * `false`, so a failed save keeps what the user typed.
   */
  public readonly submitFormHandler = input.required<(data: T, originalData?: T) => Promise<boolean>>();
  /** `MatDialogConfig` for the dialog: width, panel class, and the rest. Pass `{}` for the defaults. */
  public readonly dialogOptions = input.required<MatDialogConfig>();
  /**
   * Stops the click from opening anything.
   * @default false
   */
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
