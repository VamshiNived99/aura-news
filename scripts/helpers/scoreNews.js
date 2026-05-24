export function scoreNews(
  title,
  category,
  priority,
  district,
  publishedAt
) {
  let score = priority || 50;

  const text = title.toLowerCase();

  const highImpactKeywords = [
    "breaking",
    "cm",
    "minister",
    "government",
    "election",
    "death",
    "war",
    "attack",
    "supreme court",
    "flood",
    "earthquake",
  ];

  highImpactKeywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      score += 4;
    }
  });

  // Category boosts
  if (category === "politics") score += 8;
  if (category === "crime") score += 6;
  if (category === "jobs") score += 7;
  if (category === "sports") score += 5;

  // District boost
  if (district) {
    score += 10;
  }

  // Freshness
  const publishedDate = new Date(
    publishedAt || Date.now()
  );

  const now = new Date();

  const diffHours =
    (now - publishedDate) /
    (1000 * 60 * 60);

  if (diffHours <= 2) score += 12;
  else if (diffHours <= 6) score += 8;
  else if (diffHours <= 12) score += 5;
  else if (diffHours <= 24) score += 2;
  else if (diffHours > 48) score -= 10;

  return Math.max(
    1,
    Math.min(Math.round(score), 100)
  );
}