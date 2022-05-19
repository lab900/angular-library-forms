import {
  AfterViewInit,
  Directive,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnDestroy,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  amountToNumber,
  formatAmountWithoutRounding,
  getAmountFormatter,
  getDecimalSeparator,
  getThousandSeparator,
  validateNumberInput,
} from './amount.helpers';
import { Subscription } from 'rxjs';
import { NgControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../../models/Lab900FormModuleSettings';

@Directive({
  selector: '[lab900AmountInput]',
})
export class AmountInputDirective
  implements OnChanges, AfterViewInit, OnDestroy
{
  private readonly validator = validateNumberInput();
  public focusMode = false;
  private changeSub?: Subscription;

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
    @Self() private ngControl: NgControl
  ) {
    this.locale = setting?.amountField?.locale ?? appLocale;
    this.decimalSeparator = getDecimalSeparator(this.locale);
    this.thousandSeparator = getThousandSeparator(this.locale);
    this.formatter = this.getFormatter();
    console.log(this);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.maxDecimals || changes?.minDecimals) {
      this.formatter = this.getFormatter();
    }
  }

  public ngAfterViewInit(): void {
    this.formatValue();
    this.changeSub = this.ngControl?.control?.valueChanges
      .pipe(filter(() => !this.focusMode))
      .subscribe(this.formatValue.bind(this));
  }

  public ngOnDestroy(): void {
    this.changeSub?.unsubscribe();
  }

  @HostListener('focus')
  public onFocus(): void {
    this.focusMode = true;
    this.ngControl?.control?.addValidators(this.validator);
    this.unFormatValue();
  }

  @HostListener('blur')
  public onBlur(): void {
    this.focusMode = false;
    this.ngControl?.control?.removeValidators(this.validator);
    this.formatValue();
  }

  private formatValue(): void {
    if (this.ngControl.value) {
      const v = amountToNumber(String(this.ngControl.value)) ?? null;
      this.ngControl.control?.setValue(
        v != null
          ? formatAmountWithoutRounding(
              v,
              this.formatter,
              this.getMaxDecimals()
            )
          : '',
        { emitEvent: false }
      );
    }
  }

  private unFormatValue(): void {
    if (this.ngControl.value) {
      const value = String(this.ngControl.value).replace(
        new RegExp('\\' + this.thousandSeparator, 'g'),
        ''
      );
      this.ngControl.control?.setValue(value ?? '', { emitEvent: false });
    }
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
