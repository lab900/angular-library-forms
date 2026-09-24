import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model, untracked } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { DEFAULT_REPEATER_MIN_ROWS } from '../form-fields/repeater-field/repeater-field.component';
import { Lab900FormConfig } from '../../models/Lab900FormConfig';
import { Lab900FormBuilderService } from '../../services/form-builder.service';
import { ValueLabel } from '../../models/form-field-base';
import { Lab900FormField } from '../../models/lab900-form-field.type';
import { EditType } from '../../models/editType';
import { LAB900_FORM_MODULE_SETTINGS } from '../../models/Lab900FormModuleSettings';
import { FormFieldDirective } from '../../directives/form-field.directive';
import { uniqueId } from '../../utils/unique-id.utils';
import { devWarnOnce } from '../../utils/dev-warnings';

/** How long a burst of form rebuilds is counted over, before the count starts again. */
const REBUILD_BURST_WINDOW_MS = 1000;
/** How many rebuilds inside that window mean the schema is being recreated rather than swapped. */
const REBUILD_BURST_COUNT = 5;

/**
 * Renders a reactive form from a schema. It builds the `UntypedFormGroup` from
 * `Lab900FormConfig.fields` and renders every field, so there is no per-field template.
 *
 * Read the state through a `viewChild`: `form` is the group, `value` is `getRawValue()` (so
 * readonly and disabled fields are included) and `valid` is true when the group is valid or
 * entirely disabled.
 *
 * @example
 * <lab900-form [schema]="schema" [(data)]="user" />
 */
@Component({
  selector: 'lab900-form',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  // TODO(onpush): eager on purpose. See the change detection follow-up in ANGULAR-UPGRADE-19.2-TO-22.1.md.
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormFieldDirective, ReactiveFormsModule],
})
export class Lab900Form<T> {
  private readonly fb = inject(Lab900FormBuilderService);
  public readonly setting = inject(LAB900_FORM_MODULE_SETTINGS);

  /** When the form group was last rebuilt, kept for {@link warnOnRepeatedRebuild}. */
  private recentRebuilds: number[] = [];

  /**
   * The value of the form. Two-way: setting it patches the controls, and the form writes the
   * current value back.
   */
  public readonly data = model<T | undefined>(undefined);

  /**
   * The schema to render. The form builds its `UntypedFormGroup` from `schema.fields`.
   *
   * Keep it in a class field: a new object on every change detection rebuilds the form and loses
   * the values the user has typed.
   */
  public readonly schema = input.required<Lab900FormConfig>();
  protected readonly fields = computed(() => this.schema().fields);

  /**
   * Other form groups that the conditions of this form may depend on, keyed by the `formId` of
   * those forms. A condition reaches them through `IFieldConditions.externalFormId`.
   */
  public readonly externalForms = input<Record<string, UntypedFormGroup> | undefined>(undefined);

  /**
   * Whether patching the `data` input fires `valueChanges` on the controls. Set it to `false` to
   * load a record without triggering the listeners of your own form.
   * @default true
   */
  public readonly emitEventOnDataChange = input<boolean>(true);

  /** The language that an `EditType.MultiLangInput` field currently edits. */
  public readonly language = input<string | undefined>(undefined);
  /** The languages an `EditType.MultiLangInput` field offers. */
  public readonly availableLanguages = input<ValueLabel[]>([]);
  protected readonly _form = computed(() => {
    this.warnOnRepeatedRebuild();
    return this.fb.createFormGroup<T>(
      this.fields(),
      undefined,
      untracked(this.data) // don't create a new form when data changes
    );
  });
  public readonly controls = computed(() => this._form().controls);
  public readonly formIsReadOnly = computed(() => this.schema()?.readonly);
  public readonly formId = computed(() => this.schema()?.formId ?? uniqueId());

  public get form(): UntypedFormGroup {
    return this._form();
  }

  public get valid(): boolean {
    return this._form().valid || this._form().disabled;
  }

  public get value(): T {
    return this._form().getRawValue() as T;
  }

  public constructor() {
    effect(() => {
      const data = this.data();
      untracked(() => {
        const form = untracked(this._form);
        if (data && form) {
          this.patchValues(data, this.emitEventOnDataChange());
        }
      });
    });
  }

  public patchValues(data: T, emitEvent = true): void {
    const dataKeys = Object.keys(data as object) as (keyof T)[];
    const controls = this.controls();
    const fields = this.fields();
    dataKeys.forEach(key => {
      const control = controls?.[key as string];
      if (control) {
        if (control instanceof UntypedFormArray) {
          const fieldSchema = fields.find((field: Lab900FormField) => field.attribute === key);
          if (fieldSchema?.editType === EditType.Repeater && fieldSchema?.nestedFields) {
            const nestedArrayData = data[key] as unknown[] | undefined;
            const nbOfControlRows = control.controls?.length ?? 0;
            const nbOfDataRows = nestedArrayData?.length ?? 0;
            if (nbOfControlRows < nbOfDataRows) {
              for (let i = nbOfControlRows; i < nbOfDataRows; i++) {
                control.push(this.fb.createFormGroup(fieldSchema?.nestedFields, undefined, nestedArrayData?.[i]));
              }
            } else if (nbOfControlRows > nbOfDataRows) {
              for (let i = nbOfControlRows; i > nbOfDataRows; i--) {
                control.removeAt(i - 1);
              }
              // re-add empty controls if there are now less than minRows
              const minRows = fieldSchema?.options?.minRows ?? DEFAULT_REPEATER_MIN_ROWS;
              if (control.controls.length < minRows) {
                for (let i = control.controls.length; i < minRows; i++) {
                  control.push(this.fb.createFormGroup(fieldSchema?.nestedFields));
                }
              }
            }
          }
          control.patchValue(data[key] as any, { emitEvent });
        } else {
          control.patchValue(data[key], { emitEvent });
        }
      }
    });
  }

  /**
   * A schema built in the template or in a getter is a new object on every change detection run, so
   * `schema` changes identity, the group is rebuilt and whatever the user had typed is gone. The form
   * still renders, which is why this one is so easy to miss.
   *
   * A schema that legitimately swaps - a wizard step, a type picker - rebuilds a few times and spread
   * out over time, so the signal is a burst: several rebuilds inside a second.
   */
  private warnOnRepeatedRebuild(): void {
    const now = Date.now();
    this.recentRebuilds = this.recentRebuilds.filter(at => now - at < REBUILD_BURST_WINDOW_MS);
    this.recentRebuilds.push(now);
    if (this.recentRebuilds.length >= REBUILD_BURST_COUNT) {
      devWarnOnce(
        'schema-rebuilt-repeatedly',
        `The schema of a <lab900-form> changed identity ${this.recentRebuilds.length} times within a second, so the ` +
          `form group was rebuilt that often and any value the user had typed was lost. Keep the schema in a ` +
          `class field instead of building it in the template, in a getter or in a computed that depends on the ` +
          `form value. Options that have to change may be functions or signals: see ReactiveOption.`
      );
    }
  }

  public setValues(data: T, emitEvent = true): void {
    const dataKeys = Object.keys(data as object) as (keyof T)[];
    dataKeys.forEach(key => {
      const control = untracked(this.controls)?.[key as string];
      if (control) {
        if (control instanceof UntypedFormArray) {
          const fieldSchema = untracked(this.fields).find((field: Lab900FormField) => field.attribute === key);
          if (fieldSchema?.editType === EditType.Repeater) {
            this.fb.createFormArray(data, fieldSchema, control);
          }
        }
        control.setValue(data[key], { emitEvent });
      }
    });
  }
}
