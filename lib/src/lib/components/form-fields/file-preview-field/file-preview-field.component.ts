import { Component, ElementRef, HostBinding, inject, viewChild } from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { Lab900File } from '../../../models/Lab900File';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewModalComponent } from '../../image-preview-modal/image-preview-modal.component';
import { fetchImageBase64 } from '../../../utils/image.utils';
import { FormFieldFilePreview } from './file-preview-field.model';
import { take } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';

import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { AuthImageDirective } from '../../../directives/auth-image.directive';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'lab900-file-preview-field',
  templateUrl: './file-preview-field.component.html',
  styleUrls: ['./file-preview-field.component.scss'],
  imports: [TranslatePipe, MatButton, MatCard, MatIcon, AuthImageDirective, MatTooltip],
})
export class FilePreviewFieldComponent<T> extends FormComponent<FormFieldFilePreview> {
  private readonly dialog = inject(MatDialog);
  @HostBinding('class')
  public classList = 'lab900-form-field';

  private readonly fileFieldComponent = viewChild<ElementRef>('fileField');

  public get files(): Lab900File[] {
    return (this.fieldControl()?.value as Lab900File[]) ?? [];
  }

  public fileChange(event: Event): void {
    const fileList: FileList | null = (event.target as HTMLInputElement).files;
    const fileArray: File[] = [];
    if (fileList) {
      for (const file of fileList) {
        fileArray.push(file);
      }
    }

    this.filesAdded(fileArray);
  }

  public filesAdded(fileArray: File[]): void {
    fileArray.forEach(file => {
      if (file.type.includes('image')) {
        this.readImageData(file);
      } else {
        this.addFileToFieldControl(file);
      }
    });
  }

  private readImageData(file: File): void {
    const reader = new FileReader();
    const image = file as Lab900File;
    reader.onload = (event: any) => {
      image.imageSrc = event.target.result;
      this.addFileToFieldControl(file);
    };

    reader.onerror = (event: any) => {
      console.error('File could not be read: ' + event.target.error.code);
    };

    reader.readAsDataURL(image);
  }

  private addFileToFieldControl(file: File): void {
    const lab900File = file as Lab900File;
    lab900File.fileName = file.name;
    this.setFieldControlValue([...this.files, lab900File]);
  }

  public removeFile(file: Lab900File): void {
    const files: Lab900File[] = this.files;
    files.splice(this.getFileIndex(file), 1);
    this.setFieldControlValue(files);
    const nativeElm = this.fileFieldComponent()?.nativeElement;
    if (nativeElm) {
      nativeElm.value = null;
    }
  }

  public onMetaDataChanged(data: T, originalData?: Lab900File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (originalData) {
        const files = this.files;
        const index = this.getFileIndex(originalData);
        if (index === -1) {
          console.error(`Couldn't find file in list`);
          reject();
        }
        Object.assign(originalData, data);
        files[index] = originalData;
        this.setFieldControlValue(files);
        resolve(true);
      }
      reject();
    });
  }

  private getFileIndex(file: Lab900File): number {
    return this.files.findIndex(
      (listFile: Lab900File) =>
        listFile.fileName === file.fileName && listFile.type === file.type && listFile.size === file.size
    );
  }

  public handleImageClick(file: Lab900File): void {
    if (this.schemaOptions()?.canEditFileMetaData && !this.fieldIsReadonly()) {
      this.openMetaDataDialog(file);
    } else if (file.imageSrc != null) {
      this.openPreviewDialog(file);
    }
  }

  private openMetaDataDialog(file: Lab900File): void {
    this.dialog.open(FormDialogComponent, {
      data: {
        schema: this.schemaOptions()?.fileMetaDataConfig,
        data: file,
        submit: this.onMetaDataChanged.bind(this),
      },
    });
  }

  public openPreviewDialog(file: Lab900File): void {
    const httpCb = this.schemaOptions()?.httpCallback;
    if (file.imageBase64 != null) {
      this.dialog.open(ImagePreviewModalComponent, {
        data: {
          image: file,
        },
      });
    } else if (httpCb) {
      fetchImageBase64(httpCb, file, result => {
        file.imageBase64 = result as string;
        this.dialog.open(ImagePreviewModalComponent, {
          data: {
            image: file,
          },
        });
      })
        .pipe(take(1))
        .subscribe();
    }
  }

  public showOverlay(file: Lab900File): boolean {
    const showOverlay = this.schemaOptions()?.showOverlay;
    if (typeof showOverlay === 'function') {
      return showOverlay(file);
    } else {
      return showOverlay ?? false;
    }
  }

  private setFieldControlValue(files: Lab900File[]): void {
    this.setValue(files);
  }
}
