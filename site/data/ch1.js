// Unit 1 — source: "CH01 - Tagged.pdf" (11 slides). No learning-objectives slide in this lecture.
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
        { q: 'Which other occupations have roles in supporting prevention and control (slide 2)?', a: 'Public health specialists, epidemiologists, lab techs, etc.' },
        { q: 'Which board gives the CIC exam?', a: 'CBIC: Certification Board of Infection Control and Epidemiology.' },
        { q: 'List the 6 CIC core competencies.', a: 'Identification of disease processes · Surveillance & epidemiologic investigation · Preventing/controlling the transmission of infectious diseases · Employee/Occupational Health · Management & communication (leadership) · Education & research.' },
        { q: 'Name the 4 APIC domains.', a: 'Leadership · Infection Prevention & Control Competencies · Technology · Performance improvement & Implementation science.' }
      ]
    },
    {
      id: 's2', title: 'The chain of transmission', src: 'Slides 7–9',
      blocks: [
        { t: 'p', x: 'Two basic principles are the core of all efforts to prevent and control diseases: **1. the {chain|chain of transmission}** and **2. the {levels|levels of prevention}**.' },
        { t: 'p', x: 'The chain of transmission (chain of infection) has **six links** (slide 8). Figure 1.2 (slide 10), "Breaking the Chain of Transmission", lists the infection control and prevention strategies for each link.' },
        { t: 'note', k: 'added', x: 'The CH01 slides do not state "break one link and the chain stops". The Ch02 lecture (slide 7) says it for the hand-transmission chain: "Break it, and the chain stops."' },
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
        { q: 'What are the three modes of transmission on slide 9?', a: 'Contact, droplet, airborne.' },
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
        { t: 'note', k: 'warn', x: 'Some strategies appear under more than one link. **Hand hygiene, PPE** and **engineering controls** each break more than one link, so the sorter leaves them out. Each sorter item uses the exact wording of Figure 1.2: "Sterilization" on its own is under **Infectious agent**, while "Equipment disinfection/sterilization" is under **Modes of transmission**.' },
        { t: 'sort', id: 'c1-break' },
        { t: 'note', k: 'conflict', x: 'In Figure 1.2, disinfection/sterilization is listed under **Infectious agent**, environmental cleaning/disinfection under **Reservoirs**, and equipment disinfection/sterilization under **Modes of transmission**. A past quiz question (Quiz 2, Q12) asks which link "decontamination, cleaning, disinfection and sterilization" interrupts and offers only Portal of exit / Reservoir / Portal of entry / Susceptible host. Of those four, only **Reservoir** carries cleaning/disinfection in the figure.' }
      ],
      recall: [
        { q: 'Which strategies break the "susceptible host" link?', a: 'Immunization, identification of high-risk patients, treatment of pre-existing conditions, proper nutrition.' },
        { q: 'Which strategies break the "portals of exit" link?', a: 'Control of excretions and secretions, proper disposal of waste and contaminated linen, proper wound care.' },
        { q: 'Which strategies break the "portals of entry" link?', a: 'Hand hygiene, aseptic technique, PPE, engineering controls.' },
        { q: 'Which strategies break the "infectious agent" link?', a: 'Disinfection, sterilization, effective antimicrobial therapy.' }
      ]
    },
    {
      id: 's4', title: 'Levels of prevention', src: 'Slide 11',
      blocks: [
        { t: 'svg', id: 'levels' },
        { t: 'table', cap: 'Levels of prevention', quiz: true, head: ['Level', 'Target', 'Example'], rows: [
          ['{primary|Primary}', 'Health of individual (before disease: Vaccines lecture, slide 3)', 'Vaccination'],
          ['{secondary|Secondary}', 'Newly ill individual', 'Early screening and treatment'],
          ['{tertiary|Tertiary}', 'Recovering individual', 'Rehabilitation']] },
        { t: 'chain', items: ['Healthy individual', 'Vaccinated before exposure', 'Lower risk of disease', '= Primary prevention'] },
        { t: 'chain', items: ['Newly ill individual', 'Early screening and treatment', 'Reduce the impact of disease', '= Secondary prevention'] },
        { t: 'chain', items: ['Recovering individual', 'Rehabilitation / physical therapy', 'Maximize function', '= Tertiary prevention'] },
        { t: 'note', k: 'added', x: 'The flow steps come from the Vaccines lecture, slide 3 ("prepares immune defenses before exposure", "reduces the risk of disease", "act before disease occurs") and Quiz 1 Q4 wording. Slide 11 gives only the target and one example per level.' },
        { t: 'why', q: 'Why is vaccination an example of primary prevention?', a: 'Vaccination prepares immune defenses before exposure and reduces the risk of disease and serious complications. Primary prevention means acting before disease occurs (Vaccines lecture, slide 3).' },
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
    { id: 'c1-break', sec: 's3', src: 'Slide 10', title: 'Which link does each strategy break?', cats: ['Infectious agent', 'Reservoir', 'Portal of exit', 'Mode of transmission', 'Portal of entry', 'Susceptible host'],
      items: [['Sterilization', 0], ['Effective antimicrobial therapy', 0], ['Water treatment', 1], ['Proper food storage', 1], ['Proper wound care', 2], ['Proper disposal of contaminated linen', 2], ['Environmental sanitation', 3], ['Aseptic technique', 4], ['Immunization', 5], ['Proper nutrition', 5], ['Identification of high-risk patients', 5]] },
    { id: 'c1-levels', sec: 's4', src: 'Slide 11 + Quiz 1 Q4', title: 'Which level of prevention?', cats: ['Primary', 'Secondary', 'Tertiary'],
      items: [['Vaccination of a healthy individual', 0], ['Early screening and treatment', 1], ['Rehabilitation', 2], ['Screening programs to identify affected individuals', 1], ['Physical therapy to maximize limb function after an infection', 2]] }
  ],

  questions: [
    { id: 'c1q1', sec: 's1', q: 'Infection preventionists perform critical duties that aim to protect:', o: ['Patients, healthcare workers and the surrounding community', 'Hospital inpatients during outbreaks on the wards', 'Healthcare workers through occupational health programs', 'Patients and healthcare workers inside inpatient hospitals'], x: 'Slide 3 names three groups: patients, healthcare workers and the surrounding community. Each other option leaves out the surrounding community, and two of them also leave out a whole group. (slide 3)', src: 'Slide 3' },
    { id: 'c1q2', sec: 's1', q: 'The Certification Exam in Infection Control (CIC) is given by:', o: ['CBIC', 'APIC', 'CDC', 'WHO'], x: 'The Certification Board of Infection Control and Epidemiology (CBIC) gives the CIC exam. APIC is the association whose core competencies are composed of 4 domains; it is not the exam board. (slide 4)', src: 'Slide 4' },
    { id: 'c1q3', sec: 's1', q: 'How many core competencies does the CIC list?', o: ['6', '4', '5', '3'], x: 'The CIC lists 6 core competencies. "4" is the tempting mix-up: that is the number of APIC domains (slide 6). (slide 5)', src: 'Slide 5' },
    { id: 'c1q4', sec: 's1', q: 'APIC core competencies are composed of how many domains?', o: ['4', '6', '3', '5'], x: 'APIC core competencies are composed of 4 domains: Leadership, Infection Prevention & Control Competencies, Technology, and Performance improvement & Implementation science. "6" is the CIC count (slide 5). (slide 6)', src: 'Slide 6' },
    { id: 'c1q5', sec: 's1', q: 'Which of the following is NOT one of the CIC 6 core competencies?', o: ['Technology', 'Employee/Occupational Health', 'Education & research', 'Identification of disease processes'], x: '"Technology" is one of the 4 APIC domains (slide 6). The other three options are CIC core competencies #4, #6 and #1 (slide 5). (slides 5–6)', src: 'Slides 5–6' },
    { id: 'c1q6', sec: 's1', q: 'Under APIC, "epidemiology and surveillance, risk assessment, risk reduction" belong to which domain?', o: ['Infection Prevention & Control Competencies', 'Leadership', 'Technology', 'Performance improvement & Implementation science'], x: 'APIC puts epidemiology and surveillance, risk assessment, risk reduction and infection prevention under Infection Prevention & Control Competencies. Leadership is collaboration, followership, program management, critical thinking skills and communication. (slide 6)', src: 'Slide 6' },
    { id: 'c1q7', sec: 's1', q: 'Collaboration, followership, program management and critical thinking belong to which APIC domain?', o: ['Leadership', 'Technology', 'Infection Prevention & Control Competencies', 'Education & research'], x: 'APIC\'s Leadership domain includes collaboration, followership, program management, critical thinking skills and communication. "Education & research" is a CIC core competency (slide 5), not an APIC domain. (slide 6)', src: 'Slide 6' },
    { id: 'c1q24', sec: 's1', q: 'Infection prevention and control is a rapidly growing field, and other occupations such as public health specialists, epidemiologists and lab techs have roles in supporting prevention and control.', o: ['True', 'False'], fix: true, x: 'True. Slide 2 calls infection prevention and control a rapidly growing field and says public health specialists, epidemiologists, lab techs, etc. have roles in supporting prevention and control. (slide 2)', src: 'Slide 2' },
    { id: 'c1q25', sec: 's1', q: 'Which of the following is one of the 4 APIC domains?', o: ['Performance improvement & Implementation science', 'Employee/Occupational Health', 'Education & research', 'Preventing/controlling the transmission of infectious diseases'], x: 'Performance improvement & Implementation science is an APIC domain, with Leadership, Infection Prevention & Control Competencies and Technology (slide 6). The other three options are CIC core competencies (slide 5). (slides 5–6)', src: 'Slides 5–6' },
    { id: 'c1q26', sec: 's1', q: 'CIC core competencies are composed of 4 domains, while APIC lists 6 core competencies.', o: ['True', 'False'], a: 1, fix: true, x: 'False. It is the other way round: the CIC lists 6 core competencies (slide 5), and APIC core competencies are composed of 4 domains (slide 6). (slides 5–6)', src: 'Slides 5–6' },

    { id: 'c1q8', sec: 's2', q: 'The two basic principles at the core of all efforts to prevent and control disease are:', o: ['The chain of transmission and levels of prevention', 'Hand hygiene and personal protective equipment (PPE)', 'Surveillance and education', 'Isolation of the ill and quarantine of the exposed'], x: 'The two basic principles are 1. the chain of transmission and 2. the levels of prevention. Hand hygiene and PPE are strategies that break links of the chain (Figure 1.2, slide 10); they are not the principles. (slide 7)', src: 'Slide 7' },
    { id: 'c1q9', sec: 's2', q: 'Which is the correct order of the chain of transmission?', o: ['Agent → reservoir → portal of exit → mode → portal of entry → host', 'Agent → portal of exit → reservoir → mode → host → portal of entry', 'Reservoir → agent → mode → portal of exit → portal of entry → host', 'Host → portal of entry → mode → reservoir → portal of exit → agent'], x: 'Slide 8 lists the links in this order: infectious agent, reservoir, portals of exit, modes of transmission, portals of entry, susceptible host. The portal of exit comes before the mode of transmission, and the portal of entry comes just before the host. (slide 8)', src: 'Slide 8', fix: false },
    { id: 'c1q10', sec: 's2', q: 'Asymptomatic carriers, water, food and animals are examples of which link?', o: ['Reservoir', 'Infectious agent', 'Portal of exit', 'Susceptible host'], x: 'Slide 9 lists asymptomatic carriers, water, food and animals under Reservoirs. The infectious agents are the germs themselves: bacteria, viruses, fungi, parasites, prions. (slide 9)', src: 'Slide 9' },
    { id: 'c1q11', sec: 's2', q: 'Blood, secretion and excretions are examples of:', o: ['Portals of exit', 'Portals of entry', 'Reservoirs', 'Modes of transmission'], x: 'Slide 9 lists blood, secretion and excretions under Portals of exit. The portals of entry are the respiratory tract, GI tract, non-intact skin and mucous membranes. (slide 9)', src: 'Slide 9' },
    { id: 'c1q12', sec: 's2', q: 'Which is listed on slide 9 as an infectious agent?', o: ['Prions', 'Water', 'Mucous membranes', 'Excretions'], x: 'The infectious agents on slide 9 are bacteria, viruses, fungi, parasites and prions. Water is a reservoir, mucous membranes are a portal of entry and excretions are a portal of exit. (slide 9)', src: 'Slide 9' },
    { id: 'c1q13', sec: 's2', q: 'Age, surgery, immunocompromise and being unvaccinated describe the:', o: ['Susceptible host', 'Reservoir', 'Portal of entry', 'Infectious agent'], x: 'Slide 9 lists age, immunocompromised, surgery, medical conditions and unvaccinated under Susceptible host. The portals of entry are body routes: respiratory tract, GI tract, non-intact skin, mucous membranes. (slide 9)', src: 'Slide 9' },
    { id: 'c1q27', sec: 's2', q: 'The reservoir is the first link in the chain of transmission.', o: ['True', 'False'], a: 1, fix: true, x: 'False. The chain starts with the infectious agent; the reservoir is the second link. (slide 8)', src: 'Slide 8' },
    { id: 'c1q28', sec: 's2', q: 'Prions are listed as an example of an infectious agent in the chain of transmission.', o: ['True', 'False'], fix: true, x: 'True. Slide 9 lists bacteria, viruses, fungi, parasites and prions as infectious agents. (slide 9)', src: 'Slide 9' },

    { id: 'c1q14', sec: 's3', q: 'Immunization and proper nutrition break which link?', o: ['Susceptible host', 'Reservoir', 'Portal of exit', 'Infectious agent'], x: 'Figure 1.2 lists immunization, identification of high-risk patients, treatment of pre-existing conditions and proper nutrition under Susceptible host. None of these is listed under the reservoir, exit or agent links. (slide 10)', src: 'Slide 10' },
    { id: 'c1q15', sec: 's3', q: 'Water treatment and proper food storage break which link?', o: ['Reservoir', 'Portal of entry', 'Susceptible host', 'Mode of transmission'], x: 'Figure 1.2 lists water treatment, proper food storage, engineering controls and environmental cleaning/disinfection under Reservoirs. Water and food are themselves reservoir examples on slide 9. (slide 10)', src: 'Slide 10' },
    { id: 'c1q16', sec: 's3', q: 'Proper wound care and proper disposal of contaminated linen break which link?', o: ['Portal of exit', 'Portal of entry', 'Infectious agent', 'Susceptible host'], x: 'Figure 1.2 lists control of excretions and secretions, proper disposal of waste and contaminated linen, and proper wound care under Portals of exit. The portal of entry strategies are hand hygiene, aseptic technique, PPE and engineering controls. (slide 10)', src: 'Slide 10' },
    { id: 'c1q17', sec: 's3', q: 'Which strategy is listed for BOTH the mode of transmission and the portal of entry links?', o: ['Hand hygiene', 'Immunization', 'Water treatment', 'Proper wound care'], x: 'Figure 1.2 lists hand hygiene (and also PPE and engineering controls) under both Modes of transmission and Portals of entry. Immunization is a host strategy, water treatment a reservoir strategy and proper wound care a portal of exit strategy. (slide 10)', src: 'Slide 10' },
    { id: 'c1q18', sec: 's3', q: 'Aseptic technique is listed under which link in Figure 1.2?', o: ['Portals of entry', 'Reservoirs', 'Portals of exit', 'Susceptible host'], x: 'Figure 1.2 lists hand hygiene, aseptic technique, PPE and engineering controls under Portals of entry. The portal of exit strategies are control of excretions and secretions, waste and linen disposal, and wound care. (slide 10)', src: 'Slide 10' },
    { id: 'c1q22', sec: 's3', q: 'Disinfection, sterilization and effective antimicrobial therapy break which link?', o: ['Infectious agent', 'Portal of entry', 'Portal of exit', 'Susceptible host'], x: 'Figure 1.2 lists disinfection, sterilization and effective antimicrobial therapy under Infectious agent. Environmental cleaning/disinfection is under Reservoirs, and equipment disinfection/sterilization is under Modes of transmission (compare Quiz 2, Q12). (slide 10)', src: 'Slide 10' },
    { id: 'c1q23', sec: 's3', q: 'Environmental sanitation and equipment disinfection/sterilization break which link?', o: ['Mode of transmission', 'Portal of exit', 'Susceptible host', 'Portal of entry'], x: 'Figure 1.2 lists hand hygiene, PPE, environmental sanitation, engineering controls and equipment disinfection/sterilization under Modes of transmission. Neither strategy appears under the exit, entry or host links. (slide 10)', src: 'Slide 10' },
    { id: 'c1q29', sec: 's3', q: 'Proper wound care is a strategy that breaks the portal of entry link.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Figure 1.2 lists proper wound care under Portals of exit, with control of excretions and secretions and proper disposal of waste and contaminated linen. The portal of entry strategies are hand hygiene, aseptic technique, PPE and engineering controls. (slide 10)', src: 'Slide 10' },
    { id: 'c1q30', sec: 's3', q: 'In Figure 1.2, engineering controls are listed under more than one link.', o: ['True', 'False'], fix: true, x: 'True. Engineering controls appear under Reservoirs, Modes of transmission and Portals of entry. (slide 10)', src: 'Slide 10' },

    { id: 'c1q19', sec: 's4', q: 'Early screening and treatment is an example of:', o: ['Secondary prevention', 'Primary prevention', 'Tertiary prevention', 'Not a prevention level: the disease has already started'], x: 'Slide 11: secondary prevention targets the newly ill individual, and its example is early screening and treatment. Prevention does not stop once disease starts: secondary and tertiary levels both come after it. (slide 11)', src: 'Slide 11' },
    { id: 'c1q20', sec: 's4', q: 'Tertiary prevention targets the:', o: ['Recovering individual', 'Newly ill individual', 'Healthy individual', 'Surrounding community'], x: 'Tertiary prevention targets the recovering individual (example: rehabilitation). The newly ill individual is the secondary target, and health of the individual is the primary target. (slide 11)', src: 'Slide 11' },
    { id: 'c1q21', sec: 's4', q: 'Rehabilitation is an example of which level of prevention?', o: ['Tertiary', 'Secondary', 'Primary', 'Not a prevention level: it happens after illness'], x: 'Slide 11 gives rehabilitation as the example of tertiary prevention, which targets the recovering individual. Secondary prevention (newly ill) uses early screening and treatment instead. (slide 11)', src: 'Slide 11' },
    { id: 'c1q31', sec: 's4', q: 'Early screening and treatment is an example of primary prevention.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Slide 11 gives early screening and treatment as the example of secondary prevention (newly ill individual). The primary prevention example is vaccination. (slide 11)', src: 'Slide 11' },
    { id: 'c1q32', sec: 's4', q: 'Secondary prevention targets the newly ill individual.', o: ['True', 'False'], fix: true, x: 'True. Slide 11: secondary prevention targets the newly ill individual; its example is early screening and treatment. (slide 11)', src: 'Slide 11' },

    // Past questions — Quiz 1 , ch 1&2 (45).pdf (screenshots; answers checked against the lecture)
    { id: 'p1q1', sec: 's2', q: 'The germs (virus/bacteria) that enter the body by coming into contact with the mucosa of the eyes, nose and mouth are called "portal of exit".', o: ['True', 'False'], a: 1, fix: true, x: 'False. Mucous membranes are a portal of ENTRY. The portals of exit are blood, secretion and excretions. (slide 9)', src: 'Slide 9', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 1 } },
    { id: 'p1q4', sec: 's4', q: 'Which of the following is an example of a secondary prevention strategy?', o: ['Screening programs to identify affected individuals to reduce the impact of disease', 'Give healthy awareness and some advice to public', 'Vaccination of a healthy individual', 'Physical therapy to maximize limb function after an infection'], x: 'Secondary prevention targets the newly ill individual, and its example is early screening and treatment, which matches screening programs. Vaccination is primary, and physical therapy after an infection matches tertiary (rehabilitation). (slide 11)', src: 'Slide 11', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 4 } },
    { id: 'p1q5', sec: 's2', q: 'Which of the following is NOT a potential portal of entry for a pathogen?', o: ['Intact skin', 'Respiratory tract', 'Mucous membranes in the nostrils', 'Gastrointestinal tract'], x: 'Slide 9 lists the respiratory tract, GI tract, NON-intact skin and mucous membranes as portals of entry. Intact skin is not on the list. (slide 9)', src: 'Slide 9', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 5 } },
    { id: 'p1q7', sec: 's4', q: 'Vaccination of a healthy individual is an example of ______.', o: ['a primary prevention strategy', 'a treatment of injured person', 'a secondary prevention strategy', 'post-traumatic treatment strategy'], x: 'Primary prevention targets the health of the individual, and its example is vaccination. Secondary prevention is early screening and treatment of the newly ill. (slide 11)', src: 'Slide 11', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 7 } },
    { id: 'p1q8', sec: 's2', q: 'Because of digestive enzymes, the GI tract does not serve as a portal of entry.', o: ['True', 'False'], a: 1, fix: true, x: 'False. Slide 9 lists the GI tract as a portal of entry; the slide gives no exception for digestive enzymes. (slide 9)', src: 'Slide 9', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 8 } },
    { id: 'p2q12', sec: 's3', q: 'Which link in the chain of infection is interrupted by decontamination, cleaning, disinfection, and sterilization?', o: ['Reservoir', 'Portal of exit', 'Portal of entry', 'Susceptible host'], x: 'Figure 1.2 lists environmental cleaning/disinfection under Reservoirs; none of the other three options lists cleaning or disinfection. Figure 1.2 also lists disinfection/sterilization under Infectious agent, which is not an option here. (slide 10)', src: 'Slide 10', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 12 } },
    { id: 'p2q13', sec: 's2', q: 'Intact skin is an/a ______ barrier for microorganisms.', o: ['effective', 'ineffective', 'reflective', 'sensitive'], x: 'Slide 9 lists only NON-intact skin as a portal of entry, so intact skin acts as an effective barrier (inferred from slide 9).', src: 'Slide 9', past: { file: 'Quiz 2, ch 2&3 (45).pdf', n: 13 } },
    { id: 'p1q10', sec: 's2', q: 'Which of the following is NOT a link in the chain of transmission?', o: ['Primary health strategy', 'Modes of transmission', 'Infectious agent', 'Susceptible host'], x: 'The six links are infectious agent, reservoir, portals of exit, modes of transmission, portals of entry and susceptible host. A prevention strategy is used to break a link (Figure 1.2); it is not a link. (slide 8)', src: 'Slide 8', past: { file: 'Quiz 1 , ch 1&2 (45).pdf', n: 10 } }
  ],

  cards: [
    { sec: 's1', f: 'Infection preventionists protect…', b: 'Patients, healthcare workers and the surrounding community.', src: 'Slide 3' },
    { sec: 's1', f: 'Which other occupations support infection prevention and control?', b: 'Public health specialists, epidemiologists, lab techs, etc.', src: 'Slide 2' },
    { sec: 's1', nl: true, f: 'CBIC → ?', b: 'Certification Exam in Infection Control (CIC). CBIC = Certification Board of Infection Control and Epidemiology.', src: 'Slide 4' },
    { sec: 's1', f: 'CIC core competencies: how many?', b: '6 (APIC has 4 domains instead).', src: 'Slides 5–6' },
    { sec: 's1', f: 'CIC core competencies 1–3?', b: '1. Identification of disease processes · 2. Surveillance & epidemiologic investigation · 3. Preventing/controlling the transmission of infectious diseases.', src: 'Slide 5' },
    { sec: 's1', f: 'CIC core competencies 4–6?', b: '4. Employee/Occupational Health · 5. Management & communication (leadership) · 6. Education & research.', src: 'Slide 5' },
    { sec: 's1', f: 'APIC core competencies: how many domains, and what are they?', b: '4: Leadership · Infection Prevention & Control Competencies · Technology · Performance improvement & Implementation science.', src: 'Slide 6' },
    { sec: 's2', f: 'Two basic principles of infection prevention', b: '1. Chain of transmission · 2. Levels of prevention.', src: 'Slide 7' },
    { sec: 's2', f: 'Chain of transmission: how many links, and what are links 1–3?', b: '6 links. 1. Infectious agent → 2. Reservoir → 3. Portal of exit.', src: 'Slide 8' },
    { sec: 's2', f: 'Chain of transmission: links 4–6?', b: '4. Mode of transmission → 5. Portal of entry → 6. Susceptible host.', src: 'Slide 8' },
    { sec: 's2', f: 'Infectious agents (examples): bacteria, viruses + which 3 more?', b: 'Fungi, parasites, prions.', src: 'Slide 9' },
    { sec: 's2', f: 'Reservoirs (examples)', b: 'Asymptomatic carriers, water, food, animals.', src: 'Slide 9' },
    { sec: 's2', f: 'Portals of exit (examples)', b: 'Blood, secretion, excretions.', src: 'Slide 9' },
    { sec: 's2', f: 'Modes of transmission (examples)', b: 'Contact, droplet, airborne.', src: 'Slide 9' },
    { sec: 's2', f: 'Portals of entry (examples)', b: 'Respiratory tract, GI tract, non-intact skin, mucous membranes.', src: 'Slide 9' },
    { sec: 's2', f: 'Susceptible host factors: how many are on slide 9?', b: '5.', src: 'Slide 9' },
    { sec: 's2', f: 'Susceptible host factors: age, immunocompromised + which 3 more?', b: 'Surgery, medical conditions, unvaccinated.', src: 'Slide 9' },
    { sec: 's3', f: 'Break the infectious agent link with…', b: 'Disinfection, sterilization, effective antimicrobial therapy.', src: 'Slide 10' },
    { sec: 's3', f: 'Break the reservoir link with…', b: 'Water treatment, proper food storage, engineering controls, environmental cleaning/disinfection.', src: 'Slide 10' },
    { sec: 's3', f: 'Break the portal of exit link with…', b: 'Control of excretions and secretions, proper disposal of waste and contaminated linen, proper wound care.', src: 'Slide 10' },
    { sec: 's3', f: 'Which 3 strategies are listed under BOTH modes of transmission and portals of entry?', b: 'Hand hygiene, PPE, engineering controls.', src: 'Slide 10' },
    { sec: 's3', f: 'Break the mode of transmission link with… hand hygiene, PPE, engineering controls + which 2 more?', b: 'Environmental sanitation, equipment disinfection/sterilization.', src: 'Slide 10' },
    { sec: 's3', f: 'Break the portal of entry link with…', b: 'Hand hygiene, aseptic technique, PPE, engineering controls.', src: 'Slide 10' },
    { sec: 's3', f: 'Break the susceptible host link with…', b: 'Immunization, identification of high-risk patients, treatment of pre-existing conditions, proper nutrition.', src: 'Slide 10' },
    { sec: 's4', f: 'Primary prevention: target and example?', b: 'Health of individual · Vaccination.', src: 'Slide 11' },
    { sec: 's4', f: 'Secondary prevention: target and example?', b: 'Newly ill individual · Early screening and treatment.', src: 'Slide 11' },
    { sec: 's4', f: 'Tertiary prevention: target and example?', b: 'Recovering individual · Rehabilitation.', src: 'Slide 11' }
  ]
};
