import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { UntypedFormGroup } from '@angular/forms';
import { FormFieldDateRange } from './date-range-field.model';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-range-field.component.html',
})
export class DateRangeFieldComponent extends FormComponent<FormFieldDateRange> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get dateFormGroup(): UntypedFormGroup {
    return this.group.get(this.fieldAttribute) as UntypedFormGroup;
  }

  public get maxDate(): Date | null {
    return this.options?.maxDate;
  }

  public get minDate(): Date | null {
    return this.schema?.options?.minDate;
  }
}
