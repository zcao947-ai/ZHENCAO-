import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function CollaborationCTA() {
  return (
    <section className="px-6 py-24 md:px-12">
      <AnimatedSection>
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/5 bg-black px-8 py-16 text-center md:px-16">
          {/* Decorative top line */}
          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Hợp tác cùng{" "}
            <span className="text-gradient-gold">MinhLee</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
            MinhLee luôn sẵn sàng hợp tác với các thương hiệu thời trang, làm đẹp và
            phong cách sống hàng đầu. Với hàng triệu lượt theo dõi trên các nền tảng
            mạng xã hội, MinhLee sẽ giúp thương hiệu của bạn tiếp cận đúng đối tượng
            khách hàng mục tiêu một cách tự nhiên và hiệu quả nhất.
          </p>

          <div className="mt-10">
            <Button href="/hop-tac" variant="primary" size="lg">
              Liên hệ hợp tác
            </Button>
          </div>

          {/* Decorative bottom line */}
          <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </AnimatedSection>
    </section>
  );
}
