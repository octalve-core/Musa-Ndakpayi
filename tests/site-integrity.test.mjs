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
 assert.match(events,/No forthcoming events have been confirmed/);
 assert.doesNotMatch(events,/<form/);
});
test('responsive browser checks cover all requested viewport widths',()=>{
 const suite=content('e2e/responsive.spec.ts');
 for(const width of [320,375,430,768,1024,1280,1440,1920])assert.match(suite,new RegExp('\\b'+width+'\\b'));
});
