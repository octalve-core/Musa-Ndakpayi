import Link from 'next/link';
import {ArrowRight,BookOpenText,UsersRound,ShieldCheck} from 'lucide-react';
import {HeroCarousel} from '@/components/home/hero-carousel';
import {AccountabilityBand} from '@/components/home/accountability-band';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {ActionCard} from '@/components/ui/action-card';
import {ButtonLink} from '@/components/ui/button-link';
import {PolicyCard} from '@/components/ui/policy-card';
import {EditorialCard} from '@/components/ui/editorial-card';
import {priorities,publicRecord} from '@/lib/content';

export default function HomePage(){
 return <>
 <HeroCarousel/>
 <section className="relative z-10 -mt-6 pb-16 sm:-mt-8"><Container><div className="grid gap-4 sm:grid-cols-2">
  <ActionCard title="The legislative agenda" description="Explore the issues, possible actions and relevant responsibilities." icon={BookOpenText} href="/manifesto" accent="#ffb71b"/>
  <ActionCard title="Public statements" description="Read reported positions and linked source material." icon={UsersRound} href="/news" accent="#18a65b"/>
 </div></Container></section>
 <section className="py-16 sm:py-24"><Container><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
  <div><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#0a5d9c]">The candidate</p>
   <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-.045em] text-slate-900 sm:text-4xl">Meet Usman Musa Ndakpayi.</h2>
   <p className="mt-6 text-base leading-8 text-slate-600">Usman Musa Ndakpayi is listed by the Independent National Electoral Commission as the Nigeria Democratic Congress candidate for Chanchaga Federal Constituency in the 2027 House of Representatives election.</p>
   <p className="mt-4 text-base leading-8 text-slate-600">Public reporting records his attention to youth participation, economic opportunity, education, healthcare and transparent investigation of reported deaths in security custody.</p>
   <div className="mt-6 flex items-start gap-3 text-sm text-slate-700"><ShieldCheck className="mt-0.5 shrink-0 text-[#18a65b]" size={20}/><span>Documented candidature on INEC’s final list</span></div>
   <div className="mt-4 flex items-start gap-3 text-sm text-slate-700"><ShieldCheck className="mt-0.5 shrink-0 text-[#18a65b]" size={20}/><span>Public statements linked to their original reports</span></div>
   <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#073f86]">Read his public profile <ArrowRight size={18}/></Link>
  </div>
  <div className="relative min-h-[410px] overflow-hidden rounded-2xl bg-[linear-gradient(155deg,#0c65a1,#063268)] p-7 text-white sm:min-h-[500px] sm:p-11">
   <div aria-hidden="true" className="absolute -right-24 -top-28 size-96 rounded-full border-[70px] border-white/10"/>
   <div aria-hidden="true" className="absolute -bottom-24 -left-24 size-[420px] rounded-full border-[85px] border-[#ffb71b]/20"/>
   <div className="relative z-10 flex h-full flex-col justify-between"><div><p className="text-xs uppercase tracking-[.23em] text-blue-100">CHANCHAGA · NIGER STATE</p><p className="mt-7 max-w-md text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-.045em]">USMAN MUSA<br/>NDAKPAYI</p></div><div className="mt-40 flex items-end justify-between gap-4 border-t border-white/25 pt-5"><div><p className="text-sm font-semibold">House of Representatives</p><p className="mt-1 text-sm text-blue-100">NDC · 2027</p></div><span className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-medium">Public profile</span></div></div>
  </div>
 </div></Container></section>
 <section className="bg-[#f5f6f7] py-20 sm:py-24"><Container>
  <SectionHeading eyebrow="The work ahead" title="Issues that deserve practical answers." description="Seven connected priorities drawn from documented public positions and independently reported constituency challenges." action={<ButtonLink href="/platforms" variant="outline" showArrow>All priorities</ButtonLink>}/>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
   {priorities.slice(0,3).map(p=><PolicyCard key={p.slug} title={p.title} summary={p.summary} number={p.number} icon={p.icon} color={p.color} href={'/platforms#'+p.slug}/>)}
  </div>
 </Container></section>
 <AccountabilityBand/>
 <section className="py-20 sm:py-24"><Container>
  <SectionHeading eyebrow="In the public record" title="Statements and community updates." description="A concise record of published reporting, linked to the source so each account can be assessed in context." action={<ButtonLink href="/news" variant="outline" showArrow>All updates</ButtonLink>}/>
  <div className="grid gap-6 md:grid-cols-3">{publicRecord.map(item=><EditorialCard key={item.href} {...item}/>)}</div>
 </Container></section>
 <section className="bg-[#f5f6f7] py-20 sm:py-24"><Container><div className="grid items-center gap-10 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-[1fr_auto] sm:p-12">
  <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#d58b00]">Explore the proposed approach</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">From local concerns to legislative action.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">The agenda explains what can be pursued through bills, motions, oversight, appropriations and collaboration with state and local authorities. These are policy options, not completed projects.</p></div>
  <ButtonLink href="/manifesto" showArrow>Read the agenda</ButtonLink>
 </div></Container></section>
 <section className="bg-[#073f86] py-20 text-white sm:py-24"><Container className="text-center"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#ffd05c]">Public participation</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Representation begins with listening.</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-100">Explore the published issues, follow updates and learn more about opportunities for public dialogue across Chanchaga.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><ButtonLink href="/events" variant="gold" showArrow>Events & dialogue</ButtonLink><ButtonLink href="/contact" variant="light">Contact information</ButtonLink></div></Container></section>
 </>;
}
