import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import {
  FormFieldDateYearMonthPicker,
  FormFieldDateYearMonthPickerOptions,
} from './date-year-month-field.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'lab900-date-year-month-field',
  templateUrl: './date-year-month-field.component.html',
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'MM/YYYY',
        },
        display: {
          dateInput: 'MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class DateYearMonthFieldComponent extends FormComponent<FormFieldDateYearMonthPicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get startView(): FormFieldDateYearMonthPickerOptions['startView'] {
    return this.schema?.options?.startView ?? 'multi-year';
  }

  public get maxDate(): FormFieldDateYearMonthPickerOptions['maxDate'] {
    return this.schema?.options?.maxDate;
  }

  public get minDate(): FormFieldDateYearMonthPickerOptions['minDate'] {
    return this.schema?.options?.minDate;
  }

  public monthSelectedHandler(
    chosenMonthDate: Date,
    picker: MatDatepicker<Date>
  ): void {
    picker.close();
    this.group.controls[this.fieldAttribute].setValue(chosenMonthDate);
    this.group.controls[this.fieldAttribute].markAsDirty();
  }
}
