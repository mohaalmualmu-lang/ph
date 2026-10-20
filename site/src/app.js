/* EMS 313 study site — app logic. DATA is injected by build.mjs. */
(function () {
  'use strict';
  const D = window.DATA;
  const UNITS = D.units, G = D.glossary, META = D.meta || {}, EXTRA = D.extra || {};
  const NUMS = Array.isArray(EXTRA.numbers) ? EXTRA.numbers : [], CONF = Array.isArray(EXTRA.confuse) ? EXTRA.confuse : [];
  const MISSING = Array.isArray(META.missing) ? META.missing : [];
  const KEY = 'ems313-study-v1';
  document.documentElement.lang = 'ar'; document.documentElement.dir = 'rtl';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const addDays = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
  const obj = x => x && typeof x === 'object' && !Array.isArray(x) ? x : {};
  const reEsc = w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // short stable id from text (FNV-1a, base 36)
  const hash = t => { let h = 2166136261; for (const ch of String(t)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; } return h.toString(36); };

  /* ---------------- toast (defined first: save() can call it) ---------------- */
  let toastT;
  function toast(msg) { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); } t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2600); }

  /* ---------------- indexes ---------------- */
  const UNIT = {}, SEC = {}, Q = {}, ORD = {}, SRT = {}, CARDS = [], RECALL = [];
  UNITS.forEach(u => {
    UNIT[u.id] = u;
    u.sections.forEach((s, i) => { s.key = u.id + '.' + s.id; s.u = u; s.i = i; SEC[s.key] = s; (s.recall || []).forEach((r, j) => RECALL.push(Object.assign({ id: s.key + '.r' + j, sec: s.key }, r))); });
    u.questions.forEach(q => { q.u = u.id; q.sk = u.id + '.' + q.sec; if (q.a == null) q.a = 0; Q[q.id] = q; });
    (u.orders || []).forEach(o => { o.u = u.id; ORD[o.id] = o; });
    (u.sorts || []).forEach(o => { o.u = u.id; SRT[o.id] = o; });
    const seen = new Set();
    u.cards.forEach(c => { let id = u.id + '-c' + hash(c.sec + '|' + c.f), k = 1; while (seen.has(id)) id = u.id + '-c' + hash(c.sec + '|' + c.f) + '-' + (++k); seen.add(id); CARDS.push(Object.assign({ id, u: u.id, sk: u.id + '.' + c.sec }, c)); });
  });
  const CARD_IDS = new Set(CARDS.map(c => c.id));
  const ALLQ = Object.values(Q);
  const secQs = sk => ALLQ.filter(q => q.sk === sk);

  /* ---------------- state ---------------- */
  const blank = () => ({ v: 1, sec: {}, rec: {}, cards: {}, q: {}, mis: {}, exams: [], drill: {}, prac: { n: 0, last: [] }, revDays: [], run: null, set: { theme: 'system', fs: 16, voiceEn: '', voiceAr: '' }, last: '' });
  const CARD0 = () => ({ c: 0, learned: false, due: '', iv: 0, ef: 2.5, reps: 0, lapses: 0, ld: '' });
  let S = blank();
  // sanitise stored or imported progress: right shapes, numbers where numbers are interpolated
  function clean(o) {
    o = Object.assign(blank(), obj(o));
    ['sec', 'rec', 'cards', 'q', 'mis', 'drill'].forEach(k => o[k] = obj(o[k]));
    Object.keys(o.sec).forEach(k => { const s = o.sec[k] = obj(o.sec[k]); if (s.best != null) s.best = +s.best || 0; s.done = !!s.done; });
    Object.keys(o.cards).forEach(k => { if (!CARD_IDS.has(k)) delete o.cards[k]; }); // e.g. old position-based ids (ch4-k7)
    Object.keys(o.cards).forEach(k => { const c = o.cards[k] = Object.assign(CARD0(), obj(o.cards[k])); ['c', 'iv', 'ef', 'reps', 'lapses'].forEach(f => c[f] = +c[f] || (f === 'ef' ? 2.5 : 0)); c.learned = !!c.learned; c.due = typeof c.due === 'string' ? c.due : ''; c.ld = typeof c.ld === 'string' ? c.ld : ''; });
    Object.keys(o.q).forEach(k => { const r = o.q[k] = obj(o.q[k]); r.n = +r.n || 0; r.ok = +r.ok || 0; });
    o.exams = Array.isArray(o.exams) ? o.exams.filter(e => e && typeof e === 'object' && !Array.isArray(e)).map(e => Object.assign({}, e, { right: +e.right || 0, total: +e.total || 0, pct: +e.pct || 0, at: +e.at || 0, title: String(e.title == null ? '' : e.title), sub: typeof e.sub === 'string' ? e.sub : '', kind: String(e.kind == null ? '' : e.kind) })) : [];
    o.revDays = Array.isArray(o.revDays) ? o.revDays.filter(d => typeof d === 'string') : [];
    const pr = obj(o.prac); o.prac = { n: Number.isFinite(+pr.n) ? +pr.n : 0, last: Array.isArray(pr.last) ? pr.last.map(x => x ? 1 : 0).slice(-100) : [] };
    o.last = typeof o.last === 'string' ? o.last : '';
    o.set = Object.assign(blank().set, obj(o.set));
    o.set.fs = Math.min(22, Math.max(14, Math.round(+o.set.fs) || 16));
    if (!['system', 'light', 'dark'].includes(o.set.theme)) o.set.theme = 'system';
    ['voiceEn', 'voiceAr'].forEach(k => { if (typeof o.set[k] !== 'string') o.set[k] = ''; });
    if (o.run != null && (typeof o.run !== 'object' || Array.isArray(o.run) || !Array.isArray(o.run.qs))) o.run = null;
    o.v = 1;
    return o;
  }
  // a saved exam can point at questions that a data update renamed or removed
  function fixRun() {
    const R = S.run; if (!R) return;
    R.qs = R.qs.filter(id => Q[id]); if (!R.qs.length) { S.run = null; return; }
    R.ord = obj(R.ord); R.qs.forEach(id => { const o = R.ord[id], n = Q[id].o.length; if (!Array.isArray(o) || o.length !== n || o.some(i => !(i >= 0 && i < n))) R.ord[id] = optOrder(Q[id]); });
    R.ans = obj(R.ans); Object.keys(R.ans).forEach(id => { if (!Q[id] || !(R.ans[id] >= 0 && R.ans[id] < Q[id].o.length)) delete R.ans[id]; });
    R.i = Math.max(0, Math.min(+R.i || 0, R.qs.length - 1));
    R.title = String(R.title == null ? '' : R.title); R.sub = typeof R.sub === 'string' ? R.sub : '';
    R.end = +R.end || 0; R.right = +R.right || 0;
    // time left on the exam timer (null = untimed); runs saved before the timer could pause carry only a deadline
    R.left = R.left == null ? (R.end ? Math.max(0, R.end - Date.now()) : null) : Math.max(0, +R.left || 0);
    R.by = obj(R.by); Object.keys(R.by).forEach(k => { if (!UNIT[k]) delete R.by[k]; else R.by[k] = { r: +obj(R.by[k]).r || 0, n: +obj(R.by[k]).n || 0 }; });
  }
  function load() { try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); if (o && o.v === 1) S = clean(o); } } catch (e) { } fixRun(); }
  let saveFail = false;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); saveFail = false; }
    catch (e) { if (!saveFail) { saveFail = true; toast('التقدم ما ينحفظ في هذا المتصفح — صدّر الكود من الإعدادات'); } }
  }
  load();
  window.addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });
  // another tab saved: take its state, so this (stale) tab does not overwrite it on its next save.
  // Views with local state (sections, drills, card sessions, practice…) read S at use time, so they only need the nav refreshed.
  window.addEventListener('storage', e => {
    if (e.key !== KEY) return;
    load(); applySettings();
    const h = (location.hash || '#home').slice(1), top = h.split('.')[0];
    if (['home', 'steps', 'more', 'conflicts', 'exams', 'run', 'u'].includes(top)) route('keep'); else renderNav(h);
  });

  function applySettings() {
    const r = document.documentElement;
    if (S.set.theme === 'system') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.set.theme);
    r.style.setProperty('--fs', (+S.set.fs || 16) + 'px');
  }
  applySettings();

  /* ---------------- progress helpers ---------------- */
  const secDone = sk => !!(S.sec[sk] && S.sec[sk].done);
  const unitDone = u => u.sections.every(s => secDone(s.key));
  const allSecs = Object.keys(SEC);
  const learnPct = () => pct(allSecs.filter(secDone).length, allSecs.length);
  const cardState = id => S.cards[id] || (S.cards[id] = CARD0());
  const learnedCount = () => CARDS.filter(c => S.cards[c.id] && S.cards[c.id].learned).length;
  const dueCards = () => CARDS.filter(c => { const s = S.cards[c.id]; return s && s.learned && s.due <= today(); });
  const misList = () => Object.keys(S.mis).filter(id => Q[id]);
  const bestExam = kind => S.exams.filter(e => e.kind === kind).reduce((m, e) => Math.max(m, +e.pct || 0), -1);
  const drillIds = [...Object.keys(ORD), ...Object.keys(SRT)];
  function overall() {
    // weighted: learning 40, cards 20, drills 10, exams 30
    const l = learnPct(), c = pct(learnedCount(), CARDS.length), d = pct(drillIds.filter(i => S.drill[i]).length, drillIds.length);
    const ue = UNITS.map(u => Math.max(0, bestExam('unit:' + u.id))).reduce((a, b) => a + b, 0) / UNITS.length;
    return Math.round(l * .4 + c * .2 + d * .1 + ue * .3);
  }

  /* ---------------- markup ---------------- */
  function md(s) {
    let t = esc(s);
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/\{([a-z0-9]+)(?:\|([^}]+))?\}/g, (m, id, txt) => { const g = G[id]; return `<span class="term" data-g="${id}" tabindex="0" role="button">${txt || (g ? esc(g[0]) : id)}</span>`; });
    return t;
  }
  // option buttons: glossary markup shown as plain text, so a tap always answers (and an underline is never a hint)
  const mdPlain = s => md(s).replace(/<span class="term"[^>]*>([\s\S]*?)<\/span>/g, '$1');
  const strip = s => String(s).replace(/\*\*/g, '').replace(/\{([a-z0-9]+)\|([^}]+)\}/g, '$2').replace(/\{([a-z0-9]+)\}/g, (m, id) => G[id] ? G[id][0] : id);

  /* ---------------- automatic glossary links (questions, explanations, recall, cards) ----------------
     Names: the English glossary term, the term without its bracketed part, the bracketed part itself and
     each half of "A / B". Acronyms (PPE, HAI, EtO…) match case-sensitively, other names case-insensitively,
     on whole words (a plural -s/-es is allowed), longest first. Only the first occurrence of each term in a
     rendered text is linked, never inside an existing term, a link, a button or a tag. */
  const TERMS = (() => {
    const map = new Map();
    const add = (name, id) => {
      name = name.replace(/\s+/g, ' ').trim(); if (name.length < 3) return;
      const acr = /^[A-Z0-9][A-Za-z0-9.\-]*$/.test(name) && (name.match(/[A-Z]/g) || []).length >= 2 && name.length <= 6;
      const k = name.toLowerCase(); if (!map.has(k)) map.set(k, { id, cs: acr, raw: name });
    };
    Object.keys(G).forEach(id => String(G[id][0]).split(/\s+\/\s+/).forEach(part => {
      add(part, id);
      add(part.replace(/\s*\([^)]*\)/g, ' '), id);
      (part.match(/\(([^)]+)\)/g) || []).forEach(p => add(p.slice(1, -1), id));
    }));
    const keys = [...map.keys()].sort((a, b) => b.length - a.length);
    const re = keys.length ? new RegExp('(^|[^A-Za-z0-9\\-])(' + keys.map(reEsc).join('|') + ')((?:e?s)?)(?![A-Za-z0-9\\-])', 'gi') : null;
    return { map, re };
  })();
  function autoLink(html) {
    if (!TERMS.re || !html) return html;
    const used = new Set(); String(html).replace(/data-g="([a-z0-9]+)"/g, (m, id) => used.add(id));
    const parts = String(html).split(/(<[^>]*>)/), spans = []; let skip = 0;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]; if (!p) continue;
      if (i % 2) {
        const m = /^<(\/?)([a-zA-Z0-9]+)([^>]*)>$/.exec(p); if (!m) continue;
        const close = !!m[1], tag = m[2].toLowerCase();
        if (tag === 'span') { if (close) { if (spans.pop()) skip--; } else { const t = /class="term"/.test(m[3]); spans.push(t); if (t) skip++; } }
        else if (tag === 'a' || tag === 'button') skip += close ? -1 : 1;
        continue;
      }
      if (skip > 0) continue;
      parts[i] = p.replace(TERMS.re, (all, pre, word, suf) => {
        const e = TERMS.map.get(word.toLowerCase());
        if (!e || (e.cs && word !== e.raw) || used.has(e.id)) return all;
        used.add(e.id);
        return `${pre}<span class="term" data-g="${e.id}" tabindex="0" role="button">${word}${suf}</span>`;
      });
    }
    return parts.join('');
  }
  const mdT = s => autoLink(md(s));
  // a definition item (nl: true) never links the term it tests: even the short popup would translate the answer
  const stemT = q => q.nl ? mdPlain(q.q) : mdT(q.q);
  const frontT = c => c.nl ? mdPlain(c.f) : mdT(c.f);

  /* ---------------- icons ---------------- */
  const IC = {
    route: '<path d="M4 19h4a3 3 0 0 0 3-3V8a3 3 0 0 1 3-3h6"/><circle cx="4" cy="19" r="2"/><circle cx="20" cy="5" r="2"/>',
    cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
    mix: '<path d="M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4"/><path d="M19 5l2 2-2 2M19 15l2 2-2 2"/>',
    exam: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    tools: '<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="17" cy="6" r="2"/><circle cx="14" cy="18" r="2"/>',
    fix: '<path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v4h4"/><path d="M9 12l2 2 4-4"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    hash: '<path d="M10 4L8 20M16 4l-2 16M5 9h15M4 15h15"/>',
    neq: '<path d="M5 9h14M5 15h14M16 4L8 20"/>',
    steps: '<path d="M4 20h4v-5h4v-5h4V5h4"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    diff: '<path d="M8 3v18M16 3v18"/><path d="M3 8h5M16 16h5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'
  };
  const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
  const NAV = [
    ['home', 'المسار', 'route'], ['tools', 'أدوات الترتيب والتصنيف', 'tools'], ['cards', 'البطاقات', 'cards'], ['practice', 'تدريب مخلوط', 'mix'], ['exams', 'الاختبارات', 'exam'],
    ['fix', 'صحّح أخطائي', 'fix'], ['recall', 'الاسترجاع', 'bulb'], ['numbers', 'الأرقام المهمة', 'hash'], ['confuse', 'لا تخلطها', 'neq'],
    ['steps', 'خطوات المذاكرة', 'steps'], ['glossary', 'القاموس', 'book'], ['search', 'البحث', 'search'], ['conflicts', 'الاختلافات والمصادر', 'diff'], ['settings', 'الإعدادات', 'gear']];
  const TABS = [['home', 'المسار', 'route'], ['cards', 'البطاقات', 'cards'], ['practice', 'تدريب', 'mix'], ['exams', 'اختبارات', 'exam'], ['more', 'المزيد', 'more']];
  const TAB_IDS = TABS.map(t => t[0]);

  /* ---------------- shell ---------------- */
  // keep styles safe: the publish wrapper may place <style>/<link> inside <body>
  document.querySelectorAll('body > style, body > link, body > meta, body > title').forEach(e => document.head.append(e));
  const ROOT = document.createElement('div'); ROOT.id = 'app'; document.body.append(ROOT);
  ROOT.innerHTML = `
  <header class="top"><div class="top-in">
    <a class="brand" href="#home"><b>EMS 313</b><span>الصحة العامة والسلامة</span></a><span class="sp"></span>
    <a class="iconbtn" href="#search" aria-label="بحث">${icon('search')}</a>
  </div><div class="gbar" title="التقدم العام"><i id="gbar"></i></div></header>
  <div class="shell"><nav class="rail" id="rail" aria-label="التنقل"></nav><main id="main" tabindex="-1"></main></div>
  <nav class="tabs" id="tabs" aria-label="التنقل السفلي"></nav>`;
  const main = $('#main');

  function navCounts(id) {
    if (id === 'cards') { const n = dueCards().length; return n ? n : ''; }
    if (id === 'fix') { const n = misList().length; return n ? n : ''; }
    return '';
  }
  function renderNav(route) {
    const top = String(route).split('.')[0];
    const cur = ['u', 's'].includes(top) ? 'home' : top === 'run' ? 'exams' : top;
    $('#rail').innerHTML = NAV.map(([id, t, ic]) => `<a href="#${id}" class="${cur === id ? 'on' : ''}" ${cur === id ? 'aria-current="page"' : ''}>${icon(ic)}<span>${t}</span><span class="cnt">${navCounts(id)}</span></a>`).join('');
    const moreIds = ['more', ...NAV.map(n => n[0]).filter(id => !TAB_IDS.includes(id))];
    $('#tabs').innerHTML = TABS.map(([id, t, ic]) => { const on = id === 'more' ? moreIds.includes(cur) : cur === id; return `<a href="#${id}" class="${on ? 'on' : ''}" ${on ? 'aria-current="page"' : ''}>${icon(ic)}<span>${t}</span></a>`; }).join('');
    $('#gbar').style.width = overall() + '%';
  }

  /* ---------------- router ---------------- */
  let cleanup = [], afterRoute = null;
  function route(opt) {
    const keep = opt === 'keep', y = window.scrollY;
    cleanup.forEach(f => { try { f(); } catch (e) { } }); cleanup = [];
    closePop(); afterRoute = null;
    const r = (location.hash || '#home').slice(1) || 'home';
    const [a, b, c] = r.split('.');
    renderNav(r);
    const V = { home, tools, cards: cardsView, practice, exams, fix, recall: recallView, numbers, confuse, steps, glossary, search, conflicts, settings, more, run: runView };
    if (a === 'u' && UNIT[b]) unitView(UNIT[b]);
    else if (a === 's' && SEC[b + '.' + c]) secView(SEC[b + '.' + c]);
    else if (V[a]) V[a](b);
    else home();
    if (a === 's') { S.last = r; save(); }
    // keep focus where a view put it (e.g. the search box); otherwise start from the top of main
    if (!main.contains(document.activeElement)) main.focus({ preventScroll: true });
    window.scrollTo(0, keep ? y : 0);
    if (afterRoute) { const f = afterRoute; afterRoute = null; try { f(); } catch (e) { } }
  }
  window.addEventListener('hashchange', () => route());
  // back from a flashcard session (same #cards hash, so no hashchange): show the card menu again
  window.addEventListener('popstate', () => { const b = $('#cbox'); if (location.hash === '#cards' && b && b.children.length) route(); });
  const go = h => { if (location.hash === '#' + h) route(); else location.hash = h; };

  /* ---------------- home / route ---------------- */
  function nextSection() { for (const k of allSecs) if (!secDone(k)) return SEC[k]; return null; }
  function missingNote() {
    if (!MISSING.length) return '';
    return `<div class="note warn small"><span class="lab">مواضيع غير مغطّاة</span>بعض ملفات المقرر فاضية (0 بايت) وما انقرت: محاضرة الفصل 5 (السلامة في موقع الحالة الطبية أو الإنقاذ) وكويزات <bdi>risk management</bdi> و <bdi>pre-incident</bdi>. هذي المواضيع مو موجودة في الموقع، فذاكرها من مصدر ثاني. <a href="#conflicts">التفاصيل</a></div>`;
  }
  function home() {
    const ov = overall(), ns = nextSection(), st = stepStatus(), cur = st.find(x => !x.done);
    const resume = S.last && SEC[S.last.slice(2)] && !secDone(S.last.slice(2)) ? SEC[S.last.slice(2)] : ns;
    main.innerHTML = `<div class="stack col">
      <div class="panel hero">
        <div class="row" style="gap:18px;align-items:center">
          <div class="ring" style="--p:${ov}"><div>${ov}%<small>التقدم العام</small></div></div>
          <div style="flex:1;min-width:200px" class="stack">
            <h1 class="title">مذاكرة EMS 313</h1>
            <p class="muted small" style="margin:0">خمس وحدات من محاضراتك: مسار مرتب، بطاقات، أدوات ترتيب وتصنيف، واختبارات. الشرح بالإنجليزي، والمصطلحات اللي تحتها خط اضغطها تطلع بالعربي.</p>
            <div class="row">${resume ? `<a class="btn pri" href="#s.${resume.key}">${S.last ? 'كمّل' : 'ابدأ'}: <span class="en" dir="ltr">${esc(resume.title)}</span></a>` : `<a class="btn pri" href="#exams">كل الأقسام مكتملة. روح للاختبارات</a>`}
              ${cur ? `<a class="btn" href="#steps">الخطوة ${cur.n}: ${esc(cur.t)}</a>` : ''}</div>
          </div>
        </div>
      </div>
      ${S.run && !S.run.done ? `<div class="note warn"><span class="lab">اختبار غير مكتمل</span>${esc(S.run.title)} · <a href="#run">استكمل الاختبار</a></div>` : ''}
      <div class="stats">
        <div class="stat"><b>${allSecs.filter(secDone).length}/${allSecs.length}</b><span class="small muted">أقسام مكتملة</span></div>
        <div class="stat"><b>${learnedCount()}/${CARDS.length}</b><span class="small muted">بطاقات متقنة</span></div>
        <div class="stat"><b>${dueCards().length}</b><span class="small muted">بطاقات مستحقة اليوم</span></div>
        <div class="stat"><b>${misList().length}</b><span class="small muted">أخطاء تحتاج تصحيح</span></div>
      </div>
      <div class="row qlinks"><a class="btn sm" href="#exams">${icon('exam')}اختبار شامل (${ALLQ.length} سؤال)</a><a class="btn sm" href="#numbers">${icon('hash')}الأرقام المهمة</a><a class="btn sm" href="#confuse">${icon('neq')}لا تخلطها</a><a class="btn sm" href="#recall">${icon('bulb')}الاسترجاع</a></div>
      ${missingNote()}
      <h2 class="sub">الوحدات</h2>
      ${UNITS.map(u => unitCard(u)).join('')}
    </div>`;
    main.addEventListener('click', examClick); cleanup.push(() => main.removeEventListener('click', examClick));
  }
  function unitCard(u, open = true, here = false) {
    const done = u.sections.filter(s => secDone(s.key)).length, be = bestExam('unit:' + u.id);
    return `<section class="unit"><div class="unit-h"><span class="unit-n">Ch${u.n}</span><div class="t"><h3 dir="ltr">${esc(u.title)}</h3>
      <div class="small muted">${esc(u.ar)}</div><div><span class="src">${esc(u.file)}</span></div>
      <div class="row small" style="margin-top:6px"><span>${done}/${u.sections.length} أقسام</span>${be >= 0 ? `<span class="pill ${be >= 80 ? 'ok' : ''}">أفضل نتيجة اختبار الوحدة: ${be}%</span>` : ''}
      <button class="btn sm ghost" data-ex="unit" data-u="${u.id}">اختبار الوحدة</button>${!here && u.objectives && u.objectives.length ? `<a class="btn sm ghost" href="#u.${u.id}">أهداف الوحدة</a>` : ''}</div>
      <div class="meter" style="margin-top:8px"><i style="width:${pct(done, u.sections.length)}%"></i></div></div></div>
      ${open ? `<ol class="seclist">${u.sections.map(s => `<li><a href="#s.${s.key}"><span class="chk ${secDone(s.key) ? 'on' : ''}" aria-hidden="true">✓</span><span class="sr-only">${secDone(s.key) ? 'مكتمل' : 'غير مكتمل'}</span><span class="nm" dir="ltr">${esc(s.title)}<small class="src">${esc(s.src)}</small></span></a></li>`).join('')}</ol>` : ''}</section>`;
  }
  function objPanel(u, open) {
    if (!u.objectives || !u.objectives.length) return '';
    return `<details class="panel objp" ${open ? 'open' : ''}><summary><span class="sub">أهداف الوحدة</span><span class="small muted" dir="ltr">Learning objectives · ${u.objectives.length}</span>${u.objSrc ? `<span class="src" dir="ltr">${esc(u.objSrc)}</span>` : ''}</summary>
      <p class="small muted" style="margin:8px 0 0">بنهاية الوحدة المفروض تقدر تسوي هذي الأشياء. ارجع لها قبل الاختبار وشوف إذا تقدر تشرح كل واحد بنفسك.</p>
      <ol class="objl" dir="ltr" lang="en">${u.objectives.map(o => `<li>${md(o)}</li>`).join('')}</ol></details>`;
  }
  function unitView(u) {
    main.innerHTML = `<div class="stack col"><div class="crumbs"><a href="#home">المسار</a> › <span>Ch${u.n}</span></div>${unitCard(u, true, true)}${objPanel(u, true)}</div>`;
    main.addEventListener('click', examClick); cleanup.push(() => main.removeEventListener('click', examClick));
  }

  /* ---------------- section view ---------------- */
  function secView(s) {
    const u = s.u, idx = allSecs.indexOf(s.key), prev = SEC[allSecs[idx - 1]], next = SEC[allSecs[idx + 1]];
    main.innerHTML = `<article class="col">
      <div class="crumbs"><a href="#home">المسار</a> › <a href="#u.${u.id}"><span class="unit-n">Ch${u.n}</span> <bdi dir="ltr">${esc(u.title)}</bdi></a></div>
      <header class="sec-h"><div class="row"><span class="pill">القسم ${s.i + 1} من ${u.sections.length}</span><span class="src" title="المصدر">${esc(u.file)} · ${esc(s.src)}</span>${secDone(s.key) ? '<span class="pill ok">✓ مكتمل</span>' : ''}</div>
        <h1 dir="ltr">${esc(s.title)}</h1>
        <div class="lrow" id="seclisten"></div></header>
      ${s.i === 0 ? objPanel(u, false) : ''}
      <div class="content" dir="ltr" lang="en" id="secbody">${s.blocks.map((b, i) => block(b, s.key + '.b' + i)).join('')}</div>
      <section class="stack" style="margin-top:26px">
        <h2 class="sub">استرجع قبل ما تراجع</h2>
        <p class="muted small" style="margin:0">حاول تتذكر الإجابة في بالك أو بصوت عالي، بعدين اكشفها وقيّم نفسك. الإجابات تنخفي من جديد كل ما رجعت للقسم.</p>
        <ul class="recall" dir="ltr">${(s.recall || []).map((r, j) => recallItem(s.key + '.r' + j, r)).join('')}</ul>
      </section>
      <section class="stack" style="margin-top:26px" id="squiz"></section>
      <nav class="row" style="justify-content:space-between;margin-top:26px">
        ${prev ? `<a class="btn" href="#s.${prev.key}">→ السابق</a>` : '<span></span>'}
        ${next ? `<a class="btn pri" href="#s.${next.key}">التالي ←</a>` : `<a class="btn pri" href="#exams">الاختبارات ←</a>`}
      </nav></article>`;
    mountWidgets(main);
    sectionQuiz(s);
    // listen controls: whole section, each block, each disease card, each case
    if (window.ReadAloud && ReadAloud.supported) {
      const body = $('#secbody');
      const b = listenBtn(body, 'استمع للقسم كامل');
      if (b) $('#seclisten').append(b);
      $$('.blk[data-read], .dcard[data-read], .case[data-read]', body).forEach(el => {
        const lb = listenBtn(el); if (!lb) return;
        const bar = el.classList.contains('case') ? el.querySelector(':scope > .rbar') : null;
        (bar || el).append(lb);
      });
    }
  }
  function listenBtn(el, label) {
    const b = ReadAloud.button(el); if (!b) return null;
    if (label) { const l = b.querySelector('.ra-lbl'); if (l) l.textContent = label; }
    return b;
  }

  const NOTE_L = { key: 'Key point · نقطة مهمة', warn: 'Caution · انتبه', ems: 'EMS example · مثال إسعافي', conflict: 'Sources differ · اختلاف بين المصادر', added: 'Note on sources · ملاحظة' };
  function block(b, id) {
    const R = ' data-read="1"';
    switch (b.t) {
      case 'p': return `<div class="blk"${R}><p>${md(b.x)}</p></div>`;
      case 'h': return `<h3 class="bh">${md(b.x)}</h3>`;
      case 'ul': case 'ol': return `<div class="blk"${R}><${b.t}>${b.items.map(i => `<li>${md(i)}</li>`).join('')}</${b.t}></div>`;
      case 'note': return `<div class="blk note ${esc(b.k)}"${R}><span class="lab">${NOTE_L[b.k] || 'Note · ملاحظة'}</span>${md(b.x)}</div>`;
      case 'stat': return `<div class="blk statbig"${R}><b>${esc(b.n)}</b><span>${md(b.x)}</span></div>`;
      case 'table': {
        const hd = b.head.map(x => esc(strip(x || '')));
        const head = `<tr>${b.head.map(x => `<th>${md(x)}</th>`).join('')}</tr>`;
        const rows = b.rows.map(r => `<tr>${r.map((c, j) => `<td data-h="${hd[j] || ''}" class="${b.quiz && j > 0 ? 'h' : ''}">${md(c)}</td>`).join('')}</tr>`).join('');
        return `<div class="blk tblw" id="${id}"${R}>${b.quiz ? `<div class="tbar"><span class="small muted" lang="ar" dir="rtl">جدول</span><button class="btn sm" data-act="testtbl" lang="ar">اخفِ الخلايا واختبر نفسك</button></div>` : ''}<table>${b.cap ? `<caption>${md(b.cap)}</caption>` : ''}<thead>${head}</thead><tbody>${rows}</tbody></table></div>`;
      }
      case 'twocol': return `<div class="blk twocol"${R}>${[b.a, b.b].map(c => `<div><h4>${md(c.h)}</h4><ul>${c.items.map(i => `<li>${md(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
      case 'chain': return `<div class="blk flow" aria-label="cause and effect">${b.items.map(i => `<span>${md(i)}</span>`).join('<em aria-hidden="true">→</em>')}</div>`;
      case 'case': return `<div class="why case"${R}><span class="lab">EMS case · سيناريو إسعافي</span>${b.title ? `<div class="q">${md(b.title)}</div>` : ''}<p class="cx">${md(b.x)}</p><p class="cq"><b>${md(b.q)}</b></p>
        <div class="ans" hidden><span class="lab">Model answer · الإجابة النموذجية</span>${md(b.a)}</div>
        <div class="rbar" lang="ar" dir="rtl"><button class="btn sm" data-act="reveal">فكّر ثم اكشف الإجابة</button>${b.src ? `<span class="src" dir="ltr">${esc(b.src)}</span>` : ''}</div></div>`;
      case 'why': return `<div class="why"><span class="lab">Think · فكّر</span><div class="q">${md(b.q)}</div><div class="ans" hidden>${md(b.a)}</div><div class="rbar" lang="ar" dir="rtl"><button class="btn sm" data-act="reveal">فكّر ثم اكشف الإجابة</button></div></div>`;
      case 'svg': return `<div class="diag" data-w="svg" data-id="${esc(b.id)}"></div>`;
      case 'order': return `<div class="widget" data-w="order" data-id="${esc(b.id)}"></div>`;
      case 'sort': return `<div class="widget" data-w="sort" data-id="${esc(b.id)}"></div>`;
      case 'mistakes': return `<div class="widget"><div class="wt"><h4>Spot the mistake</h4></div><p style="margin:0">${md(b.intro)}</p><ul class="mist">${b.lines.map(l => `<li><button data-act="mist"><span>${md(l[0])}</span><div class="fix ${l[1] ? 'bad' : 'ok'}" hidden><span aria-hidden="true">${l[1] ? '✗' : '✓'}</span><span class="sr-only">${l[1] ? 'خطأ:' : 'صحيح:'}</span> ${md(l[2])}</div></button></li>`).join('')}</ul><p class="small muted" style="margin:0" lang="ar" dir="rtl">الشرائح ما فيها الإجابات؛ التصحيحات مأخوذة من شرائح نفس المحاضرة.</p></div>`;
      case 'dcards': return `<div class="blk" id="${id}"><div class="tbar" style="padding:0 0 8px"><span></span><button class="btn sm" data-act="testcards" lang="ar">اخفِ التفاصيل واختبر نفسك</button></div><div class="dcards">${b.items.map(c => `<div class="dcard" data-read="1"><h4>${md(c.name)}</h4><dl>
          <dt>Agent</dt><dd class="hv">${md(c.agent)}</dd><dt>Clue</dt><dd class="hv">${md(c.clue)}</dd><dt>Spread</dt><dd class="hv">${md(c.spread)}</dd>
          <dt>Precaution</dt><dd class="hv">${md(c.prec)}</dd><dt>Vaccine</dt><dd class="hv">${md(c.vaccine)}</dd></dl>${c.note ? `<p class="small" style="margin:0">${md(c.note)}</p>` : ''}<span class="src">${esc(c.src)}</span></div>`).join('')}</div></div>`;
      default: return '';
    }
  }
  // the answer is hidden on every visit (retrieval first); the last self-rating is shown as a pill
  function recallItem(id, r, open) {
    const st = S.rec[id];
    const pill = st ? `<span class="pill ${st === 2 ? 'ok' : ''}">${open ? '' : 'آخر مرة: '}${st === 2 ? 'تذكرتها ✓' : 'ما تذكرتها'}</span>` : '';
    return `<li data-rid="${id}"><div class="q">${r.nl ? mdPlain(r.q) : mdT(r.q)}</div><div class="ans" ${open ? '' : 'hidden'}>${mdT(r.a)}</div>
      <div class="rbar" lang="ar" dir="rtl">${pill}${open ? `<button class="btn sm ghost" data-act="rec-hide">اخفِ الإجابة</button>` : `<button class="btn sm" data-act="rec-show">اكشف الإجابة</button>`}</div></li>`;
  }

  /* ---------------- widgets ---------------- */
  function mountWidgets(root) {
    $$('[data-w="svg"]', root).forEach(el => {
      const d = DIAGRAMS[el.dataset.id](); el.dataset.mode = d.modes ? d.modes[0][0] : '';
      el.innerHTML = `<div class="dbar" dir="rtl" lang="ar">${d.modes ? `<div class="seg" role="group" aria-label="طريقة العرض">${d.modes.map(([m, t], i) => `<button class="btn sm ${i === 0 ? 'pri' : ''}" data-act="dmode" data-m="${m}" aria-pressed="${i === 0}" dir="ltr">${t}</button>`).join('')}</div>` : ''}<button class="btn sm" data-act="dhide">اخفِ الأسماء واختبر نفسك</button></div>${d.svg}`;
    });
    $$('[data-w="order"]', root).forEach(mountOrder);
    $$('[data-w="sort"]', root).forEach(mountSort);
  }
  // graded by step TEXT, so two identical steps (e.g. "Hand hygiene" first and last) are interchangeable
  function mountOrder(el) {
    const o = ORD[el.dataset.id]; if (!o) return;
    const n = o.steps.length, same = (v, k) => o.steps[v] === o.steps[k];
    const sorted = p => p.every((v, i) => same(v, i));
    let pool = shuffle(o.steps.map((t, i) => i));
    for (let t = 0; t < 30 && n > 1 && sorted(pool); t++) pool = shuffle(pool);
    let ans = [], checked = false;
    const draw = focus => {
      el.innerHTML = `<div class="wt"><h4>${esc(o.title)}</h4>${S.drill[o.id] ? '<span class="pill ok" lang="ar">✓ أتقنته</span>' : ''}<span class="src">${esc(o.src)}</span></div>
        <p class="small muted" style="margin:0" lang="ar" dir="rtl">رتّب الخطوات: اضغط الخطوات بالترتيب الصحيح. اضغط خطوة في القائمة عشان تشيلها.</p>
        <div class="chips">${pool.filter(i => !ans.includes(i)).map(i => `<button class="chip" data-i="${i}">${esc(o.steps[i])}</button>`).join('') || '<span class="small muted" lang="ar">كل الخطوات مختارة</span>'}</div>
        <ol class="olist">${ans.map((i, k) => `<li data-k="${k}" class="${checked ? (same(i, k) ? 'ok' : 'no') : ''}"><button type="button" class="olb" data-i="${i}">${esc(o.steps[i])}</button></li>`).join('')}</ol>
        <div class="row" lang="ar" dir="rtl"><button class="btn sm pri" data-c="check" ${ans.length < n ? 'disabled' : ''}>تحقق</button><button class="btn sm" data-c="reset">إعادة</button><span class="fb" id="fb-${o.id}" role="status"></span></div>`;
      if (focus) { const f = $(focus, el) || $('.chip', el) || $('[data-c=check]:not([disabled])', el); if (f) f.focus({ preventScroll: true }); }
    };
    draw();
    el.addEventListener('click', e => {
      const c = e.target.closest('.chip'), li = e.target.closest('.olist li'), btn = e.target.closest('[data-c]');
      if (c) { ans.push(+c.dataset.i); checked = false; draw(ans.length < n ? '.chip' : '[data-c=check]'); }
      else if (li && !checked) { ans.splice(+li.dataset.k, 1); draw('.chip'); }
      else if (btn && btn.dataset.c === 'reset') { ans = []; checked = false; pool = shuffle(pool); draw('.chip'); }
      else if (btn && btn.dataset.c === 'check') {
        checked = true; const ok = ans.length === n && ans.every((v, k) => same(v, k)); draw('[data-c=reset]');
        const fb = $('#fb-' + o.id, el);
        if (ok) { S.drill[o.id] = 1; save(); fb.className = 'fb ok'; fb.textContent = 'صح! الترتيب كامل ✓'; renderNav(location.hash.slice(1)); }
        else { const k = ans.filter((v, i) => same(v, i)).length; fb.className = 'fb no'; fb.textContent = `${k} من ${n} في مكانها. اضغط "إعادة" وجرّب.`; }
      }
    });
  }
  function mountSort(el) {
    const o = SRT[el.dataset.id]; if (!o) return;
    let items = shuffle(o.items.map((x, i) => i)), picks = {};
    const draw = focus => {
      const done = Object.keys(picks).length, right = Object.entries(picks).filter(([i, c]) => o.items[i][1] === c).length;
      el.innerHTML = `<div class="wt"><h4>${esc(o.title)}</h4>${S.drill[o.id] ? '<span class="pill ok" lang="ar">✓ أتقنته</span>' : ''}<span class="src">${esc(o.src)}</span></div>
        <p class="small muted" style="margin:0" lang="ar" dir="rtl">صنّف كل عنصر. التصحيح فوري.</p>
        <div class="srt">${items.map(i => {
          const p = picks[i], ok = p != null && o.items[i][1] === p;
          // answered items collapse to one line (no wall of disabled buttons)
          return `<div class="it ${p == null ? '' : ok ? 'ok' : 'no'}" data-i="${i}"><span class="nm">${esc(o.items[i][0])}</span>${p == null
            ? `<div class="cats">${o.cats.map((c, ci) => `<button data-ci="${ci}">${esc(c)}</button>`).join('')}</div>`
            : ok ? `<span class="fb ok" dir="rtl" lang="ar">✓ <bdi dir="ltr">${esc(o.cats[p])}</bdi></span>` : `<span class="fb no" dir="rtl" lang="ar">✗ الصحيح: <bdi dir="ltr">${esc(o.cats[o.items[i][1]])}</bdi><br>اخترت: <bdi dir="ltr">${esc(o.cats[p])}</bdi></span>`}</div>`;
        }).join('')}</div>
        <div class="row" lang="ar" dir="rtl"><span class="fb">${done}/${o.items.length} · صح ${right}</span><button class="btn sm" data-c="reset">إعادة</button></div>`;
      if (focus) { const f = $(focus, el); if (f) f.focus({ preventScroll: true }); }
      if (done === o.items.length && right === done && !S.drill[o.id]) { S.drill[o.id] = 1; save(); toast('ممتاز! كل التصنيفات صح ✓'); setTimeout(draw, 0); renderNav(location.hash.slice(1)); }
    };
    draw();
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-ci]'), r = e.target.closest('[data-c]');
      if (b) { const i = +b.closest('.it').dataset.i; if (picks[i] == null) { picks[i] = +b.dataset.ci; draw('.it [data-ci]'); } }
      else if (r) { picks = {}; items = shuffle(items); draw('.it [data-ci]'); }
    });
  }

  /* ---------------- question card ---------------- */
  const LET = 'ABCDEFG';
  function optOrder(q) { const idx = q.o.map((x, i) => i); return q.fix ? idx : shuffle(idx); }
  function qMeta(q) {
    const u = UNIT[q.u];
    return `<div class="qmeta" lang="ar" dir="rtl"><span class="pill">Ch${u.n}</span><span class="src" dir="ltr">${esc(q.src)}</span>${q.past ? `<span class="pill past">سؤال سابق · ${esc(String(q.past.file).replace(/\.pdf$/, ''))} · Q${esc(q.past.n)}</span>` : ''}${q.past && q.past.edit ? `<span class="pill edit" title="${esc(q.past.edit)}">معدّل</span>` : ''}</div>`;
  }
  const optBtn = (q, oi, k, cls = '', dis = false) => `<button class="opt ${cls}" data-oi="${oi}" ${dis ? 'disabled' : ''}><span class="k">${LET[k]}</span><span>${mdPlain(q.o[oi])}</span></button>`;
  function explHTML(q, chosen) {
    const ok = chosen === q.a;
    const body = autoLink(`${ok ? '' : `Correct answer: <b>${md(q.o[q.a])}</b>. `}${md(q.x)}`);
    return `<div class="expl"><b class="${ok ? 'ok' : 'no'}">${ok ? '✓ Correct.' : chosen == null ? '✗ Not answered.' : '✗ Not quite.'}</b> ${body}${q.past && q.past.edit ? `<div class="small" style="margin-top:6px" lang="ar" dir="rtl">ملاحظة: <span dir="ltr">${esc(q.past.edit)}</span></div>` : ''}
      <div class="small" style="margin-top:6px"><a href="#s.${q.sk}">↩ ${esc(SEC[q.sk].title)}</a></div></div>`;
  }
  // instant-feedback question. onDone(correct)
  function instantQ(container, q, onDone, numLabel) {
    const order = optOrder(q);
    container.innerHTML = `<div class="qcard" data-qid="${q.id}">${qMeta(q)}${numLabel ? `<div class="small muted" lang="ar">${numLabel}</div>` : ''}<div class="qtext" dir="ltr">${stemT(q)}</div>
      <div class="opts" dir="ltr">${order.map((oi, k) => optBtn(q, oi, k)).join('')}</div><div class="fbx" dir="ltr" role="status"></div></div>`;
    toQ(container.querySelector('.qcard'));
    container.querySelector('.opts').addEventListener('click', e => {
      if (e.target.closest('.term')) return;
      const b = e.target.closest('.opt'); if (!b || b.disabled) return;
      const chosen = +b.dataset.oi, ok = chosen === q.a;
      $$('.opt', container).forEach(x => { x.disabled = true; const oi = +x.dataset.oi; if (oi === q.a) x.classList.add('right'); else if (oi === chosen) x.classList.add('wrong'); });
      container.querySelector('.fbx').innerHTML = explHTML(q, chosen);
      record(q, ok);
      onDone && onDone(ok, chosen);
    });
  }
  function record(q, ok, fixMode) {
    const r = S.q[q.id] || (S.q[q.id] = { n: 0, ok: 0 }); r.n++; if (ok) r.ok++; r.last = ok ? 1 : 0;
    if (!ok) S.mis[q.id] = 1; else if (fixMode) delete S.mis[q.id];
    save();
  }

  /* ---------------- section quiz ---------------- */
  // pass mark: 80% (4 of 5). Smaller pools (only possible while content is being written): 3 of 4, otherwise all.
  const need = n => n >= 5 ? Math.ceil(.8 * n) : n === 4 ? 3 : n;
  function sectionQuiz(s) {
    const box = $('#squiz'), pool = secQs(s.key), n0 = Math.min(5, pool.length);
    const intro = () => {
      const st = S.sec[s.key];
      box.innerHTML = `<h2 class="sub">اختبر نفسك في هذا القسم</h2>
        <p class="muted small" style="margin:0">${n0} أسئلة عشوائية من ${pool.length} سؤال لهذا القسم. القسم يكتمل ✓ إذا جاوبت ${need(n0)} من ${n0} صح${n0 >= 5 ? ' (80%)' : ''}.</p>
        ${st && st.best != null ? `<div class="small">أفضل نتيجة: <b>${+st.best}%</b>${st.done ? ' · <span class="pill ok">✓ مكتمل</span>' : ''}</div>` : ''}
        <div><button class="btn pri" id="sqstart">${st ? 'جرّب مرة ثانية' : 'ابدأ أسئلة القسم'}</button></div>`;
      $('#sqstart').onclick = start;
    };
    const start = () => {
      const qs = shuffle(pool).slice(0, n0); let i = 0, right = 0;
      const step = () => {
        box.innerHTML = `<h2 class="sub">أسئلة القسم</h2><div id="sqq"></div><div class="row" id="sqnav"></div>`;
        instantQ($('#sqq'), qs[i], ok => { if (ok) right++; $('#sqnav').innerHTML = `<button class="btn pri" id="sqnext">${i + 1 < qs.length ? 'السؤال التالي' : 'شوف النتيجة'}</button>`; $('#sqnext').onclick = () => { i++; i < qs.length ? step() : finish(); }; $('#sqnext').focus({ preventScroll: true }); }, `سؤال ${i + 1} من ${qs.length}`);
      };
      const finish = () => {
        const p = pct(right, qs.length), passed = right >= need(qs.length), st = S.sec[s.key] || (S.sec[s.key] = {});
        st.best = Math.max(+st.best || 0, p); st.at = Date.now(); if (passed) st.done = true; save(); renderNav(location.hash.slice(1));
        const idx = allSecs.indexOf(s.key), next = SEC[allSecs[idx + 1]];
        box.innerHTML = `<div class="panel stack"><div class="sub">${passed ? '✓ ممتاز! القسم مكتمل' : `قريب! تحتاج ${need(qs.length)} من ${qs.length} صح`}</div><div>نتيجتك: <b>${right}/${qs.length}</b> (${p}%)</div>
          <div class="row"><button class="btn" id="sqagain">أعد الأسئلة</button>${next ? `<a class="btn pri" href="#s.${next.key}">القسم التالي</a>` : `<a class="btn pri" href="#exams">الاختبارات</a>`}</div></div>`;
        $('#sqagain').onclick = start; $('#sqagain').focus({ preventScroll: true });
        if (passed) toast('✓ القسم مكتمل');
      };
      step();
    };
    if (!pool.length) { box.innerHTML = ''; return; }
    intro();
  }

  /* ---------------- tools page ---------------- */
  function tools() {
    const item = (kind, o) => `<details class="widget-d"><summary><span class="en" dir="ltr">${esc(o.title)}</span><span class="pill">${kind === 'order' ? 'ترتيب' : 'تصنيف'}</span>${S.drill[o.id] ? '<span class="pill ok">✓ أتقنته</span>' : ''}</summary><div class="widget" data-w="${kind}" data-id="${esc(o.id)}"></div></details>`;
    main.innerHTML = `<div class="stack col"><h1 class="title">أدوات الترتيب والتصنيف</h1>
      <p class="muted" style="margin:0">رتّب الإجراءات بنفسك، وصنّف الحالات. هذي نفس الأدوات الموجودة داخل الأقسام، مجمّعة هنا للمراجعة. اضغط على أي أداة عشان تفتحها.</p>
      ${UNITS.map(u => `<h2 class="sub unit-line"><span class="unit-n">Ch${u.n}</span><span dir="ltr" class="en">${esc(u.title)}</span></h2><div class="stack" dir="ltr" lang="en">${[...(u.orders || []).map(o => item('order', o)), ...(u.sorts || []).map(o => item('sort', o))].join('')}</div>`).join('')}</div>`;
    mountWidgets(main);
  }

  /* ---------------- flashcards ---------------- */
  function cardsView() {
    const due = dueCards().length;
    main.innerHTML = `<div class="stack col"><h1 class="title">البطاقات</h1>
      <div class="cards-setup stack">
      <div class="panel stack"><div class="row"><b>طريقة الإتقان:</b><span class="muted small">كل بطاقة تحتاج 3 إجابات صحيحة عشان تصير "متقنة"، وبعدها ترجع لك في أيام جديدة بنظام التكرار المتباعد.</span></div>
        <div class="stats"><div class="stat"><b>${learnedCount()}/${CARDS.length}</b><span class="small muted">متقنة</span></div><div class="stat"><b>${due}</b><span class="small muted">مستحقة اليوم</span></div><div class="stat"><b>${new Set(S.revDays).size}</b><span class="small muted">أيام مراجعة</span></div></div></div>
      <div class="grid2">
        <div class="panel stack"><div class="sub">١. تعلّم (إتقان)</div><p class="small muted" style="margin:0">البطاقات اللي ما أتقنتها، 20 بطاقة في كل جلسة. تتكرر في نفس الجلسة لين تجاوبها صح 3 مرات.</p>
          <label class="small" for="cu">الوحدة</label><select id="cu"><option value="">كل الوحدات</option>${UNITS.map(u => `<option value="${u.id}">Ch${u.n} · ${esc(u.title)}</option>`).join('')}</select>
          <button class="btn pri" id="cl">ابدأ جلسة</button><span class="small muted" id="cln"></span></div>
        <div class="panel stack"><div class="sub">٢. مراجعة المستحق اليوم</div><p class="small muted" style="margin:0">جلسات الإعادة في أيام جديدة. قيّم نفسك: نسيت / صعبة / جيدة / سهلة.</p><button class="btn pri" id="cr" ${due ? '' : 'disabled'}>راجع (${due})</button></div>
        <div class="panel stack"><div class="sub">٣. مراجعة حرة</div><p class="small muted" style="margin:0">أي بطاقات بترتيب عشوائي. البطاقة المتقنة اللي موعدها ما جا ما يتغير موعدها إلا إذا اخترت "نسيت".</p>
          <select id="cf" aria-label="الوحدة"><option value="">كل الوحدات</option>${UNITS.map(u => `<option value="${u.id}">Ch${u.n}</option>`).join('')}</select><button class="btn" id="cfree">ابدأ مراجعة حرة</button></div>
      </div></div><div id="cbox"></div></div>`;
    const upd = () => { const u = $('#cu').value, n = CARDS.filter(c => (!u || c.u === u) && !(S.cards[c.id] && S.cards[c.id].learned)).length; $('#cl').textContent = `ابدأ جلسة (${Math.min(20, n)} بطاقة)`; $('#cl').disabled = !n; $('#cln').textContent = `غير متقنة: ${n}`; };
    $('#cu').onchange = upd; upd();
    $('#cl').onclick = () => cardSession('learn', $('#cu').value);
    $('#cr').onclick = () => cardSession('review');
    $('#cfree').onclick = () => cardSession('free', $('#cf').value);
  }
  function srs(id, grade) { // grade 0 again,1 hard,2 good,3 easy
    const s = cardState(id), t = today();
    if (grade === 0) { s.iv = 1; s.ef = Math.max(1.3, s.ef - .2); s.lapses++; }
    else if (grade === 1) { s.iv = Math.max((s.iv || 1) + 1, Math.round((s.iv || 1) * 1.2)); s.ef = Math.max(1.3, s.ef - .15); }
    else if (grade === 2) { s.iv = s.reps ? Math.max(2, Math.round((s.iv || 1) * s.ef)) : 1; }
    else { s.iv = s.reps ? Math.max(3, Math.round((s.iv || 1) * s.ef * 1.3)) : 3; s.ef += .15; }
    s.reps++; s.due = addDays(t, s.iv);
    if (s.ld && s.ld < t && !S.revDays.includes(t)) S.revDays.push(t);
  }
  function cardSession(mode, unit) {
    let deck = mode === 'learn' ? CARDS.filter(c => (!unit || c.u === unit) && !(S.cards[c.id] && S.cards[c.id].learned))
      : mode === 'review' ? dueCards() : CARDS.filter(c => !unit || c.u === unit);
    deck = shuffle(deck); if (mode === 'learn') deck = deck.slice(0, 20);
    if (!deck.length) { toast('ما فيه بطاقات بهذا الاختيار'); return; }
    let queue = deck.slice(), done = 0;
    const box = $('#cbox'), setup = $('.cards-setup');
    if (setup) setup.hidden = true;
    // the session gets its own history entry: the phone's back button returns to the card menu (popstate below)
    try { if (!(history.state && history.state.cs)) history.pushState({ cs: 1 }, '', '#cards'); } catch (e) { }
    const leave = () => { go('cards'); try { if (history.state && history.state.cs) history.back(); } catch (e) { } };
    const show = () => {
      if (!queue.length) {
        box.innerHTML = `<div class="panel stack"><div class="sub">✓ خلصت الجلسة</div><div class="muted">${mode === 'learn' ? `أتقنت ${done} بطاقة في هذي الجلسة.` : `راجعت ${done} بطاقة.`}</div><div><button class="btn pri" id="cback">رجوع للبطاقات</button></div></div>`;
        $('#cback').onclick = leave; $('#cback').focus({ preventScroll: true }); renderNav('cards'); return;
      }
      const c = queue[0], st = cardState(c.id), u = UNIT[c.u];
      box.innerHTML = `<div class="stack"><div class="row small muted"><span>باقي ${queue.length}</span><span class="pill">Ch${u.n}</span><a href="#s.${c.sk}" class="small">القسم</a>${mode === 'learn' ? `<span>صح: <span class="dots3">${[0, 1, 2].map(k => `<i class="${k < st.c ? 'on' : ''}"></i>`).join('')}</span></span>` : ''}<span class="sp"></span><button class="btn sm ghost" id="cend">إنهاء الجلسة</button></div>
        <div class="fcard" id="fc" tabindex="0" role="button" aria-describedby="fch" dir="ltr"><div class="front">${frontT(c)}</div><div class="back" hidden>${mdT(c.b)}${c.src ? `<div class="csrc"><span class="src">${esc(c.src)}</span></div>` : ''}</div><div class="small muted" id="fch" lang="ar" dir="rtl">حاول تتذكر، ثم اضغط عشان تقلب البطاقة</div></div>
        <div id="gr"></div></div>`;
      $('#cend').onclick = leave;
      const flip = () => {
        const back = $('#fc .back'); if (!back.hidden) return; back.hidden = false; $('#fch').hidden = true;
        $('#gr').innerHTML = mode === 'learn'
          ? `<div class="grade"><button class="btn danger" data-g="0">ما عرفتها ✗</button><button class="btn pri" data-g="1">عرفتها ✓</button></div>`
          : `<div class="grade"><button class="btn danger" data-g="0">نسيت</button><button class="btn" data-g="1">صعبة</button><button class="btn pri" data-g="2">جيدة</button><button class="btn" data-g="3">سهلة</button></div>`;
        $('#gr').onclick = e => { const b = e.target.closest('[data-g]'); if (!b) return; grade(+b.dataset.g); };
        const fb = $('#gr button'); if (fb) fb.focus({ preventScroll: true });
      };
      // a tap on an underlined term opens the dictionary popup instead of flipping the card
      $('#fc').onclick = e => { if (e.target.closest('.term')) return; flip(); };
      $('#fc').onkeydown = e => { if (e.target !== e.currentTarget) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } };
      const grade = g => {
        const s = cardState(c.id); queue.shift();
        if (mode === 'learn') {
          if (g === 1) s.c = Math.min(3, s.c + 1); else s.c = Math.max(0, s.c - 1);
          if (s.c >= 3) { s.learned = true; s.ld = today(); s.iv = 1; s.due = addDays(today(), 1); done++; }
          else queue.splice(Math.min(queue.length, 2 + Math.floor(Math.random() * 3)), 0, c);
        } else {
          if (s.learned && mode !== 'review' && s.due > today()) { if (g === 0) srs(c.id, 0); } // early free review: only a lapse reschedules
          else if (s.learned || mode === 'review') srs(c.id, g);
          else { if (g >= 2) s.c = Math.min(3, s.c + 1); if (s.c >= 3) { s.learned = true; s.ld = today(); s.iv = 1; s.due = addDays(today(), 1); } }
          done++;
        }
        save(); show();
      };
      $('#fc').focus({ preventScroll: true });
    };
    show();
    box.scrollIntoView({ block: 'start' });
  }

  /* ---------------- practice (interleaved) ---------------- */
  function practice() {
    main.innerHTML = `<div class="stack col"><h1 class="title">تدريب مخلوط</h1>
      <p class="muted" style="margin:0">أسئلة عشوائية من كل الوحدات مخلوطة، مع تصحيح فوري. الخلط يدرّبك تميّز نوع السؤال مثل الاختبار الحقيقي. الأسئلة اللي غلطت فيها أو ما شفتها تطلع أكثر.</p>
      <div class="row small" id="pstat"></div>
      <details class="panel"><summary class="small">اختر الوحدات</summary><div class="row" style="margin-top:8px">${UNITS.map(u => `<label class="row small chk-chip"><input type="checkbox" class="pu" value="${u.id}" checked> Ch${u.n}</label>`).join('')}</div></details>
      <div id="pq"></div><div class="row" id="pnav"></div></div>`;
    const stat = () => { const l = S.prac.last.slice(-30); $('#pstat').innerHTML = `<span class="pill">جاوبت ${+S.prac.n} سؤال</span><span class="pill ${l.length >= 30 && pct(l.filter(Boolean).length, l.length) >= 80 ? 'ok' : ''}">دقة آخر ${l.length}: ${pct(l.filter(Boolean).length, l.length)}%</span>`; };
    let lastId = '';
    const pick = () => {
      const us = $$('.pu', main).filter(x => x.checked).map(x => x.value), pool = ALLQ.filter(q => us.includes(q.u) && q.id !== lastId);
      if (!pool.length) return null;
      const w = pool.map(q => { const r = S.q[q.id]; return !r ? 3 : r.last === 0 ? 4 : r.ok / r.n < .8 ? 2 : 1; });
      let t = Math.random() * w.reduce((a, b) => a + b, 0); for (let i = 0; i < pool.length; i++) { t -= w[i]; if (t <= 0) return pool[i]; } return pool[0];
    };
    const next = () => {
      const q = pick(); if (!q) { $('#pq').innerHTML = '<div class="empty">اختر وحدة واحدة على الأقل.</div>'; return; }
      lastId = q.id; $('#pnav').innerHTML = '';
      instantQ($('#pq'), q, ok => { S.prac.n++; S.prac.last.push(ok ? 1 : 0); if (S.prac.last.length > 100) S.prac.last.shift(); save(); stat(); $('#pnav').innerHTML = `<button class="btn pri" id="pnext">السؤال التالي</button>`; $('#pnext').onclick = next; $('#pnext').focus({ preventScroll: true }); });
    };
    // changing the units swaps an unanswered question for one from the new selection
    $$('.pu', main).forEach(x => x.onchange = () => { if ($('.qcard .opt[disabled]', main)) return; next(); });
    stat(); next();
  }

  /* ---------------- fix my mistakes ---------------- */
  function fix() {
    const ids = shuffle(misList());
    main.innerHTML = `<div class="stack col"><h1 class="title">صحّح أخطائي</h1>
      <p class="muted" style="margin:0">كل سؤال غلطت فيه في أي مكان يجي هنا، ويرجع لك لين تجاوبه صح. إذا غلطت يرجع لآخر الطابور.</p>
      <div class="row small" id="fstat"></div><div id="fq"></div><div class="row" id="fnav"></div></div>`;
    if (!ids.length) { $('#fq').innerHTML = `<div class="empty">ما عندك أخطاء الحين ✓. حل <a href="#practice">تدريب مخلوط</a> أو <a href="#exams">اختبار</a>.</div>`; return; }
    let queue = ids.slice(), fixed = 0;
    const next = () => {
      $('#fstat').innerHTML = `<span class="pill">باقي ${queue.length}</span><span class="pill ok">صححت ${fixed}</span>`;
      if (!queue.length) { $('#fq').innerHTML = `<div class="panel stack"><div class="sub">✓ صححت كل أخطائك</div><a class="btn pri" href="#exams">جرّب اختبار</a></div>`; $('#fnav').innerHTML = ''; renderNav('fix'); return; }
      const q = Q[queue.shift()]; $('#fnav').innerHTML = '';
      instantQ($('#fq'), q, ok => {
        if (ok) { delete S.mis[q.id]; fixed++; } else queue.push(q.id);
        save();
        $('#fnav').innerHTML = `<button class="btn pri" id="fnext">التالي</button>`; $('#fnext').onclick = next; $('#fnext').focus({ preventScroll: true });
      });
    };
    next();
  }

  /* ---------------- exams ---------------- */
  function exams() {
    const hist = S.exams.slice(-8).reverse();
    main.innerHTML = `<div class="stack col"><h1 class="title">الاختبارات</h1>
      ${S.run && !S.run.done ? `<div class="note warn"><span class="lab">اختبار غير مكتمل</span>${esc(S.run.title)} · <a href="#run">استكمل</a></div>` : ''}
      <div class="panel stack"><div class="sub">اختبار شامل: كل أسئلة البنك</div>
        <p class="small muted" style="margin:0">كل الأسئلة الموجودة (<b>${ALLQ.length}</b> سؤال، منها ${ALLQ.filter(q => q.past).length} سؤال سابق)، بدون ما ينقص ولا سؤال. تقدر تحدد الوحدات، وتقدر توقف وتكمل بعدين لأن تقدمك ينحفظ (والمؤقت، إذا شغّلته، يوقف لما تطلع من صفحة الاختبار).</p>
        <div class="row">${UNITS.map(u => `<label class="row small chk-chip"><input type="checkbox" class="au" value="${u.id}" checked> Ch${u.n} (${u.questions.length})</label>`).join('')}</div>
        <div class="grid2"><div><label class="small" for="aord">الترتيب</label><select id="aord"><option value="mix">عشوائي مخلوط من كل الوحدات</option><option value="unit">وحدة وحدة بالترتيب</option></select></div>
          <div><label class="small" for="afb">التصحيح</label><select id="afb"><option value="now">فوري بعد كل سؤال</option><option value="end">في النهاية</option></select></div>
          <div><label class="small" for="atm">المؤقت</label><select id="atm"><option value="0">بدون مؤقت</option><option value="1">دقيقة لكل سؤال</option></select></div></div>
        <div class="row"><button class="btn pri" data-ex="all"><span>ابدأ الاختبار الشامل (<span id="acnt">${ALLQ.length}</span> سؤال)</span></button>${bestExam('all') >= 0 ? `<span class="pill ${bestExam('all') >= 85 ? 'ok' : ''}">أفضل ${bestExam('all')}%</span>` : ''}</div></div>
      <div class="panel stack"><div class="sub">اختبار كل وحدة</div><p class="small muted" style="margin:0">20 سؤال عشوائي من الوحدة (أو كل أسئلتها إذا أقل)، بدون مؤقت، والتصحيح في النهاية.</p>
        <div class="stack">${UNITS.map(u => { const be = bestExam('unit:' + u.id), n = u.questions.length; return `<div class="exrow"><button class="btn exu" data-ex="unit" data-u="${u.id}"><span class="unit-n">Ch${u.n}</span><span dir="ltr" class="en">${esc(u.title)}</span></button><div class="row small"><span class="muted">${Math.min(20, n)} من ${n} سؤال</span>${be >= 0 ? `<span class="pill ${be >= 80 ? 'ok' : ''}">أفضل ${be}%</span>` : ''}</div></div>`; }).join('')}</div></div>
      <div class="panel stack"><div class="sub">الاختبار النهائي (بمؤقت)</div><p class="small muted" style="margin:0">أسئلة من كل الوحدات بنسبة حجم كل وحدة، بمؤقت دقيقة لكل سؤال، والتصحيح في النهاية مع نتيجة لكل وحدة.</p>
        <div class="row"><label class="small" for="fn">عدد الأسئلة</label><select id="fn" style="width:auto"><option>30</option><option selected>50</option><option>80</option></select></div>
        <label class="row small"><input type="checkbox" id="fnb"> بدون رجوع للسؤال السابق (مثل اختبار البلاك بورد)</label>
        <div><button class="btn pri" data-ex="final">ابدأ الاختبار النهائي</button>${bestExam('final') >= 0 ? ` <span class="pill ${bestExam('final') >= 85 ? 'ok' : ''}">أفضل ${bestExam('final')}%</span>` : ''}</div></div>
      <div class="panel stack"><div class="sub">اختبار مخصص</div>
        <div class="row">${UNITS.map(u => `<label class="row small chk-chip"><input type="checkbox" class="cu" value="${u.id}" checked> Ch${u.n}</label>`).join('')}</div>
        <div class="grid2"><div><label class="small" for="cn">عدد الأسئلة</label><input id="cn" type="text" inputmode="numeric" value="20"></div>
          <div><label class="small" for="cs">المصدر</label><select id="cs"><option value="all">كل الأسئلة</option><option value="past">أسئلة سابقة فقط</option><option value="lec">أسئلة المحاضرات فقط</option><option value="weak">أضعف أسئلتي (غلطت فيها أو ما شفتها)</option></select></div>
          <div><label class="small" for="ct">المؤقت (دقائق، 0 = بدون)</label><input id="ct" type="text" inputmode="numeric" value="0"></div>
          <div><label class="small" for="cfb">التصحيح</label><select id="cfb"><option value="end">في النهاية</option><option value="now">فوري بعد كل سؤال</option></select></div></div>
        <div><button class="btn pri" data-ex="custom">ابدأ</button></div></div>
      <div class="panel stack"><div class="sub">صحّح أخطائي</div><div class="row"><span class="pill">${misList().length} سؤال</span><a class="btn" href="#fix">ابدأ</a></div></div>
      ${hist.length ? `<div class="panel stack"><div class="sub">آخر النتائج</div><table class="res-table"><tbody>${hist.map(e => `<tr><td>${esc(e.title)}${e.sub ? `<div class="small muted en" dir="ltr">${esc(e.sub)}</div>` : ''}</td><td>${+e.right}/${+e.total}</td><td><b>${+e.pct}%</b></td><td class="small muted">${new Date(+e.at).toLocaleDateString('ar-SA')}</td></tr>`).join('')}</tbody></table></div>` : ''}
    </div>`;
    const acnt = () => { const us = $$('.au').filter(x => x.checked).map(x => x.value); $('#acnt').textContent = ALLQ.filter(q => us.includes(q.u)).length; };
    $$('.au').forEach(x => x.onchange = acnt);
    main.addEventListener('click', examClick);
    cleanup.push(() => main.removeEventListener('click', examClick));
  }
  function examClick(e) {
    const b = e.target.closest('[data-ex]'); if (!b) return;
    const k = b.dataset.ex;
    if (k === 'unit') { const u = UNIT[b.dataset.u]; if (!u) return; startRun({ kind: 'unit:' + u.id, title: 'اختبار الوحدة Ch' + u.n, sub: u.title, qs: shuffle(u.questions).slice(0, 20).map(q => q.id), mins: 0, fb: 'end' }); }
    else if (k === 'all') {
      const us = $$('.au').filter(x => x.checked).map(x => x.value);
      if (!us.length) { toast('اختر وحدة واحدة على الأقل'); return; }
      const qs = $('#aord').value === 'unit' ? UNITS.filter(u => us.includes(u.id)).flatMap(u => shuffle(u.questions)) : shuffle(ALLQ.filter(q => us.includes(q.u)));
      const whole = us.length === UNITS.length;
      startRun({ kind: whole ? 'all' : 'all-part', title: (whole ? 'الاختبار الشامل' : 'اختبار شامل لـ ' + us.map(u => 'Ch' + UNIT[u].n).join(' و ')) + ' (' + qs.length + ' سؤال)', qs: qs.map(q => q.id), mins: $('#atm').value === '1' ? qs.length : 0, fb: $('#afb').value });
    }
    else if (k === 'final') {
      const n = +$('#fn').value, tot = ALLQ.length;
      let qs = []; UNITS.forEach(u => { qs.push(...shuffle(u.questions).slice(0, Math.max(3, Math.round(n * u.questions.length / tot)))); });
      qs = shuffle(qs).slice(0, n);
      // rounding can leave the exam one or two short of the chosen size: top it up from the rest of the bank
      if (qs.length < n) { const have = new Set(qs.map(q => q.id)); qs = shuffle([...qs, ...shuffle(ALLQ.filter(q => !have.has(q.id))).slice(0, n - qs.length)]); }
      startRun({ kind: 'final', title: 'الاختبار النهائي (' + qs.length + ' سؤال)', qs: qs.map(q => q.id), mins: qs.length, fb: 'end', noBack: $('#fnb').checked });
    } else if (k === 'custom') {
      const us = $$('.cu').filter(x => x.checked).map(x => x.value), src = $('#cs').value;
      let pool = ALLQ.filter(q => us.includes(q.u));
      if (src === 'past') pool = pool.filter(q => q.past); else if (src === 'lec') pool = pool.filter(q => !q.past);
      else if (src === 'weak') pool = pool.filter(q => { const r = S.q[q.id]; return !r || r.last === 0 || S.mis[q.id]; });
      if (!pool.length) { toast('ما فيه أسئلة بهذي الاختيارات'); return; }
      const n = Math.max(1, Math.min(parseInt($('#cn').value, 10) || 20, pool.length));
      startRun({ kind: 'custom', title: 'اختبار مخصص (' + n + ' سؤال)', qs: shuffle(pool).slice(0, n).map(q => q.id), mins: Math.max(0, parseInt($('#ct').value, 10) || 0), fb: $('#cfb').value });
    }
  }
  function startRun(o, force) {
    // a started exam (e.g. the whole bank, 316 questions) must not be replaced by one stray tap
    const R0 = S.run, nAns = R0 && !R0.done ? Object.keys(obj(R0.ans)).length : 0;
    if (!force && nAns) {
      let box = $('#runwarn');
      if (!box) { box = document.createElement('div'); box.id = 'runwarn'; ($('.stack', main) || main).prepend(box); }
      box.innerHTML = `<div class="confirm" role="alertdialog" aria-label="اختبار غير مكتمل"><b>عندك اختبار ما خلص: ${esc(R0.title)} (جاوبت ${nAns} من ${R0.qs.length}). لو بدأت اختبار جديد ينحذف.</b><div class="row"><a class="btn pri" href="#run">كمّل الاختبار القديم</a><button class="btn danger" id="rwy">احذفه وابدأ الجديد</button><button class="btn" id="rwn">إلغاء</button></div></div>`;
      $('#rwy').onclick = () => startRun(o, true); $('#rwn').onclick = () => box.remove();
      box.scrollIntoView({ block: 'center' }); $('#rwy').focus({ preventScroll: true }); return;
    }
    const ord = {}; o.qs.forEach(id => ord[id] = optOrder(Q[id]));
    // the timer stores the time LEFT (it pauses while the exam page is closed), not a wall-clock deadline
    S.run = { kind: o.kind, title: o.title, sub: o.sub || '', qs: o.qs, ord, ans: {}, i: 0, fb: o.fb, noBack: !!o.noBack, start: Date.now(), left: o.mins ? o.mins * 60000 : null, end: 0, done: false };
    save(); go('run');
  }
  const runHead = R => `<div class="sub">${esc(R.title)}${R.sub ? `<div dir="ltr" class="en small muted">${esc(R.sub)}</div>` : ''}</div>`;
  const clock = ms => { const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, ss = String(s % 60).padStart(2, '0'); return h ? h + ':' + String(m).padStart(2, '0') + ':' + ss : m + ':' + ss; };
  // a freshly drawn question whose top is hidden (scrolled past, or under the sticky header) is brought back into view
  function toQ(qc) { if (!qc) return; const h = ($('.top') || {}).offsetHeight || 0, t = qc.getBoundingClientRect().top; if (t < h || t > innerHeight - 120) qc.scrollIntoView({ block: 'start' }); }
  function runView() {
    const R = S.run;
    if (!R) { main.innerHTML = `<div class="empty">ما فيه اختبار شغّال. <a href="#exams">الاختبارات</a></div>`; return; }
    if (R.done) return results(R);
    let tick, mapOpen = false;
    const timed = R.left != null;
    // timer runs only while this page is open and visible
    let running = false;
    const resume = () => { if (timed && !running && !R.done) { R.end = Date.now() + R.left; running = true; } };
    const pause = () => { if (timed && running && !R.done) { R.left = Math.max(0, R.end - Date.now()); running = false; save(); } };
    const onVis = () => { if (document.visibilityState === 'hidden') pause(); else { resume(); upd(); } };
    resume();
    window.addEventListener('pagehide', pause); document.addEventListener('visibilitychange', onVis);
    cleanup.push(() => { pause(); window.removeEventListener('pagehide', pause); document.removeEventListener('visibilitychange', onVis); });
    // mode: undefined = first draw, 'ans' = an option was tapped (keep the scroll position), 'nav' = another question
    const draw = mode => {
      const id = R.qs[R.i], q = Q[id], chosen = R.ans[id], locked = R.fb === 'now' && chosen != null;
      const nAns = R.qs.filter(x => R.ans[x] != null).length, big = R.qs.length > 40, open1 = R.qs.findIndex(x => R.ans[x] == null);
      const dots = `<div class="qdots" aria-label="الأسئلة">${R.qs.map((x, k) => `<button data-k="${k}" class="${R.ans[x] != null ? 'a' : ''} ${k === R.i ? 'cur' : ''}" aria-label="سؤال ${k + 1}${R.ans[x] != null ? ' (مجاوب)' : ''}">${k + 1}</button>`).join('')}</div>`;
      main.innerHTML = `<div class="stack col">
        <div class="row" style="justify-content:space-between">${runHead(R)}${timed ? `<span class="timer" id="tmr" role="timer"></span>` : ''}</div>
        <div class="meter"><i style="width:${pct(nAns, R.qs.length)}%"></i></div>
        <div class="qcard" data-qid="${id}">${qMeta(q)}<div class="small muted">سؤال ${R.i + 1} من ${R.qs.length}</div><div class="qtext" dir="ltr">${stemT(q)}</div>
          <div class="opts" dir="ltr">${R.ord[id].map((oi, k) => optBtn(q, oi, k, `${chosen === oi ? 'sel' : ''} ${locked ? (oi === q.a ? 'right' : oi === chosen ? 'wrong' : '') : ''}`, locked)).join('')}</div>
          ${locked ? `<div dir="ltr">${explHTML(q, chosen)}</div>` : ''}</div>
        <div class="qnav"><div class="row">${R.noBack ? '' : `<button class="btn" id="rprev" ${R.i === 0 ? 'disabled' : ''}>→ السابق</button>`}<button class="btn pri" id="rnext">${R.i + 1 < R.qs.length ? 'التالي ←' : 'إنهاء'}</button></div>
          <button class="btn ghost" id="rsub">سلّم الاختبار</button></div>
        <div id="rconf"></div>
        ${R.noBack ? '' : big ? `<div class="row small"><span class="pill">جاوبت ${nAns} من ${R.qs.length}</span>${open1 >= 0 && open1 !== R.i ? `<button class="btn sm" id="rfirst">أول سؤال بدون إجابة (${open1 + 1})</button>` : ''}</div>
          <details class="qmap" ${mapOpen ? 'open' : ''}><summary class="small">خريطة الأسئلة</summary>${dots}</details>` : dots}
      </div>`;
      $('.opts', main).onclick = e => {
        if (e.target.closest('.term')) return;
        const b = e.target.closest('.opt'); if (!b || b.disabled) return;
        R.ans[id] = +b.dataset.oi; save();
        if (R.fb === 'now') record(q, R.ans[id] === q.a);
        draw('ans');
      };
      const nx = $('#rnext'); nx.onclick = () => { if (R.i + 1 < R.qs.length) { R.i++; save(); draw('nav'); } else confirmSubmit(); };
      if ($('#rprev')) $('#rprev').onclick = () => { R.i--; save(); draw('nav'); };
      if ($('#rfirst')) $('#rfirst').onclick = () => { const k = R.qs.findIndex(x => R.ans[x] == null); if (k >= 0) { R.i = k; save(); draw('nav'); } };
      const det = $('.qmap', main); if (det) det.ontoggle = () => { mapOpen = det.open; };
      $('#rsub').onclick = confirmSubmit;
      $$('.qdots button', main).forEach(b => b.onclick = () => { R.i = +b.dataset.k; save(); draw('nav'); });
      upd();
      if (mode === 'nav') toQ($('.qcard', main));
      // keep keyboard users in place after the page is rebuilt
      if (mode) { const f = $('.opt.sel:not([disabled])', main) || $('#rnext'); if (f) f.focus({ preventScroll: true }); }
    };
    const confirmSubmit = () => {
      const left = R.qs.filter(x => R.ans[x] == null).length;
      $('#rconf').innerHTML = `<div class="confirm" role="alertdialog" aria-label="تسليم الاختبار"><b>${left ? `باقي ${left} سؤال بدون إجابة. الأسئلة اللي ما جاوبتها تنحسب غلط في الدرجة، لكن ما تنضاف لصحّح أخطائي.` : 'جاوبت كل الأسئلة.'} متأكد تبي تسلّم؟</b><div class="row"><button class="btn pri" id="cyes">نعم، سلّم</button><button class="btn" id="cno">رجوع</button></div></div>`;
      $('#cyes').onclick = submit; $('#cno').onclick = () => { $('#rconf').innerHTML = ''; $('#rsub').focus({ preventScroll: true }); };
      $('#cyes').focus();
    };
    const upd = () => {
      if (!timed || !running) return; const ms = R.end - Date.now(), t = $('#tmr');
      R.left = Math.max(0, ms); // saved with the next answer, so a crash loses at most a few seconds
      if (ms <= 0) { submit(); toast('انتهى الوقت'); return; }
      if (t) { t.textContent = '⏱ ' + clock(ms); t.classList.toggle('low', ms < 120000); }
    };
    const submit = () => {
      if (R.done) return;
      clearInterval(tick);
      let right = 0; const by = {};
      // a question never answered counts as wrong in the score, but is not a "mistake" to fix (it was never tried)
      R.qs.forEach(id => { const q = Q[id], a = R.ans[id], ok = a === q.a; if (ok) right++; const b = by[q.u] || (by[q.u] = { r: 0, n: 0 }); b.n++; if (ok) b.r++; if (R.fb !== 'now' && a != null) record(q, ok); });
      if (timed) R.left = running ? Math.max(0, R.end - Date.now()) : R.left;
      R.done = true; R.right = right; R.by = by; R.at = Date.now();
      const nA = R.qs.filter(x => R.ans[x] != null).length;
      S.exams.push({ kind: R.kind, title: R.title, sub: R.sub || '', right, total: R.qs.length, answered: nA, pct: pct(right, R.qs.length), by, at: R.at });
      save(); results(R); renderNav('exams'); window.scrollTo(0, 0);
    };
    tick = setInterval(upd, 1000); cleanup.push(() => clearInterval(tick));
    draw();
  }
  function results(R) {
    const p = pct(R.right, R.qs.length), answered = R.qs.filter(id => R.ans[id] != null), wrong = answered.filter(id => R.ans[id] !== Q[id].a), skipped = R.qs.length - answered.length;
    main.innerHTML = `<div class="stack col"><h1 class="title">النتيجة</h1>
      <div class="panel row" style="gap:18px"><div class="ring" style="--p:${p}"><div>${p}%<small>${+R.right}/${R.qs.length}</small></div></div><div class="stack">${runHead(R)}
        ${skipped ? `<div class="small"><b>${+R.right}/${answered.length}</b> من المجاوب (${pct(R.right, answered.length)}%) · <b>${+R.right}/${R.qs.length}</b> من الكل (${p}%)</div>` : ''}
        <div class="muted small">${p >= 85 ? 'ممتاز! جاهز.' : p >= 70 ? 'جيد. راجع الأخطاء تحت.' : 'راجع الأقسام المرتبطة بأخطائك ثم أعد المحاولة.'}</div>
        <div class="row"><a class="btn pri" href="#fix">صحّح أخطائي (${misList().length})</a><a class="btn" href="#exams">اختبار جديد</a></div></div></div>
      <div class="panel"><div class="sub">حسب الوحدة</div><table class="res-table"><thead><tr><th>الوحدة</th><th>صح</th><th>%</th><th></th></tr></thead><tbody>
        ${Object.entries(R.by).filter(([u]) => UNIT[u]).sort(([a], [b]) => UNIT[a].n - UNIT[b].n).map(([u, b]) => `<tr><td><span class="unit-n">Ch${UNIT[u].n}</span> <bdi dir="ltr">${esc(UNIT[u].title)}</bdi></td><td class="nw">${+b.r}/${+b.n}</td><td class="nw"><b>${pct(b.r, b.n)}%</b></td><td class="nw"><a href="#u.${u}">الوحدة</a></td></tr>`).join('')}</tbody></table></div>
      <h2 class="sub">مراجعة الأخطاء (${wrong.length})</h2>
      ${skipped ? `<div class="note warn small" id="rskip"><span class="lab">ما جاوبت: ${skipped}</span>هذي الأسئلة انحسبت غلط في الدرجة، لكنها ما انضافت لصحّح أخطائي لأنك ما جربتها.</div>` : ''}
      ${wrong.length ? wrong.map((id, k) => { const q = Q[id], ch = R.ans[id]; return `<div class="qcard">${qMeta(q)}<div class="qtext" dir="ltr">${k + 1}. ${mdT(q.q)}</div><div dir="ltr" class="small">Your answer: <b>${mdPlain(q.o[ch])}</b></div><div dir="ltr">${explHTML(q, ch)}</div></div>`; }).join('') : `<div class="empty">${answered.length ? 'ولا خطأ في اللي جاوبته ✓' : 'ما جاوبت ولا سؤال.'}</div>`}
    </div>`;
  }

  /* ---------------- steps ---------------- */
  function stepStatus() {
    const l30 = S.prac.last.slice(-30), recDone = RECALL.filter(r => S.rec[r.id]).length;
    const L = [];
    UNITS.forEach(u => L.push({ t: `أكمل مسار Ch${u.n}: ${u.ar}`, cond: `كل أقسام الوحدة (${u.sections.length}) مكتملة ✓ بنتيجة 80% أو أكثر في أسئلة القسم`, done: unitDone(u), href: '#u.' + u.id, prog: `${u.sections.filter(s => secDone(s.key)).length}/${u.sections.length}` }));
    L.push({ t: 'استرجع النقاط المهمة', cond: 'اكشف وقيّم نفسك في 90% من نقاط "استرجع قبل ما تراجع"', done: recDone >= Math.ceil(RECALL.length * .9), href: '#recall', prog: `${recDone}/${RECALL.length}` });
    L.push({ t: 'أتقن أدوات الترتيب والتصنيف', cond: 'كل أداة ترتيب وتصنيف محلولة صح مرة وحدة على الأقل', done: drillIds.every(i => S.drill[i]), href: '#tools', prog: `${drillIds.filter(i => S.drill[i]).length}/${drillIds.length}` });
    L.push({ t: 'أتقن كل البطاقات', cond: 'كل بطاقة جاوبتها صح 3 مرات', done: learnedCount() === CARDS.length, href: '#cards', prog: `${learnedCount()}/${CARDS.length}` });
    L.push({ t: 'تدريب مخلوط من كل الوحدات', cond: 'جاوب 60 سؤال على الأقل، ودقتك في آخر 30 سؤال 80% أو أكثر', done: S.prac.n >= 60 && l30.length >= 30 && pct(l30.filter(Boolean).length, l30.length) >= 80, href: '#practice', prog: `${+S.prac.n}/60 · ${pct(l30.filter(Boolean).length, l30.length)}%` });
    L.push({ t: 'اختبار كل وحدة', cond: '80% أو أكثر في اختبار كل وحدة', done: UNITS.every(u => bestExam('unit:' + u.id) >= 80), href: '#exams', prog: `${UNITS.filter(u => bestExam('unit:' + u.id) >= 80).length}/${UNITS.length}` });
    L.push({ t: 'صحّح أخطائك', cond: 'سويت اختبار واحد على الأقل، وما بقى ولا سؤال في "صحّح أخطائي"', done: S.exams.length > 0 && misList().length === 0, href: '#fix', prog: `${misList().length} متبقي` });
    L.push({ t: 'مراجعة متباعدة في أيام جديدة', cond: 'راجعت البطاقات المستحقة في يومين مختلفين على الأقل بعد ما أتقنتها، وما فيه بطاقات متأخرة', done: new Set(S.revDays).size >= 2 && dueCards().length === 0 && learnedCount() > 0, href: '#cards', prog: `${new Set(S.revDays).size}/2 أيام` });
    L.push({ t: 'الاختبار النهائي بمؤقت', cond: '85% أو أكثر في الاختبار النهائي', done: bestExam('final') >= 85, href: '#exams', prog: bestExam('final') >= 0 ? `أفضل ${bestExam('final')}%` : 'لم يبدأ' });
    return L.map((x, i) => Object.assign(x, { n: i + 1 }));
  }
  function steps() {
    const L = stepStatus(), cur = L.find(x => !x.done);
    main.innerHTML = `<div class="stack col" lang="ar"><h1 class="title">خطوات المذاكرة</h1>
      <p class="muted" style="margin:0">الخطوات مربوطة بإنجازك، مو بأيام. كل خطوة تتعلّم ✓ تلقائياً لما تحقق شرطها. امشِ بالترتيب، وارجع للخطوات السابقة إذا نسيت.</p>
      <ol class="steps">${L.map(x => `<li class="${x.done ? 'done' : ''} ${x === cur ? 'cur' : ''}"><span class="num">${x.done ? '✓' : x.n}</span><div class="b"><b>${esc(x.t)}</b><span class="small muted">الشرط: ${esc(x.cond)}</span><div class="row"><span class="pill ${x.done ? 'ok' : ''}">${esc(x.prog)}</span><a class="btn sm ${x === cur ? 'pri' : ''}" href="${x.href}">روح لها</a></div></div></li>`).join('')}</ol>
      <div class="panel stack"><div class="sub">ليش الطريقة هذي؟</div><span class="pill edit" style="align-self:flex-start">مضاف — مو من الملفات</span>
        ${(META.research || []).map(r => `<div><b>${esc(r.h)}</b><div class="small">${esc(r.x)}</div></div>`).join('')}
        <p class="small muted" style="margin:0">هذي مبادئ معروفة في أبحاث التعلّم (مثل مراجعة Dunlosky وزملائه 2013 لأساليب المذاكرة).</p></div></div>`;
  }

  /* ---------------- recall (all prompts in one place) ---------------- */
  function recallView(uf) {
    const cur = UNIT[uf] ? uf : '';
    main.innerHTML = `<div class="stack col"><h1 class="title">الاسترجاع</h1>
      <p class="muted" style="margin:0">كل نقاط "استرجع قبل ما تراجع" من كل الأقسام في صفحة وحدة. حاول تتذكر الإجابة في بالك، اكشفها، وقيّم نفسك بصدق. الإجابات تنخفي من جديد كل ما رجعت.</p>
      <div class="grid2"><div><label class="small" for="rcu">الوحدة</label><select id="rcu"><option value="">كل الوحدات</option>${UNITS.map(u => `<option value="${u.id}" ${cur === u.id ? 'selected' : ''}>Ch${u.n} · ${esc(u.title)}</option>`).join('')}</select></div>
        <div><label class="small" for="rcf">اعرض</label><select id="rcf"><option value="todo">اللي ما تذكرتها أو ما قيّمتها بعد</option><option value="all">كل النقاط</option></select></div></div>
      <div class="row small" id="rcs"></div><div class="stack" id="rcl"></div></div>`;
    const draw = () => {
      const u = $('#rcu').value, f = $('#rcf').value;
      const inU = RECALL.filter(r => !u || SEC[r.sec].u.id === u), list = inU.filter(r => f === 'all' || S.rec[r.id] !== 2);
      $('#rcs').innerHTML = `<span class="pill">قيّمت ${inU.filter(r => S.rec[r.id]).length} من ${inU.length}</span><span class="pill ok">تذكرت ${inU.filter(r => S.rec[r.id] === 2).length}</span>`;
      const by = []; list.forEach(r => { let g = by.find(x => x[0] === r.sec); if (!g) by.push(g = [r.sec, []]); g[1].push(r); });
      $('#rcl').innerHTML = by.map(([sk, rs]) => { const s = SEC[sk]; return `<section class="stack" style="gap:8px"><h2 class="sub unit-line"><span class="unit-n">Ch${s.u.n}</span><a href="#s.${sk}" dir="ltr" class="en">${esc(s.title)}</a></h2><ul class="recall" dir="ltr">${rs.map(r => recallItem(r.id, r)).join('')}</ul></section>`; }).join('')
        || `<div class="empty">${f === 'todo' ? 'تذكرت كل النقاط هنا ✓. اختر "كل النقاط" عشان تراجعها مرة ثانية.' : 'ما فيه نقاط.'}</div>`;
    };
    $('#rcu').onchange = draw; $('#rcf').onchange = draw; draw();
  }

  /* ---------------- important numbers ---------------- */
  function numbers(uf) {
    let cur = UNIT[uf] ? uf : '', testing = false;
    // numbers revealed in self-test mode stay revealed when the list is filtered again
    const seen = new Set(), nk = x => hash(x.u + '|' + x.v + '|' + x.what);
    main.innerHTML = `<div class="stack col"><h1 class="title">الأرقام المهمة</h1>
      <p class="muted" style="margin:0">كل رقم ممكن يجي في الاختبار من المحاضرات الخمس، مع معناه والقسم والشريحة. اضغط "اخفِ الأرقام"، اقرأ الوصف وحاول تتذكر الرقم، بعدين اضغط على المربع عشان تكشفه.</p>
      <div class="row" id="nuf" role="group" aria-label="الوحدة"></div>
      <div class="nbar"><input type="search" id="nq" placeholder="ابحث في الأرقام: alcohol أو 60…" aria-label="بحث في الأرقام"><button class="btn" id="nhide" aria-pressed="false">اخفِ الأرقام واختبر نفسك</button></div>
      <div class="small muted" id="ncnt" role="status"></div>
      <div id="nl"></div></div>`;
    const chips = () => { $('#nuf').innerHTML = [['', 'كل الوحدات', NUMS.length], ...UNITS.map(u => [u.id, 'Ch' + u.n, NUMS.filter(x => x.u === u.id).length])].map(([id, t, n]) => `<button class="btn sm ${cur === id ? 'pri' : ''}" data-nu="${id}" aria-pressed="${cur === id}">${t} <span class="cnt">${n}</span></button>`).join(''); };
    const draw = () => {
      const qv = norm($('#nq').value.trim());
      const list = NUMS.filter(x => (!cur || x.u === cur) && (!qv || norm(strip([x.v, x.what, x.src].join(' '))).includes(qv)));
      $('#ncnt').textContent = `${list.length} رقم`;
      const nl = $('#nl'); nl.className = testing ? 'testing' : '';
      nl.innerHTML = UNITS.map(u => {
        const L = list.filter(x => x.u === u.id); if (!L.length) return '';
        return `<section class="stack" style="gap:8px"><h2 class="sub unit-line"><span class="unit-n">Ch${u.n}</span><span dir="ltr" class="en">${esc(u.title)}</span></h2>
          <ul class="nums" dir="ltr" lang="en">${L.map(x => `<li><span class="nv hv${testing && seen.has(nk(x)) ? ' shown' : ''}" data-nk="${nk(x)}" ${testing ? 'tabindex="0" role="button" aria-label="اكشف الرقم"' : ''}>${md(x.v)}</span><div class="nw"><div>${md(x.what)}</div><div class="nmeta">${SEC[x.sk] ? `<a href="#s.${x.sk}">↩ ${esc(SEC[x.sk].title)}</a>` : ''}<span class="src">${esc(x.src)}</span></div></div></li>`).join('')}</ul></section>`;
      }).join('') || '<div class="empty">ما فيه نتائج</div>';
    };
    $('#nuf').onclick = e => { const b = e.target.closest('[data-nu]'); if (!b) return; cur = b.dataset.nu; chips(); draw(); };
    $('#nq').oninput = draw;
    // the global handler reveals the number; this one remembers it (it runs first, on the way up)
    const mark = e => { const v = testing && e.target.closest && e.target.closest('.nv[data-nk]'); if (v && (e.type === 'click' || e.key === 'Enter' || e.key === ' ')) seen.add(v.dataset.nk); };
    $('#nl').addEventListener('click', mark); $('#nl').addEventListener('keydown', mark);
    $('#nhide').onclick = () => { testing = !testing; seen.clear(); const b = $('#nhide'); b.setAttribute('aria-pressed', String(testing)); b.classList.toggle('pri', testing); b.textContent = testing ? 'اكشف كل الأرقام' : 'اخفِ الأرقام واختبر نفسك'; draw(); };
    chips(); draw();
  }

  /* ---------------- confusable pairs ---------------- */
  function confuse(focus) {
    main.innerHTML = `<div class="stack col"><h1 class="title">لا تخلطها</h1>
      <p class="muted" style="margin:0">أشياء متشابهة تنخلط في الاختبار، خصوصاً لما تجي من فصلين مختلفين. كل جدول يقارن بينها نقطة نقطة مع المصدر. اضغط "اخفِ الخلايا واختبر نفسك" وحاول تتذكر كل خانة، بعدين اضغط عليها عشان تكشفها.</p>
      ${CONF.length ? `<details class="panel"><summary class="small">المحتويات (${CONF.length})</summary><div class="cfl" dir="ltr">${CONF.map(c => `<button class="btn sm ghost" data-act="jump" data-to="cf-${esc(c.id)}">${esc(strip(c.title))}</button>`).join('')}</div></details>` : ''}
      ${CONF.map(c => `<section class="cfp stack" id="cf-${esc(c.id)}" dir="ltr" lang="en"><h2 class="sub">${md(c.title)}</h2>${block({ t: 'table', head: c.head, rows: c.rows, quiz: true }, 'cft-' + c.id)}${c.note ? `<div class="note key"><span class="lab">Key point · نقطة مهمة</span>${md(c.note)}</div>` : ''}<div><span class="src">${esc(c.src)}</span></div></section>`).join('') || '<div class="empty">ما فيه جداول بعد.</div>'}</div>`;
    if (focus) afterRoute = () => { const el = document.getElementById('cf-' + focus); if (el) { el.classList.add('hl'); el.scrollIntoView({ block: 'start' }); } };
  }

  /* ---------------- glossary ---------------- */
  const norm = s => String(s).toLowerCase().replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
  // query words lose a leading Arabic article (ال، وال، بال، فال، كال، لل…): the dictionary is mostly written without it,
  // and a shorter query still matches the text that has it
  const arTerm = w => w.replace(/^(?:[وفبكل])?ال(?=\S{2,})/, '').replace(/^لل(?=\S{2,})/, '');
  const qTerms = raw => norm(raw).split(/\s+/).filter(Boolean).map(arTerm).filter(Boolean);
  // a dictionary name in comparable form (no article, no bracketed part), for "the query IS this term" ranking
  const nameKey = s => qTerms(String(s).replace(/\([^)]*\)/g, ' ')).join(' ');
  const gNames = id => [nameKey(G[id][0]), nameKey(G[id][1]), ...String(G[id][0]).split(/\s+\/\s+/).map(nameKey)];
  const firstUse = {}; UNITS.forEach(u => u.sections.forEach(s => { const t = JSON.stringify(s.blocks); (t.match(/\{([a-z0-9]+)[|}]/g) || []).forEach(m => { const id = m.slice(1, -1); if (!firstUse[id]) firstUse[id] = s.key; }); }));
  function glossary(focus) {
    const f = focus && G[focus] ? focus : '';
    main.innerHTML = `<div class="stack col"><h1 class="title">القاموس</h1><p class="muted" style="margin:0">${Object.keys(G).length} مصطلح. ابحث بالعربي أو بالإنجليزي.</p>
      <div class="nbar"><input type="search" id="gq" placeholder="ابحث: reservoir أو المستودع…" aria-label="بحث في القاموس">${f ? '<button class="btn" id="gall">عرض الكل</button>' : ''}</div><div class="glist" id="gl"></div></div>`;
    const ids = Object.keys(G).sort((a, b) => G[a][0].localeCompare(G[b][0]));
    if (f) $('#gq').value = G[f][0];
    const draw = () => {
      const ts = qTerms($('#gq').value.trim()), q1 = ts.join(' '), nm = id => norm(G[id][0] + ' ' + G[id][1]);
      // exact name first, then names containing the query, then explanations
      const list = ids.filter(id => !ts.length || ts.every(w => norm(G[id].join(' ')).includes(w)))
        .map((id, k) => [id, k, !ts.length ? 0 : gNames(id).includes(q1) ? 0 : ts.every(w => nm(id).includes(w)) ? 1 : 2]).sort((a, b) => a[2] - b[2] || a[1] - b[1]).map(x => x[0]);
      $('#gl').innerHTML = list.map(id => `<div class="gitem ${id === f ? 'hl' : ''}" id="g-${id}"><div class="row1"><span class="en" dir="ltr">${esc(G[id][0])}</span><span class="ar">${esc(G[id][1])}</span></div><div class="small">${esc(G[id][2])}</div>${firstUse[id] ? `<a class="small" href="#s.${firstUse[id]}">↩ <span dir="ltr">${esc(SEC[firstUse[id]].title)}</span></a>` : ''}</div>`).join('') || '<div class="empty">ما فيه نتائج</div>';
    };
    $('#gq').oninput = draw; draw();
    if ($('#gall')) $('#gall').onclick = () => { $('#gq').value = ''; draw(); $('#gq').focus(); };
    if (f) afterRoute = () => { const el = $('#g-' + f); if (el) el.scrollIntoView({ block: 'center' }); };
  }

  /* ---------------- search ---------------- */
  let IDXC = null;
  // block text without keys, flags or ids; glossary markup reduced to its display text
  const flat = v => typeof v === 'string' ? strip(v) : Array.isArray(v) ? v.map(flat).filter(Boolean).join(' · ') : v && typeof v === 'object' ? Object.entries(v).filter(([k]) => !['t', 'id', 'k', 'quiz'].includes(k)).map(([, x]) => flat(x)).filter(Boolean).join(' · ') : '';
  function searchIndex() {
    if (IDXC) return IDXC;
    const IDX = [];
    Object.values(SEC).forEach(s => s.blocks.forEach(b => {
      const extra = b.t === 'order' && ORD[b.id] ? [ORD[b.id].title, ...ORD[b.id].steps] : b.t === 'sort' && SRT[b.id] ? [SRT[b.id].title, ...SRT[b.id].items.map(i => i[0])] : [];
      const x = [flat(b), ...extra.map(strip)].filter(Boolean).join(' · ').trim();
      if (x) IDX.push({ k: 'شرح', t: s.title, x, h: '#s.' + s.key });
    }));
    UNITS.forEach(u => { if (u.objectives && u.objectives.length) IDX.push({ k: 'أهداف', t: u.title, x: u.objectives.map(strip).join(' · '), h: '#u.' + u.id }); });
    RECALL.forEach(r => IDX.push({ k: 'استرجاع', t: SEC[r.sec].title, x: strip(r.q + ' — ' + r.a), h: '#s.' + r.sec }));
    Object.keys(G).forEach(id => IDX.push({ k: 'قاموس', t: G[id][0] + ' · ' + G[id][1], x: G[id][2], h: '#glossary.' + id, names: gNames(id) }));
    ALLQ.forEach(q => IDX.push({ k: q.past ? 'سؤال سابق' : 'سؤال', t: strip(q.q), x: 'Answer: ' + strip(q.o[q.a]) + ' — ' + strip(q.x), h: '#s.' + q.sk }));
    CARDS.forEach(c => IDX.push({ k: 'بطاقة', t: strip(c.f), x: strip(c.b), h: '#s.' + c.sk }));
    NUMS.forEach(x => IDX.push({ k: 'رقم', t: strip(x.v), x: strip(x.what) + ' · ' + x.src, h: '#numbers.' + x.u }));
    CONF.forEach(c => IDX.push({ k: 'لا تخلطها', t: strip(c.title), x: flat([c.head, c.rows, c.note || '']), h: '#confuse.' + c.id }));
    IDX.forEach(r => { r.n = norm(r.t + ' ' + r.x); r.tn = norm(r.t); });
    return (IDXC = IDX);
  }
  // snippet cut from r.x itself, on word boundaries, around the first match
  function snip(x, term) {
    let i = x.toLowerCase().indexOf(term); if (i < 0) i = norm(x).indexOf(term); if (i < 0) i = 0;
    let a = Math.max(0, i - 60); if (a) { const sp = x.indexOf(' ', a); a = sp >= 0 && sp < i ? sp + 1 : a; }
    let e = Math.min(x.length, i + 140); const sp = x.lastIndexOf(' ', e); if (e < x.length && sp > i) e = sp;
    return (a ? '… ' : '') + x.slice(a, e) + (e < x.length ? ' …' : '');
  }
  // one pass over the raw text, escaping each piece: never matches inside <mark> or an entity
  function hl(s, words) {
    const ws = words.filter(w => w.length > 1).sort((a, b) => b.length - a.length); if (!ws.length) return esc(s);
    const re = new RegExp('(' + ws.map(reEsc).join('|') + ')', 'ig');
    return String(s).split(re).map((p, i) => i % 2 ? '<mark>' + esc(p) + '</mark>' : esc(p)).join('');
  }
  function search() {
    main.innerHTML = `<div class="stack col"><h1 class="title">البحث</h1><input type="search" id="sq" placeholder="ابحث في الشرح والقاموس والأسئلة والبطاقات والأرقام…" aria-label="بحث"><div class="stack" id="sr" aria-live="polite"></div></div>`;
    const IDX = searchIndex();
    const draw = () => {
      const raw = $('#sq').value.trim(), terms = qTerms(raw), words = [...new Set([...raw.split(/\s+/), ...terms])].filter(Boolean);
      if (!terms.length) { $('#sr').innerHTML = '<div class="empty">اكتب كلمة للبحث.</div>'; return; }
      // rank: the dictionary entry the query names exactly, then dictionary titles with it, then any title, then the body text
      const q1 = terms.join(' ');
      const hits = IDX.map((r, k) => ({ r, k })).filter(({ r }) => terms.every(w => r.n.includes(w)))
        .map(o => Object.assign(o, { s: o.r.names && o.r.names.includes(q1) ? 0 : terms.every(w => o.r.tn.includes(w)) ? (o.r.k === 'قاموس' ? 1 : 2) : 3 })).sort((a, b) => a.s - b.s || a.k - b.k);
      // several explanation blocks of one section are one result, with a count
      const res = [], grp = {};
      for (const { r } of hits) { if (r.k === 'شرح') { const g = r.h + '|' + r.t; if (grp[g]) { grp[g].more++; continue; } res.push(grp[g] = { r, more: 0 }); } else res.push({ r, more: 0 }); }
      const shown = res.slice(0, 60);
      $('#sr').innerHTML = `<div class="small muted">${res.length} نتيجة${res.length > 60 ? ' (أول 60)' : ''}</div>` + shown.map(({ r, more }) => `<a class="res" href="${r.h}"><span class="row"><span class="pill">${r.k}</span><b dir="auto">${hl(r.t, words)}</b>${more ? `<span class="pill">+${more}</span>` : ''}</span><span class="small" dir="auto">${hl(snip(r.x, terms[0]), words)}</span></a>`).join('');
    };
    $('#sq').oninput = draw; draw(); $('#sq').focus();
  }

  /* ---------------- conflicts & sources ---------------- */
  function conflicts() {
    const A = META.pastAudit || { files: [], differ: [], removed: [], unreadable: [] }, files = A.files || [];
    const tot = files.reduce((a, f) => a + f.total, 0), add = files.reduce((a, f) => a + f.added, 0);
    const missF = new Set(MISSING.map(m => m.file)), other = (A.unreadable || []).filter(f => !missF.has(f));
    main.innerHTML = `<div class="stack col"><h1 class="title">الاختلافات والمصادر</h1>
      <p class="muted" style="margin:0">لما ملفين يختلفون، تلقى الاثنين هنا مع مصدر كل واحد. ما تم اختيار واحد بصمت.</p>
      ${MISSING.length ? `<div class="note warn"><span class="lab">ملفات ما انقرت · مواضيع غير مغطّاة</span><p class="small" style="margin:0 0 6px">هذي ملفات المقرر اللي حجمها 0 بايت. المواضيع اللي ما لها ملف ثاني (الفصل 5 عن السلامة، و <bdi>risk management</bdi> و <bdi>pre-incident</bdi>) مو موجودة في الموقع، فذاكرها من مصدر ثاني.</p>
        <ul class="miss">${MISSING.map(m => `<li><b><bdi>${esc(m.file)}</bdi></b><div class="small">${esc(m.note)}</div></li>`).join('')}</ul></div>` : ''}
      ${(META.conflicts || []).map(c => `<div class="panel stack"><div class="sub" dir="ltr">${esc(c.topic)}</div><div class="grid2" dir="ltr">
        <div class="note"><span class="lab">Source A</span>${md(c.a.text)}<div class="src" style="margin-top:6px;white-space:normal">${esc(c.a.src)}</div></div>
        <div class="note"><span class="lab">Source B</span>${md(c.b.text)}<div class="src" style="margin-top:6px;white-space:normal">${esc(c.b.src)}</div></div></div>
        <div class="small" dir="ltr">${md(c.verdict)}</div></div>`).join('')}
      <h2 class="sub">أسئلة سابقة تختلف مع المحاضرة (ما تنحسب في الدرجة)</h2>
      ${(A.differ || []).map(d => `<div class="qcard"><div class="qmeta"><span class="pill past">${esc(d.file)} · Q${esc(d.n)}</span></div><div class="qtext" dir="ltr">${esc(d.q)}</div><div class="small" dir="ltr">Options: ${d.options.map(esc).join(' · ')}</div>
        <div class="grid2" dir="ltr"><div class="note warn"><span class="lab">Quiz file</span>${esc(d.quiz)}</div><div class="note key"><span class="lab">Lecture</span>${esc(d.lecture)}</div></div></div>`).join('')}
      <h2 class="sub">ملخص أسئلة السنوات السابقة</h2>
      <div class="panel stack"><div class="tscroll"><table class="res-table"><thead><tr><th>الملف</th><th>الكل</th><th>مضاف</th><th>محذوف</th><th>اختلاف</th></tr></thead><tbody>
        ${files.map(f => `<tr><td dir="ltr">${esc(f.file)}</td><td>${+f.total}</td><td>${+f.added}</td><td>${+f.removed}</td><td>${+f.conflict}</td></tr>`).join('')}
        <tr><td><b>المجموع</b></td><td><b>${tot}</b></td><td><b>${add}</b></td><td><b>${files.reduce((a, f) => a + f.removed, 0)}</b></td><td><b>${files.reduce((a, f) => a + f.conflict, 0)}</b></td></tr></tbody></table></div>
        ${files.map(f => `<div class="small" dir="ltr"><b>${esc(f.file)}:</b> ${esc(f.note)}</div>`).join('')}
        <div class="small"><b>محذوف:</b> ${(A.removed || []).map(r => `<div dir="ltr">${esc(r.file)} Q${esc(r.n)}: ${esc(r.q)}. ${esc(r.why)}</div>`).join('')}</div>
        ${other.length ? `<div class="note warn small"><span class="lab">ملفات كويزات وتجميعات ثانية ما انقرت (حجمها 0 بايت)</span><ul class="miss">${other.map(f => `<li dir="auto"><bdi>${esc(f)}</bdi></li>`).join('')}</ul></div>` : ''}</div>
      <h2 class="sub">مصادر الوحدات</h2>
      <div class="panel"><table class="res-table"><tbody>${UNITS.map(u => `<tr><td><span class="unit-n">Ch${u.n}</span></td><td dir="ltr">${esc(u.title)}</td><td><span class="src" style="white-space:normal">${esc(u.file)}</span></td></tr>`).join('')}</tbody></table>
        <p class="small muted">كل المحتوى من هذي الملفات. القاموس العربي ترجمة وشرح مختصر للمصطلحات نفسها. صفحة "ليش الطريقة هذي" في خطوات المذاكرة مضافة ومعلّمة.</p></div></div>`;
  }

  /* ---------------- more (mobile) ---------------- */
  function more() {
    main.innerHTML = `<div class="stack col"><h1 class="title">المزيد</h1><div class="grid2">${NAV.filter(n => !TAB_IDS.includes(n[0])).map(([id, t, ic]) => `<a class="btn morebtn" href="#${id}">${icon(ic)}${t}${navCounts(id) ? ` <span class="pill">${navCounts(id)}</span>` : ''}</a>`).join('')}</div></div>`;
  }

  /* ---------------- settings ---------------- */
  function settings() {
    const sup = window.ReadAloud && ReadAloud.supported;
    main.innerHTML = `<div class="stack col"><h1 class="title">الإعدادات</h1>
      <div class="panel stack"><div class="sub">المظهر</div>
        <div class="row" role="radiogroup" aria-label="الثيم">${[['system', 'حسب الجهاز'], ['light', 'فاتح'], ['dark', 'داكن']].map(([v, t]) => `<button class="btn ${S.set.theme === v ? 'pri' : ''}" data-theme-set="${v}" role="radio" aria-checked="${S.set.theme === v}">${t}</button>`).join('')}</div>
        <label class="small" for="fsr">حجم الخط: <b id="fsv">${+S.set.fs}px</b></label><input type="range" id="fsr" min="14" max="22" step="1" value="${+S.set.fs}"></div>
      <div class="panel stack"><div class="sub">الاستماع</div>
        ${sup ? `<p class="small muted" style="margin:0">زر "استمع" موجود في كل فقرة وفوق كل قسم. السرعة والإيقاف والاستكمال من المشغّل اللي يطلع تحت. جودة الصوت تعتمد على جهازك، وبعض أسماء الأدوية والمصطلحات ممكن ينطقها غلط.</p>
          <label class="small" for="ven">الصوت الإنجليزي</label><select id="ven"></select>
          <label class="small" for="var">الصوت العربي (لزر 🔊 في نافذة المصطلح)</label><select id="var"></select>
          <div id="arhelp"></div>
          <button class="btn" id="vtest">جرّب الصوت</button>` : `<div class="note warn">هذا المتصفح ما يدعم القراءة الصوتية.</div>`}</div>
      <div class="panel stack"><div class="sub">حفظ التقدم</div><p class="small muted" style="margin:0">التقدم محفوظ في هذا المتصفح فقط. انسخ الكود عشان تنقله لجهاز ثاني.</p>
        ${saveFail ? '<div class="note warn small">المتصفح ما يسمح بالحفظ. استخدم "صدّر التقدم" قبل ما تقفل الصفحة.</div>' : ''}
        <div class="row"><button class="btn" id="exp">صدّر التقدم (كود)</button></div><textarea id="expt" readonly hidden aria-label="كود التقدم"></textarea>
        <label class="small" for="impt">استيراد: الصق الكود هنا</label><textarea id="impt"></textarea><div class="row"><button class="btn" id="imp">استورد</button><span id="impm" class="small" role="status"></span></div></div>
      <div class="panel stack"><div class="sub">تصفير</div><p class="small muted" style="margin:0">يمسح كل التقدم في هذا المتصفح.</p><div><button class="btn danger" id="rst">صفّر التقدم</button></div><div id="rstc"></div></div></div>`;
    $$('[data-theme-set]').forEach(b => b.onclick = () => { S.set.theme = b.dataset.themeSet; save(); applySettings(); settings(); });
    $('#fsr').oninput = e => { S.set.fs = +e.target.value; $('#fsv').textContent = S.set.fs + 'px'; applySettings(); save(); };
    if (sup) {
      const fill = () => {
        const en = ReadAloud.voices('en'), ar = ReadAloud.voices('ar');
        $('#ven').innerHTML = `<option value="">تلقائي (أفضل صوت)</option>` + en.map(v => `<option ${v.name === S.set.voiceEn ? 'selected' : ''}>${esc(v.name)}</option>`).join('');
        $('#var').innerHTML = `<option value="">تلقائي</option>` + ar.map(v => `<option ${v.name === S.set.voiceAr ? 'selected' : ''}>${esc(v.name)}</option>`).join('');
        $('#arhelp').innerHTML = ar.length ? `<span class="pill ok">فيه ${ar.length} صوت عربي على جهازك ✓</span>` : `<div class="note warn small"><span class="lab">ما فيه صوت عربي على هذا الجهاز</span>الشرح الإنجليزي يشتغل عادي. لتثبيت صوت عربي:<ul style="margin:6px 0 0;padding-inline-start:1.2em"><li>آيفون/آيباد: الإعدادات ← تسهيلات الاستخدام ← المحتوى المنطوق ← الأصوات ← العربية</li><li>أندرويد: الإعدادات ← اللغة ← تحويل النص إلى كلام ← Google ← ثبّت العربية</li><li>ويندوز: الإعدادات ← الوقت واللغة ← الكلام ← إضافة أصوات</li><li>ماك: إعدادات النظام ← تسهيلات الاستخدام ← المحتوى المنطوق ← صوت النظام</li><li>كروم على الكمبيوتر غالباً فيه صوت "Google العربية" (يحتاج إنترنت)</li></ul></div>`;
      };
      fill(); try { speechSynthesis.addEventListener('voiceschanged', fill); cleanup.push(() => speechSynthesis.removeEventListener('voiceschanged', fill)); } catch (e) { }
      $('#ven').onchange = e => { S.set.voiceEn = e.target.value; save(); try { ReadAloud.setVoice(S.set.voiceEn); } catch (er) { } };
      $('#var').onchange = e => { S.set.voiceAr = e.target.value; save(); };
      $('#vtest').onclick = () => { try { if (window.ReadAloud) ReadAloud.pause(); speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance('Hand hygiene is the most effective way to prevent the spread of infection.'); const v = speechSynthesis.getVoices().find(x => x.name === S.set.voiceEn) || ReadAloud.voices('en')[0]; if (v) u.voice = v; u.lang = v ? v.lang : 'en-US'; speechSynthesis.speak(u); } catch (e) { } };
    }
    $('#exp').onclick = () => { const t = $('#expt'); t.hidden = false; t.value = btoa(unescape(encodeURIComponent(JSON.stringify(S)))); t.select(); try { navigator.clipboard.writeText(t.value).then(() => toast('تم نسخ الكود'), () => { }); } catch (e) { } };
    $('#imp').onclick = () => {
      let o;
      try { o = JSON.parse(decodeURIComponent(escape(atob($('#impt').value.trim())))); if (!o || o.v !== 1) throw 0; }
      catch (e) { $('#impm').textContent = '✗ الكود غير صحيح. تأكد إنك نسخته كامل.'; return; }
      S = clean(o); fixRun(); save(); applySettings(); try { if (window.ReadAloud) ReadAloud.setVoice(S.set.voiceEn); } catch (e) { }
      settings(); $('#impm').textContent = '✓ تم الاستيراد'; renderNav('settings');
    };
    $('#rst').onclick = () => { $('#rstc').innerHTML = `<div class="confirm" role="alertdialog" aria-label="تصفير"><b>متأكد؟ بينمسح كل التقدم وما يرجع.</b><div class="row"><button class="btn danger" id="ry">نعم، صفّر</button><button class="btn" id="rn">إلغاء</button></div></div>`; $('#ry').onclick = () => { const set = S.set; S = blank(); S.set = set; save(); toast('تم التصفير'); go('home'); }; $('#rn').onclick = () => $('#rstc').innerHTML = ''; $('#rn').focus(); };
  }

  /* ---------------- glossary popover ---------------- */
  let pop = null;
  function closePop() { if (pop) { pop.remove(); pop = null; } }
  // Before the answer is visible (a question not yet answered, a card not yet flipped, a hidden recall / think answer,
  // a spot-the-mistake line not yet opened, a table or card set in self-test mode) the popup shows only the term and
  // its Arabic name: the longer Arabic explanation often states the answer.
  function briefPop(el) {
    const qc = el.closest('.qcard');
    if (qc && el.closest('.qtext') && qc.querySelector('.opts') && !qc.querySelector('.opt[disabled]')) return 'الشرح يطلع بعد ما تجاوب';
    const fc = el.closest('.fcard'); if (fc && el.closest('.front') && fc.querySelector('.back').hidden) return 'الشرح يطلع بعد ما تقلب البطاقة';
    const box = el.closest('.recall li, .why'), ans = box && box.querySelector('.ans');
    if (ans && ans.hidden && !el.closest('.ans')) return 'الشرح يطلع بعد ما تكشف الإجابة';
    const mi = el.closest('.mist li'), fx = mi && mi.querySelector('.fix'); if (fx && fx.hidden) return 'الشرح يطلع بعد ما تكشف الإجابة';
    if (el.closest('.testing, .hidel')) return 'الشرح يطلع بعد ما توقف الاختبار الذاتي';
    return '';
  }
  function openPop(el) {
    closePop(); const id = el.dataset.g, g = G[id]; if (!g) return;
    const brief = briefPop(el);
    pop = document.createElement('div'); pop.className = 'pop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', g[0]); pop.lang = 'ar'; pop.dir = 'rtl';
    pop.innerHTML = `<div class="en" dir="ltr">${esc(g[0])}</div><div class="ar">${esc(g[1])}</div>${brief ? `<div class="small muted">${brief}</div>` : `<div class="small">${esc(g[2])}</div>`}<div class="row"><button class="btn sm" data-act="sayar">🔊 انطقها</button>${brief ? '' : `<a class="btn sm ghost" href="#glossary.${id}">القاموس</a>`}<button class="btn sm ghost" data-act="closepop">إغلاق</button></div>`;
    document.body.append(pop);
    // positioned in page coordinates, so it scrolls with its term instead of floating over other content
    const r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    let left = Math.min(Math.max(16, r.left + r.width / 2 - pw / 2), innerWidth - pw - 16), top = r.bottom + 8;
    if (top + ph > innerHeight - 80) top = Math.max(16, r.top - ph - 8);
    pop.style.left = (left + scrollX) + 'px'; pop.style.top = (top + scrollY) + 'px';
    pop.dataset.g = id; if (brief) pop.dataset.brief = '1'; pop.querySelector('.btn').focus({ preventScroll: true });
  }
  function sayAr(id, brief) {
    try {
      const g = G[id]; if (!g) return;
      if (window.ReadAloud) { try { ReadAloud.pause(); } catch (e) { } } // keep a reading session resumable instead of silently dead
      speechSynthesis.cancel();
      const vs = speechSynthesis.getVoices(), ar = vs.find(v => v.name === S.set.voiceAr) || vs.find(v => /^ar/i.test(v.lang)), en = vs.find(v => v.name === S.set.voiceEn) || vs.find(v => /^en/i.test(v.lang));
      const u1 = new SpeechSynthesisUtterance(g[0]); if (en) u1.voice = en; u1.lang = en ? en.lang : 'en-US'; speechSynthesis.speak(u1);
      if (ar) { const u2 = new SpeechSynthesisUtterance(brief ? g[1] : g[1] + '. ' + g[2]); u2.voice = ar; u2.lang = ar.lang; speechSynthesis.speak(u2); } else toast('ما فيه صوت عربي على جهازك. شوف الإعدادات.');
    } catch (e) { }
  }

  /* ---------------- self-test reveal helpers ---------------- */
  const HIDDEN_SEL = '.testing td.h:not(.shown), .testing .hv:not(.shown), .hidel .lbl:not(.shown)';
  const setTab = (els, on) => els.forEach(x => { if (on) { x.setAttribute('tabindex', '0'); x.setAttribute('role', 'button'); } else { x.removeAttribute('tabindex'); x.removeAttribute('role'); } });

  /* ---------------- global delegation ---------------- */
  document.addEventListener('click', e => {
    const t = e.target;
    // a hidden self-test cell: reveal it (and do not open a popup that would give the answer away)
    const hid = t.closest(HIDDEN_SEL); if (hid) { hid.classList.add('shown'); return; }
    const term = t.closest('.term'); if (term) { e.preventDefault(); openPop(term); return; }
    const a = t.closest('[data-act]');
    if (!a) { if (pop && !t.closest('.pop')) closePop(); return; }
    const act = a.dataset.act;
    if (act === 'closepop') closePop();
    else if (act === 'sayar') sayAr(pop && pop.dataset.g, !!(pop && pop.dataset.brief));
    else if (act === 'reveal') { const box = a.closest('.why'), ans = box.querySelector('.ans'); ans.hidden = false; a.remove(); ans.tabIndex = -1; ans.focus({ preventScroll: true }); }
    else if (act === 'testtbl') { const w = a.closest('.tblw'); w.classList.toggle('testing'); const on = w.classList.contains('testing'); $$('td.shown', w).forEach(x => x.classList.remove('shown')); setTab($$('td.h', w), on); a.textContent = on ? 'اكشف كل الخلايا' : 'اخفِ الخلايا واختبر نفسك'; }
    else if (act === 'testcards') { const w = a.closest('.blk'); w.classList.toggle('testing'); const on = w.classList.contains('testing'); $$('.hv.shown', w).forEach(x => x.classList.remove('shown')); setTab($$('.hv', w), on); a.textContent = on ? 'اكشف الكل' : 'اخفِ التفاصيل واختبر نفسك'; }
    else if (act === 'mist') { const f = a.querySelector('.fix'); f.hidden = !f.hidden; }
    else if (act === 'dhide') { const d = a.closest('.diag'); d.classList.toggle('hidel'); const on = d.classList.contains('hidel'); $$('.lbl.shown', d).forEach(x => x.classList.remove('shown')); setTab($$('.lbl', d), on); a.textContent = on ? 'اكشف الأسماء' : 'اخفِ الأسماء واختبر نفسك'; }
    else if (act === 'dmode') { const d = a.closest('.diag'); d.dataset.mode = a.dataset.m; $$('[data-act=dmode]', d).forEach(x => { x.classList.toggle('pri', x === a); x.setAttribute('aria-pressed', String(x === a)); }); }
    else if (act === 'jump') { const el = document.getElementById(a.dataset.to); if (el) el.scrollIntoView({ block: 'start' }); }
    else if (act === 'rec-show' || act === 'rec-hide') {
      const li = a.closest('[data-rid]'), id = li.dataset.rid, r = RECALL.find(x => x.id === id);
      if (act === 'rec-hide') { li.outerHTML = recallItem(id, r, false); const n = $(`[data-rid="${id}"] [data-act=rec-show]`); if (n) n.focus({ preventScroll: true }); }
      else { li.querySelector('.ans').hidden = false; li.querySelector('.rbar').innerHTML = `<span class="small muted">تذكرتها؟</span><button class="btn sm pri" data-act="rec-y">نعم ✓</button><button class="btn sm" data-act="rec-n">لا</button>`; li.querySelector('[data-act=rec-y]').focus({ preventScroll: true }); }
    } else if (act === 'rec-y' || act === 'rec-n') {
      const li = a.closest('[data-rid]'), id = li.dataset.rid; S.rec[id] = act === 'rec-y' ? 2 : 1; save();
      const r = RECALL.find(x => x.id === id); li.outerHTML = recallItem(id, r, true);
      const n = $(`[data-rid="${id}"] [data-act=rec-hide]`); if (n) n.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePop();
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const t = e.target; if (!t || !t.closest) return;
    if (t.matches && t.matches(HIDDEN_SEL)) { e.preventDefault(); t.classList.add('shown'); return; }
    if (t.classList && t.classList.contains('term')) { e.preventDefault(); openPop(t); }
  });

  /* ---------------- boot ---------------- */
  if (window.ReadAloud) {
    ReadAloud.init({ storageKey: 'ems313-ra', lang: 'en', ui: 'ar', skip: '.src, .pill, .tbar, .rbar, .dbar, .lab, .sr-only' });
    try { ReadAloud.setVoice(S.set.voiceEn); } catch (e) { }
  }
  route();
  window.__app = { S: () => S, Q, SEC, UNITS, CARDS, RECALL, ORD, SRT, NUMS, CONF, G, stepStatus, autoLink, mdT };
})();
