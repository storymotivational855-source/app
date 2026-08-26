import { SubjectInfo, PrimaryActivity, PYQuestion } from "../types";

export const ALL_CLASSES = [
  { level: "1", label: "Class 1 (প্রথম শ্রেণী)", category: "primary" as const, age: "6-7 yrs" },
  { level: "2", label: "Class 2 (দ্বিতীয় শ্রেণী)", category: "primary" as const, age: "7-8 yrs" },
  { level: "3", label: "Class 3 (তৃতীয় শ্রেণী)", category: "primary" as const, age: "8-9 yrs" },
  { level: "4", label: "Class 4 (চতুর্থ শ্রেণী)", category: "primary" as const, age: "9-10 yrs" },
  { level: "5", label: "Class 5 (পঞ্চম শ্রেণী)", category: "primary" as const, age: "10-11 yrs" },
  { level: "6", label: "Class 6 (ষষ্ঠ শ্রেণী)", category: "secondary" as const, age: "11-12 yrs" },
  { level: "7", label: "Class 7 (সপ্তম শ্রেণী)", category: "secondary" as const, age: "12-13 yrs" },
  { level: "8", label: "Class 8 (অষ্টম শ্রেণী)", category: "secondary" as const, age: "13-14 yrs" },
  { level: "9", label: "Class 9 (নবম শ্রেণী)", category: "secondary" as const, age: "14-15 yrs" },
  { level: "10", label: "Class 10 (মাধ্যমিক - WBBSE)", category: "madhyamik" as const, age: "15-16 yrs" },
  { level: "11", label: "Class 11 (একাদশ - WBCHSE)", category: "hs" as const, age: "16-17 yrs" },
  { level: "12", label: "Class 12 (উচ্চ মাধ্যমিক - WBCHSE)", category: "hs" as const, age: "17-18 yrs" },
];

export const SUBJECTS: SubjectInfo[] = [
  // Class 1 - 5 Subjects
  {
    id: "primary_bengali",
    name: "Bengali (সহজ পাঠ / পাতাবাহার)",
    bengaliName: "বাংলা (সহজ পাঠ ও পাতাবাহার)",
    hindiName: "बंगाली भाषा",
    iconName: "BookOpen",
    color: "bg-emerald-500",
    classes: [1, 2, 3, 4, 5],
    chapters: [
      { id: "p_bn_1", name: "স্বরবর্ণ ও ব্যঞ্জনবর্ণ (Bengali Alphabets)", bengaliName: "স্বরবর্ণ ও ব্যঞ্জনবর্ণ", topics: ["অ আ ই ঈ", "ক খ গ ঘ", "শব্দ তৈরি"] },
      { id: "p_bn_2", name: "সহজ পাঠ - প্রথম ও দ্বিতীয় ভাগ", bengaliName: "সহজ পাঠ পাঠ্যাংশ", topics: ["ছোটদের ছড়া", "গল্প পাঠ", "সহজ বানান"] },
      { id: "p_bn_3", name: "পাতাবাহার গল্প ও কবিতা", bengaliName: "পাতাবাহার", topics: ["রবীন্দ্রনাথ ঠাকুরের কবিতা", "নজরুল ইসলামের ছড়া", "শব্দার্থ"] },
      { id: "p_bn_4", name: "বাংলা ব্যাকরণ ও রচনা", bengaliName: "সহজ ব্যাকরণ", topics: ["বিশেষ্য ও ক্রিয়া", "বিপরীত শব্দ", "সমার্থক শব্দ"] },
    ],
  },
  {
    id: "primary_english",
    name: "English (Butterfly / Wings)",
    bengaliName: "ইংরেজি (Butterfly ও Wings)",
    hindiName: "अंग्रेजी बुनियादी",
    iconName: "Languages",
    color: "bg-blue-500",
    classes: [1, 2, 3, 4, 5],
    chapters: [
      { id: "p_en_1", name: "Alphabet & Phonics (A-Z)", bengaliName: "বর্ণমালা ও ধ্বনিবিজ্ঞান", topics: ["Capital & Small letters", "Phonics sounds", "Sight words"] },
      { id: "p_en_2", name: "My Family & Animals", bengaliName: "আমার পরিবার ও পশুপাখি", topics: ["Domestic & Wild animals", "Birds & Insects", "Family members"] },
      { id: "p_en_3", name: "Basic Grammar & Vocabulary", bengaliName: "সহজ ব্যাকরণ", topics: ["Nouns & Pronouns", "Action Verbs", "Articles A/An/The"] },
      { id: "p_en_4", name: "Rhymes & Short Stories", bengaliName: "ছড়া ও ছোট গল্প", topics: ["Nursery rhymes", "Moral stories", "Picture reading"] },
    ],
  },
  {
    id: "primary_math",
    name: "Mathematics (আমার গণিত)",
    bengaliName: "আমার গণিত (Mathematics)",
    hindiName: "प्रारंभिक गणित",
    iconName: "Calculator",
    color: "bg-amber-500",
    classes: [1, 2, 3, 4, 5],
    chapters: [
      { id: "p_math_1", name: "Numbers & Counting (1-100 & ১-১০০)", bengaliName: "সংখ্যা ও গণনা", topics: ["Counting objects", "Number names", "Before/After numbers"] },
      { id: "p_math_2", name: "Addition & Subtraction (যোগ ও বিয়োগ)", bengaliName: "সহজ যোগ ও বিয়োগ", topics: ["Single digit add/sub", "Carry-over addition", "Word problems"] },
      { id: "p_math_3", name: "Multiplication & Division (গুণ ও ভাগ)", bengaliName: "নামতা, গুণ ও ভাগ", topics: ["Multiplication tables (1-10)", "Repeated addition", "Equal sharing"] },
      { id: "p_math_4", name: "Shapes, Money & Time (আকার, টাকা ও সময়)", bengaliName: "জ্যামিতি, মুদ্রা ও ঘড়ি", topics: ["2D Shapes", "Indian currency notes", "Reading clock"] },
    ],
  },
  {
    id: "primary_env",
    name: "Our Environment (আমাদের পরিবেশ)",
    bengaliName: "আমাদের পরিবেশ (EVS)",
    hindiName: "हमारा पर्यावरण",
    iconName: "Trees",
    color: "bg-teal-500",
    classes: [1, 2, 3, 4, 5],
    chapters: [
      { id: "p_env_1", name: "Body Parts & Good Habits", bengaliName: "আমাদের শরীর ও স্বাস্থ্যবিধি", topics: ["Sense organs", "Cleanliness", "Healthy foods"] },
      { id: "p_env_2", name: "Plants, Trees & Water", bengaliName: "উদ্ভিদ ও জল", topics: ["Parts of plant", "Water sources", "Saving water"] },
      { id: "p_env_3", name: "West Bengal Culture & Festivals", bengaliName: "বাংলার উৎসব ও সংস্কৃতি", topics: ["Durga Puja", "Nabanna", "Folk dances of Bengal"] },
    ],
  },
  {
    id: "primary_hindi",
    name: "Hindi Basics (हिंदी वर्णमाला)",
    bengaliName: "হিন্দি বর্ণমালা ও সহজ শব্দ",
    hindiName: "हिंदी भाषा एवं वर्णमाला",
    iconName: "Sparkles",
    color: "bg-rose-500",
    classes: [1, 2, 3, 4, 5],
    chapters: [
      { id: "p_hi_1", name: "Swar & Vyanjan (स्वर व व्यंजन)", bengaliName: "স্বর ও ব্যঞ্জন", topics: ["अ से अः", "क से ज्ञ", "मात्रा ज्ञान"] },
      { id: "p_hi_2", name: "Simple Hindi Words (सरल शब्द)", bengaliName: "সহজ হিন্দি শব্দ", topics: ["2 & 3 letter words", "Animals & Fruits names", "Sentences"] },
    ],
  },

  // Class 6 - 10 Secondary / WBBSE Subjects
  {
    id: "sec_bengali",
    name: "Bengali (সাহিত্য সঞ্চয়ন ও ব্যাকরণ - First Language)",
    bengaliName: "বাংলা প্রথম ভাষা (সাহিত্য সঞ্চয়ন, কোনি ও ব্যাকরণ)",
    hindiName: "बंगाली प्रथम भाषा",
    iconName: "BookOpen",
    color: "bg-emerald-600",
    isMadhyamikCore: true,
    classes: [6, 7, 8, 9, 10],
    chapters: [
      { id: "bn_ch_1", name: "জ্ঞানচক্ষু - আশাপূর্ণা দেবী (Gyan Chakshu)", bengaliName: "জ্ঞানচক্ষু (গল্প)", topics: ["তপনের লেখক হওয়া", "ছোটমাসি ও ছোটমেসোর চরিত্র", "সন্ধ্যাতারা পত্রিকায় প্রকাশ", "আত্মমর্যাদাবোধ ও তপনের সংকল্প"] },
      { id: "bn_ch_2", name: "বহুরূপী - সুবোধ ঘোষ (Bahurupi)", bengaliName: "বহুরূপী (গল্প)", topics: ["হরিদার চরিত্র ও পেশা", "জগদীশবাবুর বাড়ি সাধু রূপ", "বাইজি রূপ ও পুলিশ সেজে মাস্টারমশাইকে বোকা বানানো", "হরিদার সততা"] },
      { id: "bn_ch_3", name: "নদীর বিদ্রোহ - মানিক বন্দ্যোপাধ্যায় (Nadir Bidroho)", bengaliName: "নদীর বিদ্রোহ (গল্প)", topics: ["নদেরচাঁদের নদীপ্রীতি", "ব্রিজের উপর বর্ষণমুখর নদীর রূপ", "মানুষের তৈরি বাঁধ বনাম নদীর বিদ্রোহ", "নদেরচাঁদের পরিণতি"] },
      { id: "bn_ch_4", name: "অস্ত্রের বিরুদ্ধে গান - জয় গোস্বামী (Astrer Biruddhe Gaan)", bengaliName: "অস্ত্রের বিরুদ্ধে গান (কবিতা)", topics: ["যুদ্ধবিরোধী মানবিক চেতনা", "গানের বর্মে আত্মরক্ষা", "কবির বার্তা ও রূপক অর্থ"] },
      { id: "bn_ch_5", name: "আফ্রিকা ও অসুখী একজন (Africa & Asukhi Ekjon)", bengaliName: "আফ্রিকা ও অসুখী একজন (কবিতা)", topics: ["রবীন্দ্রনাথ ঠাকুরের আফ্রিকা কবিতা", "সাম্রাজ্যবাদী শক্তির অত্যাচার", "পাবলো নেরুদার অসুখী একজন", "যুদ্ধের ধ্বংসলীলা"] },
      { id: "bn_ch_6", name: "সিন্ধুতীরে ও প্রলয়োল্লাস (Sindhutire & Pralayollas)", bengaliName: "সিন্ধুতীরে ও প্রলয়োল্লাস (কবিতা)", topics: ["সৈয়দ আলাওলের পদ্মাবতী উদ্ধার", "কাজী নজরুল ইসলামের প্রলয়োল্লাস", "বিপ্লবী চেতনা ও নবজাগরণ"] },
      { id: "bn_ch_7", name: "কোনি - মতী নন্দী (Koni - সহায়ক পাঠ)", bengaliName: "কোনি (সহায়ক পাঠ - উপন্যাস)", topics: ["ক্ষিতীশ সিংহের চরিত্র ও লড়াই", "কোনির দারিদ্র্য ও সাঁতার সাধনা", "'কোনি তোর আসল লজ্জা জ্বলে', 'ফাইট কোনি ফাইট'", "জাতীয় সাঁতার প্রতিযোগিতায় জয়"] },
      { id: "bn_ch_8", name: "বাংলা ব্যাকরণ ও নির্মিতি (Madhyamik Grammar & Writing)", bengaliName: "বাংলা ব্যাকরণ ও নির্মিতি", topics: ["কারক ও অকারক সম্পর্ক (বিভক্তি ও অনুসর্গ)", "সমাস (দ্বন্দ্ব, দ্বিগু, তৎপুরুষ, বহুব্রীহি, কর্মধারয়)", "বাক্য পরিবর্তন ও বাচ্য", "প্রতিবেদন রচনা ও বঙ্গানুবাদ"] },
    ],
  },
  {
    id: "sec_math",
    name: "Mathematics (গণিত প্রকাশ)",
    bengaliName: "গণিত প্রকাশ (Mathematics)",
    hindiName: "गणित प्रकाश",
    iconName: "Calculator",
    color: "bg-indigo-600",
    classes: [6, 7, 8, 9, 10],
    chapters: [
      { id: "m_ch_1", name: "Quadratic Equations with one variable (একচলবিশিষ্ট দ্বিঘাত সমীকরণ)", bengaliName: "একচলবিশিষ্ট দ্বিঘাত সমীকরণ", topics: ["ax²+bx+c=0 form", "Factorisation method", "Sridhar Acharya's formula", "Nature of roots"] },
      { id: "m_ch_2", name: "Simple & Compound Interest (সরল ও চক্রবৃদ্ধি সুদ)", bengaliName: "সরল সুদকষা ও চক্রবৃদ্ধি সুদ", topics: ["I = Prt/100", "Amount calculation", "Uniform rate of growth/depreciation"] },
      { id: "m_ch_3", name: "Theorems related to Circle (বৃত্ত সম্পর্কিত উপপাদ্য)", bengaliName: "বৃত্ত সম্পর্কিত উপপাদ্য", topics: ["Angle at centre & circumference", "Cyclic quadrilateral", "Tangents to a circle"] },
      { id: "m_ch_4", name: "Ratio and Proportion (অনুপাত ও সমানুপাত)", bengaliName: "অনুপাত ও সমানুপাত", topics: ["Componendo & Dividendo", "Continued proportion", "Word problems"] },
      { id: "m_ch_5", name: "Trigonometry (ত্রিকোণমিতি - কোণ ও অনুপাত)", bengaliName: "ত্রিকোণমিতি", topics: ["Trigonometric ratios (sin, cos, tan)", "Complementary angles", "Heights and Distances"] },
      { id: "m_ch_6", name: "Mensuration (পরিমিতি - ঘনক, চোঙ, গোলক, শঙ্কু)", bengaliName: "পরিমিতি", topics: ["Right circular cylinder", "Sphere & Hemisphere", "Right circular cone"] },
      { id: "m_ch_7", name: "Statistics (রাশিবিজ্ঞান - গড়, মধ্যমা, ওজাইভ, সংখ্যাগুরুমান)", bengaliName: "রাশিবিজ্ঞান", topics: ["Mean (Direct & Assumed)", "Median", "Mode", "Ogive graph"] },
    ],
  },
  {
    id: "sec_physci",
    name: "Physical Science (ভৌত বিজ্ঞান ও পরিবেশ)",
    bengaliName: "ভৌত বিজ্ঞান ও পরিবেশ",
    hindiName: "भौतिक विज्ञान एवं पर्यावरण",
    iconName: "Atom",
    color: "bg-cyan-600",
    classes: [6, 7, 8, 9, 10],
    chapters: [
      { id: "ps_ch_1", name: "Concerns about Our Environment (পরিবেশের জন্য ভাবনা)", bengaliName: "পরিবেশের জন্য ভাবনা", topics: ["Ozone layer depletion", "Greenhouse effect & Global warming", "Non-conventional energy"] },
      { id: "ps_ch_2", name: "Behavior of Gases (গ্যাসের আচরণ)", bengaliName: "গ্যাসের আচরণ", topics: ["Boyle's law", "Charles's law", "Ideal gas equation PV=nRT", "Avogadro's hypothesis"] },
      { id: "ps_ch_3", name: "Chemical Calculations (রাসায়নিক গণনা)", bengaliName: "রাসায়নিক গণনা", topics: ["Stoichiometry", "Conservation of mass", "Mole concept"] },
      { id: "ps_ch_4", name: "Thermal Phenomena (তাপের ঘটনা সমূহ)", bengaliName: "তাপের ঘটনা সমূহ", topics: ["Thermal expansion of solids, liquids, gases", "Thermal conductivity"] },
      { id: "ps_ch_5", name: "Light (আলো)", bengaliName: "আলো", topics: ["Refraction through prism & lens", "Dispersion of light", "Scattering & Rainbow formation"] },
      { id: "ps_ch_6", name: "Current Electricity (চলতড়িৎ)", bengaliName: "চলতড়িৎ", topics: ["Ohm's law & Resistance", "Joule's law of heating", "Electric power & kilowatt-hour"] },
      { id: "ps_ch_7", name: "Atomic Nucleus (পরমাণুর নিউক্লিয়াস)", bengaliName: "পরমাণুর নিউক্লিয়াস", topics: ["Radioactivity (Alpha, Beta, Gamma)", "Nuclear Fission & Fusion", "Mass-energy equivalence"] },
      { id: "ps_ch_8", name: "Periodic Table & Chemical Bonding (পর্যায় সারণি ও রাসায়নিক বন্ধন)", bengaliName: "পর্যায় সারণি ও বন্ধন", topics: ["Mendeleev & Modern Periodic Table", "Periodic trends", "Ionic & Covalent bonding"] },
    ],
  },
  {
    id: "sec_lifesci",
    name: "Life Science (জীবন বিজ্ঞান ও পরিবেশ)",
    bengaliName: "জীবন বিজ্ঞান ও পরিবেশ",
    hindiName: "जीव विज्ञान एवं पर्यावरण",
    iconName: "Dna",
    color: "bg-emerald-600",
    classes: [6, 7, 8, 9, 10],
    chapters: [
      { id: "ls_ch_1", name: "Control and Coordination in Living Organisms (জীবজগতে নিয়ন্ত্রণ ও সমন্বয়)", bengaliName: "জীবজগতে নিয়ন্ত্রণ ও সমন্বয়", topics: ["Plant hormones (Auxin, Gibberellin)", "Animal endocrine glands", "Reflex arc & Human eye"] },
      { id: "ls_ch_2", name: "Continuity of Life (জীবনের ধারাবাহিকতা)", bengaliName: "জীবনের ধারাবাহিকতা", topics: ["Chromosome structure", "Mitosis & Meiosis cell division", "Reproduction in plants & animals"] },
      { id: "ls_ch_3", name: "Heredity and Common Genetic Diseases (বংশগতি এবং কয়েকটি সাধারণ জিনগত রোগ)", bengaliName: "বংশগতি ও জিনগত রোগ", topics: ["Mendel's Laws (Monohybrid & Dihybrid)", "Thalassemia", "Hemophilia & Color blindness"] },
      { id: "ls_ch_4", name: "Evolution and Adaptation (অভিব্যক্তি ও অভিযোজন)", bengaliName: "অভিব্যক্তি ও অভিযোজন", topics: ["Lamarckism vs Darwinism", "Homologous & Analogous organs", "Cactus, Sundari & Camel adaptation"] },
      { id: "ls_ch_5", name: "Environment, Its Resources and Their Conservation (পরিবেশ, তার সম্পদ এবং তাদের সংরক্ষণ)", bengaliName: "পরিবেশ ও তার সংরক্ষণ", topics: ["Nitrogen cycle", "Pollution causes & effects", "Biodiversity hotspots & In-situ/Ex-situ conservation"] },
    ],
  },
  {
    id: "sec_history",
    name: "History (ইতিহাস ও পরিবেশ)",
    bengaliName: "ইতিহাস ও পরিবেশ",
    hindiName: "इतिहास एवं पर्यावरण",
    iconName: "Landmark",
    color: "bg-amber-700",
    classes: [6, 7, 8, 9, 10],
    chapters: [
      { id: "hist_ch_1", name: "Ideas of History (ইতিহাসের ধারণা)", bengaliName: "ইতিহাসের ধারণা", topics: ["New social history", "History of food, sports, attire", "Visual & local history"] },
      { id: "hist_ch_2", name: "Reforms: Characteristics & Observations (সংস্কার: বৈশিষ্ট্য ও পর্যালোচনা)", bengaliName: "সংস্কার আন্দোলন ও পর্যালোচনা", topics: ["19th century Bengal Renaissance", "Raja Ram Mohan Roy", "Iswar Chandra Vidyasagar", "Brahmo Samaj"] },
      { id: "hist_ch_3", name: "Resistance and Rebellion: Characteristics and Analyses (প্রতিরোধ ও বিদ্রোহ)", bengaliName: "প্রতিরোধ ও বিদ্রোহ", topics: ["Santhal Rebellion", "Indigo Revolt (নীল বিদ্রোহ)", "Wahabi & Faraizi movements"] },
      { id: "hist_ch_4", name: "Early Stages of Collective Action (সংঘবদ্ধতার গোড়ার কথা)", bengaliName: "সংঘবদ্ধতার গোড়ার কথা", topics: ["Revolt of 1857 (মহাবিদ্রোহ)", "Hindu Mela", "Bharat Sabha & National awakening"] },
      { id: "hist_ch_5", name: "Alternative Ideas & Initiatives in Bengal (বিকল্প চিন্তা ও উদ্যোগ)", bengaliName: "বিকল্প চিন্তা ও উদ্যোগ", topics: ["Printing press in Bengal", "Visva-Bharati & Rabindranath", "Bengal Technical Institute"] },
    ],
  },
  {
    id: "sec_geo",
    name: "Geography (ভূগোল ও পরিবেশ)",
    bengaliName: "ভূগোল ও পরিবেশ",
    hindiName: "भूगोल एवं पर्यावरण",
    iconName: "Globe2",
    color: "bg-blue-700",
    classes: [6, 7, 8, 9, 10],
    chapters: [
      { id: "geo_ch_1", name: "Exogenetic Processes and Landforms (বহির্জাত প্রক্রিয়া ও তাদের দ্বারা সৃষ্ট ভূমিরূপ)", bengaliName: "বহির্জাত প্রক্রিয়া ও ভূমিরূপ", topics: ["Work of Rivers (ক্ষয় ও সঞ্চয়)", "Glaciers landforms", "Wind actions in deserts"] },
      { id: "geo_ch_2", name: "Atmosphere (বায়ুমণ্ডল)", bengaliName: "বায়ুমণ্ডল", topics: ["Layers of atmosphere", "Global wind systems", "Monsoon mechanism in Bengal/India"] },
      { id: "geo_ch_3", name: "Hydrosphere (বারিমণ্ডল)", bengaliName: "বারিমণ্ডল", topics: ["Ocean currents (Gulf Stream, Kuroshio)", "Tides (জোয়ার-ভাটা)"] },
      { id: "geo_ch_4", name: "India: Physical, Economic & West Bengal Geography (ভারত ও পশ্চিমবঙ্গ)", bengaliName: "ভারত ও পশ্চিমবঙ্গ ভূগোল", topics: ["Physiography of West Bengal", "Rivers of Bengal (Ganga, Teesta)", "Agriculture (Jute, Tea, Rice)", "Industries & Transport"] },
    ],
  },
  {
    id: "sec_eng",
    name: "English (Bliss / Second Language)",
    bengaliName: "ইংরেজি (Bliss পাঠ্যপুস্তক)",
    hindiName: "अंग्रेजी (ब्लिस)",
    iconName: "BookA",
    color: "bg-violet-600",
    classes: [6, 7, 8, 9, 10],
    chapters: [
      { id: "eng_ch_1", name: "Father's Help by R.K. Narayan", bengaliName: "Father's Help", topics: ["Swami's dilemma", "Samuel the teacher", "Theme analysis & questions"] },
      { id: "eng_ch_2", name: "Fable by Ralph Waldo Emerson", bengaliName: "Fable", topics: ["Mountain and Squirrel debate", "Poetic devices", "Comprehension"] },
      { id: "eng_ch_3", name: "The Passing Away of Bapu by Nayantara Sahgal", bengaliName: "The Passing Away of Bapu", topics: ["Gandhiji's final journey", "Emotional resonance", "Textual Q&A"] },
      { id: "eng_ch_4", name: "Grammar & Writing Skills (WBBSE Pattern)", bengaliName: "ব্যাকরণ ও লিখন দক্ষতা", topics: ["Voice & Narration Change", "Clause joining", "Notice Writing", "Report Writing", "Letter Writing"] },
    ],
  },

  // Class 11 - 12 Higher Secondary / WBCHSE Subjects
  {
    id: "hs_bengali",
    name: "Bengali (সাহিত্যচর্চা ও ভাষা - WBCHSE First Language)",
    bengaliName: "উচ্চ মাধ্যমিক বাংলা (সাহিত্যচর্চা, ভাষা ও সাহিত্যের ইতিহাস)",
    hindiName: "उच्च माध्यमिक बंगाली प्रथम भाषा",
    iconName: "BookOpen",
    color: "bg-emerald-600",
    classes: [11, 12],
    stream: "General",
    chapters: [
      { id: "hs_bn_1", name: "রূপনারায়ণের কূলে - রবীন্দ্রনাথ ঠাকুর (Rupnarayaner Kule)", bengaliName: "রূপনারায়ণের কূলে (কবিতা)", topics: ["'রক্তের অক্ষরে দেখিলাম আপনার রূপ'", "কঠিন সত্য ও মৃত্যুর মধ্য দিয়ে তপস্যার সাফল্য", "কবির আত্মোপলব্ধি"] },
      { id: "hs_bn_2", name: "শিকার ও মহুয়ার দেশ (Shikar & Mohuar Desh)", bengaliName: "শিকার ও মহুয়ার দেশ (কবিতা)", topics: ["জীবনানন্দ দাশের শিকার (ভোরের রূপ ও হরিণের ট্র্যাজেডি)", "সমর সেনের মহুয়ার দেশ (নাগরিক ক্লান্তি বনাম মহুয়ার বন)"] },
      { id: "hs_bn_3", name: "ভাত ও ভারতবর্ষ (Bhat & Bharatbarsho)", bengaliName: "ভাত ও ভারতবর্ষ (ছোটগল্প)", topics: ["মহাশ্বেতা দেবীর 'ভাত' (উৎসব নাইয়ার অন্ন সংস্থানের আকুতি)", "সৈয়দ মুস্তাফা সিরাজের 'ভারতবর্ষ' (সাম্প্রদায়িক সম্প্রীতি ও বুড়ির স্বরূপ)"] },
      { id: "hs_bn_4", name: "বিভাব ও নানা রঙের দিন (Drama / নাটক)", bengaliName: "বিভাব ও নানা রঙের দিন (নাটক)", topics: ["শম্ভু মিত্রের বিভাব (বিকল্প অভিনয় পদ্ধতি ও শোষণ)", "অজিতেশ বন্দ্যোপাধ্যায়ের নানা রঙের দিন (রজনীকান্তের জীবনের স্মৃতি ও থিয়েটার)"] },
      { id: "hs_bn_5", name: "বাঙালির শিল্প সাহিত্য ও সংস্কৃতির ইতিহাস (Art & Culture of Bengal)", bengaliName: "বাঙালির শিল্প ও সংস্কৃতি", topics: ["বাংলা গানের ধারা (রবীন্দ্রনাথ, দ্বিজেন্দ্রলাল, কাজী নজরুল)", "বাঙালির চলচ্চিত্র (সত্যজিৎ রায়, ঋত্বিক ঘটক, মৃণাল সেন)", "বাঙালির চিত্রকলা (যামিনী রায়, নন্দলাল বসু)", "বাঙালির বিজ্ঞানচর্চা (জগদীশচন্দ্র বসু, প্রফুল্লচন্দ্র রায়)", "বাঙালির ক্রীড়াসংস্কৃতি (ফুটবল, সাঁতার)"] },
      { id: "hs_bn_6", name: "বাংলা ভাষা ও ভাষাতত্ত্ব (Linguistics & Grammar)", bengaliName: "বাংলা ভাষা ও ভাষাতত্ত্ব", topics: ["ধ্বনিমূল ও সহধ্বনি", "রূপমূল (মুুক্ত ও আবদ্ধ রূপমূল)", "বাক্যতত্ত্ব (গঠন ও অর্থগত)", "শব্দার্থের রূপান্তর ও পরিবর্তনের ধারা"] },
    ],
  },
  {
    id: "hs_eng",
    name: "English (Mindscapes - WBCHSE Second Language)",
    bengaliName: "ইংরেজি (Mindscapes পাঠ্যপুস্তক)",
    hindiName: "उच्च माध्यमिक अंग्रेजी",
    iconName: "Languages",
    color: "bg-blue-600",
    classes: [11, 12],
    stream: "General",
    chapters: [
      { id: "hs_en_1", name: "The Eyes Have It by Ruskin Bond", bengaliName: "The Eyes Have It (Prose)", topics: ["Blind narrator and the girl on train", "Irony of blindness", "Character analysis & questions"] },
      { id: "hs_en_2", name: "Strong Roots by APJ Abdul Kalam", bengaliName: "Strong Roots (Autobiography)", topics: ["Kalam's childhood in Rameswaram", "Father Jainulabdeen's wisdom", "Spiritual prayers & harmony"] },
      { id: "hs_en_3", name: "Thank You, Ma'am by Langston Hughes", bengaliName: "Thank You, Ma'am (Prose)", topics: ["Mrs. Luella Bates Washington Jones", "Roger the boy", "Compassion, dignity and reform"] },
      { id: "hs_en_4", name: "Asleep in the Valley by Arthur Rimbaud", bengaliName: "Asleep in the Valley (Poetry)", topics: ["Young soldier asleep in sunlit valley", "Anti-war theme", "Two red holes in his side"] },
      { id: "hs_en_5", name: "Shall I Compare Thee to a Summer's Day? (Sonnet 18)", bengaliName: "Sonnet 18 (Poetry)", topics: ["Shakespearean sonnet", "Eternal beauty in poetry", "Theme of time vs art"] },
      { id: "hs_en_6", name: "HS English Writing & Grammar", bengaliName: "ইংরেজি রচনা ও ব্যাকরণ", topics: ["Official Letter & Editorial Letter", "Event Report Writing", "Summary / Precis Writing", "Transformation of Sentences"] },
    ],
  },
  {
    id: "hs_phys",
    name: "Physics (পদার্থবিদ্যা - WBCHSE)",
    bengaliName: "পদার্থবিদ্যা (Physics)",
    hindiName: "भौतिकी (Physics)",
    iconName: "Zap",
    color: "bg-amber-600",
    classes: [11, 12],
    stream: "Science",
    chapters: [
      { id: "hsp_1", name: "Electrostatics & Capacitance (স্থিরতড়িৎ ও ধারকত্ব)", bengaliName: "স্থিরতড়িৎ", topics: ["Coulomb's law", "Gauss's theorem & applications", "Capacitor series/parallel combinations"] },
      { id: "hsp_2", name: "Current Electricity & Circuits (প্রবাহমাত্রার সূত্র ও রোধ)", bengaliName: "প্রবাহী তড়িৎ", topics: ["Kirchhoff's laws", "Wheatstone Bridge & Meter Bridge", "Potentiometer"] },
      { id: "hsp_3", name: "Electromagnetism & Induction (তড়িৎচৌম্বকীয় আবেশ)", bengaliName: "তড়িৎচুম্বকত্ব ও আবেশ", topics: ["Biot-Savart Law", "Ampere's Circuital law", "Faraday & Lenz's law", "AC Generator & Transformer"] },
      { id: "hsp_4", name: "Optics (Ray & Wave) (আলোকবিজ্ঞান)", bengaliName: "আলোকবিজ্ঞান", topics: ["Total internal reflection", "Lens maker's formula", "Huygens' Principle", "Young's Double Slit Experiment"] },
      { id: "hsp_5", name: "Modern Physics & Semiconductor Electronics (আধুনিক পদার্থবিদ্যা)", bengaliName: "আধুনিক পদার্থবিজ্ঞান ও ইলেকট্রনিক্স", topics: ["Photoelectric effect (Einstein Eq)", "Bohr model of Hydrogen", "p-n junction diode & Logic gates"] },
    ],
  },
  {
    id: "hs_chem",
    name: "Chemistry (রসায়ন - WBCHSE)",
    bengaliName: "রসায়ন (Chemistry)",
    hindiName: "रसायन शास्त्र",
    iconName: "FlaskConical",
    color: "bg-teal-600",
    classes: [11, 12],
    stream: "Science",
    chapters: [
      { id: "hsc_1", name: "Solid State & Solutions (কঠিন অবস্থা ও দ্রবণ)", bengaliName: "দ্রবণ ও কঠিন অবস্থা", topics: ["Crystal lattices & unit cells", "Raoult's Law & Colligative properties", "Osmotic pressure"] },
      { id: "hsc_2", name: "Electrochemistry & Chemical Kinetics (তড়িৎরসায়ন ও রাসায়নিক গতিবিদ্যা)", bengaliName: "তড়িৎরসায়ন ও গতিবিদ্যা", topics: ["Nernst Equation", "Kohlrausch's law", "Rate law & Arrhenius equation"] },
      { id: "hsc_3", name: "p-Block & d/f-Block Elements (মৌলসমূহের রসায়ন)", bengaliName: "অজৈব রসায়ন", topics: ["Group 15-18 elements", "Transition metals oxidation states", "Coordination compounds isomerism"] },
      { id: "hsc_4", name: "Organic Chemistry (জৈব রসায়ন - Haloalkanes, Aldehydes, Amines)", bengaliName: "জৈব রসায়ন", topics: ["SN1 and SN2 mechanisms", "Aldol condensation & Cannizzaro reaction", "Diazonium salts", "Biomolecules (Glucose, Amino acids)"] },
    ],
  },
  {
    id: "hs_math",
    name: "Mathematics (উচ্চতর গণিত - WBCHSE)",
    bengaliName: "উচ্চতর গণিত (Calculus, Vectors, Probability)",
    hindiName: "उच्च गणित",
    iconName: "Sigma",
    color: "bg-blue-600",
    classes: [11, 12],
    stream: "Science",
    chapters: [
      { id: "hsm_1", name: "Relations, Functions & Matrices/Determinants", bengaliName: "ম্যাট্রিক্স, নির্ণায়ক ও অপেক্ষক", topics: ["Inverse Trigonometric Functions", "Matrix Multiplication & Inversion", "Cramer's Rule"] },
      { id: "hsm_2", name: "Differential Calculus (অন্তরকলন)", bengaliName: "অন্তরকলন", topics: ["Continuity & Differentiability", "Chain rule & implicit differentiation", "Maxima and Minima"] },
      { id: "hsm_3", name: "Integral Calculus & Differential Equations (সমাকলন ও অবকল সমীকরণ)", bengaliName: "সমাকলন ও অবকল সমীকরণ", topics: ["Integration by parts & substitution", "Definite Integrals properties", "Linear differential equations"] },
      { id: "hsm_4", name: "Vectors & 3D Geometry (ভেক্টর ও ত্রিমাত্রিক স্থানাঙ্ক)", bengaliName: "ভেক্টর ও ত্রিমাত্রিক জ্যামিতি", topics: ["Dot & Cross product", "Shortest distance between two skew lines", "Plane equation"] },
      { id: "hsm_5", name: "Probability & Linear Programming (সম্ভাবনা ও রৈখিক প্রোগ্রামিং)", bengaliName: "সম্ভাবনা ও LPP", topics: ["Conditional Probability & Bayes' Theorem", "LPP graphical method"] },
    ],
  },
  {
    id: "hs_bio",
    name: "Biological Sciences (জীববিদ্যা - WBCHSE)",
    bengaliName: "জীববিদ্যা (Biology)",
    hindiName: "जीव विज्ञान (Biology)",
    iconName: "Microscope",
    color: "bg-emerald-700",
    classes: [11, 12],
    stream: "Science",
    chapters: [
      { id: "hsb_1", name: "Reproduction in Organisms & Human Reproduction", bengaliName: "জীবের জনন ও মানব জনন", topics: ["Microsporogenesis & Megasporogenesis", "Menstrual cycle & Spermatogenesis", "Contraceptive methods & Assisted Reproductive Tech"] },
      { id: "hsb_2", name: "Genetics & Molecular Basis of Inheritance", bengaliName: "বংশগতি ও আণবিক ভিত্তি", topics: ["DNA replication & Transcription", "Genetic Code & Translation", "Operon model & DNA fingerprinting"] },
      { id: "hsb_3", name: "Biotechnology and Its Applications", bengaliName: "বায়োটেকনোলজি ও প্রয়োগ", topics: ["Recombinant DNA technology", "PCR & Gel Electrophoresis", "Bt Cotton & Gene therapy"] },
      { id: "hsb_4", name: "Ecology and Environment", bengaliName: "বাস্তুবিদ্যা ও পরিবেশ", topics: ["Ecosystem energy flow", "Biochemical cycles", "Environmental issues & conservation strategies"] },
    ],
  },
  {
    id: "hs_econ",
    name: "Economics (অর্থনীতি - WBCHSE)",
    bengaliName: "অর্থনীতি (Economics)",
    hindiName: "अर्थशास्त्र",
    iconName: "TrendingUp",
    color: "bg-rose-700",
    classes: [11, 12],
    stream: "Commerce",
    chapters: [
      { id: "hse_1", name: "Microeconomics: Consumer & Producer Behavior", bengaliName: "ব্যষ্টিগত অর্থনীতি", topics: ["Law of Demand & Elasticity", "Production function & Cost curves", "Perfect Competition pricing"] },
      { id: "hse_2", name: "Macroeconomics: National Income & Banking", bengaliName: "সমষ্টিগত অর্থনীতি", topics: ["GDP, GNP & NNP calculations", "Central Bank (RBI) monetary tools", "Government budget & deficits"] },
    ],
  },
];

// Fun Activities for Class 1 - 5 (Primary Hub)
export const PRIMARY_ACTIVITIES: PrimaryActivity[] = [
  {
    id: "act_alphabet_en",
    category: "alphabet",
    title: "English ABCD & Phonics Fun",
    bengaliTitle: "ইংরেজি বর্ণমালা ও উচ্চারণ",
    icon: "Sparkles",
    description: "Learn letters with colorful pictures, real phonetic sounds, and everyday words!",
    items: [
      { letter: "A a", word: "Apple", bengaliWord: "আপেল", phonics: "/æ/ as in Apple", meaning: "A sweet red or green crunchy fruit", emoji: "🍎", audioPrompt: "A for Apple, /æ/ /æ/ Apple!" },
      { letter: "B b", word: "Ball", bengaliWord: "বল", phonics: "/b/ as in Ball", meaning: "A round toy we kick and throw", emoji: "⚽", audioPrompt: "B for Ball, /b/ /b/ Ball!" },
      { letter: "C c", word: "Cat", bengaliWord: "বিড়াল", phonics: "/k/ as in Cat", meaning: "A friendly furry pet that says meow", emoji: "🐱", audioPrompt: "C for Cat, /k/ /k/ Cat!" },
      { letter: "D d", word: "Duck", bengaliWord: "হাঁস", phonics: "/d/ as in Duck", meaning: "A water bird that quacks and swims", emoji: "🦆", audioPrompt: "D for Duck, /d/ /d/ Duck!" },
      { letter: "E e", word: "Elephant", bengaliWord: "হাতি", phonics: "/e/ as in Elephant", meaning: "A gentle giant animal with a long trunk", emoji: "🐘", audioPrompt: "E for Elephant, /e/ /e/ Elephant!" },
      { letter: "F f", word: "Fish", bengaliWord: "মাছ", phonics: "/f/ as in Fish", meaning: "Lives in ponds and rivers in Bengal", emoji: "🐟", audioPrompt: "F for Fish, /f/ /f/ Fish (মাছ)!" },
      { letter: "G g", word: "Grapes", bengaliWord: "আঙুর", phonics: "/ɡ/ as in Grapes", meaning: "Juicy sweet bunch of little fruits", emoji: "🍇", audioPrompt: "G for Grapes, /ɡ/ /ɡ/ Grapes!" },
      { letter: "M m", word: "Mango", bengaliWord: "আম (ফলের রাজা)", phonics: "/m/ as in Mango", meaning: "King of fruits, famous in Malda, Bengal!", emoji: "🥭", audioPrompt: "M for Mango, yummy sweet Mango!" },
      { letter: "T t", word: "Tiger", bengaliWord: "রয়্যাল বেঙ্গল টাইগার", phonics: "/t/ as in Tiger", meaning: "The majestic national animal from Sundarbans!", emoji: "🐯", audioPrompt: "T for Tiger, Royal Bengal Tiger!" },
    ],
  },
  {
    id: "act_bengali_varnamala",
    category: "alphabet",
    title: "বাংলা বর্ণমালা (স্বরবর্ণ ও ব্যঞ্জনবর্ণ)",
    bengaliTitle: "অ আ ক খ শেখার আনন্দ",
    icon: "BookOpen",
    description: "রবীন্দ্রনাথ ঠাকুরের সহজ পাঠ ও সুন্দর ছবি দিয়ে বাংলা বর্ণমালা শিখি!",
    items: [
      { letter: "অ", word: "অজগর", bengaliWord: "অজগর আসছে তেড়ে", phonics: "Aw", meaning: "বড় সাপ", emoji: "🐍", audioPrompt: "অ-এ অজগর আসছে তেড়ে!" },
      { letter: "আ", word: "আম", bengaliWord: "আমটি আমি খাব পেড়ে", phonics: "Aa", meaning: "রসালো মিষ্টি ফল", emoji: "🥭", audioPrompt: "আ-এ আমটি আমি খাব পেড়ে!" },
      { letter: "ই", word: "ইঁদুর", bengaliWord: "ইঁদুর ছানা ভয়ে মরে", phonics: "Ee", meaning: "ছোট চটপটে প্রাণী", emoji: "🐭", audioPrompt: "ই-এ ইঁদুর ছানা ভয়ে মরে!" },
      { letter: "ঈ", word: "ঈগল", bengaliWord: "ঈগল পাখি পাছে ধরে", phonics: "Eee", meaning: "উঁচুতে ওড়া শিকারী পাখি", emoji: "🦅", audioPrompt: "ঈ-এ ঈগল পাখি পাছে ধরে!" },
      { letter: "উ", word: "উট", bengaliWord: "উট চলেছে মুখটি তুলে", phonics: "Oo", meaning: "মরুভূমির জাহাজ", emoji: "🐫", audioPrompt: "উ-এ উট চলেছে মুখটি তুলে!" },
      { letter: "ক", word: "কাকাতুয়া", bengaliWord: "কাকাতুয়ার মাথায় ঝুঁটি", phonics: "Kaw", meaning: "সুন্দর রঙিন পাখি", emoji: "🦜", audioPrompt: "ক-এ কাকাতুয়ার মাথায় ঝুঁটি!" },
      { letter: "খ", word: "খরগোশ", bengaliWord: "খেঁকশিয়ালী পালায় ছুটি", phonics: "Khaw", meaning: "লাফালাফি করা সাদা খরগোশ", emoji: "🐰", audioPrompt: "খ-এ খরগোশ ছানা!" },
      { letter: "গ", word: "গরু", bengaliWord: "গরু বাছুর দাঁড়িয়ে আছে", phonics: "Gaw", meaning: "দুধ দেওয়া উপকারী গৃহপালিত পশু", emoji: "🐄", audioPrompt: "গ-এ গরু বাছুর দাঁড়িয়ে আছে!" },
    ],
  },
  {
    id: "act_numbers",
    category: "numbers",
    title: "Numbers & Counting (১ থেকে ১০ ও 1 to 10)",
    bengaliTitle: "সংখ্যা ও মজার গণনা",
    icon: "Calculator",
    description: "Count everyday objects and master numbers in both Bengali and English!",
    items: [
      { symbol: "1 / ১", word: "One / এক", bengaliWord: "এক (১) - একটি সূর্য", meaning: "Only 1 bright sun in the sky", emoji: "☀️", audioPrompt: "One! এক! There is 1 bright sun!" },
      { symbol: "2 / ২", word: "Two / দুই", bengaliWord: "দুই (২) - দুটি চোখ", meaning: "We have 2 eyes to see the world", emoji: "👀", audioPrompt: "Two! দুই! We see with 2 eyes!" },
      { symbol: "3 / ৩", word: "Three / তিন", bengaliWord: "তিন (৩) - অটোর তিন চাকা", meaning: "3 wheels of an Auto-rickshaw", emoji: "🛺", audioPrompt: "Three! তিন! 3 wheels of an auto!" },
      { symbol: "4 / ৪", word: "Four / চার", bengaliWord: "চার (৪) - টেবিলের চার পা", meaning: "4 legs of a chair and animal", emoji: "🪑", audioPrompt: "Four! চার! Four legs!" },
      { symbol: "5 / ৫", word: "Five / পাঁচ", bengaliWord: "পাঁচ (৫) - হাতের পাঁচ আঙুল", meaning: "5 fingers on one hand", emoji: "🖐️", audioPrompt: "Five! পাঁচ! 5 fingers on our hand!" },
      { symbol: "10 / ১০", word: "Ten / দশ", bengaliWord: "দশ (১০) - দুটি হাতের দশ আঙুল", meaning: "10 toes and 10 fingers", emoji: "🙌", audioPrompt: "Ten! দশ! Clapping with 10 fingers!" },
    ],
  },
  {
    id: "act_picture_math",
    category: "math",
    title: "Picture-Based Math & Logic",
    bengaliTitle: "ছবির সাহায্যে মজার অঙ্ক",
    icon: "Sparkles",
    description: "Solve visual puzzles with apples, birds, balls and candies!",
    items: [
      { word: "🍎 + 🍎 = 2", bengaliWord: "১টি আপেল + ১টি আপেল = ২টি আপেল", meaning: "Addition: Putting things together", emoji: "🍎🍎", audioPrompt: "1 apple plus 1 apple makes 2 apples!" },
      { word: "⭐⭐⭐ - ⭐ = 2", bengaliWord: "৩টি তারা - ১টি তারা = ২টি তারা", meaning: "Subtraction: Taking away", emoji: "✨", audioPrompt: "3 stars minus 1 star leaves 2 shining stars!" },
      { word: "🦆🦆 + 🦆🦆 = 4", bengaliWord: "২টি হাঁস + ২টি হাঁস = ৪টি হাঁস", meaning: "Group addition", emoji: "🦆🦆🦆🦆", audioPrompt: "2 ducks swimming, 2 more join. Now 4 ducks!" },
    ],
  },
];

// Sample Verified West Bengal Board Previous Year Questions (Clearly labeled as sample model paper data)
export const SAMPLE_PYQ_DATABASE: PYQuestion[] = [
  {
    id: "pyq_mp_2024_math_1",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2024,
    subject: "Mathematics",
    chapter: "Quadratic Equations with one variable",
    topic: "Nature of Roots & Discriminant",
    marks: 2,
    questionType: "SAQ (2 Marks)",
    question: "If the roots of the quadratic equation 2x² - 8x + k = 0 are real and equal, find the value of k.",
    questionBengali: "যদি 2x² - 8x + k = 0 দ্বিঘাত সমীকরণের বীজ দুটি বাস্তব ও সমান হয়, তবে k এর মান নির্ণয় করো।",
    solution: `**Step 1: Standard form comparison**
Given equation: $2x^2 - 8x + k = 0$
Comparing with standard form $ax^2 + bx + c = 0$:
- $a = 2$
- $b = -8$
- $c = k$

**Step 2: Condition for real and equal roots**
For a quadratic equation to have real and equal roots, its Discriminant ($D$) must equal zero:
$$D = b^2 - 4ac = 0$$

**Step 3: Substitute values**
$$(-8)^2 - 4(2)(k) = 0$$
$$64 - 8k = 0$$
$$8k = 64$$
$$k = \\frac{64}{8} = 8$$

**Final Answer:** The value of $k$ is **8**.`,
    difficulty: "Easy",
    isSampleData: true,
  },
  {
    id: "pyq_mp_2023_math_2",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2023,
    subject: "Mathematics",
    chapter: "Trigonometry",
    topic: "Heights and Distances",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "From the roof of a three-storeyed building, the angle of depression of the foot of a monument is 30° and the angle of elevation of the top of the monument is 60°. If the height of the building is 18 metres, calculate the height of the monument.",
    questionBengali: "একটি তিনতলা বাড়ির ছাদ থেকে একটি স্মৃতিস্তম্ভের পাদদেশের অবনতি কোণ 30° এবং স্তম্ভের চূড়ার উন্নতি কোণ 60°। বাড়িটির উচ্চতা 18 মিটার হলে স্মৃতিস্তম্ভের উচ্চতা নির্ণয় করো।",
    solution: `**Step 1: Understand the geometry & Draw diagram**
Let $AB$ be the building of height $18\\text{ m}$ ($AB = 18\\text{ m}$).
Let $CD$ be the monument.
From roof $A$, draw horizontal line $AE$ perpendicular to monument $CD$ meeting at point $E$.
- Height of lower part of monument $ED = AB = 18\\text{ m}$.
- Let upper height $CE = h\\text{ m}$.
- Total height of monument $= CD = CE + ED = (h + 18)\\text{ m}$.
- Angle of depression to foot $D$: $\\angle EAD = 30^\\circ \\implies \\angle ADB = 30^\\circ$.
- Angle of elevation to top $C$: $\\angle CAE = 60^\\circ$.

**Step 2: Find horizontal distance in right $\\triangle ABD$**
$$\\tan(30^\\circ) = \\frac{AB}{BD} \\implies \\frac{1}{\\sqrt{3}} = \\frac{18}{BD}$$
$$BD = 18\\sqrt{3}\\text{ metres}$$
Since $AE = BD$, $AE = 18\\sqrt{3}\\text{ metres}$.

**Step 3: Find upper height $CE$ in right $\\triangle AEC$**
$$\\tan(60^\\circ) = \\frac{CE}{AE} \\implies \\sqrt{3} = \\frac{h}{18\\sqrt{3}}$$
$$h = 18\\sqrt{3} \\times \\sqrt{3} = 18 \\times 3 = 54\\text{ metres}$$

**Step 4: Total height of monument**
$$CD = CE + ED = 54 + 18 = 72\\text{ metres}$$

**Final Answer:** The height of the monument is **72 metres**.`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_mp_2024_physci_1",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2024,
    subject: "Physical Science",
    chapter: "Behavior of Gases",
    topic: "Charles's Law & Absolute Scale",
    marks: 2,
    questionType: "SAQ (2 Marks)",
    question: "State Charles's Law regarding the behavior of gases. What is meant by Absolute Zero temperature?",
    questionBengali: "গ্যাসের আচরণ সংক্রান্ত চার্লসের সূত্রটি বিবৃত করো। পরম শূন্য তাপমাত্রা বলতে কী বোঝায়?",
    solution: `**Part 1: Charles's Law Statement**
At constant pressure, the volume of a given mass of any gas increases or decreases by $\\frac{1}{273}$ of its volume at $0^\\circ\\text{C}$ for every $1^\\circ\\text{C}$ rise or fall in temperature.
Mathematical form:
$$V_t = V_0 \\left(1 + \\frac{t}{273}\\right)$$

**Part 2: Absolute Zero Temperature**
- Absolute zero is $-273.15^\\circ\\text{C}$ ($0\\text{ K}$).
- At this theoretical temperature, according to Charles's law, the volume and pressure of an ideal gas theoretically become zero, and all molecular motion ceases.`,
    difficulty: "Easy",
    isSampleData: true,
  },
  {
    id: "pyq_mp_2023_lifesci_1",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2023,
    subject: "Life Science",
    chapter: "Continuity of Life",
    topic: "Mitosis vs Meiosis Cell Division",
    marks: 3,
    questionType: "SAQ (2 Marks)",
    question: "Differentiate between Mitosis and Meiosis cell division on the basis of: (i) Site of occurrence, (ii) Number of daughter cells formed, (iii) Chromosome number in daughter cells.",
    questionBengali: "(i) স্থান, (ii) উৎপন্ন অপত্য কোষের সংখ্যা, এবং (iii) অপত্য কোষে ক্রোমোজোম সংখ্যা—এই তিনটি বৈশিষ্ট্যের ভিত্তিতে মাইটোসিস ও মায়োসিস কোষ বিভাজনের পার্থক্য লেখো।",
    solution: `| Feature | Mitosis (সদৃশ বিভাজন) | Meiosis (হ্রাস বিভাজন) |
| :--- | :--- | :--- |
| **(i) Site of occurrence** | Occurs in Somatic (Body) cells for growth & repair | Occurs in Germ Mother cells during gamete formation |
| **(ii) Number of daughter cells** | **2** identical daughter cells are formed | **4** haploid daughter cells are formed |
| **(iii) Chromosome number** | Chromosome number remains **equal (2n $\\to$ 2n)** | Chromosome number is **reduced to half (2n $\\to$ n)** |`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_mp_2022_history_1",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2022,
    subject: "History",
    chapter: "Resistance and Rebellion",
    topic: "Indigo Revolt (নীল বিদ্রোহ)",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "What were the main causes of the Indigo Revolt (1859-60) in Bengal? What was the role of the contemporary intelligentsia and press?",
    questionBengali: "১৮৫৯-৬০ খ্রিস্টাব্দে বাংলায় নীল বিদ্রোহের প্রধান কারণগুলি কী ছিল? এই বিদ্রোহে সমকালীন শিক্ষিত বুদ্ধিজীবী ও সংবাদপত্রের ভূমিকা কী ছিল?",
    solution: `**1. Main Causes of the Indigo Revolt (নীল বিদ্রোহের কারণ):**
- **Oppressive Dadan System (দাদন প্রথা):** Planters forced peasant farmers into unfair advances and bound them indefinitely.
- **Economic Ruin:** Best agricultural lands were forcefully occupied for indigo instead of staple rice, creating severe famine risks.
- **Physical Torture & Atrocities:** Planters maintained private lathiyals to flog, jail, and destroy villages of defying ryots.

**2. Role of Bengali Intelligentsia & Press:**
- **Harish Chandra Mukherjee:** Championed the peasants' plight boldly through his newspaper *The Hindoo Patriot*.
- **Dinabandhu Mitra:** Wrote the historic realistic drama *Nil Darpan* (1860), which shook the conscience of Bengal and Britain.
- **Reverend James Long:** Translated *Nil Darpan* into English (fined and jailed by colonial courts), giving it worldwide attention.`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2024_phys_1",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2024,
    subject: "Physics (পদার্থবিদ্যা - WBCHSE)",
    chapter: "Electrostatics & Capacitance",
    topic: "Gauss's Theorem",
    marks: 3,
    questionType: "LAQ (3-5 Marks)",
    question: "State Gauss's Law in electrostatics. Using Gauss's theorem, derive an expression for the electric field intensity at a distance 'r' from an infinitely long straight uniformly charged wire with linear charge density λ.",
    questionBengali: "স্থিরতড়িতে গাউসের সূত্রটি লেখো। গাউসের সূত্রের সাহায্যে $\\lambda$ রৈখিক আধান ঘনত্বযুক্ত একটি অসীম দৈর্ঘ্যের সোজা তারের জন্য 'r' দূরত্বে তড়িৎক্ষেত্রের প্রাবল্য নির্ণয় করো।",
    solution: `**1. Gauss's Law Statement:**
The total electric flux $\\Phi_E$ through any closed surface in vacuum is equal to $\\frac{1}{\\varepsilon_0}$ times the total net charge $q_{\\text{enclosed}}$ enclosed by that surface:
$$\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$$

**2. Derivation for Infinite Wire:**
- Consider a cylindrical Gaussian surface of radius $r$ and length $l$ coaxial with the charged wire.
- Total charge enclosed $q = \\lambda l$.
- Electric flux passes only through the curved surface (flux through flat circular caps is zero since $\\vec{E} \\perp d\\vec{A}$).
- Area of curved cylindrical surface $= 2\\pi r l$.

Applying Gauss's Law:
$$E \\times (2\\pi r l) = \\frac{\\lambda l}{\\varepsilon_0}$$
$$E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}$$

**Vector Form:** $\\vec{E} = \\frac{\\lambda}{2\\pi \\varepsilon_0 r} \\hat{r}$ directed radially outwards if $\\lambda > 0$.`,
    difficulty: "Hard",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2023_chem_1",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2023,
    subject: "Chemistry (রসায়ন - WBCHSE)",
    chapter: "Electrochemistry & Chemical Kinetics",
    topic: "Nernst Equation & EMF",
    marks: 3,
    questionType: "Numerical / Long (5-8 Marks)",
    question: "Calculate the EMF of the cell at 298 K for the reaction: Mg(s) + 2Ag⁺(0.0001 M) → Mg²⁺(0.130 M) + 2Ag(s). Given: E°(Mg²⁺/Mg) = -2.37 V, E°(Ag⁺/Ag) = +0.80 V.",
    questionBengali: "298 K উষ্ণতায় নিম্নলিখিত কোষটির EMF গণনা করো: Mg(s) + 2Ag⁺(0.0001 M) → Mg²⁺(0.130 M) + 2Ag(s)। প্রদত্ত: E°(Mg²⁺/Mg) = -2.37 V, E°(Ag⁺/Ag) = +0.80 V।",
    solution: `**Step 1: Calculate Standard Cell Potential $E^\\circ_{\\text{cell}}$**
$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$$
$$E^\\circ_{\\text{cell}} = E^\\circ(\\text{Ag}^+/\\text{Ag}) - E^\\circ(\\text{Mg}^{2+}/\\text{Mg}) = (+0.80) - (-2.37) = +3.17\\text{ V}$$

**Step 2: Number of electrons transferred ($n$)**
$$\\text{Mg} \\to \\text{Mg}^{2+} + 2e^- \\implies n = 2$$

**Step 3: Apply Nernst Equation at 298 K**
$$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} \\left( \\frac{[\\text{Mg}^{2+}]}{[\\text{Ag}^+]^2} \\right)$$
$$E_{\\text{cell}} = 3.17 - \\frac{0.0591}{2} \\log_{10} \\left( \\frac{0.130}{(10^{-4})^2} \\right)$$
$$\\frac{0.130}{10^{-8}} = 1.3 \\times 10^7$$
$$\\log_{10}(1.3 \\times 10^7) = \\log_{10}(1.3) + 7 = 0.1139 + 7 = 7.1139$$

**Step 4: Final calculation**
$$E_{\\text{cell}} = 3.17 - (0.02955 \\times 7.1139) = 3.17 - 0.210 = 2.96\\text{ V}$$

**Final Answer:** The EMF of the cell is **2.96 V**.`,
    difficulty: "Hard",
    isSampleData: true,
  },
  {
    id: "pyq_mp_2024_bengali_1",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2024,
    subject: "Bengali (সাহিত্য সঞ্চয়ন ও ব্যাকরণ - First Language)",
    chapter: "জ্ঞানচক্ষু - আশাপূর্ণা দেবী (Gyan Chakshu)",
    topic: "তপনের লেখক হওয়া ও সন্ধ্যাতারা পত্রিকা",
    marks: 3,
    questionType: "LAQ (3-5 Marks)",
    question: "'তপন আর পড়তে পারে না। বোবার মতো বসে থাকে।'—তপনের এমন অবস্থার কারণ কী ছিল? 'সন্ধ্যাতারা' পত্রিকায় ছাপানো গল্প পড়ার পর তার কী উপলব্ধি হয়েছিল?",
    questionBengali: "'তপন আর পড়তে পারে না। বোবার মতো বসে থাকে।'—তপনের এমন অবস্থার কারণ কী ছিল? 'সন্ধ্যাতারা' পত্রিকায় ছাপানো গল্প পড়ার পর তার কী উপলব্ধি হয়েছিল?",
    solution: `**১. তপনের এমন অবস্থার কারণ:**
আশাপূর্ণা দেবীর 'জ্ঞানচক্ষু' গল্পে তপনের লেখা প্রথম গল্প 'প্রথম দিন' তার নতুন ছোটমেসো 'সন্ধ্যাতারা' পত্রিকায় ছাপিয়ে দেওয়ার প্রতিশ্রুতি দেন। পত্রিকা প্রকাশিত হলে তপন আনন্দে আত্মহারা হয়ে মায়ের অনুরোধে গল্পটি সবার সামনে জোরে পড়তে শুরু করে। কিন্তু পড়তে গিয়ে সে স্তম্ভিত হয়ে দেখে, গল্পটির প্রতিটি লাইন মেসোমশাই নিজের ভাষায় আমূল সংশোধন করে দিয়েছেন।

**২. তপনের আত্মোপলব্ধি ও সংকল্প:**
- তপন অনুভব করে যে গল্পে তার নিজস্ব অনুভূতি ও মৌলিক অনুভূতির ছিটেফোঁটাও অবশিষ্ট নেই; এটি সম্পূর্ণ মেসোমশাইয়ের পাকা হাতের সৃষ্টি।
- অপমানে ও দুঃখে তপনের চোখ জলে ভরে ওঠে এবং তার 'জ্ঞানচক্ষু' উন্মোচিত হয়।
- সে মনে মনে প্রতিজ্ঞা করে—ভবিষ্যতে যদি কখনো গল্প ছাপতে দিতেই হয়, তবে সে নিজে গিয়ে নিজের কাঁচা হাতের লেখা জমা দিয়ে আসবে, অন্যের দয়ায় বা সংশোধনে নয়।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_mp_2023_bengali_grammar",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2023,
    subject: "Bengali (সাহিত্য সঞ্চয়ন ও ব্যাকরণ - First Language)",
    chapter: "বাংলা ব্যাকরণ ও নির্মিতি",
    topic: "কারক, সমাস ও বাচ্য পরিবর্তন",
    marks: 4,
    questionType: "SAQ (2 Marks)",
    question: "নিম্নলিখিত প্রশ্নগুলির উত্তর দাও: (ক) 'কলমে কায়স্থ চিনি'—রেখাঙ্কিত পদটির কারক ও বিভক্তি নির্ণয় করো। (খ) ব্যাসবাক্যসহ সমাস নির্ণয় করো: 'পীতাম্বর' ও 'জয়ধ্বনি'। (গ) বাচ্য পরিবর্তন করো: 'তিনি কাজটি করলেন' (ভাববাচ্যে)।",
    questionBengali: "(ক) 'কলমে কায়স্থ চিনি'—রেখাঙ্কিত পদটির কারক ও বিভক্তি নির্ণয় করো। (খ) ব্যাসবাক্যসহ সমাস নির্ণয় করো: 'পীতাম্বর' ও 'জয়ধ্বনি'। (গ) বাচ্য পরিবর্তন করো: 'তিনি কাজটি করলেন' (ভাববাচ্যে)।",
    solution: `**(ক) কারক ও বিভক্তি নির্ণয়:**
- **কলমে** $\\to$ করণ কারকে **'এ'** বিভক্তি (চিহ্নিত করার উপকরণ বা উপায়)।

**(খ) ব্যাসবাক্যসহ সমাস:**
- **পীতাম্বর:** পীত অম্বর যাহার = **বহুব্রীহি সমাস** (এখানে শ্রীকৃষ্ণ বা বিষ্ণুকে নির্দেশ করছে)।
- **জয়ধ্বনি:** জয়সূচক ধ্বনি = **মধ্যপদলোপী কর্মধারয় সমাস**।

**(গ) বাচ্য পরিবর্তন:**
- মূল বাক্য (কর্তৃবাচ্য): 'তিনি কাজটি করলেন।'
- রূপান্তরিত ভাববাচ্য: **'তাঁর দ্বারা কাজটি করা হলো'** বা **'তাঁর কাজটি করা হলো।'**`,
    difficulty: "Easy",
    isSampleData: true,
  },
  {
    id: "pyq_mp_2024_koni",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2024,
    subject: "Bengali (সাহিত্য সঞ্চয়ন ও ব্যাকরণ - First Language)",
    chapter: "কোনি - মতী নন্দী (Koni)",
    topic: "ক্ষিতীশ সিংহ ও কোনির লড়াই",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "'তোর আসল লজ্জা জ্বলে, আসল গর্বও জ্বলে'—বক্তা কে? কোন প্রসঙ্গে তিনি এ কথা বলেছেন? এই বক্তব্যের মাধ্যমে চরিত্রের কোন মানসিকতা প্রকাশ পেয়েছে?",
    questionBengali: "'তোর আসল লজ্জা জ্বলে, আসল গর্বও জ্বলে'—বক্তা কে? কোন প্রসঙ্গে তিনি এ কথা বলেছেন? এই বক্তব্যের মাধ্যমে চরিত্রের কোন মানসিকতা প্রকাশ পেয়েছে?",
    solution: `**১. বক্তা:** উদ্ধৃত অংশটির বক্তা মতী নন্দীর 'কোনি' উপন্যাসের সাঁতার প্রশিক্ষক ও জুপিটার ক্লাবের একনিষ্ঠ সেবক **ক্ষিতীশ সিংহ (ক্ষিতীশদা)**।

**২. প্রাসঙ্গিক পটভূমি:**
দরিদ্র পরিবারের মেয়ে কোনি যখন ছেঁড়া ও পুরনো কস্টিউম পরে অনুশীলনে নামতে লজ্জা পাচ্ছিল এবং সাধারণ মানুষের উপহাসে কুণ্ঠিত হচ্ছিল, তখন ক্ষিতীশদা তাকে জীবনের চরম সত্য ও প্রতিযোগিতার মূল্য বোঝাতে এই চিরস্মরণীয় কথাটি বলেন।

**৩. মানসিকতার বিশ্লেষণ:**
- ক্ষিতীশদা কোনিকে বুঝিয়েছিলেন—বাইরের দারিদ্র্য বা জীর্ণ পোশাকে একজন ক্রীড়াবিদের কোনো লজ্জা নেই।
- আসল লজ্জা হলো জলের ট্র্যাকে পিছিয়ে পড়া ও পরাজিত হওয়া।
- আর আসল গর্ব হলো কঠোর অনুশীলনের মাধ্যমে জলের মধ্যে প্রতিপক্ষকে পরাস্ত করে জাতীয় মঞ্চে সেরা হওয়া।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_mp_2024_geo_1",
    board: "WBBSE (Madhyamik)",
    classLevel: "10",
    year: 2024,
    subject: "Geography (ভূগোল ও পরিবেশ)",
    chapter: "Exogenetic Processes and Landforms",
    topic: "Work of Rivers - Erosional Landforms",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Describe with neat sketches three major erosional landforms created by the work of rivers in their upper course.",
    questionBengali: "নদীর উচ্চগতিতে ক্ষয়কার্যের ফলে গঠিত তিনটি প্রধান ভূমিরূপের সচিত্র বিবরণ দাও।",
    solution: `**১. 'আই' (I) ও 'ভি' (V) আকৃতির উপত্যকা এবং গিরিখাত (Gorge):**
- নদীর উচ্চগতিতে তীব্র নিম্নক্ষয়ের ফলে নদীখাত গভীর ও সংকীর্ণ হয়ে খাড়া পার্শ্বদেশযুক্ত 'I' ও 'V' আকৃতির উপত্যকা সৃষ্টি করে। উদাহরণ: পেরুর কলকা নদীর গ্র্যান্ড ক্যানিয়ন ও তিব্বতের সাংপো গিরিখাত।

**২. জলপ্রপাত (Waterfall):**
- নদীপ্রবাহের গতিপথে কঠিন ও কোমল শিলাস্তূপ উল্লম্বভাবে অবস্থান করলে কোমল শিলা দ্রুত ক্ষয়প্রাপ্ত হয় এবং নদীজল খাড়াভাবে নিচে আছড়ে পড়ে জলপ্রপাত তৈরি করে। উদাহরণ: কর্ণাটকের শরাবতী নদীর যোগ জলপ্রপাত (গেরসোপ্পা)।

**৩. মন্থকূপ বা পটহোল (Potholes):**
- নদীগর্ভে জলের ঘূর্ণির সঙ্গে পরিবাহিত পাথরখণ্ড ও বালুকণার অবঘর্ষ ক্ষয়ের ফলে নদীখাতে যে ছোট ছোট বৃত্তাকার গর্ত সৃষ্টি হয়, তাদের মন্থকূপ বলে।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2024_bengali_1",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2024,
    subject: "Bengali (সাহিত্যচর্চা ও ভাষা - WBCHSE First Language)",
    chapter: "রূপনারায়ণের কূলে - রবীন্দ্রনাথ ঠাকুর (Rupnarayaner Kule)",
    topic: "কঠিন সত্য ও মৃত্যুর তপস্যা",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "'রূপনারায়ণের কূলে / জেগে উঠিলাম'—কবির জেগে ওঠার তাৎপর্য কী? 'মৃত্যুতে সকল দেনা শোধ করে দিতে'—উদ্ধৃতিটির মাধ্যমে কবি জীবনের কোন চরম সত্য প্রকাশ করেছেন?",
    questionBengali: "'রূপনারায়ণের কূলে / জেগে উঠিলাম'—কবির জেগে ওঠার তাৎপর্য কী? 'মৃত্যুতে সকল দেনা শোধ করে দিতে'—উদ্ধৃতিটির মাধ্যমে কবি জীবনের কোন চরম সত্য প্রকাশ করেছেন?",
    solution: `**১. জেগে ওঠার গভীর তাৎপর্য:**
'রূপনারায়ণের কূলে' রবীন্দ্রনাথের 'শেষ লেখা' কাব্যগ্রন্থের ১১ সংখ্যক কবিতা। কবির কাছে 'রূপনারায়ণ' কোনো ভৌগোলিক নদী নয়, বরং এই বিচিত্র মায়াময় বিশ্বসংসারের রূপময় প্রবাহ। জীবনের শেষপ্রান্তে উপনীত হয়ে কবি চেতনা ও আত্মদর্শনের চূড়ান্ত স্তরে জেগে উঠেছেন। তিনি উপলব্ধি করেন—এ জগৎ কোনো স্বপ্নময় রোমান্টিক কল্পনালোক নয়, দুঃখ-বেদনায় আঁকা এক রক্তক্ষয়ী কঠিন বাস্তব।

**২. 'মৃত্যুতে সকল দেনা শোধ করে দিতে' তাৎপর্য:**
- কবি বিশ্বাস করেন জীবন এক পরম প্রাপ্তি, যা দুঃখের তপস্যার মধ্য দিয়ে সার্থক হয়।
- সত্য কঠিন হলেও সে কখনো কাউকে প্রতারণা করে না।
- জীবনের সুখ-দুঃখ, সৃষ্টিশীলতা ও উপলব্ধির যে ঋণ মানুষ প্রকৃতির কাছ থেকে গ্রহণ করে, শান্ত আত্মনিবেদনের সঙ্গে মৃত্যুকে বরণ করে সেই চরম মূল্য বা দেনা শোধ করতে হয়।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2023_bengali_bhat",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2023,
    subject: "Bengali (সাহিত্যচর্চা ও ভাষা - WBCHSE First Language)",
    chapter: "ভাত ও ভারতবর্ষ (Bhat & Bharatbarsho)",
    topic: "উৎসব নাইয়ার চরিত্র ও আখ্যান",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "মহাশ্বেতা দেবীর 'ভাত' ছোটগল্প অবলম্বনে উৎসব নাইয়ার জীবনসংগ্রাম ও অন্নহীনতার ট্র্যাজিক পরিণতি আলোচনা করো।",
    questionBengali: "মহাশ্বেতা দেবীর 'ভাত' ছোটগল্প অবলম্বনে উৎসব নাইয়ার জীবনসংগ্রাম ও অন্নহীনতার ট্র্যাজিক পরিণতি আলোচনা করো।",
    solution: `**১. উৎসব নাইয়ার পারিবারিক বিপর্যয় ও মাতলার বন্যা:**
মাতলা নদীর জলোচ্ছ্বাসে সর্বস্বান্ত হয়ে উৎসব তার স্ত্রী-সন্তানদের হারায়। পেটের জ্বালা ও প্রিয়জন হারানোর গভীর ক্ষত নিয়ে সে কলকাতায় বড়বাড়িতে আসে শুধুমাত্র একমুঠো ভাতের আশায়।

**২. বড়বাড়ির ভণ্ডামি ও শোষণ:**
বড়বাড়ির বুড়োকর্তার অসুখ সারাতে তান্ত্রিকের যজ্ঞে মণ মণ কাঠ কাটার বিনিময়েও উৎসবকে দীর্ঘক্ষণ অভুক্ত রাখা হয়। বুড়োকর্তার মৃত্যুর পর সেই রান্নাকরা অন্ন অপবিত্র বলে ডাস্টবিনে ফেলে দেওয়ার আদেশ দেওয়া হয়।

**৩. চরম ক্ষুধা ও ট্র্যাজিক পরিণতি:**
উৎসব সেই ভাতের ডেকচি ছিনিয়ে নিয়ে স্টেশনে গিয়ে পেট ভরে ভাত খায়। কিন্তু সমাজের নিষ্ঠুর নিয়মে তাকে চোর সাব্যস্ত করে জেলে পাঠানো হয়। ক্যানিংয়ের জেলে বন্দি উৎসবের কাছে ভাত খাওয়ার স্বাদই একমাত্র স্মৃতি হয়ে রয়ে যায়।`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2024_math_calc",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2024,
    subject: "Mathematics (উচ্চতর গণিত - WBCHSE)",
    chapter: "Calculus (কলনবিদ্যা - Integration)",
    topic: "Definite Integral Property",
    marks: 4,
    questionType: "LAQ (3-5 Marks)",
    question: "Evaluate the definite integral: I = ∫[0 to π/2] (√sin(x)) / (√sin(x) + √cos(x)) dx.",
    questionBengali: "মান নির্ণয় করো: I = ∫[0 to π/2] (√sin(x)) / (√sin(x) + √cos(x)) dx।",
    solution: `**Step 1: Write equation (1)**
$$I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} \\, dx \\quad \\text{--- (1)}$$

**Step 2: Apply Definite Integral Property $\\int_0^a f(x)dx = \\int_0^a f(a - x)dx$**
Replace $x$ with $(\\frac{\\pi}{2} - x)$:
$$I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin(\\pi/2 - x)}}{\\sqrt{\\sin(\\pi/2 - x)} + \\sqrt{\\cos(\\pi/2 - x)}} \\, dx$$
Since $\\sin(\\pi/2 - x) = \\cos x$ and $\\cos(\\pi/2 - x) = \\sin x$:
$$I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x} + \\sqrt{\\sin x}} \\, dx \\quad \\text{--- (2)}$$

**Step 3: Add equations (1) and (2)**
$$2I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x} + \\sqrt{\\cos x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} \\, dx$$
$$2I = \\int_0^{\\pi/2} 1 \\, dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2} - 0 = \\frac{\\pi}{2}$$
$$I = \\frac{\\pi}{4}$$

**Final Answer:** $I = \\mathbf{\\frac{\\pi}{4}}$.`,
    difficulty: "Medium",
    isSampleData: true,
  },
  {
    id: "pyq_hs_2024_bio_dna",
    board: "WBCHSE (Higher Secondary)",
    classLevel: "12",
    year: 2024,
    subject: "Biological Sciences (জীববিদ্যা - WBCHSE)",
    chapter: "Genetics & Molecular Biology",
    topic: "Semi-conservative DNA Replication & Meselson-Stahl Experiment",
    marks: 5,
    questionType: "LAQ (3-5 Marks)",
    question: "Explain the Semi-conservative mode of DNA replication. How did Meselson and Stahl experimentally prove this using heavy isotope ¹⁵N in E. coli?",
    questionBengali: "ডিএনএ-র অর্ধ-রক্ষণশীল অনুলিপন (Semi-conservative replication) পদ্ধতি ব্যাখ্যা করো। মেসেলসন ও স্টাল কীভাবে ¹⁵N ভারী আইসোটোপ ব্যবহার করে এটি প্রমাণ করেছিলেন?",
    solution: `**১. অর্ধ-রক্ষণশীল অনুলিপন তত্ত্ব:**
ওয়াটসন ও ক্রিক প্রস্তাবিত মডেল অনুযায়ী, ডিএনএ অনুলিপনের সময় মূল দ্বি-তন্ত্রী ডিএনএ-র দুটি শৃঙ্খল হাইড্রোজেন বন্ধনী ভেঙে আলাদা হয়ে যায় এবং প্রতিটি শৃঙ্খল ছাঁচ (Template) হিসেবে কাজ করে নতুন পরিপূরক শৃঙ্খল সংশ্লেষ করে। ফলে উৎপন্ন প্রতিটি অপত্য ডিএনএ অণুতে একটি মূল মাতৃ-শৃঙ্খল এবং একটি সম্পূর্ণ নতুন শৃঙ্খল সংরক্ষিত থাকে।

**২. মেসেলসন ও স্টালের পরীক্ষা (১৯৫৮):**
- *E. coli* ব্যাক্টেরিয়াকে ভারী নাইট্রোজেন ($^{15}\\text{NH}_4\\text{Cl}$) মাধ্যমে বহু প্রজন্ম বৃদ্ধি করিয়ে সমস্ত ডিএনএ-কে ভারী ($^{15}\\text{N}-^{15}\\text{N}$) করা হয়।
- এরপর তাদের হালকা $^{14}\\text{N}$ মাধ্যমে স্থানান্তরিত করা হয়।
- **প্রথম প্রজন্ম (২০ মিনিট পর):** সিজিয়াম ক্লোরাইড (CsCl) ঘনত্ব নতিমাত্রা সেন্ট্রিফিউগেশনে দেখা যায় সমস্ত ডিএনএ মধ্যবর্তী সংকর ঘনত্বের ($^{15}\\text{N}-^{14}\\text{N}$)।
- **দ্বিতীয় প্রজন্ম (৪০ মিনিট পর):** ৫০% সংকর ডিএনএ এবং ৫০% সম্পূর্ণ হালকা ডিএনএ ($^{14}\\text{N}-^{14}\\text{N}$) ব্যান্ড পাওয়া যায়।

**উপসংহার:** এই পরীক্ষার মাধ্যমে সন্দেহাতীতভাবে প্রমাণিত হয় যে ডিএনএ অনুলিপন প্রকৃতপক্ষে **অর্ধ-রক্ষণশীল**।`,
    difficulty: "Hard",
    isSampleData: true,
  },
];

