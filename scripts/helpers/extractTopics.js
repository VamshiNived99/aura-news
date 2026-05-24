const STOPWORDS = [
  "the",
  "and",
  "for",
  "with",
  "from",
  "that",
  "this",
  "into",
  "after",
  "will",
  "have",
  "about",
  "their",
];

export function extractTopics(
  title,
  content = ""
) {
  const text =
    `${title} ${content}`.toLowerCase();

  const words = text
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 4 &&
        !STOPWORDS.includes(word)
    );

  const frequency = {};

  words.forEach((word) => {
    frequency[word] =
      (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}