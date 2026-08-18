import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldSlideToggle } from './slide-toggle-field.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lab900-slide-toggle-field',
  templateUrl: './slide-toggle-field.component.html',
  styles: [
    `
      .readonly {
        ::ng-deep * {
          pointer-events: none;
        }
      }
    `,
  ],
  // TODO(onpush): the template reads the non-reactive 'touched' and 'valid' getters of AbstractFormComponent.
  // A parent calling markAllAsTouched() would not repaint this field under OnPush.
  // Make it reactive, then switch to OnPush and remove this file from the eslint override.
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule, MatLabel, MatSlideToggle, TranslatePipe, MatError],
})
export class SlideToggleFieldComponent extends FormComponent<FormFieldSlideToggle> {
  @HostBinding('class')
  public classList = 'lab900-form-field';
}
