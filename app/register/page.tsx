import type {Metadata} from 'next';
import {ShieldCheck,MapPin,Mail} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {MemberForm} from '@/components/members/member-form';
import {registrationReady} from '@/lib/member-registration';
import {databaseReady} from '@/lib/db';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Become a Member',robots:{index:false,follow:false}};
export default async function Register(){
 const open=registrationReady()&&await databaseReady();
 return <><PageHero label="Join the campaign" title="Become a member" description="Be part of the Chanchaga campaign community. Register your details in a few clear steps."/>
  <section className="py-14 sm:py-20"><Container>
   <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_315px] lg:gap-12">
    {open?<MemberForm siteKey={process.env.TURNSTILE_SITE_KEY||''}/>:
     <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12"><h2 className="text-2xl font-semibold text-slate-900">Membership registration</h2><p className="mt-4 text-sm leading-8 text-slate-600">Online registration is not currently open. You can contact the campaign team for membership enquiries and updates.</p><a href="mailto:info@musandakpayi.com" className="mt-7 inline-flex min-h-12 items-center rounded-md bg-[#073f86] px-6 text-sm font-semibold text-white">Contact the team</a></div>}
    <aside className="space-y-5">
     <div className="rounded-2xl bg-[#edf4fb] p-7"><MapPin size={26} className="text-[#073f86]"/><h2 className="mt-5 text-lg font-semibold text-[#0d355e]">Chanchaga constituency</h2><p className="mt-3 text-sm leading-7 text-[#315c83]">Choose your ward and polling unit in Chanchaga Local Government Area, Niger State. The directory covers all 11 wards.</p><a className="mt-4 inline-block text-sm font-medium text-[#073f86] underline" href="https://inecnigeria.org/polling-units/" target="_blank" rel="noopener noreferrer">Find your polling unit</a></div>
     <div className="rounded-2xl border border-slate-200 bg-white p-7"><ShieldCheck size={24} className="text-[#12804b]"/><h2 className="mt-4 text-lg font-semibold text-slate-900">Membership is voluntary</h2><p className="mt-3 text-sm leading-7 text-slate-600">Only adults may register. Your political affiliation is sensitive personal information, and your consent is required before we process your details.</p></div>
     <div className="rounded-2xl border border-slate-200 bg-white p-7"><Mail size={23} className="text-[#073f86]"/><h2 className="mt-4 text-lg font-semibold text-slate-900">Questions?</h2><a href="mailto:info@musandakpayi.com" className="mt-3 block break-all text-sm font-medium text-[#073f86] underline">info@musandakpayi.com</a><p className="mt-4 text-xs leading-6 text-slate-500">Campaign membership is separate from INEC voter registration.</p></div>
    </aside>
   </div>
  </Container></section></>;
}
