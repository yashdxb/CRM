import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const LEO_EMAIL = 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_LEO_PASSWORD ?? 'yAsh@123';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';
const LEAD_LABEL = 'Acme Industrial Services';

async function apiLogin(page: any, request: any) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: LEO_EMAIL, password: PASSWORD }
  });
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken as string);
  return payload.accessToken as string;
}

async function openSelect(page: any, selector: string) {
  const host = page.locator(selector);
  await host.waitFor({ state: 'visible' });
  const trigger = host.locator('.p-select');
  if (await trigger.count()) await trigger.click();
  else await host.click();
}

async function chooseOption(page: any, selector: string, text: string) {
  await openSelect(page, selector);
  const option = page.locator('.p-select-panel .p-select-item, [role="option"]').filter({ hasText: text }).first();
  await option.waitFor({ state: 'visible' });
  await option.click({ force: true });
}

async function setDateInputByOffset(page: any, selector: string, offsetDays = 0) {
  const input = page.locator(`${selector} input`);
  await input.waitFor({ state: 'visible' });
  await input.click();

  const target = new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000);
  const targetDay = target.getDate();
  const targetMonth = target.getMonth();
  const targetYear = target.getFullYear();

  const calendarDialog = page.getByRole('dialog', { name: 'Choose Date' }).last();
  await calendarDialog.waitFor({ state: 'visible' });

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  for (let i = 0; i < 12; i += 1) {
    const monthText = (await calendarDialog.locator('button[aria-label="Choose Month"]').innerText()).trim();
    const yearText = (await calendarDialog.locator('button[aria-label="Choose Year"]').innerText()).trim();
    if (monthNames.indexOf(monthText) === targetMonth && Number(yearText) === targetYear) {
      break;
    }
    await calendarDialog.getByRole('button', { name: 'Next Month' }).click();
    await page.waitForTimeout(120);
  }

  await calendarDialog.getByRole('gridcell', { name: String(targetDay) }).first().click();
  await input.press('Tab');
}

test('create discovery meeting for Acme lead (Leo)', async ({ page, request, baseURL }) => {
  test.setTimeout(120_000);
  const consoleErrors: string[] = [];
  const apiFailures: Array<{ url: string; status: number }> = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('response', async (resp) => {
    if (resp.url().includes('/api/') && resp.status() >= 400) {
      apiFailures.push({ url: resp.url(), status: resp.status() });
    }
  });

  await apiLogin(page, request);

  const uiBase = baseURL ?? 'http://localhost:4201';
  await page.goto(`${uiBase}/app/activities/new`);
  await page.waitForURL('**/app/activities/new');

  const suffix = Date.now();
  const subject = `Discovery meeting - Acme expansion (${suffix})`;

  await page.locator('input[name="subject"]').fill(subject);
  await chooseOption(page, 'p-select[name="type"]', 'Meeting');
  await chooseOption(page, 'p-select[name="status"]', 'Completed');

  // Due and completed dates help downstream qualification/readability.
  await setDateInputByOffset(page, 'p-datePicker[name="dueDateUtc"]', 0);
  const completedPicker = page.locator('p-datepicker[name="completedDateUtc"], p-datePicker[name="completedDateUtc"]');
  if (await completedPicker.count()) {
    await setDateInputByOffset(page, 'p-datePicker[name="completedDateUtc"]', 0);
  }

  await chooseOption(page, 'p-select[name="relatedEntityType"]', 'Lead');
  // Wait for lead options to load and select Acme lead.
  await page.waitForTimeout(800);
  await openSelect(page, 'p-select[name="relatedEntityId"]');
  const leadOption = page.locator('.p-select-panel .p-select-item, [role="option"]').filter({ hasText: LEAD_LABEL }).first();
  await leadOption.waitFor({ state: 'visible' });
  await leadOption.click({ force: true });

  await page.locator('textarea[name="description"]').fill('Discovery session to confirm rollout requirements, stakeholders, and approval path.');
  await page.locator('textarea[name="outcome"]').fill('Discovery completed. Confirmed rollout needs, timeline expectations, and finance approval stakeholders.');

  const createButton = page.getByRole('button', { name: 'Create activity' });
  console.log('CREATE_BUTTON_DISABLED=', await createButton.isDisabled());
  const createResp = await Promise.all([
    page.waitForResponse(
      r => r.url().includes('/api/activities') && r.request().method() === 'POST',
      { timeout: 15000 }
    ).catch(() => null),
    createButton.click()
  ]).then(([resp]) => resp);

  if (!createResp) {
    const dueVal = await page.locator('input[name="dueDateUtc"]').inputValue().catch(() => '');
    const completedVal = await page.locator('input[name="completedDateUtc"]').inputValue().catch(() => '');
    const relatedVal = await page.locator('p-select[name="relatedEntityId"] .select-option span').first().innerText().catch(() => '');
    const toastText = await page.locator('p-toast').innerText().catch(() => '');
    console.log('NO_POST_DUE=', dueVal);
    console.log('NO_POST_COMPLETED=', completedVal);
    console.log('NO_POST_RELATED=', relatedVal);
    console.log('NO_POST_TOAST=', toastText);
    throw new Error('Create activity POST not triggered (client-side validation likely blocked submit).');
  }

  const status = createResp.status();
  const bodyText = await createResp.text();
  console.log('ACTIVITY_POST_STATUS=', status);
  console.log('ACTIVITY_POST_BODY=', bodyText.slice(0, 800));
  console.log('CONSOLE_ERRORS_COUNT=', consoleErrors.length);
  console.log('API_FAILURES=', JSON.stringify(apiFailures.slice(0, 20)));

  expect(createResp.ok()).toBeTruthy();

  let createdId = '';
  try {
    const payload = JSON.parse(bodyText);
    createdId = payload?.id ?? '';
  } catch {}

  // Verify by opening edit page if id is returned.
  if (createdId) {
    await page.goto(`${uiBase}/app/activities/${createdId}`);
    await page.waitForURL(`**/app/activities/${createdId}`);
    await expect(page.locator('input[name="subject"]')).toHaveValue(subject);
    const leadSelectText = await page.locator('p-select[name="relatedEntityId"] .select-option span').first().innerText().catch(() => '');
    console.log('ACTIVITY_ID=', createdId);
    console.log('RELATED_LEAD_LABEL=', leadSelectText);
  }

  await page.screenshot({ path: 'client/output/playwright/discovery-meeting-created.png', fullPage: true });
});
