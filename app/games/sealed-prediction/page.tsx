"use client";
import { useCallback,useEffect,useState } from "react";
import { GameHeader,Icon,type IconName } from "../../../components/MindPlayUI";
import { randomNonce,sha256,shortFingerprint } from "../../../lib/games/predictionEngine";

type Option={id:string;label:string;icon:IconName};
type Stage="loading"|"intro"|"choice"|"reveal";
const OPTIONS:Option[]=[
 {id:"moon",label:"พระจันทร์",icon:"moon"},
 {id:"key",label:"กุญแจ",icon:"key"},
 {id:"eye",label:"ดวงตา",icon:"eye"},
 {id:"star",label:"ดาว",icon:"star"},
 {id:"diamond",label:"เพชร",icon:"diamond"},
];

export default function SealedPrediction(){
 const[stage,setStage]=useState<Stage>("loading");
 const[target,setTarget]=useState<Option|null>(null);
 const[nonce,setNonce]=useState("");
 const[hash,setHash]=useState("");
 const[candidates,setCandidates]=useState<Option[]>(OPTIONS);
 const[round,setRound]=useState(1);
 const[lastAction,setLastAction]=useState("");
 const[verified,setVerified]=useState<boolean|null>(null);

 const setup=useCallback(async()=>{
   setStage("loading");setCandidates(OPTIONS);setRound(1);setLastAction("");setVerified(null);
   const random=new Uint32Array(1);crypto.getRandomValues(random);
   const chosen=OPTIONS[random[0]%OPTIONS.length];
   const nextNonce=randomNonce();
   const nextHash=await sha256(chosen.id+":"+nextNonce);
   setTarget(chosen);setNonce(nextNonce);setHash(nextHash);setStage("intro");
 },[]);

 useEffect(()=>{void setup()},[setup]);

 const choose=async(option:Option)=>{
   if(!target||candidates.length<=1)return;
   const removable=candidates.find(item=>item.id!==target.id);
   const removeId=option.id===target.id?(removable?.id??option.id):option.id;
   const next=candidates.filter(item=>item.id!==removeId);
   setLastAction(option.id===target.id?"ตัวเลือกนี้ถูกยึดเป็นจุดอ้างอิง":"ตัวเลือกนี้ถูกปล่อยออกจากสนาม");
   setCandidates(next);
   if(next.length===1){
     const check=await sha256(target.id+":"+nonce);
     setVerified(check===hash);
     window.setTimeout(()=>setStage("reveal"),420);
   }else setRound(v=>v+1);
 };

 return <main className="game-shell game-theme-prediction"><div className="game-aurora" aria-hidden="true"/><GameHeader title="คำทำนายที่ปิดผนึก"/>
  {stage==="loading"&&<section className="game-panel intro-panel scene-enter"><div className="intro-icon motion-pulse"><Icon name="prediction"/></div><p className="eyebrow">Preparing commitment</p><h1 className="game-heading">กำลังปิดผนึกคำทำนาย</h1></section>}
  {stage==="intro"&&target&&<section className="game-panel intro-panel scene-enter"><div className="intro-icon seal-motion"><Icon name="prediction"/></div><p className="eyebrow">SHA-256 commitment</p><h1 className="game-heading">คำตอบหนึ่งชิ้น<br/>ถูกล็อกไว้ก่อนคุณเลือก</h1><p className="game-lead">Fingerprint ด้านล่างสร้างจากคำตอบเป้าหมายและ nonce ก่อนเริ่มเกม คุณจะตรวจสอบความตรงกันได้ตอนจบ</p><div className="commitment-card"><span>SEALED FINGERPRINT</span><strong>{shortFingerprint(hash)}</strong><small>สร้างก่อนการตัดสินใจรอบแรก</small></div><button className="game-primary" onClick={()=>setStage("choice")}>เริ่มตัดสินใจ</button></section>}
  {stage==="choice"&&<section className="game-panel choice-stage scene-enter"><div className="progress-track"><div className="progress-fill prediction-progress" style={{width:`${((OPTIONS.length-candidates.length)/(OPTIONS.length-1))*100}%`}}/></div><div className="stage-label"><span>{round}</span><b>Adaptive choice</b></div><h1 className="question-title">แตะสิ่งที่ดึงดูดคุณที่สุดในรอบนี้</h1><p className="question-help">การแตะแต่ละครั้งจะเปลี่ยนสนาม จนเหลือเส้นทางสุดท้ายเพียงหนึ่ง</p>{lastAction&&<p className="choice-feedback">{lastAction}</p>}<div className="prediction-choice-grid">{candidates.map(option=><button className="prediction-choice" key={option.id} onClick={()=>void choose(option)}><span><Icon name={option.icon}/></span><b>{option.label}</b></button>)}</div><div className="commitment-mini"><span>{shortFingerprint(hash)}</span><small>Fingerprint เดิม ไม่เปลี่ยนระหว่างเกม</small></div></section>}
  {stage==="reveal"&&target&&<section className="game-panel intro-panel scene-enter reveal-scene"><p className="eyebrow">Commitment revealed</p><div className="prediction-reveal"><Icon name={target.icon}/><span className="prediction-orbit"/></div><h1 className="reveal-question">{target.label}</h1><p className="game-lead">นี่คือเป้าหมายที่ถูกใช้สร้าง Fingerprint ตั้งแต่ก่อนคุณเริ่มเลือก</p><div className="verification-card"><span className={verified?"verify-dot ok":"verify-dot"}/><div><strong>{verified?"ตรวจสอบ SHA-256 ตรงกัน":"ไม่สามารถยืนยันได้"}</strong><small>{shortFingerprint(hash)}</small></div></div><details className="proof-details"><summary>ดูข้อมูลสำหรับตรวจสอบ</summary><code>target={target.id}</code><code>nonce={nonce}</code><code>sha256={hash}</code></details><div className="reveal-actions"><button className="game-primary" onClick={()=>void setup()}>สร้างคำทำนายใหม่</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></section>}
 </main>;
}
