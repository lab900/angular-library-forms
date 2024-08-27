import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { EditType, FormFieldInput } from '@lab900/forms';
import { Lab900FormBuilderService } from '../../../services/form-builder.service';
import { LAB900_FORM_MODULE_SETTINGS } from '../../../models/Lab900FormModuleSettings';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const iso6346Pattern = new RegExp('[a-zA-Z]{4}-[0-9]{6}\\/[0-9]');
const iso6346Mask = 'SSSS-000000/0';
const basicInputSchema: FormFieldInput<any> = {
  editType: EditType.Input,
  attribute: 'test',
};

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Lab900FormBuilderService, { provide: LAB900_FORM_MODULE_SETTINGS, useValue: {} }, provideNgxMask()],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule.forRoot(),
        NgxMaskDirective,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('fieldAttribute', basicInputSchema.attribute);
    fixture.componentRef.setInput('group', new FormGroup({ [basicInputSchema.attribute]: new FormControl() }));
  });

  describe('fieldMask', () => {
    it('should correctly validate patterns', () => {
      fixture.componentRef.setInput('schema', {
        ...basicInputSchema,
        options: {
          pattern: iso6346Pattern,
          fieldMask: {
            mask: iso6346Mask,
            dropSpecialCharacters: false,
          },
        },
      } satisfies FormFieldInput<any>);

      component.fieldControl.setValue('ABCD-123456/7');
      fixture.detectChanges();
      expect(component.fieldControl.valid).toBeTrue();

      component.fieldControl.setValue('ABC1234567');
      fixture.detectChanges();
      expect(component.fieldControl.valid).toBeFalse();
    });
  });
});
