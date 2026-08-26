import { PYQuestion } from "../types";

export const EXTENDED_PYQ_DATABASE: PYQuestion[] = [
  // ==========================================
  // 2026 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2026_math_stat",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2026,
    subject: "Mathematics",
    chapter: "Statistics (পরিসংখ্যান)",
    topic: "Mean, Median, Mode & Ogive",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "If the median of the distribution with frequencies (10, x, 25, 30, y, 10) and total frequency N = 100 is 28.5, find the values of x and y.",
    questionBengali: "যদি মোট পরিসংখ্যা N = 100 বিশিষ্ট বিন্যাসের মধ্যমা 28.5 হয়, তবে অজ্ঞাত পরিসংখ্যা x ও y-এর মান নির্ণয় করো।",
    solution: `**Step 1: Total frequency equation**
Given $N = 10 + x + 25 + 30 + y + 10 = 100$
$$75 + x + y = 100 \\implies x + y = 25 \\quad \\text{--- (1)}$$

**Step 2: Median Class identification**
Median is given as $28.5$, which lies in class interval $20 - 30$.
- Lower limit $l = 20$
- Cumulative frequency of preceding class $cf = 10 + x$
- Frequency of median class $f = 25$
- Class width $h = 10$
- $N/2 = 100/2 = 50$

**Step 3: Apply Median formula**
$$\\text{Median} = l + \\left(\\frac{\\frac{N}{2} - cf}{f}\\right) \\times h$$
$$28.5 = 20 + \\left(\\frac{50 - (10 + x)}{25}\\right) \\times 10$$
$$8.5 = \\frac{40 - x}{2.5} \\implies 21.25 = 40 - x \\implies x = 15, y = 10$$

**Final Answer:** $x = \\mathbf{15}, y = \\mathbf{10}$.`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2026_phys_semicond",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2026,
    subject: "Physics",
    chapter: "Semiconductor Electronics & Digital Logic",
    topic: "Full Wave Rectifier & p-n Junction Diode",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Explain the working principle of a Full-Wave Center-Tapped Diode Rectifier with a circuit diagram. Draw input and output waveforms and calculate its theoretical maximum efficiency.",
    questionBengali: "বর্তনী চিত্রসহ সেন্টার-ট্যাপড পূর্ণতরঙ্গ ডায়োড একমুখীকারকের (Full-Wave Rectifier) কার্যপ্রণালী ব্যাখ্যা করো। ইনপুট ও আউটপুট তরঙ্গরূপ অঙ্কন করো এবং এর তাত্ত্বিক সর্বোচ্চ কর্মক্ষমতা নির্ণয় করো।",
    solution: `**১. কার্যপ্রণালী ও গঠন:**
- সেন্টার-ট্যাপড রূপান্তরকের গৌণ কুণ্ডলীর দুই প্রান্তে দুটি $p-n$ সংযোগ ডায়োড $D_1$ ও $D_2$ যুক্ত থাকে।
- **ধনাত্মক অর্ধচক্র:** কুণ্ডলীর উপরের প্রান্ত ধনাত্মক এবং নিচের প্রান্ত ঋণাত্মক হয়। ফলে $D_1$ সম্মুখ বায়াসে (Forward Bias) তড়িৎ পরিবহন করে এবং $D_2$ বিপরীত বায়াসে থাকে।
- **ঋণাত্মক অর্ধচক্র:** কুণ্ডলীর নিচের প্রান্ত ধনাত্মক হয়, ফলে $D_2$ সম্মুখ বায়াসে তড়িৎ পরিবহন করে।
- উভয় অর্ধচক্রেই লোড রোধ $R_L$-এর মধ্য দিয়ে একই অভিমুখে তড়িৎ প্রবাহিত হয়।

**২. কর্মক্ষমতা (Efficiency $\\eta$):**
$$\\eta = \\frac{P_{dc}}{P_{ac}} = \\frac{8}{\\pi^2} \\times 100\\% \\approx \\mathbf{81.2\\%}$$`,
    difficulty: "Medium",
    isSampleData: true,
  },

  // ==========================================
  // 2025 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2025_phys_optics",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2025,
    subject: "Physical Science",
    chapter: "Light & Optics (আলো)",
    topic: "Refraction through Prism & Minimum Deviation",
    marks: 3,
    questionType: "SAQ (2 Marks)",
    question: "Derive the relation for the angle of deviation δ = i₁ + i₂ - A for a ray of light passing through a triangular glass prism.",
    questionBengali: "কাঁচের ত্রিভুজাকার প্রিজমের মধ্য দিয়ে আলোকরশ্মির প্রতিসরণের ক্ষেত্রে চ্যুতি কোণের রাশিমালা δ = i₁ + i₂ - A প্রতিষ্ঠা করো।",
    solution: `**Step 1: Ray Geometry**
In $\\triangle QMR$: $r_1 + r_2 + \\angle QMR = 180^\\circ$.
In quadrilateral $AQMR$: $\\angle A + \\angle QMR = 180^\\circ \\implies r_1 + r_2 = A$.

**Step 2: Deviation at both surfaces**
$$\\delta = \\delta_1 + \\delta_2 = (i_1 - r_1) + (i_2 - r_2) = (i_1 + i_2) - (r_1 + r_2)$$
Substituting $r_1 + r_2 = A$:
$$\\mathbf{\\delta = i_1 + i_2 - A} \\quad \\text{[Proved]}$$`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2025_chem_electrochem",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2025,
    subject: "Chemistry",
    chapter: "Electrochemistry (তড়িৎ রসায়ন)",
    topic: "Nernst Equation and EMF of Galvanic Cell",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "Calculate the EMF of the cell at 298 K: Mg(s) | Mg²⁺ (0.001 M) || Cu²⁺ (0.0001 M) | Cu(s). Given: E°(Mg²⁺/Mg) = -2.37 V, E°(Cu²⁺/Cu) = +0.34 V.",
    questionBengali: "২৯৮ কেলভিন তাপমাত্রায় গ্যালভানীয় কোষটির তড়িচ্চালক বল (EMF) গণনা করো: Mg(s) | Mg²⁺ (0.001 M) || Cu²⁺ (0.0001 M) | Cu(s)। প্রদত্ত: E°(Mg²⁺/Mg) = -2.37 V, E°(Cu²⁺/Cu) = +0.34 V।",
    solution: `**Step 1: Standard Cell Potential ($E^\\circ_{\\text{cell}}$)**
$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 0.34 - (-2.37) = \\mathbf{2.71\\text{ V}}$$

**Step 2: Nernst Equation (n = 2)**
$$\\text{Cell Reaction: } Mg(s) + Cu^{2+}(aq) \\rightleftharpoons Mg^{2+}(aq) + Cu(s)$$
$$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{2} \\log \\frac{[Mg^{2+}]}{[Cu^{2+}]}$$
$$E_{\\text{cell}} = 2.71 - \\frac{0.0591}{2} \\log \\left(\\frac{10^{-3}}{10^{-4}}\\right) = 2.71 - 0.02955 \\log(10) = 2.71 - 0.02955 = \\mathbf{2.68\\text{ V}}$$`,
    difficulty: "Hard",
    isSampleData: true,
  },

  // ==========================================
  // 2024 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2024_life_heredity",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2024,
    subject: "Life Science",
    chapter: "Heredity and Common Genetic Diseases",
    topic: "Mendel's Monohybrid Cross & Law of Segregation",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Explain Mendel's Monohybrid Cross in Pea plant using a checkerboard. State Mendel's First Law (Law of Segregation).",
    questionBengali: "চেকারবোর্ডের সাহায্যে মটর গাছের একসংকর জনন পরীক্ষাটি ব্যাখ্যা করো। মেন্ডেলের প্রথম সূত্রটি (পৃথকভবন সূত্র) বিবৃত করো।",
    solution: `**১. মেন্ডেলের একসংকর জনন পরীক্ষা:**
- খাঁটি লম্বা ($TT$) $\\times$ খাঁটি বেঁটে ($tt$) $\\to$ $F_1$ জনু: সংকর লম্বা ($Tt$)।
- $F_2$ জনু: ফিনোটাইপ অনুপাত লম্বা : বেঁটে = **৩ : ১**; জিনোটাইপ অনুপাত $TT : Tt : tt$ = **১ : ২ : ১**।

**২. পৃথকভবন সূত্র:**
কোনো জীবের একজোড়া বিপরীত চারিত্রিক বৈশিষ্ট্য জনিতৃ থেকে অপত্যে সঞ্চারিত হওয়ার সময় মিশ্রিত হয় না, বরং গ্যামেট গঠনকালে পরস্পরের থেকে পৃথক হয়ে যায়।`,
    difficulty: "Easy",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2024_math_calc_ext",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2024,
    subject: "Mathematics",
    chapter: "Calculus (কলনবিদ্যা - Definite Integrals)",
    topic: "Definite Integral Property & Symmetry",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "Evaluate the definite integral: I = ∫[0 to π/2] (√sin(x)) / (√sin(x) + √cos(x)) dx.",
    questionBengali: "মান নির্ণয় করো: I = ∫[0 to π/2] (√sin(x)) / (√sin(x) + √cos(x)) dx।",
    solution: `**Step 1:** $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} \\, dx \\quad \\text{--- (1)}$
**Step 2:** Using $\\int_0^a f(x)dx = \\int_0^a f(a - x)dx$:
$I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x} + \\sqrt{\\sin x}} \\, dx \\quad \\text{--- (2)}$
**Step 3:** Adding (1) and (2):
$2I = \\int_0^{\\pi/2} 1 \\, dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2} \\implies \\mathbf{I = \\frac{\\pi}{4}}$.`,
    difficulty: "Medium",
    isSampleData: true,
  },

  // ==========================================
  // 2023 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2023_hist_indigo",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2023,
    subject: "History",
    chapter: "Resistance and Rebellion: Characteristics and Analyses",
    topic: "Indigo Revolt (নীল বিদ্রোহ ১৮৫৯-৬০)",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "What were the main causes of the Indigo Revolt of 1859-60 in Bengal? What was the role of Harishchandra Mukherjee and the press?",
    questionBengali: "বাংলায় নীল বিদ্রোহের (১৮৫৯-৬০) প্রধান কারণগুলি কী ছিল? হরিশচন্দ্র মুখোপাধ্যায়ের সম্পাদিত 'হিন্দু প্যাট্রিয়ট' পত্রিকার ভূমিকা আলোচনা করো।",
    solution: `**১. প্রধান কারণ:**
- **দাদন প্রথা:** অগ্রিম অর্থ দিয়ে উর্বর জমিতে অনিচ্ছুক কৃষকদের নীল চাষে বাধ্য করা।
- **অত্যাচার:** নীল চাষে অস্বীকৃতি জানালে শারীরিক নির্যাতন ও ফসল ধ্বংস।

**২. বুদ্ধিজীবী ও পত্রিকার ভূমিকা:**
- হরিশচন্দ্র মুখোপাধ্যায়ের **'হিন্দু প্যাট্রিয়ট'** পত্রিকায় নীলকরদের শোষণ প্রকাশ্যে আনা হয়।
- দীনবন্ধু মিত্রের **'নীলদর্পণ'** নাটক সমগ্র দেশে আলোড়ন সৃষ্টি করে।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2023_bio_genetics",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2023,
    subject: "Biological Sciences",
    chapter: "Genetics & Molecular Basis of Inheritance",
    topic: "Lac Operon Concept & Gene Regulation",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Describe the structural components and regulation mechanism of Lac Operon in E. coli in the presence and absence of lactose (inducer).",
    questionBengali: "ই কোলাই ব্যাকটেরিয়ায় ল্যাক ওপেরনের (Lac Operon) গঠন এবং ল্যাকটোজের উপস্থিতি ও অনুপস্থিতিতে এর নিয়ন্ত্রণ প্রক্রিয়া বর্ণনা করো।",
    solution: `**১. ল্যাক ওপেরনের অংশসমূহ:**
- নিয়ন্ত্রক জিন ($i$), প্রমোটর ($P$), অপারেটর ($O$) এবং তিনটি গঠনগত জিন ($z, y, a$)।
- $z$-জিন বিটা-গ্যালাক্টোসিডেস, $y$-জিন পারমিয়েজ এবং $a$-জিন ট্রান্সঅ্যাসিটাইলেজ উৎসেচক তৈরি করে।

**২. কার্যপদ্ধতি:**
- **ল্যাকটোজ অনুপস্থিত:** রিপ্রেসার প্রোটিন অপারেটরের সঙ্গে যুক্ত থাকে, ফলে RNA পলিমারেজ ট্রান্সক্রিপশন করতে পারে না (Switch OFF)।
- **ল্যাকটোজ উপস্থিত:** ল্যাকটোজ (ইনডিউসার) রিপ্রেসারের সাথে যুক্ত হয়ে তাকে নিষ্ক্রিয় করে। ফলে জিনগুলি সক্রিয় হয়ে এনজাইম সংশ্লেষ করে (Switch ON)।`,
    difficulty: "Hard",
    isSampleData: true,
  },

  // ==========================================
  // 2022 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2022_geo_rivers",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2022,
    subject: "Geography",
    chapter: "Exogenetic Processes and Landforms",
    topic: "Erosional landforms formed by River",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Describe three major erosional landforms created by a river in its upper course (Gorge, V-shaped valley, Waterfalls).",
    questionBengali: "উচ্চপ্রবাহে নদীর ক্ষয়কার্যের ফলে গঠিত যেকোনো তিনটি প্রধান ভূমিরূপের সচিত্র বিবরণ দাও (গিরিখাত, V-আকৃতির উপত্যকা ও জলপ্রপাত)।",
    solution: `**১. গিরিখাত (Gorge):** নদীর প্রবল নিম্নক্ষয়ের ফলে সৃষ্ট গভীর ও সংকীর্ণ 'I' আকৃতির উপত্যকা।
**২. V-আকৃতির উপত্যকা:** নিম্নক্ষয় ও পার্শ্বক্ষয়ের মিলিত প্রভাবে উপত্যকা ইংরেজি 'V'-এর আকার নেয়।
**৩. জলপ্রপাত:** গতিপথে কঠিন ও নরম শিলাস্তর থাকলে নরম শিলা দ্রুত ক্ষয় হয়ে জলপ্রপাত সৃষ্টি করে।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2022_phys_optics",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2022,
    subject: "Physics",
    chapter: "Wave Optics (তরঙ্গ আলোকবিজ্ঞান)",
    topic: "Huygens' Principle & Law of Refraction Proof",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "Using Huygens' Principle of wave fronts, verify Snell's Law of refraction at a plane interface between two media of refractive indices n₁ and n₂.",
    questionBengali: "হাইগেনসের নীতি প্রয়োগ করে প্রতিসরাঙ্ক n₁ ও n₂ যুক্ত দুটি মাধ্যমের বিভেদতলে আলোর প্রতিসরণের স্নেলের সূত্র (Snell's Law) প্রমাণ করো।",
    solution: `**Step 1:** Let a plane wave front $AB$ be incident on interface $XY$ at angle $i$.
**Step 2:** In time $t$, secondary wavelets from $B$ reach $C$ in medium 1 ($BC = v_1 t$), while from $A$ they spread into medium 2 with distance $AD = v_2 t$.
**Step 3:** $\\sin i = \\frac{BC}{AC} = \\frac{v_1 t}{AC}$, $\\sin r = \\frac{AD}{AC} = \\frac{v_2 t}{AC}$.
$$\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1} \\implies \\mathbf{n_1 \\sin i = n_2 \\sin r} \\quad \\text{[Snell's Law Proved]}$$`,
    difficulty: "Medium",
    isSampleData: true,
  },

  // ==========================================
  // 2021 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2021_bengali_gono",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2021,
    subject: "Bengali",
    chapter: "জ্ঞানচক্ষু - আশাপূর্ণা দেবী",
    topic: "তপনের আত্মমর্যাদা ও জ্ঞানচক্ষু",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "'তপনের জ্ঞানচক্ষু খুলে গেল' - জ্ঞানচক্ষু বলতে কী বোঝানো হয়েছে? কীভাবে তপনের জ্ঞানচক্ষু প্রকৃত অর্থে উন্মোচিত হয়েছিল?",
    questionBengali: "'তপনের জ্ঞানচক্ষু খুলে গেল' - জ্ঞানচক্ষু বলতে কী বোঝানো হয়েছে? কীভাবে তপনের জ্ঞানচক্ষু প্রকৃত অর্থে উন্মোচিত হয়েছিল?",
    solution: `**১. তাৎপর্য:** জ্ঞানচক্ষু হলো মানুষের অন্তর্নিহিত চেতনা ও আত্মমর্যাদাবোধ।
**২. উন্মোচন:** 'সন্ধ্যাতারা' পত্রিকায় নিজের নামে ছাপা গল্প পড়তে গিয়ে তপন দেখে ছোটমেসো সমস্ত লেখা পাকা হাতে পরিবর্তন করে দিয়েছেন। নিজের অপমানের সেই মুহূর্তে তপন প্রতিজ্ঞা করে ভবিষ্যতে সে নিজের লেখা নিজে জমা দেবে।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2021_chem_kinetics",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2021,
    subject: "Chemistry",
    chapter: "Chemical Kinetics (রাসায়নিক গতিবিদ্যা)",
    topic: "First Order Reaction Integrated Rate Law & Half-Life",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "Derive the integrated rate equation for a First-Order Reaction. Prove that the half-life period (t₁/₂) is independent of the initial concentration of reactant.",
    questionBengali: "প্রথম ক্রম বিক্রিয়ার সমাকলিত হার সমীকরণ প্রতিষ্ঠা করো। প্রমাণ করো যে প্রথম ক্রম বিক্রিয়ার অর্ধায়ু (t₁/₂) প্রারম্ভিক গাঢ়ত্বের ওপর নির্ভরশীল নয়।",
    solution: `**Step 1:** $-\\frac{d[A]}{dt} = k[A] \\implies \\int_{[A]_0}^{[A]} \\frac{d[A]}{[A]} = -k \\int_0^t dt$
$$\\ln \\frac{[A]_0}{[A]} = kt \\implies \\mathbf{k = \\frac{2.303}{t} \\log_{10} \\frac{[A]_0}{[A]}}$$

**Step 2: Half Life ($t = t_{1/2}, [A] = [A]_0 / 2$)**
$$t_{1/2} = \\frac{2.303}{k} \\log_{10} 2 = \\frac{2.303 \\times 0.3010}{k} = \\mathbf{\\frac{0.693}{k}}$$
Since $k$ is constant, $t_{1/2}$ is completely independent of $[A]_0$.`,
    difficulty: "Easy",
    isSampleData: true,
  },

  // ==========================================
  // 2020 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2020_math_trig",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2020,
    subject: "Mathematics",
    chapter: "Trigonometry (ত্রিকোণমিতি)",
    topic: "Trigonometric Identity Proof",
    marks: 3,
    questionType: "SAQ (2 Marks)",
    question: "If sin θ + cos θ = 1, prove that sin θ · cos θ = 0.",
    questionBengali: "যদি sin θ + cos θ = 1 হয়, তবে প্রমাণ করো যে sin θ · cos θ = 0।",
    solution: `**Step 1:** Square both sides: $(\\sin \\theta + \\cos \\theta)^2 = 1^2$
**Step 2:** $\\sin^2 \\theta + \\cos^2 \\theta + 2\\sin \\theta \\cos \\theta = 1$
**Step 3:** $1 + 2\\sin \\theta \\cos \\theta = 1 \\implies 2\\sin \\theta \\cos \\theta = 0 \\implies \\mathbf{\\sin \\theta \\cdot \\cos \\theta = 0}$ [Proved].`,
    difficulty: "Easy",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2020_math_matrix",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2020,
    subject: "Mathematics",
    chapter: "Matrices & Determinants (ম্যাট্রিক্স ও নির্ণায়ক)",
    topic: "Matrix Inversion & System of Linear Equations",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Solve the system of linear equations using Matrix Inversion method: x + y + z = 6, x + 2y + 3z = 14, x + 4y + 9z = 36.",
    questionBengali: "ম্যাট্রিক্সের বিপরীত পদ্ধতির সাহায্যে রৈখিক সমীকরণ জোটের সমাধান করো: x + y + z = 6, x + 2y + 3z = 14, x + 4y + 9z = 36।",
    solution: `**Step 1:** Matrix form $AX = B$ where $A = \\begin{bmatrix}1 & 1 & 1\\\\1 & 2 & 3\\\\1 & 4 & 9\\end{bmatrix}, X = \\begin{bmatrix}x\\\\y\\\\z\\end{bmatrix}, B = \\begin{bmatrix}6\\\\14\\\\36\\end{bmatrix}$.
**Step 2:** $|A| = 1(18 - 12) - 1(9 - 3) + 1(4 - 2) = 6 - 6 + 2 = \\mathbf{2} \\neq 0$.
**Step 3:** $\\text{adj}(A) = \\begin{bmatrix}6 & -5 & 1\\\\-6 & 8 & -2\\\\2 & -3 & 1\\end{bmatrix}$.
$$X = A^{-1}B = \\frac{1}{2}\\begin{bmatrix}6 & -5 & 1\\\\-6 & 8 & -2\\\\2 & -3 & 1\\end{bmatrix}\\begin{bmatrix}6\\\\14\\\\36\\end{bmatrix} = \\frac{1}{2}\\begin{bmatrix}2\\\\4\\\\6\\end{bmatrix} = \\begin{bmatrix}1\\\\2\\\\3\\end{bmatrix}$$
**Final Answer:** $x = 1, y = 2, z = 3$.`,
    difficulty: "Medium",
    isSampleData: true,
  },

  // ==========================================
  // 2019 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2019_phys_cur",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2019,
    subject: "Physical Science",
    chapter: "Current Electricity (চলতড়িৎ)",
    topic: "Joule's Law & Electrical Power",
    marks: 3,
    questionType: "SAQ (2 Marks)",
    question: "State Joule's Laws of electric heating. Derive the formula for electric power P = V²/R.",
    questionBengali: "তড়িৎ প্রবাহের তাপীয় ফল সংক্রান্ত জুলের সূত্রগুলি বিবৃত করো। বিভবপ্রভেদ V ও রোধ R-এর মাধ্যমে তড়িৎ ক্ষমতার (P) রাশিমালা নির্ণয় করো।",
    solution: `**১. জুলের সূত্রাবলি ($H = \\frac{I^2Rt}{J}$):**
- উৎপন্ন তাপ প্রবাহমাত্রার বর্গের সমানুপাতিক ($H \\propto I^2$)।
- উৎপন্ন তাপ পরিবাহীর রোধের সমানুপাতিক ($H \\propto R$)।
- উৎপন্ন তাপ প্রবাহকালের সমানুপাতিক ($H \\propto t$)।

**২. ক্ষমতা:** $P = V \\cdot I = V \\cdot \\left(\\frac{V}{R}\\right) = \\mathbf{\\frac{V^2}{R}}$।`,
    difficulty: "Easy",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2019_phys_emwave",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2019,
    subject: "Physics",
    chapter: "Electromagnetic Induction & Alternating Current",
    topic: "Self-Induction & Resonance in Series LCR Circuit",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Derive an expression for resonant frequency in a series LCR alternating circuit. What is Quality Factor (Q-factor) and its physical significance?",
    questionBengali: "শ্রেণি LCR পরিবর্তী বর্তনীতে অনুনাদী কম্পাঙ্কের রাশিমালা প্রতিষ্ঠা করো। বর্তনীর গুণক গুণমান (Q-factor) কী এবং এর তাৎপর্য লেখো।",
    solution: `**১. অনুনাদী কম্পাঙ্ক ($f_r$):**
- অনুনাদের শর্তে আবেশীয় প্রতিঘাত ও ধারকীয় প্রতিঘাত সমান হয়: $X_L = X_C$.
$$\\omega L = \\frac{1}{\\omega C} \\implies \\omega^2 = \\frac{1}{LC} \\implies \\omega_r = \\frac{1}{\\sqrt{LC}}$$
$$\\mathbf{f_r = \\frac{1}{2\\pi\\sqrt{LC}}}$$

**২. গুণক গুণমান ($Q$):**
$$Q = \\frac{\\omega_r L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$$
তাৎপর্য: $Q$-ফ্যাক্টর যত বেশি হবে, অনুনাদ রেখাচিত্র তত তীক্ষ্ণ ও সংকেত নির্বাচনের দক্ষতা তত উন্নত হবে।`,
    difficulty: "Hard",
    isSampleData: true,
  },

  // ==========================================
  // 2018 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2018_hist_revolt",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2018,
    subject: "History",
    chapter: "Early Stages of Collective Action (সংঘবদ্ধতার গোড়ার কথা)",
    topic: "Revolt of 1857: Nature and Characteristics",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "Analyze the nature and character of the Great Revolt of 1857 in India. Was it a Sepoy Mutiny or the First War of Independence?",
    questionBengali: "১৮৫৭ খ্রিস্টাব্দের মহাবিদ্রোহের চরিত্র ও প্রকৃতি বিশ্লেষণ করো। এটি কি কেবল সিপাহি বিদ্রোহ ছিল নাকি প্রথম স্বাধীনতা সংগ্রাম?",
    solution: `**১. বিতর্ক:** ব্রিটিশ ঐতিহাসিকেরা একে নিছক সিপাহি অসন্তোষ বললেও বিনায়ক দামোদর সাভারকর একে **'প্রথম স্বাধীনতা সংগ্রাম'** বলেছেন।
**২. বিস্তার:** সিপাহিদের পাশাপাশি কৃষক, কারিগর ও সাধারণ জনগণ ইংরেজ শাসন উচ্ছেদে সক্রিয়ভাবে অংশ নিয়েছিল।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2018_chem_coord",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2018,
    subject: "Chemistry",
    chapter: "Coordination Compounds (জটিল যৌগ)",
    topic: "Crystal Field Theory (CFT) & Magnetic Moment",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "Explain the Crystal Field Splitting of d-orbitals in an octahedral coordination entity. Why is [CoF₆]³⁻ paramagnetic while [Co(NH₃)₆]³⁺ is diamagnetic?",
    questionBengali: "অষ্টতলকীয় ক্ষেত্রে d-কক্ষকের ক্রিস্টাল ফিল্ড বিভাজন ব্যাখ্যা করো। [CoF₆]³⁻ কেন প্যারাম্যাগনেটিক কিন্তু [Co(NH₃)₆]³⁺ ডায়াম্যাগনেটিক?",
    solution: `**১. ক্রিস্টাল ফিল্ড বিভাজন:** অষ্টতলকীয় ক্ষেত্রে পাঁচটি $d$-কক্ষক নিম্নশক্তির তিনটি $t_{2g}$ এবং উচ্চশক্তির দুটি $e_g$ কক্ষকে বিভক্ত হয়।
**২. কারণ:**
- $\\text{F}^-$ দুর্বল লিগ্যান্ড, ফলে ক্রিস্টাল ফিল্ড শক্তি কম ($\\Delta_o < P$), তাই হাই-স্পিন $t_{2g}^4 e_g^2$ বিন্যাসে ৪টি অযুগ্ম ইলেকট্রন থাকে $\\to$ **প্যারাম্যাগনেটিক**।
- $\\text{NH}_3$ তীব্র লিগ্যান্ড ($\\Delta_o > P$), ফলে লো-স্পিন $t_{2g}^6 e_g^0$ বিন্যাসে কোনো অযুগ্ম ইলেকট্রন থাকে না $\\to$ **ডায়াম্যাগনেটিক**।`,
    difficulty: "Hard",
    isSampleData: true,
  },

  // ==========================================
  // 2017 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2017_life_chromosome",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2017,
    subject: "Life Science",
    chapter: "Continuity of Life (জীবনের ধারাবাহিকতা)",
    topic: "Structure of Chromosome & DNA vs RNA",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Draw a neat labelled diagram of a eukaryotic chromosome. Differentiate between DNA and RNA.",
    questionBengali: "একটি আদর্শ ইউক্যারিওটিক ক্রোমোজোমের চিত্র অঙ্কন করে বিভিন্ন অংশ চিহ্নিত করো। ডিএনএ ও আরএনএ-র তিনটি পার্থক্য লেখো।",
    solution: `**১. অংশসমূহ:** সেন্ট্রোমিয়ার, ক্রোমাটিড, টেলোমিয়ার ও গৌণ খাঁজ।
**২. DNA ও RNA পার্থক্য:**
- DNA তে ডিঅক্সিরাইবোজ শর্করা ও থাইমিন থাকে; RNA তে রাইবোজ শর্করা ও ইউরাসিল থাকে।
- DNA দ্বি-তন্ত্রী পেঁচানো সিঁড়ির মতো; RNA এক-তন্ত্রী।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2017_math_vectors",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2017,
    subject: "Mathematics",
    chapter: "Vector Algebra & 3D Geometry (ভেক্টর ও ত্রিমাত্রিক জ্যামিতি)",
    topic: "Shortest Distance between Two Skew Lines",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Find the shortest distance between the skew lines: r₁ = (i + 2j + 3k) + λ(2i + 3j + 4k) and r₂ = (2i + 4j + 5k) + μ(3i + 4j + 5k).",
    questionBengali: "দুটি বিষমতলীয় সরলরেখার মধ্যে ক্ষুদ্রতম দূরত্ব নির্ণয় করো: r₁ = (i + 2j + 3k) + λ(2i + 3j + 4k) এবং r₂ = (2i + 4j + 5k) + μ(3i + 4j + 5k)।",
    solution: `**Step 1:** $\\vec{a}_1 = \\hat{i}+2\\hat{j}+3\\hat{k}, \\vec{b}_1 = 2\\hat{i}+3\\hat{j}+4\\hat{k}$
$\\vec{a}_2 = 2\\hat{i}+4\\hat{j}+5\\hat{k}, \\vec{b}_2 = 3\\hat{i}+4\\hat{j}+5\\hat{k}$.
$\\vec{a}_2 - \\vec{a}_1 = \\hat{i}+2\\hat{j}+2\\hat{k}$.

**Step 2:** $\\vec{b}_1 \\times \\vec{b}_2 = \\begin{vmatrix}\\hat{i}&\\hat{j}&\\hat{k}\\\\2&3&4\\\\3&4&5\\end{vmatrix} = \\hat{i}(15-16) - \\hat{j}(10-12) + \\hat{k}(8-9) = -\\hat{i}+2\\hat{j}-\\hat{k}$.
$|\\vec{b}_1 \\times \\vec{b}_2| = \\sqrt{(-1)^2 + 2^2 + (-1)^2} = \\sqrt{6}$.

**Step 3:** Shortest distance $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|} = \\frac{|1(-1) + 2(2) + 2(-1)|}{\\sqrt{6}} = \\frac{|-1 + 4 - 2|}{\\sqrt{6}} = \\mathbf{\\frac{1}{\\sqrt{6}} \\text{ units}}$.`,
    difficulty: "Medium",
    isSampleData: true,
  },

  // ==========================================
  // 2016 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2016_geo_monsoon",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2016,
    subject: "Geography",
    chapter: "India: Climate, Soil & Natural Vegetation",
    topic: "Indian Monsoon mechanism & Western Disturbances",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Explain the mechanism of Indian Southwest Monsoon. What are Western Disturbances and their importance in winter agriculture?",
    questionBengali: "ভারতের দক্ষিণ-পশ্চিম মৌসুমি বায়ুর আগমন প্রক্রিয়া আলোচনা করো। পশ্চিমী ঝঞ্ঝা কী এবং শীতকালীন কৃষিকাজে এর গুরুত্ব কী?",
    solution: `**১. মৌসুমি বায়ুর আগমন:** গ্রীষ্মকালে তিব্বত ও উত্তর ভারতে নিম্নচাপ বলয় তৈরি হলে ভারত মহাসাগরের উচ্চচাপ অঞ্চল থেকে দক্ষিণ-পশ্চিম মৌসুমি বায়ু ভারতে প্রবেশ করে।
**২. পশ্চিমী ঝঞ্ঝা:** শীতকালে ভূমধ্যসাগর থেকে আগত জেট বায়ুর কারণে উত্তর ভারতে হালকা বৃষ্টিপাত হয় যা রবিশস্য (বিশেষত গম) চাষের জন্য অত্যন্ত উপকারী।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2016_phys_photoelec",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2016,
    subject: "Physics",
    chapter: "Dual Nature of Radiation and Matter",
    topic: "Einstein's Photoelectric Equation & Stopping Potential",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "State Einstein's Photoelectric Equation. Explain how it successfully explains threshold frequency, kinetic energy independence on intensity, and instantaneous emission.",
    questionBengali: "আইনস্টাইনের আলোক-তড়িৎ সমীকরণটি লেখো। এটি কীভাবে সূচনা কম্পাঙ্ক, তীব্রতার ওপর গতিশক্তির অনপেক্ষতা ও তাৎক্ষণিক নিঃসরণ ব্যাখ্যা করে?",
    solution: `**১. সমীকরণ:** $h\\nu = W_0 + K_{\\max} = h\\nu_0 + \\frac{1}{2}mv_{\\max}^2 = h\\nu_0 + eV_0$.
**২. ব্যাখ্যা:**
- যদি আপতিত আলোর কম্পাঙ্ক $\\nu < \\nu_0$ হয়, তবে ইলেকট্রন নির্গত হতে পারে না।
- ইলেকট্রনের সর্বোচ্চ গতিশক্তি $K_{\\max} = h(\\nu - \\nu_0)$ শুধুমাত্র কম্পাঙ্কের ওপর নির্ভর করে, আলোর তীব্রতার ওপর নয়।
- আলোর ফোটন ও ধাতব ইলেকট্রনের সংঘাত সম্পূর্ণ স্থিতিস্থাপক ও তাৎক্ষণিক ($10^{-9}$ সেকেন্ডে ঘটে)।`,
    difficulty: "Easy",
    isSampleData: true,
  },

  // ==========================================
  // 2015 (WBBSE Madhyamik & WBCHSE Higher Secondary)
  // ==========================================
  {
    id: "pyq_mp_2015_bengali_bohurupi",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2015,
    subject: "Bengali",
    chapter: "বহুরূপী - সুবোধ ঘোষ",
    topic: "হরিদার বৈরাগী সাজ ও আত্মমর্যাদা",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "'হরিদার জীবনে সত্যিই একটা নাটকীয় বৈচিত্র্য আছে' - হরিদার চরিত্রের নাটকীয় বৈচিত্র্য এবং জগদীশবাবুর দেওয়া টাকা প্রত্যাখ্যানের তাৎপর্য লেখো।",
    questionBengali: "'হরিদার জীবনে সত্যিই একটা নাটকীয় বৈচিত্র্য আছে' - হরিদার চরিত্রের নাটকীয় বৈচিত্র্য এবং জগদীশবাবুর দেওয়া টাকা প্রত্যাখ্যানের তাৎপর্য লেখো।",
    solution: `**১. নাটকীয় বৈচিত্র্য:** হরিদা বাঁধা ছকের জীবন ঘৃণা করতেন। বহুরূপী সেজে পাগল, বাইজি বা সন্ন্যাসী হয়ে মানুষকে আনন্দ দেওয়াই ছিল তাঁর নেশা।
**২. টাকা প্রত্যাখ্যান:** জগদীশবাবু ১০০ টাকা দিতে চাইলেও হরিদা বলেন—"খাঁটি বৈরাগীর ভেক ধরে লোভী হওয়া সন্ন্যাসীর ধর্মের অপমান।" শিল্পের সততাই হরিদার জীবনের চরম সম্পদ।`,
    difficulty: "Easy",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2015_chem_organic",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2015,
    subject: "Chemistry",
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    topic: "Aldol Condensation & Cannizzaro Reaction Mechanisms",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Differentiate between Aldol Condensation and Cannizzaro Reaction with suitable chemical equations and reaction conditions.",
    questionBengali: "উপযুক্ত রাসায়নিক সমীকরণ ও শর্তসহ অ্যালডল ঘনীভবন ও ক্যানিজারো বিক্রিয়ার মধ্যে পার্থক্য নিরূপণ করো।",
    solution: `**১. অ্যালডল ঘনীভবন (Aldol Condensation):**
- $\\alpha$-হাইড্রোজেনযুক্ত অ্যালডিহাইড বা কিটোন লঘু ক্ষারের (NaOH) উপস্থিতিতে পরস্পর যুক্ত হয়ে $\\beta$-হাইড্রক্সি অ্যালডিহাইড গঠন করে।
$$2\\text{CH}_3\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO}$$

**২. ক্যানিজারো বিক্রিয়া (Cannizzaro Reaction):**
- $\\alpha$-হাইড্রোজেনহীন অ্যালডিহাইড গাঢ় ক্ষারের (৫০% KOH) উপস্থিতিতে স্বতঃ জারণ-বিজারণের মাধ্যমে অ্যালকোহল ও কার্বক্সিলিক অ্যাসিড লবণে পরিণত হয়।
$$2\\text{HCHO} + \\text{conc. KOH} \\to \\text{CH}_3\\text{OH} + \\text{HCOOK}$$`,
    difficulty: "Medium",
    isSampleData: true,
  },
];
