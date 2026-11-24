'use client';
import {useState} from 'react';
import {Eye,EyeOff,ShieldCheck} from 'lucide-react';
export function ChangePasswordForm({csrf}:{csrf:string}){
 const [current,setCurrent]=useState(''),[next,setNext]=useState(''),[show,setShow]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy)return;setBusy(true);setError('');
  try{
   const response=await fetch('/api/admin/change-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({currentPassword:current,newPassword:next,csrf}),cache:'no-store'});
   const result=await response.json() as {message?:string;redirect?:string};
   if(response.ok&&result.redirect){window.location.assign(result.redirect);return;}
   setError(result.message||'Password change failed.');
  }catch{setError('Unable to connect. Try again.');}
  finally{setBusy(false);}
 }
 return <form onSubmit={submit} className="mt-7 space-y-5">
  <label className="block text-sm font-medium text-slate-700">Current password<input required type={show?'text':'password'} autoComplete="current-password" value={current} onChange={e=>setCurrent(e.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 outline-none focus:border-[#073f86]"/></label>
  <label className="block text-sm font-medium text-slate-700">New password (at least 16 characters)<input required minLength={16} maxLength={256} type={show?'text':'password'} autoComplete="new-password" value={next} onChange={e=>setNext(e.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 outline-none focus:border-[#073f86]"/></label>
  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={show} onChange={e=>setShow(e.target.checked)}/> Show passwords {show?<Eye size={16}/>:<EyeOff size={16}/>}</label>
  {error&&<p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}
  <button type="submit" disabled={busy} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#073f86] px-6 text-sm font-semibold text-white disabled:opacity-50"><ShieldCheck size={18}/>{busy?'Updating…':'Set new password'}</button>
 </form>;
}
