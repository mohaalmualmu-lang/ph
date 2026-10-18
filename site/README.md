# EMS 313 Study Route

Interactive study site for EMS 313 (Public Health and Safety), built only from the lecture files in this repo:
`CH01 - Tagged.pdf`, `EMS313 Ch02(1).pdf`, `EMS313_Ch03.pdf`, `EMS313 Ch04(1).pdf`, `EMS313 Vaccines English.pptx`.

- **`index.html`**: the finished site. One file, works offline. Open it in any browser.
- `data/ch*.js`: content per unit (sections, recall points, questions, flashcards, drills). `data/glossary.js`: Arabic dictionary. `data/meta.js`: source conflicts and the past-question audit.
- `src/`: CSS, JS, SVG diagrams, and the read-aloud library.

## Build and check
```bash
node build.mjs --check   # validate only: missing questions, missing dictionary terms, answer-length bias
node build.mjs           # validate + write index.html (and dist/artifact.html for publishing)
node tests/e2e.mjs       # headless test of the main flows at phone and desktop sizes
```
