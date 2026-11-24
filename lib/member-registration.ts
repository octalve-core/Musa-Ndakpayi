import {z} from 'zod';
import {directoryReady} from '@/lib/electoral';
export const CONSENT_VERSION='2026-11-24-v1';
const phone=/^(?:\+234[789]\d{9}|0[789]\d{9})$/;
export const memberSchema=z.object({
 fullName:z.string().trim().min(3).max(100),
 phone:z.string().trim().transform(x=>x.replace(/[\s()-]/g,'')).pipe(z.string().regex(phone)),
 wardCode:z.string().regex(/^\d{2}$/),
 puCode:z.string().regex(/^26\/06\/\d{2}\/\d{3}$/),
 method:z.enum(['Self','Assisted']),
 assistedBy:z.string().trim().max(100).default(''),
 assistedConsent:z.boolean().default(false),
 adultConsent:z.literal(true),
 membershipConsent:z.literal(true),
 communicationConsent:z.boolean().default(false),
 website:z.string().max(0).default(''),
 turnstileToken:z.string().trim().min(5).max(2048)
}).superRefine((data,ctx)=>{
 if(data.method==='Assisted'&&(!data.assistedBy||!data.assistedConsent))ctx.addIssue({code:'custom',path:['assistedBy'],message:'Please obtain permission before assisting someone.'});
});
export type MemberInput=z.infer<typeof memberSchema>;
export const isOn=(v:string|undefined)=>v?.toLowerCase().trim()==='true';
export function registrationReady(){
 const retention=Number(process.env.PRIVACY_RETENTION_DAYS);
 return directoryReady()&&isOn(process.env.MEMBERSHIP_OPEN)&&
 Number.isInteger(retention)&&retention>=30&&retention<=730&&
 Boolean(process.env.DATABASE_URL&&process.env.TURNSTILE_SITE_KEY&&process.env.TURNSTILE_SECRET_KEY&&
 process.env.TURNSTILE_ALLOWED_HOSTNAMES&&process.env.PRIVACY_CONTROLLER_NAME&&
 process.env.PRIVACY_CONTACT_EMAIL&&process.env.REGISTRATION_HASH_SECRET&&process.env.REGISTRATION_HASH_SECRET.length>=32&&process.env.CRON_SECRET&&process.env.CRON_SECRET.length>=32);
}
