// Build: merge data/*.js + src/* into one self-contained HTML file, after validating the content.
//   node build.mjs           → index.html (full document, works offline) + dist/artifact.html (fragment for publishing)
//   node build.mjs --check   → validation only
import fs from 'fs'; import path from 'path'; import { fileURLToPath, pathToFileURL } from 'url';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const imp = async f => (await import(pathToFileURL(path.join(ROOT, f)).href)).default;

const unitFiles = ['data/ch1.js', 'data/ch2.js', 'data/ch3.js', 'data/ch4.js', 'data/ch6.js'];
const units = []; for (const f of unitFiles) units.push(await imp(f));
const glossary = await imp('data/glossary.js');
const meta = await imp('data/meta.js');

const errors = [], warns = [];
const E = m => errors.push(m), W = m => warns.push(m);
const SVG_IDS = ['chain', 'levels', 'routes', 'spaulding'];
const ids = new Set(), refs = new Set();
const dupe = (id, what) => { if (ids.has(id)) E(`duplicate id ${id} (${what})`); ids.add(id); };
const walk = (v, where) => { if (typeof v === 'string') { for (const m of v.matchAll(/\{([a-z0-9]+)(?:\|[^}]*)?\}/g)) { refs.add(m[1]); if (!glossary[m[1]]) E(`${where}: glossary term "${m[1]}" missing`); } } else if (Array.isArray(v)) v.forEach(x => walk(x, where)); else if (v && typeof v === 'object') Object.values(v).forEach(x => walk(x, where)); };
const strip = s => String(s).replace(/\*\*/g, '').replace(/\{[a-z0-9]+\|([^}]+)\}/g, '$1').replace(/\{([a-z0-9]+)\}/g, (m, id) => glossary[id] ? glossary[id][0] : id);

let mcq = 0, longest = 0, shortest = 0; const lenList = [];
for (const u of units) {
  if (!u.file) E(`${u.id}: missing source file`);
  const secIds = new Set(u.sections.map(s => s.id));
  const orders = new Set((u.orders || []).map(o => o.id)), sorts = new Set((u.sorts || []).map(o => o.id));
  for (const s of u.sections) {
    if (!s.src) E(`${u.id}.${s.id}: missing source (slides)`);
    if (!s.recall || !s.recall.length) W(`${u.id}.${s.id}: no recall items`);
    const nq = u.questions.filter(q => q.sec === s.id).length;
    if (nq < 3) E(`${u.id}.${s.id} "${s.title}": only ${nq} questions (need ≥3 for the section quiz)`);
    for (const b of s.blocks) {
      if (b.t === 'svg' && !SVG_IDS.includes(b.id)) E(`${u.id}.${s.id}: unknown diagram ${b.id}`);
      if (b.t === 'order' && !orders.has(b.id)) E(`${u.id}.${s.id}: unknown order drill ${b.id}`);
      if (b.t === 'sort' && !sorts.has(b.id)) E(`${u.id}.${s.id}: unknown sorter ${b.id}`);
      if (b.t === 'table') b.rows.forEach((r, i) => { if (r.length !== b.head.length) E(`${u.id}.${s.id}: table "${b.cap}" row ${i} has ${r.length} cells, header has ${b.head.length}`); });
    }
    walk(s, `${u.id}.${s.id}`);
  }
  for (const o of u.orders || []) { dupe(o.id, 'order'); if (!secIds.has(o.sec)) E(`order ${o.id}: unknown section`); if (o.steps.length < 3) E(`order ${o.id}: too few steps`); }
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
for (const id of Object.keys(glossary)) { const g = glossary[id]; if (!Array.isArray(g) || g.length !== 3 || g.some(x => !x)) E(`glossary ${id}: needs [en, ar, explanation]`); if (!refs.has(id)) W(`glossary ${id} is not used in the content`); }

const nQ = units.reduce((a, u) => a + u.questions.length, 0), nPast = units.reduce((a, u) => a + u.questions.filter(q => q.past).length, 0);
const pL = Math.round(100 * longest / mcq), pS = Math.round(100 * shortest / mcq);
console.log(`units ${units.length} · sections ${units.reduce((a, u) => a + u.sections.length, 0)} · questions ${nQ} (${nPast} past) · cards ${units.reduce((a, u) => a + u.cards.length, 0)} · glossary ${Object.keys(glossary).length} · drills ${units.reduce((a, u) => a + (u.orders || []).length + (u.sorts || []).length, 0)}`);
console.log(`answer-length check (${mcq} shuffled MCQs): correct is the LONGEST in ${longest} (${pL}%), the SHORTEST in ${shortest} (${pS}%). Chance level with 4 options ≈ 25%.`);
if (pL > 35) E(`correct answer is the longest option too often (${pL}% > 35%): ${lenList.join(', ')}`);
if (pS > 35) E(`correct answer is the shortest option too often (${pS}% > 35%)`);
warns.forEach(w => console.log('WARN ', w));
if (errors.length) { errors.forEach(e => console.log('ERROR', e)); console.log(`\n${errors.length} error(s). Build stopped.`); process.exit(1); }
if (process.argv.includes('--check')) { console.log('OK'); process.exit(0); }

// ---- assemble ----
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const js = f => read(f).replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
const data = JSON.stringify({ units, glossary, meta }).replace(/</g, '\\u003c');
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
