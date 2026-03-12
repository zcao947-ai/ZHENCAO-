import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CollaborationForm from "./CollaborationForm";

export const metadata: Metadata = {
  title: "MinhLee | Hợp Tác",
  description:
    "Hợp tác cùng MinhLee - AI fashion model và nhà sáng tạo nội dung số.",
};

const services = [
  {
    title: "Chiến dịch thời trang",
    description:
      "Hợp tác tạo nội dung hình ảnh và video cho các chiến dịch thời trang, lookbook, và editorial.",
    icon: "✦",
  },
  {
    title: "Đánh giá sản phẩm",
    description:
      "Review chân thực và chuyên nghiệp cho các sản phẩm thời trang, làm đẹp và phong cách sống.",
    icon: "◆",
  },
  {
    title: "Đại sứ thương hiệu",
    description:
      "Đại diện hình ảnh thương hiệu với phong cách sang trọng, hiện đại và thu hút.",
    icon: "❖",
  },
  {
    title: "Quảng bá mạng xã hội",
    description:
      "Tạo nội dung sáng tạo trên các nền tảng TikTok, Instagram và YouTube.",
    icon: "✧",
  },
];

export default function HopTacPage() {
  return (
    <div className="min-h-screen">
      {/* Intro Section */}
      <section className="px-6 pt-32 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
                Hợp tác
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">
                Hợp tác cùng{" "}
                <span className="text-gradient-gold">MinhLee</span>
              </h1>
              <p className="mt-6 text-lg text-white/50">
                MinhLee sẵn sàng hợp tác với các thương hiệu trong lĩnh vực
                thời trang, làm đẹp và phong cách sống. Cùng nhau tạo nên
                những nội dung sáng tạo và ấn tượng.
              </p>
              <div className="mx-auto mt-8 h-px w-16 bg-gold/40" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-white/5 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
                Dịch vụ
              </p>
              <h2 className="font-display text-3xl md:text-4xl">
                Lĩnh vực hợp tác
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className="group h-full border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.04]">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-white/5 text-2xl text-gold transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-lg group-hover:shadow-gold/10">
                    {service.icon}
                  </div>
                  <h3 className="mb-3 font-display text-xl font-semibold tracking-wide transition-colors group-hover:text-gold">
                    {service.title}
                  </h3>
                  <p className="leading-relaxed text-white/50">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="border-t border-white/5 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
                Liên hệ hợp tác
              </p>
              <h2 className="font-display text-3xl md:text-4xl">
                Gửi yêu cầu hợp tác
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <CollaborationForm />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
