import React, { useState, useEffect, useRef } from "react";
import { Language, StudySession } from "../types";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Coffee,
  Sparkles,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Check,
  Flame,
  Award,
  Zap,
  Clock,
  BookOpen,
} from "lucide-react";

interface PomodoroTimerProps {
  currentClass: string;
  language: Language;
  onSessionComplete: (session: StudySession) => void;
}

type TimerMode = "pomodoro" | "deep-focus" | "short-break" | "long-break" | "custom";

const PRESET_DURATIONS: Record<TimerMode, number> = {
  pomodoro: 25 * 60,
  "deep-focus": 45 * 60,
  "short-break": 5 * 60,
  "long-break": 15 * 60,
  custom: 30 * 60,
};

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Physical Science",
  "Life Science",
  "History",
  "Geography",
  "Bengali",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Accountancy",
  "General Revision",
];

// Web Audio API Chime Synthesizer
function playCelebrationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.14);
      gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.14 + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.14);
      osc.stop(ctx.currentTime + i * 0.14 + 0.75);
    });
  } catch (e) {
    console.warn("Audio chime error:", e);
  }
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  currentClass,
  language,
  onSessionComplete,
}) => {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [selectedSubject, setSelectedSubject] = useState<string>("Mathematics");
  const [sessionTopic, setSessionTopic] = useState<string>("");
  const [sessionNotes, setSessionNotes] = useState<string>("");

  const [totalSeconds, setTotalSeconds] = useState<number>(PRESET_DURATIONS.pomodoro);
  const [secondsLeft, setSecondsLeft] = useState<number>(PRESET_DURATIONS.pomodoro);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Session Completed Modal / Banner State
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState<boolean>(false);
  const [lastFinishedDuration, setLastFinishedDuration] = useState<number>(25);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Switch mode handler
  const handleModeChange = (newMode: TimerMode, customMinutes?: number) => {
    setIsActive(false);
    setIsPaused(false);
    setMode(newMode);
    const secs = customMinutes ? customMinutes * 60 : PRESET_DURATIONS[newMode];
    setTotalSeconds(secs);
    setSecondsLeft(secs);
  };

  // Adjust time by +/- minutes
  const handleAdjustMinutes = (deltaMin: number) => {
    if (isActive) return;
    const newSecs = Math.max(60, Math.min(180 * 60, totalSeconds + deltaMin * 60));
    setTotalSeconds(newSecs);
    setSecondsLeft(newSecs);
  };

  // Start timer
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  // Pause timer
  const handlePause = () => {
    setIsPaused(true);
  };

  // Resume timer
  const handleResume = () => {
    setIsPaused(false);
  };

  // Reset timer
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setSecondsLeft(totalSeconds);
  };

  // Timer Tick Effect
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused, totalSeconds, mode, selectedSubject, sessionTopic]);

  // Handle Complete
  const handleTimerComplete = () => {
    setIsActive(false);
    setIsPaused(false);
    const durationMins = Math.round(totalSeconds / 60);
    setLastFinishedDuration(durationMins);

    if (soundEnabled) {
      playCelebrationChime();
    }

    // Auto-record session
    const isBreak = mode === "short-break" || mode === "long-break";
    const newSession: StudySession = {
      id: `session_${Date.now()}`,
      subject: isBreak ? "Rest & Relaxation" : selectedSubject,
      topic: sessionTopic.trim() || (isBreak ? "Break" : "Target Practice"),
      durationMinutes: durationMins,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      mode: mode === "deep-focus" ? "pomodoro" : (mode as any),
      completed: true,
      notes: sessionNotes.trim(),
    };

    onSessionComplete(newSession);
    setIsCompletedModalOpen(true);
  };

  // Log Early / Manual Finish
  const handleFinishEarlyAndLog = () => {
    const elapsedSeconds = totalSeconds - secondsLeft;
    const elapsedMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    
    setIsActive(false);
    setIsPaused(false);

    const isBreak = mode === "short-break" || mode === "long-break";
    const newSession: StudySession = {
      id: `session_${Date.now()}`,
      subject: isBreak ? "Rest & Relaxation" : selectedSubject,
      topic: sessionTopic.trim() || "Focused Revision",
      durationMinutes: elapsedMinutes,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      mode: mode === "deep-focus" ? "pomodoro" : (mode as any),
      completed: true,
      notes: sessionNotes.trim() ? `${sessionNotes.trim()} (Finished at ${elapsedMinutes}m)` : undefined,
    };

    onSessionComplete(newSession);
    setLastFinishedDuration(elapsedMinutes);
    setIsCompletedModalOpen(true);
    setSecondsLeft(totalSeconds);
  };

  // Time format calculations
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - secondsLeft) / totalSeconds) * 100));

  const isBreakMode = mode === "short-break" || mode === "long-break";

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm relative overflow-hidden space-y-6">
      {/* Background Accent Glow */}
      <div
        className={`absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700 ${
          isBreakMode ? "bg-teal-500" : "bg-emerald-500"
        }`}
      />

      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⏱️</span>
            <h3 className="text-base font-extrabold text-slate-900">
              {language === "Bengali"
                ? "পোমোডোরো স্টাডি টাইমার ও ফোকাস ট্র্যাকার"
                : "Pomodoro Focus Timer & Tracker"}
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isActive
                  ? isPaused
                    ? "bg-amber-100 text-amber-800 animate-pulse"
                    : "bg-emerald-100 text-emerald-800"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isActive ? (isPaused ? "Paused" : "Focusing...") : "Ready"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === "Bengali"
              ? "মনোযোগ দিয়ে পড়াশোনা করুন এবং প্রতিটি সেশনের সময়সূচি স্বয়ংক্রিয়ভাবে সংরক্ষণ করুন।"
              : "Track deep study intervals with scientifically proven Pomodoro cycles. Automatically logs into your history."}
          </p>
        </div>

        {/* Audio Chime Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? "Chime enabled on finish" : "Chime muted"}
          className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
            soundEnabled
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-slate-100 border-slate-200 text-slate-400"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-[11px] font-bold">{soundEnabled ? "Chime ON" : "Chime OFF"}</span>
        </button>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl">
        <button
          onClick={() => handleModeChange("pomodoro")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            mode === "pomodoro"
              ? "bg-white text-emerald-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>🍅</span>
          <span>Pomodoro (25m)</span>
        </button>

        <button
          onClick={() => handleModeChange("deep-focus")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            mode === "deep-focus"
              ? "bg-white text-indigo-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>⚡</span>
          <span>Deep Focus (45m)</span>
        </button>

        <button
          onClick={() => handleModeChange("short-break")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            mode === "short-break"
              ? "bg-white text-teal-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Coffee className="w-3.5 h-3.5 text-teal-600" />
          <span>Short Break (5m)</span>
        </button>

        <button
          onClick={() => handleModeChange("long-break")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            mode === "long-break"
              ? "bg-white text-cyan-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>🌿</span>
          <span>Long Break (15m)</span>
        </button>
      </div>

      {/* Main Focus Container: Subject & Target Form + Countdown Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Target Subject & Topic Setup (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {!isBreakMode ? (
            <>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Target Subject (বিষয়)
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={isActive}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 disabled:opacity-70 cursor-pointer"
                >
                  {SUBJECT_OPTIONS.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Session Goal or Topic (অধ্যায় / লক্ষ্য)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Solving Trigonometry Ex 23.1 or Reviewing Cell Division"
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Key Takeaway / Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mastered 4 formulas, practiced 6 sums"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </>
          ) : (
            <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                <Coffee className="w-5 h-5" />
                <span>Relaxation & Brain Refresh</span>
              </div>
              <p className="text-xs text-teal-700 leading-relaxed">
                Step away from the screen, stretch, drink water, or take deep breaths. Your mind integrates newly learned concepts best during restful intervals!
              </p>
            </div>
          )}

          {/* Quick Time Adjustment (+/- 5m when idle) */}
          {!isActive && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-500">Fine-tune duration:</span>
              <button
                onClick={() => handleAdjustMinutes(-5)}
                disabled={totalSeconds <= 5 * 60}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
                <span>5m</span>
              </button>
              <button
                onClick={() => handleAdjustMinutes(5)}
                disabled={totalSeconds >= 120 * 60}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>5m</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Clock & Circular Visual Counter (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
          {/* Circular Countdown Progress */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-slate-200"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Foreground animated progress circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                className={`transition-all duration-1000 ${
                  isBreakMode ? "stroke-teal-500" : mode === "deep-focus" ? "stroke-indigo-600" : "stroke-emerald-600"
                }`}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={2 * Math.PI * 70 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Centered Digital Display */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black tracking-tight text-slate-900 font-mono">
                {formattedTime}
              </span>
              <span className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                {isBreakMode ? "Break Time" : selectedSubject}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {Math.round(progressPercent)}% elapsed
              </span>
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center gap-3 mt-4">
            {!isActive ? (
              <button
                id="start-pomodoro-btn"
                onClick={handleStart}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-105 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Session</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={handleResume}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-105 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            )}

            {isActive && (
              <button
                onClick={handleFinishEarlyAndLog}
                title="Finish early and record this study interval into your history"
                className="px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Log & Finish</span>
              </button>
            )}

            <button
              onClick={handleReset}
              title="Reset Timer"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Completion Modal / Celebration Alert */}
      {isCompletedModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
              🎉
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Session Logged Successfully
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                Great Work on Focusing!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                You logged <strong className="text-emerald-700">{lastFinishedDuration} minutes</strong> of focused study in{" "}
                <strong>{selectedSubject}</strong>. Your study activity history has been updated.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Subject:</span>
                <span className="font-bold">{selectedSubject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-bold">{lastFinishedDuration} Minutes</span>
              </div>
              {sessionTopic && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Topic:</span>
                  <span className="font-bold truncate max-w-[200px]">{sessionTopic}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCompletedModalOpen(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
