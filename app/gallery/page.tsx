import type {Metadata} from 'next';
import Link from 'next/link';
import {Camera,ExternalLink} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
export const metadata:Metadata={title:'Gallery'};
export default function Gallery(){
 return <><PageHero title="Constituency gallery" label="People & place" description="A visual archive of Chanchaga and officially documented public activities."/>
 <section className="py-16 sm:py-20"><Container><h2 className="mb-6 text-2xl font-semibold text-slate-900">Chanchaga · Minna</h2>
 <div className="grid items-stretch gap-6 md:grid-cols-[1.2fr_1fr]">
  <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"><div className="h-[420px] bg-cover bg-center" role="img" aria-label="Minna city gate, Niger State" style={{backgroundImage:'url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Minna%2C_Niger_state_City_gate.jpg/960px-Minna%2C_Niger_state_City_gate.jpg)'}}/><figcaption className="p-5 text-xs leading-6 text-slate-600">Minna City Gate · Photograph by F5pillar, <a className="text-[#073f86] underline" href="https://commons.wikimedia.org/wiki/File:Minna,_Niger_state_City_gate.jpg" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0 <ExternalLink className="inline" size={12}/></a>. Cropped to fit the website layout.</figcaption></figure>
  <div className="flex flex-col justify-center rounded-2xl bg-[#f5f6f7] p-8 sm:p-12"><span className="flex size-14 items-center justify-center rounded-xl bg-white text-[#073f86]"><Camera size={26}/></span><h3 className="mt-7 text-2xl font-semibold text-slate-900">The public gallery</h3><p className="mt-4 text-sm leading-8 text-slate-600">Photographs from public meetings and campaign events will be published here with accurate dates, captions and permission to use them.</p><Link href="/news" className="mt-7 text-sm font-semibold text-[#073f86]">Read the latest public record</Link></div>
 </div></Container></section></>;
}
