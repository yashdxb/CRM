import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page: any, request: any): Promise<string> {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: EMAIL, password: PASSWORD }
  });
  const payload = await response.json();
  if (!response.ok() || !payload?.accessToken) {
    throw new Error(`login failed ${response.status()}`);
  }

  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  return payload.accessToken as string;
}

test('chat thread list is ascending by lastMessageAtUtc (oldest top, newest bottom)', async ({ page, request }) => {
  test.setTimeout(120_000);
  const token = await login(page, request);

  const meResp = await request.get(`${API_BASE_URL}/api/tenant-context`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  const mePayload = (await meResp.json()) as { user?: { id?: string | null } };
  const myUserId = mePayload?.user?.id ?? null;

  const usersResp = await request.get(`${API_BASE_URL}/api/users/lookup?take=50`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  const users = (await usersResp.json()) as Array<{ id: string }>;
  const otherUserIds = users
    .map((user) => user.id)
    .filter((id) => Boolean(id) && id !== myUserId);

  if (otherUserIds.length > 0) {
    // Create/open an extra conversation so ordering can be validated with >1 threads.
    const participants = otherUserIds.slice(0, Math.min(3, otherUserIds.length));
    await request.post(`${API_BASE_URL}/api/chat/threads/open`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Key': 'default',
        Authorization: `Bearer ${token}`
      },
      data: { participantUserIds: participants }
    });
  }

  const apiThreadsResp = await request.get(`${API_BASE_URL}/api/chat/threads`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  expect(apiThreadsResp.ok()).toBeTruthy();
  const apiThreads = (await apiThreadsResp.json()) as Array<{ threadId: string; lastMessageAtUtc: string }>;
  expect(apiThreads.length).toBeGreaterThan(0);

  const expectedOrder = [...apiThreads]
    .sort((a, b) => {
      const at = Number.isFinite(new Date(a.lastMessageAtUtc).getTime())
        ? new Date(a.lastMessageAtUtc).getTime()
        : Number.MAX_SAFE_INTEGER;
      const bt = Number.isFinite(new Date(b.lastMessageAtUtc).getTime())
        ? new Date(b.lastMessageAtUtc).getTime()
        : Number.MAX_SAFE_INTEGER;
      return at - bt || a.threadId.localeCompare(b.threadId);
    })
    .map((item) => item.threadId);

  await page.goto('/app/dashboard');
  await expect(page.getByRole('heading', { name: 'Command Center' })).toBeVisible();
  await page.locator('button.footer-chat').click();
  await expect(page.locator('.direct-chat-panel')).toBeVisible();
  await expect(page.locator('.direct-chat-thread-item').first()).toBeVisible();

  const renderedOrder = await page
    .locator('.direct-chat-thread-item')
    .evaluateAll((nodes) =>
      nodes
        .map((node) => node.getAttribute('data-thread-id'))
        .filter((value): value is string => Boolean(value))
    );

  expect(renderedOrder.length).toBe(expectedOrder.length);
  expect(renderedOrder).toEqual(expectedOrder);
});
