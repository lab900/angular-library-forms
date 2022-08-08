import { Component, ViewChild } from '@angular/core';
import { Lab900FormConfig, EditType, Lab900Form } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-date-picker-example',
  template:
    '<lab900-form [schema]="formSchema"></lab900-form><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
})
export class FormFieldDatePickerExampleComponent {
  @ViewChild(Lab900Form)
  public formContainer: Lab900Form<any>;

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'test',
        title: 'Select a date',
        editType: EditType.Date,
        options: {
          minDate: new Date(1900, 1, 1),
          maxDate: new Date(),
        },
      },
    ],
  };

  public validate(): void {
    console.log(this.formContainer.valid);
  }
}
