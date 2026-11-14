import Link from 'next/link';
import {ArrowRight,type LucideIcon} from 'lucide-react';
export type PolicyCardProps={title:string;summary:string;icon:LucideIcon;color:string;href?:string;number?:string};
export function PolicyCard({title,summary,icon:Icon,color,href='/platforms',number}:PolicyCardProps){
 return <article className="flex min-h-[245px] min-w-0 flex-col rounded-xl border border-slate-200/80 border-t-[3px] bg-white p-6 shadow-[0_6px_24px_rgba(5,24,52,.045)] transition-shadow hover:shadow-[0_12px_36px_rgba(5,24,52,.09)] sm:p-7" style={{borderTopColor:color}}>
  <div className="mb-6 flex items-start justify-between"><div className="flex size-12 items-center justify-center rounded-xl text-[#073f86]" style={{backgroundColor:color+'16'}}><Icon size={22} strokeWidth={1.8}/></div>{number&&<span className="text-sm font-medium text-slate-500">{number}</span>}</div>
  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{summary}</p>
  <Link href={href} className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-sm font-medium text-[#073f86] hover:underline">Explore priority <ArrowRight size={16} aria-hidden="true"/></Link>
 </article>;
}
