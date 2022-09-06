// replace the last string in the first array of strings
export function replaceLastString(
  strings: string[],
  stringToReplace: string,
  replacement: string
): string[] {
  const index = strings.indexOf(stringToReplace);
  if (index === -1) {
    return strings;
  }
  return [
    ...strings.slice(0, index),
    replacement,
    ...strings.slice(index + 1)
  ];
}

export default replaceLastString;