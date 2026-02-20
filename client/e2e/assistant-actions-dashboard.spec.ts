import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
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
    throw new Error('Unable to authenticate against the API for UI test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('dashboard assistant action queue execute/review flow', async ({ page, request }) => {
  await login(page, request);

  let executeCalled = 0;
  let reviewCalled = 0;

  await page.route('**/api/assistant/insights**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        scope: 'Self',
        generatedAtUtc: new Date().toISOString(),
        kpis: [
          { key: 'at-risk-deals', label: 'At-Risk Deals', value: 2, severity: 'danger' },
          { key: 'sla-breaches', label: 'Lead SLA Breaches', value: 1, severity: 'danger' },
          { key: 'pending-approvals', label: 'Pending Approvals', value: 1, severity: 'warn' }
        ],
        actions: [
          {
            id: 'sla-first-touch',
            title: 'Recover breached first-touch SLAs',
            description: '1 lead missed SLA.',
            score: 62,
            riskTier: 'low',
            urgency: 'soon',
            ownerScope: 'Rep/Owner',
            dueWindow: 'Today',
            actionType: 'lead_follow_up',
            entityType: null,
            entityId: null,
            priority: 100
          },
          {
            id: 'approval-queue',
            title: 'Clear pending approvals',
            description: '1 approval is pending.',
            score: 91,
            riskTier: 'high',
            urgency: 'immediate',
            ownerScope: 'Approver',
            dueWindow: '48 hours',
            actionType: 'approval_follow_up',
            entityType: 'opportunity',
            entityId: '00000000-0000-0000-0000-000000000222',
            priority: 90
          }
        ]
      })
    });
  });

  await page.route('**/api/assistant/actions/execute**', async (route) => {
    executeCalled += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'Executed',
        message: 'Action executed successfully.',
        requiresReview: false,
        createdActivityId: '00000000-0000-0000-0000-000000000333',
        createdApprovalId: null
      })
    });
  });

  await page.route('**/api/assistant/actions/review**', async (route) => {
    reviewCalled += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'Rejected',
        message: 'Action rejected after review.',
        requiresReview: false,
        createdActivityId: null,
        createdApprovalId: null
      })
    });
  });

  await page.goto('/app/dashboard');
  const section = page.locator('section.ai-orchestration-section');
  await expect(section).toBeVisible();
  await expect(section.locator('.ai-action-row')).toHaveCount(2);

  await section.locator('.ai-cta-btn').filter({ hasText: 'Execute' }).first().click();
  await expect.poll(() => executeCalled).toBe(1);

  await section.locator('.ai-cta-btn').filter({ hasText: 'Review' }).first().click();
  await expect(page.getByRole('dialog', { name: 'Review Assistant Action' })).toBeVisible();
  await page.getByRole('button', { name: 'Reject' }).click();
  await expect.poll(() => reviewCalled).toBe(1);
});
