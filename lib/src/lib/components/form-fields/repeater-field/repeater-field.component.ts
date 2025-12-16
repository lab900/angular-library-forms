import { ChangeDetectionStrategy, Component, computed, HostBinding, inject } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { Lab900FormBuilderService } from '../../../services/form-builder.service';
import { MatError, matFormFieldAnimations } from '@angular/material/form-field';
import { FormFieldRepeater } from './repeater-field.model';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatTooltip } from '@angular/material/tooltip';
import { FormFieldDirective } from '../../../directives/form-field.directive';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';

export const DEFAULT_REPEATER_MIN_ROWS = 1;

@Component({
  selector: 'lab900-repeater-field',
  templateUrl: './repeater-field.component.html',
  styleUrls: ['./repeater-field.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatIcon,
    TranslatePipe,
    MatTooltip,
    FormFieldDirective,
    MatMiniFabButton,
    MatError,
    MatButton,
    MatIconButton,
  ],
})
export class RepeaterFieldComponent extends FormComponent<FormFieldRepeater> {
  private readonly fb: Lab900FormBuilderService = inject(Lab900FormBuilderService);

  @HostBinding('class')
  public classList = 'lab900-form-field';

  protected readonly nestedFields = computed(() => this._schema().nestedFields);

  public readonly addLabel = computed(() => {
    return this._options()?.addLabel ?? 'Add new';
  });

  public readonly minRows = computed(() => {
    return this._options()?.minRows ?? DEFAULT_REPEATER_MIN_ROWS;
  });

  public readonly maxRows = computed(() => {
    return this._options()?.maxRows;
  });

  public readonly fixedList = computed(() => {
    return !!this._options()?.fixedList;
  });

  protected readonly enableReorder = computed(() => {
    return !!this._options()?.enableReorder;
  });

  public readonly repeaterArray = computed(() => {
    const attr = this._fieldAttribute();
    const group = this._group();
    if (attr && group) {
      return group.get(attr) as UntypedFormArray;
    }
    return undefined;
  });

  public readonly hasMaxRows = computed(() => {
    const maxRows = this.maxRows();
    const repeaterArray = this.repeaterArray();
    return maxRows != undefined && !!repeaterArray && repeaterArray?.length >= maxRows;
  });

  public addToArray(): void {
    const repeaterArray = this.repeaterArray();
    const nestedFields = this.nestedFields();
    if (repeaterArray && nestedFields) {
      const formGroup = this.fb.createFormGroup(nestedFields);
      repeaterArray.push(formGroup);
      setTimeout(() => {
        repeaterArray.markAsDirty();
        repeaterArray.markAsTouched();
      }, 1);
    }
  }

  public removeFromArray(index: number): void {
    const repeaterArray = this.repeaterArray();
    if (repeaterArray && repeaterArray?.length > this.minRows()) {
      repeaterArray.removeAt(index);
      setTimeout(() => {
        repeaterArray.markAsDirty();
        repeaterArray.markAsTouched();
      }, 1);
    }
  }

  public moveUpInArray(index: number): void {
    const repeaterArray = this.repeaterArray();
    if (!repeaterArray || index <= 0 || index >= repeaterArray.length) {
      return;
    }

    const current = repeaterArray.at(index);
    const previous = repeaterArray.at(index - 1);

    repeaterArray.setControl(index - 1, current);
    repeaterArray.setControl(index, previous);

    setTimeout(() => {
      repeaterArray.markAsDirty();
      repeaterArray.markAsTouched();
    }, 1);
  }

  public moveDownInArray(index: number): void {
    const repeaterArray = this.repeaterArray();
    if (!repeaterArray || index < 0 || index >= repeaterArray.length - 1) {
      return;
    }

    const current = repeaterArray.at(index);
    const next = repeaterArray.at(index + 1);

    repeaterArray.setControl(index + 1, current);
    repeaterArray.setControl(index, next);

    setTimeout(() => {
      repeaterArray.markAsDirty();
      repeaterArray.markAsTouched();
    }, 1);
  }
}
