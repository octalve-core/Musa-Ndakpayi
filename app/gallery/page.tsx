import type {Metadata} from 'next';
import Link from 'next/link';
import {Camera,ArrowUpRight} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {ConstituencyPhoto} from '@/components/ui/constituency-photo';

export const metadata:Metadata={title:'Gallery'};
export default function Gallery(){
 return <><PageHero title="Constituency gallery" label="People & place" description="Discover the places, landscapes and community moments that make Chanchaga home."/>
  <section className="py-16 sm:py-20"><Container>
   <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[.18em] text-[#073f86]">Available imagery</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Minna & the constituency</h2></div></div>
   <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
    <ConstituencyPhoto className="min-h-[420px] sm:min-h-[480px]"/>
    <aside className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-[#f7f9fb] p-7 sm:p-10">
     <span className="flex size-12 items-center justify-center rounded-xl bg-white text-[#073f86]"><Camera size={24}/></span>
     <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">Chanchaga, through the lens.</h3>
     <p className="mt-4 text-sm leading-8 text-slate-600">Explore the landmarks and shared spaces of Minna and Chanchaga. Our gallery celebrates the places, people and community experiences that give the constituency its unique character.</p>
     <Link href="/news" className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-[#073f86] hover:underline">See the latest news <ArrowUpRight size={17}/></Link>
    </aside>
   </div>
  </Container></section>
 </>;
}
