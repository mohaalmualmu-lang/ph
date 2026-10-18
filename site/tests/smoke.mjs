import { createRequire } from 'module'; import path from 'path'; import { pathToFileURL } from 'url';
const require = createRequire(import.meta.url);
let pw; for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(p); break; } catch (e) { } }
const url = pathToFileURL(path.resolve(process.argv[2] || 'index.html')).href;
const b = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = []; p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
for (const h of ['#home', '#s.ch1.s2', '#s.ch2.s3', '#s.ch6.s4', '#tools', '#cards', '#practice', '#exams', '#glossary', '#steps', '#search', '#conflicts', '#settings', '#more']) {
  await p.goto(url + h); await p.waitForTimeout(150);
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(h, 'overflow', ov, (await p.textContent('main')).slice(0, 60).replace(/\s+/g, ' '));
}
console.log('errors', errs);
await b.close();
