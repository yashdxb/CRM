import { test } from '@playwright/test';
import fs from 'node:fs';

const storageStatePath = 'client/.auth/clickup.json';

test.describe('ClickUp Docs automation', () => {
  test.use({ storageState: storageStatePath });

  test('create doc and read existing docs', async ({ page }) => {
    if (process.env.CLICKUP_E2E !== '1') {
      test.skip(true, 'ClickUp Docs automation disabled. Set CLICKUP_E2E=1 to enable.');
    }
    if (!fs.existsSync(storageStatePath)) {
      test.skip(true, 'Missing ClickUp storage state. Run: npx playwright codegen https://app.clickup.com/login --save-storage=client/.auth/clickup.json');
    }

    await page.goto('https://app.clickup.com', { waitUntil: 'domcontentloaded' });

    // Open Docs
    const docsNav = page.getByRole('link', { name: /^Docs$/i });
    if (await docsNav.isVisible().catch(() => false)) {
      await docsNav.click();
    } else {
      await page.getByRole('link', { name: /Docs/i }).first().click();
    }

    await page.waitForTimeout(2000);

    // Create a new doc
    const newDocButton = page.getByRole('button', { name: /new doc|create doc|new document/i }).first();
    await newDocButton.click();

    // If prompted for a location, pick CRM Platform
    const locationPrompt = page.getByText(/choose.*location|select.*location/i).first();
    if (await locationPrompt.isVisible().catch(() => false)) {
      await page.getByRole('button', { name: /CRM Platform/i }).click().catch(() => null);
      await page.getByText(/CRM Platform/i).first().click().catch(() => null);
      const confirmButton = page.getByRole('button', { name: /select|confirm|continue|done/i }).first();
      if (await confirmButton.isVisible().catch(() => false)) {
        await confirmButton.click();
      }
    }

    // Set title and content
    const titleText = 'Epistemic CRM: Product Vision & Strategy (Living)';
    const bodyText = `# Epistemic CRM: Product Vision & Strategy (Living)\n\n## Qualification & Confidence Specification\nThis document defines the exact qualification dropdowns, evidence controls, and confidence logic used in the CRM. It is intended as an implementation-ready reference for product, design, and engineering.\n\n### Canonical State Model\n- unknown\n- assumed\n- verified\n- invalid\n\nEach UI option maps explicitly to one of these states. No other truth states are permitted.\n\n## Layer 1 vs Layer 2 Metrics\n**Layer 1 (Operational):** Time to deal, win rate, pipeline value, activity volume, stage velocity, conversion rates.\n\n**Layer 2 (Epistemic):** Truth Coverage, Time-to-Truth, Cost of Not Knowing, Efficiency Index, Risk Register, confidence-weighted forecasting, conditional projections.\n\n## Key Improvements\n1) Unknown defaults in qualification dropdowns\n2) Evidence disabled when Unknown\n3) Inline feedback loop (confidence + weakest signal)\n\n## Truth as a First-Class Output\nExpose Truth Coverage and Assumptions Outstanding per deal.\n\n## Cost of Not Knowing\nQuantify downside exposure for unresolved high-impact factors.\n\n## Coaching on Truth Gaps\nCoach on missing signals, not just outcomes.\n\n## Conditional Forecasting\nShow forecast bands based on critical assumptions.\n\n## Truth Flywheel\nTruth gaps reduce confidence -> focus/coaching -> validation -> confidence stabilizes.\n\n## AI/ML Mapping (Summary)\n- Epistemic uncertainty modeling\n- Confidence calibration\n- Weak supervision via evidence sources\n- Bayesian-like belief updating\n- Temporal decay / concept drift\n- Explainable risk decomposition\n- Active learning (Time-to-Truth)\n- Information gain per cost (Efficiency Index)\n- Conditional forecasting\n- Selective prediction / risk-aware decisions\n\n## Target Adoption\nStartups (Series A–C) and forward-thinking orgs first; enterprises later.\n\n## Positioning\n“Most CRMs track deals. We help teams know which deals are real — and why.”\n`;

    const titleEditable = page.locator('[contenteditable="true"]').first();
    if (!(await titleEditable.isVisible().catch(() => false))) {
      test.skip(true, 'ClickUp editor not visible for this account layout.');
    }
    await titleEditable.click();
    await titleEditable.fill(titleText).catch(async () => {
      await page.keyboard.type(titleText);
    });

    const bodyEditable = page.locator('[contenteditable="true"]').nth(1);
    await bodyEditable.click();
    await bodyEditable.fill(bodyText).catch(async () => {
      await page.keyboard.type(bodyText, { delay: 0 });
    });

    await page.waitForTimeout(2000);

    // Return to Docs list and read existing docs
    await docsNav.click().catch(() => page.getByRole('link', { name: /Docs/i }).first().click());
    await page.waitForTimeout(2000);

    const docTitles = await page.locator('a:has-text("Doc")').allTextContents().catch(() => []);
    if (docTitles.length) {
      console.log('Doc titles:', docTitles.slice(0, 10));
    } else {
      const fallbackTitles = await page.locator('div:has-text("Doc")').allTextContents().catch(() => []);
      console.log('Doc titles:', fallbackTitles.slice(0, 10));
    }
  });
});
