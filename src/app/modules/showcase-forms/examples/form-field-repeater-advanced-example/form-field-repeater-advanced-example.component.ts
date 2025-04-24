import { Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-repeater-advanced-example',
  template: '<lab900-form [schema]="formSchema"/>',
  imports: [Lab900Form],
})
export class FormFieldRepeaterAdvancedExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'repeater',
        title: 'Add something nested',
        editType: EditType.Repeater,
        nestedFields: [
          {
            attribute: 'value',
            editType: EditType.Row,
            options: { colspan: 12 },
            nestedFields: [
              {
                attribute: 'two',
                editType: EditType.Input,
                title: 'Repeated field',
              },
            ],
          },
          {
            attribute: 'value',
            editType: EditType.Row,
            options: {
              colspan: 12,
            },
            nestedFields: [
              {
                editType: EditType.Icon,
                options: { icon: { name: 'arrow_downward' }, text: 'arrow down', colspan: 12 },
              },
            ],
          },
        ],
      },
    ],
  };
}
