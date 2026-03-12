"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CollaborationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder form submission
    alert("Cảm ơn bạn! Yêu cầu hợp tác đã được gửi thành công.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const inputClasses = cn(
    "w-full border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white",
    "placeholder:text-white/30 transition-all duration-300",
    "focus:border-gold/50 focus:bg-white/[0.05] focus:outline-none"
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border border-white/10 bg-white/[0.02] p-8 md:p-12"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm uppercase tracking-wider text-white/40">
            Tên
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Nhập tên của bạn"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm uppercase tracking-wider text-white/40">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="email@example.com"
            className={inputClasses}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm uppercase tracking-wider text-white/40">
          Chủ đề hợp tác
        </label>
        <select
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className={cn(inputClasses, "appearance-none cursor-pointer")}
          required
        >
          <option value="" className="bg-black">
            Chọn chủ đề hợp tác
          </option>
          <option value="fashion-campaign" className="bg-black">
            Chiến dịch thời trang
          </option>
          <option value="product-review" className="bg-black">
            Đánh giá sản phẩm
          </option>
          <option value="brand-ambassador" className="bg-black">
            Đại sứ thương hiệu
          </option>
          <option value="social-media" className="bg-black">
            Quảng bá mạng xã hội
          </option>
          <option value="other" className="bg-black">
            Khác
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm uppercase tracking-wider text-white/40">
          Tin nhắn
        </label>
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Mô tả chi tiết về dự án hợp tác..."
          rows={6}
          className={cn(inputClasses, "resize-none")}
          required
        />
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Gửi yêu cầu hợp tác
        </Button>
      </div>
    </form>
  );
}
