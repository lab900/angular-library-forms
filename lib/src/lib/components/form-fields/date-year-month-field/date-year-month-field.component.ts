import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import {
  FormFieldDateYearMonthPicker,
  FormFieldDateYearMonthPickerOptions,
} from './date-year-month-field.model';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
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
import { FormFieldService } from '../../../services/form-field.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lab900-date-year-month-field',
  templateUrl: './date-year-month-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    FormFieldComponent,
    TranslateModule,
  ],
  providers: [
    FormFieldService,
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
  public readonly maxDate$ = this.getOption$<Date | null>('maxDate');
  public readonly minDate$ = this.getOption$<Date | null>('minDate');
  public readonly startView$ = this.getOption$<
    FormFieldDateYearMonthPickerOptions['startView']
  >('startView', 'multi-year');

  public monthSelectedHandler(
    chosenMonthDate: Moment,
    picker: MatDatepicker<Moment>
  ): void {
    picker.close();
    this.group.controls[this.fieldAttribute].setValue(chosenMonthDate.format());
    this.group.controls[this.fieldAttribute].markAsDirty();
  }
}
