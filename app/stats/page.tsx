import type { Metadata } from "next";
import { BrandMark,Icon } from "../../components/MindPlayUI";
import StatsDashboard from "../../components/StatsDashboard";
export const metadata:Metadata={title:"สถิติ",description:"สถิติการเข้าชม ยอดเล่น และเกมยอดนิยมของ MindPlay"};
export default function StatsPage(){
 return <main className="stats-page">
  <header className="stats-header"><a className="round-icon-button" href="/" aria-label="กลับหน้าหลัก"><Icon name="arrowLeft"/></a><a className="mind-game-brand" href="/"><BrandMark compact/><span>สถิติ MindPlay</span></a><span className="stats-live-dot" aria-hidden="true"/></header>
  <section className="stats-hero"><p className="eyebrow">Supabase Analytics</p><h1>สถิติการเล่นจริงของ MindPlay</h1><p>ดูยอดเข้าชม จำนวนรอบที่เริ่มเล่น อัตราเล่นจนจบ เกมที่ได้รับความนิยม และผลตอบรับตรง/ไม่ตรง โดยไม่ต้องใช้ระบบสมาชิก</p></section>
  <StatsDashboard/>
  <footer className="stats-footer">ข้อมูลเป็นสถิติแบบไม่ระบุตัวตน และอาจมีความคลาดเคลื่อนจากการป้องกันการนับซ้ำ</footer>
 </main>;
}
