import { ChangeDetectionStrategy, Component, computed, effect, HostBinding, signal } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lab900-readonly',
  templateUrl: './readonly-field.component.html',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyFieldComponent extends FormComponent {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  protected readonly value = signal<string | undefined>(undefined);
  protected readonly readonlyContainerClass = computed(() => {
    const readonlyContainerClass = this.schemaOptions()?.readonlyContainerClass;
    if (typeof readonlyContainerClass === 'function') {
      return readonlyContainerClass(this.group().value);
    }
    return readonlyContainerClass;
  });

  public constructor() {
    super();
    effect(() => {
      const control = this.fieldControl();
      if (control) {
        this.setCurrentValue(control.value);
        control.valueChanges.subscribe((value: unknown) => {
          this.setCurrentValue(value);
        });
      }
    });
  }

  private setCurrentValue(value: any): void {
    const readonlyDisplayFn = this.schemaOptions()?.readonlyDisplay;
    this.value.set(readonlyDisplayFn ? readonlyDisplayFn(this.group().value) : value);
  }
}
