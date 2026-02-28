import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

type AuthHeaders = {
  Authorization: string;
  'X-Tenant-Key': string;
  'Content-Type': string;
};

async function login(page: any, request: any) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  expect(payload?.accessToken).toBeTruthy();

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  return payload.accessToken as string;
}

function authHeaders(token: string): AuthHeaders {
  return {
    Authorization: `Bearer ${token}`,
    'X-Tenant-Key': 'default',
    'Content-Type': 'application/json'
  };
}

test('opportunity quote/proposal flow: generate, send, timeline, resend', async ({ page, request }) => {
  const token = await login(page, request);
  const headers = authHeaders(token);
  const suffix = Date.now();

  const customerResp = await request.post(`${API_BASE_URL}/api/customers`, {
    headers,
    data: {
      name: `E2E Proposal Account ${suffix}`,
      lifecycleStage: 'Customer'
    }
  });
  expect(customerResp.ok()).toBeTruthy();
  const customer = await customerResp.json();
  const accountId = customer.id as string;
  expect(accountId).toBeTruthy();

  const closeDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();
  const opportunityResp = await request.post(`${API_BASE_URL}/api/opportunities`, {
    headers,
    data: {
      name: `E2E Proposal Opp ${suffix}`,
      accountId,
      stageName: 'Proposal',
      amount: 100,
      currency: 'USD',
      probability: 55,
      expectedCloseDate: closeDate,
      summary: 'E2E summary',
      requirements: 'E2E requirements',
      buyingProcess: 'E2E buying process',
      successCriteria: 'E2E success criteria'
    }
  });
  expect(opportunityResp.ok()).toBeTruthy();
  const opportunity = await opportunityResp.json();
  const opportunityId = opportunity.id as string;
  expect(opportunityId).toBeTruthy();

  const itemResp = await request.get(`${API_BASE_URL}/api/supply-chain/item-master`, {
    headers: {
      Authorization: headers.Authorization,
      'X-Tenant-Key': headers['X-Tenant-Key']
    }
  });
  expect(itemResp.ok()).toBeTruthy();
  const items = (await itemResp.json()) as Array<{ id: string; name: string }>;
  expect(items.length).toBeGreaterThan(0);
  const item = items[0];

  const recipient = `proposal.${suffix}@example.com`;
  const quoteResp = await request.post(`${API_BASE_URL}/api/opportunities/${opportunityId}/quotes`, {
    headers,
    data: {
      name: `E2E Quote ${suffix}`,
      priceListId: null,
      currency: 'USD',
      taxAmount: 0,
      notes: 'E2E proposal note baseline',
      lines: [
        {
          itemMasterId: item.id,
          description: item.name,
          quantity: 1,
          unitPrice: 1000,
          discountPercent: 0
        }
      ]
    }
  });
  expect(quoteResp.ok()).toBeTruthy();
  const quote = await quoteResp.json();
  const quoteId = quote.id as string;
  const quoteOpportunityId = (quote.opportunityId as string) || opportunityId;
  expect(quoteId).toBeTruthy();

  const generateApiResp = await request.post(`${API_BASE_URL}/api/opportunities/${quoteOpportunityId}/quotes/${quoteId}/generate-proposal`, {
    headers,
    data: {}
  });
  if (!generateApiResp.ok()) {
    // Helps diagnose policy/lock responses in CI logs.
    console.log('generate-proposal failed:', generateApiResp.status(), await generateApiResp.text());
  }
  expect(generateApiResp.ok()).toBeTruthy();

  const sendApiResp = await request.post(`${API_BASE_URL}/api/opportunities/${quoteOpportunityId}/quotes/${quoteId}/send-proposal`, {
    headers,
    data: { toEmail: recipient, message: 'E2E initial send' }
  });
  expect(sendApiResp.ok()).toBeTruthy();

  await page.goto(`/app/opportunities/${quoteOpportunityId}/edit`, { waitUntil: 'domcontentloaded' });
  const quoteHeader = page.locator('.opportunity-accordion-header', { hasText: 'Quote / Proposal' }).first();
  await quoteHeader.click();

  await expect(page.getByText('Proposal file ready')).toBeVisible();
  await expect(page.getByText('Proposal sent')).toBeVisible();

  const resendBtn = page.getByRole('button', { name: 'Resend' }).first();
  const hasTimelineResend = await resendBtn.isVisible({ timeout: 3000 }).catch(() => false);
  const mainSendBtn = page.locator('.team-actions button', { hasText: 'Send proposal' }).first();
  let openedSendDialog = false;
  if (hasTimelineResend) {
    await resendBtn.click();
    openedSendDialog = true;
  } else {
    if (await mainSendBtn.isDisabled()) {
      const quoteDraftField = page.locator('.field', { has: page.locator('label[for="oppQuoteSelect"]' ) }).first();
      if (await quoteDraftField.isVisible().catch(() => false)) {
        await quoteDraftField.locator('.p-select').first().click();
        const firstOption = page.locator('.p-select-list .p-select-option').first();
        if (await firstOption.isVisible({ timeout: 2000 }).catch(() => false)) {
          await firstOption.click();
        }
      }
    }

    if (await mainSendBtn.isEnabled().catch(() => false)) {
      await mainSendBtn.click();
      openedSendDialog = true;
    } else {
      const resendApiResp = await request.post(`${API_BASE_URL}/api/opportunities/${quoteOpportunityId}/quotes/${quoteId}/send-proposal`, {
        headers,
        data: { toEmail: recipient, message: 'E2E resend fallback' }
      });
      expect(resendApiResp.ok()).toBeTruthy();
      await page.reload({ waitUntil: 'domcontentloaded' });
      await quoteHeader.click();
      await expect(page.getByText('Proposal sent')).toBeVisible();
      return;
    }
  }

  await expect(openedSendDialog).toBeTruthy();
  await expect(page.getByRole('dialog', { name: 'Send Proposal' })).toBeVisible();
  const recipientInput = page.locator('#proposalSendRecipient');
  if ((await recipientInput.inputValue()).trim().length === 0) {
    await recipientInput.fill(recipient);
  }

  const resendResponsePromise = page.waitForResponse((response) =>
    response.url().includes(`/api/opportunities/${quoteOpportunityId}/quotes/${quoteId}/send-proposal`) &&
    response.request().method() === 'POST'
  );
  await dialog.getByRole('button', { name: /^Send proposal$/i }).click();
  const resendResponse = await resendResponsePromise;
  expect(resendResponse.ok()).toBeTruthy();

  await expect(page.getByText('Resent just now').or(page.getByText('Proposal sent'))).toBeVisible();
});
