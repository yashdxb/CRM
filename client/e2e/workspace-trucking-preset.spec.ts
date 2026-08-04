import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://localhost:5014';
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
    throw new Error('Unable to authenticate against the API for trucking preset UI test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  return payload.accessToken as string;
}

test('trucking preset exposes freight profile controls on the lead form', async ({ page, request }) => {
  test.setTimeout(120_000);

  const token = await login(page, request);
  let createdLeadId: string | null = null;

  const originalSettingsResponse = await request.get(`${API_BASE_URL}/api/workspace`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  const originalSettings = await originalSettingsResponse.json();

  try {
    const presetResponse = await request.post(`${API_BASE_URL}/api/workspace/vertical-preset`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-Key': 'default',
        'Content-Type': 'application/json'
      },
      data: {
        presetId: 'TruckingCarrierBroker',
        resetExisting: true
      }
    });
    expect(presetResponse.ok()).toBeTruthy();

    const updatedSettingsResponse = await request.get(`${API_BASE_URL}/api/workspace`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-Key': 'default'
      }
    });
    const updatedSettings = await updatedSettingsResponse.json();
    expect(updatedSettings.verticalPresetConfiguration?.leadProfileCatalog?.fields?.['trucking.shipperTypes']?.length ?? 0).toBeGreaterThan(0);
    expect(updatedSettings.verticalPresetConfiguration?.leadProfileCatalog?.fields?.['trucking.freightModes']?.length ?? 0).toBeGreaterThan(0);
    expect(updatedSettings.verticalPresetConfiguration?.leadProfileCatalog?.fields?.['trucking.equipmentTypes']?.length ?? 0).toBeGreaterThan(0);

    await page.goto('/app/leads/new');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Freight Profile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Buyer Profile' })).toHaveCount(0);
    await expect(page.getByText('Buyer type')).toHaveCount(0);
    await expect(page.getByText('Property type')).toHaveCount(0);
    await expect(page.getByRole('link', { name: /Properties/i })).toHaveCount(0);
    await expect(page.getByLabel('Shipper type')).toBeVisible();
    await expect(page.getByLabel('Freight mode')).toBeVisible();
    await expect(page.getByLabel('Equipment type')).toBeVisible();
    await expect(page.getByLabel('Annual freight spend')).toBeVisible();
    await expect(page.locator('.freight-fit-card__score span')).toHaveText('Lane fit');
    await expect(page.getByText('Incomplete lane fit')).toBeVisible();
    await expect(page.getByText('Shipping decision maker')).toHaveCount(1);
    await expect(page.getByText('Economic buyer')).toHaveCount(0);

    const createLeadResponse = await request.post(`${API_BASE_URL}/api/leads`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-Key': 'default',
        'Content-Type': 'application/json'
      },
      data: {
        firstName: 'Trucking',
        lastName: 'Verifier',
        companyName: 'Northstar Freight Test',
        email: 'trucking.verifier@test.local',
        status: 'New',
        budgetAvailability: 'Budget allocated and approved',
        budgetEvidence: 'Email confirmation',
        readinessToSpend: 'Actively evaluating solutions',
        readinessEvidence: 'Customer call',
        buyingTimeline: 'Target date verbally confirmed',
        timelineEvidence: 'Call notes',
        problemSeverity: 'High business impact',
        problemEvidence: 'Discovery call notes',
        economicBuyer: 'Buyer engaged in discussion',
        economicBuyerEvidence: 'Meeting notes',
        icpFit: 'Strong ICP fit',
        icpFitEvidence: 'Account research',
        customQualificationFactors: [
          { key: 'trucking.shipperTypes', value: 'Manufacturer', evidence: 'Call notes' },
          { key: 'trucking.freightModes', value: 'FTL', evidence: 'Call notes' },
          { key: 'trucking.equipmentTypes', value: 'Dry van', evidence: 'Call notes' },
          { key: 'trucking.commodities', value: 'Consumer goods', evidence: 'Call notes' },
          { key: 'trucking.originRegions', value: 'Ontario', evidence: 'Call notes' },
          { key: 'trucking.destinationRegions', value: 'Texas', evidence: 'Call notes' },
          { key: 'trucking.shipmentFrequencyBands', value: 'Daily recurring lanes', evidence: 'Call notes' },
          { key: 'trucking.annualFreightSpendBands', value: '$15M+', evidence: 'Call notes' }
        ]
      }
    });
    expect(createLeadResponse.ok()).toBeTruthy();
    const createdLead = await createLeadResponse.json();
    createdLeadId = createdLead.id as string;

    await page.goto('/app/leads');
    await page.waitForLoadState('networkidle');
    await page.getByPlaceholder('Search leads...').fill('Trucking Verifier');
    const leadRow = page.getByRole('row').filter({ hasText: 'Trucking Verifier' });
    await expect(leadRow).toBeVisible();
    await expect(leadRow.locator('.lead-freight-profile__chip--fit')).toContainText('Strong lane fit / 100/100');
    await expect(leadRow.getByText('Mode: FTL')).toBeVisible();
    await expect(leadRow.getByText('Equipment: Dry van')).toBeVisible();

    await page.goto(`/app/leads/${createdLeadId}/edit`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.related-summary--freight .related-summary-label')).toHaveText('Freight profile');
    await expect(page.getByText('Buyer Profile')).toHaveCount(0);
    await expect(page.getByText('Strong lane fit')).toBeVisible();
    await expect(page.getByText('Origin: Ontario')).toBeVisible();
    await expect(page.getByText('Destination: Texas')).toBeVisible();
    await page.getByRole('tab', { name: /Qualifications/i }).click();
    await expect(page.getByText('Freight Qualification Summary')).toBeVisible();
    const decisionMakerCard = page.locator('.qualification-factor-card').filter({
      has: page.getByRole('heading', { name: 'Shipping decision maker' })
    });
    await expect(decisionMakerCard).toBeVisible();
    await expect(decisionMakerCard.getByText('Decision maker engaged in discussion')).toBeVisible();

    await page.waitForTimeout(6000);
    await page.goto('/app/dashboard');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Month' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Trucking Intelligence' })).toBeVisible();
    await expect(page.getByText('high-fit open')).toBeVisible();
    const truckingRow = page.locator('.trucking-priority-row').filter({ hasText: 'Trucking Verifier' });
    await expect(truckingRow).toContainText('100/100');
    await expect(truckingRow.getByRole('button', { name: 'Log first touch' })).toBeVisible();
    await expect(truckingRow.getByRole('button', { name: 'Create rate request' })).toBeVisible();
    await expect(truckingRow.getByRole('button', { name: 'Complete profile' })).toBeVisible();

    await truckingRow.getByRole('button', { name: 'Log first touch' }).click();
    await expect(page).toHaveURL(/\/app\/activities\/new/);
    await expect(page.locator('#act-subject')).toHaveValue('First touch: Trucking Verifier');
    await expect(page.locator('#act-outcome')).toHaveValue(/Initial trucking outreach started/);
    await page.goto('/app/dashboard');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Month' }).click();
    await page.waitForLoadState('networkidle');

    const refreshedTruckingRow = page.locator('.trucking-priority-row').filter({ hasText: 'Trucking Verifier' });
    await refreshedTruckingRow.getByRole('button', { name: 'Create rate request' }).click();
    await expect(page).toHaveURL(/\/app\/activities\/new/);
    await expect(page.locator('#act-subject')).toHaveValue('Rate request: Trucking Verifier');
    await expect(page.locator('#act-description')).toHaveValue(/Prepare rate request from trucking lane-fit dashboard/);
    await page.goto('/app/dashboard');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Month' }).click();
    await page.waitForLoadState('networkidle');

    await page.locator('.trucking-priority-row').filter({ hasText: 'Trucking Verifier' }).getByRole('button', { name: 'Complete profile' }).click();
    await expect(page).toHaveURL(new RegExp(`/app/leads/${createdLeadId}/edit`));
  } finally {
    if (createdLeadId) {
      await request.delete(`${API_BASE_URL}/api/leads/${createdLeadId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Tenant-Key': 'default'
        }
      });
    }
    await request.put(`${API_BASE_URL}/api/workspace`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-Key': 'default',
        'Content-Type': 'application/json'
      },
      data: originalSettings
    });
  }
});
