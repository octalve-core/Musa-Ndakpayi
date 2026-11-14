import Link from 'next/link';
import {ArrowUpRight,type LucideIcon} from 'lucide-react';
export function ActionCard({title,description,icon:Icon,href,accent='#ffb71b'}:{title:string;description:string;icon:LucideIcon;href:string;accent?:string}){
 return <Link href={href} className="group flex min-h-28 items-center gap-4 rounded-xl border border-slate-100 border-t-[3px] bg-white p-5 shadow-[0_5px_18px_rgba(5,24,52,.06)] sm:p-6" style={{borderTopColor:accent}}>
  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#fff5d9] text-[#d68b00]"><Icon size={20}/></span>
  <span className="flex-1"><span className="block font-semibold text-slate-900">{title}</span><span className="mt-1 block text-sm text-slate-600">{description}</span></span>
  <ArrowUpRight size={18} className="text-slate-400 transition group-hover:text-[#073f86]"/>
 </Link>;
}
