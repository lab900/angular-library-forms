import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldRadioButtons } from './radio-buttons-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { ThemePalette } from '@angular/material/core';
import { ValueLabel } from '../../../models/form-field-base';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lab900-radio-buttons-field',
  templateUrl: './radio-buttons-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    TranslateModule,
    MatInputModule,
    MatRadioModule,
    NgForOf,
    FormFieldErrorComponent,
  ],
})
export class RadioButtonsFieldComponent extends FormComponent<FormFieldRadioButtons> {
  public readonly radioOptions$ = this.getOption$<ValueLabel[]>(
    'radioOptions',
    []
  );
  public readonly color$ = this.getOption$<ThemePalette>('color', 'primary');
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
