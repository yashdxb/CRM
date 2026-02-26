import { test } from '@playwright/test';
const API='http://127.0.0.1:5014'; const BASE='http://localhost:4201';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t)=>{localStorage.setItem('auth_token',t as string); localStorage.setItem('tenant_key','default');},p.accessToken);} 

test('debug qualification select', async ({page,request})=>{
 await login(page,request);
 await page.goto(`${BASE}/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit`,{waitUntil:'domcontentloaded'});
 await page.locator('form.lead-form').waitFor();
 await page.getByRole('tab', {name:/Qualifications/i}).click();
 const budget = page.locator('p-select[name="budgetAvailability"]');
 if (!(await budget.isVisible().catch(()=>false))) await page.locator('p-accordion-header').filter({hasText:/Qualification factors/i}).first().click({force:true});
 await budget.waitFor({state:'visible'});
 await budget.click({force:true});
 await page.waitForTimeout(500);
 const visibleOptions = await page.evaluate(() => Array.from(document.querySelectorAll('*')).filter((el:any)=>{
   const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && el.textContent && /Budget allocated and approved|Unknown \/ not yet discussed/.test(el.textContent);
 }).slice(0,20).map((el:any)=>({tag:el.tagName, cls:el.className, text:(el.textContent||'').trim().slice(0,120)})));
 console.log('VISIBLE_MATCHES=', JSON.stringify(visibleOptions));
 console.log('ALL_OPTION_CLASSES=', await page.evaluate(()=>Array.from(document.querySelectorAll('[class]')).map((e:any)=>e.className).filter((c:string)=>c.includes('option')).slice(0,80)));
 await page.screenshot({path:'output/playwright/debug-qualification-select.png', fullPage:true});
});
