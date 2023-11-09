import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDatePicker } from './date-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormFieldComponent,
    AsyncPipe,
    NgIf,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class DateFieldComponent extends FormComponent<FormFieldDatePicker> {
  public readonly maxDate$ = this.getOption$<Date | null>('maxDate');
  public readonly minDate$ = this.getOption$<Date | null>('minDate');
  public readonly startView$ = this.getOption$<'month' | 'year' | 'multi-year'>(
    'startView',
    'month'
  );
}
