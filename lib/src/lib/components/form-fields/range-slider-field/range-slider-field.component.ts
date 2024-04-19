import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldRangeSlider } from './range-slider-field.model';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRangeSliderFieldComponent } from './mat-range-slider-field/mat-range-slider-field.component';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'lab900-range-slider-field',
  templateUrl: './range-slider-field.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatRangeSliderFieldComponent,
    MatError,
    AsyncPipe
],
})
export class RangeSliderFieldComponent extends FormComponent<FormFieldRangeSlider> {
  @HostBinding('class')
  public classList = 'lab900-form-field';
}
