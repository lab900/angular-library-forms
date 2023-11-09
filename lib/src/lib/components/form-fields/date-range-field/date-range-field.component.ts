import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormFieldDateRange } from './date-range-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-range-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormFieldComponent,
    AsyncPipe,
    NgIf,
    MatDatepickerModule,
    ReactiveFormsModule,
    TranslateModule,
    MatInputModule,
  ],
})
export class DateRangeFieldComponent extends FormComponent<FormFieldDateRange> {
  public readonly startLabel$ = this.getOption$<string>(
    'startLabel',
    'Start date'
  );

  public readonly endLabel$ = this.getOption$<string>('endLabel', 'End date');

  public get dateFormGroup(): UntypedFormGroup {
    return this.group.get(this.fieldAttribute) as UntypedFormGroup;
  }
}
