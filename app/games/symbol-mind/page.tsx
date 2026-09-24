"use client";
import { useMemo,useState } from "react";
import { GameHeader,Icon } from "../../../components/MindPlayUI";
import { SYMBOLS } from "../../../lib/symbolMind";
import { symbolGroups,decodeSymbol } from "../../../lib/games/symbolEngine";

type Stage="intro"|"round1"|"round2"|"reveal";
export default function SymbolMindGame(){
 const[stage,setStage]=useState<Stage>("intro");const[first,setFirst]=useState<number|null>(null);const[seed,setSeed]=useState(19);const[resultId,setResultId]=useState<number|null>(null);
 const groups1=useMemo(()=>symbolGroups(0,seed),[seed]);const groups2=useMemo(()=>symbolGroups(1,seed+67),[seed]);
 const result=resultId?SYMBOLS.find(x=>x.id===resultId)??null:null;
 const restart=()=>{setFirst(null);setResultId(null);setSeed(v=>v+83);setStage("intro")};
 const chooseSecond=(key:number)=>{if(first===null)return;const found=decodeSymbol(first,key);setResultId(found?.id??null);setStage("reveal")};

 return <main className="game-shell game-theme-symbol"><div className="game-aurora" aria-hidden="true"/><GameHeader title="สัญลักษณ์ลับ"/>
  {stage==="intro"&&<section className="game-panel intro-panel scene-enter"><div className="intro-icon motion-orbit"><Icon name="symbol"/></div><p className="eyebrow">Visual routing</p><h1 className="game-heading">เลือกหนึ่งสัญลักษณ์<br/>จากทั้งหมด 16 แบบ</h1><p className="game-lead">รอบนี้ลดจาก 4 คำถามแบบมีหรือไม่มี เหลือเพียง 2 สนามภาพที่จัดกลุ่มต่างกัน</p><div className="symbol-preview-grid">{SYMBOLS.map(item=><span className="symbol-preview-item" key={item.id}><Icon name={item.icon}/></span>)}</div><button className="game-primary" onClick={()=>setStage("round1")}>ฉันเลือกแล้ว</button></section>}
  {stage==="round1"&&<section className="game-panel scene-enter"><div className="progress-track"><div className="progress-fill" style={{width:"50%"}}/></div><div className="stage-label"><span>1</span><b>Constellations</b></div><h1 className="question-title">สัญลักษณ์ของคุณอยู่ในกลุ่มไหน?</h1><p className="question-help">เลือกทั้งกลุ่มที่มีรูปที่คุณจำไว้</p><div className="symbol-field-grid">{groups1.map((group,index)=><button className="symbol-field" key={group.key} onClick={()=>{setFirst(group.key);setStage("round2")}}><span>CONSTELLATION {index+1}</span><b>{group.items.map(item=><i key={item.id}><Icon name={item.icon}/></i>)}</b></button>)}</div></section>}
  {stage==="round2"&&<section className="game-panel scene-enter"><div className="progress-track"><div className="progress-fill" style={{width:"100%"}}/></div><div className="stage-label"><span>2</span><b>Echo fields</b></div><h1 className="question-title">หลังจัดใหม่ รูปของคุณอยู่สนามไหน?</h1><p className="question-help">นี่คือการจัดกลุ่มคนละแกนกับรอบแรก</p><div className="symbol-field-grid">{groups2.map((group,index)=><button className="symbol-field" key={group.key} onClick={()=>chooseSecond(group.key)}><span>ECHO {index+1}</span><b>{group.items.map(item=><i key={item.id}><Icon name={item.icon}/></i>)}</b></button>)}</div></section>}
  {stage==="reveal"&&result&&<section className="game-panel intro-panel scene-enter reveal-scene"><p className="eyebrow">Visual lock</p><div className="symbol-reveal motion-pulse"><Icon name={result.icon}/></div><h1 className="reveal-question">{result.name}</h1><p className="game-lead">สองกลุ่มที่คุณเลือกตัดกันที่สัญลักษณ์เดียว</p><div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นรอบใหม่</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></section>}
 </main>;
}
