import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { TranslateService } from '@ngx-translate/core';
import { FormFieldDatePicker } from './date-field.model';
import { FormGroup, ValidatorFn } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-field.component.html',
})
export class DateFieldComponent extends FormComponent<FormFieldDatePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public constructor(translateService: TranslateService) {
    super(translateService);
  }

  protected setFieldProperties(): void {
    super.setFieldProperties();
    const periodValidator = this.minMaxDateValidator(
      this.minDate,
      this.maxDate
    );
    if (this.schema && periodValidator) {
      this.schema.validators = [
        ...(this.schema.validators ?? []),
        periodValidator,
      ];
    }
    this.generateValidators();
  }

  public get startView(): 'month' | 'year' | 'multi-year' {
    return this.schema?.options?.startView ?? 'month';
  }

  public get maxDate(): Date | null {
    return this.schema?.options?.maxDate;
  }

  public get minDate(): Date | null {
    return this.schema?.options?.minDate;
  }

  public minMaxDateValidator(min?: any, max?: any): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
      if (
        (min && moment(control?.value).utc().isBefore(moment(min).utc())) ||
        (max && moment(control?.value).utc().isAfter(moment(max).utc()))
      ) {
        return { invalidDate: { min, max, date: control.value } };
      }
    };
  }
}
