import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-repeater-reorder-example',
  template: '<lab900-form [schema]="formSchema"/>',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldRepeaterReorderExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'repeater',
        title: 'Add something',
        editType: EditType.Repeater,
        options: {
          enableReorder: true,
          buttonColor: 'primary',
        },
        nestedFields: [
          {
            editType: EditType.Row,
            options: {
              mobileCols: true,
            },
            nestedFields: [
              {
                attribute: 'value',
                editType: EditType.Input,
                title: 'Repeated field',
                options: {
                  colspan: 6,
                },
              },
            ],
          },
        ],
      },
    ],
  };
}
