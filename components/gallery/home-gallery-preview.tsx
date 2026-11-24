import Link from 'next/link';
import Image from 'next/image';
import {Camera,ArrowUpRight} from 'lucide-react';
import {media} from '@/lib/media';
export function HomeGalleryPreview(){
 const album=media.albums[0];
 return <Link href="/gallery" className="group relative flex min-h-[360px] overflow-hidden rounded-2xl bg-[#073f86] sm:min-h-[440px]" aria-label="Explore the campaign gallery">
  {album?<div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
   {album.preview.map((photo,i)=><div key={i} className="relative overflow-hidden"><Image src={photo.src} alt="" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"/></div>)}
  </div>:<div aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_70%_25%,#2c75b3,transparent_65%),linear-gradient(120deg,#042452,#0c5198)]"><Camera className="text-white/30" size={116} strokeWidth={1}/></div>}
  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#052b58]/95 via-transparent to-transparent"/>
  <div className="relative z-10 mt-auto flex w-full items-center justify-between gap-3 p-7 text-white sm:p-9">
   <div><p className="text-xs font-semibold uppercase tracking-[.15em] text-[#ffcf59]">The campaign gallery</p><p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{album?album.title:'People · Places · Community'}</p></div>
   <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15"><ArrowUpRight size={21}/></span>
  </div>
 </Link>;
}
