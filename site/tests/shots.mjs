import { createRequire } from 'module'; import path from 'path'; import { pathToFileURL } from 'url'; import fs from 'fs';
const require = createRequire(import.meta.url); const pw = require('playwright');
const url = pathToFileURL(path.resolve('index.html')).href, out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
const b = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const shots = (process.argv[3] || '').split(',');
for (const s of shots) {
  const [name, hash, w, h, scheme, full] = s.split(':');
  const p = await b.newPage({ viewport: { width: +w, height: +h }, colorScheme: scheme || 'light' });
  await p.goto(url + '#' + hash); await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/${name}.png`, fullPage: full === 'f' });
  await p.close();
}
await b.close();
