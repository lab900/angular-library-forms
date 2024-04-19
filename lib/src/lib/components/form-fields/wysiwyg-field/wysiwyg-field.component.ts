import { Component, computed, HostBinding } from '@angular/core';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { FormComponent } from '../../AbstractFormComponent';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { WysiwgFieldModel } from './wysiwg-field.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lab900-wysiwyg-field',
  template: `
    @if (editorConfig()) {
      <div [formGroup]="group" class="lab900-wysiwyg-field">
        <angular-editor
          [formControlName]="fieldAttribute"
          [config]="editorConfig()"
        />
      </div>
    }
  `,
  styleUrls: ['./wysiwyg-field.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
  standalone: true,
  imports: [AngularEditorModule, ReactiveFormsModule],
})
export class WysiwygFieldComponent extends FormComponent<WysiwgFieldModel> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public readonly editorConfig = computed(() => {
    return <AngularEditorConfig>{
      editable: true,
      sanitize: false,
      ...(this.options()?.editorConfig ?? {}),
    };
  });
}
