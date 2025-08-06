import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { MatError, matFormFieldAnimations, MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { CheckboxFieldModel } from './checkbox-field.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lab900-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css'],
  animations: [matFormFieldAnimations.transitionMessages],
  imports: [MatCheckbox, ReactiveFormsModule, TranslatePipe, MatHint, MatError, MatFormFieldModule],
  host: { class: 'lab900-form-field' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFieldComponent extends FormComponent<CheckboxFieldModel> {
  protected readonly indeterminate = computed(
    () => !this._options()?.disabledIndeterminate && this._fieldControl()?.getRawValue() === null
  );
  protected readonly color = computed(() => this._options()?.color ?? 'primary');
}
