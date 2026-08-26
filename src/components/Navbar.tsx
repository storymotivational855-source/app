import React, { useState, useEffect } from "react";
import { Language } from "../types";
import { ALL_CLASSES } from "../data/curriculumData";
import {
  GraduationCap,
  Globe,
  Sparkles,
  BookOpen,
  Camera,
  Award,
  FileQuestion,
  CheckCircle,
  BarChart3,
  BotMessageSquare,
  Bookmark,
  Wifi,
  WifiOff,
  Headphones,
  HelpCircle,
  Play,
  Trophy,
  Brain,
} from "lucide-react";

interface NavbarProps {
  currentClass: string;
  onClassChange: (classLevel: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  savedNotesCount?: number;
  streakDays?: number;
  onOpenSupport?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentClass,
  onClassChange,
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  savedNotesCount = 0,
  streakDays = 4,
  onOpenSupport,
}) => {
  const currentClassNum = parseInt(currentClass, 10);
  const isPrimary = currentClassNum <= 5;
  const isMadhyamik = currentClassNum === 10;
  const isHS = currentClassNum >= 11;

  // Real-time online/offline detector
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top utility bar */}
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-10 py-3 flex items-center justify-between gap-3">
        {/* Brand & Crest */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
                WB Study <span className="text-emerald-600">AI</span>
              </span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 hidden sm:inline-block">
                WBBSE & WBCHSE
              </span>

              {/* Online/Offline Status Indicator */}
              {isOnline ? (
                <span
                  title="App shell and core syllabus assets are cached for offline use."
                  className="flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full cursor-help"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <Wifi className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">Online • Offline Ready</span>
                  <span className="sm:hidden">Online</span>
                </span>
              ) : (
                <span
                  title="Offline Mode Active: Your saved notes, formulas, and PYQs are available offline."
                  className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full shadow-xs animate-bounce"
                >
                  <WifiOff className="w-2.5 h-2.5 text-amber-700" />
                  <span>Offline Mode</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              {language === "Bengali"
                ? "পশ্চিমবঙ্গ বোর্ড শিক্ষার্থীদের সর্বাঙ্গীন এআই সহায়িকা ও অফলাইন রিভিশন হাব"
                : language === "Hindi"
                ? "पश्चिम बंगाल बोर्ड के छात्रों के लिए सम्पूर्ण AI लर्निंग और रिवीज़न ऐप"
                : "West Bengal Board AI Learning Assistant, Board Exam Prediction & Video Classroom"}
            </p>
          </div>
        </div>

        {/* Right Controls: Class Switcher, Language, Saved Notes & Streak */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 24/7 Customer Support button */}
          {onOpenSupport && (
            <button
              id="nav-customer-support-btn"
              onClick={onOpenSupport}
              title="Customer & Student Support Desk"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs transition-colors cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">
                {language === "Bengali" ? "কাস্টমার সাপোর্ট" : language === "Hindi" ? "सपोर्ट" : "Support"}
              </span>
            </button>
          )}

          {/* Quick Saved Notes Button */}
          <button
            id="nav-quick-notes-btn"
            onClick={() => onTabChange("dashboard")}
            title="View your saved notes (downloadable as PDF)"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200/80"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Saved Notes</span>
            <span
              className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                activeTab === "dashboard"
                  ? "bg-white text-indigo-700"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {savedNotesCount}
            </span>
          </button>

          {/* Streak indicator */}
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1.5 rounded-lg text-amber-900 text-xs font-semibold">
            <span className="text-sm">🔥</span>
            <span>{streakDays} Days</span>
          </div>

          {/* Class Selector Dropdown */}
          <div className="relative">
            <select
              id="class-selector-dropdown"
              value={currentClass}
              onChange={(e) => onClassChange(e.target.value)}
              className="text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg px-2.5 py-1.5 pr-6 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-colors"
            >
              {ALL_CLASSES.map((c) => (
                <option key={c.level} value={c.level}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-0.5">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5 hidden sm:block" />
            <button
              id="lang-btn-en"
              onClick={() => onLanguageChange("English")}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                language === "English"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              EN
            </button>
            <button
              id="lang-btn-bn"
              onClick={() => onLanguageChange("Bengali")}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                language === "Bengali"
                  ? "bg-emerald-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              বাংলা
            </button>
            <button
              id="lang-btn-hi"
              onClick={() => onLanguageChange("Hindi")}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                language === "Hindi"
                  ? "bg-rose-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-10 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2">
          {/* 1. AI Tutor */}
          <button
            id="nav-tab-tutor"
            onClick={() => onTabChange("ai-tutor")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "ai-tutor"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            <BotMessageSquare className="w-4 h-4 text-emerald-400" />
            <span>{language === "Bengali" ? "🤖 এআই টিউটর" : "🤖 AI Tutor"}</span>
          </button>

          {/* 2. Scan Question */}
          <button
            id="nav-tab-image"
            onClick={() => onTabChange("photo-solver")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "photo-solver"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            <Camera className="w-4 h-4 text-cyan-500" />
            <span>{language === "Bengali" ? "📸 প্রশ্ন স্ক্যান" : "📸 Scan Question"}</span>
          </button>

          {/* 3. Class 1-5 Kids Learning */}
          <button
            id="nav-tab-primary-hub"
            onClick={() => onTabChange("primary-hub")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "primary-hub"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-amber-900 bg-amber-50/70 hover:bg-amber-100 border border-amber-200/60"
            }`}
          >
            <span>👶</span>
            <span>{language === "Bengali" ? "Class 1–5 Kids" : "Class 1–5 Kids"}</span>
          </button>

          {/* 4. Curriculum (Class 6 - 12) */}
          <button
            id="nav-tab-curriculum"
            onClick={() => onTabChange("curriculum")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "curriculum"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>{language === "Bengali" ? "📚 পাঠ্যক্রম (6–12)" : "📚 Curriculum"}</span>
          </button>

          {/* 5. 🎓 BOARD EXAM (2015-2026 PYQ, AI 2027 Prediction, 2027 Mock Tests) */}
          <button
            id="nav-tab-board-exam"
            onClick={() => onTabChange("board-exam")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "board-exam"
                ? "bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-md ring-2 ring-indigo-300"
                : "text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-300"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>{language === "Bengali" ? "🎓 বোর্ড পরীক্ষা (2027)" : "🎓 Board Exam Hub"}</span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              2027
            </span>
          </button>

          {/* 6. Educational Videos */}
          <button
            id="nav-tab-videos"
            onClick={() => onTabChange("videos")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "videos"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-purple-900 bg-purple-50/70 hover:bg-purple-100 border border-purple-200/60"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current text-purple-600" />
            <span>{language === "Bengali" ? "▶️ ভিডিও ক্লাস" : "▶️ Educational Videos"}</span>
          </button>

          {/* 7. Practice Quiz */}
          <button
            id="nav-tab-quiz"
            onClick={() => onTabChange("quiz")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "quiz"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>{language === "Bengali" ? "📝 কুইজ ও প্র্যাকটিস" : "📝 Practice Quiz"}</span>
          </button>

          {/* 8. Student Dashboard & Progress */}
          <button
            id="nav-tab-dashboard"
            onClick={() => onTabChange("dashboard")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            <BarChart3 className="w-4 h-4 text-violet-500" />
            <span>{language === "Bengali" ? "📊 প্রগ্রেস ও টাইমার" : "📊 Progress"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
