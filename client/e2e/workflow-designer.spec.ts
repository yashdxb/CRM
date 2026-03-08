import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://localhost:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

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
    throw new Error('Unable to authenticate against the API for workflow designer test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('workflow designer shows draggable palette item and supports drop add', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/workflows/designer');

  await expect(page.getByRole('heading', { name: 'Approval Workflow Builder' })).toBeVisible();

  const expectedNodeLabels = ['Approval Step', 'Condition', 'Email', 'Notification', 'Delay', 'CRM Update', 'Activity'];
  for (const label of expectedNodeLabels) {
    await expect(page.locator('.palette-node', { hasText: label })).toBeVisible();
  }

  const draggableNode = page.locator('.palette-node[draggable="true"]', { hasText: 'Approval Step' });
  const conditionNode = page.locator('.palette-node[draggable="true"]', { hasText: 'Condition' });
  await expect(draggableNode).toBeVisible();
  await expect(conditionNode).toBeVisible();

  const stepCountBefore = await page.locator('.properties-card .step').count();
  await page.getByRole('button', { name: /Quick Add Approval Step/i }).click();
  await expect.poll(async () => page.locator('.properties-card .step').count()).toBeGreaterThan(stepCountBefore);

  await page.getByRole('button', { name: /Add Condition node/i }).click();
  await page.getByRole('button', { name: /Add Notification node/i }).click();
  const notificationCard = page.locator('.properties-card .step', { hasText: 'Notification' }).first();
  await notificationCard.locator('input').last().fill('Finance Alert');

  const saveRequest = page.waitForRequest((request) =>
    request.method() === 'PUT' && request.url().includes('/api/workflows/definitions/deal-approval')
  );
  await page.getByRole('button', { name: /^Save Draft$/i }).click();

  const saveHttpRequest = await saveRequest;
  const payload = saveHttpRequest.postDataJSON() as { definitionJson?: string; operation?: string };
  expect(payload.definitionJson).toBeTruthy();
  expect(payload.operation).toBe('save-draft');

  const definition = JSON.parse(payload.definitionJson as string) as {
    nodes?: Array<{ type?: string; label?: string }>;
  };
  const hasConditionNode = (definition.nodes ?? []).some((node) => node.type === 'condition');
  const hasRenamedNotification = (definition.nodes ?? []).some((node) => node.type === 'notification' && node.label === 'Finance Alert');
  expect(hasConditionNode).toBeTruthy();
  expect(hasRenamedNotification).toBeTruthy();
});

test('workflow designer blocks publish when required scope is missing', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/workflows/designer');

  await expect(page.getByRole('heading', { name: 'Approval Workflow Builder' })).toBeVisible();

  await page.locator('.scope-grid label', { hasText: 'Stage' }).locator('input').fill('');
  await page.getByRole('button', { name: /^Publish$/i }).click();

  await expect(page.getByRole('heading', { name: 'Validation Issues' })).toBeVisible();
  await expect(page.locator('li').filter({ hasText: 'Workflow stage is required before publishing.' })).toBeVisible();
});
