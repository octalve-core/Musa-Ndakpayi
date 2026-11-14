import Link from 'next/link';
import {ArrowUpRight,MapPin} from 'lucide-react';
import {Container} from '@/components/ui/container';
import {navigation,site} from '@/lib/site';
export function SiteFooter(){
 return <footer className="bg-[#17191d] text-white">
  <Container className="pt-16 pb-8 sm:pt-20">
   <div className="grid gap-12 border-b border-white/15 pb-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_.9fr_1fr]">
    <div className="max-w-xs"><Link href="/" className="inline-flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded bg-[#ffb71b] text-base font-bold text-[#092b53]">MN</span><span className="text-sm font-semibold">NDAKPAYI <span className="text-[#ffb71b]">2027</span></span></Link>
    <p className="mt-5 text-sm leading-7 text-slate-300">Public information on the Chanchaga Federal Constituency candidacy, local priorities and legislative representation.</p></div>
    <div><h2 className="mb-5 text-sm font-semibold">Explore</h2><div className="grid grid-cols-2 gap-x-4 gap-y-3">{navigation.map(item=><Link href={item.href} key={item.href} className="text-sm text-slate-300 hover:text-white">{item.label}</Link>)}</div></div>
    <div><h2 className="mb-5 text-sm font-semibold">Constituency</h2>
     <p className="flex items-start gap-3 text-sm leading-7 text-slate-300"><MapPin className="mt-1 shrink-0" size={17}/>Chanchaga Federal Constituency, Niger State, Nigeria</p>
     <p className="mt-4 text-sm leading-7 text-slate-300">{site.party}</p>
     <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ffb71b]">Contact information <ArrowUpRight size={15}/></Link>
    </div>
   </div>
   <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs text-slate-400"><p>© {new Date().getFullYear()} Ndakpayi campaign information. All rights reserved.</p><div className="flex items-center gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><a href="https://www.octalve.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-white">Developed by <span className="text-[#ffb71b]">Octalve Holding</span></a></div></div>
  </Container>
  <div aria-hidden="true" className="grid h-1.5 grid-cols-4"><span className="bg-[#073f86]"/><span className="bg-[#c92230]"/><span className="bg-[#18a65b]"/><span className="bg-[#ffb71b]"/></div>
 </footer>;
}
