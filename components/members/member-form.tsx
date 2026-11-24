'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {CheckCircle2,ArrowRight,ShieldCheck} from 'lucide-react';
import {getUnits,getWards} from '@/lib/electoral';

type TurnstileClient={render:(el:HTMLElement,options:{sitekey:string;callback:(token:string)=>void;'expired-callback':()=>void;'error-callback':()=>void;theme:'auto'})=>string;reset:(id?:string)=>void;remove:(id:string)=>void};
const turnstile=()=>((window as Window&{turnstile?:TurnstileClient}).turnstile);

export function MemberForm({siteKey}:{siteKey:string}){
 const [ward,setWard]=useState('');
 const [pu,setPu]=useState('');
 const [method,setMethod]=useState<'Self'|'Assisted'>('Self');
 const [token,setToken]=useState('');
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [reference,setReference]=useState('');
 const widget=useRef<HTMLDivElement>(null),widgetId=useRef<string|null>(null);
 const units=getUnits(ward),wards=getWards();
 const mount=useCallback(()=>{
  if(!siteKey||!widget.current||!turnstile()||widgetId.current)return;
  widgetId.current=turnstile()!.render(widget.current,{sitekey:siteKey,theme:'auto',
    callback:setToken,'expired-callback':()=>setToken(''),'error-callback':()=>setToken('')});
 },[siteKey]);
 useEffect(()=>{
  mount();
  return()=>{if(widgetId.current&&turnstile()){turnstile()!.remove(widgetId.current);widgetId.current=null;}};
 },[mount]);
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(busy)return;
  const form=event.currentTarget;
  const raw=new FormData(form);
  const body={
   fullName:String(raw.get('fullName')||''),
   phone:String(raw.get('phone')||''),
   wardCode:ward,puCode:pu,method,
   assistedBy:String(raw.get('assistedBy')||''),
   assistedConsent:raw.get('assistedConsent')==='on',
   adultConsent:raw.get('adultConsent')==='on',
   membershipConsent:raw.get('membershipConsent')==='on',
   communicationConsent:raw.get('communicationConsent')==='on',
   website:String(raw.get('website')||''),
   turnstileToken:token
  };
  if(!body.membershipConsent||!body.adultConsent){setError('Please read and accept the membership and age confirmations.');return;}
  if(!token){setError('Please complete the security check.');return;}
  setBusy(true);setError('');
  try{
   const response=await fetch('/api/members',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),cache:'no-store'});
   const result=await response.json() as {message?:string;reference?:string};
   if(!response.ok){setError(result.message||'Registration unsuccessful. Please try again.');turnstile()?.reset(widgetId.current||undefined);setToken('');return;}
   if(result.reference)setReference(result.reference);
  }catch{setError('Unable to connect. Please check your network and try again.');turnstile()?.reset(widgetId.current||undefined);setToken('');}
  finally{setBusy(false);}
 }
 if(reference)return <div role="status" className="rounded-2xl border border-[#b4dfc4] bg-white p-8 shadow-sm sm:p-10">
  <CheckCircle2 size={48} className="text-[#14884e]"/>
  <h2 className="mt-5 text-2xl font-semibold text-slate-900">Registration received</h2>
  <p className="mt-3 text-sm leading-7 text-slate-600">Your Chanchaga campaign membership registration has been recorded. Keep the reference below for your records.</p>
  <p className="mt-5 break-all rounded-lg bg-[#eef8f1] p-4 font-mono text-sm text-[#14653a]">{reference}</p>
  <Link href="/" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#073f86] px-6 py-3 text-sm font-medium text-white">Return home <ArrowRight size={17}/></Link>
 </div>;
 return <>
  <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={mount}/>
  <form onSubmit={submit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
   <div><p className="text-xs font-semibold uppercase tracking-[.15em] text-[#0a5d9c]">Chanchaga · Niger State</p><h2 className="mt-2 text-2xl font-semibold text-slate-900">Member registration</h2><p className="mt-2 text-sm leading-7 text-slate-600">Please enter your correct details and select your electoral ward and polling unit.</p></div>
   <div className="grid gap-5 sm:grid-cols-2">
    <label className="block text-sm font-medium text-slate-800 sm:col-span-2">Full name <span className="text-[#c92230]">*</span><input name="fullName" required minLength={3} maxLength={100} autoComplete="name" placeholder="Enter your full name" className="mt-2 h-12 w-full rounded-md border border-slate-300 bg-white px-4 font-normal text-slate-900 outline-none focus:border-[#073f86] focus:ring-2 focus:ring-[#073f86]/10"/></label>
    <label className="block text-sm font-medium text-slate-800 sm:col-span-2">Phone number <span className="text-[#c92230]">*</span><input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="08012345678" minLength={10} maxLength={20} className="mt-2 h-12 w-full rounded-md border border-slate-300 bg-white px-4 font-normal text-slate-900 outline-none focus:border-[#073f86] focus:ring-2 focus:ring-[#073f86]/10"/></label>
    <label className="block text-sm font-medium text-slate-800">Local Government Area<input value="Chanchaga" readOnly className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-slate-100 px-4 font-normal text-slate-600"/></label>
    <label className="block text-sm font-medium text-slate-800">Ward <span className="text-[#c92230]">*</span><select required value={ward} onChange={e=>{setWard(e.target.value);setPu('');}} className="mt-2 h-12 w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 font-normal text-slate-900 outline-none focus:border-[#073f86]"><option value="">Select ward</option>{wards.map(w=><option key={w.code} value={w.code}>{w.name}</option>)}</select></label>
    <label className="block text-sm font-medium text-slate-800 sm:col-span-2">Polling unit <span className="text-[#c92230]">*</span><select required disabled={!ward} value={pu} onChange={e=>setPu(e.target.value)} className="mt-2 h-12 w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 font-normal text-slate-900 outline-none focus:border-[#073f86] disabled:bg-slate-100"><option value="">Select polling unit</option>{units.map(u=><option key={u.code} value={u.code}>{u.code} — {u.name}</option>)}</select><span className="mt-2 block text-xs font-normal leading-5 text-slate-500">Not sure of your polling unit? <a href="https://inecnigeria.org/polling-units/" target="_blank" rel="noopener noreferrer" className="text-[#073f86] underline">Check INEC’s locator</a>.</span></label>
   </div>
   <fieldset className="space-y-3 border-t border-slate-200 pt-5"><legend className="text-sm font-semibold text-slate-900">Registration method</legend>
    <div className="flex flex-wrap gap-5 text-sm text-slate-700">
     <label className="flex items-center gap-2"><input type="radio" name="method" checked={method==='Self'} onChange={()=>setMethod('Self')}/> Self registration</label>
     <label className="flex items-center gap-2"><input type="radio" name="method" checked={method==='Assisted'} onChange={()=>setMethod('Assisted')}/> Assisted registration</label>
    </div>
    {method==='Assisted'&&<div className="space-y-3"><label className="block text-sm text-slate-800">Name of person assisting<input required name="assistedBy" maxLength={100} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 outline-none focus:border-[#073f86]"/></label><label className="flex items-start gap-3 text-xs leading-6 text-slate-700"><input required name="assistedConsent" type="checkbox" className="mt-1"/>I confirm that the member has asked me to submit this information.</label></div>}
   </fieldset>
   <fieldset className="space-y-4 border-t border-slate-200 pt-5"><legend className="text-sm font-semibold text-slate-900">Membership and privacy</legend>
    <label className="flex items-start gap-3 text-sm leading-6 text-slate-700"><input required type="checkbox" name="adultConsent" className="mt-1 shrink-0"/>I confirm I am at least 18 years old.</label>
    <label className="flex items-start gap-3 text-sm leading-6 text-slate-700"><input required type="checkbox" name="membershipConsent" className="mt-1 shrink-0"/>I voluntarily register as a member of the Musa Usman Ndakpayi campaign and consent to the secure processing of my name, phone number, ward, polling unit and campaign affiliation for membership management.</label>
    <label className="flex items-start gap-3 text-sm leading-6 text-slate-700"><input type="checkbox" name="communicationConsent" className="mt-1 shrink-0"/>I also wish to receive campaign announcements by phone or message. (Optional)</label>
    <p className="text-xs leading-6 text-slate-500">Read the <Link className="font-medium text-[#073f86] underline" href="/privacy">privacy notice</Link>. This registration is for campaign membership only, not INEC voter registration.</p>
   </fieldset>
   <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <div ref={widget} className="min-h-[68px]" aria-label="Security verification"/>
   {error&&<p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}
   <button type="submit" disabled={busy||!token} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#073f86] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#052e65] disabled:cursor-not-allowed disabled:opacity-50">{busy?'Submitting securely…':'Complete registration'} <ArrowRight size={18}/></button>
   <p className="flex items-start gap-2 text-xs leading-6 text-slate-500"><ShieldCheck className="mt-0.5 shrink-0 text-[#19834e]" size={17}/>Your information is submitted securely and is not published on the website.</p>
  </form>
 </>;
}
