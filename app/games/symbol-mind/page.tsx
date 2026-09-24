"use client";

import { useMemo, useState } from "react";
import {
  buildSymbolQuestions,
  calculateSymbolId,
  findSymbol,
  shuffleSymbols,
  type SymbolItem,
} from "../../../lib/symbolMind";

type Stage = "intro" | "questions" | "reading" | "reveal" | "success" | "retry";

const roundMessages = [
  "สัญลักษณ์ของคุณอยู่ในกลุ่มนี้ไหม?",
  "ลองมองอีกครั้งให้แน่ใจ...",
  "ลองดูอีกชุดหนึ่ง",
  "ตอบครั้งสุดท้าย...",
];

export default function SymbolMindGame() {
  const [stage, setStage] = useState<Stage>("intro");
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [result, setResult] = useState<SymbolItem | null>(null);
  const [seed, setSeed] = useState(2);

  const questions = useMemo(() => {
    const base = shuffleSymbols(buildSymbolQuestions(), seed);
    return base.map((question, index) => ({
      ...question,
      symbols: shuffleSymbols(question.symbols, seed + index + 19),
    }));
  }, [seed]);

  const restart = () => {
    setRound(0);
    setAnswers([]);
    setResult(null);
    setSeed((value) => value + 23);
    setStage("intro");
  };

  const vibrate = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const answer = (value: boolean) => {
    vibrate(18);
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);

    if (round < questions.length - 1) {
      setRound(round + 1);
      return;
    }

    const id = calculateSymbolId(questions, nextAnswers);
    const found = findSymbol(id);
    setResult(found ?? null);
    setStage("reading");

    window.setTimeout(() => {
      if (!found) {
        setStage("retry");
      } else {
        vibrate([25, 60, 40]);
        setStage("reveal");
      }
    }, 2300);
  };

  if (stage === "intro") {
    return (
      <main className="game-shell symbol-shell">
        <div className="game-topbar">
          <a href="/" className="back-button" aria-label="กลับหน้าหลัก">←</a>
          <span>สัญลักษณ์ลับ</span>
          <span className="version-pill"></span>
        </div>
        <section className="game-panel intro-panel">
          <div className="mind-orb symbol-orb">👁️</div>
          <p className="eyebrow">เลือกสัญลักษณ์หนึ่งตัวไว้ในใจ</p>
          <h1 className="game-heading">เลือกสัญลักษณ์หนึ่งตัว<br/><span>แล้วจำไว้ในหัว</span></h1>
          <div className="symbol-preview-grid" aria-label="ตัวอย่างสัญลักษณ์">
            {["🌙","🔥","💎","⚡","🦋","🍀","⭐","👑"].map((symbol) => <span key={symbol}>{symbol}</span>)}
          </div>
          <div className="rules">
            <p>มองให้ดีและจำไว้</p>
            <p>อย่าพูดออกมา</p>
            <p>และอย่ากดสัญลักษณ์ที่คุณเลือก</p>
          </div>
          <button className="game-primary" onClick={() => setStage("questions")}>ฉันจำแล้ว</button>
          <p className="privacy-note">ไม่ใช้กล้อง • ไม่ใช้ไมค์ • ไม่ขอข้อมูลส่วนตัว</p>
        </section>
      </main>
    );
  }

  if (stage === "questions") {
    const current = questions[round];
    const progress = ((round + 1) / questions.length) * 100;

    return (
      <main className="game-shell symbol-shell">
        <div className="game-topbar">
          <a href="/" className="back-button" aria-label="กลับหน้าหลัก">←</a>
          <span>สัญลักษณ์ลับ</span>
          <span className="step-label">{round + 1}/{questions.length}</span>
        </div>

        <section className="game-panel question-panel">
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <p className="eyebrow">ขั้นที่ {round + 1} จาก {questions.length}</p>
          <h1 className="question-title">{roundMessages[round]}</h1>
          <p className="question-help">มองหาสัญลักษณ์ที่คุณจำไว้ แล้วตอบตามจริง</p>

          <div className="symbol-grid">
            {current.symbols.map((item) => (
              <div className="symbol-chip" key={item.id} aria-label={item.name}>
                <span>{item.symbol}</span>
              </div>
            ))}
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
      <main className="game-shell center-stage symbol-reading-stage">
        <div className="reading-orb"><div>👁️</div></div>
        <p className="eyebrow">กำลังอ่านภาพในความคิด</p>
        <h1 className="reading-title">อย่าเปลี่ยนสัญลักษณ์นะ...</h1>
        <div className="reading-lines">
          <span>กำลังเชื่อมโยงรูปแบบ...</span>
          <span>กำลังตัดสิ่งที่ไม่ใช่ออก...</span>
          <span>ผมคิดว่าเห็นมันแล้ว</span>
        </div>
      </main>
    );
  }

  if (stage === "reveal" && result) {
    return (
      <main className="game-shell center-stage reveal-stage symbol-reveal-stage">
        <p className="eyebrow">สัญลักษณ์ที่อยู่ในหัวคุณคือ</p>
        <div className="symbol-reveal">{result.symbol}</div>
        <h1 className="reveal-question">นี่คือสิ่งที่คุณกำลังคิดอยู่ใช่ไหม?</h1>
        <p className="success-copy">{result.name}</p>
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
        <h1 className="reading-title">คุณไม่ได้กดสัญลักษณ์นั้นเลยนะ...</h1>
        <p className="success-copy">แต่ MindPlay ก็เจอ {result?.symbol} ที่คุณจำไว้</p>
        <div className="reveal-actions">
          <button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button>
          <a className="ghost-link" href="/games/number-mind">🔢 ลองเกมอ่านเลขต่อ</a>
          <a className="ghost-link" href="/">กลับหน้าหลัก</a>
        </div>
      </main>
    );
  }

  return (
    <main className="game-shell center-stage">
      <div className="retry-icon">🤔</div>
      <p className="eyebrow">เกือบแล้ว</p>
      <h1 className="reading-title">มีบางคำตอบที่อาจคลาดเคลื่อน</h1>
      <p className="success-copy">ลองอีกครั้ง และตรวจดูสัญลักษณ์ในแต่ละกลุ่มให้ดี</p>
      <div className="reveal-actions">
        <button className="game-primary" onClick={restart}>ลองใหม่</button>
        <a className="ghost-link" href="/">กลับหน้าหลัก</a>
      </div>
    </main>
  );
}
