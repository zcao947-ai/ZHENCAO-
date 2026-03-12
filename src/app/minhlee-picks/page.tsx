import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductGrid from "./ProductGrid";

export const metadata: Metadata = {
  title: "MinhLee | MinhLee Picks",
  description:
    "Bộ sưu tập sản phẩm được MinhLee tuyển chọn - thời trang, làm đẹp và phong cách sống.",
};

export default function MinhLeePicksPage() {
  return (
    <div className="min-h-screen">
      <section className="px-6 pt-32 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
                Tuyển chọn
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">
                MinhLee Picks
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-white/50">
                Những sản phẩm yêu thích được MinhLee tuyển chọn kỹ lưỡng
                dành riêng cho bạn
              </p>
              <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
            </div>
          </AnimatedSection>

          <ProductGrid />
        </div>
      </section>
    </div>
  );
}
