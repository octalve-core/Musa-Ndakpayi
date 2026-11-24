import {createHash,createHmac,randomBytes} from 'node:crypto';
import {cookies} from 'next/headers';
import type {NextResponse} from 'next/server';
import {getSql} from '@/lib/db';
import {equalHex} from '@/lib/request-security';
export const SESSION_COOKIE='mun_admin_session';
export const SESSION_AGE=8*60*60;
const tokenHash=(value:string)=>createHash('sha256').update(value).digest('hex');
export type AdminIdentity={id:string;username:string;mustChange:boolean;tokenHash:string};

export function adminReady(){
 return Boolean(process.env.DATABASE_URL&&process.env.ADMIN_CSRF_SECRET&&process.env.ADMIN_CSRF_SECRET.length>=32);
}
export async function getAdmin():Promise<AdminIdentity|null>{
 if(!adminReady())return null;
 const token=(await cookies()).get(SESSION_COOKIE)?.value;
 if(!token||!/^[a-zA-Z0-9_-]{40,64}$/.test(token))return null;
 try{
  const rows=await getSql().query("SELECT a.id,a.username,a.must_change_password FROM campaign_sessions s JOIN campaign_admins a ON a.id=s.admin_id WHERE s.token_hash=$1 AND s.expires_at>now() AND a.active=TRUE LIMIT 1",[tokenHash(token)]);
  const row=rows[0];
  return row?{id:String(row.id),username:String(row.username),mustChange:row.must_change_password===true,tokenHash:tokenHash(token)}:null;
 }catch{return null;}
}
export async function makeSession(adminId:string,response:NextResponse){
 const token=randomBytes(32).toString('base64url');
 const sql=getSql();
 await sql.query("DELETE FROM campaign_sessions WHERE expires_at<now()");
 await sql.query("INSERT INTO campaign_sessions(token_hash,admin_id,expires_at) VALUES ($1,$2,now()+interval '8 hours')",[tokenHash(token),adminId]);
 response.cookies.set(SESSION_COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:SESSION_AGE});
}
export function clearAdminCookie(response:NextResponse){
 response.cookies.set(SESSION_COOKIE,'',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:0});
}
export function adminDigest(value:string){
 const key=process.env.ADMIN_CSRF_SECRET;
 if(!key||key.length<32)throw new Error('Admin secret missing');
 return createHmac('sha256',key).update(value).digest('hex');
}
export function csrfToken(admin:AdminIdentity,action:string){return adminDigest('csrf|'+admin.tokenHash+'|'+action);}
export function validCsrf(admin:AdminIdentity,action:string,token:unknown){
 return typeof token==='string'&&equalHex(csrfToken(admin,action),token);
}
export async function auditAdmin(username:string,action:string,reference:string|null=null){
 await getSql().query("INSERT INTO campaign_admin_audit(actor_username,action,member_reference) VALUES ($1,$2,$3)",[username,action,reference]);
}
