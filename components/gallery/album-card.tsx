import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight,Images} from 'lucide-react';
import type {GalleryAlbum} from '@/lib/gallery-types';
export function AlbumCard({album}:{album:GalleryAlbum}){
 return <Link href={'/gallery/'+album.slug} className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_7px_32px_rgba(12,40,78,.06)] transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#073f86]">
  <div className="grid aspect-[1.32] grid-cols-2 grid-rows-2 gap-[3px] overflow-hidden bg-[#dce9f5]">
   {album.preview.map((photo,i)=><div className="relative overflow-hidden" key={i}>
    <Image src={photo.src} alt="" fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 22vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"/>
   </div>)}
  </div>
  <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
   <div className="min-w-0"><h2 className="text-lg font-semibold tracking-tight text-slate-900">{album.title}</h2><p className="mt-1 flex items-center gap-2 text-xs text-slate-500"><Images size={15} aria-hidden="true"/>{album.count.toLocaleString('en-NG')} photograph{album.count===1?'':'s'}</p></div>
   <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#edf4fc] text-[#073f86] transition-colors group-hover:bg-[#073f86] group-hover:text-white"><ArrowUpRight size={19} aria-hidden="true"/></span>
  </div>
 </Link>;
}
