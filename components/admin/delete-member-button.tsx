'use client';
import {useState} from 'react';
import {Trash2} from 'lucide-react';
export function DeleteMemberButton({reference,csrf}:{reference:string;csrf:string}){
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 async function remove(){
  if(busy||!window.confirm('Permanently delete this member record? This action cannot be undone.'))return;
  setBusy(true);setError('');
  try{
   const response=await fetch('/api/admin/members/'+reference,{method:'DELETE',headers:{'Content-Type':'application/json','x-admin-csrf':csrf},cache:'no-store'});
   const result=await response.json() as {message?:string};
   if(response.ok){window.location.assign('/admin/members');return;}
   setError(result.message||'Could not delete this member.');
  }catch{setError('Unable to connect. Please try again.');}
  finally{setBusy(false);}
 }
 return <div><button type="button" onClick={remove} disabled={busy} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-red-200 bg-white px-5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"><Trash2 size={17}/>{busy?'Deleting…':'Delete member record'}</button>{error&&<p role="alert" className="mt-3 text-sm text-red-800">{error}</p>}</div>;
}
