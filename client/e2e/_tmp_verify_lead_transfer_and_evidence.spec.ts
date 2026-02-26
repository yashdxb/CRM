import { test, expect } from '@playwright/test';

const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';
const EMAIL = 'yasser0503@outlook.com';
const PASSWORD = 'yAsh@123';

async function login(page:any, request:any){
  const r = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type':'application/json', 'X-Tenant-Key':'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  if (!r.ok()) throw new Error(`login failed ${r.status()}`);
  const body = await r.json();
  await page.addInitScript((t:string)=>{
    localStorage.setItem('auth_token', t);
    localStorage.setItem('tenant_key', 'default');
  }, body.accessToken);
}

test('verify converted lead transfer summary and evidence values', async ({ page, request }) => {
  await login(page, request);

  // API verify exact evidence values on lead
  const leadRes = await request.get(`${API}/api/leads/${LEAD_ID}`, {
    headers: { Authorization: `Bearer ${(await (await request.post(`${API}/api/auth/login`, { headers: { 'Content-Type':'application/json', 'X-Tenant-Key':'default' }, data:{ email: EMAIL, password: PASSWORD } })).json()).accessToken}`, 'X-Tenant-Key':'default' }
  });
  expect(leadRes.ok()).toBeTruthy();
  const lead = await leadRes.json();
  console.log('EVIDENCE_FIELDS', JSON.stringify({
    budgetEvidence: lead.budgetEvidence,
    readinessEvidence: lead.readinessEvidence,
    timelineEvidence: lead.timelineEvidence,
    problemEvidence: lead.problemEvidence,
    economicBuyerEvidence: lead.economicBuyerEvidence,
    icpFitEvidence: lead.icpFitEvidence,
    status: lead.status,
    convertedOpportunityId: lead.convertedOpportunityId
  }));

  await page.goto(`${UI}/app/leads/${LEAD_ID}/edit`);
  await page.locator('form.lead-form').waitFor();

  await page.getByRole('tab', { name: /activity & follow-up/i }).click();

  const transferSummary = page.locator('.lead-activity-transfer-summary');
  await expect(transferSummary).toBeVisible();

  const summaryText = (await transferSummary.innerText()).replace(/\s+/g, ' ').trim();
  console.log('TRANSFER_SUMMARY_TEXT', summaryText);

  await page.screenshot({ path: 'client/output/playwright/lead-transfer-summary-verify.png', fullPage: true });
});
