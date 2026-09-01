import { inject, Injectable, Provider } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { DateAdapterDisplayFormat } from './date-time-field.model';

/** Date-time display format for a `DateAdapter` that takes `Intl.DateTimeFormat` options. */
const NATIVE_DATE_TIME_INPUT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const NATIVE_DATE_TIME_SECONDS_INPUT: Intl.DateTimeFormatOptions = {
  ...NATIVE_DATE_TIME_INPUT,
  second: '2-digit',
};

/**
 * `MAT_DATE_FORMATS` for the date-time field only.
 *
 * The picker input renders its value with `display.dateInput`. Every date adapter puts a date-only
 * format there, so the selected time stayed invisible. This class replaces `dateInput` with a
 * date-time format and keeps all other formats of the application.
 *
 * `display` is a getter because the picker reads it on each format call. That keeps the format in
 * step with `showSeconds` and with the `displayFormat` option. A static value cannot do this,
 * because the field options arrive after the injector is built.
 */
@Injectable()
export class DateTimeFieldDateFormats implements MatDateFormats {
  private readonly appFormats: MatDateFormats =
    inject(MAT_DATE_FORMATS, { optional: true, skipSelf: true }) ?? MAT_NATIVE_DATE_FORMATS;

  private showSeconds: () => boolean = () => true;
  private displayFormat: () => DateAdapterDisplayFormat | undefined = () => undefined;

  public get parse(): MatDateFormats['parse'] {
    return this.appFormats.parse;
  }

  public get display(): MatDateFormats['display'] {
    return { ...this.appFormats.display, dateInput: this.dateInputFormat() };
  }

  /**
   * Takes the format from the field instead of from a fixed value. Give functions, not values: the
   * picker formats after each change and must see the current options.
   */
  public followField(showSeconds: () => boolean, displayFormat: () => DateAdapterDisplayFormat | undefined): void {
    this.showSeconds = showSeconds;
    this.displayFormat = displayFormat;
  }

  private dateInputFormat(): DateAdapterDisplayFormat {
    return this.displayFormat() ?? (this.showSeconds() ? NATIVE_DATE_TIME_SECONDS_INPUT : NATIVE_DATE_TIME_INPUT);
  }
}

export const DATE_TIME_FIELD_DATE_FORMATS: Provider[] = [
  DateTimeFieldDateFormats,
  { provide: MAT_DATE_FORMATS, useExisting: DateTimeFieldDateFormats },
];
