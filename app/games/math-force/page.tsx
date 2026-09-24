"use client";
import { useEffect,useMemo,useState } from "react";
import { GameHeader, Icon } from "../../../components/MindPlayUI";

type Stage="intro"|"steps"|"reading"|"reveal";
const sequences=[
 {steps:["คิดเลขอะไรก็ได้ตั้งแต่ 1 ถึง 9","คูณเลขนั้นด้วย 2","บวก 10","หารด้วย 2","ลบเลขแรกที่คุณคิดไว้"],result:5},
 {steps:["คิดเลขอะไรก็ได้ตั้งแต่ 1 ถึง 9","คูณเลขนั้นด้วย 2","บวก 14","หารด้วย 2","ลบเลขแรกที่คุณคิดไว้"],result:7},
 {steps:["คิดเลขอะไรก็ได้ตั้งแต่ 1 ถึง 9","คูณเลขนั้นด้วย 2","บวก 18","หารด้วย 2","ลบเลขแรกที่คุณคิดไว้"],result:9}
];

export default function MathForceGame(){
 const[stage,setStage]=useState<Stage>("intro");const[step,setStep]=useState(0);const[run,setRun]=useState(0);
 const seq=useMemo(()=>sequences[run%sequences.length],[run]);
 useEffect(()=>{if(stage!=="reading")return;const timer=window.setTimeout(()=>setStage("reveal"),1450);return()=>window.clearTimeout(timer)},[stage]);
 const restart=()=>{setRun(v=>v+1);setStep(0);setStage("intro")};
 const next=()=>{if(step<seq.steps.length-1)setStep(v=>v+1);else setStage("reading")};
 return <main className="game-shell">
  <GameHeader title="เลขที่หนีไม่พ้น"/>
  {stage==="intro"&&<section className="game-panel intro-panel">
   <div className="intro-icon"><Icon name="math"/></div><p className="eyebrow">Mental calculation</p>
   <h1 className="game-heading">คุณเลือกเลขเอง<br/>เราไม่ต้องเห็นมัน</h1>
   <p className="game-lead">ทำตามทีละขั้นโดยเก็บเลขทั้งหมดไว้กับตัวเอง แล้วดูว่าผลสุดท้ายจะลงเอยตรงไหน</p>
   <button className="game-primary" onClick={()=>setStage("steps")}>เริ่มคำนวณ</button>
  </section>}
  {stage==="steps"&&<section className="game-panel">
   <div className="progress-track"><div className="progress-fill" style={{width:`${((step+1)/seq.steps.length)*100}%`}}/></div>
   <div className="stage-label"><span>{step+1}</span><b>ขั้นที่ {step+1} จาก {seq.steps.length}</b></div>
   <h1 className="question-title">{seq.steps[step]}</h1>
   <p className="question-help">ทำขั้นนี้ให้เสร็จก่อน แล้วค่อยกดไปต่อ</p>
   <button className="game-primary" onClick={next}>{step===seq.steps.length-1?"เปิดผลลัพธ์":"ขั้นต่อไป"}</button>
  </section>}
  {stage==="reading"&&<section className="game-panel intro-panel">
   <div className="reading-icon"><Icon name="brand"/></div><p className="eyebrow">Processing</p>
   <h1 className="game-heading">ตรวจเส้นทางของตัวเลข</h1><p className="game-lead">เลขแรกยังอยู่กับคุณ เรากำลังตรวจเฉพาะโครงสร้างของขั้นตอน</p>
  </section>}
  {stage==="reveal"&&<section className="game-panel intro-panel">
   <p className="eyebrow">Final result</p><div className="reveal-number">{seq.result}</div>
   <h1 className="reveal-question">นี่คือเลขที่คุณได้ใช่ไหม?</h1>
   <div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div>
  </section>}
 </main>;
}
