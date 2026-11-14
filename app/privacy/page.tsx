import type {Metadata} from 'next';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
export const metadata:Metadata={title:'Privacy Information'};
export default function Privacy(){
 return <><PageHero title="Privacy information" label="Your information matters" description="How this initial public-information website handles visitor information."/>
 <section className="py-16 sm:py-20"><Container className="max-w-[900px] space-y-8 text-sm leading-8 text-slate-700">
  <div><h2 className="text-xl font-semibold text-slate-900">Information collection</h2><p className="mt-2">The current website does not provide a registration, donation, newsletter subscription, enquiry submission or member database. Information entered into local search fields stays in the visitor’s browser and is not submitted to the website server.</p></div>
  <div><h2 className="text-xl font-semibold text-slate-900">Technical services</h2><p className="mt-2">The hosting service may process standard request and security logs such as the IP address, time and requested page. The photo of Minna City Gate is loaded from Wikimedia’s servers, which may receive ordinary browser request information.</p></div>
  <div><h2 className="text-xl font-semibold text-slate-900">Future interactive services</h2><p className="mt-2">If the site later adds member registration, event sign-ups, enquiry forms or analytics, their privacy notices and controls should be reviewed and updated before activation.</p></div>
  <p className="rounded-xl bg-[#f5f6f7] p-5 text-slate-600">This notice applies only to the initial information-only release. It should be replaced with the campaign’s approved data-controller notice before collecting personal data.</p>
 </Container></section></>;
}
