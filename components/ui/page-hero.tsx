import {Container} from '@/components/ui/container';
export function PageHero({title,description,label}:{title:string;description?:string;label?:string}){
 return <section className="relative isolate overflow-hidden bg-[#073f86] py-12 text-white sm:py-16">
  <div aria-hidden="true" className="absolute right-[-100px] top-[-180px] size-[420px] rounded-full border-[70px] border-white/5"/>
  <Container className="relative"><div className="max-w-4xl">
   {label&&<p className="mb-3 text-[11px] font-medium uppercase tracking-[.2em] text-[#ffd05c] sm:text-xs">{label}</p>}
   <h1 className="text-[clamp(2.15rem,4.8vw,3.65rem)] font-semibold leading-tight tracking-[-.045em]">{title}</h1>
   {description&&<p className="mt-3 max-w-2xl text-[15px] leading-7 text-blue-100 sm:mt-4 sm:text-lg sm:leading-8">{description}</p>}
  </div></Container>
 </section>;
}
