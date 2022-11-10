import { expect } from '@jest/globals';

const toBeObjectContaining = () => {
  expect.extend({
    toBeObjectContaining(received: unknown, argument: Record<string, unknown>) {
      const pass = this.equals(received, expect.objectContaining(argument));

      if (pass) {
        return {
          message: () => `expected ${this.utils.printReceived(received)} not to contain ${this.utils.printExpected(argument)}`,
          pass: true,
        };
      } else {
        return {
          message: () => `expected ${this.utils.printReceived(received)} to contain ${this.utils.printExpected(argument)}`,
          pass: false,
        };
      }
    },
  });
};

export default toBeObjectContaining;
