import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldRadioButtons } from './radio-buttons-field.model';
import { MatError, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'lab900-radio-buttons-field',
  templateUrl: './radio-buttons-field.component.html',
  imports: [MatLabel, ReactiveFormsModule, TranslatePipe, MatRadioGroup, MatRadioButton, MatError],
  host: {
    class: 'lab900-form-field',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonsFieldComponent extends FormComponent<FormFieldRadioButtons> {
  protected readonly radioOptions = computed(() => this._options()?.radioOptions);
  protected readonly color = computed(() => this._options()?.color ?? 'primary');
}
