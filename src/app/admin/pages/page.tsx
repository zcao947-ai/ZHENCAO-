"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PageContent } from "@/types/database";

const PAGE_LABELS: Record<string, string> = {
  home: "Trang chủ",
  about: "Giới thiệu",
  collaboration: "Hợp tác",
};

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero Banner",
  featured_video: "Video nổi bật",
  portfolio_preview: "Portfolio Preview",
  music: "Âm nhạc",
  affiliate: "Affiliate Picks",
  collab_cta: "CTA Hợp tác",
  tiktok_banner: "TikTok Banner",
  intro: "Giới thiệu",
  skills: "Kỹ năng",
};

export default function AdminPagesPage() {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [editingItem, setEditingItem] = useState<PageContent | null>(null);
  const [editJson, setEditJson] = useState("");

  const supabase = createClient();

  const fetchContents = async () => {
    const { data } = await supabase.from("page_contents").select("*").order("page_key");
    setContents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = contents.filter((c) => c.page_key === activePage);

  const handleEdit = (item: PageContent) => {
    setEditingItem(item);
    setEditJson(JSON.stringify(item.content_json, null, 2));
  };

  const handleSave = async () => {
    if (!editingItem) return;
    try {
      const parsed = JSON.parse(editJson);
      await supabase
        .from("page_contents")
        .update({ content_json: parsed, updated_at: new Date().toISOString() })
        .eq("id", editingItem.id);
      setEditingItem(null);
      fetchContents();
    } catch {
      alert("JSON không hợp lệ. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Trang nội dung</h1>

      {/* Page tabs */}
      <div className="flex gap-2 mb-6">
        {Object.entries(PAGE_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activePage === key ? "bg-[#C9A96E] text-black font-semibold" : "bg-gray-900 text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Edit modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">
              Chỉnh sửa: {SECTION_LABELS[editingItem.section_key] || editingItem.section_key}
            </h2>
            <p className="text-sm text-gray-500 mb-4">Trang: {PAGE_LABELS[editingItem.page_key] || editingItem.page_key}</p>
            <textarea
              value={editJson}
              onChange={(e) => setEditJson(e.target.value)}
              rows={15}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#C9A96E]"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleSave} className="bg-[#C9A96E] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#D4B97A]">
                Lưu
              </button>
              <button onClick={() => setEditingItem(null)} className="px-6 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Đang tải...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Chưa có nội dung nào cho trang này. Hãy chạy seed data trong Supabase.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">
                  {SECTION_LABELS[item.section_key] || item.section_key}
                </h3>
                <button onClick={() => handleEdit(item)} className="text-sm text-[#C9A96E] hover:underline">
                  Chỉnh sửa
                </button>
              </div>
              <pre className="text-xs text-gray-500 bg-gray-800 rounded-lg p-3 overflow-x-auto">
                {JSON.stringify(item.content_json, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
