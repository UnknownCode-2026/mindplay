export type GameId =
  | "card-mind"
  | "number-mind"
  | "symbol-mind"
  | "word-mind"
  | "sealed-prediction";

export type GameQuestion = { id:string; text:string; yes:string; no:string };
export type GameSessionRef = { sessionId:string; token:string };
export type GameResult = { id?:number; value?:number; label:string; icon:string };
export type GameStartResponse = GameSessionRef & { ok:true; question:GameQuestion|null; pool:unknown[]|null };
export type GameAnswerResponse = { ok:true; done:boolean; question?:GameQuestion|null; result?:GameResult; step?:number };

export type StatsSummary = {
  page_views:number; visitors:number; game_starts:number; game_completions:number;
  correct_guesses:number; wrong_guesses:number; replays:number; shares:number;
  completion_rate:number; correct_rate:number;
};
export type GameStats = {
  game_id:GameId; title:string; starts:number; completions:number; correct:number; wrong:number;
  replays:number; shares:number; completion_rate:number; correct_rate:number;
};
export type DailyStats = { day:string; page_views:number; visitors:number; game_starts:number; completions:number };
export type MindPlayStats = { period_days:number; summary:StatsSummary; games:GameStats[]; daily:DailyStats[]; active_now:number };

const API_URL="https://xrhqfojomnfwofqnofwn.supabase.co/functions/v1/mindplay-api";
const VISITOR_KEY="mindplay.visitor.v18";
const VISITOR_TTL=24*60*60*1000;
let volatileVisitorId:string|null=null;

export class MindPlayApiError extends Error {
  resetRequired:boolean;
  constructor(message:string,resetRequired=false){super(message);this.name="MindPlayApiError";this.resetRequired=resetRequired}
}

function makeUuid(){
  if(typeof crypto!=="undefined"&&typeof crypto.randomUUID==="function")return crypto.randomUUID();
  const bytes=new Uint8Array(16);crypto.getRandomValues(bytes);
  bytes[6]=(bytes[6]&0x0f)|0x40;bytes[8]=(bytes[8]&0x3f)|0x80;
  const hex=Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("");
  return [hex.slice(0,8),hex.slice(8,12),hex.slice(12,16),hex.slice(16,20),hex.slice(20)].join("-");
}

export function getVisitorId(){
  if(typeof window==="undefined"){if(!volatileVisitorId)volatileVisitorId=makeUuid();return volatileVisitorId}
  const now=Date.now();
  try{
    const raw=window.localStorage.getItem(VISITOR_KEY);
    if(raw){
      const saved=JSON.parse(raw) as {id?:string;createdAt?:number};
      if(saved.id&&saved.createdAt&&now-saved.createdAt<VISITOR_TTL)return saved.id;
    }
  }catch{}
  const id=makeUuid();volatileVisitorId=id;
  try{window.localStorage.setItem(VISITOR_KEY,JSON.stringify({id,createdAt:now}))}catch{}
  return id;
}

async function callApi<T>(payload:Record<string,unknown>,keepalive=false):Promise<T>{
  const response=await fetch(API_URL,{
    method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),
    cache:"no-store",keepalive
  });
  const data=await response.json().catch(()=>({error:"invalid_response"})) as Record<string,unknown>;
  if(!response.ok||data.error)throw new MindPlayApiError(String(data.error??"request_failed"),Boolean(data.resetRequired));
  return data as T;
}

export function gameIdFromPath(pathname:string):GameId|null{
  const map:Record<string,GameId>={
    "/games/missing-card":"card-mind",
    "/games/number-mind":"number-mind",
    "/games/symbol-mind":"symbol-mind",
    "/games/word-mind":"word-mind",
    "/games/sealed-prediction":"sealed-prediction",
  };
  return map[pathname]??null;
}

export async function trackPageView(path:string,gameId:GameId|null=null){
  if(typeof window==="undefined")return;
  await callApi<{ok:true}>({action:"page_view",visitorId:getVisitorId(),path,gameId},true);
}
export async function startGame(gameId:GameId,path:string):Promise<GameStartResponse>{
  return callApi<GameStartResponse>({action:"game_start",visitorId:getVisitorId(),gameId,path});
}
export async function answerGame(session:GameSessionRef,questionId:string,answer:boolean):Promise<GameAnswerResponse>{
  return callApi<GameAnswerResponse>({action:"game_answer",sessionId:session.sessionId,token:session.token,questionId,answer});
}
export async function completeClientGame(session:GameSessionRef,metadata:Record<string,unknown>={}){
  await callApi<{ok:true}>({action:"client_complete",sessionId:session.sessionId,token:session.token,metadata});
}
export async function recordReaction(session:GameSessionRef,correct:boolean){
  await callApi<{ok:true}>({action:"reaction",sessionId:session.sessionId,token:session.token,correct},true);
}
export async function recordReplay(session:GameSessionRef){
  await callApi<{ok:true}>({action:"replay",sessionId:session.sessionId,token:session.token},true);
}
export async function recordShare(session:GameSessionRef){
  await callApi<{ok:true}>({action:"share",sessionId:session.sessionId,token:session.token},true);
}
export async function getStats(days:0|1|7|30|90=30){
  const response=await callApi<{ok:true;data:MindPlayStats}>({action:"stats",days});
  return response.data;
}


export type PublicGameConfig={game_id:GameId;title:string;description:string|null;badge:string|null;enabled:boolean;sort_order:number;maintenance:boolean;maintenance_message:string;difficulty:string;question_limit:number|null;engine_version:string};
export type PublicConfig={site:{site_name:string;hero_title:string;hero_description:string;maintenance_mode:boolean;maintenance_message:string;public_stats_enabled:boolean;home_stats_enabled:boolean};features:Record<string,boolean>;games:PublicGameConfig[];announcement:{id:number;title:string;body:string}|null};
export async function getPublicConfig(){const response=await callApi<{ok:true;data:PublicConfig}>({action:"public_config"});return response.data}
