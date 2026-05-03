import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

type DashboardLayoutResponse = {
  cardOrder: string[];
  sizes?: Record<string, 'sm' | 'md' | 'lg'>;
  dimensions?: Record<string, { width: number; height: number }>;
  hiddenCards?: string[];
  kpiOrder?: string[];
};

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API for UI test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  return payload.accessToken as string;
}

async function getLayout(request, accessToken: string): Promise<DashboardLayoutResponse> {
  const response = await request.get(`${API_BASE_URL}/api/dashboard/layout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(response.ok()).toBeTruthy();
  return response.json();
}

async function saveLayout(request, accessToken: string, layout: DashboardLayoutResponse): Promise<void> {
  const response = await request.put(`${API_BASE_URL}/api/dashboard/layout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: {
      cardOrder: layout.cardOrder ?? [],
      sizes: layout.sizes ?? {},
      dimensions: layout.dimensions ?? {},
      hiddenCards: layout.hiddenCards ?? [],
      kpiOrder: layout.kpiOrder ?? []
    }
  });
  expect(response.ok()).toBeTruthy();
}

test('customize layout saves KPI card order and restores it after reload', async ({ page, request }) => {
  const accessToken = await login(page, request);
  const originalLayout = await getLayout(request, accessToken);

  try {
    await page.goto('/app/dashboard', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: /customize layout/i }).click();
    const dialog = page.getByRole('dialog', { name: /customize command center/i });
    await expect(dialog).toBeVisible();

    const kpiSection = dialog.locator('.layout-chart-section').first();
    await expect(kpiSection).toBeVisible();
    await expect(kpiSection.getByRole('heading', { name: 'KPI cards' })).toBeVisible();

    const initialItems = await kpiSection.locator('.layout-item').allTextContents();
    const cleanedInitial = initialItems.map((item) => item.replace(/\s+/g, ' ').trim());
    expect(cleanedInitial[0]).toContain('Raw pipeline');
    expect(cleanedInitial[cleanedInitial.length - 1]).toContain('Newly assigned leads');

    await page.evaluate(() => {
      const host = document.querySelector('app-dashboard-page');
      const component = host ? (window as any).ng?.getComponent(host) : null;
      if (!component) {
        throw new Error('Dashboard component instance not found.');
      }

      const nextOrder = [
        { id: 'new-leads', label: 'Newly assigned leads', icon: 'pi pi-user-plus' },
        { id: 'raw-pipeline', label: 'Raw pipeline', icon: 'pi pi-dollar' },
        { id: 'at-risk', label: 'At-risk deals', icon: 'pi pi-exclamation-triangle' },
        { id: 'no-next-step', label: 'No next step', icon: 'pi pi-calendar-times' },
        { id: 'tasks-due', label: 'Tasks due today', icon: 'pi pi-calendar' },
        { id: 'overdue-activities', label: 'Overdue activities', icon: 'pi pi-history' }
      ];

      component.kpiDraft = nextOrder;
      component.saveLayout();
    });
    await expect(dialog).toBeHidden();

    await expect.poll(async () => {
      const layout = await getLayout(request, accessToken);
      return layout.kpiOrder?.[0];
    }).toBe('new-leads');

    await page.reload({ waitUntil: 'networkidle' });

    const kpiLabels = page.locator('.metrics-grid .metric-card:not(.featured) .metric-label');
    await expect(kpiLabels.first()).toContainText('Newly assigned leads');
  } finally {
    await saveLayout(request, accessToken, originalLayout);
  }
});
