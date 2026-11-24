import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
test('gallery auto-discovers folders and preserves original image filenames without manual metadata',()=>{
 const temp=mkdtempSync(join(tmpdir(),'mun-gallery-'));
 try{
  const publicDir=join(temp,'public'),out=join(temp,'manifest.json');
  mkdirSync(join(publicDir,'gallery','visit-to-prisoners'),{recursive:true});
  mkdirSync(join(publicDir,'gallery','healthcare-outreach'),{recursive:true});
  mkdirSync(join(publicDir,'images','hero'),{recursive:true});
  mkdirSync(join(publicDir,'images','candidate'),{recursive:true});
  for(const filename of ['DSC 02.jpg','IMG_001.webp','portrait-01.png','another.jpeg','last.avif']){
   writeFileSync(join(publicDir,'gallery','visit-to-prisoners',filename),'mock picture content');
  }
  writeFileSync(join(publicDir,'gallery','visit-to-prisoners','README.md'),'not a photo');
  writeFileSync(join(publicDir,'gallery','healthcare-outreach','photo.webp'),'mock');
  writeFileSync(join(publicDir,'images','hero','slide-01.webp'),'mock');
  writeFileSync(join(publicDir,'images','candidate','candidate-portrait.webp'),'mock');
  const run=()=>spawnSync(process.execPath,[join(root,'scripts','build-media.mjs')],{env:{...process.env,MEDIA_PUBLIC_DIR:publicDir,MEDIA_OUTPUT:out},encoding:'utf8'});
  assert.equal(run().status,0);
  const first=readFileSync(out,'utf8');
  assert.equal(run().status,0);
  assert.equal(readFileSync(out,'utf8'),first,'Image selection changes between identical builds');
  const data=JSON.parse(first);
  assert.deepEqual(data.hero,['/images/hero/slide-01.webp',null,null]);
  assert.equal(data.candidate,'/images/candidate/candidate-portrait.webp');
  assert.equal(data.albums.length,2);
  const a=data.albums.find(x=>x.slug==='visit-to-prisoners');
  assert.equal(a.title,'Visit To Prisoners');
  assert.equal(a.photos.length,5);
  assert.equal(a.preview.length,4);
  assert.ok(a.photos.find(p=>p.src.includes('DSC%2002.jpg')));
  assert.ok(a.photos.every(p=>!p.src.includes('README')));
  assert.deepEqual(data.albums.find(x=>x.slug==='healthcare-outreach').preview.length,4);
 }finally{rmSync(temp,{recursive:true,force:true});}
});
