import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDatePicker } from './date-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-field.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    TranslateModule,
    AsyncPipe,
    MatDatepickerModule,
  ],
})
export class DateFieldComponent extends FormComponent<FormFieldDatePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public startView = computed(() => {
    return this.options()?.startView ?? 'month';
  });

  public minDate = computed(() => {
    return this.options()?.minDate;
  });

  public maxDate = computed(() => {
    return this.options()?.maxDate;
  });
}
