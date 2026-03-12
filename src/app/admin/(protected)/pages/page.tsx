"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const PAGE_TABS = [
  { key: "home", label: "Trang chủ" },
  { key: "about", label: "Giới thiệu" },
  { key: "collaboration", label: "Hợp tác" },
];

interface SectionDef {
  section_key: string;
  label: string;
  fields: { key: string; label: string; type: "text" | "textarea" }[];
}

const PAGE_SECTIONS: Record<string, SectionDef[]> = {
  home: [
    {
      section_key: "hero",
      label: "Hero Banner",
      fields: [
        { key: "title", label: "Tiêu đề chính", type: "text" },
        { key: "subtitle", label: "Phụ đề", type: "text" },
        { key: "cta_text", label: "Nút CTA", type: "text" },
      ],
    },
    {
      section_key: "featured_video",
      label: "Video mới",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "subtitle", label: "Phụ đề", type: "text" },
      ],
    },
    {
      section_key: "music",
      label: "Âm nhạc",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "subtitle", label: "Phụ đề", type: "text" },
      ],
    },
    {
      section_key: "affiliate",
      label: "MinhLee Picks",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "subtitle", label: "Phụ đề", type: "text" },
      ],
    },
    {
      section_key: "tiktok_banner",
      label: "TikTok Banner",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "subtitle", label: "Phụ đề", type: "text" },
        { key: "cta_text", label: "Nút CTA", type: "text" },
      ],
    },
  ],
  about: [
    {
      section_key: "intro",
      label: "Giới thiệu",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "subtitle", label: "Phụ đề", type: "text" },
        { key: "description", label: "Mô tả", type: "textarea" },
        { key: "portrait_url", label: "URL ảnh đại diện", type: "text" },
      ],
    },
    {
      section_key: "story",
      label: "Câu chuyện",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "content", label: "Nội dung", type: "textarea" },
      ],
    },
    {
      section_key: "skills",
      label: "Kỹ năng",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "skills_list", label: "Danh sách kỹ năng (mỗi dòng 1 kỹ năng)", type: "textarea" },
      ],
    },
  ],
  collaboration: [
    {
      section_key: "intro",
      label: "Giới thiệu hợp tác",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "subtitle", label: "Phụ đề", type: "text" },
        { key: "description", label: "Mô tả chi tiết", type: "textarea" },
      ],
    },
    {
      section_key: "services",
      label: "Dịch vụ",
      fields: [
        { key: "title", label: "Tiêu đề", type: "text" },
        { key: "services_list", label: "Danh sách dịch vụ (mỗi dòng 1 dịch vụ)", type: "textarea" },
      ],
    },
    {
      section_key: "stats",
      label: "Thống kê",
      fields: [
        { key: "followers", label: "Số followers", type: "text" },
        { key: "engagement_rate", label: "Tỷ lệ engagement", type: "text" },
        { key: "brands_collab", label: "Số brand đã hợp tác", type: "text" },
      ],
    },
  ],
};

interface ContentMap {
  [pageKey: string]: {
    [sectionKey: string]: {
      id?: string;
      content_json: Record<string, string>;
    };
  };
}

export default function AdminPagesPage() {
  const [contentMap, setContentMap] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [saving, setSaving] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const supabase = createClient();

  const fetchContents = async () => {
    const { data } = await supabase.from("page_contents").select("*");
    const map: ContentMap = {};
    (data || []).forEach((item: { page_key: string; section_key: string; id: string; content_json: Record<string, string> }) => {
      if (!map[item.page_key]) map[item.page_key] = {};
      map[item.page_key][item.section_key] = {
        id: item.id,
        content_json: item.content_json,
      };
    });
    setContentMap(map);
    setLoading(false);
  };

  useEffect(() => {
    fetchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFieldValue = (sectionKey: string, fieldKey: string): string => {
    return contentMap[activePage]?.[sectionKey]?.content_json?.[fieldKey] || "";
  };

  const setFieldValue = (sectionKey: string, fieldKey: string, value: string) => {
    setContentMap((prev) => {
      const updated = { ...prev };
      if (!updated[activePage]) updated[activePage] = {};
      if (!updated[activePage][sectionKey]) {
        updated[activePage][sectionKey] = { content_json: {} };
      }
      updated[activePage][sectionKey] = {
        ...updated[activePage][sectionKey],
        content_json: {
          ...updated[activePage][sectionKey].content_json,
          [fieldKey]: value,
        },
      };
      return updated;
    });
  };

  const handleSave = async (sectionKey: string) => {
    setSaving(sectionKey);
    setSuccessMsg("");

    const entry = contentMap[activePage]?.[sectionKey];
    const content_json = entry?.content_json || {};

    if (entry?.id) {
      await supabase
        .from("page_contents")
        .update({ content_json, updated_at: new Date().toISOString() })
        .eq("id", entry.id);
    } else {
      const { data } = await supabase
        .from("page_contents")
        .insert({ page_key: activePage, section_key: sectionKey, content_json })
        .select()
        .single();
      if (data) {
        setContentMap((prev) => ({
          ...prev,
          [activePage]: {
            ...prev[activePage],
            [sectionKey]: { id: data.id, content_json },
          },
        }));
      }
    }

    setSaving(null);
    setSuccessMsg(sectionKey);
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const sections = PAGE_SECTIONS[activePage] || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Trang nội dung</h1>

      <div className="flex gap-2 mb-6">
        {PAGE_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activePage === key
                ? "bg-[#C9A96E] text-black font-semibold"
                : "bg-gray-900 text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-500">Đang tải...</div>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.section_key} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{section.label}</h3>
                {successMsg === section.section_key && (
                  <span className="text-sm text-green-400">Đã lưu!</span>
                )}
              </div>

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={getFieldValue(section.section_key, field.key)}
                        onChange={(e) => setFieldValue(section.section_key, field.key, e.target.value)}
                        rows={4}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C9A96E]"
                      />
                    ) : (
                      <input
                        type="text"
                        value={getFieldValue(section.section_key, field.key)}
                        onChange={(e) => setFieldValue(section.section_key, field.key, e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C9A96E]"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSave(section.section_key)}
                disabled={saving === section.section_key}
                className="mt-4 bg-[#C9A96E] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#D4B97A] disabled:opacity-50"
              >
                {saving === section.section_key ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
