import { AbstractControl, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { ChangeDetectorRef, computed, Directive, effect, inject, input, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { FieldConditions } from '../models/IFieldConditions';
import { FormFieldUtils } from '../utils/form-field.utils';
import { SubscriptionBasedDirective } from '../directives/subscription-based.directive';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { ValueLabel } from '../models/form-field-base';
import { Lab900FormBuilderService } from '../services/form-builder.service';
import { LAB900_FORM_MODULE_SETTINGS, Lab900FormModuleSettings } from '../models/Lab900FormModuleSettings';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Directive()
export abstract class FormComponent<S extends Lab900FormField = Lab900FormField>
  extends SubscriptionBasedDirective
  implements OnDestroy
{
  public readonly setting: Lab900FormModuleSettings = inject(LAB900_FORM_MODULE_SETTINGS);
  protected readonly translateService = inject(TranslateService);
  protected readonly changeDetectorRef = inject(ChangeDetectorRef);

  public readonly _fieldAttribute = input<string | undefined>(undefined, { alias: 'fieldAttribute' });
  public get fieldAttribute(): string {
    return this._fieldAttribute();
  }

  public _group = input.required<UntypedFormGroup>({ alias: 'group' });
  public get group(): UntypedFormGroup {
    return this._group();
  }

  protected readonly _fieldControl = computed(() => {
    if (this._group() && this._fieldAttribute()) {
      return this._group().get(this._fieldAttribute());
    }
    return;
  });

  public get fieldControl(): AbstractControl | undefined {
    return this._fieldControl();
  }

  public readonly _schema = input.required<S>({ alias: 'schema' });
  public readonly _options = computed<S['options']>(() => this._schema().options);
  public readonly label = computed<string | undefined>(() => this._schema().title);
  public readonly readonlyLabel = computed<string | undefined>(
    () => this._schema().options?.readonlyLabel ?? this.label(),
  );

  public readonly elementId = computed<string>(() => {
    const customId = this._options()?.customId;
    const fieldAttribute = this.fieldAttribute;
    if (customId) {
      return `${customId}`;
    } else if (fieldAttribute) {
      return `${fieldAttribute}`;
    }
    return '';
  });

  public readonly errorMessage = toSignal<string>(
    toObservable(this._fieldControl).pipe(
      filter((field) => !!field),
      switchMap((field) => field.statusChanges),
      switchMap(() => {
        const field = this.fieldControl;
        if (!field) {
          return EMPTY;
        }
        let errors: ValidationErrors = field.errors;
        let message = this.translateService.stream('forms.error.generic');
        if (field instanceof UntypedFormGroup && field.controls) {
          errors = field.errors ?? {};
          for (const controlsKey in field.controls) {
            if ('controlsKey' in field.controls) {
              errors = { ...errors, ...field.get(controlsKey).errors };
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
      }),
    ),
  );

  public get options(): S['options'] {
    return this._options();
  }
  public get schema(): S {
    return this._schema();
  }

  @Input()
  public externalForms?: Record<string, UntypedFormGroup>;

  public readonly language = input<string | undefined>(undefined);
  public readonly availableLanguages = input<ValueLabel[]>([]);

  @Input()
  public readonly = false; // Global form readonly flag

  public fieldIsReadonly!: boolean;
  public fieldIsHidden!: boolean;
  public fieldIsRequired!: boolean;

  public get valid(): boolean {
    return this.fieldControl?.valid;
  }

  public get touched(): boolean {
    return this.fieldControl?.touched;
  }

  public get hint(): string {
    return this.options?.hint?.value;
  }

  public get hintValueTranslateData(): object {
    return this.options?.hint?.valueTranslateData;
  }

  public get placeholder(): string {
    if (typeof this.options?.placeholder === 'function') {
      return this.options.placeholder(this.group.value);
    }
    return this.options?.placeholder;
  }

  public constructor() {
    super();
    effect(
      () => {
        const group = this._group();
        const options = this._options();
        const fieldControl = this._fieldControl();
        if (group && fieldControl) {
          this.setFieldProperties();
          group.valueChanges.subscribe(() => {
            this.setFieldProperties();
            if (options?.onChangeFn) {
              options.onChangeFn(group.value, fieldControl);
            }
          });
        }
      },
      { allowSignalWrites: true },
    );
    effect(
      () => {
        if (this._schema().conditions?.length) {
          this.createConditions();
        }
      },
      { allowSignalWrites: true },
    );
  }

  public onConditionalChange(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dependOn: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    firstRun?: boolean,
  ): void {
    // Override in child component
  }

  private getDefaultErrorMessage(key: string, interpolateParams: object = this.schema.options): Observable<string> {
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

  public hide(): void {
    this.fieldIsHidden = FormFieldUtils.isHidden(this.schema?.options, this.group);
    this.changeDetectorRef.markForCheck();
  }

  private isReadonly(): void {
    this.fieldIsReadonly = FormFieldUtils.isReadOnly(this.schema?.options, this.group.value, this.readonly);
    this.changeDetectorRef.markForCheck();
  }

  private isRequired(): void {
    const isRequired = FormFieldUtils.isRequired(this.fieldIsReadonly, this.schema, this.group.value) ?? false;
    if (this.fieldIsRequired != isRequired) {
      this.fieldIsRequired = isRequired;
      this.fieldControl?.setValidators(Lab900FormBuilderService.addValidators(this.schema, this.group.value));
      setTimeout(() => {
        this.changeDetectorRef.markForCheck();
      });
    }
  }

  private setFieldProperties(): void {
    this.hide();
    this.isReadonly();
    this.isRequired();
  }

  private createConditions(): void {
    this.schema.conditions
      .filter((c) => c.dependOn)
      .map((c) => new FieldConditions(this, c))
      .forEach((conditions: FieldConditions) => {
        const subs = conditions.start((dependOn: string, value: any, firstRun: boolean) => {
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
