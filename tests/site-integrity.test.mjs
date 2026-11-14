import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const content=path=>readFileSync(resolve(root,path),'utf8');
test('public pages are implemented and never lead to a missing route',()=>{
 for(const page of ['page','about/page','platforms/page','manifesto/page','events/page','news/page','gallery/page','contact/page','privacy/page']){
  assert.ok(existsSync(resolve(root,'app',page+'.tsx')),page+' missing');
 }
});
test('the seven priorities have distinct slugs and legislative pathways',()=>{
 const source=content('lib/content.ts');
 const matches=[...source.matchAll(/slug:'([^']+)'/g)].map(x=>x[1]);
 assert.equal(matches.length,7);
 assert.equal(new Set(matches).size,7);
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
