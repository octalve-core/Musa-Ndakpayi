'use client';
import Link from 'next/link';
import {useState} from 'react';
import {Search,FilterX} from 'lucide-react';
import {getWards,getUnits} from '@/lib/electoral';
import type {Filters} from '@/lib/admin-records';
export function MemberFilters({initial}:{initial:Filters}){
 const [ward,setWard]=useState(initial.ward),[pu,setPu]=useState(initial.pu);
 return <form method="get" action="/admin/members" className="mt-7 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr_1fr_auto] sm:p-6">
  <label className="block text-xs font-medium text-slate-700">Search members<input type="search" name="q" defaultValue={initial.q} maxLength={80} placeholder="Name or phone" className="mt-2 h-11 w-full min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#073f86]"/></label>
  <label className="block text-xs font-medium text-slate-700">Ward<select name="ward" value={ward} onChange={e=>{setWard(e.target.value);setPu('');}} className="mt-2 h-11 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2 text-sm"><option value="">All wards</option>{getWards().map(w=><option key={w.code} value={w.code}>{w.name}</option>)}</select></label>
  <label className="block text-xs font-medium text-slate-700">Polling unit<select name="pu" value={pu} onChange={e=>setPu(e.target.value)} disabled={!ward} className="mt-2 h-11 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2 text-sm disabled:bg-slate-100"><option value="">All polling units</option>{getUnits(ward).map(u=><option key={u.code} value={u.code}>{u.code} · {u.name}</option>)}</select></label>
  <label className="block text-xs font-medium text-slate-700">From<input type="date" name="from" defaultValue={initial.from} className="mt-2 h-11 w-full min-w-0 rounded-md border border-slate-300 px-2 text-sm"/></label>
  <label className="block text-xs font-medium text-slate-700">To<input type="date" name="to" defaultValue={initial.to} className="mt-2 h-11 w-full min-w-0 rounded-md border border-slate-300 px-2 text-sm"/></label>
  <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-1">
   <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#073f86] px-4 text-sm font-medium text-white"><Search size={16}/>Apply</button>
   <Link href="/admin/members" aria-label="Clear filters" className="inline-flex size-11 items-center justify-center rounded-md border border-slate-300 text-[#073f86]"><FilterX size={18}/></Link>
  </div>
 </form>;
}
