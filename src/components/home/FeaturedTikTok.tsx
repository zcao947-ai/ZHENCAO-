import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FeaturedTikTok() {
  return (
    <AnimatedSection className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Video mới từ{" "}
          <span className="text-gradient-gold">MinhLee</span>
        </h2>
        <p className="mt-4 text-white/50">
          Những video mới nhất từ TikTok của MinhLee
        </p>

        {/* TikTok embed placeholder */}
        <div className="mx-auto mt-12 max-w-lg">
          <div className="placeholder-gradient-gold relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/5">
            {/* Play icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-colors hover:bg-gold/20">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 text-gold"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-sm uppercase tracking-widest text-white/40">
                TikTok Video
              </span>
            </div>

            {/* Decorative elements - simulating TikTok UI */}
            <div className="absolute right-4 top-4 flex flex-col gap-3">
              <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
              <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
              <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="h-3 w-24 rounded-full bg-white/10" />
              <div className="mt-2 h-2 w-40 rounded-full bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
