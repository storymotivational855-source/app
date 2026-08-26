import React, { useState } from "react";
import { Language, PYQuestion } from "../types";
import { SAMPLE_PYQ_DATABASE, SUBJECTS } from "../data/curriculumData";
import { EXTENDED_PYQ_DATABASE } from "../data/extendedPYQData";
import { speakText, stopSpeaking } from "../services/speech";
import {
  GraduationCap,
  Sparkles,
  Zap,
  BookOpen,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  Atom,
  FlaskConical,
  Sigma,
  Microscope,
  TrendingUp,
} from "lucide-react";

interface HigherSecondaryHubProps {
  currentClass: string;
  language: Language;
  onAskTutor: (q: string, subject?: string) => void;
  onStartMockTest: (subject: string) => void;
}

export const HigherSecondaryHub: React.FC<HigherSecondaryHubProps> = ({
  currentClass,
  language,
  onAskTutor,
  onStartMockTest,
}) => {
  const [selectedStream, setSelectedStream] = useState<"Science" | "Arts" | "Commerce">("Science");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allHSPYQs = [...EXTENDED_PYQ_DATABASE, ...SAMPLE_PYQ_DATABASE].filter(
    (q) => q.classLevel === "12" || q.board.includes("WBCHSE")
  );

  const filteredHSQuestions = allHSPYQs.filter((q) => {
    const matchesSearch =
      !searchQuery.trim() ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.questionBengali && q.questionBengali.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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

  const streamSubjects = {
    Science: [
      { name: "Physics (পদার্থবিদ্যা)", icon: Atom, desc: "Electrostatics, Optics, Magnetism, Semiconductor", color: "text-amber-600 bg-amber-50" },
      { name: "Chemistry (রসায়ন)", icon: FlaskConical, desc: "Solutions, Electrochemistry, Coordination Compounds, Organic Mechanisms", color: "text-teal-600 bg-teal-50" },
      { name: "Mathematics (উচ্চতর গণিত)", icon: Sigma, desc: "Calculus (Integration/Diff), 3D Geometry, Probability, Matrices", color: "text-blue-600 bg-blue-50" },
      { name: "Biological Sciences (জীববিদ্যা)", icon: Microscope, desc: "Genetics, Molecular Biology, Biotechnology, Ecology", color: "text-emerald-600 bg-emerald-50" },
    ],
    Commerce: [
      { name: "Economics (অর্থনীতি)", icon: TrendingUp, desc: "Microeconomics (Elasticity/Cost), Macroeconomics (GDP/RBI Tools)", color: "text-rose-600 bg-rose-50" },
      { name: "Accountancy (হিসাবশাস্ত্র)", icon: Sigma, desc: "Partnership, Company Accounts, Cash Flow Statements", color: "text-indigo-600 bg-indigo-50" },
      { name: "Business Studies (কারবারি শিক্ষা)", icon: BookOpen, desc: "Principles of Management, Marketing, Financial Markets", color: "text-amber-600 bg-amber-50" },
    ],
    Arts: [
      { name: "History (ইতিহাস)", icon: BookOpen, desc: "Colonialism, Decolonization, Cold War, Nationalist Movements", color: "text-purple-600 bg-purple-50" },
      { name: "Geography (ভূগোল)", icon: BookOpen, desc: "Geomorphology, Population Geography, Regional Planning of Bengal", color: "text-cyan-600 bg-cyan-50" },
      { name: "Political Science (রাষ্ট্রবিজ্ঞান)", icon: BookOpen, desc: "International Relations, Indian Constitution, UNO", color: "text-emerald-600 bg-emerald-50" },
    ],
  };

  return (
    <div className="w-full space-y-6">
      {/* Higher Secondary Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-400/20">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-xs">
                WBCHSE Higher Secondary (Class {currentClass})
              </span>
              <span className="bg-cyan-400 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full">
                Semester & Board Formats
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === "Bengali"
                ? "উচ্চ মাধ্যমিক প্রস্তুতি ও বিষয়ভিত্তিক অনুশীলন"
                : "Higher Secondary (WBCHSE) Hub"}
            </h2>
            <p className="text-sm text-blue-100 max-w-xl">
              {language === "Bengali"
                ? "উচ্চ মাধ্যমিক বিজ্ঞান, কলা ও বাণিজ্য বিভাগের সম্পূর্ণ প্রশ্নোত্তর, গাণিতিক সমাধান ও বিস্তারিত ধারণা।"
                : "Advanced conceptual breakdowns, numerical problem derivations, WBCHSE sample question papers, and interactive AI tutoring for Science, Arts, and Commerce."}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
            <button
              id="btn-hs-mock-test"
              onClick={() => onStartMockTest("Physics")}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>{language === "Bengali" ? "উচ্চ মাধ্যমিক মক টেস্ট দিন" : "Take WBCHSE Mock Test"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stream Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {(["Science", "Commerce", "Arts"] as const).map((st) => (
          <button
            key={st}
            id={`stream-tab-${st}`}
            onClick={() => setSelectedStream(st)}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
              selectedStream === st
                ? "bg-white text-blue-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {st} Stream ({st === "Science" ? "বিজ্ঞান" : st === "Commerce" ? "বাণিজ্য" : "কলা"})
          </button>
        ))}
      </div>

      {/* Stream Subjects Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {streamSubjects[selectedStream].map((subj, idx) => {
          const Icon = subj.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl ${subj.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{subj.name}</h4>
                    <span className="text-[11px] text-slate-500 font-semibold">WBCHSE Core Syllabus</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2">{subj.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onAskTutor(`Explain the top high-scoring concepts and derivations in WBCHSE ${subj.name}.`, subj.name)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain Core Concepts</span>
                </button>
                <button
                  onClick={() => onStartMockTest(subj.name.split(" ")[0])}
                  className="text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-800 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Practice Quiz →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* WBCHSE Sample & Model Question Papers */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span>WBCHSE Previous-Year Sample & Model Papers</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified sample questions structured with numerical step derivations and marking criteria.
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Gauss, Nernst..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredHSQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const isSpeaking = speakingId === q.id;

            return (
              <div
                key={q.id}
                className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                      <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md">
                        WBCHSE {q.year}
                      </span>
                      <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md">
                        {q.subject}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        {q.marks} Marks • {q.questionType}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                    {q.questionBengali && (
                      <p className="text-xs text-slate-600 font-medium italic">
                        {q.questionBengali}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                    <button
                      onClick={() => handleSpeak(q)}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                        isSpeaking
                          ? "bg-blue-600 text-white animate-pulse"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide" : "Derivation"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans shadow-inner">
                      {q.solution}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          onAskTutor(
                            `Explain the mathematical derivation and key steps for this WBCHSE question: "${q.question}"`,
                            q.subject
                          )
                        }
                        className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 underline cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI Tutor for step-by-step doubt clearing</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
