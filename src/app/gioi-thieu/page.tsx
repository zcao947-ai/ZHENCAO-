import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "MinhLee | Giới Thiệu",
  description:
    "Tìm hiểu về MinhLee - AI fashion model, ca sĩ và nhà sáng tạo nội dung số.",
};

export default function GioiThieuPage() {
  return <AboutContent />;
}
