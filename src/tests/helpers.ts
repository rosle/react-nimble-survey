import { fireEvent } from '@testing-library/react';

const fillInput = (input: HTMLElement, value: string) => {
  fireEvent.change(input, { target: { value: value } });
};

export { fillInput };
