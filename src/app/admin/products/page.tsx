"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Product } from "@/types/database";

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
    buy_url: "",
    price: "",
    is_published: true,
    display_order: 0,
  });

  const supabase = createClient();

  const fetchItems = async () => {
    const { data } = await supabase.from("products").select("*").order("display_order");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm({ name: "", description: "", image_url: "", buy_url: "", price: "", is_published: true, display_order: 0 });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: Product) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description || "",
      image_url: item.image_url,
      buy_url: item.buy_url,
      price: item.price || "",
      is_published: item.is_published,
      display_order: item.display_order,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.buy_url) { alert("Vui lòng điền tên và link mua hàng."); return; }

    if (editingItem) {
      await supabase.from("products").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editingItem.id);
    } else {
      await supabase.from("products").insert(form);
    }
    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý Sản phẩm Affiliate</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#C9A96E] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#D4B97A]">
          + Thêm sản phẩm
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingItem ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ảnh sản phẩm</label>
                <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} bucket="products" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tên sản phẩm *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Mô tả</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Giá</label>
                <input type="text" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="299.000đ" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Link mua hàng *</label>
                <input type="url" value={form.buy_url} onChange={(e) => setForm({ ...form, buy_url: e.target.value })} placeholder="https://shopee.vn/..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Thứ tự</label>
                <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-[#C9A96E]" />
                <label className="text-sm text-gray-400">Hiển thị công khai</label>
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
        <div className="text-center py-12 text-gray-500">Chưa có sản phẩm nào.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="aspect-square bg-gray-800 relative">
                {item.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <div className="font-semibold">{item.name}</div>
                {item.price && <div className="text-[#C9A96E] text-sm mt-1">{item.price}</div>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(item)} className="text-xs text-[#C9A96E] hover:underline">Sửa</button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:underline">Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
