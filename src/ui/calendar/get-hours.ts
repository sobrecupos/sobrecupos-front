import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

export const getHours = () => {
  const startOfDay = dayjs().hour(8).minute(0);
  const endOfDay = dayjs().hour(21).minute(0);
  const hours = [];
  let currentHour = startOfDay;

  while (currentHour.isBefore(endOfDay, "hour")) {
    hours.push(currentHour);
    currentHour = currentHour.add(1, "hour");
  }

  return hours;
};
