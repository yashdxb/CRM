import { test, expect } from '@playwright/test';

const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = 'yasser0503@outlook.com';
const PASSWORD = 'yAsh@123';

function decodeJwtPayload(token: string): any {
  const payload = token.split('.')[1];
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
  const pad = normalized.length % 4 ? '='.repeat(4 - (normalized.length % 4)) : '';
  return JSON.parse(Buffer.from(normalized + pad, 'base64').toString('utf8'));
}

test('notification popup rows are readable and non-overlapping', async ({ page, request }) => {
  const loginResp = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(loginResp.ok()).toBeTruthy();
  const loginBody = await loginResp.json();
  const token = loginBody.accessToken as string;
  const claims = decodeJwtPayload(token);
  const userId = claims.sub || claims.nameid || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  expect(userId).toBeTruthy();

  const inboxKey = `notification_inbox:${userId}`;
  const items = [
    {
      id: 'notif-1',
      type: 'warning',
      title: 'Lead follow-up overdue for Nora Patel',
      message: 'Discovery meeting completed, but the next follow-up step has not been logged. Add a next action to keep qualification momentum.',
      createdAt: new Date().toISOString(),
      read: false
    },
    {
      id: 'notif-2',
      type: 'info',
      title: 'Decision Inbox approval assigned to you',
      message: 'Discount exception review for Acme Industrial - Q2 Expansion is waiting in Decision Inbox > Approvals with SLA due today.',
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      read: false
    },
    {
      id: 'notif-3',
      type: 'success',
      title: 'Lead converted successfully',
      message: 'Nora Patel was converted into Account, Contact, and Opportunity records. Continue in Opportunity workflow to request approvals if needed.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: true
    }
  ];

  await page.addInitScript(({ t, tenantKey, key, inbox }) => {
    localStorage.setItem('auth_token', t);
    localStorage.setItem('tenant_key', tenantKey);
    localStorage.setItem(key, JSON.stringify(inbox));
  }, { t: token, tenantKey: 'default', key: inboxKey, inbox: items });

  await page.goto(`${UI}/app/dashboard`, { waitUntil: 'networkidle' });
  const bell = page.locator('.notification-center__button');
  await expect(bell).toBeVisible();
  await bell.click();

  const panel = page.locator('.notification-center__panel');
  await expect(panel).toBeVisible();

  const rows = page.locator('.notification-center__item');
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThanOrEqual(3);

  const overlapInfo = await page.evaluate(() => {
    const rowEls = Array.from(document.querySelectorAll('.notification-center__item')) as HTMLElement[];
    const titleEls = Array.from(document.querySelectorAll('.notification-center__title')) as HTMLElement[];
    const msgEls = Array.from(document.querySelectorAll('.notification-center__message')) as HTMLElement[];
    const typeEls = Array.from(document.querySelectorAll('.notification-center__type')) as HTMLElement[];
    const rowRects = rowEls.map((el) => el.getBoundingClientRect());
    const noRowOverlap = rowRects.every((r, i) => i === 0 || r.top >= rowRects[i - 1].bottom - 1);
    const messagesVisible = msgEls.every((el) => el.clientHeight > 0 && getComputedStyle(el).whiteSpace !== 'nowrap');
    const titlesWrap = titleEls.every((el) => getComputedStyle(el).whiteSpace !== 'nowrap');
    const typesTopAligned = typeEls.every((el, i) => {
      const t = el.getBoundingClientRect();
      const r = rowRects[i];
      return t.top >= r.top - 1 && t.top <= r.top + 10;
    });
    return {
      count: rowEls.length,
      noRowOverlap,
      messagesVisible,
      titlesWrap,
      typesTopAligned,
      rowHeights: rowRects.map((r) => Math.round(r.height)),
      rowTops: rowRects.map((r) => Math.round(r.top))
    };
  });

  console.log('NOTIF_LAYOUT', JSON.stringify(overlapInfo));
  expect(overlapInfo.count).toBeGreaterThanOrEqual(3);
  expect(overlapInfo.noRowOverlap).toBeTruthy();
  expect(overlapInfo.messagesVisible).toBeTruthy();
  expect(overlapInfo.titlesWrap).toBeTruthy();

  await page.screenshot({ path: 'output/playwright/notification-popup-readable-list.png', fullPage: false });
});
