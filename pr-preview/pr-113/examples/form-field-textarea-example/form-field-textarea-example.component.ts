import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-textarea-example',
  template: '<lab900-form [schema]="formSchema"/>',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTextareaExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'Textarea',
        title: 'Textarea',
        editType: EditType.TextArea,
        options: { required: true },
      },
    ],
  };
}
