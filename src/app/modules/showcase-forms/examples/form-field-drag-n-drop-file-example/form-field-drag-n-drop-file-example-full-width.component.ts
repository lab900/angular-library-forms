import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-field-drag-n-drop-file-example-full-width',
  template:
    '<lab900-form [schema]="formSchema"/><button mat-raised-button color="primary" (click)="submitForm()">Submit</button>',
  imports: [Lab900Form, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldDragNDropFileExampleFullWidthComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'files',
        title: 'My files',
        editType: EditType.DragNDrop,
        options: {
          maxFiles: 5,
          colspan: 12,
          required: true,
        },
      },
      {
        attribute: 'filesCompact',
        title: 'My files',
        editType: EditType.DragNDrop,
        options: {
          maxFiles: 5,
          compact: true,
          colspan: 12,
        },
      },
    ],
  };

  public submitForm(): void {
    if (this.form()?.valid) {
      console.log(this.form()?.value);
    } else {
      this.form()?.form?.markAllAsTouched();
    }
  }
}
