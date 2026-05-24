import ogs from "open-graph-scraper";
import axios from "axios";
import * as cheerio from "cheerio";

export async function extractImage(
  item,
  articleUrl
) {
  // RSS image first
  const rssImage =
    item.enclosure?.url ||
    item.thumbnail ||
    item["media:content"]?.url ||
    item["media:thumbnail"]?.url;

  if (
    rssImage &&
    !rssImage.includes("logo") &&
    !rssImage.includes("icon")
  ) {
    return rssImage;
  }

  // OpenGraph fallback
  try {
    const ogData = await ogs({
      url: articleUrl,
    });

    const ogImage =
      ogData.result?.ogImage?.[0]?.url;

    if (ogImage) {
      return ogImage;
    }
  } catch {}

  // HTML fallback
  try {
    const { data } = await axios.get(
      articleUrl
    );

    const $ = cheerio.load(data);

    const img =
      $('meta[property="og:image"]').attr(
        "content"
      ) ||
      $("img").first().attr("src");

    if (img) {
      return img;
    }
  } catch {}

  // Final fallback
  return "";
}