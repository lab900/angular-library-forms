import { Component } from '@angular/core';
import { Lab900FormConfig, EditType } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-date-picker-example',
  template: '<lab900-form [schema]="formSchema"></lab900-form>',
})
export class FormFieldDatePickerExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'test',
        title: 'Select a date',
        editType: EditType.Date,
        options: {},
      },
    ],
  };
}
