import { expect } from '@jest/globals';

const toBeArrayContainingObject = () => {
  expect.extend({
    toBeArrayContainingObject(received: unknown, argument: Record<string, unknown>) {
      const pass = this.equals(received, expect.arrayContaining([expect.objectContaining(argument)]));

      if (pass) {
        return {
          message: () =>
            `expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`,
          pass: true,
        };
      } else {
        return {
          message: () => `expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`,
          pass: false,
        };
      }
    },
  });
};

export default toBeArrayContainingObject;
