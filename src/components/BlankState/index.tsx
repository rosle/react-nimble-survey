import React from 'react';

import classNames from 'classnames';

interface BlankStateProps extends React.HTMLAttributes<HTMLDivElement> {
  emoji: string;
  description: string;
}

const BlankState = ({ emoji, description, className, ...props }: BlankStateProps) => {
  return (
    <div className={classNames('blank-state', className)} {...props}>
      <div className="blank-state__emoji">{emoji}</div>
      <h2>{description}</h2>
    </div>
  );
};

export default BlankState;
