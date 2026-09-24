import { SYMBOLS,type SymbolItem } from "../symbolMind";
export type SymbolGroup={key:number;items:SymbolItem[]};

function shuffle<T>(items:T[],seed:number){
  const out=[...items];let s=(seed+23)*104729%2147483647;
  for(let i=out.length-1;i>0;i--){s=s*48271%2147483647;const j=s%(i+1);[out[i],out[j]]=[out[j],out[i]]}
  return out;
}
export function symbolGroups(round:0|1,seed:number):SymbolGroup[]{
  const groups=Array.from({length:4},(_,key)=>({
    key,
    items:SYMBOLS.filter(item=>{
      const index=item.id-1;
      return round===0?Math.floor(index/4)===key:index%4===key;
    }),
  }));
  return shuffle(groups,seed+round*79).map((g,i)=>({...g,items:shuffle(g.items,seed+round*131+i*17)}));
}
export function decodeSymbol(first:number,second:number){
  return SYMBOLS[first*4+second]??null;
}
