import {NextRequest,NextResponse} from 'next/server';
import {getSql,databaseReady} from '@/lib/db';
import {verifyUnit} from '@/lib/electoral';
import {registrationReady,turnstileEnabled,memberSchema,CONSENT_VERSION} from '@/lib/member-registration';
import {sameOrigin,noStoreHeaders,hashVisitor,requestIp,verifyTurnstile} from '@/lib/request-security';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const respond=(message:string,status:number)=>NextResponse.json({message},{status,headers:noStoreHeaders()});
export async function POST(req:NextRequest){
 if(!registrationReady()||!await databaseReady())return respond('Membership registration is not currently available.',503);
 if(!sameOrigin(req))return respond('Please use the official registration form.',403);
 if(Number(req.headers.get('content-length')||0)>12000)return respond('Submission is too large.',413);
 let body:unknown;
 try{const raw=await req.text();if(raw.length>12000)return respond('Submission is too large.',413);body=JSON.parse(raw);}
 catch{return respond('Please review and resubmit your information.',400);}
 const parsed=memberSchema.safeParse(body);
 if(!parsed.success)return respond('Please check the required form details.',400);
 const d=parsed.data;
 const location=verifyUnit(d.wardCode,d.puCode);
 if(!location)return respond('Please select a polling unit under your chosen Chanchaga ward.',400);
 const ip=requestIp(req);
 if(turnstileEnabled()&&!await verifyTurnstile(d.turnstileToken,ip))return respond('Security verification was unsuccessful. Please try again.',400);
 try{
  const sql=getSql();
  const visitor=hashVisitor('ip|'+ip);
  const rate=await sql.query(
   "INSERT INTO campaign_rate_limits(kind,visitor_hash,window_start,attempts) VALUES ('MEMBER',$1,date_trunc('hour',now()),1) ON CONFLICT(kind,visitor_hash,window_start) DO UPDATE SET attempts=campaign_rate_limits.attempts+1 RETURNING attempts",
   [visitor]);
  if(Number(rate[0]?.attempts||0)>10)return respond('Too many submissions. Please try again later.',429);
  const normalizedName=d.fullName.replace(/\s+/g,' ').trim();
  const phone=d.phone.startsWith('0')?'+234'+d.phone.slice(1):d.phone;
  const fingerprint=hashVisitor('member|'+normalizedName.toLowerCase()+'|'+phone+'|'+d.puCode);
  const phoneHash=hashVisitor('phone|'+phone);
  // Independent per-phone throttle limits repeated submissions when Turnstile is optional.
  const phoneRate=await sql.query(
   "INSERT INTO campaign_rate_limits(kind,visitor_hash,window_start,attempts) VALUES('PHONE',$1,date_trunc('day',now()),1) ON CONFLICT(kind,visitor_hash,window_start) DO UPDATE SET attempts=campaign_rate_limits.attempts+1 RETURNING attempts",
   [phoneHash]);
  if(Number(phoneRate[0]?.attempts||0)>3)return respond('Too many submissions for this phone number. Please try again tomorrow.',429);
  const found=await sql.query(
    "SELECT EXISTS(SELECT 1 FROM campaign_members WHERE fingerprint=$1 AND created_at>now()-interval '90 days') AS found",[fingerprint]);
  const rows=await sql.query(
   "INSERT INTO campaign_members(full_name,phone,phone_hash,ward_code,ward_name,pu_code,pu_name,registration_method,assisted_by,communication_consent,consent_version,fingerprint,possible_duplicate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING reference",
   [normalizedName,phone,phoneHash,location.wardCode,location.ward,location.puCode,location.unit,d.method,d.method==='Assisted'?d.assistedBy:null,false,CONSENT_VERSION,fingerprint,found[0]?.found===true]);
  return NextResponse.json({message:'Your membership registration has been received.',reference:rows[0].reference},{status:201,headers:noStoreHeaders()});
 }catch{return respond('The registration could not be saved. Please try again.',503);}
}
