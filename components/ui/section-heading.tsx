import type {ReactNode} from 'react';
export function SectionHeading({eyebrow,title,description,action,center=false}:{eyebrow?:string;title:string;description?:string;action?:ReactNode;center?:boolean}){
 return <div className={['mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between',center?'sm:flex-col sm:items-center sm:text-center':''].join(' ')}>
  <div className={center?'mx-auto max-w-2xl text-center':'max-w-3xl'}>
   {eyebrow&&<p className="mb-3 text-xs font-semibold uppercase tracking-[.20em] text-[#0a5d9c]">{eyebrow}</p>}
   <h2 className="text-3xl font-semibold leading-tight tracking-[-.04em] text-[#101827] sm:text-4xl">{title}</h2>
   {description&&<p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">{description}</p>}
  </div>{action&&<div className="shrink-0">{action}</div>}
 </div>;
}
