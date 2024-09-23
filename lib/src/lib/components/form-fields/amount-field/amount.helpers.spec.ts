import {
  amountToNumber,
  formatAmountWithoutRounding,
  getAmountFormatter,
  getDecimalSeparator,
  getSeparatorCount,
  getThousandSeparator,
} from './amount.helpers';

describe('Amount Helpers', () => {
  it('getSeparatorCount returns correct count for commas', () => {
    expect(getSeparatorCount('1,234,567', ',')).toBe(2);
  });

  it('getSeparatorCount returns correct count for periods', () => {
    expect(getSeparatorCount('1.234.567', '\\.')).toBe(2);
  });

  it('amountToNumber converts valid string with comma to number', () => {
    expect(amountToNumber('1,234')).toBe(1.234);
  });

  it('amountToNumber converts valid string with period to number', () => {
    expect(amountToNumber('1.234')).toBe(1.234);
  });

  it('amountToNumber returns null for string with multiple separators', () => {
    expect(amountToNumber('1,234.567')).toBeNull();
  });

  it('amountToNumber returns null for invalid number string', () => {
    expect(amountToNumber('abc')).toBeNull();
  });

  it('amountToNumber returns null for empty string', () => {
    expect(amountToNumber('')).toBeNull();
  });

  it('getAmountFormatter formats number correctly with default options', () => {
    const formatter = getAmountFormatter('en-US');
    expect(formatter.format(1234.56)).toBe('1,234.56');
  });

  it('formatAmountWithoutRounding formats number without rounding', () => {
    const formatter = getAmountFormatter('en-US', { maxDecimals: 2 });
    expect(formatAmountWithoutRounding(1234.567, formatter, 2)).toBe('1,234.56');
  });

  it('getDecimalSeparator returns correct separator for locale', () => {
    expect(getDecimalSeparator('en-US')).toBe('.');
  });

  it('getThousandSeparator returns correct separator for locale', () => {
    expect(getThousandSeparator('en-US')).toBe(',');
  });
});
