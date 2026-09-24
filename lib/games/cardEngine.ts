export type SuitName="spade"|"heart"|"diamond"|"club";
export type MindCard={id:number;rank:string;suit:SuitName};

const ranks=["7","9","J","K"];
const suits:SuitName[]=["spade","heart","diamond","club"];

export const MIND_CARDS:MindCard[]=Array.from({length:16},(_,id)=>({
  id,
  rank:ranks[Math.floor(id/4)],
  suit:suits[id%4],
}));

function shuffle<T>(items:T[],seed:number){
  const out=[...items];let s=(seed+11)*48271%2147483647;
  for(let i=out.length-1;i>0;i--){s=s*48271%2147483647;const j=s%(i+1);[out[i],out[j]]=[out[j],out[i]]}
  return out;
}
export function allCards(seed:number){return shuffle(MIND_CARDS,seed)}
export function cardGroups(round:0|1,seed:number){
  const groups=Array.from({length:4},(_,key)=>({
    key,
    cards:MIND_CARDS.filter(card=>round===0?Math.floor(card.id/4)===key:card.id%4===key),
  }));
  return shuffle(groups,seed).map((g,i)=>({...g,cards:shuffle(g.cards,seed+i+37)}));
}
export function decodeCard(first:number,second:number){return MIND_CARDS[first*4+second]}
