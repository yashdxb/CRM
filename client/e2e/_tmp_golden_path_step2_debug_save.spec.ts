import { test, expect } from '@playwright/test';
const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const OPPORTUNITY_ID = 'e1a04d46-4f50-4ec8-88a9-2573228d58bc';
async function apiLogin(page:any, request:any){ const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:EMAIL,password:PASSWORD}}); expect(r.ok()).toBeTruthy(); const b=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default')}, b.accessToken); }
test('debug opportunity save blocker', async ({page,request})=>{
 await apiLogin(page,request);
 await page.goto(`${UI}/app/opportunities/${OPPORTUNITY_ID}/edit`, { waitUntil:'domcontentloaded' });
 await page.locator('form.form-layout').waitFor({state:'visible'});
 await page.evaluate(()=>document.querySelector('vite-error-overlay')?.remove());
 page.on('response', async r=>{ if(r.url().includes('/api/opportunities/')) console.log('RESP', r.request().method(), r.status(), r.url()); });
 // fill minimal
 await page.locator('input[name="name"]').fill('Acme Industrial - Q2 Expansion');
 await page.locator('input[name="amount"]').first().fill('120000');
 await page.locator('textarea[name="summary"]').fill('Expansion rollout across two regions with phased onboarding and approval controls.');
 await page.locator('textarea[name="requirements"]').fill('Operational visibility, SLA tracking, approval controls, and phased rollout support.');
 await page.locator('textarea[name="buyingProcess"]').fill('Operations Director review followed by finance signoff and executive approval.');
 await page.locator('textarea[name="successCriteria"]').fill('Pilot go-live in 30 days and full rollout in 90 days with SLA compliance reporting.');
 const saveBtn = page.getByRole('button', { name: /Update opportunity/i }).first();
 console.log('BTN_DISABLED_BEFORE', await saveBtn.isDisabled());
 await saveBtn.click();
 await page.waitForTimeout(1200);
 console.log('BTN_DISABLED_AFTER', await saveBtn.isDisabled());
 const gate = await page.locator('.policy-gate-banner p').allTextContents().catch(()=>[]);
 console.log('POLICY_GATE_TEXT', JSON.stringify(gate));
 const toasts = await page.locator('.p-toast-message').allTextContents().catch(()=>[]);
 console.log('TOASTS', JSON.stringify(toasts));
 const closeVal = await page.locator('#oppClose').inputValue().catch(()=> '');
 const stageVal = await page.locator('#oppStage').inputValue().catch(()=> '');
 console.log('CLOSE_VAL', closeVal);
 console.log('STAGE_INPUT_VAL', stageVal);
 await page.screenshot({ path: 'client/output/playwright/golden-path-step2-debug-save.png', fullPage: true });
});
