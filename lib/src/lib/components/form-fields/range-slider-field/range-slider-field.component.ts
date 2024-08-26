import { Component, computed } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldRangeSlider } from './range-slider-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRangeSliderFieldComponent } from './mat-range-slider-field/mat-range-slider-field.component';
import { MatError } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lab900-range-slider-field',
  templateUrl: './range-slider-field.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatRangeSliderFieldComponent, MatError, TranslateModule],
  host: {
    class: 'lab900-form-field',
  },
})
export class RangeSliderFieldComponent extends FormComponent<FormFieldRangeSlider> {
  protected readonly fromLabel = computed(() => this._options()?.fromLabel ?? 'From');
  protected readonly toLabel = computed(() => this._options()?.toLabel ?? 'To');
  protected readonly steps = computed(() => this._options()?.steps);
  protected readonly min = computed(() => this._options()?.min);
  protected readonly max = computed(() => this._options()?.max);
  protected readonly format = computed(() => this._options()?.format);
}
