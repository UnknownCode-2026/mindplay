"use client";
import { useEffect,useMemo,useState } from "react";
type Stage="intro"|"steps"|"reading"|"reveal";
const sequences=[
 {start:"คิดเลขอะไรก็ได้ตั้งแต่ 1 ถึง 9",steps:["คูณเลขนั้นด้วย 2","บวก 10","หารด้วย 2","ลบเลขแรกที่คุณคิดไว้"],result:5},
 {start:"คิดเลขอะไรก็ได้ตั้งแต่ 1 ถึง 9",steps:["คูณเลขนั้นด้วย 2","บวก 14","หารด้วย 2","ลบเลขแรกที่คุณคิดไว้"],result:7},
 {start:"คิดเลขอะไรก็ได้ตั้งแต่ 1 ถึง 9",steps:["คูณเลขนั้นด้วย 2","บวก 18","หารด้วย 2","ลบเลขแรกที่คุณคิดไว้"],result:9}
];
export default function MathForceGame(){
 const[stage,setStage]=useState<Stage>("intro"); const[step,setStep]=useState(0); const[run,setRun]=useState(0);
 const seq=useMemo(()=>sequences[run%sequences.length],[run]);
 useEffect(()=>{if(stage!=="reading")return;const id=window.setTimeout(()=>setStage("reveal"),1200);return()=>window.clearTimeout(id)},[stage]);
 const restart=()=>{setRun(v=>v+1);setStep(0);setStage("intro")};
 const next=()=>{if(step<seq.steps.length-1)setStep(v=>v+1);else setStage("reading")};
 return <main className="game-shell modern-game">
  <div className="game-topbar"><a href="/" className="back-button">←</a><span>เลขที่หนีไม่พ้น</span><span className="game-status-dot"/></div>
  {stage==="intro"&&<section className="game-panel intro-panel"><div className="mind-orb">🧠</div><p className="eyebrow">คำนวณในใจ</p><h1 className="game-heading">{seq.start}</h1><p className="game-lead">ไม่ต้องกรอกเลข ทำตามทีละขั้น แล้วดูว่าผลสุดท้ายจะเป็นอะไร</p><button className="game-primary" onClick={()=>setStage("steps")}>เริ่มคำนวณ</button></section>}
  {stage==="steps"&&<section className="game-panel force-stage"><div className="progress-track"><div className="progress-fill" style={{width:`${((step+1)/seq.steps.length)*100}%`}}/></div><div className="stage-label"><span>{step+1}</span><b>ทำทีละขั้น</b></div><h1 className="question-title">{seq.steps[step]}</h1><p className="game-lead">ทำเสร็จแล้วค่อยไปต่อ เพื่อไม่ให้หลงขั้นตอน</p><button className="game-primary inline-action" onClick={next}>{step===seq.steps.length-1?"ดูผลลัพธ์":"ขั้นต่อไป →"}</button></section>}
  {stage==="reading"&&<section className="game-panel center-panel"><div className="reading-orb"><div>🧠</div></div><p className="eyebrow">กำลังตรวจคำตอบ</p><h1 className="reading-title">คุณไม่เคยบอกเลขแรกกับเรา</h1></section>}
  {stage==="reveal"&&<section className="game-panel center-panel reveal-stage"><p className="eyebrow">ผลลัพธ์สุดท้าย</p><div className="reveal-number">{seq.result}</div><h1 className="reveal-question">นี่คือเลขที่คุณได้ใช่ไหม?</h1><div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></section>}
 </main>
}
