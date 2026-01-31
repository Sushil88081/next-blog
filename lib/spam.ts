// Comprehensive spam and abuse word list
const abuseWords = [
  // Profanity (English)
  "fuck", "shit", "damn", "bitch", "asshole", "bastard", "crap", "piss",
  // Profanity (Hindi/Urdu)
  "chutiya", "madarchod", "bhenchod", "lund", "gandu", "chut", "randi",
  // Sexual content
  "sex", "porn", "xxx", "nude", "naked", "adult", "escort", "dating",
  // Spam keywords
  "click here", "buy now", "limited offer", "act now", "urgent", "winner",
  "congratulations", "free money", "get rich", "make money", "work from home",
  "viagra", "cialis", "pharmacy", "medication", "prescription",
  "casino", "gambling", "lottery", "prize", "jackpot",
  "loan", "credit", "debt", "refinance", "mortgage",
  "weight loss", "diet pill", "lose weight", "fat burner",
  "bitcoin", "crypto", "investment", "trading", "forex",
  "seo service", "backlink", "website traffic", "google ranking",
];

// Common spam phrases
const spamPhrases = [
  "check out this", "visit my website", "click this link",
  "make money fast", "guaranteed income", "no experience needed",
  "act now before", "limited time only", "don't miss out",
  "one time offer", "exclusive deal", "special promotion",
];

// URL patterns
const urlPatterns = [
  /https?:\/\//i,
  /www\./i,
  /\.(com|net|org|io|co|xyz|info|biz|me|tv|cc|ws|name|mobi|asia|jobs|museum|travel|pro|tel|xxx|onion|bit|ly|tinyurl|shorturl)/i,
];

// Email pattern
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;

// Phone number patterns (various formats)
const phonePatterns = [
  /\d{10,}/, // 10+ consecutive digits
  /\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/, // Phone format
  /call\s+(me|us|now|today)/i,
  /phone\s+(number|no|#)/i,
];

export function isSpam(text: string): boolean {
  // Check minimum length
  if (text.length < 5) return true;
  
  // Check maximum length (very long comments might be spam)
  if (text.length > 2000) return true;

  const lower = text.toLowerCase();
  const trimmed = text.trim();

  // 1. Check for abuse words
  if (abuseWords.some(word => lower.includes(word))) {
    return true;
  }

  // 2. Check for spam phrases
  if (spamPhrases.some(phrase => lower.includes(phrase))) {
    return true;
  }

  // 3. Check for URLs (spam often contains links)
  if (urlPatterns.some(pattern => pattern.test(text))) {
    return true;
  }

  // 4. Check for email addresses (spam often contains emails)
  if (emailPattern.test(text)) {
    return true;
  }

  // 5. Check for phone numbers
  if (phonePatterns.some(pattern => pattern.test(text))) {
    return true;
  }

  // 6. Check for excessive repeated characters (e.g., "aaaaaa", "!!!!!!")
  if (/(.)\1{4,}/.test(text)) {
    return true;
  }

  // 7. Check for excessive capitalization (e.g., "HELLO WORLD")
  const upperCaseRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  if (upperCaseRatio > 0.7 && text.length > 10) {
    return true;
  }

  // 8. Check for excessive special characters
  const specialCharRatio = (text.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length / text.length;
  if (specialCharRatio > 0.3) {
    return true;
  }

  // 9. Check for too many numbers (spam often has phone numbers, prices, etc.)
  const numberRatio = (text.match(/\d/g) || []).length / text.length;
  if (numberRatio > 0.4 && text.length > 20) {
    return true;
  }

  // 10. Check for suspicious patterns (repeated words)
  const words = lower.split(/\s+/);
  const wordCounts: { [key: string]: number } = {};
  words.forEach(word => {
    if (word.length > 3) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });
  const repeatedWords = Object.values(wordCounts).filter(count => count >= 3);
  if (repeatedWords.length > 0 && words.length < 20) {
    return true;
  }

  // 11. Check for only numbers or only special characters
  if (/^[\d\s]+$/.test(trimmed) || /^[^\w\s]+$/.test(trimmed)) {
    return true;
  }

  // 12. Check for suspicious character sequences (e.g., "asdfgh", "qwerty")
  const suspiciousSequences = ['asdf', 'qwerty', 'abcdef', '123456', 'aaaa', 'zzzz'];
  if (suspiciousSequences.some(seq => lower.includes(seq))) {
    return true;
  }

  // 13. Check for too many spaces (spam formatting)
  const spaceRatio = (text.match(/\s/g) || []).length / text.length;
  if (spaceRatio > 0.5) {
    return true;
  }

  // 14. Check for common spam indicators
  const spamIndicators = [
    /\$\d+/, // Dollar amounts
    /%\s*\d+/, // Percentages
    /free\s+(trial|download|gift|prize|money)/i,
    /no\s+(credit\s+card|obligation|risk|catch)/i,
    /guaranteed/i,
    /risk.free/i,
    /100%\s+(free|guaranteed|satisfaction)/i,
  ];
  
  if (spamIndicators.some(pattern => pattern.test(text))) {
    return true;
  }

  // 15. Check for excessive punctuation
  const punctuationRatio = (text.match(/[!?.]{2,}/g) || []).length;
  if (punctuationRatio > 3) {
    return true;
  }

  // If none of the checks triggered, it's not spam
  return false;
}
