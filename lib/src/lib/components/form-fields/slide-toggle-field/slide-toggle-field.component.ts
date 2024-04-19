import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldSlideToggle } from './slide-toggle-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatError, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lab900-slide-toggle-field',
  templateUrl: './slide-toggle-field.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatSlideToggle,
    TranslateModule,
    MatError,
    AsyncPipe
],
})
export class SlideToggleFieldComponent extends FormComponent<FormFieldSlideToggle> {
  @HostBinding('class')
  public classList = 'lab900-form-field';
}
