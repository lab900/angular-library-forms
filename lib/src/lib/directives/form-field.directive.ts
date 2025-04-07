import { ComponentRef, computed, Directive, effect, inject, input, signal, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormComponent } from '../components/AbstractFormComponent';
import { ReadonlyFieldComponent } from '../components/form-fields/readonly-field/readonly-field.component';
import { EditType } from '../models/editType';
import { FormFieldBaseOptions, ValueLabel } from '../models/form-field-base';
import { Lab900FormField } from '../models/lab900-form-field.type';
import { FormFieldMappingService } from '../services/form-field-mapping.service';
import { computeReactiveBooleanOption } from '../utils/helpers';
import { rxResource } from '@angular/core/rxjs-interop';
import { concat, defer, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[lab900FormField]',
  exportAs: 'lab900FormField',
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
      attributeMap.pop();
      return this.group().get(attributeMap.join('.')) as UntypedFormGroup;
    }
    return this.group();
  });

  public readonly groupValue = rxResource({
    request: () => this.fieldGroup(),
    loader: ({ request }) => {
      if (request) {
        return concat(
          defer(() => of(request.getRawValue)),
          request.valueChanges.pipe(map(() => request.getRawValue()))
        );
      }
      return of(null);
    },
  }).value;

  public readonly language = input<string | undefined>(undefined);
  public readonly availableLanguages = input<ValueLabel[]>([]);
  public readonly readonly = input<boolean>(false);

  public readonly fieldIsReadonly = computed(() => {
    if (this.readonly()) {
      return true;
    }
    return this.getReactiveBooleanOption('readonly');
  });
  public readonly fieldIsHidden = computed(() => {
    return this.getReactiveBooleanOption('hide');
  });
  public readonly fieldIsRequired = computed(() => {
    return this.getReactiveBooleanOption('required');
  });

  public readonly externalForms = input<Record<string, UntypedFormGroup> | undefined>(undefined);
  public readonly componentType = computed(() => {
    this.validateType();
    return this.fieldIsReadonly() &&
      ![
        EditType.Row,
        EditType.Column,
        EditType.FilePreview,
        EditType.ButtonToggle,
        EditType.SlideToggle,
        EditType.Button,
        EditType.Select,
      ].includes(this.schema().editType)
      ? ReadonlyFieldComponent
      : this.formFieldMappingService.mapToComponent(this.schema());
  });
  public readonly component = signal<ComponentRef<FormComponent> | undefined>(undefined);

  public constructor() {
    effect(() => {
      const componentType = this.componentType();
      const group = this.fieldGroup();
      if (componentType && group) {
        this.createComponent();
      }
    });
    effect(() => {
      const schema = this.schema();
      const component = this.component();
      const group = this.fieldGroup();
      if (component && group) {
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

  private getReactiveBooleanOption(key: keyof Pick<FormFieldBaseOptions, 'hide' | 'required' | 'readonly'>): boolean {
    const options = this.schema().options;
    if (options?.[key] != null) {
      return computeReactiveBooleanOption(options[key], this.groupValue);
    }
    return false;
  }
}
