import type {Metadata} from 'next';
import Link from 'next/link';
import {ExternalLink,ArrowRight} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {PolicyCard} from '@/components/ui/policy-card';
import {priorities} from '@/lib/content';
import {site} from '@/lib/site';
export const metadata:Metadata={title:'About Usman Musa Ndakpayi'};
export default function About(){
 return <><PageHero label="Meet the candidate" title="About Usman Musa Ndakpayi" description="Chanchaga Federal Constituency · Niger State · House of Representatives, 2027"/>
 <section className="py-20 sm:py-24"><Container><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
  <div className="relative min-h-[460px] overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#0b5b95,#052d5d)] p-8 text-white sm:p-12">
   <div aria-hidden className="absolute -right-36 -top-36 size-[500px] rounded-full border-[90px] border-white/10"/>
   <div className="relative flex h-full flex-col justify-between"><span className="text-xs font-semibold uppercase tracking-[.2em] text-blue-100">2027 · NDC</span><div className="mt-32"><span className="text-6xl font-semibold tracking-[-.08em] sm:text-7xl">MN.</span><p className="mt-7 text-2xl font-semibold leading-tight">Chanchaga Federal Constituency</p><p className="mt-2 text-sm text-blue-100">Niger State · Nigeria</p></div></div>
  </div>
  <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#0a5d9c]">Public profile</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">A candidacy in the public record.</h2>
   <p className="mt-6 text-base leading-8 text-slate-600">Usman Musa Ndakpayi is named on INEC’s final list of candidates as the Nigeria Democratic Congress candidate seeking to represent Chanchaga in the House of Representatives in 2027.</p>
   <p className="mt-5 text-base leading-8 text-slate-600">Reporting from 2026 includes engagements with youth organisations and statements on employment, education, scholarships, healthcare accessibility and the need for independent investigation of reported custodial deaths of miners in Minna.</p>
   <p className="mt-5 text-base leading-8 text-slate-600">The role being sought is a federal legislative one. Its principal functions include lawmaking, budget approval, oversight and constituency representation. Delivery of state or municipal services requires the responsible agencies and governments.</p>
   <a href={site.source} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#073f86]">View INEC candidate record <ExternalLink size={16}/></a>
  </div>
 </div></Container></section>
 <section className="bg-[#f5f6f7] py-20 sm:py-24"><Container>
  <SectionHeading title="Publicly documented areas of interest" description="Themes reported from the candidate’s public engagement and media briefing, with detailed legislative possibilities on the priorities page." center/>
  <div className="grid gap-6 md:grid-cols-3">{priorities.slice(0,6).map(p=><PolicyCard title={p.title} summary={p.summary} icon={p.icon} color={p.color} href={'/platforms#'+p.slug} key={p.slug}/>)}</div>
 </Container></section>
 <section className="py-20"><Container><div className="flex flex-col gap-8 rounded-2xl bg-[#073f86] p-9 text-white sm:flex-row sm:items-center sm:justify-between sm:p-12"><div><h2 className="text-2xl font-semibold sm:text-3xl">Understand the legislative agenda</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">Explore practical pathways within the powers of a federal representative, with the evidence behind each issue.</p></div><Link href="/manifesto" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#ffb71b] px-6 py-3 text-sm font-semibold text-[#102a48]">Read the agenda <ArrowRight size={17}/></Link></div></Container></section></>;
}
