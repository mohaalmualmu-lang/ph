/* EMS 313 study site — app logic. DATA is injected by build.mjs. */
(function () {
  'use strict';
  const D = window.DATA;
  const UNITS = D.units, G = D.glossary, META = D.meta;
  const KEY = 'ems313-study-v1';
  document.documentElement.lang = 'ar'; document.documentElement.dir = 'rtl';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const dayNum = s => Math.floor(new Date(s + 'T00:00:00').getTime() / 864e5);
  const addDays = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = (a, b) => b ? Math.round(100 * a / b) : 0;

  /* ---------------- indexes ---------------- */
  const UNIT = {}, SEC = {}, Q = {}, ORD = {}, SRT = {}, CARDS = [], RECALL = [];
  UNITS.forEach(u => {
    UNIT[u.id] = u;
    u.sections.forEach((s, i) => { s.key = u.id + '.' + s.id; s.u = u; s.i = i; SEC[s.key] = s; (s.recall || []).forEach((r, j) => RECALL.push(Object.assign({ id: s.key + '.r' + j, sec: s.key }, r))); });
    u.questions.forEach(q => { q.u = u.id; q.sk = u.id + '.' + q.sec; if (q.a == null) q.a = 0; Q[q.id] = q; });
    (u.orders || []).forEach(o => { o.u = u.id; ORD[o.id] = o; });
    (u.sorts || []).forEach(o => { o.u = u.id; SRT[o.id] = o; });
    u.cards.forEach((c, i) => CARDS.push(Object.assign({ id: u.id + '-k' + i, u: u.id, sk: u.id + '.' + c.sec }, c)));
  });
  const ALLQ = Object.values(Q);
  const secQs = sk => ALLQ.filter(q => q.sk === sk);

  /* ---------------- state ---------------- */
  const blank = () => ({ v: 1, sec: {}, rec: {}, cards: {}, q: {}, mis: {}, exams: [], drill: {}, prac: { n: 0, last: [] }, revDays: [], run: null, set: { theme: 'system', fs: 16, voiceEn: '', voiceAr: '' }, last: '' });
  let S = blank();
  function load() { try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); if (o && o.v === 1) S = Object.assign(blank(), o, { set: Object.assign(blank().set, o.set || {}) }); } } catch (e) { } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  load();
  window.addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });

  function applySettings() {
    const r = document.documentElement;
    if (S.set.theme === 'system') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.set.theme);
    r.style.setProperty('--fs', (S.set.fs || 16) + 'px');
  }
  applySettings();

  /* ---------------- progress helpers ---------------- */
  const secDone = sk => !!(S.sec[sk] && S.sec[sk].done);
  const unitDone = u => u.sections.every(s => secDone(s.key));
  const allSecs = Object.keys(SEC);
  const learnPct = () => pct(allSecs.filter(secDone).length, allSecs.length);
  const cardState = id => S.cards[id] || (S.cards[id] = { c: 0, learned: false, due: '', iv: 0, ef: 2.5, reps: 0, lapses: 0, ld: '' });
  const learnedCount = () => CARDS.filter(c => S.cards[c.id] && S.cards[c.id].learned).length;
  const dueCards = () => CARDS.filter(c => { const s = S.cards[c.id]; return s && s.learned && s.due <= today(); });
  const misList = () => Object.keys(S.mis).filter(id => Q[id]);
  const bestExam = kind => S.exams.filter(e => e.kind === kind).reduce((m, e) => Math.max(m, e.pct), -1);
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
  const strip = s => String(s).replace(/\*\*/g, '').replace(/\{([a-z0-9]+)\|([^}]+)\}/g, '$2').replace(/\{([a-z0-9]+)\}/g, (m, id) => G[id] ? G[id][0] : id);

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
    steps: '<path d="M4 20h4v-5h4v-5h4V5h4"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    diff: '<path d="M8 3v18M16 3v18"/><path d="M3 8h5M16 16h5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'
  };
  const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
  const NAV = [
    ['home', 'المسار', 'route'], ['tools', 'أدوات الترتيب والتصنيف', 'tools'], ['cards', 'البطاقات', 'cards'], ['practice', 'تدريب مخلوط', 'mix'], ['exams', 'الاختبارات', 'exam'],
    ['fix', 'صحّح أخطائي', 'fix'], ['steps', 'خطوات المذاكرة', 'steps'], ['glossary', 'القاموس', 'book'], ['search', 'البحث', 'search'], ['conflicts', 'الاختلافات والمصادر', 'diff'], ['settings', 'الإعدادات', 'gear']];
  const TABS = [['home', 'المسار', 'route'], ['cards', 'البطاقات', 'cards'], ['practice', 'تدريب', 'mix'], ['exams', 'اختبارات', 'exam'], ['more', 'المزيد', 'more']];

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
    const top = route.split('.')[0];
    const cur = ['u', 's'].includes(top) ? 'home' : top;
    $('#rail').innerHTML = NAV.map(([id, t, ic]) => `<a href="#${id}" class="${cur === id ? 'on' : ''}">${icon(ic)}<span>${t}</span><span class="cnt">${navCounts(id)}</span></a>`).join('');
    const moreIds = ['more', 'tools', 'fix', 'steps', 'glossary', 'search', 'conflicts', 'settings'];
    $('#tabs').innerHTML = TABS.map(([id, t, ic]) => `<a href="#${id}" class="${(id === 'more' ? moreIds.includes(cur) : cur === id) ? 'on' : ''}">${icon(ic)}<span>${t}</span></a>`).join('');
    $('#gbar').style.width = overall() + '%';
  }

  /* ---------------- router ---------------- */
  let cleanup = [];
  function route() {
    cleanup.forEach(f => { try { f(); } catch (e) { } }); cleanup = [];
    closePop();
    const r = (location.hash || '#home').slice(1) || 'home';
    const [a, b, c] = r.split('.');
    renderNav(r);
    const V = { home, tools, cards: cardsView, practice, exams, fix, steps, glossary, search, conflicts, settings, more, run: runView };
    if (a === 'u' && UNIT[b]) unitView(UNIT[b]);
    else if (a === 's' && SEC[b + '.' + c]) secView(SEC[b + '.' + c]);
    else if (V[a]) V[a]();
    else home();
    if (a === 's') { S.last = r; save(); }
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  const go = h => { if (location.hash === '#' + h) route(); else location.hash = h; };

  /* ---------------- toast ---------------- */
  let toastT;
  function toast(msg) { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); } t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2600); }

  /* ---------------- home / route ---------------- */
  function nextSection() { for (const k of allSecs) if (!secDone(k)) return SEC[k]; return null; }
  function home() {
    const ov = overall(), ns = nextSection(), st = stepStatus(), cur = st.find(x => !x.done);
    const resume = S.last && SEC[S.last.slice(2)] && !secDone(S.last.slice(2)) ? SEC[S.last.slice(2)] : ns;
    main.innerHTML = `<div class="stack">
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
      <h2 class="sub">الوحدات</h2>
      ${UNITS.map(u => unitCard(u)).join('')}
    </div>`;
  }
  function unitCard(u, open = true) {
    const done = u.sections.filter(s => secDone(s.key)).length, be = bestExam('unit:' + u.id);
    return `<section class="unit"><div class="unit-h"><span class="unit-n">Ch${u.n}</span><div class="t"><h3 dir="ltr">${esc(u.title)}</h3>
      <div class="small muted">${esc(u.ar)} · <span class="src">${esc(u.file)}</span></div>
      <div class="row small" style="margin-top:6px"><span>${done}/${u.sections.length} أقسام</span>${be >= 0 ? `<span class="pill ${be >= 80 ? 'ok' : ''}">أفضل نتيجة اختبار الوحدة: ${be}%</span>` : ''}
      <a class="btn sm ghost" href="#exams">اختبار الوحدة</a></div>
      <div class="meter" style="margin-top:8px"><i style="width:${pct(done, u.sections.length)}%"></i></div></div></div>
      ${open ? `<ol class="seclist">${u.sections.map(s => `<li><a href="#s.${s.key}"><span class="chk ${secDone(s.key) ? 'on' : ''}" aria-label="${secDone(s.key) ? 'مكتمل' : 'غير مكتمل'}">✓</span><span class="nm" dir="ltr">${esc(s.title)}</span><span class="src">${esc(s.src)}</span></a></li>`).join('')}</ol>` : ''}</section>`;
  }
  function unitView(u) {
    const obj = u.objectives && u.objectives.length ? `<details class="panel" open><summary class="sub">أهداف الوحدة (Learning objectives) <span class="src" dir="ltr">${esc(u.objSrc || '')}</span></summary><ol dir="ltr" lang="en" class="small" style="margin:8px 0 0;padding-inline-start:1.3em">${u.objectives.map(o => `<li>${md(o)}</li>`).join('')}</ol></details>` : '';
    main.innerHTML = `<div class="stack col">${unitCard(u)}${obj}</div>`;
  }

  /* ---------------- section view ---------------- */
  function secView(s) {
    const u = s.u, idx = allSecs.indexOf(s.key), prev = SEC[allSecs[idx - 1]], next = SEC[allSecs[idx + 1]];
    main.innerHTML = `<article class="col">
      <div class="crumbs"><a href="#home">المسار</a> › <span>Ch${u.n} · <span dir="ltr">${esc(u.title)}</span></span></div>
      <header class="sec-h"><div class="row"><span class="pill">القسم ${s.i + 1} من ${u.sections.length}</span><span class="src" title="المصدر">${esc(u.file)} · ${esc(s.src)}</span>${secDone(s.key) ? '<span class="pill ok">✓ مكتمل</span>' : ''}</div>
        <h1 dir="ltr">${esc(s.title)}</h1>
        <div class="lrow" id="seclisten"></div></header>
      <div class="content" dir="ltr" lang="en" id="secbody">${s.blocks.map((b, i) => block(b, s.key + '.b' + i)).join('')}</div>
      <section class="stack" style="margin-top:26px">
        <h2 class="sub">استرجع قبل ما تراجع</h2>
        <p class="muted small" style="margin:0">حاول تتذكر الإجابة في بالك أو بصوت عالي، بعدين اكشفها وقيّم نفسك.</p>
        <ul class="recall" dir="ltr">${(s.recall || []).map((r, j) => recallItem(s.key + '.r' + j, r)).join('')}</ul>
      </section>
      <section class="stack" style="margin-top:26px" id="squiz"></section>
      <nav class="row" style="justify-content:space-between;margin-top:26px">
        ${prev ? `<a class="btn" href="#s.${prev.key}">→ السابق</a>` : '<span></span>'}
        ${next ? `<a class="btn pri" href="#s.${next.key}">التالي ←</a>` : `<a class="btn pri" href="#exams">الاختبارات ←</a>`}
      </nav></article>`;
    mountWidgets(main);
    sectionQuiz(s);
    // listen controls
    if (window.ReadAloud && ReadAloud.supported) {
      const body = $('#secbody');
      const b = listenBtn(body, 'استمع للقسم كامل');
      $('#seclisten').append(b);
      $$('.blk[data-read]', body).forEach(el => { const lb = listenBtn(el); if (lb) el.append(lb); });
    }
  }
  function listenBtn(el, label) {
    const b = ReadAloud.button(el); if (!b) return null;
    b.addEventListener('click', () => { const ar = /[؀-ۿ]/.test((el.textContent || '').slice(0, 200)) && el.closest('[lang=ar]'); try { ReadAloud.setVoice(ar ? S.set.voiceAr : S.set.voiceEn); } catch (e) { } }, true);
    if (label) { const l = b.querySelector('.ra-lbl'); if (l) l.textContent = label; }
    return b;
  }

  function block(b, id) {
    const R = ' data-read="1"';
    switch (b.t) {
      case 'p': return `<div class="blk"${R}><p>${md(b.x)}</p></div>`;
      case 'h': return `<h3 class="bh">${md(b.x)}</h3>`;
      case 'ul': case 'ol': return `<div class="blk"${R}><${b.t}>${b.items.map(i => `<li>${md(i)}</li>`).join('')}</${b.t}></div>`;
      case 'note': { const L = { key: 'Key point · نقطة مهمة', warn: 'Caution · انتبه', ems: 'EMS example · مثال إسعافي', conflict: 'Sources differ · اختلاف بين المصادر', added: 'Note on sources · ملاحظة' }; return `<div class="blk note ${b.k}"${R}><span class="lab">${L[b.k]}</span>${md(b.x)}</div>`; }
      case 'stat': return `<div class="blk statbig"${R}><b>${esc(b.n)}</b><span>${md(b.x)}</span></div>`;
      case 'table': {
        const head = `<tr>${b.head.map(x => `<th>${md(x)}</th>`).join('')}</tr>`;
        const rows = b.rows.map(r => `<tr>${r.map((c, j) => `<td class="${b.quiz && j > 0 ? 'h' : ''}">${md(c)}</td>`).join('')}</tr>`).join('');
        return `<div class="blk tblw" id="${id}"${R}>${b.quiz ? `<div class="tbar"><span class="small muted" lang="ar" dir="rtl">جدول</span><button class="btn sm" data-act="testtbl" lang="ar">اخفِ الخلايا واختبر نفسك</button></div>` : ''}<table>${b.cap ? `<caption>${md(b.cap)}</caption>` : ''}<thead>${head}</thead><tbody>${rows}</tbody></table></div>`;
      }
      case 'twocol': return `<div class="blk twocol"${R}>${[b.a, b.b].map(c => `<div><h4>${md(c.h)}</h4><ul>${c.items.map(i => `<li>${md(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
      case 'chain': return `<div class="blk flow" aria-label="cause and effect">${b.items.map(i => `<span>${md(i)}</span>`).join('<em>→</em>')}</div>`;
      case 'case': return `<div class="why case" data-read="1"><div class="eyebrow" lang="ar" dir="rtl">سيناريو إسعافي</div><div class="q">${md(b.title)}</div><p style="margin:6px 0 0">${md(b.x)}</p><p style="margin:6px 0 0"><b>${md(b.q)}</b></p><div class="ans" hidden>${md(b.a)}</div><div class="rbar" lang="ar" dir="rtl"><button class="btn sm" data-act="reveal">فكّر ثم اكشف الإجابة</button>${b.src ? `<span class="src" dir="ltr">${esc(b.src)}</span>` : ''}</div></div>`;
      case 'why': return `<div class="why"><div class="q">Why? · ${md(b.q)}</div><div class="ans" hidden>${md(b.a)}</div><div class="rbar"><button class="btn sm" data-act="reveal" lang="ar">فكّر ثم اكشف الإجابة</button></div></div>`;
      case 'svg': return `<div class="diag" data-w="svg" data-id="${b.id}"></div>`;
      case 'order': return `<div class="widget" data-w="order" data-id="${b.id}"></div>`;
      case 'sort': return `<div class="widget" data-w="sort" data-id="${b.id}"></div>`;
      case 'mistakes': return `<div class="widget"><div class="wt"><h4>Spot the mistake</h4></div><p style="margin:0">${md(b.intro)}</p><ul class="mist">${b.lines.map(l => `<li><button data-act="mist"><span>${md(l[0])}</span><div class="fix" hidden>✗ ${md(l[2])}</div></button></li>`).join('')}</ul><p class="small muted" style="margin:0" lang="ar" dir="rtl">الشرائح ما فيها الإجابات؛ التصحيحات مأخوذة من شرائح نفس المحاضرة.</p></div>`;
      case 'dcards': return `<div class="blk" id="${id}"><div class="tbar" style="padding:0 0 8px"><span></span><button class="btn sm" data-act="testcards" lang="ar">اخفِ التفاصيل واختبر نفسك</button></div><div class="dcards">${b.items.map(c => `<div class="dcard" data-read="1"><h4>${md(c.name)}</h4><dl>
          <dt>Agent</dt><dd class="hv">${md(c.agent)}</dd><dt>Clue</dt><dd class="hv">${md(c.clue)}</dd><dt>Spread</dt><dd class="hv">${md(c.spread)}</dd>
          <dt>Precaution</dt><dd class="hv">${md(c.prec)}</dd><dt>Vaccine</dt><dd class="hv">${md(c.vaccine)}</dd></dl><p class="small" style="margin:0">${md(c.note)}</p><span class="src">${esc(c.src)}</span></div>`).join('')}</div></div>`;
      default: return '';
    }
  }
  function recallItem(id, r) {
    const st = S.rec[id];
    return `<li data-rid="${id}"><div class="q">${md(r.q)}</div><div class="ans" ${st ? '' : 'hidden'}>${md(r.a)}</div>
      <div class="rbar" lang="ar" dir="rtl">${st ? `<span class="pill ${st === 2 ? 'ok' : ''}">${st === 2 ? 'تذكرتها ✓' : 'راجعها مرة ثانية'}</span><button class="btn sm ghost" data-act="rec-hide">اخفِ وجرّب مرة ثانية</button>` : `<button class="btn sm" data-act="rec-show">اكشف الإجابة</button>`}</div></li>`;
  }

  /* ---------------- widgets ---------------- */
  function mountWidgets(root) {
    $$('[data-w="svg"]', root).forEach(el => {
      const d = DIAGRAMS[el.dataset.id](); el.dataset.mode = d.modes ? d.modes[0][0] : '';
      el.innerHTML = `<div class="dbar" dir="rtl" lang="ar">${d.modes ? d.modes.map(([m, t], i) => `<button class="btn sm ${i === 0 ? 'pri' : ''}" data-act="dmode" data-m="${m}" dir="ltr">${t}</button>`).join('') : ''}<button class="btn sm" data-act="dhide">اخفِ الأسماء واختبر نفسك</button></div>${d.svg}`;
    });
    $$('[data-w="order"]', root).forEach(mountOrder);
    $$('[data-w="sort"]', root).forEach(mountSort);
  }
  function mountOrder(el) {
    const o = ORD[el.dataset.id]; if (!o) return;
    let pool = shuffle(o.steps.map((t, i) => i)); while (o.steps.length > 1 && pool.every((v, i) => v === i)) pool = shuffle(pool);
    let ans = [], checked = false;
    const draw = () => {
      el.innerHTML = `<div class="wt"><h4>${esc(o.title)}</h4>${S.drill[o.id] ? '<span class="pill ok" lang="ar">✓ أتقنته</span>' : ''}<span class="src">${esc(o.src)}</span></div>
        <p class="small muted" style="margin:0" lang="ar" dir="rtl">رتّب الخطوات: اضغط الخطوات بالترتيب الصحيح. اضغط خطوة في القائمة عشان تشيلها.</p>
        <div class="chips">${pool.filter(i => !ans.includes(i)).map(i => `<button class="chip" data-i="${i}">${esc(o.steps[i])}</button>`).join('') || '<span class="small muted" lang="ar">كل الخطوات مختارة</span>'}</div>
        <ol class="olist">${ans.map((i, k) => `<li data-k="${k}" class="${checked ? (i === k ? 'ok' : 'no') : ''}">${esc(o.steps[i])}</li>`).join('')}</ol>
        <div class="row" lang="ar" dir="rtl"><button class="btn sm pri" data-c="check" ${ans.length < o.steps.length ? 'disabled' : ''}>تحقق</button><button class="btn sm" data-c="reset">إعادة</button><span class="fb" id="fb-${o.id}"></span></div>`;
    };
    draw();
    el.addEventListener('click', e => {
      const c = e.target.closest('.chip'), li = e.target.closest('.olist li'), btn = e.target.closest('[data-c]');
      if (c) { ans.push(+c.dataset.i); checked = false; draw(); }
      else if (li && !checked) { ans.splice(+li.dataset.k, 1); draw(); }
      else if (btn && btn.dataset.c === 'reset') { ans = []; checked = false; pool = shuffle(pool); draw(); }
      else if (btn && btn.dataset.c === 'check') {
        checked = true; const ok = ans.every((v, k) => v === k); draw();
        const fb = $('#fb-' + o.id, el);
        if (ok) { S.drill[o.id] = 1; save(); fb.className = 'fb ok'; fb.textContent = 'صح! الترتيب كامل ✓'; renderNav(location.hash.slice(1)); }
        else { const n = ans.filter((v, k) => v === k).length; fb.className = 'fb no'; fb.textContent = `${n} من ${o.steps.length} في مكانها. اضغط "إعادة" وجرّب.`; }
      }
    });
  }
  function mountSort(el) {
    const o = SRT[el.dataset.id]; if (!o) return;
    let items = shuffle(o.items.map((x, i) => i)), picks = {};
    const draw = () => {
      const done = Object.keys(picks).length, right = Object.entries(picks).filter(([i, c]) => o.items[i][1] === c).length;
      el.innerHTML = `<div class="wt"><h4>${esc(o.title)}</h4>${S.drill[o.id] ? '<span class="pill ok" lang="ar">✓ أتقنته</span>' : ''}<span class="src">${esc(o.src)}</span></div>
        <p class="small muted" style="margin:0" lang="ar" dir="rtl">صنّف كل عنصر. التصحيح فوري.</p>
        <div class="srt">${items.map(i => { const p = picks[i], ok = p != null && o.items[i][1] === p; return `<div class="it ${p == null ? '' : ok ? 'ok' : 'no'}" data-i="${i}"><span class="nm">${esc(o.items[i][0])}</span>
          <div class="cats">${o.cats.map((c, ci) => `<button data-ci="${ci}" class="${p === ci ? 'pick' : ''}" ${p != null ? 'disabled' : ''}>${esc(c)}</button>`).join('')}</div>
          ${p != null && !ok ? `<span class="fb no">✗ الصحيح: ${esc(o.cats[o.items[i][1]])}</span>` : p != null ? '<span class="fb ok">✓ صح</span>' : ''}</div>`; }).join('')}</div>
        <div class="row" lang="ar" dir="rtl"><span class="fb">${done}/${o.items.length} · صح ${right}</span><button class="btn sm" data-c="reset">إعادة</button></div>`;
      if (done === o.items.length && right === done && !S.drill[o.id]) { S.drill[o.id] = 1; save(); toast('ممتاز! كل التصنيفات صح ✓'); setTimeout(draw, 0); renderNav(location.hash.slice(1)); }
    };
    draw();
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-ci]'), r = e.target.closest('[data-c]');
      if (b) { const i = +b.closest('.it').dataset.i; if (picks[i] == null) { picks[i] = +b.dataset.ci; draw(); } }
      else if (r) { picks = {}; items = shuffle(items); draw(); }
    });
  }

  /* ---------------- question card ---------------- */
  const LET = 'ABCDEFG';
  function optOrder(q) { const idx = q.o.map((x, i) => i); return q.fix ? idx : shuffle(idx); }
  function qMeta(q) {
    const u = UNIT[q.u];
    return `<div class="qmeta" lang="ar" dir="rtl"><span class="pill">Ch${u.n}</span><span class="src" dir="ltr">${esc(q.src)}</span>${q.past ? `<span class="pill past">سؤال سابق · ${esc(q.past.file.replace(/\.pdf$/, ''))} · Q${q.past.n}</span>` : ''}${q.past && q.past.edit ? `<span class="pill edit" title="${esc(q.past.edit)}">معدّل</span>` : ''}</div>`;
  }
  function explHTML(q, chosen) {
    const ok = chosen === q.a;
    return `<div class="expl"><b class="${ok ? 'ok' : 'no'}">${ok ? '✓ Correct.' : '✗ Not quite.'}</b> ${ok ? '' : `Correct answer: <b>${md(q.o[q.a])}</b>. `}${md(q.x)}${q.past && q.past.edit ? `<div class="small" style="margin-top:6px" lang="ar" dir="rtl">ملاحظة: <span dir="ltr">${esc(q.past.edit)}</span></div>` : ''}
      <div class="small" style="margin-top:6px"><a href="#s.${q.sk}">↩ ${esc(SEC[q.sk].title)}</a></div></div>`;
  }
  // instant-feedback question. onDone(correct)
  function instantQ(container, q, onDone, numLabel) {
    const order = optOrder(q);
    container.innerHTML = `<div class="qcard" data-qid="${q.id}">${qMeta(q)}${numLabel ? `<div class="small muted" lang="ar">${numLabel}</div>` : ''}<div class="qtext" dir="ltr">${md(q.q)}</div>
      <div class="opts" dir="ltr">${order.map((oi, k) => `<button class="opt" data-oi="${oi}"><span class="k">${LET[k]}</span><span>${md(q.o[oi])}</span></button>`).join('')}</div><div class="fbx" dir="ltr"></div></div>`;
    container.querySelector('.opts').addEventListener('click', e => {
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
  function sectionQuiz(s) {
    const box = $('#squiz'), pool = secQs(s.key);
    const intro = () => {
      const st = S.sec[s.key];
      box.innerHTML = `<h2 class="sub">اختبر نفسك في هذا القسم</h2>
        <p class="muted small" style="margin:0">${Math.min(5, pool.length)} أسئلة عشوائية من ${pool.length} سؤال لهذا القسم. القسم يكتمل ✓ إذا جبت 80% أو أكثر.</p>
        ${st && st.best != null ? `<div class="small">أفضل نتيجة: <b>${st.best}%</b>${st.done ? ' · <span class="pill ok">✓ مكتمل</span>' : ''}</div>` : ''}
        <div><button class="btn pri" id="sqstart">${st ? 'جرّب مرة ثانية' : 'ابدأ أسئلة القسم'}</button></div>`;
      $('#sqstart').onclick = start;
    };
    const start = () => {
      const qs = shuffle(pool).slice(0, Math.min(5, pool.length)); let i = 0, right = 0;
      const step = () => {
        box.innerHTML = `<h2 class="sub">أسئلة القسم</h2><div id="sqq"></div><div class="row" id="sqnav"></div>`;
        instantQ($('#sqq'), qs[i], ok => { if (ok) right++; $('#sqnav').innerHTML = `<button class="btn pri" id="sqnext">${i + 1 < qs.length ? 'السؤال التالي' : 'شوف النتيجة'}</button>`; $('#sqnext').onclick = () => { i++; i < qs.length ? step() : finish(); }; $('#sqnext').focus(); }, `سؤال ${i + 1} من ${qs.length}`);
      };
      const finish = () => {
        const p = pct(right, qs.length), st = S.sec[s.key] || (S.sec[s.key] = {});
        st.best = Math.max(st.best || 0, p); st.at = Date.now(); if (p >= 80) st.done = true; save(); renderNav(location.hash.slice(1));
        const idx = allSecs.indexOf(s.key), next = SEC[allSecs[idx + 1]];
        box.innerHTML = `<div class="panel stack"><div class="sub">${p >= 80 ? '✓ ممتاز! القسم مكتمل' : 'قريب! تحتاج 80%'}</div><div>نتيجتك: <b>${right}/${qs.length}</b> (${p}%)</div>
          <div class="row"><button class="btn" id="sqagain">أعد الأسئلة</button>${next ? `<a class="btn pri" href="#s.${next.key}">القسم التالي</a>` : `<a class="btn pri" href="#exams">الاختبارات</a>`}</div></div>`;
        $('#sqagain').onclick = start;
        if (p >= 80) toast('✓ القسم مكتمل');
      };
      step();
    };
    if (!pool.length) { box.innerHTML = ''; return; }
    intro();
  }

  /* ---------------- tools page ---------------- */
  function tools() {
    main.innerHTML = `<div class="stack col"><h1 class="title">أدوات الترتيب والتصنيف</h1>
      <p class="muted" style="margin:0">رتّب الإجراءات بنفسك، وصنّف الحالات. هذي نفس الأدوات الموجودة داخل الأقسام، مجمّعة هنا للمراجعة.</p>
      ${UNITS.map(u => `<h2 class="sub">Ch${u.n} · <span dir="ltr">${esc(u.title)}</span></h2><div class="stack" dir="ltr" lang="en">${[...(u.orders || []).map(o => `<div class="widget" data-w="order" data-id="${o.id}"></div>`), ...(u.sorts || []).map(o => `<div class="widget" data-w="sort" data-id="${o.id}"></div>`)].join('')}</div>`).join('')}</div>`;
    mountWidgets(main);
  }

  /* ---------------- flashcards ---------------- */
  function cardsView() {
    const due = dueCards().length, learning = CARDS.filter(c => !(S.cards[c.id] && S.cards[c.id].learned)).length;
    main.innerHTML = `<div class="stack col"><h1 class="title">البطاقات</h1>
      <div class="panel stack"><div class="row"><b>طريقة الإتقان:</b><span class="muted small">كل بطاقة تحتاج 3 إجابات صحيحة عشان تصير "متقنة"، وبعدها ترجع لك في أيام جديدة بنظام التكرار المتباعد.</span></div>
        <div class="stats"><div class="stat"><b>${learnedCount()}/${CARDS.length}</b><span class="small muted">متقنة</span></div><div class="stat"><b>${due}</b><span class="small muted">مستحقة اليوم</span></div><div class="stat"><b>${new Set(S.revDays).size}</b><span class="small muted">أيام مراجعة</span></div></div></div>
      <div class="grid2">
        <div class="panel stack"><div class="sub">١. تعلّم (إتقان)</div><p class="small muted" style="margin:0">البطاقات اللي ما أتقنتها. تتكرر في نفس الجلسة لين تجاوبها صح 3 مرات.</p>
          <label class="small" for="cu">الوحدة</label><select id="cu"><option value="">كل الوحدات</option>${UNITS.map(u => `<option value="${u.id}">Ch${u.n} · ${esc(u.title)}</option>`).join('')}</select>
          <button class="btn pri" id="cl" ${learning ? '' : 'disabled'}>ابدأ (${learning} بطاقة)</button></div>
        <div class="panel stack"><div class="sub">٢. مراجعة المستحق اليوم</div><p class="small muted" style="margin:0">جلسات الإعادة في أيام جديدة. قيّم نفسك: نسيت / صعبة / جيدة / سهلة.</p><button class="btn pri" id="cr" ${due ? '' : 'disabled'}>راجع (${due})</button></div>
        <div class="panel stack"><div class="sub">٣. مراجعة حرة</div><p class="small muted" style="margin:0">أي بطاقات بترتيب عشوائي، وتقييمك يحدّث جدول التكرار المتباعد.</p>
          <select id="cf"><option value="">كل الوحدات</option>${UNITS.map(u => `<option value="${u.id}">Ch${u.n}</option>`).join('')}</select><button class="btn" id="cfree">ابدأ مراجعة حرة</button></div>
      </div><div id="cbox"></div></div>`;
    $('#cl').onclick = () => cardSession('learn', $('#cu').value);
    $('#cr').onclick = () => cardSession('review');
    $('#cfree').onclick = () => cardSession('free', $('#cf').value);
  }
  function srs(id, grade) { // grade 0 again,1 hard,2 good,3 easy
    const s = cardState(id), t = today();
    if (grade === 0) { s.iv = 1; s.ef = Math.max(1.3, s.ef - .2); s.lapses++; }
    else if (grade === 1) { s.iv = Math.max(1, Math.round((s.iv || 1) * 1.2)); s.ef = Math.max(1.3, s.ef - .15); }
    else if (grade === 2) { s.iv = s.reps ? Math.max(2, Math.round((s.iv || 1) * s.ef)) : 1; }
    else { s.iv = s.reps ? Math.max(3, Math.round((s.iv || 1) * s.ef * 1.3)) : 3; s.ef += .15; }
    s.reps++; s.due = addDays(t, s.iv);
    if (s.ld && s.ld < t && !S.revDays.includes(t)) S.revDays.push(t);
  }
  function cardSession(mode, unit) {
    let deck = mode === 'learn' ? CARDS.filter(c => (!unit || c.u === unit) && !(S.cards[c.id] && S.cards[c.id].learned))
      : mode === 'review' ? dueCards() : CARDS.filter(c => !unit || c.u === unit);
    deck = shuffle(deck); if (mode === 'learn') deck = deck.slice(0, 20);
    let queue = deck.slice(), done = 0;
    const box = $('#cbox');
    const show = () => {
      if (!queue.length) { box.innerHTML = `<div class="panel stack"><div class="sub">✓ خلصت الجلسة</div><div class="muted">${mode === 'learn' ? `أتقنت ${done} بطاقة في هذي الجلسة.` : `راجعت ${done} بطاقة.`}</div><button class="btn pri" onclick="location.hash='#cards'">رجوع للبطاقات</button></div>`; renderNav('cards'); return; }
      const c = queue[0], st = cardState(c.id), u = UNIT[c.u];
      box.innerHTML = `<div class="stack"><div class="row small muted"><span>باقي ${queue.length}</span><span class="pill">Ch${u.n}</span><a href="#s.${c.sk}" class="small">القسم</a>${mode === 'learn' ? `<span>صح: <span class="dots3">${[0, 1, 2].map(k => `<i class="${k < st.c ? 'on' : ''}"></i>`).join('')}</span></span>` : ''}</div>
        <div class="fcard" id="fc" tabindex="0" role="button" aria-label="اقلب البطاقة" dir="ltr"><div class="front">${md(c.f)}</div><div class="back" hidden>${md(c.b)}</div><div class="small muted" id="fch" lang="ar" dir="rtl">حاول تتذكر، ثم اضغط عشان تقلب البطاقة</div></div>
        <div id="gr"></div></div>`;
      const flip = () => {
        const back = $('#fc .back'); if (!back.hidden) return; back.hidden = false; $('#fch').hidden = true;
        $('#gr').innerHTML = mode === 'learn'
          ? `<div class="grade"><button class="btn danger" data-g="0">ما عرفتها ✗</button><button class="btn pri" data-g="1">عرفتها ✓</button></div>`
          : `<div class="grade"><button class="btn danger" data-g="0">نسيت</button><button class="btn" data-g="1">صعبة</button><button class="btn pri" data-g="2">جيدة</button><button class="btn" data-g="3">سهلة</button></div>`;
        $('#gr').onclick = e => { const b = e.target.closest('[data-g]'); if (!b) return; grade(+b.dataset.g); };
      };
      $('#fc').onclick = flip; $('#fc').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } };
      const grade = g => {
        const s = cardState(c.id); queue.shift();
        if (mode === 'learn') {
          if (g === 1) s.c = Math.min(3, s.c + 1); else s.c = Math.max(0, s.c - 1);
          if (s.c >= 3) { s.learned = true; s.ld = today(); s.iv = 1; s.due = addDays(today(), 1); done++; }
          else queue.splice(Math.min(queue.length, 2 + Math.floor(Math.random() * 3)), 0, c);
        } else { if (s.learned || mode === 'review') srs(c.id, g); else { if (g >= 2) s.c = Math.min(3, s.c + 1); if (s.c >= 3) { s.learned = true; s.ld = today(); s.iv = 1; s.due = addDays(today(), 1); } } done++; }
        save(); show();
      };
    };
    show();
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------------- practice (interleaved) ---------------- */
  function practice() {
    main.innerHTML = `<div class="stack col"><h1 class="title">تدريب مخلوط</h1>
      <p class="muted" style="margin:0">أسئلة عشوائية من كل الوحدات مخلوطة، مع تصحيح فوري. الخلط يدرّبك تميّز نوع السؤال مثل الاختبار الحقيقي. الأسئلة اللي غلطت فيها أو ما شفتها تطلع أكثر.</p>
      <div class="row small" id="pstat"></div>
      <details class="panel"><summary class="small">اختر الوحدات</summary><div class="row" style="margin-top:8px">${UNITS.map(u => `<label class="row small"><input type="checkbox" class="pu" value="${u.id}" checked> Ch${u.n}</label>`).join('')}</div></details>
      <div id="pq"></div><div class="row" id="pnav"></div></div>`;
    const stat = () => { const l = S.prac.last.slice(-30); $('#pstat').innerHTML = `<span class="pill">جاوبت ${S.prac.n} سؤال</span><span class="pill ${l.length >= 30 && pct(l.filter(Boolean).length, l.length) >= 80 ? 'ok' : ''}">دقة آخر ${l.length}: ${pct(l.filter(Boolean).length, l.length)}%</span>`; };
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
      instantQ($('#pq'), q, ok => { S.prac.n++; S.prac.last.push(ok ? 1 : 0); if (S.prac.last.length > 100) S.prac.last.shift(); save(); stat(); $('#pnav').innerHTML = `<button class="btn pri" id="pnext">السؤال التالي</button>`; $('#pnext').onclick = next; $('#pnext').focus(); });
    };
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
        $('#fnav').innerHTML = `<button class="btn pri" id="fnext">التالي</button>`; $('#fnext').onclick = next; $('#fnext').focus();
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
        <p class="small muted" style="margin:0">كل الأسئلة الموجودة (<b>${ALLQ.length}</b> سؤال، منها ${ALLQ.filter(q => q.past).length} سؤال سابق)، بدون ما ينقص ولا سؤال. تقدر تحدد الوحدات، وتقدر توقف وتكمل بعدين لأن تقدمك ينحفظ.</p>
        <div class="row">${UNITS.map(u => `<label class="row small"><input type="checkbox" class="au" value="${u.id}" checked> Ch${u.n} (${u.questions.length})</label>`).join('')}</div>
        <div class="grid2"><div><label class="small" for="aord">الترتيب</label><select id="aord"><option value="mix">عشوائي مخلوط من كل الوحدات</option><option value="unit">وحدة وحدة بالترتيب</option></select></div>
          <div><label class="small" for="afb">التصحيح</label><select id="afb"><option value="now">فوري بعد كل سؤال</option><option value="end">في النهاية</option></select></div>
          <div><label class="small" for="atm">المؤقت</label><select id="atm"><option value="0">بدون مؤقت</option><option value="1">دقيقة لكل سؤال</option></select></div></div>
        <div class="row"><button class="btn pri" data-ex="all">ابدأ الاختبار الشامل</button>${bestExam('all') >= 0 ? `<span class="pill ${bestExam('all') >= 85 ? 'ok' : ''}">أفضل ${bestExam('all')}%</span>` : ''}</div></div>
      <div class="panel stack"><div class="sub">اختبار كل وحدة</div><p class="small muted" style="margin:0">20 سؤال عشوائي من الوحدة (أو كل أسئلتها إذا أقل)، بدون مؤقت، والتصحيح في النهاية.</p>
        <div class="stack">${UNITS.map(u => { const be = bestExam('unit:' + u.id); const n = u.questions.length; return `<div class="row"><button class="btn" data-ex="unit" data-u="${u.id}">Ch${u.n} · <span dir="ltr">${esc(u.title)}</span></button><span class="small muted">${Math.min(20, n)} من ${n}</span>${be >= 0 ? `<span class="pill ${be >= 80 ? 'ok' : ''}">أفضل ${be}%</span>` : ''}</div>`; }).join('')}</div></div>
      <div class="panel stack"><div class="sub">الاختبار النهائي (بمؤقت)</div><p class="small muted" style="margin:0">أسئلة من كل الوحدات بنسبة حجم كل وحدة، بمؤقت دقيقة لكل سؤال، والتصحيح في النهاية مع نتيجة لكل وحدة.</p>
        <div class="row"><label class="small" for="fn">عدد الأسئلة</label><select id="fn" style="width:auto"><option>30</option><option selected>50</option><option>80</option></select>
        <label class="row small"><input type="checkbox" id="fnb"> بدون رجوع للسؤال السابق (مثل اختبار البلاك بورد)</label></div>
        <div><button class="btn pri" data-ex="final">ابدأ الاختبار النهائي</button>${bestExam('final') >= 0 ? ` <span class="pill ${bestExam('final') >= 85 ? 'ok' : ''}">أفضل ${bestExam('final')}%</span>` : ''}</div></div>
      <div class="panel stack"><div class="sub">اختبار مخصص</div>
        <div class="row">${UNITS.map(u => `<label class="row small"><input type="checkbox" class="cu" value="${u.id}" checked> Ch${u.n}</label>`).join('')}</div>
        <div class="grid2"><div><label class="small" for="cn">عدد الأسئلة</label><input id="cn" type="text" inputmode="numeric" value="20"></div>
          <div><label class="small" for="cs">المصدر</label><select id="cs"><option value="all">كل الأسئلة</option><option value="past">أسئلة سابقة فقط</option><option value="lec">أسئلة المحاضرات فقط</option><option value="weak">أضعف أسئلتي (غلطت فيها أو ما شفتها)</option></select></div>
          <div><label class="small" for="ct">المؤقت (دقائق، 0 = بدون)</label><input id="ct" type="text" inputmode="numeric" value="0"></div>
          <div><label class="small" for="cfb">التصحيح</label><select id="cfb"><option value="end">في النهاية</option><option value="now">فوري بعد كل سؤال</option></select></div></div>
        <div><button class="btn pri" data-ex="custom">ابدأ</button></div></div>
      <div class="panel stack"><div class="sub">صحّح أخطائي</div><div class="row"><span class="pill">${misList().length} سؤال</span><a class="btn" href="#fix">ابدأ</a></div></div>
      ${hist.length ? `<div class="panel stack"><div class="sub">آخر النتائج</div><table class="res-table"><tbody>${hist.map(e => `<tr><td>${esc(e.title)}</td><td>${e.right}/${e.total}</td><td><b>${e.pct}%</b></td><td class="small muted">${new Date(e.at).toLocaleDateString('ar-SA')}</td></tr>`).join('')}</tbody></table></div>` : ''}
    </div>`;
    main.addEventListener('click', examClick);
    cleanup.push(() => main.removeEventListener('click', examClick));
  }
  function examClick(e) {
    const b = e.target.closest('[data-ex]'); if (!b) return;
    const k = b.dataset.ex;
    if (k === 'unit') { const u = UNIT[b.dataset.u]; startRun({ kind: 'unit:' + u.id, title: 'اختبار Ch' + u.n + ' · ' + u.title, qs: shuffle(u.questions).slice(0, 20).map(q => q.id), mins: 0, fb: 'end' }); }
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
      startRun({ kind: 'final', title: 'الاختبار النهائي (' + qs.length + ' سؤال)', qs: qs.map(q => q.id), mins: qs.length, fb: 'end', noBack: $('#fnb').checked });
    } else if (k === 'custom') {
      const us = $$('.cu').filter(x => x.checked).map(x => x.value), src = $('#cs').value;
      let pool = ALLQ.filter(q => us.includes(q.u));
      if (src === 'past') pool = pool.filter(q => q.past); else if (src === 'lec') pool = pool.filter(q => !q.past);
      else if (src === 'weak') pool = pool.filter(q => { const r = S.q[q.id]; return !r || r.last === 0 || S.mis[q.id]; });
      const n = Math.max(1, Math.min(parseInt($('#cn').value, 10) || 20, pool.length));
      if (!pool.length) { toast('ما فيه أسئلة بهذي الاختيارات'); return; }
      startRun({ kind: 'custom', title: 'اختبار مخصص (' + n + ' سؤال)', qs: shuffle(pool).slice(0, n).map(q => q.id), mins: Math.max(0, parseInt($('#ct').value, 10) || 0), fb: $('#cfb').value });
    }
  }
  function startRun(o) {
    const ord = {}; o.qs.forEach(id => ord[id] = optOrder(Q[id]));
    S.run = { kind: o.kind, title: o.title, qs: o.qs, ord, ans: {}, i: 0, fb: o.fb, noBack: !!o.noBack, start: Date.now(), end: o.mins ? Date.now() + o.mins * 60000 : 0, done: false };
    save(); go('run');
  }
  function runView() {
    const R = S.run;
    if (!R) { main.innerHTML = `<div class="empty">ما فيه اختبار شغّال. <a href="#exams">الاختبارات</a></div>`; return; }
    if (R.done) return results(R);
    let tick;
    const draw = () => {
      const id = R.qs[R.i], q = Q[id], chosen = R.ans[id], locked = R.fb === 'now' && chosen != null;
      main.innerHTML = `<div class="stack col">
        <div class="row" style="justify-content:space-between"><div class="sub">${esc(R.title)}</div>${R.end ? `<span class="timer" id="tmr"></span>` : ''}</div>
        <div class="meter"><i style="width:${pct(Object.keys(R.ans).length, R.qs.length)}%"></i></div>
        <div class="qcard" data-qid="${id}">${qMeta(q)}<div class="small muted">سؤال ${R.i + 1} من ${R.qs.length}</div><div class="qtext" dir="ltr">${md(q.q)}</div>
          <div class="opts" dir="ltr">${R.ord[id].map((oi, k) => `<button class="opt ${chosen === oi ? 'sel' : ''} ${locked ? (oi === q.a ? 'right' : oi === chosen ? 'wrong' : '') : ''}" data-oi="${oi}" ${locked ? 'disabled' : ''}><span class="k">${LET[k]}</span><span>${md(q.o[oi])}</span></button>`).join('')}</div>
          ${locked ? `<div dir="ltr">${explHTML(q, chosen)}</div>` : ''}</div>
        <div class="qnav"><div class="row">${R.noBack ? '' : `<button class="btn" id="rprev" ${R.i === 0 ? 'disabled' : ''}>→ السابق</button>`}<button class="btn pri" id="rnext">${R.i + 1 < R.qs.length ? 'التالي ←' : 'إنهاء'}</button></div>
          <button class="btn ghost" id="rsub">سلّم الاختبار</button></div>
        <div id="rconf"></div>
        ${R.noBack ? '' : `<div class="qdots" aria-label="الأسئلة">${R.qs.map((x, k) => `<button data-k="${k}" class="${R.ans[x] != null ? 'a' : ''} ${k === R.i ? 'cur' : ''}">${k + 1}</button>`).join('')}</div>`}
      </div>`;
      $('.opts', main).onclick = e => {
        const b = e.target.closest('.opt'); if (!b || b.disabled) return;
        R.ans[id] = +b.dataset.oi; save();
        if (R.fb === 'now') record(q, R.ans[id] === q.a);
        draw();
      };
      const nx = $('#rnext'); nx.onclick = () => { if (R.i + 1 < R.qs.length) { R.i++; save(); draw(); } else confirmSubmit(); };
      if ($('#rprev')) $('#rprev').onclick = () => { R.i--; save(); draw(); };
      $('#rsub').onclick = confirmSubmit;
      $$('.qdots button', main).forEach(b => b.onclick = () => { R.i = +b.dataset.k; save(); draw(); });
      upd();
    };
    const confirmSubmit = () => {
      const left = R.qs.length - Object.keys(R.ans).length;
      $('#rconf').innerHTML = `<div class="confirm"><b>${left ? `باقي ${left} سؤال بدون إجابة.` : 'جاوبت كل الأسئلة.'} متأكد تبي تسلّم؟</b><div class="row"><button class="btn pri" id="cyes">نعم، سلّم</button><button class="btn" id="cno">رجوع</button></div></div>`;
      $('#cyes').onclick = submit; $('#cno').onclick = () => $('#rconf').innerHTML = '';
    };
    const upd = () => {
      if (!R.end) return; const ms = R.end - Date.now(), t = $('#tmr');
      if (ms <= 0) { submit(); toast('انتهى الوقت'); return; }
      if (t) { const m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60; t.textContent = '⏱ ' + m + ':' + String(s).padStart(2, '0'); t.classList.toggle('low', ms < 120000); }
    };
    const submit = () => {
      clearInterval(tick);
      let right = 0; const by = {};
      R.qs.forEach(id => { const q = Q[id], ok = R.ans[id] === q.a; if (ok) right++; const b = by[q.u] || (by[q.u] = { r: 0, n: 0 }); b.n++; if (ok) b.r++; if (R.fb !== 'now') record(q, ok); });
      R.done = true; R.right = right; R.by = by; R.at = Date.now();
      S.exams.push({ kind: R.kind, title: R.title, right, total: R.qs.length, pct: pct(right, R.qs.length), by, at: R.at });
      save(); results(R); renderNav('exams');
    };
    tick = setInterval(upd, 1000); cleanup.push(() => clearInterval(tick));
    draw();
  }
  function results(R) {
    const p = pct(R.right, R.qs.length), wrong = R.qs.filter(id => R.ans[id] !== Q[id].a);
    main.innerHTML = `<div class="stack col"><h1 class="title">النتيجة</h1>
      <div class="panel row" style="gap:18px"><div class="ring" style="--p:${p}"><div>${p}%<small>${R.right}/${R.qs.length}</small></div></div><div class="stack"><div class="sub">${esc(R.title)}</div><div class="muted small">${p >= 85 ? 'ممتاز! جاهز.' : p >= 70 ? 'جيد. راجع الأخطاء تحت.' : 'راجع الأقسام المرتبطة بأخطائك ثم أعد المحاولة.'}</div>
        <div class="row"><a class="btn pri" href="#fix">صحّح أخطائي (${misList().length})</a><a class="btn" href="#exams">اختبار جديد</a></div></div></div>
      <div class="panel"><div class="sub">حسب الوحدة</div><table class="res-table"><thead><tr><th>الوحدة</th><th>صح</th><th>%</th><th></th></tr></thead><tbody>
        ${Object.entries(R.by).map(([u, b]) => `<tr><td>Ch${UNIT[u].n} · <span dir="ltr">${esc(UNIT[u].title)}</span></td><td>${b.r}/${b.n}</td><td><b>${pct(b.r, b.n)}%</b></td><td><a href="#u.${u}">الوحدة</a></td></tr>`).join('')}</tbody></table></div>
      <h2 class="sub">مراجعة الأخطاء (${wrong.length})</h2>
      ${wrong.length ? wrong.map((id, k) => { const q = Q[id], ch = R.ans[id]; return `<div class="qcard">${qMeta(q)}<div class="qtext" dir="ltr">${k + 1}. ${md(q.q)}</div><div dir="ltr" class="small">Your answer: <b>${ch == null ? '— (no answer)' : md(q.o[ch])}</b></div><div dir="ltr">${explHTML(q, ch)}</div></div>`; }).join('') : '<div class="empty">ولا خطأ ✓</div>'}
    </div>`;
  }

  /* ---------------- steps ---------------- */
  function stepStatus() {
    const l30 = S.prac.last.slice(-30), recDone = RECALL.filter(r => S.rec[r.id]).length;
    const L = [];
    UNITS.forEach(u => L.push({ t: `أكمل مسار Ch${u.n}: ${u.ar}`, cond: `كل أقسام الوحدة (${u.sections.length}) مكتملة ✓ بنتيجة 80% أو أكثر في أسئلة القسم`, done: unitDone(u), href: '#u.' + u.id, prog: `${u.sections.filter(s => secDone(s.key)).length}/${u.sections.length}` }));
    L.push({ t: 'استرجع النقاط المهمة', cond: 'اكشف وقيّم نفسك في 90% من نقاط "استرجع قبل ما تراجع"', done: recDone >= Math.ceil(RECALL.length * .9), href: '#home', prog: `${recDone}/${RECALL.length}` });
    L.push({ t: 'أتقن أدوات الترتيب والتصنيف', cond: 'كل أداة ترتيب وتصنيف محلولة صح مرة وحدة على الأقل', done: drillIds.every(i => S.drill[i]), href: '#tools', prog: `${drillIds.filter(i => S.drill[i]).length}/${drillIds.length}` });
    L.push({ t: 'أتقن كل البطاقات', cond: 'كل بطاقة جاوبتها صح 3 مرات', done: learnedCount() === CARDS.length, href: '#cards', prog: `${learnedCount()}/${CARDS.length}` });
    L.push({ t: 'تدريب مخلوط من كل الوحدات', cond: 'جاوب 60 سؤال على الأقل، ودقتك في آخر 30 سؤال 80% أو أكثر', done: S.prac.n >= 60 && l30.length >= 30 && pct(l30.filter(Boolean).length, l30.length) >= 80, href: '#practice', prog: `${S.prac.n}/60 · ${pct(l30.filter(Boolean).length, l30.length)}%` });
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
        ${META.research.map(r => `<div><b>${esc(r.h)}</b><div class="small">${esc(r.x)}</div></div>`).join('')}
        <p class="small muted" style="margin:0">هذي مبادئ معروفة في أبحاث التعلّم (مثل مراجعة Dunlosky وزملائه 2013 لأساليب المذاكرة).</p></div></div>`;
  }

  /* ---------------- glossary ---------------- */
  const norm = s => String(s).toLowerCase().replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
  const firstUse = {}; UNITS.forEach(u => u.sections.forEach(s => { const t = JSON.stringify(s.blocks); (t.match(/\{([a-z0-9]+)[|}]/g) || []).forEach(m => { const id = m.slice(1, -1); if (!firstUse[id]) firstUse[id] = s.key; }); }));
  function glossary() {
    main.innerHTML = `<div class="stack col"><h1 class="title">القاموس</h1><p class="muted" style="margin:0">${Object.keys(G).length} مصطلح. ابحث بالعربي أو بالإنجليزي.</p>
      <input type="search" id="gq" placeholder="ابحث: reservoir أو المستودع…" aria-label="بحث في القاموس"><div class="glist" id="gl"></div></div>`;
    const ids = Object.keys(G).sort((a, b) => G[a][0].localeCompare(G[b][0]));
    const draw = () => {
      const qv = norm($('#gq').value.trim());
      const list = ids.filter(id => !qv || norm(G[id].join(' ')).includes(qv));
      $('#gl').innerHTML = list.map(id => `<div class="gitem" id="g-${id}"><div class="row1"><span class="en">${esc(G[id][0])}</span><span class="ar">${esc(G[id][1])}</span></div><div class="small">${esc(G[id][2])}</div>${firstUse[id] ? `<a class="small" href="#s.${firstUse[id]}">↩ <span dir="ltr">${esc(SEC[firstUse[id]].title)}</span></a>` : ''}</div>`).join('') || '<div class="empty">ما فيه نتائج</div>';
    };
    $('#gq').oninput = draw; draw();
  }

  /* ---------------- search ---------------- */
  function search() {
    main.innerHTML = `<div class="stack col"><h1 class="title">البحث</h1><input type="search" id="sq" placeholder="ابحث في الشرح والقاموس والأسئلة والبطاقات…" aria-label="بحث"><div class="stack" id="sr"></div></div>`;
    const IDX = [];
    Object.values(SEC).forEach(s => s.blocks.forEach(b => { const t = strip(JSON.stringify(b).replace(/"[a-z]+":/g, ' ').replace(/[\[\]{}"]/g, ' ').replace(/\\u[0-9a-f]{4}|\\n/g, ' ')); IDX.push({ k: 'شرح', t: s.title, x: t, h: '#s.' + s.key }); }));
    RECALL.forEach(r => IDX.push({ k: 'استرجاع', t: SEC[r.sec].title, x: strip(r.q + ' — ' + r.a), h: '#s.' + r.sec }));
    Object.keys(G).forEach(id => IDX.push({ k: 'قاموس', t: G[id][0] + ' · ' + G[id][1], x: G[id][2], h: '#glossary', g: id }));
    ALLQ.forEach(q => IDX.push({ k: q.past ? 'سؤال سابق' : 'سؤال', t: strip(q.q), x: 'Answer: ' + strip(q.o[q.a]) + ' — ' + strip(q.x), h: '#s.' + q.sk }));
    CARDS.forEach(c => IDX.push({ k: 'بطاقة', t: strip(c.f), x: strip(c.b), h: '#s.' + c.sk }));
    IDX.forEach(r => r.n = norm(r.t + ' ' + r.x));
    const hl = (s, terms) => { let t = esc(s); terms.forEach(w => { if (w.length < 2) return; t = t.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); }); return t; };
    const draw = () => {
      const raw = $('#sq').value.trim(), terms = norm(raw).split(/\s+/).filter(Boolean);
      if (!terms.length) { $('#sr').innerHTML = '<div class="empty">اكتب كلمة للبحث.</div>'; return; }
      const res = IDX.filter(r => terms.every(w => r.n.includes(w))).slice(0, 60);
      $('#sr').innerHTML = `<div class="small muted">${res.length} نتيجة${res.length === 60 ? '+' : ''}</div>` + res.map(r => { const i = r.n.indexOf(terms[0]); const sn = r.x.slice(Math.max(0, i - 60), i + 140); return `<a class="res" href="${r.h}"><span class="row"><span class="pill">${r.k}</span><b dir="auto">${hl(r.t, raw.split(/\s+/))}</b></span><span class="small" dir="auto">${hl(sn, raw.split(/\s+/))}</span></a>`; }).join('');
    };
    $('#sq').oninput = draw; draw(); $('#sq').focus();
  }

  /* ---------------- conflicts & sources ---------------- */
  function conflicts() {
    const A = META.pastAudit, tot = A.files.reduce((a, f) => a + f.total, 0), add = A.files.reduce((a, f) => a + f.added, 0);
    main.innerHTML = `<div class="stack col"><h1 class="title">الاختلافات والمصادر</h1>
      <p class="muted" style="margin:0">لما ملفين يختلفون، تلقى الاثنين هنا مع مصدر كل واحد. ما تم اختيار واحد بصمت.</p>
      ${META.conflicts.map(c => `<div class="panel stack"><div class="sub" dir="ltr">${esc(c.topic)}</div><div class="grid2" dir="ltr">
        <div class="note"><span class="lab">Source A</span>${md(c.a.text)}<div class="src" style="margin-top:6px;white-space:normal">${esc(c.a.src)}</div></div>
        <div class="note"><span class="lab">Source B</span>${md(c.b.text)}<div class="src" style="margin-top:6px;white-space:normal">${esc(c.b.src)}</div></div></div>
        <div class="small" dir="ltr">${md(c.verdict)}</div></div>`).join('')}
      <h2 class="sub">أسئلة سابقة تختلف مع المحاضرة (ما تنحسب في الدرجة)</h2>
      ${A.differ.map(d => `<div class="qcard"><div class="qmeta"><span class="pill past">${esc(d.file)} · Q${d.n}</span></div><div class="qtext" dir="ltr">${esc(d.q)}</div><div class="small" dir="ltr">Options: ${d.options.map(esc).join(' · ')}</div>
        <div class="grid2" dir="ltr"><div class="note warn"><span class="lab">Quiz file</span>${esc(d.quiz)}</div><div class="note key"><span class="lab">Lecture</span>${esc(d.lecture)}</div></div></div>`).join('')}
      <h2 class="sub">ملخص أسئلة السنوات السابقة</h2>
      <div class="panel stack"><div class="tscroll"><table class="res-table"><thead><tr><th>الملف</th><th>الكل</th><th>مضاف</th><th>محذوف</th><th>اختلاف</th></tr></thead><tbody>
        ${A.files.map(f => `<tr><td dir="ltr">${esc(f.file)}</td><td>${f.total}</td><td>${f.added}</td><td>${f.removed}</td><td>${f.conflict}</td></tr>`).join('')}
        <tr><td><b>المجموع</b></td><td><b>${tot}</b></td><td><b>${add}</b></td><td><b>${A.files.reduce((a, f) => a + f.removed, 0)}</b></td><td><b>${A.files.reduce((a, f) => a + f.conflict, 0)}</b></td></tr></tbody></table></div>
        ${A.files.map(f => `<div class="small"><b dir="ltr">${esc(f.file)}:</b> <span dir="ltr">${esc(f.note)}</span></div>`).join('')}
        <div class="small"><b>محذوف:</b> ${A.removed.map(r => `<div dir="ltr">${esc(r.file)} Q${r.n}: ${esc(r.q)}. ${esc(r.why)}</div>`).join('')}</div>
        <div class="note warn small"><span class="lab">ملفات ما انقرت (حجمها 0 بايت في المستودع)</span><span dir="ltr">${A.unreadable.map(esc).join(' · ')}</span></div></div>
      <h2 class="sub">مصادر الوحدات</h2>
      <div class="panel"><table class="res-table"><tbody>${UNITS.map(u => `<tr><td>Ch${u.n}</td><td dir="ltr">${esc(u.title)}</td><td class="src">${esc(u.file)}</td></tr>`).join('')}</tbody></table>
        <p class="small muted">كل المحتوى من هذي الملفات. القاموس العربي ترجمة وشرح مختصر للمصطلحات نفسها. صفحة "ليش الطريقة هذي" في خطوات المذاكرة مضافة ومعلّمة.</p></div></div>`;
  }

  /* ---------------- more (mobile) ---------------- */
  function more() {
    main.innerHTML = `<div class="stack col"><h1 class="title">المزيد</h1><div class="grid2">${NAV.filter(n => !['home', 'cards', 'practice', 'exams'].includes(n[0])).map(([id, t, ic]) => `<a class="btn" style="justify-content:flex-start;min-height:56px" href="#${id}">${icon(ic).replace('<svg', '<svg width="22" height="22" style="stroke:currentColor;fill:none;stroke-width:1.8"')}${t}${navCounts(id) ? ` <span class="pill">${navCounts(id)}</span>` : ''}</a>`).join('')}</div></div>`;
  }

  /* ---------------- settings ---------------- */
  function settings() {
    const sup = window.ReadAloud && ReadAloud.supported;
    main.innerHTML = `<div class="stack col"><h1 class="title">الإعدادات</h1>
      <div class="panel stack"><div class="sub">المظهر</div>
        <div class="row" role="radiogroup" aria-label="الثيم">${[['system', 'حسب الجهاز'], ['light', 'فاتح'], ['dark', 'داكن']].map(([v, t]) => `<button class="btn ${S.set.theme === v ? 'pri' : ''}" data-theme-set="${v}">${t}</button>`).join('')}</div>
        <label class="small" for="fsr">حجم الخط: <b id="fsv">${S.set.fs}px</b></label><input type="range" id="fsr" min="14" max="22" step="1" value="${S.set.fs}"></div>
      <div class="panel stack"><div class="sub">الاستماع</div>
        ${sup ? `<p class="small muted" style="margin:0">زر "استمع" موجود في كل فقرة وفوق كل قسم. السرعة والإيقاف والاستكمال من المشغّل اللي يطلع تحت. جودة الصوت تعتمد على جهازك، وبعض أسماء الأدوية والمصطلحات ممكن ينطقها غلط.</p>
          <label class="small" for="ven">الصوت الإنجليزي</label><select id="ven"></select>
          <label class="small" for="var">الصوت العربي (للقاموس وخطوات المذاكرة)</label><select id="var"></select>
          <div id="arhelp"></div>
          <button class="btn" id="vtest">جرّب الصوت</button>` : `<div class="note warn">هذا المتصفح ما يدعم القراءة الصوتية.</div>`}</div>
      <div class="panel stack"><div class="sub">حفظ التقدم</div><p class="small muted" style="margin:0">التقدم محفوظ في هذا المتصفح فقط. انسخ الكود عشان تنقله لجهاز ثاني.</p>
        <div class="row"><button class="btn" id="exp">صدّر التقدم (كود)</button></div><textarea id="expt" readonly hidden aria-label="كود التقدم"></textarea>
        <label class="small" for="impt">استيراد: الصق الكود هنا</label><textarea id="impt"></textarea><div class="row"><button class="btn" id="imp">استورد</button><span id="impm" class="small"></span></div></div>
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
      $('#ven').onchange = e => { S.set.voiceEn = e.target.value; save(); };
      $('#var').onchange = e => { S.set.voiceAr = e.target.value; save(); };
      $('#vtest').onclick = () => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance('Hand hygiene is the most effective way to prevent the spread of infection.'); const v = speechSynthesis.getVoices().find(x => x.name === S.set.voiceEn); if (v) u.voice = v; u.lang = v ? v.lang : 'en-US'; speechSynthesis.speak(u); } catch (e) { } };
    }
    $('#exp').onclick = () => { const t = $('#expt'); t.hidden = false; t.value = btoa(unescape(encodeURIComponent(JSON.stringify(S)))); t.select(); try { navigator.clipboard.writeText(t.value).then(() => toast('تم نسخ الكود'), () => { }); } catch (e) { } };
    $('#imp').onclick = () => {
      try { const o = JSON.parse(decodeURIComponent(escape(atob($('#impt').value.trim())))); if (!o || o.v !== 1) throw 0; S = Object.assign(blank(), o, { set: Object.assign(blank().set, o.set || {}) }); save(); applySettings(); $('#impm').textContent = '✓ تم الاستيراد'; renderNav('settings'); }
      catch (e) { $('#impm').textContent = '✗ الكود غير صحيح. تأكد إنك نسخته كامل.'; }
    };
    $('#rst').onclick = () => { $('#rstc').innerHTML = `<div class="confirm"><b>متأكد؟ بينمسح كل التقدم وما يرجع.</b><div class="row"><button class="btn danger" id="ry">نعم، صفّر</button><button class="btn" id="rn">إلغاء</button></div></div>`; $('#ry').onclick = () => { const set = S.set; S = blank(); S.set = set; save(); toast('تم التصفير'); go('home'); }; $('#rn').onclick = () => $('#rstc').innerHTML = ''; };
  }

  /* ---------------- glossary popover ---------------- */
  let pop = null;
  function closePop() { if (pop) { pop.remove(); pop = null; } }
  function openPop(el) {
    closePop(); const id = el.dataset.g, g = G[id]; if (!g) return;
    pop = document.createElement('div'); pop.className = 'pop'; pop.setAttribute('role', 'dialog'); pop.lang = 'ar'; pop.dir = 'rtl';
    pop.innerHTML = `<div class="en" dir="ltr">${esc(g[0])}</div><div class="ar">${esc(g[1])}</div><div class="small">${esc(g[2])}</div><div class="row"><button class="btn sm" data-act="sayar">🔊 انطقها</button><a class="btn sm ghost" href="#glossary">القاموس</a><button class="btn sm ghost" data-act="closepop">إغلاق</button></div>`;
    document.body.append(pop);
    const r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    let left = Math.min(Math.max(16, r.left + r.width / 2 - pw / 2), innerWidth - pw - 16), top = r.bottom + 8;
    if (top + ph > innerHeight - 80) top = Math.max(16, r.top - ph - 8);
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
    pop.dataset.g = id; pop.querySelector('.btn').focus({ preventScroll: true });
  }
  function sayAr(id) {
    try {
      const g = G[id]; speechSynthesis.cancel();
      const vs = speechSynthesis.getVoices(), ar = vs.find(v => v.name === S.set.voiceAr) || vs.find(v => /^ar/i.test(v.lang)), en = vs.find(v => v.name === S.set.voiceEn) || vs.find(v => /^en/i.test(v.lang));
      const u1 = new SpeechSynthesisUtterance(g[0]); if (en) u1.voice = en; u1.lang = en ? en.lang : 'en-US'; speechSynthesis.speak(u1);
      if (ar) { const u2 = new SpeechSynthesisUtterance(g[1] + '. ' + g[2]); u2.voice = ar; u2.lang = ar.lang; speechSynthesis.speak(u2); } else toast('ما فيه صوت عربي على جهازك. شوف الإعدادات.');
    } catch (e) { }
  }

  /* ---------------- global delegation ---------------- */
  document.addEventListener('click', e => {
    const t = e.target;
    const term = t.closest('.term'); if (term) { e.preventDefault(); openPop(term); return; }
    const a = t.closest('[data-act]');
    if (!a) { if (pop && !t.closest('.pop')) closePop(); }
    else {
      const act = a.dataset.act;
      if (act === 'closepop') closePop();
      else if (act === 'sayar') sayAr(pop && pop.dataset.g);
      else if (act === 'reveal') { const box = a.closest('.why'); box.querySelector('.ans').hidden = false; a.remove(); }
      else if (act === 'testtbl') { const w = a.closest('.tblw'); w.classList.toggle('testing'); $$('td.shown', w).forEach(x => x.classList.remove('shown')); a.textContent = w.classList.contains('testing') ? 'اكشف كل الخلايا' : 'اخفِ الخلايا واختبر نفسك'; }
      else if (act === 'testcards') { const w = a.closest('.blk'); w.classList.toggle('testing'); $$('.hv.shown', w).forEach(x => x.classList.remove('shown')); a.textContent = w.classList.contains('testing') ? 'اكشف الكل' : 'اخفِ التفاصيل واختبر نفسك'; }
      else if (act === 'mist') { const f = a.querySelector('.fix'); f.hidden = !f.hidden; }
      else if (act === 'dhide') { const d = a.closest('.diag'); d.classList.toggle('hidel'); $$('.lbl.shown', d).forEach(x => x.classList.remove('shown')); a.textContent = d.classList.contains('hidel') ? 'اكشف الأسماء' : 'اخفِ الأسماء واختبر نفسك'; }
      else if (act === 'dmode') { const d = a.closest('.diag'); d.dataset.mode = a.dataset.m; $$('[data-act=dmode]', d).forEach(x => x.classList.toggle('pri', x === a)); }
      else if (act === 'rec-show' || act === 'rec-hide') {
        const li = a.closest('[data-rid]'), id = li.dataset.rid;
        if (act === 'rec-hide') { delete S.rec[id]; save(); li.querySelector('.ans').hidden = true; li.querySelector('.rbar').innerHTML = `<button class="btn sm" data-act="rec-show">اكشف الإجابة</button>`; }
        else { li.querySelector('.ans').hidden = false; li.querySelector('.rbar').innerHTML = `<span class="small muted">تذكرتها؟</span><button class="btn sm pri" data-act="rec-y">نعم ✓</button><button class="btn sm" data-act="rec-n">لا</button>`; }
      } else if (act === 'rec-y' || act === 'rec-n') {
        const li = a.closest('[data-rid]'), id = li.dataset.rid; S.rec[id] = act === 'rec-y' ? 2 : 1; save();
        const r = RECALL.find(x => x.id === id); li.outerHTML = recallItem(id, r);
      }
    }
    const td = t.closest('.testing td.h, .testing .hv'); if (td) td.classList.add('shown');
    const lb = t.closest('.hidel .lbl'); if (lb) lb.classList.add('shown');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePop();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('term')) { e.preventDefault(); openPop(e.target); }
  });

  /* ---------------- boot ---------------- */
  if (window.ReadAloud) ReadAloud.init({ storageKey: 'ems313-ra', lang: 'en', ui: 'ar', skip: '.src, .pill, .tbar, .rbar, .dbar, .lab' });
  route();
  window.__app = { S: () => S, Q, SEC, UNITS, CARDS, RECALL, stepStatus };
})();
