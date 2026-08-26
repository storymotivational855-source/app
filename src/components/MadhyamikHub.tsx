import React, { useState } from "react";
import { Language, PYQuestion } from "../types";
import { SAMPLE_PYQ_DATABASE } from "../data/curriculumData";
import { EXTENDED_PYQ_DATABASE } from "../data/extendedPYQData";
import { speakText, stopSpeaking } from "../services/speech";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Filter,
  Flame,
  HelpCircle,
  Lightbulb,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";

interface MadhyamikHubProps {
  language: Language;
  onAskTutor: (q: string, subject?: string) => void;
  onStartMockTest: (subject: string) => void;
}

export const MadhyamikHub: React.FC<MadhyamikHubProps> = ({
  language,
  onAskTutor,
  onStartMockTest,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const allMadhyamikPYQs = [...EXTENDED_PYQ_DATABASE, ...SAMPLE_PYQ_DATABASE].filter(
    (q) => q.classLevel === "10"
  );

  const filteredQuestions = allMadhyamikPYQs.filter((q) => {
    const matchesSubject = selectedSubject === "All" || q.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    const matchesYear = selectedYear === "All" || q.year.toString() === selectedYear;
    const matchesSearch =
      !searchQuery.trim() ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.questionBengali && q.questionBengali.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesYear && matchesSearch;
  });

  const handleSpeak = (q: PYQuestion) => {
    if (speakingId === q.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    stopSpeaking();
    setSpeakingId(q.id);
    speakText(
      `${q.question}. Solution: ${q.solution}`,
      language,
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  // Madhyamik Subject Blueprints & Weightage
  const subjectBlueprints = [
    { name: "Bengali First Language (বাংলা)", icon: "📖", totalMarks: 90, highYieldTopics: ["জ্ঞানচক্ষু (গল্প)", "বহুরূপী ও নদীর বিদ্রোহ", "অস্ত্রের বিরুদ্ধে গান ও আফ্রিকা", "কোনি (উপন্যাস)", "কারক, সমাস ও প্রতিবেদন রচনা"] },
    { name: "Mathematics (গণিত)", icon: "📐", totalMarks: 90, highYieldTopics: ["Quadratic Equations", "Circle Theorems (Theorem 34/49)", "Trigonometry Heights & Distance", "Mensuration (Cylinder & Sphere)", "Statistics (Mean, Median, Ogive)"] },
    { name: "Physical Science (ভৌত বিজ্ঞান)", icon: "⚡", totalMarks: 90, highYieldTopics: ["Boyle & Charles Gas Laws", "Rayleigh Scattering & Lens", "Current Electricity (Ohm/Joule)", "Periodic Table Trends", "Organic Chemistry"] },
    { name: "Life Science (জীবন বিজ্ঞান)", icon: "🧬", totalMarks: 90, highYieldTopics: ["Plant Hormones (Auxin/Gibberellin)", "Mitosis vs Meiosis stages", "Mendel's Laws & Thalassemia", "Adaptation (Sundari/Camel)", "Nitrogen Cycle"] },
    { name: "History (ইতিহাস)", icon: "🏛️", totalMarks: 90, highYieldTopics: ["19th Century Bengal Renaissance", "Santhal & Indigo Revolts", "Revolt of 1857 in Bengal", "Visva-Bharati & Printing in Bengal"] },
    { name: "Geography (ভূগোল)", icon: "🌏", totalMarks: 90, highYieldTopics: ["River & Glacier landforms", "Atmospheric Global Winds", "West Bengal Physical & Agro-climatic regions", "Map Pointing (India & WB)"] },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Madhyamik Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-xs">
                WBBSE Madhyamik Pariksha
              </span>
              <span className="bg-amber-400 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full">
                Target 90%+ Blueprint
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === "Bengali"
                ? "মাধ্যমিক প্রস্তুতি ও বিগত বছরের প্রশ্ন সম্ভার"
                : "Madhyamik WBBSE Board Prep Command Center"}
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              {language === "Bengali"
                ? "পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের পাঠ্যসূচি অনুযায়ী অধ্যায়ভিত্তিক সাজেশন, বিগত বছরের প্রশ্নোত্তর এবং ধাপ অনুযায়ী নম্বর তোলার কৌশল।"
                : "Comprehensive WBBSE Class 10 preparation with previous-year question papers, high-yield topic weightage, step-marking breakdowns, and AI practice tests."}
            </p>
          </div>

          {/* Quick Mock Launch Button */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              id="btn-launch-madhyamik-mock"
              onClick={() => onStartMockTest("Mathematics")}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>{language === "Bengali" ? "মাধ্যমিক মক টেস্ট শুরু করুন" : "Start Madhyamik Mock Test"}</span>
            </button>
            <button
              id="btn-ask-madhyamik-strategy"
              onClick={() =>
                onAskTutor(
                  "Give me a high-scoring 60-day revision strategy for WBBSE Madhyamik examination with daily timetable and subject priorities in West Bengal."
                )
              }
              className="bg-white/10 hover:bg-white/20 text-indigo-200 border border-white/20 font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === "Bengali" ? "৬০ দিনের সেরা রুটিন জানুন" : "60-Day Top Revision Plan"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Yield Blueprints Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>
              {language === "Bengali"
                ? "মাধ্যমিক বিষয়ভিত্তিক ব্লুপ্রিন্ট ও গুরুত্বপূর্ণ অধ্যায়"
                : "WBBSE Madhyamik Subject Blueprints & High-Yield Topics"}
            </span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">90 Marks Written + 10 Internal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {subjectBlueprints.map((sb, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sb.icon}</span>
                    <span className="text-xs font-bold text-slate-900">{sb.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {sb.totalMarks} Marks
                  </span>
                </div>

                <div className="space-y-1 my-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    High Priority Chapters:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {sb.highYieldTopics.slice(0, 3).map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() =>
                  onAskTutor(
                    `Give me the top 5 most frequently asked questions and model answers for WBBSE Madhyamik in ${sb.name}.`
                  )
                }
                className="mt-3 w-full bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200 text-slate-700 text-xs font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-indigo-600" />
                <span>Get Chapter Insights</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Year Questions Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">
                {language === "Bengali"
                  ? "বিগত বছরের প্রশ্ন ও ধাপভিত্তিক সমাধান"
                  : "Madhyamik Previous-Year Questions & Solutions"}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Organized by Year, Subject, Chapter, Topic, Marks, and Complete Step-by-Step Marking Breakdown.
            </p>
          </div>

          {/* Sample Data Disclosure Badge */}
          <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start md:self-auto">
            <span className="text-amber-600 font-bold">ℹ️ Verified Model/Sample Papers:</span>
            <span>Aligned with official WBBSE syllabus</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic e.g. Discriminant, Gas..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Subject filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Subjects (সব বিষয়)</option>
            <option value="Mathematics">Mathematics (গণিত)</option>
            <option value="Physical Science">Physical Science (ভৌত বিজ্ঞান)</option>
            <option value="Life Science">Life Science (জীবন বিজ্ঞান)</option>
            <option value="History">History (ইতিহাস)</option>
          </select>

          {/* Year filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Exam Years (2015–2026)</option>
            <option value="2026">2026 Exam</option>
            <option value="2025">2025 Exam</option>
            <option value="2024">2024 Exam</option>
            <option value="2023">2023 Exam</option>
            <option value="2022">2022 Exam</option>
            <option value="2021">2021 Exam</option>
            <option value="2020">2020 Exam</option>
            <option value="2019">2019 Exam</option>
            <option value="2018">2018 Exam</option>
            <option value="2017">2017 Exam</option>
            <option value="2016">2016 Exam</option>
            <option value="2015">2015 Exam</option>
          </select>
        </div>

        {/* Questions list */}
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl">
              <p className="text-xs">No questions matched your search criteria.</p>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const isExpanded = expandedId === q.id;
              const isSpeaking = speakingId === q.id;

              return (
                <div
                  key={q.id}
                  className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      {/* Meta badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                        <span className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-md">
                          WBBSE {q.year}
                        </span>
                        <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md">
                          {q.subject}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                          {q.marks} Marks • {q.questionType}
                        </span>
                        <span className="text-slate-500 font-medium ml-1">
                          Chapter: {q.chapter} ({q.topic})
                        </span>
                      </div>

                      {/* Question text */}
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                      {q.questionBengali && (
                        <p className="text-xs text-slate-600 font-medium italic">
                          {q.questionBengali}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                      <button
                        onClick={() => handleSpeak(q)}
                        className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                          isSpeaking
                            ? "bg-indigo-600 text-white animate-pulse"
                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">Listen</span>
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : q.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Solution" : "View Solution"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Verified Solution */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                      <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans shadow-inner">
                        {q.solution}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <span className="text-[11px] text-slate-500 font-medium">
                          Difficulty Level: <strong className="text-slate-700">{q.difficulty}</strong>
                        </span>
                        <button
                          onClick={() => onAskTutor(`Explain the solution of this Madhyamik question in detail: "${q.question}"`, q.subject)}
                          className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1 underline cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Ask AI Tutor to break this down step-by-step</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
