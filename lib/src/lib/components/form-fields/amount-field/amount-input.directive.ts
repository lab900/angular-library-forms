import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  amountToNumber,
  formatAmountWithoutRounding,
  getAmountFormatter,
  getDecimalSeparator,
  getThousandSeparator,
} from './amount.helpers';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../../models/Lab900FormModuleSettings';

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
export class AmountInputDirective implements OnChanges, ControlValueAccessor {
  public focused = false;

  @Input()
  public maxDecimals?: number;

  @Input()
  public minDecimals?: number;

  private readonly locale: string;
  private readonly decimalSeparator: string;
  private readonly thousandSeparator: string;

  private formatter: Intl.NumberFormat;

  public constructor(
    @Inject(LOCALE_ID) appLocale: string,
    @Inject(LAB900_FORM_MODULE_SETTINGS)
    public setting: Lab900FormModuleSettings,
    private elementRef: ElementRef<HTMLInputElement>
  ) {
    this.locale = setting?.amountField?.locale ?? appLocale;
    this.decimalSeparator = getDecimalSeparator(this.locale);
    this.thousandSeparator = getThousandSeparator(this.locale);
    this.formatter = this.getFormatter();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.maxDecimals || changes?.minDecimals) {
      this.formatter = this.getFormatter();
    }
  }

  public writeValue(value: number): void {
    if (value) {
      this.formatValue(value);
    }
  }

  public onChange = (_: number): void => {};
  public onTouched = (): void => {};

  public registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  @HostListener('input', ['$event.target.value'])
  public onInput(value: string): void {
    // limit the decimal input
    const v =
      value.indexOf('.') >= 0
        ? value.substr(0, value.indexOf('.')) +
          value.substr(value.indexOf('.'), this.getMaxDecimals() + 1)
        : value;
    this.updateFormValue(+v);
  }

  @HostListener('paste', ['$event'])
  public onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedInput: string = event.clipboardData.getData('text/plain');
    if (pastedInput?.length) {
      const newValue = amountToNumber(
        this.getUnformattedValue(pastedInput)
      ) as any;
      this.updateFormValue(newValue);
      this.onTouched();
    }
  }

  @HostListener('focus', ['$event.target.value'])
  public onFocus(value: string): void {
    if (!this.focused) {
      this.focused = true;
      this.elementRef.nativeElement.type = 'number';
      this.elementRef.nativeElement.setAttribute('step', '0.01');
      this.elementRef.nativeElement.value = amountToNumber(
        this.getUnformattedValue(value)
      ) as any;
    }
  }

  @HostListener('blur', ['$event.target.valueAsNumber'])
  public onBlur(value: number): void {
    if (this.focused) {
      this.focused = false;
      this.elementRef.nativeElement.type = 'string';
      this.formatValue(value);
      this.onTouched();
    }
  }

  private formatValue(value: number): void {
    const v = amountToNumber(String(value)) ?? null;
    this.elementRef.nativeElement.value =
      v != null
        ? formatAmountWithoutRounding(v, this.formatter, this.getMaxDecimals())
        : '';
  }

  private getUnformattedValue(value: string): string {
    if (value) {
      return (
        value.replace(new RegExp('\\' + this.thousandSeparator, 'g'), '') ?? ''
      );
    }
    return '';
  }

  private getFormatter(): Intl.NumberFormat {
    return getAmountFormatter(this.locale, {
      maxDecimals: this.getMaxDecimals(),
      minDecimals: this.getMinDecimals(),
    });
  }

  private getMaxDecimals(): number {
    return this.maxDecimals ?? this.setting?.amountField?.maxDecimals;
  }

  private getMinDecimals(): number {
    return this.minDecimals ?? this.setting?.amountField?.minDecimals;
  }

  private updateFormValue(v: number): void {
    this.elementRef.nativeElement.value = (isNaN(v) ? null : v) as any;
    this.onChange(isNaN(v) ? null : v);
  }
}