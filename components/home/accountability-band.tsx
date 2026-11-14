import {Landmark,ScrollText,ShieldCheck,UsersRound} from 'lucide-react';
import {Container} from '@/components/ui/container';
const items=[
 {icon:Landmark,title:'Representation',description:'The constituency’s voice in federal deliberations.'},
 {icon:ScrollText,title:'Law-making',description:'Bills, motions and debate on federal issues.'},
 {icon:ShieldCheck,title:'Oversight',description:'Scrutiny of agencies, programmes and spending.'},
 {icon:UsersRound,title:'Public engagement',description:'Listening to concerns and reporting back.'}
];
export function AccountabilityBand(){
 return <section className="bg-[#f5f6f7] py-16 sm:py-20"><Container>
  <div className="mb-10 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#0a5d9c]">The office, clearly explained</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">What a federal representative can do.</h2><p className="mt-3 text-sm leading-7 text-slate-600">Effective representation brings the people's concerns into the National Assembly through legislation, budget scrutiny, oversight and sustained engagement with communities.</p></div>
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map(({icon:Icon,title,description})=><div className="rounded-xl border border-slate-200 bg-white p-6" key={title}><span className="flex size-11 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#073f86]"><Icon size={22}/></span><h3 className="mt-5 font-semibold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>)}</div>
 </Container></section>;
}
