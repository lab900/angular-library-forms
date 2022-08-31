import { Component } from '@angular/core';
import { Lab900FormConfig, EditType } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-date-range-picker-example',
  template: '<lab900-form [schema]="formSchema" [data]="data"></lab900-form>',
})
export class FormFieldDateRangePickerExampleComponent {
  public data = { test: { startDate: new Date(), endDate: new Date() } };
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'test',
        title: 'Select a date range',
        editType: EditType.DateRange,
        options: {
          startKey: 'startDate',
          endKey: 'endDate',
        },
      },
    ],
  };
}
