import { fireEvent } from '@testing-library/react';

/*
  Using userEvent.type causes an error to wrap the action in act.
  This conflicts with the eslint rules `testing-library/no-unnecessary-act`.
  For now, use `fireEvent.change` as recommended from ReactHookForm.

  Ref:
    - https://react-hook-form.com/advanced-usage#TestingForm
    - https://github.com/react-hook-form/react-hook-form/pull/8155
*/
const fillInput = (input: HTMLElement, value: string) => {
  fireEvent.change(input, { target: { value: value } });
};

export { fillInput };
