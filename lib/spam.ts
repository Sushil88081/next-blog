const abuseWords = ["chutiya", "madarchod", "fuck", "sex"];

export function isSpam(text: string) {
  if (text.length < 5) return true;

  const lower = text.toLowerCase();
  return abuseWords.some(word => lower.includes(word));
}
