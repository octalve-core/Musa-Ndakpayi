import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const content=path=>readFileSync(resolve(root,path),'utf8');
test('public pages are implemented and never lead to a missing route',()=>{
 for(const page of ['page','about/page','platforms/page','manifesto/page','events/page','news/page','gallery/page','contact/page','privacy/page','terms/page','register/page','admin/login/page','admin/members/page']){
  assert.ok(existsSync(resolve(root,'app',page+'.tsx')),page+' missing');
 }
});
test('the nine priorities have distinct slugs and legislative pathways',()=>{
 const source=content('lib/content.ts');
 const matches=[...source.matchAll(/slug:'([^']+)'/g)].map(x=>x[1]);
 assert.equal(matches.length,9);
 assert.equal(new Set(matches).size,9);
 assert.match(source,/mechanisms:/);
});
test('the site never claims unverifiable campaign metrics or provides an unimplemented form',()=>{
 const home=content('app/page.tsx');
 const events=content('app/events/page.tsx');
 assert.doesNotMatch(home,/15,000 volunteers|500K supporters|100% victory/i);
 assert.doesNotMatch(events,/<form/);
});
test('no social handle, phone or email is invented in live metadata',()=>{
 const contact=content('app/contact/page.tsx');
 assert.doesNotMatch(contact,/@gmail.com|@yahoo.com|\+234\d{9}/);
});

test('agenda priority tabs expose URL anchor targets',()=>{
 const tabs=content('components/agenda/agenda-tabs.tsx');
 assert.match(tabs,/id=\{priority.slug\}/);
 assert.match(tabs,/hashchange/);
 assert.match(tabs,/aria-selected/);
});
test('events show no fabricated dates or nonfunctional filter pills',()=>{
 const events=content('app/events/page.tsx');
 assert.doesNotMatch(events,/Previous activities<\/span>/);
 assert.match(events,/Stay connected with our events/);
 assert.doesNotMatch(events,/<form/);
});
test('responsive browser checks cover all requested viewport widths',()=>{
 const suite=content('e2e/responsive.spec.ts');
 for(const width of [320,375,430,768,1024,1280,1440,1920])assert.match(suite,new RegExp('\\b'+width+'\\b'));
});

test('approved brand artwork replaces temporary text monograms without changing logo proportions',()=>{
 const header=content('components/layout/site-header.tsx');
 const footer=content('components/layout/site-footer.tsx');
 const layout=content('app/layout.tsx');
 assert.match(header,/src="\/brand\/mun-header\.png"/);
 assert.match(footer,/src="\/brand\/mun-footer-2027\.png"/);
 assert.match(layout,/url:'\/brand\/mun-icon\.png'/);
 assert.match(header,/object-contain/);
 assert.match(footer,/object-contain/);
 assert.doesNotMatch(header,/>MN<\/span>/);
 assert.doesNotMatch(footer,/>MN<\/span>/);
});

test('all three authentic PNG brand assets are present under public/brand',()=>{
 for(const name of ['mun-header.png','mun-footer-2027.png','mun-icon.png']){
  const path=resolve(root,'public','brand',name);
  assert.ok(existsSync(path),'Missing approved brand asset: '+name);
  const data=readFileSync(path);
  assert.deepEqual([...data.subarray(0,8)],[137,80,78,71,13,10,26,10],name+' is not PNG');
 }
});

test('candidate biography uses a finished public-facing voice and avoids invented achievements',()=>{
 const profile=content('lib/profile.ts');
 const about=content('app/about/page.tsx');
 assert.match(profile,/University of Abuja/);
 assert.match(profile,/Kaduna crisis/);
 assert.match(profile,/Edile Construction Company Limited/);
 assert.match(profile,/enterprise-support initiatives/);
 assert.match(about,/A graduate of Political Science from the University of Abuja/);
 assert.match(about,/His priorities for Chanchaga/);
 assert.doesNotMatch(about,/minister|governor|incumbent|has delivered [0-9]+|university professor/i);
});

test('campaign contact email is published as a working mailto link',()=>{
 const contact=content('app/contact/page.tsx');
 const footer=content('components/layout/site-footer.tsx');
 assert.match(contact,/mailto:info@musandakpayi\.com/);
 assert.match(contact,/info@musandakpayi\.com/);
 assert.match(footer,/mailto:info@musandakpayi\.com/);
});

test('public pages contain no draft biography qualifications or verification notices',()=>{
 const paths=[
  'app/page.tsx','app/about/page.tsx','app/platforms/page.tsx','app/manifesto/page.tsx',
  'app/events/page.tsx','app/gallery/page.tsx','app/contact/page.tsx','app/news/page.tsx',
  'app/privacy/page.tsx','components/layout/site-footer.tsx','components/agenda/agenda-tabs.tsx',
  'components/home/hero-carousel.tsx','lib/profile.ts'
 ];
 const text=paths.map(content).join('\n');
 const banned=[
  'The professional biography supplied for this website describes',
  'His supplied biography lists','The entries below follow the submitted biographical document',
  'The profile also lists','The biography describes','His submitted profile mentions',
  'await supporting verification','Policy options on this website are not presented',
  'Documented candidature on INEC','Public statements linked to their original reports',
  'Publication of a candidate-approved manifesto requires',
  'Only organiser-confirmed events will appear on this calendar',
  'No illustrative photographs are presented as evidence of an event',
  'Captions, permissions and sources are checked before publication',
  'Official campaign email, phone and office contact details will be displayed',
  'unverified contact information'
 ];
 for(const phrase of banned)assert.ok(!text.includes(phrase),'Public draft text remains: '+phrase);
});

test('Chanchaga electoral directory is complete and scoped to one constituency',()=>{
 const data=JSON.parse(content('data/chanchaga-polling-units.json'));
 assert.equal(data.lga,'Chanchaga');
 assert.equal(data.state,'Niger');
 assert.equal(data.wards.length,11);
 const units=data.wards.flatMap(w=>w.units);
 assert.equal(units.length,379);
 assert.equal(new Set(units.map(p=>p.code)).size,379);
 for(const ward of data.wards)for(const pu of ward.units)assert.ok(pu.code.startsWith('26/06/'+ward.code+'/'));
});

test('registration backend validates consent, location and server-side verification',()=>{
 const form=content('components/members/member-form.tsx');
 const route=content('app/api/members/route.ts');
 const gate=content('lib/member-registration.ts');
 assert.match(form,/membershipConsent/);
 assert.match(form,/communicationConsent:false/);
 assert.match(form,/turnstileToken/);
 assert.match(route,/verifyUnit/);
 assert.match(route,/verifyTurnstile/);
 assert.match(route,/getSql\(\)/);
 assert.match(gate,/MEMBERSHIP_OPEN/);
 assert.match(gate,/CRON_SECRET/);
});

test('private admin pages and one-time seed never contain a default password',()=>{
 for(const path of ['app/admin/login/page.tsx','app/admin/members/page.tsx','app/admin/change-password/page.tsx','scripts/seed-admin.mjs','app/api/admin/export/route.ts'])assert.ok(existsSync(resolve(root,path)));
 const seed=content('scripts/seed-admin.mjs');
 assert.match(seed,/ADMIN_SEED_PASSWORD/);
 assert.match(seed,/ON CONFLICT\(username\) DO NOTHING/);
 assert.doesNotMatch(seed,/superadmin123|password123|default123/i);
 const sessions=content('lib/admin-auth.ts');
 assert.match(sessions,/campaign_sessions/);
 assert.match(sessions,/SESSION_AGE/);
 assert.match(sessions,/httpOnly:true/);
});

test('clean water and inclusive belonging are separate manifesto priorities',()=>{
 const source=content('lib/content.ts');
 for(const phrase of ["slug:'water-access'","slug:'unity-in-diversity'","title:'Reliable water & water security'","title:'Unity in diversity & inclusion'"])assert.ok(source.includes(phrase),'Missing '+phrase);
 assert.match(source,/treatment capacity, pipeline repairs, pumping reliability/);
 assert.match(source,/national integration, equal treatment/);
 const platform=content('app/platforms/page.tsx');
 const manifesto=content('app/manifesto/page.tsx');
 assert.match(platform,/Nine priorities for Chanchaga/);
 assert.match(manifesto,/Nine connected priorities/);
 assert.doesNotMatch(platform,/Seven priorities/);
});

test('optional Turnstile never skips backend consent, field validation, spam protection and rate controls',()=>{
 const gate=content('lib/member-registration.ts');
 const form=content('components/members/member-form.tsx');
 const route=content('app/api/members/route.ts');
 const privacy=content('app/privacy/page.tsx');
 assert.match(gate,/TURNSTILE_ENABLED/);
 assert.match(gate,/!turnstileEnabled\(\)\|\|Boolean/);
 assert.match(gate,/turnstileToken:z\.string\(\)\.trim\(\)\.max\(2048\)\.default\(''\)/);
 assert.match(form,/siteKey&&<Script/);
 assert.match(form,/siteKey&&<div ref=\{widget\}/);
 assert.match(form,/if\(siteKey&&!token\)/);
 assert.match(route,/turnstileEnabled\(\)&&!await verifyTurnstile/);
 assert.match(route,/sameOrigin/);
 assert.match(route,/verifyUnit/);
 assert.match(route,/phoneRate/);
 assert.match(route,/kind,visitor_hash,window_start,attempts/);
 assert.match(route,/\('PHONE'/);
 assert.match(route,/if\(Number\(phoneRate\[0\]\?\.attempts\|\|0\)>3\)/);
 assert.match(form,/name="termsAgreement"/);
 assert.match(form,/adultConsent:raw\.get\('termsAgreement'\)==='on'/);
 assert.match(form,/membershipConsent:raw\.get\('termsAgreement'\)==='on'/);
 assert.doesNotMatch(form,/name="communicationConsent"/);
 assert.match(privacy,/Frankfurt, Germany/);
 assert.match(privacy,/What accepting the agreement means/);
});

test('one visible required registration agreement links to the full terms and privacy without marketing opt-in',()=>{
 const form=content('components/members/member-form.tsx');
 const schema=content('lib/member-registration.ts');
 const privacy=content('app/privacy/page.tsx');
 const terms=content('app/terms/page.tsx');
 const route=content('app/api/members/route.ts');
 const footer=content('components/layout/site-footer.tsx');
 assert.equal((form.match(/type="checkbox"/g)||[]).length,1,'The form must show only one consent checkbox in both self and assisted modes');
 assert.match(form,/name="termsAgreement"/);
 assert.match(form,/required type="checkbox" name="termsAgreement"/);
 assert.match(form,/href="\/terms"/);
 assert.match(form,/href="\/privacy"/);
 assert.match(form,/assistedConsent:method==='Assisted'&&raw\.get\('termsAgreement'\)==='on'/);
 assert.match(form,/adultConsent:raw\.get\('termsAgreement'\)==='on'/);
 assert.match(form,/membershipConsent:raw\.get\('termsAgreement'\)==='on'/);
 assert.match(form,/communicationConsent:false/);
 assert.match(schema,/adultConsent:z\.literal\(true\)/);
 assert.match(schema,/membershipConsent:z\.literal\(true\)/);
 assert.match(schema,/communicationConsent:z\.literal\(false\)\.default\(false\)/);
 assert.match(route,/d\.method==='Assisted'/);
 assert.match(route,/null,false,CONSENT_VERSION/);
 assert.match(privacy,/Political affiliation is sensitive personal information/);
 assert.match(privacy,/Frankfurt, Germany/);
 assert.match(terms,/explicitly consent/);
 assert.match(terms,/somebody else/);
 assert.match(terms,/does not authorise optional promotional calls/);
 assert.match(footer,/href="\/terms"/);
});

test('global header counts down to INEC House of Representatives election on 16 January 2027 WAT',()=>{
 const source=content('components/layout/election-countdown-strip.tsx');
 const header=content('components/layout/site-header.tsx');
 assert.match(header,/<ElectionCountdownStrip\/>/);
 assert.match(source,/2027-01-16T00:00:00\+01:00/);
 assert.match(source,/Date\.now\(\)/);
 assert.match(source,/setInterval\(refresh,1000\)/);
 assert.match(source,/clearInterval\(timer\)/);
 assert.match(source,/Math\.max\(0,Math\.floor/);
 assert.match(source,/Math\.floor\(seconds\/86400\)/);
 assert.match(source,/role="timer"/);
 assert.match(source,/time dateTime="2027-01-16"/);
 assert.match(source,/https:\/\/inecnigeria\.org\/elections\/calendar/);
 assert.match(source,/sm:hidden/);
});
