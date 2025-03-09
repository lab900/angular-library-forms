import { Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
    selector: 'lab900-form-field-date-time-picker-example',
    template: '<lab900-form [schema]="formSchema" />',
    styles: [
        `
      ::ng-deep .mat-calendar-body-cell.weekend {
        background-color: red;
      }
    `,
    ],
    imports: [Lab900Form]
})
export class FormFieldDateTimePickerExampleComponent {
  public data = { test: new Date() };

  public formSchema: Lab900FormConfig<any, string, Date> = {
    fields: [
      {
        attribute: 'test',
        title: 'Select a date & time',
        editType: EditType.DateTime,
        options: {
          dateFilter: (date: Date | null) => {
            const day = date?.getDay();
            return day !== 0 && day !== 6;
          },
          dateClass: (date: Date | null) => {
            const day = date?.getDay();
            return day === 0 || day === 6 ? 'weekend' : '';
          },
        },
        conditions: [
          {
            dependOn: 'urgent',
            disableIfEquals: true,
            onChangeFn: (v, control) => {
              if (v === true) {
                control.reset();
              }
            },
          },
        ],
      },
      {
        attribute: 'urgent',
        title: 'Urgent?',
        editType: EditType.Checkbox,
      },
    ],
  };
}
