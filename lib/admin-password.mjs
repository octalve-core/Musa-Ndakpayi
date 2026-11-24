import {randomBytes,scryptSync,timingSafeEqual} from 'node:crypto';
const params={N:32768,r:8,p:1,maxmem:64*1024*1024};
const saltPattern=/^[a-f0-9]{32}$/;
const hashPattern=/^[a-f0-9]{128}$/;
export function hashPassword(password){
 if(typeof password!=='string'||password.length<16||password.length>256)throw new Error('Administrator password must be 16–256 characters');
 const salt=randomBytes(16).toString('hex');
 const hash=scryptSync(password,Buffer.from(salt,'hex'),64,params).toString('hex');
 return 'scrypt-v1:'+salt+':'+hash;
}
export function verifyPassword(password,stored){
 if(typeof password!=='string'||password.length>256)return false;
 const parts=typeof stored==='string'?stored.split(':'):[];
 const valid=parts.length===3&&parts[0]==='scrypt-v1'&&saltPattern.test(parts[1])&&hashPattern.test(parts[2]);
 const salt=valid?parts[1]:'00000000000000000000000000000000';
 const expected=valid?Buffer.from(parts[2],'hex'):Buffer.alloc(64);
 const actual=scryptSync(password,Buffer.from(salt,'hex'),64,params);
 return valid&&timingSafeEqual(actual,expected);
}
