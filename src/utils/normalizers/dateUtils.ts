import dayjs from "dayjs";

export const negativeOffset = dayjs().toDate().getTimezoneOffset() / 60;
