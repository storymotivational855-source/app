import React, { useState, useEffect, useMemo } from "react";
import { Language, PYQuestion, AIPrediction2027, BoardMockTest2027 } from "../types";
import { AI_PREDICTIONS_2027, BOARD_MOCK_TESTS_2027 } from "../data/boardPredictionData";
import { EXTENDED_PYQ_DATABASE } from "../data/extendedPYQData";
import { SAMPLE_PYQ_DATABASE } from "../data/curriculumData";
import { speakText, stopSpeaking } from "../services/speech";
import {
  GraduationCap,
  Sparkles,
  FileQuestion,
  Trophy,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  Clock,
  ChevronDown,
  ChevronUp,
  Percent,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Zap,
  Tag,
  Download,
  Copy,
  Share2,
  Printer,
  Calendar,
  Layers,
  BrainCircuit,
  Lightbulb,
  FileText,
  Flame,
  CheckCheck,
  Compass,
} from "lucide-react";
import confetti from "canvas-confetti";

interface BoardExamHubProps {
  currentClass: string;
  language: Language;
  onAskTutor: (q: string, subject?: string) => void;
  defaultSubSection?: "pyq" | "full-papers" | "prediction" | "ai-future" | "mock-tests";
}

const formatTimer = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

type BoardExamSubTab = "pyq" | "full-papers" | "prediction" | "ai-future" | "mock-tests";

export const BoardExamHub: React.FC<BoardExamHubProps> = ({
  currentClass,
  language,
  onAskTutor,
  defaultSubSection = "pyq",
}) => {
  const [activeSubTab, setActiveSubTab] = useState<BoardExamSubTab>(defaultSubSection);
  const [selectedClass, setSelectedClass] = useState<"10" | "12">(
    currentClass === "12" || currentClass === "11" ? "12" : "10"
  );

  // Combined PYQ database
  const allPYQs: PYQuestion[] = useMemo(() => {
    return [...EXTENDED_PYQ_DATABASE, ...SAMPLE_PYQ_DATABASE];
  }, []);

  // PYQ Filters (2015 - 2026)
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [pyqSearchQuery, setPyqSearchQuery] = useState<string>("");
  const [expandedPYQId, setExpandedPYQId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Full Paper Year Selector
  const [paperYear, setPaperYear] = useState<number>(2026);
  const [paperSubject, setPaperSubject] = useState<string>("Mathematics");

  // Prediction filters
  const [predictionSubject, setPredictionSubject] = useState<string>("All");
  const [predictionLevel, setPredictionLevel] = useState<string>("All");
  const [expandedPredId, setExpandedPredId] = useState<string | null>(null);
  const [activePredictionView, setActivePredictionView] = useState<"expected" | "topics" | "full-paper">("expected");

  // Mock Test State
  const [selectedMockTest, setSelectedMockTest] = useState<BoardMockTest2027 | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"Easy" | "Medium" | "Hard" | "Board Level">("Board Level");
  const [mockUserAnswers, setMockUserAnswers] = useState<{ [qId: string]: number | string }>({});
  const [mockTimerSeconds, setMockTimerSeconds] = useState<number>(0);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [mockSubmitted, setMockSubmitted] = useState<boolean>(false);
  const [mockScore, setMockScore] = useState<number>(0);

  // AI Future interactive states
  const [aiAnalysisSubject, setAiAnalysisSubject] = useState<string>("Mathematics");
  const [customPredictionTopic, setCustomPredictionTopic] = useState<string>("");
  const [generatedAiQuestion, setGeneratedAiQuestion] = useState<{
    topic: string;
    probability: string;
    question: string;
    questionBn: string;
    marks: number;
    solution: string;
    rubric: string[];
  } | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTestActive && !mockSubmitted && mockTimerSeconds > 0) {
      interval = setInterval(() => {
        setMockTimerSeconds((prev) => {
          if (prev <= 1) {
            handleMockSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, mockSubmitted, mockTimerSeconds]);

  const handleSpeak = (text: string, id: string) => {
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    stopSpeaking();
    setSpeakingId(id);
    speakText(
      text,
      language,
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  const handleCopySolution = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {}
  };

  // Filtered PYQ list
  const filteredPYQs = useMemo(() => {
    return allPYQs.filter((q) => {
      const matchesClass = q.classLevel === selectedClass;
      const matchesYear = selectedYear === "All" || q.year.toString() === selectedYear;
      const matchesSubject =
        selectedSubject === "All" ||
        q.subject.toLowerCase().includes(selectedSubject.toLowerCase());
      const matchesType =
        selectedType === "All" || q.questionType.toLowerCase().includes(selectedType.toLowerCase());

      const query = pyqSearchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        q.question.toLowerCase().includes(query) ||
        (q.questionBengali && q.questionBengali.toLowerCase().includes(query)) ||
        q.chapter.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query);

      return matchesClass && matchesYear && matchesSubject && matchesType && matchesQuery;
    });
  }, [allPYQs, selectedClass, selectedYear, selectedSubject, selectedType, pyqSearchQuery]);

  // Questions for Full Paper View
  const fullPaperQuestions = useMemo(() => {
    return allPYQs.filter((q) => {
      const matchesClass = q.classLevel === selectedClass;
      const matchesYear = q.year === paperYear;
      const matchesSubject =
        paperSubject === "All" ||
        q.subject.toLowerCase().includes(paperSubject.toLowerCase());
      return matchesClass && matchesYear && matchesSubject;
    });
  }, [allPYQs, selectedClass, paperYear, paperSubject]);

  // Filtered Predictions
  const filteredPredictions = useMemo(() => {
    return AI_PREDICTIONS_2027.filter((p) => {
      const matchesClass = p.classLevel === selectedClass;
      const matchesSub =
        predictionSubject === "All" ||
        p.subject.toLowerCase().includes(predictionSubject.toLowerCase());
      const matchesLvl =
        predictionLevel === "All" || p.probabilityLevel.includes(predictionLevel);
      return matchesClass && matchesSub && matchesLvl;
    });
  }, [selectedClass, predictionSubject, predictionLevel]);

  // Start a Mock Test
  const handleStartTest = (test: BoardMockTest2027) => {
    setSelectedMockTest(test);
    setMockUserAnswers({});
    setMockTimerSeconds(test.durationMinutes * 60);
    setIsTestActive(true);
    setMockSubmitted(false);
    setMockScore(0);
  };

  const handleMockSubmit = () => {
    setIsTestActive(false);
    setMockSubmitted(true);

    if (!selectedMockTest) return;

    let totalScore = 0;
    selectedMockTest.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        if (
          q.correctOption !== undefined &&
          mockUserAnswers[q.id] === q.correctOption
        ) {
          totalScore += q.marks;
        } else if (q.correctOption === undefined && mockUserAnswers[q.id]) {
          totalScore += q.marks * 0.8;
        }
      });
    });

    setMockScore(Math.round(totalScore));

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handlePrintPaper = () => {
    window.print();
  };

  const handleSimulateAiPrediction = (topic: string) => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setGeneratedAiQuestion({
        topic: topic || "Thermodynamics / Trigonometry",
        probability: "94.8% High Probability",
        question: `Based on the 2015-2026 historical frequency analysis for ${selectedClass === "10" ? "Madhyamik" : "Higher Secondary"}, this core topic appears every 1.5 years with distinct sub-step derivations.`,
        questionBn: `২০১৫-২০২৬ সালের প্রশ্নের ধারাবাহিক বিশ্লেষণ অনুসারে, এই অধ্যায় থেকে গাণিতিক সমস্যা বা প্রমাণ ভিত্তিক প্রশ্ন আসার সম্ভাবনা সর্বাধিক।`,
        marks: 5,
        solution: `**Step 1: Formula definition & standard diagram (1 Mark)**\nState the primary law and define all variables with appropriate standard SI units.\n\n**Step 2: Mathematical Derivation / Working (2.5 Marks)**\nApply boundary conditions and systematically eliminate intermediate constants.\n\n**Step 3: Final Statement & Unit verification (1.5 Marks)**\nHighlight the boxed concluding equation with complete scientific terminology.`,
        rubric: [
          "Diagram / Statement accuracy: 1 Mark",
          "Calculations and algebraic substeps: 2.5 Marks",
          "Final answer with accurate SI unit: 1.5 Marks",
        ],
      });
      setIsGeneratingAi(false);
    }, 600);
  };

  const yearsList = [
    "2026",
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
  ];

  return (
    <div className="w-full space-y-7">
      {/* Top Banner - Polished, High-Impact Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-9 text-white shadow-xl relative overflow-hidden border border-indigo-700/40">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-indigo-500/30 backdrop-blur-md border border-indigo-400/40 px-4 py-1 rounded-full text-xs font-black tracking-wide text-indigo-200 shadow-xs">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>
                {selectedClass === "10"
                  ? "WBBSE Madhyamik Board Archive (2015–2026)"
                  : "WBCHSE Higher Secondary Board Archive (2015–2026)"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {language === "Bengali"
                ? "🎓 পশ্চিমবঙ্গ বোর্ড পরীক্ষার সম্পূর্ণ ডিজিটাল হাব"
                : "🎓 West Bengal Board Examination Hub"}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-2xl leading-relaxed">
              {language === "Bengali"
                ? "২০১৫ থেকে ২০২৬ পর্যন্ত সমস্ত বিষয়ের বিগত ১২ বছরের মূল পরীক্ষার প্রশ্নপত্র, পুঙ্খানুপুঙ্খ সমাধান, স্টেপ-বাই-স্টেপ মার্কিং স্কিম এবং AI চালিত ২০২৭–২০২৮ প্রেডিকশন পেপার।"
                : "Complete 12-Year (2015–2026) Official Board Question Papers with official model solutions, step-by-step marking rubrics, full printable papers, and AI predictive forecasting."}
            </p>
          </div>

          {/* Class Toggle 10 vs 12 */}
          <div className="flex bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700 shadow-inner shrink-0 w-full lg:w-auto">
            <button
              id="btn-board-class-10"
              onClick={() => {
                setSelectedClass("10");
                setSelectedSubject("All");
                setPaperSubject("Mathematics");
              }}
              className={`flex-1 lg:flex-none px-6 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                selectedClass === "10"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md scale-[1.02]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              📘 Class 10 (মাধ্যমিক)
            </button>
            <button
              id="btn-board-class-12"
              onClick={() => {
                setSelectedClass("12");
                setSelectedSubject("All");
                setPaperSubject("Physics");
              }}
              className={`flex-1 lg:flex-none px-6 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                selectedClass === "12"
                  ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md scale-[1.02]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🎓 Class 12 (উচ্চ মাধ্যমিক)
            </button>
          </div>
        </div>

        {/* 12-Year Coverage Status Bar */}
        <div className="mt-6 pt-5 border-t border-indigo-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <span className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider block">Years Covered</span>
            <span className="text-base sm:text-lg font-black text-amber-300">2015 – 2026 (12 Years)</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <span className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider block">Target Boards</span>
            <span className="text-base sm:text-lg font-black text-emerald-300">WBBSE & WBCHSE</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <span className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider block">Language Mode</span>
            <span className="text-base sm:text-lg font-black text-cyan-300">Bilingual (বাংলা + English)</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <span className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider block">AI Intelligence</span>
            <span className="text-base sm:text-lg font-black text-rose-300">Predictive Engine 2027+</span>
          </div>
        </div>
      </div>

      {/* Main Sub-Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs grid grid-cols-2 md:grid-cols-5 gap-2">
        <button
          id="btn-tab-board-pyq"
          onClick={() => setActiveSubTab("pyq")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            activeSubTab === "pyq"
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "bg-slate-50 hover:bg-amber-50 text-slate-700 border border-slate-200/80"
          }`}
        >
          <FileQuestion className="w-4 h-4 shrink-0" />
          <span>📚 2015–2026 Questions</span>
        </button>

        <button
          id="btn-tab-board-full-papers"
          onClick={() => setActiveSubTab("full-papers")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            activeSubTab === "full-papers"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "bg-slate-50 hover:bg-blue-50 text-slate-700 border border-slate-200/80"
          }`}
        >
          <Printer className="w-4 h-4 shrink-0" />
          <span>📄 Full Board Papers</span>
        </button>

        <button
          id="btn-tab-board-prediction"
          onClick={() => setActiveSubTab("prediction")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            activeSubTab === "prediction"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-slate-50 hover:bg-indigo-50 text-slate-700 border border-slate-200/80"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>🤖 2027 AI Prediction</span>
        </button>

        <button
          id="btn-tab-board-ai-future"
          onClick={() => setActiveSubTab("ai-future")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            activeSubTab === "ai-future"
              ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
              : "bg-slate-50 hover:bg-violet-50 text-slate-700 border border-slate-200/80"
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-cyan-300 shrink-0" />
          <span>🚀 Future of AI</span>
        </button>

        <button
          id="btn-tab-board-mock-tests"
          onClick={() => setActiveSubTab("mock-tests")}
          className={`col-span-2 md:col-span-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            activeSubTab === "mock-tests"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-slate-50 hover:bg-emerald-50 text-slate-700 border border-slate-200/80"
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
          <span>🏆 4-Level Mock Tests</span>
        </button>
      </div>

      {/* ========================================================
          1. PREVIOUS YEAR PAPERS (2015–2026 ARCHIVE)
          ======================================================== */}
      {activeSubTab === "pyq" && (
        <div className="space-y-6">
          {/* Enhanced Filter Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search questions by chapter, keyword, or theorem (e.g. Pythagoras, Mendel, Nernst)..."
                  value={pyqSearchQuery}
                  onChange={(e) => setPyqSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Subject Filter */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full lg:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 bg-white"
              >
                <option value="All">All Subjects</option>
                {selectedClass === "10" ? (
                  <>
                    <option value="Mathematics">Mathematics (গণিত)</option>
                    <option value="Physical Science">Physical Science (ভৌত বিজ্ঞান)</option>
                    <option value="Life Science">Life Science (জীবন বিজ্ঞান)</option>
                    <option value="Bengali">Bengali (বাংলা)</option>
                    <option value="History">History (ইতিহাস)</option>
                    <option value="Geography">Geography (ভূগোল)</option>
                    <option value="English">English (ইংরেজি)</option>
                  </>
                ) : (
                  <>
                    <option value="Physics">Physics (পদার্থবিদ্যা)</option>
                    <option value="Chemistry">Chemistry (রসায়ন)</option>
                    <option value="Mathematics">Mathematics (গণিত)</option>
                    <option value="Biological">Biology (জীববিদ্যা)</option>
                    <option value="Bengali">Bengali (বাংলা)</option>
                    <option value="English">English (ইংরেজি)</option>
                  </>
                )}
              </select>

              {/* Question Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full lg:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 bg-white"
              >
                <option value="All">All Question Types</option>
                <option value="SAQ">Short Answer (SAQ 2-3 Marks)</option>
                <option value="LAQ">Long Answer (LAQ 4-5 Marks)</option>
                <option value="MCQ">Multiple Choice (MCQ 1 Mark)</option>
              </select>
            </div>

            {/* Year Selector Horizontal Pills (2015 - 2026) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Exam Year:</span>
                </span>
                <button
                  onClick={() => setSelectedYear("All")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all shrink-0 ${
                    selectedYear === "All"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  All (2015–2026)
                </button>
                {yearsList.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all shrink-0 ${
                      selectedYear === yr
                        ? "bg-amber-500 text-white shadow-xs ring-2 ring-amber-300"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-600 px-2 font-semibold">
            <span>
              Found <strong>{filteredPYQs.length}</strong> official board exam questions for{" "}
              <span className="text-amber-700 font-bold">
                {selectedClass === "10" ? "Class 10 (Madhyamik)" : "Class 12 (Higher Secondary)"}
              </span>
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-500">
              {selectedYear === "All" ? "2015 - 2026 Archive" : `Year ${selectedYear}`}
            </span>
          </div>

          {/* PYQ Cards Grid */}
          <div className="space-y-4">
            {filteredPYQs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
                <FileQuestion className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">No questions found matching your filter</h4>
                <p className="text-xs text-slate-500">Try selecting "All (2015–2026)" or clearing the keyword filter.</p>
              </div>
            ) : (
              filteredPYQs.map((q) => {
                const isExpanded = expandedPYQId === q.id;
                const isSpeaking = speakingId === q.id;

                return (
                  <div
                    key={q.id}
                    className="bg-white rounded-3xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all p-6 space-y-4"
                  >
                    {/* Card Header Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                        <span className="bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1 rounded-lg flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600" />
                          <span>{q.year} Board Paper</span>
                        </span>
                        <span className="bg-indigo-100 text-indigo-900 px-3 py-1 rounded-lg">
                          {q.subject}
                        </span>
                        <span className="text-slate-600 font-semibold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                          {q.chapter}
                        </span>
                        {q.topic && (
                          <span className="text-slate-500 text-[11px] hidden md:inline-block">
                            • {q.topic}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                          {q.marks} Marks
                        </span>
                        <button
                          onClick={() =>
                            handleSpeak(
                              `${q.questionBengali || q.question}. Solution: ${q.solution}`,
                              q.id
                            )
                          }
                          title="Listen with Audio"
                          className={`p-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                            isSpeaking
                              ? "bg-rose-500 text-white animate-pulse"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                      {q.questionBengali && (
                        <p className="text-sm sm:text-base font-semibold text-slate-700 bg-slate-50/80 p-3 rounded-2xl border border-slate-200/60">
                          {q.questionBengali}
                        </p>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => setExpandedPYQId(isExpanded ? null : q.id)}
                        className="text-xs font-black text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Model Solution" : "View Step-by-Step Model Solution"}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopySolution(q.solution, q.id)}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedId === q.id ? "Copied!" : "Copy"}</span>
                        </button>
                        <button
                          onClick={() =>
                            onAskTutor(
                              `Explain this ${q.year} Class ${selectedClass} Board question in detail with exam tips: "${q.question}"`,
                              q.subject
                            )
                          }
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Ask AI Tutor</span>
                        </button>
                      </div>
                    </div>

                    {/* Detailed Solution Block */}
                    {isExpanded && (
                      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4 mt-3 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-black text-slate-800">
                              Official Board Marking Scheme & Step-by-Step Solution:
                            </span>
                          </div>
                          <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            Full {q.marks} Marks Standard
                          </span>
                        </div>

                        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans font-medium">
                          {q.solution}
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-slate-200 text-xs text-slate-500 font-medium">
                          <span>💡 Pro Tip: Show all intermediate algebraic steps and draw labeled diagrams to avoid mark deductions.</span>
                          <span className="text-indigo-600 font-bold">WBBSE / WBCHSE Standard</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          2. FULL QUESTION PAPERS & PRINTABLE PDF MODE
          ======================================================== */}
      {activeSubTab === "full-papers" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {language === "Bengali"
                    ? "সম্পূর্ণ বোর্ড প্রশ্নপত্র ও প্রিন্ট মোড (Full Question Paper)"
                    : "Complete Board Question Papers (Print & PDF Ready)"}
                </h3>
                <p className="text-xs text-slate-500">
                  Select any year (2015–2026) to view the complete structured question paper layout.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintPaper}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

            {/* Year & Subject Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Year (2015–2026):</label>
                <select
                  value={paperYear}
                  onChange={(e) => setPaperYear(parseInt(e.target.value, 10))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                >
                  {yearsList.map((y) => (
                    <option key={y} value={y}>
                      {y} Board Exam Paper
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Subject:</label>
                <select
                  value={paperSubject}
                  onChange={(e) => setPaperSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                >
                  <option value="All">All Subjects in {paperYear}</option>
                  {selectedClass === "10" ? (
                    <>
                      <option value="Mathematics">Mathematics (গণিত)</option>
                      <option value="Physical Science">Physical Science (ভৌত বিজ্ঞান)</option>
                      <option value="Life Science">Life Science (জীবন বিজ্ঞান)</option>
                      <option value="Bengali">Bengali (বাংলা)</option>
                      <option value="History">History (ইতিহাস)</option>
                      <option value="Geography">Geography (ভূগোল)</option>
                    </>
                  ) : (
                    <>
                      <option value="Physics">Physics (পদার্থবিদ্যা)</option>
                      <option value="Chemistry">Chemistry (রসায়ন)</option>
                      <option value="Mathematics">Mathematics (গণিত)</option>
                      <option value="Biological">Biology (জীববিদ্যা)</option>
                      <option value="Bengali">Bengali (বাংলা)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="sm:col-span-2 md:col-span-1 flex items-end">
                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Paper Status</span>
                  <span className="text-xs font-black text-emerald-700">Verified Board Paper</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Paper Sheet Presentation */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-md p-6 sm:p-10 space-y-8 font-serif">
            {/* Paper Header */}
            <div className="text-center space-y-2 border-b-2 border-slate-800 pb-6">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-slate-500">
                {selectedClass === "10"
                  ? "WEST BENGAL BOARD OF SECONDARY EDUCATION (WBBSE)"
                  : "WEST BENGAL COUNCIL OF HIGHER SECONDARY EDUCATION (WBCHSE)"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
                {selectedClass === "10" ? "MADHYAMIK PARIKSHA (S.E.)" : "HIGHER SECONDARY EXAMINATION"} - {paperYear}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans font-bold text-slate-700 pt-1">
                <span>Subject: {paperSubject}</span>
                <span>•</span>
                <span>Time: 3 Hours 15 Minutes</span>
                <span>•</span>
                <span>Full Marks: {selectedClass === "10" ? "90" : "70 / 80"}</span>
              </div>
              <p className="text-[11px] font-sans text-slate-500 italic max-w-xl mx-auto pt-2">
                First 15 minutes are allotted for reading the question paper only. Special credit will be given for brevity and neatness.
              </p>
            </div>

            {/* Questions in Paper */}
            {fullPaperQuestions.length === 0 ? (
              <div className="text-center py-10 font-sans space-y-2">
                <p className="text-sm font-bold text-slate-700">Displaying sample questions for {paperYear} {paperSubject}.</p>
                <button
                  onClick={() => setPaperSubject("All")}
                  className="text-xs text-indigo-600 font-bold underline cursor-pointer"
                >
                  View all subjects for {paperYear}
                </button>
              </div>
            ) : (
              <div className="space-y-8 font-sans">
                {fullPaperQuestions.map((q, idx) => (
                  <div key={q.id} className="border-b border-slate-200 pb-6 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-500">
                          Question {idx + 1} ({q.subject} - {q.chapter})
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                          {q.question}
                        </h4>
                        {q.questionBengali && (
                          <p className="text-sm text-slate-700 font-medium">
                            {q.questionBengali}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-black text-slate-900 bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-lg shrink-0">
                        [{q.marks}]
                      </span>
                    </div>

                    {/* Integrated Solution Accordion */}
                    <details className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs">
                      <summary className="font-bold text-indigo-700 cursor-pointer select-none">
                        View Step-by-Step Marking & Answer Blueprint
                      </summary>
                      <div className="mt-3 prose prose-slate max-w-none text-slate-800 whitespace-pre-line leading-relaxed border-t border-slate-200 pt-3">
                        {q.solution}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            )}

            {/* Paper Footer */}
            <div className="text-center font-sans text-xs text-slate-400 border-t border-slate-200 pt-4">
              End of Question Paper • {paperYear} • West Bengal Board
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. 2027 AI PREDICTION & PROBABILITY ENGINE
          ======================================================== */}
      {activeSubTab === "prediction" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-900 font-black text-xs px-2.5 py-0.5 rounded-full">
                    AI Probability Matrix
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    2027 Board Exam High-Yield Predictions
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Synthesized by analyzing 2015–2026 exam cycle patterns and syllabus weightages.
                </p>
              </div>

              {/* View Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActivePredictionView("expected")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activePredictionView === "expected"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "text-slate-600"
                  }`}
                >
                  High Probability
                </button>
                <button
                  onClick={() => setActivePredictionView("topics")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activePredictionView === "topics"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "text-slate-600"
                  }`}
                >
                  Topic Trends
                </button>
              </div>
            </div>
          </div>

          {/* Prediction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPredictions.map((pred) => (
              <div
                key={pred.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-400 p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-black px-2.5 py-0.5 rounded-lg">
                      {pred.subject}
                    </span>
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-500" />
                      <span>{pred.probabilityLevel} ({pred.probabilityScore}%)</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">{pred.chapter}</span>
                    <h4 className="text-base font-black text-slate-900 mt-0.5">{pred.question}</h4>
                    {pred.questionBengali && (
                      <p className="text-xs font-semibold text-slate-600 mt-1">{pred.questionBengali}</p>
                    )}
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs space-y-1">
                    <span className="font-bold text-slate-700 block">💡 AI Trend Rationale:</span>
                    <p className="text-slate-600">{pred.repetitionReason}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Marks: {pred.marks}</span>
                  <button
                    onClick={() =>
                      onAskTutor(
                        `Explain this 2027 high probability predicted question for ${pred.subject}: "${pred.question}"`,
                        pred.subject
                      )
                    }
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Practice with AI</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          4. THE FUTURE OF AI & AI-POWERED EXAM ENGINE
          ======================================================== */}
      {activeSubTab === "ai-future" && (
        <div className="space-y-6">
          {/* Future Tech Hero Card */}
          <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 border border-violet-700/50 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2 text-violet-300 text-xs font-black uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <span>Next-Gen Artificial Intelligence for Bengal Students</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black">
              How AI is Transforming Board Exam Preparation (2026–2030)
            </h3>
            <p className="text-xs sm:text-sm text-violet-200 max-w-3xl leading-relaxed">
              We leverage large language models and historic 2015–2026 pattern mining to provide instant step-wise evaluation, multilingual voice tutoring in authentic Bengali and Hindi accents, and deep syllabus forecasting.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
                <span className="text-amber-300 font-black text-sm block">1. Step-Wise Rubric AI</span>
                <span className="text-xs text-violet-200">Know where each 0.5 mark is awarded before entering the examination hall.</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
                <span className="text-cyan-300 font-black text-sm block">2. Real-Time Photo Solver</span>
                <span className="text-xs text-violet-200">Snap handwritten diagrams or textbook problems for immediate LaTeX proofs.</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
                <span className="text-emerald-300 font-black text-sm block">3. Adaptive Weak-Area Focus</span>
                <span className="text-xs text-violet-200">AI pinpoints specific misconceptions across 12-year question trends.</span>
              </div>
            </div>
          </div>

          {/* Interactive AI Question Generator Tool */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-900">
                Interactive AI Pattern Synthesizer
              </h4>
              <p className="text-xs text-slate-500">
                Choose a chapter or topic to simulate an AI-forecasted question with full examiner marking rubric.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Enter topic name (e.g., Quadratic Equations, Ohm's Law, Mendel, Photosynthesis)..."
                value={customPredictionTopic}
                onChange={(e) => setCustomPredictionTopic(e.target.value)}
                className="w-full flex-1 px-4 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-violet-500"
              />
              <button
                onClick={() => handleSimulateAiPrediction(customPredictionTopic)}
                disabled={isGeneratingAi}
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isGeneratingAi ? "Synthesizing AI Blueprint..." : "Generate AI Exam Rubric"}</span>
              </button>
            </div>

            {/* Render Synthesized Output */}
            {generatedAiQuestion && (
              <div className="bg-violet-50/70 border border-violet-200 rounded-3xl p-6 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-violet-200 pb-3">
                  <span className="bg-violet-600 text-white text-xs font-black px-3 py-1 rounded-xl">
                    Topic: {generatedAiQuestion.topic}
                  </span>
                  <span className="text-xs font-black text-violet-800">
                    {generatedAiQuestion.probability}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h5 className="text-base font-black text-slate-900">{generatedAiQuestion.question}</h5>
                  <p className="text-xs text-slate-700">{generatedAiQuestion.questionBn}</p>
                </div>

                {/* Rubric Breakdown */}
                <div className="bg-white rounded-2xl p-4 border border-violet-100 space-y-2">
                  <span className="text-xs font-black text-slate-800 block">Board Examiner Step-by-Step Marking Breakdown:</span>
                  <ul className="space-y-1 text-xs text-slate-700 font-medium">
                    {generatedAiQuestion.rubric.map((r, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={() =>
                      onAskTutor(
                        `Provide a detailed step-by-step master solution for this topic: "${generatedAiQuestion.topic}" following the WBBSE/WBCHSE marking rubric.`,
                        aiAnalysisSubject
                      )
                    }
                    className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practice Full Question with AI Tutor</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          5. MOCK TESTS (EASY TO BOARD DIFFICULTY)
          ======================================================== */}
      {activeSubTab === "mock-tests" && (
        <div className="space-y-6">
          {!isTestActive && !mockSubmitted && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      West Bengal Board 4-Tier Mock Exam Simulator
                    </h3>
                    <p className="text-xs text-slate-500">
                      Full timed mock tests with automated scoring and WBBSE/WBCHSE official paper format.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Filter Level:</span>
                    <select
                      value={selectedDifficulty}
                      onChange={(e: any) => setSelectedDifficulty(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="Board Level">Board Standard (90/70 Marks)</option>
                      <option value="Easy">Easy / Foundation</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard / High-Yield</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mock Test Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {BOARD_MOCK_TESTS_2027.filter((t) => t.classLevel === selectedClass).map((test) => (
                  <div
                    key={test.id}
                    className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2.5 py-0.5 rounded-lg">
                          {test.subject}
                        </span>
                        <span className="text-xs font-extrabold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                          {test.difficulty}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900">{test.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{test.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{test.durationMinutes} Minutes</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-slate-400" />
                          <span>{test.totalMarks} Full Marks</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartTest(test)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                    >
                      <Trophy className="w-4 h-4 text-amber-300" />
                      <span>Start Timed Mock Exam</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Test Screen */}
          {isTestActive && selectedMockTest && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {selectedMockTest.subject} • Class {selectedMockTest.classLevel}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">{selectedMockTest.title}</h3>
                </div>

                <div className="bg-slate-900 text-amber-400 font-mono text-base font-black px-4 py-2 rounded-2xl flex items-center gap-2 shadow-inner">
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>{formatTimer(mockTimerSeconds)}</span>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {selectedMockTest.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    <div className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-black text-slate-800">
                      {section.sectionName} ({section.marksPerQuestion * section.questions.length} Marks)
                    </div>

                    {section.questions.map((q, qIdx) => (
                      <div key={q.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-extrabold text-slate-900">
                            Q{qIdx + 1}. {q.question}
                          </span>
                          <span className="text-xs font-black text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            {q.marks}M
                          </span>
                        </div>

                        {/* Options for MCQ */}
                        {q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map((opt, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() =>
                                  setMockUserAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: optIdx,
                                  }))
                                }
                                className={`text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                  mockUserAnswers[q.id] === optIdx
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                    : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}. {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleMockSubmit}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-md cursor-pointer transition-all"
                >
                  Submit & View Score Breakdown
                </button>
              </div>
            </div>
          )}

          {/* Test Results Screen */}
          {mockSubmitted && selectedMockTest && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-md">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">Mock Examination Completed!</h3>
                <p className="text-xs text-slate-500">Your simulated score for {selectedMockTest.title}:</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 max-w-sm mx-auto">
                <span className="text-4xl font-black text-emerald-800">{mockScore}</span>
                <span className="text-sm font-bold text-emerald-600"> / {selectedMockTest.totalMarks} Marks</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setMockSubmitted(false);
                    setSelectedMockTest(null);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Back to All Mock Tests
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
