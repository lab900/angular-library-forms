import { toReadonlyDisplayString, toReadonlyDisplayStrings } from './helpers';

describe('toReadonlyDisplayStrings', () => {
  it.each([null, undefined, ''])('returns nothing to show for the empty value %p', value => {
    expect(toReadonlyDisplayStrings(value)).toEqual([]);
  });

  it('keeps a string as is, so it can still resolve as a translation key', () => {
    expect(toReadonlyDisplayStrings('forms.error.required')).toEqual(['forms.error.required']);
  });

  it.each([
    [0, '0'],
    [42, '42'],
    [false, 'false'],
    [true, 'true'],
  ])('stringifies the primitive %p', (value, expected) => {
    expect(toReadonlyDisplayStrings(value)).toEqual([expected]);
  });

  it('yields one key per array item, so each can be translated on its own', () => {
    expect(toReadonlyDisplayStrings(['PENDING', 'DONE'])).toEqual(['PENDING', 'DONE']);
  });

  it('drops the empty items of an array', () => {
    expect(toReadonlyDisplayStrings(['a', null, '', 'b'])).toEqual(['a', 'b']);
    expect(toReadonlyDisplayStrings([null, undefined])).toEqual([]);
    expect(toReadonlyDisplayStrings([])).toEqual([]);
  });

  it('flattens a nested array', () => {
    expect(toReadonlyDisplayStrings(['a', ['b', 'c']])).toEqual(['a', 'b', 'c']);
  });

  it('uses the toString of a value that has one', () => {
    const date = new Date('2026-09-07T00:00:00.000Z');
    expect(toReadonlyDisplayStrings(date)).toEqual([String(date)]);
  });

  it('drops a value that has no rendering of its own instead of printing [object ...]', () => {
    expect(toReadonlyDisplayStrings({ a: 1 })).toEqual([]);
    expect(toReadonlyDisplayStrings({ start: new Date(), end: new Date() })).toEqual([]);
    // What a DragNDrop field holds: an array of files.
    expect(toReadonlyDisplayStrings([new File([''], 'a.txt'), new File([''], 'b.txt')])).toEqual([]);
  });

  it('keeps the items it can render when an array mixes shapes', () => {
    expect(toReadonlyDisplayStrings(['a', { b: 1 }, 'c'])).toEqual(['a', 'c']);
  });
});

describe('toReadonlyDisplayString', () => {
  it('joins the display strings', () => {
    expect(toReadonlyDisplayString(['a', 'b'])).toBe('a, b');
    expect(toReadonlyDisplayString('a')).toBe('a');
  });

  it('returns undefined when there is nothing to show, so the caller can render its placeholder', () => {
    expect(toReadonlyDisplayString(null)).toBeUndefined();
    expect(toReadonlyDisplayString([])).toBeUndefined();
    expect(toReadonlyDisplayString({ a: 1 })).toBeUndefined();
  });
});
