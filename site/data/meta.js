// Cross-file notes: conflicts between sources, the past-question audit, and the study steps.
export default {
  conflicts: [
    { id: 'k1', topic: 'How far droplets travel',
      a: { text: 'Droplets fall within **about 2 metres**.', src: 'EMS313_Ch03.pdf, slides 3, 5, 6' },
      b: { text: 'Option chosen in the quiz screenshot: "**3–6 feet**" (other options: 6 meter, 3 inch, 3–6 cm).', src: 'Quiz 2, ch 2&3 (45).pdf, Q6' },
      verdict: 'The site uses the lecture value (about 2 metres). Added conversion, not in the lecture: 1 foot ≈ 0.3 m, so 3–6 feet ≈ 0.9–1.8 m. That makes **3–6 feet** the only option close to "about 2 metres" ("6 meter" is far beyond it), so if this question appears in an exam, choose 3–6 feet. It is still not graded on this site because the lecture never gives the distance in feet; the question is listed below with the past questions that differ.' },
    { id: 'k2', topic: 'How long an airborne room stays unsafe',
      a: { text: 'No isolation room: mask the patient and keep the room empty for **about an hour** afterwards [IB/IC].', src: 'EMS313_Ch03.pdf, slide 17' },
      b: { text: 'Measles virus can remain infectious in the air for **up to 2 hours** after a patient leaves.', src: 'EMS313 Vaccines English.pptx, slide 24' },
      verdict: 'Both are shown. Ch3 gives a general rule for an airborne room; the vaccines lecture gives the measles-specific figure. Answer with the number from the chapter the question comes from.' },
    { id: 'k3', topic: 'Precautions for chickenpox (varicella)',
      a: { text: 'Chickenpox listed under **airborne** spread / airborne precautions.', src: 'EMS313_Ch03.pdf, slides 6, 17' },
      b: { text: 'Varicella: **Airborne + Contact** precautions (contact with blister fluid).', src: 'EMS313 Vaccines English.pptx, slides 16, 38' },
      verdict: 'They do not contradict each other; the vaccines lecture adds contact. If a question offers "Airborne + Contact", that is the complete answer.' },
    { id: 'k4', topic: 'Hand rub time',
      a: { text: 'Hand rub **20–30 seconds, until dry** (WHO). Fix for rushing: "about **30 seconds**".', src: 'EMS313 Ch02(1).pdf, slides 15–17, 29' },
      b: { text: '**At least 15 seconds** of rubbing is the **CDC minimum** quoted in the source deck.', src: 'EMS313 Ch02(1).pdf, slide 17' },
      verdict: 'Different organisations. WHO = 20–30 s (wash 40–60 s); CDC minimum = 15 s.' },
    { id: 'k5', topic: 'Which link do cleaning / disinfection / sterilization break?',
      a: { text: 'Figure 1.2: disinfection + sterilization under **Infectious agent**; environmental cleaning/disinfection under **Reservoirs**; equipment disinfection/sterilization under **Modes of transmission**.', src: 'CH01 - Tagged.pdf, slide 10' },
      b: { text: 'Quiz answer: **Reservoir** (options: portal of exit, reservoir, portal of entry, susceptible host).', src: 'Quiz 2, ch 2&3 (45).pdf, Q12' },
      verdict: 'Not a contradiction: among the four options only Reservoir carries cleaning/disinfection in Figure 1.2. If "Infectious agent" is offered for disinfection/sterilization, the figure supports it too.' },
    { id: 'k6', topic: 'Quaternary ammonium compounds: two contexts',
      a: { text: 'As a **hand antiseptic**: more effective against gram-negative, less against gram-positive; minimal vs mycobacteria and fungi.', src: 'EMS313 Ch02(1).pdf, slide 14' },
      b: { text: 'As a **surface disinfectant**: act against vegetative bacteria and enveloped viruses; limited vs spores, mycobacteria, non-enveloped viruses.', src: 'EMS313 Ch04(1).pdf, slide 18' },
      verdict: 'Not a contradiction; read which chapter (hands vs surfaces) the question is about.' }
  ],

  pastAudit: {
    files: [
      { file: 'Quiz 1 , ch 1&2 (45).pdf', total: 10, added: 10, removed: 0, conflict: 0, note: 'All 10 questions are covered by Ch1 and Ch2. The screenshots show the student\'s selected answers (not an official key); every answer here was checked against the lecture.' },
      { file: 'Quiz 2, ch 2&3 (45).pdf', total: 15, added: 13, removed: 1, conflict: 1, note: 'Q1 modified (one option replaced from the lecture), Q10 removed (answer cannot be proven from the lecture), Q6 in the conflicts list.' }
    ],
    unreadable: ['Quiz 3, ch vaccines (45).pdf', 'Quiz 4, ch risk management (45).pdf', 'Quiz 4.pdf', 'Quiz 5 ..pdf', 'Quiz 5, ch pre-incident (45).pdf', 'quiz 2.pdf', 'كويز 3.pdf', 'كويز الببلك هيلث pre-incident .pdf', 'كويز الببلك هيلث risk management .pdf', 'الكويز ببلك هيلث safety at emergency incident .pdf', 'modes of transmission كويز الببلك هيلث.pdf', 'تجميعات Public Health.pdf', 'تجميعات Public Health (5).pdf', 'تجميعات Public Health Ch1-2-3-6.pdf'],
    removed: [
      { file: 'Quiz 2, ch 2&3 (45).pdf', n: 10, q: 'Which is the most common mode of transmission? (Contact / Airborne / Vomiting / Droplet)', why: 'The topic (modes of transmission) is in Ch3, but no lecture slide says which mode is the "most common", so the answer cannot be proven from the files.' }
    ],
    differ: [
      { file: 'Quiz 2, ch 2&3 (45).pdf', n: 6, q: 'Infectious droplets can travel ______ once released in the air.', options: ['6 meter', '3 inch', '3-6 cm', '3-6 feet'], quiz: '3-6 feet (option selected in the screenshot)', lecture: 'About 2 metres (EMS313_Ch03.pdf, slides 3, 5, 6). The lecture never states the distance in feet, so this question is not graded. Added conversion (not in the lecture): 3–6 feet ≈ 0.9–1.8 m, the only option close to about 2 m, so in an exam it is the option to choose; "6 meter" is far beyond the lecture value.' }
    ]
  },

  // Course files that could not be read (0 bytes in the repository) and whether their chapter is covered on the site.
  missing: [
    { file: 'Ch5 Safety at the Medical or Rescue Emergency .pdf', note: 'ملف محاضرة الفصل 5 فاضي (0 بايت)، فموضوع السلامة في موقع الحالة الطبية أو الإنقاذ غير مغطّى في الموقع.' },
    { file: 'Ch1 Introduction to the Role of Infection Preventionists.pdf', note: 'الملف فاضي (0 بايت)، لكن الفصل 1 مغطّى في الموقع من ملف CH01 - Tagged.pdf.' },
    { file: 'Ch2 Modes of Transmission.pdf', note: 'الملف فاضي (0 بايت). موضوعه حسب اسمه (طرق انتقال العدوى) مغطّى في الوحدة 3 من ملف EMS313_Ch03.pdf، لكن ما نقدر نتأكد إن محتواه نفسه.' },
    { file: 'Quiz 4, ch risk management (45).pdf', note: 'كويز فاضي (0 بايت)، وموضوع risk management ما له محاضرة في الملفات، فهو غير مغطّى في الموقع.' },
    { file: 'كويز الببلك هيلث risk management .pdf', note: 'كويز فاضي (0 بايت)، وموضوع risk management ما له محاضرة في الملفات، فهو غير مغطّى في الموقع.' },
    { file: 'Quiz 5, ch pre-incident (45).pdf', note: 'كويز فاضي (0 بايت)، وموضوع pre-incident ما له محاضرة في الملفات، فهو غير مغطّى في الموقع.' },
    { file: 'كويز الببلك هيلث pre-incident .pdf', note: 'كويز فاضي (0 بايت)، وموضوع pre-incident ما له محاضرة في الملفات، فهو غير مغطّى في الموقع.' },
    { file: 'الكويز ببلك هيلث safety at emergency incident .pdf', note: 'كويز فاضي (0 بايت) عن السلامة في موقع الحادث، وهو قريب من موضوع الفصل 5 اللي ملفه فاضي، فهو غير مغطّى في الموقع.' }
  ],

  research: [
    { h: 'الاسترجاع (Retrieval practice)', x: 'محاولة تذكّر المعلومة قبل ما تشوفها تثبّتها أكثر من إعادة القراءة. عشان كذا الإجابات مخفية والأسئلة بعد كل قسم.' },
    { h: 'التكرار المتباعد (Spacing)', x: 'توزيع المراجعة على أيام مختلفة أقوى من حشرها في جلسة وحدة. البطاقات ترجع لك في أيام جديدة حسب إجابتك.' },
    { h: 'الخلط (Interleaving)', x: 'خلط أسئلة من وحدات مختلفة يعلّمك تميّز نوع السؤال، وهذا اللي يصير في الاختبار الحقيقي.' },
    { h: 'التغذية الراجعة الفورية', x: 'تعرف الصح والسبب مباشرة، وتصحيح الخطأ بسرعة يمنع إنه يترسّخ.' },
    { h: 'الشرح والسببية (Elaboration)', x: 'أسئلة "ليش؟" وسلاسل السبب ← النتيجة تربط المعلومة بفهم، فتصير أسهل في التذكّر وفي حل أسئلة السيناريو.' }
  ]
};
