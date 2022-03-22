import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { TranslateService } from '@ngx-translate/core';
import {
  FormFieldDateYearMonthPicker,
  FormFieldDateYearMonthPickerOptions,
} from './date-year-month-field.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { Moment } from 'moment';

@Component({
  selector: 'lab900-date-year-month-field',
  templateUrl: './date-year-month-field.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
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

  public formControl: FormControl = new FormControl();

  public constructor(translateService: TranslateService) {
    super(translateService);
  }

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
    chosenMonthDate: string,
    picker: MatDatepicker<Moment>
  ): void {
    picker.close();
    this.formControl.setValue(chosenMonthDate);
  }
}
