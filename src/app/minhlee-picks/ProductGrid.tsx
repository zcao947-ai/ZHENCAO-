"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import type { Product } from "@/types/database";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-white/40">Đang tải...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-white/40">
        Chưa có sản phẩm nào.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <AnimatedSection key={product.id} delay={i * 0.1}>
          <div className="group h-full border border-white/10 bg-white/[0.02] transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5">
            {/* Product image */}
            <div className="relative aspect-square w-full overflow-hidden">
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }}
                />
              ) : null}
              <div className={`placeholder-gradient-gold h-full w-full transition-transform duration-700 group-hover:scale-105 ${product.image_url ? "hidden" : ""}`} />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 p-6">
              <div>
                <h3 className="font-display text-lg font-semibold tracking-wide transition-colors group-hover:text-gold">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {product.description}
                  </p>
                )}
              </div>
              <div className="mt-auto flex items-center justify-between">
                {product.price && (
                  <span className="font-display text-xl text-gold">
                    {product.price}
                  </span>
                )}
                <Button variant="outline" size="sm" href={product.buy_url}>
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
