import { Component, ViewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-repeater-fixed-example',
  template:
    '<lab900-form [schema]="formSchema" [data]="repeaterData" (click)="logValue()" />',
  standalone: true,
  imports: [Lab900Form],
})
export class FormFieldRepeaterFixedExampleComponent {
  @ViewChild(Lab900Form)
  public form: Lab900Form<any>;

  public repeaterData = {
    repeater: [{ value: 'hello' }],
  };

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'repeater',
        title: 'Fill the 3 fields',
        editType: EditType.Repeater,
        nestedFields: [
          {
            attribute: 'value',
            editType: EditType.Input,
            title: 'Repeated field',
          },
        ],
        options: {
          minRows: 3,
          fixedList: true,
          required: true,
        },
      },
    ],
  };

  public logValue(): void {
    console.log(this.form.value);
  }
}
