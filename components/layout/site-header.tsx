'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useRef,useState} from 'react';
import {Menu,X} from 'lucide-react';
import {navigation} from '@/lib/site';
import {Container} from '@/components/ui/container';

export function SiteHeader(){
 const pathname=usePathname();
 const [open,setOpen]=useState(false);
 const toggleRef=useRef<HTMLButtonElement>(null);
 return <>
  <a href="#main-content" className="sr-only z-[90] rounded-md bg-white p-3 text-[#073f86] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
  <header onKeyDown={event=>{if(open&&event.key==='Escape'){setOpen(false);toggleRef.current?.focus();}}} className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_2px_18px_rgba(8,36,77,.04)] backdrop-blur-lg">
   <Container className="flex h-[76px] items-center justify-between gap-4 sm:h-20">
    <Link href="/" onClick={()=>setOpen(false)} aria-label="Usman Musa Ndakpayi — home" className="inline-flex min-w-0 shrink-0 items-center gap-2.5 rounded-md">
     <Image src="/brand/mun-header.png" alt="Musa Usman Ndakpayi campaign logo" width={1420} height={476} priority sizes="144px" className="h-10 w-[144px] object-contain object-left"/>
    </Link>
    <nav aria-label="Primary navigation" className="hidden items-center gap-3 xl:flex 2xl:gap-5">
     {navigation.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined} className={['inline-flex min-h-11 shrink-0 items-center rounded-sm border-b-2 px-1.5 pt-0.5 text-[13px] font-medium transition-colors',pathname===item.href?'border-[#ffb71b] text-[#073f86]':'border-transparent text-slate-700 hover:border-[#ffb71b]/70 hover:text-[#073f86]'].join(' ')}>{item.label}</Link>)}
    </nav>
    <div className="ml-auto flex shrink-0 items-center gap-3 xl:ml-0">
     <Link href="/contact" className="hidden min-h-11 items-center rounded-md bg-[#073f86] px-5 text-sm font-medium text-white transition-colors hover:bg-[#062f64] sm:inline-flex">Get in touch</Link>
     <button ref={toggleRef} type="button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(value=>!value)} className="flex size-11 items-center justify-center rounded-md border border-slate-200 text-[#073f86] transition-colors hover:bg-[#edf4fc] xl:hidden">{open?<X size={21}/>:<Menu size={21}/>}</button>
    </div>
   </Container>
   <div id="mobile-navigation" hidden={!open} className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-slate-100 bg-white shadow-lg xl:hidden">
    <Container><nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-2 py-4 sm:gap-3">
     {navigation.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined} onClick={()=>setOpen(false)} className={['flex min-h-12 items-center rounded-md px-4 py-3 text-sm font-medium transition-colors',pathname===item.href?'bg-[#edf4ff] text-[#073f86]':'text-slate-700 hover:bg-slate-50'].join(' ')}>{item.label}</Link>)}
     <Link href="/contact" onClick={()=>setOpen(false)} className="col-span-2 mt-1 flex min-h-12 items-center justify-center rounded-md bg-[#073f86] px-4 py-3 text-sm font-medium text-white sm:hidden">Contact information</Link>
    </nav></Container>
   </div>
  </header>
 </>;
}
