import {NextRequest,NextResponse} from 'next/server';
import {getAdmin,validCsrf,auditAdmin} from '@/lib/admin-auth';
import {getSql} from '@/lib/db';
import {sameOrigin,noStoreHeaders} from '@/lib/request-security';
export const runtime='nodejs';
export async function DELETE(req:NextRequest,{params}:{params:Promise<{reference:string}>}){
 const admin=await getAdmin();
 if(!admin||admin.mustChange)return NextResponse.json({message:'Administrator access required.'},{status:401,headers:noStoreHeaders()});
 if(!sameOrigin(req))return NextResponse.json({message:'Invalid request.'},{status:403});
 const {reference}=await params;
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reference))return NextResponse.json({message:'Invalid member reference.'},{status:400});
 if(!validCsrf(admin,'delete|'+reference,req.headers.get('x-admin-csrf')))return NextResponse.json({message:'Security verification failed.'},{status:403});
 try{
  const sql=getSql();
  await auditAdmin(admin.username,'MEMBER_DELETE',reference);
  const rows=await sql.query("DELETE FROM campaign_members WHERE reference=$1 RETURNING reference",[reference]);
  if(!rows.length)return NextResponse.json({message:'Member not found.'},{status:404,headers:noStoreHeaders()});
  return NextResponse.json({message:'Member record deleted.'},{headers:noStoreHeaders()});
 }catch{return NextResponse.json({message:'Unable to delete this record.'},{status:503,headers:noStoreHeaders()});}
}
