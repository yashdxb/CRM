import { test, expect } from '@playwright/test';

const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';

async function login(page: any, request: any) {
  const r = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(r.ok()).toBeTruthy();
  const body = await r.json();
  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, body.accessToken);
}

test('upload supporting documents to existing lead', async ({ page, request }) => {
  await login(page, request);
  page.on('console', m => {
    const t = m.text();
    if (m.type() === 'error' && !t.includes('403')) console.log('CONSOLE_ERROR', t);
  });

  await page.goto(`${UI}/app/leads/${LEAD_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

  // Remove transient Vite overlay if it appears (dev server only)
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());

  const docsTab = page.getByRole('tab').filter({ hasText: /Supporting\s*Documents/i }).first();
  await expect(docsTab).toBeVisible();
  try {
    await docsTab.click({ timeout: 5000 });
  } catch {
    await docsTab.evaluate((el: any) => el.click());
  }

  const uploader = page.locator('.supporting-documents-uploader');
  await expect(uploader).toBeVisible({ timeout: 10000 });

  const fileInput = page.locator('.supporting-documents-uploader input[type="file"]').first();
  await expect(fileInput).toBeAttached();

  const targetNames = ['Acme Discovery Notes.pdf', 'Acme Requirements Checklist.pdf'];
  const targetPaths = ['/tmp/crm-golden-docs/Acme Discovery Notes.pdf', '/tmp/crm-golden-docs/Acme Requirements Checklist.pdf'];

  for (let i = 0; i < targetNames.length; i++) {
    const already = await page.getByText(targetNames[i], { exact: true }).count();
    if (already > 0) {
      console.log('ALREADY_PRESENT', targetNames[i]);
      continue;
    }
    const uploadResp = page.waitForResponse(r => r.url().includes('/api/attachments') && r.request().method() === 'POST', { timeout: 20000 });
    await fileInput.setInputFiles(targetPaths[i]);
    const res = await uploadResp;
    console.log('UPLOAD_STATUS', targetNames[i], res.status());
    expect(res.ok()).toBeTruthy();
    await expect(page.getByText(targetNames[i], { exact: true })).toBeVisible({ timeout: 10000 });
  }

  const rows = await page.locator('.docs-table tbody tr').count();
  const usage = (await page.locator('.docs-usage-pill').first().textContent())?.trim();
  console.log('DOC_ROWS', rows);
  console.log('DOC_USAGE', usage);

  await page.screenshot({ path: 'client/output/playwright/lead-supporting-docs-uploaded.png', fullPage: true });
});
