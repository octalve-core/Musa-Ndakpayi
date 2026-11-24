import {NextRequest,NextResponse} from 'next/server';
import {getAdmin,validCsrf,clearAdminCookie,auditAdmin} from '@/lib/admin-auth';
import {getSql} from '@/lib/db';
import {sameOrigin,noStoreHeaders} from '@/lib/request-security';
export const runtime='nodejs';
export async function POST(req:NextRequest){
 const admin=await getAdmin();
 if(!admin)return NextResponse.json({message:'Not signed in.'},{status:401,headers:noStoreHeaders()});
 if(!sameOrigin(req))return NextResponse.json({message:'Invalid request.'},{status:403});
 let token:FormDataEntryValue|null=null;
 try{const body=await req.formData();token=body.get('_csrf');}catch{}
 if(!validCsrf(admin,'logout',token))return NextResponse.json({message:'Invalid session request.'},{status:403});
 await getSql().query("DELETE FROM campaign_sessions WHERE token_hash=$1",[admin.tokenHash]);
 await auditAdmin(admin.username,'LOGOUT');
 const response=NextResponse.redirect(new URL('/admin/login',req.url),{status:303});
 clearAdminCookie(response);
 return response;
}
