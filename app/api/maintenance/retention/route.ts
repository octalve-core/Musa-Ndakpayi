import {NextRequest,NextResponse} from 'next/server';
import {getSql} from '@/lib/db';
import {noStoreHeaders} from '@/lib/request-security';
import {timingSafeEqual} from 'node:crypto';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const respond=(message:string,status:number)=>NextResponse.json({message},{status,headers:noStoreHeaders()});
export async function GET(req:NextRequest){
 const secret=process.env.CRON_SECRET;
 const supplied=req.headers.get('authorization')||'';
 if(!secret||secret.length<32)return respond('Unavailable',503);
 const expected='Bearer '+secret;
 const a=Buffer.from(supplied),b=Buffer.from(expected);
 if(a.length!==b.length||!timingSafeEqual(a,b))return respond('Not authorised.',401);
 const retention=Number(process.env.PRIVACY_RETENTION_DAYS);
 if(!Number.isInteger(retention)||retention<30||retention>730||!process.env.DATABASE_URL)return respond('Maintenance is not configured.',503);
 try{
  const sql=getSql();
  // Physical deletion from the member table after the configured retention period.
  const deleted=await sql.query("DELETE FROM campaign_members WHERE created_at<now()-($1::integer*interval '1 day') RETURNING id",[retention]);
  await sql.query("DELETE FROM campaign_rate_limits WHERE window_start<now()-interval '30 days'");
  await sql.query("DELETE FROM campaign_sessions WHERE expires_at<now()");
  return NextResponse.json({ok:true,deletedMembers:deleted.length},{headers:noStoreHeaders()});
 }catch{return respond('Maintenance could not run.',503);}
}
