import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormComponent } from '../../AbstractFormComponent';
import { Lab900File } from '../../../models/Lab900File';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewModalComponent } from '../../image-preview-modal/image-preview-modal.component';
import { fetchImageBase64 } from '../../../utils/image.utils';
import { FormFieldFilePreview } from './file-preview-field.model';
import { take } from 'rxjs/operators';
import { FormFieldService } from '../../../services/form-field.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Lab900ButtonModule } from '@lab900/ui';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthImageDirective } from '../../../directives/auth-image.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'lab900-file-preview-field',
  templateUrl: './file-preview-field.component.html',
  styleUrls: ['./file-preview-field.component.scss'],
  providers: [FormFieldService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TranslateModule,
    Lab900ButtonModule,
    MatCardModule,
    MatIconModule,
    AuthImageDirective,
    MatTooltipModule,
  ],
})
export class FilePreviewFieldComponent<
  T
> extends FormComponent<FormFieldFilePreview> {
  public readonly accept$ = this.getOption$<string>('accept');
  public readonly multiple$ = this.getOption$<boolean>('multiple', false);
  public readonly fileUploadButtonText$ = this.getOption$<string>(
    'fileUploadButtonText',
    'form.button.upload'
  );

  public readonly overlay$ = this.getOption$<{
    backgroundColor: string;
    textColor: string;
    text: string;
  }>('overlay');
  public readonly showOverlay$ = this.getOption$<boolean>('showOverlay', false);

  @ViewChild('fileField')
  private fileFieldComponent: ElementRef;

  public constructor(private dialog: MatDialog) {
    super();
  }

  public get files(): Lab900File[] {
    return (this.fieldControl?.value as Lab900File[]) ?? [];
  }

  public fileChange(event: Event): void {
    const fileList: FileList | null = (event.target as HTMLInputElement).files;
    const fileArray: File[] = [];
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        fileArray.push(fileList[i]);
      }
    }

    this.filesAdded(fileArray);
  }

  public filesAdded(fileArray: File[]): void {
    fileArray.forEach((file) => {
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
    this.fileFieldComponent.nativeElement.value = null;
  }

  public onMetaDataChanged(
    data: T,
    originalData?: Lab900File
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const files = this.files;
      const index = this.getFileIndex(originalData);
      if (index === -1) {
        console.error(`Couldn't find file in list`);
      }
      Object.assign(originalData, data);
      files[index] = originalData;
      this.setFieldControlValue(files);
      resolve(true);
    });
  }

  private getFileIndex(file: Lab900File): number {
    return this.files.findIndex(
      (listFile: Lab900File) =>
        listFile.fileName === file.fileName &&
        listFile.type === file.type &&
        listFile.size === file.size
    );
  }

  public handleImageClick(file: Lab900File): void {
    if (this.options?.canEditFileMetaData && !this.fieldIsReadonly) {
      this.openMetaDataDialog(file);
    } else if (file.imageSrc != null) {
      this.openPreviewDialog(file);
    }
  }

  private openMetaDataDialog(file: Lab900File): void {
    /*this.dialog.open(FormDialogComponent, {
      data: {
        schema: this.options?.fileMetaDataConfig,
        data: file,
        submit: this.onMetaDataChanged.bind(this),
      },
    });*/
  }

  public openPreviewDialog(file: Lab900File): void {
    if (file.imageBase64 != null) {
      this.dialog.open(ImagePreviewModalComponent, {
        data: {
          image: file,
        },
      });
    } else if (this.options?.httpCallback) {
      fetchImageBase64(this.options.httpCallback, file, (result) => {
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

  private setFieldControlValue(files: Lab900File[]): void {
    this.fieldControl.setValue(files);
    this.fieldControl.markAsDirty();
    this.fieldControl.markAsTouched();
  }
}
