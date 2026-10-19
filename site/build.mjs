// Build: merge data/*.js + src/* into one self-contained HTML file, after validating the content.
//   node build.mjs           → index.html (full document, works offline) + dist/artifact.html (fragment for publishing)
//   node build.mjs --check   → validation only
import fs from 'fs'; import path from 'path'; import vm from 'vm'; import { fileURLToPath, pathToFileURL } from 'url';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const imp = async f => {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.log(`ERROR ${f} is missing. Build stopped.${f === 'data/extra.js' ? '\n      It must contain: export default { numbers: [{ v, what, u, sk, src }, …], confuse: [{ id, title, head, rows, src, note? }, …] }' : ''}`); process.exit(1); }
  try { return (await import(pathToFileURL(p).href)).default; }
  catch (e) { console.log(`ERROR ${f} could not be loaded: ${e.message}. Build stopped.`); process.exit(1); }
};

const unitFiles = ['data/ch1.js', 'data/ch2.js', 'data/ch3.js', 'data/ch4.js', 'data/ch6.js'];
const units = []; for (const f of unitFiles) units.push(await imp(f));
const glossary = await imp('data/glossary.js');
const meta = await imp('data/meta.js');
const extra = await imp('data/extra.js');

const errors = [], warns = [];
const E = m => errors.push(m), W = m => warns.push(m);
// diagram ids come from src/diagrams.js itself, so the list cannot drift
const SVG_IDS = Object.keys(vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'src/diagrams.js'), 'utf8') + ';DIAGRAMS', {}));
const NOTE_KINDS = ['key', 'warn', 'ems', 'conflict', 'added'];
const str = v => typeof v === 'string' && v.trim().length > 0;
const strArr = v => Array.isArray(v) && v.length > 0 && v.every(str);
// required fields per block type (unknown type = error)
const BLOCKS = {
  p: b => str(b.x), h: b => str(b.x), ul: b => strArr(b.items), ol: b => strArr(b.items),
  note: b => str(b.x), stat: b => str(String(b.n == null ? '' : b.n)) && str(b.x),
  table: b => Array.isArray(b.head) && b.head.length >= 2 && Array.isArray(b.rows) && b.rows.length > 0,
  twocol: b => b.a && b.b && str(b.a.h) && str(b.b.h) && strArr(b.a.items) && strArr(b.b.items),
  chain: b => strArr(b.items) && b.items.length >= 2, why: b => str(b.q) && str(b.a),
  case: b => str(b.title) && str(b.x) && str(b.q) && str(b.a) && str(b.src),
  svg: b => str(b.id), order: b => str(b.id), sort: b => str(b.id),
  mistakes: b => str(b.intro) && Array.isArray(b.lines) && b.lines.length > 0 && b.lines.every(l => Array.isArray(l) && str(l[0]) && str(l[2])),
  dcards: b => Array.isArray(b.items) && b.items.length > 0 && b.items.every(c => str(c.name) && str(c.src))
};
const MIN_Q = 5; // every section quiz draws 5 questions; the pass mark is 4 of 5
const ids = new Set(), refs = new Set();
const dupe = (id, what) => { if (ids.has(id)) E(`duplicate id ${id} (${what})`); ids.add(id); };
const walk = (v, where) => { if (typeof v === 'string') { for (const m of v.matchAll(/\{([a-z0-9]+)(?:\|[^}]*)?\}/g)) { refs.add(m[1]); if (!glossary[m[1]]) E(`${where}: glossary term "${m[1]}" missing`); } } else if (Array.isArray(v)) v.forEach(x => walk(x, where)); else if (v && typeof v === 'object') Object.values(v).forEach(x => walk(x, where)); };
const strip = s => String(s).replace(/\*\*/g, '').replace(/\{[a-z0-9]+\|([^}]+)\}/g, '$1').replace(/\{([a-z0-9]+)\}/g, (m, id) => glossary[id] ? glossary[id][0] : id);

let mcq = 0, longest = 0, shortest = 0; const lenList = [];
const unitIds = new Set(units.map(u => u.id)), secKeys = new Set();
for (const u of units) {
  if (!u.file) E(`${u.id}: missing source file`);
  // learning objectives (contract item 2): optional for ch1 (no objectives slide), otherwise expected
  if (u.objectives != null || u.objSrc != null) {
    if (!strArr(u.objectives)) E(`${u.id}: objectives must be a non-empty list of strings`);
    if (!str(u.objSrc)) E(`${u.id}: objectives need objSrc (e.g. 'Slide 2')`);
  } else if (u.id !== 'ch1') W(`${u.id}: no learning objectives`);
  walk(u.objectives || [], `${u.id} objectives`);
  const secIds = new Set(u.sections.map(s => s.id));
  u.sections.forEach(s => secKeys.add(u.id + '.' + s.id));
  const orders = new Set((u.orders || []).map(o => o.id)), sorts = new Set((u.sorts || []).map(o => o.id));
  for (const s of u.sections) {
    const at = `${u.id}.${s.id}`;
    if (!s.src) E(`${at}: missing source (slides)`);
    if (!s.recall || !s.recall.length) W(`${at}: no recall items`);
    (s.recall || []).forEach((r, i) => { if (!r || !str(r.q) || !str(r.a)) E(`${at} recall ${i}: missing q/a`); });
    const nq = u.questions.filter(q => q.sec === s.id).length;
    if (nq < MIN_Q) E(`${at} "${s.title}": only ${nq} questions (need ≥${MIN_Q} for the section quiz)`);
    (s.blocks || []).forEach((b, i) => {
      const bw = `${at} block ${i}`;
      if (!b || !BLOCKS[b.t]) { E(`${bw}: unknown block type ${b && b.t}`); return; }
      if (!BLOCKS[b.t](b)) E(`${bw} (${b.t}): missing or empty required fields`);
      if (b.t === 'note' && !NOTE_KINDS.includes(b.k)) E(`${bw}: unknown note kind ${b.k}`);
      if (b.t === 'svg' && !SVG_IDS.includes(b.id)) E(`${bw}: unknown diagram ${b.id}`);
      if (b.t === 'order' && !orders.has(b.id)) E(`${bw}: unknown order drill ${b.id}`);
      if (b.t === 'sort' && !sorts.has(b.id)) E(`${bw}: unknown sorter ${b.id}`);
      if (b.t === 'table' && Array.isArray(b.rows)) b.rows.forEach((r, j) => { if (!Array.isArray(r) || r.length !== b.head.length) E(`${bw}: table "${b.cap}" row ${j} has ${r && r.length} cells, header has ${b.head.length}`); });
    });
    walk(s, at);
  }
  for (const o of u.orders || []) {
    dupe(o.id, 'order'); if (!secIds.has(o.sec)) E(`order ${o.id}: unknown section`);
    if (!strArr(o.steps) || o.steps.length < 3) E(`order ${o.id}: too few steps`);
    else if (new Set(o.steps).size < 2) E(`order ${o.id}: all steps are identical`); // duplicates are fine: drills are graded by step text
  }
  for (const o of u.sorts || []) { dupe(o.id, 'sort'); if (!secIds.has(o.sec)) E(`sort ${o.id}: unknown section`); o.items.forEach(([t, c]) => { if (c < 0 || c >= o.cats.length) E(`sort ${o.id}: "${t}" bad category`); }); }
  for (const q of u.questions) {
    dupe(q.id, 'question');
    const a = q.a == null ? 0 : q.a;
    if (!secIds.has(q.sec)) E(`${q.id}: unknown section ${q.sec}`);
    if (!q.q || !q.x || !q.src) E(`${q.id}: missing text, explanation or source`);
    if (!Array.isArray(q.o) || q.o.length < 2) E(`${q.id}: needs ≥2 options`);
    else {
      if (a < 0 || a >= q.o.length) E(`${q.id}: answer index out of range`);
      const low = q.o.map(o => strip(o).trim().toLowerCase());
      if (new Set(low).size !== low.length) E(`${q.id}: duplicate options`);
      if (low.some(o => !o)) E(`${q.id}: empty option`);
      if (q.o.length >= 3 && !q.fix) {
        mcq++; const L = q.o.map(o => strip(o).length), c = L[a], others = L.filter((x, i) => i !== a);
        if (c > Math.max(...others)) { longest++; lenList.push(q.id); }
        if (c < Math.min(...others)) shortest++;
      }
    }
    if (q.past && !(q.past.file && q.past.n)) E(`${q.id}: past question without file/number`);
    walk(q, q.id);
  }
  u.cards.forEach((c, i) => { if (!c.f || !c.b) E(`${u.id} card ${i}: empty`); if (!secIds.has(c.sec)) E(`${u.id} card ${i}: unknown section`); walk(c, `${u.id} card ${i}`); });
}

// ---- data/extra.js (contract item 3) ----
if (!extra || !Array.isArray(extra.numbers) || !Array.isArray(extra.confuse)) E('data/extra.js: needs export default { numbers: [...], confuse: [...] }');
else {
  extra.numbers.forEach((n, i) => {
    const at = `extra.numbers[${i}] (${n && n.v})`;
    if (!n || !str(String(n.v == null ? '' : n.v)) || !str(n.what) || !str(n.src)) E(`${at}: needs v, what and src`);
    if (!n || !unitIds.has(n.u)) E(`${at}: unknown unit "${n && n.u}"`);
    else if (!secKeys.has(n.sk)) E(`${at}: unknown section "${n.sk}"`);
    else if (!String(n.sk).startsWith(n.u + '.')) E(`${at}: section ${n.sk} is not in unit ${n.u}`);
  });
  const cids = new Set();
  extra.confuse.forEach((c, i) => {
    const at = `extra.confuse[${i}] (${c && c.id})`;
    if (!c || !str(c.id)) { E(`${at}: missing id`); return; }
    if (cids.has(c.id)) E(`${at}: duplicate id`); cids.add(c.id);
    if (!str(c.title) || !str(c.src)) E(`${at}: needs title and src`);
    if (!Array.isArray(c.head) || c.head.length < 3) E(`${at}: head needs ≥3 cells ('' + two labels)`);
    if (!Array.isArray(c.rows) || !c.rows.length) E(`${at}: no rows`);
    else c.rows.forEach((r, j) => { if (!Array.isArray(r) || r.length !== (c.head || []).length) E(`${at}: row ${j} has ${r && r.length} cells, head has ${(c.head || []).length}`); });
  });
  walk(extra, 'extra');
}
// ---- data/meta.js: unreadable course files (contract item 4) ----
if (meta.missing != null) { if (!Array.isArray(meta.missing)) E('meta.missing must be a list'); else meta.missing.forEach((m, i) => { if (!m || !str(m.file) || !str(m.note)) E(`meta.missing[${i}]: needs file and note`); }); }
else W('meta.missing is not set (no "not covered" notice will be shown)');

// ---- glossary popups on prompts (question stems, card fronts, recall prompts) ----
// Before the answer is shown the app's popup gives only the term and its Arabic name (src/app.js briefPop).
// Warn when that English name repeats words of the answer that the prompt itself does not show:
// the popup would then hand over the answer. Fix with nl: true on the item (no glossary link on its prompt).
{
  const tmap = new Map();
  const tadd = (name, id) => { name = name.replace(/\s+/g, ' ').trim(); if (name.length < 3) return; const acr = /^[A-Z0-9][A-Za-z0-9.\-]*$/.test(name) && (name.match(/[A-Z]/g) || []).length >= 2 && name.length <= 6; const k = name.toLowerCase(); if (!tmap.has(k)) tmap.set(k, { id, cs: acr, raw: name }); };
  Object.keys(glossary).forEach(id => String(glossary[id][0]).split(/\s+\/\s+/).forEach(part => { tadd(part, id); tadd(part.replace(/\s*\([^)]*\)/g, ' '), id); (part.match(/\(([^)]+)\)/g) || []).forEach(p => tadd(p.slice(1, -1), id)); }));
  const keys = [...tmap.keys()].sort((a, b) => b.length - a.length);
  const tre = new RegExp('(^|[^A-Za-z0-9\\-])(' + keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')((?:e?s)?)(?![A-Za-z0-9\\-])', 'gi');
  const linked = s => { const ids = new Set(); for (const m of String(s).matchAll(/\{([a-z0-9]+)(?:\|[^}]*)?\}/g)) ids.add(m[1]); for (const m of strip(s).matchAll(tre)) { const e = tmap.get(m[2].toLowerCase()); if (e && (!e.cs || m[2] === e.raw)) ids.add(e.id); } return ids; };
  const STOP = new Set('the and for with from that this into than then are was were has have not its their your you can may who what which when where how why all any per via one two'.split(' '));
  const words = s => new Set((strip(s).toLowerCase().match(/[a-z][a-z0-9\-]{2,}/g) || []).filter(w => !STOP.has(w)).map(w => w.length > 3 ? w.replace(/s$/, '') : w));
  let leaks = 0;
  const check = (where, prompt, answer, nl) => {
    if (nl) return;
    const pw = words(prompt), aw = words(answer);
    for (const id of linked(prompt)) {
      const g0 = String(glossary[id][0]), hit = [...words(g0)].filter(w => !pw.has(w) && aw.has(w));
      // another name of the same term (e.g. "Measles (rubeola)" on a prompt that says rubeola) used by the answer
      const names = g0.split(/\s+\/\s+/).flatMap(p => [p.replace(/\s*\([^)]*\)/g, ' '), ...(p.match(/\(([^)]+)\)/g) || []).map(x => x.slice(1, -1))]);
      const alias = names.some(n => { const nw = [...words(n)].filter(w => !pw.has(w)); return nw.length > 0 && nw.every(w => aw.has(w)); });
      if (hit.length >= 2 || alias) { leaks++; W(`${where}: the popup for "${g0}" names words that the answer uses (${hit.join(', ')}). Add nl: true if this gives the answer away.`); }
    }
  };
  for (const u of units) {
    u.questions.forEach(q => check(q.id, q.q, q.o[q.a == null ? 0 : q.a], q.nl));
    u.cards.forEach((c, i) => check(`${u.id} card ${i} "${strip(c.f)}"`, c.f, c.b, c.nl));
    u.sections.forEach(s => (s.recall || []).forEach((r, i) => check(`${u.id}.${s.id} recall ${i}`, r.q, r.a, r.nl)));
  }
}

for (const id of Object.keys(glossary)) { const g = glossary[id]; if (!Array.isArray(g) || g.length !== 3 || g.some(x => !x)) E(`glossary ${id}: needs [en, ar, explanation]`); if (!refs.has(id)) W(`glossary ${id} is not used in the content markup (it is still auto-linked in questions and cards)`); }

const nQ = units.reduce((a, u) => a + u.questions.length, 0), nPast = units.reduce((a, u) => a + u.questions.filter(q => q.past).length, 0);
const pL = Math.round(100 * longest / mcq), pS = Math.round(100 * shortest / mcq);
console.log(`units ${units.length} · sections ${units.reduce((a, u) => a + u.sections.length, 0)} · questions ${nQ} (${nPast} past) · cards ${units.reduce((a, u) => a + u.cards.length, 0)} · glossary ${Object.keys(glossary).length} · drills ${units.reduce((a, u) => a + (u.orders || []).length + (u.sorts || []).length, 0)} · numbers ${(extra.numbers || []).length} · confusable pairs ${(extra.confuse || []).length}`);
console.log(`answer-length check (${mcq} shuffled MCQs): correct is the LONGEST in ${longest} (${pL}%), the SHORTEST in ${shortest} (${pS}%). Chance level with 4 options ≈ 25%.`);
if (pL > 30) E(`correct answer is the longest option too often (${pL}% > 30%): ${lenList.join(', ')}`);
if (pS > 30) E(`correct answer is the shortest option too often (${pS}% > 30%)`);
warns.forEach(w => console.log('WARN ', w));
if (errors.length) { errors.forEach(e => console.log('ERROR', e)); console.log(`\n${errors.length} error(s). Build stopped.`); process.exit(1); }
if (process.argv.includes('--check')) { console.log('OK'); process.exit(0); }

// ---- assemble ----
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const js = f => read(f).replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
const data = JSON.stringify({ units, glossary, meta, extra }).replace(/</g, '\\u003c');
const head = `<title>EMS 313 Study Route</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Interactive study site for EMS 313 Public Health and Safety: learning route, flashcards, drills and exams.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap">
<style>${read('src/app.css')}</style>`;
const scripts = `<noscript>هذا الموقع يحتاج JavaScript.</noscript>
<script>window.DATA=${data};</script>
<script>${js('src/vendor/read-aloud.js')}</script>
<script>${js('src/diagrams.js')}</script>
<script>${js('src/app.js')}</script>`;
const full = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
</head>
<body>
${scripts}
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), full);
fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist/artifact.html'), head + '\n' + scripts + '\n');
console.log(`wrote index.html (${Math.round(full.length / 1024)} KB) and dist/artifact.html`);
