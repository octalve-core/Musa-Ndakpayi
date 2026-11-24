import {NextRequest,NextResponse} from 'next/server';
import {getSql,databaseReady} from '@/lib/db';
import {verifyPassword} from '@/lib/admin-password.mjs';
import {adminDigest,adminReady,auditAdmin,makeSession} from '@/lib/admin-auth';
import {noStoreHeaders,sameOrigin,requestIp} from '@/lib/request-security';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const json=(message:string,status:number)=>NextResponse.json({message},{status,headers:noStoreHeaders()});
export async function POST(req:NextRequest){
 if(!adminReady()||!await databaseReady())return json('Administration is not configured.',503);
 if(!sameOrigin(req))return json('Invalid sign-in request.',403);
 let data:unknown;
 try{const raw=await req.text();if(raw.length>4096)return json('Invalid sign-in request.',413);data=JSON.parse(raw);}
 catch{return json('Enter your username and password.',400);}
 if(!data||typeof data!=='object')return json('Enter your username and password.',400);
 const {username,password}=data as Record<string,unknown>;
 if(typeof username!=='string'||typeof password!=='string'||!/^[a-z0-9._-]{4,40}$/.test(username.toLowerCase())||password.length>256||!password)return json('Invalid username or password.',401);
 const user=username.toLowerCase(),sql=getSql();
 try{
  for(const key of ['ip|'+requestIp(req),'user|'+user]){
   const visitor=adminDigest('rate|'+key);
   const rows=await sql.query("INSERT INTO campaign_rate_limits(kind,visitor_hash,window_start,attempts) VALUES('LOGIN',$1,date_trunc('hour',now()),1) ON CONFLICT(kind,visitor_hash,window_start) DO UPDATE SET attempts=campaign_rate_limits.attempts+1 RETURNING attempts",[visitor]);
   if(Number(rows[0]?.attempts||0)>12)return json('Too many sign-in attempts. Please try again later.',429);
  }
  const rows=await sql.query("SELECT id,username,password_hash,must_change_password,active FROM campaign_admins WHERE username=$1 LIMIT 1",[user]);
  const admin=rows[0];
  const verified=verifyPassword(password,admin?.password_hash??'');
  if(!admin||admin.active!==true||!verified)return json('Invalid username or password.',401);
  const response=NextResponse.json({redirect:admin.must_change_password?'/admin/change-password':'/admin/members'},{headers:noStoreHeaders()});
  await makeSession(String(admin.id),response);
  await sql.query("UPDATE campaign_admins SET last_login_at=now() WHERE id=$1",[admin.id]);
  await auditAdmin(user,'LOGIN');
  return response;
 }catch{return json('Unable to sign in at this time.',503);}
}
