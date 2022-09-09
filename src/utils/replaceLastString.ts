// replace the last string in the first array of strings
export default function replaceLastString(
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
