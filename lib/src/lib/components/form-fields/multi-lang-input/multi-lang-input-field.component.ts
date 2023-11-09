import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldMultiLang } from './multi-lang-input-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { ThemePalette } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiLangFieldControlComponent } from './multi-lang-field-control/multi-lang-field-control.component';
import { MatInputModule } from '@angular/material/input';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Lab900Form } from '../../form-container/form-container.component';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lab900-multi-lang-input-field',
  templateUrl: './multi-lang-input-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MultiLangFieldControlComponent,
    MatInputModule,
    FormFieldErrorComponent,
    AsyncPipe,
    NgIf,
  ],
})
export class MultiLangInputFieldComponent extends FormComponent<FormFieldMultiLang> {
  public readonly title$ = this.formFieldService.label$;
  public readonly buttonColor$ = this.getOption$<ThemePalette>(
    'buttonColor',
    'primary'
  );
  public readonly translateLabel$ = this.getOption$<string>('translateLabel');
  public readonly stopTranslateLabel$ =
    this.getOption$<string>('stopTranslateLabel');
  public readonly useTextAreaField$ = this.getOption$<boolean>(
    'useTextAreaField',
    false
  );

  public readonly showErrors$ = combineLatest([
    this.formFieldService.fieldControl$,
    this.readonlyField$,
  ]).pipe(
    map(
      ([control, readonlyField]) =>
        !readonlyField && control?.invalid && control?.touched
    )
  );

  public constructor(public readonly form: Lab900Form<any>) {
    super();
  }
}
