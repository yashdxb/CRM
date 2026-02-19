import { test, expect } from '@playwright/test';

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

test('AI Assistant panel opens and responds to messages', async ({ page, request }) => {
  attachDiagnostics(page);
  await login(page, request);

  await page.route('**/api/assistant/chat', async (route) => {
    const body = JSON.stringify({
      reply: 'Situation Summary\n1. Immediate follow-up is required.\n- Risk remains manageable.',
      messages: []
    });
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body
    });
  });

  // Navigate to dashboard
  await page.goto('/app/dashboard');
  await expect(page.getByRole('heading', { name: 'Command Center' })).toBeVisible();

  // Wait for page to stabilize
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  // Click the AI Assistant button in the topbar using class selector
  const assistantButton = page.locator('button.assistant-topbar');
  await expect(assistantButton).toBeVisible({ timeout: 10000 });
  
  // Wait for button to be stable
  await page.waitForTimeout(300);
  await assistantButton.click({ force: true });

  // Verify the assistant panel is visible
  const assistantPanel = page.locator('aside.assistant-panel');
  await expect(assistantPanel).toBeVisible({ timeout: 10000 });

  // Verify the greeting message is displayed
  const greeting = assistantPanel.locator('text=/Hi .*, (Good morning|Good afternoon|Good evening)/');
  await expect(greeting).toBeVisible({ timeout: 5000 });

  // Find the message input field
  const messageInput = assistantPanel.locator('input[placeholder="Ask AI Assistant…"]');
  await expect(messageInput).toBeVisible();

  // Send a test message
  const testMessage = 'What is this CRM about?';
  await messageInput.fill(testMessage);
  
  // Send by pressing Enter in the input field.
  await messageInput.press('Enter');

  // Wait for the user message to appear
  const userMessage = assistantPanel.locator('text=' + testMessage);
  await expect(userMessage).toBeVisible({ timeout: 5000 });

  // Wait for user message and then any assistant outcome (reply or graceful error/info message).
  await expect(
    assistantPanel.locator('.assistant-message').filter({ hasText: 'You' }).last()
  ).toBeVisible({ timeout: 10000 });

  const assistantMessages = assistantPanel.locator('.assistant-message:not(.user)');
  await expect.poll(async () => assistantMessages.count(), { timeout: 15000 }).toBeGreaterThan(1);

  // Verify assistant outcome message has content.
  const outcomeText = await assistantMessages.last().textContent();
  expect((outcomeText ?? '').trim().length).toBeGreaterThan(10);

  console.log('✅ Assistant response received:', outcomeText?.substring(0, 100) + '...');
});

test('AI Assistant handles errors gracefully', async ({ page, request }) => {
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/dashboard');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  
  const assistantButton = page.locator('button.assistant-topbar');
  await expect(assistantButton).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(300);
  await assistantButton.click({ force: true });

  const assistantPanel = page.locator('aside.assistant-panel');
  await expect(assistantPanel).toBeVisible({ timeout: 10000 });
  const messageInput = assistantPanel.locator('input[placeholder="Ask AI Assistant…"]');
  await expect(messageInput).toBeVisible({ timeout: 5000 });

  // Try sending with just whitespace
  await messageInput.fill('   ');
  await messageInput.press('Enter');

  // Should not send or show error gracefully
  await page.waitForTimeout(500);

  // No user message with whitespace should be added.
  const userMessages = assistantPanel.locator('.assistant-message.user');
  expect(await userMessages.count()).toBe(0);
});

test('AI Assistant panel can be collapsed and restored', async ({ page, request }) => {
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/dashboard');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  
  const assistantButton = page.locator('button.assistant-topbar');
  await expect(assistantButton).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(300);
  await assistantButton.click({ force: true });

  const assistantPanel = page.locator('aside.assistant-panel');
  await expect(assistantPanel).toBeVisible();
  const assistantInput = assistantPanel.locator('.assistant-input');
  await expect(assistantInput).toBeVisible();

  // Click the collapse button
  const collapseButton = assistantPanel.locator('.assistant-controls .assistant-control').first();
  await expect(collapseButton).toBeVisible();
  await collapseButton.click();
  await expect(assistantInput).toBeHidden();

  // Panel should still exist but be minimized
  const collapsedState = await page.evaluate(() => localStorage.getItem('crm_assistant_collapsed'));
  expect(collapsedState).toBe('true');

  // Restore by clicking topbar assistant toggle.
  await assistantButton.click({ force: true });
  await expect(assistantPanel).toBeVisible();
  await expect(assistantInput).toBeVisible();
  const restoredState = await page.evaluate(() => localStorage.getItem('crm_assistant_collapsed'));
  expect(restoredState).toBe('false');
});
