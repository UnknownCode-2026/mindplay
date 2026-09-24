import type { MindPlayStats } from "./mindplayApi";

const SUPABASE_URL="https://xrhqfojomnfwofqnofwn.supabase.co";
const PUBLISHABLE_KEY="sb_publishable__8DfFg1f1NmKd0LBCQwpPw_Gs_MCfhc";
const API_URL=SUPABASE_URL+"/functions/v1/mindplay-api";
const TOKEN_KEY="mindplay.admin.token";

export type AdminGame={game_id:string;title:string;description:string|null;badge:string|null;enabled:boolean;sort_order:number;maintenance:boolean;maintenance_message:string;difficulty:string;question_limit:number|null;engine_version:string};
export type SiteSettings={id:number;site_name:string;hero_title:string;hero_description:string;announcement_enabled:boolean;announcement_text:string|null;maintenance_mode:boolean;maintenance_message:string;public_stats_enabled:boolean;home_stats_enabled:boolean;updated_at:string};
export type FeatureFlag={key:string;enabled:boolean;description:string|null;updated_at:string};
export type Announcement={id:number;title:string;body:string;enabled:boolean;starts_at:string|null;ends_at:string|null;created_at:string;updated_at:string};
export type AuditLog={id:number;action:string;target_type:string;target_id:string|null;detail:Record<string,unknown>;created_at:string};
export type AdminSnapshot={site:SiteSettings;games:AdminGame[];flags:FeatureFlag[];announcements:Announcement[];audits:AuditLog[];stats:MindPlayStats|null};

export function getAdminToken(){if(typeof window==="undefined")return null;return localStorage.getItem(TOKEN_KEY)}
export function clearAdminToken(){if(typeof window!=="undefined")localStorage.removeItem(TOKEN_KEY)}
export async function loginAdmin(email:string,password:string){
 const res=await fetch(SUPABASE_URL+"/auth/v1/token?grant_type=password",{method:"POST",headers:{"Content-Type":"application/json","apikey":PUBLISHABLE_KEY},body:JSON.stringify({email,password})});
 const data=await res.json();
 if(!res.ok||!data.access_token)throw new Error(data?.msg||data?.error_description||"login_failed");
 if(data.user?.app_metadata?.role!=="admin")throw new Error("not_admin");
 localStorage.setItem(TOKEN_KEY,data.access_token);
 return data.user;
}
async function adminCall<T>(payload:Record<string,unknown>):Promise<T>{
 const token=getAdminToken();
 if(!token)throw new Error("not_authenticated");
 const res=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...payload,adminToken:token}),cache:"no-store"});
 const data=await res.json().catch(()=>({error:"invalid_response"}));
 if(!res.ok||data.error){if(res.status===401||res.status===403)clearAdminToken();throw new Error(data.error||"request_failed")}
 return data as T;
}
export async function getAdminSnapshot(){const r=await adminCall<{ok:true;data:AdminSnapshot}>({action:"admin_snapshot"});return r.data}
export async function updateSite(payload:Partial<SiteSettings>){return adminCall({action:"admin_update",target:"site",payload})}
export async function updateGame(gameId:string,payload:Partial<AdminGame>){return adminCall({action:"admin_update",target:"game",gameId,payload})}
export async function updateFeature(key:string,enabled:boolean){return adminCall({action:"admin_update",target:"feature",key,payload:{enabled}})}
export async function createAnnouncement(title:string,body:string,enabled=true){return adminCall({action:"admin_update",target:"announcement",mode:"create",payload:{title,body,enabled}})}
export async function toggleAnnouncement(id:number,enabled:boolean){return adminCall({action:"admin_update",target:"announcement",mode:"toggle",id,payload:{enabled}})}
