import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';

/**
 * Demonstrates IFieldConditions.required:
 *
 * - The "Name" field is hidden by default (`options.hide: true`).
 * - When the slide-toggle is switched on, `showIfEquals` makes the field appear.
 * - At the same time, `validators` injects `Validators.required` so the form
 *   control is invalid when empty.
 * - `required: true` is the explicit flag from `IFieldConditions` that tells the
 *   library to mark the field as required, which makes the red asterisk (*) appear
 *   in the field label.  Without this flag the library tries to auto-detect
 *   required-ness by running the validators against an empty control; setting it
 *   explicitly is more reliable and more readable.
 */
@Component({
  selector: 'lab900-form-conditional-required-example',
  template: `
    <lab900-form #form [schema]="schema" [data]="data" />
    <button mat-stroked-button (click)="submit()">Submit</button>
  `,
  imports: [Lab900Form, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConditionalRequiredExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  /** Initial form data – the toggle starts off, so the name field is hidden. */
  public readonly data = { showName: false };

  public readonly schema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'showName',
        editType: EditType.SlideToggle,
        title: 'Show required name field',
        options: { colspan: 12 },
      },
      {
        attribute: 'name',
        editType: EditType.Input,
        title: 'Name',
        options: {
          colspan: 12,
          /**
           * `hide: true` means the field is invisible (and its control is
           * disabled) when the page first loads.  The condition below
           * overrides this as soon as the toggle changes.
           */
          hide: true,
        },
        conditions: [
          {
            /**
             * Watch the `showName` control.
             * `showIfEquals` makes this field visible whenever the value
             *  satisfies the predicate (i.e. the toggle is on).
             */
            dependOn: 'showName',
            showIfEquals: (v: boolean) => v,

            /**
             * Dynamically swap the validator list:
             * - toggle ON  → the field is required
             * - toggle OFF → no validators (field is hidden anyway)
             */
            validators: (v: boolean) => (v ? [Validators.required] : []),

            /**
             * `required: true` is the IFieldConditions flag that makes the
             * required-star (*) appear next to the label.
             *
             * The library can auto-detect this from the validators array, but
             * setting it explicitly makes the intent crystal-clear and avoids
             * edge-cases with custom validators that don't use the standard
             * Validators.required singleton.
             */
            required: true,
          },
        ],
      },
    ],
  };

  public submit(): void {
    if (this.form()?.valid) {
      console.log('Form value:', this.form()?.value);
    } else {
      this.form()?.form.markAllAsTouched();
    }
  }
}
