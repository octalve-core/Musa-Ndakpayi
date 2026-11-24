import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {LockKeyhole} from 'lucide-react';
import {getAdmin,csrfToken} from '@/lib/admin-auth';
import {ChangePasswordForm} from '@/components/admin/change-password-form';
import {Container} from '@/components/ui/container';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Change Admin Password',robots:{index:false,follow:false}};
export default async function ChangePassword(){
 const admin=await getAdmin();if(!admin)redirect('/admin/login');
 return <section className="min-h-[70vh] bg-[#f5f7fb] py-16 sm:py-24"><Container className="flex justify-center"><div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
  <LockKeyhole size={32} className="text-[#073f86]"/>
  <h1 className="mt-5 text-3xl font-semibold text-slate-900">Secure your account</h1>
  <p className="mt-3 text-sm leading-7 text-slate-600">Choose a private, unique password before managing campaign member information.</p>
  <ChangePasswordForm csrf={csrfToken(admin,'password')}/>
 </div></Container></section>;
}
