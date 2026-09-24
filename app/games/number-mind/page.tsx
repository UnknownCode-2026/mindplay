"use client";

import { useMemo, useState } from "react";
import { buildQuestions, calculateNumber, shuffle } from "../../../lib/numberMind";

type Stage = "intro" | "questions" | "reading" | "reveal" | "success" | "retry";

const roundMessages = [
  "เลขของคุณอยู่ในนี้ไหม?",
  "ดูให้ดีอีกครั้ง...",
  "ผมเริ่มตัดตัวเลือกออกได้แล้ว",
  "ตอนนี้เหลือไม่มากแล้ว",
  "อย่าเปลี่ยนเลขนะ",
  "ผมคิดว่าผมใกล้เจอแล้ว",
  "ตอบครั้งสุดท้าย...",
];

export default function NumberMindGame() {
  const [stage, setStage] = useState<Stage>("intro");
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [seed, setSeed] = useState(0);

  const questions = useMemo(() => {
    const base = buildQuestions();
    return shuffle(base, seed).map((q, index) => ({ ...q, numbers: shuffle(q.numbers, seed + index + 11) }));
  }, [seed]);

  const restart = () => {
    setRound(0);
    setAnswers([]);
    setResult(null);
    setSeed((value) => value + 17);
    setStage("intro");
  };

  const answer = (value: boolean) => {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);

    if (round < questions.length - 1) {
      setRound(round + 1);
      return;
    }

    const number = calculateNumber(questions, nextAnswers);
    setResult(number);
    setStage("reading");

    window.setTimeout(() => {
      if (number < 1 || number > 100) {
        setStage("retry");
      } else {
        setStage("reveal");
      }
    }, 2600);
  };

  if (stage === "intro") {
    return (
      <main className="game-shell">
        <div className="game-topbar"><a href="/" className="back-button">←</a><span>อ่านตัวเลขในใจ</span><span className="version-pill">V1.2</span></div>
        <section className="game-panel intro-panel">
          <div className="mind-orb">🧠</div>
          <p className="eyebrow">เกมอ่านใจเกมแรก</p>
          <h1 className="game-heading">เลือกเลขหนึ่งตัว<br/><span>ตั้งแต่ 1 ถึง 100</span></h1>
          <div className="rules">
            <p>จำมันไว้ในหัว</p>
            <p>อย่าพูดออกมา</p>
            <p>และอย่ากดเลขที่คุณเลือก</p>
          </div>
          <button className="game-primary" onClick={() => setStage("questions")}>ฉันเลือกแล้ว</button>
          <p className="privacy-note">ไม่ใช้กล้อง • ไม่ใช้ไมค์ • ไม่ขอข้อมูลส่วนตัว</p>
        </section>
      </main>
    );
  }

  if (stage === "questions") {
    const current = questions[round];
    const progress = ((round + 1) / questions.length) * 100;
    return (
      <main className="game-shell">
        <div className="game-topbar"><a href="/" className="back-button">←</a><span>อ่านตัวเลขในใจ</span><span className="step-label">{round + 1}/{questions.length}</span></div>
        <section className="game-panel question-panel">
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <p className="eyebrow">ขั้นที่ {round + 1} จาก {questions.length}</p>
          <h1 className="question-title">{roundMessages[round]}</h1>
          <p className="question-help">มองหาเลขที่คุณคิดไว้ แล้วตอบตามจริง</p>
          <div className="number-grid">
            {current.numbers.map((number) => <span className="number-chip" key={number}>{number}</span>)}
          </div>
          <div className="answer-bar">
            <button className="answer-button answer-no" onClick={() => answer(false)}>✕ ไม่มี</button>
            <button className="answer-button answer-yes" onClick={() => answer(true)}>✓ มี</button>
          </div>
        </section>
      </main>
    );
  }

  if (stage === "reading") {
    return (
      <main className="game-shell center-stage">
        <div className="reading-orb"><div>🧠</div></div>
        <p className="eyebrow">กำลังอ่านความคิด</p>
        <h1 className="reading-title">อย่าเพิ่งเปลี่ยนเลขนะ...</h1>
        <div className="reading-lines">
          <span>กำลังวิเคราะห์คำตอบ...</span>
          <span>กำลังตัดความเป็นไปได้...</span>
          <span>ผมคิดว่าเจอแล้ว</span>
        </div>
      </main>
    );
  }

  if (stage === "reveal") {
    return (
      <main className="game-shell center-stage reveal-stage">
        <p className="eyebrow">ผมคิดว่าเลขของคุณคือ</p>
        <div className="reveal-number">{result}</div>
        <h1 className="reveal-question">นี่คือเลขที่คุณกำลังคิดอยู่ใช่ไหม?</h1>
        <div className="reveal-actions">
          <button className="game-primary" onClick={() => setStage("success")}>😳 ใช่เลย</button>
          <button className="ghost-button" onClick={() => setStage("retry")}>ไม่ใช่</button>
        </div>
      </main>
    );
  }

  if (stage === "success") {
    return (
      <main className="game-shell center-stage">
        <div className="success-icon">✨</div>
        <p className="eyebrow">อ่านใจสำเร็จ</p>
        <h1 className="reading-title">คุณไม่ได้บอกเลขกับเราเลยนะ...</h1>
        <p className="success-copy">แต่ MindPlay ก็เจอเลข <strong>{result}</strong> ที่คุณคิดไว้</p>
        <div className="reveal-actions">
          <button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button>
          <a className="ghost-link" href="/games/symbol-mind">👁️ เล่นสัญลักษณ์ลับต่อ</a>\n          <a className="ghost-link" href="/">กลับหน้าหลัก</a>
        </div>
      </main>
    );
  }

  return (
    <main className="game-shell center-stage">
      <div className="retry-icon">🤔</div>
      <p className="eyebrow">เกือบแล้ว</p>
      <h1 className="reading-title">มีบางคำตอบที่อาจคลาดเคลื่อน</h1>
      <p className="success-copy">ลองอีกครั้ง และตรวจดูเลขในแต่ละชุดให้ดี</p>
      <div className="reveal-actions">
        <button className="game-primary" onClick={restart}>ลองใหม่</button>
        <a className="ghost-link" href="/">กลับหน้าหลัก</a>
      </div>
    </main>
  );
}
