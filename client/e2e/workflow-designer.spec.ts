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

  return payload.accessToken as string;
}

test('workflow designer shows draggable palette item and supports drop add', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/workflows/designer');

  await expect(page.getByRole('heading', { name: 'Approval Workflow Builder' })).toBeVisible();
  await expect(page.getByText('Template', { exact: true })).toBeVisible();
  await expect(page.getByText('Trigger', { exact: true })).toBeVisible();

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

test('workflow designer applies template and uses controlled scope options', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/workflows/designer');

  await page.locator('.template-bar .p-select').click();
  await page.getByRole('option', { name: 'Discount Approval' }).click();

  await expect(page.locator('.scope-grid input').first()).toHaveValue('Discount Approval Workflow');
  await expect(page.locator('.properties-card .step-header strong', { hasText: 'Step 1' })).toBeVisible();
  await expect(page.locator('.properties-card .step-header strong', { hasText: 'Step 2' })).toBeVisible();

  const publishRequest = page.waitForRequest((candidate) =>
    candidate.method() === 'PUT' && candidate.url().includes('/api/workflows/definitions/deal-approval')
  );
  await page.getByRole('button', { name: /^Publish$/i }).click();
  const publishHttpRequest = await publishRequest;
  const payload = publishHttpRequest.postDataJSON() as { definitionJson?: string; operation?: string };
  expect(payload.operation).toBe('publish');

  const definition = JSON.parse(payload.definitionJson as string) as {
    scope?: { trigger?: string; stage?: string; pipeline?: string };
  };
  expect(definition.scope?.trigger).toBe('on-discount-threshold');
  expect(definition.scope?.stage).toBe('Proposal');
  expect(definition.scope?.pipeline).toBe('default');
});

test('workflow publish validation rejects invalid controlled stage values', async ({ page, request }) => {
  const accessToken = await login(page, request);
  await page.goto('/app/workflows/designer');

  await expect(page.getByRole('heading', { name: 'Approval Workflow Builder' })).toBeVisible();

  const currentDefinitionResponse = await request.get(`${API_BASE_URL}/api/workflows/definitions/deal-approval`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(currentDefinitionResponse.ok()).toBeTruthy();
  const currentDefinitionPayload = await currentDefinitionResponse.json() as { definitionJson: string };
  const definition = JSON.parse(currentDefinitionPayload.definitionJson) as {
    enabled: boolean;
    scope: { stage: string; status: string };
  };

  definition.enabled = true;
  definition.scope = {
    ...definition.scope,
    stage: 'Invalid Stage',
    status: 'published'
  };

  const publishResponse = await request.put(`${API_BASE_URL}/api/workflows/definitions/deal-approval`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      definitionJson: JSON.stringify(definition),
      isActive: true,
      operation: 'publish'
    }
  });

  expect(publishResponse.status()).toBe(400);
  const errorPayload = await publishResponse.json() as string[] | { errors?: string[] };
  const errors = Array.isArray(errorPayload) ? errorPayload : (errorPayload.errors ?? []);
  expect(errors).toContain('Workflow stage must be one of: prospecting, qualification, proposal, negotiation, security / legal review, commit, closed won, closed lost, all.');
});
