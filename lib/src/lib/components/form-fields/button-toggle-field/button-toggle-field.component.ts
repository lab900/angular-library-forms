import { Component, effect, HostBinding, signal } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldButtonToggle } from './button-toggle-field.model';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatLabel } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { MatTooltip } from '@angular/material/tooltip';
import { IconComponent } from '@lab900/ui';

@Component({
  selector: 'lab900-button-toggle-field',
  templateUrl: './button-toggle-field.component.html',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    TranslatePipe,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatTooltip,
    IconComponent,
    MatError,
  ],
})
export class ButtonToggleFieldComponent extends FormComponent<FormFieldButtonToggle> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  // This stores the current value of the button toggle.
  // It is used to calculate the readonly label and to check if the toggle needs to be deselected.
  protected readonly value = signal<unknown | undefined>(undefined);

  public constructor() {
    super();
    effect(() => {
      const control = this._fieldControl();
      if (control) {
        this.value.set(control.getRawValue());
      }
    });
  }

  // This calculates the readonly label. If the readonlyDisplay() function is set, this is used.
  // Otherwise the button label is displayed
  public get readonlyButtonLabel(): string {
    const option = this.options?.buttonOptions.find(o => o.value === this.value());
    return this.options?.readonlyDisplay ? this.options?.readonlyDisplay(this.group.getRawValue()) : option?.label;
  }

  // If the deselect option is set and the previous value of the toggle is the same as the current value the toggle will be deselected
  public onChange($event: MatButtonToggleChange): void {
    if (this.options?.deselectOnClick && this.value() === $event.value) {
      setTimeout(() => {
        this._fieldControl()?.setValue(null);
        this._fieldControl()?.markAsDirty();
        this._fieldControl()?.markAsTouched();
      });
      this.value.set(null);
    } else {
      this.value.set($event.value);
    }
  }
}
