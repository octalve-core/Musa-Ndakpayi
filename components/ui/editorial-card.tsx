import Link from 'next/link';
import {ArrowUpRight,CalendarDays,FileText,UsersRound,BookOpenText} from 'lucide-react';

export function EditorialCard({title,date,summary,source,href,category='Public statement'}:{title:string;date:string;summary:string;source:string;href:string;category?:string}){
 const Icon=category==='Community engagement'?UsersRound:category==='Policy coverage'?BookOpenText:FileText;
 return <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_6px_24px_rgba(5,24,52,.045)] transition-shadow hover:shadow-[0_12px_32px_rgba(5,24,52,.09)]">
  <div className="relative flex min-h-[148px] flex-col justify-between overflow-hidden border-b border-slate-100 bg-[#eaf2fb] p-6 text-[#073f86]">
   <div aria-hidden="true" className="absolute -right-10 -top-24 size-64 rounded-full border-[45px] border-[#d7e7f7]"/>
   <div className="relative flex items-center justify-between gap-4"><span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium">{category}</span><Icon size={23} strokeWidth={1.6} aria-hidden="true"/></div>
   <p className="relative text-[11px] font-medium uppercase tracking-[.17em] text-[#345d8b]">Chanchaga · Public record</p>
  </div>
  <div className="flex flex-1 flex-col p-6">
   <div className="flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={14} aria-hidden="true"/><span>{date}</span></div>
   <h3 className="mt-3 text-[18px] font-semibold leading-7 tracking-tight text-slate-900">{title}</h3>
   <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{summary}</p>
   <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">Reported by {source}</p>
   <Link href={href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-sm font-medium text-[#073f86] hover:underline">Read original report <ArrowUpRight size={16} aria-hidden="true"/></Link>
  </div>
 </article>;
}
