import { Component, ViewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'lab900-form-field-drag-n-drop-file-example-full-width',
    template: '<lab900-form [schema]="formSchema"/><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
    imports: [Lab900Form, MatButton]
})
export class FormFieldDragNDropFileExampleFullWidthComponent {
  @ViewChild(Lab900Form)
  public formContainer: Lab900Form<any>;

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
    console.log(this.formContainer.form.controls.files.value);
  }
}
