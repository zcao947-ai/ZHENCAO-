"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const SETTING_LABELS: Record<string, string> = {
  site_title: "Tên website",
  site_description: "Mô tả website",
  email: "Email liên hệ",
  tiktok_url: "TikTok URL",
  facebook_url: "Facebook URL",
  instagram_url: "Instagram URL",
  ai_disclaimer: "Disclaimer AI",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from("site_settings").select("*");
      const map: Record<string, string> = {};
      data?.forEach((s) => {
        map[s.key] = s.value;
      });
      setSettings(map);
      setLoading(false);
    }
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase
        .from("site_settings")
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
    }
    setSaving(false);
    alert("Đã lưu cài đặt!");
  };

  if (loading) return <div className="text-gray-500">Đang tải...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Cài đặt</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#C9A96E] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#D4B97A] disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "Lưu cài đặt"}
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
        {Object.entries(SETTING_LABELS).map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm text-gray-400 mb-2">{label}</label>
            {key === "ai_disclaimer" ? (
              <textarea
                value={settings[key] || ""}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
              />
            ) : (
              <input
                type={key.includes("url") ? "url" : key === "email" ? "email" : "text"}
                value={settings[key] || ""}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
