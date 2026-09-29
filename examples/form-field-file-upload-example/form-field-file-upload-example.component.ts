import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { EditType, Lab900File, Lab900Form, Lab900FormConfig } from '@lab900/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-form-field-file-upload-example',
  template:
    '<lab900-form [schema]="formSchema" [data]="formData"/><button mat-raised-button color="primary" (click)="validate()">Submit</button>',
  imports: [Lab900Form, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldFileUploadExampleComponent {
  public readonly form = viewChild<Lab900Form<any>>(Lab900Form);
  private readonly http = inject(HttpClient);

  public formSchema: Lab900FormConfig = {
    fields: [
      {
        attribute: 'files',
        title: 'My files',
        editType: EditType.FilePreview,
        options: {
          multiple: true,
          accept: 'image/*',
          canEditFileMetaData: false,
          fileMetaDataConfig: {
            fields: [
              {
                attribute: 'fileName',
                title: 'File name',
                editType: EditType.Input,
              },
            ],
          },
          httpCallback: (image: Lab900File) => this.http.get(image.imageSrc!, { responseType: 'arraybuffer' }),
          showOverlay: (data: any) => {
            return data.delicate;
          },
          overlay: {
            backgroundColor: '#c93b2e',
            textColor: 'white',
            text: 'delicate',
          },
        },
      },
    ],
  };
  public formData = {
    files: [
      {
        fileName: 'file.jpg',
        delicate: false,
        imageSrc:
          'https://media-exp1.licdn.com/dms/image/C560BAQHHSRGRgKfSFQ/company-logo_200_200/0/1542017911828?e=2159024400&v=beta&t=mNV_FUsqSBIXoI-HFA88TpUP9kX8JO3AqoK_aT2SQ_E',
      },
    ],
  };

  public validate(): void {
    console.log(this.form()?.form.controls.files.value);
  }
}
