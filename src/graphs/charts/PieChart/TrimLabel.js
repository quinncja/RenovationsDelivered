export const trimLabel = (label) => {
  const words = label.split(" ").filter(Boolean);
  return words[0].toLowerCase() === "the" ? words[1] : words[0];
};
