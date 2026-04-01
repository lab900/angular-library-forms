import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { EditType, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { MatButton } from '@angular/material/button';

// ---------------------------------------------------------------------------
// The source-key types that make downstream fields required + visible.
// This mirrors the real `sourceKeyTypes` array from the production codebase.
// ---------------------------------------------------------------------------
const SOURCE_KEY_TYPES = ['PARCEL_LINE', 'PRODUCTION_DOSSIER', 'TRUCK_ORDER'] as const;
type SourceKeyType = (typeof SOURCE_KEY_TYPES)[number] | null;

/**
 * A stand-in for the real `requiredField(() => condition)` helper used in
 * production.  It behaves like `Validators.required` when `condition()` is
 * true, but it is a plain arrow function — NOT the `Validators.required`
 * singleton.
 *
 * This is the root cause of the missing-star bug:
 *   `IFieldConditions.runAll` sets `fieldIsRequired` via
 *   `newValidators.includes(Validators.required)`.  Because this function is
 *   not that singleton, the check returns `false` and the required star (*)
 *   is never shown — even though the field IS validated as required.
 */
function conditionalRequired(condition: () => boolean): ValidatorFn {
  return (control: AbstractControl) => {
    if (condition() && !control.value) {
      return { required: true };
    }
    return null;
  };
}

/**
 * Reproduces the missing required-star (*) bug.
 *
 * Steps to observe the issue:
 *  1. Select any source type → the "Activity type" field appears.
 *  2. Notice: there is NO red asterisk (*) next to "Activity type" even
 *     though the field is required.
 *  3. Click Submit without filling it in → the red "required" error DOES
 *     appear, proving the validator works but the star is missing.
 *
 * Root cause:
 *  The condition uses `conditionalRequired(...)` — a custom ValidatorFn —
 *  instead of the `Validators.required` singleton.
 *  `IFieldConditions` detects required-ness with a strict reference check:
 *    `newValidators.includes(Validators.required)`
 *  A custom function never passes that check, so `fieldIsRequired` stays
 *  `false` and Angular Material never renders the star.
 */
@Component({
  selector: 'lab900-form-conditional-required-example',
  template: `
    <lab900-form #form [schema]="schema" />
    <button mat-stroked-button (click)="submit()">Submit</button>
  `,
  imports: [Lab900Form, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConditionalRequiredExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);

  public readonly schema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'sourceKeyType',
        editType: EditType.Select,
        title: 'Source type',
        options: {
          required: true,
          colspan: 6,
          selectOptions: [
            { value: null, label: '— none —' },
            { value: 'PARCEL_LINE', label: 'Parcel line' },
            { value: 'PRODUCTION_DOSSIER', label: 'Production dossier' },
            { value: 'TRUCK_ORDER', label: 'Truck order' },
          ],
        },
      },
      {
        attribute: 'activityType',
        editType: EditType.Select,
        title: 'Activity type',
        options: {
          hide: true,
          colspan: 6,
          selectOptions: [
            { value: 'LOADING', label: 'Loading' },
            { value: 'DISCHARGING', label: 'Discharging' },
            { value: 'PRODUCTION', label: 'Production' },
          ],
        },
        conditions: [
          {
            dependOn: 'sourceKeyType',
            // Field appears whenever a real source-key type is selected.
            showIfEquals: (type: SourceKeyType) => !!type && SOURCE_KEY_TYPES.includes(type),
            // ⚠️  Uses a custom validator — NOT the Validators.required singleton.
            // The field is functionally required (returns a `required` error on
            // submit), but the required star (*) will NOT appear next to the
            // label because the library's reference check fails:
            //   newValidators.includes(Validators.required) → false
            validators: (type: SourceKeyType) => [conditionalRequired(() => !!type && SOURCE_KEY_TYPES.includes(type))],
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
