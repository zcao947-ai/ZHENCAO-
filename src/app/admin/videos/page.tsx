"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Video } from "@/types/database";

export default function AdminVideosPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Video | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    video_url: "",
    tiktok_url: "",
    thumbnail_url: "",
    type: "tiktok" as string,
    is_featured: false,
    is_published: true,
    display_order: 0,
  });

  const supabase = createClient();

  const fetchItems = async () => {
    const { data } = await supabase.from("videos").select("*").order("display_order");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", video_url: "", tiktok_url: "", thumbnail_url: "", type: "tiktok", is_featured: false, is_published: true, display_order: 0 });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: Video) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description || "",
      video_url: item.video_url || "",
      tiktok_url: item.tiktok_url || "",
      thumbnail_url: item.thumbnail_url || "",
      type: item.type,
      is_featured: item.is_featured,
      is_published: item.is_published,
      display_order: item.display_order,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { alert("Vui lòng nhập tiêu đề."); return; }

    if (editingItem) {
      await supabase.from("videos").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editingItem.id);
    } else {
      await supabase.from("videos").insert(form);
    }
    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa?")) return;
    await supabase.from("videos").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý Video</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#C9A96E] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#D4B97A]">
          + Thêm video
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingItem ? "Chỉnh sửa video" : "Thêm video mới"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tiêu đề *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Mô tả</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Loại</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]">
                  <option value="tiktok">TikTok</option>
                  <option value="music">Âm nhạc</option>
                  <option value="ai">AI</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Link TikTok</label>
                <input type="url" value={form.tiktok_url} onChange={(e) => setForm({ ...form, tiktok_url: e.target.value })} placeholder="https://tiktok.com/..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">URL Video (upload hoặc link)</label>
                <input type="url" value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">URL Thumbnail</label>
                <input type="url" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Thứ tự</label>
                <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-[#C9A96E]" />
                  <span className="text-sm text-gray-400">Hiển thị</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-[#C9A96E]" />
                  <span className="text-sm text-gray-400">Nổi bật</span>
                </label>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-[#C9A96E] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#D4B97A]">{editingItem ? "Cập nhật" : "Thêm"}</button>
                <button type="button" onClick={resetForm} className="px-6 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Đang tải...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Chưa có video nào.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-400 flex gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-gray-800 rounded text-xs">{item.type}</span>
                  {item.is_featured && <span className="px-2 py-0.5 bg-[#C9A96E]/20 text-[#C9A96E] rounded text-xs">Nổi bật</span>}
                  <span className={`px-2 py-0.5 rounded text-xs ${item.is_published ? "bg-green-900 text-green-400" : "bg-gray-800 text-gray-500"}`}>
                    {item.is_published ? "Công khai" : "Ẩn"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="text-xs text-[#C9A96E] hover:underline">Sửa</button>
                <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:underline">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
