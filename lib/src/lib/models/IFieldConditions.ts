import {
  AbstractControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormComponent } from '../components/AbstractFormComponent';
import { Lab900FormField } from './lab900-form-field.type';

export const areValuesEqual = (val1: any, val2: any): boolean => {
  if (typeof val1 === 'object' && typeof val2 === 'object') {
    return _.isEqual(val1, val2);
  }
  return val1 === val2;
};

export interface IFieldConditions<T = any> {
  dependOn: string | string[];
  externalFormId?: string;
  hideIfHasValue?: boolean;
  showIfHasValue?: boolean;
  disableIfHasValue?: boolean;
  enableIfHasValue?: boolean;
  hideIfEquals?: ((value: T) => boolean) | T;
  showIfEquals?: ((value: T) => boolean) | T;
  disableIfEquals?: ((value: T) => boolean) | T;
  enabledIfEquals?: ((value: T) => boolean) | T;
  onChangeFn?: (
    value: T,
    currentControl: AbstractControl,
    currentScheme: Lab900FormField
  ) => any;
  conditionalOptions?: (
    value: T,
    currentControl: AbstractControl,
    options?: { page?: number; searchQuery?: string }
  ) => any[] | Observable<any[]>;
  skipIfNotExists?: boolean;
  validators?: (value: T) => ValidatorFn[];
}

export class FieldConditions<T = any> implements IFieldConditions<T> {
  private readonly fieldControl: AbstractControl;
  private externalForms?: Record<string, FormGroup>;

  public dependOn: string | string[];
  public externalFormId?: string;

  public hideIfHasValue?: boolean;
  public showIfHasValue?: boolean;
  public disableIfHasValue?: boolean;
  public enableIfHasValue?: boolean;
  public hideIfEquals?: ((value: T) => boolean) | T;
  public showIfEquals?: ((value: T) => boolean) | T;
  public disableIfEquals?: ((value: T) => boolean) | T;
  public enabledIfEquals?: ((value: T) => boolean) | T;
  public onChangeFn?: (
    value: T,
    currentControl: AbstractControl,
    currentScheme: Lab900FormField
  ) => any;
  public conditionalOptions?: (value: T) => any;
  public skipIfNotExists = false;
  public validators?: (value: T) => ValidatorFn[];

  public dependControls: Record<string, AbstractControl>;
  public prevValue: T;

  private readonly group: FormGroup;
  private readonly schema: Lab900FormField;
  public constructor(
    private readonly component: FormComponent<any>,
    fieldConditions?: IFieldConditions
  ) {
    this.group = component.group;
    this.schema = component.schema;
    this.fieldControl = component.fieldControl;
    this.externalForms = component?.externalForms;
    if (fieldConditions) {
      Object.assign(this, fieldConditions);
      this.setDependOnControls();
      if (!this.skipIfNotExists && !Object.keys(this.dependControls)?.length) {
        throw new Error(
          `Can't create conditional form field: no control with name ${this.dependOn} found`
        );
      }
    }
  }

  private static valueIsEqualTo(
    value: any,
    condition: ((obj: any) => boolean) | any
  ): boolean {
    return typeof condition === 'function'
      ? condition(value)
      : condition === value;
  }

  private static hasValue(value: any): boolean {
    return value !== null && typeof value !== 'undefined';
  }

  public getDependGroup(): FormGroup {
    if (this.externalFormId) {
      this.skipIfNotExists = true;
      if (this.externalForms?.[this.externalFormId]) {
        return this.externalForms[this.externalFormId];
      } else {
        throw new Error(
          `Can't create conditional form field: no externForm with id ${this.externalFormId} found`
        );
      }
    }
    return this.group;
  }

  public getDependControl(dependOn: string, group: FormGroup): AbstractControl {
    let dependControl = group.get(dependOn);
    if (!dependControl && group.parent) {
      dependControl = this.getDependControl(
        dependOn,
        group.parent as FormGroup
      );
    }
    return dependControl;
  }

  public start(
    callback?: (dependOn: string, value: T, firstRun?: boolean) => void
  ): Subscription[] {
    const subs: Subscription[] = [];
    if (Object.keys(this.dependControls)?.length) {
      Object.entries(this.dependControls).forEach(([key, control]) => {
        this.runAll(key, this.getDependControlValues(), true, callback);
        subs.push(
          control.valueChanges
            .pipe(debounceTime(100), distinctUntilChanged())
            .subscribe((v) =>
              this.runAll(key, this.getDependControlValues(), false, callback)
            )
        );
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
    if (firstRun || !areValuesEqual(this.prevValue, value)) {
      if (this.onChangeFn && typeof this.onChangeFn === 'function') {
        this.onChangeFn(value, this.fieldControl, this.schema);
      }
      if (this.validators) {
        const newValidators = this.validators(value);
        this.fieldControl.setValidators(newValidators);
        this.fieldControl.updateValueAndValidity();
        this.component.schema.validators = newValidators;
        this.component.fieldIsRequired = newValidators.includes(
          Validators.required
        );
      }
      if (!this.schema.options?.visibleFn) {
        this.runVisibilityConditions(value);
      } else {
        throw new Error(
          `Can't create visibility conditions: visibleFn option is set and may cause conflicts`
        );
      }
      this.runDisableConditions(value);
      if (callback && typeof callback === 'function') {
        callback(dependOn, value, firstRun);
      }
      this.prevValue = value;
    }
  }

  public run(
    key: string,
    condition: boolean,
    callback: (isTrue: boolean) => void
  ): void {
    if (this.hasOwnProperty(key)) {
      callback(condition);
    }
  }

  public runVisibilityConditions(value: T): void {
    // Fix ExpressionChangedAfterItHasBeenCheckedError with timeout
    setTimeout(() => {
      const hide = (isTrue: boolean): any =>
        (this.schema.options = {
          ...(this.schema.options ?? {}),
          hide: isTrue,
        });
      this.run(
        'hideIfHasValue',
        this.hideIfHasValue && FieldConditions.hasValue(value),
        (isTrue: boolean) => hide(isTrue)
      );
      this.run(
        'showIfHasValue',
        this.showIfHasValue && FieldConditions.hasValue(value),
        (isTrue: boolean) => hide(!isTrue)
      );
      this.run(
        'hideIfEquals',
        FieldConditions.valueIsEqualTo(value, this.hideIfEquals),
        (isTrue: boolean) => hide(isTrue)
      );
      this.run(
        'showIfEquals',
        FieldConditions.valueIsEqualTo(value, this.showIfEquals),
        (isTrue: boolean) => hide(!isTrue)
      );
      // Refresh hide settings
      this.component.hide();
    });
  }

  public runDisableConditions(value: T): void {
    const enable = (isTrue: boolean): any =>
      setTimeout(() =>
        isTrue ? this.fieldControl.enable() : this.fieldControl.disable()
      );
    this.run(
      'disableIfHasValue',
      this.disableIfHasValue && FieldConditions.hasValue(value),
      (isTrue: boolean) => enable(!isTrue)
    );
    this.run(
      'enableIfHasValue',
      this.enableIfHasValue && FieldConditions.hasValue(value),
      (isTrue: boolean) => enable(isTrue)
    );
    this.run(
      'disableIfEquals',
      FieldConditions.valueIsEqualTo(value, this.disableIfEquals),
      (isTrue: boolean) => enable(!isTrue)
    );
    this.run(
      'enabledIfEquals',
      FieldConditions.valueIsEqualTo(value, this.enabledIfEquals),
      (isTrue: boolean) => enable(isTrue)
    );
  }

  private setDependOnControls(): void {
    this.dependControls = {};
    const dependOnArray: string[] = Array.isArray(this.dependOn)
      ? this.dependOn
      : [this.dependOn];
    dependOnArray.forEach((dependOn) => {
      this.dependControls = {
        ...this.dependControls,
        [dependOn]: this.getDependControl(dependOn, this.getDependGroup()),
      };
    });
  }

  private getDependControlValues(): T {
    const entries = Object.entries(this.dependControls);
    if (entries?.length > 1) {
      return entries.reduce((acc, [key, control], i) => {
        acc = { ...acc, [key]: control?.value };
        return acc;
      }, {} as T);
    }
    return entries?.[0]?.[1]?.value;
  }
}
