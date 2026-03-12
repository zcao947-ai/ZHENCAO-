"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Video } from "@/types/database";

type VideoCategory = "Tất cả" | "TikTok" | "Âm nhạc" | "AI" | "Khác";

const typeToCategory: Record<string, Exclude<VideoCategory, "Tất cả">> = {
  tiktok: "TikTok",
  music: "Âm nhạc",
  ai: "AI",
  other: "Khác",
};

const categories: VideoCategory[] = ["Tất cả", "TikTok", "Âm nhạc", "AI"];

export default function VideoGallery() {
  const [active, setActive] = useState<VideoCategory>("Tất cả");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("videos")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        setVideos(data || []);
        setLoading(false);
      });
  }, []);

  const filtered =
    active === "Tất cả"
      ? videos
      : videos.filter((v) => typeToCategory[v.type] === active);

  return (
    <>
      {/* Filter Tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "cursor-pointer px-5 py-2.5 text-sm uppercase tracking-wider transition-all duration-300",
              active === cat
                ? "bg-gold text-black"
                : "border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="py-20 text-center text-white/40">Đang tải...</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-white/40">Chưa có video nào.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((video) => {
              const category = typeToCategory[video.type] || "Khác";
              const link = video.tiktok_url || video.video_url;

              return (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <a
                    href={link || "#"}
                    target={link ? "_blank" : undefined}
                    rel={link ? "noopener noreferrer" : undefined}
                    className="group block cursor-pointer overflow-hidden border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-gold/30"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      {video.thumbnail_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }}
                        />
                      ) : null}
                      <div className={`placeholder-gradient h-full w-full transition-transform duration-700 group-hover:scale-105 ${video.thumbnail_url ? "hidden" : ""}`} />

                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/40">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-black/60">
                          <svg
                            className="ml-1 h-6 w-6 text-white transition-colors group-hover:text-gold"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="bg-gold/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                          {category}
                        </span>
                      </div>
                      <h3 className="font-display text-base leading-snug text-white/90 transition-colors group-hover:text-gold">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="mt-2 text-sm text-white/40 line-clamp-2">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
