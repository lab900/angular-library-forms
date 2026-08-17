import { Component, computed, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormFieldDateRange } from './date-range-field.model';
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-range-field.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDateRangeInput,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslatePipe,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatEndDate,
    MatStartDate,
  ],
})
export class DateRangeFieldComponent extends FormComponent<FormFieldDateRange> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public readonly dateFormGroup = computed(() => {
    return this._fieldControl() as UntypedFormGroup | undefined;
  });

  public readonly startControl = computed(() => {
    return (this.dateFormGroup()?.get(this._options()?.startKey || 'start') as FormControl | null) ?? null;
  });

  public readonly endControl = computed(() => {
    return (this.dateFormGroup()?.get(this._options()?.endKey || 'end') as FormControl | null) ?? null;
  });

  /** `dateClass` on MatDateRangePicker is not nullable, so fall back to a function that adds no class. */
  protected readonly dateClass = computed(() => this._options()?.dateClass ?? (() => ''));
}
