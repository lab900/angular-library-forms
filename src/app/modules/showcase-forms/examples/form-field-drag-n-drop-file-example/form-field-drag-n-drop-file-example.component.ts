import { Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-field-drag-n-drop-file-example',
  template:
    '<lab900-form [schema]="formSchema"/><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
  imports: [Lab900Form, MatButton],
})
export class FormFieldDragNDropFileExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        editType: EditType.Row,
        nestedFields: [
          {
            editType: EditType.Checkbox,
            attribute: 'checkbox',
            title: 'Show upload',
            options: {
              disabledIndeterminate: true,
            },
          },
          {
            attribute: 'files',
            title: 'My file uploader',
            editType: EditType.DragNDrop,
            options: {
              maxFiles: 1,
              colspan: 6,
              hide: true,
            },
            conditions: [
              {
                dependOn: 'checkbox',
                showIfEquals: (checkbox: boolean) => checkbox,
              },
            ],
          },
        ],
      },
    ],
  };

  public validate(): void {
    console.log(this.form()?.form.controls.files.value);
  }
}
