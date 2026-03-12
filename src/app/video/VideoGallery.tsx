"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type VideoCategory = "Tất cả" | "TikTok" | "Âm nhạc" | "AI";

interface VideoItem {
  id: number;
  title: string;
  category: Exclude<VideoCategory, "Tất cả">;
  duration: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: "MinhLee - Đêm Thành Phố (Official MV)",
    category: "Âm nhạc",
    duration: "3:45",
  },
  {
    id: 2,
    title: "OOTD Mùa Thu - Get Ready With Me",
    category: "TikTok",
    duration: "0:58",
  },
  {
    id: 3,
    title: "AI Fashion Show - Behind The Scenes",
    category: "AI",
    duration: "5:20",
  },
  {
    id: 4,
    title: "MinhLee - Giấc Mơ Piano (Live Session)",
    category: "Âm nhạc",
    duration: "4:12",
  },
  {
    id: 5,
    title: "Thử Thách Phối Đồ 7 Ngày",
    category: "TikTok",
    duration: "1:15",
  },
  {
    id: 6,
    title: "Cách MinhLee Được Tạo Ra - AI Process",
    category: "AI",
    duration: "8:30",
  },
];

const categories: VideoCategory[] = ["Tất cả", "TikTok", "Âm nhạc", "AI"];

export default function VideoGallery() {
  const [active, setActive] = useState<VideoCategory>("Tất cả");

  const filtered =
    active === "Tất cả"
      ? videos
      : videos.filter((v) => v.category === active);

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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((video) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="group cursor-pointer overflow-hidden border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-gold/30">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <div className="placeholder-gradient h-full w-full transition-transform duration-700 group-hover:scale-105" />

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

                  {/* Duration */}
                  <span className="absolute bottom-3 right-3 bg-black/70 px-2 py-0.5 text-xs text-white/80 backdrop-blur-sm">
                    {video.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="bg-gold/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                      {video.category}
                    </span>
                  </div>
                  <h3 className="font-display text-base leading-snug text-white/90 transition-colors group-hover:text-gold">
                    {video.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
