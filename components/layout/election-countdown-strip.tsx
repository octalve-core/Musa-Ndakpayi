'use client';
import {useEffect,useState} from 'react';
import {ArrowUpRight,CalendarDays} from 'lucide-react';
import {Container} from '@/components/ui/container';

// INEC: Presidential and National Assembly elections, 16 January 2027.
// Midnight WAT marks the beginning of election day, NOT the opening of polls.
export const ELECTION_DAY_ISO='2027-01-16T00:00:00+01:00';
const electionDay=Date.parse(ELECTION_DAY_ISO);

type Remaining={days:number;hours:number;minutes:number;seconds:number};
function getRemaining(now:number):Remaining{
 const seconds=Math.max(0,Math.floor((electionDay-now)/1000));
 return {days:Math.floor(seconds/86400),hours:Math.floor(seconds/3600)%24,minutes:Math.floor(seconds/60)%60,seconds:seconds%60};
}
const two=(value:number)=>String(value).padStart(2,'0');

export function ElectionCountdownStrip(){
 const [remaining,setRemaining]=useState<Remaining|null>(null);
 useEffect(()=>{
  const refresh=()=>setRemaining(getRemaining(Date.now()));
  refresh();
  const timer=window.setInterval(refresh,1000);
  return()=>window.clearInterval(timer);
 },[]);
 const arrived=remaining!==null&&remaining.days===0&&remaining.hours===0&&remaining.minutes===0&&remaining.seconds===0;
 const units=[
  {name:'DAYS',value:remaining===null?'--':String(remaining.days)},
  {name:'HRS',value:remaining===null?'--':two(remaining.hours)},
  {name:'MIN',value:remaining===null?'--':two(remaining.minutes)},
  {name:'SEC',value:remaining===null?'--':two(remaining.seconds)}
 ];
 return <div className="w-full border-b border-[#33547b] bg-[#082d59] text-white">
  <Container className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 py-2 sm:min-h-[48px] sm:flex-row sm:justify-between sm:gap-4 sm:py-1.5">
   <div className="flex min-w-0 items-center gap-2.5">
    <span className="shrink-0 rounded bg-[#ffb71b] px-2 py-1 text-[10px] font-bold tracking-[.1em] text-[#092e59]">2027 ELECTION</span>
    <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-[.02em] text-slate-100 sm:text-xs">
     <CalendarDays size={13} aria-hidden="true" className="shrink-0 text-[#ffcb55]"/>
     <span className="sm:hidden">HOUSE OF REPS · 16 JAN</span>
     <span className="hidden sm:inline">House of Representatives · <time dateTime="2027-01-16">Sat, 16 January 2027</time></span>
    </div>
   </div>
   <div data-testid="election-countdown" data-election-date="2027-01-16" role="timer" aria-label="Time until House of Representatives election day, 16 January 2027" aria-live="off" className="flex shrink-0 items-center justify-center gap-2 text-white sm:gap-2.5">
    {arrived?<span className="rounded bg-[#ffb71b] px-3 py-1 text-xs font-bold text-[#082d59]">Election day</span>:<>
     <span className="mr-0.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#ffcf6c] sm:mr-1">Countdown</span>
     {units.map((unit,i)=><span key={unit.name} className="flex items-baseline gap-0.5">
      <span data-countdown-unit={unit.name==='SEC'?'seconds':unit.name.toLowerCase()} className="min-w-[2ch] text-center text-sm font-bold tabular-nums tracking-tight sm:text-base">{unit.value}</span>
      <span className="text-[9px] font-medium text-slate-200">{unit.name}</span>
      {i<units.length-1&&<span aria-hidden="true" className="ml-0.5 text-slate-400">·</span>}
     </span>)}
    </>}
   </div>
   <a href="https://inecnigeria.org/elections/calendar" target="_blank" rel="noopener noreferrer" className="hidden shrink-0 items-center gap-1 text-[11px] font-medium text-slate-200 underline decoration-white/40 underline-offset-4 hover:text-white lg:inline-flex">Source: INEC <ArrowUpRight size={12} aria-hidden="true"/></a>
  </Container>
 </div>;
}
