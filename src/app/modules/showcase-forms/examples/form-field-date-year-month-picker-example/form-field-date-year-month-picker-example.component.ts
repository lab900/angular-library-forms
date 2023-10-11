import { Component } from '@angular/core';
import { EditType, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-date-year-month-picker-example',
  template: '<lab900-form [schema]="formSchema"></lab900-form>',
})
export class FormFieldDateYearMonthPickerExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'test',
        title: 'Select a date year/month',
        editType: EditType.DateYearMonth,
        options: {},
      },
    ],
  };
}
