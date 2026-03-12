import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "MinhLee | MinhLee Picks",
  description:
    "Bộ sưu tập sản phẩm được MinhLee tuyển chọn - thời trang, làm đẹp và phong cách sống.",
};

const products = [
  {
    id: 1,
    name: "Túi xách thời trang",
    description:
      "Túi xách da cao cấp với thiết kế hiện đại, phù hợp mọi phong cách.",
    price: "2.490.000₫",
  },
  {
    id: 2,
    name: "Kính mát cao cấp",
    description:
      "Kính mát phong cách retro với tròng kính chống UV400, bảo vệ đôi mắt.",
    price: "1.290.000₫",
  },
  {
    id: 3,
    name: "Đồng hồ thanh lịch",
    description:
      "Đồng hồ mặt tròn cổ điển, dây da thật, phong cách thanh lịch.",
    price: "3.890.000₫",
  },
  {
    id: 4,
    name: "Son môi sang trọng",
    description:
      "Son môi lì cao cấp với công thức dưỡng ẩm, màu sắc bền suốt ngày dài.",
    price: "590.000₫",
  },
  {
    id: 5,
    name: "Nước hoa quyến rũ",
    description:
      "Nước hoa với hương thơm thanh lịch, kết hợp hoa hồng và gỗ đàn hương.",
    price: "1.890.000₫",
  },
  {
    id: 6,
    name: "Giày cao gót",
    description:
      "Giày cao gót 8cm thiết kế tinh tế, thoải mái cho cả ngày dài.",
    price: "1.690.000₫",
  },
];

export default function MinhLeePicksPage() {
  return (
    <div className="min-h-screen">
      <section className="px-6 pt-32 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
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

          {/* Products Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.1}>
                <div className="group h-full border border-white/10 bg-white/[0.02] transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5">
                  {/* Image placeholder */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <div className="placeholder-gradient-gold h-full w-full transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mb-2 text-4xl opacity-20">&#10022;</div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/20">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-4 p-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-wide transition-colors group-hover:text-gold">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-display text-xl text-gold">
                        {product.price}
                      </span>
                      <Button variant="outline" size="sm" href="#">
                        Mua ngay
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
