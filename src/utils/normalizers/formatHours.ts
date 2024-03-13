import dayjs from "dayjs";

export const formatHours = (dateString: string, intervalInMinutes: number) => {
  //se quita la Z para que no se muestre la hora en UTC
  const start = dayjs(dateString.replace("Z", ""));
  const end = start.add(intervalInMinutes, "minutes");

  return `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
};
