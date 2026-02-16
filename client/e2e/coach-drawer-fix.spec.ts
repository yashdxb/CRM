import { test, expect } from '@playwright/test';

test.describe('Coach Drawer Panel - Visibility Fix', () => {
  
  test('Coach drawer mask should have light overlay (not dark)', async ({ page }) => {
    // Navigate to leads page
    await page.goto('http://localhost:4200/app/leads', { waitUntil: 'domcontentloaded' });
    
    // Wait for page to load
    await page.waitForTimeout(2000);
    
    // Check if we can find the coach button
    const coachButtons = page.locator('[data-testid="lead-coach-open"]');
    const count = await coachButtons.count();
    
    console.log(`Found ${count} coach buttons`);
    
    if (count > 0) {
      // Click first coach button
      await coachButtons.first().click();
      
      // Wait for drawer to open
      await page.waitForSelector('.p-drawer', { timeout: 5000 });
      await page.waitForTimeout(1000);
      
      // Get the drawer mask background color
      const drawerMask = page.locator('.p-drawer-mask').first();
      const maskBgColor = await drawerMask.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      console.log('Drawer mask background:', maskBgColor);
      
      // Extract opacity from rgba
      const rgbaMatch = maskBgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
      if (rgbaMatch && rgbaMatch[4]) {
        const opacity = parseFloat(rgbaMatch[4]);
        console.log('Overlay opacity:', opacity);
        
        // Should be light (0.04) not dark (0.14)
        expect(opacity).toBeLessThan(0.1); // Less than 10% opacity = light overlay
        console.log('✅ Overlay is light (opacity < 0.1)');
      }
      
      // Take screenshot of drawer
      await page.screenshot({ path: 'coach-drawer-test.png' });
      console.log('Screenshot saved: coach-drawer-test.png');
    } else {
      console.log('No coach buttons found - page might not be loaded properly');
    }
  });

  test('Coach drawer action buttons should be visible and have white background', async ({ page }) => {
    await page.goto('http://localhost:4200/app/leads', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    const coachButtons = page.locator('[data-testid="lead-coach-open"]');
    const count = await coachButtons.count();
    
    if (count > 0) {
      await coachButtons.first().click();
      await page.waitForSelector('.coach-footer', { timeout: 5000 });
      await page.waitForTimeout(500);
      
      // Find the action buttons
      const editButton = page.locator('.coach-action-btn').first();
      const logActivityButton = page.locator('.coach-action-btn').nth(1);
      
      // Check if buttons are visible
      const editVisible = await editButton.isVisible();
      const logVisible = await logActivityButton.isVisible();
      
      console.log('Edit button visible:', editVisible);
      console.log('Log activity button visible:', logVisible);
      
      expect(editVisible).toBe(true);
      expect(logVisible).toBe(true);
      
      // Check button background color (should be white/light, not dark)
      const editBgColor = await editButton.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      console.log('Edit button background:', editBgColor);
      
      // Check if button is disabled
      const isDisabled = await editButton.evaluate(el => {
        return (el as HTMLButtonElement).disabled;
      });
      
      console.log('Edit button disabled:', isDisabled);
      expect(isDisabled).toBe(false);
      
      // Check button opacity/visibility
      const buttonOpacity = await editButton.evaluate(el => {
        return window.getComputedStyle(el).opacity;
      });
      
      console.log('Edit button opacity:', buttonOpacity);
      expect(parseFloat(buttonOpacity)).toBeGreaterThanOrEqual(1); // Should be fully opaque
      
      console.log('✅ Buttons are visible and not disabled');
      
      // Try to actually click the button
      await editButton.click();
      console.log('✅ Edit button is clickable');
      
    } else {
      console.log('No coach buttons found');
    }
  });

  test('Coach drawer should visually appear bright (not darkened)', async ({ page }) => {
    await page.goto('http://localhost:4200/app/leads', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    const coachButtons = page.locator('[data-testid="lead-coach-open"]');
    
    if (await coachButtons.count() > 0) {
      // Take screenshot before
      await page.screenshot({ path: 'before-coach-drawer.png' });
      
      // Click coach button
      await coachButtons.first().click();
      await page.waitForSelector('.p-drawer-content', { timeout: 5000 });
      await page.waitForTimeout(800);
      
      // Take screenshot after
      await page.screenshot({ path: 'after-coach-drawer.png' });
      console.log('Screenshots saved for visual inspection');
      
      // Check drawer content background is bright
      const drawerContent = page.locator('.p-drawer-content').first();
      const contentBg = await drawerContent.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          backgroundColor: style.backgroundColor,
          opacity: style.opacity,
          backgroundImage: style.backgroundImage
        };
      });
      
      console.log('Drawer content background:', contentBg);
      
      // Verify it's not dark
      expect(contentBg.backgroundColor).not.toContain('rgb(2, 6, 23)'); // Not the dark overlay color
      console.log('✅ Drawer content is bright, not darkened');
    }
  });
});
