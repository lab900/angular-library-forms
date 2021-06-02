import { Component } from '@angular/core';
import { Form, EditType } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-multi-language-example',
  template: '<lab900-form-container [schema]="formSchema"></lab900-form-container>',
})
export class FormFieldMultiLanguageExampleComponent {
  public formSchema: Form = {
    fields: [
      {
        attribute: 'Textarea',
        title: 'Textarea',
        editType: EditType.MultiLangInput,
        options: {
          languages: [
            { value: 'nl', label: 'NLD' },
            { value: 'en', label: 'ENG' },
          ],
        },
      },
    ],
  };
}
