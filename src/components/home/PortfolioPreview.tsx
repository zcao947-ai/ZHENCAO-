"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import type { PortfolioItem } from "@/types/database";

export default function PortfolioPreview() {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("portfolio_items")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .limit(6)
      .then(({ data }) => setItems(data || []));
  }, []);

  return (
    <AnimatedSection className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="mt-4 text-white/50">
            Bộ sưu tập hình ảnh thời trang của MinhLee
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {items.length > 0
            ? items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border border-white/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt={item.caption || item.category}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gold">
                        {item.category}
                      </p>
                      {item.caption && (
                        <p className="mt-1 text-sm text-white/80 line-clamp-1">{item.caption}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            : // Placeholder khi chưa có ảnh
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/20">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </motion.div>
              ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="outline">
            Xem Portfolio
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
