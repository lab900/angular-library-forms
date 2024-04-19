import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormFieldDateRange } from './date-range-field.model';
import {
  MatDatepickerModule,
  MatDateRangeInput,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-range-field.component.html',
  standalone: true,
  imports: [
    MatDateRangeInput,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDatepickerModule,
    AsyncPipe,
  ],
})
export class DateRangeFieldComponent extends FormComponent<FormFieldDateRange> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get dateFormGroup(): UntypedFormGroup {
    return this.group.get(this.fieldAttribute) as UntypedFormGroup;
  }

  public maxDate = computed(() => {
    return this.options()?.maxDate;
  });

  public minDate = computed(() => {
    return this.options()?.minDate;
  });

  public startKey = computed(() => {
    return this.options()?.startKey ?? 'start';
  });

  public endKey = computed(() => {
    return this.options()?.endKey ?? 'end';
  });
}
