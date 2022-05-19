import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { AmountOptions } from './amount-field.model';
import {
  LAB900_FORM_MODULE_SETTINGS,
  Lab900FormModuleSettings,
} from '../../../models/Lab900FormModuleSettings';
import { getAmountFormatter } from './amount.helpers';

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  private readonly locale: string;

  public constructor(
    @Inject(LAB900_FORM_MODULE_SETTINGS)
    private setting: Lab900FormModuleSettings,
    @Inject(LOCALE_ID) appLocale: string
  ) {
    this.locale = setting?.amountField?.locale ?? appLocale;
  }

  public transform(value: number, options?: AmountOptions): string {
    const formatter = getAmountFormatter(this.locale, {
      maxDecimals:
        options?.maxDecimals ?? this.setting?.amountField?.maxDecimals,
      minDecimals:
        options?.minDecimals ?? this.setting?.amountField?.minDecimals,
    });
    return formatter.format(value);
  }
}
