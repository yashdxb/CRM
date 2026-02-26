import { test, expect } from '@playwright/test';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';

async function login(page:any, request:any){
  const r = await request.post(`${API}/api/auth/login`, { headers:{'Content-Type':'application/json','X-Tenant-Key':'default'}, data:{email:EMAIL,password:PASSWORD} });
  expect(r.ok()).toBeTruthy(); const p = await r.json();
  await page.addInitScript((t:string)=>{localStorage.setItem('auth_token', t); localStorage.setItem('tenant_key','default');}, p.accessToken);
}
async function selectByLabel(page:any, hostSelector:string, optionText:string){
  const host = page.locator(hostSelector).first(); await host.waitFor({state:'visible'});
  const combo = host.locator('[role="combobox"]').first(); await combo.click();
  const option = page.getByRole('option', { name: new RegExp(optionText.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'i') }).first();
  await option.waitFor({state:'visible', timeout:10000});
  await option.click({force:true});
}

test('qualify and convert Nora lead', async ({page,request})=>{
  page.on('console', m=>{ const t=m.text(); if(m.type()==='error' && !t.includes('403')) console.log('CONSOLE_ERROR', t); });
  await login(page, request);
  await page.goto(`${UI}/app/leads/${LEAD_ID}/edit`, {waitUntil:'domcontentloaded'});
  await page.locator('form.lead-form').waitFor({state:'visible', timeout:20000});
  await page.evaluate(()=>document.querySelector('vite-error-overlay')?.remove());

  const qTab = page.getByRole('tab').filter({hasText:/Qualifications/i}).first();
  await qTab.click();

  // Qualification factors (ensure panel open)
  const factorsHeader = page.locator('p-accordion-header').filter({hasText:/Qualification factors/i}).first();
  const budgetHost = page.locator('p-select[name="budgetAvailability"]').first();
  if (!(await budgetHost.isVisible().catch(()=>false))) await factorsHeader.click({force:true});

  await selectByLabel(page,'p-select[name="budgetAvailability"]','Budget allocated and approved');
  await selectByLabel(page,'p-select[name="readinessToSpend"]','Internal decision in progress');
  await selectByLabel(page,'p-select[name="buyingTimeline"]','Decision date confirmed internally');
  await selectByLabel(page,'p-select[name="problemSeverity"]','Critical business impact');
  await selectByLabel(page,'p-select[name="economicBuyer"]','Buyer engaged in discussion');
  await selectByLabel(page,'p-select[name="icpFit"]','Strong ICP fit');

  const contextHeader = page.locator('p-accordion-header').filter({hasText:/Context & supporting notes/i}).first();
  const notes = page.locator('textarea[name="qualifiedNotes"]').first();
  if (!(await notes.isVisible().catch(()=>false))) await contextHeader.click({force:true});
  await notes.fill('Discovery completed. Buyer engaged, budget approved, and decision planning is in progress.');

  // Back to overview and set status Qualified
  const overviewTab = page.getByRole('tab').filter({hasText:/Overview/i}).first();
  await overviewTab.click();
  await selectByLabel(page,'p-select[name="status"]','Qualified');

  const updateWait = page.waitForResponse(r => r.url().includes(`/api/leads/${LEAD_ID}`) && r.request().method()==='PUT', {timeout:30000});
  await page.getByRole('button',{name:/Update lead/i}).first().click();
  const updateResp = await updateWait;
  console.log('UPDATE_STATUS', updateResp.status());
  if(!updateResp.ok()) console.log('UPDATE_BODY', await updateResp.text());
  expect(updateResp.ok()).toBeTruthy();

  // Convert
  const convertBtn = page.getByRole('button',{name:/Convert lead/i}).first();
  await expect(convertBtn).toBeEnabled();
  await convertBtn.click();
  await page.waitForURL(/\/app\/leads\/.*\/convert/, {timeout:15000});
  await page.locator('form.convert-form').waitFor({state:'visible', timeout:15000});

  const fillIfEmpty = async (sel:string, value:string) => {
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      const v = await loc.inputValue().catch(()=> '');
      if (!v.trim()) await loc.fill(value);
    }
  };
  await fillIfEmpty('input[name="opportunityName"]', 'Acme Industrial - Q2 Expansion');
  await fillIfEmpty('input[name="name"]', 'Acme Industrial - Q2 Expansion');
  await fillIfEmpty('input[name="amount"]', '120000');
  await fillIfEmpty('input[name="estimatedAmount"]', '120000');
  const desc = page.locator('textarea[name="summary"], textarea[name="description"]').first();
  if (await desc.count()) { const v=await desc.inputValue().catch(()=> ''); if (!v.trim()) await desc.fill('Expansion rollout across two regions with approval and SLA controls.'); }

  const convertRespWait = page.waitForResponse(r => r.url().includes('/convert') && r.request().method()==='POST', {timeout:30000});
  await page.locator('form.convert-form button:has-text("Convert lead")').click();
  const convertResp = await convertRespWait;
  console.log('CONVERT_STATUS', convertResp.status());
  const payload = await convertResp.json().catch(async()=>({raw: await convertResp.text()}));
  console.log('CONVERT_PAYLOAD', JSON.stringify(payload));
  expect(convertResp.ok()).toBeTruthy();

  await page.waitForURL(/\/app\/leads/);
  await page.screenshot({path:'client/output/playwright/lead-qualified-converted.png', fullPage:true});
});
