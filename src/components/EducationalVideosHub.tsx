import React, { useState } from "react";
import { Language, EducationalVideoLesson } from "../types";
import { EDUCATIONAL_VIDEOS_DATA } from "../data/videoLessonsData";
import {
  Play,
  Video,
  Sparkles,
  Search,
  BookOpen,
  Clock,
  CheckCircle,
  HelpCircle,
  Volume2,
  Share2,
  Bookmark,
  ChevronRight,
  Filter,
} from "lucide-react";

interface EducationalVideosHubProps {
  currentClass: string;
  language: Language;
  onAskTutor: (q: string, subject?: string) => void;
}

export const EducationalVideosHub: React.FC<EducationalVideosHubProps> = ({
  currentClass,
  language,
  onAskTutor,
}) => {
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>(
    parseInt(currentClass) <= 5 ? "Primary" : currentClass === "10" ? "10" : currentClass === "12" ? "12" : "All"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<EducationalVideoLesson | null>(
    EDUCATIONAL_VIDEOS_DATA[3] || EDUCATIONAL_VIDEOS_DATA[0]
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const filteredVideos = EDUCATIONAL_VIDEOS_DATA.filter((vid) => {
    let matchClass = true;
    if (selectedClassFilter === "Primary") {
      matchClass = parseInt(vid.classLevel) <= 5;
    } else if (selectedClassFilter === "10") {
      matchClass = vid.classLevel === "10";
    } else if (selectedClassFilter === "12") {
      matchClass = vid.classLevel === "12";
    }

    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      vid.title.toLowerCase().includes(q) ||
      (vid.bengaliTitle && vid.bengaliTitle.toLowerCase().includes(q)) ||
      vid.subject.toLowerCase().includes(q) ||
      vid.chapter.toLowerCase().includes(q);

    return matchClass && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide">
              <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>WB STUDY AI Video Classroom</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {language === "Bengali"
                ? "▶️ শিক্ষামূলক ভিডিও ক্লাস ও সচিত্র অ্যানিমেশন"
                : "▶️ High-Yield Educational Video Lessons & Visualizations"}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              {language === "Bengali"
                ? "প্রথম শ্রেণি থেকে দ্বাদশ শ্রেণি পর্যন্ত পাঠ্যবইয়ের অধ্যায়ভিত্তিক আকর্ষণীয় ভিডিও, মূল পয়েন্ট ও AI অনুশীলন!"
                : "Visual animated lessons, key formulas, concept breakdowns, and interactive AI practice for all classes."}
            </p>
          </div>

          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl border border-white/20 shadow-inner">
            🎬
          </div>
        </div>
      </div>

      {/* Main Content: Active Video Player + Video Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Video Showcase */}
        <div className="lg:col-span-2 space-y-4">
          {activeVideo ? (
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden space-y-4">
              {/* Simulated Video Stage */}
              <div
                className={`relative aspect-video bg-gradient-to-br ${activeVideo.accentColor} flex flex-col items-center justify-center p-6 text-white text-center shadow-inner`}
              >
                <div className="text-6xl sm:text-7xl mb-3 drop-shadow-md animate-bounce">
                  {activeVideo.thumbnailEmoji}
                </div>
                <span className="text-xs font-black uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md mb-2">
                  {activeVideo.subject} • Class {activeVideo.classLevel}
                </span>
                <h3 className="text-lg sm:text-2xl font-black max-w-lg drop-shadow-md">
                  {language === "Bengali" && activeVideo.bengaliTitle
                    ? activeVideo.bengaliTitle
                    : activeVideo.title}
                </h3>

                {/* Play Simulator Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="mt-4 bg-white/90 hover:bg-white text-slate-900 px-6 py-2.5 rounded-full font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current text-rose-600" />
                  <span>{isPlaying ? "Pause Lesson" : "Play Visual Lesson"}</span>
                </button>

                <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-md text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  ⏱️ {activeVideo.duration}
                </div>
              </div>

              {/* Video Details & AI Practice Bar */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {activeVideo.title}
                    </h4>
                    {activeVideo.bengaliTitle && (
                      <p className="text-xs font-bold text-slate-600 mt-0.5">
                        {activeVideo.bengaliTitle}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-black bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-200 shrink-0">
                    {activeVideo.chapter}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {language === "Bengali"
                    ? activeVideo.summaryBengali
                    : activeVideo.summaryEnglish}
                </p>

                {/* Key Concepts Tags */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Key Highlights Covered in this Lesson:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeVideo.keyConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-50 text-purple-900 border border-purple-200 text-xs font-semibold px-3 py-1 rounded-xl"
                      >
                        ✓ {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Practice with AI Prompt */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Ready to test your understanding?</span>
                    </span>
                    <p className="text-xs text-amber-800">
                      "{activeVideo.practicePrompt}"
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      onAskTutor(activeVideo.practicePrompt, activeVideo.subject)
                    }
                    className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md cursor-pointer whitespace-nowrap self-start sm:self-auto transition-all"
                  >
                    Solve with AI Tutor 🚀
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right 1 Col: Video Playlist & Filters */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>All Video Lessons</span>
              <span className="text-xs font-bold text-slate-500">
                {filteredVideos.length} Available
              </span>
            </h4>

            {/* Filter Buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: "All", label: "All Classes" },
                { id: "Primary", label: "👶 Class 1–5" },
                { id: "10", label: "📘 Madhyamik" },
                { id: "12", label: "🎓 HS (11-12)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedClassFilter(btn.id)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedClassFilter === btn.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search lessons or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Playlist Cards */}
            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredVideos.map((vid) => {
                const isSelected = activeVideo?.id === vid.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setActiveVideo(vid);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-400 shadow-xs ring-2 ring-indigo-300/40"
                        : "bg-white hover:bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${vid.accentColor} text-white flex items-center justify-center text-xl shrink-0 shadow-xs`}
                    >
                      {vid.thumbnailEmoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-indigo-700 uppercase block">
                        Class {vid.classLevel} • {vid.subject}
                      </span>
                      <h5 className="text-xs font-extrabold text-slate-900 truncate">
                        {vid.title}
                      </h5>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {vid.duration}
                      </span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
