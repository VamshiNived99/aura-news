import nlp from "compromise";
import { cleanText } from "./cleanText.js";

export function generateSummary(
  title,
  content
) {
  const cleaned = cleanText(content);

  const doc = nlp(cleaned);

  let sentences = doc.sentences().out("array");

  // Remove noisy lines
  sentences = sentences.filter(
    (s) =>
      s.length > 40 &&
      !s.toLowerCase().includes("advertisement") &&
      !s.toLowerCase().includes("subscribe")
  );

  // Take best sentences
  let summary = sentences
    .slice(0, 5)
    .join(" ");

  // Fallback
  if (summary.length < 150) {
    summary =
      cleaned.slice(0, 500) +
      " More updates are expected soon as authorities continue monitoring developments.";
  }

  // Final cleanup
  summary = summary
    .replace(/\s+/g, " ")
    .trim();

  return summary.slice(0, 700);
}