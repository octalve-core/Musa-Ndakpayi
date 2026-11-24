import type {Metadata} from 'next';
import {Camera} from 'lucide-react';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {AlbumCard} from '@/components/gallery/album-card';
import {media} from '@/lib/media';

export const metadata:Metadata={title:'Gallery',description:'Browse Musa Usman Ndakpayi campaign photographs, organised by community activities and events.'};
export default function Gallery(){
 return <><PageHero title="Campaign gallery" label="Photo archive" description="Our activities, engagements and community moments — organised into albums."/>
  <section className="py-16 sm:py-20"><Container>
   <div className="mb-9 flex flex-wrap items-end justify-between gap-3">
    <div><p className="text-xs font-medium uppercase tracking-[.18em] text-[#073f86]">Photo albums</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Explore our moments</h2></div>
    {media.albums.length>0&&<p className="text-sm text-slate-500">{media.albums.length} album{media.albums.length===1?'':'s'}</p>}
   </div>
   {media.albums.length?<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{media.albums.map(album=><AlbumCard key={album.slug} album={album}/>)}</div>:
    <div className="rounded-2xl border border-slate-200 bg-[#f6f9fc] px-7 py-16 text-center sm:px-12">
     <Camera className="mx-auto text-[#073f86]" size={42} strokeWidth={1.3}/>
     <h2 className="mt-5 text-2xl font-semibold text-slate-900">Campaign photographs</h2>
     <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600">Explore the campaign and community engagement through our collection of photographs.</p>
    </div>}
  </Container></section></>;
}
