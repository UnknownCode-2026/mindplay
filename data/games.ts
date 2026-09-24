import type { IconName } from "../components/MindPlayUI";
export type GameTone="cards"|"math"|"number"|"symbol"|"prediction";
export type GameDefinition={id:string;icon:IconName;tone:GameTone;title:string;description:string;href:string;badge:string;duration:string;input:string};
export const games:GameDefinition[]=[
 {id:"missing-card",icon:"cards",tone:"cards",title:"ไพ่ที่หายไป",description:"จำไพ่จาก 16 ใบ แล้วติดตามมันผ่าน Matrix สองรูปแบบโดยไม่ต้องแตะไพ่ที่เลือก",href:"/games/missing-card",badge:"Matrix",duration:"45 วินาที",input:"2 ตำแหน่ง"},
 {id:"math-force",icon:"math",tone:"math",title:"เลขที่หนีไม่พ้น",description:"สลับรูทีนคณิตศาสตร์หลายรูปแบบ ทั้ง Reverse, Triple Digit และ Digit Collapse",href:"/games/math-force",badge:"Multi routine",duration:"1–2 นาที",input:"คำนวณในใจ"},
 {id:"number-mind",icon:"number",tone:"number",title:"อ่านตัวเลขในใจ",description:"เปลี่ยนจากคำถามมีหรือไม่มี 7 รอบ เป็นเส้นทาง Base-5 เพียง 3 ฉาก",href:"/games/number-mind",badge:"3-stage",duration:"1 นาที",input:"3 เส้นทาง"},
 {id:"symbol-mind",icon:"symbol",tone:"symbol",title:"สัญลักษณ์ลับ",description:"ใช้ Visual Routing สองสนามเพื่อระบุหนึ่งสัญลักษณ์จากชุด SVG 16 แบบ",href:"/games/symbol-mind",badge:"Visual route",duration:"40 วินาที",input:"2 สนาม"},
 {id:"sealed-prediction",icon:"prediction",tone:"prediction",title:"คำทำนายที่ปิดผนึก",description:"สร้าง SHA-256 commitment ก่อนเล่น แล้วใช้เส้นทางการเลือกแบบปรับตัวจนถึงเป้าหมาย",href:"/games/sealed-prediction",badge:"Verified",duration:"1 นาที",input:"Adaptive choice"}
];
