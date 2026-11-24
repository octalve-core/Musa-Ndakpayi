import type {Metadata} from 'next';
import Link from 'next/link';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';

export const metadata:Metadata={title:'Membership Terms & Conditions'};
export default function Terms(){
 return <><PageHero label="Campaign membership" title="Terms & Conditions" description="Clear participation terms for voluntary membership in the Musa Usman Ndakpayi campaign."/>
  <section className="py-16 sm:py-20"><Container className="max-w-[930px] space-y-8 text-sm leading-8 text-slate-700">
   <div><h2 className="text-xl font-semibold text-slate-900">Who may register</h2><p className="mt-3">You must be at least 18 years old. Registration is voluntary and intended for people who wish to become members of the Musa Usman Ndakpayi campaign in Chanchaga Federal Constituency, Niger State. Membership on this website is not registration to vote, and the website is not operated by INEC.</p></div>
   <div><h2 className="text-xl font-semibold text-slate-900">Your agreement</h2><p className="mt-3">By accepting the required agreement on the registration form, you confirm your adult status, voluntarily request campaign membership, and explicitly consent to the campaign team processing your name, phone number, ward, polling unit and campaign affiliation for the membership register. This affiliation is sensitive personal data. Read the <Link href="/privacy" className="font-semibold text-[#073f86] underline">Privacy Notice</Link> before agreeing, including the explanation that records are stored in Frankfurt, Germany.</p></div>
   <div><h2 className="text-xl font-semibold text-slate-900">Assisted registration</h2><p className="mt-3">If you complete a form for somebody else, you confirm that the person is an adult, explicitly authorised you to register them, and consented to the submission of their membership information. You must provide your name as the assisting person. Do not register anyone without their permission.</p></div>
   <div><h2 className="text-xl font-semibold text-slate-900">Accuracy and respectful participation</h2><p className="mt-3">Provide accurate contact and location details. Do not submit another person’s details without permission, attempt bulk or abusive submissions, or impersonate another member. The campaign may investigate duplicate or abusive registrations and restrict unlawful use of the form.</p></div>
   <div><h2 className="text-xl font-semibold text-slate-900">Campaign announcements</h2><p className="mt-3">This required agreement does not authorise optional promotional calls or messages. Any separate campaign communications programme must obtain its own optional consent before using your phone number for that purpose.</p></div>
   <div><h2 className="text-xl font-semibold text-slate-900">Your data and choices</h2><p className="mt-3">Your information is managed according to the <Link href="/privacy" className="font-semibold text-[#073f86] underline">Privacy Notice</Link>, including the stated retention period and international storage. You may ask to access, correct or delete your personal details or withdraw membership-data consent by contacting <a href="mailto:info@musandakpayi.com" className="font-semibold text-[#073f86] underline">info@musandakpayi.com</a>, subject to applicable legal obligations.</p></div>
  </Container></section></>;
}
