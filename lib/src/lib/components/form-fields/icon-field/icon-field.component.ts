import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldIcon } from './icon-field.model';
import { IconComponent } from '@lab900/ui';

@Component({
    selector: 'lab900-icon-field',
    templateUrl: './icon-field.component.html',
    styleUrls: ['./icon-field.component.scss'],
    imports: [IconComponent],
    host: { class: 'lab900-form-field' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconFieldComponent extends FormComponent<FormFieldIcon> {
  protected readonly icon = computed(() => this._options()?.icon);
}
