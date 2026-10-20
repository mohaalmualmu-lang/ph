# EMS 313 Study Route

Interactive study site for EMS 313 (Public Health and Safety), built only from the lecture files in this repo:
`CH01 - Tagged.pdf`, `EMS313 Ch02(1).pdf`, `EMS313_Ch03.pdf`, `EMS313 Ch04(1).pdf`, `EMS313 Vaccines English.pptx`.

- **`index.html`**: the finished site. One file, works offline. Open it in any browser.
- `data/ch*.js`: content per unit (sections, recall points, questions, flashcards, drills). `data/glossary.js`: Arabic dictionary. `data/meta.js`: source conflicts, the past-question audit and the course files that could not be read. `data/extra.js`: important numbers (`#numbers`) and confusable pairs (`#confuse`).
- `src/`: CSS, JS, SVG diagrams, and the read-aloud library.
- Underlined dictionary terms on a prompt (question stem, card front, recall prompt) open a short popup (term + Arabic name) until the answer is shown. For a definition item, where even that would give the answer away, set `nl: true` on the question, card or recall item: its prompt gets no dictionary link. `node build.mjs` warns about likely cases.

## Build and check
```bash
node build.mjs --check   # validate only: missing questions, missing dictionary terms, answer-length bias
node build.mjs           # validate + write index.html (and dist/artifact.html for publishing)
node tests/e2e.mjs       # headless test of the main flows at phone and desktop sizes
```
