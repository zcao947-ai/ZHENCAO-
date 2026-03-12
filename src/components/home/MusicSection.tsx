import AnimatedSection from "@/components/ui/AnimatedSection";

const musicItems = [
  {
    title: "MinhLee chơi Piano",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold/60"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 4v16M10 4v16M14 4v16M18 4v16" />
        <path d="M6 4v8h4V4M14 4v8h4V4" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
  {
    title: "MinhLee chơi Guitar",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold/60"
      >
        <path d="M11.5 2a2 2 0 0 1 2 2v4l3.5 3.5a5 5 0 1 1-7 7L6.5 15V8L11.5 2z" />
        <circle cx="11" cy="16" r="2" />
        <path d="M12 12v-2" />
      </svg>
    ),
  },
];

export default function MusicSection() {
  return (
    <AnimatedSection className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            MinhLee &amp;{" "}
            <span className="text-gradient-gold">Âm Nhạc</span>
          </h2>
          <p className="mt-4 text-white/50">
            Khi thời trang gặp gỡ nghệ thuật âm nhạc
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {musicItems.map((item) => (
            <div
              key={item.title}
              className="placeholder-gradient-gold group relative aspect-video overflow-hidden rounded-2xl border border-white/5 transition-all duration-500 hover:border-gold/20"
            >
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                {/* Music note decorations */}
                <div className="absolute left-6 top-6 text-gold/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="absolute right-8 top-10 text-gold/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="absolute bottom-8 left-10 text-gold/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>

                {/* Instrument icon */}
                {item.icon}

                {/* Play button */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/20">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 text-gold"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Title */}
                <p className="text-sm font-medium uppercase tracking-widest text-white/60">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
