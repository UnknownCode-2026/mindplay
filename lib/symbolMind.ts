import type { IconName } from "../components/MindPlayUI";

export type SymbolItem = { id:number; icon:IconName; name:string; };
export type SymbolQuestion = { bit:number; symbols:SymbolItem[]; };

export const SYMBOLS: SymbolItem[] = [
  {id:1,icon:"moon",name:"พระจันทร์"},
  {id:2,icon:"flame",name:"เปลวไฟ"},
  {id:3,icon:"diamond",name:"เพชร"},
  {id:4,icon:"bolt",name:"สายฟ้า"},
  {id:5,icon:"butterfly",name:"ผีเสื้อ"},
  {id:6,icon:"clover",name:"ใบโคลเวอร์"},
  {id:7,icon:"star",name:"ดาว"},
  {id:8,icon:"crown",name:"มงกุฎ"},
  {id:9,icon:"heart",name:"หัวใจ"},
  {id:10,icon:"eye",name:"ดวงตา"},
  {id:11,icon:"wave",name:"คลื่น"},
  {id:12,icon:"sun",name:"พระอาทิตย์"},
  {id:13,icon:"orb",name:"ลูกแก้ว"},
  {id:14,icon:"candle",name:"เทียน"},
  {id:15,icon:"key",name:"กุญแจ"},
  {id:16,icon:"rose",name:"กุหลาบ"}
];

export function buildSymbolQuestions(): SymbolQuestion[] {
  return [0,1,2,3].map(bit => {
    const mask=1<<bit;
    return {bit,symbols:SYMBOLS.filter(item => (item.id & mask)!==0)};
  });
}
export function calculateSymbolId(questions:SymbolQuestion[],answers:boolean[]):number {
  return questions.reduce((sum,q,index)=>answers[index]?sum+(1<<q.bit):sum,0);
}
export function findSymbol(id:number){return SYMBOLS.find(item=>item.id===id);}
export function shuffleSymbols<T>(items:T[],seed:number):T[] {
  const result=[...items]; let state=(seed+3)*7919+104729;
  for(let i=result.length-1;i>0;i-=1){state=(state*48271)%2147483647;const j=state%(i+1);[result[i],result[j]]=[result[j],result[i]];}
  return result;
}
