import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { Lab900Form } from './form-container.component';
import { Lab900FormBuilderService } from '../../services/form-builder.service';
import { LAB900_FORM_MODULE_SETTINGS } from '../../models/Lab900FormModuleSettings';
import { EditType } from '../../models/editType';

describe('Lab900Form', () => {
  let component: Lab900Form<any>;
  let fixture: ComponentFixture<Lab900Form<any>>;
  const simpleInputSchema = { fields: [{ attribute: 'name', editType: EditType.Input }] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [Lab900FormBuilderService, { provide: LAB900_FORM_MODULE_SETTINGS, useValue: {} }],
    });

    fixture = TestBed.createComponent(Lab900Form);
    component = fixture.componentInstance;
  });

  it('should create the form with the given schema', () => {
    fixture.componentRef.setInput('schema', simpleInputSchema);
    expect(component.form.contains('name')).toBe(true);
  });

  it('should patch values correctly', () => {
    fixture.componentRef.setInput('schema', simpleInputSchema);
    component.patchValues({ name: 'John Doe' });
    expect(component.form.get('name')?.value).toBe('John Doe');
  });

  it('should set values correctly', () => {
    fixture.componentRef.setInput('schema', simpleInputSchema);
    component.setValues({ name: 'Jane Doe' });
    expect(component.form.get('name')?.value).toBe('Jane Doe');
  });

  it('should handle form arrays correctly', () => {
    const schema = {
      fields: [
        {
          attribute: 'items',
          editType: EditType.Repeater,
          nestedFields: [{ attribute: 'itemName', editType: EditType.Input }],
        },
      ],
    };
    fixture.componentRef.setInput('schema', schema);
    component.patchValues({ items: [{ itemName: 'Item 1' }, { itemName: 'Item 2' }] });
    const itemsArray = component.form.get('items') as UntypedFormArray;
    expect(itemsArray.length).toBe(2);
    expect(itemsArray.at(0).get('itemName')?.value).toBe('Item 1');
    expect(itemsArray.at(1).get('itemName')?.value).toBe('Item 2');
  });

  it('should handle empty data correctly', () => {
    fixture.componentRef.setInput('schema', simpleInputSchema);
    component.patchValues({ name: null });
    expect(component.form.get('name')?.value).toBeNull();
  });

  it('should not emit valueChanges events when emitEvent is false', () => {
    fixture.componentRef.setInput('schema', simpleInputSchema);
    const spy = jasmine.createSpy('valueChangesSpy');
    component.form.valueChanges.subscribe(spy);
    component.patchValues({ name: 'John Doe' }, false);
    expect(spy).not.toHaveBeenCalled();
    component.setValues({ name: 'Jane Doe' }, false);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit valueChanges events when emitEvent is true', () => {
    fixture.componentRef.setInput('schema', simpleInputSchema);
    const spy = jasmine.createSpy('valueChangesSpy');
    component.form.valueChanges.subscribe(spy);
    component.patchValues({ name: 'John Doe' });
    expect(spy).toHaveBeenCalledWith({ name: 'John Doe' });
    component.setValues({ name: 'Jane Doe' });
    expect(spy).toHaveBeenCalledWith({ name: 'Jane Doe' });
  });
});
