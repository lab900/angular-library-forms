import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldTextarea } from './textarea-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lab900-textarea-field',
  templateUrl: './textarea-field.component.html',
  styles: ['textarea { min-height: 100px; }'],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslatePipe],
})
export class TextareaFieldComponent extends FormComponent<FormFieldTextarea> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get showLengthIndicator(): boolean {
    return !!this.setting?.formField?.showLengthIndicator || !!this.options?.showLengthIndicator;
  }
}
