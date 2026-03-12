import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import VideoGallery from "./VideoGallery";

export const metadata: Metadata = {
  title: "MinhLee | Video",
  description:
    "Xem các video về thời trang, âm nhạc và hành trình sáng tạo AI của MinhLee.",
};

export default function VideoPage() {
  return (
    <div className="min-h-screen">
      <section className="px-6 pt-32 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <AnimatedSection>
            <div className="mb-16 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
                Video
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">
                Video
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-white/50">
                Xem các video về thời trang, âm nhạc và hành trình sáng tạo AI
                của MinhLee
              </p>
            </div>
          </AnimatedSection>

          <VideoGallery />
        </div>
      </section>
    </div>
  );
}
