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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, contact_type: "general" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Có lỗi xảy ra.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Không thể kết nối. Vui lòng thử lại.");
      setStatus("error");
    }
  };

  const inputClasses = cn(
    "w-full border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white",
    "placeholder:text-white/30 transition-all duration-300",
    "focus:border-gold/50 focus:bg-white/[0.05] focus:outline-none"
  );

  if (status === "success") {
    return (
      <div className="border border-gold/20 bg-gold/5 p-8 text-center md:p-12">
        <div className="mb-4 text-4xl">&#10003;</div>
        <h3 className="font-display text-xl text-gold">Cảm ơn bạn!</h3>
        <p className="mt-2 text-white/60">Tin nhắn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-gold underline underline-offset-4 hover:text-gold/80"
        >
          Gửi tin nhắn khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border border-white/10 bg-white/[0.02] p-8 md:p-12"
    >
      {status === "error" && (
        <div className="border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </div>
      )}

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
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Đang gửi..." : "Gửi tin nhắn"}
        </Button>
      </div>
    </form>
  );
}
