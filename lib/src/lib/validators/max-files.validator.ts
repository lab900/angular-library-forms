import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that the number of files does not exceed the specified maximum.
 * @param maxFiles
 */
export function maxFilesValidator(maxFiles: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.getRawValue();
    if (Array.isArray(value) && value.length > maxFiles) {
      return { maxFiles: { given: value.length, max: maxFiles } };
    }
    return null;
  };
}

/**
 * Validates that at least one file is provided.
 */
export function requiredFilesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.getRawValue();
    if (!Array.isArray(value) || value.length === 0) {
      return { required: true };
    }
    return null;
  };
}
