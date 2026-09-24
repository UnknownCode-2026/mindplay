"use client";
import { useState } from "react";
import { GameFrame,HowToPlay,FocusStage,ReactionStage } from "../../../components/GameExperience";
import { answerGame,startGame,type GameQuestion,type GameResult,type GameSessionRef } from "../../../lib/mindplayApi";
type Stage="guide"|"connecting"|"think"|"questions"|"reading"|"result"|"error";
const steps=[
 "คิดเลขจำนวนเต็มหนึ่งตัวตั้งแต่ 1 ถึง 50 แล้วเก็บไว้ในใจ",
 "ไม่ต้องพิมพ์เลขของคุณลงในเว็บไซต์ และอย่าเปลี่ยนเลขกลางเกม",
 "ตอบคำถามสั้น ๆ ตามคุณสมบัติของเลขที่คุณคิด",
 "เมื่อคำถามจบ ให้โฟกัสเลขเดิมไว้จน MindPlay เปิดคำตอบ"
];
export default function NumberMind(){
 const[stage,setStage]=useState<Stage>("guide");
 const[session,setSession]=useState<GameSessionRef|null>(null);
 const[question,setQuestion]=useState<GameQuestion|null>(null);
 const[result,setResult]=useState<GameResult|null>(null);
 const[step,setStep]=useState(1);
 const[busy,setBusy]=useState(false);
 const[error,setError]=useState("");
 const begin=async()=>{
  setStage("connecting");setError("");
  try{
   const started=await startGame("number-mind",window.location.pathname);
   setSession({sessionId:started.sessionId,token:started.token});setQuestion(started.question);setStep(1);
   if(!started.question)throw new Error("missing_question");
   setStage("think");
  }catch{setError("เชื่อมต่อเกมไม่สำเร็จ โปรดลองอีกครั้ง");setStage("error")}
 };
 const answer=async(value:boolean)=>{
  if(!session||!question||busy)return;setBusy(true);
  try{
   const next=await answerGame(session,question.id,value);
   if(next.done&&next.result){setResult(next.result);setStage("reading");window.setTimeout(()=>setStage("result"),900)}
   else if(next.question){setQuestion(next.question);setStep(next.step??step+1)}
   else throw new Error("missing_next_question");
  }catch{setError("คำตอบรอบนี้ส่งไม่สำเร็จ กรุณาเริ่มรอบใหม่เพื่อป้องกันผลลัพธ์คลาดเคลื่อน");setStage("error")}
  finally{setBusy(false)}
 };
 const restart=()=>{setSession(null);setQuestion(null);setResult(null);setStep(1);setError("");setStage("guide")};
 return <GameFrame title="เลขที่คุณกำลังคิด" tone="number" steps={steps}>
  {stage==="guide"&&<HowToPlay icon="number" title="เลขที่คุณกำลังคิด" intro="เกมนี้จะไม่ขอให้คุณพิมพ์เลขตรง ๆ เราจะขอเพียงเบาะแสสั้น ๆ จากสิ่งที่คุณคิด" steps={steps} onStart={()=>void begin()}/>}
  {stage==="connecting"&&<section className="stage stage-center stage-enter"><p className="mini-kicker">กำลังเตรียมเกม</p><h1>เปิดเซสชันอ่านใจ...</h1><p className="stage-copy">กำลังเชื่อมต่อกับ Game Engine เพื่อเตรียมคำถามรอบนี้</p><span className="system-loader"><span/></span></section>}
  {stage==="think"&&<section className="stage stage-center stage-enter"><div className="number-orb">1–50</div><p className="mini-kicker">เลือกในใจ</p><h1>คิดเลขหนึ่งตัวแล้วจำไว้</h1><p className="stage-copy">ไม่ต้องบอกใคร และอย่าเปลี่ยนเลขเมื่อเริ่มตอบคำถาม</p><button className="primary-control" onClick={()=>setStage("questions")}>ฉันมีเลขแล้ว</button></section>}
  {stage==="questions"&&question&&<section className="stage stage-center stage-enter question-stage"><p className="mini-kicker">อ่านเบาะแส {step}</p><h1>{question.text}</h1><p className="stage-copy">ตอบตามเลขที่คุณคิดจริง ๆ ไม่ต้องพยายามเดาว่าเรากำลังหาอะไร</p><div className="binary-choice"><button className="choice-control" disabled={busy} onClick={()=>void answer(true)}>{question.yes}</button><button className="choice-control" disabled={busy} onClick={()=>void answer(false)}>{question.no}</button></div></section>}
  {stage==="reading"&&<FocusStage icon="number" title="อย่าเปลี่ยนเลขนะ..." copy="ลองมองเลขนั้นในหัวเหมือนเขียนอยู่บนพื้นมืด ๆ"/>}
  {stage==="result"&&result&&<ReactionStage analytics={session} icon="number" label={result.label} detail="เลขนี้คือสิ่งที่คุณคิดไว้ใช่ไหม?" onRestart={restart}/>}
  {stage==="error"&&<section className="stage stage-center stage-enter"><p className="mini-kicker">เชื่อมต่อขัดข้อง</p><h1>รอบนี้ยังอ่านต่อไม่ได้</h1><p className="stage-copy">{error}</p><button className="primary-control" onClick={()=>void begin()}>ลองเชื่อมต่อใหม่</button><button className="secondary-control" onClick={restart}>กลับไปวิธีเล่น</button></section>}
 </GameFrame>;
}
