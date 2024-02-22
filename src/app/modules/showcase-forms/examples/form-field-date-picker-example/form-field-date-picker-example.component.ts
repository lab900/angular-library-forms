import { Component } from '@angular/core';
import { EditType, Lab900FormConfig } from '@lab900/forms';
import moment, { Moment } from 'moment/moment';

@Component({
  selector: 'lab900-form-field-date-picker-example',
  template: '<lab900-form [schema]="formSchema"></lab900-form>',
})
export class FormFieldDatePickerExampleComponent {
  public formSchema: Lab900FormConfig<any, string, Moment> = {
    fields: [
      {
        attribute: 'test',
        title: 'Select a date',
        editType: EditType.Date,
        options: {
          dateFilter: (date: Moment | null) => {
            const day = (date || moment()).get('day');
            return day !== 0 && day !== 6;
          },
          dateClass: (date: Moment | null) => {
            const day = (date || moment()).get('day');
            return day === 0 || day === 6 ? 'weekend' : '';
          },
        },
      },
    ],
  };
}
