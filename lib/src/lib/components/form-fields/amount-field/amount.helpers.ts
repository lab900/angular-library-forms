import { AmountOptions } from './amount-field.model';

export function getSeparatorCount(value: string, separator: string): number {
  return value?.match(new RegExp(separator, 'g'))?.length ?? 0;
}

export function amountToNumber(value: string): number | null {
  if (value?.length) {
    const commaCount = getSeparatorCount(value, ',');
    const pointCount = getSeparatorCount(value, '\\.');
    // the input value can only contain one separator sign
    if (commaCount + pointCount > 1) {
      return null;
    }
    // replace comma by point to validate the string as a valid number
    if (!pointCount && commaCount) {
      value = value.replace(',', '.');
    }
    if (Number.isNaN(+value)) {
      return null;
    }
    return +value;
  }
  return null;
}

export function getAmountFormatter(locale: string, options?: AmountOptions): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: options?.maxDecimals,
    minimumFractionDigits: options?.minDecimals,
  });
}

export function formatAmountWithoutRounding(value: number, formatter: Intl.NumberFormat, max = 0): string {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (max || -1) + '})?');
  return formatter.format(+value.toString().match(re)[0]);
}

export function getDecimalSeparator(locale: string): string {
  const numberWithDecimalSeparator = 1.1;
  return numberWithDecimalSeparator.toLocaleString(locale).substring(1, 2);
}

export function getThousandSeparator(locale: string): string {
  const numberWithDecimalSeparator = 1000;
  return numberWithDecimalSeparator.toLocaleString(locale).substring(1, 2);
}
