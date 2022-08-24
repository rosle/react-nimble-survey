import { resolveInputIdFromName } from './formControl';

describe('formControlHelper', () => {
  describe('resolveInputIdFromName', () => {
    it('given the ID attribute is set, returns ID', () => {
      const htmlAttributes = { id: 'MyInputA', name: 'input_a' };

      expect(resolveInputIdFromName(htmlAttributes)).toBe('MyInputA');
    });

    it('given the ID attribute is NOT set, returns camel-cased name', () => {
      const htmlAttributes = { name: 'input_a' };

      expect(resolveInputIdFromName(htmlAttributes)).toBe('inputA');
    });

    it('given both ID and name attributes are NOT set, returns undefined', () => {
      const htmlAttributes = {};

      expect(resolveInputIdFromName(htmlAttributes)).toBeUndefined();
    });
  });
});
