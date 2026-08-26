import React, { useState } from "react";
import { Language, SubjectInfo, Chapter } from "../types";
import { SUBJECTS } from "../data/curriculumData";
import {
  BookOpen,
  Sparkles,
  Zap,
  ChevronRight,
  Calculator,
  Compass,
  ScrollText,
  Flame,
  CheckCircle2,
  Atom,
  HelpCircle,
  FolderOpen,
} from "lucide-react";

interface CurriculumExplorerProps {
  currentClass: string;
  language: Language;
  onOpenTopic: (subject: string, chapter: string, action: "explain" | "quiz" | "summary") => void;
}

export const CurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  currentClass,
  language,
  onOpenTopic,
}) => {
  const currentClassNum = parseInt(currentClass, 10);
  const availableSubjects = SUBJECTS.filter((s) => s.classes.includes(currentClassNum));

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    availableSubjects[0]?.id || ""
  );

  const activeSubject =
    availableSubjects.find((s) => s.id === selectedSubjectId) || availableSubjects[0];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case "Calculator":
        return <Calculator className="w-5 h-5" />;
      case "Atom":
        return <Atom className="w-5 h-5" />;
      case "Compass":
        return <Compass className="w-5 h-5" />;
      case "ScrollText":
        return <ScrollText className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-indigo-900 rounded-2xl sm:rounded-3xl p-4.5 sm:p-7 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              WBBSE / WBCHSE Curriculum
            </span>
            <span className="bg-emerald-300 text-emerald-950 text-xs font-bold px-2 py-0.5 rounded-full">
              Class {currentClass}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            {language === "Bengali"
              ? `শ্রেণি ${currentClass} পাঠ্যক্রম ও অধ্যায়সমূহ`
              : `Class ${currentClass} Subjects & Chapters`}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            {language === "Bengali"
              ? "যেকোনো অধ্যায়ে ক্লিক করে এআই শিক্ষকের কাছ থেকে বিশদ ধারণা, সূত্রাবলী ও অনুশীলনী শুরু করুন।"
              : "Select any subject and chapter to trigger instant AI conceptual breakdowns, key theorems, and personalized quizzes."}
          </p>
        </div>
      </div>

      {/* Subject Selector Pills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
        {availableSubjects.map((subj) => {
          const isSelected = activeSubject?.id === subj.id;
          return (
            <button
              key={subj.id}
              id={`subj-pill-${subj.id}`}
              onClick={() => setSelectedSubjectId(subj.id)}
              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[85px] sm:min-h-[90px] ${
                isSelected
                  ? "bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/30 scale-[1.02]"
                  : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-800 shadow-2xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? "bg-emerald-800 text-white" : "bg-slate-100 text-emerald-700"
                  }`}
                >
                  {getSubjectIcon(subj.iconName || subj.icon || "")}
                </div>
                {subj.isMadhyamikCore && (
                  <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">
                    Core
                  </span>
                )}
              </div>
              <div>
                <span className="text-xs font-bold block truncate">
                  {subj.name.split(" ")[0]}
                </span>
                <span className="text-[10px] opacity-75 block truncate">
                  {subj.bengaliName}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chapters list for Active Subject */}
      {activeSubject && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 lg:p-7 border border-slate-200 shadow-xs space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5 sm:pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {activeSubject.name} ({activeSubject.bengaliName})
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {activeSubject.chapters.length} structured syllabus chapters with topics and board weightage.
              </p>
            </div>

            <button
              onClick={() => onOpenTopic(activeSubject.name, "All Chapters", "quiz")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Full Subject Mock Quiz</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {activeSubject.chapters.map((ch, idx) => (
              <div
                key={ch.id}
                className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-4.5 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Chapter {idx + 1}
                    </span>
                    {ch.highYield && (
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-700" />
                        <span>High Yield (Board)</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{ch.name}</h4>
                  <p className="text-xs text-slate-600 font-medium italic mt-0.5">
                    {ch.bengaliName}
                  </p>

                  {/* Topics List */}
                  <div className="mt-2.5 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                      Key Topics:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ch.topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-white border border-slate-200 text-slate-700 text-[11px] px-2 py-0.5 rounded-md"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chapter Actions */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2">
                  <button
                    id={`btn-explain-ch-${ch.id}`}
                    onClick={() => onOpenTopic(activeSubject.name, ch.name, "explain")}
                    className="flex-1 bg-white hover:bg-emerald-50 text-emerald-800 hover:text-emerald-900 border border-emerald-300 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Explain Lesson</span>
                  </button>

                  <button
                    id={`btn-quiz-ch-${ch.id}`}
                    onClick={() => onOpenTopic(activeSubject.name, ch.name, "quiz")}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quiz</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
