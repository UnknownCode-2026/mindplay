import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindPlay — ศูนย์รวมเกมอ่านใจ",
  description: "ศูนย์รวมเกมอ่านใจภาษาไทย เล่นฟรี ไม่ต้องสมัครสมาชิก เล่นผ่านเว็บไซต์บนมือถือ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080510",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}