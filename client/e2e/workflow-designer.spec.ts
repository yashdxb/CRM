import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://localhost:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function expectWorkflowHeading(page) {
  await expect(page.getByRole('heading', { name: /workflow builder/i })).toBeVisible();
}

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });

  expect(response.ok()).toBeTruthy();
  const payloadText = await response.text();
  expect(payloadText).toBeTruthy();
  const payload = JSON.parse(payloadText);
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
  await page.goto('/app/workflows/designer/legacy');

  await expectWorkflowHeading(page);
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

  const nodeCountBefore = await page.locator('.node-selection-chip').count();
  await page.getByRole('button', { name: /Quick Add Approval Step/i }).click();
  await expect.poll(async () => page.locator('.node-selection-chip').count()).toBeGreaterThan(nodeCountBefore);

  await page.getByRole('button', { name: /Add Condition node/i }).click();
  await page.getByRole('button', { name: /Add Notification node/i }).click();

  const notificationChip = page.locator('.node-selection-chip', { hasText: 'Notification' }).last();
  await notificationChip.click({ force: true });
  await expect(page.locator('.properties-card .step-header strong')).toHaveText('Notification');
  await page.locator('.properties-card input[placeholder="Notification"]').fill('Finance Alert');

  const conditionChip = page.locator('.node-selection-chip', { hasText: 'Condition' }).last();
  await conditionChip.click({ force: true });
  await expect(page.locator('.properties-card .step-header strong')).toHaveText('Condition');

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
  await page.goto('/app/workflows/designer/legacy');

  const templateSelect = page.locator('.template-bar .p-select');
  await templateSelect.click();
  await templateSelect.press('ArrowDown');
  await templateSelect.press('Enter');

  await expect(page.locator('.scope-grid input').first()).toHaveValue('Discount Approval Workflow');
  await expect(page.locator('.properties-card')).toBeVisible();
  await expect(page.locator('.properties-card label', { hasText: 'Minimum security level' }).first()).toBeVisible();

  const publishRequest = page.waitForRequest((candidate) =>
    candidate.method() === 'PUT' && candidate.url().includes('/api/workflows/definitions/deal-approval')
  );
  await page.getByRole('button', { name: /^Publish$/i }).click();
  const publishHttpRequest = await publishRequest;
  const payload = publishHttpRequest.postDataJSON() as { definitionJson?: string; operation?: string };
  expect(payload.operation).toBe('publish');

  const definition = JSON.parse(payload.definitionJson as string) as {
    scope?: { trigger?: string; stage?: string; pipeline?: string };
    steps?: Array<unknown>;
  };
  expect(definition.scope?.trigger).toBe('on-discount-threshold');
  expect(definition.scope?.pipeline).toBe('default');
  expect(definition.scope?.stage).toBeTruthy();
  expect(definition.steps?.length).toBe(2);
});

test('workflow publish validation rejects invalid controlled stage values', async ({ page, request }) => {
  const accessToken = await login(page, request);
  await page.goto('/app/workflows/designer/legacy');

  await expectWorkflowHeading(page);

  const currentDefinitionResponse = await request.get(`${API_BASE_URL}/api/workflows/definitions/deal-approval`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(currentDefinitionResponse.ok()).toBeTruthy();
  const currentDefinitionPayload = await currentDefinitionResponse.json() as { definitionJson: string };
  const metadataResponse = await request.get(`${API_BASE_URL}/api/workflows/definitions/deal-approval/metadata`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(metadataResponse.ok()).toBeTruthy();
  const metadata = await metadataResponse.json() as { stages?: Array<{ value: string }> };
  const definition = JSON.parse(currentDefinitionPayload.definitionJson) as {
    enabled: boolean;
    scope: { stage: string; status: string; name: string; purpose: string; module: string; pipeline: string; trigger: string; version: number };
    steps?: Array<unknown>;
    nodes?: Array<unknown>;
    connections?: Array<unknown>;
  };

  if (!definition.steps?.length || !definition.nodes?.length || !definition.connections?.length) {
    definition.steps = [
      { order: 1, approverRoleId: null, approverRole: 'Sales Manager', minimumSecurityLevelId: null, amountThreshold: null, purpose: 'Deal Approval', nodeId: 'approval-step-1' }
    ];
    definition.nodes = [
      { id: 'start', type: 'start', x: 40, y: 180, label: 'Start', config: null },
      { id: 'approval-step-1', type: 'approval', x: 300, y: 180, label: 'Step 1', config: null },
      { id: 'end', type: 'end', x: 560, y: 180, label: 'End', config: null }
    ];
    definition.connections = [
      { source: 'start', target: 'approval-step-1', label: null, branchKey: null },
      { source: 'approval-step-1', target: 'end', label: null, branchKey: null }
    ];
  }

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
  expect(errors.some((error) => error.startsWith('Workflow stage must be one of:'))).toBeTruthy();
  for (const stage of metadata.stages ?? []) {
    if (stage.value) {
      expect(errors.join(' | ')).toContain(stage.value);
    }
  }
});
