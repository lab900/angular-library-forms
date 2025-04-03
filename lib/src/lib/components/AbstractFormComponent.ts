import { UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { computed, Directive, effect, inject, input, model } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { FieldConditions } from '../models/IFieldConditions';
import { SubscriptionBasedDirective } from '../directives/subscription-based.directive';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { ValueLabel } from '../models/form-field-base';
import { LAB900_FORM_MODULE_SETTINGS, Lab900FormModuleSettings } from '../models/Lab900FormModuleSettings';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { uniqueId } from 'lodash';

@Directive()
export abstract class FormComponent<S extends Lab900FormField = Lab900FormField> extends SubscriptionBasedDirective {
  public readonly setting: Lab900FormModuleSettings = inject(LAB900_FORM_MODULE_SETTINGS);
  protected readonly translateService = inject(TranslateService);

  public readonly fieldAttribute = input<string | undefined>(undefined, { alias: 'fieldAttribute' });
  public readonly group = input.required<UntypedFormGroup>();
  public readonly fieldControl = computed(() => {
    const attr = this.fieldAttribute();
    const group = this.group();
    if (group && attr) {
      return group.get(attr) ?? undefined;
    }
    return undefined;
  });

  public readonly schema = input.required<S>();
  public readonly schemaOptions = computed<S['options']>(() => this.schema().options);
  public readonly label = computed<string | undefined>(() => this.schema().title);
  public readonly readonlyLabel = computed<string | undefined>(
    () => this.schemaOptions()?.readonlyLabel ?? this.label()
  );
  private readonly conditions = computed(() => this.schema().conditions);

  public readonly elementId = computed<string>(() => {
    const elementId = this.schemaOptions()?.elementId;
    const fieldAttribute = this.fieldAttribute();
    if (elementId) {
      return `${elementId}`;
    } else if (fieldAttribute) {
      return `${fieldAttribute}`;
    }
    return uniqueId('form-elm');
  });

  public readonly errorMessage = toSignal<string>(
    toObservable(this.fieldControl).pipe(
      filter(field => !!field),
      switchMap(field => field.statusChanges),
      switchMap(() => {
        const field = this.fieldControl();
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
        const errorMessages = this.schema().errorMessages;
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

  public readonly externalForms = input<Record<string, UntypedFormGroup> | undefined>(undefined);
  public readonly language = input<string | undefined>(undefined);
  public readonly availableLanguages = input<ValueLabel[]>([]);

  /**
   * Field state
   */
  public readonly fieldIsReadonly = model<boolean>(false, { alias: 'readonly' });
  public readonly fieldIsHidden = model<boolean>(false);
  public readonly fieldIsRequired = model<boolean>(false);

  public get valid(): boolean {
    return !!this.fieldControl()?.valid;
  }

  public get touched(): boolean {
    return !!this.fieldControl()?.touched;
  }

  public readonly hintOptions = computed(() => {
    return this.schemaOptions()?.hint;
  });
  public readonly hideHintOnValidValue = computed(() => !!this.hintOptions()?.hideHintOnValidValue);
  public readonly hint = computed(() => (this.fieldIsReadonly() ? undefined : this.hintOptions()?.value));
  public readonly hintValueTranslateData = computed(() => this.hintOptions()?.valueTranslateData);
  public readonly placeholder = computed(() => {
    const placeholder = this.schemaOptions()?.placeholder;
    if (typeof placeholder === 'function') {
      return placeholder(this.group()?.value) ?? '';
    }
    return placeholder ?? '';
  });

  public constructor() {
    super();
    effect(() => {
      const group = this.group();
      const options = this.schemaOptions();
      const fieldControl = this.fieldControl();
      if (group && fieldControl) {
        group.valueChanges.subscribe(() => {
          if (options?.onChangeFn) {
            options.onChangeFn(group.value, fieldControl);
          }
        });
      }
    });
    effect(() => {
      const fieldControl = this.fieldControl();
      if (fieldControl && this.conditions()?.length) {
        this.createConditions();
      }
    });
    effect(() => {
      const readonly = this.fieldIsReadonly();
      const hidden = this.fieldIsHidden();
      const control = this.fieldControl();
      if (control) {
        if (readonly || hidden) {
          control.disable();
        } else {
          control.enable();
        }
      }
    });
    effect(() => {
      const control = this.fieldControl();
      if (control) {
        const readonly = this.fieldIsReadonly();
        const hidden = this.fieldIsHidden();
        const required = this.fieldIsRequired();
        if (!readonly && !hidden) {
          if (required && !control.hasValidator(Validators.required)) {
            control.setValidators(Validators.required);
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

  public setValue(value: any): void {
    const fieldControl = this.fieldControl();
    if (fieldControl) {
      fieldControl.setValue(value);
    }
  }

  private getDefaultErrorMessage(
    key: string,
    interpolateParams: object | undefined = this.schemaOptions()
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
      default:
        return this.translateService.stream('forms.error.generic', interpolateParams);
    }
  }

  private createConditions(): void {
    (this.conditions() ?? [])
      .filter(c => c.dependOn)
      .map(c => new FieldConditions(this, c))
      .forEach((conditions: FieldConditions) => {
        const subs = conditions.start((dependOn: string, value: any, firstRun: boolean | undefined) => {
          if (this.onConditionalChange) {
            this.onConditionalChange(dependOn, value, firstRun);
          }
        });
        if (subs?.length) {
          this.subscriptions.concat(subs);
        }
      });
  }
}
