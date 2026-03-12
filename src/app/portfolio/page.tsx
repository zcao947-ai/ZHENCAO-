import type { Metadata } from 'next';
import PortfolioGallery from './PortfolioGallery';

export const metadata: Metadata = {
  title: 'MinhLee | Portfolio',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black">
      <section className="px-6 pt-32 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
              Bộ sưu tập
            </p>
            <h1 className="font-display text-4xl text-white md:text-5xl lg:text-6xl">
              Portfolio
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-white/50">
              Khám phá thế giới thời trang và phong cách sống qua ống kính của MinhLee
            </p>
          </div>

          <PortfolioGallery />
        </div>
      </section>
    </main>
  );
}
