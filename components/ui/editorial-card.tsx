import Link from 'next/link';
import {ArrowUpRight,CalendarDays} from 'lucide-react';
export function EditorialCard({title,date,summary,source,href,category='Public statement'}:{title:string;date:string;summary:string;source:string;href:string;category?:string}){
 return <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_6px_20px_rgba(5,24,52,.05)]">
  <div className="flex h-32 flex-col justify-between bg-[linear-gradient(135deg,#073f86,#0c6faf)] p-5 text-white">
   <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium">{category}</span>
   <p className="text-xs uppercase tracking-[.2em] text-blue-100">Chanchaga · Public record</p>
  </div>
  <div className="flex flex-1 flex-col p-6">
   <div className="flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={14}/><time>{date}</time></div>
   <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-900">{title}</h3>
   <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{summary}</p>
   <p className="mt-4 text-xs text-slate-500">Reported by {source}</p>
   <Link href={href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#073f86]">Read original source <ArrowUpRight size={15}/></Link>
  </div>
 </article>;
}
