import dotenv from "dotenv";
dotenv.config();

import Parser from "rss-parser";
import { createClient } from "@supabase/supabase-js";

import { FEEDS } from "./feeds.js";
import { detectCategory } from "./helpers/categorize.js";
import { extractImage } from "./helpers/extractImage.js";
import { cleanText } from "./helpers/cleanText.js";
import { generateSummary } from "./helpers/summarize.js";
import { scoreNews } from "./helpers/scoreNews.js";
import { detectDistrict } from "./helpers/detectDistrict.js";
import { isValidArticle } from "./helpers/isValidArticle.js";
import { extractTopics } from "./helpers/extractTopics.js";

const parser = new Parser();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function articleExists(title) {
  const { data } = await supabase
    .from("news_feed")
    .select("id")
    .eq("title", title)
    .limit(1);

  return data && data.length > 0;
}

async function processFeed(feedConfig) {
  try {
    console.log(`\nFetching: ${feedConfig.name}`);

    const feed = await parser.parseURL(feedConfig.url);

    for (const item of feed.items.slice(0, 20)) {
      const title = cleanText(item.title || "");

      const content = cleanText(
        item.contentSnippet ||
        item.content ||
        item.summary ||
        ""
      );

      if (!title || !content) continue;

      const exists = await articleExists(title);

      if (exists) {
        console.log(`Duplicate skipped: ${title}`);
        continue;
      }

      const summary = generateSummary(title, content);

      const category = detectCategory(
  title,
  content
);

      const district = detectDistrict(
  title,
  content
);

const relevanceScore = scoreNews(
  title,
  category,
  feedConfig.priority,
  district,
  item.pubDate
);

const topics = extractTopics(
  title,
  content
);

const imageUrl = await extractImage(
  item,
  item.link
);

      const valid = isValidArticle(
  title,
  content,
  imageUrl
);

if (!valid) {
  console.log(
    `Invalid article skipped: ${title}`
  );

  continue;
}
      

      const article = {
        title,

        summary,

        content,

        district,

        topics,

        image_url: imageUrl,

        source_url: item.link || "",

        source_name: feedConfig.name,

        language: feedConfig.language,

        category: detectCategory(title, content),

        country: "India",

        state: feedConfig.state,

        scope: feedConfig.scope,

        relevance_score: relevanceScore,

        published_at:
          item.pubDate || new Date().toISOString(),

        is_active: true,
      };

      const { error } = await supabase
        .from("news_feed")
        .insert(article);

      if (error) {
        console.log("Insert error:", error.message);
      } else {
        console.log(`Inserted (${relevanceScore}): ${title}`);
      }
    }
  } catch (err) {
    console.log(`Feed error: ${feedConfig.url}`);
    console.log(err.message);
  }
}

async function main() {
  console.log("\nAURA PREMIUM NEWS PIPELINE STARTED\n");

  for (const feed of FEEDS) {
    await processFeed(feed);
  }

  console.log("\nPremium news fetch completed\n");
}

main();