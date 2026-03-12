"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Video } from "@/types/database";

const defaultMusicItems = [
  { title: "MinhLee chơi Piano" },
  { title: "MinhLee chơi Guitar" },
];

export default function MusicSection() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("videos")
      .select("*")
      .eq("is_published", true)
      .eq("type", "music")
      .order("display_order", { ascending: true })
      .limit(4)
      .then(({ data }) => setVideos(data || []));
  }, []);

  const musicItems = videos.length > 0
    ? videos.map((v) => ({
        title: v.title,
        tiktok_url: v.tiktok_url,
        video_url: v.video_url,
        thumbnail_url: v.thumbnail_url,
      }))
    : defaultMusicItems.map((m) => ({
        title: m.title,
        tiktok_url: null as string | null,
        video_url: null as string | null,
        thumbnail_url: null as string | null,
      }));

  return (
    <AnimatedSection className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            MinhLee &amp;{" "}
            <span className="text-gradient-gold">Âm Nhạc</span>
          </h2>
          <p className="mt-4 text-white/50">
            Khi thời trang gặp gỡ nghệ thuật âm nhạc
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {musicItems.map((item) => (
            <div
              key={item.title}
              className="group relative aspect-video overflow-hidden rounded-2xl border border-white/5 transition-all duration-500 hover:border-gold/20"
            >
              {item.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="placeholder-gradient-gold absolute inset-0" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                {/* Music note decorations */}
                <div className="absolute left-6 top-6 text-gold/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="absolute right-8 top-10 text-gold/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>

                {/* Play button */}
                {item.tiktok_url || item.video_url ? (
                  <a
                    href={item.tiktok_url || item.video_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/20"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-gold">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-gold">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}

                {/* Title */}
                <p className="text-sm font-medium uppercase tracking-widest text-white/60">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
