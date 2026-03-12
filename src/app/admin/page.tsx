"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Stats {
  portfolio: number;
  videos: number;
  products: number;
  contacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ portfolio: 0, videos: 0, products: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      const [portfolioRes, videosRes, productsRes, contactsRes] = await Promise.all([
        supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
        supabase.from("videos").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("contacts").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);
      setStats({
        portfolio: portfolioRes.count || 0,
        videos: videosRes.count || 0,
        products: productsRes.count || 0,
        contacts: contactsRes.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Portfolio", value: stats.portfolio, href: "/admin/portfolio", color: "bg-blue-900/20 border-blue-800" },
    { label: "Video", value: stats.videos, href: "/admin/videos", color: "bg-purple-900/20 border-purple-800" },
    { label: "Sản phẩm", value: stats.products, href: "/admin/products", color: "bg-green-900/20 border-green-800" },
    { label: "Tin nhắn chưa đọc", value: stats.contacts, href: "/admin/contacts", color: "bg-yellow-900/20 border-yellow-800" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`border rounded-xl p-6 hover:opacity-80 transition-opacity ${card.color}`}
          >
            <div className="text-3xl font-bold mb-1">
              {loading ? "..." : card.value}
            </div>
            <div className="text-sm text-gray-400">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Thao tác nhanh</h2>
          <div className="space-y-2">
            <Link href="/admin/portfolio" className="block text-[#C9A96E] hover:underline">
              + Thêm ảnh portfolio
            </Link>
            <Link href="/admin/videos" className="block text-[#C9A96E] hover:underline">
              + Thêm video mới
            </Link>
            <Link href="/admin/products" className="block text-[#C9A96E] hover:underline">
              + Thêm sản phẩm affiliate
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Hướng dẫn</h2>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>1. Thêm ảnh vào Portfolio để hiển thị trên trang chủ</li>
            <li>2. Thêm video TikTok hoặc upload video</li>
            <li>3. Thêm sản phẩm affiliate với link Shopee/TikTok Shop</li>
            <li>4. Chỉnh sửa nội dung các trang trong mục &quot;Trang nội dung&quot;</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
