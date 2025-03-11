import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDatePicker } from './date-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatError, MatHint, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-field.component.html',
  imports: [
    MatInput,
    MatFormField,
    MatLabel,
    MatHint,
    MatError,
    ReactiveFormsModule,
    TranslatePipe,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
  ],
})
export class DateFieldComponent extends FormComponent<FormFieldDatePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public readonly startView = computed(() => {
    return this._options()?.startView ?? 'month';
  });

  public readonly maxDate = computed(() => {
    return this._options()?.maxDate;
  });

  public readonly minDate = computed(() => {
    return this._options()?.minDate;
  });
}
