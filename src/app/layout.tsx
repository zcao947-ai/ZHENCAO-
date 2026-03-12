import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "MinhLee | AI Model & Digital Creator",
  description:
    "MinhLee - Ng\u01b0\u1eddi m\u1eabu AI & Nh\u00e0 s\u00e1ng t\u1ea1o n\u1ed9i dung s\u1ed1. Kh\u00e1m ph\u00e1 th\u1ebf gi\u1edbi th\u1eddi trang, phong c\u00e1ch s\u1ed1ng v\u00e0 ngh\u1ec7 thu\u1eadt AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-black text-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
