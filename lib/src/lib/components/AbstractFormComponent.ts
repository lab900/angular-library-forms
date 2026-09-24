import { AbstractControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { computed, Directive, effect, inject, input, model, Signal, untracked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { concat, defer, EMPTY, Observable, of, Subscription, switchMap } from 'rxjs';
import { FieldConditions } from '../models/IFieldConditions';
import { SubscriptionBasedDirective } from '../directives/subscription-based.directive';
import { Lab900FormField } from '../models/lab900-form-field.type';
import {
  ReactiveBooleanOption,
  ReactiveNumberOption,
  ReactiveStringOption,
  ValueLabel,
} from '../models/form-field-base';
import { LAB900_FORM_MODULE_SETTINGS, Lab900FormModuleSettings } from '../models/Lab900FormModuleSettings';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { uniqueId } from '../utils/unique-id.utils';
import {
  computeReactiveBooleanOption,
  computeReactiveNumberOption,
  computeReactiveStrictStringOption,
  computeReactiveStringOption,
} from '../utils/helpers';
import { sharedGroupValue } from '../utils/group-value.utils';
import { EditType } from '../models/editType';

@Directive()
export abstract class FormComponent<S extends Lab900FormField = Lab900FormField> extends SubscriptionBasedDirective {
  public readonly setting: Lab900FormModuleSettings = inject(LAB900_FORM_MODULE_SETTINGS);
  protected readonly translateService = inject(TranslateService);

  /**
   * The name of this field's control inside {@link _group}. `FormFieldDirective` sets it from
   * `schema.attribute`, with the path of a dotted attribute already stripped off, so it is the last
   * segment: the `street` of `address.street`.
   */
  public readonly _fieldAttribute = input<string | undefined>(undefined, { alias: 'fieldAttribute' });
  public get fieldAttribute(): string | undefined {
    return this._fieldAttribute();
  }

  /**
   * The group this field's control lives in. For a dotted attribute that is the nested group, not the
   * group of the whole form.
   */
  public _group = input.required<UntypedFormGroup>({ alias: 'group' });
  public get group(): UntypedFormGroup {
    return this._group();
  }

  public readonly _fieldControl = computed(() => {
    const attr = this._fieldAttribute();
    const group = this._group();
    if (group && attr) {
      return group.get(attr) ?? undefined;
    }
    return undefined;
  });

  public get fieldControl(): AbstractControl | undefined {
    return this._fieldControl();
  }

  public readonly controlValue = rxResource({
    params: () => this._fieldControl(),
    stream: ({ params }) => {
      if (params) {
        return concat(
          defer(() => of(params.getRawValue())),
          params.valueChanges.pipe(map(() => params.getRawValue()))
        );
      }
      return of(null);
    },
  }).value;

  public readonly controlValid = rxResource({
    params: () => this._fieldControl(),
    stream: ({ params }) => {
      if (params) {
        return concat(
          defer(() => of(params.valid)),
          params.statusChanges.pipe(map(status => status === 'VALID'))
        );
      }
      return of(null);
    },
  }).value;

  public readonly groupValue: Signal<any> = computed(() => {
    const group = this._group();
    return group ? sharedGroupValue(group)() : null;
  });

  /** The field's own entry from `Lab900FormConfig.fields`, narrowed to this component's edit type. */
  public readonly _schema = input.required<S>({ alias: 'schema' });
  public readonly _options = computed<S['options']>(() => this._schema().options);
  public readonly label = computed<string | undefined>(() => {
    const keyValue: ReactiveStringOption | undefined = this._schema().title;
    if (keyValue != null) {
      return computeReactiveStringOption(keyValue, this.groupValue);
    }
    return undefined;
  });
  public readonly readonlyLabel = computed<string | undefined>(() => this._options()?.readonlyLabel ?? this.label());
  private readonly conditions = computed(() => this._schema().conditions);

  public readonly elementId = computed<string>(() => {
    const elementId = this._options()?.elementId;
    const fieldAttribute = this.fieldAttribute;
    if (elementId) {
      return `${elementId}`;
    } else if (fieldAttribute) {
      return `${fieldAttribute}`;
    }
    return uniqueId('form-elm');
  });

  public readonly errorMessage = toSignal<string>(
    toObservable(this._fieldControl).pipe(
      filter(field => !!field),
      switchMap(field => field.statusChanges),
      switchMap(() => {
        const field = this.fieldControl;
        if (!field) {
          return EMPTY;
        }
        let errors: ValidationErrors | null = field.errors;
        let message = this.translateService.stream('forms.error.generic');
        if (field instanceof UntypedFormGroup && field.controls) {
          errors = field.errors ?? {};
          for (const controlsKey in field.controls) {
            if ('controlsKey' in field.controls) {
              errors = { ...errors, ...(field.get(controlsKey)?.errors ?? {}) };
            }
          }
        }

        if (!errors) {
          return EMPTY;
        }
        const errorMessages = this._schema().errorMessages;
        Object.keys(errors).forEach((key: string) => {
          if (field.hasError(key)) {
            if (errorMessages && Object.keys(errorMessages).includes(key)) {
              message = this.translateService.stream(errorMessages[key], field.getError(key));
            } else {
              message = this.getDefaultErrorMessage(key, field.getError(key));
            }
          }
        });
        return message;
      })
    )
  );

  /**
   * @deprecated use signal instead
   */
  public get options(): S['options'] {
    return this._options();
  }

  /**
   * @deprecated use signal instead
   */
  public get schema(): S {
    return this._schema();
  }

  /**
   * The other forms this field's conditions may reach, keyed by their `formId`. Passed down from the
   * `externalForms` input of `<lab900-form>` and resolved by `IFieldConditions.externalFormId`.
   */
  public readonly externalForms = input<Record<string, UntypedFormGroup> | undefined>(undefined);
  /** The language an `EditType.MultiLangInput` currently edits. Ignored by every other edit type. */
  public readonly language = input<string | undefined>(undefined);
  /** The languages an `EditType.MultiLangInput` offers. Ignored by every other edit type. */
  public readonly availableLanguages = input<ValueLabel[]>([]);

  /**
   * Field state.
   *
   * These are the way a field changes its own state: an effect writes each one through to the
   * `AbstractControl`, so setting the model disables the control or adds `Validators.required`. Never
   * call `disable()` or `setValidators()` on the control from a field component; set the model and
   * let the base class do it, or the next recalculation undoes the change.
   */
  public readonly fieldIsReadonly = model<boolean>(false, { alias: 'readonly' });
  /** Hides the field and disables its control, so it stops validating. */
  public readonly fieldIsHidden = model<boolean>(false);
  /** Adds or removes `Validators.required` on the control. */
  public readonly fieldIsRequired = model<boolean>(false);

  public get valid(): boolean {
    return !!this.fieldControl?.valid;
  }

  public get touched(): boolean {
    return !!this.fieldControl?.touched;
  }

  public readonly placeholder = this.computeReactiveStringOption('placeholder');

  public constructor() {
    super();
    effect(onCleanup => {
      // Read the option first: a field without an `onChangeFn` - nearly every field - never subscribes.
      const onChangeFn = this._options()?.onChangeFn;
      if (!onChangeFn) {
        return;
      }
      const group = this._group();
      const fieldControl = this._fieldControl();
      if (group && fieldControl) {
        const sub = group.valueChanges.subscribe(() => onChangeFn(group.getRawValue(), fieldControl));
        onCleanup(() => sub.unsubscribe());
      }
    });
    effect(onCleanup => {
      const editType = untracked(this._schema).editType;
      const fieldControl = editType === EditType.Row ? this._group() : this._fieldControl();
      if (fieldControl && this.conditions()?.length) {
        const subs = this.createConditions();
        // Also covers destruction: without it the conditions keep running, which matters for a condition on
        // an `externalFormId`, where the control it watches outlives this field.
        onCleanup(() => subs.forEach(sub => sub.unsubscribe()));
      }
    });
    effect(() => {
      const readonly = this.fieldIsReadonly();
      const hidden = this.fieldIsHidden();
      const control = this._fieldControl();
      if (control) {
        if (readonly || hidden) {
          control.disable();
        } else {
          control.enable();
        }
      }
    });
    effect(() => {
      const control = this._fieldControl();
      if (control) {
        const readonly = this.fieldIsReadonly();
        const hidden = this.fieldIsHidden();
        const required = this.fieldIsRequired();
        if (!readonly && !hidden) {
          if (required && !control.hasValidator(Validators.required)) {
            control.addValidators(Validators.required);
            control.updateValueAndValidity();
          } else if (!required && control.hasValidator(Validators.required)) {
            control.removeValidators(Validators.required);
            control.updateValueAndValidity();
          }
        } else if (control.hasValidator(Validators.required)) {
          control.removeValidators(Validators.required);
          control.updateValueAndValidity();
        }
      }
    });
  }

  public onConditionalChange(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dependOn: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    firstRun?: boolean
  ): void {
    // Override in child component
  }

  private getDefaultErrorMessage(
    key: string,
    interpolateParams: object | undefined = this.options
  ): Observable<string> {
    switch (key) {
      case 'required':
        return this.translateService.stream('forms.error.required');
      case 'minlength':
        return this.translateService.stream('forms.error.minlength', interpolateParams);
      case 'maxlength':
        return this.translateService.stream('forms.error.maxlength', interpolateParams);
      case 'min':
        return this.translateService.stream('forms.error.min', interpolateParams);
      case 'max':
        return this.translateService.stream('forms.error.max', interpolateParams);
      case 'pattern':
        return this.translateService.stream('forms.error.pattern', interpolateParams);
      case 'requireMatch':
        return this.translateService.stream('forms.error.requireMatch', interpolateParams);
      case 'toManyDecimalSeparators':
        return this.translateService.stream('forms.error.toManyDecimalSeparators', interpolateParams);
      case 'invalidNumber':
        return this.translateService.stream('forms.error.invalidNumber', interpolateParams);
      case 'noSearchMatches':
        return this.translateService.stream('forms.error.noSearchMatches', interpolateParams);
      case 'maxFiles':
        return this.translateService.stream('forms.error.maxFiles', interpolateParams);
      default:
        return this.translateService.stream('forms.error.generic', interpolateParams);
    }
  }

  private createConditions(): Subscription[] {
    return (this.conditions() ?? [])
      .filter(c => c.dependOn)
      .map(c => new FieldConditions(this, c))
      .flatMap((conditions: FieldConditions) =>
        conditions.start((dependOn: string, value: any, firstRun: boolean | undefined) => {
          if (this.onConditionalChange) {
            this.onConditionalChange(dependOn, value, firstRun);
          }
        })
      );
  }

  protected computeReactiveBooleanOption<O = S['options']>(key: keyof O): Signal<boolean> {
    return computed(() => {
      const options = this._schema().options;
      const keyValue: ReactiveBooleanOption | undefined = (options as O)?.[key] as ReactiveBooleanOption | undefined;
      if (keyValue != null) {
        return computeReactiveBooleanOption(keyValue, this.groupValue);
      }
      return false;
    });
  }

  protected computeReactiveOptionalStringOption<O = S['options']>(key: keyof O): Signal<string | undefined> {
    return computed(() => {
      const options = this._schema().options;
      const keyValue: ReactiveStringOption | undefined = (options as O)?.[key] as ReactiveStringOption | undefined;
      if (keyValue != null) {
        return computeReactiveStringOption(keyValue, this.groupValue);
      }
      return undefined;
    });
  }

  protected computeReactiveOptionalNumberOption<O = S['options']>(key: keyof O): Signal<number | undefined> {
    return computed(() => {
      const options = this._schema().options;
      const keyValue: ReactiveNumberOption | undefined = (options as O)?.[key] as ReactiveNumberOption | undefined;
      if (keyValue != null) {
        return computeReactiveNumberOption(keyValue, this.groupValue);
      }
      return undefined;
    });
  }

  protected computeReactiveStringOption<O = S['options']>(key: keyof O): Signal<string> {
    return computed(() => {
      const options = this._schema().options;
      const keyValue: ReactiveStringOption | undefined = (options as O)?.[key] as ReactiveStringOption | undefined;
      if (keyValue != null) {
        return computeReactiveStrictStringOption(keyValue, this.groupValue);
      }
      return '';
    });
  }
}
