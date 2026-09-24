"use client";
import { useEffect,useState } from "react";
import { GameFrame,HowToPlay,FocusStage,ReactionStage } from "../../../components/GameExperience";
import { Icon } from "../../../components/MindPlayUI";
import { PREDICTION_ITEMS,createTarget,type PredictionItem } from "../../../lib/games/predictionMindV17";

type Stage="guide"|"sealed"|"choice"|"reading"|"result";
const steps=[
 "MindPlay จะปิดผนึกหนึ่งภาพไว้ก่อนที่คุณจะเริ่มเลือก",
 "ในแต่ละรอบ แตะสิ่งที่ดึงสายตาคุณมากที่สุดโดยไม่คิดนาน",
 "สนามจะค่อย ๆ เปลี่ยนไปจนเหลือเส้นทางสุดท้ายเพียงหนึ่ง",
 "ตอนจบเราจะเปิดสิ่งที่ถูกปิดผนึกไว้ตั้งแต่ก่อนเริ่ม"
];

export default function SealedPrediction(){
 const[stage,setStage]=useState<Stage>("guide");
 const[target,setTarget]=useState<PredictionItem|null>(null);
 const[candidates,setCandidates]=useState<PredictionItem[]>(PREDICTION_ITEMS);
 const[round,setRound]=useState(0);

 useEffect(()=>{setTarget(createTarget())},[]);

 const begin=()=>{
  const nextTarget=target??createTarget();
  setTarget(nextTarget);setCandidates(PREDICTION_ITEMS);setRound(0);setStage("sealed");
 };

 const choose=(picked:PredictionItem)=>{
  if(!target)return;
  let next:PredictionItem[];
  if(picked.id===target.id){
    const removable=candidates.find(item=>item.id!==target.id);
    next=removable?candidates.filter(item=>item.id!==removable.id):candidates;
  }else{
    next=candidates.filter(item=>item.id!==picked.id);
  }
  setCandidates(next);setRound(v=>v+1);
  if(next.length===1){setStage("reading");window.setTimeout(()=>setStage("result"),950)}
 };

 const restart=()=>{
  setTarget(createTarget());setCandidates(PREDICTION_ITEMS);setRound(0);setStage("guide");
 };

 return <GameFrame title="คำทำนายที่ปิดผนึก" tone="prediction" steps={steps}>
  {stage==="guide"&&<HowToPlay icon="prediction" title="คำทำนายที่ปิดผนึก" intro="ก่อนคุณตัดสินใจ เราจะซ่อนหนึ่งภาพไว้ แล้วให้คุณเดินผ่านตัวเลือกตามสัญชาตญาณจนถึงคำตอบสุดท้าย" steps={steps} onStart={begin}/>}
  {stage==="sealed"&&<section className="stage stage-center stage-enter">
    <div className="sealed-envelope"><Icon name="prediction"/><span/></div>
    <p className="mini-kicker">ปิดผนึกแล้ว</p>
    <h1>คำทำนายถูกซ่อนไว้เรียบร้อย</h1>
    <p className="stage-copy">จากนี้เลือกตามความรู้สึกแรกของคุณ อย่าพยายามเดาว่าเราต้องการให้เลือกอะไร</p>
    <button className="primary-control" onClick={()=>setStage("choice")}>เริ่มตัดสินใจ</button>
  </section>}
  {stage==="choice"&&target&&<section className="stage stage-center stage-enter">
    <p className="mini-kicker">การตัดสินใจ {round+1}</p>
    <h1>แตะหนึ่งสิ่งที่ดึงสายตาคุณที่สุด</h1>
    <p className="stage-copy">เลือกเร็ว ๆ ตามสัญชาตญาณ แล้วปล่อยให้สนามเปลี่ยนไปเอง</p>
    <div className="prediction-grid">{candidates.map(item=><button className="prediction-option" key={item.id} onClick={()=>choose(item)}><Icon name={item.icon}/><span>{item.label}</span></button>)}</div>
  </section>}
  {stage==="reading"&&<FocusStage icon="prediction" title="อย่าเปลี่ยนความรู้สึกตอนนี้..." copy="นึกถึงสิ่งที่เหลืออยู่ในหัวของคุณเพียงอย่างเดียว"/>}
  {stage==="result"&&target&&<ReactionStage icon={target.icon} label={target.label} detail="นี่คือภาพที่ถูกปิดผนึกไว้ก่อนที่คุณจะเริ่มเลือก" onRestart={restart}/>}
 </GameFrame>;
}
