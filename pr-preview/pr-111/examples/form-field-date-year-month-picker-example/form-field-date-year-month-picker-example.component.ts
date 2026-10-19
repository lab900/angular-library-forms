import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-date-year-month-picker-example',
  template: '<lab900-form [schema]="formSchema"/>',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldDateYearMonthPickerExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'test',
        title: 'Select a date year/month',
        editType: EditType.DateYearMonth,
      },
    ],
  };
}
