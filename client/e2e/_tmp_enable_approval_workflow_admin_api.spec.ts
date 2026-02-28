import { test, expect } from '@playwright/test';

const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';

test('enable minimal approval workflow via API as admin', async ({ request }) => {
  const login = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: 'yasser.ahamed@live.com', password: 'yAsh@123' }
  });
  expect(login.ok()).toBeTruthy();
  const auth = await login.json();
  const token = auth.accessToken as string;

  const headers = {
    Authorization: `Bearer ${token}`,
    'X-Tenant-Key': 'default',
    'Content-Type': 'application/json'
  };

  const getResp = await request.get(`${API}/api/workspace`, { headers });
  expect(getResp.ok()).toBeTruthy();
  const ws = await getResp.json();

  const existingSteps = Array.isArray(ws.approvalWorkflowPolicy?.steps) ? ws.approvalWorkflowPolicy.steps : [];
  const enabled = !!ws.approvalWorkflowPolicy?.enabled;
  const hasSalesManager = existingSteps.some((s: any) => (s.approverRole ?? '').toLowerCase() === 'sales manager');

  const payload = {
    name: ws.name,
    timeZone: ws.timeZone,
    currency: ws.currency || 'USD',
    leadFirstTouchSlaHours: ws.leadFirstTouchSlaHours ?? null,
    defaultContractTermMonths: ws.defaultContractTermMonths ?? null,
    defaultDeliveryOwnerRoleId: ws.defaultDeliveryOwnerRoleId ?? null,
    approvalAmountThreshold: ws.approvalAmountThreshold ?? null,
    approvalApproverRole: ws.approvalApproverRole ?? 'Sales Manager',
    approvalWorkflowPolicy: {
      enabled: true,
      steps: hasSalesManager
        ? existingSteps.map((s: any, idx: number) => ({
            order: Number(s.order ?? idx + 1),
            approverRole: s.approverRole || 'Sales Manager',
            amountThreshold: s.amountThreshold ?? null,
            purpose: s.purpose ?? null
          }))
        : [
            {
              order: 1,
              approverRole: 'Sales Manager',
              amountThreshold: null,
              purpose: null
            }
          ]
    },
    qualificationPolicy: ws.qualificationPolicy ?? null,
    assistantActionScoringPolicy: ws.assistantActionScoringPolicy ?? null,
    decisionEscalationPolicy: ws.decisionEscalationPolicy ?? null,
    supportingDocumentPolicy: ws.supportingDocumentPolicy ?? null
  };

  const putResp = await request.put(`${API}/api/workspace`, { headers, data: payload });
  console.log('WORKSPACE_PUT_STATUS', putResp.status());
  const putText = await putResp.text();
  console.log('WORKSPACE_PUT_BODY', putText.slice(0, 600));
  expect(putResp.ok()).toBeTruthy();

  const verify = await request.get(`${API}/api/workspace`, { headers });
  const verifyBody = await verify.json();
  console.log('VERIFY_APPROVAL_POLICY', JSON.stringify(verifyBody.approvalWorkflowPolicy));
  expect(verifyBody.approvalWorkflowPolicy?.enabled).toBeTruthy();
  expect((verifyBody.approvalWorkflowPolicy?.steps ?? []).length).toBeGreaterThan(0);
});
