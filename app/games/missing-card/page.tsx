"use client";
import { useMemo,useState } from "react";
import { GameHeader,SuitMark,Icon } from "../../../components/MindPlayUI";
import { allCards,cardGroups,decodeCard,type MindCard } from "../../../lib/games/cardEngine";

type Stage="intro"|"memorize"|"round1"|"round2"|"reveal";

function Card({card}:{card:MindCard}){
 const red=card.suit==="heart"||card.suit==="diamond";
 return <div className={"playing-card "+(red?"red":"black")}>
  <div className="card-corner"><span>{card.rank}</span><SuitMark suit={card.suit}/></div>
  <div className="card-center"><SuitMark suit={card.suit}/></div>
  <div className="card-corner bottom"><span>{card.rank}</span><SuitMark suit={card.suit}/></div>
 </div>;
}

export default function MissingCardGame(){
 const[stage,setStage]=useState<Stage>("intro");
 const[seed,setSeed]=useState(11);
 const[first,setFirst]=useState<number|null>(null);
 const deck=useMemo(()=>allCards(seed),[seed]);
 const groups1=useMemo(()=>cardGroups(0,seed+17),[seed]);
 const groups2=useMemo(()=>cardGroups(1,seed+53),[seed]);
 const result=first===null?null:decodeCard(first,first>=0?0:0);
 const[finalCard,setFinalCard]=useState<MindCard|null>(null);

 const restart=()=>{setSeed(v=>v+97);setFirst(null);setFinalCard(null);setStage("intro")};
 const chooseFirst=(key:number)=>{setFirst(key);setStage("round2")};
 const chooseSecond=(key:number)=>{if(first===null)return;setFinalCard(decodeCard(first,key));setStage("reveal")};

 return <main className="game-shell game-theme-cards">
  <div className="game-aurora" aria-hidden="true"/>
  <GameHeader title="ไพ่ที่หายไป"/>
  {stage==="intro"&&<section className="game-panel intro-panel scene-enter">
   <div className="intro-icon motion-float"><Icon name="cards"/></div><p className="eyebrow">Card matrix</p>
   <h1 className="game-heading">จำไพ่หนึ่งใบ<br/>โดยไม่ต้องแตะมัน</h1>
   <p className="game-lead">รอบนี้ใช้ไพ่ 16 ใบและการจัดกลุ่มสองรูปแบบ เพื่อให้ MindPlay ระบุตำแหน่งของไพ่ที่คุณเก็บไว้ในความคิด</p>
   <button className="game-primary" onClick={()=>setStage("memorize")}>เริ่มเกม</button>
  </section>}
  {stage==="memorize"&&<section className="game-panel scene-enter">
   <div className="stage-label"><span>0</span><b>เลือกด้วยสายตา</b></div>
   <h1 className="question-title">เลือกหนึ่งใบจากทั้งหมด 16 ใบ</h1>
   <p className="question-help">จำหน้าไพ่และดอกให้ชัด แล้วกดพร้อมเมื่อคุณจำได้</p>
   <div className="memory-card-grid">{deck.map(card=><Card key={card.id} card={card}/>)}</div>
   <button className="game-primary" onClick={()=>setStage("round1")}>ฉันจำได้แล้ว</button>
  </section>}
  {stage==="round1"&&<section className="game-panel scene-enter">
   <div className="progress-track"><div className="progress-fill" style={{width:"50%"}}/></div>
   <div className="stage-label"><span>1</span><b>Matrix A</b></div>
   <h1 className="question-title">ไพ่ของคุณอยู่ในโซนไหน?</h1>
   <p className="question-help">แตะทั้งโซน ไม่ต้องแตะไพ่ใบนั้นโดยตรง</p>
   <div className="card-zone-grid">{groups1.map((group,index)=><button className="card-zone" key={group.key} onClick={()=>chooseFirst(group.key)}><span className="zone-label">ZONE {index+1}</span><span className="zone-cards">{group.cards.map(card=><span className="mini-card" key={card.id}><b>{card.rank}</b><SuitMark suit={card.suit}/></span>)}</span></button>)}</div>
  </section>}
  {stage==="round2"&&<section className="game-panel scene-enter">
   <div className="progress-track"><div className="progress-fill" style={{width:"100%"}}/></div>
   <div className="stage-label"><span>2</span><b>Matrix B</b></div>
   <h1 className="question-title">หลังสับใหม่ ไพ่ของคุณอยู่โซนไหน?</h1>
   <p className="question-help">รูปแบบถูกจัดใหม่แล้ว เลือกโซนที่เห็นไพ่ใบเดิมอีกครั้ง</p>
   <div className="card-zone-grid">{groups2.map((group,index)=><button className="card-zone" key={group.key} onClick={()=>chooseSecond(group.key)}><span className="zone-label">FIELD {index+1}</span><span className="zone-cards">{group.cards.map(card=><span className="mini-card" key={card.id}><b>{card.rank}</b><SuitMark suit={card.suit}/></span>)}</span></button>)}</div>
  </section>}
  {stage==="reveal"&&finalCard&&<section className="game-panel intro-panel scene-enter reveal-scene">
   <p className="eyebrow">Locked target</p><h1 className="game-heading">เราเจอไพ่ของคุณแล้ว</h1>
   <div className="single-card-reveal"><Card card={finalCard}/><span className="reveal-beam" aria-hidden="true"/></div>
   <p className="game-lead">สองตำแหน่งที่คุณเลือกตัดกันที่ไพ่เพียงใบเดียว</p>
   <div className="reveal-actions"><button className="game-primary" onClick={restart}>เล่นรอบใหม่</button><a className="ghost-link" href="/">เลือกเกมอื่น</a></div>
  </section>}
 </main>;
}
