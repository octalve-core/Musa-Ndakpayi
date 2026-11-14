'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {Menu,X} from 'lucide-react';
import {navigation} from '@/lib/site';
import {Container} from '@/components/ui/container';
export function SiteHeader(){
 const pathname=usePathname();const [open,setOpen]=useState(false);
 return <><a href="#main-content" className="sr-only z-[90] rounded bg-white p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
 <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
  <Container className="flex h-20 items-center justify-between gap-5">
   <Link href="/" onClick={()=>setOpen(false)} aria-label="Usman Musa Ndakpayi — home" className="inline-flex shrink-0 items-center gap-2.5">
    <span className="flex size-10 items-center justify-center rounded-md bg-[#073f86] text-[14px] font-bold tracking-tight text-white">MN</span>
    <span className="flex flex-col leading-tight"><span className="text-sm font-semibold tracking-[-.025em] text-slate-900">NDAKPAYI</span><span className="text-[10px] font-semibold tracking-[.22em] text-[#073f86]">2027 · CHANCHAGA</span></span>
   </Link>
   <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
    {navigation.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined} className={['text-[13px] font-medium transition hover:text-[#073f86]',pathname===item.href?'text-[#073f86]':'text-slate-800'].join(' ')}>{item.label}</Link>)}
   </nav>
   <div className="ml-auto flex items-center gap-3 lg:ml-0">
    <Link href="/contact" className="hidden min-h-11 items-center rounded-md bg-[#073f86] px-6 text-sm font-semibold text-white transition hover:bg-[#062f64] sm:inline-flex">Get in touch</Link>
    <button type="button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)} className="flex size-11 items-center justify-center rounded-md border border-slate-200 text-[#073f86] lg:hidden">{open?<X size={22}/>:<Menu size={22}/>}</button>
   </div>
  </Container>
  <div id="mobile-navigation" hidden={!open} className="border-t border-slate-100 bg-white lg:hidden">
   <Container><nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-2 py-4">
    {navigation.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)} className={['rounded-md px-4 py-3 text-sm',pathname===item.href?'bg-[#e9f2ff] font-semibold text-[#073f86]':'text-slate-700 hover:bg-slate-50'].join(' ')}>{item.label}</Link>)}
    <Link href="/contact" onClick={()=>setOpen(false)} className="col-span-2 mt-1 flex items-center justify-center rounded-md bg-[#073f86] p-3 text-sm font-semibold text-white">Contact the team</Link>
   </nav></Container>
  </div>
 </header></>;
}
