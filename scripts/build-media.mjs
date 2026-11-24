import {readdirSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const publicDir=resolve(process.env.MEDIA_PUBLIC_DIR||join(root,'public'));
const output=resolve(process.env.MEDIA_OUTPUT||join(root,'data','media.generated.json'));
const extensions=new Set(['.jpg','.jpeg','.png','.webp','.avif']);
const allowedName=/^[a-zA-Z0-9][\w .()'-]*$/;
const slugOf=name=>name.toLowerCase().replace(/['’]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const titleOf=name=>name.replace(/[-_]+/g,' ').replace(/\s+/g,' ').trim().toLowerCase().split(' ').map((word,i)=>i>0&&['a','an','and','at','by','for','from','in','of','on','the','to','with'].includes(word)?word:word.charAt(0).toUpperCase()+word.slice(1)).join(' ');
const url=(...segments)=>'/'+segments.map(s=>encodeURIComponent(s)).join('/');
const listImages=folder=>existsSync(folder)?readdirSync(folder,{withFileTypes:true})
 .filter(e=>e.isFile()&&allowedName.test(e.name)&&extensions.has(e.name.toLowerCase().match(/\.[^.]+$/)?.[0]||''))
 .map(e=>e.name).sort((a,b)=>a.localeCompare(b,'en',{numeric:true})).slice(0,1000):[];
const hero=[1,2,3].map(number=>{
 const file='slide-'+String(number).padStart(2,'0')+'.webp';
 return existsSync(join(publicDir,'images','hero',file))?url('images','hero',file):null;
});
const candidate=existsSync(join(publicDir,'images','candidate','candidate-portrait.webp'))?url('images','candidate','candidate-portrait.webp'):null;
const dir=join(publicDir,'gallery');
const groups=existsSync(dir)?readdirSync(dir,{withFileTypes:true}).filter(d=>d.isDirectory()&&allowedName.test(d.name)).sort((a,b)=>a.name.localeCompare(b.name,'en')):[];
const slugs=new Set();
const albums=groups.flatMap(group=>{
 const slug=slugOf(group.name);
 if(!slug||slugs.has(slug))throw new Error('Duplicate or empty gallery slug: '+group.name);
 slugs.add(slug);
 const names=listImages(join(dir,group.name));
 if(names.length===0)return [];
 const photos=names.map(name=>({src:url('gallery',group.name,name),alt:titleOf(group.name)+' — campaign photograph'}));
 // Stable shuffle: four varied photographs per album without changing on every page load.
 const seed=[...group.name].reduce((n,char)=>Math.imul(n^char.charCodeAt(0),16777619)>>>0,2166136261);
 const preview=photos.map((_,i)=>i).sort((a,b)=>{
  const score=index=>Math.imul((index+1)^seed,2654435761)>>>0;
  return score(a)-score(b);
 }).slice(0,4).map(index=>photos[index]);
 while(preview.length<4)preview.push(photos[preview.length%photos.length]);
 return [{slug,title:titleOf(group.name),count:photos.length,preview,photos}];
});
const manifest={hero,candidate,albums};
mkdirSync(resolve(output,'..'),{recursive:true});
writeFileSync(output,JSON.stringify(manifest,null,2)+'\n');
console.log('Media index generated: '+hero.filter(Boolean).length+' hero photos, '+(candidate?1:0)+' portrait, '+albums.length+' albums, '+albums.reduce((n,a)=>n+a.count,0)+' gallery photos');
