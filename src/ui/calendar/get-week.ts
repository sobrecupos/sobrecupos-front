import dayjs from "dayjs";
import localeEs from "dayjs/locale/es";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const getWeek = ({
  week: currentWeek,
  year,
}: {
  week: number;
  year: number;
}) => {
  const date = dayjs().year(year).isoWeek(currentWeek);
  const startOfWeek = date.locale(localeEs).startOf("week");
  const endOfWeek = date.locale(localeEs).endOf("week");
  const week = [];

  let day = startOfWeek;

  while (day.isBefore(endOfWeek)) {
    week.push(day);
    day = day.add(1, "day");
  }

  return week;
};
