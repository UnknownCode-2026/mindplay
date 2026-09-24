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
        <div className="section-heading">
          <p className="eyebrow">เลือกเกมที่อยากลอง</p>
          <h2>แต่ละเกมใช้วิธีเล่นไม่เหมือนกัน</h2>
          <p>บางเกมใช้ตรรกะ บางเกมใช้คณิตศาสตร์ และบางเกมใช้การนำเสนอแบบมายากล ลองดูว่าคุณจะจับทางได้ไหม</p>
        </div>

        <div className="game-list">
          {games.map((game, index) => {
            const body = <>
              <div className="game-icon">{game.icon}</div>
              <div className="game-content">
                <div className="game-title-row">
                  <h3>{game.title}</h3>
                  <span className={game.status === "available" ? "badge badge-live" : "badge"}>{game.badge}</span>
                </div>
                <p>{game.description}</p>
                <div className="game-meta"><span>{game.duration}</span><span>{game.input}</span></div>
                {game.status === "available" && <span className="play-link">เล่นเลย →</span>}
              </div>
              <span className="game-number">{String(index + 1).padStart(2, "0")}</span>
            </>;
            return game.status === "available"
              ? <a className="game-card game-card-live" href={game.href} key={game.id}>{body}</a>
              : <article className="game-card" key={game.id}>{body}</article>;
          })}
        </div>
      </section>

      <section className="mystery-section">
        <p className="eyebrow">เล่นได้อย่างสบายใจ</p>
        <h2>ไม่ใช้กล้อง ไม่ใช้ไมค์ และไม่เข้าถึงข้อมูลส่วนตัว</h2>
        <p className="mystery-question">ความสนุกอยู่ที่วิธีคิดและการนำเสนอ ไม่ใช่การแอบดูข้อมูลของคุณ</p>
        <p className="muted">ทุกเกมเล่นผ่านหน้าเว็บโดยตรง และไม่ต้องสมัครสมาชิก</p>
      </section>

      <section className="section about" id="about">
        <div className="section-heading"><p className="eyebrow">เล่นได้ทุกจอ</p><h2>มือถือ แท็บเล็ต และคอมพิวเตอร์</h2><p>หน้าเกม ปุ่ม ตัวอักษร และพื้นที่เล่นจะปรับตามขนาดจอให้เหมาะสม</p></div>
        <div className="feature-grid">
          <div className="feature"><span>📱</span><strong>Mobile</strong><p>Touch-first ปุ่มใหญ่และใช้งานง่าย</p></div>
          <div className="feature"><span>◫</span><strong>Tablet</strong><p>รองรับทั้งแนวตั้งและแนวนอน</p></div>
          <div className="feature"><span>🖥️</span><strong>Desktop</strong><p>รองรับ Mouse และ Keyboard</p></div>
          <div className="feature"><span>⚡</span><strong>ลื่นและเบา</strong><p>ลดเอฟเฟกต์ที่ไม่จำเป็นเพื่อให้เล่นได้ลื่นขึ้น</p></div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span>🧠</span> MindPlay</div>
        <p>ศูนย์รวมเกมอ่านใจภาษาไทย</p>
        <p className="footer-note">คิดไว้ในใจ... แล้วดูว่าคุณจะจับทางเราได้ไหม</p>
      </footer>
    </main>
  );
}
