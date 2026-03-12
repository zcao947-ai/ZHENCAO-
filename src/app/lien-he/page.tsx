import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "MinhLee | Liên Hệ",
  description: "Liên hệ với MinhLee - AI fashion model và nhà sáng tạo nội dung số.",
};

const contactInfo = [
  {
    label: "Email",
    value: "hello@minhlee.ai",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@minhlee.ai",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    value: "@minhlee.ai",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.15V11.7a4.84 4.84 0 01-3.77-1.78V6.69h3.77z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    value: "MinhLee AI",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function LienHePage() {
  return (
    <div className="min-h-screen">
      <section className="px-6 pt-32 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
                Liên hệ
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">
                Liên hệ với{" "}
                <span className="text-gradient-gold">MinhLee</span>
              </h1>
              <p className="mt-6 text-lg text-white/50">
                Bạn có câu hỏi hoặc muốn kết nối? Hãy gửi tin nhắn cho MinhLee.
              </p>
              <div className="mx-auto mt-8 h-px w-16 bg-gold/40" />
            </div>
          </AnimatedSection>

          {/* Content Grid */}
          <div className="mt-20 grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="left">
                <ContactForm />
              </AnimatedSection>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="right" delay={0.2}>
                <div className="space-y-8 border border-white/10 bg-white/[0.02] p-8 md:p-10">
                  <div>
                    <h2 className="font-display text-2xl font-semibold">
                      Thông tin liên hệ
                    </h2>
                    <div className="mt-3 h-px w-12 bg-gold/40" />
                  </div>

                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="group flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/5 text-white/50 transition-all duration-300 group-hover:border-gold/30 group-hover:text-gold">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-white/40">
                            {info.label}
                          </p>
                          <p className="mt-1 text-white/70 transition-colors group-hover:text-gold">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/5 pt-8">
                    <p className="text-sm leading-relaxed text-white/40">
                      MinhLee thường phản hồi trong vòng 24-48 giờ. Đối với
                      các yêu cầu hợp tác, vui lòng sử dụng trang{" "}
                      <a href="/hop-tac" className="text-gold transition-colors hover:text-gold-light">
                        Hợp tác
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
