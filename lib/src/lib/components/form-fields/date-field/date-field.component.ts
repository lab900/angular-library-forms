import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDatePicker } from './date-field.model';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-field.component.html',
})
export class DateFieldComponent extends FormComponent<FormFieldDatePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get startView(): 'month' | 'year' | 'multi-year' {
    return this.schema?.options?.startView ?? 'month';
  }

  public get maxDate(): Date | null {
    return this.schema?.options?.maxDate;
  }

  public get minDate(): Date | null {
    return this.schema?.options?.minDate;
  }
}
