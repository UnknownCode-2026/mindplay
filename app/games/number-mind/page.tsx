"use client";
import { useMemo,useState } from "react";
import { GameHeader,Icon } from "../../../components/MindPlayUI";
import { buildNumberGroups,decodeNumber,NUMBER_SCENES } from "../../../lib/games/numberEngine";

type Stage="intro"|"rounds"|"reveal";
export default function NumberMindGame(){
 const[stage,setStage]=useState<Stage>("intro");
 const[round,setRound]=useState<0|1|2>(0);
 const[digits,setDigits]=useState<number[]>([]);
 const[seed,setSeed]=useState(41);
 const groups=useMemo(()=>buildNumberGroups(round,seed),[round,seed]);
 const result=digits.length===3?decodeNumber(digits):null;
 const choose=(digit:number)=>{
   const next=[...digits,digit];
   setDigits(next);
   if(round<2)setRound((round+1) as 0|1|2); else setStage("reveal");
 };
 const restart=()=>{setRound(0);setDigits([]);setSeed(v=>v+131);setStage("intro")};

 if(stage==="intro")return <main className="game-shell game-theme-number"><div className="game-aurora" aria-hidden="true"/><GameHeader title="อ่านตัวเลขในใจ"/><section className="game-panel intro-panel scene-enter">
  <div className="intro-icon motion-pulse"><Icon name="number"/></div><p className="eyebrow">Three-stage encoding</p>
  <h1 className="game-heading">คิดเลขหนึ่งตัว<br/>ตั้งแต่ 1 ถึง 100</h1>
  <p className="game-lead">ไม่มีคำถามมีหรือไม่มี 7 รอบอีกต่อไป คุณจะผ่านเพียง 3 ฉาก และเลือกกลุ่มที่มีเลขของคุณ</p>
  <div className="rules"><p>จำเลขเดิมตลอดทั้งเกม</p><p>แต่ละฉากจัดกลุ่มใหม่ทั้งหมด</p><p>ไม่ต้องพิมพ์เลขลงเว็บ</p></div>
  <button className="game-primary" onClick={()=>setStage("rounds")}>เริ่มค้นหาเลข</button>
 </section></main>;

 if(stage==="rounds"){
  const scene=NUMBER_SCENES[round];
  return <main className="game-shell game-theme-number"><div className="game-aurora" aria-hidden="true"/><GameHeader title="อ่านตัวเลขในใจ"/><section className="game-panel scene-enter">
   <div className="progress-track"><div className="progress-fill" style={{width:`${((round+1)/3)*100}%`}}/></div>
   <div className="stage-label"><span>{round+1}</span><b>{scene.label}</b></div>
   <h1 className="question-title">{scene.title}</h1><p className="question-help">แต่ละกลุ่มมี 20 ตัวเลข มองหาเลขของคุณแล้วแตะกลุ่มนั้น</p>
   <div className={"number-route-grid route-"+round}>{groups.map((group,index)=><button className="number-route-card" key={group.digit} onClick={()=>choose(group.digit)}><span className="route-index">{String(index+1).padStart(2,"0")}</span><span className="route-numbers">{group.numbers.map(n=><b key={n}>{n}</b>)}</span><span className="route-action">เลือกเส้นทางนี้ <Icon name="arrowRight"/></span></button>)}</div>
  </section></main>;
 }

 return <main className="game-shell game-theme-number"><div className="game-aurora" aria-hidden="true"/><GameHeader title="อ่านตัวเลขในใจ"/><section className="game-panel intro-panel scene-enter reveal-scene">
  <p className="eyebrow">Decoded</p><div className="reveal-number">{result}</div><h1 className="reveal-question">นี่คือเลขที่คุณเก็บไว้ในใจใช่ไหม?</h1>
  <p className="game-lead">สามฉากให้พิกัดคนละหลัก เมื่อนำมาประกอบกันจะเหลือคำตอบเดียว</p>
  <div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นรอบใหม่</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div>
 </section></main>;
}
