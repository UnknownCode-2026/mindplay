"use client";
import { useState } from "react";
import { GameFrame,HowToPlay,FocusStage,ReactionStage } from "../../../components/GameExperience";
import { Icon,type IconName } from "../../../components/MindPlayUI";
import { answerGame,startGame,type GameQuestion,type GameResult,type GameSessionRef } from "../../../lib/mindplayApi";
type Stage="guide"|"connecting"|"think"|"questions"|"reading"|"result"|"error";
type SymbolPoolItem={id:number;icon:IconName;name:string};
const steps=[
 "มองสัญลักษณ์ทั้งหมดแล้วเลือกหนึ่งรูปไว้ในใจ โดยไม่ต้องกดรูปนั้น",
 "จำรูปร่างเดิมไว้จนจบเกม",
 "ตอบคำถามจากความรู้สึกและลักษณะของสัญลักษณ์ที่คุณเลือก",
 "เมื่อคำถามจบ ให้โฟกัสรูปเดิมไว้จน MindPlay เปิดคำตอบ"
];
export default function SymbolMind(){
 const[stage,setStage]=useState<Stage>("guide");
 const[session,setSession]=useState<GameSessionRef|null>(null);
 const[pool,setPool]=useState<SymbolPoolItem[]>([]);
 const[question,setQuestion]=useState<GameQuestion|null>(null);
 const[result,setResult]=useState<GameResult|null>(null);
 const[step,setStep]=useState(1);
 const[busy,setBusy]=useState(false);
 const[error,setError]=useState("");
 const begin=async()=>{
  setStage("connecting");setError("");
  try{
   const started=await startGame("symbol-mind",window.location.pathname);
   const nextPool=(started.pool??[]) as SymbolPoolItem[];
   if(!started.question||nextPool.length===0)throw new Error("missing_game_data");
   setSession({sessionId:started.sessionId,token:started.token});setPool(nextPool);setQuestion(started.question);setResult(null);setStep(1);setStage("think");
  }catch{setError("เชื่อมต่อ Game Engine ไม่สำเร็จ โปรดลองอีกครั้ง");setStage("error")}
 };
 const answer=async(value:boolean)=>{
  if(!session||!question||busy)return;setBusy(true);
  try{
   const next=await answerGame(session,question.id,value);
   if(next.done&&next.result){setResult(next.result);setStage("reading");window.setTimeout(()=>setStage("result"),900)}
   else if(next.question){setQuestion(next.question);setStep(next.step??step+1)}
   else throw new Error("missing_next");
  }catch{setError("ข้อมูลรอบนี้ไม่สมบูรณ์ กรุณาเริ่มรอบใหม่เพื่อให้คำทายแม่นยำ");setStage("error")}
  finally{setBusy(false)}
 };
 const restart=()=>{setSession(null);setPool([]);setQuestion(null);setResult(null);setStep(1);setError("");setStage("guide")};
 return <GameFrame title="สัญลักษณ์ในใจ" tone="symbol" steps={steps}>
  {stage==="guide"&&<HowToPlay icon="symbol" title="สัญลักษณ์ในใจ" intro="เลือกหนึ่งรูปด้วยสายตา แล้วตอบเพียงความรู้สึกเกี่ยวกับรูปนั้นโดยไม่ต้องบอกชื่อสัญลักษณ์" steps={steps} onStart={()=>void begin()}/>}
  {stage==="connecting"&&<section className="stage stage-center stage-enter"><p className="mini-kicker">กำลังเตรียมเกม</p><h1>กำลังจัดชุดสัญลักษณ์...</h1><p className="stage-copy">Game Engine กำลังเตรียมเซสชันเฉพาะรอบนี้</p><span className="system-loader"><span/></span></section>}
  {stage==="think"&&<section className="stage stage-enter"><p className="mini-kicker">เลือกหนึ่งรูป</p><h1>จำสัญลักษณ์ที่ดึงสายตาคุณ</h1><p className="stage-copy">อย่ากดรูปที่เลือก แค่มองและจำมันไว้</p><div className="symbol-cloud">{pool.map(symbol=><span key={symbol.id} className="symbol-tile" aria-label={symbol.name}><Icon name={symbol.icon}/></span>)}</div><button className="primary-control" onClick={()=>setStage("questions")}>ฉันจำแล้ว</button></section>}
  {stage==="questions"&&question&&<section className="stage stage-center stage-enter question-stage"><p className="mini-kicker">จับความรู้สึก {step}</p><h1>{question.text}</h1><p className="stage-copy">เลือกคำตอบที่ตรงกับรูปในหัวคุณมากที่สุด</p><div className="binary-choice"><button className="choice-control" disabled={busy} onClick={()=>void answer(true)}>{question.yes}</button><button className="choice-control" disabled={busy} onClick={()=>void answer(false)}>{question.no}</button></div></section>}
  {stage==="reading"&&<FocusStage icon="eye" title="นึกถึงเส้นของรูปนั้น..." copy="พยายามเห็นสัญลักษณ์เดิมให้ชัดที่สุด"/>}
  {stage==="result"&&result&&<ReactionStage analytics={session} icon={(result.icon as IconName)||"symbol"} label={result.label} detail="นี่คือรูปที่คุณเลือกไว้ในใจใช่ไหม?" onRestart={restart}/>}
  {stage==="error"&&<section className="stage stage-center stage-enter"><p className="mini-kicker">เชื่อมต่อขัดข้อง</p><h1>รอบนี้ยังอ่านต่อไม่ได้</h1><p className="stage-copy">{error}</p><button className="primary-control" onClick={()=>void begin()}>ลองเชื่อมต่อใหม่</button><button className="secondary-control" onClick={restart}>กลับไปวิธีเล่น</button></section>}
 </GameFrame>;
}
