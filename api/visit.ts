// POST /api/visit -> sends a visitor notification to Telegram
// vercel function: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID stay on the server, never shipped to the browser
// (use this project's own bot token in vercel env, separate from jasurlive.uz)
const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|python|curl|wget/i

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!)

function parseUA(ua: string) {
  const browser =
    ua.match(/(Edg|OPR|SamsungBrowser|YaBrowser|Firefox|Chrome|Safari)\/(\d+)/)?.slice(1, 3).join(' ') ?? 'Unknown'
  const os =
    /Android/.test(ua) ? 'Android'
    : /iPhone|iPad/.test(ua) ? 'iOS'
    : /Windows/.test(ua) ? 'Windows'
    : /Mac OS/.test(ua) ? 'macOS'
    : /Linux/.test(ua) ? 'Linux'
    : 'Unknown'
  return `${browser.replace('Edg', 'Edge').replace('OPR', 'Opera')} / ${os}`
}

export async function POST(req: Request) {
  const h = req.headers
  const ua = h.get('user-agent') ?? ''

  // only accept calls from our own pages, and ignore crawlers
  const origin = h.get('origin')
  if (!origin || new URL(origin).host !== h.get('host')) return new Response(null, { status: 403 })
  if (BOT_RE.test(ua)) return new Response(null, { status: 204 })

  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = process.env
  if (!token || !chatId) return new Response('missing env', { status: 500 })

  let body: Record<string, string | boolean> = {}
  try {
    body = JSON.parse(await req.text())
  } catch {}
  const str = (v: unknown, max = 200) => esc(String(v ?? '').slice(0, max))

  const ip = h.get('x-real-ip') ?? h.get('x-forwarded-for')?.split(',')[0] ?? '?'
  const city = decodeURIComponent(h.get('x-vercel-ip-city') ?? '?')
  const country = h.get('x-vercel-ip-country') ?? '?'
  let ref = 'direct'
  try {
    if (typeof body.referrer === "string" && body.referrer) ref = new URL(body.referrer).host
  } catch {}

  const text = [
    body.returning ? '🔁 <b>IELTS Live · returning visitor</b>' : '🆕 <b>IELTS Live · new user</b>',
    `📍 ${esc(city)}, ${esc(country)} · <code>${esc(ip)}</code>`,
    `🖥 ${esc(parseUA(ua))} · ${str(body.screen, 20)}`,
    `🔗 from ${str(ref)} → <code>${str(body.path)}</code>`,
    `🌐 ${str(body.lang, 20)} · ${str(body.tz, 50)}`,
  ].join('\n')

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  })

  return new Response(null, { status: tg.ok ? 204 : 502 })
}