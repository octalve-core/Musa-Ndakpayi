import type {Metadata} from 'next';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {AgendaTabs} from '@/components/agenda/agenda-tabs';
import {legalSources} from '@/lib/content';
import {ArrowUpRight,BookOpenText} from 'lucide-react';
export const metadata:Metadata={title:'Legislative Agenda'};
export default function Manifesto(){
 return <><PageHero title="The legislative agenda" label="Priorities & parliamentary pathways" description="Nine connected priorities and practical legislative pathways for stronger services, reliable water, unity and meaningful progress across Chanchaga."/>
 <section className="py-10 sm:py-14"><Container><AgendaTabs/></Container></section>
 <section className="bg-[#f5f6f7] py-16"><Container><div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]"><div><span className="flex size-12 items-center justify-center rounded-lg bg-white text-[#073f86]"><BookOpenText size={22}/></span><h2 className="mt-5 text-2xl font-semibold text-slate-900">Turning priorities into parliamentary action</h2><p className="mt-3 text-sm leading-7 text-slate-600">Federal representation provides a platform to champion constituency needs through lawmaking, budget scrutiny, committee oversight and collaboration with the agencies and governments responsible for implementation.</p></div>
 <div className="rounded-xl bg-white p-6 sm:p-8"><h3 className="mb-5 text-sm font-semibold text-slate-900">Read more about public institutions</h3><ul className="space-y-4">{legalSources.map(item=><li key={item.url}><a className="inline-flex items-start gap-2 text-sm leading-6 text-[#073f86] hover:underline" target="_blank" rel="noopener noreferrer" href={item.url}>{item.label} <ArrowUpRight className="mt-1 shrink-0" size={15}/></a></li>)}</ul></div></div></Container></section></>;
}
