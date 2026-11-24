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
  assert.equal(a.title,'Visit to Prisoners');
  assert.equal(a.photos.length,5);
  assert.equal(a.preview.length,4);
  assert.ok(a.photos.find(p=>p.src.includes('DSC%2002.jpg')));
  assert.ok(a.photos.every(p=>!p.src.includes('README')));
  assert.deepEqual(data.albums.find(x=>x.slug==='healthcare-outreach').preview.length,4);
 }finally{rmSync(temp,{recursive:true,force:true});}
});

test('17 pictures produce exactly 17 unique cards with four different cover photos',()=>{
 const temp=mkdtempSync(join(tmpdir(),'mun-gallery-17-'));
 try{
  const publicDir=join(temp,'public'),out=join(temp,'manifest.json');
  const folder=join(publicDir,'gallery','visit-to-prisoners');
  mkdirSync(folder,{recursive:true});
  for(let index=1;index<=17;index++){
   writeFileSync(join(folder,'IMG_'+String(index).padStart(4,'0')+'.jpg'),'simulated photo '+index);
  }
  const run=spawnSync(process.execPath,[join(root,'scripts','build-media.mjs')],{env:{...process.env,MEDIA_PUBLIC_DIR:publicDir,MEDIA_OUTPUT:out},encoding:'utf8'});
  assert.equal(run.status,0,run.stderr);
  const albums=JSON.parse(readFileSync(out,'utf8')).albums;
  assert.equal(albums.length,1);
  const album=albums[0];
  assert.equal(album.title,'Visit to Prisoners');
  assert.equal(album.count,17);
  assert.equal(album.photos.length,17,'one distinct card per original photo');
  assert.equal(new Set(album.photos.map(photo=>photo.src)).size,17,'no duplicated photos in the individual gallery');
  assert.equal(new Set(album.photos.map(photo=>photo.alt)).size,17,'distinguishable image descriptions');
  assert.equal(album.preview.length,4);
  assert.equal(new Set(album.preview.map(photo=>photo.src)).size,4,'four unique photos in album cover');
  const ui=readFileSync(join(root,'components/gallery/photo-lightbox.tsx'),'utf8');
  assert.match(ui,/photos\.map\(\(photo,i\)=>/);
  assert.match(ui,/aspect-\[4\/3\]/);
  assert.match(ui,/object-cover/);
  assert.match(ui,/object-contain/);
  assert.match(ui,/Close photo viewer/);
  assert.match(ui,/Dismiss viewer background/);
 }finally{rmSync(temp,{recursive:true,force:true});}
});
test('original JPEG and PNG homepage photos are supported without manual conversion',()=>{
 const temp=mkdtempSync(join(tmpdir(),'mun-native-photo-'));
 try{
  const publicDir=join(temp,'public'),out=join(temp,'manifest.json');
  mkdirSync(join(publicDir,'images','hero'),{recursive:true});
  mkdirSync(join(publicDir,'images','candidate'),{recursive:true});
  writeFileSync(join(publicDir,'images','hero','slide-01.jpg'),'sample');
  writeFileSync(join(publicDir,'images','hero','slide-02.png'),'sample');
  writeFileSync(join(publicDir,'images','hero','slide-03.webp'),'sample');
  writeFileSync(join(publicDir,'images','candidate','candidate-portrait.jpg'),'sample');
  const run=spawnSync(process.execPath,[join(root,'scripts','build-media.mjs')],{env:{...process.env,MEDIA_PUBLIC_DIR:publicDir,MEDIA_OUTPUT:out},encoding:'utf8'});
  assert.equal(run.status,0,run.stderr);
  const parsed=JSON.parse(readFileSync(out,'utf8'));
  assert.deepEqual(parsed.hero,['/images/hero/slide-01.jpg','/images/hero/slide-02.png','/images/hero/slide-03.webp']);
  assert.equal(parsed.candidate,'/images/candidate/candidate-portrait.jpg');
 }finally{rmSync(temp,{recursive:true,force:true});}
});
