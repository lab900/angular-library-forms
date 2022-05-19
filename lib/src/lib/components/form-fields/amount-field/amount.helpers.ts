import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function getSeparatorCount(value: string, separator: string): number {
  return value?.match(new RegExp(separator, 'g'))?.length ?? 0;
}

export function amountToNumber(
  value: string,
  errorCb?: (error: string) => null
): number | null {
  if (value?.length) {
    const commaCount = getSeparatorCount(value, ',');
    const pointCount = getSeparatorCount(value, '\\.');
    // the input value can only contain one separator sign
    if (commaCount + pointCount > 1) {
      return errorCb ? errorCb('toManyDecimalSeparators') : null;
    }
    // replace comma by point to validate the string as a valid number
    if (!pointCount && commaCount) {
      value = value.replace(',', '.');
    }
    if (Number.isNaN(+value)) {
      return errorCb ? errorCb('invalidNumber') : null;
    }
    return +value;
  }
  return null;
}

export function validateNumberInput(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;

    if (!value?.length) {
      return null;
    }

    let error: ValidationErrors | null = null;
    amountToNumber(value, (e) => {
      error = { [e]: true };
      return null;
    });
    return error;
  };
}
