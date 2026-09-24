export type NumberQuestion={id:string;text:string;yes:string;no:string;kind:"trait"|"range";test:(n:number)=>boolean};
export const NUMBER_POOL=Array.from({length:50},(_,i)=>i+1);

const thresholds=Array.from({length:49},(_,i)=>i+1);
const questions:NumberQuestion[]=[
 {id:"even",kind:"trait",text:"เลขของคุณเป็นเลขคู่หรือเปล่า?",yes:"ใช่ เป็นเลขคู่",no:"ไม่ เป็นเลขคี่",test:n=>n%2===0},
 {id:"div3",kind:"trait",text:"เลขของคุณหาร 3 ลงตัวไหม?",yes:"ลงตัว",no:"ไม่ลงตัว",test:n=>n%3===0},
 {id:"div5",kind:"trait",text:"เลขของคุณลงท้ายด้วย 0 หรือ 5 ไหม?",yes:"ใช่",no:"ไม่ใช่",test:n=>n%5===0},
 {id:"div7",kind:"trait",text:"เลขของคุณหาร 7 ลงตัวไหม?",yes:"ลงตัว",no:"ไม่ลงตัว",test:n=>n%7===0},
 {id:"digit1",kind:"trait",text:"มีเลข 1 อยู่ในตัวเลขที่คุณคิดไหม?",yes:"มี",no:"ไม่มี",test:n=>String(n).includes("1")},
 {id:"digit2",kind:"trait",text:"มีเลข 2 อยู่ในตัวเลขที่คุณคิดไหม?",yes:"มี",no:"ไม่มี",test:n=>String(n).includes("2")},
 {id:"digit3",kind:"trait",text:"มีเลข 3 อยู่ในตัวเลขที่คุณคิดไหม?",yes:"มี",no:"ไม่มี",test:n=>String(n).includes("3")},
 {id:"digit4",kind:"trait",text:"มีเลข 4 อยู่ในตัวเลขที่คุณคิดไหม?",yes:"มี",no:"ไม่มี",test:n=>String(n).includes("4")},
 {id:"onesHigh",kind:"trait",text:"หลักหน่วยของคุณเป็น 5–9 ไหม?",yes:"ใช่",no:"ไม่ใช่",test:n=>n%10>=5},
 {id:"sumEven",kind:"trait",text:"ถ้าบวกทุกหลักเข้าด้วยกัน ผลเป็นเลขคู่ไหม?",yes:"เป็นเลขคู่",no:"เป็นเลขคี่",test:n=>String(n).split("").reduce((s,d)=>s+Number(d),0)%2===0},
 {id:"sumHigh",kind:"trait",text:"ผลรวมของทุกหลักได้ 8 หรือมากกว่าไหม?",yes:"ใช่",no:"ไม่ใช่",test:n=>String(n).split("").reduce((s,d)=>s+Number(d),0)>=8},
 {id:"mod4low",kind:"trait",text:"ถ้าหารด้วย 4 เศษเป็น 0 หรือ 1 ไหม?",yes:"ใช่",no:"ไม่ใช่",test:n=>[0,1].includes(n%4)},
 ...thresholds.map(t=>({id:"gt"+t,kind:"range" as const,text:"เลขของคุณมากกว่า "+t+" ไหม?",yes:"มากกว่า "+t,no:t+" หรือต่ำกว่า",test:(n:number)=>n>t}))
];

export function nextNumberQuestion(candidates:number[],asked:string[]){
 let available=questions.filter(q=>!asked.includes(q.id));
 available=available.filter(q=>{const yes=candidates.filter(q.test).length;return yes>0&&yes<candidates.length});
 if(candidates.length>8){
   const traits=available.filter(q=>q.kind==="trait");
   if(traits.length)available=traits;
 }
 return available.sort((a,b)=>{
   const ay=candidates.filter(a.test).length,by=candidates.filter(b.test).length;
   return Math.abs(candidates.length/2-ay)-Math.abs(candidates.length/2-by);
 })[0]??null;
}
export function applyNumberAnswer(candidates:number[],question:NumberQuestion,answer:boolean){return candidates.filter(n=>question.test(n)===answer)}
