import React from 'react';

import classNames from 'classnames';

export const blankStateTestIds = {
  emoji: 'blank-state__emoji',
  description: 'blank-state__description',
};

export interface BlankStateProps extends React.HTMLAttributes<HTMLDivElement> {
  emoji: string;
  description: string;
}

const BlankState = ({ emoji, description, className, ...props }: BlankStateProps) => {
  return (
    <div className={classNames('blank-state', className)} {...props}>
      <div className="blank-state__emoji" data-test-id={blankStateTestIds.emoji}>
        {emoji}
      </div>
      <h2 data-test-id={blankStateTestIds.description}>{description}</h2>
    </div>
  );
};

export default BlankState;
