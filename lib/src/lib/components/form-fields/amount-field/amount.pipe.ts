import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { AmountOptions } from './amount-field.model';
import { LAB900_FORM_MODULE_SETTINGS, Lab900FormModuleSettings } from '../../../models/Lab900FormModuleSettings';
import { formatAmountWithoutRounding, getAmountFormatter } from './amount.helpers';

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  private readonly settings: Lab900FormModuleSettings = inject(LAB900_FORM_MODULE_SETTINGS);
  private readonly appLocale: string = inject(LOCALE_ID);
  private readonly locale: string = this.settings?.amountField?.locale ?? this.appLocale;

  public transform(value: number, options?: AmountOptions): string {
    const maxDecimals = options?.maxDecimals ?? this.settings?.amountField?.maxDecimals;
    const formatter = getAmountFormatter(this.locale, {
      maxDecimals,
      minDecimals: options?.minDecimals ?? this.settings?.amountField?.minDecimals,
    });
    return formatAmountWithoutRounding(value, formatter, maxDecimals);
  }
}
