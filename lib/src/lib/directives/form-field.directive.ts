import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormComponent } from '../components/AbstractFormComponent';
import { ReadonlyFieldComponent } from '../components/form-fields/readonly-field/readonly-field.component';
import { EditType } from '../models/editType';
import { ValueLabel } from '../models/form-field-base';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormFieldMappingService } from '../services/form-field-mapping.service';

@Directive({
  selector: '[lab900FormField]',
})
export class FormFieldDirective implements OnChanges, OnInit, OnDestroy {
  @Input()
  public schema: Lab900FormField;

  @Input()
  public group: FormGroup;

  @Input()
  public language?: string;

  @Input()
  public availableLanguages?: ValueLabel[];

  @Input()
  public readonly = false;

  @Input()
  public externalForms?: Record<string, FormGroup>;

  public component: ComponentRef<FormComponent>;

  public statusChangeSubscription: Subscription;

  public constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private formFieldMappingService: FormFieldMappingService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.component && changes.readonly) {
      const { previousValue } = changes.readonly;
      const hadPrevious =
        previousValue !== null && typeof previousValue !== 'undefined';
      if (hadPrevious && changes.readonly?.previousValue !== this.readonly) {
        this.createComponent();
      } else {
        this.setComponentProps();
      }
    }
  }

  public ngOnInit(): void {
    this.validateType();
    this.createComponent();
  }

  public ngOnDestroy(): void {
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }
  }

  private createComponent(): void {
    this.container.clear();
    const c =
      this.readonly &&
      ![
        EditType.Row,
        EditType.Select,
        EditType.FilePreview,
        EditType.ButtonToggle,
        EditType.SlideToggle,
      ].includes(this.schema.editType)
        ? ReadonlyFieldComponent
        : this.formFieldMappingService.mapToComponent(this.schema);
    const component = this.resolver.resolveComponentFactory<FormComponent>(c);
    this.component = this.container.createComponent(component);
    this.setComponentProps();
  }

  private setComponentProps(): void {
    this.component.instance.schema = this.schema;
    if (this.schema?.attribute?.includes('.')) {
      const attributeMap = this.schema?.attribute.split('.');
      this.component.instance.fieldAttribute = attributeMap.pop();
      this.component.instance.group = this.group.get(
        attributeMap.join('.')
      ) as FormGroup;
    } else {
      this.component.instance.fieldAttribute = this.schema.attribute;
      this.component.instance.group = this.group;
    }
    this.component.instance.readonly = this.readonly;
    this.component.instance.availableLanguages = this.availableLanguages;
    this.component.instance.language = this.language;
    this.component.instance.externalForms = this.externalForms;
  }

  private validateType(): void {
    if (!this.formFieldMappingService.mapToComponent(this.schema)) {
      const supportedTypes = Object.keys(EditType).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.schema.editType}).
        Supported types: ${supportedTypes}`
      );
    }
  }
}
