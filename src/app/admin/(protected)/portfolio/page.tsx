"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";
import type { PortfolioItem } from "@/types/database";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState({
    image_url: "",
    caption: "",
    category: "fashion" as string,
    is_published: true,
    display_order: 0,
  });

  const supabase = createClient();

  const fetchItems = async () => {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("display_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm({ image_url: "", caption: "", category: "fashion", is_published: true, display_order: 0 });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setForm({
      image_url: item.image_url,
      caption: item.caption || "",
      category: item.category,
      is_published: item.is_published,
      display_order: item.display_order,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url) {
      alert("Vui lòng upload ảnh.");
      return;
    }

    if (editingItem) {
      await supabase
        .from("portfolio_items")
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq("id", editingItem.id);
    } else {
      await supabase.from("portfolio_items").insert(form);
    }

    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa?")) return;
    await supabase.from("portfolio_items").delete().eq("id", id);
    fetchItems();
  };

  const togglePublish = async (item: PortfolioItem) => {
    await supabase
      .from("portfolio_items")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý Portfolio</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-[#C9A96E] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#D4B97A] transition-colors"
        >
          + Thêm ảnh
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? "Chỉnh sửa ảnh" : "Thêm ảnh mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ảnh</label>
                <ImageUploader
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  bucket="portfolio"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Caption</label>
                <input
                  type="text"
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                >
                  <option value="fashion">Fashion</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="street">Street</option>
                  <option value="editorial">Editorial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Thứ tự</label>
                <input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="accent-[#C9A96E]"
                />
                <label className="text-sm text-gray-400">Hiển thị công khai</label>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-[#C9A96E] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#D4B97A]">
                  {editingItem ? "Cập nhật" : "Thêm"}
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-gray-500">Đang tải...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Chưa có ảnh nào. Bấm &quot;Thêm ảnh&quot; để bắt đầu.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-gray-800 relative">
                {item.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image_url} alt={item.caption || ""} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs ${item.is_published ? "bg-green-900 text-green-400" : "bg-gray-800 text-gray-500"}`}>
                    {item.is_published ? "Công khai" : "Ẩn"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-400 mb-1">{item.category}</div>
                <div className="text-sm mb-3">{item.caption || "Không có caption"}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="text-xs text-[#C9A96E] hover:underline">
                    Sửa
                  </button>
                  <button onClick={() => togglePublish(item)} className="text-xs text-blue-400 hover:underline">
                    {item.is_published ? "Ẩn" : "Hiện"}
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:underline">
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
