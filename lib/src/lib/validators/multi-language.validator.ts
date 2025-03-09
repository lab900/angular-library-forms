import { UntypedFormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function multiLanguageValidator(): ValidatorFn {
  return (control: UntypedFormControl): ValidationErrors => {
    const values: string[] = Object.values(control?.value ?? {});
    if (!!values?.length && !Object.values(values).some((v: string) => !v?.length)) {
      return null;
    }
    return { missingTranslations: true };
  };
}
