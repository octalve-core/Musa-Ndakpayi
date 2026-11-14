import Link from 'next/link';
import {ArrowRight,type LucideIcon} from 'lucide-react';
export type PolicyCardProps={title:string;summary:string;icon:LucideIcon;color:string;href?:string;number?:string};
export function PolicyCard({title,summary,icon:Icon,color,href='/platforms',number}:PolicyCardProps){
 return <article className="flex min-h-[245px] flex-col rounded-xl border border-slate-100 border-t-4 bg-white p-6 shadow-[0_6px_24px_rgba(5,24,52,.05)] transition-shadow hover:shadow-[0_12px_36px_rgba(5,24,52,.09)] sm:p-7" style={{borderTopColor:color}}>
 <div className="mb-6 flex items-start justify-between"><div className="flex size-12 items-center justify-center rounded-xl" style={{backgroundColor:color+'16',color}}><Icon size={22} strokeWidth={1.8}/></div>{number&&<span className="text-sm font-medium text-slate-400">{number}</span>}</div>
 <h3 className="text-lg font-semibold text-[#111827]">{title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{summary}</p>
 <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{color}}>Explore priority <ArrowRight size={16}/></Link>
 </article>;
}
