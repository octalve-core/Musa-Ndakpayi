import type {Metadata} from 'next';
import Link from 'next/link';
import {MapPin,Mail} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
export const metadata:Metadata={title:'Contact'};
export default function Contact(){
 return <><PageHero title="Get in touch" label="Constituency enquiries" description="Reach the campaign team for constituency enquiries, community engagement, media correspondence and public events."/>
 <section className="py-16 sm:py-20"><Container><div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
  <div><h2 className="text-2xl font-semibold text-slate-900">Connect with the campaign</h2><p className="mt-4 max-w-md text-sm leading-8 text-slate-600">We welcome enquiries about the campaign, constituency priorities, community dialogue and media engagement. Contact the team by email.</p><a href="mailto:info@musandakpayi.com" className="mt-7 inline-flex min-h-12 items-center gap-3 break-all text-base font-medium text-[#073f86] hover:underline"><Mail className="shrink-0" size={20}/>info@musandakpayi.com</a><div className="mt-6 flex items-start gap-3 text-sm leading-7 text-slate-700"><MapPin className="mt-1 shrink-0 text-[#073f86]" size={19}/>Chanchaga Federal Constituency, Niger State, Nigeria</div></div>
  <div className="rounded-2xl bg-[#f5f6f7] p-8 sm:p-11"><span className="flex size-12 items-center justify-center rounded-lg bg-white text-[#073f86]"><Mail size={23}/></span><h3 className="mt-5 text-xl font-semibold">Let’s stay connected</h3><p className="mt-4 text-sm leading-8 text-slate-600">Have a question, media enquiry or suggestion? Send an email to the campaign team, or explore our latest updates and public events.</p><div className="mt-7 flex flex-wrap gap-3"><a href="mailto:info@musandakpayi.com" className="inline-flex min-h-11 items-center rounded-md bg-[#073f86] px-5 py-3 text-sm font-semibold text-white">Send an email</a><Link href="/events" className="rounded-md bg-[#073f86] px-5 py-3 text-sm font-semibold text-white">Public events</Link><Link href="/news" className="rounded-md border border-[#073f86] px-5 py-3 text-sm font-semibold text-[#073f86]">Public updates</Link></div></div>
 </div></Container></section></>;
}
