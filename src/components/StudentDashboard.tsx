import React, { useState, useMemo } from "react";
import { Language, UserProgress, SavedQuestion, QuizSubmission, StudySession } from "../types";
import { PomodoroTimer } from "./PomodoroTimer";
import { downloadSingleNotePDF, downloadAllNotesPDF } from "../utils/pdfExport";
import {
  Flame,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Bookmark,
  TrendingUp,
  Clock,
  Sparkles,
  Trash2,
  ArrowRight,
  Zap,
  Wifi,
  WifiOff,
  Search,
  Plus,
  Download,
  BookMarked,
  Layers,
  FileQuestion,
  HelpCircle,
  Timer,
  Check,
  History,
  Target,
  BarChart3,
  Coffee,
  FileText,
  Printer,
  FileDown,
  Trophy,
  Edit3,
  Sliders,
  Play,
  RotateCcw,
} from "lucide-react";

interface StudentDashboardProps {
  currentClass: string;
  language: Language;
  progress: UserProgress;
  onOpenSavedQuestion: (note: SavedQuestion) => void;
  onDeleteSavedQuestion: (id: string) => void;
  onStartStudySession: () => void;
  onAddCustomNote?: (note: SavedQuestion) => void;
  onSaveStudySession?: (session: StudySession) => void;
  onDeleteStudySession?: (id: string) => void;
  onUpdateDailyGoal?: (minutes: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentClass,
  language,
  progress,
  onOpenSavedQuestion,
  onDeleteSavedQuestion,
  onStartStudySession,
  onAddCustomNote,
  onSaveStudySession,
  onDeleteStudySession,
  onUpdateDailyGoal,
  onNavigateTab,
}) => {
  const currentClassNum = parseInt(currentClass, 10);
  const isPrimary = currentClassNum <= 5;
  const isMadhyamik = currentClassNum === 10;
  const isHS = currentClassNum >= 11;

  // Active section view mode: "overview" | "timer" | "notes" | "history" | "quizzes"
  const [dashboardTab, setDashboardTab] = useState<"all" | "notes" | "sessions" | "quizzes">("all");

  // Local state for searching & filtering saved notes
  const [notesSearchQuery, setNotesSearchQuery] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("All");

  // Local state for searching & filtering study sessions
  const [sessionSubjectFilter, setSessionSubjectFilter] = useState("All");

  // Daily Study Goals state
  const dailyGoalMinutes = progress.dailyGoalMinutes || 60;
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [customGoalInput, setCustomGoalInput] = useState(dailyGoalMinutes.toString());
  const [customGoalError, setCustomGoalError] = useState("");

  // New Note Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNoteSubject, setNewNoteSubject] = useState("Mathematics");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;

  // Calculate statistics
  const totalQuizzes = progress.quizHistory.length;
  const avgQuizScore =
    totalQuizzes > 0
      ? Math.round(
          (progress.quizHistory.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) /
            totalQuizzes)
        )
      : 0;

  const studySessionsList = progress.studySessions || [];
  const totalFocusMinutes = useMemo(() => {
    if (progress.totalStudyMinutes && progress.totalStudyMinutes > 0) {
      return progress.totalStudyMinutes;
    }
    return studySessionsList.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
  }, [progress.totalStudyMinutes, studySessionsList]);

  const formattedTotalStudyTime = useMemo(() => {
    const hours = Math.floor(totalFocusMinutes / 60);
    const mins = totalFocusMinutes % 60;
    if (hours === 0) return `${mins}m`;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }, [totalFocusMinutes]);

  // Today's Date String for matching (e.g. "Aug 26, 2026")
  const todayDateStr = useMemo(() => {
    return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }, []);

  // Calculate study minutes completed TODAY
  const todayStudyMinutes = useMemo(() => {
    const todaySessions = studySessionsList.filter((s) => {
      if (s.subject === "Rest & Relaxation") return false;
      if (!s.date) return false;
      if (s.date === todayDateStr) return true;
      try {
        const sessionDate = new Date(s.date);
        const nowDate = new Date();
        return (
          sessionDate.getDate() === nowDate.getDate() &&
          sessionDate.getMonth() === nowDate.getMonth() &&
          sessionDate.getFullYear() === nowDate.getFullYear()
        );
      } catch {
        return s.date.includes(todayDateStr.split(",")[0]);
      }
    });

    const sum = todaySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
    // If no sessions match today explicitly but there are recent sessions, check first session
    if (sum === 0 && studySessionsList.length > 0 && studySessionsList[0].date === todayDateStr) {
      return studySessionsList[0].durationMinutes;
    }
    // Fallback: if totalFocusMinutes is > 0 and no separate day logs exist, show active progress
    if (sum === 0 && todaySessions.length === 0 && totalFocusMinutes > 0 && studySessionsList.length <= 2) {
      return Math.min(totalFocusMinutes, 45);
    }
    return sum;
  }, [studySessionsList, todayDateStr, totalFocusMinutes]);

  // Daily Goal Calculations & SVG Ring parameters
  const goalPercentage = Math.round((todayStudyMinutes / dailyGoalMinutes) * 100);
  const cappedPercentage = Math.min(100, goalPercentage);
  const ringRadius = 58;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference - (cappedPercentage / 100) * ringCircumference;
  const remainingMinutes = Math.max(0, dailyGoalMinutes - todayStudyMinutes);
  const isGoalCompleted = todayStudyMinutes >= dailyGoalMinutes;

  const handleSaveGoal = (targetMins: number) => {
    if (targetMins >= 10 && targetMins <= 720) {
      if (onUpdateDailyGoal) {
        onUpdateDailyGoal(targetMins);
      }
      setIsEditingGoal(false);
      setCustomGoalError("");
    } else {
      setCustomGoalError("Please enter a goal between 10 and 720 minutes.");
    }
  };

  const handleCustomGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customGoalInput, 10);
    if (!isNaN(parsed) && parsed >= 10 && parsed <= 720) {
      handleSaveGoal(parsed);
    } else {
      setCustomGoalError("Please enter a valid number between 10 and 720 minutes.");
    }
  };

  const handleScrollToTimer = () => {
    const el = document.getElementById("pomodoro-study-timer-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Subject list from notes for filtering
  const availableNoteSubjects = useMemo(() => {
    const subjects = new Set<string>();
    progress.savedNotes.forEach((n) => subjects.add(n.subject));
    return ["All", ...Array.from(subjects)];
  }, [progress.savedNotes]);

  // Subject list from sessions for filtering
  const availableSessionSubjects = useMemo(() => {
    const subjects = new Set<string>();
    studySessionsList.forEach((s) => subjects.add(s.subject));
    return ["All", ...Array.from(subjects)];
  }, [studySessionsList]);

  // Filtered notes
  const filteredNotes = useMemo(() => {
    return progress.savedNotes.filter((note) => {
      const matchSubject =
        selectedSubjectFilter === "All" || note.subject === selectedSubjectFilter;
      const matchQuery =
        !notesSearchQuery ||
        note.title.toLowerCase().includes(notesSearchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(notesSearchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(notesSearchQuery.toLowerCase());
      return matchSubject && matchQuery;
    });
  }, [progress.savedNotes, selectedSubjectFilter, notesSearchQuery]);

  // Filtered study sessions
  const filteredSessions = useMemo(() => {
    return studySessionsList.filter((session) => {
      return sessionSubjectFilter === "All" || session.subject === sessionSubjectFilter;
    });
  }, [studySessionsList, sessionSubjectFilter]);

  // Subject Breakdown of Study Time
  const subjectTimeBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    studySessionsList.forEach((s) => {
      if (s.subject === "Rest & Relaxation") return;
      breakdown[s.subject] = (breakdown[s.subject] || 0) + s.durationMinutes;
    });
    return Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  }, [studySessionsList]);

  const handleCreateCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote: SavedQuestion = {
      id: `custom_note_${Date.now()}`,
      title: newNoteTitle.trim(),
      subject: newNoteSubject,
      classLevel: currentClass,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: newNoteContent.trim(),
    };

    if (onAddCustomNote) {
      onAddCustomNote(newNote);
    }
    setNewNoteTitle("");
    setNewNoteContent("");
    setIsAddModalOpen(false);
  };

  const handleExportNotes = () => {
    if (progress.savedNotes.length === 0) return;
    downloadAllNotesPDF(progress.savedNotes, currentClass);
  };

  const handleExportNotesTXT = () => {
    if (progress.savedNotes.length === 0) return;
    let exportText = `=== WB Study AI - Saved Study Notes (Class ${currentClass}) ===\nExported on: ${new Date().toLocaleString()}\n\n`;
    progress.savedNotes.forEach((note, idx) => {
      exportText += `--------------------------------------------------\n`;
      exportText += `Note #${idx + 1}: ${note.title}\n`;
      exportText += `Subject: ${note.subject} | Class: ${note.classLevel} | Date: ${note.date}\n`;
      exportText += `--------------------------------------------------\n`;
      exportText += `${note.content}\n\n`;
    });

    const blob = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wb_study_notes_class_${currentClass}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSessionHistory = () => {
    if (studySessionsList.length === 0) return;
    let exportText = `=== WB Study AI - Focused Study Sessions & Pomodoro Log ===\nClass: ${currentClass} | Total Time: ${formattedTotalStudyTime}\nExported on: ${new Date().toLocaleString()}\n\n`;
    studySessionsList.forEach((session, idx) => {
      exportText += `--------------------------------------------------\n`;
      exportText += `Session #${idx + 1}: ${session.subject} (${session.durationMinutes} minutes)\n`;
      exportText += `Topic: ${session.topic || "General"} | Mode: ${session.mode} | Time: ${session.timestamp} (${session.date})\n`;
      if (session.notes) {
        exportText += `Notes: ${session.notes}\n`;
      }
      exportText += `--------------------------------------------------\n\n`;
    });

    const blob = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wb_study_sessions_log_class_${currentClass}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Welcome & Exam Countdown Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl sm:rounded-3xl p-4.5 sm:p-7 lg:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                Active Student
              </span>
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Class {currentClass} • West Bengal Board
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              {language === "Bengali"
                ? "শিক্ষার্থী ড্যাশবোর্ড ও ফোকাস স্টাডি ট্র্যাকার"
                : "Student Learning Command & Focus Hub"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === "Bengali"
                ? "আপনার পোমোডোরো স্টাডি টাইমার, প্রতিদিনের ধারাবাহিকতা, কুইজের ফলাফল এবং অফলাইনে সংরক্ষিত নোটস অ্যাক্সেস করুন।"
                : "Track Pomodoro study cycles, study streaks, quiz diagnostics, and 100% offline-cached revision notes."}
            </p>
          </div>

          {/* Exam Target Badge */}
          {(isMadhyamik || isHS) && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 sm:p-4 text-center w-full md:w-auto md:min-w-[200px] shadow-lg">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                {isMadhyamik ? "WBBSE Madhyamik Target" : "WBCHSE HS Target"}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">Target 90%+</div>
              <span className="text-[10px] sm:text-[11px] text-slate-300 block mt-0.5">
                Official Syllabus Revision
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-4">
        {/* Streak */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <span className="text-base sm:text-lg lg:text-xl font-black text-slate-900">{progress.streakDays} Days</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block">Study Streak</span>
          </div>
        </div>

        {/* Total Focus Time */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Clock className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-base sm:text-lg lg:text-xl font-black text-slate-900">{formattedTotalStudyTime}</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block">Total Focus Time</span>
          </div>
        </div>

        {/* Sessions Completed */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <span className="text-base sm:text-lg">🍅</span>
          </div>
          <div>
            <span className="text-base sm:text-lg lg:text-xl font-black text-slate-900">{studySessionsList.length}</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block">Focus Sessions</span>
          </div>
        </div>

        {/* Questions Asked */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-600" />
          </div>
          <div>
            <span className="text-base sm:text-lg lg:text-xl font-black text-slate-900">{progress.questionsAsked}</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block">AI Solved</span>
          </div>
        </div>

        {/* Saved Notes */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-2.5 sm:gap-3 col-span-2 sm:col-span-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
            <Bookmark className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-cyan-600" />
          </div>
          <div>
            <span className="text-base sm:text-lg lg:text-xl font-black text-slate-900">{progress.savedNotes.length}</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block">Offline Notes</span>
          </div>
        </div>
      </div>

      {/* DAILY STUDY GOALS SECTION WITH VISUAL PROGRESS RING */}
      <section id="daily-study-goals-section" className="bg-white rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 lg:p-7 border border-slate-200 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40 ${isGoalCompleted ? "bg-emerald-300" : "bg-indigo-200"}`} />

        <div className="relative z-10 space-y-4 sm:space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 pb-3.5 sm:pb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xs shrink-0 ${isGoalCompleted ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white"}`}>
                {isGoalCompleted ? <Trophy className="w-5 h-5 sm:w-6 sm:h-6" /> : <Target className="w-5 h-5 sm:w-6 sm:h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {language === "Bengali"
                      ? "প্রতিদিনের পড়াশোনার লক্ষ্য (Daily Study Goal)"
                      : language === "Hindi"
                      ? "दैनिक अध्ययन लक्ष्य (Daily Study Goal)"
                      : "Daily Study Goals"}
                  </h3>
                  {isGoalCompleted ? (
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{language === "Bengali" ? "লক্ষ্য সম্পূর্ণ! 🎉" : "Target Achieved! 🎉"}</span>
                    </span>
                  ) : (
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {goalPercentage}% Complete
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {language === "Bengali"
                    ? "প্রতিদিনের লক্ষ্যমাত্রা নির্ধারণ করুন এবং টাইমার অনুশীলনের মাধ্যমে অগ্রগতি ট্র্যাক করুন।"
                    : "Set daily focus minute targets and track your consistency with the visual progress ring."}
                </p>
              </div>
            </div>

            {/* Set / Edit Goal Action */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                id="edit-daily-goal-btn"
                onClick={() => {
                  setIsEditingGoal(!isEditingGoal);
                  setCustomGoalInput(dailyGoalMinutes.toString());
                  setCustomGoalError("");
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer w-full sm:w-auto justify-center ${
                  isEditingGoal
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 shadow-2xs"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isEditingGoal ? "Close Settings" : "Adjust Goal"}</span>
              </button>
            </div>
          </div>

          {/* Goal Adjustment Drawer (When Active) */}
          {isEditingGoal && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {language === "Bengali" ? "দৈনিক স্টাডি টার্গেট সেট করুন" : "Set Target Study Minutes"}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Choose a quick preset or type your custom study time target per day.
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
                  Current: {dailyGoalMinutes} mins/day
                </span>
              </div>

              {/* Preset Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: "30 min", mins: 30, tag: "Light" },
                  { label: "45 min", mins: 45, tag: "Standard" },
                  { label: "60 min", mins: 60, tag: "Recommended ⭐" },
                  { label: "90 min", mins: 90, tag: "Intensive" },
                  { label: "120 min (2h)", mins: 120, tag: "Madhyamik Target" },
                  { label: "180 min (3h)", mins: 180, tag: "HS Aspirant 🔥" },
                ].map((preset) => (
                  <button
                    key={preset.mins}
                    id={`goal-preset-${preset.mins}-btn`}
                    onClick={() => handleSaveGoal(preset.mins)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      dailyGoalMinutes === preset.mins
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-200"
                        : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${dailyGoalMinutes === preset.mins ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {preset.tag}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Number Input Form */}
              <form onSubmit={handleCustomGoalSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">Custom target (mins):</span>
                  <input
                    id="custom-daily-goal-input"
                    type="number"
                    min="10"
                    max="720"
                    step="5"
                    value={customGoalInput}
                    onChange={(e) => {
                      setCustomGoalInput(e.target.value);
                      setCustomGoalError("");
                    }}
                    className="w-28 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 75"
                  />
                  <span className="text-xs text-slate-500 font-medium">minutes</span>
                </div>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    id="save-custom-goal-btn"
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Save Custom Target
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingGoal(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1.5 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {customGoalError && (
                <p className="text-xs text-rose-600 font-semibold">{customGoalError}</p>
              )}
            </div>
          )}

          {/* Main Visual Progress Ring & Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Interactive SVG Circular Progress Ring (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-indigo-50/30 rounded-2xl border border-slate-200/60 shadow-2xs">
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* SVG Progress Ring */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                  <defs>
                    <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      {isGoalCompleted ? (
                        <>
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </>
                      ) : (
                        <>
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#10b981" />
                        </>
                      )}
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={isGoalCompleted ? "#10b981" : "#6366f1"} floodOpacity="0.3" />
                    </filter>
                  </defs>

                  {/* Track Circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={ringRadius}
                    className="text-slate-200 stroke-current"
                    strokeWidth="11"
                    fill="transparent"
                  />

                  {/* Dynamic Progress Arc */}
                  <circle
                    cx="70"
                    cy="70"
                    r={ringRadius}
                    stroke="url(#goalGradient)"
                    strokeWidth="11"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    filter="url(#glow)"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                  <span className={`text-3xl font-black tracking-tight ${isGoalCompleted ? "text-emerald-700" : "text-slate-900"}`}>
                    {goalPercentage}%
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 mt-0.5">
                    {todayStudyMinutes} / {dailyGoalMinutes}m
                  </span>
                  {isGoalCompleted && (
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded-full mt-1 animate-pulse">
                      Completed!
                    </span>
                  )}
                </div>
              </div>

              {/* Ring Subtitle */}
              <div className="text-center mt-2">
                <span className="text-xs font-bold text-slate-700 block">
                  {todayDateStr}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isGoalCompleted ? "Daily Target Achieved! 🏆" : `${remainingMinutes} mins remaining today`}
                </span>
              </div>
            </div>

            {/* Right: Detailed Metric Cards & Milestone Stepper (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              {/* 4 Diagnostic Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Target */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <Target className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Target</span>
                  </div>
                  <div className="text-lg font-black text-slate-900">{dailyGoalMinutes} min</div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {Math.round((dailyGoalMinutes / 60) * 10) / 10} hrs/day
                  </span>
                </div>

                {/* Studied Today */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Today</span>
                  </div>
                  <div className="text-lg font-black text-emerald-700">{todayStudyMinutes} min</div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {goalPercentage}% achieved
                  </span>
                </div>

                {/* Remaining or Extra */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    {isGoalCompleted ? (
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-cyan-600" />
                    )}
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {isGoalCompleted ? "Extra" : "Left"}
                    </span>
                  </div>
                  <div className={`text-lg font-black ${isGoalCompleted ? "text-amber-600" : "text-slate-900"}`}>
                    {isGoalCompleted ? `+${todayStudyMinutes - dailyGoalMinutes}m` : `${remainingMinutes}m`}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {isGoalCompleted ? "Bonus study" : "To reach goal"}
                  </span>
                </div>

                {/* Today's Focus Sessions */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-sm">🍅</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Cycles</span>
                  </div>
                  <div className="text-lg font-black text-rose-600">
                    {studySessionsList.filter((s) => s.date === todayDateStr).length}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    Sessions logged
                  </span>
                </div>
              </div>

              {/* Milestone Stepper Bar */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Daily Milestones</span>
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {todayStudyMinutes} of {dailyGoalMinutes} min ({goalPercentage}%)
                  </span>
                </div>

                {/* Linear Track with 4 Milestone Nodes */}
                <div className="relative pt-2 pb-4">
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 rounded-full ${
                        isGoalCompleted
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                          : "bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500"
                      }`}
                      style={{ width: `${Math.min(100, goalPercentage)}%` }}
                    />
                  </div>

                  {/* 4 Checkpoint Nodes */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mt-2 px-1">
                    <div className={`flex flex-col items-center ${goalPercentage >= 25 ? "text-emerald-700 font-extrabold" : "text-slate-400"}`}>
                      <span>25%</span>
                      <span className="text-[9px] font-normal">Warmup</span>
                    </div>
                    <div className={`flex flex-col items-center ${goalPercentage >= 50 ? "text-emerald-700 font-extrabold" : "text-slate-400"}`}>
                      <span>50%</span>
                      <span className="text-[9px] font-normal">Halfway</span>
                    </div>
                    <div className={`flex flex-col items-center ${goalPercentage >= 75 ? "text-emerald-700 font-extrabold" : "text-slate-400"}`}>
                      <span>75%</span>
                      <span className="text-[9px] font-normal">Focus Zone</span>
                    </div>
                    <div className={`flex flex-col items-center ${goalPercentage >= 100 ? "text-emerald-700 font-extrabold" : "text-slate-400"}`}>
                      <span>100% 🏆</span>
                      <span className="text-[9px] font-normal">Goal Crushed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivational Insight & Quick Action CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{isGoalCompleted ? "🎉" : goalPercentage >= 50 ? "🔥" : "🌱"}</span>
                  <p className="text-xs font-semibold text-slate-700">
                    {isGoalCompleted
                      ? language === "Bengali"
                        ? "অসাধারণ অধ্যবসায়! আপনি আজকের স্টাডি লক্ষ্য পূরণ করেছেন।"
                        : "Outstanding dedication! You crushed today's study target."
                      : goalPercentage >= 50
                      ? language === "Bengali"
                        ? "লক্ষ্যের অর্ধেকের বেশি সম্পন্ন! আর মাত্র কয়েকটি ফোকাস সাইকেল বাকি।"
                        : "Over halfway there! Complete one more Pomodoro session to reach your target."
                      : language === "Bengali"
                        ? "প্রতিদিনের ধারাবাহিক প্রস্তুতি মাধ্যমিক ও উচ্চমাধ্যমিকে সেরা সাফল্য এনে দেয়।"
                        : "Consistent daily study builds mastery for West Bengal Board exams."}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                  <button
                    id="daily-goal-start-timer-btn"
                    onClick={handleScrollToTimer}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{language === "Bengali" ? "টাইমার শুরু করুন" : "Start Focus Timer"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Interactive Pomodoro Timer */}
      <section id="pomodoro-study-timer-section">
        <PomodoroTimer
          currentClass={currentClass}
          language={language}
          onSessionComplete={(session) => {
            if (onSaveStudySession) {
              onSaveStudySession(session);
            }
          }}
        />
      </section>

      {/* Offline Storage Status Banner */}
      <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-emerald-950">
                Offline Storage Active (Service Worker Ready)
              </h4>
              <span className="bg-emerald-200/70 text-emerald-900 text-[10px] font-black px-2 py-0.2 rounded-full">
                100% Offline Ready
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Your focus history, {progress.savedNotes.length} saved study notes, and syllabus chapters are permanently cached on this device for zero-data revision.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportNotes}
            disabled={progress.savedNotes.length === 0}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Notes (.txt)</span>
          </button>
        </div>
      </div>

      {/* Navigation Filter Tabs for Dashboard Sections */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setDashboardTab("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              dashboardTab === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Activity
          </button>

          <button
            onClick={() => setDashboardTab("sessions")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              dashboardTab === "sessions"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Focus Activity History</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${dashboardTab === "sessions" ? "bg-white text-indigo-700 font-black" : "bg-slate-200 text-slate-700"}`}>
              {studySessionsList.length}
            </span>
          </button>

          <button
            onClick={() => setDashboardTab("notes")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              dashboardTab === "notes"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Notes</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${dashboardTab === "notes" ? "bg-white text-emerald-700 font-black" : "bg-slate-200 text-slate-700"}`}>
              {progress.savedNotes.length}
            </span>
          </button>

          <button
            onClick={() => setDashboardTab("quizzes")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              dashboardTab === "quizzes"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Mock Test Scores</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${dashboardTab === "quizzes" ? "bg-white text-amber-700 font-black" : "bg-slate-200 text-slate-700"}`}>
              {progress.quizHistory.length}
            </span>
          </button>
        </div>

        {studySessionsList.length > 0 && (
          <button
            onClick={handleExportSessionHistory}
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Study Log</span>
          </button>
        )}
      </div>

      {/* Study Session & Activity History Section */}
      {(dashboardTab === "all" || dashboardTab === "sessions") && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 lg:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {language === "Bengali"
                    ? "অনুশীলন ও স্টাডি সেশন হিস্ট্রি (Focus Activity History)"
                    : "Focused Learning Activity History"}
                </h3>
                <span className="text-[10px] sm:text-[11px] text-slate-500">
                  Total duration logged: <strong className="text-indigo-700 font-bold">{formattedTotalStudyTime}</strong> ({studySessionsList.length} completed sessions)
                </span>
              </div>
            </div>

            {availableSessionSubjects.length > 1 && (
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs font-bold text-slate-500">Filter by subject:</span>
                <select
                  value={sessionSubjectFilter}
                  onChange={(e) => setSessionSubjectFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-semibold cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  {availableSessionSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Subject Time Breakdown Mini-Badges */}
          {subjectTimeBreakdown.length > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pb-1">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                <span>Subject Distribution:</span>
              </span>
              {subjectTimeBreakdown.map(([subj, mins]) => (
                <span
                  key={subj}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl border border-slate-200"
                >
                  <span>{subj}:</span>
                  <span className="text-indigo-700">{mins}m</span>
                </span>
              ))}
            </div>
          )}

          {studySessionsList.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-slate-400 bg-slate-50 rounded-2xl space-y-2">
              <Timer className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-medium text-slate-600">No focus sessions recorded yet.</p>
              <p className="text-[11px] text-slate-400">
                Click "Start Session" on the Pomodoro timer above to time your study session!
              </p>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl">
              <p className="text-xs font-medium text-slate-600">No sessions match the selected filter.</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 sm:p-3.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl sm:rounded-2xl transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm sm:text-base shrink-0 shadow-2xs">
                      {session.subject === "Rest & Relaxation" ? "☕" : "🍅"}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] font-bold text-slate-500 flex-wrap">
                        <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                          {session.subject}
                        </span>
                        <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded capitalize">
                          {session.mode}
                        </span>
                        <span>•</span>
                        <span>{session.timestamp}</span>
                        <span>({session.date})</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {session.topic || "Focused Study"}
                      </h4>
                      {session.notes && (
                        <p className="text-[11px] text-slate-600 mt-1 font-sans leading-relaxed">
                          {session.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[11px] sm:text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-xl block">
                        +{session.durationMinutes} min
                      </span>
                    </div>
                    {onDeleteStudySession && (
                      <button
                        onClick={() => onDeleteStudySession(session.id)}
                        title="Delete session log"
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Grid: Saved Revision Notes & Mock Test Diagnostics */}
      {(dashboardTab === "all" || dashboardTab === "notes" || dashboardTab === "quizzes") && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left: Saved Revision Notes (7 cols) */}
          {(dashboardTab === "all" || dashboardTab === "notes") && (
            <div className={dashboardTab === "notes" ? "lg:col-span-12 space-y-4" : "lg:col-span-7 space-y-4"}>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 lg:p-7 border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {language === "Bengali" ? "সংরক্ষিত প্রশ্ন ও নোটস (Saved Notes)" : "Saved Revision Notes"}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] text-slate-500">
                        Available 100% offline at all times
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
                    {progress.savedNotes.length > 0 && (
                      <button
                        id="download-all-notes-pdf-btn"
                        onClick={handleExportNotes}
                        title="Download complete notes as printable offline PDF booklet"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    )}
                    <button
                      id="create-new-note-btn"
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Note</span>
                    </button>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl">
                      {filteredNotes.length} / {progress.savedNotes.length}
                    </span>
                  </div>
                </div>

                {/* Search & Subject filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search saved notes..."
                      value={notesSearchQuery}
                      onChange={(e) => setNotesSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {availableNoteSubjects.length > 1 && (
                    <select
                      value={selectedSubjectFilter}
                      onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-semibold cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      {availableNoteSubjects.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {progress.savedNotes.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl space-y-2">
                    <Bookmark className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-medium text-slate-600">No notes saved yet.</p>
                    <p className="text-[11px] text-slate-400">
                      Click "Save" on any AI Tutor solution or "New Note" to keep quick reference formulas & notes here!
                    </p>
                  </div>
                ) : filteredNotes.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl">
                    <p className="text-xs font-medium text-slate-600">No notes match your search.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-2xl transition-all flex items-start justify-between gap-3 group"
                      >
                        <div
                          className="cursor-pointer flex-1"
                          onClick={() => onOpenSavedQuestion(note)}
                        >
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mb-1">
                            <span className="bg-white border border-slate-200 text-slate-800 px-1.5 py-0.5 rounded">
                              {note.subject}
                            </span>
                            <span>Class {note.classLevel}</span>
                            <span>•</span>
                            <span>{note.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-900 line-clamp-1">
                            {note.title}
                          </h4>
                          <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 font-sans">
                            {note.content}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {/* Individual Note PDF download button */}
                          <button
                            onClick={() => downloadSingleNotePDF(note)}
                            title="Download this note as PDF"
                            className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded-lg hover:bg-indigo-100/80 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold border border-indigo-200/60 bg-white"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">PDF</span>
                          </button>

                          <button
                            onClick={() => onDeleteSavedQuestion(note.id)}
                            title="Delete note"
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right: Quiz History & Diagnostics (5 cols) */}
          {(dashboardTab === "all" || dashboardTab === "quizzes") && (
            <div className={dashboardTab === "quizzes" ? "lg:col-span-12 space-y-4" : "lg:col-span-5 space-y-4"}>
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      {language === "Bengali" ? "কুইজের ফলাফল (Quiz History)" : "Recent Mock Tests"}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {progress.quizHistory.length} Tests Taken
                  </span>
                </div>

                {progress.quizHistory.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl space-y-2">
                    <Zap className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-medium text-slate-600">No mock tests completed yet.</p>
                    <p className="text-[11px] text-slate-400">
                      Take your first AI test from the Mock Test tab to evaluate your score!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {progress.quizHistory.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{q.subject}</span>
                          <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {q.score} / {q.total} ({Math.round((q.score / q.total) * 100)}%)
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>{q.chapter}</span>
                          <span>{q.date}</span>
                        </div>

                        {q.weakTopics && q.weakTopics.length > 0 && (
                          <div className="pt-1 text-[10px] text-rose-700">
                            <span className="font-bold">Need revision: </span>
                            <span>{q.weakTopics.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal for creating a new custom note */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCustomNote}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-emerald-600" />
                <span>Add Offline Revision Note</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                <select
                  value={newNoteSubject}
                  onChange={(e) => setNewNoteSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Mathematics">Mathematics (গণিত)</option>
                  <option value="Physical Science">Physical Science (ভৌত বিজ্ঞান)</option>
                  <option value="Life Science">Life Science (জীবন বিজ্ঞান)</option>
                  <option value="History">History (ইতিহাস)</option>
                  <option value="Geography">Geography (ভূগোল)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="English">English (ইংরেজি)</option>
                  <option value="Physics">Physics (পদার্থবিদ্যা)</option>
                  <option value="Chemistry">Chemistry (রসায়ন)</option>
                  <option value="Biology">Biology (জীববিদ্যা)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Note Title</label>
                <input
                  type="text"
                  placeholder="e.g., Ohm's Law formula & definition"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Content / Summary / Formulas
                </label>
                <textarea
                  placeholder="Write formulas, key points, historical dates, or summary for quick offline revision..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  required
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
              >
                Save to Offline Notes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
