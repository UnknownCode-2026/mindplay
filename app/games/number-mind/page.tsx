"use client";
import { useEffect,useMemo,useState } from "react";
import { GameHeader, Icon } from "../../../components/MindPlayUI";
import { buildQuestions,calculateNumber,shuffle } from "../../../lib/numberMind";

type Stage="intro"|"questions"|"reading"|"reveal"|"success"|"retry";
const roundMessages=["ตรวจชุดแรก","มองหาอีกครั้ง","เปลี่ยนมุมมอง","ดูชุดนี้ให้ครบ","เก็บเลขเดิมไว้","อีกสองขั้น","ขั้นสุดท้าย"];

export default function NumberMindGame(){
 const[stage,setStage]=useState<Stage>("intro");const[round,setRound]=useState(0);const[answers,setAnswers]=useState<boolean[]>([]);const[result,setResult]=useState<number|null>(null);const[seed,setSeed]=useState(0);
 const questions=useMemo(()=>shuffle(buildQuestions(),seed).map((q,i)=>({...q,numbers:shuffle(q.numbers,seed+i+11)})),[seed]);
 useEffect(()=>{if(stage!=="reading")return;const timer=window.setTimeout(()=>setStage(result&&result>=1&&result<=100?"reveal":"retry"),1700);return()=>window.clearTimeout(timer)},[stage,result]);
 const restart=()=>{setRound(0);setAnswers([]);setResult(null);setSeed(v=>v+17);setStage("intro")};
 const answer=(value:boolean)=>{const next=[...answers,value];setAnswers(next);if(round<questions.length-1){setRound(v=>v+1);return;}setResult(calculateNumber(questions,next));setStage("reading")};
 if(stage==="intro")return <main className="game-shell"><GameHeader title="อ่านตัวเลขในใจ"/><section className="game-panel intro-panel">
  <div className="intro-icon"><Icon name="number"/></div><p className="eyebrow">Number mind</p><h1 className="game-heading">คิดเลขหนึ่งตัว<br/>ตั้งแต่ 1 ถึง 100</h1>
  <p className="game-lead">จำเลขนั้นไว้ในหัว แล้วตอบจากชุดตัวเลขที่เห็น โดยไม่ต้องพิมพ์เลขของคุณลงในเว็บ</p>
  <div className="rules"><p>เลือกเลขเพียงหนึ่งตัว</p><p>ตอบตามชุดที่มองเห็น</p><p>อย่าเปลี่ยนเลขระหว่างทาง</p></div>
  <button className="game-primary" onClick={()=>setStage("questions")}>ฉันเลือกแล้ว</button><p className="privacy-note">ไม่ใช้กล้อง ไม่ใช้ไมค์ และไม่ขอข้อมูลส่วนตัว</p>
 </section></main>;
 if(stage==="questions"){const current=questions[round];return <main className="game-shell"><GameHeader title="อ่านตัวเลขในใจ"/><section className="game-panel">
  <div className="progress-track"><div className="progress-fill" style={{width:`${((round+1)/questions.length)*100}%`}}/></div>
  <div className="stage-label"><span>{round+1}</span><b>{roundMessages[round]}</b></div>
  <h1 className="question-title">เลขของคุณอยู่ในชุดนี้หรือไม่?</h1><p className="question-help">ไล่ดูให้ครบก่อนตอบ</p>
  <div className="number-grid">{current.numbers.map(n=><span className="number-chip" key={n}>{n}</span>)}</div>
  <div className="answer-bar"><button className="answer-button answer-no" onClick={()=>answer(false)}><Icon name="close"/>ไม่มี</button><button className="answer-button answer-yes" onClick={()=>answer(true)}><Icon name="check"/>มี</button></div>
 </section></main>}
 if(stage==="reading")return <main className="game-shell center-stage"><div className="reading-icon"><Icon name="brand"/></div><p className="eyebrow">Pattern analysis</p><h1 className="reading-title">กำลังประกอบรูปแบบจากคำตอบ</h1><div className="reading-lines"><span>ตรวจชุดตัวเลข</span><span>เปรียบเทียบรูปแบบ</span><span>เตรียมคำตอบ</span></div></main>;
 if(stage==="reveal")return <main className="game-shell center-stage"><p className="eyebrow">คำตอบที่ได้</p><div className="reveal-number">{result}</div><h1 className="reveal-question">ตรงกับเลขที่คุณคิดไว้หรือไม่?</h1><div className="reveal-actions"><button className="game-primary" onClick={()=>setStage("success")}>ใช่ ตรงเลย</button><button className="ghost-button" onClick={()=>setStage("retry")}>ไม่ตรง</button></div></main>;
 if(stage==="success")return <main className="game-shell center-stage"><div className="success-mark"><Icon name="check"/></div><p className="eyebrow">Matched</p><h1 className="reading-title">เจอเลขที่คุณเก็บไว้แล้ว</h1><p className="success-copy">คำตอบของรอบนี้คือ {result}</p><div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button><a className="ghost-link" href="/games/symbol-mind">ลองสัญลักษณ์ลับ</a><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></main>;
 return <main className="game-shell center-stage"><div className="retry-mark"><Icon name="close"/></div><p className="eyebrow">Try again</p><h1 className="reading-title">บางขั้นอาจตอบคลาดเคลื่อน</h1><p className="success-copy">ลองอีกครั้งและดูทุกชุดให้ครบก่อนตอบ</p><div className="reveal-actions"><button className="game-primary" onClick={restart}>เริ่มใหม่</button><a className="ghost-link" href="/">กลับหน้าหลัก</a></div></main>;
}
