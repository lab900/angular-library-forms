import { Component, HostBinding, inject } from '@angular/core';
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
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'lab900-date-time-field',
    templateUrl: './date-time-field.component.html',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        TranslateModule,
        MatButton,
    ]
})
export class DateTimeFieldComponent extends FormComponent<FormFieldDateTimePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  private readonly adapter = inject(NgxMatDateAdapter);

  public get startView(): 'month' | 'year' | 'multi-year' {
    return this.schema?.options?.startView ?? 'month';
  }

  public get maxDate(): Date | null {
    return this.options?.maxDate;
  }

  public get showSeconds(): boolean {
    return this.options?.showSeconds ?? true;
  }

  public get minDate(): Date | null {
    return this.schema?.options?.minDate;
  }

  public get defaultTime(): [number, number, number] | null {
    return this.schema?.options?.defaultTime;
  }

  public get stepMinute(): number | 1 {
    return this.schema?.options?.stepMinute || 1;
  }

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
