import { games } from "../data/games";

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="MindPlay หน้าแรก"><span className="brand-mark">🧠</span><span>MindPlay</span></a>
        <nav className="topnav"><a href="#games">เกม</a><a href="#about">เกี่ยวกับ</a></nav>
      </header>
      <section className="hero" id="top">
        <div className="orb"><div className="orb-core">🧠</div></div>
        <p className="eyebrow">ศูนย์รวมเกมอ่านใจ</p>
        <h1>อย่าเพิ่งเชื่อว่าเราอ่านใจได้<span>ลองเล่น แล้วค่อยตัดสิน</span></h1>
        <p className="hero-copy">เกมท้าทายความคิดภาษาไทยที่เล่นได้ทันทีบนมือถือ แท็บเล็ต และคอมพิวเตอร์ โดยไม่ต้องสมัครสมาชิก</p>
        <a className="primary-button" href="#games">เลือกเกมที่อยากลอง ↓</a>
        <div className="trust-row"><span>ฟรี 100%</span><span>ไม่ต้องสมัคร</span><span>มือถือ</span><span>แท็บเล็ต</span><span>คอมพิวเตอร์</span></div>
      </section>
      <section className="section" id="games">
        <div className="section-heading"><p className="eyebrow">MindPlay V1.3</p><h2>เกมที่จับทางยากขึ้น และเล่นสนุกกว่าเดิม</h2><p>V1.3 ลดการพึ่งคำถามแบบ “มี/ไม่มี” และเพิ่มเกมที่ใช้ภาพลวงตา การเลือก และจังหวะการเฉลยมากขึ้น</p></div>
        <div className="game-list">
          {games.map((game, index) => {
            const body = <><div className="game-icon">{game.icon}</div><div className="game-content"><div className="game-title-row"><h3>{game.title}</h3><span className={game.status === "available" ? "badge badge-live" : "badge"}>{game.badge}</span></div><p>{game.description}</p><div className="game-meta"><span>{game.duration}</span><span>{game.input}</span></div>{game.status === "available" && <span className="play-link">เล่นเลย →</span>}</div><span className="game-number">{String(index+1).padStart(2,"0")}</span></>;
            return game.status === "available" ? <a className="game-card game-card-live" href={game.href} key={game.id}>{body}</a> : <article className="game-card" key={game.id}>{body}</article>;
          })}
        </div>
      </section>
      <section className="mystery-section"><p className="eyebrow">ออกแบบใหม่ใน V1.3</p><h2>ไม่ใช้กล้อง ไม่ใช้ไมค์ และไม่เข้าถึงข้อมูลส่วนตัว</h2><p className="mystery-question">สิ่งที่ทำให้เกมน่าสนใจ คือวิธีคิด ไม่ใช่การแอบดูข้อมูล</p><p className="muted">บางเกมใช้ตรรกะ บางเกมใช้คณิตศาสตร์ และบางเกมใช้การนำเสนอแบบมายากล</p></section>
      <section className="section about" id="about">
        <div className="section-heading"><p className="eyebrow">สร้างมาให้เล่นได้ทุกจอ</p><h2>Responsive ตั้งแต่มือถือถึงจอ Desktop</h2><p>หน้าเกม ปุ่ม Grid ตัวอักษร และระยะห่างจะปรับตามพื้นที่จอ</p></div>
        <div className="feature-grid"><div className="feature"><span>📱</span><strong>Mobile</strong><p>Touch-first ปุ่มใหญ่และรองรับ Safe Area</p></div><div className="feature"><span>◫</span><strong>Tablet</strong><p>รองรับแนวตั้งและแนวนอน</p></div><div className="feature"><span>🖥️</span><strong>Desktop</strong><p>รองรับ Mouse, Keyboard และ Layout สำหรับจอกว้าง</p></div><div className="feature"><span>⚡</span><strong>Performance</strong><p>ลดโค้ดซ้ำ แยกข้อมูลเกม และใช้ Animation ที่เบาขึ้น</p></div></div>
      </section>
      <footer><div className="footer-brand"><span>🧠</span> MindPlay</div><p>ศูนย์รวมเกมอ่านใจ — V1.3</p><p className="footer-note">คิดไว้ในใจ... แล้วดูว่าคุณจะจับทางเราได้ไหม</p></footer>
    </main>
  );
}
