"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface PageData {
  [sectionKey: string]: Record<string, string>;
}

const defaultSkills = [
  { label: "Model", icon: "👗" },
  { label: "Singer", icon: "🎤" },
  { label: "Piano", icon: "🎹" },
  { label: "Guitar", icon: "🎸" },
  { label: "Fashion", icon: "✨" },
  { label: "Lifestyle", icon: "🌸" },
];

export default function AboutContent() {
  const [data, setData] = useState<PageData>({});

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("page_contents")
      .select("*")
      .eq("page_key", "about")
      .then(({ data: rows }) => {
        const map: PageData = {};
        (rows || []).forEach((r: { section_key: string; content_json: Record<string, string> }) => {
          map[r.section_key] = r.content_json;
        });
        setData(map);
      });
  }, []);

  const intro = data.intro || {};
  const story = data.story || {};
  const skillsData = data.skills || {};

  const portraitUrl = intro.portrait_url;
  const title = intro.title || "Câu chuyện của tôi";
  const subtitle = intro.subtitle || "Về MinhLee";
  const description = intro.description || "MinhLee là một AI fashion model được tạo ra từ công nghệ generative AI. Cô yêu thời trang, âm nhạc và những khoảnh khắc đời sống trong thành phố.";
  const storyContent = story.content || "Với đam mê nghệ thuật và phong cách sống hiện đại, MinhLee mang đến một góc nhìn mới mẻ về thời trang, âm nhạc và văn hóa đô thị. Mỗi hình ảnh, mỗi khoảnh khắc đều là một câu chuyện được kể bằng ngôn ngữ thị giác tinh tế.";

  const skillsList = skillsData.skills_list
    ? skillsData.skills_list.split("\n").filter(Boolean).map((s) => ({ label: s.trim(), icon: "✦" }))
    : defaultSkills;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Portrait */}
            <AnimatedSection direction="left">
              <div className="mx-auto max-w-md lg:mx-0">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 shadow-2xl shadow-gold/5">
                  {portraitUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={portraitUrl}
                      alt="MinhLee Portrait"
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }}
                    />
                  ) : null}
                  <div className={`placeholder-gradient-gold flex h-full w-full flex-col items-center justify-end pb-8 ${portraitUrl ? "hidden" : ""}`}>
                    <div className="mb-6 text-6xl opacity-20">&#10022;</div>
                    <span className="text-sm uppercase tracking-[0.3em] text-white/30">
                      MinhLee Portrait
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Story */}
            <AnimatedSection delay={0.2} direction="right">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-gold">
                    {subtitle}
                  </p>
                  <h1 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                    {title.includes(" ") ? (
                      <>
                        {title.split(" ").slice(0, -2).join(" ")}{" "}
                        <span className="text-gradient-gold">{title.split(" ").slice(-2).join(" ")}</span>
                      </>
                    ) : (
                      <span className="text-gradient-gold">{title}</span>
                    )}
                  </h1>
                </div>

                <div className="h-px w-16 bg-gold/40" />

                <p className="max-w-lg text-lg leading-relaxed text-white/70">
                  {description}
                </p>

                <p className="max-w-lg text-base leading-relaxed text-white/50">
                  {storyContent}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Skills Section */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
                {skillsData.title || "Kỹ năng"}
              </p>
              <h2 className="font-display text-3xl md:text-4xl">
                Đa tài & Sáng tạo
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {skillsList.map((skill, i) => (
              <AnimatedSection key={skill.label} delay={i * 0.1}>
                <div className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.04]">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-lg group-hover:shadow-gold/10">
                    <span className="transition-colors group-hover:text-gold">
                      {skill.icon}
                    </span>
                  </div>
                  <h3 className="font-display text-lg tracking-wide text-white/80 transition-colors group-hover:text-gold">
                    {skill.label}
                  </h3>
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
