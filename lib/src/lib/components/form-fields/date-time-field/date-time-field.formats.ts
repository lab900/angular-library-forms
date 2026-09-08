import { inject, Injectable, Provider } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { DateAdapterDisplayFormat } from './date-time-field.model';

/** Date part for a `DateAdapter` that takes `Intl.DateTimeFormat` options and gives no format of its own. */
const NATIVE_DATE_PARTS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

/**
 * Time part for a `DateAdapter` that takes a format string: Luxon, Moment and date-fns. `HH`, `mm` and
 * `ss` are 24 hour, minute and second in all three, so one pattern serves them all. Their own locale
 * aware time tokens are not usable here: they differ per adapter (`t`, `LT`, `p`) and the format alone
 * does not say which adapter reads it.
 */
const PATTERN_TIME = 'HH:mm';
const PATTERN_TIME_WITH_SECONDS = 'HH:mm:ss';

/**
 * `MAT_DATE_FORMATS` for the date-time field only.
 *
 * The picker input renders its value with `display.dateInput`. Every date adapter puts a date-only
 * format there, so the selected time stayed invisible. This class adds the time to that format and
 * keeps all other formats of the application.
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
    return this.displayFormat() ?? this.withTime(this.appFormats.display.dateInput);
  }

  /**
   * Adds the time to the date format of the application, so the input keeps the date style of the
   * application and gains the time that the picker selects.
   *
   * A `DateAdapter` takes one of two shapes: `Intl.DateTimeFormat` options for the native adapter, a
   * format string for the Luxon, Moment and date-fns adapters. The shape of the application's own
   * `dateInput` says which one it is, so the time goes on in the same shape. An earlier version always
   * returned `Intl.DateTimeFormat` options, which the three string adapters cannot read.
   *
   * An application whose `dateInput` already prints a time must set the `displayFormat` option, or the
   * string adapters print the time twice.
   */
  private withTime(dateFormat: DateAdapterDisplayFormat | undefined): DateAdapterDisplayFormat {
    if (typeof dateFormat === 'string') {
      return `${dateFormat} ${this.showSeconds() ? PATTERN_TIME_WITH_SECONDS : PATTERN_TIME}`;
    }
    return {
      ...(dateFormat ?? NATIVE_DATE_PARTS),
      hour: '2-digit',
      minute: '2-digit',
      /** `Intl.DateTimeFormat` reads an explicit `undefined` as absent, so this drops the seconds. */
      second: this.showSeconds() ? '2-digit' : undefined,
    };
  }
}

export const DATE_TIME_FIELD_DATE_FORMATS: Provider[] = [
  DateTimeFieldDateFormats,
  { provide: MAT_DATE_FORMATS, useExisting: DateTimeFieldDateFormats },
];
