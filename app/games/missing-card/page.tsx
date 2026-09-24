"use client";
import { useMemo,useState } from "react";
type Stage="intro"|"memorize"|"focus"|"reveal";
const rounds=[
 {first:["K♠","7♥","Q♦","9♣","J♥","K♦"],second:["Q♣","8♦","J♠","10♥","K♣"]},
 {first:["Q♠","8♥","K♣","10♦","J♠","Q♥"],second:["J♥","9♣","Q♦","K♠","8♠"]},
 {first:["J♦","9♠","K♥","7♣","Q♣","10♥"],second:["10♣","K♥","Q♠","J♦","9♥"]}
];
export default function MissingCardGame(){
 const[stage,setStage]=useState<Stage>("intro"); const[run,setRun]=useState(0);
 const data=useMemo(()=>rounds[run%rounds.length],[run]);
 const restart=()=>{setRun(v=>v+1);setStage("intro")};
 return <main className="game-shell modern-game">
  <div className="game-topbar"><a href="/" className="back-button" aria-label="กลับหน้าหลัก">←</a><span>ไพ่ที่หายไป</span><span className="game-status-dot" aria-hidden="true"/></div>
  {stage==="intro"&&<section className="game-panel intro-panel"><div className="mind-orb">🃏</div><p className="eyebrow">เกมสังเกตและจดจำ</p><h1 className="game-heading">เลือกไพ่หนึ่งใบด้วยสายตา</h1><p className="game-lead">ไม่ต้องแตะไพ่ ไม่ต้องบอกเรา แค่จำมันให้ชัด</p><button className="game-primary" onClick={()=>setStage("memorize")}>เริ่มเล่น</button></section>}
  {stage==="memorize"&&<section className="game-panel card-stage"><div className="stage-label"><span>1</span><b>จำไพ่หนึ่งใบ</b></div><h1 className="question-title">มองทั้งชุด แล้วเลือกเพียงใบเดียว</h1><div className="playing-card-grid">{data.first.map(c=><div className="playing-card" key={c}><span>{c}</span></div>)}</div><button className="game-primary inline-action" onClick={()=>setStage("focus")}>จำได้แล้ว</button></section>}
  {stage==="focus"&&<section className="game-panel center-panel"><div className="reading-orb"><div>🧠</div></div><p className="eyebrow">อย่ามองหาใบอื่น</p><h1 className="reading-title">นึกภาพไพ่ของคุณไว้ในใจ</h1><p className="game-lead">พร้อมเมื่อไหร่ค่อยเปิดชุดถัดไป</p><button className="game-primary inline-action" onClick={()=>setStage("reveal")}>เปิดชุดถัดไป</button></section>}
  {stage==="reveal"&&<section className="game-panel card-stage"><div className="stage-label"><span>2</span><b>ลองหาไพ่ของคุณ</b></div><h1 className="question-title">ไพ่ที่คุณจำไว้ยังอยู่ไหม?</h1><div className="playing-card-grid reveal-cards">{data.second.map(c=><div className="playing-card" key={c}><span>{c}</span></div>)}</div><div className="reveal-actions inline-actions"><button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></section>}
 </main>
}
