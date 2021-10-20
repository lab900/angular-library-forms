import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-drag-n-drop-file-example',
  template:
    '<lab900-form [schema]="formSchema"></lab900-form><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
})
export class FormFieldDragNDropFileExampleComponent {
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
              maxFiles: 1,
              colspan: 6,
            },
          },
        ],
      },
    ],
  };

  public constructor(private http: HttpClient) {}

  public validate(): void {
    console.log(this.formContainer.form.controls.files.value);
  }
}
