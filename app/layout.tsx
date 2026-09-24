import type { Metadata } from "next";import "./globals.css";
export const metadata: Metadata={title:{default:"MindPlay — ศูนย์รวมเกมอ่านใจ",template:"%s | MindPlay"},description:"เกมอ่านใจและเกมท้าทายความคิดภาษาไทย เล่นฟรีบนมือถือ แท็บเล็ต และคอมพิวเตอร์",metadataBase:new URL("https://mindplay-silk.vercel.app"),openGraph:{title:"MindPlay — ศูนย์รวมเกมอ่านใจ",description:"คิดไว้ในใจ แล้วดูว่าคุณจะจับทาง MindPlay ได้ไหม",url:"https://mindplay-silk.vercel.app",siteName:"MindPlay",locale:"th_TH",type:"website"}};
export const viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#090812"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>}
