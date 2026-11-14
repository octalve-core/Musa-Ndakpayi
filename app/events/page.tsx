import type {Metadata} from 'next';
import Link from 'next/link';
import {CalendarDays,ArrowRight,MapPin} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
export const metadata:Metadata={title:'Events'};
export default function Events(){
 return <><PageHero title="Events & public dialogue" label="Community calendar" description="Public conversations, constituency meetings and announcements."/>
 <section className="py-16 sm:py-20"><Container>
  <div className="flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-[#073f86] px-5 py-2 font-semibold text-white">Upcoming</span><span className="rounded-full bg-[#f4f5f7] px-5 py-2 text-slate-600">Previous activities</span></div>
  <div className="mt-7 rounded-2xl bg-[#f5f6f7] p-8 sm:p-12"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
   <div><span className="flex size-12 items-center justify-center rounded-xl bg-white text-[#073f86]"><CalendarDays size={24}/></span><h2 className="mt-5 text-2xl font-semibold text-slate-900">No forthcoming events announced</h2><p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">Dates, venues and public access details will be published when they have been confirmed by the organisers.</p></div>
   <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-[#073f86]">View public updates <ArrowRight size={17}/></Link>
  </div></div>
  <p className="mt-8 flex items-center gap-2 text-sm text-slate-500"><MapPin size={17}/>Chanchaga Federal Constituency · Niger State</p>
 </Container></section></>;
}
