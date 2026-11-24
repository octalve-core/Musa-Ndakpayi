import {neon} from '@neondatabase/serverless';
import {hashPassword} from '../lib/admin-password.mjs';
const url=process.env.DATABASE_URL;
const username=(process.env.ADMIN_SEED_USERNAME||'').toLowerCase().trim();
const password=process.env.ADMIN_SEED_PASSWORD||'';
if(!url||!/^[a-z0-9._-]{4,40}$/.test(username)||password.length<16){
 console.error('Seed requires DATABASE_URL, ADMIN_SEED_USERNAME (4–40 characters) and ADMIN_SEED_PASSWORD (16+ characters).');
 process.exit(1);
}
const sql=neon(url);
try{
 const exists=await sql.query("SELECT to_regclass('public.campaign_admins') AS table_name");
 if(!exists[0]?.table_name)throw new Error('Run scripts/schema.sql on the dedicated campaign database first');
 const hashed=hashPassword(password);
 const inserted=await sql.query("INSERT INTO campaign_admins(username,password_hash,must_change_password,active) VALUES($1,$2,TRUE,TRUE) ON CONFLICT(username) DO NOTHING RETURNING username",[username,hashed]);
 if(inserted.length)console.log('One super administrator created: '+username+'. Password rotation required on first login.');
 else console.log('Administrator already exists; existing credentials have NOT been overwritten.');
}catch(e){
 console.error('Seeding failed:',e instanceof Error?e.message:'Database not ready');
 process.exitCode=1;
}
