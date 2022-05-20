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
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../../models/Lab900FormModuleSettings';

@Directive({
  selector: '[lab900AmountInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountInputDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AmountInputDirective),
      multi: true,
    },
  ],
})
export class AmountInputDirective
  implements OnChanges, ControlValueAccessor, Validator
{
  public focused = false;

  @Input()
  public maxDecimals?: number;

  @Input()
  public minDecimals?: number;

  private readonly locale: string;
  private readonly decimalSeparator: string;
  private readonly thousandSeparator: string;

  private formatter: Intl.NumberFormat;
  private numberValue?: number;

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
    this.numberValue = value;
    if (value) {
      this.formatValue(value);
    }
  }

  public onChange = (_: number): void => {};
  public onTouched = (): void => {};

  public registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  public validate(control: AbstractControl): ValidationErrors {
    let value = control.value;
    console.log('validating', value);

    if (!value?.length) {
      return null;
    }
    let error: ValidationErrors | null = null;
    amountToNumber(value, (e) => {
      error = { [e]: true };
      return null;
    });
    return error;
  }

  @HostListener('input')
  public onInput(): void {
    const valueOnBlur = isNaN(+this.elementRef.nativeElement.value)
      ? amountToNumber(this.getUnformattedValue())
      : +this.elementRef.nativeElement.value;

    this.numberValue = valueOnBlur;
    this.onTouched();
    this.onChange(valueOnBlur);
  }

  @HostListener('focus')
  public onFocus(): void {
    if (!this.focused) {
      this.focused = true;
      this.unFormatValue();
    }
  }

  @HostListener('blur')
  public onBlur(): void {
    if (this.focused) {
      this.onTouched();
      this.focused = false;
      this.formatValue(this.elementRef.nativeElement.value);
    }
  }

  private formatValue(value: number | string): void {
    const v = amountToNumber(String(value)) ?? null;
    this.elementRef.nativeElement.value =
      v != null
        ? formatAmountWithoutRounding(v, this.formatter, this.getMaxDecimals())
        : '';
  }

  private unFormatValue(): void {
    this.elementRef.nativeElement.value = this.getUnformattedValue();
  }

  private getUnformattedValue(): string {
    const value = this.elementRef.nativeElement.value;
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
}
