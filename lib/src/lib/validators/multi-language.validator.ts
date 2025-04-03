import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function multiLanguageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const values: string[] = Object.values(control?.getRawValue() ?? {});
    if (!!values?.length && !Object.values(values).some((v: string) => !v?.length)) {
      return null;
    }
    return { missingTranslations: true };
  };
}
