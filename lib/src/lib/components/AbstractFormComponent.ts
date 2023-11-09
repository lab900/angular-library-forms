import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { FieldConditions } from '../models/IFieldConditions';
import { FormFieldUtils } from '../utils/form-field.utils';
import { SubscriptionBasedDirective } from '../directives/subscription-based.directive';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormFieldHint, ValueLabel } from '../models/form-field-base';
import { Lab900FormBuilderService } from '../services/form-builder.service';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { FormFieldService } from '../services/form-field.service';

type controlError = { error: string; errorParams?: Record<string, string> };

@Directive()
export abstract class FormComponent<S extends Lab900FormField = Lab900FormField>
  extends SubscriptionBasedDirective
  implements AfterViewInit, OnDestroy, AfterContentInit
{
  protected readonly formFieldService: FormFieldService<S> =
    inject(FormFieldService);

  public readonly fieldAttribute$ = this.formFieldService.fieldAttribute$;

  @Input()
  public set fieldAttribute(attr: string) {
    this.formFieldService._fieldAttribute$.next(attr);
  }

  public readonly group$ = this.formFieldService.group$;

  public get group(): UntypedFormGroup {
    return this.formFieldService._group$.value;
  }

  @Input({ required: true })
  public set group(group: UntypedFormGroup) {
    this.formFieldService._group$.next(group);
  }

  public get schema(): S {
    return this.formFieldService._schema$.value;
  }

  @Input({ required: true })
  public set schema(schema: S) {
    this.formFieldService._schema$.next(schema);
  }

  @Input()
  public language?: string;

  @Input()
  public externalForms?: Record<string, UntypedFormGroup>;

  @Input()
  public availableLanguages?: ValueLabel[];

  @Input()
  public readonly = false; // Global form readonly flag

  public fieldIsReadonly!: boolean;
  public fieldIsRequired!: boolean;

  public get fieldControl(): AbstractControl {
    return this.group.get(this.fieldAttribute);
  }

  public get valid(): boolean {
    return this.fieldControl?.valid;
  }

  public get options(): S['options'] {
    return this.schema?.options;
  }

  public get touched(): boolean {
    return this.fieldControl?.touched;
  }

  public readonly placeholder$: Observable<string> =
    this.formFieldService.getOption$<string>('placeholder');

  public readonly controlError$: Observable<controlError>;

  public readonly label$: Observable<string | undefined> =
    this.formFieldService.label$;

  public readonly hint$: Observable<FormFieldHint> =
    this.formFieldService.hint$;

  public readonly hideField$: Observable<boolean> = combineLatest([
    this.formFieldService.options$,
    this.formFieldService.groupValue$,
  ]).pipe(
    map(([options, groupValue]) => {
      if (typeof options?.hide === 'function') {
        return options?.hide(groupValue);
      }
      return options?.hide ?? false;
    })
  );

  public readonly readonlyField$: Observable<boolean> = combineLatest([
    this.formFieldService.options$,
    this.formFieldService.groupValue$,
  ]).pipe(
    map(([options, groupValue]) => {
      if (typeof options?.readonly === 'function') {
        return options?.readonly(groupValue);
      }
      return options?.readonly ?? false;
    })
  );

  public controlValue$ = this.formFieldService.controlValue$;

  public disabled$ = combineLatest([
    this.formFieldService.fieldControl$,
    this.readonlyField$,
  ]).pipe(map(([control, readonly]) => readonly || control?.disabled));

  public constructor() {
    super();

    this.addSubscription(
      this.formFieldService.fieldControl$.pipe(
        filter((control) => !!control),
        switchMap((control) =>
          control.valueChanges.pipe(
            withLatestFrom(this.formFieldService.schema$)
          )
        )
      ),
      ([value, schema]) => {
        //this.setFieldProperties();
        if (schema?.options?.onChangeFn) {
          schema?.options?.onChangeFn(value, this.fieldControl);
        }
      }
    );
  }

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

  protected getOption$<T>(
    optionProp: keyof S['options'],
    fallback?: T
  ): Observable<T> {
    return this.formFieldService.getOption$<T>(optionProp, fallback);
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
}
