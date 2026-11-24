import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {LockKeyhole} from 'lucide-react';
import {getAdmin} from '@/lib/admin-auth';
import {AdminLoginForm} from '@/components/admin/admin-login-form';
import {Container} from '@/components/ui/container';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Admin Sign In',robots:{index:false,follow:false}};
export default async function AdminLogin(){
 const admin=await getAdmin();
 if(admin)redirect(admin.mustChange?'/admin/change-password':'/admin/members');
 return <section className="min-h-[70vh] bg-[#f5f7fb] py-16 sm:py-24"><Container className="flex justify-center"><div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 sm:p-10">
  <div className="flex size-12 items-center justify-center rounded-xl bg-[#e9f2fb] text-[#073f86]"><LockKeyhole size={24}/></div>
  <p className="mt-6 text-xs font-semibold uppercase tracking-[.15em] text-[#0a5d9c]">Private administration</p>
  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Admin sign in</h1>
  <p className="mt-3 text-sm leading-7 text-slate-600">Access to the Chanchaga member records is restricted to authorised administrators.</p>
  <AdminLoginForm/>
 </div></Container></section>;
}
