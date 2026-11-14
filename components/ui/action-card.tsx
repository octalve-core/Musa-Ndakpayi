import Link from 'next/link';
import {ArrowUpRight,type LucideIcon} from 'lucide-react';
export function ActionCard({title,description,icon:Icon,href,accent='#ffb71b'}:{title:string;description:string;icon:LucideIcon;href:string;accent?:string}){
 return <Link href={href} className="group flex min-h-28 min-w-0 items-center gap-4 rounded-xl border border-slate-200/80 border-t-[3px] bg-white p-5 shadow-[0_5px_18px_rgba(5,24,52,.065)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(5,24,52,.1)] sm:p-6" style={{borderTopColor:accent}}>
  <span className="flex size-12 shrink-0 items-center justify-center rounded-full text-[#073f86]" style={{backgroundColor:accent+'1c'}}><Icon size={21} strokeWidth={1.8}/></span>
  <span className="min-w-0 flex-1"><span className="block text-base font-semibold text-slate-900">{title}</span><span className="mt-1 block text-sm leading-6 text-slate-600">{description}</span></span>
  <ArrowUpRight size={19} className="shrink-0 text-[#073f86] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true"/>
 </Link>;
}
