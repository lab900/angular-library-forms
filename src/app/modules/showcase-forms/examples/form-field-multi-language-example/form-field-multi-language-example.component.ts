import { Component } from '@angular/core';
import { Form, EditType, multiLanguageValidator, ValueLabel } from '@lab900/forms';

const languages: ValueLabel[] = [
  { value: 'nl', label: 'NLD' },
  { value: 'en', label: 'ENG' },
  { value: 'fr', label: 'FR' },
];

@Component({
  selector: 'lab900-form-field-multi-language-example',
  template: ` <lab900-form language="nl" [availableLanguages]="languages" [schema]="formSchema" [data]="data"></lab900-form> `,
})
export class FormFieldMultiLanguageExampleComponent {
  public readonly languages = languages;
  public formSchema: Form = {
    fields: [
      {
        attribute: 'multiLangField',
        title: 'Multi language field',
        editType: EditType.MultiLangInput,
        validators: [multiLanguageValidator()],
        errorMessages: {
          missingTranslations: 'missing translations',
        },
      },
      {
        attribute: 'multiLangField2',
        title: 'Multi language field',
        editType: EditType.MultiLangInput,
        validators: [multiLanguageValidator()],
        errorMessages: {
          missingTranslations: 'missing translations',
        },
      },
      {
        attribute: 'multiLangField3',
        title: 'Multi language field',
        editType: EditType.MultiLangInput,
        validators: [multiLanguageValidator()],
        errorMessages: {
          missingTranslations: 'missing translations',
        },
      },
    ],
  };

  public data;

  public constructor() {
    setTimeout(() => {
      this.data = {
        multiLangField: { en: 'field en', nl: 'field nl', fr: 'field fr' },
        multiLangField2: { en: 'field', nl: 'field', fr: 'field' },
      };
    }, 100);
  }
}
