export async function sha256(value:string){
  const data=new TextEncoder().encode(value);
  const digest=await crypto.subtle.digest("SHA-256",data);
  return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,"0")).join("");
}
export function randomNonce(){
  const bytes=new Uint8Array(12);crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b=>b.toString(16).padStart(2,"0")).join("");
}
export function shortFingerprint(hash:string){
  return hash.slice(0,16).toUpperCase().match(/.{1,4}/g)?.join(" · ")??hash.slice(0,16).toUpperCase();
}
