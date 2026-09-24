"use client";
import { useState } from "react";
type Stage="intro"|"chooseColor"|"chooseDoor"|"chooseObject"|"reveal";
const colors=["ม่วง","ฟ้า","แดง"];
const doors=["ประตูซ้าย","ประตูกลาง","ประตูขวา"];
const objects=["กุญแจ","ดวงตา","พระจันทร์"];
export default function SealedPrediction(){
 const[stage,setStage]=useState<Stage>("intro");const[color,setColor]=useState("");const[door,setDoor]=useState("");const[obj,setObj]=useState("");
 const restart=()=>{setColor("");setDoor("");setObj("");setStage("intro")};
 return <main className="game-shell modern-game">
  <div className="game-topbar"><a href="/" className="back-button">←</a><span>คำทำนายที่ปิดผนึก</span><span className="game-status-dot"/></div>
  {stage==="intro"&&<section className="game-panel intro-panel"><div className="mind-orb">🔮</div><p className="eyebrow">เลือกตามความรู้สึก</p><h1 className="game-heading">คำทำนายรออยู่ปลายทาง</h1><p className="game-lead">เลือกไปทีละขั้น แล้วดูว่าผลสุดท้ายของคุณจะออกมาเป็นอะไร</p><button className="game-primary" onClick={()=>setStage("chooseColor")}>เริ่มเลือก</button></section>}
  {stage==="chooseColor"&&<section className="game-panel choice-stage"><div className="stage-label"><span>1</span><b>เลือกสีที่รู้สึกเด่นที่สุด</b></div><div className="choice-grid">{colors.map(x=><button key={x} className="choice-card" onClick={()=>{setColor(x);setStage("chooseDoor")}}>{x}</button>)}</div></section>}
  {stage==="chooseDoor"&&<section className="game-panel choice-stage"><div className="stage-label"><span>2</span><b>เลือกประตูหนึ่งบาน</b></div><div className="choice-grid">{doors.map(x=><button key={x} className="choice-card" onClick={()=>{setDoor(x);setStage("chooseObject")}}>{x}</button>)}</div></section>}
  {stage==="chooseObject"&&<section className="game-panel choice-stage"><div className="stage-label"><span>3</span><b>เลือกสิ่งของหนึ่งอย่าง</b></div><div className="choice-grid">{objects.map(x=><button key={x} className="choice-card" onClick={()=>{setObj(x);setStage("reveal")}}>{x}</button>)}</div></section>}
  {stage==="reveal"&&<section className="game-panel center-panel reveal-stage"><p className="eyebrow">เส้นทางที่คุณเลือก</p><div className="sealed-card"><span>{color}</span><span>{door}</span><span>{obj}</span></div><h1 className="reveal-question">นี่คือชุดการตัดสินใจของคุณ</h1><p className="muted">เกมนี้เน้นประสบการณ์การเลือกและการนำเสนอ ไม่ได้เข้าถึงข้อมูลส่วนตัวจากอุปกรณ์</p><div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></section>}
 </main>
}
