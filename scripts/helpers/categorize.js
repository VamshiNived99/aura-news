export function detectCategory(title, content = "") {
  const text = `${title} ${content}`.toLowerCase();

  if (
    text.includes("cm") ||
    text.includes("minister") ||
    text.includes("government") ||
    text.includes("bjp") ||
    text.includes("congress") ||
    text.includes("election")
  ) {
    return "politics";
  }

  if (
    text.includes("crime") ||
    text.includes("murder") ||
    text.includes("police") ||
    text.includes("arrest")
  ) {
    return "crime";
  }

  if (
    text.includes("job") ||
    text.includes("recruitment") ||
    text.includes("notification")
  ) {
    return "jobs";
  }

  if (
    text.includes("stock") ||
    text.includes("market") ||
    text.includes("economy") ||
    text.includes("business")
  ) {
    return "business";
  }

  if (
    text.includes("movie") ||
    text.includes("actor") ||
    text.includes("film") ||
    text.includes("trailer")
  ) {
    return "entertainment";
  }

  if (
    text.includes("match") ||
    text.includes("cricket") ||
    text.includes("ipl") ||
    text.includes("football")
  ) {
    return "sports";
  }

  return "general";
}