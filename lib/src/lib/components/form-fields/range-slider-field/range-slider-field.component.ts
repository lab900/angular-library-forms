import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldRangeSlider } from './range-slider-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatRangeSliderFieldComponent } from './mat-range-slider-field/mat-range-slider-field.component';
import { MatInputModule } from '@angular/material/input';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lab900-range-slider-field',
  templateUrl: './range-slider-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    MatRangeSliderFieldComponent,
    MatInputModule,
    FormFieldErrorComponent,
  ],
})
export class RangeSliderFieldComponent extends FormComponent<FormFieldRangeSlider> {
  public readonly min$ = this.getOption$<number>('min');
  public readonly max$ = this.getOption$<number>('max');
  public readonly steps$ = this.getOption$<number>('steps', 1);
  public readonly fromLabel$ = this.getOption$<string>('fromLabel', 'From');
  public readonly toLabel$ = this.getOption$<string>('toLabel', 'To');
  public readonly format$ = this.getOption$<string>('format');
  public readonly showErrors$ = combineLatest([
    this.formFieldService.fieldControl$,
    this.readonlyField$,
  ]).pipe(
    map(
      ([control, readonlyField]) =>
        !readonlyField && control?.invalid && control?.touched
    )
  );
}
