import type {Metadata} from 'next';
import Link from 'next/link';
import {Camera,ArrowUpRight,ShieldCheck} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {ConstituencyPhoto} from '@/components/ui/constituency-photo';

export const metadata:Metadata={title:'Gallery'};
export default function Gallery(){
 return <><PageHero title="Constituency gallery" label="People & place" description="An accurately credited visual record of Chanchaga, Minna and public activities."/>
  <section className="py-16 sm:py-20"><Container>
   <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[.18em] text-[#073f86]">Available imagery</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Minna & the constituency</h2></div><span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600">1 credited photograph</span></div>
   <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
    <ConstituencyPhoto className="min-h-[420px] sm:min-h-[480px]"/>
    <aside className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-[#f7f9fb] p-7 sm:p-10">
     <span className="flex size-12 items-center justify-center rounded-xl bg-white text-[#073f86]"><Camera size={24}/></span>
     <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">An archive built on authentic records.</h3>
     <p className="mt-4 text-sm leading-8 text-slate-600">Official photographs of constituency meetings and public events will be displayed when the campaign supplies approved images, dates and captions. No illustrative photographs are presented as evidence of an event.</p>
     <p className="mt-5 flex items-start gap-3 text-sm leading-7 text-slate-700"><ShieldCheck className="mt-1 shrink-0 text-[#13864b]" size={18}/>Captions, permissions and sources are checked before publication.</p>
     <Link href="/news" className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-[#073f86] hover:underline">View documented public updates <ArrowUpRight size={17}/></Link>
    </aside>
   </div>
  </Container></section>
 </>;
}
