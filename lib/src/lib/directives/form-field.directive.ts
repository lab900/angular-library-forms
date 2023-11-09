import {
  ComponentRef,
  Directive,
  Input,
  reflectComponentType,
  ViewContainerRef,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilKeyChanged,
  Observable,
} from 'rxjs';
import { FormComponent } from '../components/AbstractFormComponent';
import { EditType } from '../models/editType';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { mapToComponent } from '../models/editTypeComponents';
import { filter, shareReplay } from 'rxjs/operators';
import { Lab900Form } from '../components/form-container/form-container.component';

@Directive({
  selector: '[lab900FormField]',
  standalone: true,
})
export class FormFieldDirective<S extends Lab900FormField = Lab900FormField> {
  public readonly _group$ = new BehaviorSubject<UntypedFormGroup | undefined>(
    undefined
  );

  public readonly group$: Observable<UntypedFormGroup> = this._group$
    .asObservable()
    .pipe(
      filter((g) => !!g),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  @Input({ required: true })
  public set group(group: UntypedFormGroup) {
    this._group$.next(group);
  }

  public readonly _schema$ = new BehaviorSubject<S | undefined>(undefined);

  public readonly schema$: Observable<S> = this._schema$.asObservable().pipe(
    filter((s) => !!s),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  @Input({ required: true })
  public set schema(schema: S) {
    this._schema$.next(schema);
  }

  public component?: ComponentRef<FormComponent>;

  public constructor(
    private readonly container: ViewContainerRef,
    private readonly form: Lab900Form<any>
  ) {
    combineLatest([
      this.group$,
      this.schema$.pipe(
        filter((schema) => !!schema.editType),
        distinctUntilKeyChanged('editType')
      ),
    ]).subscribe(([group, schema]) => {
      this.createComponent(schema, group);
    });
  }

  private createComponent(schema: S, group: UntypedFormGroup): void {
    this.container.clear();
    const component = mapToComponent(schema.editType, this.form.readonly);
    if (!component) {
      const supportedTypes = Object.keys(EditType).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${schema.editType}).
        Supported types: ${supportedTypes}`
      );
    }

    this.component = this.container.createComponent(component);
    const componentRef = reflectComponentType(component);
    this.component.location.nativeElement.classList.add(
      `lab900-form-field`,
      componentRef.selector
    );
    this.setComponentProps(schema, group);
  }

  private setComponentProps(schema: S, group: UntypedFormGroup): void {
    this.component.instance.schema = schema;
    if (schema?.attribute?.includes('.')) {
      const attributeMap = schema?.attribute.split('.');
      this.component.instance.fieldAttribute = attributeMap.pop();
      this.component.instance.group = group.get(
        attributeMap.join('.')
      ) as UntypedFormGroup;
    } else {
      this.component.instance.fieldAttribute = schema.attribute;
      this.component.instance.group = group;
    }
  }
}
