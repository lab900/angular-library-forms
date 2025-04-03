import {
  computed,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  LOCALE_ID,
  signal,
} from '@angular/core';
import {
  amountToNumber,
  formatAmountWithoutRounding,
  getAmountFormatter,
  getThousandSeparator,
} from './amount.helpers';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LAB900_FORM_MODULE_SETTINGS } from '../../../models/Lab900FormModuleSettings';

@Directive({
  selector: 'input[lab900AmountInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountInputDirective),
      multi: true,
    },
  ],
})
export class AmountInputDirective implements ControlValueAccessor {
  private readonly appLocale = inject(LOCALE_ID);
  private readonly settings = inject(LAB900_FORM_MODULE_SETTINGS, { optional: true });
  private readonly locale = this.settings?.amountField?.locale ?? this.appLocale;

  public readonly maxDecimals = input<number | undefined>(this.settings?.amountField?.maxDecimals);
  public readonly minDecimals = input<number | undefined>(this.settings?.amountField?.minDecimals);
  public readonly focused = signal(false);

  private readonly thousandSeparator: string = getThousandSeparator(this.locale);

  private readonly formatter = computed<Intl.NumberFormat>(() =>
    getAmountFormatter(this.locale, {
      maxDecimals: this.maxDecimals(),
      minDecimals: this.minDecimals(),
    })
  );

  public constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  public writeValue(value: number): void {
    if (!isNaN(value) && !this.focused()) {
      this.formatValue(value);
    } else {
      this.elementRef.nativeElement.value = value as any;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public onChange = (_: number | null): void => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched = (): void => {};

  public registerOnChange(fn: (_: number | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  @HostListener('input', ['$event.target.value', '$event.target'])
  public onInput(v: string, target: HTMLInputElement): void {
    let validateValue = v;
    if (validateValue?.length) {
      const max = this.maxDecimals();
      const sIndex = v.indexOf('.');
      if (sIndex >= 0 && typeof max !== 'undefined' && max >= 0) {
        validateValue = v.slice(0, sIndex + max + 1);
        target.value = validateValue;
      }
    }
    this.onChange(!validateValue?.length || isNaN(+validateValue) ? null : +validateValue);
  }

  @HostListener('paste', ['$event'])
  public onPaste(event: ClipboardEvent): void {
    if (this.canUpdate() && event.clipboardData) {
      event.preventDefault();
      const pastedInput: string = event.clipboardData.getData('text/plain');
      if (pastedInput?.length) {
        const newValue = amountToNumber(this.getUnformattedValue(pastedInput)) as any;
        this.elementRef.nativeElement.value = newValue;
        this.onChange(newValue);
        this.onTouched();
      }
    }
  }

  @HostListener('focus', ['$event.target.value'])
  public onFocus(value: string): void {
    if (!this.focused() && this.canUpdate()) {
      this.focused.set(true);
      this.elementRef.nativeElement.type = 'number';
      this.elementRef.nativeElement.setAttribute('step', '0.01');
      this.elementRef.nativeElement.value = amountToNumber(this.getUnformattedValue(value)) as any;
    }
  }

  @HostListener('blur', ['$event.target.valueAsNumber'])
  public onBlur(value: number): void {
    if (this.focused() && this.canUpdate()) {
      this.focused.set(false);
      this.elementRef.nativeElement.type = 'string';
      this.formatValue(value);
      this.onTouched();
    }
  }

  private formatValue(value: number): void {
    const v = amountToNumber(String(value)) ?? null;
    this.elementRef.nativeElement.value =
      v != null ? formatAmountWithoutRounding(v, this.formatter(), this.maxDecimals()) : '';
  }

  private getUnformattedValue(value: string): string {
    if (value) {
      return value.replace(new RegExp('\\' + this.thousandSeparator, 'g'), '') ?? '';
    }
    return '';
  }

  private canUpdate(): boolean {
    return !this.elementRef.nativeElement?.readOnly && !this.elementRef.nativeElement?.disabled;
  }
}
