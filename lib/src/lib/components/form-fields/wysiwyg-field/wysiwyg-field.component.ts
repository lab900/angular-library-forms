import { Component, computed, HostBinding } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { WysiwgFieldModel } from './wysiwg-field.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lab900-wysiwyg-field',
  template: `
    <div [formGroup]="group" class="lab900-wysiwyg-field">
      <angular-editor [formControlName]="fieldAttribute" [config]="editorConfig()" />
    </div>
  `,
  styleUrls: ['./wysiwyg-field.component.scss'],
  imports: [ReactiveFormsModule, AngularEditorModule],
})
export class WysiwygFieldComponent extends FormComponent<WysiwgFieldModel> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  protected readonly editorConfig = computed<AngularEditorConfig>(() => {
    return {
      editable: true,
      sanitize: false,
      ...(this._options()?.editorConfig ?? {}),
    };
  });
}
