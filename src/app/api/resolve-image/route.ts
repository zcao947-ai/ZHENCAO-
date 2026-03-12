import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  // If already a direct image link, return as-is
  if (/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url) || url.includes("i.ibb.co")) {
    return NextResponse.json({ image_url: url });
  }

  try {
    // Fetch the page and extract og:image or direct image URL
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; bot)" },
      redirect: "follow",
    });
    const html = await res.text();

    // Try og:image first
    const ogMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)
      || html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/i);
    if (ogMatch) {
      return NextResponse.json({ image_url: ogMatch[1] });
    }

    // Try twitter:image
    const twMatch = html.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i)
      || html.match(/<meta\s+content="([^"]+)"\s+name="twitter:image"/i);
    if (twMatch) {
      return NextResponse.json({ image_url: twMatch[1] });
    }

    // Try finding i.ibb.co link in page
    const ibbMatch = html.match(/(https:\/\/i\.ibb\.co\/[^\s"'<>]+)/);
    if (ibbMatch) {
      return NextResponse.json({ image_url: ibbMatch[1] });
    }

    return NextResponse.json({ error: "Could not find image URL", image_url: url });
  } catch {
    return NextResponse.json({ error: "Failed to fetch", image_url: url }, { status: 500 });
  }
}
