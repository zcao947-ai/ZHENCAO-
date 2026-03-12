-- ============================================
-- MinhLee Portfolio Website - Database Schema
-- ============================================

-- Portfolio Items
CREATE TABLE portfolio_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL CHECK (category IN ('fashion', 'lifestyle', 'street', 'editorial')),
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Videos
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  tiktok_url TEXT,
  thumbnail_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('tiktok', 'music', 'ai', 'other')),
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Products (Affiliate)
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  buy_url TEXT NOT NULL,
  price TEXT,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contact Messages
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  contact_type TEXT DEFAULT 'general' CHECK (contact_type IN ('general', 'collaboration')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Page Contents (CMS)
CREATE TABLE page_contents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content_json JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(page_key, section_key)
);

-- Site Settings
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Hero Settings
CREATE TABLE hero_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  media_type TEXT NOT NULL CHECK (media_type IN ('video', 'image')),
  media_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_portfolio_published ON portfolio_items(is_published, display_order);
CREATE INDEX idx_videos_published ON videos(is_published, display_order);
CREATE INDEX idx_videos_featured ON videos(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_published ON products(is_published, display_order);
CREATE INDEX idx_contacts_unread ON contacts(is_read) WHERE is_read = false;
CREATE INDEX idx_page_contents_lookup ON page_contents(page_key, section_key);
CREATE INDEX idx_hero_active ON hero_settings(is_active, display_order);

-- ============================================
-- Row Level Security
-- ============================================

-- Portfolio Items
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published portfolio" ON portfolio_items
  FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access portfolio" ON portfolio_items
  FOR ALL USING (auth.role() = 'authenticated');

-- Videos
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published videos" ON videos
  FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access videos" ON videos
  FOR ALL USING (auth.role() = 'authenticated');

-- Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published products" ON products
  FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read contacts" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update contacts" ON contacts
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete contacts" ON contacts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Page Contents
ALTER TABLE page_contents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read page contents" ON page_contents
  FOR SELECT USING (true);
CREATE POLICY "Admin full access page contents" ON page_contents
  FOR ALL USING (auth.role() = 'authenticated');

-- Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site settings" ON site_settings
  FOR SELECT USING (true);
CREATE POLICY "Admin full access site settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Hero Settings
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active hero" ON hero_settings
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access hero" ON hero_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Storage Buckets (run in Supabase Dashboard)
-- ============================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true);

-- ============================================
-- Seed Data
-- ============================================

-- Site Settings
INSERT INTO site_settings (key, value) VALUES
  ('site_title', 'MinhLee'),
  ('site_description', 'AI Model - Fashion Muse - Digital Creator'),
  ('email', 'contact@minhlee.com'),
  ('tiktok_url', 'https://tiktok.com/@minhlee'),
  ('facebook_url', 'https://facebook.com/minhlee'),
  ('instagram_url', 'https://instagram.com/minhlee'),
  ('ai_disclaimer', 'MinhLee la nhan vat AI duoc tao bang cong nghe generative AI.');

-- Page Contents
INSERT INTO page_contents (page_key, section_key, content_json) VALUES
  ('home', 'hero', '{"title": "MinhLee", "subtitle": "AI Model \u2022 Fashion Muse \u2022 Digital Creator", "cta_primary": "Kham pha Portfolio", "cta_secondary": "Xem TikTok"}'),
  ('home', 'featured_video', '{"title": "Video moi tu MinhLee"}'),
  ('home', 'portfolio_preview', '{"title": "Portfolio", "cta": "Xem Portfolio"}'),
  ('home', 'music', '{"title": "MinhLee & Am Nhac"}'),
  ('home', 'affiliate', '{"title": "MinhLee Picks"}'),
  ('home', 'collab_cta', '{"title": "Hop tac cung MinhLee", "description": "MinhLee san sang hop tac voi cac thuong hieu thoi trang, lifestyle va cong nghe cho cac chien dich digital va quang ba san pham.", "cta": "Lien he hop tac"}'),
  ('home', 'tiktok_banner', '{"title": "Follow MinhLee tren TikTok", "cta": "Follow Now"}'),
  ('about', 'intro', '{"title": "MinhLee", "story": "MinhLee la mot AI fashion model duoc tao ra tu cong nghe generative AI. Co yeu thoi trang, am nhac va nhung khoanh khac doi song trong thanh pho."}'),
  ('about', 'skills', '{"items": ["Model", "Singer", "Piano", "Guitar", "Fashion", "Lifestyle"]}'),
  ('collaboration', 'intro', '{"title": "Hop tac cung MinhLee", "description": "MinhLee hop tac trong cac linh vuc:", "services": ["Fashion campaign", "Product review", "Brand ambassador", "Social media promotion"]}');

-- Hero Settings
INSERT INTO hero_settings (media_type, media_url, title, subtitle, is_active) VALUES
  ('image', '/images/placeholder-hero.jpg', 'MinhLee', 'AI Model \u2022 Fashion Muse \u2022 Digital Creator', true);
