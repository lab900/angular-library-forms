import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import {
  AbstractControl,
  FormControlStatus,
  UntypedFormGroup,
} from '@angular/forms';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormFieldHint } from '../models/form-field-base';

@Injectable()
export class FormFieldService<S extends Lab900FormField = Lab900FormField> {
  public readonly _fieldAttribute$ = new BehaviorSubject<string | undefined>(
    undefined
  );

  public readonly fieldAttribute$: Observable<string> = this._fieldAttribute$
    .asObservable()
    .pipe(
      filter((g) => !!g),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  public get fieldAttribute(): string {
    return this._fieldAttribute$.value;
  }

  public set fieldAttribute(attr: string) {
    this._fieldAttribute$.next(attr);
  }

  public readonly _group$ = new BehaviorSubject<UntypedFormGroup | undefined>(
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

  public set group(group: UntypedFormGroup) {
    this._group$.next(group);
  }

  public readonly _schema$ = new BehaviorSubject<S | undefined>(undefined);

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

  public set schema(schema: S) {
    this._schema$.next(schema);
  }

  public readonly groupValue$: Observable<any> = this.group$.pipe(
    switchMap((group) => group.valueChanges.pipe(startWith(group.value))),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public readonly fieldControl$: Observable<AbstractControl> = combineLatest([
    this.group$,
    this.fieldAttribute$,
  ]).pipe(map(([group, fieldAttribute]) => group.get(fieldAttribute)));

  public readonly controlValue$: Observable<any> = this.fieldControl$.pipe(
    filter((control) => !!control),
    switchMap((control) => control.valueChanges.pipe(startWith(control.value))),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public readonly controlStatus$: Observable<FormControlStatus> =
    this.fieldControl$.pipe(
      filter((control) => !!control),
      switchMap((control) =>
        control.statusChanges.pipe(startWith(control.status))
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  public readonly valid$: Observable<boolean> = this.controlStatus$.pipe(
    map((status) => status === 'VALID')
  );

  public readonly label$: Observable<string | undefined> = this.schema$.pipe(
    map((schema) => schema.title)
  );

  public readonly hint$: Observable<FormFieldHint> = this.options$.pipe(
    map((options) => options?.hint)
  );

  public getOption$<T>(
    optionProp: keyof S['options'],
    fallback?: T
  ): Observable<T> {
    return combineLatest([this.controlValue$, this.options$]).pipe(
      map(([value, options]) => {
        const opt = options?.[optionProp];
        if (opt) {
          return (typeof opt === 'function' ? opt(value) : opt) ?? fallback;
        }
        return fallback;
      })
    );
  }

  public updateControlValue(value: any, markAsDirty = true): void {
    this.fieldControl$.pipe(take(1)).subscribe((control) => {
      control.setValue(value);
      if (markAsDirty) {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }
}
