import { Component, computed, HostBinding, inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDateTimePicker } from './date-time-field.model';
import {
  NgxMatDateAdapter,
  NgxMatDatetimepicker,
  NgxMatDatetimePickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatSingleDateSelectionModel } from '@angular-material-components/datetime-picker/lib/date-selection-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-date-time-field',
  templateUrl: './date-time-field.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    TranslateModule,
    MatButton,
    AsyncPipe,
  ],
})
export class DateTimeFieldComponent extends FormComponent<FormFieldDateTimePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  private readonly adapter = inject(NgxMatDateAdapter);

  public startView = computed(() => {
    return this.options()?.startView ?? 'month';
  });

  public maxDate = computed(() => {
    return this.options()?.maxDate;
  });

  public minDate = computed(() => {
    return this.options()?.minDate;
  });

  public showSeconds = computed(() => {
    return this.options()?.showSeconds;
  });

  public defaultTime = computed(() => {
    return this.options()?.defaultTime;
  });

  public stepMinute = computed(() => {
    return this.options()?.stepMinute || 1;
  });

  public pickerOpened(datePicker: NgxMatDatetimepicker<any>): void {
    /**
     * Prefill the datepicker with the current date if no date is selected
     */
    const model = (datePicker as any)?._componentRef?.instance
      ?._model as NgxMatSingleDateSelectionModel<any>;
    if (model && model.selection == null) {
      model.add(this.adapter.today());
    }
  }
}
