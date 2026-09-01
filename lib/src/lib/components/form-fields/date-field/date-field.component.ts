import { Component, computed, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDatePicker } from './date-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab900-date-field',
  templateUrl: './date-field.component.html',
  // TODO(onpush): eager on purpose. See the change detection follow-up in ANGULAR-UPGRADE-19.2-TO-22.1.md.
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslatePipe, MatDatepickerModule],
})
export class DateFieldComponent extends FormComponent<FormFieldDatePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public readonly startView = computed(() => {
    return this._options()?.startView ?? 'month';
  });

  public readonly maxDate = computed(() => {
    return this._options()?.maxDate;
  });

  public readonly minDate = computed(() => {
    return this._options()?.minDate;
  });

  /**
   * `dateClass` on MatDatepicker is not nullable, so fall back to a function that adds no class.
   */
  protected readonly dateClass = computed(() => this._options()?.dateClass ?? (() => ''));
}
