'use client';
import {useState} from 'react';
import {priorities} from '@/lib/content';
import {CheckCircle2} from 'lucide-react';
export function AgendaTabs(){
 const [index,setIndex]=useState(0);const active=priorities[index],Icon=active.icon;
 return <div>
  <div role="tablist" aria-label="Legislative priorities" className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
   {priorities.map((p,i)=><button type="button" role="tab" aria-selected={i===index} aria-controls="agenda-panel" id={'agenda-tab-'+i} key={p.slug} onClick={()=>setIndex(i)} className={['rounded-full border px-4 py-2 text-xs font-medium transition sm:text-sm',i===index?'border-[#073f86] bg-[#073f86] text-white':'border-slate-200 text-slate-600 hover:border-[#073f86] hover:text-[#073f86]'].join(' ')}>{p.number} {p.title}</button>)}
  </div>
  <div id="agenda-panel" role="tabpanel" aria-labelledby={'agenda-tab-'+index} className="mx-auto max-w-[900px] py-14 sm:py-20">
   <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
    <span className="flex size-16 shrink-0 items-center justify-center rounded-xl" style={{background:active.color+'17',color:active.color}}><Icon size={27}/></span>
    <div><p className="text-xs font-semibold uppercase tracking-[.2em]" style={{color:active.color}}>Priority {active.number} · {active.category}</p>
    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{active.title}</h2>
    <p className="mt-4 text-base leading-8 text-slate-600">{active.detail}</p></div>
   </div>
   <div className="mt-10 border-t border-slate-200 pt-8"><h3 className="text-lg font-semibold text-slate-900">Potential legislative and oversight measures</h3>
   <div className="mt-6 space-y-4">{active.mechanisms.map(m=><div key={m} className="flex gap-4 rounded-xl bg-[#f6f7f9] p-5"><CheckCircle2 size={20} className="mt-1 shrink-0 text-[#18a65b]"/><p className="text-sm leading-7 text-slate-700">{m}</p></div>)}</div></div>
   <p className="mt-8 border-l-[3px] border-[#ffb71b] bg-[#fffbf0] px-5 py-4 text-sm leading-7 text-slate-700">These are policy directions for discussion. They do not imply that a bill has been introduced, funding secured, or a project completed. Publication of a candidate-approved manifesto requires the campaign’s signed material.</p>
  </div>
 </div>;
}
