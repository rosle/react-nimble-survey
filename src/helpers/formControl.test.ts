import { resolveInputIdFromName } from './formControl';

describe('resolveInputIdFromName', () => {
  describe('given an ID attribute is set', () => {
    it('returns the given ID', () => {
      const htmlAttributes = { id: 'MyInputA', name: 'input_a' };

      expect(resolveInputIdFromName(htmlAttributes)).toBe('MyInputA');
    });
  });

  describe('given an ID attribute is NOT set', () => {
    it('returns a camel-cased name', () => {
      const htmlAttributes = { name: 'input_a' };

      expect(resolveInputIdFromName(htmlAttributes)).toBe('inputA');
    });
  });

  describe('given both ID and name attributes are NOT set', () => {
    it('returns undefined', () => {
      const htmlAttributes = {};

      expect(resolveInputIdFromName(htmlAttributes)).toBeUndefined();
    });
  });
});
