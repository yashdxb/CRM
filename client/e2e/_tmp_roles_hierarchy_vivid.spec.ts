import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page: any, request: any) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('roles hierarchy org chart uses vivid colors', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/settings/roles', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Hierarchy/i }).click();
  const wrapper = page.locator('.orgchart-wrapper');
  await expect(wrapper).toBeVisible();
  const nodes = page.locator('.org-node');
  await expect(nodes.first()).toBeVisible();
  const styles = await nodes.evaluateAll((els) => els.slice(0, 4).map((el) => {
    const s = getComputedStyle(el as HTMLElement);
    const before = getComputedStyle(el as HTMLElement, '::before');
    return {
      level: (el as HTMLElement).getAttribute('data-level'),
      bg: s.backgroundImage,
      border: s.borderColor,
      stripe: before.backgroundImage,
      stripeW: before.width
    };
  }));
  console.log('ORG_NODE_STYLES', JSON.stringify(styles));
  await page.screenshot({ path: 'output/playwright/roles-hierarchy-vivid-colors.png', fullPage: true });
});
