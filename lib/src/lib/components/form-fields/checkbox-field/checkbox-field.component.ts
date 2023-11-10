import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { CheckboxFieldModel } from './checkbox-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { ThemePalette } from '@angular/material/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lab900-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css'],
  animations: [matFormFieldAnimations.transitionMessages],
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatCheckboxModule,
    FormFieldErrorComponent,
    TranslateModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class CheckboxFieldComponent extends FormComponent<CheckboxFieldModel> {
  public readonly disabledIndeterminate$ = this.getOption$<boolean>(
    'disabledIndeterminate'
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
