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
 const [active,setActive]=useState(0);
 const [playing,setPlaying]=useState(true);
 const [interacting,setInteracting]=useState(false);
 useEffect(()=>{
  if(!playing||interacting||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=window.setInterval(()=>setActive(value=>(value+1)%slides.length),8000);
  return()=>window.clearInterval(timer);
 },[playing,interacting]);
 const slide=slides[active];
 return <section aria-label="Campaign introduction" aria-roledescription="carousel" onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onFocusCapture={()=>setInteracting(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setInteracting(false);}} className="relative isolate flex min-h-[670px] items-center overflow-hidden bg-[#073f86] text-white sm:min-h-[720px] lg:min-h-[min(820px,calc(100svh-80px))]">
  <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:'url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Minna%2C_Niger_state_City_gate.jpg/960px-Minna%2C_Niger_state_City_gate.jpg)'}}/>
  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,64,.96)_0%,rgba(3,45,91,.9)_49%,rgba(3,42,86,.66)_100%)]"/>
  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ffb71b] via-[#18a65b] to-[#073f86]"/>
  <Container className="relative z-10 flex items-center pb-36 pt-24 sm:pb-40 sm:pt-28">
   <div className="max-w-[850px] xl:max-w-[1060px]" aria-roledescription="slide" aria-label={'Slide '+(active+1)+' of '+slides.length} aria-live={playing?'off':'polite'}>
    <p className="mb-6 inline-flex max-w-full border-b-2 border-[#ffb71b] pb-3 text-[10px] font-medium uppercase tracking-[.11em] text-[#ffd05c] sm:text-xs sm:tracking-[.17em]">{slide.eyebrow}</p>
    <h1 className="max-w-[850px] xl:max-w-[1060px] text-[2.35rem] min-[360px]:text-[clamp(2.7rem,6.1vw,5rem)] font-semibold leading-[1.09] tracking-[-.045em]">{slide.title}<span className="mt-1 block">{slide.accent}</span></h1>
    <p className="mt-7 max-w-[580px] text-[15px] leading-7 text-blue-50 sm:mt-8 sm:text-lg sm:leading-8">{slide.description}</p>
    <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
     <Link href="/platforms" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#ffb71b] px-5 py-3 text-sm font-semibold text-[#08284f] transition-colors hover:bg-[#ffd064] sm:px-6">Explore priorities <ArrowRight size={17}/></Link>
     <Link href="/about" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/60 bg-white/10 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20 sm:px-6">About the candidate</Link>
    </div>
   </div>
  </Container>
  <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-[#062f64]/45 py-5 backdrop-blur-sm">
   <Container className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-2" role="group" aria-label="Choose introduction slide">
     {slides.map((item,index)=><button type="button" onClick={()=>setActive(index)} aria-label={'Show slide '+(index+1)} aria-current={index===active?'true':undefined} className={['flex h-11 items-center justify-center rounded-full px-1 transition-all',index===active?'w-11':'w-7'].join(' ')} key={item.title}><span className={['block h-1.5 rounded-full transition-all',index===active?'w-10 bg-[#ffb71b]':'w-5 bg-white/55'].join(' ')}/></button>)}
     <button type="button" onClick={()=>setPlaying(value=>!value)} aria-label={playing?'Pause automatic slides':'Resume automatic slides'} className="ml-1 flex size-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15">{playing?<Pause size={15}/>:<Play size={15}/>}</button>
    </div>
    <div className="flex gap-2">
     <button type="button" onClick={()=>setActive(value=>(value+slides.length-1)%slides.length)} aria-label="Previous slide" className="flex size-11 items-center justify-center rounded-full bg-white text-[#073f86] transition-colors hover:bg-[#ffb71b]"><ChevronLeft size={21}/></button>
     <button type="button" onClick={()=>setActive(value=>(value+1)%slides.length)} aria-label="Next slide" className="flex size-11 items-center justify-center rounded-full bg-white text-[#073f86] transition-colors hover:bg-[#ffb71b]"><ChevronRight size={21}/></button>
    </div>
   </Container>
  </div>
  <a href="https://commons.wikimedia.org/wiki/File:Minna,_Niger_state_City_gate.jpg" target="_blank" rel="noopener noreferrer" className="absolute bottom-24 right-12 z-20 hidden text-xs text-white/80 underline decoration-white/50 underline-offset-4 hover:text-white lg:block">Minna City Gate · F5pillar · CC BY-SA 4.0</a>
 </section>;
}
