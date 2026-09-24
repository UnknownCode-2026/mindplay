export type GameStatus = "available" | "soon";
export type GameDefinition = { id:string; icon:string; title:string; description:string; status:GameStatus; href?:string; badge:string; duration:string; input:string; };
export const games: GameDefinition[] = [
  {id:"missing-card",icon:"🃏",title:"ไพ่ที่หายไป",description:"จำไพ่หนึ่งใบจากชุดแรกโดยไม่ต้องกด แล้วดูว่ามันจะหายไปจากชุดถัดไปได้อย่างไร",status:"available",href:"/games/missing-card",badge:"ใหม่ • แนะนำ",duration:"ประมาณ 30 วินาที",input:"ไม่ต้องบอกไพ่"},
  {id:"math-force",icon:"🧠",title:"เลขที่หนีไม่พ้น",description:"เลือกเลขเอง แล้วคำนวณตามขั้นตอนสั้น ๆ ก่อนที่ MindPlay จะเปิดผลลัพธ์ที่รออยู่",status:"available",href:"/games/math-force",badge:"ใหม่",duration:"ประมาณ 1 นาที",input:"คำนวณในใจ"},
  {id:"number-mind",icon:"🔢",title:"อ่านตัวเลขในใจ",description:"เกมคลาสสิก 1–100 จาก V1.2 เก็บไว้เป็นโหมดทดลองสำหรับคนที่อยากลองจับหลักการ",status:"available",href:"/games/number-mind",badge:"โหมดคลาสสิก",duration:"ประมาณ 1 นาที",input:"7 คำถาม"},
  {id:"symbol-mind",icon:"👁️",title:"สัญลักษณ์ลับ",description:"เวอร์ชันทดลองของเกมสัญลักษณ์ เก็บไว้ให้เปรียบเทียบกับเกมรุ่นใหม่",status:"available",href:"/games/symbol-mind",badge:"โหมดคลาสสิก",duration:"ประมาณ 45 วินาที",input:"4 คำถาม"},
  {id:"sealed-prediction",icon:"🔮",title:"คำทำนายที่ปิดผนึก",description:"คำทำนายจะถูกล็อกไว้ก่อนที่คุณจะตัดสินใจ",status:"soon",badge:"กำลังพัฒนา",duration:"ประมาณ 1 นาที",input:"หลายทางเลือก"}
];
