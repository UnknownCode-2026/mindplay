"use client";
import { useState } from "react";
import { GameHeader,Icon,type IconName } from "../../../components/MindPlayUI";

type Stage="intro"|"color"|"door"|"object"|"reveal";
const colors=[{id:"ม่วง",className:"color-purple"},{id:"ฟ้า",className:"color-blue"},{id:"แดง",className:"color-red"}];
const doors=["ประตูซ้าย","ประตูกลาง","ประตูขวา"];
const objects:{label:string;icon:IconName}[]=[{label:"กุญแจ",icon:"key"},{label:"ดวงตา",icon:"eye"},{label:"พระจันทร์",icon:"moon"}];

export default function SealedPrediction(){
 const[stage,setStage]=useState<Stage>("intro");const[color,setColor]=useState("");const[door,setDoor]=useState("");const[object,setObject]=useState("");
 const restart=()=>{setColor("");setDoor("");setObject("");setStage("intro")};
 return <main className="game-shell"><GameHeader title="เส้นทางที่ปิดผนึก"/>
  {stage==="intro"&&<section className="game-panel intro-panel"><div className="intro-icon"><Icon name="prediction"/></div><p className="eyebrow">Choice path</p><h1 className="game-heading">เลือกตามความรู้สึก<br/>ทีละหนึ่งอย่าง</h1><p className="game-lead">ไม่มีคำตอบถูกหรือผิด เกมนี้บันทึกเฉพาะตัวเลือกภายในรอบที่กำลังเล่น</p><button className="game-primary" onClick={()=>setStage("color")}>เริ่มเลือก</button></section>}
  {stage==="color"&&<section className="game-panel choice-stage"><div className="stage-label"><span>1</span><b>สี</b></div><h1 className="question-title">สีไหนดึงสายตาคุณก่อน?</h1><div className="choice-grid">{colors.map(c=><button className="choice-card" key={c.id} onClick={()=>{setColor(c.id);setStage("door")}}><span className="choice-card-icon"><span className={"color-dot "+c.className}/></span><span><strong>{c.id}</strong><small>เลือกสีนี้</small></span></button>)}</div></section>}
  {stage==="door"&&<section className="game-panel choice-stage"><div className="stage-label"><span>2</span><b>ประตู</b></div><h1 className="question-title">ถ้าต้องเปิดหนึ่งบาน คุณจะเลือกบานไหน?</h1><div className="choice-grid">{doors.map(d=><button className="choice-card" key={d} onClick={()=>{setDoor(d);setStage("object")}}><span className="choice-card-icon"><Icon name="door"/></span><span><strong>{d}</strong><small>เปิดเส้นทางนี้</small></span></button>)}</div></section>}
  {stage==="object"&&<section className="game-panel choice-stage"><div className="stage-label"><span>3</span><b>วัตถุ</b></div><h1 className="question-title">เลือกสิ่งที่คุณรู้สึกเชื่อมโยงมากที่สุด</h1><div className="choice-grid">{objects.map(o=><button className="choice-card" key={o.label} onClick={()=>{setObject(o.label);setStage("reveal")}}><span className="choice-card-icon"><Icon name={o.icon}/></span><span><strong>{o.label}</strong><small>เลือกสิ่งนี้</small></span></button>)}</div></section>}
  {stage==="reveal"&&<section className="game-panel intro-panel"><p className="eyebrow">Your path</p><h1 className="game-heading">เส้นทางที่คุณสร้างขึ้น</h1><div className="sealed-card"><div className="sealed-item"><Icon name="palette"/><span>{color}</span></div><div className="sealed-item"><Icon name="door"/><span>{door}</span></div><div className="sealed-item"><Icon name={objects.find(o=>o.label===object)?.icon??"key"}/><span>{object}</span></div></div><p className="game-lead">การ์ดนี้สรุปตัวเลือกของรอบปัจจุบันเท่านั้น และไม่ได้อ่านข้อมูลส่วนตัวจากอุปกรณ์</p><div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div></section>}
 </main>;
}
