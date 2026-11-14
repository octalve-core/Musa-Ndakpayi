import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import type {ReactNode} from 'react';
export function ButtonLink({href,children,variant='primary',showArrow=false,className=''}:{href:string;children:ReactNode;variant?:'primary'|'gold'|'outline'|'light';showArrow?:boolean;className?:string}){
 const styles={primary:'bg-[#073f86] text-white hover:bg-[#062f64]',gold:'bg-[#ffb71b] text-[#081a2c] hover:bg-[#f8a800]',outline:'border border-[#073f86] text-[#073f86] hover:bg-[#edf4fd]',light:'bg-white text-[#073f86] hover:bg-slate-100'};
 return <Link href={href} className={['inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors',styles[variant],className].join(' ')}>{children}{showArrow&&<ArrowRight size={16} aria-hidden/>}</Link>;
}
