'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { PortfolioItem } from '@/types/database';

type Category = 'Tất cả' | 'fashion' | 'lifestyle' | 'street' | 'editorial';
const categories: { label: string; value: Category }[] = [
  { label: 'Tất cả', value: 'Tất cả' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Street', value: 'street' },
  { label: 'Editorial', value: 'editorial' },
];

export default function PortfolioGallery() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [active, setActive] = useState<Category>('Tất cả');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('portfolio_items')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
  }, []);

  const filtered = active === 'Tất cả' ? items : items.filter((i) => i.category === active);
  const lightboxIndex = lightbox !== null ? filtered.findIndex((i) => i.id === lightbox) : -1;
  const lightboxItem = lightboxIndex !== -1 ? filtered[lightboxIndex] : null;

  const navigate = (dir: -1 | 1) => {
    if (lightboxIndex === -1) return;
    const next = (lightboxIndex + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next].id);
  };

  return (
    <>
      {/* Filter Tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={cn(
              'px-5 py-2.5 text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer',
              active === cat.value
                ? 'bg-gold text-black'
                : 'border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-24 text-white/40">Đang tải...</div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-24 text-white/40">Chưa có ảnh nào.</div>
      )}

      {/* Masonry Grid */}
      {!loading && filtered.length > 0 && (
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="mb-4 break-inside-avoid"
              >
                <button
                  onClick={() => setLightbox(item.id)}
                  className="group relative block w-full cursor-pointer overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt={item.caption || item.category}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-end justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-sm bg-gold/90 px-2 py-0.5 text-[10px] uppercase tracking-wider text-black">
                      {item.category}
                    </span>
                    {item.caption && (
                      <span className="mt-1 font-display text-xs text-white line-clamp-1">
                        {item.caption}
                      </span>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-sm uppercase tracking-wider text-white/60 transition-colors hover:text-gold cursor-pointer"
              >
                Đóng ✕
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxItem.image_url}
                alt={lightboxItem.caption || lightboxItem.category}
                className="max-h-[75vh] w-full object-contain"
              />

              {lightboxItem.caption && (
                <p className="mt-3 text-center text-sm text-white/60">{lightboxItem.caption}</p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 text-sm uppercase tracking-wider text-white/60 transition-colors hover:text-gold cursor-pointer"
                >
                  ← Trước
                </button>
                <span className="text-sm text-white/30">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
                <button
                  onClick={() => navigate(1)}
                  className="px-4 py-2 text-sm uppercase tracking-wider text-white/60 transition-colors hover:text-gold cursor-pointer"
                >
                  Sau →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
