export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeArrayContainingObject(argument: Record<string, unknown>): R;
      toBeObjectContaining(argument: Record<string, unknown>): R;
    }
  }
}
