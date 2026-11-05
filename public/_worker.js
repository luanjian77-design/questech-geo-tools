// Server-side Pages authentication. Secrets are Cloudflare encrypted bindings,
// never VITE_* variables, source constants, or browser storage.
const ORIGIN = 'https://questech-bm.com'
const PAGES = 'questech-geo-tools.pages.dev'
const COOKIE = '__Host-questech_family'
const LIFETIME = 7 * 24 * 60 * 60
const WINDOW = 15 * 60 * 1000
const attempts = new Map() // Best-effort per-isolate throttle, not a distributed rate limiter.
const encoder = new TextEncoder()
const securityHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Cloudflare-CDN-Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
}
function reply(body, status = 200, extra = {}) {
  return new Response(body, { status, headers: { ...securityHeaders, ...extra } })
}
function redirect(path, extra = {}) { return reply(null, 303, { Location: path, ...extra }) }
function base64(bytes) { return btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '') }
function unbase64(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error('Invalid encoding')
  return Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0))
}
async function keyFor(env) {
  const material = await crypto.subtle.digest('SHA-256', encoder.encode(env.FAMILY_SESSION_KEY + '\0' + env.FAMILY_PASSWORD))
  return crypto.subtle.importKey('raw', material, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])
}
async function signature(key, data) { return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(data))) }
async function makeSession(key) {
  const iat = Math.floor(Date.now() / 1000)
  const payload = base64(encoder.encode(JSON.stringify({ v: 1, iat, exp: iat + LIFETIME, nonce: base64(crypto.getRandomValues(new Uint8Array(16))) })))
  return payload + '.' + base64(await signature(key, 'family-session-v1.' + payload))
}
async function validSession(key, value) {
  try {
    if (!value || value.length > 2048) return false
    const parts = value.split('.')
    if (parts.length !== 2) return false
    const [payload, sig] = parts
    const decoded = unbase64(sig)
    if (decoded.length !== 32 || !await crypto.subtle.verify('HMAC', key, decoded, encoder.encode('family-session-v1.' + payload))) return false
    const data = JSON.parse(new TextDecoder().decode(unbase64(payload)))
    const now = Math.floor(Date.now() / 1000)
    return data.v === 1 && Number.isSafeInteger(data.exp) && Number.isSafeInteger(data.iat)
      && data.iat <= now + 60 && data.iat <= data.exp && data.exp - data.iat <= LIFETIME && data.exp > now
      && typeof data.nonce === 'string' && /^[A-Za-z0-9_-]{22}$/.test(data.nonce)
  } catch { return false }
}
function readCookie(request) {
  const matches = (request.headers.get('Cookie') || '').split(';').map(v => v.trim()).filter(v => v.startsWith(COOKIE + '='))
  return matches.length === 1 ? matches[0].slice(COOKIE.length + 1) : ''
}
function cookie(value, age = LIFETIME) { return `${COOKIE}=${value}; Path=/; Max-Age=${age}; HttpOnly; Secure; SameSite=Lax` }
function sameOrigin(request) { return request.headers.get('Origin') === ORIGIN && request.headers.get('Sec-Fetch-Site') !== 'cross-site' }
async function equalPassword(candidate, expected) {
  const [a, b] = await Promise.all([candidate, expected].map(v => crypto.subtle.digest('SHA-256', encoder.encode(v))))
  const left = new Uint8Array(a), right = new Uint8Array(b)
  let difference = 0
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i]
  return difference === 0
}
async function limitedBody(request) {
  if (Number(request.headers.get('Content-Length')) > 4096) throw new Error('Too large')
  const reader = request.body?.getReader()
  if (!reader) return ''
  const chunks = []; let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.length
      if (size > 4096) { await reader.cancel(); throw new Error('Too large') }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const bytes = new Uint8Array(size); let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
  return new TextDecoder().decode(bytes)
}
function loginPage(error = '') {
  // error is only a fixed server-owned message. No request input is interpolated.
  return `<!doctype html><html lang="zh-Hant-HK"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="theme-color" content="#f7f8f5"><title>家庭登入 · QuestTech</title><style>*{box-sizing:border-box}body{margin:0;min-height:100dvh;display:grid;place-items:center;background:#f7f8f5;color:#294b3c;font-family:system-ui,-apple-system,sans-serif;padding:24px}.card{width:100%;max-width:420px;background:#fff;border:1px solid #e0e7dc;border-radius:18px;padding:38px 30px;box-shadow:0 14px 70px #294b3c08}.logo{font-size:23px;font-weight:650;letter-spacing:-.6px}.logo span{color:#c3a570}.tag{font-size:10px;letter-spacing:2px;color:#93a187;margin-top:7px}h1{font-size:25px;margin:34px 0 12px}p{color:#819076;font-size:13px;line-height:1.9}label{display:block;font-size:13px;margin:26px 0 10px}input{width:100%;border:1px solid #dce5d5;border-radius:7px;padding:14px;font:inherit;color:#294b3c;background:#fafbf8}input:focus{outline:3px solid #e0ebda;border-color:#85a076}button{display:block;width:100%;border:0;border-radius:7px;background:#2e624a;color:#fff;padding:14px;margin-top:18px;font:inherit;font-size:14px;cursor:pointer}.error{color:#a45443;font-size:12px}.foot{margin-top:26px;padding-top:20px;border-top:1px solid #edf0e7;font-size:11px;color:#a0ac94;line-height:1.9}.badge{display:inline-block;background:#edf3e7;color:#6f8e5b;border-radius:20px;padding:5px 9px;font-size:10px;margin-top:20px}</style></head><body><main class="card"><div class="logo">QuestTech<span>.</span></div><div class="tag">FAMILY STUDY SPACE</div><span class="badge">僅限家庭成員使用</span><h1>回到我們的備試空間。</h1><p>這是家庭專用網站。<br>請輸入家庭密碼，繼續你的學習計畫。</p><form action="/family/login" method="post"><label for="password">家庭密碼</label><input id="password" name="password" type="password" autocomplete="current-password" required minlength="16" maxlength="256" autofocus placeholder="輸入家庭共享密碼"><p class="error" role="alert">${error}</p><button type="submit">進入家庭空間 →</button></form><div class="foot">登入狀態保留 7 天。請勿把家庭密碼分享給其他人。<br>如需密碼，請聯絡家庭管理人。</div></main></body></html>`
}
function page(error = '', status = 200) {
  return reply(loginPage(error), status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'" })
}
function configurationState(env) {
  if (typeof env.FAMILY_PASSWORD !== 'string' || !env.FAMILY_PASSWORD) return 'password-missing'
  if (env.FAMILY_PASSWORD.length < 16 || env.FAMILY_PASSWORD.length > 256) return 'password-policy'
  if (typeof env.FAMILY_SESSION_KEY !== 'string' || !env.FAMILY_SESSION_KEY) return 'session-key-missing'
  if (env.FAMILY_SESSION_KEY.length < 32) return 'session-key-policy'
  return 'ready'
}
export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url)
      // Direct/preview URLs use the canonical protected host, never a second login origin.
      if (url.hostname === PAGES || url.hostname.endsWith('.' + PAGES)) {
        return redirect(ORIGIN + url.pathname + url.search)
      }
      if (url.hostname !== new URL(ORIGIN).hostname) return reply('Unknown host', 421)
      if (url.protocol !== 'https:') return redirect(ORIGIN + url.pathname + url.search)
      if (url.pathname === '/robots.txt') return reply('User-agent: *\nDisallow: /\n', 200, { 'Content-Type': 'text/plain; charset=utf-8' })
      if (/^\/(?:_worker\.js|_routes\.json)(?:\/|$)/.test(url.pathname)) return reply('Not found', 404)
      // Misconfiguration is always fail-closed, including for static assets.
      const setup = configurationState(env)
      if (setup !== 'ready') return reply('家庭入口準備中，請聯絡家庭管理人。', 503, { 'Content-Type': 'text/plain; charset=utf-8', 'Retry-After': '300', 'X-Family-Setup': setup })
      const key = await keyFor(env)
      if (url.pathname === '/family/logout') {
        if (request.method !== 'POST') return reply('Method not allowed', 405, { Allow: 'POST' })
        if (!sameOrigin(request)) return reply('Forbidden', 403)
        return redirect('/family/login', { 'Set-Cookie': cookie('', 0) })
      }
      if (url.pathname === '/family/login') {
        if (request.method === 'GET' || request.method === 'HEAD') {
          if (await validSession(key, readCookie(request))) return redirect('/')
          const response = page()
          return request.method === 'HEAD' ? new Response(null, response) : response
        }
        if (request.method !== 'POST') return reply('Method not allowed', 405, { Allow: 'GET, HEAD, POST' })
        if (!sameOrigin(request)) return reply('Forbidden', 403)
        if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/x-www-form-urlencoded')) return reply('Unsupported content type', 415)
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
        const ipKey = base64(await signature(key, 'ip-throttle.' + ip))
        const now = Date.now()
        for (const [k, v] of attempts) if (v.until <= now) attempts.delete(k)
        const record = attempts.get(ipKey) || { count: 0, until: now + WINDOW }
        if (record.count >= 10) {
          const response = page('嘗試次數較多，請稍後再試。', 429)
          response.headers.set('Retry-After', String(Math.max(1, Math.ceil((record.until - now) / 1000))))
          return response
        }
        let form
        try { form = new URLSearchParams(await limitedBody(request)) } catch { return reply('Request too large', 413) }
        const values = form.getAll('password')
        const password = values.length === 1 ? values[0] : ''
        if (password.length < 16 || password.length > 256 || !await equalPassword(password, env.FAMILY_PASSWORD)) {
          if (attempts.size >= 2048) return reply('Please try later', 429, { 'Retry-After': '60' })
          record.count++; attempts.set(ipKey, record)
          return page('密碼不正確，請再確認。', 401)
        }
        attempts.delete(ipKey)
        return redirect('/', { 'Set-Cookie': cookie(await makeSession(key)) })
      }
      if (!await validSession(key, readCookie(request))) {
        if ((request.method === 'GET' || request.method === 'HEAD') && request.headers.get('Accept')?.includes('text/html')) return redirect('/family/login')
        return reply('Authentication required', 401)
      }
      if (request.method !== 'GET' && request.method !== 'HEAD') return reply('Method not allowed', 405, { Allow: 'GET, HEAD' })
      const asset = await env.ASSETS.fetch(request)
      const response = new Response(asset.body, asset)
      for (const [name, value] of Object.entries(securityHeaders)) response.headers.set(name, value)
      response.headers.append('Vary', 'Cookie')
      return response
    } catch {
      // Never leak configuration, input, or asset content on a runtime error.
      return reply('暫時無法登入，請稍後再試。', 503, { 'Content-Type': 'text/plain; charset=utf-8' })
    }
  },
}
