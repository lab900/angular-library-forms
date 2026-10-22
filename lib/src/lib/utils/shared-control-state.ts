import { AbstractControl, Validators } from '@angular/forms';

/** What one field asks of the control it is bound to. */
export interface FieldControlClaim {
  /** The field is visible and not readonly. */
  enabled: boolean;
  required: boolean;
}

const claimsByControl = new WeakMap<AbstractControl, Map<object, FieldControlClaim>>();

/**
 * Records the state one field asks of its control and applies the combined state of every field bound to it.
 *
 * Several fields can share one control, for example a repeater row where only the field matching the row's
 * `key` is visible. Each field writing its own state would let the field that runs last decide, so a hidden
 * sibling could disable the control of the visible field. Instead the control is enabled while at least one
 * field wants it enabled, and required while at least one enabled field is required.
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

/** Forgets the claim of a field, without changing the control: the remaining fields keep the state as it is. */
export function releaseControlState(control: AbstractControl, field: object): void {
  claimsByControl.get(control)?.delete(field);
}
