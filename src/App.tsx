import React, { useState, useEffect } from "react";
import { Language, UserProgress, SavedQuestion, QuizSubmission, StudySession } from "./types";
import { Navbar } from "./components/Navbar";
import { AITutorPanel } from "./components/AITutorPanel";
import { ImageQuestionSolver } from "./components/ImageQuestionSolver";
import { PrimaryKidHub } from "./components/PrimaryKidHub";
import { MadhyamikHub } from "./components/MadhyamikHub";
import { HigherSecondaryHub } from "./components/HigherSecondaryHub";
import { CurriculumExplorer } from "./components/CurriculumExplorer";
import { PYQExplorer } from "./components/PYQExplorer";
import { QuizEngine } from "./components/QuizEngine";
import { StudentDashboard } from "./components/StudentDashboard";
import { CustomerSupportModal } from "./components/CustomerSupportModal";
import { BoardExamHub } from "./components/BoardExamHub";
import { EducationalVideosHub } from "./components/EducationalVideosHub";
import { downloadSingleNotePDF } from "./utils/pdfExport";
import {
  Sparkles,
  BookOpen,
  Camera,
  Award,
  GraduationCap,
  FileQuestion,
  Zap,
  Bookmark,
  X,
  Volume2,
  Calendar,
  Headphones,
  FileDown,
} from "lucide-react";
import { speakText, stopSpeaking } from "./services/speech";

const INITIAL_PROGRESS: UserProgress = {
  streakDays: 4,
  questionsAsked: 18,
  quizzesTaken: 5,
  totalStudyMinutes: 70,
  dailyGoalMinutes: 60,
  studySessions: [
    {
      id: "session_init_1",
      subject: "Mathematics",
      topic: "Quadratic Equations - Sridhar Acharya Formula Practice",
      durationMinutes: 25,
      timestamp: "10:30 AM",
      date: "Aug 26, 2026",
      mode: "pomodoro",
      completed: true,
      notes: "Solved 5 Madhyamik Board question bank problems",
    },
    {
      id: "session_init_2",
      subject: "Physical Science",
      topic: "Boyle's Law and Charles' Law numericals",
      durationMinutes: 45,
      timestamp: "02:15 PM",
      date: "Aug 25, 2026",
      mode: "pomodoro",
      completed: true,
      notes: "Reviewed PV=nRT graphs & solved 3 board problems",
    },
  ],
  savedNotes: [
    {
      id: "note_init_1",
      title: "Sridhar Acharya's Formula & Discriminant",
      subject: "Mathematics",
      classLevel: "10",
      date: "Aug 24, 2026",
      content:
        "For any quadratic equation ax² + bx + c = 0 (a ≠ 0):\nRoots x = (-b ± √(b² - 4ac)) / (2a)\nDiscriminant D = b² - 4ac:\n1. If D > 0, roots are real and unequal.\n2. If D = 0, roots are real and equal (-b/2a).\n3. If D < 0, roots are imaginary (no real roots).",
    },
    {
      id: "note_init_2",
      title: "Boyle's Law & P-V Hyperbola Graph",
      subject: "Physical Science",
      classLevel: "10",
      date: "Aug 25, 2026",
      content:
        "Boyle's Law: At constant temperature, the volume of a given mass of gas is inversely proportional to its pressure.\nFormula: P ∝ 1/V  =>  PV = K (constant).\nP1V1 = P2V2\nP vs V graph is a rectangular hyperbola (Isotherm).",
    },
  ],
  quizHistory: [
    {
      quizTitle: "Madhyamik Mathematics Practice Test",
      classLevel: "10",
      subject: "Mathematics",
      chapter: "Quadratic Equations",
      score: 4,
      total: 5,
      date: "Aug 25, 2026",
      mistakes: [],
      weakTopics: ["Word problems on consecutive integers"],
      recommendedPractice: ["Practice 3 sample quadratic integer word problems"],
    },
  ],
};

export default function App() {
  const [currentClass, setCurrentClass] = useState<string>("10");
  const [language, setLanguage] = useState<Language>("Bengali");
  const [activeTab, setActiveTab] = useState<string>("ai-tutor");

  // State passed to AI Tutor when directed from other views
  const [tutorPrefillQuestion, setTutorPrefillQuestion] = useState<string>("");
  const [tutorPrefillSubject, setTutorPrefillSubject] = useState<string>("Mathematics");
  const [tutorPrefillChapter, setTutorPrefillChapter] = useState<string>("General");

  // State passed to Quiz Engine
  const [quizPrefillSubject, setQuizPrefillSubject] = useState<string>("Mathematics");

  // Active modal for viewing a full saved note
  const [viewingNote, setViewingNote] = useState<SavedQuestion | null>(null);

  // Customer Support & Helpdesk Modal state
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);

  // Persistent Progress in LocalStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem("wb_study_ai_progress");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load stored user progress:", e);
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("wb_study_ai_progress", JSON.stringify(progress));
    } catch (e) {
      console.warn("Could not store user progress:", e);
    }
  }, [progress]);

  // Adjust active tab automatically when class level changes
  const handleClassChange = (newClass: string) => {
    setCurrentClass(newClass);
    const num = parseInt(newClass, 10);
    if (num <= 5 && (activeTab === "madhyamik-hub" || activeTab === "hs-hub")) {
      setActiveTab("primary-hub");
    } else if (num === 10 && activeTab === "primary-hub") {
      setActiveTab("madhyamik-hub");
    } else if (num >= 11 && (activeTab === "primary-hub" || activeTab === "madhyamik-hub")) {
      setActiveTab("hs-hub");
    }
  };

  const handleSaveQuestion = (note: SavedQuestion) => {
    setProgress((prev) => ({
      ...prev,
      questionsAsked: prev.questionsAsked + 1,
      savedNotes: [note, ...prev.savedNotes.filter((n) => n.id !== note.id)],
    }));
  };

  const handleDeleteSavedQuestion = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      savedNotes: prev.savedNotes.filter((n) => n.id !== id),
    }));
    if (viewingNote?.id === id) {
      setViewingNote(null);
    }
  };

  const handleSaveQuizResult = (result: QuizSubmission) => {
    setProgress((prev) => ({
      ...prev,
      quizzesTaken: prev.quizzesTaken + 1,
      quizHistory: [result, ...prev.quizHistory],
    }));
  };

  const handleSaveStudySession = (session: StudySession) => {
    setProgress((prev) => {
      const currentSessions = prev.studySessions || [];
      const updatedSessions = [session, ...currentSessions];
      const newTotalMinutes = (prev.totalStudyMinutes || 0) + session.durationMinutes;
      return {
        ...prev,
        totalStudyMinutes: newTotalMinutes,
        studySessions: updatedSessions,
      };
    });
  };

  const handleDeleteStudySession = (id: string) => {
    setProgress((prev) => {
      const currentSessions = prev.studySessions || [];
      const targetSession = currentSessions.find((s) => s.id === id);
      const updatedSessions = currentSessions.filter((s) => s.id !== id);
      const newTotalMinutes = Math.max(0, (prev.totalStudyMinutes || 0) - (targetSession?.durationMinutes || 0));
      return {
        ...prev,
        totalStudyMinutes: newTotalMinutes,
        studySessions: updatedSessions,
      };
    });
  };

  const handleUpdateDailyGoal = (minutes: number) => {
    setProgress((prev) => ({
      ...prev,
      dailyGoalMinutes: minutes,
    }));
  };

  // Cross-component navigations
  const handleAskTutor = (question: string, subject?: string, chapter?: string) => {
    setTutorPrefillQuestion(question);
    if (subject) setTutorPrefillSubject(subject);
    if (chapter) setTutorPrefillChapter(chapter);
    setActiveTab("ai-tutor");
  };

  const handleStartMockTest = (subject: string) => {
    setQuizPrefillSubject(subject);
    setActiveTab("quiz");
  };

  const handleOpenCurriculumTopic = (
    subject: string,
    chapter: string,
    action: "explain" | "quiz" | "summary"
  ) => {
    if (action === "explain") {
      handleAskTutor(
        `Explain the chapter '${chapter}' of Class ${currentClass} ${subject} with complete conceptual breakdown, important formulas/theorems, and 2 model solved examples for West Bengal Board.`,
        subject,
        chapter
      );
    } else if (action === "quiz") {
      handleStartMockTest(subject);
    }
  };

  const currentClassNum = parseInt(currentClass, 10);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Main Navigation Bar */}
      <Navbar
        currentClass={currentClass}
        language={language}
        activeTab={activeTab}
        onClassChange={handleClassChange}
        onLanguageChange={setLanguage}
        onTabChange={setActiveTab}
        savedNotesCount={progress.savedNotes.length}
        streakDays={progress.streakDays}
        onOpenSupport={() => setIsSupportModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-[1536px] w-full mx-auto px-3.5 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
        {/* Render Tab Contents */}
        {activeTab === "ai-tutor" && (
          <AITutorPanel
            currentClass={currentClass}
            language={language}
            onSaveQuestion={handleSaveQuestion}
            defaultQuestion={tutorPrefillQuestion}
            defaultSubject={tutorPrefillSubject}
            defaultChapter={tutorPrefillChapter}
          />
        )}

        {activeTab === "photo-solver" && (
          <ImageQuestionSolver
            currentClass={currentClass}
            language={language}
            onAskFollowUp={handleAskTutor}
          />
        )}

        {activeTab === "curriculum" && (
          <CurriculumExplorer
            currentClass={currentClass}
            language={language}
            onOpenTopic={handleOpenCurriculumTopic}
          />
        )}

        {activeTab === "board-exam" && (
          <BoardExamHub
            currentClass={currentClass}
            language={language}
            onAskTutor={handleAskTutor}
          />
        )}

        {activeTab === "videos" && (
          <EducationalVideosHub
            currentClass={currentClass}
            language={language}
            onAskTutor={handleAskTutor}
          />
        )}

        {activeTab === "primary-hub" && (
          <PrimaryKidHub
            currentClass={currentClass}
            language={language}
            onAskTutor={handleAskTutor}
          />
        )}

        {activeTab === "madhyamik-hub" && (
          <MadhyamikHub
            language={language}
            onAskTutor={handleAskTutor}
            onStartMockTest={handleStartMockTest}
          />
        )}

        {activeTab === "hs-hub" && (
          <HigherSecondaryHub
            currentClass={currentClass}
            language={language}
            onAskTutor={handleAskTutor}
            onStartMockTest={handleStartMockTest}
          />
        )}

        {activeTab === "pyq" && (
          <PYQExplorer
            language={language}
            currentClass={currentClass}
            onAskTutor={handleAskTutor}
          />
        )}

        {activeTab === "quiz" && (
          <QuizEngine
            currentClass={currentClass}
            language={language}
            onSaveQuizResult={handleSaveQuizResult}
            onAskTutorWeakTopic={(topic, subject) =>
              handleAskTutor(`Help me revise and master this topic: "${topic}" in ${subject}.`, subject)
            }
            presetSubject={quizPrefillSubject}
          />
        )}

        {activeTab === "dashboard" && (
          <StudentDashboard
            currentClass={currentClass}
            language={language}
            progress={progress}
            onOpenSavedQuestion={(note) => setViewingNote(note)}
            onDeleteSavedQuestion={handleDeleteSavedQuestion}
            onStartStudySession={() => setActiveTab("ai-tutor")}
            onAddCustomNote={handleSaveQuestion}
            onSaveStudySession={handleSaveStudySession}
            onDeleteStudySession={handleDeleteStudySession}
            onUpdateDailyGoal={handleUpdateDailyGoal}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Full Note Inspection Modal */}
      {viewingNote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                    {viewingNote.subject}
                  </span>
                  <span>Class {viewingNote.classLevel}</span>
                  <span>•</span>
                  <span>{viewingNote.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{viewingNote.title}</h3>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => speakText(viewingNote.content, language)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </button>
                <button
                  onClick={() => setViewingNote(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {viewingNote.content}
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleDeleteSavedQuestion(viewingNote.id);
                    setViewingNote(null);
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer px-2 py-1.5"
                >
                  Delete Note
                </button>
                <button
                  onClick={() => downloadSingleNotePDF(viewingNote)}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              <button
                onClick={() => {
                  handleAskTutor(
                    `Let's continue studying this topic from my notes: "${viewingNote.title}". Please give me 3 practice problems.`,
                    viewingNote.subject
                  );
                  setViewingNote(null);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Practice in AI Tutor</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Support & Helpdesk Modal */}
      <CustomerSupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        language={language}
        currentClass={currentClass}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Floating 24/7 Customer Support Action Trigger */}
      <button
        id="floating-customer-support-trigger"
        onClick={() => setIsSupportModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-xl shadow-emerald-700/30 flex items-center gap-2 font-bold text-xs sm:text-sm cursor-pointer transition-all hover:scale-105 border-2 border-white/20"
        title="24/7 Student & Customer Support Desk"
      >
        <Headphones className="w-5 h-5 animate-bounce" />
        <span className="hidden sm:inline">
          {language === "Bengali" ? "২৪/৭ সাপোর্ট ও সহায়তা" : "24/7 Student Support"}
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
      </button>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">WB Study AI (পশ্চিমবঙ্গ স্টাডি এআই)</span>
            <span>•</span>
            <span>Classes 1–12 Learning Companion</span>
          </div>
          <p className="text-slate-400">
            Aligned with West Bengal Board of Secondary Education (WBBSE) & West Bengal Council of Higher Secondary Education (WBCHSE).
          </p>
        </div>
      </footer>
    </div>
  );
}
