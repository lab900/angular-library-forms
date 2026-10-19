import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';

@Component({
  selector: 'lab900-form-field-icon-example',
  template: '<lab900-form [schema]="formSchema" (click)="logValue()" [data]="formData"/>',
  imports: [Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldIconExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        editType: EditType.Icon,
        options: {
          icon: { name: 'info' },
          colspan: 12,
        },
      },
      {
        editType: EditType.Icon,
        options: {
          icon: { name: 'lightbulb' },
          text: 'An icon with a text next to it.',
          colspan: 12,
        },
      },
      {
        attribute: 'published',
        title: 'Published',
        editType: EditType.SlideToggle,
        options: {
          colspan: 12,
        },
      },
      {
        editType: EditType.Icon,
        options: {
          icon: data => (data?.published ? { name: 'check_circle' } : { name: 'error_outline' }),
          text: data => (data?.published ? 'Visible to everyone' : 'Still a draft'),
          colspan: 12,
        },
      },
    ],
  };

  public formData: any = {
    published: false,
  };

  public logValue(): void {
    console.log(this.form()?.value);
  }
}
