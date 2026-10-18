/* Inline SVG diagrams. Labels wrapped in .lbl can be hidden for self-testing (tap a box to reveal). */
const DIAGRAMS = (() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // a hideable label: placeholder rect + text
  const lbl = (x, y, t, cls = 't1', anchor = 'middle', cw = 7.6) => {
    const w = t.length * cw + 10, h = cls === 't1' ? 20 : 16;
    const rx = anchor === 'middle' ? x - w / 2 : anchor === 'start' ? x - 5 : x - w + 5;
    return `<g class="lbl"><rect class="ph" x="${rx}" y="${y - h + 5}" width="${w}" height="${h}" rx="4"/><text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${esc(t)}</text></g>`;
  };
  const lines = (x, y, arr, cls = 't2', dy = 15) => arr.map((t, i) => `<text x="${x}" y="${y + i * dy}" text-anchor="middle" class="${cls}">${esc(t)}</text>`).join('');
  const arrowHead = `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ar"/></marker></defs>`;

  function chain() {
    const W = 160, H = 128;
    const N = [
      { x: 10, y: 8, t: 'Infectious agent', ex: ['Bacteria · Viruses', 'Fungi · Parasites', 'Prions'], br: ['Disinfection', 'Sterilization', 'Effective antimicrobial', 'therapy'] },
      { x: 190, y: 8, t: 'Reservoir', ex: ['Asymptomatic carriers', 'Water · Food', 'Animals'], br: ['Water treatment', 'Proper food storage', 'Engineering controls', 'Env. cleaning/disinfect.'] },
      { x: 190, y: 176, t: 'Portal of exit', ex: ['Blood', 'Secretion', 'Excretions'], br: ['Control of excretions', 'and secretions', 'Waste & linen disposal', 'Proper wound care'] },
      { x: 190, y: 344, t: 'Mode of transmission', ex: ['Contact', 'Droplet', 'Airborne'], br: ['Hand hygiene · PPE', 'Environmental sanitation', 'Engineering controls', 'Equipment disinf./steril.'] },
      { x: 10, y: 344, t: 'Portal of entry', ex: ['Respiratory tract', 'GI tract', 'Non-intact skin', 'Mucous membranes'], br: ['Hand hygiene', 'Aseptic technique', 'PPE', 'Engineering controls'] },
      { x: 10, y: 176, t: 'Susceptible host', ex: ['Age · Surgery', 'Immunocompromised', 'Medical conditions', 'Unvaccinated'], br: ['Immunization', 'ID high-risk patients', 'Treat pre-existing cond.', 'Proper nutrition'] }
    ];
    let s = `<svg viewBox="0 0 360 482" role="img" aria-label="Chain of transmission: six links">${arrowHead}`;
    // links between nodes
    const L = [[170, 72, 188, 72], [270, 138, 270, 174], [270, 306, 270, 342], [188, 408, 172, 408], [90, 342, 90, 306], [90, 174, 90, 138]];
    L.forEach(([a, b, c, d]) => s += `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="ln" marker-end="url(#ah)"/>`);
    N.forEach((n, i) => {
      s += `<rect x="${n.x}" y="${n.y}" width="${W}" height="${H}" rx="14" class="nd${i === 0 ? ' ac' : ''}"/>`;
      s += `<text x="${n.x + 14}" y="${n.y + 20}" class="t2 acc" font-weight="700">${i + 1}</text>`;
      s += lbl(n.x + W / 2, n.y + 26, n.t, 't1', 'middle', 7.4);
      s += `<g class="m-ex">${lines(n.x + W / 2, n.y + 50, n.ex)}</g><g class="m-br">${lines(n.x + W / 2, n.y + 50, n.br)}</g>`;
    });
    s += `<text x="180" y="474" text-anchor="middle" class="t2">Break any one link → the chain stops (slides 8–10)</text></svg>`;
    return { svg: s, modes: [['ex', 'Examples (slide 9)'], ['br', 'How to break it (slide 10)']] };
  }

  function levels() {
    let s = `<svg viewBox="0 0 360 250" role="img" aria-label="Levels of prevention along the course of disease">${arrowHead}`;
    s += `<line x1="14" y1="70" x2="346" y2="70" class="ln" marker-end="url(#ah)"/>`;
    s += `<text x="180" y="22" text-anchor="middle" class="t2">Course of disease →</text>`;
    const C = [{ x: 62, ph: 'Healthy', lv: 'Primary', ex: ['Vaccination'] }, { x: 180, ph: 'Newly ill', lv: 'Secondary', ex: ['Early screening', 'and treatment'] }, { x: 298, ph: 'Recovering', lv: 'Tertiary', ex: ['Rehabilitation'] }];
    C.forEach((c, i) => {
      s += `<circle cx="${c.x}" cy="70" r="9" class="nd ac"/>`;
      s += `<text x="${c.x}" y="50" text-anchor="middle" class="t2">${c.ph}</text>`;
      s += `<rect x="${c.x - 54}" y="96" width="108" height="${120}" rx="12" class="nd${i === 0 ? ' ac' : ''}"/>`;
      s += lbl(c.x, 124, c.lv, 't1', 'middle', 7.6);
      s += `<text x="${c.x}" y="150" text-anchor="middle" class="t2">Example:</text>`;
      s += `<g class="lbl"><rect class="ph" x="${c.x - 48}" y="157" width="96" height="${c.ex.length * 16 + 4}" rx="4"/>${lines(c.x, 170, c.ex, 't2 acc')}</g>`;
    });
    s += `<text x="180" y="240" text-anchor="middle" class="t2">CH01, slide 11</text></svg>`;
    return { svg: s };
  }

  function routes() {
    let s = `<svg viewBox="0 0 360 300" role="img" aria-label="Droplet versus airborne spread">${arrowHead}`;
    const person = (y) => `<circle cx="30" cy="${y}" r="13" class="nd ac"/><path d="M12 ${y + 44} q18 -30 36 0" class="nd ac"/>`;
    // droplet panel
    s += `<rect x="4" y="4" width="352" height="138" rx="12" class="nd"/>` + person(52);
    [[60, 46, 7], [84, 58, 6], [104, 74, 7], [124, 92, 6], [140, 110, 7], [158, 124, 6]].forEach(([x, y, r]) => s += `<circle cx="${x}" cy="${y}" r="${r}" class="dotb"/>`);
    s += `<line x1="48" y1="132" x2="196" y2="132" class="ln" marker-start="url(#ah)" marker-end="url(#ah)"/>`;
    s += lbl(122, 127, '~2 m, then falls', 't2', 'middle', 6.4);
    s += lbl(276, 36, 'DROPLET', 't1', 'middle', 9);
    s += lbl(276, 60, '> 5 µm', 't1', 'middle', 9);
    s += lbl(276, 86, 'Surgical mask', 't2', 'middle', 6.6);
    s += `<text x="276" y="108" text-anchor="middle" class="t2">flu, pertussis,</text><text x="276" y="122" text-anchor="middle" class="t2">N. meningitidis</text>`;
    // airborne panel
    s += `<rect x="4" y="156" width="352" height="138" rx="12" class="nd"/>` + person(204);
    for (let i = 0; i < 26; i++) { const x = 58 + (i * 37) % 290, y = 176 + (i * 23) % 100; s += `<circle cx="${x}" cy="${y}" r="2.4" class="dot"/>`; }
    s += `<line x1="48" y1="286" x2="350" y2="286" class="ln" marker-end="url(#ah)"/>`;
    s += lbl(200, 281, 'far, stays suspended for hours', 't2', 'middle', 6.4);
    s += `<rect x="216" y="172" width="122" height="94" rx="10" class="nd"/>`;
    s += lbl(277, 192, 'AIRBORNE', 't1', 'middle', 9);
    s += lbl(277, 214, '≤ 5 µm nuclei', 't1', 'middle', 8);
    s += lbl(277, 236, 'N95, fit-tested', 't2', 'middle', 6.6);
    s += `<text x="277" y="256" text-anchor="middle" class="t2">TB, measles, varicella</text></svg>`;
    return { svg: s };
  }

  function spaulding() {
    const R = [
      { n: 'Critical', c: 'Sterile tissue / bloodstream', p: 'Sterilization (must be sterile)', e: 'IV cannula, IO needle' },
      { n: 'Semicritical', c: 'Mucous membranes / non-intact skin', p: 'At least high-level disinfection', e: 'Laryngoscope blade' },
      { n: 'Noncritical', c: 'Intact skin', p: 'Low-level disinfection', e: 'BP cuff, stethoscope' }];
    let s = `<svg viewBox="0 0 360 318" role="img" aria-label="Spaulding classification">`;
    R.forEach((r, i) => {
      const y = 8 + i * 102, inset = i * 16;
      s += `<rect x="${8 + inset}" y="${y}" width="${344 - 2 * inset}" height="92" rx="12" class="nd${i === 0 ? ' ac' : ''}"/>`;
      s += lbl(180, y + 24, r.n, 't1', 'middle', 8);
      s += `<text x="180" y="${y + 44}" text-anchor="middle" class="t2">${esc(r.c)}</text>`;
      s += lbl(180, y + 64, r.p, 't2 acc', 'middle', 6.4);
      s += `<text x="180" y="${y + 82}" text-anchor="middle" class="t2">e.g. ${esc(r.e)}</text>`;
    });
    s += `</svg>`;
    return { svg: s };
  }

  return { chain, levels, routes, spaulding };
})();
