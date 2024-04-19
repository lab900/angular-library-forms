import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import {
  MatError,
  matFormFieldAnimations,
  MatHint,
} from '@angular/material/form-field';
import { CheckboxFieldModel } from './checkbox-field.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lab900-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css'],
  animations: [matFormFieldAnimations.transitionMessages],
  standalone: true,
  imports: [
    MatCheckbox,
    ReactiveFormsModule,
    TranslateModule,
    MatHint,
    MatError,
    AsyncPipe
],
})
export class CheckboxFieldComponent extends FormComponent<CheckboxFieldModel> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get indeterminate(): boolean {
    return (
      !this.options?.disabledIndeterminate &&
      this.group.get(this.fieldAttribute).value === null
    );
  }
}
