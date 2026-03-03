import { test, expect, type Page, type APIRequestContext, type Browser } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const TENANT_KEY = 'default';

const USER_A_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const USER_A_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

const USER_B_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const USER_B_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';

async function loginViaApi(page: Page, request: APIRequestContext, email: string, password: string) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': TENANT_KEY
    },
    data: { email, password }
  });
  const payload = await response.json();
  if (!response.ok() || !payload?.accessToken) {
    throw new Error(`API login failed for ${email}: ${response.status()}`);
  }

  await page.addInitScript(
    ({ token, tenantKey }) => {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('tenant_key', tenantKey);
    },
    { token: payload.accessToken as string, tenantKey: TENANT_KEY }
  );
}

async function openDirectChatWithOnlineUser(page: Page, targetNameHint: string) {
  await page.locator('button.footer-presence').click();
  const popup = page.locator('.online-presence-popup');
  await expect(popup).toBeVisible();

  const targetRow = popup.locator('.online-presence-item', {
    has: page.locator('.online-presence-name', { hasText: targetNameHint })
  });

  if (await targetRow.count()) {
    await targetRow.first().locator('button.online-presence-chat-btn').click();
  } else {
    await popup.locator('button.online-presence-chat-btn:not(:disabled)').first().click();
  }

  await expect(page.locator('.direct-chat-panel')).toBeVisible();
}

async function sendChatMessage(page: Page, content: string) {
  const input = page.locator('.direct-chat-compose input[placeholder="Type a message..."]');
  await expect(input).toBeVisible();
  await input.fill(content);
  await page.locator('.direct-chat-compose button', { hasText: 'Send' }).click();
}

test('bottom-bar chat supports clear thread context and unread updates between two users', async ({ browser, request }) => {
  const contextA = await browser.newContext();
  const contextB = await browser.newContext();
  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();

  await loginViaApi(pageA, request, USER_A_EMAIL, USER_A_PASSWORD);
  await loginViaApi(pageB, request, USER_B_EMAIL, USER_B_PASSWORD);

  await Promise.all([
    pageA.goto('/app/dashboard'),
    pageB.goto('/app/dashboard')
  ]);

  await Promise.all([
    expect(pageA.getByRole('heading', { name: 'Command Center' })).toBeVisible(),
    expect(pageB.getByRole('heading', { name: 'Command Center' })).toBeVisible()
  ]);

  await openDirectChatWithOnlineUser(pageA, 'Leo');

  const messageFromA = `chat-a-${Date.now()}`;
  await sendChatMessage(pageA, messageFromA);
  await expect(pageA.locator('.direct-chat-message').filter({ hasText: messageFromA }).last()).toBeVisible();

  const chatBadgeB = pageB.locator('button.footer-chat .footer-chat-badge');
  await expect(chatBadgeB).toBeVisible({ timeout: 15000 });

  await pageB.locator('button.footer-chat').click();
  await expect(pageB.locator('.direct-chat-panel')).toBeVisible();
  await expect(pageB.locator('.direct-chat-thread-item').first()).toBeVisible();
  await expect(pageB.locator('.direct-chat-message').filter({ hasText: messageFromA }).last()).toBeVisible({ timeout: 15000 });

  await pageA.locator('.direct-chat-close').click();
  await expect(pageA.locator('.direct-chat-panel')).toHaveCount(0);

  const messageFromB = `chat-b-${Date.now()}`;
  await sendChatMessage(pageB, messageFromB);
  await expect(pageB.locator('.direct-chat-message').filter({ hasText: messageFromB }).last()).toBeVisible();

  await expect(pageA.locator('button.footer-chat .footer-chat-badge')).toBeVisible({ timeout: 15000 });
  await pageA.locator('button.footer-chat').click();
  await expect(pageA.locator('.direct-chat-thread-item').first()).toBeVisible();
  await expect(pageA.locator('.direct-chat-thread-item').first()).toContainText(/chat-[ab]-/);
  await expect(pageA.locator('.direct-chat-message').filter({ hasText: messageFromB }).last()).toBeVisible({ timeout: 15000 });

  await Promise.all([contextA.close(), contextB.close()]);
});
