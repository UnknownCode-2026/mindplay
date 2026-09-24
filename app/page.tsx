const games = [
  {
    icon: "🔢",
    title: "อ่านตัวเลขในใจ",
    description: "คิดเลขตั้งแต่ 1–100 ไว้ในใจ แล้วตอบเพียง 7 คำถาม",
    status: "available",
    href: "/games/number-mind",
    badge: "เล่นได้แล้ว",
  },
  {
    icon: "👁️",
    title: "สัญลักษณ์ลับ",
    description: "เลือกสัญลักษณ์หนึ่งตัวไว้ในใจ โดยไม่ต้องกดสิ่งที่เลือก",
    status: "available",
    href: "/games/symbol-mind",
    badge: "ใหม่",
  },
  {
    icon: "🃏",
    title: "ไพ่ในความคิด",
    description: "เลือกไพ่หนึ่งใบในใจ แล้วมาดูกันว่าเราจะรู้ไหม",
    status: "soon",
    badge: "เร็ว ๆ นี้",
  },
  {
    icon: "🔮",
    title: "คำทำนายล่วงหน้า",
    description: "คำตอบจะถูกปิดผนึก ก่อนที่คุณจะตัดสินใจ",
    status: "soon",
    badge: "เร็ว ๆ นี้",
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
        <div className="orb" aria-hidden="true"><div className="orb-core">🧠</div></div>
        <p className="eyebrow">ศูนย์รวมเกมอ่านใจ</p>
        <h1>คุณแน่ใจแค่ไหน...<span>ว่าความคิดของคุณเป็นความลับ?</span></h1>
        <p className="hero-copy">คิดคำตอบไว้ในใจ ไม่ต้องบอกเรา แล้วมาดูกันว่าเราจะทายถูกหรือไม่</p>
        <a className="primary-button" href="#games">เลือกเกมที่อยากลอง <span aria-hidden="true">↓</span></a>
        <div className="trust-row" aria-label="จุดเด่นของ MindPlay">
          <span>ฟรี 100%</span><span>ไม่ต้องสมัคร</span><span>เล่นผ่านเว็บ</span><span>เหมาะกับมือถือ</span>
        </div>
      </section>

      <section className="section" id="games">
        <div className="section-heading">
          <p className="eyebrow">เกมของ MindPlay</p>
          <h2>ตอนนี้มี 2 เกมให้ลองอ่านใจ</h2>
          <p>เริ่มจากตัวเลข หรือเลือกสัญลักษณ์ที่ชอบ แล้วดูว่า MindPlay จะอ่านสิ่งที่อยู่ในหัวคุณได้หรือไม่</p>
        </div>

        <div className="game-list">
          {games.map((game, index) => {
            const content = (
              <>
                <div className="game-icon" aria-hidden="true">{game.icon}</div>
                <div className="game-content">
                  <div className="game-title-row">
                    <h3>{game.title}</h3>
                    <span className={game.status === "available" ? "badge badge-live" : "badge"}>{game.badge}</span>
                  </div>
                  <p>{game.description}</p>
                  {game.status === "available" && <span className="play-link">เล่นเลย →</span>}
                </div>
                <span className="game-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </>
            );
            return game.status === "available" ? (
              <a className="game-card game-card-live" href={game.href} key={game.title}>{content}</a>
            ) : (
              <article className="game-card" key={game.title}>{content}</article>
            );
          })}
        </div>
      </section>

      <section className="mystery-section">
        <p className="eyebrow">คำถามเดียว</p>
        <h2>ไม่ใช้กล้อง ไม่ใช้ไมค์ และไม่ต้องบอกคำตอบ</h2>
        <p className="mystery-question">แล้วเราจะรู้ได้ยังไง?</p>
        <p className="muted">ลองเล่นสักเกม แล้วพิสูจน์ด้วยตัวคุณเอง</p>
      </section>

      <section className="section about" id="about">
        <div className="section-heading">
          <p className="eyebrow">เกี่ยวกับ MindPlay</p>
          <h2>เกมอ่านใจที่เปิดเว็บแล้วเล่นได้ทันที</h2>
          <p>MindPlay คือศูนย์รวมเกมอ่านใจและเกมท้าทายความคิดภาษาไทย ที่ออกแบบเพื่อการเล่นผ่านเว็บไซต์บนมือถือโดยเฉพาะ</p>
        </div>
        <div className="feature-grid">
          <div className="feature"><span>⚡</span><strong>เข้าแล้วเล่นได้เลย</strong><p>ไม่ต้องสร้างบัญชีและไม่ต้องล็อกอิน</p></div>
          <div className="feature"><span>📱</span><strong>มือถือมาก่อน</strong><p>ปุ่มใหญ่ อ่านง่าย และออกแบบสำหรับการแตะ</p></div>
          <div className="feature"><span>🛡️</span><strong>ไม่ขอข้อมูลส่วนตัว</strong><p>ไม่ใช้กล้อง ไมโครโฟน หรือข้อมูลในเครื่อง</p></div>
          <div className="feature"><span>🎮</span><strong>เล่นฟรี 100%</strong><p>ไม่มีแพ็กเกจ ไม่มีระบบเติมเงิน</p></div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span>🧠</span> MindPlay</div>
        <p>ศูนย์รวมเกมอ่านใจ — V1.2</p>
        <p className="footer-note">คิดไว้ในใจ... ที่เหลือปล่อยให้เป็นหน้าที่ของเรา</p>
      </footer>
    </main>
  );
}
