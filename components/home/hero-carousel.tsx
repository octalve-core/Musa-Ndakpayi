'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowRight,ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';
import {Container} from '@/components/ui/container';
const slides=[
 {eyebrow:'CHANCHAGA FEDERAL CONSTITUENCY · 2027',title:'A voice for Chanchaga.',accent:'A responsibility to serve.',description:'Explore the public record, priorities and legislative questions shaping the future of representation.'},
 {eyebrow:'THE WORK OF REPRESENTATION',title:'People. Policy.',accent:'Accountability.',description:'From schools and livelihoods to public safety, every important issue deserves a clear legislative response.'},
 {eyebrow:'NIGER STATE · NIGERIA',title:'Rooted in community.',accent:'Focused on progress.',description:'A public place to follow constituency concerns, published statements and democratic participation.'}
] as const;
export function HeroCarousel(){
 const [active,setActive]=useState(0),[playing,setPlaying]=useState(true);
 useEffect(()=>{if(!playing||typeof window==='undefined'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const id=window.setInterval(()=>setActive(v=>(v+1)%slides.length),7500);
 return()=>window.clearInterval(id);
 },[playing]);
 const slide=slides[active];
 return <section aria-label="Campaign introduction" className="relative isolate flex min-h-[calc(100svh-80px)] items-center overflow-hidden bg-[#063668] text-white">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,#1466a8_0%,#08457b_30%,#082d58_75%)]"/>
  <div aria-hidden="true" className="absolute -right-36 top-[-25%] h-[800px] w-[800px] rounded-full border-[100px] border-[#2370ad]/20"/>
  <div aria-hidden="true" className="absolute bottom-[-38%] left-[40%] h-[760px] w-[760px] rounded-full border-[90px] border-[#ffb71b]/10"/>
  <div className="absolute bottom-0 right-0 top-0 hidden w-[54%] bg-gradient-to-l from-[#092e58]/35 to-transparent lg:block" style={{backgroundImage:'linear-gradient(90deg, #073663 0%, rgba(5,44,90,.55) 45%, rgba(5,35,69,.45) 100%), url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Minna%2C_Niger_state_City_gate.jpg/960px-Minna%2C_Niger_state_City_gate.jpg)',backgroundSize:'cover',backgroundPosition:'center 49%'}}/>
  <div className="absolute inset-0 bg-gradient-to-r from-[#07294e] via-[#073d71]/85 to-[#073d71]/25"/>
  <Container className="relative z-10 flex items-center py-24 sm:py-28">
   <div aria-live="polite" className="max-w-[760px]">
    <p className="mb-6 inline-flex border-b-2 border-[#ffb71b] pb-3 text-xs font-semibold uppercase tracking-[.18em] text-[#ffcc51] sm:text-sm">{slide.eyebrow}</p>
    <h1 className="max-w-[760px] text-[clamp(3.2rem,6.5vw,6.8rem)] font-semibold leading-[1.06] tracking-[-.055em]">{slide.title}<span className="block text-white">{slide.accent}</span></h1>
    <p className="mt-8 max-w-[650px] text-base leading-8 text-blue-50 sm:text-lg">{slide.description}</p>
    <div className="mt-9 flex flex-wrap items-center gap-3"><Link href="/platforms" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-[#ffb71b] px-6 py-3 font-semibold text-[#08284f] hover:bg-[#ffd064]">Explore priorities <ArrowRight size={17}/></Link><Link href="/about" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20">Meet the candidate</Link></div>
   </div>
  </Container>
  <div className="absolute bottom-6 left-1/2 z-20 flex w-full max-w-[1280px] -translate-x-1/2 items-center justify-between px-5 sm:px-8 lg:px-12">
   <div className="flex items-center gap-2" aria-label="Select introduction slide">{slides.map((item,index)=><button type="button" onClick={()=>setActive(index)} aria-label={'Show slide '+(index+1)} aria-current={index===active?'true':undefined} className={['h-1.5 rounded-full transition-all',index===active?'w-11 bg-white':'w-5 bg-white/40'].join(' ')} key={item.title}/>)}
    <button type="button" onClick={()=>setPlaying(v=>!v)} aria-label={playing?'Pause slides':'Resume slides'} className="ml-3 flex size-9 items-center justify-center rounded-full border border-white/40 text-white">{playing?<Pause size={14}/>:<Play size={14}/>}</button>
   </div>
   <div className="flex gap-2"><button type="button" onClick={()=>setActive(v=>(v+slides.length-1)%slides.length)} aria-label="Previous slide" className="flex size-11 items-center justify-center rounded-full bg-white text-[#073f86] transition hover:bg-[#ffb71b]"><ChevronLeft size={21}/></button><button type="button" onClick={()=>setActive(v=>(v+1)%slides.length)} aria-label="Next slide" className="flex size-11 items-center justify-center rounded-full bg-white text-[#073f86] transition hover:bg-[#ffb71b]"><ChevronRight size={21}/></button></div>
  </div>
  <p className="sr-only">Minna City Gate photograph by F5pillar, CC BY-SA 4.0; see image credits page.</p>
 </section>;
}
