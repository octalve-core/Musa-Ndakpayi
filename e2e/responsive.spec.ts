import {test,expect} from '@playwright/test';

const widths=[320,375,430,768,1024,1280,1440,1920] as const;
const pages=['/','/about','/platforms','/manifesto','/events','/news','/gallery','/contact','/privacy','/terms','/register'] as const;

for(const width of widths){
 test('responsive pages have no horizontal document overflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:900});
  for(const path of pages){
   await page.goto(path,{waitUntil:'domcontentloaded'});
   await expect(page.locator('main h1').first()).toBeVisible();
   const docWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
   expect(docWidth,'Document overflow on '+path+' at '+width+'px').toBeLessThanOrEqual(width+1);
   if(path==='/'){
    await page.screenshot({path:'test-results/home-'+width+'.png',fullPage:true,animations:'disabled'});
   }
   if(path==='/about'&&(width===375||width===1440)){
    await page.screenshot({path:'test-results/about-'+width+'.png',fullPage:true,animations:'disabled'});
   }
  }
 });
}

test('small-screen navigation opens, navigates and closes',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto('/');
 const toggle=page.getByRole('button',{name:'Open navigation'});
 await expect(toggle).toBeVisible();
 await toggle.click();
 await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeVisible();
 await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Legislative Agenda'}).click();
 await expect(page).toHaveURL(/\/manifesto$/);
 await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeHidden();
});

test('mobile navigation can close with Escape and return focus to toggle',async({page})=>{
 await page.setViewportSize({width:320,height:720});
 await page.goto('/');
 await page.getByRole('button',{name:'Open navigation'}).click();
 await page.getByRole('button',{name:'Close navigation'}).press('Escape');
 await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeHidden();
 await expect(page.getByRole('button',{name:'Open navigation'})).toBeFocused();
});

test('agenda opens deep-linked priority and supports arrow-key navigation',async({page})=>{
 await page.goto('/manifesto#floods');
 const selected=page.getByRole('tab',{name:/Flood resilience/});
 await expect(selected).toHaveAttribute('aria-selected','true');
 await expect(page.getByRole('tabpanel')).toContainText('Flood resilience & safer communities');
 await selected.focus();
 await selected.press('ArrowRight');
 await expect(page.getByRole('tab',{name:/Roads & public infrastructure/})).toHaveAttribute('aria-selected','true');
 await expect(page).toHaveURL(/#infrastructure$/);
 await page.reload();
 await expect(page.getByRole('tab',{name:/Roads & public infrastructure/})).toHaveAttribute('aria-selected','true');
});

test('search filters sourced public records locally',async({page})=>{
 await page.goto('/news');
 const search=page.getByRole('searchbox',{name:'Search updates'});
 await search.fill('custodial');
 await expect(page.locator('main article')).toHaveCount(1);
 await search.fill('text that is not published');
 await expect(page.getByText('No updates match those filters.')).toBeVisible();
});

test('approved MUN header and footer logos load without distortion',async({page,request})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto('/');
 const header=page.getByRole('img',{name:'Musa Usman Ndakpayi campaign logo'});
 await expect(header).toBeVisible();
 await expect.poll(()=>header.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 const footer=page.getByRole('img',{name:'Musa Usman Ndakpayi 2027 campaign logo'});
 await footer.scrollIntoViewIfNeeded();
 await expect(footer).toBeVisible();
 await expect.poll(()=>footer.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 for(const name of ['mun-header.png','mun-footer-2027.png','mun-icon.png']){
  const response=await request.get('/brand/'+name);
  expect(response.ok(),'Failed to load '+name).toBeTruthy();
  expect(response.headers()['content-type']).toContain('image/png');
 }
});

test('biography page presents education, career and community sections professionally',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto('/about');
 await expect(page.getByRole('heading',{name:'About Musa Usman Ndakpayi'})).toBeVisible();
 await expect(page.getByText('B.Sc. in Political Science',{exact:true})).toBeVisible();
 await expect(page.getByText('Edile Construction Company Limited',{exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Community initiatives and voluntary interests'})).toBeVisible();
 await expect(page.getByText(/Ndakpayi has supported enterprise-oriented activities/)).toBeVisible();
 await expect(page.getByRole('link',{name:'His priorities for Chanchaga'})).toHaveAttribute('href','/platforms');
});

test('campaign contact email opens an email composer and draft notices are absent',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto('/contact');
 await expect(page.locator('main').getByRole('link',{name:'info@musandakpayi.com'})).toHaveAttribute('href','mailto:info@musandakpayi.com');
 await expect(page.getByRole('link',{name:'Send an email'})).toHaveAttribute('href','mailto:info@musandakpayi.com');
 await expect(page.getByText(/No unverified contact information is published/)).toHaveCount(0);
 await page.goto('/about');
 await expect(page.getByText(/professional document supplied|await supporting verification/)).toHaveCount(0);
});

test('gallery index supports uploaded albums, unique cards and full-image modal',async({page})=>{
 await page.goto('/gallery');
 await expect(page.getByRole('heading',{name:'Campaign gallery'})).toBeVisible();
 const albumCards=page.locator('a[href^="/gallery/"]');
 if(await albumCards.count()){
  await expect(page.getByRole('heading',{name:'Explore our moments'})).toBeVisible();
  await albumCards.first().click();
  const photos=page.getByRole('button',{name:/^View photo [0-9]+ of [0-9]+ in /});
  await expect(photos.first()).toBeVisible();
  const count=await photos.count();
  expect(count).toBeGreaterThan(0);
  await photos.first().click();
  await expect(page.getByRole('dialog',{name:/photo viewer/})).toBeVisible();
  await page.getByRole('button',{name:'Close photo viewer'}).click();
  await expect(page.getByRole('dialog',{name:/photo viewer/})).toHaveCount(0);
 }else{
  await expect(page.getByRole('heading',{name:'Campaign photographs'})).toBeVisible();
 }
 await expect(page.getByText(/Minna City Gate photograph/)).toHaveCount(0);
});

test('membership registration fails closed without Neon and Turnstile',async({page,request})=>{
 await page.goto('/register');
 await expect(page.getByRole('heading',{name:'Become a member'})).toBeVisible();
 await expect(page.getByText(/Online registration is not currently open/)).toBeVisible();
 const response=await request.post('/api/members',{data:{fullName:'Example Member'}});
 expect(response.status()).toBe(503);
});

test('private administrator login accepts no assumed credentials',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto('/admin/login');
 await expect(page.getByRole('heading',{name:'Admin sign in'})).toBeVisible();
 await expect(page.getByLabel('Username')).toBeVisible();
 await expect(page.getByLabel('Password',{exact:true})).toHaveAttribute('type','password');
 await page.getByRole('button',{name:'Show password'}).click();
 await expect(page.getByLabel('Password',{exact:true})).toHaveAttribute('type','text');
 await page.goto('/admin/members');
 await expect(page).toHaveURL(/\/admin\/login$/);
});

test('nine manifesto priorities include deep links for water and community inclusion',async({page})=>{
 await page.goto('/platforms');
 await expect(page.getByRole('heading',{name:'Nine priorities for Chanchaga'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Reliable water & water security'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Unity in diversity & inclusion'})).toBeVisible();
 await page.goto('/manifesto#water-access');
 await expect(page.getByRole('tab',{name:/Reliable water & water security/})).toHaveAttribute('aria-selected','true');
 await expect(page.getByRole('tabpanel')).toContainText('treatment capacity, pipeline repairs');
 await page.goto('/manifesto#unity-in-diversity');
 await expect(page.getByRole('tab',{name:/Unity in diversity & inclusion/})).toHaveAttribute('aria-selected','true');
 await expect(page.getByRole('tabpanel')).toContainText('national integration, equal treatment');
});

test('registration shows one clear agreement and links to terms and privacy when enabled',async({page})=>{
 await page.goto('/register');
 const form=page.locator('form');
 if(await form.count()===0){
  await expect(page.getByText(/Online registration is not currently open/)).toBeVisible();
  return;
 }
 await expect(form.locator('input[type="checkbox"]')).toHaveCount(1);
 await expect(page.getByRole('checkbox',{name:/I agree to the Terms and Conditions and Privacy Notice/i})).not.toBeChecked();
 await expect(form.getByRole('link',{name:'Terms & Conditions'})).toHaveAttribute('href','/terms');
 await expect(form.getByRole('link',{name:'Privacy Notice'})).toHaveAttribute('href','/privacy');
 await page.getByRole('radio',{name:'Assisted registration'}).check();
 await expect(form.locator('input[type="checkbox"]')).toHaveCount(1);
 await expect(page.getByText(/member is 18 or older and explicitly authorised/)).toBeVisible();
 await page.getByRole('link',{name:'Terms & Conditions'}).first().click();
 await expect(page).toHaveURL(/\/terms$/);
 await expect(page.getByRole('heading',{name:'Terms & Conditions'})).toBeVisible();
});
