import { ComponentRef, computed, Directive, effect, inject, input, signal, ViewContainerRef } from '@angular/core';
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
export class FormFieldDirective {
  private readonly container = inject(ViewContainerRef);
  private readonly formFieldMappingService = inject(FormFieldMappingService);

  public readonly schema = input.required<Lab900FormField>();
  public readonly group = input.required<UntypedFormGroup>();
  public readonly fieldGroup = computed(() => {
    const schema = this.schema();
    if (schema?.attribute?.includes('.')) {
      const attributeMap = schema?.attribute.split('.');
      return this.group().get(attributeMap.join('.')) as UntypedFormGroup;
    }
    return this.group();
  });

  public readonly language = input<string | undefined>(undefined);
  public readonly availableLanguages = input<ValueLabel[]>([]);
  public readonly readonly = input<boolean>(false);
  public readonly fieldIsReadonly = computed(() => {
    const options = this.schema().options;
    if (this.readonly()) {
      return true;
    }
    if (typeof options?.readonly === 'function') {
      return options?.readonly(this.fieldGroup().value);
    }
    return !!options?.readonly;
  });
  public readonly fieldIsHidden = computed(() => {
    const options = this.schema().options;
    if (typeof options?.hide === 'function') {
      return options?.hide(this.fieldGroup().value);
    }
    return !!options?.hide;
  });
  public readonly fieldIsRequired = computed(() => {
    const options = this.schema().options;
    if (typeof options?.required === 'function') {
      return options?.required(this.fieldGroup().value);
    }
    return !!options?.required;
  });

  public readonly externalForms = input<Record<string, UntypedFormGroup> | undefined>(undefined);
  public readonly componentType = computed(() => {
    this.validateType();
    return this.readonly() &&
      ![
        EditType.Row,
        EditType.Column,
        EditType.FilePreview,
        EditType.ButtonToggle,
        EditType.SlideToggle,
        EditType.Button,
      ].includes(this.schema().editType)
      ? ReadonlyFieldComponent
      : this.formFieldMappingService.mapToComponent(this.schema());
  });
  public readonly component = signal<ComponentRef<FormComponent> | undefined>(undefined);

  public constructor() {
    effect(() => {
      const componentType = this.componentType();
      if (componentType && !this.fieldIsHidden()) {
        this.createComponent();
      }
    });
    effect(() => {
      const schema = this.schema();
      const component = this.component();
      if (component) {
        if (schema?.attribute?.includes('.')) {
          const attributeMap = schema?.attribute.split('.');
          component.setInput('fieldAttribute', attributeMap.pop());
        } else if (component) {
          component.setInput('fieldAttribute', schema.attribute);
        }
        component.setInput('group', this.fieldGroup());
      }
    });
    effect(() => {
      const component = this.component();
      if (component) {
        component.setInput('availableLanguages', this.availableLanguages());
      }
    });
    effect(() => {
      const component = this.component();
      if (component) {
        component.setInput('language', this.language());
      }
    });
    effect(() => {
      const component = this.component();
      if (component) {
        component.setInput('schema', this.schema());
      }
    });
    effect(() => {
      const component = this.component();
      if (component) {
        component.setInput('readonly', this.fieldIsReadonly());
      }
    });
    effect(() => {
      const component = this.component();
      if (component) {
        component.setInput('fieldIsHidden', this.fieldIsHidden());
      }
    });
    effect(() => {
      const component = this.component();
      if (component) {
        component.setInput('externalForms', this.externalForms());
      }
    });
    effect(() => {
      const component = this.component();
      if (component) {
        component.setInput('fieldIsRequired', this.fieldIsRequired());
      }
    });
  }

  private createComponent(): void {
    this.container.clear();
    this.component.set(this.container.createComponent(this.componentType()));
  }

  private validateType(): void {
    if (!this.formFieldMappingService.mapToComponent(this.schema())) {
      const supportedTypes = Object.keys(EditType).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.schema().editType}).
        Supported types: ${supportedTypes}`
      );
    }
  }
}
