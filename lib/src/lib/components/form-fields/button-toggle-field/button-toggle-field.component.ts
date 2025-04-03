import { ChangeDetectionStrategy, Component, computed, effect, HostBinding, signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonToggleFieldComponent extends FormComponent<FormFieldButtonToggle> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  // This stores the current value of the button toggle.
  // It is used to calculate the readonly label and to check if the toggle needs to be deselected.
  private readonly currentValue = signal<unknown | undefined>(undefined);

  // This calculates the readonly label. If the readonlyDisplay() function is set, this is used.
  // Otherwise, the button label is displayed
  protected readonly readonlyButtonLabel = computed<string>(() => {
    const option = this.schemaOptions()?.buttonOptions.find(o => o.value === this.currentValue());
    const readonlyDisplay = this.schemaOptions()?.readonlyDisplay;
    return (readonlyDisplay ? readonlyDisplay(this.group().value) : option?.label) ?? '-';
  });

  public constructor() {
    super();
    effect(() => {
      const control = this.fieldControl();
      if (control) {
        this.currentValue.set(control.value);
      }
    });
  }

  // If the deselect option is set and the previous value of the toggle is the same as the current value the toggle will be deselected
  public onChange($event: MatButtonToggleChange): void {
    if (this.schemaOptions()?.deselectOnClick && this.currentValue() === $event.value) {
      setTimeout(() => {
        this.setValue(null);
      });
    }
    this.currentValue.set($event.value);
  }
}
