import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-radio-buttons-example',
  template: '<lab900-form [schema]="formSchema"/>',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldRadioButtonsExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'somePropName',
        title: 'Select yes or no',
        editType: EditType.RadioButtons,
        options: {
          required: true,
          radioOptions: [
            {
              value: true,
              label: 'yes',
            },
            {
              value: false,
              label: 'no',
            },
          ],
        },
      },
      {
        attribute: 'somePropName2',
        title: 'Select ON OR OFF',
        editType: EditType.Checkbox,
        options: {
          readonly: true,
        },
      },
      {
        attribute: 'somePropName2',
        title: 'Select ON OR OFF',
        editType: EditType.Checkbox,
      },
    ],
  };
}
