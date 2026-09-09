import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Lab900Form } from '../../form-container/form-container.component';
import { EditType } from '../../../models/editType';
import { Lab900FormConfig } from '../../../models/Lab900FormConfig';
import { RENDER_TESTING_PROVIDERS } from '../../../testing/testing.providers';

describe('ReadonlyFieldComponent', () => {
  let fixture: ComponentFixture<Lab900Form<any>>;
  let component: Lab900Form<any>;

  const schema = (options: Record<string, unknown> = {}): Lab900FormConfig => ({
    readonly: true,
    fields: [
      { attribute: 'other', editType: EditType.Input },
      { attribute: 'value', editType: EditType.Input, title: 'Value', options },
    ],
  });

  const render = (config: Lab900FormConfig, data: unknown): void => {
    fixture.componentRef.setInput('schema', config);
    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
  };

  /** The readonly field of the `value` attribute, not of `other`. */
  const rendered = (): string =>
    (fixture.nativeElement.querySelector('#lab900-readonly-field-value') as HTMLElement)?.textContent?.trim() ?? '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: RENDER_TESTING_PROVIDERS,
    }).compileComponents();
    fixture = TestBed.createComponent(Lab900Form);
    component = fixture.componentInstance;
  });

  it('renders a plain string and resolves it as a translation key', () => {
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { VEHICLE: 'Vehicle' });
    translate.use('en');

    render(schema(), { value: 'VEHICLE' });

    expect(rendered()).toContain('Vehicle');
  });

  it('renders an untranslated string as is', () => {
    render(schema(), { value: 'ABC-123' });

    expect(rendered()).toContain('ABC-123');
  });

  it('renders the placeholder when there is no value', () => {
    render(schema(), { value: null });

    expect(rendered()).toContain('-');
  });

  describe('array values', () => {
    it('does not hand the array to the translate pipe', () => {
      expect(() => render(schema(), { value: [{ a: 1 }, { b: 2 }] })).not.toThrow();
    });

    it('translates every item on its own and joins them', () => {
      const translate = TestBed.inject(TranslateService);
      translate.setTranslation('en', { PENDING: 'Pending', DONE: 'Done' });
      translate.use('en');

      render(schema(), { value: ['PENDING', 'DONE'] });

      expect(rendered()).toContain('Pending, Done');
    });

    it('follows a language change', () => {
      const translate = TestBed.inject(TranslateService);
      translate.setTranslation('en', { PENDING: 'Pending' });
      translate.setTranslation('nl', { PENDING: 'In afwachting' });
      translate.use('en');
      render(schema(), { value: ['PENDING'] });
      expect(rendered()).toContain('Pending');

      translate.use('nl');
      fixture.detectChanges();

      expect(rendered()).toContain('In afwachting');
    });
  });

  describe('values with no rendering of their own', () => {
    it('renders the placeholder instead of [object Object]', () => {
      render(schema(), { value: { start: '2026-01-01', end: '2026-02-01' } });

      expect(rendered()).not.toContain('[object');
      expect(rendered()).toContain('-');
    });

    it('renders the placeholder instead of [object File] for a file array', () => {
      render(schema(), { value: [new File([''], 'a.txt'), new File([''], 'b.txt')] });

      expect(rendered()).not.toContain('[object');
    });
  });

  describe('readonlyDisplay', () => {
    it('wins over the control value and receives the group value', () => {
      render(schema({ readonlyDisplay: (data: any) => `${data.other} / ${data.value}` }), {
        other: 'LEFT',
        value: 'RIGHT',
      });

      expect(rendered()).toContain('LEFT / RIGHT');
    });

    it('recomputes when another control in the group changes', () => {
      render(schema({ readonlyDisplay: (data: any) => `${data.other} / ${data.value}` }), {
        other: 'LEFT',
        value: 'RIGHT',
      });
      expect(rendered()).toContain('LEFT / RIGHT');

      component.form.get('other')?.setValue('CHANGED');
      fixture.detectChanges();

      expect(rendered()).toContain('CHANGED / RIGHT');
    });
  });
});
