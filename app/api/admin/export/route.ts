import {NextRequest,NextResponse} from 'next/server';
import {getAdmin,validCsrf,auditAdmin} from '@/lib/admin-auth';
import {sameOrigin,noStoreHeaders} from '@/lib/request-security';
import {parseFilters,exportBatch,CSV_HEADERS,csvCell,csvRecord} from '@/lib/admin-records';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=60;
const json=(message:string,status:number)=>NextResponse.json({message},{status,headers:noStoreHeaders()});
export async function POST(req:NextRequest){
 const admin=await getAdmin();
 if(!admin||admin.mustChange)return json('Administrator sign-in required.',401);
 if(!sameOrigin(req))return json('Invalid export origin.',403);
 let form:FormData;
 try{form=await req.formData();}catch{return json('Invalid request.',400);}
 if(!validCsrf(admin,'export',form.get('_csrf')))return json('Export security check unsuccessful.',403);
 const p=new URLSearchParams();
 for(const key of ['q','ward','pu','from','to']){
  const value=form.get(key);
  if(value!==null){if(typeof value!=='string'||value.length>120)return json('Invalid filter.',400);p.set(key,value);}
 }
 const filters=parseFilters(p);
 let pending:Awaited<ReturnType<typeof exportBatch>>;
 try{
  await auditAdmin(admin.username,'CSV_EXPORT');
  pending=await exportBatch(filters,null,500);
 }catch{return json('Member export is unavailable.',503);}
 const encoder=new TextEncoder();
 let lastId:string|null=null;
 const stream=new ReadableStream<Uint8Array>({
  start(controller){controller.enqueue(encoder.encode('\uFEFF'+CSV_HEADERS.map(csvCell).join(',')+'\r\n'))},
  async pull(controller){
   try{
    if(!pending.length){controller.close();return;}
    controller.enqueue(encoder.encode(pending.map(csvRecord).join('')));
    lastId=String(pending[pending.length-1].id);
    if(pending.length<500){controller.close();return;}
    pending=await exportBatch(filters,lastId,500);
   }catch{controller.error(new Error('CSV export interrupted'));}
  }
 });
 const filename='chanchaga-members-'+new Date().toISOString().slice(0,10)+'.csv';
 return new Response(stream,{status:200,headers:{
  'Content-Type':'text/csv; charset=utf-8',
  'Content-Disposition':'attachment; filename="'+filename+'"',
  'Cache-Control':'private, no-store, max-age=0',
  'X-Content-Type-Options':'nosniff',
  'X-Robots-Tag':'noindex, nofollow',
  'Referrer-Policy':'no-referrer'
 }});
}
