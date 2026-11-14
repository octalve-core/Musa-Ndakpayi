'use client';
import {useEffect,useRef,useState,type KeyboardEvent} from 'react';
import {priorities} from '@/lib/content';
import {CheckCircle2} from 'lucide-react';

export function AgendaTabs(){
 const [index,setIndex]=useState(0);
 const refs=useRef<(HTMLButtonElement|null)[]>([]);
 useEffect(()=>{
  const syncFromHash=()=>{
   const slug=decodeURIComponent(window.location.hash.slice(1));
   const selected=priorities.findIndex(priority=>priority.slug===slug);
   if(selected>=0)setIndex(selected);
  };
  syncFromHash();
  window.addEventListener('hashchange',syncFromHash);
  return()=>window.removeEventListener('hashchange',syncFromHash);
 },[]);
 const activate=(next:number,focus=false)=>{
  setIndex(next);
  window.history.replaceState(null,'','#'+priorities[next].slug);
  if(focus)refs.current[next]?.focus();
 };
 const handleKeys=(event:KeyboardEvent<HTMLButtonElement>,current:number)=>{
  let next=current;
  if(event.key==='ArrowRight')next=(current+1)%priorities.length;
  else if(event.key==='ArrowLeft')next=(current+priorities.length-1)%priorities.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=priorities.length-1;
  else return;
  event.preventDefault();
  activate(next,true);
 };
 const active=priorities[index];
 const Icon=active.icon;
 return <div>
  <div role="tablist" aria-label="Legislative priorities" className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-4 [scrollbar-width:thin]">
   {priorities.map((priority,i)=><button key={priority.slug} ref={node=>{refs.current[i]=node;}} id={priority.slug} type="button" role="tab" aria-selected={i===index} aria-controls="agenda-panel" tabIndex={i===index?0:-1} onClick={()=>activate(i)} onKeyDown={event=>handleKeys(event,i)} className={['scroll-mt-32 shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium transition-colors sm:text-sm',i===index?'border-[#073f86] bg-[#073f86] text-white':'border-slate-200 bg-white text-slate-700 hover:border-[#073f86] hover:text-[#073f86]'].join(' ')}>{priority.number} {priority.title}</button>)}
  </div>
  <div id="agenda-panel" role="tabpanel" tabIndex={0} aria-labelledby={active.slug} className="mx-auto max-w-[920px] py-12 outline-offset-4 sm:py-16">
   <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
    <span className="flex size-14 shrink-0 items-center justify-center rounded-xl" style={{background:active.color+'17',color:active.color}}><Icon size={25}/></span>
    <div><p className="text-xs font-medium uppercase tracking-[.15em] text-[#073f86]">Priority {active.number} · {active.category}</p>
     <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{active.title}</h2>
     <p className="mt-4 text-base leading-8 text-slate-600">{active.detail}</p>
    </div>
   </div>
   <div className="mt-9 border-t border-slate-200 pt-8"><h3 className="text-lg font-semibold text-slate-900">Legislative focus areas</h3>
    <div className="mt-5 space-y-3">{active.mechanisms.map(measure=><div key={measure} className="flex gap-4 rounded-xl border border-slate-100 bg-[#f7f9fc] p-5"><CheckCircle2 size={20} className="mt-1 shrink-0 text-[#13864b]"/><p className="text-sm leading-7 text-slate-700">{measure}</p></div>)}</div>
   </div>
  </div>
 </div>;
}
