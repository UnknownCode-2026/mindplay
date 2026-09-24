import type { Metadata,Viewport } from "next";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/home.css";
import "../styles/game.css";
import "../styles/motion.css";
import "../styles/responsive.css";

export const metadata:Metadata={
 title:{default:"MindPlay — เกมมายากลและทายใจ",template:"%s | MindPlay"},
 description:"คิดไพ่ ตัวเลข สัญลักษณ์ หรือคำไว้ในใจ แล้วลองให้ MindPlay ทาย เล่นฟรีบนมือถือ แท็บเล็ต และคอมพิวเตอร์",
 metadataBase:new URL("https://mindplay-silk.vercel.app"),
 openGraph:{title:"MindPlay — เกมมายากลและทายใจ",description:"คิดอะไรไว้ในใจ แล้วลองซ่อนมันจาก MindPlay",url:"https://mindplay-silk.vercel.app",siteName:"MindPlay",locale:"th_TH",type:"website"}
};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#070a12"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>}
