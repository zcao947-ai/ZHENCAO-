import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

const products = [
  {
    name: "Túi xách thời trang",
    description: "Túi xách da cao cấp, thiết kế tinh tế và sang trọng cho phong cách hiện đại.",
    price: "2.490.000đ",
  },
  {
    name: "Kính mát cao cấp",
    description: "Kính mát chống UV, phong cách thời thượng phù hợp mọi dịp.",
    price: "1.290.000đ",
  },
  {
    name: "Đồng hồ thanh lịch",
    description: "Đồng hồ đeo tay tự động, dây da nhập khẩu từ Ý, thiết kế cổ điển.",
    price: "4.890.000đ",
  },
];

export default function AffiliatePreview() {
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
              key={product.name}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 transition-all duration-500 hover:border-gold/20"
            >
              {/* Placeholder image */}
              <div className="placeholder-gradient-gold relative aspect-square overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-white/20 transition-colors duration-300 group-hover:text-gold/40"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                </div>
                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>

              {/* Product info */}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-white">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-gold">
                    {product.price}
                  </span>
                  <Button variant="outline" size="sm">
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
