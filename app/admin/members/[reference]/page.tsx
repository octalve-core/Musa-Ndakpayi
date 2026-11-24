import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound,redirect} from 'next/navigation';
import {ArrowLeft,ShieldCheck} from 'lucide-react';
import {getAdmin,csrfToken} from '@/lib/admin-auth';
import {getMember,displayTime} from '@/lib/admin-records';
import {Container} from '@/components/ui/container';
import {DeleteMemberButton} from '@/components/admin/delete-member-button';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Member Record',robots:{index:false,follow:false}};
export default async function MemberDetail({params}:{params:Promise<{reference:string}>}){
 const admin=await getAdmin();if(!admin)redirect('/admin/login');if(admin.mustChange)redirect('/admin/change-password');
 const {reference}=await params;
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reference))notFound();
 let member:Awaited<ReturnType<typeof getMember>>;
 try{member=await getMember(reference);}catch{member=null;}
 if(!member)notFound();
 const facts=[
  ['Full name',member.full_name],['Phone',member.phone],['Membership status',member.membership_status],
  ['Local government','Chanchaga'],['Ward',member.ward_name],['Polling unit',member.pu_name],
  ['Polling unit code',member.pu_code],['Registration method',member.registration_method],
  ['Assisted by',member.assisted_by||'—'],['Campaign communication opt-in',member.communication_consent?'Yes':'No'],
  ['Possible duplicate',member.possible_duplicate?'Review':'No'],['Consent recorded',displayTime(member.consent_at)],
  ['Registration time',displayTime(member.created_at)],['Consent version',member.consent_version]
 ];
 return <section className="min-h-[70vh] bg-[#f5f7fb] py-12 sm:py-16"><Container className="max-w-[960px]">
  <Link href="/admin/members" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#073f86] hover:underline"><ArrowLeft size={18}/>Back to members</Link>
  <header className="mt-5"><p className="text-xs font-semibold uppercase tracking-[.15em] text-[#0a5d9c]">Private member record</p><h1 className="mt-2 text-3xl font-semibold text-slate-900">{member.full_name}</h1><p className="mt-3 break-all font-mono text-xs text-slate-500">{member.reference}</p></header>
  <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2 sm:p-9">
   {facts.map(([label,value])=><div key={label} className="min-w-0 border-b border-slate-100 pb-4"><dt className="text-xs font-medium uppercase tracking-[.08em] text-slate-500">{label}</dt><dd className="mt-2 break-words text-sm font-medium text-slate-900">{value}</dd></div>)}
  </div>
  <div className="mt-7 flex flex-wrap items-center justify-between gap-6">
   <p className="flex max-w-lg items-start gap-2 text-xs leading-6 text-slate-600"><ShieldCheck size={18} className="mt-1 shrink-0 text-[#14834b]"/>Member records contain sensitive personal information. Delete a record only when authorised and necessary.</p>
   <DeleteMemberButton reference={member.reference} csrf={csrfToken(admin,'delete|'+member.reference)}/>
  </div>
 </Container></section>;
}
