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
    const readonlyContainerClass = this._options()?.readonlyContainerClass;
    if (typeof readonlyContainerClass === 'function') {
      return readonlyContainerClass(this._group().value);
    }
    return readonlyContainerClass;
  });

  public constructor() {
    super();
    effect(() => {
      const control = this._fieldControl();
      if (control) {
        this.setValue(control.value);
        control.valueChanges.subscribe((value: unknown) => {
          this.setValue(value);
        });
      }
    });
  }

  private setValue(value: any): void {
    const readonlyDisplayFn = this._options()?.readonlyDisplay;
    this.value.set(readonlyDisplayFn ? readonlyDisplayFn(this._group().value) : value);
  }
}
