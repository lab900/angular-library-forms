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
  // TODO(onpush): eager on purpose. See the change detection follow-up in ANGULAR-UPGRADE-19.2-TO-22.1.md.
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule, MatLabel, MatSlideToggle, TranslatePipe, MatError],
})
export class SlideToggleFieldComponent extends FormComponent<FormFieldSlideToggle> {
  @HostBinding('class')
  public classList = 'lab900-form-field';
}
