import type {Metadata} from 'next';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {Users,MapPinned,MessageCircle,AlertCircle,Eye,ShieldCheck,Download,CalendarCheck} from 'lucide-react';
import {getAdmin,csrfToken} from '@/lib/admin-auth';
import {loadMembers,PAGE_SIZE,encodeFilters,parseFilters,displayTime} from '@/lib/admin-records';
import {MemberFilters} from '@/components/admin/member-filters';
import {Container} from '@/components/ui/container';
export const dynamic='force-dynamic';
export const runtime='nodejs';
export const metadata:Metadata={title:'Member Administration',robots:{index:false,follow:false}};
type Props={searchParams:Promise<Record<string,string|string[]|undefined>>};
export default async function MemberAdministration({searchParams}:Props){
 const admin=await getAdmin();if(!admin)redirect('/admin/login');if(admin.mustChange)redirect('/admin/change-password');
 const entries=await searchParams,p=new URLSearchParams();
 for(const [key,value] of Object.entries(entries))if(typeof value==='string')p.set(key,value);
 const f=parseFilters(p);
 let data:Awaited<ReturnType<typeof loadMembers>>|null=null;
 try{data=await loadMembers(f)}catch{}
 const cards=data?[
  {label:'Registered members',value:data.overview.total||0,icon:Users},
  {label:'Wards represented',value:data.overview.wards||0,icon:MapPinned},
  {label:'New today',value:data.overview.today||0,icon:CalendarCheck},
  {label:'Campaign updates opt-in',value:data.overview.contactable||0,icon:MessageCircle}
 ]:[];
 const totalPages=data?Math.max(1,Math.ceil(data.count/PAGE_SIZE)):1;
 return <section className="min-h-[70vh] bg-[#f5f7fb] py-10 sm:py-14"><Container>
  <header className="flex flex-wrap items-start justify-between gap-5">
   <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#073f86]">Private campaign administration</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Member management</h1><p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">Chanchaga Federal Constituency · Member records and constituency insights.</p><p className="mt-1 text-xs text-slate-500">Signed in as {admin.username}</p></div>
   <form action="/api/admin/logout" method="post"><input type="hidden" name="_csrf" value={csrfToken(admin,'logout')}/><button type="submit" className="inline-flex min-h-11 items-center rounded-md border border-slate-300 bg-white px-5 text-sm font-medium text-[#073f86] hover:bg-slate-50">Sign out</button></form>
  </header>
  {!data?<div role="alert" className="mt-8 rounded-xl border border-red-200 bg-white p-8 text-sm text-red-800">Member records are unavailable. Confirm the dedicated Neon database and its schema.</div>:<>
   <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(({label,value,icon:Icon})=><div key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-3"><p className="text-sm text-slate-500">{label}</p><Icon size={21} className="text-[#0a5d9c]"/></div><p className="mt-5 text-3xl font-semibold tabular-nums text-slate-900">{Number(value).toLocaleString('en-NG')}</p></div>)}</div>
   <MemberFilters initial={f}/>
   <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-label="Member records">
    <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6"><div><h2 className="text-lg font-semibold text-slate-900">Member directory</h2><p className="mt-1 text-xs text-slate-500">{data.count.toLocaleString('en-NG')} records match · {PAGE_SIZE} per page</p></div>
    <form method="post" action="/api/admin/export"><input type="hidden" name="_csrf" value={csrfToken(admin,'export')}/>{['q','ward','pu','from','to'].map(key=><input key={key} type="hidden" name={key} value={String(f[key as keyof typeof f]||'')}/>)}<button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#073f86] px-5 text-sm font-medium text-white"><Download size={17}/>Export CSV</button></form>
    </div>
    <div className="w-full overflow-x-auto"><table className="w-full min-w-[950px] text-left text-sm">
     <thead className="bg-[#edf4fb] text-[#16446f]"><tr>{['Date · WAT','Full name','Phone','Ward','Polling unit','Details'].map(label=><th key={label} scope="col" className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-[.06em]">{label}</th>)}</tr></thead>
     <tbody>{data.rows.map(row=><tr key={row.reference} className="border-t border-slate-100 hover:bg-[#fafcff]"><td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">{displayTime(row.created_at)}</td><td className="px-5 py-4 font-medium text-slate-900">{row.full_name}{row.possible_duplicate&&<span className="ml-2 text-[10px] text-amber-700">Review duplicate</span>}</td><td className="whitespace-nowrap px-5 py-4 text-slate-700">{row.phone}</td><td className="px-5 py-4 text-slate-700">{row.ward_name}</td><td className="px-5 py-4 text-slate-700">{row.pu_name}<span className="mt-1 block font-mono text-xs text-slate-400">{row.pu_code}</span></td><td className="px-5 py-4"><Link href={'/admin/members/'+row.reference} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-xs font-semibold text-[#073f86] hover:bg-[#edf4fb]"><Eye size={15}/>View</Link></td></tr>)}</tbody>
    </table>{!data.rows.length&&<p className="px-6 py-12 text-center text-sm text-slate-600">No members match these filters.</p>}</div>
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 p-5"><span className="text-xs text-slate-600">Page {f.page} of {totalPages}</span><nav aria-label="Member pages" className="flex gap-2">{f.page>1&&<Link className="rounded-md border border-slate-300 px-4 py-2 text-sm text-[#073f86]" href={'/admin/members?'+encodeFilters(f,f.page-1)}>Previous</Link>}{f.page<totalPages&&<Link className="rounded-md bg-[#073f86] px-4 py-2 text-sm text-white" href={'/admin/members?'+encodeFilters(f,f.page+1)}>Next</Link>}</nav></div>
   </section>
   <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-slate-600"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#12804b]"/>These records include sensitive campaign membership information. Access and CSV downloads are restricted to administrators. <AlertCircle size={14} className="mt-1"/>Protect exported files and use data only for the consented purposes.</p>
  </>}
 </Container></section>;
}
