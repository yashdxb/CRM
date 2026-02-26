import { test } from '@playwright/test';
const API='http://127.0.0.1:5014';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser.ahamed@live.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default');}, p.accessToken);} 

test('dump org chart dom', async ({page,request})=>{
  await login(page,request); await page.goto('/app/settings/roles',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:/Hierarchy/i}).click(); await page.waitForTimeout(500);
  const dump = await page.evaluate(()=>{
    const w=document.querySelector('.orgchart-wrapper');
    return w ? w.innerHTML.slice(0,4000) : 'none';
  });
  console.log(dump);
});
