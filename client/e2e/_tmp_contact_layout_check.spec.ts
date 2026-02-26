import { test } from '@playwright/test';
const API='http://127.0.0.1:5014';
const BASE='http://localhost:4201';
const LEAD_ID='3b104395-182e-4836-8cce-ae2237928031';
async function login(page, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t)=>{localStorage.setItem('auth_token', t as string); localStorage.setItem('tenant_key','default');}, p.accessToken);} 
test('contact details readability snapshot', async ({page,request})=>{await login(page,request); await page.goto(`${BASE}/app/leads/${LEAD_ID}/edit`, {waitUntil:'domcontentloaded'}); await page.locator('form.lead-form').waitFor(); const contactAccordion=page.getByRole('button',{name:/Contact details/i}); await contactAccordion.scrollIntoViewIfNeeded(); await page.screenshot({path:'output/playwright/lead-contact-details-readability.png', fullPage:true});});
