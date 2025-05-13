import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-field-drag-n-drop-file-example-full-width',
  template:
    '<lab900-form [schema]="formSchema"/><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
  imports: [Lab900Form, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldDragNDropFileExampleFullWidthComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        editType: EditType.Row,
        nestedFields: [
          {
            attribute: 'files',
            title: 'My files',
            editType: EditType.DragNDrop,
            options: {
              maxFiles: 5,
              colspan: 12,
            },
          },
        ],
      },
      {
        attribute: 'files',
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

  public validate(): void {
    console.log(this.form()?.form.controls.files.value);
  }
}
