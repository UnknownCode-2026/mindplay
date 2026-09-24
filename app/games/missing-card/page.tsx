"use client";
import { useMemo,useState } from "react";
import { GameHeader, Icon, SuitMark, type SuitName } from "../../../components/MindPlayUI";

type Stage="intro"|"memorize"|"focus"|"reveal";
type Card={rank:string;suit:SuitName};
const rounds:{first:Card[];second:Card[]}[]=[
 {first:[{rank:"K",suit:"spade"},{rank:"7",suit:"heart"},{rank:"Q",suit:"diamond"},{rank:"9",suit:"club"},{rank:"J",suit:"heart"},{rank:"K",suit:"diamond"}],second:[{rank:"Q",suit:"club"},{rank:"8",suit:"diamond"},{rank:"J",suit:"spade"},{rank:"10",suit:"heart"},{rank:"K",suit:"club"}]},
 {first:[{rank:"Q",suit:"spade"},{rank:"8",suit:"heart"},{rank:"K",suit:"club"},{rank:"10",suit:"diamond"},{rank:"J",suit:"spade"},{rank:"Q",suit:"heart"}],second:[{rank:"J",suit:"heart"},{rank:"9",suit:"club"},{rank:"Q",suit:"diamond"},{rank:"K",suit:"spade"},{rank:"8",suit:"spade"}]},
 {first:[{rank:"J",suit:"diamond"},{rank:"9",suit:"spade"},{rank:"K",suit:"heart"},{rank:"7",suit:"club"},{rank:"Q",suit:"club"},{rank:"10",suit:"heart"}],second:[{rank:"10",suit:"club"},{rank:"K",suit:"heart"},{rank:"Q",suit:"spade"},{rank:"J",suit:"diamond"},{rank:"9",suit:"heart"}]}
];

function PlayingCard({card}:{card:Card}){
 const red=card.suit==="heart"||card.suit==="diamond";
 return <div className={"playing-card "+(red?"red":"black")}>
  <div className="card-corner"><span>{card.rank}</span><SuitMark suit={card.suit}/></div>
  <div className="card-center"><SuitMark suit={card.suit}/></div>
  <div className="card-corner bottom"><span>{card.rank}</span><SuitMark suit={card.suit}/></div>
 </div>;
}

export default function MissingCardGame(){
 const[stage,setStage]=useState<Stage>("intro");const[run,setRun]=useState(0);
 const data=useMemo(()=>rounds[run%rounds.length],[run]);
 const restart=()=>{setRun(v=>v+1);setStage("intro")};
 return <main className="game-shell">
  <GameHeader title="ไพ่ที่หายไป"/>
  {stage==="intro"&&<section className="game-panel intro-panel">
   <div className="intro-icon"><Icon name="cards"/></div><p className="eyebrow">Visual memory</p>
   <h1 className="game-heading">เลือกไพ่หนึ่งใบ<br/>ด้วยสายตาเท่านั้น</h1>
   <p className="game-lead">ไม่ต้องแตะไพ่และไม่ต้องบอกเรา จำทั้งหน้าไพ่และดอกให้ชัดก่อนเข้าสู่ขั้นถัดไป</p>
   <div className="rules"><p>เลือกเพียงหนึ่งใบ</p><p>จำหน้าไพ่และดอก</p><p>อย่าเปลี่ยนใจกลางเกม</p></div>
   <button className="game-primary" onClick={()=>setStage("memorize")}>เริ่มเล่น</button>
  </section>}
  {stage==="memorize"&&<section className="game-panel">
   <div className="stage-label"><span>1</span><b>จดจำ</b></div>
   <h1 className="question-title">เลือกไพ่หนึ่งใบจากชุดนี้</h1><p className="question-help">ใช้สายตาเลือก แล้วเก็บภาพของไพ่ใบนั้นไว้ในความคิด</p>
   <div className="playing-card-grid">{data.first.map((card,i)=><PlayingCard card={card} key={card.rank+card.suit+i}/>)}</div>
   <button className="game-primary" onClick={()=>setStage("focus")}>ฉันจำได้แล้ว</button>
  </section>}
  {stage==="focus"&&<section className="game-panel intro-panel">
   <div className="reading-icon"><Icon name="brand"/></div><p className="eyebrow">Focus</p>
   <h1 className="game-heading">นึกภาพไพ่ใบนั้น<br/>อีกครั้ง</h1><p className="game-lead">เมื่อภาพในหัวชัดแล้ว ค่อยเปิดชุดถัดไป</p>
   <button className="game-primary" onClick={()=>setStage("reveal")}>เปิดชุดถัดไป</button>
  </section>}
  {stage==="reveal"&&<section className="game-panel">
   <div className="stage-label"><span>2</span><b>ค้นหา</b></div>
   <h1 className="question-title">ลองหาไพ่ที่คุณจำไว้</h1><p className="question-help">ดูให้ครบทุกใบก่อนตัดสินใจ</p>
   <div className="playing-card-grid">{data.second.map((card,i)=><PlayingCard card={card} key={card.rank+card.suit+i}/>)}</div>
   <div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นอีกครั้ง</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div>
  </section>}
 </main>;
}
