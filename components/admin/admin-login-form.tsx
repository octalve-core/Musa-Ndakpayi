'use client';
import {useState} from 'react';
import {Eye,EyeOff,LogIn} from 'lucide-react';
export function AdminLoginForm(){
 const [username,setUsername]=useState('');
 const [password,setPassword]=useState('');
 const [show,setShow]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy)return;setBusy(true);setError('');
  try{
   const response=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password}),cache:'no-store'});
   const result=await response.json() as {message?:string;redirect?:string};
   if(response.ok&&result.redirect){window.location.assign(result.redirect);return;}
   setError(result.message||'Unable to sign in.');
  }catch{setError('Unable to connect. Please try again.');}
  finally{setBusy(false);}
 }
 return <form onSubmit={submit} className="mt-7 space-y-5">
  <label className="block text-sm font-medium text-slate-700">Username<input required minLength={4} maxLength={40} autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-4 outline-none focus:border-[#073f86]"/></label>
  <label className="block text-sm font-medium text-slate-700">Password<div className="relative mt-2"><input required autoComplete="current-password" type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} className="h-12 w-full rounded-md border border-slate-300 py-3 pl-4 pr-14 outline-none focus:border-[#073f86]"/><button type="button" onClick={()=>setShow(v=>!v)} aria-label={show?'Hide password':'Show password'} className="absolute right-1 top-1 flex size-10 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100">{show?<EyeOff size={19}/>:<Eye size={19}/>}</button></div></label>
  {error&&<p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}
  <button type="submit" disabled={busy} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#073f86] px-6 text-sm font-semibold text-white disabled:opacity-50"><LogIn size={18}/>{busy?'Signing in…':'Sign in securely'}</button>
 </form>;
}
