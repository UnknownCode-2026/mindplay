"use client";

import { useState, type ReactNode } from "react";
import { BrandMark, Icon, type IconName } from "./MindPlayUI";

export type GameTone = "cards" | "number" | "symbol" | "word" | "prediction";

export function GameFrame({
  title,
  tone,
  steps,
  children,
}: {
  title: string;
  tone: GameTone;
  steps: string[];
  children: ReactNode;
}) {
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <main className={"mind-game tone-" + tone}>
      <div className="mind-game-bg" aria-hidden="true"><span/><span/></div>
      <header className="mind-game-header">
        <a className="round-icon-button" href="/" aria-label="กลับหน้าหลัก"><Icon name="arrowLeft"/></a>
        <a className="mind-game-brand" href="/"><BrandMark compact/><span>{title}</span></a>
        <button className="round-icon-button help-button" type="button" onClick={() => setHelpOpen(true)} aria-label="ดูวิธีเล่น">?</button>
      </header>
      <div className="mind-game-content">{children}</div>
      {helpOpen && <div className="help-backdrop" role="presentation" onMouseDown={() => setHelpOpen(false)}>
        <section className="help-modal" role="dialog" aria-modal="true" aria-label={"วิธีเล่น " + title} onMouseDown={(event) => event.stopPropagation()}>
          <div className="help-modal-head"><div><p className="mini-kicker">วิธีเล่น</p><h2>{title}</h2></div><button className="round-icon-button" type="button" onClick={() => setHelpOpen(false)} aria-label="ปิด"><Icon name="close"/></button></div>
          <ol className="how-list">{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol>
          <button className="primary-control" type="button" onClick={() => setHelpOpen(false)}>เข้าใจแล้ว</button>
        </section>
      </div>}
    </main>
  );
}

export function HowToPlay({
  icon,
  title,
  intro,
  steps,
  onStart,
}: {
  icon: IconName;
  title: string;
  intro: string;
  steps: string[];
  onStart: () => void;
}) {
  return <section className="stage stage-guide stage-enter">
    <div className="stage-icon"><Icon name={icon}/></div>
    <p className="mini-kicker">ก่อนเริ่ม</p>
    <h1>{title}</h1>
    <p className="stage-copy">{intro}</p>
    <ol className="how-list">{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol>
    <button className="primary-control" type="button" onClick={onStart}>เข้าใจแล้ว เริ่มเกม</button>
  </section>;
}

export function FocusStage({
  icon = "brand",
  eyebrow = "โฟกัสไว้",
  title,
  copy,
}: {
  icon?: IconName;
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return <section className="stage stage-center stage-enter">
    <div className="focus-orb"><Icon name={icon}/><span aria-hidden="true"/></div>
    <p className="mini-kicker">{eyebrow}</p>
    <h1>{title}</h1>
    {copy && <p className="stage-copy">{copy}</p>}
    <div className="mind-wave" aria-hidden="true"><i/><i/><i/><i/><i/></div>
  </section>;
}

export function ReactionStage({
  icon,
  label,
  detail,
  onRestart,
}: {
  icon: IconName;
  label: string;
  detail?: string;
  onRestart: () => void;
}) {
  const [reaction, setReaction] = useState<"yes" | "no" | null>(null);
  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({title:"MindPlay",text:"ลองเล่น MindPlay แล้วดูว่าจะทายสิ่งที่คุณคิดได้ไหม",url:window.location.origin});
      } catch {}
    }
  };

  if (reaction === "yes") {
    return <section className="stage stage-center stage-enter">
      <div className="reaction-mark success"><Icon name="spark"/></div>
      <p className="mini-kicker">ตรงใช่ไหม</p>
      <h1>เก็บความลับไว้ แล้วลองให้เพื่อนเล่น</h1>
      <p className="stage-copy">ยิ่งผู้เล่นไม่รู้ว่าจะเกิดอะไรขึ้น จังหวะเฉลยยิ่งสนุก</p>
      <div className="action-stack">
        <button className="primary-control" type="button" onClick={() => void share()}>แชร์ MindPlay ให้เพื่อนลอง</button>
        <button className="secondary-control" type="button" onClick={onRestart}>เล่นอีกครั้ง</button>
        <a className="secondary-control link-control" href="/">เลือกเกมอื่น</a>
      </div>
    </section>;
  }

  if (reaction === "no") {
    return <section className="stage stage-center stage-enter">
      <div className="reaction-mark retry"><Icon name="brand"/></div>
      <p className="mini-kicker">ลองอีกครั้ง</p>
      <h1>อย่าเปลี่ยนสิ่งที่คิดกลางเกม</h1>
      <p className="stage-copy">เริ่มใหม่และตอบตามสิ่งที่คุณคิดจริงในแต่ละขั้น</p>
      <div className="action-stack"><button className="primary-control" type="button" onClick={onRestart}>เริ่มรอบใหม่</button><a className="secondary-control link-control" href="/">กลับหน้าหลัก</a></div>
    </section>;
  }

  return <section className="stage stage-center stage-enter reveal-stage">
    <p className="mini-kicker">สิ่งที่เราเห็นในความคิดของคุณ</p>
    <div className="answer-symbol"><Icon name={icon}/></div>
    <h1 className="answer-label">{label}</h1>
    {detail && <p className="stage-copy">{detail}</p>}
    <p className="reaction-question">ตรงกับสิ่งที่คุณคิดอยู่ไหม?</p>
    <div className="reaction-buttons">
      <button className="primary-control" type="button" onClick={() => setReaction("yes")}><Icon name="check"/> ตรงเลย</button>
      <button className="secondary-control" type="button" onClick={() => setReaction("no")}><Icon name="close"/> ไม่ตรง</button>
    </div>
  </section>;
}
