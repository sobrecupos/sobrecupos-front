export const capitalize = (string: string) => {
  const formattedString = string.toLowerCase();
  const words = formattedString.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};
