'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Category = 'Tất cả' | 'Fashion' | 'Lifestyle' | 'Street' | 'Editorial';

interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<Category, 'Tất cả'>;
  aspect: string;
}

const items: GalleryItem[] = [
  { id: 1, title: 'Ánh sáng thành phố', category: 'Fashion', aspect: 'aspect-[3/4]' },
  { id: 2, title: 'Buổi sáng cafe', category: 'Lifestyle', aspect: 'aspect-square' },
  { id: 3, title: 'Đường phố Sài Gòn', category: 'Street', aspect: 'aspect-[4/5]' },
  { id: 4, title: 'Bộ sưu tập mùa hè', category: 'Editorial', aspect: 'aspect-[3/4]' },
  { id: 5, title: 'Phong cách tối giản', category: 'Fashion', aspect: 'aspect-[4/5]' },
  { id: 6, title: 'Hoàng hôn trên phố', category: 'Street', aspect: 'aspect-square' },
  { id: 7, title: 'Thời trang đường phố', category: 'Fashion', aspect: 'aspect-[3/4]' },
  { id: 8, title: 'Khoảnh khắc yên bình', category: 'Lifestyle', aspect: 'aspect-[4/5]' },
  { id: 9, title: 'Nghệ thuật đương đại', category: 'Editorial', aspect: 'aspect-[3/4]' },
  { id: 10, title: 'Góc phố quen thuộc', category: 'Street', aspect: 'aspect-square' },
  { id: 11, title: 'Đêm lung linh', category: 'Fashion', aspect: 'aspect-[4/5]' },
  { id: 12, title: 'Phong cách tự do', category: 'Lifestyle', aspect: 'aspect-[3/4]' },
];

const categories: Category[] = ['Tất cả', 'Fashion', 'Lifestyle', 'Street', 'Editorial'];

export default function PortfolioGallery() {
  const [active, setActive] = useState<Category>('Tất cả');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'Tất cả' ? items : items.filter((i) => i.category === active);
  const lightboxItem = lightbox !== null ? filtered.find((i) => i.id === lightbox) : null;
  const lightboxIndex = lightbox !== null ? filtered.findIndex((i) => i.id === lightbox) : -1;

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
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              'px-5 py-2.5 text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer',
              active === cat
                ? 'bg-gold text-black'
                : 'border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
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
                <div
                  className={cn(
                    'placeholder-gradient-gold w-full transition-transform duration-700 group-hover:scale-105',
                    item.aspect
                  )}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-2 rounded-sm bg-gold/90 px-2 py-0.5 text-[10px] uppercase tracking-wider text-black">
                    {item.category}
                  </span>
                  <span className="font-display text-sm text-white">
                    {item.title}
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-sm uppercase tracking-wider text-white/60 transition-colors hover:text-gold cursor-pointer"
              >
                Đóng ✕
              </button>

              {/* Image */}
              <div className="placeholder-gradient-gold aspect-[3/4] w-full border border-white/10">
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <span className="rounded-sm bg-gold/90 px-3 py-1 text-xs uppercase tracking-wider text-black">
                    {lightboxItem.category}
                  </span>
                  <span className="font-display text-xl text-white">
                    {lightboxItem.title}
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
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
