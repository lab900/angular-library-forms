import { Component, computed, HostBinding, inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDateTimePicker } from './date-time-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  NgxMatDateAdapter,
  NgxMatDatepickerActions,
  NgxMatDatepickerApply,
  NgxMatDatepickerCancel,
  NgxMatDatepickerInput,
  NgxMatDatepickerToggle,
  NgxMatDatetimepicker,
} from '@ngxmc/datetime-picker';
import { NgxMatSingleDateSelectionModel } from '@ngxmc/datetime-picker/lib/date-selection-model';

@Component({
  selector: 'lab900-date-time-field',
  templateUrl: './date-time-field.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
    MatButton,
    NgxMatDatepickerToggle,
    NgxMatDatetimepicker,
    NgxMatDatepickerActions,
    NgxMatDatepickerCancel,
    NgxMatDatepickerApply,
    NgxMatDatepickerInput,
  ],
})
export class DateTimeFieldComponent extends FormComponent<FormFieldDateTimePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  private readonly adapter = inject(NgxMatDateAdapter);

  public readonly startView = computed(() => {
    return this._options()?.startView ?? 'month';
  });

  public readonly maxDate = computed(() => {
    return this._options()?.maxDate;
  });

  public readonly minDate = computed(() => {
    return this._options()?.minDate;
  });

  public readonly showSeconds = computed(() => {
    return this._options()?.showSeconds ?? true;
  });

  public readonly defaultTime = computed(() => {
    return this._options()?.defaultTime;
  });

  public readonly stepMinute = computed(() => {
    return this._options()?.stepMinute || 1;
  });

  public pickerOpened(datePicker: NgxMatDatetimepicker<any>): void {
    /**
     * Prefill the datepicker with the current date if no date is selected
     */
    const model = (datePicker as any)?._componentRef?.instance?._model as NgxMatSingleDateSelectionModel<any>;
    if (model && model.selection == null) {
      model.add(this.adapter.today());
    }
  }
}
