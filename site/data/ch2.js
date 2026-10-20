// Unit 2 — source: "EMS313 Ch02(1).pdf" (Hand Hygiene, 33 slides)
// Slides marked "ADDED FOR EMS 313" in the lecture itself are still lecture content.
export default {
  id: 'ch2', n: 2,
  title: 'Hand Hygiene',
  ar: 'نظافة اليدين',
  file: 'EMS313 Ch02(1).pdf',
  objSrc: 'Slide 2',
  objectives: [
    'Explain why hand hygiene is essential in infection prevention and EMS practice.',
    'Differentiate between common hand hygiene agents.',
    'Identify the advantages and limitations of alcohol-based hand rub and soap and water.',
    'Explain when and how appropriate hand hygiene should be performed.',
    'Differentiate between transient and resident skin flora.',
    'Identify situations in EMS that require hand hygiene.',
    'Explain why gloves do not replace hand hygiene.',
    'Apply hand-hygiene principles to common paramedic scenarios.'
  ],
  sections: [
    {
      id: 's1', title: 'Why hand hygiene comes first', src: 'Slides 3–5',
      blocks: [
        { t: 'p', x: '{hh|Hand hygiene} is **the most effective way to prevent the spread of infection**. It is recommended by the **CDC (2002)** and the **WHO (2009)** as the first line of infection prevention.' },
        { t: 'ul', items: [
          'The chapter follows **Category {ia|IA} and {ib|IB}** recommendations, the strongest level.',
          'IA: strongly recommended, supported by strong studies. IB: strongly recommended, supported by some studies and strong reasoning.',
          'Both are **equally binding**. The letter shows the strength of the evidence, not the strength of the rule.',
          'Hand hygiene protects **two people: the patient and the provider**.'] },
        { t: 'stat', n: '40%', x: 'average hand hygiene compliance of healthcare workers in observational studies (range 5% to 81%)' },
        { t: 'h', x: 'Hands touch everything' },
        { t: 'ul', items: [
          'Hands touch the patient, the equipment, and you. Every contact can pick up or leave microorganisms.',
          'Microorganisms **survive on hands for several minutes**, long enough to reach the next surface or patient.',
          '**Moisture increases transfer**: wet hands and wet skin areas move more microorganisms than dry ones.',
          '**More contacts per hour = more risk**: busy shifts create more opportunities and lower compliance.'] },
        { t: 'note', k: 'ems', x: 'A patient with a chest infection coughs inside the ambulance for 20 minutes. Droplets land on the rails, the monitor, the oxygen tubing and your hands. Every surface you touch afterwards becomes part of the transmission route.' },
        { t: 'h', x: '1847: General Hospital of Vienna' },
        { t: 'table', cap: '1847 hand-washing intervention', head: ['Doctors\' ward', 'Midwives\' ward'], rows: [
          ['Doctors came directly from the autopsy room to deliver babies → **high death rate** of mothers after childbirth.', 'Midwives did not perform autopsies → **much lower death rate**.']] },
        { t: 'p', x: '**The intervention:** hand washing with an **antiseptic solution** was made compulsory before entering the ward, and deaths fell sharply. This was the **first intervention trial comparing an antiseptic against plain soap**. The evidence has been clear for more than 170 years. The difficulty is **behaviour, not knowledge**.' }
      ],
      recall: [
        { q: 'Which two organizations recommend hand hygiene as the first line of infection prevention, and in which years?', a: 'CDC (2002) and WHO (2009).' },
        { q: 'What is the difference between Category IA and IB?', a: 'IA: supported by strong studies. IB: supported by some studies and strong reasoning. Both are strongly recommended and equally binding.' },
        { q: 'Average hand hygiene compliance in observational studies?', a: '40% (range 5% to 81%).' },
        { q: 'What did the 1847 Vienna intervention make compulsory?', a: 'Hand washing with an antiseptic solution before entering the ward. Deaths fell sharply.' }
      ]
    },
    {
      id: 's2', title: 'Skin flora and how hands carry germs', src: 'Slides 6–7',
      blocks: [
        { t: 'table', cap: 'Transient vs resident flora (don\'t mix them up)', quiz: true, head: ['', '{transient|Transient flora}', '{resident|Resident flora}'], rows: [
          ['Where', 'Surface layers of the skin', 'Attached to deeper layers'],
          ['Removed by hand hygiene?', 'Yes, easily removed by hand washing', 'Difficult to remove'],
          ['Link to {hai|healthcare-associated infection}', 'Most often the cause', 'Less often the cause'],
          ['In EMS terms', 'Picked up from the last patient, the stretcher or the monitor', 'Your own permanent skin bacteria; normal and protective']] },
        { t: 'note', k: 'key', x: 'Transient flora is **easy to remove and the most dangerous**.' },
        { t: 'why', q: 'Transient flora is easy to remove. Why is it still the most dangerous?', a: 'It sits on the surface layers and is picked up from the last patient, the stretcher or the monitor, so it is **most often the cause** of healthcare-associated infection. Resident flora is your own permanent, normal and protective skin bacteria and is less often the cause (slide 6).' },
        { t: 'p', x: '**What increases transfer of transient flora?** The type of microorganism · the number present · the level of moisture. Highest-risk body areas for colonisation: **perineal and groin area**, then armpits, trunk and upper limbs.' },
        { t: 'h', x: 'Five steps for transmission through hands' },
        { t: 'order', id: 'c2-hands' },
        { t: 'chain', items: ['Microorganisms on patient/surfaces/equipment', 'Transfer to provider\'s hands', 'Survive on hands for minutes', 'Hand hygiene missed, done badly or with wrong agent', 'Next patient contaminated'] },
        { t: 'note', k: 'key', x: '**Step 4 is the only step the provider fully controls.** Break it, and the chain stops.' }
      ],
      recall: [
        { q: 'Which flora is most often the cause of healthcare-associated infection?', a: 'Transient flora: on the surface layers, easily removed.' },
        { q: 'Three things that increase transfer of transient flora?', a: 'Type of microorganism, number present, level of moisture.' },
        { q: 'Which of the 5 transmission steps does the provider fully control?', a: 'Step 4: hand hygiene (missed, done badly or with the wrong agent).' }
      ]
    },
    {
      id: 's3', title: 'Methods and agents', src: 'Slides 8–10, 13–14',
      blocks: [
        { t: 'table', cap: 'Hand hygiene is one term with several methods', quiz: true, head: ['Method', 'What it is', 'Effect'], rows: [
          ['{handwash|Hand washing}', 'Plain (non-antimicrobial) soap and water', 'Removes dirt and transient flora; **does not kill**'],
          ['{antisepticwash|Antiseptic hand wash}', 'Soap containing an antiseptic agent, with water', 'Removes and kills'],
          ['{handrub|Antiseptic hand rub}', 'Alcohol-based product rubbed on all surfaces until dry. No water', 'Fast, kills, no sink needed'],
          ['{surgical|Surgical hand antisepsis}', 'Antiseptic wash or rub of hands **and forearms** before sterile procedures', 'Removes transient flora and **reduces resident flora**']] },
        { t: 'note', k: 'warn', x: '**{soiled|Visibly soiled} hands** (dirt you can see, or blood/body fluids such as faeces or urine) **need soap and water. An alcohol rub is not enough.**' },
        { t: 'p', x: 'Hand-hygiene agents differ in **effectiveness, safety, {residual|residual activity} and skin tolerance**.' },
        { t: 'h', x: 'Plain soap' },
        { t: 'twocol', a: { h: 'What it does', items: ['Works by **detergent (cleaning) action, not by killing**', 'Removes dirt, soil and organic material such as blood', 'Can remove transient flora', 'The correct choice when hands are visibly soiled'] }, b: { h: 'Limitations', items: ['Little or no antimicrobial activity', 'May fail to remove pathogens', 'Repeated washing can paradoxically **increase** bacterial counts on the skin', 'Skin irritation and dryness with frequent use'] } },
        { t: 'note', k: 'ems', x: 'A trauma patient bleeds onto your gloves and wrist. After removing gloves, use soap and water first. The soap will not kill what is there, but it removes the blood, and blood must be removed before any antiseptic can work properly.' },
        { t: 'h', x: 'Alcohol-based hand rub: how it works' },
        { t: 'chain', items: ['Ethanol or isopropanol', '{denature|Denatures} (breaks down) microbial proteins', 'Needs water for the reaction', 'Effective at 60%–95%'] },
        { t: 'ul', items: [
          'Effective concentration: **60% to 95%** alcohol mixed with water.',
          '**Above 95% is LESS effective** because the reaction needs water. Without water, alcohol evaporates before it can denature proteins.',
          'The most effective agent for routine hand hygiene by healthcare personnel.',
          'Kills (laboratory data): gram-positive and gram-negative bacteria including {mdro|multidrug-resistant organisms}, Mycobacterium tuberculosis, many fungi, most {enveloped|enveloped viruses} (influenza, HIV, herpes simplex).',
          'Hepatitis B and C are enveloped, but the evidence at 60–70% alcohol is less certain.'] },
        { t: 'why', q: 'Which is stronger for hand hygiene: 70% alcohol or 99% alcohol? Why?', a: '70%. Above 95% is less effective because the reaction needs water. Without water, alcohol evaporates before it can denature proteins.' },
        { t: 'h', x: 'Other hand hygiene agents' },
        { t: 'table', cap: 'Other agents (1 of 2)', quiz: true, head: ['Agent', 'Advantages', 'Disadvantages', 'FDA / cautions'], rows: [
          ['{chg|Chlorhexidine gluconate (CHG)}', 'Works well against gram-positive; effective against enveloped viruses; **substantial residual activity**; minimally affected by organic material such as blood', 'Less effective against gram-negative, fungi, non-enveloped viruses; minimally effective against M. tuberculosis; does not kill spores; inactivated by natural soaps and hand creams (anionic emulsifying agents)', 'Conjunctivitis and severe corneal damage reported with 1% chlorhexidine; keep away from the eyes'],
          ['{pcmx|Chloroxylenol (PCMX)}', 'Good activity against gram-negative, mycobacteria and certain viruses; only minimally affected by organic matter', 'Contradictory data; needs a longer time to work; less residual activity than chlorhexidine; neutralised by non-ionic surfactants', 'FDA: not enough information to classify as safe and effective'],
          ['{hexachlorophene|Hexachlorophene}', '{bacteriostatic|Bacteriostatic}; good activity against S. aureus; cumulative effect with repeated use; residual activity', 'Less effective against gram-negative, fungi and mycobacteria; only modestly effective after a single use; toxic, absorbed through the skin', 'FDA: not generally recognised as safe and effective as an antiseptic hand wash, especially for infant bathing']] },
        { t: 'table', cap: 'Other agents (2 of 2)', quiz: true, head: ['Agent', 'Advantages', 'Disadvantages', 'FDA / notes'], rows: [
          ['{iodophor|Iodine and iodophors}', 'Effective against gram-positive and gram-negative, some spore-forming bacteria, mycobacteria, viruses and fungi; most formulations contain **7.5% to 10% povidone-iodine**', 'Iodine causes skin irritation and discolouration; iodophor effectiveness depends on pH, temperature, exposure time and inorganic material', 'Widely used; iodophors are less irritating than free iodine'],
          ['{quats|Quaternary ammonium compounds}', 'More effective against gram-negative; some activity against lipophilic viruses', 'Less effective against gram-positive; minimally effective against mycobacteria and fungi; decreased by organic matter such as blood; not compatible with anionic detergents', 'FDA: several compounds have insufficient data to be classified as safe and effective for an antiseptic hand wash'],
          ['{triclosan|Triclosan}', 'Non-ionic, colourless, **0.2% to 2%** in antimicrobial soaps; most effective against gram-positive including MRSA; reasonably effective against mycobacteria and Candida; some persistent activity; not substantially affected by organic matter', 'Less effective against gram-negative, especially Pseudomonas aeruginosa; affected by pH, surfactants, emollients, humectants and ionic properties', 'FDA 1994: insufficient data to classify as safe and effective; FDA inquiry into safety and efficacy']] },
        { t: 'p', x: '**How to compare any agent:** what is its spectrum, how fast does it act, does it keep working after application (residual activity), and does blood or organic material stop it?' },
        { t: 'note', k: 'ems', x: 'For EMS practice (added for EMS 313 in the lecture): **chlorhexidine is the agent to remember, for its residual activity**. Povidone-iodine is used for skin preparation before injections and needs contact time; wiping and injecting immediately wastes it.' }
      ],
      recall: [
        { q: 'Which method removes dirt and transient flora but does not kill?', a: 'Hand washing with plain (non-antimicrobial) soap and water.' },
        { q: 'Effective alcohol concentration range, and why is >95% worse?', a: '60%–95%. The reaction needs water; above 95% alcohol evaporates before it denatures proteins.' },
        { q: 'Which agent is "the one to remember" for EMS and why?', a: 'Chlorhexidine (CHG), for its residual (persistent) activity.' },
        { q: 'Which agents have residual/persistent activity? Which has none?', a: 'CHG (substantial), hexachlorophene, triclosan (some), PCMX (less than CHG). Alcohol has none.' },
        { q: 'Povidone-iodine concentration in most hand-hygiene formulations?', a: '7.5% to 10%.' },
        { q: 'Which enveloped viruses have less certain evidence at 60–70% alcohol?', a: 'Hepatitis B and C (slide 10).' }
      ]
    },
    {
      id: 's4', title: 'Alcohol rub vs soap and water', src: 'Slides 11–12, 15',
      blocks: [
        { t: 'twocol', a: { h: 'Alcohol: advantages', items: ['Fast: works in seconds', 'More effective than other agents for routine hand hygiene', 'Best option against multidrug-resistant organisms', 'Covers gram-positive, gram-negative, fungi and TB', 'No sink needed, so it suits the field'] }, b: { h: 'Alcohol: limitations', items: ['Poor against **bacterial spores ({cdiff|C. difficile})**, protozoan cysts and **{nonenveloped|non-enveloped viruses}** (e.g. {norovirus|norovirus})', 'No persistent or residual activity: the effect ends when hands are dry', 'Less effective when blood or organic material is present', 'Flammable and volatile, a storage issue in a hot ambulance'] } },
        { t: 'note', k: 'key', x: '**Three situations where alcohol fails:** visibly soiled hands · C. difficile · non-enveloped viruses such as norovirus. In all three, use **soap and water**.' },
        { t: 'table', cap: 'Alcohol-based hand rub vs soap and water: not interchangeable', quiz: true, head: ['', 'Alcohol-based hand rub', 'Soap and water'], rows: [
          ['Speed', '20 to 30 seconds; no sink needed', '40 to 60 seconds; needs sink and towels'],
          ['Kills or removes?', 'Kills most bacteria, fungi, enveloped viruses', 'Removes mechanically; plain soap does not kill'],
          ['Spores and non-enveloped viruses', 'Poor (C. difficile, norovirus)', 'Removed by washing and rinsing'],
          ['Visibly soiled hands', 'Not effective; blood reduces activity', 'Required'],
          ['Residual activity', 'None', 'None (plain soap)'],
          ['Skin', 'Less irritating than frequent washing', 'Dryness and irritation with repeated use'],
          ['In EMS', 'Between routine patient contacts; at the point of care; pocket bottle', 'After blood or body-fluid contact; diarrhoea calls; when hands are visibly dirty']] },
        { t: 'note', k: 'key', x: '**Default in the field: alcohol-based hand rub.** Switch to soap and water when hands are visibly soiled, or after C. difficile or norovirus exposure.' },
        { t: 'sort', id: 'c2-method' }
      ],
      recall: [
        { q: 'Name the three situations where alcohol fails.', a: 'Visibly soiled hands, C. difficile (spores), non-enveloped viruses such as norovirus.' },
        { q: 'How long does a hand rub take vs a hand wash?', a: 'Rub 20–30 seconds; wash 40–60 seconds.' },
        { q: 'Does alcohol have residual activity?', a: 'No. The effect ends when the hands are dry.' }
      ]
    },
    {
      id: 's5', title: 'Technique: the six rubbing steps', src: 'Slides 16–18',
      blocks: [
        { t: 'p', x: 'Hand rub and hand wash share the **same six rubbing steps (steps 2 to 7)** from the WHO "How to handrub / How to handwash" posters.' },
        { t: 'twocol', a: { h: 'Alcohol-based hand rub · 20–30 s', items: ['1a, 1b: Apply a palmful of the product in a cupped hand and cover all surfaces', '2 to 7: The six rubbing steps, then keep rubbing until the hands are dry'] }, b: { h: 'Soap and water · 40–60 s', items: ['0, 1: Wet hands with water, then apply enough soap to cover all surfaces', '2 to 7: The same six rubbing steps', '8, 9, 10: Rinse with water, dry thoroughly with a single-use towel, use the towel to turn off the tap'] } },
        { t: 'order', id: 'c2-six' },
        { t: 'order', id: 'c2-wash' },
        { t: 'twocol', a: { h: 'Most often missed', items: ['Fingertips and under the nails (step 7)', 'Thumbs (step 6)', 'Between the fingers (steps 3 and 4)', 'Backs of the hands and wrists'] }, b: { h: 'Hand rub: two rules', items: ['**If your hands are dry in 10 seconds, you used too little.**', 'Never wipe or shake the hands to speed up drying. The product must finish working.'] } },
        { t: 'p', x: '**Why steps 9 and 10 matter (handwash):** wet hands transfer far more microorganisms than dry hands, so dry thoroughly with a single-use towel. You touched the tap with contaminated hands before washing, so use the towel to turn it off or the contamination comes back.' },
        { t: 'note', k: 'conflict', x: '**The numbers you will see:** hand rub **20–30 seconds, until dry (WHO)**; handwash **40–60 seconds** for the whole procedure (WHO). **At least 15 seconds** of rubbing is the **CDC minimum** quoted in the source deck (slide 17). Slide 29 gives the fix for rubbing too fast as "about 30 seconds".' },
        { t: 'h', x: 'Spot the mistake (slide 18)' },
        { t: 'mistakes', intro: 'Ahmed finishes a trauma call. There is blood on his gloves. Tap each line that contains a hand-hygiene error.', lines: [
          ['He removes the gloves and wipes his hands with an alcohol wipe.', true, 'Blood = visibly soiled → soap and water first; alcohol does not work through blood.'],
          ['He dries his hands on his uniform trousers.', true, 'Dry thoroughly with a single-use towel.'],
          ['He picks up his personal phone and writes the patient report.', true, 'Phone stays out of the patient compartment, or is disinfected after every patient.'],
          ['At the next call he puts on new gloves and begins the assessment.', true, 'Hand hygiene is needed before putting on gloves (glove sequence).'],
          ['After the shift he refills the half-empty hand-rub bottle in the ambulance drawer.', true, 'Never top up a partly full dispenser: contamination risk. Use pre-filled bottles.']] }
      ],
      recall: [
        { q: 'Which areas are most often missed?', a: 'Fingertips/under the nails (step 7), thumbs (step 6), between the fingers (steps 3–4), backs of hands and wrists.' },
        { q: 'Your hands are dry 10 seconds after a rub. What does that mean?', a: 'You used too little product.' },
        { q: 'Why use the towel to turn off the tap?', a: 'You touched the tap with contaminated hands before washing; otherwise the contamination comes back.' }
      ]
    },
    {
      id: 's6', title: 'Surgical hand antisepsis', src: 'Slides 19–20',
      blocks: [
        { t: 'p', x: '**{surgical|Surgical hand antisepsis}** is pre-operative cleansing of the **hands and forearms** with antiseptic agents. It **removes transient flora and reduces resident flora**.' },
        { t: 'ul', items: [
          'Most effective products: formulations of **60% to 95% alcohol alone**; **50% to 95% alcohol combined** with a quaternary ammonium compound, hexachlorophene or chlorhexidine gluconate; waterless, alcohol-based rubs.',
          '**Why add chlorhexidine?** Alcohol kills fast but stops working when dry. A long operation inside a warm, moist glove lets resident flora regrow. Chlorhexidine keeps working for hours.',
          'Before putting on sterile gloves, use an **antimicrobial soap or an alcohol-based hand rub with persistent activity** [CDC and WHO, IB].'] },
        { t: 'table', cap: 'Key recommendations', quiz: true, head: ['Recommendation', 'Source'], rows: [
          ['Artificial nails are prohibited in settings that require surgical hand antisepsis', 'WHO IB'],
          ['Brushes are not recommended', 'WHO IB'],
          ['Scrub hands and forearms for the length of time suggested by the manufacturer', 'CDC and WHO IB'],
          ['Long scrub times are not necessary', 'CDC and WHO IB'],
          ['Before an alcohol-based surgical scrub with persistent activity, prewash hands and forearms with non-antimicrobial soap, then dry them', 'CDC IB'],
          ['Use enough alcohol-based hand rub to keep hands and forearms wet throughout the procedure', 'WHO IB'],
          ['After applying the alcohol-based product, dry hands and forearms thoroughly before putting on sterile gloves', 'CDC and WHO IB'],
          ['Use an antimicrobial soap or alcohol-based hand rub with persistent activity before putting on sterile gloves', 'CDC and WHO IB']] },
        { t: 'chain', items: ['Brushes / long scrubs', 'Damage the skin', 'Bring resident flora up from deeper layers', 'Bacterial count rises instead of falling'] },
        { t: 'note', k: 'key', x: 'The product\'s **contact time** does the work, not scrubbing.' }
      ],
      recall: [
        { q: 'Surgical hand antisepsis covers which body areas, and what does it do to flora?', a: 'Hands and forearms. Removes transient flora and reduces resident flora.' },
        { q: 'Why add chlorhexidine to a surgical rub?', a: 'Alcohol stops working when dry; resident flora regrows in a warm, moist glove; chlorhexidine keeps working for hours.' },
        { q: 'Why are brushes and long scrubs not recommended?', a: 'They damage skin and bring resident flora up from deeper layers, so the count rises.' }
      ]
    },
    {
      id: 's7', title: 'Choosing products, and gloves', src: 'Slides 21–23',
      blocks: [
        { t: 'table', cap: 'Choose an agent that staff will use', quiz: true, head: ['Rule', 'Why', 'Category'], rows: [
          ['Low potential for irritation', 'Even when used many times per shift', 'IB'],
          ['Ask the staff', 'Feel, fragrance and skin tolerance decide whether people use it', 'IB'],
          ['Cost is not the main factor', 'A cheap product that dries the skin lowers compliance and costs more', 'CDC IB · WHO II'],
          ['**Never top up a partly full dispenser**', 'Contamination risk. Use pre-filled bags or bottles', 'IA'],
          ['Provide hand lotion or cream', 'Skin protection is part of infection control, but the cream must be compatible with the agent', 'IA'],
          ['Teach skin care', 'Education programmes should include how to reduce irritation and damage', 'IB']] },
        { t: 'p', x: 'Product compatibility: ask the manufacturer about the risk of product contamination [WHO IB] and about using hand lotions, creams or alcohol-based antiseptics together [CDC IB, WHO II]. EMS: a pocket-sized bottle per provider; bottles are never refilled in the ambulance drawer; a compatible hand cream is stocked at the station in dry, hot weather.' },
        { t: 'h', x: 'Gloves do not replace hand hygiene' },
        { t: 'order', id: 'c2-gloves' },
        { t: 'twocol', a: { h: 'Why gloves are not enough', items: ['Gloves can have tiny holes you cannot see', 'Hands become contaminated while removing gloves', 'The warm, moist space inside a glove lets bacteria multiply on your skin', '**WHO Category IB: the use of gloves does not reduce the need for hand hygiene**'] }, b: { h: 'Four glove rules (CDC and WHO, IB)', items: ['Remove gloves after caring for the patient', 'Dispose of gloves after use', '**Never use the same pair for more than one patient**', '**Never wash gloves for re-use**', 'Also: no artificial nails or extenders when in direct contact with patients (IB)'] } }
      ],
      recall: [
        { q: 'What is the correct glove sequence?', a: 'Hand hygiene → put on gloves → patient care → remove gloves → hand hygiene.' },
        { q: 'Give three reasons gloves are not enough.', a: 'Tiny invisible holes; hands contaminated during removal; warm moist glove lets bacteria multiply.' },
        { q: 'What is the rule about a partly full dispenser, and its category?', a: 'Never top it up (contamination risk); use pre-filled bags/bottles. Category IA.' }
      ]
    },
    {
      id: 's8', title: 'The ambulance, compliance and the five moments', src: 'Slides 24–28',
      blocks: [
        { t: 'p', x: '**Indirect transmission in the ambulance:** Patient → paramedic hand → monitor → paramedic hand → next patient.' },
        { t: 'note', k: 'added', x: 'In the lecture, slide 24 (the contaminated ambulance) is marked "ADDED FOR EMS 313 · NOT IN ORIGINAL CHAPTER 2". The point-of-care box on slide 26 and the Before/After EMS lists on slide 27 are also marked as added for EMS 313; the WHO five moments are from the original chapter.' },
        { t: 'p', x: '**{hightouch|High-touch surfaces}:** monitor and cables · stretcher rails and straps · BP cuff and stethoscope · radio and tablet · door handles and grab rails · your personal phone. Consecutive patients in the same vehicle share every surface you touched between them, unless the surfaces were cleaned and your hands were too.' },
        { t: 'note', k: 'ems', x: '**The phone problem:** a phone touched during patient care is rarely cleaned and goes home with you. Keep it out of the patient compartment, or disinfect it after every patient.' },
        { t: 'h', x: 'Why compliance fails (average 40%, range 5–81%)' },
        { t: 'table', cap: 'Barriers', quiz: true, head: ['Type', 'Barriers'], rows: [
          ['System', 'Sinks far away or too few · lack of soap and paper towels · lack of time · understaffed or overcrowded wards · agents that irritate and dry the skin'],
          ['Beliefs', '"Gloves are enough" · patient seen as low risk · lack of knowledge of guidelines · forgetfulness · scepticism about the value · disagreement with the policy'],
          ['Culture', 'No role model among peers or supervisors · no feedback · no institutional priority · no active promotion · no safety climate']] },
        { t: 'ul', items: [
          'Compliance is **lower before patient contact than after**. Providers protect themselves more than the patient.',
          'Compliance **falls as the number of opportunities per hour rises**, which is when it matters most.',
          'Compliance is **lower at night** than by day, **lower among physicians** than nurses, and **lower after a clean task** than a dirty one.'] },
        { t: 'why', q: 'Why is compliance lower before patient contact than after?', a: 'Providers protect themselves more than the patient (slide 25). Slide 28\'s "right timing" rule answers this: hand hygiene **before as much as after**, five moments, every call.' },
        { t: 'h', x: 'What improves compliance' },
        { t: 'table', cap: 'Improvement strategies', quiz: true, head: ['Strategy', 'Detail', 'Category'], rows: [
          ['Monitor and give feedback', 'Monitor compliance with hand-hygiene practices and policies and feed results back to staff', 'CDC and WHO IA'],
          ['Institutional priority', 'Administrative support and funding', 'CDC and WHO IB'],
          ['Education that targets the barriers', 'Address the factors that influence compliance, not only the products', 'WHO IA'],
          ['Multimodal, with senior executives', 'Multi-faceted, multimodal, with support from senior executives', 'WHO IA'],
          ['Multidisciplinary programmes', 'Include easy access to alcohol-based hand rub', 'CDC IA'],
          ['Product where care happens', 'Hand rub at the room entrance, bedside, pocket-sized containers; dispensers at the point of care', 'CDC IA · WHO IB/IA']] },
        { t: 'note', k: 'ems', x: 'In EMS (added for EMS 313 in the lecture) the **point of care is the side of the stretcher**: a pocket bottle for every provider and a dispenser mounted in the patient compartment, not in a cabinet in the cab.' },
        { t: 'h', x: 'When should a paramedic perform hand hygiene?' },
        { t: 'twocol', a: { h: 'Before', items: ['Patient contact', 'IV insertion', 'Medication preparation', 'Airway procedures', 'Handling clean equipment'] }, b: { h: 'After', items: ['Patient contact', 'Blood or body-fluid exposure', 'Removing gloves', 'Touching contaminated equipment', 'Cleaning the ambulance', 'Contact with the patient environment'] } },
        { t: 'order', id: 'c2-moments' },
        { t: 'table', cap: 'Right method · right timing · right technique', head: ['Right method', 'Right timing', 'Right technique'], rows: [
          ['Rub by default; wash when soiled, after C. difficile or norovirus', 'Before as much as after; five moments, every call', 'The six rubbing steps; until dry for the rub, 40 to 60 seconds at the sink']] },
        { t: 'note', k: 'key', x: 'You cannot control what the patient carries or how long microorganisms survive on skin. **You can always control step 4.**' }
      ],
      recall: [
        { q: 'List the WHO five moments.', a: '1 Before touching the patient · 2 Before a clean/aseptic procedure · 3 After body-fluid exposure risk · 4 After touching the patient · 5 After touching the patient\'s surroundings.' },
        { q: 'Is compliance higher before or after patient contact? Why?', a: 'After. Providers protect themselves more than the patient.' },
        { q: 'Where is the "point of care" in EMS?', a: 'The side of the stretcher: pocket bottle per provider + dispenser in the patient compartment.' }
      ]
    },
    {
      id: 's9', title: 'Common EMS mistakes and scenarios', src: 'Slides 29–33',
      blocks: [
        { t: 'note', k: 'added', x: 'Slides 29 and 30 (common EMS mistakes, practical scenarios) are marked in the lecture "ADDED FOR EMS 313 · NOT IN ORIGINAL CHAPTER 2".' },
        { t: 'table', cap: 'Common EMS hand-hygiene mistakes and fixes', quiz: true, head: ['Mistake', 'Fix'], rows: [
          ['Changing gloves without hand hygiene', 'Hand hygiene before and after every pair'],
          ['Alcohol rub on visibly bloody hands', 'Soap and water first; alcohol does not work through blood'],
          ['Touching a personal phone during patient care', 'Phone stays out of the patient compartment, or is disinfected after every patient'],
          ['Rubbing while walking, dry in 10 seconds', 'Enough product, all surfaces, until dry: about 30 seconds'],
          ['Wiping gloves to keep them on for the next task', 'Gloves are single use: remove, discard, hand hygiene'],
          ['Refilling half-empty bottles; storing rub in a hot cabin', 'Pre-filled bottles only; store away from heat']] },
        { t: 'h', x: 'Practical scenarios (slide 30)' },
        { t: 'p', x: 'The slide gives the scenarios without answers. The model answers below are **applied from other Chapter 2 slides**, which are cited after each point.' },
        { t: 'case', title: 'Respiratory patient', src: 'Slide 30 · answer from slides 4, 22, 24, 27',
          x: 'A patient with pneumonia coughs continuously during a 20-minute transport. You adjust his oxygen mask twice and hold the rail on every turn.',
          q: 'Which moments of hand hygiene apply? Which surfaces need cleaning before the next patient?',
          a: '**Moments:** moment 1 before and moment 4 after each time you touch him to adjust the oxygen mask; moment 5 after holding the rail, because the rail is part of the patient\'s surroundings (slide 27). Moment 3 also applies if your hands may have touched his respiratory secretions (inferred from slides 4 and 27). Gloves do not replace any of these (slide 22). **Surfaces:** the coughing patient\'s droplets land on the rails, the monitor and the oxygen tubing, and every surface you touched afterwards is part of the route (slide 4). Before the next patient, clean those surfaces and any other high-touch surface you touched (slide 24 list: stretcher rails and straps, monitor and cables, BP cuff and stethoscope…), and clean your hands too: consecutive patients share every surface you touched unless the surfaces and your hands were cleaned (slide 24).' },
        { t: 'case', title: 'IV insertion in a moving ambulance', src: 'Slide 30 · answer from slides 15–17, 22, 27',
          x: 'You need an IV in a stable patient during transport. There is no sink. Your hands are not visibly soiled.',
          q: 'Which method, when, and what do you do with the gloves before and after?',
          a: '**Method:** alcohol-based hand rub. No sink is needed and the hands are not visibly soiled, so the field default applies (slide 15). **When:** before the IV insertion (slide 27 lists "IV insertion" under Before; as a clean or aseptic procedure it also fits WHO moment 2, inferred from slide 27) and again after removing the gloves (slide 27). **Gloves:** hand hygiene → put on gloves → insert the IV → remove gloves → hand hygiene (slide 22). Cover all surfaces and rub until dry, 20 to 30 seconds; never wipe or shake the hands to dry them faster (slides 16–17).' },
        { t: 'case', title: 'Needlestick during a trauma call', src: 'Slide 30 · answer from slides 8–9, 22, 27, 29',
          x: 'While securing the IV in a bleeding patient, the needle pricks your finger through the glove.',
          q: 'What are your immediate actions in the first minute? What follows?',
          a: '**What Chapter 2 covers (inferred from the slides cited):** remove and discard the pricked glove, because gloves are single use (slides 22, 29). Blood on the hand means visibly soiled hands, so wash with **soap and water**, not alcohol rub: alcohol does not work through blood, and blood must be removed before any antiseptic can work properly (slides 8, 9, 29). Hand hygiene is required after blood or body-fluid exposure and after removing gloves (slide 27), and again before a new pair (slide 22). **What follows:** Chapter 2 gives no needlestick or exposure-reporting steps; see the note below.' },
        { t: 'note', k: 'added', x: 'The "what follows" part of the needlestick scenario is **not in Chapter 2**. It is covered in the Vaccines lecture (Unit 6): after a needlestick injury, report the exposure immediately and seek prompt assessment for vaccine and/or immune globulin. The assessment considers the type of exposure, the vaccination history and the documented vaccine response (Vaccines slide 21 and its speaker notes; slide 14: "report exposures").' },
        { t: 'h', x: 'Key takeaways' },
        { t: 'ul', items: ['Hand hygiene is one of the most important infection-prevention practices.', 'Hand hygiene protects the patient and the provider.', 'Alcohol-based hand rub and soap and water are not interchangeable in every situation.', 'Gloves do not replace hand hygiene.', 'Hands and equipment can transmit microorganisms between patients.', 'Hand hygiene is a clinical patient-safety intervention, not just a routine task.'] }
      ],
      recall: [
        { q: 'Fix for "rubbing while walking, dry in 10 seconds"?', a: 'Enough product, all surfaces, until dry: about 30 seconds.' },
        { q: 'Fix for "wiping gloves to keep them on"?', a: 'Gloves are single use: remove, discard, hand hygiene.' },
        { q: 'IV in a moving ambulance, no sink, hands not soiled: which method and which glove sequence?', a: 'Alcohol-based hand rub (slide 15); hand hygiene → gloves → IV → remove gloves → hand hygiene (slide 22).' }
      ]
    }
  ],

  orders: [
    { id: 'c2-hands', sec: 's2', src: 'Slide 7', title: 'Five steps for transmission through hands', steps: ['Microorganisms on the patient\'s skin, surfaces or equipment', 'They transfer to the provider\'s hands', 'They survive on the hands for at least several minutes', 'Hand hygiene is missed, done badly or with the wrong agent', 'Contaminated hands touch the next patient or equipment'] },
    { id: 'c2-six', sec: 's5', src: 'Slide 16', title: 'The six rubbing steps (2 to 7)', steps: ['Palm to palm', 'Right palm over the back of the left hand, fingers interlaced (and vice versa)', 'Palm to palm with fingers interlaced', 'Backs of fingers against the opposite palm, fingers interlocked', 'Rotational rubbing of each thumb held in the other palm', 'Rotational rubbing of the fingertips in the opposite palm'] },
    { id: 'c2-wash', sec: 's5', src: 'Slide 16', title: 'Hand washing with soap and water: whole procedure', steps: ['Wet hands with water', 'Apply enough soap to cover all hand surfaces', 'Six rubbing steps (2 to 7)', 'Rinse hands with water', 'Dry thoroughly with a single-use towel', 'Use the towel to turn off the tap'] },
    { id: 'c2-gloves', sec: 's7', src: 'Slide 22', title: 'The correct glove sequence, every time', steps: ['Hand hygiene', 'Put on gloves', 'Patient care', 'Remove gloves', 'Hand hygiene'] },
    { id: 'c2-moments', sec: 's8', src: 'Slide 27', title: 'WHO five moments, in order', steps: ['Before touching the patient', 'Before a clean or aseptic procedure', 'After body-fluid exposure risk', 'After touching the patient', 'After touching the patient\'s surroundings'] }
  ],
  sorts: [
    { id: 'c2-method', sec: 's4', src: 'Slides 11–12, 15', title: 'Alcohol rub or soap and water?', cats: ['Alcohol-based hand rub', 'Soap and water'],
      items: [['Between routine patient contacts, hands look clean', 0], ['Blood on your wrist after removing gloves', 1], ['Patient with known C. difficile, hands look clean', 1], ['Norovirus outbreak call', 1], ['Before an IV in a moving ambulance, no sink, hands not soiled', 0], ['Diarrhoea call', 1], ['After touching the stretcher rail (no visible soil)', 0], ['Hands visibly dirty with faeces', 1]] }
  ],

  questions: [
    { id: 'c2q1', sec: 's1', q: 'Which organizations recommend hand hygiene as the first line of infection prevention?', o: ['CDC (2002) and WHO (2009)', 'APIC (2002) and CBIC (2009)', 'FDA (1994) and CDC (2007)', 'WHO (2002) and NIOSH (2009)'], x: 'The slide names the CDC (2002) and the WHO (2009). The other pairs mix in agencies or years the slide does not give for this recommendation; FDA 1994 is the triclosan ruling on slide 14 (slide 3).', src: 'Slide 3' },
    { id: 'c2q2', sec: 's1', q: 'What is the average hand hygiene compliance of healthcare workers in observational studies?', o: ['40%', '81%', '5%', '60%'], x: 'The average is 40%. 5% and 81% are the two ends of the range, not the average (slide 3).', src: 'Slide 3' },
    { id: 'c2q3', sec: 's1', q: 'Category IB means a recommendation is:', o: ['Strongly recommended, supported by some studies and strong reasoning', 'Strongly recommended, supported by strong studies', 'Optional, based on expert opinion and local preference rather than evidence', 'Less binding than a Category IA recommendation'], x: 'IB = strongly recommended, supported by some studies and strong reasoning; "strong studies" describes IA. IA and IB are equally binding, because the letter shows the strength of the evidence, not of the rule (slide 3).', src: 'Slide 3' },
    { id: 'c2q4', sec: 's1', q: 'In the 1847 Vienna hospital, why was the death rate higher on the doctors\' ward?', o: ['Doctors came directly from the autopsy room to deliver babies', 'Midwives performed autopsies before deliveries and did not wash their hands', 'Doctors washed with an antiseptic solution that irritated the mothers\' skin', 'Compulsory antiseptic hand washing had already been introduced on the doctors\' ward'], x: 'Doctors came straight from the autopsy room to deliver babies; midwives did not perform autopsies and had a much lower death rate. Compulsory antiseptic hand washing was the later intervention that made deaths fall, not the cause (slide 5).', src: 'Slide 5' },
    { id: 'c2q5', sec: 's1', q: 'According to the lecture, the main difficulty with hand hygiene today is:', o: ['Behaviour, not knowledge', 'Lack of evidence that hand washing saves lives', 'Cost of alcohol rub', 'Lack of approved agents'], x: 'The evidence has been clear for more than 170 years, so the difficulty is behaviour, not knowledge or a lack of evidence (slide 5).', src: 'Slide 5' },
    { id: 'c2q6', sec: 's1', q: 'Which statement about microorganisms on hands is correct?', o: ['Wet hands transfer more microorganisms than dry hands', 'Microorganisms die within a few seconds on the dry skin of the hands', 'More contacts per hour lower the risk', 'Moisture reduces transfer between surfaces'], x: 'Moisture increases transfer: wet hands move more microorganisms than dry ones. Microorganisms survive on hands for several minutes, and more contacts per hour mean more risk (slide 4).', src: 'Slide 4' },
    { id: 'c2q7', sec: 's2', q: 'Transient flora is:', o: ['On the surface layers, easily removed, most often the cause of HAI', 'Attached to the deeper skin layers, difficult to remove, and normal and protective', 'Normal and protective permanent skin bacteria', 'Removed by surgical scrubbing with brushes, not by washing'], x: 'Transient flora sits on the surface layers, is easily removed by hand washing and is most often the cause of HAI. Deeper, hard-to-remove, "normal and protective" flora is resident flora (slide 6).', src: 'Slide 6' },
    { id: 'c2q8', sec: 's2', q: 'Which body area carries the highest risk for colonisation?', o: ['Perineal and groin area', 'Armpits', 'Fingertips and under the nails', 'Upper limbs'], x: 'Highest risk: the perineal and groin area, then armpits, trunk and upper limbs (slide 6). Fingertips and under the nails are the area most often missed during hand hygiene (slide 17), not the highest colonisation risk.', src: 'Slide 6' },
    { id: 'c2q9', sec: 's2', q: 'Which of the five steps of hand transmission does the provider fully control?', o: ['Step 4: performing hand hygiene', 'Step 1: organisms on the patient', 'Step 3: survival on the hands', 'Step 2: transfer to the hands'], x: 'You cannot control what the patient carries or how long microorganisms survive, but step 4 (hand hygiene) is the only step the provider fully controls. Break it and the chain stops (slides 7, 28).', src: 'Slide 7' },
    { id: 'c2q10', sec: 's2', q: 'Which factor is NOT listed as increasing transfer of transient flora?', o: ['The age of the provider', 'The type of microorganism', 'The number present', 'The level of moisture'], x: 'Slide 6 lists three factors: the type of microorganism, the number present and the level of moisture. The provider\'s age is not one of them (slide 6).', src: 'Slide 6' },
    { id: 'c2q11', sec: 's3', q: 'Hand washing with plain soap and water:', o: ['Removes dirt and transient flora but does not kill', 'Kills spores and non-enveloped viruses that alcohol misses', 'Has substantial residual activity', 'Reduces resident flora for hours'], x: 'Plain soap works by detergent action: it removes dirt and transient flora but has little or no antimicrobial activity. It has no residual activity, and spores are removed by washing and rinsing, not killed (slides 8–9, 15).', src: 'Slides 8–9' },
    { id: 'c2q12', sec: 's3', q: 'Surgical hand antisepsis differs from routine hand hygiene because it:', o: ['Includes the forearms and reduces resident flora', 'Uses plain soap without an antiseptic agent', 'Is done after removing sterile gloves, at the end of the operation', 'Uses brushes and long scrub times'], x: 'Surgical hand antisepsis uses antiseptic agents on the hands and forearms before sterile procedures; it removes transient flora and reduces resident flora. Brushes and long scrubs are not recommended (slides 8, 19, 20).', src: 'Slides 8, 19' },
    { id: 'c2q13', sec: 's3', q: 'What is the effective alcohol concentration for hand rubs?', o: ['60% to 95%', '30% to 50%', '95% to 100%', '10% to 30%'], x: 'Alcohol is effective at 60% to 95% mixed with water. Above 95% is less effective because the reaction needs water (slide 10).', src: 'Slide 10' },
    { id: 'c2q14', sec: 's3', q: 'Why is alcohol above 95% LESS effective?', o: ['The protein-denaturing reaction needs water', 'It is too irritating to use on the skin', 'It evaporates too slowly and leaves the hands wet', 'It is inactivated by hand creams'], x: 'Alcohol kills by denaturing proteins, and that reaction needs water; without water, alcohol evaporates before it can denature proteins. Inactivation by hand creams belongs to chlorhexidine (slides 10, 13).', src: 'Slide 10' },
    { id: 'c2q15', sec: 's3', q: 'Which agent has SUBSTANTIAL residual activity and is minimally affected by blood?', o: ['Chlorhexidine gluconate', 'Alcohol', 'Plain soap', 'Quaternary ammonium compounds'], x: 'CHG has substantial residual activity and is minimally affected by blood. Alcohol has no residual activity and is less effective with blood present; quats are decreased by blood (slides 11, 13, 14).', src: 'Slide 13' },
    { id: 'c2q16', sec: 's3', q: 'Chlorhexidine can be inactivated by:', o: ['Natural soaps and hand creams (anionic emulsifying agents)', 'Blood and other organic material such as body fluids on the hands', 'Water used to rinse', 'Non-ionic surfactants'], x: 'Natural soaps and hand creams (anionic emulsifying agents) inactivate CHG, while blood barely affects it. Non-ionic surfactants neutralise PCMX, not CHG (slide 13).', src: 'Slide 13' },
    { id: 'c2q17', sec: 's3', q: 'Which agent is toxic, absorbed through the skin, and not generally recognised by the FDA as safe and effective as an antiseptic hand wash, especially for infant bathing?', o: ['Hexachlorophene', 'Triclosan', 'Chloroxylenol (PCMX)', 'Povidone-iodine'], x: 'Hexachlorophene is toxic and absorbed through the skin, and the infant-bathing warning is its FDA position. For PCMX and triclosan the FDA says there is not enough data to classify them (slides 13, 14).', src: 'Slide 13' },
    { id: 'c2q18', sec: 's3', q: 'Most iodophor hand-hygiene formulations contain:', o: ['7.5% to 10% povidone-iodine', '0.2% to 2% povidone-iodine', '60% to 95% povidone-iodine', '1% povidone-iodine'], x: 'Most iodophor formulations contain 7.5% to 10% povidone-iodine. 0.2% to 2% is the triclosan range, 60% to 95% is alcohol and 1% is the chlorhexidine eye warning (slides 10, 13, 14).', src: 'Slide 14' },
    { id: 'c2q19', sec: 's3', q: 'Triclosan is LESS effective against:', o: ['Gram-negative organisms, especially Pseudomonas aeruginosa', 'Gram-positive organisms including MRSA', 'Mycobacteria and Candida', 'Any organism when organic matter such as blood is present on the skin'], x: 'Triclosan is most effective against gram-positive organisms including MRSA, reasonably effective against mycobacteria and Candida, and not substantially affected by organic matter. Its weak spot is gram-negative organisms, especially Pseudomonas aeruginosa (slide 14).', src: 'Slide 14' },
    { id: 'c2q20', sec: 's3', q: 'Quaternary ammonium compounds (as hand agents) are:', o: ['More effective against gram-negative, less against gram-positive', 'Highly effective against mycobacteria, fungi and gram-positive bacteria', 'Unaffected by blood and other organic matter on the hands', 'Compatible with anionic detergents'], x: 'As hand agents, quats are more effective against gram-negative and less against gram-positive bacteria. They are minimally effective against mycobacteria and fungi, are decreased by blood and are not compatible with anionic detergents (slide 14).', src: 'Slide 14' },
    { id: 'c2q21', sec: 's3', q: 'Conjunctivitis and severe corneal damage have been reported with:', o: ['1% chlorhexidine', '70% alcohol', '10% povidone-iodine', '2% triclosan'], x: 'The eye warning belongs to 1% chlorhexidine: keep it away from the eyes. 7.5–10% is the povidone-iodine range and 0.2–2% the triclosan range, with no eye warning given (slides 13, 14).', src: 'Slide 13' },
    { id: 'c2q22', sec: 's3', q: 'Chloroxylenol (PCMX) compared with chlorhexidine:', o: ['Has less residual activity and needs a longer time to work', 'Has more residual activity than chlorhexidine and acts faster on the skin', 'Is classified by the FDA as safe and effective', 'Is strongly inactivated by blood and organic matter'], x: 'PCMX needs a longer time to work and has less residual activity than chlorhexidine. It is only minimally affected by organic matter, and the FDA has not enough information to classify it as safe and effective (slide 13).', src: 'Slide 13' },
    { id: 'c2q23', sec: 's4', q: 'Alcohol-based hand rub is POOR against:', o: ['C. difficile spores and norovirus', 'MRSA and other MDROs', 'Mycobacterium tuberculosis', 'Influenza, HIV and other enveloped viruses'], x: 'Alcohol is poor against bacterial spores (C. difficile), protozoan cysts and non-enveloped viruses such as norovirus. It does cover MDROs, TB and enveloped viruses such as influenza and HIV (slides 10, 11).', src: 'Slide 11' },
    { id: 'c2q24', sec: 's4', q: 'An elderly patient with C. difficile is transported; your hands look clean after removing gloves. Best action?', o: ['Wash hands with soap and water', 'Apply alcohol-based hand rub for 20 seconds', 'Apply alcohol-based hand rub twice', 'No hand hygiene is needed because gloves were worn'], x: 'Alcohol is poor against C. difficile spores, however long or often you rub, so soap and water is needed even when hands look clean; gloves do not replace hand hygiene. Knowledge check 1 (slide 12); answer derived from slides 11, 15 and 22, as the speaker notes are not in the file.', src: 'Slides 11–12' },
    { id: 'c2q25', sec: 's4', q: 'Which statement about alcohol-based hand rub is correct?', o: ['It has no residual activity; the effect ends when hands are dry', 'It is the best choice when hands are visibly soiled with blood or faeces', 'It removes spores by mechanical action', 'Its activity is increased by blood on the hands'], x: 'Alcohol has no persistent or residual activity: the effect ends when the hands are dry. It is less effective with blood present, so visibly soiled hands need soap and water (slides 8, 11).', src: 'Slide 11' },
    { id: 'c2q26', sec: 's4', q: 'How long does a complete soap-and-water hand wash take (WHO)?', o: ['40 to 60 seconds', '20 to 30 seconds', '10 to 15 seconds', '2 to 3 minutes'], x: 'A full soap-and-water hand wash takes 40 to 60 seconds; 20 to 30 seconds is the alcohol hand rub (WHO) (slides 15, 17).', src: 'Slides 15, 17' },
    { id: 'c2q27', sec: 's4', q: 'The default hand hygiene method in the field is:', o: ['Alcohol-based hand rub', 'Plain soap and water', 'Antiseptic hand wash', 'Surgical hand antisepsis'], x: 'Alcohol-based hand rub is the field default because it is fast and needs no sink. Switch to soap and water when hands are visibly soiled or after C. difficile or norovirus exposure (slide 15).', src: 'Slide 15' },
    { id: 'c2q28', sec: 's5', q: 'If your hands are dry 10 seconds after a hand rub, it means:', o: ['You used too little product', 'The product worked very fast', 'You completed the rub correctly', 'The alcohol concentration was too low'], x: 'If your hands are dry in 10 seconds, you used too little. A correct rub covers all surfaces and continues until dry, 20 to 30 seconds (slides 16, 17, 29).', src: 'Slide 17' },
    { id: 'c2q29', sec: 's5', q: 'Which of these is one of the areas most often missed during hand hygiene?', o: ['Fingertips and under the nails', 'The palms (palm to palm, step 2)', 'The forearms', 'The elbows'], x: 'Slide 17 lists four commonly missed areas: fingertips and under the nails (step 7), thumbs (step 6), between the fingers (steps 3 and 4), and backs of the hands and wrists. Palms, forearms and elbows are not on the list (slide 17).', src: 'Slide 17' },
    { id: 'c2q30', sec: 's5', q: 'In soap-and-water hand washing, why use the towel to turn off the tap?', o: ['You touched the tap with contaminated hands before washing', 'Running water spreads resident flora onto the hands', 'It speeds up drying of the hands', 'The paper towel adds residual antiseptic activity to the clean hands'], x: 'You turned the tap on with contaminated hands before washing, so touching it again with clean hands brings the contamination back (slide 17).', src: 'Slide 17' },
    { id: 'c2q31', sec: 's5', q: 'What is the CDC minimum rubbing time quoted in the source deck?', o: ['At least 15 seconds', 'At least 60 seconds', 'At least 5 seconds', 'At least 2 minutes'], x: 'At least 15 seconds of rubbing is the CDC minimum quoted in the source deck. The WHO times are 20–30 seconds for a rub and 40–60 seconds for a wash (slide 17).', src: 'Slide 17' },
    { id: 'c2q32', sec: 's6', q: 'Why add chlorhexidine to an alcohol surgical hand rub?', o: ['It keeps working for hours as resident flora regrows inside gloves', 'It speeds up drying of the hands', 'It removes visible soil and blood from the forearms before the alcohol is applied', 'It replaces the need for a prewash'], x: 'Alcohol kills fast but stops working when dry, and a long operation inside a warm, moist glove lets resident flora regrow; chlorhexidine keeps working for hours (slide 19).', src: 'Slide 19' },
    { id: 'c2q33', sec: 's6', q: 'A surgical team needs skin protection through a three-hour operation inside sterile gloves. Which property matters most?', o: ['Residual (persistent) activity, for example from chlorhexidine', 'Fast onset of action', 'A pleasant fragrance', 'The highest possible alcohol concentration, ideally above 95% (99%)'], x: 'Only residual activity keeps working for hours inside the glove. Fast onset ends when the alcohol dries, and alcohol above 95% is less effective. Final knowledge check Q4 (slide 32); answer derived from slides 10 and 19.', src: 'Slides 19, 32' },
    { id: 'c2q34', sec: 's6', q: 'Why are brushes and long scrub times NOT recommended for surgical antisepsis?', o: ['They damage skin and bring resident flora up, so counts rise', 'They remove too much transient flora, leaving the hands without protection', 'They inactivate chlorhexidine', 'They spread transient flora from the forearms back onto the hands'], x: 'Scrubbing damages the skin and brings resident flora up from the deeper layers, so the bacterial count rises instead of falling. The product\'s contact time does the work (slide 20).', src: 'Slide 20' },
    { id: 'c2q35', sec: 's6', q: 'In settings that require surgical hand antisepsis, artificial nails are:', o: ['Prohibited (WHO IB)', 'Allowed if short', 'Allowed with double gloving', 'Allowed after a 5-minute scrub'], x: 'Artificial nails are prohibited in settings that require surgical hand antisepsis (WHO IB). The slide gives no exception for length, gloving or scrub time (slide 20).', src: 'Slide 20' },
    { id: 'c2q36', sec: 's7', q: 'Never top up a partly full hand-rub dispenser. This is Category:', o: ['IA', 'IB', 'II', 'IC'], x: 'Not topping up a partly full dispenser is Category IA, because of the contamination risk; use pre-filled bags or bottles. Low irritation, asking the staff and teaching skin care are IB (slide 21).', src: 'Slide 21' },
    { id: 'c2q37', sec: 's7', q: 'A paramedic removes gloves between two patients and immediately puts on a new pair without hand hygiene. This is:', o: ['Not acceptable: hand hygiene is required after removing gloves and before new ones', 'Acceptable, because the new gloves are clean', 'Acceptable, because the first patient had no known infection and the gloves looked clean', 'Acceptable if the first pair was worn less than ten minutes'], x: 'New gloves do not make contaminated hands clean: hands become contaminated while removing gloves, so hand hygiene is needed before the next pair. Knowledge check 2 (slide 23); answer derived from slide 22 (HH → gloves → care → remove → HH).', src: 'Slides 22–23' },
    { id: 'c2q38', sec: 's7', q: 'Which is one of the four glove rules (CDC and WHO, IB)?', o: ['Never wash gloves for re-use', 'Wash gloves with alcohol between tasks', 'One pair may be used for two patients from the same family', 'Gloves may replace hand hygiene for short contacts'], x: 'The four rules: remove gloves after caring for the patient, dispose of them after use, never use the same pair for more than one patient, never wash gloves for re-use. Gloves do not replace hand hygiene (slide 22).', src: 'Slide 22' },
    { id: 'c2q39', sec: 's7', q: 'Why does cost NOT come first when choosing a hand-hygiene product?', o: ['A cheap product that dries the skin lowers compliance', 'Expensive products contain more alcohol', 'Staff choose a product by its price, not by its feel or fragrance', 'Cheap products usually have more residual activity than expensive ones'], x: 'A cheap product that dries the skin lowers compliance and ends up costing more; feel, fragrance and skin tolerance decide whether staff use it (slide 21, CDC IB · WHO II).', src: 'Slide 21' },
    { id: 'c2q40', sec: 's8', q: 'Observation studies show hand hygiene compliance is LOWER:', o: ['Before patient contact than after', 'Among nurses than physicians', 'By day than at night', 'After a dirty task than a clean one'], x: 'Compliance is lower before patient contact than after, because providers protect themselves more than the patient. The other options are reversed: compliance is lower among physicians, at night and after a clean task (slide 25).', src: 'Slide 25' },
    { id: 'c2q41', sec: 's8', q: '"Gloves are enough" is classified as which type of barrier to compliance?', o: ['Beliefs', 'System', 'Culture'], x: '"Gloves are enough" is a Beliefs barrier, like "patient seen as low risk" and forgetfulness. System barriers are things like distant sinks and lack of time; Culture barriers are things like no role model and no feedback (slide 25).', src: 'Slide 25' },
    { id: 'c2q42', sec: 's8', q: 'You unload the stretcher, wipe the rails and adjust monitor cables but never touch the patient. Is hand hygiene required before the next call?', o: ['Yes, contact with the patient\'s surroundings and equipment requires it', 'No, because there was no direct patient contact', 'No, because the rails were wiped with disinfectant before you touched the cables', 'Only if the patient had a known infection'], x: 'Touching the patient\'s surroundings is WHO moment 5, and equipment carries microorganisms to the next patient, so hand hygiene is required without any patient contact. Knowledge check 3 (slide 31); answer derived from slides 24 and 27.', src: 'Slides 27, 31' },
    { id: 'c2q43', sec: 's8', q: 'WHO moment 5 is:', o: ['After touching the patient\'s surroundings', 'Before touching the patient', 'Before a clean or aseptic procedure', 'After body-fluid exposure risk'], x: 'Moment 5 is after touching the patient\'s surroundings. Moment 1 is before touching the patient, moment 2 before a clean or aseptic procedure, moment 3 after body-fluid exposure risk and moment 4 after touching the patient (slide 27).', src: 'Slide 27' },
    { id: 'c2q44', sec: 's8', q: 'Which hand-hygiene recommendation is WHO Category IA?', o: ['Education that targets the barriers to compliance', 'Making compliance an institutional priority with funding', 'Asking staff about the feel and fragrance of products', 'Teaching staff skin care to reduce irritation'], x: 'Education that targets the barriers is WHO IA (slide 26). Institutional priority is CDC and WHO IB (slide 26); asking the staff and teaching skin care are IB (slide 21).', src: 'Slides 21, 26' },
    { id: 'c2q45', sec: 's9', q: 'A colleague buys 99% alcohol believing it is stronger than the unit\'s 70% hand rub. What should you tell him?', o: ['Concentrations above 95% are less effective because alcohol needs water', 'He is right; a higher alcohol concentration always kills more microorganisms faster', 'Both work the same; the difference is only price', '99% is better only for visibly soiled hands'], x: 'Alcohol needs water to denature proteins, so concentrations above 95% are less effective; 60–95% is the effective range. Visibly soiled hands need soap and water whatever the concentration. Final knowledge check Q5 (slides 8, 10, 32).', src: 'Slides 10, 32' },
    { id: 'c2q46', sec: 's9', q: 'The fix for "rubbing while walking, dry in 10 seconds" is:', o: ['Enough product, all surfaces, until dry: about 30 seconds', 'Rub for 5 seconds, then shake or wipe the hands dry to save time between calls', 'Switch to wiping hands on a towel', 'Use 99% alcohol so it dries faster'], x: 'The fix is enough product, all surfaces, rubbed until dry: about 30 seconds (slide 29). Never wipe or shake the hands to speed up drying (slide 17), and alcohol above 95% is less effective (slide 10).', src: 'Slide 29' },
    { id: 'c2q47', sec: 's9', q: 'The fix for "wiping gloves to keep them on for the next task" is:', o: ['Gloves are single use: remove, discard, then hand hygiene', 'Wipe them with alcohol rub and continue with the next task', 'Wash them with soap and water between tasks', 'Put a second clean pair over the first pair'], x: 'Gloves are single use: remove, discard, then hand hygiene (slide 29). Gloves are never washed for re-use or used for more than one patient (slide 22).', src: 'Slide 29' },
    { id: 'c2q48', sec: 's9', q: 'Which statement is one of the chapter\'s key takeaways?', o: ['Hand hygiene is a patient-safety intervention, not just a routine task', 'Gloves can replace hand hygiene for short patient contacts', 'Alcohol-based hand rub and soap and water are interchangeable in every situation', 'Equipment cannot transmit microorganisms between patients'], x: 'The takeaways say hand hygiene is a clinical patient-safety intervention. The other three reverse takeaways: gloves do not replace hand hygiene, rub and soap are not interchangeable in every situation, and hands and equipment can transmit microorganisms (slide 33).', src: 'Slide 33' },
    { id: 'c2q49', sec: 's9', q: 'The fix for "refilling half-empty bottles; storing rub in a hot cabin" is:', o: ['Pre-filled bottles only; store away from heat', 'Top up the bottle at the station, not in the ambulance', 'Refill the bottle once it is less than a quarter full', 'Store the rub in the cab so it stays close to the crew'], x: 'Never top up a partly full dispenser, anywhere (contamination risk, IA): use pre-filled bottles. Alcohol is flammable and volatile, so store it away from heat; the point of care is the patient compartment, not the cab (slides 11, 21, 26, 29).', src: 'Slides 21, 29' },
    { id: 'c2q50', sec: 's6', q: 'For surgical hand antisepsis, slide 19 gives which concentration range for alcohol COMBINED with a quaternary ammonium compound, hexachlorophene or chlorhexidine gluconate?', o: ['50% to 95%', '60% to 95%', '70% to 99%', '30% to 50%'], x: 'Combined with a quat, hexachlorophene or CHG, the range starts lower, at 50% to 95%. 60% to 95% is the range for alcohol alone, so do not mix up the two (slide 19).', src: 'Slide 19' },

    // True/False traps written from the lecture (past-quiz style)
    { id: 'c2q51', sec: 's1', q: 'Category IA and Category IB recommendations are equally binding.', o: ['True', 'False'], a: 0, fix: true, x: 'True. Both are strongly recommended and equally binding; the letter shows the strength of the evidence, not the strength of the rule (slide 3).', src: 'Slide 3' },
    { id: 'c2q52', sec: 's2', q: 'Resident flora is most often the cause of healthcare-associated infection.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Transient flora (surface layers, picked up from the last patient or equipment) is most often the cause; resident flora is less often the cause (slide 6).', src: 'Slide 6' },
    { id: 'c2q53', sec: 's3', q: 'Repeated washing with plain soap can paradoxically increase bacterial counts on the skin.', o: ['True', 'False'], a: 0, fix: true, x: 'True. Slide 9 lists this among the limitations of plain soap, with skin irritation and dryness from frequent use (slide 9).', src: 'Slide 9' },
    { id: 'c2q54', sec: 's4', q: 'Alcohol-based hand rub keeps working (residual activity) after the hands are dry.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Alcohol has no persistent or residual activity: the effect ends when the hands are dry. That is why chlorhexidine is added for long operations (slides 11, 15, 19).', src: 'Slides 11, 15' },
    { id: 'c2q55', sec: 's5', q: 'Hand rub and hand washing use the same six rubbing steps (steps 2 to 7).', o: ['True', 'False'], a: 0, fix: true, x: 'True. Steps 2 to 7 are identical in both. Only the start (product vs wetting and soap) and the end (rub until dry vs rinse, dry and turn off the tap with the towel) differ (slide 16).', src: 'Slide 16' },
    { id: 'c2q56', sec: 's6', q: 'Long scrub times are necessary for effective surgical hand antisepsis.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Long scrub times are not necessary (CDC and WHO IB): scrub for the time the manufacturer suggests. Long scrubbing damages the skin and brings resident flora up (slide 20).', src: 'Slide 20' },
    { id: 'c2q57', sec: 's7', q: 'Wearing gloves reduces the need for hand hygiene.', o: ['True', 'False'], a: 1, fix: true, x: 'False. WHO Category IB: the use of gloves does not reduce the need for hand hygiene. Gloves can have tiny holes, and hands become contaminated while removing them (slide 22).', src: 'Slide 22' },
    { id: 'c2q58', sec: 's8', q: 'Hand hygiene compliance falls as the number of hand-hygiene opportunities per hour rises.', o: ['True', 'False'], a: 0, fix: true, x: 'True. Compliance falls as the opportunities per hour rise, which is exactly when it matters most (slide 25).', src: 'Slide 25' },

    // Slide 30 scenarios (answers applied from other Chapter 2 slides)
    { id: 'c2q59', sec: 's9', q: 'Respiratory patient (slide 30): during transport you hold the stretcher rail on every turn, without touching the patient at that moment. Which WHO moment covers hand hygiene after holding the rail?', o: ['Moment 5: after touching the patient\'s surroundings', 'Moment 4: after touching the patient and his oxygen mask', 'Moment 1: before touching the patient', 'Moment 2: before a clean or aseptic procedure'], x: 'The rail is part of the patient\'s surroundings, so moment 5 applies; compare knowledge check 3 (slides 27, 31). Moments 1 and 4 apply each time you touch the patient to adjust his mask. Applied from slide 27; slide 30 gives no answer key.', src: 'Slides 27, 30' },
    { id: 'c2q60', sec: 's9', q: 'IV insertion in a moving ambulance (slide 30): no sink, hands not visibly soiled. Which sequence fits the lecture?', o: ['Hand rub → gloves → insert IV → remove gloves → hand rub', 'Gloves → insert IV → remove gloves → hand rub', 'Hand rub → gloves → insert IV → keep gloves on for the next task', 'Hand rub → gloves → insert IV → remove gloves → wait for a sink at the hospital'], x: 'With no sink and clean-looking hands, alcohol rub is the method (slide 15). Hand hygiene comes before the gloves and right after removing them, so waiting for a hospital sink is too late (slide 22), and gloves are single use, not kept for the next task (slide 29). Applied from these slides; slide 30 gives no answer key.', src: 'Slides 15, 22, 30' },
    { id: 'c2q61', sec: 's9', q: 'Needlestick during a trauma call (slide 30): after you remove the pricked glove, there is blood on your hand. Which hand-hygiene step fits Chapter 2?', o: ['Wash with soap and water, because blood-soiled hands need washing', 'Rub with alcohol-based hand rub, because it is fast and kills', 'Put a new glove on over the hand and continue care', 'Wipe the hand with a chlorhexidine wipe, since blood barely affects it'], x: 'Blood on the hands means visibly soiled hands, which need soap and water: blood must be removed before any antiseptic can work, and alcohol does not work through blood (slides 8, 9, 29). Inferred from these slides; Ch2 has no needlestick protocol.', src: 'Slides 8–9, 29, 30' },

    // Extra lecture questions for thin sections
    { id: 'c2q62', sec: 's5', q: 'While an alcohol hand rub is drying, which rule applies?', o: ['Keep rubbing; never wipe or shake the hands to speed up drying', 'Wipe the hands on a single-use towel once the six steps are done', 'Shake the hands after 10 seconds so the alcohol evaporates evenly', 'Rinse the hands with water once the product feels sticky'], x: 'Keep rubbing until the hands are dry and never wipe or shake them, because the product must finish working. The single-use towel belongs to the soap-and-water wash, not the rub (slides 16, 17).', src: 'Slides 16–17' },
    { id: 'c2q63', sec: 's7', q: 'Which is one of the reasons the lecture gives for why gloves are NOT enough?', o: ['Hands become contaminated while the gloves are being removed', 'Gloves inactivate the alcohol rub applied before them', 'Gloves lose their protection after ten minutes of wear', 'The dry space inside a glove kills resident flora on the skin'], x: 'Slide 22 gives three reasons: tiny holes you cannot see, contamination of the hands during glove removal, and a warm, moist space inside the glove that lets bacteria multiply. So the inside of a glove is warm and moist, not dry (slide 22).', src: 'Slide 22' },

    // Past questions — Quiz 1 , ch 1&2 (45).pdf
    { id: 'p1q2', sec: 's3', q: 'Chlorhexidine gluconate is only minimally affected by the presence of blood and other organic materials.', o: ['True', 'False'], fix: true, x: 'True. Being minimally affected by organic material such as blood is one of CHG\'s listed advantages (slide 13).', src: 'Slide 13', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 2 } },
    { id: 'p1q3', sec: 's3', q: 'Formulations with a 100% alcohol content have the most effective antimicrobial properties.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Above 95% is less effective because the reaction needs water (slide 10).', src: 'Slide 10', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 3 } },
    { id: 'p1q6', sec: 's3', q: 'Alcohols have antimicrobial properties because they denature proteins that are in the pathogens.', o: ['True', 'False'], fix: true, x: 'True. Ethanol or isopropanol denatures (breaks down) the proteins of microorganisms (slide 10).', src: 'Slide 10', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 6 } },
    { id: 'p1q9', sec: 's3', q: 'All of the following hand hygiene agents have some persistent activity after handwashing EXCEPT:', o: ['Alcohols', 'Hexachlorophene', 'Chlorhexidine gluconate', 'Triclosan'], x: 'Alcohol has no persistent or residual activity (slide 11). CHG, hexachlorophene and triclosan do (slides 13–14).', src: 'Slides 11, 13–14', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 9 } }
  ],

  cards: [
    { sec: 's1', f: 'Hand hygiene is recommended as the first line of infection prevention by…', b: 'CDC (2002) and WHO (2009).', src: 'Slide 3' },
    { sec: 's1', f: 'IA vs IB', b: 'IA: strongly recommended, strong studies. IB: strongly recommended, some studies + strong reasoning. Equally binding.', src: 'Slide 3' },
    { sec: 's1', f: 'Average HCW hand hygiene compliance', b: '40% (range 5%–81%).', src: 'Slide 3' },
    { sec: 's1', f: '1847 Vienna: what happened?', b: 'Doctors came from autopsies → high maternal deaths. Compulsory antiseptic hand washing → deaths fell sharply. First trial of antiseptic vs plain soap.', src: 'Slide 5' },
    { sec: 's2', f: 'Transient flora', b: 'Surface layers, easily removed, most often causes HAI, picked up from last patient/stretcher/monitor.', src: 'Slide 6' },
    { sec: 's2', f: 'Resident flora', b: 'Deeper layers, difficult to remove, less often causes HAI, normal and protective.', src: 'Slide 6' },
    { sec: 's2', f: 'Highest-risk body area for colonisation', b: 'Perineal and groin area (then armpits, trunk, upper limbs).', src: 'Slide 6' },
    { sec: 's3', f: 'Plain soap: kills or removes?', b: 'Removes (detergent action). Does not kill. Correct choice for visibly soiled hands.', src: 'Slides 8–9' },
    { sec: 's3', f: 'Alcohol: mechanism and effective range', b: 'Denatures microbial proteins; 60%–95% with water. >95% less effective (needs water).', src: 'Slide 10' },
    { sec: 's3', f: 'CHG: four strengths?', b: 'Works well vs gram-positive · effective vs enveloped viruses · substantial residual activity · minimally affected by organic material such as blood.', src: 'Slide 13' },
    { sec: 's3', f: 'CHG: less effective against which three?', b: 'Gram-negative bacteria · fungi · non-enveloped viruses.', src: 'Slide 13' },
    { sec: 's3', f: 'CHG: TB and spores?', b: 'Minimally effective against M. tuberculosis; does not kill spores.', src: 'Slide 13' },
    { sec: 's3', f: 'CHG: inactivated by? Eye caution?', b: 'Inactivated by natural soaps and hand creams (anionic emulsifying agents). Conjunctivitis and severe corneal damage reported with 1% chlorhexidine: keep away from the eyes.', src: 'Slide 13' },
    { sec: 's3', f: 'PCMX (chloroxylenol): strengths?', b: 'Good activity vs gram-negative bacteria, mycobacteria and certain viruses; only minimally affected by organic matter such as blood.', src: 'Slide 13' },
    { sec: 's3', f: 'PCMX: weaknesses?', b: 'Contradictory data on effectiveness · needs a longer time to work · less residual activity than chlorhexidine · neutralised by non-ionic surfactants.', src: 'Slide 13' },
    { sec: 's3', f: 'PCMX: FDA position?', b: 'Not enough information available to classify it as safe and effective.', src: 'Slide 13' },
    { sec: 's3', f: 'Hexachlorophene: strengths?', b: 'Bacteriostatic · good activity vs S. aureus · cumulative effect with repeated use · residual activity.', src: 'Slide 13' },
    { sec: 's3', f: 'Hexachlorophene: weaknesses?', b: 'Less effective vs gram-negative, fungi and mycobacteria; only modestly effective after a single use; toxic, absorbed through the skin.', src: 'Slide 13' },
    { sec: 's3', f: 'Hexachlorophene: FDA position?', b: 'Not generally recognised as safe and effective as an antiseptic hand wash, especially for infant bathing.', src: 'Slide 13' },
    { sec: 's3', f: 'Iodophors: povidone-iodine in most hand-hygiene formulations?', b: '7.5% to 10%.', src: 'Slide 14' },
    { sec: 's3', f: 'Iodine and iodophors: spectrum?', b: 'Gram-positive and gram-negative bacteria (including some spore-forming bacteria), mycobacteria, viruses and fungi.', src: 'Slide 14' },
    { sec: 's3', f: 'Iodophors: effectiveness depends on?', b: 'pH, temperature, exposure time, and the amount and type of inorganic material present.', src: 'Slide 14' },
    { sec: 's3', f: 'Iodine vs iodophors: skin effects?', b: 'Iodine causes skin irritation and discolouration; iodophors are less irritating than free iodine.', src: 'Slide 14' },
    { sec: 's3', f: 'Triclosan: form and concentration?', b: 'Non-ionic, colourless; 0.2% to 2% in antimicrobial soaps.', src: 'Slide 14' },
    { sec: 's3', nl: true, f: 'Triclosan: spectrum?', b: 'Most effective vs gram-positive including MRSA; reasonably effective vs mycobacteria and Candida; less effective vs gram-negative, especially Pseudomonas aeruginosa.', src: 'Slide 14' },
    { sec: 's3', f: 'Triclosan: persistence, organic matter, FDA?', b: 'Some persistent activity on the skin; not substantially affected by organic matter; FDA 1994: insufficient data to classify as safe and effective.', src: 'Slide 14' },
    { sec: 's3', f: 'Quats (hand agent): spectrum?', b: 'More effective vs gram-negative; some activity vs lipophilic viruses; less effective vs gram-positive; minimally effective vs mycobacteria and fungi.', src: 'Slide 14' },
    { sec: 's3', f: 'Quats (hand agent): what reduces or blocks them?', b: 'Effectiveness decreased by organic matter such as blood; not compatible with anionic detergents.', src: 'Slide 14' },
    { sec: 's4', f: 'Three situations where alcohol fails', b: 'Visibly soiled hands · C. difficile · non-enveloped viruses (norovirus) → soap and water.', src: 'Slide 11' },
    { sec: 's4', f: 'Hand rub time vs hand wash time', b: 'Rub 20–30 s (until dry). Wash 40–60 s. (CDC minimum ≥15 s of rubbing.)', src: 'Slides 15, 17' },
    { sec: 's5', f: 'Most often missed areas', b: 'Fingertips/under nails (step 7), thumbs (step 6), between fingers (steps 3–4), backs of hands and wrists.', src: 'Slide 17' },
    { sec: 's5', f: 'Hand rub: two rules', b: 'Dry in 10 seconds = you used too little. Never wipe or shake the hands to speed up drying: the product must finish working.', src: 'Slide 17' },
    { sec: 's6', f: 'Surgical hand antisepsis: what is it?', b: 'Pre-operative cleansing of the hands and forearms with antiseptic agents; removes transient flora and reduces resident flora.', src: 'Slide 19' },
    { sec: 's6', f: 'Surgical antisepsis: alcohol alone vs combined', b: '60–95% alcohol alone; 50–95% when combined with a quat, hexachlorophene or CHG.', src: 'Slide 19' },
    { sec: 's6', f: 'Surgical antisepsis: brushes and long scrubs?', b: 'Brushes not recommended (WHO IB); long scrub times not necessary (CDC and WHO IB). Scrubbing damages the skin and brings resident flora up.', src: 'Slide 20' },
    { sec: 's6', f: 'Before putting on sterile gloves, use…', b: 'An antimicrobial soap or an alcohol-based hand rub with persistent activity [CDC and WHO, IB]; dry hands and forearms thoroughly first.', src: 'Slides 19–20' },
    { sec: 's7', f: 'Glove sequence', b: 'Hand hygiene → put on gloves → patient care → remove gloves → hand hygiene.', src: 'Slide 22' },
    { sec: 's7', f: 'Why gloves are not enough', b: 'Tiny holes; contamination during removal; warm moist glove lets bacteria multiply. WHO IB: gloves do not reduce the need for HH.', src: 'Slide 22' },
    { sec: 's7', f: 'Four glove rules (CDC and WHO, IB)', b: 'Remove after caring for the patient · dispose after use · never use the same pair for more than one patient · never wash gloves for re-use.', src: 'Slide 22' },
    { sec: 's7', f: 'Partly full dispenser: rule and category?', b: 'Never top it up (contamination risk); use pre-filled bags or bottles. Category IA.', src: 'Slide 21' },
    { sec: 's8', f: 'WHO five moments: 1 and 2?', b: '1 Before touching the patient · 2 Before a clean or aseptic procedure.', src: 'Slide 27' },
    { sec: 's8', f: 'WHO five moments: 3, 4 and 5?', b: '3 After body-fluid exposure risk · 4 After touching the patient · 5 After touching the patient\'s surroundings.', src: 'Slide 27' },
    { sec: 's8', f: 'Compliance: lower before or after patient contact? Why?', b: 'Lower before contact than after: providers protect themselves more than the patient.', src: 'Slide 25' },
    { sec: 's8', f: 'Compliance: night or day? Physicians or nurses? Clean or dirty task?', b: 'Lower at night, among physicians, and after a clean task. It also falls as opportunities per hour rise.', src: 'Slide 25' },
    { sec: 's8', f: 'Barriers to compliance: three groups? Where does "Gloves are enough" belong?', b: 'System · Beliefs · Culture. "Gloves are enough" is a Beliefs barrier.', src: 'Slide 25' },
    { sec: 's9', f: 'Fix: alcohol rub on visibly bloody hands?', b: 'Soap and water first; alcohol does not work through blood.', src: 'Slide 29' },
    { sec: 's9', f: 'Fix: changing gloves without hand hygiene?', b: 'Hand hygiene before and after every pair.', src: 'Slide 29' },
    { sec: 's9', f: 'Fix: touching a personal phone during patient care?', b: 'Phone stays out of the patient compartment, or is disinfected after every patient.', src: 'Slide 29' }
  ]
};
