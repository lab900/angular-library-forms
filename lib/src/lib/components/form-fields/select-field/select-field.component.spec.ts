import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFieldComponent } from './select-field.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FormFieldSelect } from './field-select.model';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TESTING_PROVIDERS } from '../../../testing/testing.providers';
import { EditType } from '../../../models/editType';

const basicSelectSchema: FormFieldSelect<any> = {
  attribute: 'test',
  editType: EditType.Select,
  options: { selectOptions: [] },
};

describe('SelectFieldComponent', () => {
  let component: SelectFieldComponent<any>;
  let fixture: ComponentFixture<SelectFieldComponent<any>>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: TESTING_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(SelectFieldComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('fieldAttribute', basicSelectSchema.attribute);
    fixture.componentRef.setInput('group', new FormGroup({ [basicSelectSchema.attribute]: new FormControl() }));
  });

  it('should init selectOptionsListener on focus if fetchOptionsOnFocus is true', () => {
    fixture.componentRef.setInput('schema', {
      ...basicSelectSchema,
      options: { fetchOptionsOnFocus: true, selectOptions: [] },
    });
    const spy = jest.spyOn(component as any, 'selectOptionsListener');
    component.onFocus();
    expect(spy).toHaveBeenCalled();
  });

  it('should add value to options if not present', () => {
    fixture.componentRef.setInput('schema', {
      ...basicSelectSchema,
      options: {
        search: { enabled: true },
        selectOptions: [
          { value: 1, label: 'One' },
          { value: 2, label: 'Two' },
        ],
      },
    });
    component.fieldControl.setValue(3);
    fixture.detectChanges();
    expect(component.selectOptions()).toContainEqual({ value: 3, label: undefined });
  });

  it('should remove duplicate options', () => {
    fixture.componentRef.setInput('schema', {
      ...basicSelectSchema,
      options: {
        selectOptions: [
          { value: 1, label: 'One' },
          { value: 1, label: 'One' },
          { value: 2, label: 'Two' },
        ],
      },
    });
    fixture.detectChanges();
    expect(component.selectOptions().length).toBe(2);
  });

  describe('Select with search', () => {
    let matSelect: MatSelectHarness;
    let search: DebugElement;

    beforeEach(async () => {
      fixture.componentRef.setInput('schema', {
        ...basicSelectSchema,
        options: {
          search: { enabled: true },
          selectOptions: [
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
          ],
        },
      } satisfies FormFieldSelect<any>);
      fixture.detectChanges();
      matSelect = await loader.getHarness(MatSelectHarness);
      await matSelect.open();
      search = fixture.debugElement.query(By.css('ngx-mat-select-search'));
    });

    it('should have a search input', () => {
      expect(search).toBeTruthy();
    });

    it('should handle search query correctly', () => {
      component.onSearch('test');
      expect(component.optionsFilter()?.searchQuery).toBe('test');
    });
  });

  describe('Select with clear button', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('schema', {
        ...basicSelectSchema,
        options: {
          selectOptions: [],
          clearFieldButton: { enabled: true },
        },
      } satisfies FormFieldSelect<any>);
      fixture.detectChanges();
    });

    it('should not be created if the select has no value', () => {
      const clearButton = fixture.debugElement.query(By.css('.select-clear-button'));
      expect(clearButton).toBeNull();
    });

    it('should not be created if the select has any empty array as value', () => {
      component.fieldControl.setValue([]);
      fixture.detectChanges();

      const clearButton = fixture.debugElement.query(By.css('.select-clear-button'));
      expect(clearButton).toBeNull();
    });

    it('should be created if the select has a value', () => {
      component.fieldControl.setValue('test');
      fixture.detectChanges();
      const clearButton = fixture.debugElement.query(By.css('.select-clear-button'));
      expect(clearButton).toBeTruthy();
    });

    it('should clear on the fieldControl on click', () => {
      component.fieldControl.setValue('test');
      fixture.detectChanges();
      const clearButton = fixture.debugElement.query(By.css('.select-clear-button'));
      clearButton.triggerEventHandler('click', new Event('click'));
      expect(component.fieldControl.value).toBeNull();
    });
  });

  describe('Multi selects', () => {
    let matSelect: MatSelectHarness;
    let selectAll: DebugElement;

    beforeEach(async () => {
      fixture.componentRef.setInput('schema', {
        ...basicSelectSchema,
        options: {
          search: { enabled: true },
          selectOptions: [
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
          ],
          infiniteScroll: { enabled: false },
          multiple: true,
          selectAll: { enabled: true },
        },
      } satisfies FormFieldSelect<any>);
      fixture.detectChanges();
      matSelect = await loader.getHarness(MatSelectHarness);
      fixture.detectChanges();
      await matSelect.open();
      fixture.detectChanges();
      selectAll = fixture.debugElement.query(By.css('.mat-mdc-option.select-all'));
    });

    it('should create a MatSelect with multiple true', () => {
      matSelect.isMultiple().then((isMultiple) => expect(isMultiple).toBe(true));
    });

    it('should create a select all option', () => {
      expect(selectAll).toBeTruthy();
    });

    it('should set selectAllState correctly', () => {
      expect(component.selectAllState()).toEqual('unchecked');
      component.fieldControl.setValue([1, 2]);
      fixture.detectChanges();
      expect(component.selectAllState()).toEqual('checked');
    });

    it('should handle toggle all selection correctly', () => {
      const spy = jest.spyOn(component, 'handleToggleAllSelection');
      selectAll.nativeElement.click();
      expect(spy).toHaveBeenCalled();
      expect(component.selectAllState()).toEqual('checked');
    });
  });
});
