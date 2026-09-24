"use client";
import { useMemo,useState } from "react";
import { GameFrame,HowToPlay,FocusStage,ReactionStage } from "../../../components/GameExperience";
import { NUMBER_POOL,nextNumberQuestion,applyNumberAnswer } from "../../../lib/games/numberMindV17";

type Stage="guide"|"think"|"questions"|"reading"|"result";
const steps=[
 "คิดเลขจำนวนเต็มหนึ่งตัวตั้งแต่ 1 ถึง 50 แล้วเก็บไว้ในใจ",
 "ไม่ต้องพิมพ์เลขของคุณลงในเว็บไซต์ และอย่าเปลี่ยนเลขกลางเกม",
 "ตอบคำถามสั้น ๆ ตามคุณสมบัติของเลขที่คุณคิด",
 "เมื่อคำถามจบ ให้โฟกัสเลขเดิมไว้จน MindPlay เปิดคำตอบ"
];

export default function NumberMind(){
 const[stage,setStage]=useState<Stage>("guide");
 const[candidates,setCandidates]=useState(NUMBER_POOL);
 const[asked,setAsked]=useState<string[]>([]);
 const question=useMemo(()=>nextNumberQuestion(candidates,asked),[candidates,asked]);
 const result=candidates.length===1?candidates[0]:null;

 const answer=(value:boolean)=>{
  if(!question)return;
  const next=applyNumberAnswer(candidates,question,value);
  const nextAsked=[...asked,question.id];
  setCandidates(next);setAsked(nextAsked);
  if(next.length<=1){setStage("reading");window.setTimeout(()=>setStage("result"),900)}
 };
 const restart=()=>{setCandidates(NUMBER_POOL);setAsked([]);setStage("guide")};

 return <GameFrame title="เลขที่คุณกำลังคิด" tone="number" steps={steps}>
  {stage==="guide"&&<HowToPlay icon="number" title="เลขที่คุณกำลังคิด" intro="เกมนี้จะไม่ขอให้คุณพิมพ์เลขตรง ๆ เราจะขอเพียงเบาะแสสั้น ๆ จากสิ่งที่คุณคิด" steps={steps} onStart={()=>setStage("think")}/>}
  {stage==="think"&&<section className="stage stage-center stage-enter"><div className="number-orb">1–50</div><p className="mini-kicker">เลือกในใจ</p><h1>คิดเลขหนึ่งตัวแล้วจำไว้</h1><p className="stage-copy">ไม่ต้องบอกใคร และอย่าเปลี่ยนเลขเมื่อเริ่มตอบคำถาม</p><button className="primary-control" onClick={()=>setStage("questions")}>ฉันมีเลขแล้ว</button></section>}
  {stage==="questions"&&question&&<section className="stage stage-center stage-enter question-stage"><p className="mini-kicker">อ่านเบาะแส {asked.length+1}</p><h1>{question.text}</h1><p className="stage-copy">ตอบตามเลขที่คุณคิดจริง ๆ ไม่ต้องพยายามเดาว่าเรากำลังหาอะไร</p><div className="binary-choice"><button className="choice-control" onClick={()=>answer(true)}>{question.yes}</button><button className="choice-control" onClick={()=>answer(false)}>{question.no}</button></div></section>}
  {stage==="reading"&&<FocusStage icon="number" title="อย่าเปลี่ยนเลขนะ..." copy="ลองมองเลขนั้นในหัวเหมือนเขียนอยู่บนพื้นมืด ๆ"/>}
  {stage==="result"&&result!==null&&<ReactionStage icon="number" label={String(result)} detail="เลขนี้คือสิ่งที่คุณคิดไว้ใช่ไหม?" onRestart={restart}/>}
 </GameFrame>;
}
