/* Inline SVG diagrams. Labels wrapped in .lbl can be hidden for self-testing (tap a box to reveal). */
const DIAGRAMS = (() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const r1 = v => Math.round(v * 10) / 10;
  // Rough label width in px. It errs on the wide side, so a placeholder still covers its label
  // in wide fallback fonts (Inter, SF Pro, DejaVu Sans) and not only in IBM Plex Sans.
  const tw = (t, px, bold) => {
    let em = 0;
    for (const ch of String(t)) em += /[ijlI.,:;'·|!]/.test(ch) ? .32 : /[frt()/\- ]/.test(ch) ? .42 : /[mwMW]/.test(ch) ? .96
      : /[~≤>→&]/.test(ch) ? .84 : /[A-Z]/.test(ch) ? .74 : /[0-9]/.test(ch) ? .64 : .6;
    return em * px * (bold ? 1.06 : 1);
  };
  // A hideable label: placeholder rect + text. o.size overrides the font size, o.max caps the placeholder width.
  const lbl = (x, y, t, cls = 't1', anchor = 'middle', o = {}) => {
    const big = cls.split(' ').includes('t1'), px = o.size || (big ? 14 : 11.5);
    const w = Math.min(tw(t, px, big) + 10, o.max || Infinity), h = px + (big ? 6 : 4.5);
    const rx = anchor === 'middle' ? x - w / 2 : anchor === 'start' ? x - 5 : x - w + 5;
    const st = o.size ? ` style="font-size:${o.size}px"` : '';
    return `<g class="lbl"><rect class="ph" x="${r1(rx)}" y="${r1(y - px - 1)}" width="${r1(w)}" height="${r1(h)}" rx="4"/><text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}"${st}>${esc(t)}</text></g>`;
  };
  const lines = (x, y, arr, cls = 't2', dy = 15) => arr.map((t, i) => `<text x="${x}" y="${y + i * dy}" text-anchor="middle" class="${cls}">${esc(t)}</text>`).join('');
  const arrowHead = `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ar"/></marker></defs>`;
  // Every diagram is drawn in a 360-unit-wide viewBox. Cap the rendered size so that on desktop the
  // text stays near body size and the tall chain diagram fits on one screen (it would otherwise grow to
  // 640px wide and about 860px tall). The 420px floor keeps it readable on a phone held sideways.
  const svgOpen = (h, label) => `<svg viewBox="0 0 360 ${h}" role="img" aria-label="${esc(label)}" style="max-width:min(100%,460px);max-height:max(75vh,420px)">`;

  function chain() {
    // 2 columns x 3 rows, read clockwise: 1 → 2 down the right side → 4 → 5 up the left side → 6 → 1
    const W = 160, H = 118, GX = 20, GY = 36, X = [10, 10 + W + GX], Y = [8, 8 + H + GY, 8 + 2 * (H + GY)];
    const N = [
      { c: 0, r: 0, t: 'Infectious agent', ex: ['Bacteria · Viruses', 'Fungi · Parasites', 'Prions'], br: ['Disinfection', 'Sterilization', 'Effective antimicrobial', 'therapy'] },
      { c: 1, r: 0, t: 'Reservoir', ex: ['Asymptomatic carriers', 'Water · Food', 'Animals'], br: ['Water treatment', 'Proper food storage', 'Engineering controls', 'Env. cleaning/disinfect.'] },
      { c: 1, r: 1, t: 'Portal of exit', ex: ['Blood', 'Secretion', 'Excretions'], br: ['Control of excretions', 'and secretions', 'Waste & linen disposal', 'Proper wound care'] },
      { c: 1, r: 2, t: 'Mode of transmission', ex: ['Contact', 'Droplet', 'Airborne'], br: ['Hand hygiene · PPE', 'Environmental sanitation', 'Engineering controls', 'Equipment disinf./steril.'] },
      { c: 0, r: 2, t: 'Portal of entry', ex: ['Respiratory tract', 'GI tract', 'Non-intact skin', 'Mucous membranes'], br: ['Hand hygiene', 'Aseptic technique', 'PPE', 'Engineering controls'] },
      { c: 0, r: 1, t: 'Susceptible host', ex: ['Age · Surgery', 'Immunocompromised', 'Medical conditions', 'Unvaccinated'], br: ['Immunization', 'ID high-risk patients', 'Treat pre-existing cond.', 'Proper nutrition'] }
    ].map(n => ({ ...n, x: X[n.c], y: Y[n.r] }));
    const VH = Y[2] + H + 32;
    let s = svgOpen(VH, 'Chain of transmission: six links') + arrowHead;
    // links between nodes: each arrow leaves one box and stops 2 units short of the next
    N.forEach((a, i) => {
      const b = N[(i + 1) % N.length];
      let p;
      if (a.r === b.r) { const y = a.y + H / 2; p = a.x < b.x ? [a.x + W, y, b.x - 2, y] : [a.x - 2, y, b.x + W + 2, y]; }
      else { const x = a.x + W / 2; p = a.y < b.y ? [x, a.y + H + 2, x, b.y - 2] : [x, a.y - 2, x, b.y + H + 2]; }
      s += `<line x1="${p[0]}" y1="${p[1]}" x2="${p[2]}" y2="${p[3]}" class="ln" marker-end="url(#ah)"/>`;
    });
    N.forEach((n, i) => {
      s += `<rect x="${n.x}" y="${n.y}" width="${W}" height="${H}" rx="14" class="nd${i === 0 ? ' ac' : ''}"/>`;
      // the link number sits on its own line above the title, so a long title cannot run into it
      s += `<text x="${n.x + 12}" y="${n.y + 18}" class="t2 acc" font-weight="700">${i + 1}</text>`;
      // titles are 13px; a title too long for the box (only 'Mode of transmission') steps down a little,
      // so it still fits in wide fallback fonts such as DejaVu Sans
      const size = Math.min(13, Math.floor(13 * (W - 12) / tw(n.t, 13, true) * 10) / 10);
      s += lbl(n.x + W / 2, n.y + 36, n.t, 't1', 'middle', { size, max: W - 8 });
      s += `<g class="m-ex">${lines(n.x + W / 2, n.y + 58, n.ex)}</g><g class="m-br">${lines(n.x + W / 2, n.y + 58, n.br)}</g>`;
    });
    s += `<text x="180" y="${VH - 10}" text-anchor="middle" class="t2">Figure 1.2: Breaking the chain of transmission (slide 10)</text></svg>`;
    return { svg: s, modes: [['ex', 'Examples (slide 9)'], ['br', 'Break it (slide 10)']] };
  }

  function levels() {
    let s = svgOpen(250, 'Levels of prevention along the course of disease') + arrowHead;
    s += `<line x1="14" y1="70" x2="346" y2="70" class="ln" marker-end="url(#ah)"/>`;
    s += `<text x="180" y="22" text-anchor="middle" class="t2">Course of disease →</text>`;
    const C = [{ x: 62, ph: 'Healthy', lv: 'Primary', ex: ['Vaccination'] }, { x: 180, ph: 'Newly ill', lv: 'Secondary', ex: ['Early screening', 'and treatment'] }, { x: 298, ph: 'Recovering', lv: 'Tertiary', ex: ['Rehabilitation'] }];
    C.forEach((c, i) => {
      s += `<circle cx="${c.x}" cy="70" r="9" class="nd ac"/>`;
      s += `<text x="${c.x}" y="50" text-anchor="middle" class="t2">${c.ph}</text>`;
      s += `<rect x="${c.x - 54}" y="96" width="108" height="${120}" rx="12" class="nd${i === 0 ? ' ac' : ''}"/>`;
      s += lbl(c.x, 124, c.lv, 't1');
      s += `<text x="${c.x}" y="150" text-anchor="middle" class="t2">Example:</text>`;
      s += `<g class="lbl"><rect class="ph" x="${c.x - 50}" y="157" width="100" height="${c.ex.length * 15 + 5}" rx="4"/>${lines(c.x, 170, c.ex, 't2 acc')}</g>`;
    });
    s += `<text x="180" y="240" text-anchor="middle" class="t2">CH01, slide 11</text></svg>`;
    return { svg: s };
  }

  function routes() {
    let s = svgOpen(300, 'Droplet versus airborne spread') + arrowHead;
    const person = (y) => `<circle cx="30" cy="${y}" r="13" class="nd ac"/><path d="M12 ${y + 44} q18 -30 36 0" class="nd ac"/>`;
    // droplet panel: the large droplets fall before they reach the '~2 m, then falls' label
    s += `<rect x="4" y="4" width="352" height="138" rx="12" class="nd"/>` + person(52);
    [[60, 46, 7], [84, 58, 6], [104, 74, 7], [124, 92, 6]].forEach(([x, y, r]) => s += `<circle cx="${x}" cy="${y}" r="${r}" class="dotb"/>`);
    s += `<line x1="48" y1="132" x2="196" y2="132" class="ln" marker-start="url(#ah)" marker-end="url(#ah)"/>`;
    s += lbl(122, 127, '~2 m, then falls', 't2');
    s += lbl(278, 36, 'DROPLET', 't1');
    s += lbl(278, 60, '> 5 µm', 't1');
    s += lbl(278, 86, 'Surgical mask', 't2');
    s += `<text x="278" y="108" text-anchor="middle" class="t2">flu, pertussis,</text><text x="278" y="122" text-anchor="middle" class="t2">N. meningitidis</text>`;
    // airborne panel: the small nuclei stay in the air to the left of the label box and above the bottom label
    s += `<rect x="4" y="156" width="352" height="138" rx="12" class="nd"/>` + person(204);
    // an even, fixed scatter (R2 low-discrepancy sequence) inside x 60–194, y 178–260
    const fr = v => v - Math.floor(v);
    for (let i = 0; i < 22; i++) {
      const x = Math.round(60 + fr(.5 + i * .7548776662) * 134), y = Math.round(178 + fr(.5 + i * .569840291) * 82);
      if (x > 196 || y > 262) continue; // keep clear of the AIRBORNE box (x ≥ 206) and the bottom label (y ≥ 270)
      s += `<circle cx="${x}" cy="${y}" r="2.4" class="dot"/>`;
    }
    s += `<line x1="48" y1="286" x2="350" y2="286" class="ln" marker-end="url(#ah)"/>`;
    s += lbl(200, 281, 'far, stays suspended for hours', 't2');
    s += `<rect x="206" y="172" width="144" height="94" rx="10" class="nd"/>`;
    s += lbl(278, 192, 'AIRBORNE', 't1');
    s += lbl(278, 214, '≤ 5 µm nuclei', 't1');
    s += lbl(278, 236, 'N95, fit-tested', 't2');
    s += `<text x="278" y="256" text-anchor="middle" class="t2">TB, measles, varicella</text></svg>`;
    return { svg: s };
  }

  function spaulding() {
    const R = [
      { n: 'Critical', c: 'Sterile tissue / bloodstream', p: 'Sterilization (must be sterile)', e: 'IV cannula, IO needle' },
      { n: 'Semicritical', c: 'Mucous membranes / non-intact skin', p: 'At least high-level disinfection', e: 'Laryngoscope blade' },
      { n: 'Noncritical', c: 'Intact skin', p: 'Low-level disinfection', e: 'BP cuff, stethoscope' }];
    let s = svgOpen(318, 'Spaulding classification');
    R.forEach((r, i) => {
      const y = 8 + i * 102, inset = i * 16;
      s += `<rect x="${8 + inset}" y="${y}" width="${344 - 2 * inset}" height="92" rx="12" class="nd${i === 0 ? ' ac' : ''}"/>`;
      s += lbl(180, y + 24, r.n, 't1');
      s += `<text x="180" y="${y + 44}" text-anchor="middle" class="t2">${esc(r.c)}</text>`;
      s += lbl(180, y + 64, r.p, 't2 acc');
      s += `<text x="180" y="${y + 82}" text-anchor="middle" class="t2">e.g. ${esc(r.e)}</text>`;
    });
    s += `</svg>`;
    return { svg: s };
  }

  return { chain, levels, routes, spaulding };
})();
