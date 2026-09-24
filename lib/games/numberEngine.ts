export type NumberGroup={digit:number;numbers:number[]};
export const NUMBER_SCENES=[
  {title:"เลือกเกตที่มีเลขของคุณ",label:"Gates"},
  {title:"เลือกวงโคจรที่มีเลขของคุณ",label:"Orbits"},
  {title:"เลือกสตรีมที่มีเลขของคุณ",label:"Streams"},
] as const;

function shuffle<T>(items:T[],seed:number){
  const out=[...items];let s=(seed+17)*69621%2147483647;
  for(let i=out.length-1;i>0;i--){s=s*48271%2147483647;const j=s%(i+1);[out[i],out[j]]=[out[j],out[i]]}
  return out;
}
function digitFor(number:number,round:number){
  const n=number-1;
  return round===0?Math.floor(n/25):round===1?Math.floor(n/5)%5:n%5;
}
export function buildNumberGroups(round:0|1|2,seed:number):NumberGroup[]{
  const groups=Array.from({length:5},(_,digit)=>({
    digit,
    numbers:Array.from({length:100},(_,i)=>i+1).filter(n=>digitFor(n,round)===digit),
  }));
  return shuffle(groups,seed+round*101).map((g,i)=>({...g,numbers:shuffle(g.numbers,seed+round*211+i*19)}));
}
export function decodeNumber(digits:number[]){
  if(digits.length!==3)return null;
  const value=digits[0]*25+digits[1]*5+digits[2]+1;
  return value>=1&&value<=100?value:null;
}
