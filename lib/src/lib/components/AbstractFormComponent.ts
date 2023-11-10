import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import {
  AfterViewInit,
  Directive,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { combineLatest, Observable, Subscription, switchMap } from 'rxjs';
import { FieldConditions } from '../models/IFieldConditions';
import { FormFieldUtils } from '../utils/form-field.utils';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormFieldHint, ValueLabel } from '../models/form-field-base';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { FormFieldService } from '../services/form-field.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type controlError = { error: string; errorParams?: Record<string, string> };

@Directive()
export abstract class FormComponent<S extends Lab900FormField = Lab900FormField>
  implements AfterViewInit, OnDestroy
{
  private subs?: Subscription[];
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

  public readonly requiredField$: Observable<boolean> = combineLatest([
    this.formFieldService.groupValue$,
    this.formFieldService.groupValue$,
    this.readonlyField$,
  ]).pipe(
    map(([groupValue, schema, readonly]) =>
      FormFieldUtils.isRequired(readonly, schema, groupValue)
    )
  );

  public readonly controlValue$ = this.formFieldService.controlValue$;
  public readonly options$ = this.formFieldService.options$;

  public readonly disabled$ = combineLatest([
    this.formFieldService.fieldControl$,
    this.readonlyField$,
  ]).pipe(map(([control, readonly]) => readonly || control?.disabled));

  public constructor() {
    this.formFieldService.fieldControl$
      .pipe(
        filter((control) => !!control),
        switchMap((control) => control.valueChanges),
        withLatestFrom(this.formFieldService.schema$),
        takeUntilDestroyed()
      )
      .subscribe(([value, schema]) => {
        if (schema?.options?.onChangeFn) {
          schema?.options?.onChangeFn(value, this.fieldControl);
        }
      });
  }

  public ngAfterViewInit(): void {
    if (this.group) {
      if (this.schema?.conditions?.length) {
        this.createConditions();
      }
    }
  }

  public ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub.unsubscribe());
  }

  public updateControlValue(value: any, markAsDirty = true): void {
    this.formFieldService.updateControlValue(value, markAsDirty);
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
        this.subs = [...(this.subs ?? []), ...subs];
      });
  }
}
