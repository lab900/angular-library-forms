import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldTextarea } from './textarea-field.model';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../../models/Lab900FormModuleSettings';
import { FormFieldService } from '../../../services/form-field.service';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lab900-textarea-field',
  templateUrl: './textarea-field.component.html',
  styles: ['textarea { min-height: 100px; }'],
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatInputModule,
    TranslateModule,
    FormFieldComponent,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
  ],
})
export class TextareaFieldComponent extends FormComponent<FormFieldTextarea> {
  public readonly showLengthIndicator$ = this.getOption$<boolean>(
    'showLengthIndicator',
    this.setting?.formField?.showLengthIndicator
  );

  public readonly maxLength$ = this.getOption$<number>('maxLength');

  public constructor(
    @Inject(LAB900_FORM_MODULE_SETTINGS)
    public setting: Lab900FormModuleSettings
  ) {
    super();
  }
}
