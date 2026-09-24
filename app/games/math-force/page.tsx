"use client";
import { useMemo,useState } from "react";
import { GameHeader,Icon } from "../../../components/MindPlayUI";
import { getRoutine } from "../../../lib/games/mathEngine";

type Stage="intro"|"steps"|"reveal";
export default function MathForceGame(){
 const[stage,setStage]=useState<Stage>("intro");const[step,setStep]=useState(0);const[run,setRun]=useState(0);
 const routine=useMemo(()=>getRoutine(run),[run]);
 const next=()=>{if(step<routine.steps.length-1)setStep(v=>v+1);else setStage("reveal")};
 const restart=()=>{setRun(v=>v+1);setStep(0);setStage("intro")};
 return <main className="game-shell game-theme-math"><div className="game-aurora" aria-hidden="true"/><GameHeader title="เลขที่หนีไม่พ้น"/>
  {stage==="intro"&&<section className="game-panel intro-panel scene-enter"><div className="intro-icon motion-float"><Icon name="math"/></div><p className="eyebrow">{routine.label}</p><h1 className="game-heading">{routine.intro}</h1><p className="game-lead">แต่ละรอบใช้รูทีนคณิตศาสตร์คนละโครงสร้าง จึงไม่วนสูตรคูณสองแบบเดิมทุกครั้ง</p><div className="rules">{routine.rules.map(rule=><p key={rule}>{rule}</p>)}</div><button className="game-primary" onClick={()=>setStage("steps")}>เริ่มรูทีนนี้</button></section>}
  {stage==="steps"&&<section className="game-panel scene-enter"><div className="progress-track"><div className="progress-fill" style={{width:`${((step+1)/routine.steps.length)*100}%`}}/></div><div className="stage-label"><span>{step+1}</span><b>{routine.label}</b></div><h1 className="question-title">{routine.steps[step]}</h1><p className="question-help">ทำขั้นนี้ให้เสร็จก่อนแล้วค่อยไปต่อ</p><div className="math-energy"><span/><span/><span/></div><button className="game-primary" onClick={next}>{step===routine.steps.length-1?"เปิดผลลัพธ์":"ขั้นต่อไป"}</button></section>}
  {stage==="reveal"&&<section className="game-panel intro-panel scene-enter reveal-scene"><p className="eyebrow">Forced result</p><div className="reveal-number">{routine.result}</div><h1 className="reveal-question">นี่คือผลลัพธ์สุดท้ายของคุณ</h1><p className="game-lead">{routine.resultNote}</p><div className="reveal-actions"><button className="game-primary" onClick={restart}>ลองรูทีนอื่น</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></section>}
 </main>;
}
