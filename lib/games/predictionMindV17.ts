import type { IconName } from "../../components/MindPlayUI";
export type PredictionItem={id:string;label:string;icon:IconName};
export const PREDICTION_ITEMS:PredictionItem[]=[
 {id:"moon",label:"พระจันทร์",icon:"moon"},
 {id:"key",label:"กุญแจ",icon:"key"},
 {id:"star",label:"ดาว",icon:"star"},
 {id:"rose",label:"กุหลาบ",icon:"rose"},
 {id:"diamond",label:"เพชร",icon:"diamond"},
];

export function createTarget(){
 if(typeof crypto==="undefined")return PREDICTION_ITEMS[0];
 const buf=new Uint32Array(1);crypto.getRandomValues(buf);
 return PREDICTION_ITEMS[buf[0]%PREDICTION_ITEMS.length];
}
