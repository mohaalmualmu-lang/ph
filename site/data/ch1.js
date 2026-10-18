// Unit 1 — source: "CH01 - Tagged.pdf" (11 slides)
export default {
  id: 'ch1', n: 1,
  title: 'Infection Preventionists & Basic Principles',
  ar: 'دور أخصائي مكافحة العدوى والمبادئ الأساسية',
  file: 'CH01 - Tagged.pdf',
  sections: [
    {
      id: 's1', title: 'The field and the Infection Preventionist', src: 'Slides 2–6',
      blocks: [
        { t: 'p', x: '{ipc|Infection prevention and control} is a rapidly growing field. Inpatient hospitals and other healthcare settings require infection control, and other occupations (public health specialists, {epidemiologist|epidemiologists}, lab techs, etc.) also have roles in supporting prevention and control.' },
        { t: 'p', x: '**{ip|Infection preventionists}** are responsible for a set of critical duties that aim to protect three groups: **patients, healthcare workers and the surrounding community**.' },
        { t: 'h', x: 'Certification: CBIC → CIC' },
        { t: 'p', x: 'The **{cbic|Certification Board of Infection Control and Epidemiology (CBIC)}** runs the **{cic|Certification Exam in Infection Control (CIC)}**.' },
        { t: 'table', cap: 'CIC: 6 core competencies', quiz: true, head: ['#', 'Core competency'], rows: [
          ['1', 'Identification of disease processes'],
          ['2', '{surveillance|Surveillance} & epidemiologic investigation'],
          ['3', 'Preventing/controlling the transmission of infectious diseases'],
          ['4', 'Employee/Occupational Health'],
          ['5', 'Management & communication (leadership)'],
          ['6', 'Education & research']] },
        { t: 'h', x: 'APIC: 4 domains' },
        { t: 'p', x: 'The **{apic|Association for Professionals in Infection Control & Epidemiology, Inc. (APIC)}** describes core competencies composed of **4 domains**:' },
        { t: 'table', cap: 'APIC core competencies: 4 domains', quiz: true, head: ['Domain', 'What it includes'], rows: [
          ['Leadership', 'Collaboration, followership, program management, critical thinking skills and communication'],
          ['Infection Prevention & Control Competencies', 'Epidemiology and surveillance, risk assessment, risk reduction and infection prevention'],
          ['Technology', '—'],
          ['Performance improvement & Implementation science', '—']] },
        { t: 'note', k: 'key', x: 'Don\'t mix them up: **CIC = 6 core competencies** (CBIC exam). **APIC = 4 domains**.' }
      ],
      recall: [
        { q: 'Infection preventionists aim to protect which three groups?', a: 'Patients, healthcare workers and the surrounding community.' },
        { q: 'Which board gives the CIC exam?', a: 'CBIC: Certification Board of Infection Control and Epidemiology.' },
        { q: 'List the 6 CIC core competencies.', a: 'Identification of disease processes · Surveillance & epidemiologic investigation · Preventing/controlling transmission · Employee/Occupational health · Management & communication (leadership) · Education & research.' },
        { q: 'Name the 4 APIC domains.', a: 'Leadership · Infection Prevention & Control Competencies · Technology · Performance improvement & Implementation science.' }
      ]
    },
    {
      id: 's2', title: 'The chain of transmission', src: 'Slides 7–9',
      blocks: [
        { t: 'p', x: 'Two basic principles are the core of all efforts to prevent and control diseases: **1. the {chain|chain of transmission}** and **2. the {levels|levels of prevention}**.' },
        { t: 'p', x: 'The chain of transmission (chain of infection) has **six links**. Infection happens only when every link is connected, so breaking any one link stops it.' },
        { t: 'svg', id: 'chain' },
        { t: 'table', cap: 'The six links with the examples on slide 9', quiz: true, head: ['Link', 'Examples (slide 9)'], rows: [
          ['1. {agent|Infectious agent}', 'Bacteria, viruses, fungi, parasites, {prion|prions}'],
          ['2. {reservoir|Reservoir}', '{carrier|Asymptomatic carriers}, water, food, animals'],
          ['3. {exit|Portal of exit}', 'Blood, secretion, excretions'],
          ['4. {modes|Mode of transmission}', 'Contact, droplet, airborne'],
          ['5. {entry|Portal of entry}', 'Respiratory tract, GI tract, {nonintact|non-intact skin}, {mucous|mucous membranes}'],
          ['6. {host|Susceptible host}', 'Age, {immunocompromised}, surgery, medical conditions, unvaccinated']] },
        { t: 'order', id: 'c1-chain' },
        { t: 'note', k: 'key', x: 'Portal of **entry** includes **non-intact** skin and the GI tract. Intact skin is not on the list. The mucosa of the eyes, nose and mouth is a portal of **entry**, not exit.' },
        { t: 'why', q: 'Why is "primary health strategy" not a link in the chain?', a: 'The six links are agent → reservoir → portal of exit → mode of transmission → portal of entry → susceptible host. A prevention strategy is something you use to break a link. It is not a link itself.' }
      ],
      recall: [
        { q: 'Name the six links of the chain of transmission in order.', a: 'Infectious agent → Reservoir → Portal of exit → Modes of transmission → Portal of entry → Susceptible host.' },
        { q: 'Give the examples of infectious agents on slide 9.', a: 'Bacteria, viruses, fungi, parasites, prions.' },
        { q: 'What are the three portals of exit on slide 9?', a: 'Blood, secretion, excretions.' },
        { q: 'What makes a host susceptible (slide 9)?', a: 'Age, immunocompromised, surgery, medical conditions, unvaccinated.' }
      ]
    },
    {
      id: 's3', title: 'Breaking the chain', src: 'Slide 10 (Figure 1.2)',
      blocks: [
        { t: 'p', x: 'Figure 1.2 shows the infection control and prevention strategy that breaks **each** link.' },
        { t: 'table', cap: 'Breaking the chain of transmission (Figure 1.2)', quiz: true, head: ['Link', 'Strategies that break it'], rows: [
          ['Infectious agent', 'Disinfection · Sterilization · Effective antimicrobial therapy'],
          ['Reservoirs', 'Water treatment · Proper food storage · Engineering controls · Environmental cleaning/disinfections'],
          ['Portals of exit', 'Control of excretions and secretions · Proper disposal of waste and contaminated linen · Proper wound care'],
          ['Modes of transmission', 'Hand hygiene · PPE · Environmental sanitation · Engineering controls · Equipment disinfection/sterilization'],
          ['Portals of entry', 'Hand hygiene · Aseptic technique · PPE · Engineering controls'],
          ['Susceptible host', 'Immunization · Identification of high-risk patients · Treatment of pre-existing conditions · Proper nutrition']] },
        { t: 'sort', id: 'c1-break' },
        { t: 'note', k: 'warn', x: 'Some strategies appear under more than one link. **Hand hygiene, PPE** and **engineering controls** each break more than one link. In the sorter, each item is placed where Figure 1.2 lists it **only once**.' },
        { t: 'note', k: 'conflict', x: 'In Figure 1.2, disinfection/sterilization is listed under **Infectious agent**, environmental cleaning/disinfection under **Reservoirs**, and equipment disinfection/sterilization under **Modes of transmission**. A past quiz question (Quiz 2, Q12) asks which link "decontamination, cleaning, disinfection and sterilization" interrupts and offers only Portal of exit / Reservoir / Portal of entry / Susceptible host. Of those four, only **Reservoir** carries cleaning/disinfection in the figure.' }
      ],
      recall: [
        { q: 'Which strategies break the "susceptible host" link?', a: 'Immunization, identification of high-risk patients, treatment of pre-existing conditions, proper nutrition.' },
        { q: 'Which strategies break the "portals of exit" link?', a: 'Control of excretions and secretions, proper disposal of waste and contaminated linen, proper wound care.' },
        { q: 'Which strategies break the "infectious agent" link?', a: 'Disinfection, sterilization, effective antimicrobial therapy.' }
      ]
    },
    {
      id: 's4', title: 'Levels of prevention', src: 'Slide 11',
      blocks: [
        { t: 'svg', id: 'levels' },
        { t: 'table', cap: 'Levels of prevention', quiz: true, head: ['Level', 'Target', 'Example'], rows: [
          ['{primary|Primary}', 'Health of individual (before disease)', 'Vaccination'],
          ['{secondary|Secondary}', 'Newly ill individual', 'Early screening and treatment'],
          ['{tertiary|Tertiary}', 'Recovering individual', 'Rehabilitation']] },
        { t: 'chain', items: ['Healthy person', 'Vaccinated before exposure', 'Disease never starts', '= Primary prevention'] },
        { t: 'chain', items: ['Disease already started', 'Screening finds it early', 'Treatment reduces impact', '= Secondary prevention'] },
        { t: 'chain', items: ['Person recovering after illness', 'Rehabilitation / physical therapy', 'Function restored', '= Tertiary prevention'] },
        { t: 'sort', id: 'c1-levels' }
      ],
      recall: [
        { q: 'Vaccination of a healthy individual is which level of prevention?', a: 'Primary prevention.' },
        { q: 'Screening programs to find affected individuals early are which level?', a: 'Secondary prevention.' },
        { q: 'Rehabilitation of a recovering individual is which level?', a: 'Tertiary prevention.' }
      ]
    }
  ],

  orders: [
    { id: 'c1-chain', sec: 's2', src: 'Slide 8', title: 'Put the six links of the chain in order', steps: ['Infectious agent', 'Reservoir', 'Portal of exit', 'Mode of transmission', 'Portal of entry', 'Susceptible host'] }
  ],
  sorts: [
    { id: 'c1-break', sec: 's3', src: 'Slide 10', title: 'Which link does each strategy break?', cats: ['Infectious agent', 'Reservoir', 'Portal of exit', 'Portal of entry', 'Susceptible host'],
      items: [['Sterilization', 0], ['Effective antimicrobial therapy', 0], ['Water treatment', 1], ['Proper food storage', 1], ['Proper wound care', 2], ['Proper disposal of contaminated linen', 2], ['Aseptic technique', 3], ['Immunization', 4], ['Proper nutrition', 4], ['Identification of high-risk patients', 4]] },
    { id: 'c1-levels', sec: 's4', src: 'Slide 11', title: 'Which level of prevention?', cats: ['Primary', 'Secondary', 'Tertiary'],
      items: [['Vaccination of a healthy individual', 0], ['Early screening and treatment', 1], ['Rehabilitation', 2], ['Screening programs to identify affected individuals', 1], ['Physical therapy to maximize limb function after an infection', 2]] }
  ],

  questions: [
    { id: 'c1q1', sec: 's1', q: 'Infection preventionists perform critical duties that aim to protect:', o: ['Patients, healthcare workers and the surrounding community', 'Patients only, inside inpatient hospital wards', 'Healthcare workers and their families only', 'Laboratory staff and epidemiologists only'], x: 'Slide 3: patients, healthcare workers and the surrounding community.', src: 'Slide 3' },
    { id: 'c1q2', sec: 's1', q: 'The Certification Exam in Infection Control (CIC) is given by:', o: ['CBIC', 'APIC', 'CDC', 'WHO'], x: 'Slide 4: Certification Board of Infection Control and Epidemiology (CBIC) → CIC.', src: 'Slide 4' },
    { id: 'c1q3', sec: 's1', q: 'How many core competencies does the CIC list?', o: ['6', '4', '5', '3'], x: 'Slide 5: CIC 6 core competencies. (APIC uses 4 domains.)', src: 'Slide 5' },
    { id: 'c1q4', sec: 's1', q: 'APIC core competencies are composed of how many domains?', o: ['4', '6', '3', '5'], x: 'Slide 6: core competencies composed of 4 domains.', src: 'Slide 6' },
    { id: 'c1q5', sec: 's1', q: 'Which of the following is NOT one of the CIC 6 core competencies?', o: ['Technology', 'Employee/Occupational Health', 'Education & research', 'Identification of disease processes'], x: '"Technology" is an APIC domain (slide 6), not a CIC core competency (slide 5).', src: 'Slides 5–6' },
    { id: 'c1q6', sec: 's1', q: 'Under APIC, "epidemiology and surveillance, risk assessment, risk reduction" belong to which domain?', o: ['Infection Prevention & Control Competencies', 'Leadership', 'Technology', 'Performance improvement & Implementation science'], x: 'Slide 6 lists these under Infection Prevention & Control Competencies.', src: 'Slide 6' },
    { id: 'c1q7', sec: 's1', q: 'Collaboration, followership, program management and critical thinking belong to which APIC domain?', o: ['Leadership', 'Technology', 'Infection Prevention & Control Competencies', 'Education & research'], x: 'Slide 6: Leadership includes collaboration, followership, program management, critical thinking and communication.', src: 'Slide 6' },
    { id: 'c1q8', sec: 's2', q: 'The two basic principles at the core of all efforts to prevent and control disease are:', o: ['The chain of transmission and levels of prevention', 'Hand hygiene and PPE', 'Surveillance and education', 'Surveillance and education of healthcare workers and the public'], x: 'Slide 7.', src: 'Slide 7' },
    { id: 'c1q9', sec: 's2', q: 'Which is the correct order of the chain of transmission?', o: ['Agent → reservoir → portal of exit → mode → portal of entry → host', 'Agent → portal of exit → reservoir → mode → host → portal of entry', 'Reservoir → agent → mode → portal of exit → portal of entry → host', 'Host → portal of entry → mode → reservoir → portal of exit → agent'], x: 'Slide 8 order: infectious agent, reservoir, portals of exit, modes of transmission, portals of entry, susceptible host.', src: 'Slide 8', fix: false },
    { id: 'c1q10', sec: 's2', q: 'Asymptomatic carriers, water, food and animals are examples of which link?', o: ['Reservoir', 'Infectious agent', 'Portal of exit', 'Susceptible host'], x: 'Slide 9: reservoirs.', src: 'Slide 9' },
    { id: 'c1q11', sec: 's2', q: 'Blood, secretion and excretions are examples of:', o: ['Portals of exit', 'Portals of entry', 'Reservoirs', 'Modes of transmission'], x: 'Slide 9: portals of exit.', src: 'Slide 9' },
    { id: 'c1q12', sec: 's2', q: 'Which is listed on slide 9 as an infectious agent?', o: ['Prions', 'Water', 'Mucous membranes', 'Excretions'], x: 'Infectious agents: bacteria, viruses, fungi, parasites, prions.', src: 'Slide 9' },
    { id: 'c1q13', sec: 's2', q: 'Age, surgery, immunocompromise and being unvaccinated describe the:', o: ['Susceptible host', 'Reservoir', 'Portal of entry', 'Infectious agent'], x: 'Slide 9: susceptible host.', src: 'Slide 9' },
    { id: 'c1q14', sec: 's3', q: 'Immunization and proper nutrition break which link?', o: ['Susceptible host', 'Reservoir', 'Portal of exit', 'Infectious agent'], x: 'Figure 1.2 (slide 10).', src: 'Slide 10' },
    { id: 'c1q15', sec: 's3', q: 'Water treatment and proper food storage break which link?', o: ['Reservoir', 'Portal of entry', 'Susceptible host', 'Mode of transmission'], x: 'Figure 1.2: reservoirs.', src: 'Slide 10' },
    { id: 'c1q16', sec: 's3', q: 'Proper wound care and proper disposal of contaminated linen break which link?', o: ['Portal of exit', 'Portal of entry', 'Infectious agent', 'Susceptible host'], x: 'Figure 1.2: portals of exit.', src: 'Slide 10' },
    { id: 'c1q17', sec: 's3', q: 'Which strategy is listed for BOTH the mode of transmission and the portal of entry links?', o: ['Hand hygiene', 'Immunization', 'Water treatment', 'Proper wound care'], x: 'Figure 1.2 lists hand hygiene (and PPE, engineering controls) under both.', src: 'Slide 10' },
    { id: 'c1q18', sec: 's3', q: 'Aseptic technique is listed under which link in Figure 1.2?', o: ['Portals of entry', 'Reservoirs', 'Portals of exit', 'Susceptible host'], x: 'Figure 1.2: portals of entry: hand hygiene, aseptic technique, PPE, engineering controls.', src: 'Slide 10' },
    { id: 'c1q19', sec: 's4', q: 'Early screening and treatment is an example of:', o: ['Secondary prevention', 'Primary prevention', 'Tertiary prevention', 'Breaking the reservoir link'], x: 'Slide 11: secondary = newly ill individual; example early screening and treatment.', src: 'Slide 11' },
    { id: 'c1q20', sec: 's4', q: 'Tertiary prevention targets the:', o: ['Recovering individual', 'Newly ill individual', 'Healthy individual', 'Surrounding community'], x: 'Slide 11: tertiary = recovering individual (rehabilitation).', src: 'Slide 11' },
    { id: 'c1q21', sec: 's4', q: 'Rehabilitation is an example of which level of prevention?', o: ['Tertiary', 'Secondary', 'Primary', 'None, it is treatment only'], x: 'Slide 11.', src: 'Slide 11' },

    // Past questions — Quiz 1 , ch 1&2 (45).pdf (screenshots; answers checked against the lecture)
    { id: 'p1q1', sec: 's2', q: 'The germs (virus/bacteria) that enter the body by coming into contact with the mucosa of the eyes, nose and mouth are called "portal of exit".', o: ['True', 'False'], a: 1, fix: true, x: 'False. Mucous membranes are a portal of ENTRY (slide 9). Portals of exit are blood, secretion and excretions.', src: 'Slide 9', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 1 } },
    { id: 'p1q4', sec: 's4', q: 'Which of the following is an example of a secondary prevention strategy?', o: ['Screening programs to identify affected individuals to reduce the impact of disease', 'Give healthy awareness and some advice to public', 'Vaccination of a healthy individual', 'Physical therapy to maximize limb function after an infection'], x: 'Slide 11: secondary prevention = early screening and treatment.', src: 'Slide 11', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 4 } },
    { id: 'p1q5', sec: 's2', q: 'Which of the following is NOT a potential portal of entry for a pathogen?', o: ['Intact skin', 'Respiratory tract', 'Mucous membranes in the nostrils', 'Gastrointestinal tract'], x: 'Slide 9 portals of entry: respiratory tract, GI tract, NON-intact skin, mucous membranes.', src: 'Slide 9', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 5 } },
    { id: 'p1q7', sec: 's4', q: 'Vaccination of a healthy individual is an example of ______.', o: ['a primary prevention strategy', 'a treatment of injured person', 'a secondary prevention strategy', 'post-traumatic treatment strategy'], x: 'Slide 11: primary prevention, example vaccination.', src: 'Slide 11', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 7 } },
    { id: 'p1q8', sec: 's2', q: 'Because of digestive enzymes, the GI tract does not serve as a portal of entry.', o: ['True', 'False'], a: 1, fix: true, x: 'False. The GI tract is listed as a portal of entry (slide 9).', src: 'Slide 9', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 8 } },
    { id: 'p2q12', sec: 's3', q: 'Which link in the chain of infection is interrupted by decontamination, cleaning, disinfection, and sterilization?', o: ['Reservoir', 'Portal of exit', 'Portal of entry', 'Susceptible host'], x: 'Figure 1.2 (slide 10) lists environmental cleaning/disinfection under Reservoirs. (It also lists disinfection/sterilization under Infectious agent, which is not an option here.)', src: 'Slide 10', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 12 } },
    { id: 'p2q13', sec: 's2', q: 'Intact skin is an/a ______ barrier for microorganisms.', o: ['effective', 'ineffective', 'reflective', 'sensitive'], x: 'Slide 9 lists NON-intact skin as a portal of entry, so intact skin acts as an effective barrier.', src: 'Slide 9', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 13 } },
    { id: 'p1q10', sec: 's2', q: 'Which of the following is NOT a link in the chain of transmission?', o: ['Primary health strategy', 'Modes of transmission', 'Infectious agent', 'Susceptible host'], x: 'The six links are on slide 8. A prevention strategy breaks a link; it is not a link.', src: 'Slide 8', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 10 } }
  ],

  cards: [
    { sec: 's1', f: 'Infection preventionists protect…', b: 'Patients, healthcare workers and the surrounding community.' },
    { sec: 's1', f: 'CBIC → ?', b: 'Certification Exam in Infection Control (CIC). CBIC = Certification Board of Infection Control and Epidemiology.' },
    { sec: 's1', f: 'CIC core competencies: how many, and what are they?', b: '6: disease processes · surveillance & epidemiologic investigation · preventing/controlling transmission · employee/occupational health · management & communication · education & research.' },
    { sec: 's1', f: 'APIC core competencies: how many domains, and what are they?', b: '4: Leadership · Infection Prevention & Control Competencies · Technology · Performance improvement & Implementation science.' },
    { sec: 's2', f: 'Two basic principles of infection prevention', b: '1. Chain of transmission · 2. Levels of prevention.' },
    { sec: 's2', f: 'Chain of transmission: the 6 links in order', b: 'Infectious agent → Reservoir → Portal of exit → Mode of transmission → Portal of entry → Susceptible host.' },
    { sec: 's2', f: 'Reservoirs (examples)', b: 'Asymptomatic carriers, water, food, animals.' },
    { sec: 's2', f: 'Portals of entry (examples)', b: 'Respiratory tract, GI tract, non-intact skin, mucous membranes.' },
    { sec: 's2', f: 'Portals of exit (examples)', b: 'Blood, secretion, excretions.' },
    { sec: 's2', f: 'Susceptible host factors', b: 'Age, immunocompromised, surgery, medical conditions, unvaccinated.' },
    { sec: 's3', f: 'Break the infectious agent link with…', b: 'Disinfection, sterilization, effective antimicrobial therapy.' },
    { sec: 's3', f: 'Break the reservoir link with…', b: 'Water treatment, proper food storage, engineering controls, environmental cleaning/disinfection.' },
    { sec: 's3', f: 'Break the mode of transmission link with…', b: 'Hand hygiene, PPE, environmental sanitation, engineering controls, equipment disinfection/sterilization.' },
    { sec: 's3', f: 'Break the susceptible host link with…', b: 'Immunization, identification of high-risk patients, treatment of pre-existing conditions, proper nutrition.' },
    { sec: 's4', f: 'Primary / secondary / tertiary prevention: targets and examples', b: 'Primary: health of individual (vaccination). Secondary: newly ill (early screening & treatment). Tertiary: recovering (rehabilitation).' }
  ]
};
