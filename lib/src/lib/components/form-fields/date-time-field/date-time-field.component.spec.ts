import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { Provider } from '@angular/core';
import { TESTING_PROVIDERS } from '../../../testing/testing.providers';
import { EditType } from '../../../models/editType';
import { FormFieldDateTimePicker, FormFieldDateTimePickerOptions } from './date-time-field.model';
import { DateTimeFieldComponent } from './date-time-field.component';

const schema: FormFieldDateTimePicker<any> = {
  editType: EditType.DateTime,
  attribute: 'test',
};

const value = new Date(2026, 8, 8, 14, 5, 30);

/**
 * The Luxon, Moment and date-fns adapters take a format string, not `Intl.DateTimeFormat` options.
 * None of them is installed here, so this stands in for the format set of one: `'D'` is what the real
 * Luxon adapter puts in `display.dateInput`. Only the shape of the format matters for these specs.
 */
const PATTERN_DATE_FORMATS: MatDateFormats = {
  parse: { dateInput: 'D' },
  display: { dateInput: 'D', monthYearLabel: 'LLL yyyy', dateA11yLabel: 'DD', monthYearA11yLabel: 'LLLL yyyy' },
};

describe('DateTimeFieldComponent', () => {
  let fixture: ComponentFixture<DateTimeFieldComponent>;

  const input = (): HTMLInputElement => (fixture.nativeElement as HTMLElement).querySelector('input')!;

  /** The field provides its own `MAT_DATE_FORMATS`, so read it from the field, not from the root. */
  const fieldFormats = (): MatDateFormats => fixture.componentRef.injector.get(MAT_DATE_FORMATS);

  const render = (options?: FormFieldDateTimePickerOptions<Date>, extraProviders: Provider[] = []): void => {
    TestBed.configureTestingModule({
      providers: [...TESTING_PROVIDERS, provideNativeDateAdapter(), ...extraProviders],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimeFieldComponent);
    fixture.componentRef.setInput('fieldAttribute', schema.attribute);
    fixture.componentRef.setInput('group', new UntypedFormGroup({ test: new UntypedFormControl(value) }));
    fixture.componentRef.setInput('schema', { ...schema, options });
    fixture.detectChanges();
  };

  afterEach(() => TestBed.resetTestingModule());

  describe('without a displayFormat option', () => {
    it('shows date and time on an adapter that takes Intl options', () => {
      render(undefined);
      expect(input().value).toBe('9/8/2026, 02:05:30 PM');
    });

    it('drops the seconds when showSeconds is false', () => {
      render({ showSeconds: false });
      expect(input().value).toBe('9/8/2026, 02:05 PM');
    });

    it('keeps the date style of the application and adds the time to it', () => {
      render(undefined, [
        {
          provide: MAT_DATE_FORMATS,
          useValue: {
            parse: { dateInput: null },
            display: {
              dateInput: { year: 'numeric', month: '2-digit', day: '2-digit' },
              monthYearLabel: { year: 'numeric', month: 'short' },
              dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
              monthYearA11yLabel: { year: 'numeric', month: 'long' },
            },
          } satisfies MatDateFormats,
        },
      ]);
      expect(input().value).toBe('09/08/2026, 02:05:30 PM');
    });

    it('adds a time pattern on an adapter that takes a format string', () => {
      render(undefined, [{ provide: MAT_DATE_FORMATS, useValue: PATTERN_DATE_FORMATS }]);
      /**
       * The native adapter is what actually formats here, and it cannot read a string, so assert on
       * the format the field derived rather than on the printed value.
       */
      expect(fieldFormats().display.dateInput).toBe('D HH:mm:ss');
    });

    it('adds a time pattern without seconds when showSeconds is false', () => {
      render({ showSeconds: false }, [{ provide: MAT_DATE_FORMATS, useValue: PATTERN_DATE_FORMATS }]);
      expect(fieldFormats().display.dateInput).toBe('D HH:mm');
    });

    it('leaves every other format of the application alone', () => {
      render(undefined, [{ provide: MAT_DATE_FORMATS, useValue: PATTERN_DATE_FORMATS }]);
      const { display, parse } = fieldFormats();
      expect(display.monthYearLabel).toBe('LLL yyyy');
      expect(display.dateA11yLabel).toBe('DD');
      expect(display.monthYearA11yLabel).toBe('LLLL yyyy');
      expect(parse.dateInput).toBe('D');
    });
  });

  describe('with a displayFormat option', () => {
    it('uses the given Intl options', () => {
      render({
        displayFormat: { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' },
      });
      expect(input().value).toBe('09/08/2026, 02:05 PM');
    });

    it('wins over the derived format on an adapter that takes a format string', () => {
      render({ displayFormat: 'dd/MM/yyyy HH:mm' }, [{ provide: MAT_DATE_FORMATS, useValue: PATTERN_DATE_FORMATS }]);
      expect(fieldFormats().display.dateInput).toBe('dd/MM/yyyy HH:mm');
    });
  });
});
