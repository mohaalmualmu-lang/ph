// Main-path test at phone and desktop sizes: section completion, recall, order drill, sorter, flashcards,
// mixed practice, exam + results, fix-my-mistakes, persistence after reload, search, glossary popup, export/import, no overflow, no console errors.
import { createRequire } from 'module'; import path from 'path'; import { pathToFileURL } from 'url';
const require = createRequire(import.meta.url); const pw = require('playwright');
const url = pathToFileURL(path.resolve(process.argv[2] || 'index.html')).href;
const b = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
let fails = 0; const ok = (n, c, info = '') => { console.log((c ? 'PASS ' : 'FAIL ') + n + (info ? '  — ' + info : '')); if (!c) fails++; };
for (const [label, vp] of [['phone', { width: 375, height: 780 }], ['desktop', { width: 1366, height: 900 }]]) {
  console.log(`\n== ${label} ${vp.width}x${vp.height}`);
  const ctx = await b.newContext({ viewport: vp }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errs.push(m.text()); });
  await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  const answerRight = async () => { const id = await p.getAttribute('.qcard[data-qid]', 'data-qid'); const a = await p.evaluate(id => window.__app.Q[id].a, id); await p.click(`.qcard[data-qid="${id}"] .opt[data-oi="${a}"]`); };
  const answerWrong = async () => { const id = await p.getAttribute('.qcard[data-qid]', 'data-qid'); const a = await p.evaluate(id => window.__app.Q[id].a, id); await p.click(`.qcard[data-qid="${id}"] .opt:not([data-oi="${a}"])`); };
  const overflow = async () => p.evaluate(() => document.documentElement.scrollWidth - innerWidth);

  // 1. complete a section
  await p.goto(url + '#s.ch1.s2'); await p.click('#sqstart');
  for (let i = 0; i < 5; i++) { await answerRight(); await p.click('#sqnext'); }
  ok('section quiz completes the section', await p.evaluate(() => !!window.__app.S().sec['ch1.s2'].done));
  // recall
  await p.click('[data-act=rec-show]'); await p.click('[data-act=rec-y]');
  ok('recall item saved', await p.evaluate(() => Object.keys(window.__app.S().rec).length === 1));
  // order drill
  const steps = await p.evaluate(() => ['Infectious agent', 'Reservoir', 'Portal of exit', 'Mode of transmission', 'Portal of entry', 'Susceptible host']);
  for (const s of steps) await p.click(`[data-id="c1-chain"] .chip:text-is("${s}")`);
  await p.click('[data-id="c1-chain"] [data-c=check]');
  ok('order drill solved', await p.evaluate(() => window.__app.S().drill['c1-chain'] === 1));
  // table test mode
  await p.click('.tblw [data-act=testtbl]'); ok('table hides cells', await p.evaluate(() => document.querySelector('.tblw.testing td.h') && getComputedStyle(document.querySelector('.tblw.testing td.h')).color === 'rgba(0, 0, 0, 0)'));
  // diagram hide labels
  await p.click('.diag [data-act=dhide]'); ok('diagram hides labels', await p.evaluate(() => document.querySelector('.diag').classList.contains('hidel')));
  // glossary popup
  await p.click('.term >> nth=0'); ok('glossary popup shows Arabic', await p.isVisible('.pop .ar'));
  await p.click('[data-act=closepop]');
  ok('no overflow on section', await overflow() <= 0);
  // sorter
  await p.goto(url + '#s.ch1.s4');
  const items = await p.evaluate(() => [...document.querySelectorAll('[data-id="c1-levels"] .it')].map(e => +e.dataset.i));
  for (const i of items) { const c = await p.evaluate(i => window.__app.UNITS[0].sorts.find(s => s.id === 'c1-levels').items[i][1], i); await p.click(`[data-id="c1-levels"] .it[data-i="${i}"] [data-ci="${c}"]`); }
  ok('sorter solved', await p.evaluate(() => window.__app.S().drill['c1-levels'] === 1));
  // flashcards: learn mode, master one card (3 correct)
  await p.goto(url + '#cards'); await p.click('#cl');
  for (let i = 0; i < 12; i++) { if (!(await p.$('#fc'))) break; await p.click('#fc'); await p.click('#gr [data-g="1"]'); }
  ok('flashcards: cards mastered after 3 correct', await p.evaluate(() => Object.values(window.__app.S().cards).some(c => c.learned && c.due)));
  // mixed practice
  await p.goto(url + '#practice'); await answerWrong(); await p.click('#pnext'); await answerRight();
  ok('practice records answers + mistake', await p.evaluate(() => window.__app.S().prac.n === 2 && Object.keys(window.__app.S().mis).length >= 1));
  // unit exam
  await p.goto(url + '#exams'); await p.click('[data-ex=unit][data-u=ch1]');
  const n = await p.evaluate(() => window.__app.S().run.qs.length);
  for (let i = 0; i < n; i++) { if (i % 4 === 0) await answerWrong(); else await answerRight(); await p.click('#rnext'); }
  await p.click('#cyes');
  ok('exam shows result by unit', await p.isVisible('text=حسب الوحدة') && (await p.$$('.res-table tbody tr')).length >= 1);
  ok('exam saved', await p.evaluate(() => window.__app.S().exams.length === 1));
  ok('no overflow on results', await overflow() <= 0);
  // final exam with timer starts
  await p.goto(url + '#exams'); await p.click('[data-ex=final]'); await p.waitForSelector('#tmr'); await p.waitForTimeout(1100); ok('final exam timer runs', /⏱ [0-9]+:[0-9]{2}/.test(await p.textContent('#tmr')));
  await p.click('#rsub'); await p.click('#cyes');
  // fix mistakes: answer until queue empty
  await p.goto(url + '#fix');
  for (let i = 0; i < 200; i++) { if (!(await p.$('.qcard[data-qid]'))) break; await answerRight(); await p.click('#fnext'); }
  ok('fix-my-mistakes empties the queue', await p.evaluate(() => Object.keys(window.__app.S().mis).length === 0));
  // persistence
  await p.reload(); await p.goto(url + '#home');
  ok('progress persists after reload', await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('ems313-study-v1')); return s.sec['ch1.s2'].done && s.exams.length === 2; }));
  ok('section ✓ shown on route', (await p.$$('.seclist .chk.on')).length >= 1);
  // steps page auto-checks
  await p.goto(url + '#steps'); ok('steps page renders 13 steps', (await p.$$('.steps li')).length === 13);
  // search
  await p.goto(url + '#search'); await p.fill('#sq', 'droplet nuclei'); ok('search finds results', (await p.$$('.res')).length > 0);
  await p.fill('#sq', 'المستودع'); ok('Arabic search finds glossary', (await p.$$('.res')).length > 0);
  // glossary search
  await p.goto(url + '#glossary'); await p.fill('#gq', 'تعقيم'); ok('glossary Arabic filter', (await p.$$('.gitem')).length > 0);
  // settings: theme + export/import
  await p.goto(url + '#settings'); await p.click('[data-theme-set=dark]');
  ok('dark theme applied', await p.evaluate(() => document.documentElement.dataset.theme === 'dark'));
  await p.click('#exp'); const code = await p.inputValue('#expt');
  await p.evaluate(() => localStorage.clear());
  await p.fill('#impt', code); await p.click('#imp');
  ok('export/import restores progress', await p.evaluate(() => window.__app.S().exams.length === 2));
  await p.click('#rst'); await p.click('#ry'); ok('reset with in-page confirm', await p.evaluate(() => window.__app.S().exams.length === 0));
  for (const h of ['#home', '#tools', '#cards', '#exams', '#conflicts', '#steps', '#more', '#s.ch6.s7', '#s.ch3.s4', '#s.ch4.s5', '#s.ch2.s3']) { await p.goto(url + h); await p.waitForTimeout(80); const o = await overflow(); if (o > 0) ok('overflow ' + h, false, o + 'px'); }
  ok('no horizontal overflow on main pages', true);
  ok('no console errors', errs.length === 0, errs.join(' | '));
  await ctx.close();
}
await b.close();
console.log(fails ? `\n${fails} FAILED` : '\nALL PASSED'); process.exit(fails ? 1 : 0);
