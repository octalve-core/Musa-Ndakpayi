import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight,MapPin} from 'lucide-react';
import {Container} from '@/components/ui/container';
import {navigation,site} from '@/lib/site';

export function SiteFooter(){
 return <footer className="bg-[#17191d] text-white">
  <Container className="pb-8 pt-16 sm:pt-20">
   <div className="grid gap-11 border-b border-white/15 pb-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
    <div className="max-w-sm">
     <Link href="/" aria-label="Musa Usman Ndakpayi 2027 — home" className="inline-flex h-11 w-[183px] items-center justify-start rounded-md"><Image src="/brand/mun-footer-2027.png" alt="Musa Usman Ndakpayi 2027 campaign logo" width={1066} height={180} sizes="183px" className="h-full w-full object-contain object-left"/></Link>
     <p className="mt-5 text-sm leading-7 text-slate-300">Musa Usman Ndakpayi · Chanchaga Federal Constituency, 2027. A commitment to opportunity, meaningful representation and community progress.</p>
    </div>
    <div><h2 className="mb-5 text-sm font-semibold text-white">Explore the website</h2><nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-3">{navigation.map(item=><Link href={item.href} key={item.href} className="w-fit rounded-sm py-1 text-sm text-slate-300 transition-colors hover:text-white">{item.label}</Link>)}</nav></div>
    <div><h2 className="mb-5 text-sm font-semibold text-white">Constituency information</h2>
     <p className="flex items-start gap-3 text-sm leading-7 text-slate-300"><MapPin className="mt-1 shrink-0 text-[#ffb71b]" size={18}/>{site.constituency}, {site.location}</p>
     <p className="mt-4 text-sm leading-7 text-slate-300">{site.party}</p>
     <a href="mailto:info@musandakpayi.com" className="mt-5 inline-flex min-h-11 items-center gap-2 break-all text-sm font-medium text-[#ffcc55] transition-colors hover:text-white">info@musandakpayi.com <ArrowUpRight size={16}/></a>
    </div>
   </div>
   <div className="flex flex-col items-start justify-between gap-4 pt-7 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center">
    <p>© {new Date().getFullYear()} Ndakpayi campaign information. All rights reserved.</p>
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2"><Link href="/privacy" className="hover:text-white">Privacy information</Link><a href="https://www.octalve.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-white">Developed by <span className="text-[#ffcc55]">Octalve Holding</span></a></div>
   </div>
  </Container>
  <div aria-hidden="true" className="grid h-1.5 grid-cols-4"><span className="bg-[#073f86]"/><span className="bg-[#c92230]"/><span className="bg-[#18a65b]"/><span className="bg-[#ffb71b]"/></div>
 </footer>;
}
