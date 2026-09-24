import type { IconName } from "../components/MindPlayUI";

export type GameDefinition = {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  href: string;
  badge: string;
  duration: string;
  input: string;
};

export const games: GameDefinition[] = [
  {id:"missing-card",icon:"cards",title:"ไพ่ที่หายไป",description:"จำไพ่หนึ่งใบด้วยสายตา แล้วลองค้นหามันอีกครั้งเมื่อชุดไพ่เปลี่ยนไป",href:"/games/missing-card",badge:"แนะนำ",duration:"30 วินาที",input:"ไม่ต้องแตะไพ่"},
  {id:"math-force",icon:"math",title:"เลขที่หนีไม่พ้น",description:"เลือกเลขเอง คำนวณตามขั้นตอน และดูว่าผลลัพธ์จะไปหยุดที่จุดเดียวกันหรือไม่",href:"/games/math-force",badge:"คณิตศาสตร์",duration:"1 นาที",input:"คำนวณในใจ"},
  {id:"number-mind",icon:"number",title:"อ่านตัวเลขในใจ",description:"คิดเลขหนึ่งตัวตั้งแต่ 1–100 แล้วตอบจากชุดตัวเลขเพื่อให้ MindPlay ลองตามหาคำตอบ",href:"/games/number-mind",badge:"คลาสสิก",duration:"1 นาที",input:"7 ขั้น"},
  {id:"symbol-mind",icon:"symbol",title:"สัญลักษณ์ลับ",description:"เลือกหนึ่งสัญลักษณ์จากชุดที่ออกแบบสำหรับ MindPlay แล้วเก็บไว้ในความคิด",href:"/games/symbol-mind",badge:"ภาพและรูปแบบ",duration:"45 วินาที",input:"4 ขั้น"},
  {id:"sealed-prediction",icon:"prediction",title:"เส้นทางที่ปิดผนึก",description:"เลือกสี ประตู และวัตถุตามความรู้สึก ก่อนเปิดดูเส้นทางการตัดสินใจของคุณ",href:"/games/sealed-prediction",badge:"เลือกอิสระ",duration:"1 นาที",input:"3 ทางเลือก"}
];
