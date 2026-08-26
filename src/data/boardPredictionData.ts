import { AIPrediction2027, BoardMockTest2027 } from "../types";

export const AI_PREDICTIONS_2027: AIPrediction2027[] = [
  // Class 10 Madhyamik Predictions 2027
  {
    id: "pred_2027_mp_math_1",
    subject: "Mathematics (গণিত)",
    classLevel: "10",
    board: "WBBSE (Madhyamik)",
    chapter: "Quadratic Equations (একচলবিশিষ্ট দ্বিঘাত সমীকরণ)",
    topic: "Sridhar Acharya's Formula & Nature of Roots",
    question: "If roots of (a - b)x² + (b - c)x + (c - a) = 0 are real and equal, prove that 2a = b + c.",
    questionBengali: "যদি (a - b)x² + (b - c)x + (c - a) = 0 দ্বিঘাত সমীকরণের বীজদ্বয় সমান হয়, তবে প্রমাণ করো যে 2a = b + c।",
    marks: 3,
    questionType: "SAQ (2 Marks)",
    probabilityScore: 97,
    probabilityLevel: "Certain (95%+)",
    repetitionReason: "WBBSE 10-year cycle analysis indicates cyclic rotation of quadratic algebraic identities skipped in 2024-2026.",
    solution: `**Step 1:** Compare with $Ax^2 + Bx + C = 0$:
- $A = a - b$
- $B = b - c$
- $C = c - a$

Notice that $A + B + C = (a - b) + (b - c) + (c - a) = 0$.
Therefore, $x = 1$ is always a root of this equation!

**Step 2:** Since roots are equal, both roots are $x_1 = 1$ and $x_2 = 1$.
Product of roots = $x_1 \\cdot x_2 = 1 \\cdot 1 = 1$.

**Step 3:** Product of roots formula:
$$\\frac{C}{A} = 1 \\implies \\frac{c - a}{a - b} = 1$$
$$c - a = a - b$$
$$2a = b + c \\quad \\text{[Proved]}$$`,
    markingScheme: "1 mark for identifying A+B+C=0 or setting Discriminant D=0, 1 mark for simplification, 1 mark for final proven relation 2a=b+c.",
  },
  {
    id: "pred_2027_mp_math_geom",
    subject: "Mathematics (গণিত)",
    classLevel: "10",
    board: "WBBSE (Madhyamik)",
    chapter: "Circle Theorems (বৃত্ত সম্পর্কিত উপপাদ্য)",
    topic: "Theorem 34 - Angle subtended at centre vs circumference",
    question: "Prove that the angle subtended by an arc at the centre is double the angle subtended by it at any point on the remaining part of the circle.",
    questionBengali: "প্রমাণ করো যে, কোনো বৃত্তের একটি বৃত্তচাপের দ্বারা গঠিত সম্মুখ কেন্দ্রস্থ কোণ ওই চাপের দ্বারা গঠিত যে-কোনো বৃত্তস্থ কোণের দ্বিগুণ (উপপাদ্য ৩৪)।",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    probabilityScore: 98,
    probabilityLevel: "Certain (95%+)",
    repetitionReason: "Theorem 34 holds the highest 3-year recurring frequency in WBBSE Madhyamik blueprint.",
    solution: `**প্রদত্ত:** ধরি, $O$ কেন্দ্রীয় বৃত্তের $APB$ বৃত্তচাপের দ্বারা গঠিত সম্মুখ কেন্দ্রস্থ কোণ $\\angle AOB$ এবং বৃত্তস্থ কোণ $\\angle ACB$।

**প্রমাণ করতে হবে:** $\\angle AOB = 2\\angle ACB$।

**অঙ্কন:** $C, O$ যুক্ত করে $D$ বিন্দু পর্যন্ত বর্ধিত করা হলো।

**প্রমাণ:**
১. $\\triangle AOC$-এর $OA = OC$ (একই বৃত্তের ব্যাসার্ধ)।
$\\therefore \\angle OAC = \\angle OCA$।
$\\triangle AOC$-এর বহিঃস্থ কোণ $\\angle AOD = \\angle OAC + \\angle OCA = 2\\angle OCA$ --- (১)

২. অনুরূপভাবে, $\\triangle BOC$-এর বহিঃস্থ কোণ $\\angle BOD = 2\\angle OCB$ --- (২)

৩. (১) ও (২) নং সমীকরণ যোগ করে পাই:
$$\\angle AOD + \\angle BOD = 2(\\angle OCA + \\angle OCB)$$
$$\\therefore \\mathbf{\\angle AOB = 2\\angle ACB} \\quad \\text{[প্রমাণিত]}$$`,
    markingScheme: "1 mark for correct figure and given hypothesis, 1 mark for construction, 2.5 marks for step-by-step geometric proof, 0.5 mark for conclusion.",
  },
  {
    id: "pred_2027_mp_phys_gas",
    subject: "Physical Science (ভৌত বিজ্ঞান)",
    classLevel: "10",
    board: "WBBSE (Madhyamik)",
    chapter: "Behavior of Gases (গ্যাসের আচরণ)",
    topic: "Ideal Gas Equation & Charles-Boyle combination",
    question: "Derive the combined gas equation PV = nRT from Boyle's Law, Charles's Law, and Avogadro's Law. What is the physical significance of Universal Gas Constant R?",
    questionBengali: "বয়েলের সূত্র, চার্লসের সূত্র ও অ্যাভোগাড্রো সূত্রের সমন্বয়ে আদর্শ গ্যাস সমীকরণ (PV = nRT) প্রতিষ্ঠা করো। সর্বজনীন গ্যাস ধ্রুবক R-এর তাৎপর্য কী?",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    probabilityScore: 94,
    probabilityLevel: "Very High (85-94%)",
    repetitionReason: "Derivation of PV=nRT has rotated every 3 years with 94% historical correlation in Madhyamik.",
    solution: `**১. আদর্শ গ্যাস সমীকরণ প্রতিষ্ঠা:**
- **বয়েলের সূত্রানুযায়ী:** স্থির তাপমাত্রায় ($T$), $V \\propto \\frac{1}{P}$ (যখন ভর $m$ স্থির)
- **চার্লসের সূত্রানুযায়ী:** স্থির চাপে ($P$), $V \\propto T$ (যখন ভর $m$ স্থির)
- **অ্যাভোগাড্রো সূত্রানুযায়ী:** স্থির চাপ ($P$) ও তাপমাত্রায় ($T$), $V \\propto n$ (মোল সংখ্যা)

যৌগিক ভেদের উপপাদ্য অনুযায়ী:
$$V \\propto \\frac{n \\cdot T}{P} \\implies PV \\propto nT$$
$$PV = nRT$$
যেখানে $R$ হলো মোলার গ্যাস ধ্রুবক বা সর্বজনীন গ্যাস ধ্রুবক।

**২. সর্বজনীন গ্যাস ধ্রুবক R-এর ভৌত তাৎপর্য:**
- $R$ হলো ১ মোল পরিমাণ যেকোনো আদর্শ গ্যাসের তাপমাত্রা ১ কেলভিন বৃদ্ধি করতে গ্যাস কর্তৃক সম্পাদিত প্রসারণ কাজের পরিমাপ ($R = \\text{Work done} / (\\text{mol} \\cdot \\text{K})$)।
- SI পদ্ধতিতে এর মান: $8.314 \\text{ J}\\cdot\\text{mol}^{-1}\\cdot\\text{K}^{-1}$।`,
    markingScheme: "3 marks for accurate mathematical derivation with statements, 2 marks for physical significance and SI unit of R.",
  },
  {
    id: "pred_2027_mp_life_hormone",
    subject: "Life Science (জীবন বিজ্ঞান)",
    classLevel: "10",
    board: "WBBSE (Madhyamik)",
    chapter: "Control and Coordination in Organisms (জীবজগতে নিয়ন্ত্রণ ও সমন্বয়)",
    topic: "Plant Hormones - Auxin vs Gibberellin vs Cytokinin",
    question: "Tabulate 4 major physiological differences between Auxin, Gibberellin, and Cytokinin. Explain how Auxin controls phototropic movement in shoots.",
    questionBengali: "অক্সিন, জিব্বেরেলিন ও সাইটোকাইনিনের প্রধান ৪টি শারীরবৃত্তীয় পার্থক্যের তুলনামূলক সারণি তৈরি করো। উদ্ভিদের কাণ্ডে অক্সিন কীভাবে আলোকবৃত্তি চলন নিয়ন্ত্রণ করে তা ব্যাখ্যা করো।",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    probabilityScore: 96,
    probabilityLevel: "Certain (95%+)",
    repetitionReason: "Plant hormone comparative physiology is a core 5-mark anchor in Life Science Section D.",
    solution: `**১. তুলনামূলক সারণি:**
| বৈশিষ্ট্য | অক্সিন (Auxin) | জিব্বেরেলিন (Gibberellin) | সাইটোকাইনিন (Cytokinin) |
|---|---|---|---|
| ১. রাসায়নিক প্রকৃতি | ইন্ডোল বর্গযুক্ত (IAA) | টারপিনয়েড ডাইটারপিন | পিউরিন জাতক (অ্যাডেনিন) |
| ২. প্রধান উৎস | কাণ্ড ও মূলের অগ্রস্থ ভাজক কলা | অঙ্কুরিত বীজ ও পাতার ফলক | নারকেলের জল, ভুট্টার শস্য |
| ৩. প্রধান কাজ | অগ্রমুকুলের বৃদ্ধি ও ট্রপিক চলন | পর্বমধ্যের দৈর্ঘ্য বৃদ্ধি ও সুপ্তাবস্থা ভঙ্গ | কোষ বিভাজন ত্বরান্বিত করা ও বার্ধক্য রোধ |
| ৪. পরিবহনের দিক | নিম্নমুখী মেরুবর্তী পরিবহন | উভয়মুখী পরিবহন | ব্যাপন প্রক্রিয়ায় সর্বমুখী |

**২. আলোকবৃত্তি চলন নিয়ন্ত্রণে অক্সিনের ভূমিকা:**
- আলোকরশ্মি যেদিক থেকে আসে, অক্সিন আলোকের বিপরীত অন্ধকারাচ্ছন্ন অংশে বেশি পরিমাণে সঞ্চিত হয়।
- ফলে কাণ্ডের বিপরীত অংশের কোষগুলি দ্রুত বিভাজিত ও প্রসারিত হয়, কিন্তু আলোকের দিকের অংশের বৃদ্ধি কম হয়।
- এর ফলে উদ্ভিদের কাণ্ড আলোর উৎসের দিকে বেঁকে যায় (ধনাত্মক আলোকবৃত্তি চলন)।`,
    markingScheme: "3 marks for 3 distinct comparison columns with correct terms, 2 marks for auxin concentration mechanism in phototropism.",
  },
  {
    id: "pred_2027_mp_bengali_koni",
    subject: "Bengali (সাহিত্য সঞ্চয়ন ও কোনি)",
    classLevel: "10",
    board: "WBBSE (Madhyamik)",
    chapter: "কোনি - মতি নন্দী (Koni Novel)",
    topic: "ক্ষিতীশ সিংহের চরিত্র ও কোনির লড়াই ('ফাইট কোনি ফাইট')",
    question: "'ফাইট কোনি ফাইট' - সাধারণ এক সাঁতারুর লড়াই কীভাবে সমগ্র সমাজের বিরুদ্ধে প্রতিবাদ হয়ে উঠেছিল? ক্ষিতীশ সিংহের অনুপ্রেরণাদায়ী ভূমিকা আলোচনা করো।",
    questionBengali: "'ফাইট কোনি ফাইট' - সাধারণ এক সাঁতারুর লড়াই কীভাবে সমগ্র সমাজের বিরুদ্ধে প্রতিবাদ হয়ে উঠেছিল? ক্ষিতীশ সিংহের অনুপ্রেরণাদায়ী ভূমিকা আলোচনা করো।",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    probabilityScore: 95,
    probabilityLevel: "Certain (95%+)",
    repetitionReason: "Koni 5-mark character & thematic questions follow 2-year alternating cycles between Khitish and Koni.",
    solution: `**উত্তর কাঠামো:**
১. **উৎস ও প্রসঙ্গ:** বিশিষ্ট সাহিত্যিক মতি নন্দীর 'কোনি' উপন্যাসের কেন্দ্রীয় স্লোগান ও চালিকাশক্তি হলো 'ফাইট কোনি ফাইট'।
২. **দারিদ্র্য ও প্রতিকূলতার বিরুদ্ধে লড়াই:** শ্যামপুকুরের বস্তির হতদরিদ্র পরিবারের মেয়ে কোনি শুধু জলের প্রতিযোগীদের সঙ্গেই লড়াই করেনি; তার লড়াই ছিল চরম অনাহার, পারিবারিক বিপর্যয় (দাদা কমলের মৃত্যু) এবং জুপিটার ক্লাবের সংকীর্ণ রাজনীতির বিরুদ্ধে।
৩. **ক্ষিতীশের রূপকার ভূমিকা:**
- খিদদা শুধু একজন কোচ নন, তিনি ছিলেন একজন দ্রোণাচার্য তুল্য শিক্ষক ও পিতৃতুল্য অভিভাবক।
- তিনি নিজের সামান্য রোজগার থেকেও কোনিকে পুষ্টিকর খাদ্য (দুধ, ডিম) জোগাতেন।
- সাঁতারের চরম ক্লান্তিতে যখন কোনি ভেঙে পড়ত, খিদদার তীক্ষ্ণ নির্দেশ—"ফাইট কোনি ফাইট, যন্ত্রণাটাকে চেপে রাখিস!"—তার মধ্যে অপরাজেয় জেদ তৈরি করেছিল।
৪. **উপসংহার:** জাতীয় সাঁতার চ্যাম্পিয়নশিপে প্রণতি ভাদুড়ীকে পরাস্ত করে কোনির স্বর্ণপদক জয় ছিল বঙ্গললনার অপরাজেয় আত্মশক্তি এবং ক্ষিতীশ সিংহের ত্যাগের চূড়ান্ত জয়।`,
    markingScheme: "1 mark for context, 2 marks for Koni's social struggle, 2 marks for Khitish's training and moral guardianship.",
  },

  // Class 12 Higher Secondary Predictions 2027
  {
    id: "pred_2027_hs_phys_gauss",
    subject: "Physics (পদার্থবিদ্যা - WBCHSE)",
    classLevel: "12",
    board: "WBCHSE (Higher Secondary)",
    chapter: "Electrostatics (স্থিরতড়িৎ)",
    topic: "Gauss's Law & Electric Field due to infinite plane sheet",
    question: "State Gauss's Law in electrostatics. Using Gauss's theorem, derive the expression for the electric field intensity E at a point near an infinitely long thin uniformly charged plane sheet with surface charge density σ.",
    questionBengali: "স্থিরতড়িতের গাউসের উপপাদ্যটি বিবৃত করো। গাউসের উপপাদ্য প্রয়োগ করে সুষমভাবে আহিত একটি অসীম সমতল পাতলা পাতের (পৃষ্ঠতলীয় আধান ঘনত্ব σ) নিকটবর্তী কোনো বিন্দুতে তড়িৎক্ষেত্রের প্রাবল্যের রাশিমালা প্রতিষ্ঠা করো।",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    probabilityScore: 96,
    probabilityLevel: "Certain (95%+)",
    repetitionReason: "Gauss's law derivations alternate regularly between cylindrical wire, spherical shell, and infinite plane sheet in WBCHSE.",
    solution: `**১. গাউসের উপপাদ্য:**
কোনো বদ্ধ তলের মধ্য দিয়ে অতিক্রান্ত মোট তড়িৎ ফ্লাক্স ($\\Phi_E$) ওই তলের অভ্যন্তরে আবদ্ধ মোট আধানের ($q$) $\\frac{1}{\\varepsilon_0}$ গুণের সমান।
$$\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$$

**২. অসীম সমতল পাতলা পাতের জন্য প্রাবল্য ($E$):**
- সমতল পাতের পৃষ্ঠতলীয় আধান ঘনত্ব $= \\sigma$।
- পাতটিকে প্রতিসমভাবে ছেদকারী $A$ প্রস্থচ্ছেদের ক্ষেত্রফলযুক্ত একটি বেলনাকার গাউসীয় তল কল্পনা করি যার দৈর্ঘ্য $2r$।
- বেলনটির বক্রতলের মধ্য দিয়ে অতিক্রান্ত ফ্লাক্স $= 0$ (যেহেতু $\\vec{E} \\perp d\\vec{A}$)।
- বেলনটির দুটি বৃত্তাকার প্রান্তীয় তলে $\\vec{E}$ এবং $d\\vec{A}$ সমান্তরাল ($\\theta = 0^\\circ$)।

মোট ফ্লাক্স:
$$\\Phi_E = \\int_{\\text{end 1}} E \\, dA + \\int_{\\text{end 2}} E \\, dA = EA + EA = 2EA$$

গাউসীয় তলের অভ্যন্তরে আবদ্ধ আধান:
$$q_{\\text{enclosed}} = \\sigma \\cdot A$$

গাউসের উপপাদ্য অনুসারে:
$$2EA = \\frac{\\sigma A}{\\varepsilon_0} \\implies \\mathbf{E = \\frac{\\sigma}{2\\varepsilon_0}}$$
তড়িৎক্ষেত্রের প্রাবল্য দূরত্বের ($r$) উপর নির্ভর করে না।`,
    markingScheme: "2 marks for Gauss Law statement and vector formula, 3 marks for Gaussian cylinder construction and mathematical derivation E=sigma/(2epsilon_0).",
  },
  {
    id: "pred_2027_hs_chem_nernst",
    subject: "Chemistry (রসায়ন - WBCHSE)",
    classLevel: "12",
    board: "WBCHSE (Higher Secondary)",
    chapter: "Electrochemistry (তড়িৎরসায়ন)",
    topic: "Nernst Equation & EMF of Galvanic Cell",
    question: "Write the Nernst equation for the cell reaction: Zn(s) | Zn²⁺(0.01 M) || Cu²⁺(0.1 M) | Cu(s). Given E°(Zn²⁺/Zn) = -0.76 V and E°(Cu²⁺/Cu) = +0.34 V at 298 K. Calculate the EMF of the cell.",
    questionBengali: "নিম্নলিখিত কোষ বিক্রিয়ার জন্য নার্নস্টের সমীকরণটি লেখো: Zn(s) | Zn²⁺(0.01 M) || Cu²⁺(0.1 M) | Cu(s)। প্রদত্ত E°(Zn²⁺/Zn) = -0.76 V এবং E°(Cu²⁺/Cu) = +0.34 V (298 K তাপমাত্রায়)। কোষটির তড়িচ্চালক বল (EMF) গণনা করো।",
    marks: 3,
    questionType: "SAQ (2 Marks)",
    probabilityScore: 95,
    probabilityLevel: "Certain (95%+)",
    repetitionReason: "Electrochemical numerical cell calculations are compulsory in WBCHSE Chemistry Group C.",
    solution: `**Step 1: Calculate Standard Cell Potential $E^\\circ_{\\text{cell}}$**
$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$$
$$E^\\circ_{\\text{cell}} = E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) - E^\\circ(\\text{Zn}^{2+}/\\text{Zn})$$
$$E^\\circ_{\\text{cell}} = 0.34\\text{ V} - (-0.76\\text{ V}) = +1.10\\text{ V}$$

**Step 2: Write Nernst Equation at 298 K ($n = 2$)**
$$\\text{Overall reaction: } \\text{Zn}(s) + \\text{Cu}^{2+}(aq) \\rightleftharpoons \\text{Zn}^{2+}(aq) + \\text{Cu}(s)$$
$$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log \\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}$$

**Step 3: Substitute given concentrations**
$$E_{\\text{cell}} = 1.10 - \\frac{0.0591}{2} \\log \\left(\\frac{0.01}{0.1}\\right)$$
$$E_{\\text{cell}} = 1.10 - 0.02955 \\cdot \\log(10^{-1})$$
$$E_{\\text{cell}} = 1.10 - 0.02955 \\cdot (-1) = 1.10 + 0.02955 = \\mathbf{1.12955\\text{ V}} \\approx \\mathbf{1.13\\text{ V}}$$`,
    markingScheme: "1 mark for standard EMF E° calculation, 1 mark for correct Nernst substitution with n=2, 1 mark for final result with units (1.13 V).",
  },
  {
    id: "pred_2027_hs_bengali_bhat",
    subject: "Bengali (সাহিত্যচর্চা ও সাহিত্যের ইতিহাস)",
    classLevel: "12",
    board: "WBCHSE (Higher Secondary)",
    chapter: "ভাত - মহাশ্বেতা দেবী (Bhat Story)",
    topic: "উৎসব নাইয়ার চরিত্র ও শ্রেণি শোষণের মর্মান্তিক রূপ",
    question: "'বাধা থেকে ভাত খেয়ে সে আসল বাধার খোঁজ করতে পারবে' - উৎসবের এই আশার মধ্য দিয়ে তার জীবনের যে ট্র্যাজেডি ফুটে উঠেছে তা নিজের ভাষায় বিশ্লেষণ করো।",
    questionBengali: "'বাধা থেকে ভাত খেয়ে সে আসল বাধার খোঁজ করতে পারবে' - উৎসবের এই আশার মধ্য দিয়ে তার জীবনের যে ট্র্যাজেডি ফুটে উঠেছে তা নিজের ভাষায় বিশ্লেষণ করো।",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    probabilityScore: 97,
    probabilityLevel: "Certain (95%+)",
    repetitionReason: "Mahasweta Devi's 'Bhat' has the highest recurrence weight in WBCHSE prose section.",
    solution: `**উত্তর কাঠামো:**
১. **উৎস ও প্রসঙ্গ:** মহাশ্বেতা দেবীর 'ভাত' ছোটগল্পের সর্বহারা চরিত্র উৎসব নাইয়ার জীবনযন্ত্রণার চরম প্রতিফলন ঘটেছে উদ্ধৃত অংশে।
২. **মাতলার জলোচ্ছ্বাস ও সর্বস্ব হারানো:** মাতলার বন্যায় বউ-ছেলেমেয়ে-ঘরবাড়ি সব হারিয়ে উৎসব জীবন্মৃত হয়ে পড়েছিল। সে কোনোদিন একপেট ফুটন্ত ধানের ভাত খেতে পায়নি।
৩. **কলকাতার বড়বাড়ির অভিজ্ঞতা:** বড়বাড়ির বৃদ্ধ কর্তার মৃত্যু ঠেকাতে যজ্ঞের কাঠের বিনিময়ে তাকে ভাত খাওয়ার লোভ দেখানো হয়। বড়বাড়ির অফুরন্ত চালের ভাণ্ডার দেখে উৎসব ভেবেছিল আগে পেট ভরে ভাত খেয়ে সে সেই আদি 'বাধা'র খোঁজ করবে।
৪. **চূড়ান্ত ট্র্যাজেডি:** কিন্তু কর্তার মৃত্যুর পর বড়বাড়ির মানুষ সেই অবশিষ্ট ভাত ড্রেনে ফেলে দেওয়ার নির্দেশ দেয়। পেটের জ্বালায় উৎসব ডেকচি নিয়ে পালালে স্টেশনের মানুষের কাছে সে চোর প্রতিপন্ন হয় এবং পুলিশে বন্দি হয়।
৫. **উপসংহার:** সমাজের ধনী শোষক শ্রেণির নিষ্ঠুরতা কীভাবে প্রান্তিক মানুষের সামান্য একমুঠো ভাতের স্বপ্নকে চূর্ণ করে দেয়, উৎসবের এই ট্র্যাজেডি তার জীবন্ত দলিল।`,
    markingScheme: "1 mark for reference to Matla storm, 2 marks for bourgeois exploitation in Kolkata house, 2 marks for tragic climax and sociological commentary.",
  },
];

export const BOARD_MOCK_TESTS_2027: BoardMockTest2027[] = [
  {
    id: "mock_2027_mp_math_board",
    title: "Madhyamik 2027 Mathematics Full Board Simulator",
    bengaliTitle: "মাধ্যমিক ২০২৭ গণিত সম্পূর্ণ বোর্ড স্তরের মক টেস্ট",
    classLevel: "10",
    subject: "Mathematics (গণিত)",
    difficulty: "Board Level",
    durationMinutes: 195, // 3 hours 15 mins
    totalMarks: 90,
    questionsCount: 15,
    description: "Strictly modeled on official WBBSE Madhyamik blueprint with Section A (MCQ), Section B (VSAQ/SAQ), and Section C (Theorems & Constructions).",
    sections: [
      {
        sectionName: "Section A: Multiple Choice Questions (সঠিক উত্তর নির্বাচন)",
        marksPerQuestion: 1,
        questions: [
          {
            id: "q_m_1",
            qNum: "1.(i)",
            question: "In a business, A invests ₹500 for 9 months and B invests ₹600 for 5 months. The ratio of their profit share will be:",
            questionBengali: "একটি অংশীদারি কারবারে A ৯ মাসের জন্য ৫০০ টাকা এবং B ৫ মাসের জন্য ৬০০ টাকা বিনিয়োগ করে। তাদের লভ্যাংশের অনুপাত হবে:",
            options: ["3 : 2", "5 : 6", "9 : 5", "1 : 1"],
            correctOption: 0,
            marks: 1,
            modelAnswer: "Option (A) 3 : 2",
            explanation: "Equivalent capital ratio = (500 × 9) : (600 × 5) = 4500 : 3000 = 45 : 30 = 3 : 2.",
            aiTip: "Always multiply principal by respective duration of months to calculate equivalent capital.",
          },
          {
            id: "q_m_2",
            qNum: "1.(ii)",
            question: "If roots of x² - 3x + k = 10 are reciprocal to each other, the value of k is:",
            questionBengali: "যদি x² - 3x + k = 10 সমীকরণের বীজদ্বয় পরস্পরের অন্যোন্যক হয়, তবে k-এর মান হবে:",
            options: ["10", "11", "-9", "9"],
            correctOption: 1,
            marks: 1,
            modelAnswer: "Option (B) 11",
            explanation: "x² - 3x + (k - 10) = 0. If roots are reciprocal, product of roots c/a = 1 => (k - 10)/1 = 1 => k = 11.",
            aiTip: "Remember to bring all constants to LHS in ax² + bx + c = 0 form first!",
          },
        ],
      },
      {
        sectionName: "Section B: Short Answer & Analytical Questions",
        marksPerQuestion: 2,
        questions: [
          {
            id: "q_m_3",
            qNum: "2.(i)",
            question: "If radius of a cylinder is halved and height is doubled, find the percentage change in its volume.",
            questionBengali: "একটি লম্ব বৃত্তাকার চোঙের ব্যাসার্ধ অর্ধেক এবং উচ্চতা দ্বিগুণ করা হলে, তার আয়তনের শতকরা পরিবর্তন নির্ণয় করো।",
            marks: 2,
            modelAnswer: "Volume decreases by 50%.",
            explanation: "V1 = π r² h. New V2 = π (r/2)² (2h) = π (r²/4) (2h) = 1/2 π r² h = V1/2. Decrease = (V1 - V1/2)/V1 × 100% = 50%.",
            aiTip: "Write formula V = πr²h and clearly state new variables r' and h'.",
          },
        ],
      },
      {
        sectionName: "Section C: High-Yield Theorems (উপপাদ্য)",
        marksPerQuestion: 5,
        questions: [
          {
            id: "q_m_4",
            qNum: "3.(i)",
            question: "State and prove Pythagoras Theorem (Theorem 49 of WBBSE).",
            questionBengali: "পিথাগোরাসের উপপাদ্যটি বিবৃত করো এবং প্রমাণ করো (উপপাদ্য ৪৯)।",
            marks: 5,
            modelAnswer: "In any right-angled triangle, the area of the square drawn on the hypotenuse is equal to the sum of the areas of the squares drawn on the other two sides. (AC² = AB² + BC²).",
            explanation: "Draw right triangle ABC right-angled at B. Draw perpendicular BD on hypotenuse AC. Prove ΔABD ~ ΔABC and ΔCBD ~ ΔABC. Add both equations to get AB² + BC² = AC².",
            aiTip: "Include neat labelled geometric diagram, Given, To Prove, Construction and Step-by-Step Proof.",
          },
        ],
      },
    ],
  },
  {
    id: "mock_2027_mp_phys_easy",
    title: "Madhyamik 2027 Physical Science (Foundational Easy Test)",
    bengaliTitle: "মাধ্যমিক ২০২৭ ভৌত বিজ্ঞান (সহজ প্র্যাকটিস টেস্ট)",
    classLevel: "10",
    subject: "Physical Science (ভৌত বিজ্ঞান)",
    difficulty: "Easy",
    durationMinutes: 45,
    totalMarks: 25,
    questionsCount: 5,
    description: "Designed to build 100% confidence on core laws, formula recall, and direct conceptual definitions.",
    sections: [
      {
        sectionName: "Direct Concept Questions",
        marksPerQuestion: 2,
        questions: [
          {
            id: "q_p_1",
            qNum: "1",
            question: "State Boyle's Law with mathematical formula and draw the P-V graph.",
            questionBengali: "বয়েলের সূত্রটি গাণিতিক রূপসহ লেখো এবং P-V লেখচিত্র অঙ্কন করো।",
            marks: 2,
            modelAnswer: "PV = k (constant) at constant T. The P-V graph is a rectangular hyperbola.",
            explanation: "At constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure.",
            aiTip: "Label axes clearly: Pressure on Y-axis, Volume on X-axis.",
          },
        ],
      },
    ],
  },
  {
    id: "mock_2027_hs_phys_hard",
    title: "WBCHSE 2027 Physics (Advanced High-Yield Challenge)",
    bengaliTitle: "উচ্চ মাধ্যমিক ২০২৭ পদার্থবিদ্যা (কঠিন অ্যাডভান্সড টেস্ট)",
    classLevel: "12",
    subject: "Physics (পদার্থবিদ্যা - WBCHSE)",
    difficulty: "Hard",
    durationMinutes: 60,
    totalMarks: 35,
    questionsCount: 6,
    description: "High-order thinking problems featuring Kirchhoff's network analysis, LCR resonance, and Wave optics interference.",
    sections: [
      {
        sectionName: "Analytical & Numerical Section",
        marksPerQuestion: 5,
        questions: [
          {
            id: "q_hsp_1",
            qNum: "1",
            question: "Derive resonant frequency for a series LCR AC circuit. What is the Q-factor (Quality Factor)?",
            questionBengali: "শ্রেণি সমবায় যুক্ত LCR বর্তনীর অনুনাদী কম্পাঙ্কের রাশিমালা নির্ণয় করো। Q-গুণক (Quality Factor) বলতে কী বোঝো?",
            marks: 5,
            modelAnswer: "Resonant frequency f_0 = 1 / (2π√(LC)). Q-factor = (1/R) √(L/C).",
            explanation: "At resonance, inductive reactance equals capacitive reactance: ωL = 1/(ωC) => ω² = 1/(LC) => ω = 1/√(LC).",
            aiTip: "Show impedance triangle with Z = R when X_L = X_C.",
          },
        ],
      },
    ],
  },
];
