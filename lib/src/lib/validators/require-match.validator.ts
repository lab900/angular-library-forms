import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that a selection from the autocomplete has been made.
 * Denies a free-text input.
 */
export function requireMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.getRawValue();
    if (value !== '' && typeof value === 'string') {
      return { requireMatch: true };
    }
    return null;
  };
}
