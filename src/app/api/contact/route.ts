import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, contact_type = "general" } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contacts").insert({
      name,
      email,
      message,
      contact_type,
    });

    if (error) {
      console.error("Contact insert error:", error);
      return NextResponse.json(
        { error: "Có lỗi xảy ra. Vui lòng thử lại." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Tin nhắn đã được gửi thành công!" });
  } catch {
    return NextResponse.json(
      { error: "Có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
