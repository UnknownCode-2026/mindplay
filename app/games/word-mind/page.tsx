"use client";
import { useMemo,useState } from "react";
import { GameFrame,HowToPlay,FocusStage,ReactionStage } from "../../../components/GameExperience";
import { MIND_WORDS,nextWordQuestion,applyWordAnswer } from "../../../lib/games/wordMindV17";

type Stage="guide"|"think"|"questions"|"reading"|"result";
const steps=[
 "มองรายการคำทั้งหมด แล้วเลือกหนึ่งคำไว้ในใจโดยไม่ต้องแตะคำนั้น",
 "อย่าเปลี่ยนคำเมื่อเริ่มเกม",
 "ตอบคำถามเกี่ยวกับสิ่งที่คุณคิดตามความจริงทีละข้อ",
 "MindPlay จะค่อย ๆ อ่านเบาะแสและทายคำสุดท้าย"
];

export default function WordMind(){
 const[stage,setStage]=useState<Stage>("guide");
 const[candidates,setCandidates]=useState(MIND_WORDS);
 const[asked,setAsked]=useState<string[]>([]);
 const question=useMemo(()=>nextWordQuestion(candidates,asked),[candidates,asked]);
 const result=candidates.length===1?candidates[0]:null;

 const answer=(value:boolean)=>{
  if(!question)return;
  const next=applyWordAnswer(candidates,question,value);
  setCandidates(next);setAsked(prev=>[...prev,question.id]);
  if(next.length<=1){setStage("reading");window.setTimeout(()=>setStage("result"),950)}
 };
 const restart=()=>{setCandidates(MIND_WORDS);setAsked([]);setStage("guide")};

 return <GameFrame title="คำที่ซ่อนอยู่ในหัว" tone="word" steps={steps}>
  {stage==="guide"&&<HowToPlay icon="spark" title="คำที่ซ่อนอยู่ในหัว" intro="เลือกหนึ่งคำจากรายการที่กำหนด แล้วเก็บมันไว้กับตัวเอง เราจะถามเพียงคุณสมบัติของสิ่งนั้น" steps={steps} onStart={()=>setStage("think")}/>}
  {stage==="think"&&<section className="stage stage-enter"><p className="mini-kicker">เลือกคำในใจ</p><h1>เลือกเพียงหนึ่งคำ แล้วอย่าบอกเรา</h1><p className="stage-copy">อ่านรายการให้ครบ เลือกคำที่ต้องการ แล้วจำคำนั้นไว้ตลอดเกม</p><div className="word-board">{MIND_WORDS.map(item=><span key={item.id}>{item.word}</span>)}</div><button className="primary-control" onClick={()=>setStage("questions")}>ฉันเลือกคำแล้ว</button></section>}
  {stage==="questions"&&question&&<section className="stage stage-center stage-enter question-stage"><p className="mini-kicker">เบาะแส {asked.length+1}</p><h1>{question.text}</h1><p className="stage-copy">ตอบตามสิ่งที่คุณเลือกไว้ตั้งแต่แรก</p><div className="binary-choice"><button className="choice-control" onClick={()=>answer(true)}>{question.yes}</button><button className="choice-control" onClick={()=>answer(false)}>{question.no}</button></div></section>}
  {stage==="reading"&&<FocusStage icon="spark" title="พูดคำนั้นในใจหนึ่งครั้ง..." copy="ไม่ต้องออกเสียง แค่เห็นคำเดิมชัด ๆ ในความคิด"/>}
  {stage==="result"&&result&&<ReactionStage icon="spark" label={result.word} detail="นี่คือคำที่คุณเลือกไว้ใช่ไหม?" onRestart={restart}/>}
 </GameFrame>;
}
