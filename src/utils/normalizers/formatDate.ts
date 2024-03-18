export const formatDate = (dateString: string) => {
  const formattedDate = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeZone: "America/Santiago",
  }).format(new Date(dateString));

  return formattedDate[0].toUpperCase() + formattedDate.slice(1);
};
