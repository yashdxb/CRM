import { test, expect } from '@playwright/test';
const UI='http://localhost:4201'; const API='http://127.0.0.1:5014'; const LEAD='3b104395-182e-4836-8cce-ae2237928031';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const b=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default');},b.accessToken); return b.accessToken;}
async function pick(page:any, rootSel:string, txt:string){ const root=page.locator(rootSel).first(); await root.click(); const opt=page.locator('.p-select-option,[role="option"]').filter({hasText: new RegExp(`^${txt}$`,'i')}).first(); await opt.click(); }

test('try qualify nora', async ({page,request})=>{
 const token=await login(page,request);
 page.on('response', async r=>{ if(r.request().method()==='PUT' && r.url().includes('/api/leads')) console.log('PUT', r.status(), r.url(), await r.text()); });
 await page.goto(`${UI}/app/leads/${LEAD}/edit`); await page.locator('form.lead-form').waitFor();
 await pick(page,'p-select[name="status"]','Qualified');
 console.log('LABEL_AFTER_PICK', await page.locator('p-select[name="status"] .p-select-label').first().textContent());
 await page.getByRole('button',{name:/Update lead/i}).click();
 await page.waitForTimeout(2500);
 const lead = await request.get(`${API}/api/leads/${LEAD}`, { headers: {'X-Tenant-Key':'default', Authorization:`Bearer ${token}`} });
 const body = await lead.json();
 console.log('API_STATUS_AFTER_CLICK', body.status, body.qualifiedAtUtc);
 console.log('TOASTS', JSON.stringify(await page.locator('.p-toast-message, .field-error, .status-note').allTextContents()));
});
