import { uniqueId } from './unique-id.utils';

/**
 * The counter is module state and jest gives every test file a fresh module registry. This call
 * runs before the tests, so it is the first call on that counter, whatever the test order is.
 */
const firstId = uniqueId();

describe('uniqueId', () => {
  it('starts the counter at 1', () => {
    expect(firstId).toBe('1');
  });

  it('returns a string', () => {
    expect(typeof uniqueId()).toBe('string');
  });

  it('returns only the counter when there is no prefix', () => {
    expect(uniqueId()).toMatch(/^\d+$/);
  });

  it('returns only the counter for an empty prefix', () => {
    expect(uniqueId('')).toMatch(/^\d+$/);
  });

  it('puts the prefix in front of the counter, without a separator', () => {
    expect(uniqueId('form-elm')).toMatch(/^form-elm\d+$/);
  });

  it('increments the counter on every call', () => {
    const first = Number(uniqueId());
    const second = Number(uniqueId());
    expect(second).toBe(first + 1);
  });

  it('uses one counter for the prefixed and the plain form', () => {
    const plain = Number(uniqueId());
    expect(uniqueId('form-elm')).toBe(`form-elm${plain + 1}`);
  });

  it('returns a different value for two calls with the same prefix', () => {
    expect(uniqueId('form-elm')).not.toBe(uniqueId('form-elm'));
  });

  it('gives 1000 different values over 1000 calls', () => {
    const ids = Array.from({ length: 1000 }, () => uniqueId('form-elm'));
    expect(new Set(ids).size).toBe(1000);
  });
});
