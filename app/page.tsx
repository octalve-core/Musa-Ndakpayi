import Link from 'next/link';
import {ArrowRight,BookOpenText,UsersRound} from 'lucide-react';
import {HeroCarousel} from '@/components/home/hero-carousel';
import {CandidatePhoto} from '@/components/ui/candidate-photo';
import {HomeGalleryPreview} from '@/components/gallery/home-gallery-preview';
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
 <section className="relative z-10 -mt-5 pb-12 sm:-mt-7 sm:pb-16"><Container><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <ActionCard title="The legislative agenda" description="Discover nine priorities and practical legislative pathways for the constituency." icon={BookOpenText} href="/manifesto" accent="#ffb71b"/>
  <ActionCard title="Public statements" description="Follow the latest statements, media coverage and community updates." icon={UsersRound} href="/news" accent="#18a65b"/>
  <ActionCard title="Become a member" description="Join the campaign community through secure online registration." icon={UsersRound} href="/register" accent="#c92230"/>
 </div></Container></section>
 <section className="py-16 sm:py-24"><Container><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
  <div><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#0a5d9c]">The candidate</p>
   <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-.045em] text-slate-900 sm:text-4xl">Meet Musa Usman Ndakpayi.</h2>
   <p className="mt-6 text-base leading-8 text-slate-600">Musa Usman Ndakpayi is the Nigeria Democratic Congress candidate for Chanchaga Federal Constituency in the 2027 House of Representatives election. His journey brings together education, practical management and service to communities.</p>
   <p className="mt-4 text-base leading-8 text-slate-600">A Political Science graduate of the University of Abuja, he brings experience in construction-site management, team coordination and enterprise initiatives that support students, graduates and disadvantaged people.</p>
   <p className="mt-4 text-base leading-8 text-slate-600">He places particular importance on youth participation, economic opportunity, education, healthcare, reliable water supply, unity across communities and public accountability.</p>
   <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#073f86]">Read his public profile <ArrowRight size={18}/></Link>
  </div>
  <CandidatePhoto className="min-h-[410px] sm:min-h-[500px]"/>
 </div></Container></section>
 <section className="bg-[#f5f6f7] py-20 sm:py-24"><Container>
  <SectionHeading eyebrow="The work ahead" title="Issues that deserve practical answers." description="Nine connected priorities for stronger public services, reliable water, community inclusion and accountable representation in Chanchaga." action={<ButtonLink href="/platforms" variant="outline" showArrow>All priorities</ButtonLink>}/>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
   {priorities.slice(0,3).map(p=><PolicyCard key={p.slug} title={p.title} summary={p.summary} number={p.number} icon={p.icon} color={p.color} href={'/platforms#'+p.slug}/>)}
  </div>
 </Container></section>
 <AccountabilityBand/>
 <section className="py-20 sm:py-24"><Container>
  <SectionHeading eyebrow="Latest news" title="News and community updates." description="Follow news, public statements and community engagement across Chanchaga." action={<ButtonLink href="/news" variant="outline" showArrow>All updates</ButtonLink>}/>
  <div className="grid gap-6 md:grid-cols-3">{publicRecord.map(item=><EditorialCard key={item.href} {...item}/>)}</div>
 </Container></section>
 <section className="bg-[#f5f6f7] py-20 sm:py-24"><Container><div className="grid items-center gap-10 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-[1fr_auto] sm:p-12">
  <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#d58b00]">Legislative priorities</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">From local concerns to legislative action.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">The agenda outlines practical priorities for legislation, budget oversight, public accountability and cooperation with the institutions that deliver services to our communities.</p></div>
  <ButtonLink href="/manifesto" showArrow>Read the agenda</ButtonLink>
 </div></Container></section>
 <section className="py-16 sm:py-20"><Container><div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12"><HomeGalleryPreview/><div><p className="text-xs font-semibold uppercase tracking-[.19em] text-[#0a5d9c]">Our constituency</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Chanchaga in pictures.</h2><p className="mt-5 text-sm leading-8 text-slate-600">Explore the places and stories that shape Chanchaga, beginning with Minna and its important landmarks.</p><ButtonLink href="/gallery" variant="outline" showArrow className="mt-7">View gallery</ButtonLink></div></div></Container></section>
 <section className="bg-[#073f86] py-20 text-white sm:py-24"><Container className="text-center"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#ffd05c]">Public participation</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Representation begins with listening.</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-100">Explore the published issues, follow updates and learn more about opportunities for public dialogue across Chanchaga.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><ButtonLink href="/events" variant="gold" showArrow>Events & dialogue</ButtonLink><ButtonLink href="/contact" variant="light">Contact information</ButtonLink><ButtonLink href="/register" variant="light">Become a member</ButtonLink></div></Container></section>
 </>;
}
