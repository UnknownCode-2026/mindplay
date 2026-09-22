const upcomingGames = [
  {
    icon: "🔢",
    title: "อ่านตัวเลขในใจ",
    description: "คิดเลขไว้ในใจ แล้วตอบเพียงไม่กี่คำถาม",
  },
  {
    icon: "👁️",
    title: "สัญลักษณ์ลับ",
    description: "จำสิ่งหนึ่งไว้ในหัว โดยไม่ต้องกดสิ่งที่เลือก",
  },
  {
    icon: "🃏",
    title: "ไพ่ในความคิด",
    description: "เลือกไพ่หนึ่งใบในใจ แล้วมาดูกันว่าเราจะรู้ไหม",
  },
  {
    icon: "🔮",
    title: "คำทำนายล่วงหน้า",
    description: "คำตอบจะถูกปิดผนึก ก่อนที่คุณจะตัดสินใจ",
  },
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="MindPlay หน้าแรก">
          <span className="brand-mark" aria-hidden="true">🧠</span>
          <span>MindPlay</span>
        </a>
        <a className="mini-link" href="#about">เกี่ยวกับ</a>
      </header>

      <section className="hero" id="top">
        <div className="orb" aria-hidden="true">
          <div className="orb-core">🧠</div>
        </div>
        <p className="eyebrow">ศูนย์รวมเกมอ่านใจ</p>
        <h1>
          คุณแน่ใจแค่ไหน...
          <span>ว่าความคิดของคุณเป็นความลับ?</span>
        </h1>
        <p className="hero-copy">
          คิดคำตอบไว้ในใจ ไม่ต้องบอกเรา แล้วมาดูกันว่าเราจะทายถูกหรือไม่
        </p>
        <a className="primary-button" href="#games">
          ดูเกมที่กำลังจะมา
          <span aria-hidden="true">↓</span>
        </a>

        <div className="trust-row" aria-label="จุดเด่นของ MindPlay">
          <span>ฟรี 100%</span>
          <span>ไม่ต้องสมัคร</span>
          <span>เล่นผ่านเว็บ</span>
          <span>เหมาะกับมือถือ</span>
        </div>
      </section>

      <section className="section" id="games">
        <div className="section-heading">
          <p className="eyebrow">เร็ว ๆ นี้</p>
          <h2>เตรียมท้าทายความคิดของคุณ</h2>
          <p>V1.0 ยังไม่เปิดเกมจริง เรากำลังสร้างพื้นฐานให้ทุกเกมเล่นง่ายและลื่นบนมือถือ</p>
        </div>

        <div className="game-list">
          {upcomingGames.map((game, index) => (
            <article className="game-card" key={game.title}>
              <div className="game-icon" aria-hidden="true">{game.icon}</div>
              <div className="game-content">
                <div className="game-title-row">
                  <h3>{game.title}</h3>
                  <span className="badge">เร็ว ๆ นี้</span>
                </div>
                <p>{game.description}</p>
              </div>
              <span className="game-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="mystery-section">
        <p className="eyebrow">คำถามเดียว</p>
        <h2>ไม่ใช้กล้อง ไม่ใช้ไมค์ และไม่ต้องบอกคำตอบ</h2>
        <p className="mystery-question">แล้วเราจะรู้ได้ยังไง?</p>
        <p className="muted">เมื่อเกมแรกเปิดให้เล่น คุณจะได้พิสูจน์ด้วยตัวเอง</p>
      </section>

      <section className="section about" id="about">
        <div className="section-heading">
          <p className="eyebrow">เกี่ยวกับ MindPlay</p>
          <h2>เกมอ่านใจที่เปิดเว็บแล้วเล่นได้ทันที</h2>
          <p>
            MindPlay คือศูนย์รวมเกมอ่านใจและเกมท้าทายความคิดภาษาไทย
            ที่ออกแบบเพื่อการเล่นผ่านเว็บไซต์บนมือถือโดยเฉพาะ
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature">
            <span>⚡</span>
            <strong>เข้าแล้วเล่นได้เลย</strong>
            <p>ไม่ต้องสร้างบัญชีและไม่ต้องล็อกอิน</p>
          </div>
          <div className="feature">
            <span>📱</span>
            <strong>มือถือมาก่อน</strong>
            <p>ปุ่มใหญ่ อ่านง่าย และออกแบบสำหรับการแตะ</p>
          </div>
          <div className="feature">
            <span>🛡️</span>
            <strong>ไม่ขอข้อมูลส่วนตัว</strong>
            <p>ไม่ใช้กล้อง ไมโครโฟน หรือข้อมูลในเครื่อง</p>
          </div>
          <div className="feature">
            <span>🎮</span>
            <strong>เล่นฟรี 100%</strong>
            <p>ไม่มีแพ็กเกจ ไม่มีระบบเติมเงิน</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span>🧠</span> MindPlay</div>
        <p>ศูนย์รวมเกมอ่านใจ — V1.0</p>
        <p className="footer-note">คิดไว้ในใจ... ที่เหลือปล่อยให้เป็นหน้าที่ของเรา</p>
      </footer>
    </main>
  );
}