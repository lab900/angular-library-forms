import { Component, HostBinding, OnDestroy } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lab900-readonly',
  templateUrl: './readonly-field.component.html',
  imports: [TranslateModule],
})
export class ReadonlyFieldComponent extends FormComponent implements OnDestroy {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public value: any;

  public constructor() {
    super();
    setTimeout(() => {
      if (this.group?.controls && this.fieldAttribute) {
        this.setValue(this.group.controls[this.fieldAttribute].value);
        this.addSubscription(this.group.controls[this.fieldAttribute].valueChanges, (value: any) =>
          setTimeout(() => this.setValue(value)),
        );
      }
    });
  }

  private setValue(value: any): void {
    this.value = this.options?.readonlyDisplay ? this.options?.readonlyDisplay(this.group.value) : value;
  }

  public getReadonlyContainerClass(): string {
    if (typeof this.options?.readonlyContainerClass === 'function') {
      return this.options.readonlyContainerClass(this.group.value);
    }
    return this.options?.readonlyContainerClass;
  }
}
