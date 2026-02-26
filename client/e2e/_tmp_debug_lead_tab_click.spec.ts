import { test } from '@playwright/test';
const API='http://127.0.0.1:5014'; const BASE='http://localhost:4201';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t)=>{localStorage.setItem('auth_token',t as string); localStorage.setItem('tenant_key','default');},p.accessToken);} 

test('debug lead tabs', async ({page,request})=>{
 await login(page,request);
 await page.goto(`${BASE}/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit`,{waitUntil:'domcontentloaded'});
 await page.locator('form.lead-form').waitFor();
 const tabs = page.locator('.lead-tabs .lead-tab');
 console.log('TAB_COUNT=', await tabs.count());
 for (let i=0;i<await tabs.count();i++){ console.log('TAB',i, await tabs.nth(i).innerText()); }
 const html = await page.locator('.lead-tabs').innerHTML();
 console.log('TABS_HTML=', html.slice(0,1500));
 await tabs.nth(2).click({force:true});
 await page.waitForTimeout(500);
 const visiblePanels = await page.evaluate(() => Array.from(document.querySelectorAll('p-tabpanel')).map((el:any)=>({v:el.getAttribute('value'), hidden: getComputedStyle(el).display==='none' || el.hasAttribute('hidden'), rect: el.getBoundingClientRect().height})).filter(x=>!x.hidden && x.rect>0));
 console.log('VISIBLE_PANELS=', JSON.stringify(visiblePanels));
 await page.screenshot({path:'output/playwright/lead-tab-debug.png', fullPage:true});
});
