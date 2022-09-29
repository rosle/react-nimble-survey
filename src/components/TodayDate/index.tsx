import React from 'react';

import classNames from 'classnames';
import i18next from 'i18next';

const weekdayFormat: Intl.DateTimeFormatOptions = { weekday: 'long' };
const monthFormat: Intl.DateTimeFormatOptions = { month: 'long' };

type TodayDateProps = React.HTMLAttributes<HTMLDivElement>;

const TodayDate = ({ className, ...props }: TodayDateProps) => {
  const currentLocale = i18next.language;

  const today = new Date();
  const weekday = today.toLocaleDateString(currentLocale, weekdayFormat);
  const month = today.toLocaleDateString(currentLocale, monthFormat);
  const date = today.getDate();

  const classes = classNames('today-date', className);

  return (
    <div className={classes} {...props}>
      <div className="today-date__date">{`${weekday}, ${month} ${date}`}</div>
      <div className="today-date__title">Today</div>
    </div>
  );
};

export default TodayDate;
