import {neon} from '@neondatabase/serverless';
export function getSql(){
 const url=process.env.DATABASE_URL;
 if(!url)throw new Error('Campaign database is not configured');
 return neon(url);
}
export async function databaseReady(){
 if(!process.env.DATABASE_URL)return false;
 try{
  const sql=getSql();
  const rows=await sql.query("SELECT to_regclass('public.campaign_members') IS NOT NULL AND to_regclass('public.campaign_admins') IS NOT NULL AND to_regclass('public.campaign_sessions') IS NOT NULL AND to_regclass('public.campaign_rate_limits') IS NOT NULL AND to_regclass('public.campaign_admin_audit') IS NOT NULL AS ready");
  if(rows[0]?.ready!==true)return false;
  const seeded=await sql.query("SELECT EXISTS(SELECT 1 FROM campaign_admins WHERE active=TRUE) AS seeded");
  return seeded[0]?.seeded===true;
 }catch{return false;}
}
