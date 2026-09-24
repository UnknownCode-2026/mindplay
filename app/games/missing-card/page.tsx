"use client";
import { useMemo,useState } from "react";
import { GameFrame,HowToPlay,FocusStage,ReactionStage } from "../../../components/GameExperience";
import { SuitMark } from "../../../components/MindPlayUI";
import { CARD_SET,cardLanes,decodeCard,type MindCard } from "../../../lib/games/cardMindV17";

type Stage="guide"|"think"|"lane0"|"lane1"|"lane2"|"reading"|"result";
const steps=[
 "มองไพ่ทั้งหมดแล้วเลือกเพียงหนึ่งใบไว้ในใจ โดยไม่ต้องแตะไพ่ใบนั้น",
 "จำทั้งหน้าไพ่และดอกให้ชัด และอย่าเปลี่ยนไพ่ระหว่างเกม",
 "ในแต่ละรอบเลือกแถวที่คุณมองเห็นไพ่เดิม ไม่ต้องบอกว่าเป็นใบไหน",
 "เมื่อครบทุกช่วง ให้โฟกัสไพ่เดิมไว้จน MindPlay เปิดคำตอบ"
];

function Card({card,small=false}:{card:MindCard;small?:boolean}){
 const red=card.suit==="heart"||card.suit==="diamond";
 return <span className={(small?"mind-card mini ":"mind-card ")+(red?"red":"black")}>
   <span className="mind-card-corner"><b>{card.rank}</b><SuitMark suit={card.suit}/></span>
   {!small&&<span className="mind-card-center"><SuitMark suit={card.suit}/></span>}
 </span>;
}

export default function CardMind(){
 const[stage,setStage]=useState<Stage>("guide");
 const[seed,setSeed]=useState(31);
 const[keys,setKeys]=useState<number[]>([]);
 const lanes0=useMemo(()=>cardLanes(0,seed),[seed]);
 const lanes1=useMemo(()=>cardLanes(1,seed+17),[seed]);
 const lanes2=useMemo(()=>cardLanes(2,seed+41),[seed]);
 const result=keys.length===3?decodeCard(keys):null;

 const pick=(key:number)=>{
  const next=[...keys,key];setKeys(next);
  if(stage==="lane0")setStage("lane1");
  else if(stage==="lane1")setStage("lane2");
  else{setStage("reading");window.setTimeout(()=>setStage("result"),850)}
 };
 const restart=()=>{setSeed(v=>v+71);setKeys([]);setStage("guide")};
 const suitText=result?({spade:"โพดำ",heart:"โพแดง",diamond:"ข้าวหลามตัด",club:"ดอกจิก"} as const)[result.suit]:"";

 const renderLanes=(lanes:ReturnType<typeof cardLanes>)=><div className="lane-stack">{lanes.map((lane,index)=><button className="card-lane" key={lane.key} onClick={()=>pick(lane.key)}><span className="lane-name">แถว {index+1}</span><span className="lane-cards">{lane.cards.map(card=><Card key={card.id} card={card} small/>)}</span></button>)}</div>;

 return <GameFrame title="ไพ่ในความคิด" tone="cards" steps={steps}>
  {stage==="guide"&&<HowToPlay icon="cards" title="ไพ่ในความคิด" intro="เลือกไพ่หนึ่งใบไว้ในหัว แล้วให้ MindPlay ค่อย ๆ ตามรอยโดยที่คุณไม่ต้องแตะไพ่ที่เลือกโดยตรง" steps={steps} onStart={()=>setStage("think")}/>}
  {stage==="think"&&<section className="stage stage-enter"><p className="mini-kicker">เลือกด้วยสายตา</p><h1>จำไพ่หนึ่งใบจากชุดนี้</h1><p className="stage-copy">ใช้เวลามองให้ครบ จำหน้าไพ่และดอกให้ชัด แล้วกดเมื่อพร้อม</p><div className="card-memory-grid">{CARD_SET.map(card=><Card key={card.id} card={card}/>)}</div><button className="primary-control" onClick={()=>setStage("lane0")}>ฉันจำได้แล้ว</button></section>}
  {stage==="lane0"&&<section className="stage stage-enter"><p className="mini-kicker">ช่วงที่ 1</p><h1>ตอนนี้ไพ่ของคุณอยู่แถวไหน?</h1><p className="stage-copy">มองให้เจอแล้วเลือกทั้งแถว ไม่ต้องแตะไพ่ใบนั้น</p>{renderLanes(lanes0)}</section>}
  {stage==="lane1"&&<section className="stage stage-enter"><p className="mini-kicker">ช่วงที่ 2</p><h1>ไพ่ถูกจัดใหม่แล้ว</h1><p className="stage-copy">หาไพ่ใบเดิมอีกครั้ง แล้วเลือกแถวที่มันอยู่</p>{renderLanes(lanes1)}</section>}
  {stage==="lane2"&&<section className="stage stage-enter"><p className="mini-kicker">ช่วงสุดท้าย</p><h1>มองหาไพ่เดิมเป็นครั้งสุดท้าย</h1><p className="stage-copy">อย่าเปลี่ยนไพ่ในใจ เลือกเฉพาะแถวที่เห็นมัน</p>{renderLanes(lanes2)}</section>}
  {stage==="reading"&&<FocusStage icon="cards" title="นึกภาพไพ่ใบนั้นไว้..." copy="จำทั้งหน้าไพ่และดอกให้ชัด อย่าเพิ่งเปลี่ยนใจ"/>}
  {stage==="result"&&result&&<ReactionStage icon="cards" label={result.rank+" "+suitText} detail="นี่คือไพ่ที่คุณเก็บไว้ในความคิดใช่ไหม?" onRestart={restart}/>}
 </GameFrame>;
}
