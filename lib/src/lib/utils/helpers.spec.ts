import { toReadonlyDisplayString } from './helpers';

describe('toReadonlyDisplayString', () => {
  it.each([null, undefined, ''])('returns undefined for the empty value %p', value => {
    expect(toReadonlyDisplayString(value)).toBeUndefined();
  });

  it('returns a string as is, so it can still resolve as a translation key', () => {
    expect(toReadonlyDisplayString('forms.error.required')).toBe('forms.error.required');
  });

  it.each([
    [0, '0'],
    [42, '42'],
    [false, 'false'],
    [true, 'true'],
  ])('stringifies the primitive %p', (value, expected) => {
    expect(toReadonlyDisplayString(value)).toBe(expected);
  });

  it('joins array values instead of handing the array to the translate pipe', () => {
    expect(toReadonlyDisplayString(['a', 'b'])).toBe('a, b');
  });

  it('drops the empty items of an array', () => {
    expect(toReadonlyDisplayString(['a', null, '', 'b'])).toBe('a, b');
    expect(toReadonlyDisplayString([null, undefined])).toBeUndefined();
    expect(toReadonlyDisplayString([])).toBeUndefined();
  });

  it('stringifies the items of an array of objects', () => {
    expect(toReadonlyDisplayString([{ a: 1 }, { b: 2 }])).toBe('[object Object], [object Object]');
  });

  it('uses the toString of the value when it has one', () => {
    const date = new Date('2026-09-07T00:00:00.000Z');
    expect(toReadonlyDisplayString(date)).toBe(String(date));
  });
});
