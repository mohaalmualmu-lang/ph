// Usage: node tests/e2e.mjs [file]. To test the published form, wrap dist/artifact.html in a page whose <head> is minimal (styles end up in <body>).
// Main-path test at phone and desktop sizes: section completion, recall, order drill, sorter, flashcards,
// mixed practice, exam + results, fix-my-mistakes, persistence after reload, search, glossary popup, export/import, no overflow, no console errors.
// Also: comprehensive exam over the whole bank, case reveal, recall re-hide on revisit, text-graded order drills (duplicate steps),
// flashcard back button, #numbers / #confuse / #recall pages, auto-linked glossary terms (never inside option buttons), glossary deep link.
// Also: unanswered exam questions are not mistakes, short glossary popup before answering, RTL sorter feedback, Arabic article in search,
// browser back during a flashcard session, revealed numbers survive a filter change.
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
  ok('recall answer stays open right after rating', await p.isVisible('.recall li[data-rid] .ans'));
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
  // recall: on a later visit the answer is hidden again and the last rating shows as a pill
  await p.goto(url + '#home'); await p.goto(url + '#s.ch1.s2');
  { const rid = await p.evaluate(() => Object.keys(window.__app.S().rec)[0]);
    ok('recall answer re-hidden on revisit', await p.evaluate(rid => { const li = document.querySelector(`[data-rid="${rid}"]`); return !!li && li.querySelector('.ans').hidden && /آخر مرة/.test(li.querySelector('.rbar').textContent) && !!li.querySelector('[data-act=rec-show]'); }, rid)); }
  // order drills are graded by step text: build the right sequence but take the LAST copy of a duplicated step first
  { const dup = await p.evaluate(() => { const o = Object.values(window.__app.ORD).find(o => new Set(o.steps).size < o.steps.length); return o ? { id: o.id, u: o.u, sec: o.sec, steps: o.steps } : null; });
    if (!dup) ok('text-graded order drill (no drill with duplicate steps in the data)', true);
    else {
      await p.goto(url + `#s.${dup.u}.${dup.sec}`);
      const used = new Set();
      for (const st of dup.steps) { const i = dup.steps.map((x, k) => x === st && !used.has(k) ? k : -1).filter(k => k >= 0).pop(); used.add(i); await p.click(`[data-id="${dup.id}"] .chip[data-i="${i}"]`); }
      await p.click(`[data-id="${dup.id}"] [data-c=check]`);
      ok('order drill with duplicate steps graded by text', await p.evaluate(id => window.__app.S().drill[id] === 1 && document.querySelectorAll(`[data-id="${id}"] .olist li.no`).length === 0, dup.id));
    } }
  // spot-the-mistake: a correct action is shown with a tick, an error with a cross
  { const m = await p.evaluate(() => { for (const u of window.__app.UNITS) for (const s of u.sections) for (const b of s.blocks) if (b.t === 'mistakes' && b.lines.some(l => !l[1])) return { sk: u.id + '.' + s.id, i: b.lines.findIndex(l => !l[1]) }; return null; });
    if (m) { await p.goto(url + '#s.' + m.sk); await p.click(`.mist li:nth-child(${m.i + 1}) [data-act=mist]`);
      ok('spot-the-mistake marks a correct line with ✓', await p.evaluate(i => { const f = document.querySelectorAll('.mist li')[i].querySelector('.fix'); return !f.hidden && f.classList.contains('ok') && f.textContent.includes('✓'); }, m.i)); } }
  // sorter
  await p.goto(url + '#s.ch1.s4');
  const items = await p.evaluate(() => [...document.querySelectorAll('[data-id="c1-levels"] .it')].map(e => +e.dataset.i));
  for (const i of items) { const c = await p.evaluate(i => window.__app.UNITS[0].sorts.find(s => s.id === 'c1-levels').items[i][1], i); await p.click(`[data-id="c1-levels"] .it[data-i="${i}"] [data-ci="${c}"]`); }
  ok('sorter solved', await p.evaluate(() => window.__app.S().drill['c1-levels'] === 1));
  { await p.click('[data-id="c1-levels"] [data-c=reset]');
    const i = await p.evaluate(() => +document.querySelector('[data-id="c1-levels"] .it').dataset.i), c = await p.evaluate(i => window.__app.SRT['c1-levels'].items[i][1], i);
    await p.click(`[data-id="c1-levels"] .it[data-i="${i}"] [data-ci]:not([data-ci="${c}"])`);
    ok('sorter wrong-answer feedback is RTL with the correct category after الصحيح', await p.evaluate(([i, c]) => { const f = document.querySelector(`[data-id="c1-levels"] .it[data-i="${i}"] .fb.no`); return !!f && f.getAttribute('dir') === 'rtl' && f.querySelector('bdi').textContent === window.__app.SRT['c1-levels'].cats[c]; }, [i, c])); }
  // flashcards: learn mode, master one card (3 correct)
  await p.goto(url + '#cards'); await p.click('#cl');
  await p.click('#fch'); ok('flashcard back shows its source slide', await p.evaluate(() => { const b = document.querySelector('#fc .back .src'); return !!b && /slide/i.test(b.textContent); })); await p.click('#gr [data-g="1"]');
  for (let i = 0; i < 12; i++) { if (!(await p.$('#fc'))) break; await p.click('#fch'); await p.click('#gr [data-g="1"]'); }
  ok('flashcards: cards mastered after 3 correct', await p.evaluate(() => Object.values(window.__app.S().cards).some(c => c.learned && c.due)));
  ok('flashcards: setup panels hidden during a session', await p.isHidden('.cards-setup'));
  if (await p.$('#fc')) { await p.goBack(); await p.waitForTimeout(150);
    ok('browser back during a card session returns to the card menu', await p.evaluate(() => location.hash === '#cards' && !document.querySelector('.cards-setup').hidden && !document.querySelector('#fc'))); }
  // free review of one unit to the end, then the end-of-session button must re-render #cards
  await p.goto(url + '#home'); await p.goto(url + '#cards'); await p.selectOption('#cf', 'ch1'); await p.click('#cfree');
  for (let i = 0; i < 400; i++) { if (!(await p.$('#fc'))) break; await p.click('#fch'); await p.click('#gr [data-g="2"]'); }
  await p.click('#cback'); await p.waitForTimeout(100);
  ok('flashcard back button returns to the card menu', await p.isVisible('.cards-setup') && await p.isVisible('#cl') && !(await p.$('#cback')) && await p.evaluate(() => location.hash === '#cards'));
  // mixed practice
  await p.goto(url + '#practice'); await answerWrong(); await p.click('#pnext'); await answerRight();
  ok('practice records answers + mistake', await p.evaluate(() => window.__app.S().prac.n === 2 && Object.keys(window.__app.S().mis).length >= 1));
  // glossary terms are linked automatically in questions and explanations, never inside option buttons
  ok('auto-link helper links a glossary term once', await p.evaluate(() => { const h = window.__app.autoLink('The reservoir and the reservoir.'); return (h.match(/class="term"/g) || []).length === 1; }));
  ok('auto-link never links inside an existing term or tag', await p.evaluate(() => { const h = window.__app.mdT('{reservoir|Reservoir} <b>x</b>'); return (h.match(/class="term"/g) || []).length === 1; }));
  { let found = false, inOpt = 0, explT = 0;
    for (let i = 0; i < 40 && !found; i++) {
      await p.click('#pnext');
      inOpt += (await p.$$('.opts .term')).length;
      if (await p.$('.qtext .term')) {
        found = true; await p.click('.qtext .term >> nth=0');
        ok('term in a question opens the Arabic popup without answering', await p.isVisible('.pop .ar') && (await p.$$('.opt[disabled]')).length === 0);
        ok('popup before answering is short (no explanation that could give the answer)', await p.evaluate(() => { const pop = document.querySelector('.pop'); return pop.dataset.brief === '1' && !pop.textContent.includes(window.__app.G[pop.dataset.g][2]); }));
        await p.click('[data-act=closepop]');
      }
      await answerRight(); explT += (await p.$$('.expl .term')).length;
    }
    ok('a question stem with an auto-linked term was found', found);
    ok('no glossary links inside option buttons', inOpt === 0);
    ok('explanations carry auto-linked terms', explT > 0 || await p.evaluate(() => Object.values(window.__app.Q).some(q => /class="term"/.test(window.__app.mdT(q.x))))); }
  // the unit card's exam button starts that unit's exam directly
  await p.goto(url + '#home'); await p.click('.unit [data-ex=unit][data-u=ch2]'); await p.waitForSelector('.qcard[data-qid]');
  ok('unit card starts its unit exam', await p.evaluate(() => location.hash === '#run' && window.__app.S().run.kind === 'unit:ch2'));
  // unit exam
  await p.goto(url + '#exams'); await p.click('#main [data-ex=unit][data-u=ch1]');
  const n = await p.evaluate(() => window.__app.S().run.qs.length);
  for (let i = 0; i < n; i++) { if (i % 4 === 0) await answerWrong(); else await answerRight(); await p.click('#rnext'); }
  await p.click('#cyes');
  ok('exam shows result by unit', await p.isVisible('text=حسب الوحدة') && (await p.$$('.res-table tbody tr')).length >= 1);
  ok('exam saved', await p.evaluate(() => window.__app.S().exams.length === 1));
  ok('no overflow on results', await overflow() <= 0);
  // comprehensive exam over the whole bank
  await p.goto(url + '#exams'); await p.click('[data-ex=all]'); await p.waitForSelector('.qcard[data-qid]');
  ok('comprehensive exam has every question', await p.evaluate(() => window.__app.S().run.qs.length === Object.keys(window.__app.Q).length && new Set(window.__app.S().run.qs).size === Object.keys(window.__app.Q).length));
  await answerRight(); ok('comprehensive exam gives instant feedback', await p.isVisible('.expl'));
  // a started whole-bank exam is not replaced by one tap on another exam
  await p.goto(url + '#exams'); await p.click('#main [data-ex=unit][data-u=ch3]');
  ok('starting another exam asks first (unfinished run kept)', await p.isVisible('#runwarn .confirm') && await p.evaluate(() => window.__app.S().run.kind === 'all' && location.hash === '#exams'));
  await p.click('#rwn'); await p.goto(url + '#run');
  await p.click('#rsub'); await p.click('#cyes');
  ok('unanswered questions are counted separately, not listed or queued as mistakes', await p.evaluate(() => /ما جاوبت: /.test((document.querySelector('#rskip') || {}).textContent || '') && document.querySelectorAll('#main .qcard').length === 0));
  // case block reveal
  await p.goto(url + '#s.ch2.s9'); await p.click('.case [data-act=reveal]'); ok('case answer revealed', await p.isVisible('.case .ans'));
  // final exam with timer starts
  await p.goto(url + '#exams'); await p.click('[data-ex=final]'); await p.waitForSelector('#tmr'); await p.waitForTimeout(1100); ok('final exam timer runs', /⏱ [0-9]+:[0-9]{2}/.test(await p.textContent('#tmr')));
  await p.click('#rsub'); await p.click('#cyes');
  // fix mistakes: answer until queue empty
  await p.goto(url + '#fix');
  for (let i = 0; i < 200; i++) { if (!(await p.$('.qcard[data-qid]'))) break; await answerRight(); await p.click('#fnext'); }
  ok('fix-my-mistakes empties the queue', await p.evaluate(() => Object.keys(window.__app.S().mis).length === 0));
  // important numbers page
  await p.goto(url + '#numbers');
  ok('numbers page lists every number', await p.evaluate(() => document.querySelectorAll('.nums li').length === window.__app.NUMS.length && window.__app.NUMS.length > 0));
  await p.click('#nuf [data-nu=ch2]');
  ok('numbers unit filter', await p.evaluate(() => { const n = window.__app.NUMS.filter(x => x.u === 'ch2').length; return document.querySelectorAll('.nums li').length === n; }));
  ok('numbers link to existing sections', await p.evaluate(() => [...document.querySelectorAll('.nums a[href^="#s."]')].every(a => window.__app.SEC[a.getAttribute('href').slice(3)])));
  await p.click('#nhide');
  ok('numbers hidden for self-test', await p.evaluate(() => { const v = document.querySelector('#nl.testing .nv'); return !!v && getComputedStyle(v).color === 'rgba(0, 0, 0, 0)'; }));
  await p.click('.nums .nv >> nth=0'); ok('tap reveals one number', await p.evaluate(() => document.querySelector('.nums .nv').classList.contains('shown')));
  { const k = await p.getAttribute('.nums .nv >> nth=0', 'data-nk'); await p.click('#nuf [data-nu=""]');
    ok('a revealed number stays revealed after a filter change', await p.evaluate(k => document.querySelector(`.nv[data-nk="${k}"]`).classList.contains('shown'), k)); }
  ok('no overflow on #numbers', await overflow() <= 0);
  await p.goto(url + '#numbers.ch6'); ok('numbers deep link filters by unit', await p.evaluate(() => document.querySelectorAll('.nums li').length === window.__app.NUMS.filter(x => x.u === 'ch6').length));
  // confusable pairs page
  await p.goto(url + '#confuse');
  ok('confuse page renders every pair table', await p.evaluate(() => document.querySelectorAll('.cfp .tblw table').length === window.__app.CONF.length && window.__app.CONF.length > 0));
  await p.click('.cfp [data-act=testtbl] >> nth=0');
  ok('confuse table hides cells', await p.evaluate(() => { const td = document.querySelector('.cfp .tblw.testing td.h'); return !!td && getComputedStyle(td).color === 'rgba(0, 0, 0, 0)'; }));
  ok('no overflow on #confuse', await overflow() <= 0);
  // recall page
  await p.goto(url + '#recall'); await p.selectOption('#rcf', 'all');
  ok('recall page lists every prompt', await p.evaluate(() => document.querySelectorAll('#rcl [data-rid]').length === window.__app.RECALL.length));
  ok('steps: recall step links to #recall', await p.evaluate(() => window.__app.stepStatus().find(s => s.href === '#recall') != null));
  // nav + search reach the new pages
  await p.goto(url + '#more'); ok('more page links the new pages', (await p.$$('#main a[href="#numbers"], #main a[href="#confuse"], #main a[href="#recall"]')).length === 3);
  // missing-chapter notice
  await p.goto(url + '#home'); ok('home shows the not-covered notice', await p.evaluate(() => !window.DATA.meta.missing || !window.DATA.meta.missing.length || /غير مغطّاة/.test(document.querySelector('#main').textContent)));
  await p.goto(url + '#conflicts'); ok('conflicts lists the unreadable files', await p.evaluate(() => !window.DATA.meta.missing || document.querySelectorAll('.miss li').length >= window.DATA.meta.missing.length));
  // persistence
  await p.reload(); await p.goto(url + '#home');
  ok('progress persists after reload', await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('ems313-study-v1')); return s.sec['ch1.s2'].done && s.exams.length === 3; }));
  ok('section ✓ shown on route', (await p.$$('.seclist .chk.on')).length >= 1);
  // steps page auto-checks
  await p.goto(url + '#steps'); ok('steps page renders 13 steps', (await p.$$('.steps li')).length === 13);
  // search
  await p.goto(url + '#search'); await p.fill('#sq', 'droplet nuclei'); ok('search finds results', (await p.$$('.res')).length > 0);
  await p.fill('#sq', 'المستودع'); ok('Arabic search finds glossary', (await p.$$('.res')).length > 0);
  { await p.fill('#sq', 'المطهر'); const a1 = (await p.$$('.res')).length; await p.fill('#sq', 'مطهر'); const a2 = (await p.$$('.res')).length;
    ok('Arabic search ignores the article ال', a1 === a2 && a1 > 1, a1 + ' vs ' + a2); }
  ok('search snippets have no raw markup', await p.evaluate(() => [...document.querySelectorAll('.res')].every(r => !/[{}|]|\bwarn\b , /.test(r.textContent))));
  await p.fill('#sq', 'reservoir'); await p.click('.res[href^="#glossary."] >> nth=0'); await p.waitForSelector('#gq');
  ok('glossary hit opens the term, prefilled', await p.evaluate(() => location.hash.startsWith('#glossary.') && document.querySelector('#gq').value.length > 0 && !!document.querySelector('.gitem.hl')));
  await p.goto(url + '#search'); ok('search box has focus on arrival', await p.evaluate(() => document.activeElement && document.activeElement.id === 'sq'));
  await p.fill('#sq', 'droplet ar'); ok('highlighting never nests inside <mark>', await p.evaluate(() => [...document.querySelectorAll('.res')].every(r => !/ark>/.test(r.textContent))));
  { const w = await p.evaluate(() => { const c = window.__app.CONF[0]; return c ? c.title.replace(/[^A-Za-z ]/g, ' ').trim().split(/\s+/)[0] : ''; });
    if (w) { await p.fill('#sq', w); ok('search reaches the confusable-pair tables', await p.evaluate(() => [...document.querySelectorAll('.res .pill')].some(x => x.textContent === 'لا تخلطها'))); } }
  // glossary search
  await p.goto(url + '#glossary'); await p.fill('#gq', 'تعقيم'); ok('glossary Arabic filter', (await p.$$('.gitem')).length > 0);
  // settings: theme + export/import
  await p.goto(url + '#settings'); await p.click('[data-theme-set=dark]');
  ok('dark theme applied', await p.evaluate(() => document.documentElement.dataset.theme === 'dark'));
  await p.click('#exp'); const code = await p.inputValue('#expt');
  await p.evaluate(() => localStorage.clear());
  await p.fill('#impt', code); await p.click('#imp');
  ok('export/import restores progress', await p.evaluate(() => window.__app.S().exams.length === 3));
  await p.click('#rst'); await p.click('#ry'); ok('reset with in-page confirm', await p.evaluate(() => window.__app.S().exams.length === 0));
  for (const h of ['#home', '#tools', '#cards', '#exams', '#conflicts', '#steps', '#more', '#numbers', '#confuse', '#recall', '#glossary', '#s.ch6.s7', '#s.ch3.s4', '#s.ch4.s5', '#s.ch2.s3', '#s.ch2.s9', '#s.ch6.s9', '#u.ch2']) { await p.goto(url + h); await p.waitForTimeout(80); const o = await overflow(); if (o > 0) ok('overflow ' + h, false, o + 'px'); }
  ok('no horizontal overflow on main pages', true);
  ok('no console errors', errs.length === 0, errs.join(' | '));
  await ctx.close();
}
await b.close();
console.log(fails ? `\n${fails} FAILED` : '\nALL PASSED'); process.exit(fails ? 1 : 0);
