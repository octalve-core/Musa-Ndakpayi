'use client';
import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import {ChevronLeft,ChevronRight,X,Expand} from 'lucide-react';
import type {GalleryPhoto} from '@/lib/gallery-types';

export function PhotoLightbox({photos,title}:{photos:GalleryPhoto[];title:string}){
 const [active,setActive]=useState<number|null>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 const imagePanelRef=useRef<HTMLDivElement>(null);
 const triggers=useRef<(HTMLButtonElement|null)[]>([]);
 const total=photos.length;
 
 useEffect(()=>{
  if(active===null)return;
  const original=document.body.style.overflow;
  document.body.style.overflow='hidden';
  closeRef.current?.focus();
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();setActive(null);requestAnimationFrame(()=>triggers.current[active]?.focus());}
   if(event.key==='ArrowRight'){event.preventDefault();setActive(current=>current===null?null:(current+1)%total);}
   if(event.key==='ArrowLeft'){event.preventDefault();setActive(current=>current===null?null:(current+total-1)%total);}
   if(event.key==='Tab'){
    const dialog=document.getElementById('photo-viewer-dialog');
    const controls=[...(dialog?.querySelectorAll<HTMLButtonElement>('button:not([disabled])')||[])];
    if(!controls.length)return;
    const first=controls[0],last=controls[controls.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
   }
  };
  const onPointerDown=(event:PointerEvent)=>{
   const panel=imagePanelRef.current;
   if(!panel||!(event.target instanceof Node)||!panel.contains(event.target))return;
   const img=panel.querySelector('img');
   if(!img||!img.naturalWidth||!img.naturalHeight)return;
   const box=img.getBoundingClientRect();
   const scale=Math.min(box.width/img.naturalWidth,box.height/img.naturalHeight);
   const drawWidth=img.naturalWidth*scale,drawHeight=img.naturalHeight*scale;
   const left=box.left+(box.width-drawWidth)/2,top=box.top+(box.height-drawHeight)/2;
   if(event.clientX<left||event.clientX>left+drawWidth||event.clientY<top||event.clientY>top+drawHeight){
    setActive(null);
    requestAnimationFrame(()=>triggers.current[active]?.focus());
   }
  };
  window.addEventListener('keydown',onKey);
  // The dark letterbox around an uncropped photograph also dismisses the modal.
  window.addEventListener('pointerdown',onPointerDown);
  return()=>{document.body.style.overflow=original;window.removeEventListener('keydown',onKey);window.removeEventListener('pointerdown',onPointerDown);};
 },[active,total]);
 const show=(i:number)=>{setActive(i);};
 const dismiss=()=>{
  const index=active;
  setActive(null);
  if(index!==null)requestAnimationFrame(()=>triggers.current[index]?.focus());
 };
 return <>
  <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
   {photos.map((photo,i)=><button ref={el=>{triggers.current[i]=el;}} key={photo.src} type="button" onClick={()=>show(i)} aria-label={'View photo '+(i+1)+' of '+total+' in '+title} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-white shadow-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#073f86]">
    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width:640px) 46vw, (max-width:1024px) 30vw, 23vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"/>
    <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-[#042752]/85 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Expand size={16} aria-hidden="true"/></span>
   </button>)}
  </div>
  {active!==null&&photos[active]&&<div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020b1d]/95 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={title+' photo viewer'} id="photo-viewer-dialog">
   <button className="absolute inset-0 cursor-default" type="button" onClick={dismiss} aria-label="Dismiss viewer background" tabIndex={-1}/>
   <div className="relative z-10 flex h-full w-full max-w-7xl flex-col">
    <div className="flex shrink-0 items-center justify-between gap-4 px-1 pb-3 text-white">
     <div className="min-w-0"><p className="truncate text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-white/65">{active+1} of {total}</p></div>
     <button ref={closeRef} type="button" onClick={dismiss} aria-label="Close photo viewer" className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"><X size={22}/></button>
    </div>
    <div ref={imagePanelRef} className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-black/40">
     <Image key={photos[active].src} src={photos[active].src} alt={photos[active].alt} fill sizes="100vw" className="object-contain"/>
    </div>
    <div className="flex shrink-0 items-center justify-between gap-4 pt-4 text-white">
     <button type="button" onClick={()=>setActive(i=>(i===null?0:(i+total-1)%total))} aria-label="Previous photo" className="flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-medium hover:bg-white/10"><ChevronLeft size={18}/> Previous</button>
     <span className="hidden text-xs text-white/65 sm:block">Use arrow keys to navigate · Esc to close</span>
     <button type="button" onClick={()=>setActive(i=>(i===null?0:(i+1)%total))} aria-label="Next photo" className="flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-medium hover:bg-white/10">Next <ChevronRight size={18}/></button>
    </div>
   </div>
  </div>}
 </>;
}
