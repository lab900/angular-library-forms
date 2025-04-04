import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-conditionals-example',
  template: `
    <lab900-form #lab900FormContainer [schema]="formFields" />
    <div>
      <button mat-stroked-button (click)="required.set(!required())">Toggle required</button>
      <button mat-stroked-button (click)="hidden.set(!hidden())">Toggle hidden</button>
      <button mat-stroked-button (click)="readonly.set(!readonly())">Toggle readonly</button>
      <button mat-stroked-button (click)="submitForm()">Submit Form</button>
    </div>
  `,
  imports: [MatButton, Lab900Form],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormReactiveOptionsExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);
  public required = signal(false);
  public hidden = signal(false);
  public readonly = signal(false);

  public readonly formFields: Lab900FormConfig = {
    fields: [
      {
        attribute: 'reactiveInput',
        editType: EditType.Input,
        title: 'Reactive input',
        options: {
          required: this.required,
          hide: this.hidden,
          readonly: this.readonly,
        },
      },
      {
        attribute: 'reactiveSelect',
        editType: EditType.Select,
        title: 'Reactive select',
        options: {
          required: this.required,
          hide: this.hidden,
          readonly: this.readonly,
        },
      },
      {
        attribute: 'staticInput',
        editType: EditType.Input,
        title: 'Static options select (req) -> should not change when toggling',
        options: {
          required: true,
          hide: false,
          readonly: false,
        },
      },
      {
        attribute: 'staticInput',
        editType: EditType.Input,
        title: 'Static options select (hidden) -> should not change when toggling',
        options: {
          required: true,
          hide: true,
          readonly: false,
        },
      },
      {
        attribute: 'staticInput',
        editType: EditType.Input,
        title: 'Static options select (readonly) -> should not change when toggling',
        options: {
          required: true,
          hide: false,
          readonly: true,
        },
      },
    ],
  };

  public submitForm(): void {
    if (this.form()?.valid) {
      console.log(this.form()?.value);
    } else {
      this.form()?.form.markAllAsTouched();
    }
  }
}
