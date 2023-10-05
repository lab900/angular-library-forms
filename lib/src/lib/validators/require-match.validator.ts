import {
  UntypedFormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/**
 * Validates that a selection from the autocomplete has been made.
 * Denies a free-text input.
 */
export function requireMatchValidator(): ValidatorFn {
  return (control: UntypedFormControl): ValidationErrors => {
    const value = control.value;
    if (value !== '' && typeof value === 'string') {
      return { requireMatch: true };
    }
    return null;
  };
}
