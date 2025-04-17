import { Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-editor-example',
  template: '<lab900-form [schema]="formSchema"/>',
  imports: [Lab900Form],
})
export class FormFieldEditorExampleComponent {
  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'Editor',
        title: 'Editor',
        editType: EditType.Wysiwyg,
      },
    ],
  };
}
