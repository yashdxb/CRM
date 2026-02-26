import { test, expect } from '@playwright/test';
const UI='http://localhost:4201'; const API='http://127.0.0.1:5014'; const LEAD_ID='3b104395-182e-4836-8cce-ae2237928031';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const b=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default');},b.accessToken);} 
async function pick(page:any, rootSel:string, txt:string){ const root=page.locator(rootSel).first(); await root.click(); const opt=page.locator('.p-select-option,[role="option"]').filter({hasText:new RegExp(txt,'i')}).first(); await opt.click(); }

test('debug qualify update', async ({page,request})=>{
  page.on('request', r=>{ if(['PUT','POST'].includes(r.method()) && r.url().includes('/api/')) console.log('REQ', r.method(), r.url()); });
  page.on('response', async r=>{ if(['PUT','POST'].includes(r.request().method()) && r.url().includes('/api/')) console.log('RES', r.status(), r.request().method(), r.url()); });
  page.on('console', m=> console.log('CONSOLE', m.type(), m.text()));
  await login(page,request);
  await page.goto(`${UI}/app/leads/${LEAD_ID}/edit`, {waitUntil:'domcontentloaded'});
  await page.locator('form.lead-form').waitFor();
  await page.evaluate(()=>document.querySelector('vite-error-overlay')?.remove());
  await pick(page,'p-select[name="status"]','Qualified');
  const label = await page.locator('p-select[name="status"] .p-select-label').first().textContent().catch(()=>null);
  console.log('STATUS_LABEL', label);
  const btn = page.getByRole('button',{name:/Update lead/i}).first();
  console.log('BTN_DISABLED', await btn.isDisabled());
  await btn.click();
  await page.waitForTimeout(4000);
  const errs = await page.locator('.p-message,.field-error,.ng-invalid,.p-toast-message,.status-note').allTextContents().catch(()=>[]);
  console.log('TEXTS', JSON.stringify(errs));
  await page.screenshot({path:'client/output/playwright/debug-qualify-update-click.png', fullPage:true});
});
