import {Info} from 'lucide-react';
export function Notice({text}:{text:string}){
 return <div className="flex gap-3 rounded-xl border border-[#cfe4f6] bg-[#f0f7ff] p-5 text-sm leading-7 text-[#183b65]"><Info size={20} className="mt-1 shrink-0"/><p>{text}</p></div>;
}
