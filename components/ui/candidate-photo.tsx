import Image from 'next/image';
import {media} from '@/lib/media';

export function CandidatePhoto({className=''}:{className?:string}){
 return <figure className={['relative isolate flex min-h-[400px] flex-col justify-end overflow-hidden rounded-2xl bg-[#082d60] text-white',className].join(' ')}>
  {media.candidate?
   <Image src={media.candidate} alt="Musa Usman Ndakpayi" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-top"/>:
   <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_65%_30%,#2865a1,transparent_65%),linear-gradient(120deg,#072a56,#0b4887)]">
    <Image src="/brand/mun-icon.png" alt="Musa Usman Ndakpayi campaign portrait mark" width={320} height={320} className="h-auto w-[55%] max-w-[320px] object-contain"/>
   </div>}
  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#051f40]/95 via-[#063568]/0 to-transparent"/>
  <figcaption className="relative z-10 px-7 pb-8 pt-36 sm:px-10 sm:pb-9">
   <p className="text-[11px] font-medium uppercase tracking-[.19em] text-[#ffcf59]">The candidate</p>
   <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Musa Usman Ndakpayi</p>
   <p className="mt-2 text-sm text-blue-100">Chanchaga Federal Constituency · 2027</p>
  </figcaption>
 </figure>;
}
