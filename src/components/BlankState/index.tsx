import React from 'react';

import classNames from 'classnames';

interface BlankStateProps extends React.HTMLAttributes<HTMLDivElement> {
  emoji: string;
  description: string;
}

const BlankState = ({ emoji, description, className, ...props }: BlankStateProps) => {
  const classes = classNames('blank-state', className);

  return (
    <div className={classes} {...props}>
      <div className="blank-state__emoji">{emoji}</div>
      <h2>{description}</h2>
    </div>
  );
};

export default BlankState;
