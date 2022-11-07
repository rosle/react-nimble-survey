const mockLocation = () => {
  const oldWindowLocation = window.location;

  // Disable a lint rule. This should be fine on the test
  // and we've already redefine window.location below.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore The operand of a 'delete' operator must be optional
  delete window.location;

  Object.defineProperty(window, 'location', {
    value: {
      ...oldWindowLocation,
    },
  });
};

export default mockLocation;
