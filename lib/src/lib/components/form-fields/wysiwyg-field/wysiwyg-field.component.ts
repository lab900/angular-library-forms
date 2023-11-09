import { ChangeDetectionStrategy, Component } from '@angular/core';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { FormComponent } from '../../AbstractFormComponent';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { WysiwgFieldModel } from './wysiwg-field.model';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lab900-wysiwyg-field',
  template: `
    <div [formGroup]="group" class="lab900-wysiwyg-field">
      <angular-editor
        [formControlName]="fieldAttribute"
        [config]="editorConfig$ | async"
      ></angular-editor>
    </div>
  `,
  styleUrls: ['./wysiwyg-field.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AngularEditorModule, ReactiveFormsModule, AsyncPipe],
})
export class WysiwygFieldComponent extends FormComponent<WysiwgFieldModel> {
  public editorConfig$: Observable<AngularEditorConfig> =
    this.formFieldService.getOption$('editorConfig');
}
