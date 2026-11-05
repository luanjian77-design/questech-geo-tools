import { test } from 'node:test'
import assert from 'node:assert/strict'
import worker from '../public/_worker.js'
const domain = 'https://questech-bm.com'
const env = { FAMILY_PASSWORD: 'qa-only-password-not-production', FAMILY_SESSION_KEY: 'qa-only-session-key-not-production-00000000', ASSETS: { fetch: async r => new Response(r.url.endsWith('.js') ? 'private javascript' : '<h1>Private family site</h1>', { headers: { 'Cache-Control': 'public, max-age=9999' } }) } }
const request = (path, init = {}) => new Request(domain + path, init)
const form = (password, ip = '192.0.2.1', extras = {}) => request('/family/login', { method: 'POST', headers: { Origin: domain, 'Content-Type': 'application/x-www-form-urlencoded', 'CF-Connecting-IP': ip, ...extras }, body: new URLSearchParams({ password }) })
let session
await test('missing bindings fail closed, including direct asset requests', async () => {
 for (const path of ['/', '/assets/app.js', '/some/deep/path']) {
  const r = await worker.fetch(request(path), {})
  assert.equal(r.status, 503)
  assert.equal(r.headers.get('x-family-setup'), 'password-missing')
  assert.match(r.headers.get('cache-control'), /no-store/)
 }
})
await test('unauthenticated HTML redirects to login; assets never expose content', async () => {
 const home = await worker.fetch(request('/', { headers: { Accept: 'text/html' } }), env)
 assert.equal(home.status, 303); assert.equal(home.headers.get('location'), '/family/login')
 for (const path of ['/assets/app.js', '/assets/app.css', '/index.html', '/src/App.jsx']) {
  const r = await worker.fetch(request(path), env); assert.equal(r.status, 401); assert.equal(await r.text(), 'Authentication required')
 }
 const login = await worker.fetch(request('/family/login'), env)
 assert.equal(login.status, 200); const html = await login.text()
 assert.ok(!html.includes(env.FAMILY_PASSWORD) && !html.includes(env.FAMILY_SESSION_KEY))
 assert.match(login.headers.get('content-security-policy'), /form-action 'self'/)
 assert.equal((await worker.fetch(request('/_worker.js'), env)).status, 404)
})
await test('rejects wrong passwords, cross-origin posts and unsupported content types', async () => {
 assert.equal((await worker.fetch(form('wrong-password-long-enough'), env)).status, 401)
 assert.equal((await worker.fetch(form(env.FAMILY_PASSWORD, '192.0.2.2', { Origin: 'https://attacker.example' }), env)).status, 403)
 assert.equal((await worker.fetch(form(env.FAMILY_PASSWORD, '192.0.2.2', { 'Sec-Fetch-Site': 'cross-site' }), env)).status, 403)
 assert.equal((await worker.fetch(request('/family/login', { method: 'POST', headers: { Origin: domain }, body: '{}' }), env)).status, 415)
})
await test('oversized bodies and duplicate password fields are rejected', async () => {
 assert.equal((await worker.fetch(request('/family/login', { method:'POST', headers:{Origin:domain,'Content-Type':'application/x-www-form-urlencoded'},body:'password='+ 'x'.repeat(5000) }),env)).status,413)
 const dup = form(env.FAMILY_PASSWORD, '192.0.2.3'); const r = new Request(dup, { body: new URLSearchParams([['password',env.FAMILY_PASSWORD],['password',env.FAMILY_PASSWORD]]) })
 assert.equal((await worker.fetch(r,env)).status,401)
})
await test('valid login sets a secure session and permits private content', async () => {
 const login = await worker.fetch(form(env.FAMILY_PASSWORD),env)
 assert.equal(login.status,303); assert.equal(login.headers.get('location'),'/')
 session = login.headers.get('set-cookie').split(';')[0]
 assert.match(login.headers.get('set-cookie'), /HttpOnly; Secure; SameSite=Lax/)
 assert.ok(!session.includes(env.FAMILY_PASSWORD))
 const r = await worker.fetch(request('/assets/app.js',{headers:{Cookie:session}}),env)
 assert.equal(r.status,200); assert.equal(await r.text(),'private javascript'); assert.match(r.headers.get('cache-control'),/no-store/); assert.equal(r.headers.get('cloudflare-cdn-cache-control'),'no-store')
})
await test('forged, expired and duplicated cookies never grant access', async () => {
 for(const cookie of [session.slice(0,-2)+'xx',session+'; '+session,'__Host-questech_family=garbage'])assert.equal((await worker.fetch(request('/',{headers:{Cookie:cookie}}),env)).status,401)
 const original=Date.now
 try {Date.now=()=>original()+8*24*60*60*1000;assert.equal((await worker.fetch(request('/',{headers:{Cookie:session}}),env)).status,401)}finally{Date.now=original}
 assert.equal((await worker.fetch(request('/',{headers:{Cookie:session}}),{...env,FAMILY_PASSWORD:'a-new-long-family-password'})).status,401)
})
await test('logout is same-origin POST only and clears the session cookie', async () => {
 assert.equal((await worker.fetch(request('/family/logout'),env)).status,405)
 assert.equal((await worker.fetch(request('/family/logout',{method:'POST',headers:{Origin:'https://attacker.example'}}),env)).status,403)
 const r=await worker.fetch(request('/family/logout',{method:'POST',headers:{Origin:domain,Cookie:session}}),env)
 assert.equal(r.status,303);assert.match(r.headers.get('set-cookie'),/Max-Age=0/)
})
await test('best-effort throttle rejects repeated bad attempts', async () => {
 for(let i=0;i<10;i++)assert.equal((await worker.fetch(form('wrong-but-long-password','192.0.2.10'),env)).status,401)
 const r=await worker.fetch(form(env.FAMILY_PASSWORD,'192.0.2.10'),env);assert.equal(r.status,429);assert.ok(Number(r.headers.get('retry-after'))>0)
})
await test('production/preview hosts redirect to canonical protected domain', async () => {
 for(const host of ['questech-geo-tools.pages.dev','2614a150.questech-geo-tools.pages.dev','preview.questech-geo-tools.pages.dev']){
 const r=await worker.fetch(new Request('https://'+host+'/assets/app.js?q=1'),env);assert.equal(r.status,303);assert.equal(r.headers.get('location'),domain+'/assets/app.js?q=1')}
 assert.equal((await worker.fetch(new Request('https://untrusted.example/'),env)).status,421)
})
await test('runtime asset failures never fall through to content',async()=>{
 const r=await worker.fetch(request('/',{headers:{Cookie:session}}),{...env,ASSETS:{fetch:()=>{throw new Error('private secret must not leak')}}})
 assert.equal(r.status,503);assert.ok(!(await r.text()).includes('private secret'))
})

await test('configuration diagnostics never expose secret values',async()=>{
 for(const [changes,status] of [[{FAMILY_PASSWORD:'short'},'password-policy'],[{FAMILY_SESSION_KEY:''},'session-key-missing'],[{FAMILY_SESSION_KEY:'short'},'session-key-policy']]){
  const r=await worker.fetch(request('/family/login'),{...env,...changes})
  assert.equal(r.status,503);assert.equal(r.headers.get('x-family-setup'),status);assert.equal(await r.text(),'家庭入口準備中，請聯絡家庭管理人。')
 }
})
