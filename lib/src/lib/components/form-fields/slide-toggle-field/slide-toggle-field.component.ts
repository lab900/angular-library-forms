import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldSlideToggle } from './slide-toggle-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { ThemePalette } from '@angular/material/core';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { AsyncPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';

@Component({
  selector: 'lab900-slide-toggle-field',
  templateUrl: './slide-toggle-field.component.html',
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
    MatInputModule,
    MatSlideToggleModule,
    TranslateModule,
    FormFieldErrorComponent,
  ],
})
export class SlideToggleFieldComponent extends FormComponent<FormFieldSlideToggle> {
  public readonly color$ = this.getOption$<ThemePalette>('color', 'primary');
  public readonly labelPosition$ = this.getOption$<
    MatSlideToggle['labelPosition']
  >('labelPosition', 'after');
  public readonly label$ = this.getOption$<string>('label');
}
