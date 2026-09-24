"use client";
import { useMemo,useState } from "react";
import { GameFrame,HowToPlay,FocusStage,ReactionStage } from "../../../components/GameExperience";
import { Icon } from "../../../components/MindPlayUI";
import { MIND_SYMBOLS,nextSymbolQuestion,applySymbolAnswer } from "../../../lib/games/symbolMindV17";

type Stage="guide"|"think"|"questions"|"reading"|"result";
const steps=[
 "มองสัญลักษณ์ทั้งหมดแล้วเลือกหนึ่งรูปไว้ในใจ โดยไม่ต้องกดรูปนั้น",
 "จำรูปร่างเดิมไว้จนจบเกม",
 "ตอบคำถามจากความรู้สึกและลักษณะของสัญลักษณ์ที่คุณเลือก",
 "เมื่อคำถามจบ ให้โฟกัสรูปเดิมไว้จน MindPlay เปิดคำตอบ"
];

export default function SymbolMind(){
 const[stage,setStage]=useState<Stage>("guide");
 const[candidates,setCandidates]=useState(MIND_SYMBOLS);
 const[asked,setAsked]=useState<string[]>([]);
 const question=useMemo(()=>nextSymbolQuestion(candidates,asked),[candidates,asked]);
 const result=candidates.length===1?candidates[0]:null;

 const answer=(value:boolean)=>{
  if(!question)return;
  const next=applySymbolAnswer(candidates,question,value);
  setCandidates(next);setAsked(prev=>[...prev,question.id]);
  if(next.length<=1){setStage("reading");window.setTimeout(()=>setStage("result"),900)}
 };
 const restart=()=>{setCandidates(MIND_SYMBOLS);setAsked([]);setStage("guide")};

 return <GameFrame title="สัญลักษณ์ในใจ" tone="symbol" steps={steps}>
  {stage==="guide"&&<HowToPlay icon="symbol" title="สัญลักษณ์ในใจ" intro="เลือกหนึ่งรูปด้วยสายตา แล้วตอบเพียงความรู้สึกเกี่ยวกับรูปนั้นโดยไม่ต้องบอกชื่อสัญลักษณ์" steps={steps} onStart={()=>setStage("think")}/>}
  {stage==="think"&&<section className="stage stage-enter"><p className="mini-kicker">เลือกหนึ่งรูป</p><h1>จำสัญลักษณ์ที่ดึงสายตาคุณ</h1><p className="stage-copy">อย่ากดรูปที่เลือก แค่มองและจำมันไว้</p><div className="symbol-cloud">{MIND_SYMBOLS.map(symbol=><span key={symbol.id} className="symbol-tile" aria-label={symbol.name}><Icon name={symbol.icon}/></span>)}</div><button className="primary-control" onClick={()=>setStage("questions")}>ฉันจำแล้ว</button></section>}
  {stage==="questions"&&question&&<section className="stage stage-center stage-enter question-stage"><p className="mini-kicker">จับความรู้สึก {asked.length+1}</p><h1>{question.text}</h1><p className="stage-copy">เลือกคำตอบที่ตรงกับรูปในหัวคุณมากที่สุด</p><div className="binary-choice"><button className="choice-control" onClick={()=>answer(true)}>{question.yes}</button><button className="choice-control" onClick={()=>answer(false)}>{question.no}</button></div></section>}
  {stage==="reading"&&<FocusStage icon="eye" title="นึกถึงเส้นของรูปนั้น..." copy="พยายามเห็นสัญลักษณ์เดิมให้ชัดที่สุด"/>}
  {stage==="result"&&result&&<ReactionStage icon={result.icon} label={result.name} detail="นี่คือรูปที่คุณเลือกไว้ในใจใช่ไหม?" onRestart={restart}/>}
 </GameFrame>;
}
