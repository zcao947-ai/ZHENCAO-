import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function TikTokBanner() {
  return (
    <section className="px-6 py-16 md:px-12">
      <AnimatedSection>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl">
          {/* Gold gradient accent background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5" />

          {/* Top gold line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          {/* Bottom gold line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <div className="relative flex flex-col items-center gap-6 px-8 py-12 text-center md:flex-row md:justify-between md:px-16 md:text-left">
            <div>
              {/* TikTok icon */}
              <div className="mb-3 flex items-center justify-center gap-3 md:justify-start">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-gold/60"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z" />
                </svg>
                <span className="text-xs uppercase tracking-[0.2em] text-gold/60">
                  TikTok
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold md:text-4xl">
                Follow <span className="text-gradient-gold">MinhLee</span> trên TikTok
              </h2>
              <p className="mt-2 text-sm text-white/40">
                Cập nhật video mới nhất mỗi ngày
              </p>
            </div>

            <Button
              href="https://www.tiktok.com/@minh.lee.nhaconoc?_r=1&_t=ZS-94d4yjNOeYe"
              variant="outline"
              size="lg"
            >
              Follow Now
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
