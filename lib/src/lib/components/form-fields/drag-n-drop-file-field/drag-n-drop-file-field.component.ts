import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Lab900File } from '../../../models/Lab900File';
import { formatBytes } from '../../../utils/image.utils';
import { FormComponent } from '../../AbstractFormComponent';
import { FormFieldDragNDropFilePreview } from './drag-n-drop-file-field.model';
import { FormFieldService } from '../../../services/form-field.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FileDropDirective } from '../../../directives/file-drop.directive';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lab900-drag-n-drop-file-field',
  templateUrl: './drag-n-drop-file-field.component.html',
  styleUrls: ['./drag-n-drop-file-field.component.scss'],
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FileDropDirective,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    NgForOf,
  ],
})
export class DragNDropFileFieldComponent extends FormComponent<FormFieldDragNDropFilePreview> {
  public readonly compact$ = this.getOption$<boolean>('compact', false);
  public readonly isCompact$ = combineLatest([
    this.compact$,
    this.controlValue$,
  ]).pipe(map(([compact, value]) => compact && value?.length > 0));
  public readonly dropFilesText$ = this.getOption$<string>(
    'dropFilesText',
    'Drop Files'
  );
  public readonly dropFilesBtn$ = this.getOption$<string>(
    'dropFilesButton',
    'Upload Files'
  );

  @ViewChild('fileField')
  private fileFieldComponent: ElementRef;

  public handleInput(target: EventTarget): void {
    this.handleFileList((target as HTMLInputElement)?.files);
  }

  public handleFileList(input: FileList): void {
    const files = Array.from(input).map(this.toLab900File);
    this.ingestFiles(files);
  }

  private ingestFiles(files: Lab900File[]): void {
    if (files) {
      if (files.length > this.options.maxFiles) {
        console.error(
          `Too many files loaded ${files.length}, max is ${this.options.maxFiles}.
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
    this.fieldControl.setValue(files);
    this.fieldControl.markAsDirty();
    this.fieldControl.markAsTouched();
  }

  public formatBytes(size: number): string {
    return formatBytes(size);
  }

  public deleteFile(file: Lab900File, files: Lab900File[]): void {
    const currentFiles = new Set(files);
    currentFiles.delete(file);
    this.setFieldControlValue(Array.from(currentFiles));
  }
}
