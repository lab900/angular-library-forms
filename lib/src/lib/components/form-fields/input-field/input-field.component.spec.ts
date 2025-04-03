import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TESTING_PROVIDERS } from '../../../testing/testing.providers';
import { provideNgxMask } from 'ngx-mask';
import { EditType } from '../../../models/editType';
import { FormFieldInput } from './input-field.model';
import { InputFieldComponent } from './input-field.component';

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
      providers: [...TESTING_PROVIDERS, provideNgxMask()],
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

      component.setValue('ABCD-123456/7');
      fixture.detectChanges();
      expect(component.valid).toBeTruthy();

      component.setValue('ABC1234567');
      fixture.detectChanges();
      expect(component.valid).toBeFalsy();
    });
  });
});
