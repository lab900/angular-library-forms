import {
  ComponentRef,
  Directive,
  effect,
  inject,
  input,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormComponent } from '../components/AbstractFormComponent';
import { ReadonlyFieldComponent } from '../components/form-fields/readonly-field/readonly-field.component';
import { EditType } from '../models/editType';
import { ValueLabel } from '../models/form-field-base';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormFieldMappingService } from '../services/form-field-mapping.service';

@Directive({
  selector: '[lab900FormField]',
  standalone: true,
})
export class FormFieldDirective implements OnChanges, OnInit {
  private readonly container = inject(ViewContainerRef);
  private readonly formFieldMappingService = inject(FormFieldMappingService);

  @Input()
  public schema: Lab900FormField;

  @Input()
  public group: UntypedFormGroup;

  public readonly language = input<string | undefined>(undefined);
  public readonly availableLanguages = input<ValueLabel[]>([]);

  @Input()
  public readonly = false;

  @Input()
  public externalForms?: Record<string, UntypedFormGroup>;

  public component?: ComponentRef<FormComponent>;

  public constructor() {
    effect(() => {
      if (this.component) {
        this.component.setInput(
          'availableLanguages',
          this.availableLanguages(),
        );
      }
    });
    effect(() => {
      if (this.component) {
        this.component.setInput('language', this.language);
      }
    });
  }

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

  private createComponent(): void {
    this.container.clear();
    const c =
      this.readonly &&
      ![
        EditType.Row,
        EditType.Column,
        EditType.Select,
        EditType.FilePreview,
        EditType.ButtonToggle,
        EditType.SlideToggle,
        EditType.Button,
      ].includes(this.schema.editType)
        ? ReadonlyFieldComponent
        : this.formFieldMappingService.mapToComponent(this.schema);
    this.component = this.container.createComponent(c);
    this.setComponentProps();
  }

  private setComponentProps(): void {
    if (!this.component) {
      return;
    }
    this.component.setInput('schema', this.schema);
    if (this.schema?.attribute?.includes('.')) {
      const attributeMap = this.schema?.attribute.split('.');
      this.component.setInput('fieldAttribute', attributeMap.pop());
      this.component.setInput(
        'group',
        this.group.get(attributeMap.join('.')) as UntypedFormGroup,
      );
    } else {
      this.component.setInput('fieldAttribute', this.schema.attribute);
      this.component.setInput('group', this.group);
    }
    this.component.setInput('readonly', this.readonly);
    this.component.setInput('externalForms', this.externalForms);
  }

  private validateType(): void {
    if (!this.formFieldMappingService.mapToComponent(this.schema)) {
      const supportedTypes = Object.keys(EditType).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.schema.editType}).
        Supported types: ${supportedTypes}`,
      );
    }
  }
}
