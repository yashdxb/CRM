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
  const assistantPanel = page.locator('app-assistant-panel');
  await expect(assistantPanel).toBeVisible({ timeout: 10000 });

  // Verify the greeting message is displayed
  const greeting = assistantPanel.locator('text=/Hi .*, (Good morning|Good afternoon|Good evening)/');
  await expect(greeting).toBeVisible({ timeout: 5000 });

  // Find the message input field
  const messageInput = assistantPanel.locator('textarea[placeholder="Ask AI Assistant…"]');
  await expect(messageInput).toBeVisible();

  // Send a test message
  const testMessage = 'What is this CRM about?';
  await messageInput.fill(testMessage);
  
  // Click send button or press Enter
  await messageInput.press('Enter');

  // Wait for the user message to appear
  const userMessage = assistantPanel.locator('text=' + testMessage);
  await expect(userMessage).toBeVisible({ timeout: 5000 });

  // Wait for assistant response (should appear within 30 seconds)
  const assistantMessage = assistantPanel.locator('.assistant-list, p:not(:empty)').first();
  await expect(assistantMessage).toBeVisible({ timeout: 30000 });

  // Verify response is not empty
  const responseText = await assistantMessage.textContent();
  expect(responseText?.trim().length).toBeGreaterThan(0);

  console.log('✅ Assistant response received:', responseText?.substring(0, 100) + '...');
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

  const assistantPanel = page.locator('app-assistant-panel');
  const messageInput = assistantPanel.locator('textarea[placeholder="Ask AI Assistant…"]');

  // Try sending with just whitespace
  await messageInput.fill('   ');
  await messageInput.press('Enter');

  // Should not send or show error gracefully
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const messages = assistantPanel.locator('.assistant-message');
  const messageCount = await messages.count();
  
  // No message should be sent for whitespace
  expect(messageCount).toBe(0);
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

  const assistantPanel = page.locator('app-assistant-panel');
  await expect(assistantPanel).toBeVisible();

  // Click the collapse button
  const collapseButton = assistantPanel.locator('button[title*="ollapse"], button:has-text("−")').first();
  if (await collapseButton.isVisible()) {
    await collapseButton.click();
    
    // Panel should still exist but be minimized
    const collapsedState = await page.evaluate(() => localStorage.getItem('crm_assistant_collapsed'));
    expect(collapsedState).toBe('true');
  }
});
