import { test, expect } from '@playwright/test';

const LEAD_URL = 'http://localhost:4201/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit';

async function login(page:any){
  await page.goto('http://localhost:4201/login');
  await page.fill('input[placeholder="Enter your email"]', 'yasser0503@outlook.com');
  await page.fill('input[placeholder="Enter your password"]', 'P@ssword123!');
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL('**/app/**');
}

test('lead form mobile/tablet responsive audit', async ({ browser }) => {
  for (const vp of [{name:'mobile', width:390, height:844},{name:'tablet', width:834, height:1194}]) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await login(page);
    await page.goto(LEAD_URL);
    await page.waitForSelector('.lead-form-page');
    await page.waitForTimeout(600);

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const tabs = Array.from(document.querySelectorAll('.lead-tabs .p-tab')).map((el:any)=>({
        text: (el.textContent||'').trim().replace(/\s+/g,' '),
        width: Math.round(el.getBoundingClientRect().width),
        visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
      }));
      const container = document.querySelector('.form-container') as HTMLElement | null;
      const contactSection = Array.from(document.querySelectorAll('.section-title')).find(el => (el.textContent||'').toLowerCase().includes('contact details'))?.closest('.form-section, .section-block, p-accordion-panel') as HTMLElement | null;
      return {
        docScrollWidth: doc.scrollWidth,
        bodyScrollWidth: body.scrollWidth,
        viewportWidth: window.innerWidth,
        formContainerWidth: container ? Math.round(container.getBoundingClientRect().width) : null,
        tabs,
        activeTabText: (document.querySelector('.lead-tabs .p-tab[aria-selected="true"], .lead-tabs .p-tab.p-tab-active') as HTMLElement | null)?.innerText?.trim() || null
      };
    });

    console.log(vp.name.toUpperCase() + '=' + JSON.stringify(metrics));
    await page.screenshot({ path: `output/playwright/lead-form-${vp.name}-responsive-audit.png`, fullPage: true });
    expect(metrics.docScrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    await context.close();
  }
});
