import { ChangeDetectionStrategy, Component, computed, isSignal, Signal } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldIcon } from './icon-field.model';
import { IconComponent } from '@lab900/ui';
import { Icon, ReactiveOption } from '../../../models/form-field-base';

function computeReactiveIconOption(option: ReactiveOption<Icon>, groupValue: Signal<any>): Icon | undefined {
  let response: Icon | undefined = undefined;
  let optionCopy = option;
  if (!isSignal(optionCopy) && typeof optionCopy === 'function') {
    optionCopy = optionCopy(groupValue());
  }
  if (isSignal(optionCopy)) {
    response = optionCopy();
  } else if (typeof optionCopy === 'object') {
    response = optionCopy;
  }
  return response;
}

@Component({
  selector: 'lab900-icon-field',
  templateUrl: './icon-field.component.html',
  styleUrls: ['./icon-field.component.scss'],
  imports: [IconComponent],
  host: { class: 'lab900-form-field' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFieldComponent extends FormComponent<FormFieldIcon> {
  protected readonly icon = computed(() => {
    const iconOpt = this._options()?.icon;
    if (!iconOpt) {
      return undefined;
    }
    return computeReactiveIconOption(iconOpt, this.groupValue);
  });
  protected readonly text = computed(() => {
    const opt = this._options()?.text;
    if (!opt) return undefined;
    if (typeof opt === 'function') return opt(this.groupValue());
    if (isSignal(opt)) return opt();
    return opt;
  });
}
