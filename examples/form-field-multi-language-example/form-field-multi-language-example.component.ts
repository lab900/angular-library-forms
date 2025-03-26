import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig, multiLanguageValidator, ValueLabel } from '@lab900/forms';

const languages: ValueLabel[] = [
  { value: 'nl', label: 'NLD' },
  { value: 'en', label: 'ENG' },
  { value: 'fr', label: 'FR' },
];

@Component({
  selector: 'lab900-form-field-multi-language-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (formSchema() && languages()) {
      <lab900-form
        language="nl"
        [availableLanguages]="languages()"
        [schema]="formSchema()"
        [data]="data()"
        [emitEventOnDataChange]="false" />
    }
  `,
  imports: [Lab900Form],
})
export class FormFieldMultiLanguageExampleComponent {
  protected readonly languages = signal<ValueLabel[]>(languages);
  protected readonly formSchema = signal<Lab900FormConfig | undefined>(undefined);
  protected readonly data = signal<Record<string, { en?: string; nl?: string; fr?: string }> | undefined>(undefined);

  public constructor() {
    setTimeout(() => {
      this.data.set({
        multiLangField: { en: 'field en', nl: 'field nl', fr: 'field fr' },
        multiLangField2: { en: 'field', nl: 'field', fr: 'field' },
      });
      this.formSchema.set({
        fields: [
          {
            editType: EditType.Row,
            nestedFields: [
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
            ],
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
          {
            attribute: 'multiLangField4',
            title: 'Multi language field (TextArea)',
            editType: EditType.MultiLangInput,
            validators: [multiLanguageValidator()],
            options: {
              useTextAreaField: true,
            },
            errorMessages: {
              missingTranslations: 'missing translations',
            },
          },
        ],
      });
    }, 100);
  }
}
