"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
    setFormData({ name: "", email: "", message: "" });
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

      <div>
        <label className="mb-2 block text-sm uppercase tracking-wider text-white/40">
          Nội dung
        </label>
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Nhập nội dung tin nhắn..."
          rows={6}
          className={cn(inputClasses, "resize-none")}
          required
        />
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Gửi tin nhắn
        </Button>
      </div>
    </form>
  );
}
