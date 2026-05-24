import { supabase } from "@/lib/supabase";

export async function fetchHomeFeed(
  page = 0,
  limit = 10
) {
  const from = page * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("news_feed")
    .select("*")
    .eq("is_active", true)
    .order("relevance_score", {
      ascending: false,
    })
    .order("published_at", {
      ascending: false,
    })
    .range(from, to);

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function fetchLocalFeed(
  state,
  district,
  page = 0,
  limit = 10
) {
  const from = page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("news_feed")
    .select("*")
    .eq("is_active", true)
    .eq("state", state)
    .order("relevance_score", {
      ascending: false,
    })
    .order("published_at", {
      ascending: false,
    });

  if (district) {
    query = query.eq("district", district);
  }

  const { data, error } =
    await query.range(from, to);

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}