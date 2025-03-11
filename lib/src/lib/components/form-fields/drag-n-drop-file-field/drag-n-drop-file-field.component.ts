import { Component, HostBinding } from '@angular/core';
import { Lab900File } from '../../../models/Lab900File';
import { formatBytes } from '../../../utils/image.utils';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDragNDropFilePreview } from './drag-n-drop-file-field.model';
import { NgClass } from '@angular/common';
import { FileDropDirective } from '../../../directives/file-drop.directive';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'lab900-drag-n-drop-file-field',
  templateUrl: './drag-n-drop-file-field.component.html',
  styleUrls: ['./drag-n-drop-file-field.component.scss'],
  imports: [NgClass, FileDropDirective, MatIcon, TranslatePipe, MatButton, MatIconButton],
})
export class DragNDropFileFieldComponent extends FormComponent<FormFieldDragNDropFilePreview> {
  @HostBinding('class')
  public classList = 'lab900-form-field';

  public get files(): Lab900File[] {
    return (this.fieldControl?.value as Lab900File[]) ?? [];
  }

  public handleInput(target: EventTarget): void {
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
      const maxFiles = this._options()?.maxFiles;
      if (maxFiles != undefined && files.length > maxFiles) {
        console.error(
          `Too many files loaded ${files.length}, max is ${maxFiles}.
            Change property maxFiles to fix this.`
        );
        return;
      }
      this.setFieldControlValue(files);
    }
  }

  private toLab900File(file: File): Lab900File {
    const lab900File = file as Lab900File;
    lab900File.fileName = file.name;
    return lab900File;
  }

  private setFieldControlValue(files: Lab900File[]): void {
    this.fieldControl?.setValue(files);
    this.fieldControl?.markAsDirty();
    this.fieldControl?.markAsTouched();
  }

  public formatBytes(size: number): string {
    return formatBytes(size);
  }

  public deleteFile(file: Lab900File): void {
    const files = new Set(this.files);
    files.delete(file);
    this.setFieldControlValue(Array.from(files));
  }
}
