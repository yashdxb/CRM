import { test } from '@playwright/test';
const API='http://127.0.0.1:5014'; const BASE='http://localhost:4201';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t)=>{localStorage.setItem('auth_token',t as string); localStorage.setItem('tenant_key','default');},p.accessToken);} 

test('debug budget combobox open', async ({page,request})=>{
 await login(page,request);
 await page.goto(`${BASE}/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit`,{waitUntil:'domcontentloaded'});
 await page.locator('form.lead-form').waitFor();
 await page.getByRole('tab', {name:/Qualifications/i}).click();
 const host = page.locator('p-select[name="budgetAvailability"]');
 await host.waitFor();
 const combo = host.locator('[role="combobox"]').first();
 console.log('COMBO_COUNT=', await combo.count());
 console.log('COMBO_HTML=', await combo.evaluate((el:any)=>el.outerHTML));
 await combo.click({force:true});
 await page.waitForTimeout(500);
 console.log('ARIA_EXPANDED_AFTER_CLICK=', await combo.getAttribute('aria-expanded'));
 const dropdownBtn = host.locator('.p-select-dropdown, .p-select-trigger').first();
 console.log('TRIGGER_COUNT=', await dropdownBtn.count());
 if (await dropdownBtn.count()) {
   await dropdownBtn.click({force:true});
   await page.waitForTimeout(500);
   console.log('ARIA_EXPANDED_AFTER_TRIGGER=', await combo.getAttribute('aria-expanded'));
 }
 await combo.focus();
 await page.keyboard.press('ArrowDown');
 await page.waitForTimeout(500);
 console.log('ARIA_EXPANDED_AFTER_KEY=', await combo.getAttribute('aria-expanded'));
 const visibleTexts = await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter((el:any)=>{
   const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && (el.textContent||'').includes('Budget allocated and approved');
 }).map((el:any)=>({tag:el.tagName, cls:String(el.className||''), text:(el.textContent||'').trim().slice(0,200)})).slice(0,10));
 console.log('VISIBLE_BUDGET_MATCHES=', JSON.stringify(visibleTexts));
 await page.screenshot({path:'output/playwright/debug-budget-combo.png', fullPage:true});
});
