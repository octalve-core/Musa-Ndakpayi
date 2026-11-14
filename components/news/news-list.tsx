'use client';
import {useMemo,useState} from 'react';
import {Search} from 'lucide-react';
import {publicRecord} from '@/lib/content';
import {EditorialCard} from '@/components/ui/editorial-card';
export function NewsList(){
 const [q,setQ]=useState(''),[category,setCategory]=useState('All updates');
 const categories=['All updates',...new Set(publicRecord.map(i=>i.category))];
 const filtered=useMemo(()=>publicRecord.filter(i=>(category==='All updates'||i.category===category)&&
  (i.title+' '+i.summary+' '+i.source).toLowerCase().includes(q.toLowerCase().trim())),[q,category]);
 return <div><div className="grid gap-4 rounded-xl bg-[#f5f6f7] p-5 sm:grid-cols-[2fr_1fr] sm:p-6">
  <label className="block text-sm font-medium text-slate-800">Search updates<div className="relative mt-2"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search public statements…" className="h-12 w-full rounded-md border border-slate-200 bg-white pr-4 pl-10 text-sm outline-none focus:border-[#073f86]"/></div></label>
  <label className="block text-sm font-medium text-slate-800">Category<select value={category} onChange={e=>setCategory(e.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-sm">{categories.map(c=><option key={c}>{c}</option>)}</select></label>
 </div>
 {filtered.length>0?<div className="mt-8 grid gap-6 md:grid-cols-3">{filtered.map(item=><EditorialCard key={item.href} {...item}/>)}</div>:<p className="mt-8 rounded-xl bg-slate-50 p-8 text-sm text-slate-600">No updates match those filters.</p>}
 </div>;
}
