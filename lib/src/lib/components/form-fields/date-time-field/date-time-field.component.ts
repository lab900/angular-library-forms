import { Component, computed, HostBinding, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDateTimePicker } from './date-time-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter } from '@angular/material/core';
import {
  NgxMatDatepickerActions,
  NgxMatDatepickerApply,
  NgxMatDatepickerCancel,
  NgxMatDatepickerInput,
  NgxMatDatepickerToggle,
  NgxMatDatetimepicker,
} from '@ngx-mce/datetime-picker';

/**
 * The picker's internal selection model. Since v20 the picker package uses the Angular Material
 * `DateAdapter` and no longer exports the model type, so only the members used here are declared.
 */
interface PickerSelectionModel {
  readonly selection: unknown;
  add(date: unknown): void;
}

@Component({
  selector: 'lab900-date-time-field',
  templateUrl: './date-time-field.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
    MatButton,
    NgxMatDatepickerToggle,
    NgxMatDatetimepicker,
    NgxMatDatepickerActions,
    NgxMatDatepickerCancel,
    NgxMatDatepickerApply,
    NgxMatDatepickerInput,
  ],
})
export class DateTimeFieldComponent extends FormComponent<FormFieldDateTimePicker> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  private readonly adapter: DateAdapter<unknown> = inject(DateAdapter);

  public readonly startView = computed(() => {
    return this._options()?.startView ?? 'month';
  });

  public readonly maxDate = computed(() => {
    return this._options()?.maxDate;
  });

  public readonly minDate = computed(() => {
    return this._options()?.minDate;
  });

  public readonly showSeconds = computed(() => {
    return this._options()?.showSeconds ?? true;
  });

  /**
   * `defaultTime` on the picker is typed `number[]`, while its runtime default is null. It reads the
   * value as `defaultTime()?.[i]` with a truthiness check per element, so an empty array behaves
   * exactly like no value.
   */
  public readonly defaultTime = computed(() => {
    return this._options()?.defaultTime ?? [];
  });

  /** `matDatepickerFilter` on the picker is not nullable, so fall back to a filter that allows all. */
  protected readonly dateFilter = computed(() => this._options()?.dateFilter ?? (() => true));

  public readonly stepMinute = computed(() => {
    return this._options()?.stepMinute || 1;
  });

  public pickerOpened(datePicker: NgxMatDatetimepicker<any>): void {
    /**
     * Prefill the datepicker with the current date if no date is selected
     */
    const model = (datePicker as any)?._componentRef?.instance?._model as PickerSelectionModel | undefined;
    if (model && model.selection == null) {
      model.add(this.adapter.today());
    }
  }
}
