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
  
  return payload.accessToken;
}

test.describe('Telerik Reports Debug', () => {
  test('debug telerik viewer loading', async ({ page, request }) => {
    // Capture all network responses
    const networkResponses: { url: string; status: number; body?: string }[] = [];
    const errors401: string[] = [];
    const consoleErrors: string[] = [];
    const consoleLogs: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
      if (msg.text().includes('[Telerik]')) {
        consoleLogs.push(msg.text());
      }
    });
    
    page.on('response', async response => {
      const url = response.url();
      if (url.includes('/api/')) {
        let body = '';
        try {
          body = await response.text();
        } catch (e) {
          body = 'Unable to read body';
        }
        networkResponses.push({ url, status: response.status(), body: body.substring(0, 500) });
        if (response.status() === 401) {
          errors401.push(url);
        }
        // Log telerik calls
        if (url.includes('telerik-reports')) {
          console.log(`TELERIK: ${response.status()} ${url}`);
          if (!url.includes('resources')) {
            console.log('  Response:', body.substring(0, 300));
          }
        }
        // Also log formats and version specifically
        if (url.includes('formats') || url.includes('version')) {
          console.log(`DISCOVERY: ${response.status()} ${url}`);
          console.log('  Response:', body.substring(0, 300));
        }
      }
    });

    // Login using API
    const token = await login(page, request);
    console.log('Got token:', token.substring(0, 50) + '...');

    // Navigate to Reports page
    await page.goto('/app/reports');
    await page.waitForLoadState('networkidle');
    
    // Wait for Telerik viewer to fully load (give it more time for report rendering)
    await page.waitForTimeout(10000);
    
    // Print API responses
    console.log('\n=== API Responses ===');
    networkResponses.forEach(r => {
      console.log(`${r.status} ${r.url}`);
      if (r.url.includes('embed-config') || r.url.includes('telerik-reports/clients') || r.url.includes('instances')) {
        console.log('  Body:', r.body);
      }
    });
    
    // Print 401 errors
    if (errors401.length > 0) {
      console.log('\n=== 401 ERRORS ===');
      errors401.forEach(url => console.log(url));
    }
    
    // Check for error text on page
    const pageText = await page.locator('body').textContent();
    console.log('\n=== Page content search ===');
    
    if (pageText?.includes('does not match')) {
      console.log('VERSION MISMATCH FOUND!');
      // Find the exact error message
      const errorPane = page.locator('.trv-error-pane, [class*="error"]');
      const errorText = await errorPane.allTextContents();
      console.log('Error messages:', errorText);
    }
    
    if (pageText?.includes('401') || pageText?.includes('Unauthorized')) {
      console.log('AUTH ERROR TEXT FOUND!');
    }
    
    // Check for successful report rendering
    const reportPages = page.locator('.trv-pages-area, .trv-page-container');
    const reportPagesCount = await reportPages.count();
    console.log(`Report pages found: ${reportPagesCount}`);
    
    // Check for error pane
    const errorPaneVisible = await page.locator('.trv-error-pane').isVisible().catch(() => false);
    console.log(`Error pane visible: ${errorPaneVisible}`);
    
    if (errorPaneVisible) {
      const errorPaneContent = await page.locator('.trv-error-pane').textContent().catch(() => 'Cannot read');
      const errorPaneHtml = await page.locator('.trv-error-pane').innerHTML().catch(() => 'Cannot read');
      console.log('\n=== ERROR PANE CONTENT ===');
      console.log('Text:', errorPaneContent);
      console.log('HTML:', errorPaneHtml);
      
      // Check visibility state
      const computedStyle = await page.locator('.trv-error-pane').evaluate(el => {
        const style = window.getComputedStyle(el);
        return { display: style.display, visibility: style.visibility, opacity: style.opacity };
      });
      console.log('Error pane computed style:', computedStyle);
    }
    
    // Check pages area content
    const pagesArea = await page.locator('.trv-pages-area').innerHTML().catch(() => 'N/A');
    console.log('\n=== Pages area HTML (first 1000 chars) ===');
    console.log(pagesArea.substring(0, 1000));
    
    // Check if viewer has reportSource
    const viewerEl = page.locator('tr-viewer');
    const viewerAttributeInfo = await viewerEl.evaluate(el => {
      // Get Angular component
      const ngComponent = (el as any).__ngContext__;
      return {
        attributes: Array.from(el.attributes).map((a: any) => ({ name: a.name, value: a.value })),
        innerHTML: el.innerHTML.substring(0, 500),
        ngContext: ngComponent ? 'present' : 'absent'
      };
    }).catch(() => ({ error: 'Could not evaluate' }));
    console.log('\n=== tr-viewer element info ===');
    console.log(JSON.stringify(viewerAttributeInfo, null, 2));
    
    // Click refresh button in viever toolbar to trigger report reload
    const refreshBtn = page.locator('button[data-command="refresh"]');
    if (await refreshBtn.count() > 0) {
      console.log('\nAttempting to click refresh button...');
      await refreshBtn.click({ force: true });
      await page.waitForTimeout(5000);
      
      // Check if any client calls were made after refresh
      console.log('\n=== Network after refresh ===');
      networkResponses.filter(r => r.url.includes('telerik-reports') && !r.url.includes('resources')).forEach(r => {
        console.log(`${r.status} ${r.url}`);
      });
    }

    // Take screenshot
    await page.screenshot({ path: 'output/telerik-debug.png', fullPage: true });
    console.log('\nScreenshot saved to output/telerik-debug.png');
    
    // Print console errors
    if (consoleErrors.length > 0) {
      console.log('\n=== BROWSER CONSOLE ERRORS ===');
      consoleErrors.forEach(err => console.log(err));
    } else {
      console.log('\nNo browser console errors captured');
    }
    
    // Print Telerik console logs
    if (consoleLogs.length > 0) {
      console.log('\n=== TELERIK CONSOLE LOGS ===');
      consoleLogs.forEach(log => console.log(log));
    } else {
      console.log('\nNo [Telerik] console logs captured');
    }
    
    // Get full embed-shell content
    const embedContent = await page.locator('.embed-shell').innerHTML().catch(() => 'N/A');
    console.log('\n=== Full embed-shell HTML (first 3000 chars) ===');
    console.log(embedContent.substring(0, 3000));
  });
});
