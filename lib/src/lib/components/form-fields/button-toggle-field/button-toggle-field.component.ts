import { Component, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  public currentValue: any;

  public constructor(translateService: TranslateService) {
    super(translateService);
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

  public get label(): string {
    const option = this.options.buttonOptions.find(
      (o) => o.value === this.currentValue
    );
    return this.options?.readonlyDisplay
      ? this.options?.readonlyDisplay(this.group.value)
      : option?.label;
  }

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
