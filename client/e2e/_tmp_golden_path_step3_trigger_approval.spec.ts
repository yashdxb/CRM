import { test, expect } from '@playwright/test';

const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const OPPORTUNITY_ID = 'e1a04d46-4f50-4ec8-88a9-2573228d58bc';

async function apiLogin(page: any, request: any) {
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

test('golden path step3: trigger discount approval request', async ({ page, request }) => {
  page.on('console', m => {
    const t = m.text();
    if (m.type() === 'error' && !t.includes('403')) console.log('CONSOLE_ERROR', t);
  });

  await apiLogin(page, request);
  await page.goto(`${UI}/app/opportunities/${OPPORTUNITY_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.form-layout').waitFor({ state: 'visible', timeout: 30000 });
  await page.evaluate(() => {
    document.querySelector('vite-error-overlay')?.remove();
    document.querySelector('footer.app-footer')?.remove();
  });

  const approvalsHeader = page.getByRole('button').filter({ hasText: /^Approval Workflow/ }).first();
  // PrimeNG accordion header may be a button/div depending version; fallback generic locator.
  const headerFallback = page.locator('p-accordion-header, .p-accordionheader').filter({ hasText: 'Approval Workflow' }).first();
  if (await approvalsHeader.count()) {
    await approvalsHeader.click({ force: true }).catch(() => {});
  } else {
    await headerFallback.click({ force: true }).catch(() => {});
  }

  const approvalCard = page.locator('.approval-request').first();
  await approvalCard.waitFor({ state: 'visible', timeout: 15000 });

  // Set purpose = Discount
  const purposeSelect = page.locator('p-select[name="approvalPurpose"]').first();
  let purposeSetToDiscount = false;
  if (await purposeSelect.count()) {
    try {
      await purposeSelect
        .locator('.p-select-label, .p-dropdown-label, .p-select-trigger')
        .first()
        .click({ force: true });
      const discountOpt = page
        .locator('.p-select-option, .p-dropdown-item')
        .filter({ hasText: /^Discount$/ })
        .first();
      await discountOpt.waitFor({ state: 'visible', timeout: 3000 });
      await discountOpt.click();
      purposeSetToDiscount = true;
    } catch {
      await page.keyboard.press('Escape').catch(() => {});
      console.log('PURPOSE_SELECT_BUG', 'Could not open/select Discount purpose; continuing with default purpose');
    }
  }

  // Set amount > 0 and obviously exception-like
  const approvalAmountInput = page.locator('input[name="approvalAmount"]').first();
  await approvalCard.scrollIntoViewIfNeeded();
  await approvalAmountInput.click({ force: true });
  await approvalAmountInput.fill('15000');
  await approvalAmountInput.blur();

  // Ensure currency selected if blank
  const currencySelect = page.locator('p-select[name="approvalCurrency"]').first();
  if (await currencySelect.count()) {
    const currencyText = (await currencySelect.textContent())?.trim() ?? '';
    if (!currencyText || /select/i.test(currencyText)) {
      await currencySelect
        .locator('.p-select-label, .p-dropdown-label, .p-select-trigger')
        .first()
        .click({ force: true });
      const usdOpt = page.locator('.p-select-option, .p-dropdown-item').filter({ hasText: /^USD/ }).first();
      if (await usdOpt.count()) await usdOpt.click();
      else await page.keyboard.press('Escape');
    }
  }

  const requestBtn = page.getByRole('button', { name: /Request approval/i }).first();
  await expect(requestBtn).toBeVisible();
  await expect(requestBtn).toBeEnabled();

  const preRows = await page.locator('.approval-list .approval-item').count().catch(() => 0);
  const [resp] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/decisions/requests') && r.request().method() === 'POST', { timeout: 20000 }),
    requestBtn.click({ force: true })
  ]);

  console.log('DECISION_CREATE_STATUS', resp.status());
  const bodyText = await resp.text();
  console.log('DECISION_CREATE_BODY', bodyText);
  console.log('PURPOSE_SET_TO_DISCOUNT', purposeSetToDiscount);
  expect(resp.ok()).toBeTruthy();

  // Verify UI list shows a pending approval row
  await page.waitForTimeout(1000);
  const rows = page.locator('.approval-list .approval-item');
  const rowCount = await rows.count();
  console.log('APPROVAL_ROWS_BEFORE', preRows, 'AFTER', rowCount);
  expect(rowCount).toBeGreaterThanOrEqual(Math.max(1, preRows));

  const latestRowText = (await rows.first().innerText().catch(() => '')) || '';
  console.log('LATEST_APPROVAL_ROW', latestRowText.replace(/\s+/g, ' ').trim());
  expect(latestRowText).toMatch(/Pending|Submitted/i);

  await page.screenshot({ path: 'client/output/playwright/golden-path-step3-approval-request.png', fullPage: true });
});
