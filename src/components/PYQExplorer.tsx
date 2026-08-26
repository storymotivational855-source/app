import React, { useState, useMemo } from "react";
import { Language, PYQuestion } from "../types";
import { SAMPLE_PYQ_DATABASE } from "../data/curriculumData";
import { EXTENDED_PYQ_DATABASE } from "../data/extendedPYQData";
import { speakText, stopSpeaking } from "../services/speech";
import {
  FileQuestion,
  Search,
  Filter,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Tag,
  Info,
  Calendar,
  Layers,
  Copy,
  Printer,
} from "lucide-react";

interface PYQExplorerProps {
  language: Language;
  currentClass: string;
  onAskTutor: (q: string, subject?: string) => void;
}

export const PYQExplorer: React.FC<PYQExplorerProps> = ({
  language,
  currentClass,
  onAskTutor,
}) => {
  const [boardFilter, setBoardFilter] = useState<string>("All");
  const [classFilter, setClassFilter] = useState<string>(
    currentClass === "10" || currentClass === "12" ? currentClass : "All"
  );
  const [yearFilter, setYearFilter] = useState<string>("All");
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Combine full archive databases
  const allQuestions: PYQuestion[] = useMemo(() => {
    return [...EXTENDED_PYQ_DATABASE, ...SAMPLE_PYQ_DATABASE];
  }, []);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchesBoard = boardFilter === "All" || q.board.includes(boardFilter);
      const matchesClass = classFilter === "All" || q.classLevel === classFilter;
      const matchesYear = yearFilter === "All" || q.year.toString() === yearFilter;
      const matchesSubject = subjectFilter === "All" || q.subject.toLowerCase().includes(subjectFilter.toLowerCase());
      const matchesType = typeFilter === "All" || q.questionType.includes(typeFilter);
      const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        q.question.toLowerCase().includes(query) ||
        (q.questionBengali && q.questionBengali.toLowerCase().includes(query)) ||
        q.chapter.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        q.subject.toLowerCase().includes(query);

      return (
        matchesBoard &&
        matchesClass &&
        matchesYear &&
        matchesSubject &&
        matchesType &&
        matchesDifficulty &&
        matchesSearch
      );
    });
  }, [allQuestions, boardFilter, classFilter, yearFilter, subjectFilter, typeFilter, difficultyFilter, searchQuery]);

  const handleSpeak = (q: PYQuestion) => {
    if (speakingId === q.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    stopSpeaking();
    setSpeakingId(q.id);
    speakText(
      `${q.questionBengali || q.question}. Solution: ${q.solution}`,
      language,
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  const handleCopy = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {}
  };

  const quickSearchPresets = [
    { label: "Class 10 Trigonometry", query: "Trigonometry" },
    { label: "Class 10 Quadratic Equations", query: "Quadratic" },
    { label: "Class 10 Gas Laws & Optics", query: "Optics" },
    { label: "Class 10 Indigo Revolt (History)", query: "Indigo" },
    { label: "Class 12 Electrochemistry", query: "Nernst" },
    { label: "Class 12 Definite Integrals", query: "Calculus" },
    { label: "Class 12 DNA & Genetics", query: "DNA" },
  ];

  const yearOptions = [
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
    <div className="w-full space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-indigo-900 rounded-3xl p-6 sm:p-9 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full backdrop-blur-xs">
              WBBSE & WBCHSE Archive (2015–2026)
            </span>
            <span className="bg-amber-300 text-amber-950 text-xs font-black px-3 py-1 rounded-full">
              Complete 12-Year Question Bank
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {language === "Bengali"
              ? "পশ্চিমবঙ্গ বোর্ড বিগত ১২ বছরের প্রশ্ন সংগ্রহ (২০১৫–২০২৬)"
              : "West Bengal Board 12-Year Question Archive (2015–2026)"}
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
            {language === "Bengali"
              ? "১০ম শ্রেণি (মাধ্যমিক) ও ১২শ শ্রেণি (উচ্চ মাধ্যমিক)-র ২০১৫ থেকে ২০২৬ পর্যন্ত সমস্ত বিষয়ের মূল প্রশ্ন ও অফিসিয়াল স্টেপ-বাই-স্টেপ সমাধান।"
              : "Explore 10th (Madhyamik) and 12th (Higher Secondary) official board examination papers across all subjects with verified model solutions."}
          </p>
        </div>
      </div>

      {/* Search & Quick Suggestions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            id="pyq-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, keyword, formula (e.g. 'Trigonometry', 'Indigo Revolt', 'Nernst', 'Optics')..."
            className="w-full bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 rounded-2xl pl-12 pr-4 py-3.5 border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all focus:outline-hidden"
          />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-bold mr-1">Quick Keywords:</span>
          {quickSearchPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(preset.query)}
              className="bg-slate-100 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 border border-slate-200 px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-rose-600 hover:underline font-bold ml-2 cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Multi-Facet Filter Toolbar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-black text-slate-800 flex items-center gap-2 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Curriculum & Board Filters</span>
          </span>
          <span className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            {filteredQuestions.length} Board Questions Found
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {/* Board */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Board</label>
            <select
              value={boardFilter}
              onChange={(e) => setBoardFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl p-2.5 text-slate-800 cursor-pointer"
            >
              <option value="All">All Boards</option>
              <option value="WBBSE">WBBSE (Madhyamik)</option>
              <option value="WBCHSE">WBCHSE (Higher Sec)</option>
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Class Level</label>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl p-2.5 text-slate-800 cursor-pointer"
            >
              <option value="All">All Classes (10th & 12th)</option>
              <option value="10">Class 10 (Madhyamik)</option>
              <option value="12">Class 12 (Higher Secondary)</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Exam Year (2015–2026)</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl p-2.5 text-slate-800 cursor-pointer"
            >
              <option value="All">All Years (2015–2026)</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y} Board Exam
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Subject</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl p-2.5 text-slate-800 cursor-pointer"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physical Science">Physical Science</option>
              <option value="Life Science">Life Science</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Bengali">Bengali</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
            </select>
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Type & Marks</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl p-2.5 text-slate-800 cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="MCQ">MCQ (1 Mark)</option>
              <option value="SAQ">SAQ (2-3 Marks)</option>
              <option value="LAQ">LAQ (4-5 Marks)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl p-2.5 text-slate-800 cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard / High-Yield</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <FileQuestion className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No board questions match your active filters</h4>
            <p className="text-xs text-slate-500">Try setting 'Exam Year' to All or resetting the subject filter.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const isSpeaking = speakingId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-amber-400 p-6 space-y-4 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                    <span className="bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1 rounded-lg">
                      {q.year} {q.board}
                    </span>
                    <span className="bg-indigo-100 text-indigo-900 px-3 py-1 rounded-lg">
                      Class {q.classLevel} • {q.subject}
                    </span>
                    <span className="text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      {q.chapter}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                      {q.marks} Marks
                    </span>
                    <button
                      onClick={() => handleSpeak(q)}
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

                <div className="space-y-2">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {q.question}
                  </h4>
                  {q.questionBengali && (
                    <p className="text-sm sm:text-base font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                      {q.questionBengali}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="text-xs font-black text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>{isExpanded ? "Hide Model Solution" : "View Step-by-Step Model Solution"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(q.solution, q.id)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === q.id ? "Copied!" : "Copy"}</span>
                    </button>
                    <button
                      onClick={() =>
                        onAskTutor(
                          `Explain this ${q.year} Class ${q.classLevel} Board question in detail: "${q.question}"`,
                          q.subject
                        )
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ask AI Tutor</span>
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4 mt-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-xs font-black text-slate-800">
                        Official Board Model Marking Solution ({q.marks} Marks):
                      </span>
                      <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        Standard WBBSE/WBCHSE Format
                      </span>
                    </div>

                    <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans font-medium">
                      {q.solution}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
