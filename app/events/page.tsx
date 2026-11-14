import type {Metadata} from 'next';
import Link from 'next/link';
import {CalendarDays,ArrowRight,MapPin} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';

export const metadata:Metadata={title:'Events'};
export default function Events(){
 return <><PageHero title="Events & public dialogue" label="Community calendar" description="Explore community events, public conversations and opportunities to engage with the campaign."/>
  <section className="py-16 sm:py-20"><Container>
   <div className="mb-7 flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-semibold tracking-tight text-slate-900">Campaign activities</h2><span className="inline-flex items-center gap-2 rounded-full bg-[#edf4fb] px-4 py-2 text-xs font-medium text-[#073f86]"><CalendarDays size={16}/>Community engagement</span></div>
   <div className="rounded-2xl border border-slate-200 bg-[#f7f9fb] p-7 sm:p-11">
    <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
     <div className="max-w-2xl"><span className="flex size-12 items-center justify-center rounded-xl bg-white text-[#073f86]"><CalendarDays size={24}/></span><h3 className="mt-5 text-xl font-semibold text-slate-900 sm:text-2xl">Stay connected with our events</h3><p className="mt-3 text-sm leading-7 text-slate-600">Upcoming campaign meetings, community conversations and constituency activities will be shared here. For event enquiries, contact the campaign team at info@musandakpayi.com.</p></div>
     <Link href="/news" className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-md border border-[#073f86] px-5 py-3 text-sm font-medium text-[#073f86] transition-colors hover:bg-[#edf4ff] sm:self-auto">Latest news <ArrowRight size={17}/></Link>
    </div>
   </div>
   <div className="mt-7 flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-center gap-2"><MapPin size={17} className="text-[#073f86]"/>Chanchaga Federal Constituency · Niger State</p><a href="mailto:info@musandakpayi.com" className="inline-flex min-h-11 items-center text-[#073f86] hover:underline">Event enquiries: info@musandakpayi.com</a></div>
  </Container></section>
 </>;
}
