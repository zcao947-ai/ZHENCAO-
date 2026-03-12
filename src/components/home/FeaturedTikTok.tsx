"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Video } from "@/types/database";

export default function FeaturedTikTok() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("videos")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setVideos(data || []));
  }, []);

  // Extract TikTok video ID from URL for embedding
  const getTikTokEmbedUrl = (url: string) => {
    const match = url.match(/video\/(\d+)/);
    if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
    return null;
  };

  return (
    <AnimatedSection className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Video mới từ{" "}
          <span className="text-gradient-gold">MinhLee</span>
        </h2>
        <p className="mt-4 text-white/50">
          Những video mới nhất của MinhLee
        </p>

        {videos.length > 0 ? (
          <div className={`mx-auto mt-12 grid gap-6 ${videos.length === 1 ? "max-w-lg" : videos.length === 2 ? "max-w-3xl grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
            {videos.map((video) => {
              const embedUrl = video.tiktok_url ? getTikTokEmbedUrl(video.tiktok_url) : null;
              const videoLink = video.tiktok_url || video.video_url;
              return (
                <div key={video.id} className="group">
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/5 bg-black">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        className="absolute inset-0 h-full w-full"
                        allowFullScreen
                        allow="encrypted-media"
                      />
                    ) : videoLink ? (
                      <a
                        href={videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 placeholder-gradient-gold"
                      >
                        {video.thumbnail_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={video.thumbnail_url} alt={video.title} className="absolute inset-0 h-full w-full object-cover" />
                        ) : null}
                        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-colors hover:bg-gold/20">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-gold">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="relative z-10 text-sm uppercase tracking-widest text-white/60">
                          Xem video
                        </span>
                      </a>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 placeholder-gradient-gold">
                        {video.thumbnail_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={video.thumbnail_url} alt={video.title} className="absolute inset-0 h-full w-full object-cover" />
                        ) : null}
                        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-gold">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-white/70">{video.title}</p>
                </div>
              );
            })}
          </div>
        ) : (
          /* Placeholder khi chưa có video */
          <div className="mx-auto mt-12 max-w-lg">
            <div className="placeholder-gradient-gold relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/5">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-colors hover:bg-gold/20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-gold">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-sm uppercase tracking-widest text-white/40">
                  TikTok Video
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
