import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDateTimePicker } from './date-time-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-date-time-field',
  templateUrl: './date-time-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormFieldComponent,
    NgIf,
    AsyncPipe,
    TranslateModule,
    NgxMatDatetimePickerModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class DateTimeFieldComponent extends FormComponent<FormFieldDateTimePicker> {
  public readonly maxDate$ = this.getOption$<Date | null>('maxDate');
  public readonly minDate$ = this.getOption$<Date | null>('minDate');
  public readonly startView$ = this.getOption$<'month' | 'year' | 'multi-year'>(
    'startView',
    'month'
  );
  public readonly showSeconds$ = this.getOption$<boolean>('showSeconds', true);
  public readonly defaultTime$ = this.getOption$<
    [number, number, number] | undefined
  >('defaultTime');
  public readonly stepMinute$ = this.getOption$<number>('stepMinute', 1);
}
