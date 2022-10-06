import React from 'react';

export const caretRightTestId = 'caret-right-icon';

const CaretRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="30"
      viewBox="0 0 28 30"
      fill="none"
      data-test-id={caretRightTestId}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4629 25.0827L19.7078 15.9458C20.0974 15.5612 20.0974 14.9398 19.7078 14.5542L10.4629 5.41733C9.90053 4.86089 8.98563 4.86089 8.4223 5.41733C7.85997 5.97378 7.85997 6.87687 8.4223 7.43332L16.3309 15.2505L8.4223 23.0657C7.85997 23.6231 7.85997 24.5262 8.4223 25.0827C8.98563 25.6391 9.90053 25.6391 10.4629 25.0827Z"
        fill="#15151A"
      />
    </svg>
  );
};

export default CaretRight;