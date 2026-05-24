import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function cleanupOldNews() {
  const cutoff = new Date();

  cutoff.setDate(cutoff.getDate() - 3);

  const { error } = await supabase
    .from("news_feed")
    .delete()
    .lt(
      "published_at",
      cutoff.toISOString()
    );

  if (error) {
    console.log("Cleanup error:", error.message);
  } else {
    console.log(
      "Old news cleaned successfully"
    );
  }
}

cleanupOldNews();