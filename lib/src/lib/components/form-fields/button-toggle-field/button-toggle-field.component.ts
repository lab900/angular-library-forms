import { Component, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldButtonToggle } from './button-toggle-field.model';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'lab900-button-toggle-field',
  templateUrl: './button-toggle-field.component.html',
})
export class ButtonToggleFieldComponent extends FormComponent<FormFieldButtonToggle> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  // This stores the current value of the button toggle.
  // It is used to calculate the readonly label and to check if the toggle needs to be deselected.
  private currentValue: any;

  public constructor() {
    super();
    setTimeout(() => {
      if (this.group?.controls) {
        this.currentValue = this.group.controls[this.fieldAttribute].value;
        this.addSubscription(
          this.group.controls[this.fieldAttribute].valueChanges,
          (value: any) => setTimeout(() => (this.currentValue = value))
        );
      }
    });
  }

  // This calculates the readonly label. If the readonlyDisplay() function is set, this is used.
  // Otherwise the button label is displayed
  public get label(): string {
    const option = this.options.buttonOptions.find(
      (o) => o.value === this.currentValue
    );
    return this.options?.readonlyDisplay
      ? this.options?.readonlyDisplay(this.group.value)
      : option?.label;
  }

  // If the deselect option is set and the previous value of the toggle is the same as the current value the toggle will be deselected
  public onChange($event: MatButtonToggleChange): void {
    if (this.options?.deselectOnClick && this.currentValue === $event.value) {
      setTimeout(() => {
        this.group.controls[this.fieldAttribute].setValue(null);
        this.group.controls[this.fieldAttribute].markAsDirty();
        this.group.controls[this.fieldAttribute].markAsTouched();
      });
    }
  }
}
