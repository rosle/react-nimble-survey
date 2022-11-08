import React from 'react';

export const caretLeftTestId = 'caret-left-icon';

const CaretLeft = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 28 30" fill="none" data-test-id={caretLeftTestId}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5371 25.0827L7.29215 15.9458C6.90262 15.5612 6.90262 14.9398 7.29215 14.5542L16.5371 5.41733C17.0995 4.86089 18.0144 4.86089 18.5777 5.41733C19.14 5.97378 19.14 6.87687 18.5777 7.43332L10.6691 15.2505L18.5777 23.0657C19.14 23.6231 19.14 24.5262 18.5777 25.0827C18.0144 25.6391 17.0995 25.6391 16.5371 25.0827"
        fill="white"
      />
    </svg>
  );
};

export default CaretLeft;
