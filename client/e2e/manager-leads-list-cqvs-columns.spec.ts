import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE_URL = process.env.E2E_BASE_URL ?? '';

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

const MANAGER_EMAIL = process.env.E2E_MANAGER_EMAIL ?? 'jordan.patel@crmenterprise.demo';
const MANAGER_PASSWORD = process.env.E2E_MANAGER_PASSWORD ?? 'ChangeThisSales!1';

function isLocal(baseUrl: string): boolean {
  return baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
}

async function apiLogin(request, email: string, password: string): Promise<string> {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email, password }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error(`Unable to authenticate (${email}) against API for UI test.`);
  }
  return payload.accessToken as string;
}

async function login(page, request) {
  const token = await apiLogin(request, MANAGER_EMAIL, MANAGER_PASSWORD);
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, token);
}

function attachDiagnostics(page) {
  page.on('pageerror', (err) => console.log('pageerror:', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('console error:', msg.text());
    }
  });
  page.on('requestfailed', (req) => {
    const failure = req.failure()?.errorText ?? '';
    if (req.url().includes('/api/') && !failure.includes('net::ERR_ABORTED')) {
      console.log('request failed:', req.url(), failure);
    }
  });
}

test.describe.serial('manager: leads list CQVS coach panel (settings toggle)', () => {
  test('toggle show/hide CQVS coach tools via workspace setting', async ({ page, request }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    // Guardrail: do not mutate remote environments (Azure/static prod/dev).
    test.skip(!BASE_URL || !isLocal(BASE_URL) || !isLocal(API_BASE_URL), 'Local-only: this test toggles workspace settings.');

    const adminToken = await apiLogin(request, ADMIN_EMAIL, ADMIN_PASSWORD);
    const getSettingsRes = await request.get(`${API_BASE_URL}/api/workspace`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'X-Tenant-Key': 'default'
      }
    });
    expect(getSettingsRes.ok()).toBeTruthy();
    const settings = await getSettingsRes.json();
    const priorPolicy = settings?.qualificationPolicy ?? null;

    async function putPolicy(policy) {
      const putRes = await request.put(`${API_BASE_URL}/api/workspace`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
          'X-Tenant-Key': 'default'
        },
        data: {
          name: settings.name,
          timeZone: settings.timeZone,
          currency: settings.currency,
          leadFirstTouchSlaHours: settings.leadFirstTouchSlaHours,
          defaultContractTermMonths: settings.defaultContractTermMonths,
          defaultDeliveryOwnerRoleId: settings.defaultDeliveryOwnerRoleId,
          approvalAmountThreshold: settings.approvalAmountThreshold,
          approvalApproverRole: settings.approvalApproverRole,
          approvalWorkflowPolicy: settings.approvalWorkflowPolicy,
          qualificationPolicy: policy
        }
      });
      expect(putRes.ok()).toBeTruthy();
    }

    try {
      // Ensure there is at least one lead to inspect in UI (best-effort).
      const createLeadRes = await request.post(`${API_BASE_URL}/api/leads`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
          'X-Tenant-Key': 'default'
        },
        data: {
          firstName: 'Carmen',
          lastName: 'Whitaker',
          companyName: 'North Ridge Foods',
          email: 'carmen.whitaker@northridgefoods.com',
          source: 'Web'
        }
      });
      if (!createLeadRes.ok()) {
        console.log('lead create skipped:', createLeadRes.status(), await createLeadRes.text().catch(() => ''));
      }

      // OFF: should hide coach tools (and keep list compact).
      await putPolicy({ ...(priorPolicy ?? {}), showCqvsInLeadList: false });
      await login(page, request);
      await page.goto('/app/leads');
      await expect(page.getByRole('heading', { name: /Leads/i })).toBeVisible();

      let headers = await page.locator('p-table thead th').allInnerTexts();
      let normalized = headers.map((h) => h.trim()).filter(Boolean);
      console.log('Leads list headers (manager, CQVS disabled):', normalized.join(' | '));

      expect(normalized.some((h) => /cqvs/i.test(h))).toBe(false);
      expect(normalized.some((h) => /qualification/i.test(h))).toBe(false);
      expect(normalized.some((h) => /weakest/i.test(h))).toBe(false);
      expect(normalized.some((h) => /lead score/i.test(h))).toBe(true);

      await expect(page.locator('[data-testid="lead-coach-open"]')).toHaveCount(0);

      // ON: should show coach tools (button + drawer).
      await putPolicy({ ...(priorPolicy ?? {}), showCqvsInLeadList: true });
      await page.reload();
      await expect(page.getByRole('heading', { name: /Leads/i })).toBeVisible();

      headers = await page.locator('p-table thead th').allInnerTexts();
      normalized = headers.map((h) => h.trim()).filter(Boolean);
      console.log('Leads list headers (manager, CQVS enabled):', normalized.join(' | '));

      // Strategic UI approach: no extra table columns; CQVS is in the coach drawer.
      expect(normalized.some((h) => /qualification/i.test(h))).toBe(false);
      expect(normalized.some((h) => /weakest/i.test(h))).toBe(false);
      expect(normalized.some((h) => /cqvs/i.test(h))).toBe(false);

      // Compact layout: avoid horizontal expansion and use smaller table font when CQVS columns are enabled.
      const dims = await page.locator('.table-container').evaluate((el) => ({
        clientWidth: (el as HTMLElement).clientWidth,
        scrollWidth: (el as HTMLElement).scrollWidth
      }));
      console.log('table-container widths (CQVS enabled):', JSON.stringify(dims));
      expect(dims.scrollWidth).toBeLessThanOrEqual(dims.clientWidth + 2);

      const cellFont = await page.locator('p-table.leads-table.leads-table--compact tbody td').first().evaluate((el) =>
        window.getComputedStyle(el).fontSize
      );
      console.log('first cell font-size (CQVS enabled):', cellFont);
      const parsed = Number.parseFloat(cellFont);
      expect(Number.isFinite(parsed)).toBeTruthy();
      expect(parsed).toBeLessThanOrEqual(12.5);

      const coachButtons = page.locator('[data-testid="lead-coach-open"]');
      await expect(coachButtons.first()).toBeVisible();
      await coachButtons.first().click();
      await expect(page.locator('[data-testid="lead-coach-drawer"]')).toBeVisible();
      await expect(page.locator('[data-testid="lead-coach-title"]')).toContainText('Lead Coach');
      await expect(page.locator('[data-testid="cqvs-group-Q"]')).toBeVisible();
    } finally {
      if (priorPolicy) {
        await putPolicy(priorPolicy);
      }
    }
  });
});
