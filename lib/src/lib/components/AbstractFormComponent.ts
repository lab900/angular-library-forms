import {
  AbstractControl,
  FormControlStatus,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  Input,
  OnDestroy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { FieldConditions } from '../models/IFieldConditions';
import { FormFieldUtils } from '../utils/form-field.utils';
import { SubscriptionBasedDirective } from '../directives/subscription-based.directive';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { ValueLabel } from '../models/form-field-base';
import { Lab900FormBuilderService } from '../services/form-builder.service';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';

@Directive()
export abstract class FormComponent<S extends Lab900FormField = Lab900FormField>
  extends SubscriptionBasedDirective
  implements AfterViewInit, OnDestroy, AfterContentInit
{
  private readonly _fieldAttribute$ = new BehaviorSubject<string | undefined>(
    undefined
  );

  private readonly fieldAttribute$: Observable<string> = this._fieldAttribute$
    .asObservable()
    .pipe(
      filter((g) => !!g),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  public get fieldAttribute(): string {
    return this._fieldAttribute$.value;
  }

  @Input()
  public set fieldAttribute(attr: string) {
    this._fieldAttribute$.next(attr);
  }

  private readonly _group$ = new BehaviorSubject<UntypedFormGroup | undefined>(
    undefined
  );

  public readonly group$: Observable<UntypedFormGroup> = this._group$
    .asObservable()
    .pipe(
      filter((g) => !!g),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  public get group(): UntypedFormGroup {
    return this._group$.value;
  }

  @Input({ required: true })
  public set group(group: UntypedFormGroup) {
    this._group$.next(group);
  }

  private readonly _schema$ = new BehaviorSubject<S | undefined>(undefined);

  public readonly schema$: Observable<S> = this._schema$.asObservable().pipe(
    filter((s) => !!s),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public readonly options$: Observable<S['options']> = this.schema$.pipe(
    map((schema) => schema.options),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public get schema(): S {
    return this._schema$.value;
  }

  @Input({ required: true })
  public set schema(schema: S) {
    this._schema$.next(schema);
  }

  public readonly groupValue$: Observable<any> = this.group$.pipe(
    switchMap((group) => group.valueChanges.pipe(startWith(group.value))),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  @Input()
  public language?: string;

  @Input()
  public externalForms?: Record<string, UntypedFormGroup>;

  @Input()
  public availableLanguages?: ValueLabel[];

  @Input()
  public readonly = false; // Global form readonly flag

  public fieldIsReadonly!: boolean;
  public fieldIsHidden!: boolean;
  public fieldIsRequired!: boolean;

  public get fieldControl(): AbstractControl {
    return this.group.get(this.fieldAttribute);
  }

  public readonly fieldControl$: Observable<AbstractControl> = combineLatest([
    this.group$,
    this.fieldAttribute$,
  ]).pipe(map(([group, fieldAttribute]) => group.get(fieldAttribute)));

  public readonly controlValue$: Observable<any> = this.fieldControl$.pipe(
    switchMap((control) => control.valueChanges.pipe(startWith(control.value))),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public readonly controlStatus$: Observable<FormControlStatus> =
    this.fieldControl$.pipe(
      switchMap((control) =>
        control.statusChanges.pipe(startWith(control.status))
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  public readonly valid$: Observable<boolean> = this.controlStatus$.pipe(
    map((status) => status === 'VALID')
  );

  public get valid(): boolean {
    return this.fieldControl?.valid;
  }

  public get options(): S['options'] {
    return this.schema?.options;
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

  public readonly placeholder$: Observable<string> =
    this.getOption$('placeholder');

  public readonly errorMessage$: Observable<string | undefined>;

  protected constructor(protected translateService: TranslateService) {
    super();

    this.controlStatus$.subscribe(console.log);

    this.addSubscription(
      this.fieldControl$.pipe(
        switchMap((control) =>
          control.valueChanges.pipe(withLatestFrom(this.schema$))
        )
      ),
      ([value, schema]) => {
        //this.setFieldProperties();
        if (schema?.options?.onChangeFn) {
          schema?.options?.onChangeFn(value, this.fieldControl);
        }
      }
    );

    this.errorMessage$ = combineLatest([this.group$, this.schema$]).pipe(
      switchMap(([group, schema]) => this.getErrorMessage(group, schema))
    );

    /*this.groupValue$
      .pipe(withLatestFrom(this.schema$))
      .subscribe(([value, schema]) => console.log(schema.attribute, value));*/
  }

  private getErrorMessage = (
    group: UntypedFormGroup,
    schema: S
  ): Observable<string> => {
    const field = group.get(String(this.fieldAttribute));
    let errors: ValidationErrors = field.errors;
    let message = this.translateService.get('forms.error.generic');
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

    Object.keys(errors).forEach((key: string) => {
      if (field.hasError(key)) {
        if (
          this.schema.errorMessages &&
          Object.keys(this.schema.errorMessages).includes(key)
        ) {
          message = this.translateService.get(
            this.schema.errorMessages[key],
            field.getError(key)
          );
        } else {
          message = this.getDefaultErrorMessage(key, field.getError(key));
        }
      }
    });
    return message;
  };

  public ngAfterContentInit(): void {
    if (this.group) {
      this.setFieldProperties();
    }
  }

  public ngAfterViewInit(): void {
    if (this.group) {
      if (this.schema?.conditions?.length) {
        this.createConditions();
      }
    }
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
    interpolateParams: object
  ): Observable<string> {
    switch (key) {
      case 'required':
        return this.translateService.get('forms.error.required');
      case 'minlength':
        return this.translateService.get(
          'forms.error.minlength',
          interpolateParams
        );
      case 'maxlength':
        return this.translateService.get(
          'forms.error.maxlength',
          interpolateParams
        );
      case 'min':
        return this.translateService.get('forms.error.min', interpolateParams);
      case 'max':
        return this.translateService.get('forms.error.max', interpolateParams);
      case 'pattern':
        return this.translateService.get(
          'forms.error.pattern',
          interpolateParams
        );
      case 'requireMatch':
        return this.translateService.get(
          'forms.error.requireMatch',
          interpolateParams
        );
      case 'toManyDecimalSeparators':
        return this.translateService.get(
          'forms.error.toManyDecimalSeparators',
          interpolateParams
        );
      case 'invalidNumber':
        return this.translateService.get(
          'forms.error.invalidNumber',
          interpolateParams
        );
      case 'noSearchMatches':
        return this.translateService.get(
          'forms.error.noSearchMatches',
          interpolateParams
        );
      default:
        return this.translateService.get(
          'forms.error.generic',
          interpolateParams
        );
    }
  }

  public hide(): void {
    this.fieldIsHidden = FormFieldUtils.isHidden(
      this.schema?.options,
      this.group
    );
  }

  private isReadonly(): void {
    this.fieldIsReadonly = FormFieldUtils.isReadOnly(
      this.schema?.options,
      this.group.value,
      this.readonly
    );
  }

  private isRequired(): void {
    const isRequired =
      FormFieldUtils.isRequired(
        this.fieldIsReadonly,
        this.schema,
        this.group.value
      ) ?? false;
    if (this.fieldIsRequired != isRequired) {
      this.fieldIsRequired = isRequired;
      setTimeout(() => {
        this.group
          ?.get(this.fieldAttribute)
          ?.setValidators(
            Lab900FormBuilderService.addValidators(
              this.schema,
              this.group.value
            )
          );
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
        const subs = conditions.start(
          (dependOn: string, value: any, firstRun: boolean) => {
            if (this.onConditionalChange) {
              this.onConditionalChange(dependOn, value, firstRun);
            }
          }
        );
        if (subs?.length) {
          this.subscriptions.concat(subs);
        }
      });
  }

  private getOption$<T>(optionProp: keyof S['options']): Observable<T> {
    return combineLatest([this.controlValue$, this.options$]).pipe(
      map(([value, options]) => {
        const opt = options?.[optionProp];
        if (opt) {
          return typeof opt === 'function' ? opt(value) : opt;
        }
        return undefined;
      })
    );
  }
}
