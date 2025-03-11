import { Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-repeater-fixed-example',
  template: '<lab900-form [schema]="formSchema" [data]="repeaterData" (click)="logValue()" />',
  imports: [Lab900Form],
})
export class FormFieldRepeaterFixedExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

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
    console.log(this.form()?.value);
  }
}
