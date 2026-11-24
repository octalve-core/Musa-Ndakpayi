import {getSql} from '@/lib/db';
import {verifyUnit} from '@/lib/electoral';
export const PAGE_SIZE=40;
export type Filters={q:string;ward:string;pu:string;from:string;to:string;page:number};
export type MemberRow={
 id:string;reference:string;full_name:string;phone:string;ward_code:string;ward_name:string;pu_code:string;pu_name:string;
 registration_method:string;assisted_by:string|null;membership_status:string;
 communication_consent:boolean;consent_version:string;consent_at:string;
 possible_duplicate:boolean;created_at:string
};
const first=(params:URLSearchParams,key:string)=>params.get(key)?.trim()||'';
const day=(v:string)=>/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v+'T00:00:00Z'))?v:'';
export function parseFilters(params:URLSearchParams):Filters{
 const rawWard=first(params,'ward'),rawPu=first(params,'pu');
 const ward=/^\d{2}$/.test(rawWard)?rawWard:'';
 const pu=ward&&verifyUnit(ward,rawPu)?rawPu:'';
 const rawPage=Number(first(params,'page')||1);
 return {q:first(params,'q').slice(0,80),ward,pu,from:day(first(params,'from')),to:day(first(params,'to')),
  page:Number.isInteger(rawPage)&&rawPage>=1&&rawPage<=100000?rawPage:1};
}
export function encodeFilters(filters:Filters,page?:number){
 const p=new URLSearchParams();
 for(const key of ['q','ward','pu','from','to'] as const)if(filters[key])p.set(key,filters[key]);
 if(page&&page>1)p.set('page',String(page));
 return p.toString();
}
function values(f:Filters){
 // The geographic hierarchy is static and checked against the Chanchaga directory.
 const from=f.from?new Date(f.from+'T00:00:00+01:00').toISOString():null;
 const to=f.to?new Date(new Date(f.to+'T00:00:00+01:00').getTime()+86400000).toISOString():null;
 return [f.q,f.ward,f.pu,from,to];
}
const WHERE="($1::text='' OR full_name ILIKE '%'||$1||'%' OR phone ILIKE '%'||$1||'%') AND ($2::text='' OR ward_code=$2) AND ($3::text='' OR pu_code=$3) AND ($4::timestamptz IS NULL OR created_at >= $4::timestamptz) AND ($5::timestamptz IS NULL OR created_at < $5::timestamptz)";
export async function loadMembers(f:Filters){
 const sql=getSql(),p=values(f);
 const [overview,summary,rows]=await Promise.all([
  sql.query("SELECT count(*)::int AS total,count(DISTINCT ward_code)::int AS wards,count(*) FILTER(WHERE communication_consent=TRUE)::int AS contactable,count(*) FILTER(WHERE possible_duplicate=TRUE)::int AS possible_duplicates,count(*) FILTER(WHERE created_at>=date_trunc('day',now() AT TIME ZONE 'Africa/Lagos') AT TIME ZONE 'Africa/Lagos')::int AS today FROM campaign_members"),
  sql.query("SELECT count(*)::int AS total FROM campaign_members WHERE "+WHERE,p),
  sql.query("SELECT id,reference,full_name,phone,ward_code,ward_name,pu_code,pu_name,registration_method,communication_consent,possible_duplicate,created_at FROM campaign_members WHERE "+WHERE+" ORDER BY created_at DESC,id DESC LIMIT $6 OFFSET $7",
  [...p,PAGE_SIZE,(f.page-1)*PAGE_SIZE])
 ]);
 return {overview:overview[0] as Record<string,number>,count:Number(summary[0]?.total||0),rows:rows as unknown as MemberRow[]};
}
export async function getMember(reference:string):Promise<MemberRow|null>{
 const r=await getSql().query("SELECT id,reference,full_name,phone,ward_code,ward_name,pu_code,pu_name,registration_method,assisted_by,membership_status,communication_consent,consent_version,consent_at,possible_duplicate,created_at FROM campaign_members WHERE reference=$1 LIMIT 1",[reference]);
 return (r[0] as unknown as MemberRow)||null;
}
export async function exportBatch(f:Filters,lastId:string|null,limit=500):Promise<MemberRow[]>{
 const p=values(f);
 const r=await getSql().query("SELECT id,reference,full_name,phone,ward_code,ward_name,pu_code,pu_name,registration_method,assisted_by,membership_status,communication_consent,consent_version,consent_at,possible_duplicate,created_at FROM campaign_members WHERE "+WHERE+" AND ($6::bigint IS NULL OR id < $6::bigint) ORDER BY id DESC LIMIT $7",[...p,lastId,limit]);
 return r as unknown as MemberRow[];
}
export function displayTime(value:unknown){
 const date=new Date(String(value));
 return Number.isNaN(date.getTime())?'—':new Intl.DateTimeFormat('en-NG',{timeZone:'Africa/Lagos',dateStyle:'medium',timeStyle:'short'}).format(date);
}
export const CSV_HEADERS=['Reference','Registered (WAT)','Full name','Phone','LGA','Ward','Ward code','Polling unit','Polling unit code','Method','Assisted by','Member status','Campaign updates opt-in','Possible duplicate','Consent version'];
export function csvCell(value:unknown){
 let text=String(value??'').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,'');
 if(/^[\s]*[=+\-@]/.test(text))text="'"+text;
 return '"'+text.replace(/"/g,'""')+'"';
}
export function csvRecord(row:MemberRow){
 return [row.reference,displayTime(row.created_at),row.full_name,row.phone,'Chanchaga',row.ward_name,row.ward_code,row.pu_name,row.pu_code,row.registration_method,row.assisted_by,row.membership_status,row.communication_consent?'Yes':'No',row.possible_duplicate?'Yes':'No',row.consent_version].map(csvCell).join(',')+'\r\n';
}
