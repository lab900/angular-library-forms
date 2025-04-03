import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDatePicker } from './date-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-field.component.html',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslatePipe, MatDatepickerModule],
})
export class DateFieldComponent extends FormComponent<FormFieldDatePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public readonly startView = computed(() => {
    return this.schemaOptions()?.startView ?? 'month';
  });

  public readonly maxDate = computed(() => {
    return this.schemaOptions()?.maxDate;
  });

  public readonly minDate = computed(() => {
    return this.schemaOptions()?.minDate;
  });
}
