import { resolveInputIdFromName } from './formControl';

describe('resolveInputIdFromName', () => {
  it('returns ID if ID attribute is set', () => {
    const htmlAttributes = { id: 'MyInputA', name: 'input_a' };

    expect(resolveInputIdFromName(htmlAttributes)).toBe('MyInputA');
  });

  it('returns camel-cased name if ID attribute is NOT set', () => {
    const htmlAttributes = { name: 'input_a' };

    expect(resolveInputIdFromName(htmlAttributes)).toBe('inputA');
  });

  it('returns undefined if both ID and name attribute is NOT set', () => {
    const htmlAttributes = {};

    expect(resolveInputIdFromName(htmlAttributes)).toBeUndefined();
  });
});
