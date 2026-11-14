import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {priorities} from '@/lib/content';
export const metadata:Metadata={title:'Public Priorities'};
export default function Platforms(){
 return <><PageHero title="Issues & priorities" label="Chanchaga in focus" description="Seven priorities for greater opportunity, stronger communities and effective representation in Chanchaga."/>
 <section className="py-16 sm:py-20"><Container>
  <SectionHeading title="Seven priorities for Chanchaga" description="A focused agenda that connects everyday community needs with the tools of legislation, budget oversight and public representation."/>
  <div className="grid gap-6 md:grid-cols-2">
   {priorities.map(p=><article id={p.slug} key={p.slug} className="scroll-mt-28 rounded-xl border border-slate-200 border-t-[5px] bg-white p-6 shadow-sm sm:p-8" style={{borderTopColor:p.color}}>
    <div className="flex items-start justify-between gap-4"><span className="flex size-12 items-center justify-center rounded-lg" style={{background:p.color+'16',color:p.color}}><p.icon size={23}/></span><span className="text-sm font-medium text-slate-400">{p.number}</span></div>
    <p className="mt-5 text-xs font-semibold uppercase tracking-[.17em]" style={{color:p.color}}>{p.category}</p>
    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{p.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{p.detail}</p>
    <h3 className="mt-6 text-sm font-semibold text-slate-900">Legislative action</h3>
    <ul className="mt-3 space-y-3">{p.mechanisms.map(m=><li key={m} className="flex gap-3 text-sm leading-7 text-slate-600"><span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full" style={{background:p.color}}/>{m}</li>)}</ul>
    <Link href={'/manifesto#'+p.slug} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#073f86]">Explore the agenda <ArrowUpRight size={15}/></Link>
   </article>)}
  </div>
 </Container></section></>;
}
