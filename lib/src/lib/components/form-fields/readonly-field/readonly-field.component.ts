import { ChangeDetectionStrategy, Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';

import { TranslatePipe, TranslationObject } from '@ngx-translate/core';
import { toReadonlyDisplayStrings } from '../../../utils/helpers';
import { describeField, devWarnOnce } from '../../../utils/dev-warnings';

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
   * One key per value to render: an array value yields one key per item. `readonlyDisplay` reduces the
   * whole group to a single value, so it wins over the control value when it is set.
   *
   * Reading `groupValue()` and not only `controlValue()` matters: `readonlyDisplay` receives the raw group,
   * so it has to recompute when any control in that group changes, not only this field's own.
   */
  private readonly displayKeys = computed<string[]>(() => {
    const readonlyDisplayFn = this._options()?.readonlyDisplay;
    if (!readonlyDisplayFn) {
      return toReadonlyDisplayStrings(this.controlValue());
    }
    const displayValue = readonlyDisplayFn(this.groupValue());
    this.warnOnNonPrimitiveDisplayValue(displayValue);
    return toReadonlyDisplayStrings(displayValue);
  });

  /**
   * Translated here and not in the template: `TranslatePipe` throws on an array value, and every item of
   * an array has to resolve as a key of its own. `translate()` is the same signal the pipe uses, so a
   * language change still updates the field. Keys are passed as an array, so the result is keyed by key.
   */
  private readonly translations = this.translateService.translate(() => this.displayKeys());

  /** Always a string: the template renders it through `innerHTML`, never through the translate pipe. */
  protected readonly value = computed<string | undefined>(() => {
    const keys = this.displayKeys();
    if (!keys.length) {
      return undefined;
    }
    const translations: TranslationObject = this.translations() ?? {};
    // Map over the keys, not the translations, so duplicate values are kept and the order is the value's.
    return keys.map(key => (translations[key] as string) ?? key).join(', ');
  });

  protected readonly readonlyContainerClass = this.computeReactiveOptionalStringOption('readonlyContainerClass');

  /**
   * `readonlyDisplay` has to reduce the field to one primitive. An object renders as nothing at all:
   * `toReadonlyDisplayStrings()` drops anything that stringifies to `[object ...]`, so the field comes
   * out empty and looks like missing data. An array is worse, because most edit types then reach the
   * translate pipe with it and throw. Neither says what went wrong, so name the field here.
   */
  private warnOnNonPrimitiveDisplayValue(value: unknown): void {
    if (value == null || typeof value !== 'object') {
      return;
    }
    const attribute = this.fieldAttribute;
    devWarnOnce(
      `readonly-display-not-primitive:${attribute}`,
      `options.readonlyDisplay of ${describeField(attribute, this._schema().editType)} returned ${
        Array.isArray(value) ? 'an array' : 'an object'
      }. It has to return one primitive (string, number, boolean, null or undefined); the field renders ` +
        `empty otherwise. Join or format the value yourself, or use toReadonlyDisplayString().`
    );
  }
}
