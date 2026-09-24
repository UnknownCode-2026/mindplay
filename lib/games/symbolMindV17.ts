import type { IconName } from "../../components/MindPlayUI";
export type MindSymbol={id:number;icon:IconName;name:string;traits:string[]};
export type SymbolQuestion={id:string;text:string;yes:string;no:string;trait:string};

export const MIND_SYMBOLS:MindSymbol[]=[
 {id:1,icon:"moon",name:"พระจันทร์",traits:["curve","nature","sky","night","sym"]},
 {id:2,icon:"flame",name:"เปลวไฟ",traits:["curve","nature","energy","warm","point"]},
 {id:3,icon:"diamond",name:"เพชร",traits:["object","point","sym","hard","jewel"]},
 {id:4,icon:"bolt",name:"สายฟ้า",traits:["nature","energy","point","sky"]},
 {id:5,icon:"butterfly",name:"ผีเสื้อ",traits:["nature","living","sym","wing"]},
 {id:6,icon:"clover",name:"ใบโคลเวอร์",traits:["nature","living","curve","plant","sym"]},
 {id:7,icon:"star",name:"ดาว",traits:["sky","point","sym","night"]},
 {id:8,icon:"crown",name:"มงกุฎ",traits:["object","point","sym","royal"]},
 {id:9,icon:"heart",name:"หัวใจ",traits:["curve","sym","emotion"]},
 {id:10,icon:"eye",name:"ดวงตา",traits:["curve","living","sym","body"]},
 {id:11,icon:"wave",name:"คลื่น",traits:["curve","nature","water","motion"]},
 {id:12,icon:"sun",name:"พระอาทิตย์",traits:["sky","energy","warm","sym"]},
 {id:13,icon:"orb",name:"ลูกแก้ว",traits:["object","curve","sym","mystic"]},
 {id:14,icon:"candle",name:"เทียน",traits:["object","warm","light"]},
 {id:15,icon:"key",name:"กุญแจ",traits:["object","hard","asym","metal"]},
 {id:16,icon:"rose",name:"กุหลาบ",traits:["nature","living","plant","curve"]},
];

const questions:SymbolQuestion[]=[
 {id:"curve",text:"รูปที่คุณคิดมีเส้นโค้งเด่นกว่ามุมแหลมหรือไม่?",yes:"เส้นโค้งเด่น",no:"มุมหรือเส้นตรงเด่น",trait:"curve"},
 {id:"nature",text:"คุณเชื่อมโยงรูปนี้กับธรรมชาติไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"nature"},
 {id:"object",text:"มันให้ความรู้สึกเหมือนสิ่งของที่จับต้องได้ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"object"},
 {id:"sym",text:"รูปนี้ดูสมมาตรเมื่อมองตรง ๆ ไหม?",yes:"ค่อนข้างสมมาตร",no:"ไม่สมมาตร",trait:"sym"},
 {id:"sky",text:"รูปนี้ทำให้นึกถึงท้องฟ้าหรืออวกาศไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"sky"},
 {id:"energy",text:"รูปนี้สื่อถึงพลังงาน แสง หรือความร้อนไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"energy"},
 {id:"living",text:"รูปนี้เกี่ยวข้องกับสิ่งมีชีวิตโดยตรงไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"living"},
 {id:"point",text:"มีปลายแหลมหรือมุมคมเป็นลักษณะเด่นไหม?",yes:"มี",no:"ไม่มี",trait:"point"},
 {id:"plant",text:"มันเกี่ยวข้องกับพืชหรือดอกไม้ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"plant"},
 {id:"warm",text:"ความรู้สึกแรกของรูปนี้ออกไปทางอบอุ่นหรือสว่างไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"warm"},
 {id:"night",text:"รูปนี้เชื่อมโยงกับเวลากลางคืนไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"night"},
 {id:"water",text:"รูปนี้เกี่ยวข้องกับน้ำไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"water"},
 {id:"hard",text:"ถ้าจินตนาการว่าสัมผัสได้ มันให้ความรู้สึกแข็งหรือเป็นโลหะไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"hard"},
 {id:"royal",text:"มันเชื่อมโยงกับราชวงศ์หรืออำนาจไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"royal"},
 {id:"body",text:"มันเป็นส่วนหนึ่งของร่างกายหรือไม่?",yes:"ใช่",no:"ไม่ใช่",trait:"body"},
 {id:"mystic",text:"รูปนี้ให้ความรู้สึกลึกลับหรือเกี่ยวกับการพยากรณ์ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"mystic"},
];

export function nextSymbolQuestion(candidates:MindSymbol[],asked:string[]){
 const available=questions.filter(q=>!asked.includes(q.id)).filter(q=>{const yes=candidates.filter(s=>s.traits.includes(q.trait)).length;return yes>0&&yes<candidates.length});
 return available.sort((a,b)=>{
   const ay=candidates.filter(s=>s.traits.includes(a.trait)).length;
   const by=candidates.filter(s=>s.traits.includes(b.trait)).length;
   return Math.abs(candidates.length/2-ay)-Math.abs(candidates.length/2-by);
 })[0]??null;
}
export function applySymbolAnswer(candidates:MindSymbol[],question:SymbolQuestion,answer:boolean){return candidates.filter(s=>s.traits.includes(question.trait)===answer)}
