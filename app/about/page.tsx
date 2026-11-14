import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight,ArrowUpRight,BookOpenText,ExternalLink,GraduationCap,HeartHandshake,Info} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {ConstituencyPhoto} from '@/components/ui/constituency-photo';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {PolicyCard} from '@/components/ui/policy-card';
import {biographyHighlights,biographicalRecord,professionalSkills} from '@/lib/profile';
import {priorities} from '@/lib/content';
import {site} from '@/lib/site';

export const metadata:Metadata={
 title:'About Usman Musa Ndakpayi',
 description:'Explore the supplied education, professional background and community-engagement profile of Usman Musa Ndakpayi, 2027 Chanchaga House of Representatives candidate.'
};

const accentStyle={
 blue:'border-[#073f86] bg-[#edf4fc] text-[#073f86]',
 gold:'border-[#ffb71b] bg-[#fff7e5] text-[#846000]',
 green:'border-[#18a65b] bg-[#eaf8f0] text-[#12673b]'
} as const;

export default function About(){
 return <>
  <PageHero label="The candidate · Background and public record" title="About Usman Musa Ndakpayi" description="Political science, practical project management and community initiatives — the background described in his supplied professional biography."/>

  <section aria-labelledby="profile-introduction" className="py-16 sm:py-24"><Container>
   <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-16">
    <div>
     <p className="text-xs font-semibold uppercase tracking-[.19em] text-[#073f86]">Personal and professional background</p>
     <h2 id="profile-introduction" className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-.04em] text-slate-900 sm:text-4xl lg:text-[2.6rem]">An experience spanning political study, project work and community engagement.</h2>
     <p className="mt-6 text-base leading-8 text-slate-600">Usman Musa Ndakpayi is listed by the Independent National Electoral Commission as the Nigeria Democratic Congress candidate for Chanchaga Federal Constituency in the 2027 House of Representatives election.</p>
     <p className="mt-4 text-base leading-8 text-slate-600">The professional biography supplied for this website describes his study of Political Science at the University of Abuja, including academic work on peace and conflict resolution using the Kaduna crisis as a case study.</p>
     <p className="mt-4 text-base leading-8 text-slate-600">It also records experience in construction-site management, enterprise-support activities and public communication. These provide context for his professional interests and participation in public life, not claims of previous legislative office or completed government programmes.</p>
     <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
      <a href={site.source} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#073f86] hover:underline">Official INEC candidate record <ExternalLink size={16} aria-hidden="true"/></a>
      <Link href="#education-and-experience" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#073f86] hover:underline">Explore his background <ArrowRight size={16} aria-hidden="true"/></Link>
     </div>
    </div>
    <ConstituencyPhoto className="min-h-[420px] sm:min-h-[520px]"/>
   </div>
  </Container></section>

  <section className="bg-[#f7f9fb] py-16 sm:py-20"><Container>
   <SectionHeading eyebrow="Professional foundations" title="Three areas of experience." description="A concise view of the academic, professional and community activities described in the supplied biography."/>
   <div className="grid gap-5 md:grid-cols-3">
    {biographyHighlights.map(item=><article key={item.title} className="min-w-0 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_6px_22px_rgba(5,24,52,.04)] sm:p-7">
     <span className={['flex size-12 items-center justify-center rounded-lg border-t-[3px]',accentStyle[item.accent]].join(' ')}><item.icon size={23} strokeWidth={1.8} aria-hidden="true"/></span>
     <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
     <p className="mt-2 text-xs font-medium uppercase leading-5 tracking-[.08em] text-[#073f86]">{item.subtitle}</p>
     <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
    </article>)}
   </div>
  </Container></section>

  <section id="education-and-experience" aria-labelledby="education-heading" className="scroll-mt-28 py-16 sm:py-24"><Container>
   <div className="grid gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:gap-20">
    <div>
     <p className="text-xs font-semibold uppercase tracking-[.19em] text-[#073f86]">Education & career</p>
     <h2 id="education-heading" className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">A background in learning and practical work.</h2>
     <p className="mt-5 text-sm leading-8 text-slate-600">The entries below follow the submitted biographical document. Where a role or programme has no clear date, none has been assigned.</p>
     <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#edf4fc] p-5 text-sm leading-7 text-[#284e78]">
      <GraduationCap className="mt-1 shrink-0" size={20} aria-hidden="true"/>
      <p>The profile also lists a National Youth Service Corps certificate and computer training through a Niger State Government youth employment scheme.</p>
     </div>
    </div>
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
     {biographicalRecord.map((item,index)=><article key={item.title} className="grid gap-3 p-6 sm:grid-cols-[48px_1fr] sm:gap-5 sm:p-8">
      <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-lg bg-[#eef4fb] text-sm font-medium tabular-nums text-[#073f86]">{String(index+1).padStart(2,'0')}</span>
      <div className="min-w-0">
       <p className="text-xs font-medium uppercase tracking-[.16em] text-[#0a5d9c]">{item.label}</p>
       <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
       <p className="mt-1 text-sm font-medium text-slate-700">{item.context}</p>
       <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
      </div>
     </article>)}
    </div>
   </div>
  </Container></section>

  <section className="bg-[#f7f9fb] py-16 sm:py-20"><Container>
   <SectionHeading eyebrow="Working approach" title="Management, communication and collaboration." description="Professional capabilities emphasised in the submitted profile."/>
   <div className="grid gap-5 md:grid-cols-3">
    {professionalSkills.map((skill,index)=><article key={skill.title} className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
     <p className="text-xs font-medium tabular-nums text-[#0a5d9c]">0{index+1}</p>
     <h3 className="mt-5 text-lg font-semibold text-slate-900">{skill.title}</h3>
     <p className="mt-3 text-sm leading-7 text-slate-600">{skill.description}</p>
    </article>)}
   </div>
  </Container></section>

  <section aria-labelledby="community-heading" className="py-16 sm:py-20"><Container>
   <div className="grid gap-6 lg:grid-cols-2">
    <article className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
     <span className="flex size-12 items-center justify-center rounded-xl bg-[#eaf8f0] text-[#12673b]"><HeartHandshake size={23} aria-hidden="true"/></span>
     <h2 id="community-heading" className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">Community initiatives and voluntary interests</h2>
     <p className="mt-4 text-sm leading-8 text-slate-600">The biography describes enterprise-oriented activities for students, graduates and people with limited opportunities. It also mentions voluntary involvement in fundraising, clothing support for homeless children and empowerment programmes. These are descriptions from the supplied profile; specific programmes and outcomes have not been independently verified.</p>
    </article>
    <article className="rounded-2xl border border-slate-200 bg-[#073f86] p-7 text-white sm:p-9">
     <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-[#ffce51]"><BookOpenText size={23} aria-hidden="true"/></span>
     <h2 className="mt-6 text-2xl font-semibold tracking-tight">Interests beyond professional life</h2>
     <p className="mt-4 text-sm leading-8 text-blue-100">His submitted profile mentions reading, travel, swimming, polo and regular exercise. It also expresses an interest in learning Yoruba, Igbo, French and Arabic; it does not claim proficiency in these languages.</p>
    </article>
   </div>
  </Container></section>

  <section className="bg-[#f7f9fb] py-16 sm:py-20"><Container>
   <SectionHeading eyebrow="Public engagement" title="Issues in the public record." description="His personal biography is distinct from policy reporting. The subjects below arise from published accounts, with legislative options clearly identified as proposals."/>
   <div className="grid gap-5 md:grid-cols-3">
    {priorities.slice(0,3).map(priority=><PolicyCard key={priority.slug} title={priority.title} summary={priority.summary} icon={priority.icon} color={priority.color} href={'/platforms#'+priority.slug}/>)}
   </div>
   <div className="mt-9 flex flex-wrap gap-3">
    <Link href="/news" className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#073f86] px-5 py-3 text-sm font-medium text-[#073f86] hover:bg-[#edf4fc]">Read source-linked reporting <ArrowUpRight size={16}/></Link>
    <Link href="/manifesto" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#073f86] px-5 py-3 text-sm font-medium text-white hover:bg-[#062f64]">Explore possible legislative approaches <ArrowRight size={16}/></Link>
   </div>
   <div className="mt-10 flex items-start gap-3 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-600">
    <Info className="mt-0.5 shrink-0 text-[#073f86]" size={18} aria-hidden="true"/>
    <p>Biography, education, career history and personal interests are drawn from the professional document supplied for this website and await supporting verification. The candidacy and party are recorded by INEC. Proposed parliamentary approaches are not presented as policies already enacted.</p>
   </div>
  </Container></section>
 </>;
}
