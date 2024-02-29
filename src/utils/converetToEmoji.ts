export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char, index) => 127397 + char.charCodeAt(index));
  return String.fromCodePoint(...codePoints);
}
