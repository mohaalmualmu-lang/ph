// Unit 6 — source: "EMS313 Vaccines English.pptx" (Chapter 6, 41 slides + speaker notes)
export default {
  id: 'ch6', n: 6,
  title: 'Vaccines & Vaccine-Preventable Diseases',
  ar: 'اللقاحات والأمراض التي يمكن الوقاية منها باللقاحات',
  file: 'EMS313 Vaccines English.pptx',
  sections: [
    {
      id: 's1', title: 'Principles of immunity', src: 'Slides 3–6',
      blocks: [
        { t: 'p', x: 'Vaccination prepares immune defenses **before exposure**, reducing the risk of disease and serious complications. An **{antigen|antigen}** is a substance the immune system can recognize. Vaccines present antigens (or instructions to make them) without requiring the natural disease. Vaccination is **primary prevention**: act before disease occurs.' },
        { t: 'table', cap: 'Active vs passive immunity (don\'t mix them up)', quiz: true, head: ['Feature', '{active|Active immunity}', '{passive|Passive immunity}'], rows: [
          ['Source', 'The body makes its own response', 'Ready-made antibodies are received'],
          ['Onset', 'Develops over days to weeks', 'Immediate protection'],
          ['Duration', 'Often long-lasting; memory develops', 'Temporary; usually weeks to months'],
          ['Examples', 'Vaccination or natural infection', 'Maternal antibodies; immune globulin']] },
        { t: 'note', k: 'key', x: '**Active = build a response. Passive = receive antibodies.**' },
        { t: 'h', x: 'How active immunity develops' },
        { t: 'order', id: 'c6-active' },
        { t: 'ul', items: ['A **primary series** builds protection; **{booster|booster} doses** may reinforce it.', '**Protection is not immediate after the first dose.**', 'Vaccine type, age and immune status affect the strength and duration of the response (notes).'] },
        { t: 'h', x: 'When passive immunity is useful' },
        { t: 'ul', items: ['Maternal antibodies cross the placenta and protect the newborn temporarily.', '{ig|Immune globulin} gives rapid protection after selected exposures.', 'Examples: **hepatitis B immune globulin ({hbig|HBIG})** and **tetanus immune globulin ({tig|TIG})**.', 'Depending on the situation, a clinician may give both ready-made antibodies and a vaccine (notes).'] }
      ],
      recall: [
        { q: 'Active vs passive immunity: source, onset, duration?', a: 'Active: own response, days–weeks, long-lasting with memory. Passive: ready-made antibodies, immediate, temporary (weeks–months).' },
        { q: 'Two examples of immune globulin products on slide 6?', a: 'HBIG (hepatitis B immune globulin) and TIG (tetanus immune globulin).' },
        { q: 'Why may boosters be needed?', a: 'A primary series builds protection; boosters reinforce it. Memory cells support a faster response later.' }
      ]
    },
    {
      id: 's2', title: 'Vaccine types', src: 'Slides 7–12',
      blocks: [
        { t: 'table', cap: 'Main vaccine types', quiz: true, head: ['Type', 'What is used?', 'Examples'], rows: [
          ['{live|Live attenuated}', 'A weakened, living organism', 'MMR; varicella'],
          ['{inactivated|Inactivated}', 'An organism that cannot replicate', 'IPV; hepatitis A'],
          ['{toxoid|Toxoid}', 'An inactivated bacterial toxin', 'Tetanus; diphtheria'],
          ['{subunit|Protein subunit} / {recombinant|recombinant}', 'Selected antigens', 'Hepatitis B; acellular pertussis'],
          ['{polysaccharide|Polysaccharide}', 'Capsule sugars alone', 'PPSV23'],
          ['{conjugate|Conjugate}', 'Capsule sugars linked to protein', 'Hib; PCV; MenACWY']] },
        { t: 'note', k: 'key', x: 'These categories can overlap: **recombinant describes how an antigen is made**, so a recombinant vaccine may also be a subunit vaccine.' },
        { t: 'twocol', a: { h: 'Live attenuated', items: ['Contain a weakened form of the organism', 'The vaccine organism **replicates** to stimulate immunity', 'Examples: MMR, varicella', '**Generally avoided during pregnancy and in severe immunosuppression**', 'Live attenuated does **not** mean unable to replicate', 'Reversion risk of certain oral polio vaccines should not be generalized to every live vaccine (notes)'] }, b: { h: 'Inactivated', items: ['Organisms killed or inactivated', '**Cannot replicate** or cause infection from vaccine organisms', 'Several doses may be needed', 'Examples: IPV, hepatitis A', 'A non-live vaccine can still cause expected local or systemic reactions (injection-site pain, temporary fever)'] } },
        { t: 'twocol', a: { h: 'Toxoid', items: ['Some bacteria cause disease mainly through a **toxin**', 'A toxoid is a toxin treated to remove its harmful activity', 'Vaccination produces antibodies that **neutralize the toxin**', 'Examples: tetanus, diphtheria', '**The immune target is the toxin**', 'Explains why a patient with the disease may need **antitoxin** (notes)'] }, b: { h: 'Subunit and recombinant', items: ['Subunit: selected parts of a pathogen', '**Acellular pertussis** uses purified bacterial antigens', 'Recombinant technology produces an antigen in engineered cells', 'Examples: **hepatitis B, HPV, recombinant zoster**', 'Hepatitis B is one example of recombinant vaccination, not the only one'] } },
        { t: 'table', cap: 'Polysaccharide vs conjugate (don\'t mix them up)', quiz: true, head: ['Feature', 'Plain polysaccharide', 'Conjugate'], rows: [
          ['Antigen', 'Capsule sugar alone', 'Capsule sugar linked to a protein'],
          ['Immune response', 'Mainly **T-cell independent**', 'Recruits **T-cell help**'],
          ['Young children', '**Weak response below age 2 years**', 'Effective responses in infancy'],
          ['Examples', 'PPSV23; Vi typhoid vaccine', 'Hib; PCV; MenACWY']] },
        { t: 'chain', items: ['Capsule sugar alone', 'Weak infant response (T-cell independent)', 'Link sugar to a protein', 'T-cell help → stronger response + memory'] },
        { t: 'sort', id: 'c6-types' }
      ],
      recall: [
        { q: 'Name the six vaccine types with one example each.', a: 'Live attenuated (MMR) · Inactivated (IPV) · Toxoid (tetanus) · Subunit/recombinant (hepatitis B) · Polysaccharide (PPSV23) · Conjugate (Hib).' },
        { q: 'Why are live vaccines avoided in pregnancy?', a: 'The vaccine organism replicates; live vaccines are generally avoided in pregnancy and severe immunosuppression.' },
        { q: 'Why is conjugation better for infants?', a: 'Linking capsule sugar to protein recruits T-cell help → effective response under 2 years + immune memory.' }
      ]
    },
    {
      id: 's3', title: 'Safe vaccination and the EMS approach', src: 'Slides 13–14',
      blocks: [
        { t: 'ul', items: ['Check the record, age, health status, and vaccine-specific precautions.', 'A **severe allergic reaction** to a previous dose or component requires assessment.', 'Use the correct product, dose, route, and schedule.', 'Maintain the required **{coldchain|cold chain}** and document each dose.', 'Eligibility and storage requirements depend on the specific vaccine.', 'Immunodeficiency does not rule out every vaccine: non-live vaccines may be appropriate, although the response may be weaker (notes).'] },
        { t: 'h', x: 'An EMS approach to suspected infection' },
        { t: 'order', id: 'c6-ems' },
        { t: 'table', cap: 'Three steps', quiz: true, head: ['Step', 'What to do'], rows: [
          ['1. Recognize and assess', 'Use the history, symptoms, and ABCDE assessment'],
          ['2. Protect', 'Apply Standard Precautions and add route-specific precautions'],
          ['3. Stabilize and communicate', 'Treat immediate threats, pre-alert the hospital, and report exposures']] },
        { t: 'p', x: 'Use local EMS protocols and occupational-health pathways. A clinical photograph alone cannot confirm the diagnosis (notes).' }
      ],
      recall: [
        { q: 'Three steps of the EMS approach to suspected infection?', a: 'Recognize and assess → Protect → Stabilize and communicate.' },
        { q: 'Name four checks for safe vaccination practice.', a: 'Record/age/health status/precautions; severe allergy assessment; correct product, dose, route, schedule; cold chain + documentation.' }
      ]
    },
    {
      id: 's4', title: 'Varicella and shingles (VZV)', src: 'Slides 15–16, 34–35',
      blocks: [
        { t: 'dcards', items: [
          { name: 'Varicella (chickenpox)', agent: '{vzv|Varicella-zoster virus (VZV)}: primary infection', clue: 'Itchy rash in **crops**: spots, blisters and crusts **coexist** (lesions at different stages)', spread: 'Airborne particles + contact with blister fluid', prec: '**Airborne + Contact** (plus Standard)', vaccine: 'Varicella vaccine: **live attenuated**, prevents primary infection', note: 'Complications: skin infection, pneumonia, encephalitis. Severe illness more likely in adults, pregnancy, immunosuppression. Contagious **before the rash until all lesions crust**.', src: 'Slides 15–16' },
          { name: 'Shingles (herpes zoster)', agent: '**Reactivation** of latent VZV after chickenpox', clue: 'Pain, burning or tingling, then a **one-sided** blistering rash along a **{dermatome|dermatome}**', spread: 'VZV from shingles can cause **chickenpox** in a susceptible contact', prec: 'Cover lesions; precautions depend on extent of disease and immune status', vaccine: '**Recombinant zoster vaccine (RZV)**: **non-live**, two-dose series', note: 'Persistent nerve pain = **{phn|postherpetic neuralgia}**. Eye involvement or widespread disease needs urgent evaluation. Saudi MOH: adults **50+** and immunocompromised adults **18+**.', src: 'Slides 34–35' }] },
        { t: 'table', cap: 'Varicella vs shingles (don\'t mix them up)', quiz: true, head: ['', 'Varicella', 'Shingles'], rows: [
          ['What', 'Primary VZV infection', 'Reactivation of latent VZV'],
          ['Rash', 'Itchy, in crops, all stages together, widespread', 'One-sided, grouped blisters along a dermatome, painful'],
          ['Vaccine', 'Varicella vaccine (live attenuated)', 'RZV (non-live, 2 doses)'],
          ['Key point', 'Airborne + contact precautions', 'RZV is **not a substitute** for the varicella vaccine']] },
        { t: 'note', k: 'conflict', x: 'Varicella precautions: Ch3 lists chickenpox under **airborne** (slides 6, 17). The vaccines lecture adds **contact** for blister fluid: **Airborne + Contact** (slides 16, 38). They do not contradict each other; the vaccines lecture is more complete.' },
        { t: 'p', x: 'For mild breakthrough cases with lesions that do not crust, guidance uses a period of **24 hours without new lesions** (notes, slide 16). Gloves alone are insufficient.' }
      ],
      recall: [
        { q: 'Varicella: route and precautions?', a: 'Airborne particles + contact with blister fluid → Airborne + Contact precautions (in addition to Standard).' },
        { q: 'Until when is a varicella patient contagious?', a: 'From before the rash until all lesions crust.' },
        { q: 'RZV: live or non-live, how many doses, which groups (Saudi MOH)?', a: 'Non-live, two-dose series; adults 50+ and immunocompromised adults 18+.' }
      ]
    },
    {
      id: 's5', title: 'Toxin diseases: diphtheria and tetanus', src: 'Slides 17–18, 36–37',
      blocks: [
        { t: 'dcards', items: [
          { name: 'Diphtheria', agent: 'Toxigenic **Corynebacterium diphtheriae**', clue: 'Thick **grey-white {pseudomembrane|pseudomembrane}** in the throat that may obstruct the airway; toxin can damage the **heart and peripheral nerves**', spread: 'Respiratory droplets and secretions', prec: 'Respiratory: **Droplet**. Cutaneous: **Contact**', vaccine: 'Diphtheria **toxoid** in combination vaccines: **{dtap|DTaP}** (young children); **Tdap / Td** (older age groups)', note: 'Assess airway promptly; avoid unnecessary throat manipulation. Suspected respiratory disease → urgent **antibiotics + diphtheria antitoxin** (before lab confirmation).', src: 'Slides 17–18' },
          { name: 'Tetanus', agent: '**Clostridium tetani** spores enter through wounds or breaks in the skin', clue: 'Toxin blocks inhibitory nerve signals → **rigidity and painful spasms**, **lockjaw**, swallowing difficulty, respiratory compromise', spread: '**Does not spread from person to person**', prec: 'Standard; urgent hospital care and close airway monitoring', vaccine: 'Tetanus **toxoid** (tetanus-containing vaccine); **TIG** for selected wounds', note: 'After a wound: clean it, review wound type and vaccination history, give a tetanus-containing vaccine when indicated; TIG may also be needed for selected dirty or major wounds and susceptible patients. **TIG = passive; vaccine = active.**', src: 'Slides 36–37' }] },
        { t: 'p', x: 'In DTaP and Tdap, **D** = diphtheria, **T** = tetanus, **aP** = acellular pertussis. DTaP and Tdap differ in formulation and in the age groups for which they are appropriate (notes).' },
        { t: 'chain', items: ['Dirty wound', 'Vaccine (active immunity, builds over time)', '+ TIG if indicated (passive, immediate)', 'Both may be needed together'] }
      ],
      recall: [
        { q: 'Classic sign of diphtheria and its danger?', a: 'Adherent grey-white pseudomembrane in the throat → airway obstruction; toxin can damage heart and nerves.' },
        { q: 'Diphtheria precautions: respiratory vs cutaneous?', a: 'Respiratory: droplet. Cutaneous: contact.' },
        { q: 'Does tetanus spread person to person?', a: 'No. Spores enter through wounds.' },
        { q: 'After a dirty wound, why give both vaccine and TIG?', a: 'TIG gives immediate passive antibodies; the vaccine builds active immunity.' }
      ]
    },
    {
      id: 's6', title: 'Hepatitis A and B', src: 'Slides 19–21',
      blocks: [
        { t: 'table', cap: 'Hepatitis A vs B (don\'t mix them up)', quiz: true, head: ['Feature', 'Hepatitis A', 'Hepatitis B'], rows: [
          ['Main route', '**{fecaloral|Fecal–oral}** (contaminated food, water, close contact)', 'Infected **blood and certain body fluids**, including during birth'],
          ['Illness', 'Acute: fatigue, nausea, abdominal discomfort, dark urine, jaundice', 'Acute may be silent or cause fatigue, nausea, jaundice'],
          ['Chronic infection', '**No** (treatment mainly supportive)', '**Possible**; can lead to cirrhosis and liver cancer'],
          ['Chronicity by age', '—', 'About **90% after infant** infection vs about **5% after adult** infection'],
          ['Vaccine type', '**Inactivated**', '**Recombinant protein subunit**'],
          ['EMS focus', 'Hand hygiene; manage contamination', 'Sharps safety; vaccination; exposure reporting']] },
        { t: 'ul', items: ['Hepatitis A prevention combines vaccination, hand hygiene, and safe food and water.', 'Most immunocompetent adults recover from acute HBV infection.', 'Symptoms alone do not identify the type of hepatitis (notes).', '**After an exposure, seek prompt assessment for vaccine and/or immune globulin.** After a needlestick, report immediately (notes).'] }
      ],
      recall: [
        { q: 'Hepatitis A vs B: route, chronicity, vaccine type?', a: 'A: fecal–oral, no chronic infection, inactivated vaccine. B: blood/body fluids, chronic possible (highest risk in infancy), recombinant protein subunit vaccine.' },
        { q: 'HBV chronicity: infant vs adult?', a: 'About 90% after infant infection vs about 5% after adult infection.' }
      ]
    },
    {
      id: 's7', title: 'Influenza, measles, mumps and rubella', src: 'Slides 22–24, 27, 32–33',
      blocks: [
        { t: 'dcards', items: [
          { name: 'Influenza', agent: 'Influenza virus', clue: 'Abrupt cough, fever, headache, fatigue, muscle aches. **Older or immunocompromised may have little or no fever**', spread: 'Respiratory droplets', prec: '**Droplet**', vaccine: '**Annual** vaccination; non-live vaccines; a live nasal vaccine for eligible groups (notes)', note: 'Complications: pneumonia, worsening of chronic disease. Early antivirals for selected high-risk or severely ill patients.', src: 'Slide 22' },
          { name: 'Measles', agent: 'Measles virus', clue: 'High fever, cough, runny nose, **red eyes**; **{koplik|Koplik spots}** inside the mouth; rash **starts on the face and spreads downward**', spread: '**Airborne**: virus can remain infectious in the air **up to 2 hours** after the patient leaves', prec: '**Airborne**: fit-tested N95 or equivalent; mask the patient if tolerated; pre-alert', vaccine: '**MMR**: live attenuated (measles, mumps, rubella)', note: 'Complications: pneumonia, encephalitis. Suspect early in an unvaccinated patient with fever and rash. A surgical mask on the provider is not sufficient.', src: 'Slides 23–24' },
          { name: 'Mumps', agent: 'Mumps virus', clue: '**{parotitis|Parotid} swelling** near the jaw and ear (one or both sides); fever, headache, malaise', spread: 'Saliva and respiratory droplets', prec: '**Droplet**', vaccine: '**MMR**', note: 'Complications: **orchitis**, meningitis, hearing loss. Care mainly supportive.', src: 'Slide 27' },
          { name: 'Rubella', agent: 'Rubella virus', clue: 'Mild rash, low fever, **enlarged lymph nodes**; some infections have few or no symptoms', spread: 'Respiratory droplets', prec: '**Droplet** (acquired rubella)', vaccine: '**MMR**: live, **not given during pregnancy**; susceptible patients vaccinated **postpartum**', note: 'Greatest concern: **pregnancy** → miscarriage, fetal death or **{crs|congenital rubella syndrome}** (hearing loss, eye defects, congenital heart disease). Review immunity before pregnancy.', src: 'Slides 32–33' }] },
        { t: 'table', cap: 'Measles vs rubella (don\'t mix them up)', quiz: true, head: ['', 'Measles', 'Rubella'], rows: [
          ['Precaution', 'Airborne', 'Droplet'],
          ['Picture', 'High fever, cough, coryza, red eyes, Koplik spots, rash face → down', 'Mild rash, low fever, enlarged lymph nodes; may be silent'],
          ['Main danger', 'Pneumonia, encephalitis; spreads through the air', 'Pregnancy: congenital rubella syndrome'],
          ['Vaccine', 'MMR (live)', 'MMR (live; not in pregnancy)']] }
      ],
      recall: [
        { q: 'Measles: where does the rash start, and what is inside the mouth?', a: 'Starts on the face and spreads downward; Koplik spots inside the mouth.' },
        { q: 'How long can measles virus stay infectious in the air?', a: 'Up to 2 hours after the patient leaves.' },
        { q: 'Mumps complications?', a: 'Orchitis, meningitis, hearing loss.' },
        { q: 'Congenital rubella syndrome effects?', a: 'Hearing loss, eye defects, congenital heart disease.' },
        { q: 'Why is MMR not given during pregnancy?', a: 'It is a live vaccine; susceptible patients are vaccinated postpartum.' }
      ]
    },
    {
      id: 's8', title: 'Meningococcal disease, pertussis and polio', src: 'Slides 25–26, 28–31',
      blocks: [
        { t: 'dcards', items: [
          { name: 'Meningococcal disease', agent: '**Neisseria meningitidis**: meningitis or bloodstream infection', clue: 'Fever, headache, neck stiffness, altered mental status; **non-blanching petechial or purpuric rash**; sepsis and shock can progress rapidly, **sometimes before a rash appears**', spread: 'Close contact with respiratory or throat secretions', prec: '**Droplet**; urgent antibiotics', vaccine: '**MenACWY** and **MenB** cover **different serogroups**', note: '**Do not wait for a rash** before recognizing and treating possible sepsis. Unprotected secretion exposure may require **antibiotic prophylaxis** after assessment. Vaccination does not replace assessment after a qualifying exposure. Hajj-related requirements (notes).', src: 'Slides 25–26' },
          { name: 'Pertussis', agent: '**Bordetella pertussis**', clue: 'Cold-like start → repeated coughing fits, vomiting or an inspiratory **"whoop"**. **Infants may present with apnea** and little obvious cough', spread: 'Respiratory droplets', prec: '**Droplet**', vaccine: '**DTaP / Tdap** contain acellular pertussis antigens; **protection can wane**', note: 'Early antibiotics reduce severity and transmission; later treatment may not shorten an established cough. Post-exposure prophylaxis for defined high-risk contacts.', src: 'Slides 28–29' },
          { name: 'Polio', agent: 'Poliovirus', clue: 'Most infections have no obvious symptoms; a small proportion cause **acute flaccid weakness or paralysis**; respiratory muscle involvement can be life-threatening', spread: 'Mainly **fecal–oral**', prec: 'New acute flaccid weakness: urgent assessment and **notification**', vaccine: '**IPV** (inactivated, injection) or **OPV** (live attenuated, oral drops)', note: 'Product choice follows current national policy, not a general preference.', src: 'Slides 30–31' }] },
        { t: 'table', cap: 'IPV vs OPV (don\'t mix them up)', quiz: true, head: ['Feature', '{ipv|IPV}', '{opv|OPV}'], rows: [
          ['Type and route', 'Inactivated; injection', 'Live attenuated; oral drops'],
          ['Main strength', 'Strong protection against paralysis', 'Strong **intestinal immunity** (helps interrupt transmission)'],
          ['Vaccine-virus risk', 'No replication or vaccine-derived virus', 'Rare vaccine-associated or derived poliovirus risks'],
          ['Use', 'Follow national schedules and travel guidance', 'Depends on national and outbreak programmes']] }
      ],
      recall: [
        { q: 'Meningococcal disease: what must you NOT wait for?', a: 'A rash. Sepsis and shock can progress before a rash appears.' },
        { q: 'How may pertussis present in an infant?', a: 'Apnea with little obvious cough (no classic whoop).' },
        { q: 'IPV vs OPV: main strength of each?', a: 'IPV: strong protection against paralysis, no vaccine-virus risk. OPV: strong intestinal immunity, rare vaccine-derived risks.' }
      ]
    },
    {
      id: 's9', title: 'Review: precautions and Saudi guidance', src: 'Slides 38–39',
      blocks: [
        { t: 'table', cap: 'Respiratory precautions: key comparisons', quiz: true, head: ['Suspected disease', 'Additional precautions', 'Practical reminder'], rows: [
          ['Measles', 'Airborne', 'Fit-tested N95 or equivalent'],
          ['Varicella', 'Airborne + Contact', 'Cover lesions; limit exposure'],
          ['Influenza; respiratory diphtheria', 'Droplet', 'Mask patient if tolerated'],
          ['Meningococcal disease; mumps; pertussis; acquired rubella', 'Droplet', 'Pre-alert and assess relevant exposures']] },
        { t: 'note', k: 'key', x: '**Standard Precautions always apply.** Follow procedure-specific PPE guidance; aerosol-generating procedures may need extra protection. Rubella here = acquired infection; congenital cases have different requirements (notes).' },
        { t: 'sort', id: 'c6-prec' },
        { t: 'h', x: 'Using vaccination guidance in Saudi Arabia' },
        { t: 'ul', items: ['Use the current **Saudi MOH schedule** for routine childhood doses and catch-up needs.', 'Review adult vaccination according to age, health conditions, pregnancy, and prior doses.', '**Healthcare workers** need documented vaccination and immunity according to occupational-health policy.', 'Check current **Hajj, Umrah, and travel** requirements for the relevant season and destination.', 'Use the patient\'s record plus current guidance; **do not rely on an old schedule image**.'] }
      ],
      recall: [
        { q: 'Which two diseases in the review table need airborne precautions?', a: 'Measles (airborne) and varicella (airborne + contact).' },
        { q: 'Which diseases need droplet precautions in the review table?', a: 'Influenza, respiratory diphtheria, meningococcal disease, mumps, pertussis, acquired rubella.' }
      ]
    }
  ],

  orders: [
    { id: 'c6-active', sec: 's1', src: 'Slide 5', title: 'How active immunity develops', steps: ['Antigen exposure', 'Specific B and T lymphocytes are activated', 'B cells produce antibodies against the antigen', 'Memory cells remain', 'Faster response at later exposure'] },
    { id: 'c6-ems', sec: 's3', src: 'Slide 14', title: 'EMS approach to suspected infection', steps: ['Recognize and assess (history, symptoms, ABCDE)', 'Protect (Standard + route-specific precautions)', 'Stabilize and communicate (treat threats, pre-alert, report exposures)'] }
  ],
  sorts: [
    { id: 'c6-types', sec: 's2', src: 'Slides 7–12, 21, 31, 35', title: 'Which vaccine type?', cats: ['Live attenuated', 'Inactivated', 'Toxoid', 'Subunit / recombinant', 'Polysaccharide', 'Conjugate'],
      items: [['MMR', 0], ['Varicella vaccine', 0], ['OPV', 0], ['IPV', 1], ['Hepatitis A vaccine', 1], ['Tetanus vaccine', 2], ['Diphtheria vaccine', 2], ['Hepatitis B vaccine', 3], ['Acellular pertussis', 3], ['Recombinant zoster vaccine (RZV)', 3], ['PPSV23', 4], ['Vi typhoid vaccine', 4], ['Hib', 5], ['PCV', 5], ['MenACWY', 5]] },
    { id: 'c6-prec', sec: 's9', src: 'Slides 16, 18, 22, 24, 26–29, 32, 38', title: 'Additional precautions for each disease', cats: ['Airborne', 'Airborne + Contact', 'Droplet', 'Contact'],
      items: [['Measles', 0], ['Varicella', 1], ['Influenza', 2], ['Respiratory diphtheria', 2], ['Cutaneous diphtheria', 3], ['Meningococcal disease', 2], ['Mumps', 2], ['Pertussis', 2], ['Acquired rubella', 2]] }
  ],

  questions: [
    { id: 'c6q1', sec: 's1', q: 'Passive immunity:', o: ['Gives immediate but temporary protection with ready-made antibodies', 'Develops over days to weeks, is long-lasting and creates immune memory', 'Is produced by vaccination', 'Lasts for life after one dose'], x: 'Slide 4.', src: 'Slide 4' },
    { id: 'c6q2', sec: 's1', q: 'Which is an example of passive immunity?', o: ['Maternal antibodies crossing the placenta', 'Natural infection with measles', 'MMR vaccination', 'A hepatitis B vaccine series'], x: 'Slides 4, 6.', src: 'Slides 4, 6' },
    { id: 'c6q3', sec: 's1', q: 'An antigen is:', o: ['A substance the immune system can recognize', 'A ready-made antibody given to provide immediate protection', 'A memory cell', 'A vaccine preservative'], x: 'Slide 3.', src: 'Slide 3' },
    { id: 'c6q4', sec: 's1', q: 'Which cells support a faster response to a later exposure?', o: ['Memory cells', 'Red blood cells', 'Platelets', 'Maternal antibodies'], x: 'Slide 5.', src: 'Slide 5' },
    { id: 'c6q5', sec: 's1', q: 'HBIG and TIG are examples of:', o: ['Immune globulin (passive immunity)', 'Live attenuated vaccines', 'Toxoid vaccines', 'Conjugate vaccines'], x: 'Slide 6.', src: 'Slide 6' },
    { id: 'c6q6', sec: 's1', q: 'Vaccination is which level of prevention?', o: ['Primary prevention', 'Secondary prevention', 'Tertiary prevention', 'Post-exposure treatment'], x: 'Slide 3: act before disease occurs.', src: 'Slide 3' },
    { id: 'c6q7', sec: 's1', q: 'Which statement about the first vaccine dose is correct?', o: ['Protection is not immediate after the first dose', 'Protection is complete immediately', 'Boosters are never needed', 'It works as passive immunity'], x: 'Slide 5.', src: 'Slide 5' },
    { id: 'c6q8', sec: 's2', q: 'MMR and varicella vaccines are:', o: ['Live attenuated', 'Inactivated', 'Toxoid', 'Polysaccharide'], x: 'Slides 7–8.', src: 'Slides 7–8' },
    { id: 'c6q9', sec: 's2', q: 'Which vaccine type uses an inactivated bacterial toxin?', o: ['Toxoid', 'Conjugate', 'Subunit', 'Live attenuated'], x: 'Slides 7, 10.', src: 'Slides 7, 10' },
    { id: 'c6q10', sec: 's2', q: 'IPV and hepatitis A vaccines are:', o: ['Inactivated', 'Live attenuated', 'Toxoid', 'Conjugate'], x: 'Slides 7, 9.', src: 'Slides 7, 9' },
    { id: 'c6q11', sec: 's2', q: 'Live attenuated vaccines are generally avoided in:', o: ['Pregnancy and severe immunosuppression', 'Healthy adults', 'Healthcare workers who care for immunocompromised patients', 'Travellers to Hajj'], x: 'Slide 8.', src: 'Slide 8' },
    { id: 'c6q12', sec: 's2', q: 'Which statement about live attenuated vaccines is correct?', o: ['The vaccine organism replicates to stimulate immunity', 'They cannot replicate, so they are safe in pregnancy and immunosuppression', 'They contain only capsule sugars', 'They are toxins treated to remove harm'], x: 'Slide 8: live attenuated does not mean unable to replicate.', src: 'Slide 8' },
    { id: 'c6q13', sec: 's2', q: 'Hepatitis B vaccine is an example of:', o: ['A recombinant protein subunit vaccine', 'A live attenuated vaccine', 'A toxoid vaccine', 'A plain polysaccharide vaccine'], x: 'Slides 7, 11, 21.', src: 'Slides 7, 11, 21' },
    { id: 'c6q14', sec: 's2', q: 'Plain polysaccharide vaccines give a weak response in children younger than:', o: ['2 years', '6 months', '5 years', '12 years'], x: 'Slide 12.', src: 'Slide 12' },
    { id: 'c6q15', sec: 's2', q: 'Conjugate vaccines work better in infants because they:', o: ['Link capsule sugar to a protein and recruit T-cell help', 'Contain live organisms', 'Contain capsule sugar alone, which infants respond to strongly without T cells', 'Give ready-made antibodies'], x: 'Slide 12.', src: 'Slide 12' },
    { id: 'c6q16', sec: 's2', q: 'Which is a CONJUGATE vaccine?', o: ['Hib', 'PPSV23', 'Vi typhoid vaccine', 'IPV'], x: 'Slides 7, 12: Hib, PCV, MenACWY.', src: 'Slide 12' },
    { id: 'c6q17', sec: 's2', q: '"Recombinant" describes:', o: ['How an antigen is made (in engineered cells)', 'A weakened living organism that replicates to stimulate immunity', 'A vaccine given orally', 'An inactivated toxin'], x: 'Slides 7, 11.', src: 'Slides 7, 11' },
    { id: 'c6q18', sec: 's3', q: 'Which is part of safe vaccination practice?', o: ['Maintain the cold chain and document each dose', 'Use any available schedule image', 'Skip assessment after a severe allergic reaction', 'Give every vaccine to every immunocompromised patient'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c6q19', sec: 's3', q: 'In the EMS approach to suspected infection, "Protect" means:', o: ['Apply Standard Precautions and add route-specific precautions', 'Treat immediate threats and pre-alert the hospital', 'Use the ABCDE assessment', 'Report exposures to occupational health'], x: 'Slide 14.', src: 'Slide 14' },
    { id: 'c6q58', sec: 's3', q: 'A patient had a severe allergic reaction to a previous dose or component of a vaccine. Safe practice requires:', o: ['Assessment before any further dose', 'Giving the next dose at a lower volume without assessment', 'Giving the next dose as scheduled with no change', 'Switching to a live attenuated vaccine instead'], x: 'Slide 13.', src: 'Slide 13' },
    { id: 'c6q59', sec: 's3', q: 'What is the FIRST step of the EMS approach to suspected infection?', o: ['Recognize and assess', 'Protect the team with precautions', 'Stabilize and communicate with the hospital', 'Report the exposure to occupational health'], x: 'Slide 14: recognize and assess → protect → stabilize and communicate.', src: 'Slide 14' },

    { id: 'c6q20', sec: 's4', q: 'A varicella rash is characterized by:', o: ['Spots, blisters and crusts at different stages at the same time', 'A one-sided rash along a dermatome', 'A rash that starts on the face and spreads downward over several days', 'A non-blanching purpuric rash'], x: 'Slide 15.', src: 'Slide 15' },
    { id: 'c6q21', sec: 's4', q: 'Suspected chickenpox requires:', o: ['Airborne and Contact Precautions (plus Standard)', 'Droplet Precautions only, with a surgical mask on the crew', 'Contact Precautions only', 'Standard Precautions only'], x: 'Slides 16, 38.', src: 'Slides 16, 38' },
    { id: 'c6q22', sec: 's4', q: 'Varicella patients are usually contagious:', o: ['From before the rash until all lesions crust', 'Only after the rash appears', 'Only while they have fever', 'For 24 hours after the first lesion'], x: 'Slide 16.', src: 'Slide 16' },
    { id: 'c6q23', sec: 's4', q: 'Shingles results from:', o: ['Reactivation of latent varicella-zoster virus', 'A first infection with a new virus', 'A bacterial skin infection', 'A reaction to the varicella vaccine'], x: 'Slide 34.', src: 'Slide 34' },
    { id: 'c6q24', sec: 's4', q: 'Persistent nerve pain after shingles is called:', o: ['Postherpetic neuralgia', 'Orchitis', 'Encephalitis', 'Lockjaw'], x: 'Slide 34.', src: 'Slide 34' },
    { id: 'c6q25', sec: 's4', q: 'The recombinant zoster vaccine (RZV) is:', o: ['Non-live, given as a two-dose series', 'Live attenuated, one dose', 'A toxoid, given yearly', 'A substitute for the varicella vaccine'], x: 'Slide 35.', src: 'Slide 35' },
    { id: 'c6q26', sec: 's4', q: 'Per the Saudi MOH guidance cited in the lecture, RZV is for adults aged ___ and immunocompromised adults aged ___.', o: ['50+; 18+', '65+; 18+', '50+; 30+', '18+; 12+'], x: 'Slide 35.', src: 'Slide 35' },
    { id: 'c6q27', sec: 's4', q: 'A susceptible contact exposed to VZV from a shingles patient may develop:', o: ['Chickenpox', 'Shingles', 'Measles', 'Mumps'], x: 'Slide 35.', src: 'Slide 35' },
    { id: 'c6q28', sec: 's5', q: 'A thick grey-white adherent pseudomembrane in the throat suggests:', o: ['Diphtheria', 'Mumps', 'Pertussis', 'Influenza'], x: 'Slide 17.', src: 'Slide 17' },
    { id: 'c6q29', sec: 's5', q: 'Suspected respiratory diphtheria requires urgent:', o: ['Antibiotics and diphtheria antitoxin', 'MMR vaccination', 'Antivirals only', 'Immune globulin for hepatitis B'], x: 'Slide 18.', src: 'Slide 18' },
    { id: 'c6q30', sec: 's5', q: 'Cutaneous diphtheria requires:', o: ['Contact Precautions', 'Airborne Precautions', 'Droplet Precautions', 'No precautions'], x: 'Slide 18.', src: 'Slide 18' },
    { id: 'c6q31', sec: 's5', q: 'Which statement about tetanus is correct?', o: ['It does not spread from person to person', 'It spreads by respiratory droplets', 'It needs airborne precautions', 'It is caused by a virus'], x: 'Slide 36.', src: 'Slide 36' },
    { id: 'c6q32', sec: 's5', q: 'The tetanus toxin causes rigidity and spasms by:', o: ['Blocking inhibitory nerve signals', 'Destroying the liver', 'Forming a throat pseudomembrane', 'Infecting the parotid gland'], x: 'Slide 36.', src: 'Slide 36' },
    { id: 'c6q33', sec: 's5', q: 'After a dirty major wound in a susceptible patient, TIG provides:', o: ['Passive antibodies, while the vaccine builds active immunity', 'Active immunity that develops over several weeks and lasts for life', 'A live attenuated organism', 'Antibiotic prophylaxis'], x: 'Slide 37.', src: 'Slide 37' },
    { id: 'c6q34', sec: 's5', q: 'In "DTaP", "aP" stands for:', o: ['Acellular pertussis', 'Active polio', 'Attenuated pneumococcus', 'Antitoxin protein'], x: 'Slide 18 notes.', src: 'Slide 18' },
    { id: 'c6q35', sec: 's6', q: 'Hepatitis A spreads mainly by:', o: ['The fecal–oral route', 'Blood and body fluids', 'Airborne droplet nuclei', 'Mosquito bites'], x: 'Slide 19.', src: 'Slide 19' },
    { id: 'c6q36', sec: 's6', q: 'Which statement about hepatitis A is correct?', o: ['It does not cause chronic infection', 'It commonly becomes chronic in adults', 'Its vaccine is recombinant subunit', 'It spreads mainly through needlesticks'], x: 'Slide 19, 21.', src: 'Slides 19, 21' },
    { id: 'c6q37', sec: 's6', q: 'The risk of chronic hepatitis B after infection in infancy is about:', o: ['90%', '5%', '50%', '25%'], x: 'Slide 20: ~90% after infant infection vs ~5% after adult infection.', src: 'Slide 20' },
    { id: 'c6q38', sec: 's6', q: 'The EMS focus for hepatitis B is:', o: ['Sharps safety, vaccination and exposure reporting', 'Hand hygiene and managing fecal contamination', 'Airborne precautions', 'Annual vaccination'], x: 'Slide 21.', src: 'Slide 21' },
    { id: 'c6q39', sec: 's6', q: 'Chronic hepatitis B can lead to:', o: ['Cirrhosis and liver cancer', 'Congenital rubella syndrome', 'Postherpetic neuralgia', 'Acute flaccid paralysis'], x: 'Slide 20.', src: 'Slide 20' },
    { id: 'c6q40', sec: 's7', q: 'Older or immunocompromised patients with influenza may:', o: ['Have little or no fever', 'Always have a high fever', 'Develop Koplik spots', 'Develop a pseudomembrane'], x: 'Slide 22.', src: 'Slide 22' },
    { id: 'c6q41', sec: 's7', q: 'Koplik spots inside the mouth are a feature of:', o: ['Measles', 'Rubella', 'Mumps', 'Varicella'], x: 'Slide 23.', src: 'Slide 23' },
    { id: 'c6q42', sec: 's7', q: 'Measles virus can remain infectious in the air for up to:', o: ['2 hours after the patient leaves', '10 minutes', '24 hours', '2 days'], x: 'Slide 24.', src: 'Slide 24' },
    { id: 'c6q43', sec: 's7', q: 'For suspected measles, the provider needs:', o: ['A fit-tested N95 or equivalent respirator', 'A surgical mask on the provider and gloves for contact', 'Gloves only', 'No PPE if vaccinated'], x: 'Slide 24: a surgical mask on the provider is not sufficient.', src: 'Slide 24' },
    { id: 'c6q44', sec: 's7', q: 'Swelling near the jaw and ear with fever suggests:', o: ['Mumps', 'Diphtheria', 'Measles', 'Tetanus'], x: 'Slide 27: parotid swelling.', src: 'Slide 27' },
    { id: 'c6q45', sec: 's7', q: 'A complication of mumps is:', o: ['Orchitis', 'Postherpetic neuralgia', 'Liver cancer', 'Pseudomembrane'], x: 'Slide 27: orchitis, meningitis, hearing loss.', src: 'Slide 27' },
    { id: 'c6q46', sec: 's7', q: 'The greatest concern with rubella is:', o: ['Infection during pregnancy', 'Airway obstruction', 'Chronic liver disease', 'Paralysis'], x: 'Slides 32–33.', src: 'Slides 32–33' },
    { id: 'c6q47', sec: 's7', q: 'Congenital rubella syndrome effects include:', o: ['Hearing loss, eye defects and congenital heart disease', 'Lockjaw and spasms', 'Orchitis, meningitis and permanent hearing loss in the newborn', 'Cirrhosis and jaundice'], x: 'Slide 33.', src: 'Slide 33' },
    { id: 'c6q48', sec: 's7', q: 'A susceptible pregnant patient needs rubella protection. When can MMR be given?', o: ['Postpartum, because MMR is live', 'Immediately during pregnancy', 'In the second trimester only', 'Never'], x: 'Slide 33.', src: 'Slide 33' },
    { id: 'c6q49', sec: 's8', q: 'In suspected meningococcal disease, which is correct?', o: ['Do not wait for a rash before treating possible sepsis', 'Treat only after the rash appears', 'Airborne precautions are required', 'Vaccination replaces assessment after exposure'], x: 'Slides 25–26.', src: 'Slides 25–26' },
    { id: 'c6q50', sec: 's8', q: 'MenACWY and MenB vaccines:', o: ['Cover different serogroups', 'Cover exactly the same serogroups', 'Are live attenuated', 'Are toxoids'], x: 'Slide 26.', src: 'Slide 26' },
    { id: 'c6q51', sec: 's8', q: 'An infant with pertussis may present with:', o: ['Apnea with little obvious cough', 'A one-sided blistering rash', 'Parotid swelling', 'Lockjaw'], x: 'Slide 28.', src: 'Slide 28' },
    { id: 'c6q52', sec: 's8', q: 'Antibiotics for pertussis are most useful when:', o: ['Started early', 'Started after weeks of coughing', 'Given only to adults', 'Combined with MMR'], x: 'Slide 29: later treatment may not shorten an established cough.', src: 'Slide 29' },
    { id: 'c6q53', sec: 's8', q: 'Poliovirus spreads mainly by:', o: ['The fecal–oral route', 'Airborne droplet nuclei', 'Blood exposure', 'Skin contact with blisters'], x: 'Slide 30.', src: 'Slide 30' },
    { id: 'c6q54', sec: 's8', q: 'Which polio vaccine gives strong intestinal immunity but carries rare vaccine-derived risks?', o: ['OPV', 'IPV', 'Both equally', 'Neither'], x: 'Slide 31.', src: 'Slide 31' },
    { id: 'c6q55', sec: 's8', q: 'IPV is:', o: ['Inactivated and given by injection', 'Live attenuated oral drops', 'A toxoid', 'A conjugate vaccine'], x: 'Slide 31.', src: 'Slide 31' },
    { id: 'c6q56', sec: 's9', q: 'According to the review table, which disease needs DROPLET precautions?', o: ['Pertussis', 'Measles', 'Varicella', 'None of them'], x: 'Slide 38.', src: 'Slide 38' },
    { id: 'c6q57', sec: 's9', q: 'Which is correct about using vaccination guidance in Saudi Arabia?', o: ['Use the patient\'s record plus current MOH guidance, not an old schedule image', 'Use the most recent schedule image you have saved, even if it is a few years old', 'Hajj requirements never change', 'Healthcare workers do not need documented immunity'], x: 'Slide 39.', src: 'Slide 39' },
    { id: 'c6q60', sec: 's9', q: 'Which disease needs Airborne PLUS Contact precautions in the review table?', o: ['Varicella', 'Measles', 'Mumps', 'Influenza'], x: 'Slide 38.', src: 'Slide 38' },
    { id: 'c6q61', sec: 's9', q: 'Healthcare workers need documented vaccination and immunity according to:', o: ['Occupational-health policy', 'Their own preference and travel plans', 'An old vaccination schedule image', 'The request of each patient they treat'], x: 'Slide 39.', src: 'Slide 39' },

  ],

  cards: [
    { sec: 's1', f: 'Active vs passive immunity', b: 'Active: own response, days–weeks, memory (vaccine, infection). Passive: ready-made antibodies, immediate, temporary (maternal antibodies, immune globulin).' },
    { sec: 's1', f: 'HBIG / TIG', b: 'Hepatitis B immune globulin / tetanus immune globulin: passive, rapid protection after selected exposures.' },
    { sec: 's2', f: 'Live attenuated: examples and caution', b: 'MMR, varicella (also OPV). Organism replicates. Avoid in pregnancy and severe immunosuppression.' },
    { sec: 's2', f: 'Inactivated: examples', b: 'IPV, hepatitis A. Cannot replicate; may need several doses.' },
    { sec: 's2', f: 'Toxoid: examples and target', b: 'Tetanus, diphtheria. Target = the toxin (antibodies neutralize it).' },
    { sec: 's2', f: 'Subunit / recombinant: examples', b: 'Hepatitis B, acellular pertussis, HPV, recombinant zoster.' },
    { sec: 's2', f: 'Polysaccharide vs conjugate', b: 'Polysaccharide: sugar alone, T-cell independent, weak <2 y (PPSV23, Vi typhoid). Conjugate: sugar + protein, T-cell help, works in infancy (Hib, PCV, MenACWY).' },
    { sec: 's3', f: 'EMS approach to suspected infection', b: 'Recognize & assess → Protect → Stabilize & communicate.' },
    { sec: 's4', f: 'Varicella', b: 'VZV primary infection; itchy rash in crops, all stages; airborne + contact; contagious before rash until crusted; live vaccine.' },
    { sec: 's4', f: 'Shingles', b: 'VZV reactivation; painful one-sided dermatomal rash; postherpetic neuralgia; RZV non-live 2 doses (50+, immunocompromised 18+).' },
    { sec: 's5', f: 'Diphtheria', b: 'C. diphtheriae; grey-white pseudomembrane, airway; toxin → heart/nerves; droplet (resp) / contact (skin); antibiotics + antitoxin; toxoid (DTaP/Tdap/Td).' },
    { sec: 's5', f: 'Tetanus', b: 'C. tetani spores via wounds; toxin blocks inhibitory signals → rigidity, spasms, lockjaw; not person to person; vaccine ± TIG.' },
    { sec: 's6', f: 'Hepatitis A vs B', b: 'A: fecal–oral, no chronic, inactivated vaccine. B: blood/body fluids, chronic (90% infant vs 5% adult), recombinant subunit vaccine.' },
    { sec: 's7', f: 'Influenza', b: 'Abrupt cough, fever, aches (may lack fever in elderly/immunocompromised); droplet; annual vaccine.' },
    { sec: 's7', f: 'Measles', b: 'Fever, cough, coryza, red eyes, Koplik spots, rash face → down; airborne (N95), air infectious up to 2 h; MMR live.' },
    { sec: 's7', f: 'Mumps', b: 'Parotid swelling; droplet; orchitis, meningitis, hearing loss; MMR.' },
    { sec: 's7', f: 'Rubella', b: 'Mild rash, low fever, lymph nodes; droplet; pregnancy → CRS (hearing, eyes, heart); MMR not in pregnancy, give postpartum.' },
    { sec: 's8', f: 'Meningococcal disease', b: 'N. meningitidis; fever, neck stiffness, non-blanching rash, rapid sepsis (don\'t wait for rash); droplet; MenACWY vs MenB; prophylaxis after exposure.' },
    { sec: 's8', f: 'Pertussis', b: 'B. pertussis; cold-like → coughing fits, whoop; infants apnea; droplet; early antibiotics; DTaP/Tdap (wanes).' },
    { sec: 's8', f: 'Polio + IPV vs OPV', b: 'Fecal–oral; mostly silent; acute flaccid paralysis. IPV: inactivated injection, protects vs paralysis. OPV: live oral, intestinal immunity, rare vaccine-derived risk.' },
    { sec: 's9', f: 'Review: airborne vs droplet diseases', b: 'Airborne: measles; varicella (+contact). Droplet: influenza, respiratory diphtheria, meningococcal, mumps, pertussis, acquired rubella.' }
  ]
};
