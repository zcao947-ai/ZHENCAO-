import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
    );
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch oEmbed" }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json({
      thumbnail_url: data.thumbnail_url || null,
      title: data.title || null,
      author_name: data.author_name || null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
