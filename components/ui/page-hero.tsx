import {Container} from '@/components/ui/container';
export function PageHero({title,description,label}:{title:string;description?:string;label?:string}){
 return <section className="bg-[#073f86] py-16 text-white sm:py-24">
  <Container><div className="max-w-4xl">{label&&<p className="mb-4 text-xs font-semibold uppercase tracking-[.23em] text-[#ffc642]">{label}</p>}
   <h1 className="text-4xl font-semibold leading-tight tracking-[-.045em] sm:text-5xl lg:text-6xl">{title}</h1>
   {description&&<p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">{description}</p>}
  </div></Container>
 </section>;
}
