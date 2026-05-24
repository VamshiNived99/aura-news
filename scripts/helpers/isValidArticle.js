export function isValidArticle(
  title,
  content,
  imageUrl
) {
  // Weak title
  if (!title || title.length < 15) {
    return false;
  }

  // Weak content
  if (!content || content.length < 80) {
    return false;
  }

  // Spam checks
  const spamWords = [
    "click here",
    "subscribe",
    "advertisement",
  ];

  const lower = title.toLowerCase();

  for (const word of spamWords) {
    if (lower.includes(word)) {
      return false;
    }
  }

  // Ignore tiny useless images only
  if (
    imageUrl &&
    (
      imageUrl.includes("logo") ||
      imageUrl.includes("icon")
    )
  ) {
    return false;
  }

  return true;
}