import type { SuitName } from "../../components/MindPlayUI";

export type MindCard={id:number;rank:string;suit:SuitName};
export type CardLane={key:number;cards:MindCard[]};

const raw:[string,SuitName][]=[
 ["A","spade"],["4","heart"],["7","diamond"],["J","club"],["K","heart"],["9","spade"],["Q","diamond"],
 ["3","club"],["8","heart"],["10","diamond"],["K","spade"],["5","club"],["J","heart"],["6","diamond"],
 ["Q","spade"],["2","heart"],["9","club"],["A","diamond"],["7","spade"],["10","club"],["K","diamond"],
];
export const CARD_SET:MindCard[]=raw.map(([rank,suit],id)=>({id,rank,suit}));

function shuffle<T>(items:T[],seed:number){
 const out=[...items];let state=(seed+19)*48271%2147483647;
 for(let i=out.length-1;i>0;i--){state=state*48271%2147483647;const j=state%(i+1);[out[i],out[j]]=[out[j],out[i]]}
 return out;
}
function digit(id:number,round:number){return Math.floor(id/Math.pow(3,round))%3}
export function cardLanes(round:0|1|2,seed:number):CardLane[]{
 const lanes=Array.from({length:3},(_,key)=>({key,cards:CARD_SET.filter(card=>digit(card.id,round)===key)}));
 return shuffle(lanes,seed+round*61).map((lane,index)=>({...lane,cards:shuffle(lane.cards,seed+round*109+index*13)}));
}
export function decodeCard(keys:number[]){if(keys.length!==3)return null;const id=keys[0]+keys[1]*3+keys[2]*9;return CARD_SET[id]??null}
