import { ChangeDetectionStrategy, Component, effect, HostBinding, signal } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';

import { TranslatePipe } from '@ngx-translate/core';
import { toReadonlyDisplayString } from '../../../utils/helpers';

@Component({
  selector: 'lab900-readonly',
  templateUrl: './readonly-field.component.html',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyFieldComponent extends FormComponent {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  /**
   * Always a string, never the raw control value: the template hands this to the translate pipe, and that
   * pipe throws on an array value. See {@link toReadonlyDisplayString}.
   */
  protected readonly value = signal<string | undefined>(undefined);
  protected readonly readonlyContainerClass = this.computeReactiveOptionalStringOption('readonlyContainerClass');

  public constructor() {
    super();
    effect(() => {
      const control = this._fieldControl();
      if (control) {
        this.setValue(control.getRawValue());
        control.valueChanges.subscribe((value: unknown) => {
          this.setValue(value);
        });
      }
    });
  }

  private setValue(value: unknown): void {
    const readonlyDisplayFn = this._options()?.readonlyDisplay;
    const displayValue = readonlyDisplayFn ? readonlyDisplayFn(this._group().getRawValue()) : value;
    this.value.set(toReadonlyDisplayString(displayValue));
  }
}
