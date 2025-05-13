import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-date-picker-example',
  template: '<lab900-form [schema]="formSchema"/>',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldDatePickerExampleComponent {
  public formSchema: Lab900FormConfig<any, string, Date> = {
    fields: [
      {
        attribute: 'test',
        title: 'Select a date',
        editType: EditType.Date,
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
      },
    ],
  };
}
