import { Component, computed, HostBinding } from '@angular/core';
import { Lab900File } from '../../../models/Lab900File';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDragNDropFilePreview } from './drag-n-drop-file-field.model';
import { FileDropDirective } from '../../../directives/file-drop.directive';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError } from '@angular/material/input';
import { FormatBytesPipe } from '../../../pipes/format-bytes.pipe';

@Component({
  selector: 'lab900-drag-n-drop-file-field',
  templateUrl: './drag-n-drop-file-field.component.html',
  styleUrls: ['./drag-n-drop-file-field.component.scss'],
  imports: [FileDropDirective, MatIcon, TranslatePipe, MatButton, MatIconButton, MatError, FormatBytesPipe],
})
export class DragNDropFileFieldComponent extends FormComponent<FormFieldDragNDropFilePreview> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  protected readonly compact = computed(() => !!this._options()?.compact);
  protected readonly dropFilesText = computed(() => this._options()?.dropFilesText ?? 'Drop Files');
  protected readonly dropFilesButton = computed(() => this._options()?.dropFilesButton ?? 'Upload Files');
  protected readonly maxFiles = computed(() => this._options()?.maxFiles);
  protected readonly multiple = computed(() => {
    const maxFiles = this.maxFiles();
    return maxFiles == undefined || maxFiles > 1;
  });

  protected readonly filesSignal = computed(() => (this.controlValue() as Lab900File[]) ?? []);

  public get files(): Lab900File[] {
    return this.filesSignal();
  }

  public handleInput(target: EventTarget | null): void {
    if (!target) {
      return;
    }
    const files = (target as HTMLInputElement)?.files;
    if (files) {
      this.handleFileList(files);
    }
  }

  public handleFileList(input: FileList): void {
    const files = Array.from(input).map(this.toLab900File);
    this.ingestFiles(files);
  }

  private ingestFiles(files: Lab900File[]): void {
    if (files) {
      this.setFieldControlValue(files);
    }
  }

  private toLab900File(file: File): Lab900File {
    const lab900File = file as Lab900File;
    lab900File.fileName = file.name;
    return lab900File;
  }

  private setFieldControlValue(files: Lab900File[]): void {
    const ctrl = this._fieldControl();
    if (ctrl) {
      ctrl.setValue(files);
      setTimeout(() => {
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }, 1);
    }
  }

  public deleteFile(file: Lab900File): void {
    const files = new Set(this.files);
    files.delete(file);
    this.setFieldControlValue(Array.from(files));
  }
}
