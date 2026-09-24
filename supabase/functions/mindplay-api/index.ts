
const GAME_IDS = ["card-mind","number-mind","symbol-mind","word-mind","sealed-prediction"] as const;
type GameId = typeof GAME_IDS[number];

const SYMBOLS = [
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

const SYMBOL_QUESTIONS = [
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

const WORDS = [
 {id:1,word:"แมว",traits:["living","animal","home","small","fur"]},
 {id:2,word:"ช้าง",traits:["living","animal","large","land"]},
 {id:3,word:"ปลา",traits:["living","animal","water","small"]},
 {id:4,word:"ผีเสื้อ",traits:["living","animal","fly","small"]},
 {id:5,word:"แอปเปิล",traits:["food","fruit","sweet","round","hand"]},
 {id:6,word:"กล้วย",traits:["food","fruit","sweet","hand","yellow"]},
 {id:7,word:"พิซซ่า",traits:["food","meal","round","hot"]},
 {id:8,word:"ไอศกรีม",traits:["food","sweet","cold","hand"]},
 {id:9,word:"โทรศัพท์",traits:["object","hand","tech","home"]},
 {id:10,word:"กุญแจ",traits:["object","hand","metal","home"]},
 {id:11,word:"หนังสือ",traits:["object","hand","home","read"]},
 {id:12,word:"ร่ม",traits:["object","hand","outdoor","rain"]},
 {id:13,word:"ทะเล",traits:["place","outdoor","water","large"]},
 {id:14,word:"ภูเขา",traits:["place","outdoor","land","large"]},
 {id:15,word:"โรงเรียน",traits:["place","building","people","large","study"]},
 {id:16,word:"ตลาด",traits:["place","outdoor","people","food","shop"]},
];

const WORD_QUESTIONS = [
 {id:"living",text:"สิ่งที่คุณคิดมีชีวิตไหม?",yes:"มีชีวิต",no:"ไม่มีชีวิต",trait:"living"},
 {id:"food",text:"มันเป็นสิ่งที่กินหรือดื่มได้ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"food"},
 {id:"place",text:"มันเป็นสถานที่มากกว่าสิ่งของไหม?",yes:"เป็นสถานที่",no:"ไม่ใช่สถานที่",trait:"place"},
 {id:"animal",text:"มันเป็นสัตว์ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"animal"},
 {id:"hand",text:"โดยทั่วไปถือมันด้วยมือเดียวได้ไหม?",yes:"ได้",no:"ไม่ได้",trait:"hand"},
 {id:"outdoor",text:"คุณมักนึกถึงมันในพื้นที่กลางแจ้งไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"outdoor"},
 {id:"water",text:"มันเกี่ยวข้องกับน้ำโดยตรงไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"water"},
 {id:"sweet",text:"ถ้าเป็นอาหาร รสหวานเป็นภาพจำเด่นไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"sweet"},
 {id:"fruit",text:"มันเป็นผลไม้ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"fruit"},
 {id:"large",text:"โดยทั่วไปมันใหญ่กว่าตัวคนไหม?",yes:"ใหญ่กว่า",no:"ไม่ใหญ่กว่า",trait:"large"},
 {id:"home",text:"คุณพบมันในบ้านได้บ่อยไหม?",yes:"บ่อย",no:"ไม่บ่อย",trait:"home"},
 {id:"tech",text:"มันเกี่ยวข้องกับเทคโนโลยีไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"tech"},
 {id:"people",text:"สถานที่นี้มักมีคนจำนวนมากไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"people"},
 {id:"round",text:"รูปทรงกลมหรือวงกลมเป็นภาพจำเด่นไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"round"},
 {id:"cold",text:"ความเย็นเป็นลักษณะเด่นของมันไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"cold"},
 {id:"fly",text:"มันบินได้ไหม?",yes:"ได้",no:"ไม่ได้",trait:"fly"},
 {id:"metal",text:"มันมักทำจากโลหะเป็นหลักไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"metal"},
 {id:"read",text:"ปกติเราใช้มันเพื่ออ่านไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"read"},
 {id:"rain",text:"มันเกี่ยวข้องกับฝนโดยตรงไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"rain"},
 {id:"study",text:"สถานที่นี้เกี่ยวข้องกับการเรียนโดยตรงไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"study"},
];

const NUMBER_QUESTIONS = [
 {id:"even",kind:"trait",text:"เลขของคุณเป็นเลขคู่หรือเปล่า?",yes:"ใช่ เป็นเลขคู่",no:"ไม่ เป็นเลขคี่",test:(n:number)=>n%2===0},
 {id:"div3",kind:"trait",text:"เลขของคุณหาร 3 ลงตัวไหม?",yes:"ลงตัว",no:"ไม่ลงตัว",test:(n:number)=>n%3===0},
 {id:"div5",kind:"trait",text:"เลขของคุณลงท้ายด้วย 0 หรือ 5 ไหม?",yes:"ใช่",no:"ไม่ใช่",test:(n:number)=>n%5===0},
 {id:"digit1",kind:"trait",text:"มีเลข 1 อยู่ในตัวเลขที่คุณคิดไหม?",yes:"มี",no:"ไม่มี",test:(n:number)=>String(n).includes("1")},
 {id:"digit2",kind:"trait",text:"มีเลข 2 อยู่ในตัวเลขที่คุณคิดไหม?",yes:"มี",no:"ไม่มี",test:(n:number)=>String(n).includes("2")},
 {id:"digit3",kind:"trait",text:"มีเลข 3 อยู่ในตัวเลขที่คุณคิดไหม?",yes:"มี",no:"ไม่มี",test:(n:number)=>String(n).includes("3")},
 {id:"digit4",kind:"trait",text:"มีเลข 4 อยู่ในตัวเลขที่คุณคิดไหม?",yes:"มี",no:"ไม่มี",test:(n:number)=>String(n).includes("4")},
 {id:"onesHigh",kind:"trait",text:"หลักหน่วยของคุณเป็น 5–9 ไหม?",yes:"ใช่",no:"ไม่ใช่",test:(n:number)=>n%10>=5},
 {id:"sumEven",kind:"trait",text:"ถ้าบวกทุกหลักเข้าด้วยกัน ผลเป็นเลขคู่ไหม?",yes:"เป็นเลขคู่",no:"เป็นเลขคี่",test:(n:number)=>String(n).split("").reduce((s,d)=>s+Number(d),0)%2===0},
 {id:"sumHigh",kind:"trait",text:"ผลรวมของทุกหลักได้ 8 หรือมากกว่าไหม?",yes:"ใช่",no:"ไม่ใช่",test:(n:number)=>String(n).split("").reduce((s,d)=>s+Number(d),0)>=8},
 {id:"div7",kind:"trait",text:"เลขของคุณหาร 7 ลงตัวไหม?",yes:"ลงตัว",no:"ไม่ลงตัว",test:(n:number)=>n%7===0},
 {id:"mod4low",kind:"trait",text:"เมื่อแบ่งเลขของคุณเป็นกลุ่มละ 4 มันอยู่ในสองตำแหน่งแรกของกลุ่มไหม?",yes:"ใช่",no:"ไม่ใช่",test:(n:number)=>[0,1].includes(n%4)},
 ...Array.from({length:49},(_,i)=>i+1).map(t=>({id:"gt"+t,kind:"range",text:"เลขของคุณมากกว่า "+t+" ไหม?",yes:"มากกว่า "+t,no:t+" หรือต่ำกว่า",test:(n:number)=>n>t}))
];

const uuidRe=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function cors(req:Request){
 const origin=req.headers.get("origin")||"";
 const allowed = origin==="https://mindplay-silk.vercel.app" || /^https:\/\/[^/]+\.vercel\.app$/.test(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
 return {
  "Access-Control-Allow-Origin": allowed?origin:"https://mindplay-silk.vercel.app",
  "Access-Control-Allow-Headers":"content-type",
  "Access-Control-Allow-Methods":"POST,OPTIONS",
  "Vary":"Origin",
  "Content-Type":"application/json; charset=utf-8",
  "Cache-Control":"no-store"
 };
}

function json(req:Request,data:unknown,status=200){return new Response(JSON.stringify(data),{status,headers:cors(req)})}
function isGameId(v:unknown):v is GameId{return typeof v==="string"&&(GAME_IDS as readonly string[]).includes(v)}
function safePath(v:unknown){return typeof v==="string"&&v.startsWith("/")?v.slice(0,180):"/"}
function cleanMeta(v:unknown){return v&&typeof v==="object"&&!Array.isArray(v)?v:{}}

function getSecret(){
 try{
  const modern=JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")||"{}");
  if(modern.default)return modern.default as string;
 }catch{}
 return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"";
}
const SUPABASE_URL=Deno.env.get("SUPABASE_URL")||"";
const SECRET=getSecret();

function dbHeaders(prefer?:string){
 const h:Record<string,string>={"apikey":SECRET,"Content-Type":"application/json"};
 if(SECRET.startsWith("eyJ"))h["Authorization"]="Bearer "+SECRET;
 if(prefer)h["Prefer"]=prefer;
 return h;
}
async function db(path:string,init:RequestInit={}){
 const res=await fetch(SUPABASE_URL+"/rest/v1/"+path,{...init,headers:{...dbHeaders(),...(init.headers||{})}});
 if(!res.ok)throw new Error("db_"+res.status+"_"+(await res.text()).slice(0,180));
 const text=await res.text();
 return text?JSON.parse(text):null;
}
async function upsertVisitor(id:string,path:string){
 await db("visitor_sessions?on_conflict=id",{
  method:"POST",
  headers:dbHeaders("resolution=merge-duplicates,return=minimal"),
  body:JSON.stringify({id,first_path:path,last_seen_at:new Date().toISOString()})
 });
}
async function touchVisitor(id:string){
 await db("visitor_sessions?id=eq."+encodeURIComponent(id),{
  method:"PATCH",headers:dbHeaders("return=minimal"),
  body:JSON.stringify({last_seen_at:new Date().toISOString()})
 });
}
async function insertEvent(visitorId:string,eventType:string,gameId?:GameId|null,sessionId?:string|null,path?:string|null,metadata?:unknown){
 await db("analytics_events",{
  method:"POST",headers:dbHeaders("return=minimal"),
  body:JSON.stringify({visitor_id:visitorId,event_type:eventType,game_id:gameId??null,game_session_id:sessionId??null,path:path??null,metadata:cleanMeta(metadata)})
 });
}
async function hashToken(token:string){
 const data=new TextEncoder().encode(token);
 const digest=await crypto.subtle.digest("SHA-256",data);
 return Array.from(new Uint8Array(digest)).map(v=>v.toString(16).padStart(2,"0")).join("");
}
function tokenValue(){
 const a=new Uint8Array(32);crypto.getRandomValues(a);
 return Array.from(a).map(v=>v.toString(16).padStart(2,"0")).join("");
}
function publicQuestion(q:any|null){return q?{id:q.id,text:q.text,yes:q.yes,no:q.no}:null}

function pickNumber(candidates:number[],asked:string[]){
 let available=NUMBER_QUESTIONS.filter(q=>!asked.includes(q.id));
 available=available.filter(q=>{const yes=candidates.filter(q.test).length;return yes>0&&yes<candidates.length});
 if(candidates.length>8){
  const traits=available.filter(q=>q.kind==="trait");
  if(traits.length)available=traits;
 }
 return available.sort((a,b)=>{
  const ay=candidates.filter(a.test).length,by=candidates.filter(b.test).length;
  return Math.abs(candidates.length/2-ay)-Math.abs(candidates.length/2-by);
 })[0]||null;
}
function pickTrait(candidates:number[],asked:string[],items:any[],questions:any[]){
 const available=questions.filter(q=>!asked.includes(q.id)).filter(q=>{
  const yes=candidates.filter(id=>items.find(x=>x.id===id)?.traits.includes(q.trait)).length;
  return yes>0&&yes<candidates.length;
 });
 return available.sort((a,b)=>{
  const ay=candidates.filter(id=>items.find(x=>x.id===id)?.traits.includes(a.trait)).length;
  const by=candidates.filter(id=>items.find(x=>x.id===id)?.traits.includes(b.trait)).length;
  return Math.abs(candidates.length/2-ay)-Math.abs(candidates.length/2-by);
 })[0]||null;
}
function initialState(gameId:GameId){
 if(gameId==="number-mind"){
  const candidates=Array.from({length:50},(_,i)=>i+1),asked:string[]=[];
  const q=pickNumber(candidates,asked);
  return {mode:"server",candidates,asked,current:q?.id??null};
 }
 if(gameId==="symbol-mind"){
  const candidates=SYMBOLS.map(x=>x.id),asked:string[]=[];
  const q=pickTrait(candidates,asked,SYMBOLS,SYMBOL_QUESTIONS);
  return {mode:"server",candidates,asked,current:q?.id??null};
 }
 if(gameId==="word-mind"){
  const candidates=WORDS.map(x=>x.id),asked:string[]=[];
  const q=pickTrait(candidates,asked,WORDS,WORD_QUESTIONS);
  return {mode:"server",candidates,asked,current:q?.id??null};
 }
 return {mode:"client"};
}
function stateQuestion(gameId:GameId,state:any){
 if(gameId==="number-mind")return NUMBER_QUESTIONS.find(q=>q.id===state.current)||null;
 if(gameId==="symbol-mind")return SYMBOL_QUESTIONS.find(q=>q.id===state.current)||null;
 if(gameId==="word-mind")return WORD_QUESTIONS.find(q=>q.id===state.current)||null;
 return null;
}
function publicPool(gameId:GameId){
 if(gameId==="symbol-mind")return SYMBOLS.map(({id,icon,name})=>({id,icon,name}));
 if(gameId==="word-mind")return WORDS.map(({id,word})=>({id,word}));
 return null;
}
async function getSession(sessionId:string){
 const rows=await db("game_sessions?id=eq."+encodeURIComponent(sessionId)+"&select=id,visitor_id,game_id,status,token_hash,state,result_correct,replay_count");
 return Array.isArray(rows)?rows[0]||null:null;
}
async function authorizeSession(sessionId:unknown,token:unknown){
 if(typeof sessionId!=="string"||!uuidRe.test(sessionId)||typeof token!=="string"||token.length<32)return null;
 const row=await getSession(sessionId);
 if(!row)return null;
 const given=await hashToken(token);
 return given===row.token_hash?row:null;
}
async function patchSession(id:string,data:Record<string,unknown>){
 await db("game_sessions?id=eq."+encodeURIComponent(id),{
  method:"PATCH",headers:dbHeaders("return=minimal"),
  body:JSON.stringify({...data,updated_at:new Date().toISOString()})
 });
}

Deno.serve(async(req:Request)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:cors(req)});
 if(req.method!=="POST")return json(req,{error:"method_not_allowed"},405);
 if(!SUPABASE_URL||!SECRET)return json(req,{error:"server_configuration"},500);

 try{
  const body=await req.json().catch(()=>null);
  if(!body||typeof body!=="object")return json(req,{error:"invalid_body"},400);
  const action=(body as any).action;

  if(action==="page_view"){
   const visitorId=(body as any).visitorId;
   if(typeof visitorId!=="string"||!uuidRe.test(visitorId))return json(req,{error:"invalid_visitor"},400);
   const path=safePath((body as any).path);
   const gameId=isGameId((body as any).gameId)?(body as any).gameId:null;
   await upsertVisitor(visitorId,path);
   const since=new Date(Date.now()-20000).toISOString();
   const existing=await db("analytics_events?visitor_id=eq."+encodeURIComponent(visitorId)+"&event_type=eq.page_view&path=eq."+encodeURIComponent(path)+"&created_at=gte."+encodeURIComponent(since)+"&select=id&limit=1");
   if(!Array.isArray(existing)||existing.length===0){
    await insertEvent(visitorId,"page_view",gameId,null,path,null);
    if(gameId)await insertEvent(visitorId,"game_view",gameId,null,path,null);
   }
   return json(req,{ok:true});
  }

  if(action==="game_start"){
   const visitorId=(body as any).visitorId,gameId=(body as any).gameId;
   if(typeof visitorId!=="string"||!uuidRe.test(visitorId)||!isGameId(gameId))return json(req,{error:"invalid_start"},400);
   await upsertVisitor(visitorId,safePath((body as any).path));
   const token=tokenValue(),tokenHash=await hashToken(token),state=initialState(gameId);
   const rows=await db("game_sessions",{
    method:"POST",headers:dbHeaders("return=representation"),
    body:JSON.stringify({visitor_id:visitorId,game_id:gameId,token_hash:tokenHash,state})
   });
   const session=Array.isArray(rows)?rows[0]:null;
   if(!session)return json(req,{error:"session_create_failed"},500);
   await insertEvent(visitorId,"game_start",gameId,session.id,safePath((body as any).path),null);
   const q=stateQuestion(gameId,state);
   return json(req,{ok:true,sessionId:session.id,token,question:publicQuestion(q),pool:publicPool(gameId)});
  }

  if(action==="game_answer"){
   const row=await authorizeSession((body as any).sessionId,(body as any).token);
   if(!row)return json(req,{error:"invalid_session"},403);
   if(row.status!=="active")return json(req,{error:"session_finished"},409);
   const answer=(body as any).answer,questionId=(body as any).questionId;
   if(typeof answer!=="boolean"||typeof questionId!=="string")return json(req,{error:"invalid_answer"},400);
   const gameId=row.game_id as GameId;
   if(!["number-mind","symbol-mind","word-mind"].includes(gameId))return json(req,{error:"client_game"},400);
   const state=row.state||{};
   const q=stateQuestion(gameId,state);
   if(!q||q.id!==questionId)return json(req,{error:"stale_question"},409);
   let next:number[]=[];
   if(gameId==="number-mind")next=(state.candidates as number[]).filter(n=>q.test(n)===answer);
   if(gameId==="symbol-mind")next=(state.candidates as number[]).filter(id=>(SYMBOLS.find(x=>x.id===id)?.traits.includes(q.trait)??false)===answer);
   if(gameId==="word-mind")next=(state.candidates as number[]).filter(id=>(WORDS.find(x=>x.id===id)?.traits.includes(q.trait)??false)===answer);
   if(next.length===0)return json(req,{error:"inconsistent_answers",resetRequired:true},409);
   const asked=[...(state.asked||[]),q.id];
   if(next.length===1){
    let result:any;
    if(gameId==="number-mind")result={value:next[0],label:String(next[0]),icon:"number"};
    if(gameId==="symbol-mind"){const s=SYMBOLS.find(x=>x.id===next[0])!;result={id:s.id,label:s.name,icon:s.icon}}
    if(gameId==="word-mind"){const w=WORDS.find(x=>x.id===next[0])!;result={id:w.id,label:w.word,icon:"spark"}}
    await patchSession(row.id,{state:{...state,candidates:next,asked,current:null,result},status:"completed",completed_at:new Date().toISOString()});
    await insertEvent(row.visitor_id,"game_complete",gameId,row.id,null,{questions:asked.length});
    return json(req,{ok:true,done:true,result});
   }
   const nextQ=gameId==="number-mind"?pickNumber(next,asked):gameId==="symbol-mind"?pickTrait(next,asked,SYMBOLS,SYMBOL_QUESTIONS):pickTrait(next,asked,WORDS,WORD_QUESTIONS);
   if(!nextQ)return json(req,{error:"engine_no_question",resetRequired:true},409);
   const nextState={...state,candidates:next,asked,current:nextQ.id};
   await patchSession(row.id,{state:nextState});
   return json(req,{ok:true,done:false,question:publicQuestion(nextQ),step:asked.length+1});
  }

  if(action==="client_complete"){
   const row=await authorizeSession((body as any).sessionId,(body as any).token);
   if(!row)return json(req,{error:"invalid_session"},403);
   if(row.status==="completed")return json(req,{ok:true});
   if(row.status!=="active")return json(req,{error:"session_finished"},409);
   await patchSession(row.id,{status:"completed",completed_at:new Date().toISOString()});
   await insertEvent(row.visitor_id,"game_complete",row.game_id,row.id,null,cleanMeta((body as any).metadata));
   return json(req,{ok:true});
  }

  if(action==="reaction"){
   const row=await authorizeSession((body as any).sessionId,(body as any).token);
   if(!row)return json(req,{error:"invalid_session"},403);
   const correct=(body as any).correct;
   if(typeof correct!=="boolean")return json(req,{error:"invalid_reaction"},400);
   const eventType=correct?"guess_correct":"guess_wrong";
   const existing=await db("analytics_events?game_session_id=eq."+encodeURIComponent(row.id)+"&event_type=in.(guess_correct,guess_wrong)&select=id&limit=1");
   if(!Array.isArray(existing)||existing.length===0){
    await insertEvent(row.visitor_id,eventType,row.game_id,row.id,null,null);
    await patchSession(row.id,{result_correct:correct});
   }
   return json(req,{ok:true});
  }

  if(action==="replay"||action==="share"){
   const row=await authorizeSession((body as any).sessionId,(body as any).token);
   if(!row)return json(req,{error:"invalid_session"},403);
   if(action==="replay"){
    await patchSession(row.id,{replay_count:Number(row.replay_count||0)+1});
    await insertEvent(row.visitor_id,"game_replay",row.game_id,row.id,null,null);
   }else{
    const since=new Date(Date.now()-60000).toISOString();
    const existing=await db("analytics_events?game_session_id=eq."+encodeURIComponent(row.id)+"&event_type=eq.share&created_at=gte."+encodeURIComponent(since)+"&select=id&limit=1");
    if(!Array.isArray(existing)||existing.length===0)await insertEvent(row.visitor_id,"share",row.game_id,row.id,null,null);
   }
   return json(req,{ok:true});
  }

  if(action==="stats"){
   const raw=Number((body as any).days);
   const days=[0,1,7,30,90].includes(raw)?raw:30;
   const res=await fetch(SUPABASE_URL+"/rest/v1/rpc/get_mindplay_stats",{
    method:"POST",
    headers:dbHeaders(),
    body:JSON.stringify({p_days:days})
   });
   if(!res.ok)throw new Error("stats_"+res.status+"_"+(await res.text()).slice(0,160));
   const data=await res.json();
   return json(req,{ok:true,data});
  }

  return json(req,{error:"unknown_action"},400);
 }catch(error){
  console.error("mindplay-api",error);
  return json(req,{error:"server_error"},500);
 }
});
