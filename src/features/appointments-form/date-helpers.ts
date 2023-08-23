export const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  weekday: "short",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Santiago",
});

export const hourFormatter = new Intl.DateTimeFormat("es-CL", {
  timeStyle: "short",
  timeZone: "America/Santiago",
});
