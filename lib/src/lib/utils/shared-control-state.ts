import { AbstractControl, Validators } from '@angular/forms';

/** What one field asks of the control it is bound to. */
export interface FieldControlClaim {
  /** The field is visible and not readonly. */
  enabled: boolean;
  required: boolean;
}

const claimsByControl = new WeakMap<AbstractControl, Map<object, FieldControlClaim>>();

/**
 * Applies the combined state of all fields bound to a control: enabled if any field is enabled,
 * required if any enabled field is required. Stops a hidden field from disabling a visible sibling.
 */
export function claimControlState(control: AbstractControl, field: object, claim: FieldControlClaim): void {
  let claims = claimsByControl.get(control);
  if (!claims) {
    claims = new Map();
    claimsByControl.set(control, claims);
  }
  claims.set(field, claim);

  const enabled = [...claims.values()].some(c => c.enabled);
  const required = [...claims.values()].some(c => c.enabled && c.required);
  if (enabled) {
    control.enable();
  } else {
    control.disable();
  }
  if (required && !control.hasValidator(Validators.required)) {
    control.addValidators(Validators.required);
    control.updateValueAndValidity();
  } else if (!required && control.hasValidator(Validators.required)) {
    control.removeValidators(Validators.required);
    control.updateValueAndValidity();
  }
}

/** Drops the field's claim; leaves the control as it is. */
export function releaseControlState(control: AbstractControl, field: object): void {
  claimsByControl.get(control)?.delete(field);
}
