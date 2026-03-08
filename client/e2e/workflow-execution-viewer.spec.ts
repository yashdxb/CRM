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
    throw new Error('Unable to authenticate against the API for workflow execution viewer test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  return payload.accessToken as string;
}

test('workflow execution viewer shows persisted execution metadata for a deal approval', async ({ page, request }) => {
  const accessToken = await login(page, request);

  const rolesResponse = await request.get(`${API_BASE_URL}/api/roles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(rolesResponse.ok()).toBeTruthy();
  const roles = await rolesResponse.json() as Array<{ id: string; name: string }>;
  const approverRole = roles.find((role) => role.name === 'Sales Manager') ?? roles[0];
  expect(approverRole).toBeTruthy();

  const workflowDefinitionResponse = await request.get(`${API_BASE_URL}/api/workflows/definitions/deal-approval`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(workflowDefinitionResponse.ok()).toBeTruthy();

  const workflowDefinitionPayload = await workflowDefinitionResponse.json() as { definitionJson: string };
  const workflowDefinition = JSON.parse(workflowDefinitionPayload.definitionJson) as {
    enabled: boolean;
    scope: {
      name: string;
      purpose: string;
      module: string;
      pipeline: string;
      stage: string;
      trigger: string;
      status: string;
      version: number;
    };
  };

  workflowDefinition.enabled = true;
  workflowDefinition.scope = {
    ...workflowDefinition.scope,
    status: 'published',
    purpose: workflowDefinition.scope.purpose || 'Control discount and commercial approvals for opportunities.',
    module: workflowDefinition.scope.module || 'opportunities',
    pipeline: workflowDefinition.scope.pipeline || 'default',
    stage: workflowDefinition.scope.stage || 'proposal',
    trigger: workflowDefinition.scope.trigger || 'on-stage-change',
    version: Math.max(1, workflowDefinition.scope.version || 1)
  };

  const approvalNodeId = 'approval-step-1';
  workflowDefinition.nodes = [
    { id: 'start', type: 'start', x: 40, y: 180, label: 'Start' },
    { id: approvalNodeId, type: 'approval', x: 220, y: 180, label: 'Sales Manager Approval' },
    { id: 'end', type: 'end', x: 430, y: 180, label: 'End' }
  ];
  workflowDefinition.connections = [
    { source: 'start', target: approvalNodeId },
    { source: approvalNodeId, target: 'end' }
  ];
  workflowDefinition.steps = [
    {
      approverRoleId: approverRole!.id,
      approverRole: approverRole!.name,
      nodeId: approvalNodeId,
      order: 1
    }
  ];

  const publishResponse = await request.put(`${API_BASE_URL}/api/workflows/definitions/deal-approval`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      definitionJson: JSON.stringify(workflowDefinition),
      isActive: true,
      operation: 'publish'
    }
  });
  expect(publishResponse.ok()).toBeTruthy();

  const suffix = Date.now();
  const customerResponse = await request.post(`${API_BASE_URL}/api/customers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      name: `E2E Workflow Account ${suffix}`,
      lifecycleStage: 'Customer'
    }
  });
  expect(customerResponse.ok()).toBeTruthy();
  const customer = await customerResponse.json() as { id: string };

  const closeDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();
  const opportunityResponse = await request.post(`${API_BASE_URL}/api/opportunities`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      name: `E2E Opportunity ${suffix}`,
      accountId: customer.id,
      stageName: 'Proposal',
      amount: 1000,
      currency: 'USD',
      probability: 60,
      expectedCloseDate: closeDate,
      summary: 'E2E summary',
      requirements: 'E2E requirements',
      buyingProcess: 'E2E buying process',
      successCriteria: 'E2E success criteria'
    }
  });
  expect(opportunityResponse.ok()).toBeTruthy();
  const opportunity = await opportunityResponse.json() as { id: string; name: string; amount: number; currency?: string | null };

  const approvalResponse = await request.post(`${API_BASE_URL}/api/opportunities/${opportunity!.id}/approvals`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      amount: opportunity!.amount,
      currency: opportunity!.currency || 'USD',
      purpose: 'Deal Approval'
    }
  });
  expect(approvalResponse.ok()).toBeTruthy();

  await page.goto('/app/workflows/executions');

  await expect(page.getByRole('heading', { name: 'Workflow Execution Viewer' })).toBeVisible();

  const currentExecutionCard = page.locator('.current-card');
  await expect(currentExecutionCard.getByText(opportunity!.name, { exact: false }).first()).toBeVisible();
  await expect(currentExecutionCard.getByText(/Step\s+\d+\s+of\s+\d+/i)).toBeVisible();
  await expect(currentExecutionCard.getByText(/Pending Approver/i)).toBeVisible();

  await page.goto('/app/decisions/pending-action');
  await expect(page.getByRole('heading', { name: 'Pending Action', exact: true })).toBeVisible();
  const workflowRow = page.locator('.pending-actions-table tbody tr', { hasText: opportunity!.name }).first();
  await expect(workflowRow.getByText(/From workflow:/i)).toBeVisible();
  await workflowRow.locator('.action-btn').nth(1).click();

  await expect(page).toHaveURL(/\/app\/workflows\/executions\?executionId=/);
  await expect(page.getByRole('heading', { name: 'Focused Execution' })).toBeVisible();
  await expect(page.locator('.history-item.selected')).toContainText(opportunity!.name);
});
