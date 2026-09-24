import { BrandMark,Icon } from "../components/MindPlayUI";
import HomeStats from "../components/HomeStats";
import { games } from "../data/games";

export default function Home(){
 return <main className="site-shell">
  <div className="ambient-bg" aria-hidden="true"><span/><span/><span/></div>
  <header className="site-header">
   <a className="brand" href="#top" aria-label="MindPlay หน้าแรก"><BrandMark/><span>MindPlay</span></a>
   <nav className="site-nav" aria-label="เมนูหลัก"><a href="#games">เกม</a><a href="/stats">สถิติ</a><a href="#about">เกี่ยวกับ</a></nav>
  </header>
  <section className="hero" id="top">
   <div className="hero-mark" aria-hidden="true"><i/><i/><div><Icon name="brand"/></div></div>
   <p className="eyebrow">เกมมายากลและทายใจ</p>
   <h1>คิดอะไรไว้ในใจ<br/><span>แล้วลองซ่อนมันจากเรา</span></h1>
   <p>เลือกไพ่ ตัวเลข สัญลักษณ์ หรือคำหนึ่งคำไว้ในหัว แล้วทำตามวิธีเล่นของแต่ละเกมเพื่อดูว่า MindPlay จะทายสิ่งที่คุณคิดได้หรือไม่</p>
   <div className="hero-actions"><a className="button primary" href="#games">เลือกเกม <Icon name="arrowRight"/></a><a className="button secondary" href="/stats">ดูสถิติการเล่น</a></div>
   <div className="trust-row"><span><Icon name="shield"/>ไม่ใช้กล้องหรือไมค์</span><span>เล่นฟรี</span><span>ไม่ต้องสมัคร</span></div>
  </section>
  <HomeStats/>
  <section className="section" id="games">
   <div className="section-heading"><div><p className="eyebrow">เลือกเกม</p><h2>ห้าเกม ห้ารูปแบบของการทายใจ</h2></div><p>ทุกเกมมีหน้าวิธีเล่นก่อนเริ่ม และใช้ประสบการณ์ต่างกันเพื่อไม่ให้รู้สึกเหมือนตอบแบบสอบถามชุดเดิมซ้ำ ๆ</p></div>
   <div className="game-grid">
    {games.map((game,index)=><a className={"game-card card-"+game.tone} href={game.href} key={game.id}>
      <div className="game-card-top"><span className="game-icon"><Icon name={game.icon}/></span><span className="game-index">{String(index+1).padStart(2,"0")}</span></div>
      <span className="badge">{game.badge}</span><h3>{game.title}</h3><p>{game.description}</p>
      <div className="game-card-meta"><span>{game.duration}</span><span>{game.play}</span></div>
      <span className="game-cta">เริ่มเล่น <Icon name="arrowRight"/></span>
    </a>)}
   </div>
  </section>
  <section className="privacy-panel">
   <span className="privacy-icon"><Icon name="shield"/></span>
   <div><p className="eyebrow">เล่นได้อย่างสบายใจ</p><h2>ความลึกลับอยู่ในตัวเกม ไม่ใช่การแอบดูอุปกรณ์</h2><p>MindPlay ไม่เปิดกล้อง ไม่เปิดไมค์ และไม่ต้องใช้บัญชีผู้ใช้ ระบบสถิติใช้ Anonymous ID ที่หมุนใหม่เป็นระยะเพื่อแยกการเข้าชมและการเล่น โดยไม่ต้องรู้ว่าคุณเป็นใคร</p></div>
  </section>
  <section className="section" id="about">
   <div className="section-heading"><div><p className="eyebrow">ออกแบบเพื่อการเล่นจริง</p><h2>เข้าใจง่ายบนมือถือ แท็บเล็ต และคอมพิวเตอร์</h2></div><p>เกมหลักบางส่วนใช้ Supabase ช่วยประมวลผล Session และคำถามถัดไป ขณะที่ UI และ Animation ยังตอบสนองบนอุปกรณ์ของคุณอย่างรวดเร็ว</p></div>
   <div className="feature-grid">
    <article><span><Icon name="mobile"/></span><h3>เล่นด้วยนิ้วเดียว</h3><p>ปุ่มใหญ่และพื้นที่แตะชัดเจนบนมือถือ</p></article>
    <article><span><Icon name="tablet"/></span><h3>Layout ยืดหยุ่น</h3><p>รองรับแท็บเล็ตทั้งแนวตั้งและแนวนอน</p></article>
    <article><span><Icon name="spark"/></span><h3>Reveal มีจังหวะ</h3><p>Animation เด่นเฉพาะตอนที่ช่วยสร้างอารมณ์ของเกม</p></article>
    <article><span><Icon name="speed"/></span><h3>Backend แยกจาก UI</h3><p>สถิติและเกมบางส่วนประมวลผลผ่าน Supabase โดยไม่ต้องมี Login</p></article>
   </div>
  </section>
  <footer className="site-footer"><div><BrandMark compact/><strong>MindPlay</strong></div><p>ศูนย์รวมเกมมายากลและทายใจภาษาไทย</p></footer>
 </main>;
}
