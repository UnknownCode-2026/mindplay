"use client";
import { useState } from "react";
import { GameFrame,HowToPlay,FocusStage,ReactionStage } from "../../../components/GameExperience";
import { answerGame,startGame,type GameQuestion,type GameResult,type GameSessionRef } from "../../../lib/mindplayApi";
type Stage="guide"|"connecting"|"think"|"questions"|"reading"|"result"|"error";
type WordPoolItem={id:number;word:string};
const steps=[
 "มองรายการคำทั้งหมด แล้วเลือกหนึ่งคำไว้ในใจโดยไม่ต้องแตะคำนั้น",
 "อย่าเปลี่ยนคำเมื่อเริ่มเกม",
 "ตอบคำถามเกี่ยวกับสิ่งที่คุณคิดตามความจริงทีละข้อ",
 "MindPlay จะค่อย ๆ อ่านเบาะแสและทายคำสุดท้าย"
];
export default function WordMind(){
 const[stage,setStage]=useState<Stage>("guide");
 const[session,setSession]=useState<GameSessionRef|null>(null);
 const[pool,setPool]=useState<WordPoolItem[]>([]);
 const[question,setQuestion]=useState<GameQuestion|null>(null);
 const[result,setResult]=useState<GameResult|null>(null);
 const[step,setStep]=useState(1);
 const[busy,setBusy]=useState(false);
 const[error,setError]=useState("");
 const begin=async()=>{
  setStage("connecting");setError("");
  try{
   const started=await startGame("word-mind",window.location.pathname);
   const nextPool=(started.pool??[]) as WordPoolItem[];
   if(!started.question||nextPool.length===0)throw new Error("missing_game_data");
   setSession({sessionId:started.sessionId,token:started.token});setPool(nextPool);setQuestion(started.question);setResult(null);setStep(1);setStage("think");
  }catch{setError("เชื่อมต่อ Game Engine ไม่สำเร็จ โปรดลองอีกครั้ง");setStage("error")}
 };
 const answer=async(value:boolean)=>{
  if(!session||!question||busy)return;setBusy(true);
  try{
   const next=await answerGame(session,question.id,value);
   if(next.done&&next.result){setResult(next.result);setStage("reading");window.setTimeout(()=>setStage("result"),950)}
   else if(next.question){setQuestion(next.question);setStep(next.step??step+1)}
   else throw new Error("missing_next");
  }catch{setError("คำตอบรอบนี้ส่งไม่สำเร็จ กรุณาเริ่มรอบใหม่เพื่อป้องกันผลลัพธ์คลาดเคลื่อน");setStage("error")}
  finally{setBusy(false)}
 };
 const restart=()=>{setSession(null);setPool([]);setQuestion(null);setResult(null);setStep(1);setError("");setStage("guide")};
 return <GameFrame title="คำที่ซ่อนอยู่ในหัว" tone="word" steps={steps}>
  {stage==="guide"&&<HowToPlay icon="spark" title="คำที่ซ่อนอยู่ในหัว" intro="เลือกหนึ่งคำจากรายการที่กำหนด แล้วเก็บมันไว้กับตัวเอง เราจะถามเพียงคุณสมบัติของสิ่งนั้น" steps={steps} onStart={()=>void begin()}/>}
  {stage==="connecting"&&<section className="stage stage-center stage-enter"><p className="mini-kicker">กำลังเตรียมเกม</p><h1>กำลังเปิดคลังคำ...</h1><p className="stage-copy">Game Engine กำลังสร้างเซสชันทายคำรอบใหม่</p><span className="system-loader"><span/></span></section>}
  {stage==="think"&&<section className="stage stage-enter"><p className="mini-kicker">เลือกคำในใจ</p><h1>เลือกเพียงหนึ่งคำ แล้วอย่าบอกเรา</h1><p className="stage-copy">อ่านรายการให้ครบ เลือกคำที่ต้องการ แล้วจำคำนั้นไว้ตลอดเกม</p><div className="word-board">{pool.map(item=><span key={item.id}>{item.word}</span>)}</div><button className="primary-control" onClick={()=>setStage("questions")}>ฉันเลือกคำแล้ว</button></section>}
  {stage==="questions"&&question&&<section className="stage stage-center stage-enter question-stage"><p className="mini-kicker">เบาะแส {step}</p><h1>{question.text}</h1><p className="stage-copy">ตอบตามสิ่งที่คุณเลือกไว้ตั้งแต่แรก</p><div className="binary-choice"><button className="choice-control" disabled={busy} onClick={()=>void answer(true)}>{question.yes}</button><button className="choice-control" disabled={busy} onClick={()=>void answer(false)}>{question.no}</button></div></section>}
  {stage==="reading"&&<FocusStage icon="spark" title="พูดคำนั้นในใจหนึ่งครั้ง..." copy="ไม่ต้องออกเสียง แค่เห็นคำเดิมชัด ๆ ในความคิด"/>}
  {stage==="result"&&result&&<ReactionStage analytics={session} icon="spark" label={result.label} detail="นี่คือคำที่คุณเลือกไว้ใช่ไหม?" onRestart={restart}/>}
  {stage==="error"&&<section className="stage stage-center stage-enter"><p className="mini-kicker">เชื่อมต่อขัดข้อง</p><h1>รอบนี้ยังอ่านต่อไม่ได้</h1><p className="stage-copy">{error}</p><button className="primary-control" onClick={()=>void begin()}>ลองเชื่อมต่อใหม่</button><button className="secondary-control" onClick={restart}>กลับไปวิธีเล่น</button></section>}
 </GameFrame>;
}
