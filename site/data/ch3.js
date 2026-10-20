// Unit 3 — source: "EMS313_Ch03.pdf" (Modes of Transmission, PPE, Isolation Precautions; 22 slides)
export default {
  id: 'ch3', n: 3,
  title: 'Modes of Transmission, PPE & Isolation',
  ar: 'طرق انتقال العدوى، معدات الوقاية الشخصية، والعزل',
  file: 'EMS313_Ch03.pdf',
  objSrc: 'Slide 2',
  objectives: [
    'Describe the three routes of transmission: contact, droplet and airborne.',
    'Explain how droplet and airborne spread differ, and why that changes the mask you wear.',
    'State when PPE must be worn and removed, and choose gloves, gowns, masks and eye protection for a task.',
    'Describe the sequence for putting on and taking off PPE.',
    'Differentiate standard precautions from transmission-based precautions.',
    'Describe contact, droplet and airborne precautions with examples of pathogens for each.',
    'Differentiate isolation from quarantine.',
    'Describe the precautions used for multidrug-resistant organisms.',
    'Explain what administrators and education programmes must provide.',
    'Apply the precautions to patients transported by ambulance.'
  ],
  sections: [
    {
      id: 's1', title: 'Three routes: contact, droplet, airborne', src: 'Slides 3–6',
      blocks: [
        { t: 'note', k: 'ems', x: 'The patient for the whole lecture: **Ahmed, 34**, from shared workers\' accommodation. Cough for three weeks, fever, night sweats, weight loss. He coughs through a 25-minute transport. Before you touch him: no mask, a surgical mask, or an N95?' },
        { t: 'h', x: 'Contact' },
        { t: 'table', cap: 'Contact transmission', quiz: true, head: ['Type', 'How'], rows: [
          ['{direct|Direct}', 'Skin to skin. From the patient to you, and from you to the next patient.'],
          ['{indirect|Indirect}', 'Through a stretcher rail, a cuff, a monitor cable, or a hand that touched them.']] },
        { t: 'p', x: 'Indirect contact is the route that **hand hygiene (Chapter 2)** and **equipment cleaning (Chapter 4)** exist to break. Ahmed: before he coughs at all, his hands, his blanket and the rail he holds are contact routes.' },
        { t: 'svg', id: 'routes' },
        { t: 'h', x: 'Droplet' },
        { t: 'ul', items: [
          '**{droplet|Droplets}** are **larger than 5 µm**, made by coughing, sneezing and talking. They travel a short distance (**about 2 metres**) and drop.',
          'How far depends on: the **force** of the cough, the **density** of the drops, **temperature**, **humidity**, **air circulation**, and how long the germ stays infectious.',
          'Examples: **pertussis** (whooping cough), **influenza**, **rhinovirus**, **SARS coronavirus**, **group A streptococcus**, **Neisseria meningitidis**.'] },
        { t: 'note', k: 'ems', x: 'Stand two metres away and droplets never reach you. **In an ambulance you are never two metres away.** If Ahmed has influenza, his cough reaches everyone in the compartment. That alone needs a mask.' },
        { t: 'h', x: 'Airborne' },
        { t: 'ul', items: [
          '**{airborne|Airborne}** particles are **5 µm or smaller**: **{nuclei|droplet nuclei}**, the dried residue of droplets. Light enough to float and move with the air, across the room, along the corridor, **for hours**.',
          'Spread this way (Box 3.1): **tuberculosis, measles (rubeola), chickenpox (varicella)**.'] },
        { t: 'table', cap: 'Droplet vs airborne (don\'t mix them up)', quiz: true, head: ['', 'Droplet', 'Airborne'], rows: [
          ['Size', 'Larger than 5 µm', '5 µm or smaller'],
          ['Distance', 'About 2 metres, then falls', 'Far, stays suspended'],
          ['Your mask', '{surgicalmask|Surgical mask}', '{n95|N95 respirator}, {fittest|fit-tested}']] },
        { t: 'why', q: 'Why would a surgical mask be enough if Ahmed had influenza, but not for suspected TB?', a: 'Influenza travels in **droplets**: larger than 5 µm, they fall within about 2 metres, and a surgical mask stops droplets and splashes (slides 5, 13). TB travels as **droplet nuclei**: 5 µm or smaller, light enough to float and move with the air, across the room, for hours. The N95 respirator, fit-tested, is the only mask for airborne germs (slides 6, 13).' },
        { t: 'chain', items: ['3 weeks cough + night sweats + weight loss', 'Think tuberculosis', 'Airborne until proven otherwise', 'Surgical mask is not enough → N95'] },
        { t: 'note', k: 'conflict', x: 'Droplet distance: the lecture says **about 2 metres** (slides 3, 5, 6). Quiz 2 Q6 offered 6 meter / 3 inch / 3–6 cm / 3–6 feet; the option selected in the screenshot was 3–6 feet, the only option close to the lecture value (added, not on the slides: 6 feet ≈ 1.8 m). "6 meter" is far beyond the lecture value. See the الاختلافات والمصادر page.' }
      ],
      recall: [
        { q: 'Droplet vs airborne: particle size, distance and mask?', a: 'Droplet >5 µm, ~2 m then falls, surgical mask. Airborne ≤5 µm (droplet nuclei), far/stays suspended, fit-tested N95.' },
        { q: 'Name the airborne diseases in Box 3.1.', a: 'Tuberculosis, measles (rubeola), chickenpox (varicella).' },
        { q: 'Name the droplet examples on slide 5.', a: 'Pertussis, influenza, rhinovirus, SARS coronavirus, group A streptococcus, Neisseria meningitidis.' },
        { q: 'What factors decide how far droplets travel?', a: 'Force of the cough, density of the drops, temperature, humidity, air circulation, how long the germ stays infectious.' }
      ]
    },
    {
      id: 's2', title: 'PPE: when, and in what order', src: 'Slides 7–9',
      blocks: [
        { t: 'p', x: '{ppe|PPE} (gloves, gown, mask, eye protection) is a **barrier between the germ and your skin, airways and clothes**.' },
        { t: 'twocol', a: { h: 'Put it on', items: ['Whenever **blood or body fluids could reach you**.'] }, b: { h: 'Take it off', items: ['Take it off and throw it away **before you leave the patient\'s room**.', 'In the ambulance, the patient\'s room is the **patient compartment**. PPE comes off at the door, before the cab.'] } },
        { t: 'h', x: 'Putting on (donning): Gown → Mask → Eyes → Gloves' },
        { t: 'order', id: 'c3-don' },
        { t: 'table', cap: 'Donning details', quiz: true, head: ['Step', 'Item', 'How'], rows: [
          ['0', 'Hand hygiene', 'Hand hygiene first, before the gown'],
          ['1', 'Gown', 'Cover arms and front, neck to mid-thigh. Tie at neck and waist'],
          ['2', 'Mask or respirator', 'Ties at the crown and the neck. Fit the nose piece. Seal-check a respirator'],
          ['3', 'Goggles or face shield', 'Over the eyes, or the whole face'],
          ['4', 'Gloves', 'Pull the cuffs over the gown sleeves']] },
        { t: 'h', x: 'Taking off (doffing): the front of everything is contaminated' },
        { t: 'order', id: 'c3-doff' },
        { t: 'table', cap: 'Doffing details', quiz: true, head: ['Step', 'Item', 'How'], rows: [
          ['1', 'Gloves', 'Peel off without touching the outside'],
          ['2', 'Goggles or face shield', 'By the headband or ear pieces'],
          ['3', 'Gown', 'Untie, peel down from the shoulders, roll inside out'],
          ['4', 'Mask or respirator', 'By the ties. Do not touch the front'],
          ['5', 'Hand hygiene', 'Then, and only then, the cab and the report']] },
        { t: 'twocol', a: { h: 'Clean parts', items: ['Ties, ear loops, headband: you may touch them with bare hands'] }, b: { h: 'Contaminated parts', items: ['The front of the mask, the goggles, the shield, the gown, the gloves'] } },
        { t: 'why', q: 'Why is the mask taken off by the ties and not by the front?', a: 'The front of everything is contaminated: the front of the mask, the goggles, the shield, the gown, the gloves. Ties, ear loops and the headband are the clean parts you may touch with bare hands, so the mask comes off by the ties, without touching the front, after the gloves are off (slides 9, 13).' },
        { t: 'mistakes', intro: 'Spot the mistake (slide 9): After handover, Khalid pulls his mask down under his chin, removes his gloves, then his gown, and walks to the cab to write the report. Tap each action to check it.', lines: [
          ['He pulls his mask down under his chin (first).', true, 'Gloves come off first; the mask comes off last, by the ties, without touching the front.'],
          ['He removes his gloves, then his gown.', false, 'This part is in the right order: gloves are step 1 and the gown is step 3 (slide 9). If he was wearing goggles or a face shield, they come off between the two (step 2, by the headband or ear pieces).'],
          ['He walks to the cab to write the report.', true, 'He leaves with the mask still under his chin and without hand hygiene. The mask comes off by the ties without touching the front (step 4), then hand hygiene (step 5): "Then, and only then, the cab and the report" (slide 9). PPE comes off at the patient-compartment door, before the cab (slide 7).']] }
      ],
      recall: [
        { q: 'Donning order?', a: 'Hand hygiene → gown → mask/respirator → goggles/face shield → gloves.' },
        { q: 'Doffing order?', a: 'Gloves → goggles/face shield → gown → mask/respirator → hand hygiene.' },
        { q: 'Which parts are "clean" and may be touched with bare hands?', a: 'Ties, ear loops, headband.' },
        { q: 'In the ambulance, where does PPE come off?', a: 'At the door of the patient compartment, before the cab.' }
      ]
    },
    {
      id: 's3', title: 'Gloves, gowns, eye protection and masks', src: 'Slides 10–13',
      blocks: [
        { t: 'h', x: 'Gloves: latex or nitrile, never vinyl' },
        { t: 'p', x: 'Wear gloves whenever you could touch **blood or body fluids, mucous membranes, broken skin, or other infectious material** [IB/IC]. Gloves do not replace hand hygiene: hand hygiene before, hand hygiene after, a new pair for every patient.' },
        { t: 'h', x: 'Gowns' },
        { t: 'ul', items: [
          'An **isolation gown, not a lab coat or jacket**. Covers the arms and the front, from the neck to mid-thigh. Always with gloves.',
          '**Wear it [IB/IC]** when the task could soil your clothes, and for direct contact with a patient whose secretions are not contained.',
          '**Two rules people miss:** do not gown just for entering a high-risk unit [IB]; take the gown off and clean your hands before you leave the room [IB/IC].'] },
        { t: 'h', x: 'Eyes, nose and mouth' },
        { t: 'ul', items: [
          'Choose a mask, goggles, a face shield, or a combination, for the task and the risk [IB/IC].',
          '**Best eye protection: a {faceshield|face shield} from the top of the head to the chin.** It must be comfortable, adjustable, and not block your side vision (NIOSH).',
          '**{agp|Aerosol-generating procedures}: full protection every time**: bronchoscopy, suctioning the airway, endotracheal intubation.'] },
        { t: 'note', k: 'ems', x: 'If Ahmed needs suctioning or intubation on the way, the risk changes: **respirator, full face shield, gown, gloves**.' },
        { t: 'table', cap: 'Three kinds of mask, and only one stops airborne germs', quiz: true, head: ['', 'Surgical mask', 'Procedure / isolation mask', 'N95 respirator ("TB mask")'], rows: [
          ['FDA', 'Cleared by the FDA', 'Not cleared by the FDA', '—'],
          ['Property', 'Fluid-resistant', 'No fluid-resistance standard', 'Filters tiny particles; must be fit-tested'],
          ['Stops', 'Droplets and splashes', 'Droplet barrier', 'The only one for airborne germs: TB, measles, chickenpox']] },
        { t: 'note', k: 'key', x: 'After use the **front is contaminated**. Remove a mask by the ties or ear loops, with bare hands, **after the gloves are off**.' }
      ],
      recall: [
        { q: 'Which glove materials are acceptable?', a: 'Latex or nitrile, never vinyl.' },
        { q: 'When should you wear a gown?', a: 'When the task could soil your clothes, and for direct contact with a patient whose secretions are not contained.' },
        { q: 'Name the three aerosol-generating procedures on slide 12.', a: 'Bronchoscopy, suctioning the airway, endotracheal intubation.' },
        { q: 'Surgical vs procedure mask?', a: 'Surgical: FDA-cleared, fluid-resistant, stops droplets and splashes. Procedure/isolation: not FDA-cleared, droplet barrier, no fluid-resistance standard.' }
      ]
    },
    {
      id: 's4', title: 'Standard and transmission-based precautions', src: 'Slides 14–17',
      blocks: [
        { t: 'table', cap: 'Two tiers', quiz: true, head: ['', 'Tier 1: {standard|Standard precautions}', 'Tier 2: {tbp|Transmission-based precautions}'], rows: [
          ['Who', 'Every patient, every time', 'Patients who have, or are suspected to have, a highly transmissible or important pathogen'],
          ['What', 'Treat all blood, body fluids, secretions and excretions (**except sweat**), broken skin and mucous membranes as infectious', 'Contact, droplet or airborne']] },
        { t: 'note', k: 'key', x: '**Tier 2 is added to Tier 1, never instead of it.** Ahmed: standard precautions from the first touch; airborne precautions added the moment the history is heard.' },
        { t: 'table', cap: 'Contact · Droplet · Airborne precautions (don\'t mix them up)', quiz: true, head: ['', '{contactp|Contact}', '{dropletp|Droplet}', '{airbornep|Airborne}'], rows: [
          ['On you', 'Gown and gloves on entry, off before leaving', 'Surgical mask on entry [IB]', 'Fit-tested N95 or higher [IB]'],
          ['On the patient', '—', 'Surgical mask when moved, plus cough etiquette [IB]', 'Surgical mask until inside the room [IB/IC]'],
          ['Room', 'Single room if possible; room cleaned at least daily', 'Private room preferred; no special air handling, no respirator needed', 'Negative-pressure isolation room ({aiir|AIIR}); air out through {hepa|HEPA} or to the outside'],
          ['Equipment / staff', 'Equipment stays with the patient, or is cleaned between patients', '—', 'Non-immune staff stay away from measles, chickenpox, smallpox [IB]'],
          ['When / germs', 'Draining wounds, faecal incontinence, any discharge that could contaminate the environment', 'Pertussis, influenza, meningococcus, group A streptococcus', 'Tuberculosis, measles, chickenpox']] },
        { t: 'p', x: 'Contact precautions: all measures are **HICPAC/CDC Category IB**. Droplet spread needs close contact with respiratory secretions; the drops do not stay infectious over distance, so **the air itself is not the problem**. The **patient\'s mask matters as much as yours**: it stops droplets at the source.' },
        { t: 'chain', items: ['Droplet spread needs close contact with respiratory secretions', 'The drops do not stay infectious over distance', 'The air itself is not the problem', 'No special air handling, no respirator needed (slide 16)'] },
        { t: 'why', q: 'Why does the droplet patient wear a surgical mask too, not just the crew?', a: 'The patient\'s mask matters as much as yours: **it stops droplets at the source** (slide 16). If Ahmed had influenza: surgical mask on the crew, surgical mask on Ahmed, and you would be done (slide 16).' },
        { t: 'note', k: 'ems', x: '**Umm Saad, 78**, long-term care facility, draining leg wound, notes say **{mrsa|MRSA}**: gown and gloves before the stretcher, a cuff that stays with her, the ambulance cleaned before the next call, MRSA stated at handover.' },
        { t: 'note', k: 'ems', x: 'If Ahmed had **influenza**: surgical mask on the crew, surgical mask on Ahmed, and you would be done.' },
        { t: 'note', k: 'warn', x: '**No isolation room available:** mask on the patient, and keep the room empty for **about an hour** afterwards [IB/IC]. **The ambulance has no negative pressure:** mask on Ahmed, N95 on the crew, exhaust fan on, hospital pre-alerted, compartment aired after.' },
        { t: 'note', k: 'conflict', x: 'Time a room stays contaminated: Ch3 slide 17 says keep the room empty for **about an hour**. The vaccines lecture (slide 24) says measles virus can remain infectious in the air for **up to 2 hours** after the patient leaves. Both are shown with their sources.' }
      ],
      recall: [
        { q: 'What does standard precautions treat as infectious? What is the exception?', a: 'All blood, body fluids, secretions and excretions, broken skin and mucous membranes, except sweat.' },
        { q: 'Contact precautions: four measures?', a: 'Single room if possible; gown and gloves on entry, off before leaving; equipment stays with patient or cleaned between patients; room cleaned at least daily.' },
        { q: 'Droplet precautions: what goes on you and on the patient?', a: 'Surgical mask on you on entry; surgical mask on the patient when moved, plus cough etiquette.' },
        { q: 'Airborne precautions: the room?', a: 'Negative-pressure AIIR; air exhausted through HEPA or to the outside.' }
      ]
    },
    {
      id: 's5', title: 'Which precaution? Isolation vs quarantine', src: 'Slides 18–21',
      blocks: [
        { t: 'sort', id: 'c3-which' },
        { t: 'note', k: 'added', x: 'The answers to slide 18 are "in the speaker notes", which are not in the PDF. The answers here link each clue to a disease using the vaccines lecture (whoop = pertussis, slide 28; fever + stiff neck + purple rash = meningococcal, slide 25; rash that begins on the face = measles, slide 23; itchy blistering rash = varicella, slides 15–16) and the precaution lists on Ch3 slides 15–17. **Item 8 (chickenpox):** Ch3 lists chickenpox under airborne spread and airborne precautions (slides 6, 17). The vaccines lecture says Airborne + Contact: "VZV spreads through airborne particles and contact with blister fluid. Use Airborne and Contact Precautions" (vaccines slides 16, 38). This one-choice drill accepts Airborne, the Ch3 answer; if a question offers "Airborne + Contact", that is the complete answer (see the conflicts page: "Precautions for chickenpox (varicella)").' },
        { t: 'table', cap: 'Isolation is for the ill. Quarantine is for the exposed.', quiz: true, head: ['', '{isolation|Isolation}', '{quarantine|Quarantine}'], rows: [
          ['Who', 'The person is already **ill or diagnosed**', 'The person was **exposed and may become ill**'],
          ['Where / when', 'Usually **in hospital, during treatment**', 'For a well-defined group and a dangerous, highly contagious disease'],
          ['How long', 'As long as the patient is infectious', 'Contact with others is limited until it is clear they did not catch it']] },
        { t: 'note', k: 'ems', x: 'After the call: Ahmed\'s tuberculosis is confirmed. He is **isolated** in the hospital\'s negative-pressure room until no longer infectious. The crew were exposed; they are not ill, so they are **not isolated**. They are screened and followed up.' },
        { t: 'h', x: 'The system: none of this works unless the service pays for it and teaches it' },
        { t: 'twocol', a: { h: 'Administrators [IB/IC]', items: ['Put prevention of transmission into the safety objectives', 'Make it a priority, with the money and the people to run the programme'] }, b: { h: 'Education on PPE and precautions', items: ['Task-specific', 'At orientation, then updated', 'For everyone', 'Built on adult learning', 'In a language and reading level staff understand'] } },
        { t: 'p', x: 'Fit-testing, respirators in every vehicle, face shields at the stretcher, gowns that fit, someone whose job it is to check: **these are administrative decisions**.' },
        { t: 'table', cap: 'The whole chapter in five questions', head: ['Question', 'Answer'], rows: [
          ['How does it spread?', 'Contact, droplet or airborne. The route decides everything else.'],
          ['What barrier do I need?', 'Gloves, gown, mask or respirator, eye protection. Chosen for the task, removed in order.'],
          ['Which precaution?', 'Standard for everyone. Contact, droplet or airborne added on suspicion.'],
          ['Who is separated from whom?', 'Isolation for the ill, quarantine for the exposed, contact precautions for resistant organisms.'],
          ['What must the service provide?', 'Objectives, budget, equipment, fit-testing and training for everyone.']] },
        { t: 'note', k: 'key', x: '"**The precaution starts on suspicion, not on diagnosis.**"' }
      ],
      recall: [
        { q: 'Isolation vs quarantine in one line each?', a: 'Isolation: the ill/diagnosed, usually in hospital during treatment, as long as infectious. Quarantine: the exposed who may become ill, contact limited until clear.' },
        { q: 'When does a precaution start?', a: 'On suspicion, not on diagnosis.' },
        { q: 'What precautions are used for resistant organisms (e.g. MRSA, VRE)?', a: 'Contact precautions.' },
        { q: 'What must administrators do, and what must PPE education be like (slide 20)?', a: 'Administrators: put prevention of transmission into the safety objectives; make it a priority, with the money and the people. Education: task-specific, at orientation then updated, for everyone, built on adult learning, in a language and reading level staff understand.' }
      ]
    }
  ],

  orders: [
    { id: 'c3-don', sec: 's2', src: 'Slide 8', title: 'Putting on PPE (donning)', steps: ['Hand hygiene', 'Gown', 'Mask or respirator', 'Goggles or face shield', 'Gloves'] },
    { id: 'c3-doff', sec: 's2', src: 'Slide 9', title: 'Taking off PPE (doffing)', steps: ['Gloves', 'Goggles or face shield', 'Gown', 'Mask or respirator', 'Hand hygiene'] }
  ],
  sorts: [
    { id: 'c3-which', sec: 's5', src: 'Slide 18 (+ vaccines slides 15–16, 23, 25, 28, 38)', title: 'Which precaution? Contact, droplet or airborne', cats: ['Contact', 'Droplet', 'Airborne'],
      items: [['A child with a barking cough and a whoop for two weeks', 1], ['A man with fever, stiff neck and a purple rash', 1], ['A care-home resident with faecal incontinence and a known VRE', 0], ['A student with fever, cough and a rash that began on the face', 2], ['An adult with fever, body aches and a dry cough in flu season', 1], ['An adult with a month of cough and a friend recently treated for TB', 2], ['A dialysis patient with a heavily draining catheter-site infection', 0], ['A young adult with an itchy blistering rash all over the body', 2]] },
    { id: 'c3-route', sec: 's1', src: 'Slides 4–6', title: 'Which route? (Ch3 slides 4–6)', cats: ['Contact', 'Droplet', 'Airborne'],
      items: [['Tuberculosis', 2], ['Measles (rubeola)', 2], ['Chickenpox (varicella), as listed in Box 3.1', 2], ['Pertussis', 1], ['Influenza', 1], ['Neisseria meningitidis', 1], ['Group A streptococcus', 1], ['Rhinovirus', 1], ['A stretcher rail touched by the last patient', 0], ['Skin to skin from patient to provider', 0]] }
  ],

  questions: [
    { id: 'c3q1', sec: 's1', q: 'Which statement about droplets is correct?', o: ['They are larger than 5 µm and fall within about 2 metres', 'They are 5 µm or smaller and stay suspended for hours', 'They are larger than 5 µm and stay suspended across the room', 'They are 5 µm or smaller and fall within about 2 metres'], x: 'Droplets are larger than 5 µm, made by coughing, sneezing and talking, and fall within about 2 metres (slide 5). "5 µm or smaller, suspended for hours" describes droplet nuclei, the airborne route (slide 6).', src: 'Slides 5–6' },
    { id: 'c3q2', sec: 's1', q: 'Droplet nuclei are:', o: ['The dried residue of droplets, 5 µm or smaller', 'Large drops from a sneeze that fall within about 2 metres', 'Drops larger than 5 µm that stay suspended in the air', 'Fluid splashes that a surgical mask stops'], x: 'Droplet nuclei are the dried residue of droplets, 5 µm or smaller, light enough to float and move with the air (slide 6). Large drops that fall within about 2 metres are droplets, not droplet nuclei (slide 5).', src: 'Slide 6' },
    { id: 'c3q3', sec: 's1', q: 'Which group lists ONLY airborne diseases (Box 3.1)?', o: ['Tuberculosis, measles, chickenpox', 'Influenza, pertussis, measles', 'Tuberculosis, influenza, MRSA', 'Chickenpox, meningococcus, rhinovirus'], x: 'Box 3.1 lists tuberculosis, measles (rubeola) and chickenpox (varicella) as airborne (slide 6). Influenza, pertussis, meningococcus and rhinovirus are droplet examples (slide 5), and MRSA needs contact precautions (slide 15).', src: 'Slide 6' },
    { id: 'c3q4', sec: 's1', q: 'Which infection is spread by DROPLETS according to slide 5?', o: ['Neisseria meningitidis', 'Tuberculosis', 'Measles (rubeola)', 'Chickenpox (varicella)'], x: 'Neisseria meningitidis is on the slide 5 droplet list with pertussis, influenza, rhinovirus, SARS coronavirus and group A streptococcus. Tuberculosis, measles and chickenpox are the airborne diseases of Box 3.1 (slide 6).', src: 'Slide 5' },
    { id: 'c3q5', sec: 's1', q: 'Touching a stretcher rail that the last patient held is:', o: ['Indirect contact', 'Direct contact', 'Droplet transmission', 'Airborne transmission'], x: 'Indirect contact goes through something in between: a stretcher rail, a cuff, a monitor cable, or a hand that touched them. Direct contact is skin to skin (slide 4).', src: 'Slide 4' },
    { id: 'c3q6', sec: 's1', q: 'Ahmed: 3 weeks of cough, night sweats and weight loss. What respiratory protection does the crew need?', o: ['Fit-tested N95 respirator', 'Surgical mask', 'Procedure mask', 'No mask if the crew stays 2 metres away'], x: 'Three weeks of cough, night sweats and weight loss: think tuberculosis. He is airborne until proven otherwise and a surgical mask is not enough; airborne germs need a fit-tested N95 (slides 6, 13). In an ambulance you are never two metres away (slide 5).', src: 'Slide 6' },
    { id: 'c3q7', sec: 's1', q: 'Which factor does slide 5 list as affecting how far droplets travel?', o: ['The density of the drops', 'A particle size of 5 µm or smaller', 'How hard the exposed person inhales', 'The fit-test result of the crew\'s N95'], x: 'Slide 5 lists the force of the cough, the density of the drops, temperature, humidity, air circulation and how long the germ stays infectious. 5 µm or smaller describes droplet nuclei (slide 6). How hard the host inhales is the trap statement in Quiz 2 Q4 and is not on slide 5. The fit test is about the N95 (slide 13).', src: 'Slide 5' },
    { id: 'c3q8', sec: 's2', q: 'PPE should be put on:', o: ['Whenever blood or body fluids could reach you', 'Once the laboratory has confirmed the diagnosis', 'When the patient is already on isolation precautions', 'When the hospital asks for it at handover'], x: 'Slide 7: put PPE on whenever blood or body fluids could reach you; standard precautions apply to every patient, every time (slide 14). Waiting for a diagnosis or an isolation order is too late, because precautions start on suspicion (slide 21).', src: 'Slide 7' },
    { id: 'c3q9', sec: 's2', q: 'The correct DONNING sequence after hand hygiene is:', o: ['Gown → mask → goggles → gloves', 'Gloves → gown → mask → goggles', 'Mask → gown → gloves → goggles', 'Goggles → mask → gown → gloves'], x: 'Slide 8 (CDC sequence): hand hygiene first, then gown, mask or respirator, goggles or face shield, and gloves last, with the cuffs pulled over the gown sleeves. "Gloves first" is how doffing starts, not donning (slide 9).', src: 'Slide 8' },
    { id: 'c3q10', sec: 's2', q: 'The correct DOFFING sequence is:', o: ['Gloves → goggles → gown → mask → hand hygiene', 'Mask → gloves → gown → goggles → hand hygiene', 'Gown → gloves → mask → goggles → hand hygiene', 'Gloves → mask → gown → goggles → hand hygiene'], x: 'Slide 9 (CDC sequence): gloves → goggles/face shield (by the headband) → gown (roll inside out) → mask (by the ties, do not touch the front) → hand hygiene. The mask comes after the gown, not before it, and hand hygiene is always last (slide 9).', src: 'Slide 9' },
    { id: 'c3q11', sec: 's2', q: 'Which part of PPE may be touched with bare hands during removal?', o: ['Ties, ear loops and headband', 'The front of the mask', 'The outside of the gloves', 'The front of the gown'], x: 'Ties, ear loops and the headband are the clean parts you may touch with bare hands. The front of the mask, the goggles, the shield, the gown and the gloves are contaminated (slide 9).', src: 'Slide 9' },
    { id: 'c3q12', sec: 's2', q: 'In the ambulance, PPE is removed:', o: ['At the patient compartment door, before the cab', 'In the cab, after writing the patient report and before hand hygiene', 'At the hospital entrance', 'After returning to the station'], x: 'In the ambulance the patient\'s room is the patient compartment, so PPE comes off at its door, before the cab (slide 7). Hand hygiene comes before the cab and the report, not after (slide 9).', src: 'Slide 7' },
    { id: 'c3q13', sec: 's2', q: 'When donning gloves, the cuffs should be:', o: ['Pulled up over the gown sleeves', 'Tucked under the gown sleeves', 'Put on before the gown so the sleeves cover them', 'Folded back at the wrist so they peel off easily'], x: 'Slide 8: gloves go on last, with the cuffs pulled over the gown sleeves. Gloves come before the gown only in the doffing sequence (slide 9).', src: 'Slide 8' },
    { id: 'c3q14', sec: 's3', q: 'Which glove material should NOT be used?', o: ['Vinyl', 'Nitrile', 'Latex', 'Both latex and nitrile'], x: 'Gloves are latex or nitrile, never vinyl. Wear them whenever you could touch blood or body fluids, mucous membranes, broken skin or other infectious material [IB/IC] (slide 10).', src: 'Slide 10' },
    { id: 'c3q15', sec: 's3', q: 'Which statement about gowns is correct?', o: ['Do not gown just for entering a high-risk unit', 'A lab coat or jacket is an acceptable isolation gown', 'Keep the gown on until you reach the cab', 'A gown may be worn without gloves for short tasks'], x: 'Do not gown just for entering a high-risk unit [IB]; gown for the task. The gown is an isolation gown, not a lab coat or jacket, always worn with gloves, and it comes off, with hand hygiene, before you leave the room [IB/IC] (slide 11).', src: 'Slide 11' },
    { id: 'c3q16', sec: 's3', q: 'The best eye protection according to NIOSH is:', o: ['A face shield from the top of the head to the chin', 'Prescription eyeglasses with side shields', 'Safety goggles over the eyes', 'A shield over the eyes and nose, worn with a surgical mask'], x: 'NIOSH: the best eye protection is a face shield from the top of the head to the chin; it must be comfortable, adjustable, and not block side vision (slide 12). Eyeglasses are not on the list of options: a mask, goggles, a face shield, or a combination (slide 12).', src: 'Slide 12' },
    { id: 'c3q17', sec: 's3', q: 'Which is an aerosol-generating procedure listed on slide 12?', o: ['Endotracheal intubation', 'Blood pressure measurement', 'IV cannulation', 'Splinting'], x: 'Only three aerosol-generating procedures are named, each needing full protection every time: bronchoscopy, suctioning the airway and endotracheal intubation. Blood pressure, IV cannulation and splinting are not on that list (slide 12).', src: 'Slide 12' },
    { id: 'c3q18', sec: 's3', q: 'Which mask does slide 13 describe as cleared by the FDA and fluid-resistant?', o: ['Surgical mask', 'Procedure or isolation mask', 'N95 respirator'], x: 'The surgical mask is cleared by the FDA, fluid-resistant, and stops droplets and splashes. The procedure or isolation mask is not cleared by the FDA and has no fluid-resistance standard; the N95 filters tiny particles and must be fit-tested (slide 13).', src: 'Slide 13' },
    { id: 'c3q19', sec: 's3', q: 'The only mask that protects against airborne germs is the:', o: ['Fit-tested N95 respirator', 'Surgical mask, FDA-cleared and fluid-resistant', 'Procedure or isolation mask', 'Surgical mask on both the crew and the patient'], x: 'Slide 13: the N95 respirator filters tiny particles, must be fit-tested, and is the one mask for airborne germs (TB, measles, chickenpox). A surgical mask stops droplets and splashes, so it fits droplet precautions but not airborne (slides 13, 16).', src: 'Slide 13' },
    { id: 'c3q20', sec: 's4', q: 'Standard precautions treat all body fluids as infectious EXCEPT:', o: ['Sweat', 'Saliva', 'Urine', 'Blood'], x: 'Slide 14: treat all blood, body fluids, secretions and excretions (except sweat), broken skin and mucous membranes as infectious. Saliva and urine count as infectious (inferred from slide 14: saliva is a secretion, urine an excretion).', src: 'Slide 14' },
    { id: 'c3q21', sec: 's4', q: 'Transmission-based precautions are:', o: ['Added to standard precautions, never instead of them', 'Used instead of standard precautions', 'Started once the laboratory has confirmed the pathogen', 'Applied to every patient, every time'], x: 'Tier 2 is added to Tier 1, never instead of it, and is added when a patient has, or is suspected to have, the pathogen, so it starts on suspicion, not on diagnosis. "Every patient, every time" is Tier 1, standard precautions (slides 14, 21).', src: 'Slide 14' },
    { id: 'c3q22', sec: 's4', q: 'Contact precautions include:', o: ['Gown and gloves on entry; equipment stays with the patient', 'A fit-tested N95 respirator on entry', 'A negative-pressure room with air exhausted through HEPA', 'A surgical mask on the patient when moved, plus cough etiquette'], x: 'Slide 15: single room if possible, gown and gloves on entry (off before leaving), equipment that stays with the patient or is cleaned between patients, room cleaned at least daily. The N95 and negative pressure are airborne measures (slide 17); the patient\'s mask is a droplet measure (slide 16).', src: 'Slide 15' },
    { id: 'c3q23', sec: 's4', q: 'For droplet precautions, which is correct?', o: ['No special air handling and no respirator are needed', 'A negative-pressure room with HEPA-filtered exhaust air is required', 'The patient wears an N95 respirator', 'Gown and gloves on entry are the main measure'], x: 'Droplets do not stay infectious over distance, so droplet precautions need no special air handling and no respirator: a surgical mask on you and on the patient (slide 16). Negative pressure and HEPA are airborne precautions (slide 17).', src: 'Slide 16' },
    { id: 'c3q24', sec: 's4', q: 'Airborne infection isolation rooms (AIIR) exhaust air:', o: ['Out through HEPA filters, or to the outside', 'Into the hospital\'s general ventilation system', 'Back into the same room after recirculating', 'Into the corridor, through the gap under the door'], x: 'Slide 17: the AIIR is a negative-pressure isolation room; its air goes out through HEPA or to the outside. Air sent back into the room, the corridor or the general ventilation would still carry droplet nuclei, which float and travel far (inferred from slide 6).', src: 'Slide 17' },
    { id: 'c3q25', sec: 's4', q: 'If no isolation room is available for an airborne patient, what does slide 17 advise?', o: ['Mask the patient; keep the room empty for about an hour afterwards', 'Keep the door open so the corridor air ventilates the room', 'Use droplet precautions instead, since surgical masks are on hand', 'Delay transport until an isolation room is free'], x: 'Slide 17 [IB/IC]: with no isolation room, mask the patient and keep the room empty for about an hour afterwards. Droplet precautions are not enough, because airborne particles stay in the air and travel far (slides 6, 17).', src: 'Slide 17' },
    { id: 'c3q26', sec: 's4', q: 'Umm Saad (MRSA, draining leg wound) requires which precautions?', o: ['Contact precautions', 'Droplet precautions', 'Airborne precautions', 'Standard precautions alone'], x: 'Slide 15: a draining wound and MRSA mean contact precautions: gown and gloves before the stretcher, a cuff that stays with her, the ambulance cleaned before the next call, MRSA stated at handover. Resistant organisms get contact precautions (slide 21), on top of standard precautions (slide 14).', src: 'Slide 15' },
    { id: 'c3q27', sec: 's4', q: 'Non-immune staff should stay away from patients with:', o: ['Measles, chickenpox, smallpox', 'Influenza, pertussis, MRSA', 'Pertussis, influenza, meningococcus', 'MRSA, VRE and draining wounds'], x: 'Slide 17 [IB]: under airborne precautions, non-immune staff stay away from measles, chickenpox and smallpox. Influenza, pertussis and meningococcus are droplet germs (slide 16); MRSA, VRE and draining wounds need contact precautions (slides 15, 21).', src: 'Slide 17' },
    { id: 'c3q28', sec: 's5', q: 'A person who was exposed to a dangerous contagious disease and may become ill is placed in:', o: ['Quarantine', 'Isolation', 'Contact precautions', 'Airborne precautions'], x: 'Quarantine is for the person who was exposed and may become ill; contact with others is limited until it is clear they did not catch it. Isolation is for the person who is already ill or diagnosed (slide 19).', src: 'Slide 19' },
    { id: 'c3q29', sec: 's5', q: 'The crew who transported Ahmed (confirmed TB) are not ill. They are:', o: ['Screened and followed up, not isolated', 'Isolated in a negative-pressure room', 'Quarantined in hospital during treatment', 'Placed on contact precautions'], x: 'The crew were exposed but are not ill, so they are not isolated; they are screened and followed up. Isolation in the hospital\'s negative-pressure room is for Ahmed, the ill patient, until he is no longer infectious (slide 19).', src: 'Slide 19' },
    { id: 'c3q30', sec: 's5', q: 'Fit-testing, respirators in every vehicle and gowns that fit are:', o: ['Administrative decisions for the service', 'Personal choices for each paramedic', 'Decisions for the receiving hospital', 'Standard precautions chosen by each crew'], x: 'Fit-testing, respirators in every vehicle, face shields at the stretcher, gowns that fit and someone whose job it is to check are administrative decisions, not personal or hospital choices. Administrators must make prevention a priority, with the money and the people to run the programme [IB/IC] (slide 20).', src: 'Slide 20' },
    { id: 'c3q31', sec: 's5', q: 'A care-home resident with faecal incontinence and known VRE needs:', o: ['Contact precautions', 'Droplet precautions', 'Airborne precautions', 'Quarantine'], x: 'Slide 15: faecal incontinence, draining wounds or any discharge that could contaminate the environment need contact precautions. VRE is a resistant organism, and resistant organisms get contact precautions (slide 21).', src: 'Slides 15, 18' },
    { id: 'c3q32', sec: 's5', q: 'According to the lecture, a precaution starts:', o: ['On suspicion, not on diagnosis', 'After laboratory confirmation', 'After hospital handover', 'When the patient develops a fever'], x: 'Slide 21: "The precaution starts on suspicion, not on diagnosis." Ahmed got airborne precautions the moment his history was heard, long before his TB was confirmed (slides 14, 19).', src: 'Slide 21' },

    // True/False traps (lecture-based, in the past-quiz style)
    { id: 'c3q33', sec: 's5', q: 'Isolation is for people who were exposed to a disease and may become ill.', o: ['True', 'False'], a: 1, fix: true, x: 'False. That is quarantine. Isolation is for the person who is already ill or diagnosed, usually in hospital during treatment, for as long as the patient is infectious (slide 19).', src: 'Slide 19' },
    { id: 'c3q34', sec: 's1', q: 'Droplet nuclei are the dried residue of droplets and can stay suspended in the air for hours.', o: ['True', 'False'], a: 0, fix: true, x: 'True. Droplet nuclei are 5 µm or smaller, light enough to float and move with the air, across the room, along the corridor, for hours (slide 6).', src: 'Slide 6' },
    { id: 'c3q35', sec: 's3', q: 'Wearing gloves removes the need for hand hygiene before and after patient contact.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Gloves do not replace hand hygiene: hand hygiene before, hand hygiene after, and a new pair for every patient (slide 10).', src: 'Slide 10' },
    { id: 'c3q36', sec: 's4', q: 'Transmission-based precautions replace standard precautions once a highly transmissible pathogen is suspected.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Tier 2 (transmission-based) is added to Tier 1 (standard), never instead of it (slide 14).', src: 'Slide 14' },
    { id: 'c3q37', sec: 's2', q: 'When taking off PPE, the gloves come off first and hand hygiene is the last step.', o: ['True', 'False'], a: 0, fix: true, x: 'True. Doffing: gloves → goggles/face shield → gown → mask/respirator → hand hygiene; then, and only then, the cab and the report (slide 9).', src: 'Slide 9' },
    { id: 'c3q38', sec: 's3', q: 'A procedure (isolation) mask is cleared by the FDA and meets a fluid-resistance standard.', o: ['True', 'False'], a: 1, fix: true, x: 'False. That describes the surgical mask. The procedure or isolation mask is not cleared by the FDA and has no fluid-resistance standard; it is a droplet barrier (slide 13).', src: 'Slide 13' },
    { id: 'c3q39', sec: 's4', q: 'All contact-precaution measures are HICPAC/CDC Category IB.', o: ['True', 'False'], a: 0, fix: true, x: 'True. "All measures are HICPAC/CDC Category IB": single room if possible, gown and gloves, equipment that stays with the patient or is cleaned between patients, room cleaned at least daily (slide 15).', src: 'Slide 15' },
    { id: 'c3q40', sec: 's3', q: 'Endotracheal intubation is an aerosol-generating procedure that needs full protection every time.', o: ['True', 'False'], a: 0, fix: true, x: 'True. Bronchoscopy, suctioning the airway and endotracheal intubation are the aerosol-generating procedures: full protection every time. For Ahmed: respirator, full face shield, gown, gloves (slide 12).', src: 'Slide 12' },

    // "Why" questions (mechanisms stated on the slides)
    { id: 'c3q41', sec: 's4', q: 'Why does a patient on droplet precautions wear a surgical mask when moved?', o: ['It stops droplets at the source', 'It protects him from the crew\'s germs', 'It filters out droplet nuclei', 'It replaces the crew\'s mask'], x: 'Slide 16: the patient\'s mask matters as much as yours; it stops droplets at the source. Droplet nuclei are airborne particles (slide 6), and the patient\'s mask is added to the crew\'s surgical mask, not instead of it (slide 16).', src: 'Slide 16' },
    { id: 'c3q42', sec: 's1', q: 'Why is a surgical mask not enough for Ahmed (suspected TB)?', o: ['TB droplet nuclei float with the air; airborne germs need an N95', 'TB drops are larger than 5 µm and soak through the mask', 'A surgical mask is not cleared by the FDA', 'TB spreads mainly by contact, so gloves matter more than a mask'], x: 'TB is airborne: droplet nuclei of 5 µm or smaller float and move with the air for hours (slide 6). The surgical mask is FDA-cleared and fluid-resistant, but it stops droplets and splashes; the fit-tested N95 is the mask for airborne germs (slide 13).', src: 'Slides 6, 13' },
    { id: 'c3q43', sec: 's5', q: 'Which describes the education on PPE and precautions required on slide 20?', o: ['Task-specific, for everyone, updated after orientation', 'Given once at orientation, and not repeated after that', 'For the paramedics who transport airborne patients', 'Written at the reading level of the CDC isolation guideline'], x: 'Education is task-specific, at orientation then updated, for everyone, built on adult learning, and in a language and reading level staff understand. It is not a one-off, and not for one group of staff (slide 20).', src: 'Slide 20' },

    // Past questions — Quiz 2, ch 2&3 (45).pdf
    { id: 'p2q1', sec: 's1', q: 'Which of the following is an example of direct transmission?', o: ['Skin-to-skin contact with the patient', 'Standing next to contaminated bed linens', 'Inhaling particles of infectious material', 'Releasing droplets into the air when sneezing'], x: 'Direct contact is skin to skin, from the patient to you (slide 4). Standing next to linens is not contact; touching them would be indirect contact through an object (slide 4). Inhaled particles are airborne and sneezed droplets are droplet spread (slides 5–6).', src: 'Slide 4', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 1, edit: 'Modified: the quiz\'s option "Contacting infectious blood with a wound" was replaced with the lecture\'s definition of direct contact ("skin to skin"), because the lecture does not classify blood-to-wound contact.' } },
    { id: 'p2q2', sec: 's1', q: 'The respiratory droplets involved in droplet transmission are ______ than the droplet nuclei (airborne) involved in airborne transmission.', o: ['bigger', 'smaller', 'the same', 'no different'], x: 'Droplets are larger than 5 µm; droplet nuclei are 5 µm or smaller, the dried residue of droplets (slides 5–6).', src: 'Slides 5–6', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 2 } },
    { id: 'p2q3', sec: 's4', q: 'As a supervisor at an EMS centre during a disaster event, you are told a newly admitted patient requires Contact Precautions. What is the most appropriate placement?', o: ['In a single patient room', 'In a room with a decontamination station immediately outside the door', 'No specific type of room is preferred', 'In a room with negative pressure ventilation'], x: 'Contact precautions use a single room if possible (slide 15). A decontamination station is not one of the contact measures, and negative-pressure ventilation is for airborne precautions (slide 17).', src: 'Slide 15', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 3 } },
    { id: 'p2q4', sec: 's1', q: 'Which of the following statements are true about infectious droplets? i. The velocity and mechanism by which droplets are propelled into the air may impact how far the droplets travel. ii. The density of respiratory secretions may impact how far the droplets travel. iii. Air circulation may impact how far the droplets travel. iv. The force by which the susceptible host inhales may impact how far the droplets travel.', o: ['I, II, and III', 'I, II, III, and IV', 'II, III, and IV', 'I, III, and IV'], fix: true, x: 'How far droplets travel depends on the force of the cough (≈ statement i, inferred), the density of the drops (ii), temperature, humidity, air circulation (iii), and how long the germ stays infectious. Statement iv (how hard the host inhales) is not on the list, so any option with IV is wrong (slide 5).', src: 'Slide 5', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 4 } },
    { id: 'p2q5', sec: 's3', q: 'Your paramedic team suggests that all staff routinely wear gowns for every patient interaction in the ICU, regardless of diagnosis. Most appropriate response?', o: ['Do not support it: routine gowning in high-risk units is not recommended; gowns are for contact/transmission-based indications', 'Support it: it is unlikely to reduce infection but reassures staff', 'Do not support it: routine gowning might slightly reduce transmission, but it is not a cost-effective or evidence-based practice', 'Support it: routine gowning in all high-risk environments is recommended by CDC and HICPAC'], x: 'Slide 11: do not gown just for entering a high-risk unit [IB]. Wear a gown when the task could soil your clothes, or for direct contact with a patient whose secretions are not contained [IB/IC]. Gown and gloves on entry are also part of contact precautions (slide 15). Option C also rejects the idea, but for a reason the lecture does not give: no slide mentions cost-effectiveness or a small reduction in transmission. The lecture reason is the CDC/HICPAC rule [IB]: gown for the task, not for the unit (slide 11), which is what the keyed option states.', src: 'Slide 11', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 5 } },
    { id: 'p2q7', sec: 's2', q: 'HICPAC recommends that personal protective equipment (PPE) be used when there is a potential for ______.', o: ['blood or body fluid exposure', 'water', 'soil and dirt spots', 'unclean surface'], x: 'Put PPE on whenever blood or body fluids could reach you. PPE is a barrier between the germ and your skin, airways and clothes; water, soil or a dirty surface are not named as the trigger (slide 7).', src: 'Slide 7', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 7 } },
    { id: 'p2q8', sec: 's5', q: 'Quarantine usually occurs in hospital while the patient is receiving treatment.', o: ['True', 'False'], a: 1, fix: true, x: 'False. "In hospital, during treatment" describes ISOLATION, for the ill or diagnosed. Quarantine is for the exposed who may become ill (slide 19).', src: 'Slide 19', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 8 } },
    { id: 'p2q9', sec: 's4', q: 'Standard precautions are used with every patient.', o: ['True', 'False'], fix: true, x: 'True. Standard precautions (Tier 1) apply to every patient, every time; transmission-based precautions are added for some patients (slide 14).', src: 'Slide 14', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 9 } },
    { id: 'p2q11', sec: 's4', q: 'Diseases transmitted via droplet transmission require special air handling to avoid contamination of the ventilation system.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Droplets do not stay infectious over distance, so droplet precautions need no special air handling (slide 16). Negative pressure and HEPA exhaust are for airborne precautions (slide 17).', src: 'Slide 16', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 11 } },
    { id: 'p2q14', sec: 's1', q: 'Which of the following is an example of indirect transmission?', o: ['Contact with contaminated bed linens', 'Looking at infected patients with HIV', 'Releasing droplets into the air when sneezing', 'Inhalation of particles of infectious material'], x: 'Indirect contact goes through an object in between, such as a stretcher rail, a cuff, or Ahmed\'s blanket (slide 4). Sneezed droplets are droplet spread and inhaled particles are airborne (slides 5–6).', src: 'Slide 4', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 14 } },
    { id: 'p2q15', sec: 's4', q: 'Which type of transmission-based precautions should be implemented for patients infected with influenza virus, Neisseria meningitidis and group A Streptococcus (invasive disease)?', o: ['Droplet Precautions', 'Standard Precautions', 'Contact Precautions', 'Airborne Precautions'], x: 'Influenza, Neisseria meningitidis and group A streptococcus are droplet germs (slide 5), so they get droplet precautions: a surgical mask on you and on the patient (slide 16). Standard precautions apply to everyone but are not a transmission-based precaution (slide 14).', src: 'Slides 5, 16', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 15 } }
  ],

  cards: [
    { sec: 's1', f: 'Direct vs indirect contact', b: 'Direct: skin to skin. Indirect: through a rail, cuff, cable, or a hand that touched them.', src: 'Slide 4' },
    { sec: 's1', f: 'Droplet: size, distance, mask', b: '>5 µm · about 2 m then falls · surgical mask.', src: 'Slides 5–6' },
    { sec: 's1', f: 'Airborne: size, distance, mask', b: '≤5 µm droplet nuclei · far, stays suspended for hours · fit-tested N95.', src: 'Slide 6' },
    { sec: 's1', f: 'Airborne diseases (Box 3.1)', b: 'Tuberculosis, measles (rubeola), chickenpox (varicella).', src: 'Slide 6' },
    { sec: 's1', f: 'Droplet examples on slide 5: how many?', b: '6: the 4 germs that slide 16 also names, plus rhinovirus and SARS coronavirus.', src: 'Slide 5' },
    { sec: 's1', f: 'Droplet germs named on BOTH slide 5 and slide 16 (4)', b: 'Pertussis, influenza, meningococcus (Neisseria meningitidis), group A streptococcus.', src: 'Slides 5, 16' },
    { sec: 's1', f: 'Droplet examples on slide 5 that slide 16 does not list (2)', b: 'Rhinovirus, SARS coronavirus.', src: 'Slide 5' },
    { sec: 's2', f: 'Donning: what comes before the gown?', b: 'Hand hygiene.', src: 'Slide 8' },
    { sec: 's2', f: 'Donning order after hand hygiene (4)', b: 'Gown → mask/respirator → goggles/face shield → gloves.', src: 'Slide 8' },
    { sec: 's2', f: 'Donning: where do the glove cuffs go?', b: 'Over the gown sleeves.', src: 'Slide 8' },
    { sec: 's2', f: 'Doffing: first item off, and the last step?', b: 'Gloves first (peel off without touching the outside); hand hygiene last.', src: 'Slide 9' },
    { sec: 's2', f: 'Doffing: the middle three, in order', b: 'Goggles/face shield (by the headband or ear pieces) → gown (roll inside out) → mask/respirator (by the ties).', src: 'Slide 9' },
    { sec: 's2', f: 'When do you put PPE on / take it off?', b: 'On: whenever blood/body fluids could reach you. Off: before leaving the patient\'s room (ambulance: at the compartment door).', src: 'Slide 7' },
    { sec: 's3', f: 'Gloves: which materials?', b: 'Latex or nitrile, never vinyl. New pair for every patient; HH before and after.', src: 'Slide 10' },
    { sec: 's3', f: 'Gown: when to wear it [IB/IC]', b: 'When the task could soil your clothes, and for direct contact with a patient whose secretions are not contained.', src: 'Slide 11' },
    { sec: 's3', f: 'Gown: two rules people miss', b: 'Do not gown just for entering a high-risk unit [IB]. Take the gown off and clean your hands before you leave the room [IB/IC].', src: 'Slide 11' },
    { sec: 's3', f: 'Aerosol-generating procedures (slide 12)', b: 'Bronchoscopy, suctioning the airway, endotracheal intubation → full protection.', src: 'Slide 12' },
    { sec: 's3', f: 'Surgical mask (slide 13)', b: 'Cleared by the FDA. Fluid-resistant. Stops droplets and splashes.', src: 'Slide 13' },
    { sec: 's3', f: 'Procedure / isolation mask (slide 13)', b: 'Not cleared by the FDA. Droplet barrier, no fluid-resistance standard.', src: 'Slide 13' },
    { sec: 's3', f: 'N95 respirator, the "TB mask" (slide 13)', b: 'Filters tiny particles. Must be fit-tested. The only one for airborne germs: TB, measles, chickenpox.', src: 'Slide 13' },
    { sec: 's4', f: 'Standard precautions: who?', b: 'Every patient, every time (Tier 1). Tier 2 is added to it, never instead of it.', src: 'Slide 14' },
    { sec: 's4', f: 'Standard precautions: which fluids are treated as infectious, and the exception?', b: 'All blood, body fluids, secretions and excretions, except sweat.', src: 'Slide 14' },
    { sec: 's4', f: 'Standard precautions: which two tissues are also treated as infectious?', b: 'Broken skin and mucous membranes.', src: 'Slide 14' },
    { sec: 's4', f: 'Contact precautions: the 4 measures', b: 'Single room if possible; gown + gloves on entry, off before leaving; equipment stays with the patient or is cleaned between patients; room cleaned at least daily.', src: 'Slide 15' },
    { sec: 's4', f: 'Contact precautions: when? (and their category)', b: 'Draining wounds, faecal incontinence, or any discharge that could contaminate the environment. All measures Category IB.', src: 'Slide 15' },
    { sec: 's4', f: 'Droplet precautions', b: 'Surgical mask on you; surgical mask on patient when moved + cough etiquette; private room preferred; no special air handling.', src: 'Slide 16' },
    { sec: 's4', f: 'Airborne precautions', b: 'Fit-tested N95+; mask on patient; negative-pressure AIIR (HEPA/outside); non-immune staff away from measles, chickenpox, smallpox.', src: 'Slide 17' },
    { sec: 's4', f: 'Airborne patient, no isolation room available', b: 'Mask on the patient; keep the room empty for about an hour afterwards [IB/IC].', src: 'Slide 17' },
    { sec: 's4', f: 'Airborne patient in an ambulance (no negative pressure): the people', b: 'Mask on the patient, N95 on the crew.', src: 'Slide 17' },
    { sec: 's4', f: 'Airborne patient in an ambulance: the vehicle and the hospital', b: 'Exhaust fan on, hospital pre-alerted, compartment aired after.', src: 'Slide 17' },
    { sec: 's5', f: 'Isolation: who, where, how long?', b: 'The ill or diagnosed; usually in hospital, during treatment; as long as the patient is infectious.', src: 'Slide 19' },
    { sec: 's5', f: 'Quarantine: who, for what, how long?', b: 'The exposed who may become ill; a well-defined group and a dangerous, highly contagious disease; contact limited until it is clear they did not catch it.', src: 'Slide 19' },
    { sec: 's5', f: 'Precautions for resistant organisms (e.g. MRSA, VRE)', b: 'Contact precautions.', src: 'Slides 15, 21' },
    { sec: 's5', f: 'Administrators [IB/IC]: two duties', b: 'Put prevention of transmission into the safety objectives; make it a priority, with the money and the people to run the programme.', src: 'Slide 20' },
    { sec: 's5', f: 'PPE education: when, and for whom?', b: 'At orientation, then updated; for everyone.', src: 'Slide 20' },
    { sec: 's5', f: 'PPE education: how is it designed?', b: 'Task-specific; built on adult learning; in a language and reading level staff understand.', src: 'Slide 20' },
    { sec: 's5', f: 'When does a precaution start?', b: 'On suspicion, not on diagnosis.', src: 'Slide 21' }
  ]
};
