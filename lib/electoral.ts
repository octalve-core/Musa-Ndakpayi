import catalog from '@/data/chanchaga-polling-units.json';
export type Ward={code:string;name:string;units:{code:string;name:string}[]};
const wards:Ward[]=catalog.wards;
const all=wards.flatMap(ward=>ward.units);
const healthy=wards.length===11&&all.length===379&&new Set(all.map(u=>u.code)).size===379&&wards.every(w=>/^\d{2}$/.test(w.code)&&w.units.every(u=>u.code.startsWith('26/06/'+w.code+'/')));
export const constituency={state:'Niger',lga:'Chanchaga'} as const;
export function directoryReady(){return healthy;}
export function getWards(){return healthy?wards.map(({code,name})=>({code,name})):[];}
export function getUnits(wardCode:string){return healthy?(wards.find(w=>w.code===wardCode)?.units||[]):[];}
export function verifyUnit(wardCode:string,unitCode:string){
 if(!healthy)return null;
 const ward=wards.find(w=>w.code===wardCode);
 const unit=ward?.units.find(u=>u.code===unitCode);
 return ward&&unit?{ward:ward.name,unit:unit.name,wardCode:ward.code,puCode:unit.code}:null;
}
