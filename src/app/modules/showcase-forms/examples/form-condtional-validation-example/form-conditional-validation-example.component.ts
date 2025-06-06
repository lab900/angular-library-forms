import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'lab900-form-condtional-validation-example',
  template:
    '<lab900-form #lab900FormContainer [schema]="schema" [data]="{markAsRequired: true}"/> {{lab900FormContainer.valid}}',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConditionalValidationExampleComponent {
  public schema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'markAsRequired',
        editType: EditType.Checkbox,
        title: 'Mark as required',
        options: {
          elementId: 'markAsRequiredCustomId',
          colspan: 6,
          disabledIndeterminate: true,
        },
      },
      {
        attribute: 'field',
        editType: EditType.Input,
        title: 'Input Field?',
        options: {
          colspan: 6,
          hide: true,
        },
        conditions: [
          {
            dependOn: 'markAsRequired',
            showIfEquals: (v: boolean) => {
              return v;
            },
            validators: v => {
              if (v === true) {
                return [Validators.required];
              }
              return [];
            },
          },
        ],
      },
      {
        attribute: 'selectField',
        editType: EditType.Select,
        title: 'Select Field?',
        options: {
          colspan: 6,
          selectOptions: [
            { value: 'a', label: 'Option a' },
            { value: 'b', label: 'Option b' },
            { value: 'c', label: 'Option c' },
          ],
        },
        conditions: [
          {
            dependOn: 'markAsRequired',
            validators: v => {
              if (v === true) {
                return [Validators.required];
              }
              return [];
            },
          },
        ],
      },
    ],
  };
}
