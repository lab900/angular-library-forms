import { Component, computed } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldRangeSlider } from './range-slider-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRangeSliderFieldComponent } from './mat-range-slider-field/mat-range-slider-field.component';
import { MatError } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lab900-range-slider-field',
  templateUrl: './range-slider-field.component.html',
  imports: [ReactiveFormsModule, MatRangeSliderFieldComponent, MatError, TranslatePipe],
  host: {
    class: 'lab900-form-field',
  },
})
export class RangeSliderFieldComponent extends FormComponent<FormFieldRangeSlider> {
  protected readonly fromLabel = computed(() => this.schemaOptions()?.fromLabel ?? 'From');
  protected readonly toLabel = computed(() => this.schemaOptions()?.toLabel ?? 'To');
  protected readonly steps = computed(() => this.schemaOptions()?.steps);
  protected readonly min = computed(() => this.schemaOptions()?.min);
  protected readonly max = computed(() => this.schemaOptions()?.max);
  protected readonly format = computed(() => this.schemaOptions()?.format);
}
