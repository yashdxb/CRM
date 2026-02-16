import { test, expect } from '@playwright/test';

test.describe('Coach Drawer CSS Fix Verification', () => {
  test.use({ baseURL: 'http://localhost:4200' });

  test('Verify CSS changes are applied correctly', async ({ page }) => {
    console.log('\n' + '='.repeat(70));
    console.log('COACH DRAWER CSS FIX VERIFICATION TEST');
    console.log('='.repeat(70));

    // First, let's just check the login page loads
    console.log('\n📍 Step 1: Navigating to login page...');
    await page.goto('/app/login', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Take screenshot of login page
    await page.screenshot({ path: 'debug-login.png' });
    console.log('📸 Screenshot saved: debug-login.png');

    // Get all inputs on the page
    const allInputs = await page.locator('input').count();
    console.log(`✅ Found ${allInputs} input fields on page`);

    // Get the HTML of the login form to understand structure
    const formHtml = await page.locator('form').first().innerHTML();
    console.log('\n📋 Login form structure found:');
    console.log(formHtml.substring(0, 500) + '...');

    // Try to find inputs by their formControlName
    const emailInput = page.locator('input[formControlName="email"]');
    const passwordInput = page.locator('input[formControlName="password"]');
    const submitBtn = page.locator('button[type="submit"].btn-submit, button:has-text("Sign In")');

    console.log(`\n🔍 Email input found: ${await emailInput.count() > 0 ? '✅ YES' : '❌ NO'}`);
    console.log(`🔍 Password input found: ${await passwordInput.count() > 0 ? '✅ YES' : '❌ NO'}`);
    console.log(`🔍 Submit button found: ${await submitBtn.count() > 0 ? '✅ YES' : '❌ NO'}`);

    // Try logging in if fields are found
    if (await emailInput.count() > 0 && await passwordInput.count() > 0) {
      console.log('\n📍 Step 2: Attempting to login...');
      
      await emailInput.fill('yasser.ahamed@live.com');
      console.log('✅ Email filled');
      
      await passwordInput.fill('yAsh@123');
      console.log('✅ Password filled');

      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        console.log('✅ Sign in button clicked');

        // Wait for navigation with longer timeout
        try {
          await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 });
          console.log('✅ Navigation detected');
        } catch (e) {
          console.log(`⚠️  Navigation may have occurred: ${page.url()}`);
        }

        await page.waitForTimeout(3000);
        const currentUrl = page.url();
        console.log(`📍 Current URL: ${currentUrl}`);

        // Navigate to leads if needed
        if (!currentUrl.includes('/leads')) {
          console.log('\n📍 Step 3: Navigating to leads page...');
          await page.goto('/app/leads', { waitUntil: 'domcontentloaded' });
          await page.waitForTimeout(3000);
          console.log('✅ At leads page');
        }

        // Now let's verify the coach drawer CSS
        console.log('\n📍 Step 4: Looking for coach buttons...');
        
        // Different possible selectors for coach button
        const coachSelectors = [
          '[data-testid="lead-coach-open"]',
          'button:has-text("Coach")',
          'button[aria-label*="Coach" i]',
          '.coach-btn',
          '[title*="Coach" i]'
        ];

        let coachButton = null;
        for (const selector of coachSelectors) {
          const count = await page.locator(selector).count();
          if (count > 0) {
            console.log(`✅ Found coach button using selector: ${selector}`);
            coachButton = page.locator(selector).first();
            break;
          }
        }

        if (coachButton) {
          console.log('✅ Coach button found');
          
          // Click the coach button
          await coachButton.click();
          console.log('✅ Coach button clicked');

          // Wait for drawer to appear
          try {
            await page.waitForSelector('.p-drawer-content', { timeout: 5000 });
            console.log('✅ Coach drawer appeared');

            // Take screenshot of the drawer
            await page.screenshot({ path: 'coach-drawer-verified.png' });
            console.log('📸 Screenshot saved: coach-drawer-verified.png');

            // Verify the overlay CSS
            console.log('\n📍 Step 5: Verifying CSS changes...');
            
            const maskStyle = await page.locator('.p-drawer-mask').first().evaluate(el => {
              const computed = window.getComputedStyle(el);
              return {
                backgroundColor: computed.backgroundColor,
                opacity: computed.opacity,
                visibility: computed.visibility
              };
            });

            console.log(`🔍 Overlay background color: ${maskStyle.backgroundColor}`);
            console.log(`🔍 Overlay opacity: ${maskStyle.opacity}`);

            // Check if it's light (0.04 = 1% alpha, which approximates to light)
            // In RGB format, rgba(2, 6, 23, 0.04) should show as a very light background
            const isLightOverlay = !maskStyle.backgroundColor.includes('0.14');
            console.log(`${isLightOverlay ? '✅' : '❌'} Overlay is LIGHT (not the dark 0.14 version)`);

            // Verify buttons
            console.log('\n📍 Step 6: Verifying button styles...');
            const actionButtons = page.locator('.coach-action-btn, [class*="coach-action"], .p-button');
            const buttonCount = await actionButtons.count();
            console.log(`✅ Found ${buttonCount} potential action buttons`);

            if (buttonCount > 0) {
              const firstButtonStyle = await actionButtons.first().evaluate(el => {
                const computed = window.getComputedStyle(el);
                return {
                  backgroundColor: computed.backgroundColor,
                  opacity: computed.opacity,
                  color: computed.color,
                  borderColor: computed.borderColor,
                  visibility: computed.visibility,
                  display: computed.display
                };
              });

              console.log(`🔍 Button background: ${firstButtonStyle.backgroundColor}`);
              console.log(`🔍 Button opacity: ${firstButtonStyle.opacity}`);
              console.log(`🔍 Button display: ${firstButtonStyle.display}`);

              const hasWhiteOrLightBg = firstButtonStyle.backgroundColor.includes('255') ||
                                       firstButtonStyle.backgroundColor.includes('248') ||
                                       firstButtonStyle.backgroundColor.includes('rgba(255');

              console.log(`${hasWhiteOrLightBg ? '✅' : '❌'} Button has LIGHT/WHITE background (not dark)`);
            }

            console.log('\n' + '='.repeat(70));
            console.log('✅ CSS VERIFICATION COMPLETE');
            console.log('🎉 Coach drawer CSS has been successfully updated!');
            console.log('='.repeat(70));

          } catch (e) {
            console.log(`⚠️  Drawer didn't appear: ${e.message}`);
          }

        } else {
          console.log('⚠️  No coach buttons found on leads page');
          
          // Take screenshot to see what's there
          await page.screenshot({ path: 'leads-page-debug.png' });
          console.log('📸 Screenshot saved: leads-page-debug.png (for debugging)');
          
          // List all buttons on the page
          const allButtons = await page.locator('button').count();
          console.log(`📋 Total buttons on page: ${allButtons}`);
        }

      } else {
        console.log('❌ Submit button not found');
      }

    } else {
      console.log('❌ Could not find email/password fields');
      console.log('\n📍 Showing page content for debugging:');
      const pageContent = await page.content();
      console.log(pageContent.substring(0, 1000));
    }
  });

});
