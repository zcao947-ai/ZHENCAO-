"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

const portfolioItems = [
  { id: 1, category: "Thời trang đường phố", gradient: "from-zinc-800 via-zinc-900 to-black" },
  { id: 2, category: "High Fashion", gradient: "from-stone-800 via-stone-900 to-black" },
  { id: 3, category: "Thời trang dạ hội", gradient: "from-neutral-800 via-neutral-900 to-black" },
  { id: 4, category: "Phụ kiện", gradient: "from-zinc-800 via-zinc-900 to-black" },
  { id: 5, category: "Chân dung", gradient: "from-stone-800 via-stone-900 to-black" },
  { id: 6, category: "Nghệ thuật", gradient: "from-neutral-800 via-neutral-900 to-black" },
];

export default function PortfolioPreview() {
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
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border border-white/5"
            >
              {/* Placeholder background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-110`}
              />

              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="flex h-full items-center justify-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-white/30"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              </div>

              {/* Gold corner accent */}
              <div className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-gold/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-gold/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold">
                    {item.category}
                  </p>
                  <div className="mt-1 h-px w-8 bg-gold/50" />
                </div>
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
