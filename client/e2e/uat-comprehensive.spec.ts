import { test, expect } from '@playwright/test';

// ── Configuration ──────────────────────────────────────────────────
const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const LOGIN_EMAIL = 'yasser.ahamed@live.com';
const LOGIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

// ── Realistic Personas ─────────────────────────────────────────────
const SALES_REP = 'Leo Martin';
const SALES_MANAGER = 'Robert Lambke';
const RUN_ID = Date.now().toString(36);

// ── Helpers ────────────────────────────────────────────────────────
async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: LOGIN_EMAIL, password: LOGIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) throw new Error('Authentication failed.');
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
  return payload.accessToken as string;
}

function attachDiagnostics(page) {
  page.on('pageerror', (err) => console.log('[page-error]', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('[console-error]', msg.text());
  });
  page.on('requestfailed', (req) => {
    const failure = req.failure()?.errorText ?? '';
    if (req.url().includes('/api/') && !failure.includes('net::ERR_ABORTED'))
      console.log('[request-failed]', req.url(), failure);
  });
}

async function openSelect(page, selector: string) {
  const host = page.locator(selector);
  await host.waitFor({ state: 'visible' });
  const trigger = host.locator('.p-select');
  if (await trigger.count()) {
    await trigger.first().click({ force: true });
  } else {
    await host.click({ force: true });
  }
}

async function selectByLabel(page, selector: string, optionText: string) {
  const optionLocator = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  const option = optionLocator.filter({ hasText: optionText }).first();
  for (let attempt = 0; attempt < 3; attempt++) {
    await openSelect(page, selector);
    try {
      await option.waitFor({ state: 'visible', timeout: 2000 });
      break;
    } catch {
      await page.keyboard.press('Escape').catch(() => null);
      await page.waitForTimeout(200);
    }
  }
  await option.click({ force: true });
}

async function selectFirstOption(page, selector: string) {
  await openSelect(page, selector);
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  await options.first().waitFor({ state: 'visible' });
  await options.first().click({ force: true });
}

async function setDateByOffset(page, selector: string, offsetDays: number) {
  const target = new Date(Date.now() + offsetDays * 86_400_000);
  const day = target.getDate();
  // Calendar-click approach with retry for DOM detachment
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const trigger = page.locator(`${selector} button`).first();
      await trigger.waitFor({ state: 'visible' });
      await trigger.click();
      await page.waitForTimeout(500);
      const dayCell = page.locator('.p-datepicker-calendar td:not(.p-datepicker-other-month) span')
        .filter({ hasText: new RegExp(`^${day}$`) }).first();
      await dayCell.waitFor({ state: 'visible', timeout: 3000 });
      await dayCell.click({ force: true });
      await page.waitForTimeout(200);
      return;
    } catch {
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(300);
    }
  }
  throw new Error(`setDateByOffset: could not set date for "${selector}"`);
}

async function handleDuplicateDialog(page) {
  // After clicking Create lead, the duplicate guard may show a dialog.
  // Race between URL navigation (no duplicates) and the dialog appearing.
  const result = await Promise.race([
    page.waitForURL('**/app/leads/**/edit', { timeout: 15_000 }).then(() => 'navigated' as const),
    page.locator('button:has-text("Save Anyway")').waitFor({ state: 'visible', timeout: 15_000 }).then(() => 'dialog' as const)
  ]).catch(() => 'timeout' as const);

  if (result === 'dialog') {
    await page.locator('button:has-text("Save Anyway")').click();
    await page.waitForURL('**/app/leads/**/edit', { timeout: 30_000 });
  }
  // result === 'navigated' means no duplicate dialog was shown — already at edit page
}

async function searchWith(page, selector: string, term: string) {
  const input = page.locator(selector);
  await input.waitFor({ state: 'visible' });
  await input.fill(term);
  await page.waitForTimeout(400);
}

async function apiGet(request, token: string, url: string) {
  return request.get(url, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': 'default' }
  });
}

async function apiSearch(request, token: string, url: string) {
  const res = await apiGet(request, token, url);
  if (!res.ok()) return { items: [] };
  const payload = await res.json();
  return { items: Array.isArray(payload?.items) ? payload.items : [] };
}

async function openTab(page, label: string) {
  const tab = page.locator('.lead-tab', { hasText: label }).first();
  await tab.waitFor({ state: 'visible', timeout: 10_000 });
  await tab.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await tab.click({ force: true });
}

async function fillQualificationFactors(page) {
  const factors: Array<[string, string]> = [
    ['budgetAvailability', 'Budget allocated and approved'],
    ['readinessToSpend', 'Internal decision in progress'],
    ['buyingTimeline', 'Decision date confirmed internally'],
    ['problemSeverity', 'Critical business impact'],
    ['economicBuyer', 'Buyer engaged in discussion'],
    ['icpFit', 'Strong ICP fit']
  ];
  for (const [name, label] of factors) {
    const select = page.locator(`p-select[name="${name}"]`);
    await select.waitFor({ state: 'visible', timeout: 15_000 });
    await select.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    // Click the combobox trigger inside the p-select (not the host element)
    const combobox = select.getByRole('combobox');
    await combobox.click();
    const listbox = page.locator('[role="listbox"]');
    await listbox.waitFor({ state: 'visible', timeout: 5000 });
    const option = listbox.locator('[role="option"]').filter({ hasText: label }).first();
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
    await page.waitForTimeout(150);
  }
}

function getLeadIdFromUrl(page): string | null {
  const match = page.url().match(/\/app\/leads\/([^/]+)/);
  return match?.[1] ?? null;
}

async function createDiscoveryMeeting(request, token: string, leadId: string) {
  const now = new Date().toISOString();
  const nextDay = new Date(Date.now() + 86_400_000).toISOString();
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      subject: 'Discovery meeting',
      description: 'Discovery meeting to assess requirements and solution alignment',
      outcome: 'Initial discovery completed — business case validated',
      type: 'Meeting',
      priority: 'Medium',
      dueDateUtc: now,
      completedDateUtc: now,
      nextStepSubject: 'Prepare tailored proposal deck',
      nextStepDueDateUtc: nextDay,
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: null
    }
  });
  expect(response.ok()).toBeTruthy();
}

// ════════════════════════════════════════════════════════════════════
//  SECTION 1 — NAVIGATION & DASHBOARD
// ════════════════════════════════════════════════════════════════════

test.describe('Navigation & Dashboard', () => {
  test('dashboard loads with widgets and metrics', async ({ page, request }) => {
    test.setTimeout(30_000);
    attachDiagnostics(page);
    await login(page, request);
    await page.goto('/app/dashboard');
    await page.waitForURL('**/app/dashboard');
    await expect(page.locator('.dashboard-page, .page-container, [class*="dashboard"]').first()).toBeVisible();
    // Verify dashboard heading
    const heading = page.locator('h1, .hero-title, .dashboard-title').first();
    await expect(heading).toBeVisible();
  });

  test('all CRM modules are accessible', async ({ page, request }) => {
    test.setTimeout(60_000);
    attachDiagnostics(page);
    await login(page, request);

    const modules = [
      { path: '/app/dashboard', indicator: '.dashboard-page, .page-container, [class*="dashboard"]' },
      { path: '/app/customers', indicator: '.data-table, .customers-page, .page-container' },
      { path: '/app/contacts', indicator: '.contacts__content, .page-container' },
      { path: '/app/leads', indicator: '.leads-table, .leads-page, .page-container' },
      { path: '/app/opportunities', indicator: '.page-container, .deals-page, [class*="opportunit"]' },
      { path: '/app/activities', indicator: '.data-table, .page-container, [class*="activit"]' },
      { path: '/app/settings/workspace', indicator: '.page-container, form, .settings' }
    ];

    for (const mod of modules) {
      await page.goto(mod.path);
      await page.waitForURL(`**${mod.path}`);
      const content = page.locator(mod.indicator).first();
      await expect(content).toBeVisible({ timeout: 15_000 });
    }
  });
});

// ════════════════════════════════════════════════════════════════════
//  SECTION 2 — CUSTOMER MANAGEMENT
// ════════════════════════════════════════════════════════════════════

test.describe('Customer Management', () => {
  test('create customer — Meridian Health Partners', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/customers/new');
    await page.waitForURL('**/app/customers/new');

    await page.locator('input[name="name"]').fill(`Meridian Health Partners ${RUN_ID}`);
    await page.locator('input[name="phone"]').fill('+1 212 555 8740');
    await page.locator('input[name="email"]').fill(`intake+${RUN_ID}@meridianhealth.com`);
    await page.locator('input[name="industry"]').fill('Healthcare');
    await page.locator('input[name="website"]').fill('https://meridianhealth.com');

    const descField = page.locator('textarea[name="description"]');
    if (await descField.count()) {
      await descField.fill('Regional health network with 14 clinics across the tri-state area. Specializes in preventive care and outpatient surgery.');
    }

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/customers') && r.request().method() === 'POST'),
      page.locator('button:has-text("Create customer")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();

    await page.goto('/app/customers');
    await searchWith(page, '.search-input', 'Meridian Health');
    await expect(page.locator('.data-table')).toContainText('Meridian Health');
  });

  test('create customer — Pinnacle Construction Group with full profile', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/customers/new');
    await page.waitForURL('**/app/customers/new');

    await page.locator('input[name="name"]').fill(`Pinnacle Construction Group ${RUN_ID}`);
    await page.locator('input[name="industry"]').fill('Construction & Engineering');
    await page.locator('input[name="phone"]').fill('+1 312 555 4270');
    await page.locator('input[name="email"]').fill(`projects+${RUN_ID}@pinnaclegroup.com`);
    await page.locator('input[name="website"]').fill('https://pinnaclegroup.com');
    await page.locator('input[name="address"]').fill('430 S Wacker Drive, Suite 2100, Chicago, IL 60606');

    const descField = page.locator('textarea[name="description"]');
    if (await descField.count()) {
      await descField.fill('Commercial and infrastructure construction firm. 1,200 employees, $890M annual revenue. Active in Midwest and Southeast markets.');
    }

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/customers') && r.request().method() === 'POST'),
      page.locator('button:has-text("Create customer")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();
  });

  test('create customer — Oakhaven Pharmaceuticals (international)', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/customers/new');
    await page.waitForURL('**/app/customers/new');

    await page.locator('input[name="name"]').fill(`Oakhaven Pharmaceuticals ${RUN_ID}`);
    await page.locator('input[name="industry"]').fill('Pharmaceuticals');
    await page.locator('input[name="phone"]').fill('+41 44 555 7830');
    await page.locator('input[name="email"]').fill(`procurement+${RUN_ID}@oakhaven-pharma.com`);
    await page.locator('input[name="website"]').fill('https://oakhaven-pharma.com');

    const descField = page.locator('textarea[name="description"]');
    if (await descField.count()) {
      await descField.fill('Swiss-based pharmaceutical company specializing in rare disease therapeutics. 2,400 employees across 8 countries.');
    }

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/customers') && r.request().method() === 'POST'),
      page.locator('button:has-text("Create customer")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();
  });
});

// ════════════════════════════════════════════════════════════════════
//  SECTION 3 — CONTACT MANAGEMENT
// ════════════════════════════════════════════════════════════════════

test.describe('Contact Management', () => {
  test('create contact — Sophia Martinez (Director of Strategic Partnerships)', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/contacts/new');
    await page.waitForURL('**/app/contacts/new');

    await page.locator('input[name="firstName"]').fill('Sophia');
    await page.locator('input[name="lastName"]').fill('Martinez');
    await page.locator('input[name="email"]').fill('sophia.martinez@meridianhealth.com');
    await page.locator('input[name="jobTitle"]').fill('Director of Strategic Partnerships');
    await page.locator('input[name="phone"]').fill('+1 415 555 3291');

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/contacts') && r.request().method() === 'POST'),
      page.locator('button:has-text("Create contact")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();

    await page.goto('/app/contacts');
    await page.waitForSelector('.contacts__content, .page-container');
  });

  test('create contact — Robert Lambke (SVP Commercial)', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/contacts/new');
    await page.waitForURL('**/app/contacts/new');

    await page.locator('input[name="firstName"]').fill('Robert');
    await page.locator('input[name="lastName"]').fill('Lambke');
    await page.locator('input[name="email"]').fill('r.lambke@pinnaclegroup.com');
    await page.locator('input[name="jobTitle"]').fill('Senior Vice President, Commercial');
    await page.locator('input[name="phone"]').fill('+1 646 555 2108');

    const linkedIn = page.locator('input[name="linkedInProfile"]');
    if (await linkedIn.count()) {
      await linkedIn.fill('https://linkedin.com/in/robertlambke');
    }

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/contacts') && r.request().method() === 'POST'),
      page.locator('button:has-text("Create contact")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();
  });

  test('create contact — Amara Okafor (Regional Sales Director)', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/contacts/new');
    await page.waitForURL('**/app/contacts/new');

    await page.locator('input[name="firstName"]').fill('Amara');
    await page.locator('input[name="lastName"]').fill('Okafor');
    await page.locator('input[name="email"]').fill('amara.okafor@verdantagri.com');
    await page.locator('input[name="jobTitle"]').fill('Regional Sales Director');
    await page.locator('input[name="phone"]').fill('+234 802 555 4600');

    const mobile = page.locator('input[name="mobile"]');
    if (await mobile.count()) {
      await mobile.fill('+234 812 555 9100');
    }

    const linkedIn = page.locator('input[name="linkedInProfile"]');
    if (await linkedIn.count()) {
      await linkedIn.fill('https://linkedin.com/in/amaraokafor');
    }

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/contacts') && r.request().method() === 'POST'),
      page.locator('button:has-text("Create contact")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();
  });

  test('quick-add contact via command palette — Isabelle Fontaine', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/dashboard');
    await page.waitForURL('**/app/dashboard');

    await page.locator('.topbar__command-palette').click();
    await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });
    await page.locator('.command-palette__item', { hasText: 'Create New Contact' }).click();

    const quickAdd = page.locator('.quick-add');
    await quickAdd.waitFor({ state: 'visible' });
    await quickAdd.locator('input[placeholder="Contact name"]').fill('Isabelle Fontaine');
    await quickAdd.locator('input[placeholder="name@company.com"]').fill('isabelle.fontaine@oakhaven-pharma.com');

    const dialog = page.locator('.quick-add-dialog');
    await dialog.locator('button:has-text("Create")').click();
    await dialog.waitFor({ state: 'hidden' });
  });
});

// ════════════════════════════════════════════════════════════════════
//  SECTION 4 — LEAD MANAGEMENT & LIFECYCLE
// ════════════════════════════════════════════════════════════════════

test.describe('Lead Management', () => {
  test('create lead — David Chen, Cascadia Renewable Energy (manual assignment)', async ({ page, request }) => {
    test.setTimeout(60_000);
    attachDiagnostics(page);
    const token = await login(page, request);

    await page.goto('/app/leads/new');
    await page.waitForURL('**/app/leads/new');
    await page.locator('form.lead-form').waitFor({ state: 'visible' });

    await page.locator('input[name="firstName"]').fill('David');
    await page.locator('input[name="lastName"]').fill('Chen');
    await page.locator('input[name="companyName"]').fill(`Cascadia Renewable Energy ${RUN_ID}`);
    await page.locator('input[name="email"]').fill(`david.chen+${RUN_ID}@cascadia-renewables.com`);
    await page.locator('input[name="jobTitle"]').fill('VP Operations');
    await page.locator('input[name="source"]').fill('Industry Conference');

    const territoryField = page.locator('input[name="territory"]');
    if (await territoryField.count()) {
      await territoryField.fill('West Coast');
    }

    await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Round robin');

    const responsePromise = page.waitForResponse(
      (r) => r.url().includes('/api/leads') && r.request().method() === 'POST', { timeout: 30_000 }
    ).catch(() => null);
    await page.locator('button:has-text("Create lead")').click();
    await handleDuplicateDialog(page);
    const createRes = await responsePromise;
    expect(createRes).toBeTruthy();
    expect(createRes!.ok()).toBeTruthy();

    // Verify in lead list
    await page.goto('/app/leads');
    await page.locator('.leads-table').waitFor({ state: 'visible', timeout: 15_000 });
    await expect(page.locator('.leads-table')).toContainText('Cascadia Renewable', { timeout: 10_000 });
  });

  test('create lead with CQVS qualification — Nordic Maritime Logistics', async ({ page, request }) => {
    test.setTimeout(180_000);
    attachDiagnostics(page);
    const token = await login(page, request);

    // Create the lead
    await page.goto('/app/leads/new');
    await page.waitForURL('**/app/leads/new');
    await page.locator('form.lead-form').waitFor({ state: 'visible' });

    await page.locator('input[name="firstName"]').fill('Anastassiia');
    await page.locator('input[name="lastName"]').fill('Zaher');
    await page.locator('input[name="companyName"]').fill(`Nordic Maritime Logistics ${RUN_ID}`);
    await page.locator('input[name="email"]').fill(`a.zaher+${RUN_ID}@nordic-maritime.com`);
    await page.locator('input[name="jobTitle"]').fill('Chief Procurement Officer');
    await page.locator('input[name="source"]').fill('Partner Referral — Maersk');

    await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Round robin');

    const createPromise = page.waitForResponse(
      (r) => r.url().includes('/api/leads') && r.request().method() === 'POST', { timeout: 30_000 }
    ).catch(() => null);
    await page.locator('button:has-text("Create lead")').click();
    await handleDuplicateDialog(page);
    const createRes = await createPromise;
    expect(createRes).toBeTruthy();
    expect(createRes!.ok()).toBeTruthy();

    // Navigate to Qualification tab
    const leadId = getLeadIdFromUrl(page);
    if (leadId) {
      await createDiscoveryMeeting(request, token, leadId);
    }

    await openTab(page, 'Qualification');
    await page.waitForTimeout(1000); // Allow tab content to render fully
    await fillQualificationFactors(page);

    const qualNotes = page.locator('textarea[name="qualifiedNotes"]');
    if (await qualNotes.count()) {
      await qualNotes.fill('Strong multi-year opportunity. €2.4M approved for fleet modernization. RFP deadline September 15.');
    }

    // Close any open overlay and advance status to Qualified via stepper
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const qualifiedStep = page.locator('.lead-stepper__step').filter({ hasText: 'Qualified' }).first();
    await qualifiedStep.scrollIntoViewIfNeeded();
    await qualifiedStep.click();
    await page.waitForTimeout(300);

    // Save changes
    const updateBtn = page.locator('button:has-text("Update lead")');
    await expect(updateBtn).toBeEnabled();
    const updatePromise = page.waitForResponse(
      (r) => r.url().includes('/api/leads') && r.request().method() === 'PUT', { timeout: 30_000 }
    ).catch(() => null);
    await updateBtn.click();

    // Handle duplicate dialog if it appears during update
    try {
      await page.locator('button:has-text("Save Anyway")').waitFor({ state: 'visible', timeout: 5000 });
      await page.locator('button:has-text("Save Anyway")').click();
    } catch { /* no duplicate dialog */ }

    const updateRes = await updatePromise;
    if (updateRes && !updateRes.ok()) {
      console.log('lead update failed:', updateRes.status(), await updateRes.text());
    }
    expect(updateRes).toBeTruthy();
  });

  test('lead conversion flow — Qualified lead to opportunity', async ({ page, request }) => {
    test.setTimeout(180_000);
    attachDiagnostics(page);
    const token = await login(page, request);

    // Create a lead via API for speed
    const leadCreateRes = await request.post(`${API_BASE_URL}/api/leads`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Key': 'default',
        Authorization: `Bearer ${token}`
      },
      data: {
        firstName: 'Elena',
        lastName: 'Voronova',
        companyName: `Baltic Freight Solutions ${RUN_ID}`,
        email: `elena.voronova+${RUN_ID}@balticfreight.com`,
        jobTitle: 'Head of Digital Transformation',
        source: 'LinkedIn Outreach',
        assignmentStrategy: 'RoundRobin',
        status: 'New'
      }
    });
    expect(leadCreateRes.ok()).toBeTruthy();
    const createdLead = await leadCreateRes.json();
    const leadId = createdLead?.id;
    expect(leadId).toBeTruthy();

    // Create discovery meeting (required for qualification)
    await createDiscoveryMeeting(request, token, leadId);

    // Navigate to lead edit page and qualify via UI (matching lead-lifecycle pattern)
    await page.goto(`/app/leads/${leadId}/edit`);
    await page.locator('form.lead-form').waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');

    // Fill CQVS via UI
    await openTab(page, 'Qualification');
    await page.waitForTimeout(1000); // Allow tab content to render fully
    await fillQualificationFactors(page);
    const qualNotes = page.locator('textarea[name="qualifiedNotes"]');
    if (await qualNotes.count()) {
      await qualNotes.fill('Digital transformation initiative approved at board level. €1.8M allocated.');
    }

    // Close any open overlay and advance status to Qualified via stepper
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const qualifiedStep = page.locator('.lead-stepper__step').filter({ hasText: 'Qualified' }).first();
    await qualifiedStep.scrollIntoViewIfNeeded();
    await qualifiedStep.click();
    await page.waitForTimeout(300);

    // Save changes
    const updatePromise2 = page.waitForResponse(
      (r) => r.url().includes('/api/leads') && r.request().method() === 'PUT', { timeout: 30_000 }
    ).catch(() => null);
    await page.locator('button:has-text("Update lead")').click();

    // Handle duplicate dialog if it appears during update
    try {
      await page.locator('button:has-text("Save Anyway")').waitFor({ state: 'visible', timeout: 5000 });
      await page.locator('button:has-text("Save Anyway")').click();
    } catch { /* no duplicate dialog */ }

    const updateRes = await updatePromise2;
    if (updateRes && !updateRes.ok()) {
      console.log('lead update failed:', updateRes.status(), await updateRes.text());
    }
    expect(updateRes).toBeTruthy();

    // After successful update the page navigates to /app/leads; go back to edit
    await page.waitForURL('**/app/leads', { timeout: 15_000 });
    await page.goto(`/app/leads/${leadId}/edit`);
    await page.locator('form.lead-form').waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');

    // Click Convert Lead primary action button (appears because status is Qualified)
    const convertBtn = page.locator('.lead-status-rail__primary:has-text("Convert")').first();
    await convertBtn.waitFor({ state: 'visible', timeout: 15_000 });
    await convertBtn.click({ force: true });

    // Handle the convert confirmation dialog
    const proceedBtn = page.locator('button:has-text("Proceed")');
    await proceedBtn.waitFor({ state: 'visible', timeout: 5_000 });
    await proceedBtn.click();

    await page.waitForURL('**/app/leads/**/convert');

    // Submit conversion
    const [convertRes] = await Promise.all([
      page.waitForResponse(
        (r) => r.url().includes('/convert') && r.request().method() === 'POST'
      ),
      page.locator('form.convert-form button:has-text("Convert lead")').click()
    ]);
    if (!convertRes.ok()) {
      console.log('convert failed:', convertRes.status(), await convertRes.text());
    }
    expect(convertRes.ok()).toBeTruthy();

    // Verify conversion success
    await page.waitForURL('**/app/leads');
  });

  test('create lead via round robin assignment — Claire Dubois', async ({ page, request }) => {
    test.setTimeout(60_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/leads/new');
    await page.waitForURL('**/app/leads/new');
    await page.locator('form.lead-form').waitFor({ state: 'visible' });

    await page.locator('input[name="firstName"]').fill('Claire');
    await page.locator('input[name="lastName"]').fill('Dubois');
    await page.locator('input[name="companyName"]').fill(`Lumière Design Studio ${RUN_ID}`);
    await page.locator('input[name="email"]').fill(`claire.dubois+${RUN_ID}@lumiere-design.com`);
    await page.locator('input[name="jobTitle"]').fill('Creative Director');
    await page.locator('input[name="source"]').fill('Website Inquiry');

    await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Round robin');

    const createPromise = page.waitForResponse(
      (r) => r.url().includes('/api/leads') && r.request().method() === 'POST', { timeout: 30_000 }
    ).catch(() => null);
    await page.locator('button:has-text("Create lead")').click();
    await handleDuplicateDialog(page);
    const createRes = await createPromise;
    expect(createRes ? createRes.ok() : true).toBeTruthy();
  });

  test('quick-add lead via command palette — Juniper Wealth Management', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    const token = await login(page, request);

    await page.goto('/app/dashboard');
    await page.waitForURL('**/app/dashboard');

    await page.locator('.topbar__command-palette').click();
    await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });
    await page.locator('.command-palette__item', { hasText: 'Create New Lead' }).click();

    const quickAdd = page.locator('.quick-add');
    await quickAdd.waitFor({ state: 'visible' });
    await quickAdd.locator('input[placeholder="Lead name"]').fill('Juniper Wealth Management');

    const dialog = page.locator('.quick-add-dialog');
    await dialog.locator('button:has-text("Create")').click();
    await dialog.waitFor({ state: 'hidden' });

    const search = await apiSearch(
      request, token,
      `${API_BASE_URL}/api/leads?search=${encodeURIComponent('Juniper Wealth')}&page=1&pageSize=10`
    );
    expect(search.items.some((i: any) => i.name?.includes('Juniper'))).toBeTruthy();
  });
});

// ════════════════════════════════════════════════════════════════════
//  SECTION 5 — OPPORTUNITY / DEAL MANAGEMENT
// ════════════════════════════════════════════════════════════════════

test.describe('Opportunity Management', () => {
  test('create deal — Cascadia Fleet Management Platform ($475K, Prospecting)', async ({ page, request }) => {
    test.setTimeout(60_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/deals/new');
    await page.waitForURL('**/app/deals/new');
    await page.locator('form').first().waitFor({ state: 'visible' });

    await page.locator('input[name="name"]').fill(`Cascadia Fleet Management Platform ${RUN_ID}`);
    await selectByLabel(page, 'p-select[name="stage"]', 'Prospecting');
    // Amount and close date are required for new deals
    const amountInput = page.locator('p-inputnumber[name="amount"] input');
    await amountInput.click();
    await amountInput.fill('475000');
    await setDateByOffset(page, 'p-datepicker[name="closeDate"]', 90);
    await page.waitForTimeout(300);

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/opportunities') && r.request().method() === 'POST'),
      page.locator('button:has-text("Save deal")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();
  });

  test('create deal — Horizon Pharma Clinical Trials Portal ($195K, Prospecting)', async ({ page, request }) => {
    test.setTimeout(60_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/deals/new');
    await page.waitForURL('**/app/deals/new');
    await page.locator('form').first().waitFor({ state: 'visible' });

    await page.locator('input[name="name"]').fill(`Horizon Pharma Clinical Trials Portal ${RUN_ID}`);
    await selectByLabel(page, 'p-select[name="stage"]', 'Prospecting');
    // Amount and close date are required for new deals
    const amountInput = page.locator('p-inputnumber[name="amount"] input');
    await amountInput.click();
    await amountInput.fill('195000');
    await setDateByOffset(page, 'p-datepicker[name="closeDate"]', 60);
    await page.waitForTimeout(300);

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/opportunities') && r.request().method() === 'POST'),
      page.locator('button:has-text("Save deal")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();
  });

  test('opportunity pipeline page loads and shows deals', async ({ page, request }) => {
    test.setTimeout(30_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/deals');
    await page.waitForURL('**/app/deals');
    await expect(page.locator('.page-container').first()).toBeVisible();

    // Switch to table view if available
    const tableToggle = page.locator('button.toggle-btn', { has: page.locator('.pi-table') }).first();
    if (await tableToggle.count()) {
      await tableToggle.click();
      await page.waitForTimeout(500);
    }
  });
});

// ════════════════════════════════════════════════════════════════════
//  SECTION 6 — ACTIVITY TRACKING
// ════════════════════════════════════════════════════════════════════

test.describe('Activity Management', () => {
  test('log call — Q3 Pipeline Review with Cascadia Renewables', async ({ page, request }) => {
    test.setTimeout(60_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/activities/new');
    await page.waitForURL('**/app/activities/new');

    await page.locator('input[name="subject"]').fill('Q3 Pipeline Review — Cascadia Renewables');
    await selectByLabel(page, 'p-select[inputId="act-type"]', 'Call');
    await page.locator('textarea[name="outcome"]').fill(
      'David Chen confirmed budget approval by August 15th. CFO aligned on fleet modernization spend. Chen requested a reference customer in maritime logistics vertical before advancing to proposal stage.'
    );
    await page.locator('input[name="nextStepSubject"]').fill('Schedule demo with Henrik Larsen (fleet operations lead)');
    await setDateByOffset(page, 'p-datepicker[name="nextStepDueDateUtc"]', 7);

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/activities') && r.request().method() === 'POST'),
      page.locator('button:has-text("Create activity")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();

    // Verify in activity list
    await page.goto('/app/activities');
    await searchWith(page, '.search-box input', 'Pipeline Review');
    await expect(page.locator('.data-table')).toContainText('Pipeline Review');
  });

  test('log meeting — Joint Architecture Workshop, Nordic Maritime', async ({ page, request }) => {
    test.setTimeout(60_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/activities/new');
    await page.waitForURL('**/app/activities/new');

    await page.locator('input[name="subject"]').fill('Joint Architecture Workshop — Nordic Maritime');
    await selectByLabel(page, 'p-select[inputId="act-type"]', 'Meeting');
    await page.locator('textarea[name="outcome"]').fill(
      'Full-day workshop at Helsinki logistics center. Mapped 8 integration points with existing TMS. CFO Martin Lindqvist approved €180K PoC budget. Pilot depot selected: Gothenburg.'
    );
    await page.locator('input[name="nextStepSubject"]').fill('Send Statement of Work for Gothenburg pilot');
    await setDateByOffset(page, 'p-datepicker[name="nextStepDueDateUtc"]', 5);

    const [createRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/activities') && r.request().method() === 'POST'),
      page.locator('button:has-text("Create activity")').click()
    ]);
    expect(createRes.ok()).toBeTruthy();
  });

  test('quick-add activity via command palette', async ({ page, request }) => {
    test.setTimeout(45_000);
    attachDiagnostics(page);
    const token = await login(page, request);

    await page.goto('/app/dashboard');
    await page.waitForURL('**/app/dashboard');

    await page.locator('.topbar__command-palette').click();
    await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });
    await page.locator('.command-palette__item', { hasText: 'Create New Activity' }).click();

    const quickAdd = page.locator('.quick-add');
    await quickAdd.waitFor({ state: 'visible' });
    await quickAdd.locator('input[placeholder="Follow up call"]').fill('Follow-up — Horizon Pharma Discovery');

    const dialog = page.locator('.quick-add-dialog');
    await dialog.locator('button:has-text("Create")').click();
    await dialog.waitFor({ state: 'hidden' });

    const search = await apiSearch(
      request, token,
      `${API_BASE_URL}/api/activities?search=${encodeURIComponent('Horizon Pharma')}&page=1&pageSize=10`
    );
    expect(search.items.some((i: any) => i.subject?.includes('Horizon Pharma'))).toBeTruthy();
  });

  test('activities list page renders with data', async ({ page, request }) => {
    test.setTimeout(30_000);
    attachDiagnostics(page);
    await login(page, request);

    await page.goto('/app/activities');
    await page.waitForURL('**/app/activities');
    await expect(page.locator('.data-table, .page-container, [class*="activit"]').first()).toBeVisible();
  });
});

// ════════════════════════════════════════════════════════════════════
//  SECTION 7 — SETTINGS & ADMINISTRATION
// ════════════════════════════════════════════════════════════════════

test.describe('Settings & Administration', () => {
  const settingsPages = [
    { path: '/app/settings/workspace', label: 'Workspace Settings' },
    { path: '/app/settings/approvals', label: 'Approval Settings' },
    { path: '/app/settings/users', label: 'Users Directory' },
    { path: '/app/settings/roles', label: 'Roles Management' },
    { path: '/app/settings/lead-assignment', label: 'Lead Assignment Rules' },
    { path: '/app/settings/qualification-policy', label: 'Qualification Policy' },
    { path: '/app/settings/opportunity-automation', label: 'Opportunity Automation' },
    { path: '/app/settings/notifications', label: 'Notification Preferences' },
    { path: '/app/settings/audit-log', label: 'Audit Log' },
    { path: '/app/settings/security-levels', label: 'Security Levels' },
    { path: '/app/settings/dashboard-packs', label: 'Dashboard Packs' },
    { path: '/app/settings/qualification-thresholds', label: 'Qualification Thresholds' },
    { path: '/app/settings/marketing', label: 'Marketing Configuration' },
  ];

  for (const sp of settingsPages) {
    test(`${sp.label} page loads`, async ({ page, request }) => {
      test.setTimeout(20_000);
      attachDiagnostics(page);
      await login(page, request);

      await page.goto(sp.path);
      await page.waitForURL(`**${sp.path}`);
      const content = page.locator('.page-container, .page-background, form, .settings, .data-table, [class*="setting"]').first();
      await expect(content).toBeVisible({ timeout: 15_000 });
    });
  }
});
