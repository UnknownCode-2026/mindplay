import type { IconName } from "../components/MindPlayUI";
export type GameTone="cards"|"number"|"symbol"|"word"|"prediction";
export type GameDefinition={id:string;icon:IconName;tone:GameTone;title:string;description:string;href:string;badge:string;duration:string;play:string};
export const games:GameDefinition[]=[
 {id:"card-mind",icon:"cards",tone:"cards",title:"ไพ่ในความคิด",description:"เลือกไพ่หนึ่งใบด้วยสายตา เก็บไว้ในใจ แล้วดูว่า MindPlay จะตามหาไพ่ใบนั้นเจอหรือไม่",href:"/games/missing-card",badge:"มายากลไพ่",duration:"ประมาณ 1 นาที",play:"จำไพ่ • ไม่ต้องแตะไพ่ที่เลือก"},
 {id:"number-mind",icon:"number",tone:"number",title:"เลขที่คุณกำลังคิด",description:"คิดเลขหนึ่งตัวตั้งแต่ 1 ถึง 50 โดยไม่ต้องพิมพ์เลขลงเว็บ แล้วตอบเพียงเบาะแสสั้น ๆ",href:"/games/number-mind",badge:"อ่านตัวเลข",duration:"ประมาณ 1 นาที",play:"คิดเลข • ตอบตามจริง"},
 {id:"symbol-mind",icon:"symbol",tone:"symbol",title:"สัญลักษณ์ในใจ",description:"เลือกหนึ่งรูปจากชุดสัญลักษณ์ของ MindPlay แล้วเก็บรูปร่างนั้นไว้ในความคิด",href:"/games/symbol-mind",badge:"อ่านภาพในใจ",duration:"ประมาณ 1 นาที",play:"เลือกรูป • จำไว้ในหัว"},
 {id:"word-mind",icon:"spark",tone:"word",title:"คำที่ซ่อนอยู่ในหัว",description:"เลือกหนึ่งคำโดยไม่บอกเรา แล้วตอบคำถามเกี่ยวกับสิ่งนั้นเพื่อดูว่า MindPlay จะทายคำได้ไหม",href:"/games/word-mind",badge:"ทายคำ",duration:"1–2 นาที",play:"เลือกคำ • ให้เบาะแส"},
 {id:"sealed-prediction",icon:"prediction",tone:"prediction",title:"คำทำนายที่ปิดผนึก",description:"คำทำนายหนึ่งอย่างถูกซ่อนไว้ก่อนเริ่ม จากนั้นคุณเลือกตามสัญชาตญาณจนถึงช่วงเปิดผนึก",href:"/games/sealed-prediction",badge:"คำทำนาย",duration:"ประมาณ 1 นาที",play:"เลือกอิสระ • เปิดคำทำนาย"}
];
