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

  public value: any;

  public constructor(translateService: TranslateService) {
    super(translateService);
    setTimeout(() => {
      if (this.group?.controls) {
        this.setValue(this.group.controls[this.fieldAttribute].value);
        this.addSubscription(
          this.group.controls[this.fieldAttribute].valueChanges,
          (value: any) => setTimeout(() => this.setValue(value))
        );
      }
    });
  }

  private setValue(value: any): void {
    this.value = this.options?.readonlyDisplay
      ? this.options?.readonlyDisplay(this.group.value)
      : value;
  }

  public get label(): string {
    const option = this.options.buttonOptions.find(
      (o) => o.value === this.value
    );
    return option?.label ?? `${this.value}`;
  }

  public onChange($event: MatButtonToggleChange): void {
    if (this.options?.deselectOnClick && this.value === $event.value) {
      setTimeout(() => {
        this.group.controls[this.fieldAttribute].setValue(null);
        this.group.controls[this.fieldAttribute].markAsDirty();
        this.group.controls[this.fieldAttribute].markAsTouched();
      });
    } else {
      setTimeout(() =>
        this.group.controls[this.fieldAttribute].setValue($event.value)
      );
    }
  }
}
