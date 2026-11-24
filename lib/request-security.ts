import {createHmac,timingSafeEqual} from 'node:crypto';
import type {NextRequest} from 'next/server';
export function sameOrigin(request:NextRequest){
 const origin=request.headers.get('origin');
 if(!origin)return false;
 try{return new URL(origin).origin===new URL(request.url).origin;}
 catch{return false;}
}
export function noStoreHeaders(){return {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};}
export function hashVisitor(value:string){
 const secret=process.env.REGISTRATION_HASH_SECRET;
 if(!secret||secret.length<32)throw new Error('Registration hash key missing');
 return createHmac('sha256',secret).update(value).digest('hex');
}
export function equalHex(a:string,b:string){
 if(!/^[a-f0-9]{64}$/.test(a)||!/^[a-f0-9]{64}$/.test(b))return false;
 return timingSafeEqual(Buffer.from(a,'hex'),Buffer.from(b,'hex'));
}
export async function verifyTurnstile(token:string,ip:string){
 const secret=process.env.TURNSTILE_SECRET_KEY;
 const hosts=(process.env.TURNSTILE_ALLOWED_HOSTNAMES||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
 if(!secret||!hosts.length||token.length<5)return false;
 try{
  const params=new URLSearchParams({secret,response:token});
  if(ip)params.set('remoteip',ip);
  const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',
   {method:'POST',body:params,cache:'no-store',signal:AbortSignal.timeout(10000)});
  if(!response.ok)return false;
  const result=await response.json() as {success?:boolean;hostname?:string};
  return result.success===true&&!!result.hostname&&hosts.includes(result.hostname.toLowerCase());
 }catch{return false;}
}
export function requestIp(req:NextRequest){
 return (req.headers.get('x-vercel-forwarded-for')||req.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim().slice(0,64);
}
