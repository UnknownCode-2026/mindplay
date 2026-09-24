import { BrandMark,Icon } from "../components/MindPlayUI";
import { games } from "../data/games";

export default function Home(){
 return <main className="site-shell">
  <div className="site-aurora" aria-hidden="true"><span/><span/><span/></div>
  <header className="site-header">
   <a className="brand" href="#top" aria-label="MindPlay หน้าแรก"><BrandMark/><span>MindPlay</span></a>
   <nav className="site-nav" aria-label="เมนูหลัก"><a href="#games">เกมทั้งหมด</a><a href="#about">เกี่ยวกับ</a></nav>
  </header>

  <section className="hero" id="top">
   <div className="hero-visual hero-motion" aria-hidden="true">
    <div className="hero-ring hero-ring-one"/><div className="hero-ring hero-ring-two"/>
    <span className="hero-particle p1"/><span className="hero-particle p2"/><span className="hero-particle p3"/>
    <div className="hero-core"><Icon name="brand"/></div>
   </div>
   <p className="eyebrow hero-seq seq-1">Mind games, alive</p>
   <h1 className="hero-seq seq-2">คิดไว้ในใจ<br/><span>แล้วลองซ่อนมันจากเรา</span></h1>
   <p className="hero-copy hero-seq seq-3">เกมอ่านใจ ตรรกะ และภาพลวงตาที่มีสีสันและจังหวะการเล่นเฉพาะตัว พร้อมกลไกใหม่ที่ลดคำถามซ้ำและจับทางได้ยากขึ้น</p>
   <div className="hero-actions hero-seq seq-4"><a className="button button-primary" href="#games">เริ่มเลือกเกม <Icon name="arrowRight"/></a><a className="button button-secondary" href="#about">ดูแนวคิดของ MindPlay</a></div>
   <div className="hero-facts hero-seq seq-5"><span><Icon name="shield"/>ไม่ใช้กล้องหรือไมค์</span><span>เล่นฟรี</span><span>ไม่ต้องสมัคร</span><span>ทุกหน้าจอ</span></div>
  </section>

  <section className="section" id="games">
   <div className="section-header"><div><p className="eyebrow">Game collection</p><h2>แต่ละเกมมีสี จังหวะ และกลไกของตัวเอง</h2></div><p>เลือกเกมแล้วเริ่มได้ทันที ทุกเกมใช้ Engine คนละแบบ ไม่ได้วนอยู่กับคำถามมีหรือไม่มีแบบเดิมทั้งหมด</p></div>
   <div className="game-grid">
    {games.map((game,index)=><a className={"game-card game-tone-"+game.tone} href={game.href} key={game.id}>
      <div className="game-card-glow" aria-hidden="true"/>
      <div className="game-card-top"><span className="game-icon"><Icon name={game.icon}/></span><span className="game-index">{String(index+1).padStart(2,"0")}</span></div>
      <div className="game-card-body"><span className="badge">{game.badge}</span><h3>{game.title}</h3><p>{game.description}</p></div>
      <div className="game-card-footer"><div className="game-meta"><span>{game.duration}</span><span>{game.input}</span></div><span className="card-arrow"><Icon name="arrowRight"/></span></div>
    </a>)}
   </div>
  </section>

  <section className="privacy-panel">
   <div className="privacy-icon"><Icon name="shield"/></div>
   <div><p className="eyebrow">Privacy by design</p><h2>เอฟเฟกต์มากขึ้น แต่ยังไม่แตะข้อมูลส่วนตัว</h2><p>Animation และกลไกทั้งหมดทำงานอยู่ในหน้าเว็บ เกมไม่เปิดกล้อง ไม่เปิดไมค์ และไม่ต้องใช้บัญชีผู้ใช้</p></div>
  </section>

  <section className="section" id="about">
   <div className="section-header"><div><p className="eyebrow">Responsive motion system</p><h2>มีลูกเล่น แต่ยังเร็วและใช้งานง่าย</h2></div><p>เอฟเฟกต์หลักใช้ transform และ opacity พร้อมลด Motion อัตโนมัติเมื่อระบบของผู้ใช้เปิด Reduce Motion</p></div>
   <div className="feature-grid">
    <article className="feature-card"><span><Icon name="mobile"/></span><h3>Touch motion</h3><p>ตอบสนองต่อการแตะโดยไม่พึ่ง Hover บนมือถือ</p></article>
    <article className="feature-card"><span><Icon name="tablet"/></span><h3>Adaptive layouts</h3><p>เกมและเอฟเฟกต์ปรับขนาดตาม Tablet ทั้งสองแนว</p></article>
    <article className="feature-card"><span><Icon name="desktop"/></span><h3>Pointer effects</h3><p>Desktop มี Hover, lift และ accent glow เพิ่มเติม</p></article>
    <article className="feature-card"><span><Icon name="speed"/></span><h3>GPU friendly</h3><p>จำกัด blur หนักและเน้น animation ที่ลื่นกว่า</p></article>
   </div>
  </section>

  <footer className="site-footer"><div className="footer-brand"><BrandMark compact/><span>MindPlay</span></div><p>เกมท้าทายความคิดภาษาไทยสำหรับทุกหน้าจอ</p></footer>
 </main>;
}
