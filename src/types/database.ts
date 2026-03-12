export interface PortfolioItem {
  id: string;
  image_url: string;
  caption: string | null;
  category: "fashion" | "lifestyle" | "street" | "editorial";
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  tiktok_url: string | null;
  thumbnail_url: string | null;
  type: "tiktok" | "music" | "ai" | "other";
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string;
  buy_url: string;
  price: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  contact_type: "general" | "collaboration";
  is_read: boolean;
  created_at: string;
}

export interface PageContent {
  id: string;
  page_key: string;
  section_key: string;
  content_json: Record<string, unknown>;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface HeroSetting {
  id: string;
  media_type: "video" | "image";
  media_url: string;
  title: string | null;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
