"use client";
import { useEffect,useMemo,useState } from "react";
import { GameHeader,Icon } from "../../../components/MindPlayUI";
import { SYMBOLS,buildSymbolQuestions,calculateSymbolId,findSymbol,shuffleSymbols,type SymbolItem } from "../../../lib/symbolMind";

type Stage="intro"|"questions"|"reading"|"reveal"|"success"|"retry";
const roundMessages=["ตรวจกลุ่มแรก","เปลี่ยนชุดสัญลักษณ์","มองอีกมุมหนึ่ง","ขั้นสุดท้าย"];

export default function SymbolMindGame(){
 const[stage,setStage]=useState<Stage>("intro");const[round,setRound]=useState(0);const[answers,setAnswers]=useState<boolean[]>([]);const[result,setResult]=useState<SymbolItem|null>(null);const[seed,setSeed]=useState(2);
 const questions=useMemo(()=>shuffleSymbols(buildSymbolQuestions(),seed).map((q,i)=>({...q,symbols:shuffleSymbols(q.symbols,seed+i+19)})),[seed]);
 useEffect(()=>{if(stage!=="reading")return;const timer=window.setTimeout(()=>setStage(result?"reveal":"retry"),1600);return()=>window.clearTimeout(timer)},[stage,result]);
 const restart=()=>{setRound(0);setAnswers([]);setResult(null);setSeed(v=>v+23);setStage("intro")};
 const answer=(value:boolean)=>{const next=[...answers,value];setAnswers(next);if(round<questions.length-1){setRound(v=>v+1);return;}setResult(findSymbol(calculateSymbolId(questions,next))??null);setStage("reading")};
 if(stage==="intro")return <main className="game-shell"><GameHeader title="สัญลักษณ์ลับ"/><section className="game-panel intro-panel">
  <div className="intro-icon"><Icon name="symbol"/></div><p className="eyebrow">Visual symbols</p><h1 className="game-heading">เลือกหนึ่งสัญลักษณ์<br/>แล้วจำรูปร่างของมัน</h1>
  <p className="game-lead">ชุดสัญลักษณ์ทั้งหมดวาดขึ้นด้วยภาษาภาพของ MindPlay โดยไม่ใช้ Emoji</p>
  <div className="symbol-preview-grid">{SYMBOLS.slice(0,8).map(item=><span className="symbol-preview-item" key={item.id}><Icon name={item.icon}/></span>)}</div>
  <button className="game-primary" onClick={()=>setStage("questions")}>ฉันจำแล้ว</button>
 </section></main>;
 if(stage==="questions"){const current=questions[round];return <main className="game-shell"><GameHeader title="สัญลักษณ์ลับ"/><section className="game-panel">
  <div className="progress-track"><div className="progress-fill" style={{width:`${((round+1)/questions.length)*100}%`}}/></div>
  <div className="stage-label"><span>{round+1}</span><b>{roundMessages[round]}</b></div>
  <h1 className="question-title">สัญลักษณ์ที่คุณจำอยู่ในกลุ่มนี้ไหม?</h1><p className="question-help">ดูรูปทรงให้ครบ แล้วค่อยตอบ</p>
  <div className="symbol-grid">{current.symbols.map(item=><div className="symbol-chip" key={item.id} aria-label={item.name}><Icon name={item.icon}/></div>)}</div>
  <div className="answer-bar"><button className="answer-button answer-no" onClick={()=>answer(false)}><Icon name="close"/>ไม่มี</button><button className="answer-button answer-yes" onClick={()=>answer(true)}><Icon name="check"/>มี</button></div>
 </section></main>}
 if(stage==="reading")return <main className="game-shell center-stage"><div className="reading-icon"><Icon name="eye"/></div><p className="eyebrow">Visual analysis</p><h1 className="reading-title">กำลังจับรูปแบบจากชุดที่คุณเห็น</h1><div className="reading-lines"><span>เทียบรูปทรง</span><span>ลดความเป็นไปได้</span><span>เตรียมคำตอบ</span></div></main>;
 if(stage==="reveal"&&result)return <main className="game-shell center-stage"><p className="eyebrow">สัญลักษณ์ที่ได้</p><div className="symbol-reveal"><Icon name={result.icon}/></div><h1 className="reveal-question">{result.name}</h1><p className="success-copy">นี่คือสัญลักษณ์ที่คุณจำไว้ใช่ไหม?</p><div className="reveal-actions"><button className="game-primary" onClick={()=>setStage("success")}>ใช่ ตรงเลย</button><button className="ghost-button" onClick={()=>setStage("retry")}>ไม่ตรง</button></div></main>;
 if(stage==="success")return <main className="game-shell center-stage"><div className="success-mark"><Icon name="check"/></div><p className="eyebrow">Matched</p><h1 className="reading-title">เจอสัญลักษณ์ที่คุณจำไว้แล้ว</h1><div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button><a className="ghost-link" href="/games/number-mind">ลองเกมตัวเลข</a><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></main>;
 return <main className="game-shell center-stage"><div className="retry-mark"><Icon name="close"/></div><p className="eyebrow">Try again</p><h1 className="reading-title">บางขั้นอาจตอบคลาดเคลื่อน</h1><p className="success-copy">ลองใหม่และตรวจดูสัญลักษณ์แต่ละกลุ่มให้ครบ</p><div className="reveal-actions"><button className="game-primary" onClick={restart}>เริ่มใหม่</button><a className="ghost-link" href="/">กลับหน้าหลัก</a></div></main>;
}
