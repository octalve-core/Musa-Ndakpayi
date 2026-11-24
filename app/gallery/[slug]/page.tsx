import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,Images} from 'lucide-react';
import {Container} from '@/components/ui/container';
import {PageHero} from '@/components/ui/page-hero';
import {PhotoLightbox} from '@/components/gallery/photo-lightbox';
import media from '@/data/media.generated.json';

type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return media.albums.map(album=>({slug:album.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params,album=media.albums.find(item=>item.slug===slug);
 return {title:album?album.title+' | Gallery':'Gallery',description:album?album.title+' — '+album.count+' campaign photographs.':'Campaign gallery'};
}
export default async function AlbumPage({params}:Props){
 const {slug}=await params,album=media.albums.find(item=>item.slug===slug);
 if(!album)notFound();
 return <>
  <PageHero label="Campaign gallery · Album" title={album.title} description={album.count+' photograph'+(album.count===1?'':'s')+' from this campaign activity.'}/>
  <section className="py-12 sm:py-16"><Container>
   <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
    <Link href="/gallery" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#073f86] hover:underline"><ArrowLeft size={18}/> All photo albums</Link>
    <span className="inline-flex items-center gap-2 text-sm text-slate-500"><Images size={17}/>{album.count} photographs</span>
   </div>
   <PhotoLightbox photos={album.photos} title={album.title}/>
  </Container></section>
 </>;
}
