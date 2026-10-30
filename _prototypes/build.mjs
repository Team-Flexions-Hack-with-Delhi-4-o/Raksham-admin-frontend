// Throwaway generator for static Overview mockups. Run: node _prototypes/build.mjs
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const out = dirname(fileURLToPath(import.meta.url))

const ic = (d, s = 20) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
const I = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  dn: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  brief: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
}
const logo = `<svg width="44" height="48" viewBox="0 0 44 48"><path d="M22 2 6 8v14c0 11 8 20 16 24 8-4 16-13 16-24V8z" fill="#FFC900"/><circle cx="22" cy="17" r="4.2" fill="#101010"/><path d="M12 24c4 3 8 7 10 14 2-7 6-11 10-14-4-1-8 0-10 4-2-4-6-5-10-4z" fill="#101010"/></svg>`

// ---- charts ----
const GREY = '#8C8C94', YEL = '#FFC900'
const gridY = (w, h, pad, max, steps) =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const v = (max / steps) * i, y = h - pad.b - (v / max) * (h - pad.t - pad.b)
    return `<line x1="${pad.l}" x2="${w - pad.r}" y1="${y}" y2="${y}" stroke="#ECECEF"/><text x="${pad.l - 8}" y="${y + 4}" text-anchor="end" class="ax">${v}</text>`
  }).join('')
const xl = ['1 Oct', '7 Oct', '14 Oct', '21 Oct', '28 Oct']

function barChart(r = 4) {
  const w = 460, h = 230, pad = { l: 34, r: 8, t: 10, b: 28 }
  const cit = [82, 128, 130, 150, 125], adv = [45, 78, 72, 88, 85]
  const gw = (w - pad.l - pad.r) / 5, bw = 17
  const y = (v) => h - pad.b - (v / 200) * (h - pad.t - pad.b)
  let s = gridY(w, h, pad, 200, 4)
  cit.forEach((c, i) => {
    const x = pad.l + gw * i + gw / 2 - bw - 2
    s += `<rect x="${x}" y="${y(c)}" width="${bw}" height="${h - pad.b - y(c)}" rx="${r}" fill="${YEL}"><title>Citizens: ${c}</title></rect>`
    s += `<rect x="${x + bw + 4}" y="${y(adv[i])}" width="${bw}" height="${h - pad.b - y(adv[i])}" rx="${r}" fill="${GREY}"><title>Advocates: ${adv[i]}</title></rect>`
    s += `<text x="${pad.l + gw * i + gw / 2}" y="${h - 8}" text-anchor="middle" class="ax">${xl[i]}</text>`
  })
  return `<svg viewBox="0 0 ${w} ${h}" class="chart">${s}</svg>`
}

function donut(thick = 26) {
  const data = [['New', 2, '#EF3B3B'], ['Under review', 3, YEL], ['More information required', 2, '#CFCFD4'], ['Reverification due', 2, '#6B6B73']]
  const r = 70, C = 2 * Math.PI * r
  let off = 0, arcs = ''
  data.forEach(([n, v, c]) => {
    const len = (v / 9) * C
    arcs += `<circle cx="90" cy="90" r="${r}" fill="none" stroke="${c}" stroke-width="${thick}" stroke-dasharray="${len - 1.5} ${C - len + 1.5}" stroke-dashoffset="${-off}" transform="rotate(-90 90 90)"><title>${n}: ${v}</title></circle>`
    off += len
  })
  const legend = data.map(([n, v, c]) => `<li><i style="background:${c}"></i><span>${n}</span><b>${v} (${Math.round((v / 9) * 100)}%)</b></li>`).join('')
  return `<div class="donut"><svg viewBox="0 0 180 180" width="170" height="170">${arcs}<text x="90" y="88" text-anchor="middle" font-size="30" font-weight="700" fill="currentColor">9</text><text x="90" y="108" text-anchor="middle" class="ax">Total</text></svg><ul class="legend-list">${legend}</ul></div>`
}

function lineChart() {
  const w = 460, h = 230, pad = { l: 34, r: 12, t: 10, b: 28 }
  const op = [9, 15, 13, 21, 16, 19, 25, 24, 29, 26, 28, 25], rs = [3, 3, 8, 12, 6, 9, 7, 12, 9, 12, 10, 9]
  const x = (i) => pad.l + ((w - pad.l - pad.r) / (op.length - 1)) * i
  const y = (v) => h - pad.b - (v / 40) * (h - pad.t - pad.b)
  const path = (a) => a.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join('')
  const dots = (a, c, n) => a.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.6" fill="${c}"><title>${n}: ${v}</title></circle>`).join('')
  let s = gridY(w, h, pad, 40, 4)
  xl.forEach((l, i) => (s += `<text x="${pad.l + ((w - pad.l - pad.r) / 4) * i}" y="${h - 8}" text-anchor="middle" class="ax">${l}</text>`))
  s += `<path d="${path(rs)}" fill="none" stroke="${GREY}" stroke-width="1.6"/><path d="${path(op)}" fill="none" stroke="${YEL}" stroke-width="1.6"/>${dots(rs, GREY, 'Resolved')}${dots(op, YEL, 'Opened')}`
  return `<svg viewBox="0 0 ${w} ${h}" class="chart">${s}</svg>`
}

// ---- data ----
const nav = [['Overview', 'home'], ['Verification queue', 'user'], ['Legal resources', 'file'], ['AI feedback and content quality', 'chat'], ['Support and reports', 'chat'], ['User management', 'user'], ['Settings', 'gear']]
const kpis = [
  ['Citizen accounts', 'user', '1,248', '12%', 'up', 'good'],
  ['Advocate accounts', 'brief', '36', '8%', 'up', 'good'],
  ['Verification queue', 'file', '9', '18%', 'dn', 'bad'],
  ['Open tickets and reports', 'chat', '14', '27%', 'up', 'bad'],
  ['Resources due for review', 'file', '7', '36%', 'dn', 'good'],
  ['Flagged AI answers', 'shield', '5', '25%', 'up', 'bad'],
]
const attention = [['Immediate safety concern reports', 1, '2 hours', 'red'], ['Privacy or data exposure', 0, '-', 'yel'], ['Account compromise', 2, '1 day', 'yel'], ['Inappropriate or harmful AI content', 3, '3 days', 'yel'], ['Legal resource updates overdue', 7, '5 days', 'yel']]
const activity = [['10:24 AM', 'New user', 'USR-1048', 'Completed', 'grn'], ['09:18 AM', 'Advocate sign up', 'ADV-0321', 'Pending review', 'yel'], ['08:45 AM', 'Ticket created', 'TCK-0912', 'Open', 'yel'], ['07:32 AM', 'Resource updated', 'RES-0056', 'Published', 'grn'], ['12 Oct, 9:14 PM', 'AI answer flagged', 'AI-0784', 'Under review', 'yel']]

const page = (title, css, opts = {}) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>
*{box-sizing:border-box;margin:0}
:root{--side:#101010;--bg:#FAFAFA;--ink:#111;--mute:#85858D;--yel:#FFC900;--card:#fff;--line:#E5E5E8;--good:#16A34A;--bad:#E11D2E;--r:10px}
body{font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;background:var(--bg);color:var(--ink);font-size:14px}
.app{display:flex;min-height:100vh}
aside{width:250px;background:var(--side);color:#fff;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;flex:none}
.brand{display:flex;gap:12px;align-items:center;padding:22px 20px 18px}.brand b{font-size:24px;display:block;line-height:1.1}.brand small{color:#C9C9CE;font-size:14px}
nav a{display:flex;align-items:center;gap:14px;padding:14px 22px;color:#E8E8EA;text-decoration:none;position:relative}
nav a:hover{background:#1b1b1b}nav a.on{background:#262626;font-weight:600}
.me{margin-top:auto;padding:16px 20px;border-top:1px solid #2a2a2a;margin:auto 16px 0}
.av{width:38px;height:38px;border-radius:50%;background:#fff;color:#111;display:grid;place-items:center;font-weight:700;font-size:14px;flex:none}
.me .row{display:flex;gap:12px;align-items:center;margin-bottom:14px}.me small{color:#B5B5BB;display:block}
.out{display:flex;gap:12px;align-items:center;color:#E8E8EA;padding:6px 0 14px}
main{flex:1;min-width:0}
.top{height:64px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:16px;padding:0 26px}
.menu{display:none;background:none;border:0}
.search{flex:1;max-width:680px;display:flex;align-items:center;gap:10px;border:1px solid var(--line);border-radius:8px;padding:0 14px;height:40px;color:var(--mute);background:#fff}
.search span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.demo{margin-left:auto;border:1px solid var(--yel);background:#FFF8D6;font-weight:700;font-size:12px;padding:8px 12px;border-radius:6px;white-space:nowrap}
.prof{display:flex;align-items:center;gap:10px;white-space:nowrap}.prof .av{background:#EDEDEF}
.bell{position:relative;display:flex}.bell:after{content:"";position:absolute;right:-1px;top:-1px;width:8px;height:8px;background:var(--yel);border-radius:50%}
.content{padding:26px 28px 32px}
.head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap}
h1{font-size:34px;letter-spacing:-.5px}.sub{color:var(--mute);font-size:16px;margin-top:4px}
.range{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--line);border-radius:8px;padding:10px 14px}
.notice{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);border-left:4px solid var(--yel);border-radius:6px;padding:14px 16px;margin:18px 0}
.kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r)}
.kpi{padding:16px}.kpi .t{display:flex;gap:8px;align-items:flex-start;color:#333;font-size:13px;line-height:1.3;min-height:36px}.kpi .t svg:last-child{margin-left:auto;color:#999;flex:none}
.kpi .v{font-size:30px;font-weight:700;margin:12px 0 4px}
.d{font-weight:600;display:flex;gap:4px;align-items:center;font-size:13px}.d.good{color:var(--good)}.d.bad{color:var(--bad)}
.kpi small{color:var(--mute);display:block;margin-top:2px}
.tag{display:inline-block;background:#F0F0F2;color:#666;font-size:11px;padding:3px 9px;border-radius:5px;margin-top:10px}
.charts{display:grid;grid-template-columns:1.2fr 1.05fr 1.2fr;gap:14px;margin:16px 0}
.panel{padding:20px}.panel h3{font-size:18px}.panel p.s{color:var(--mute);font-size:13px;margin:4px 0 14px}
.ph{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap}
.lg{display:flex;gap:14px;font-size:12px;color:#444}.lg i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px}
.chart{width:100%;height:auto}.ax{font-size:11px;fill:#777}
.donut{display:flex;align-items:center;gap:18px;flex-wrap:wrap;justify-content:center}
.legend-list{list-style:none;padding:0;font-size:13px;flex:1;min-width:150px}
.legend-list li{display:flex;align-items:center;gap:8px;padding:6px 0}.legend-list i{width:10px;height:10px;border-radius:50%;flex:none}.legend-list span{flex:1}.legend-list b{font-weight:500}
.bottom{display:grid;grid-template-columns:1.1fr 1fr;gap:14px}
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;font-weight:600;padding:12px;background:#FAFAFA;border-bottom:1px solid var(--line)}
td{padding:11px 12px;border-bottom:1px solid #F0F0F2;white-space:nowrap}tr:last-child td{border-bottom:0}
.dot{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:10px;vertical-align:-1px}
.red{background:#EF3B3B}.yel{background:var(--yel)}.grn{background:#16A34A}
a.v{color:inherit;font-weight:600}
.va{display:flex;align-items:center;gap:6px;font-weight:600;color:inherit}
footer{color:var(--mute);text-align:center;font-size:12px;margin-top:24px}
@media(max-width:1400px){.kpis{grid-template-columns:repeat(3,1fr)}}
@media(max-width:1180px){.charts{grid-template-columns:1fr 1fr}.bottom{grid-template-columns:1fr}}
@media(max-width:860px){aside{position:fixed;transform:translateX(-100%);z-index:9;transition:.2s}aside.open{transform:none}.menu{display:block}.prof span,.demo{display:none}.charts{grid-template-columns:1fr}.kpis{grid-template-columns:repeat(2,1fr)}.content{padding:18px 16px}.top{padding:0 14px}h1{font-size:28px}}
${css}
</style></head><body><div class="app">
<aside id="sb"><div class="brand">${logo}<div><b>Raksham</b><small>Admin Console</small></div></div>
<nav>${nav.map(([n, i], k) => `<a href="#" class="${k ? '' : 'on'}">${ic(I[i], 22)}<span>${n}</span></a>`).join('')}</nav>
<div class="me"><div class="row"><div class="av">VR</div><div>Verification Reviewer<small>View profile</small></div></div><div class="out">${ic(I.out, 22)} Sign out</div></div></aside>
<main><div class="top"><button class="menu" onclick="document.getElementById('sb').classList.toggle('open')">${ic(I.menu, 24)}</button>
<div class="search">${ic(I.search, 18)}<span>Search ticket ID, user ID, resource or keyword...</span></div>
<div class="demo">DEMO ENVIRONMENT</div><div class="prof"><div class="av">VR</div><span>Verification Reviewer</span>${ic(I.down, 16)}</div><div class="bell">${ic(I.bell, 22)}</div></div>
<div class="content">
<div class="head"><div><h1>Overview</h1><p class="sub">Key activity, system status and tasks across Raksham.</p></div><div class="range">${ic(I.cal, 18)}Last 30 days${ic(I.down, 16)}</div></div>
<div class="notice">${ic(I.info, 20)}Demo environment. All numbers, IDs, and records shown here are sample data.</div>
<div class="kpis">${kpis.map(([t, i, v, p, a, c]) => `<div class="card kpi"><div class="t">${ic(I[i], 22)}<span>${t}</span>${ic(I.info, 15)}</div><div class="v">${v}</div><div class="d ${c}">${ic(I[a], 14)}${p}</div><small>vs previous 30 days</small><span class="tag">Sample</span></div>`).join('')}</div>
<div class="charts">
<div class="card panel"><div class="ph"><h3>User growth</h3><div class="lg"><span><i style="background:${YEL}"></i>Citizens</span><span><i style="background:${GREY}"></i>Advocates</span></div></div><p class="s">New citizen and advocate accounts in the last 30 days.</p>${barChart(opts.barR ?? 2)}</div>
<div class="card panel"><h3>Verification queue status</h3><p class="s">Current status of items in the queue.</p>${donut(opts.thick)}</div>
<div class="card panel"><div class="ph"><h3>Tickets and reports</h3><div class="lg"><span><i style="background:${YEL}"></i>Opened</span><span><i style="background:${GREY}"></i>Resolved</span></div></div><p class="s">Opened vs resolved in the last 30 days.</p>${lineChart()}</div></div>
<div class="bottom">
<div class="card panel"><h3>Needs attention</h3><p class="s">Items that require action.</p><div class="tw"><table><tr><th>Category</th><th>Open</th><th>Oldest</th><th>Action</th></tr>${attention.map(([c, o, a, d]) => `<tr><td><span class="dot ${d}"></span>${c}</td><td>${o}</td><td>${a}</td><td><a class="v" href="#"><span class="va"><u>View</u>${ic(I.arrow, 15)}</span></a></td></tr>`).join('')}</table></div></div>
<div class="card panel"><div class="ph"><h3>Recent activity</h3><a class="va" href="#"><u>View all</u>${ic(I.arrow, 15)}</a></div><p class="s"></p><div class="tw"><table><tr><th>Time</th><th>Type</th><th>Reference ID</th><th>Status</th></tr>${activity.map(([t, ty, r, s, d]) => `<tr><td>${t}</td><td>${ty}</td><td>${r}</td><td><span class="dot ${d}"></span>${s}</td></tr>`).join('')}</table></div></div></div>
<footer>Raksham provides general legal information, not legal advice. Not affiliated with any government body.</footer>
</div></main></div></body></html>`

const variants = {
  'variant-a-faithful': {
    title: 'A – Faithful',
    css: `nav a.on:before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--yel)}`,
  },
  'variant-b-soft': {
    title: 'B – Soft',
    opts: { barR: 6, thick: 20 },
    css: `:root{--bg:#F6F6F3;--r:18px;--line:#ECECE8}
.card{box-shadow:0 1px 2px rgba(0,0,0,.04),0 8px 24px rgba(16,16,16,.05);border-color:transparent}
aside{margin:12px;height:calc(100vh - 24px);border-radius:20px}
nav{padding:0 10px}nav a{border-radius:12px;padding:13px 14px}nav a.on{background:var(--yel);color:#111}
nav a.on svg{stroke-width:2}
.top{background:transparent;border:0;height:72px}.search{border-radius:999px;border-color:transparent;box-shadow:0 1px 2px rgba(0,0,0,.06)}
.demo{border-radius:999px}.range{border-radius:999px;border-color:transparent;box-shadow:0 1px 2px rgba(0,0,0,.06)}
.kpi .t svg:first-child{background:#FFF3BF;padding:6px;width:34px;height:34px;border-radius:10px}
.tag{border-radius:999px}.notice{border-radius:14px;background:#FFFBE6;border-color:#F4E28A;border-left-width:1px}
th{background:transparent;color:var(--mute);font-weight:600}.dot{width:9px;height:9px}
td .dot.grn,td .dot.yel{}`,
  },
  'variant-c-bold': {
    title: 'C – Bold',
    opts: { barR: 0, thick: 30 },
    css: `:root{--r:4px;--bg:#F2F2F0;--line:#D9D9DD}
nav a.on{background:var(--yel);color:#111;font-weight:700}
.brand{border-bottom:1px solid #2a2a2a;margin-bottom:8px}
.top{border-bottom:2px solid #111}.search{border-radius:4px;border:1.5px solid #111}
.demo{background:var(--yel);border-color:#111;border-radius:2px}
h1{font-size:38px;font-weight:800}
.card{border:1.5px solid #111;box-shadow:4px 4px 0 #111}
.kpi .v{font-size:36px;font-weight:800}
.tag{border-radius:2px;background:#111;color:#fff}
.notice{border:1.5px solid #111;background:#FFF3BF;border-left:8px solid #111;border-radius:2px}
.panel h3{text-transform:uppercase;letter-spacing:.5px;font-size:15px}
th{background:#111;color:#fff}.dot{border-radius:2px}`,
  },
}
for (const [f, v] of Object.entries(variants)) writeFileSync(join(out, `${f}.html`), page(v.title, v.css, v.opts))
console.log('wrote', Object.keys(variants).length, 'files')
