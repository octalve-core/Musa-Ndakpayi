import {NextRequest,NextResponse} from 'next/server';
import {getAdmin,validCsrf,adminDigest,auditAdmin} from '@/lib/admin-auth';
import {getSql} from '@/lib/db';
import {verifyPassword,hashPassword} from '@/lib/admin-password.mjs';
import {sameOrigin,noStoreHeaders} from '@/lib/request-security';
export const runtime='nodejs';
const json=(message:string,status:number)=>NextResponse.json({message},{status,headers:noStoreHeaders()});
export async function POST(req:NextRequest){
 const admin=await getAdmin();
 if(!admin)return json('Please sign in.',401);
 if(!sameOrigin(req))return json('Invalid request.',403);
 let body:Record<string,unknown>;
 try{const raw=await req.text();if(raw.length>4096)return json('Request too large.',413);body=JSON.parse(raw);}catch{return json('Please check the form.',400);}
 if(!validCsrf(admin,'password',body.csrf))return json('Security check failed. Reload the page.',403);
 const current=body.currentPassword,newPassword=body.newPassword;
 if(typeof current!=='string'||typeof newPassword!=='string'||newPassword.length<16||newPassword.length>256||current===newPassword)return json('Use a new password of at least 16 characters.',400);
 try{
  const sql=getSql();
  const visitor=adminDigest('password|'+admin.id);
  const rate=await sql.query("INSERT INTO campaign_rate_limits(kind,visitor_hash,window_start,attempts) VALUES('PASSWORD',$1,date_trunc('hour',now()),1) ON CONFLICT(kind,visitor_hash,window_start) DO UPDATE SET attempts=campaign_rate_limits.attempts+1 RETURNING attempts",[visitor]);
  if(Number(rate[0]?.attempts||0)>8)return json('Too many attempts. Please try later.',429);
  const rows=await sql.query("SELECT password_hash FROM campaign_admins WHERE id=$1 FOR UPDATE",[admin.id]);
  if(!rows[0]||!verifyPassword(current,rows[0].password_hash))return json('Current password is incorrect.',401);
  const hashed=hashPassword(newPassword);
  await sql.query("UPDATE campaign_admins SET password_hash=$1,must_change_password=FALSE WHERE id=$2",[hashed,admin.id]);
  await sql.query("DELETE FROM campaign_sessions WHERE admin_id=$1 AND token_hash<>$2",[admin.id,admin.tokenHash]);
  await auditAdmin(admin.username,'PASSWORD_CHANGED');
  return NextResponse.json({redirect:'/admin/members'},{headers:noStoreHeaders()});
 }catch{return json('Could not update the password.',503);}
}
