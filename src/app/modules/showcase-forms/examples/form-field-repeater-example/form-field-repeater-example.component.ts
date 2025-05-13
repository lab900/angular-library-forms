import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

function validateResources(): ValidatorFn {
  return (control: AbstractControl): Record<string, any> | null => {
    const resourceUnits: { default: boolean }[] = control?.value || [];
    if (resourceUnits?.length > 1) {
      const defaults = resourceUnits.filter(ru => ru.default);
      if (!defaults.length) {
        return { noDefault: true };
      }
      if (defaults.length > 1) {
        return { toManyDefaults: defaults.length };
      }
    }
    return null;
  };
}

@Component({
  selector: 'lab900-form-field-repeater-example',
  template: ` <lab900-form [schema]="formSchema" (click)="logValue(form)" [data]="data" #form />`,
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldRepeaterExampleComponent {
  public data: any = {
    repeater: [{ value: 'a' }, { value: 'b' }],
  };

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'repeater',
        title: 'Add something',
        editType: EditType.Repeater,
        validators: [validateResources()],
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
                  defaultValue: '234',
                  colspan: 6,
                },
              },
              {
                attribute: 'default',
                editType: EditType.Checkbox,
                title: 'default',
                options: {
                  defaultValue: false,
                  colspan: 6,
                },
              },
            ],
          },
        ],
      },
    ],
  };

  public logValue(form: any): void {
    console.log(form);
  }
}
