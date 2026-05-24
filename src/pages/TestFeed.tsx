import { useEffect, useState } from "react";
import {
  fetchHomeFeed,
} from "@/services/feedService";

export default function TestFeed() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchHomeFeed();

      console.log(data);

      setNews(data);
    }

    load();
  }, []);

  return (
    <div className="p-4 space-y-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold">
        Aura Feed Test
      </h1>

      {news.map((item) => (
        <div
          key={item.id}
          className="border border-white/20 rounded-2xl p-4"
        >
          <img
            src={item.image_url}
            alt=""
            className="w-full h-52 object-cover rounded-xl mb-3"
          />

          <div className="text-xs text-gray-400 mb-2">
            {item.category} • {item.state}
          </div>

          <h2 className="text-xl font-bold mb-3">
            {item.title}
          </h2>

          <p className="text-gray-300 leading-7">
            {item.summary}
          </p>
        </div>
      ))}
    </div>
  );
}