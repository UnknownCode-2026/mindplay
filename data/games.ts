export type GameStatus = "available" | "soon";
export type GameDefinition = { id:string; icon:string; title:string; description:string; status:GameStatus; href?:string; badge:string; duration:string; input:string; };

export const games: GameDefinition[] = [
  {id:"missing-card",icon:"🃏",title:"ไพ่ที่หายไป",description:"จำไพ่หนึ่งใบไว้ในใจโดยไม่ต้องกด แล้วลองดูว่ามันจะหายไปจากชุดถัดไปได้หรือไม่",status:"available",href:"/games/missing-card",badge:"แนะนำ",duration:"ประมาณ 30 วินาที",input:"ไม่ต้องบอกไพ่"},
  {id:"math-force",icon:"🧠",title:"เลขที่หนีไม่พ้น",description:"เลือกเลขเอง แล้วทำตามขั้นตอนสั้น ๆ ก่อนที่ MindPlay จะเปิดผลลัพธ์สุดท้าย",status:"available",href:"/games/math-force",badge:"เล่นได้",duration:"ประมาณ 1 นาที",input:"คำนวณในใจ"},
  {id:"number-mind",icon:"🔢",title:"อ่านตัวเลขในใจ",description:"คิดเลขหนึ่งตัวตั้งแต่ 1–100 แล้วตอบคำถามสั้น ๆ เพื่อดูว่า MindPlay จะตามทันหรือไม่",status:"available",href:"/games/number-mind",badge:"เล่นได้",duration:"ประมาณ 1 นาที",input:"ตอบตามที่เห็น"},
  {id:"symbol-mind",icon:"👁️",title:"สัญลักษณ์ลับ",description:"เลือกสัญลักษณ์หนึ่งตัวไว้ในใจ แล้วค่อย ๆ ผ่านชุดคำถามที่เปลี่ยนรูปแบบไปในแต่ละรอบ",status:"available",href:"/games/symbol-mind",badge:"เล่นได้",duration:"ประมาณ 45 วินาที",input:"เลือกตามความคิด"},
  {id:"sealed-prediction",icon:"🔮",title:"คำทำนายที่ปิดผนึก",description:"เลือกหลายอย่างตามความรู้สึก แล้วเปิดคำทำนายที่ถูกซ่อนไว้ในตอนท้าย",status:"available",href:"/games/sealed-prediction",badge:"ใหม่",duration:"ประมาณ 1 นาที",input:"หลายทางเลือก"}
];
