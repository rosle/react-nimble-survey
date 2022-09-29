import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const weekdayFormat: Intl.DateTimeFormatOptions = { weekday: 'long' };
const monthFormat: Intl.DateTimeFormatOptions = { month: 'long' };

const TodayDate = () => {
  const currentLocale = i18next.language;

  const today = new Date();
  const weekday = today.toLocaleDateString(currentLocale, weekdayFormat);
  const month = today.toLocaleDateString(currentLocale, monthFormat);
  const date = today.getDate();

  return (
    <div className="today-date">
      <div className="today-date__date">{`${weekday}, ${month} ${date}`}</div>
      <div className="today-date__title">Today</div>
    </div>
  );
};

export default TodayDate;
