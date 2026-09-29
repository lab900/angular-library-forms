import { AbstractControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormComponent } from '../components/AbstractFormComponent';
import { Lab900FormField } from './lab900-form-field.type';
import { FormFieldSelect } from '../components/form-fields/select-field/field-select.model';
import { isDifferent } from '@lab900/ui';
import { ValueLabel } from './form-field-base';
import { EditType } from './editType';

/**
 * Makes a field react to another control. The condition subscribes to the controls named in
 * `dependOn` and then flips visibility, disabled state, validators or the options of a select.
 *
 * Use a condition when a field depends on another **control**; use a reactive option
 * (`options.hide`, `options.required`, ...) when it only depends on the form value as a whole.
 *
 * Creating the condition **throws** when `dependOn` names a control that does not exist, unless
 * `skipIfNotExists` is set.
 *
 * @example
 * conditions: [{ dependOn: 'reason', showIfEquals: 'other' }]
 */
export interface IFieldConditions<T = any> {
  /** The attribute, or attributes, of the control(s) to watch. */
  dependOn: string | string[];
  /** Decides whether the watched value really changed. Defaults to a reference comparison. */
  distinctUntilChangedCompareFn?: (a: T, b: T) => boolean;
  /**
   * Watch a control in another form instead of this one. The id resolves against the
   * `externalForms` input of `<lab900-form>`.
   */
  externalFormId?: string;
  /** Hides this field while the watched control holds a value. */
  hideIfHasValue?: boolean;
  /** Shows this field only while the watched control holds a value. */
  showIfHasValue?: boolean;
  /** Disables this field while the watched control holds a value. */
  disableIfHasValue?: boolean;
  /** Enables this field only while the watched control holds a value. */
  enableIfHasValue?: boolean;
  /** Hides this field when the watched value equals this, or when the predicate returns true. */
  hideIfEquals?: ((value: T) => boolean) | T;
  /** Shows this field only when the watched value equals this, or when the predicate returns true. */
  showIfEquals?: ((value: T) => boolean) | T;
  /** Disables this field when the watched value equals this, or when the predicate returns true. */
  disableIfEquals?: ((value: T) => boolean) | T;
  /** Enables this field only when the watched value equals this, or when the predicate returns true. */
  enabledIfEquals?: ((value: T) => boolean) | T;
  /** Runs whenever the watched value changes. Use it for a side effect, such as patching this control. */
  onChangeFn?: (value: T, currentControl: AbstractControl, currentScheme: Readonly<Lab900FormField>) => void;
  /** Reloads the options of an `EditType.Select` whenever the watched value changes. */
  conditionalOptions?: (
    value: T,
    currentControl: AbstractControl,
    options?: { page?: number; searchQuery?: string },
    schema?: FormFieldSelect<T>
  ) => ValueLabel[] | Observable<ValueLabel[]>;
  /**
   * Ignore the condition when the watched control is missing, instead of throwing. Use it when the
   * control is only in the schema some of the time.
   * @default false
   */
  skipIfNotExists?: boolean;
  /** The validators this field should have for the current watched value. Recalculated on every change. */
  validators?: (value: T) => ValidatorFn[];
}

export class FieldConditions<T = any> implements IFieldConditions<T> {
  private readonly fieldControl?: AbstractControl;
  private externalForms?: Record<string, UntypedFormGroup>;

  public dependOn!: string | string[];
  public distinctUntilChangedCompareFn?: (a: T, b: T) => boolean;
  public externalFormId?: string;

  public hideIfHasValue?: boolean;
  public showIfHasValue?: boolean;
  public disableIfHasValue?: boolean;
  public enableIfHasValue?: boolean;
  public hideIfEquals?: ((value: T) => boolean) | T;
  public showIfEquals?: ((value: T) => boolean) | T;
  public disableIfEquals?: ((value: T) => boolean) | T;
  public enabledIfEquals?: ((value: T) => boolean) | T;
  public onChangeFn?: (value: T, currentControl: AbstractControl, currentScheme: Readonly<Lab900FormField>) => any;
  public conditionalOptions?: (value: T) => any;
  public skipIfNotExists = false;
  public validators?: (value: T) => ValidatorFn[];

  public dependControls?: Record<string, AbstractControl>;
  public prevValue?: T;

  private readonly group?: UntypedFormGroup;
  private readonly schema?: Lab900FormField;
  public constructor(
    private readonly component: FormComponent<any>,
    fieldConditions?: IFieldConditions
  ) {
    this.group = component._group();
    this.schema = component._schema();
    this.fieldControl = component._fieldControl();
    if (this.schema?.editType !== EditType.Row && !component._fieldControl()) {
      throw new Error(`Can't create conditional for form field ${this.schema?.attribute}: fieldControl is undefined`);
    }
    this.externalForms = component?.externalForms();
    if (fieldConditions) {
      Object.assign(this, fieldConditions);
      this.setDependOnControls();
      if (!this.skipIfNotExists && (!this.dependControls || !Object.keys(this.dependControls)?.length)) {
        throw new Error(
          `Can't create conditional for form field ${this.schema?.attribute}: no control with name ${this.dependOn} found`
        );
      }
    }
  }

  private static valueIsEqualTo(value: any, condition: ((obj: any) => boolean) | any): boolean {
    return typeof condition === 'function' ? condition(value) : condition === value;
  }

  private static hasValue(value: any): boolean {
    return value !== null && typeof value !== 'undefined';
  }

  public getDependGroup(): UntypedFormGroup | undefined {
    if (this.externalFormId) {
      this.skipIfNotExists = true;
      if (this.externalForms?.[this.externalFormId]) {
        return this.externalForms[this.externalFormId];
      } else {
        throw new Error(`Can't create conditional form field: no externForm with id ${this.externalFormId} found`);
      }
    }
    return this.group;
  }

  public getDependControl(dependOn: string, group: UntypedFormGroup): AbstractControl | null {
    let dependControl = group.get(dependOn);
    if (!dependControl && group.parent) {
      dependControl = this.getDependControl(dependOn, group.parent as UntypedFormGroup);
    }
    return dependControl;
  }

  public start(callback?: (dependOn: string, value: T, firstRun?: boolean) => void): Subscription[] {
    const subs: Subscription[] = [];
    if (this.dependControls && Object.keys(this.dependControls)?.length) {
      Object.entries(this.dependControls).forEach(([key, control]) => {
        this.runAll(key, this.getDependControlValues(), true, callback);
        if (control != null) {
          subs.push(
            control.valueChanges
              .pipe(debounceTime(100), distinctUntilChanged(this.distinctUntilChangedCompareFn))
              .subscribe(() => this.runAll(key, this.getDependControlValues(), false, callback))
          );
        }
      });
    }
    return subs;
  }

  public runAll(
    dependOn: string,
    value: T,
    firstRun: boolean,
    callback?: (dependOn: string, value: T, firstRun?: boolean) => void
  ): void {
    // in case this is a row conditional we need to check on group level
    const control = this.fieldControl || this.group;
    if (!control) {
      throw new Error(`Can't create conditional for form field ${this.schema?.attribute}: fieldControl is undefined`);
    }
    if (this.schema && (firstRun || isDifferent(this.prevValue, value))) {
      if (this.onChangeFn && typeof this.onChangeFn === 'function') {
        this.onChangeFn(value, control, this.schema);
      }
      if (this.validators) {
        const newValidators = this.validators(value);
        control.setValidators(newValidators);
        this.component.schema.validators = newValidators;
        this.component.fieldIsRequired.set(newValidators.includes(Validators.required));
        control.updateValueAndValidity();
      }
      this.runVisibilityConditions(value);
      this.runDisableConditions(value);
      if (callback && typeof callback === 'function') {
        callback(dependOn, value, firstRun);
      }
      this.prevValue = value;
    }
  }

  public run(key: string, condition: boolean, callback: (isTrue: boolean) => void): void {
    if (Object.hasOwn(this, key)) {
      callback(condition);
    }
  }

  public runVisibilityConditions(value: T): void {
    const schema = this.schema;
    if (schema) {
      const hide = (isTrue: boolean): void => this.component.fieldIsHidden.set(isTrue);
      this.run('hideIfHasValue', !!this.hideIfHasValue && FieldConditions.hasValue(value), (isTrue: boolean) =>
        hide(isTrue)
      );
      this.run('showIfHasValue', !!this.showIfHasValue && FieldConditions.hasValue(value), (isTrue: boolean) =>
        hide(!isTrue)
      );
      this.run('hideIfEquals', FieldConditions.valueIsEqualTo(value, this.hideIfEquals), (isTrue: boolean) =>
        hide(isTrue)
      );
      this.run('showIfEquals', FieldConditions.valueIsEqualTo(value, this.showIfEquals), (isTrue: boolean) =>
        hide(!isTrue)
      );
    }
  }

  public runDisableConditions(value: T): void {
    const disable = (isTrue: boolean): void => {
      return this.component.fieldIsReadonly.set(isTrue);
    };
    this.run('disableIfHasValue', !!this.disableIfHasValue && FieldConditions.hasValue(value), (isTrue: boolean) =>
      disable(isTrue)
    );
    this.run('enableIfHasValue', !!this.enableIfHasValue && FieldConditions.hasValue(value), (isTrue: boolean) =>
      disable(!isTrue)
    );
    this.run('disableIfEquals', FieldConditions.valueIsEqualTo(value, this.disableIfEquals), (isTrue: boolean) =>
      disable(isTrue)
    );
    this.run('enabledIfEquals', FieldConditions.valueIsEqualTo(value, this.enabledIfEquals), (isTrue: boolean) =>
      disable!(isTrue)
    );
  }

  private setDependOnControls(): void {
    if (this.dependOn) {
      this.dependControls = {};
      const dependOnArray: string[] = Array.isArray(this.dependOn) ? this.dependOn : [this.dependOn];
      dependOnArray.forEach(dependOn => {
        const group = this.getDependGroup();
        if (group) {
          const control = this.getDependControl(dependOn, group);
          if (control) {
            this.dependControls = {
              ...(this.dependControls ?? {}),
              [dependOn]: control,
            };
          }
        }
      });
    }
  }

  private getDependControlValues(): T {
    const entries = this.dependControls && Object.entries(this.dependControls);
    if (entries && entries?.length > 1) {
      return entries.reduce((acc, [key, control]) => {
        acc = { ...acc, [key]: control?.getRawValue() };
        return acc;
      }, {} as T);
    }
    return entries?.[0]?.[1]?.getRawValue();
  }
}
