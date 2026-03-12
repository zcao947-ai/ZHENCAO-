"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import type { Product } from "@/types/database";

export default function AffiliatePreview() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .limit(3)
      .then(({ data }) => setProducts(data || []));
  }, []);

  if (products.length === 0) return null;

  return (
    <AnimatedSection className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            <span className="text-gradient-gold">MinhLee</span> Picks
          </h2>
          <p className="mt-4 text-white/50">
            Những sản phẩm được MinhLee yêu thích và giới thiệu
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 transition-all duration-500 hover:border-gold/20"
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <div className="placeholder-gradient-gold h-full w-full" />
                )}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>

              {/* Product info */}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-white">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    {product.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  {product.price && (
                    <span className="text-lg font-semibold text-gold">
                      {product.price}
                    </span>
                  )}
                  <Button variant="outline" size="sm" href={product.buy_url}>
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
