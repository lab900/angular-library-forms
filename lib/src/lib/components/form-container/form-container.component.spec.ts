import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormArray } from '@angular/forms';
import { Lab900Form } from './form-container.component';
import { EditType } from '../../models/editType';
import { TESTING_PROVIDERS } from '../../testing/testing.providers';

describe('Lab900Form', () => {
  let component: Lab900Form<any>;
  let fixture: ComponentFixture<Lab900Form<any>>;
  const simpleInputSchema = { fields: [{ attribute: 'name', editType: EditType.Input }] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: TESTING_PROVIDERS,
    }).compileComponents();

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
    const mockSub = jest.fn();
    const sub = component.form.valueChanges.subscribe(mockSub);
    component.patchValues({ name: 'John Doe' }, false);
    expect(mockSub).not.toHaveBeenCalled();
    component.setValues({ name: 'Jane Doe' }, false);
    expect(mockSub).not.toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('should emit valueChanges events when emitEvent is true', () => {
    fixture.componentRef.setInput('schema', simpleInputSchema);
    const mockSub = jest.fn();
    const sub = component.form.valueChanges.subscribe(mockSub);
    component.patchValues({ name: 'John Doe' });
    expect(mockSub).toHaveBeenCalledWith({ name: 'John Doe' });
    component.setValues({ name: 'Jane Doe' });
    expect(mockSub).toHaveBeenCalledWith({ name: 'Jane Doe' });
    sub.unsubscribe();
  });
});
