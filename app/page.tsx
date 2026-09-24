import { BrandMark, Icon } from "../components/MindPlayUI";
import { games } from "../data/games";

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="MindPlay หน้าแรก"><BrandMark /><span>MindPlay</span></a>
        <nav className="site-nav" aria-label="เมนูหลัก"><a href="#games">เกมทั้งหมด</a><a href="#about">เกี่ยวกับ</a></nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-ring hero-ring-one" />
          <div className="hero-ring hero-ring-two" />
          <div className="hero-core"><Icon name="brand" /></div>
        </div>
        <p className="eyebrow">Mind games, redesigned</p>
        <h1>คิดไว้ในใจ<br/><span>แล้วลองซ่อนมันจากเรา</span></h1>
        <p className="hero-copy">รวมเกมอ่านใจ ตรรกะ และภาพลวงตาที่ออกแบบให้เล่นง่ายบนทุกอุปกรณ์ โดยไม่ต้องสมัครสมาชิกและไม่แตะข้อมูลส่วนตัวของคุณ</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#games">เริ่มเลือกเกม <Icon name="arrowRight" /></a>
          <a className="button button-secondary" href="#about">ดูวิธีการทำงาน</a>
        </div>
        <div className="hero-facts" aria-label="ข้อมูลบริการ">
          <span><Icon name="shield" /> ไม่ใช้กล้องหรือไมค์</span>
          <span>เล่นฟรี</span><span>ไม่ต้องสมัคร</span><span>ทุกหน้าจอ</span>
        </div>
      </section>

      <section className="section" id="games">
        <div className="section-header">
          <div><p className="eyebrow">Game collection</p><h2>เลือกความท้าทายของคุณ</h2></div>
          <p>แต่ละเกมมีจังหวะและวิธีคิดต่างกัน เลือกเกมที่ดูน่าสนใจแล้วเริ่มได้ทันที</p>
        </div>
        <div className="game-grid">
          {games.map((game,index)=>(
            <a className="game-card" href={game.href} key={game.id}>
              <div className="game-card-top">
                <span className="game-icon"><Icon name={game.icon}/></span>
                <span className="game-index">{String(index+1).padStart(2,"0")}</span>
              </div>
              <div className="game-card-body">
                <span className="badge">{game.badge}</span>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
              </div>
              <div className="game-card-footer">
                <div className="game-meta"><span>{game.duration}</span><span>{game.input}</span></div>
                <span className="card-arrow"><Icon name="arrowRight"/></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="privacy-panel">
        <div className="privacy-icon"><Icon name="shield"/></div>
        <div>
          <p className="eyebrow">Privacy by design</p>
          <h2>ความลึกลับไม่จำเป็นต้องแลกกับความเป็นส่วนตัว</h2>
          <p>MindPlay ใช้ตรรกะ คณิตศาสตร์ และการนำเสนอภายในหน้าเว็บ เกมไม่เปิดกล้อง ไม่เปิดไมค์ และไม่ต้องใช้บัญชีผู้ใช้</p>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-header">
          <div><p className="eyebrow">Built for every screen</p><h2>ออกแบบให้ใช้งานเหมือนโปรดักต์เดียวกันทุกอุปกรณ์</h2></div>
          <p>โครงสร้าง หน้าจอเกม ปุ่ม และระยะห่างปรับตามพื้นที่จริง ไม่ใช่เพียงการย่อหรือขยายหน้าเดิม</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card"><span><Icon name="mobile"/></span><h3>Mobile first</h3><p>ปุ่มใหญ่ ใช้นิ้วเดียวได้ และรองรับ Safe Area</p></article>
          <article className="feature-card"><span><Icon name="tablet"/></span><h3>Tablet ready</h3><p>สมดุลทั้งแนวตั้งและแนวนอนด้วย Grid ที่ปรับตามพื้นที่</p></article>
          <article className="feature-card"><span><Icon name="desktop"/></span><h3>Desktop layout</h3><p>ใช้พื้นที่จอกว้างอย่างเหมาะสม พร้อม Mouse และ Keyboard</p></article>
          <article className="feature-card"><span><Icon name="speed"/></span><h3>Fast interaction</h3><p>ลดเอฟเฟกต์หนักและเน้น Animation ที่ลื่นไหล</p></article>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><BrandMark compact/><span>MindPlay</span></div>
        <p>เกมท้าทายความคิดภาษาไทยสำหรับทุกหน้าจอ</p>
      </footer>
    </main>
  );
}
