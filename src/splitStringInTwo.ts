export const splitStringInTwo = (string: string) => {
  const stringLength = string.length;
  const splitStringIndex = Math.floor(stringLength / 2);

  return [
    string.substring(0, splitStringIndex),
    string.substring(splitStringIndex, string.length),
  ];
};
