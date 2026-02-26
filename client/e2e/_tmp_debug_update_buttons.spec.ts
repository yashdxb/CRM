import { test } from '@playwright/test';
const UI='http://localhost:4201'; const API='http://127.0.0.1:5014'; const LEAD_ID='3b104395-182e-4836-8cce-ae2237928031';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const b=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default');},b.accessToken);} 

test('debug buttons', async ({page,request})=>{
 await login(page,request); await page.goto(`${UI}/app/leads/${LEAD_ID}/edit`); await page.locator('form.lead-form').waitFor();
 const buttons = page.getByRole('button', { name: /Update lead/i });
 const c = await buttons.count(); console.log('COUNT', c);
 for(let i=0;i<c;i++){ const b=buttons.nth(i); console.log('BTN', i, 'visible', await b.isVisible(), 'disabled', await b.isDisabled(), 'text', await b.textContent()); }
});
