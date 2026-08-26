import React, { useState } from "react";
import { Language, QuizData, QuizSubmission, SubjectInfo } from "../types";
import { SUBJECTS } from "../data/curriculumData";
import { generateAIQuiz } from "../services/api";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Zap,
  RotateCcw,
  Loader2,
  Award,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  TrendingDown,
  Check,
} from "lucide-react";

interface QuizEngineProps {
  currentClass: string;
  language: Language;
  onSaveQuizResult: (result: QuizSubmission) => void;
  onAskTutorWeakTopic: (topic: string, subject: string) => void;
  presetSubject?: string;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  currentClass,
  language,
  onSaveQuizResult,
  onAskTutorWeakTopic,
  presetSubject = "Mathematics",
}) => {
  const currentClassNum = parseInt(currentClass, 10);
  const availableSubjects = SUBJECTS.filter((s) => s.classes.includes(currentClassNum));

  const [selectedSubject, setSelectedSubject] = useState<string>(
    availableSubjects.find((s) => s.name.toLowerCase().includes(presetSubject.toLowerCase()))?.name ||
      availableSubjects[0]?.name ||
      "Mathematics"
  );
  const [selectedChapter, setSelectedChapter] = useState<string>("All Chapters");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [questionCount, setQuestionCount] = useState<number>(5);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizSubmission | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active subject chapters
  const currentSubjectObj = availableSubjects.find((s) => s.name === selectedSubject);
  const chapterList = currentSubjectObj?.chapters || [];

  const handleStartQuiz = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setQuizData(null);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setQuizResult(null);

    try {
      const data = await generateAIQuiz(
        currentClass,
        selectedSubject,
        selectedChapter,
        difficulty,
        language,
        questionCount
      );
      setQuizData(data);
    } catch (err: any) {
      console.error("Quiz generation error:", err);
      setErrorMsg(err.message || "Failed to generate AI quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!quizData) return;

    let score = 0;
    const mistakes: QuizSubmission["mistakes"] = [];
    const weakTopicsSet = new Set<string>();

    quizData.questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected === q.correctIndex) {
        score += 1;
      } else {
        mistakes.push({
          question: q.question,
          yourAnswer: selected !== undefined ? q.options[selected] : "Not Answered",
          correctAnswer: q.options[q.correctIndex],
          explanation: q.explanation,
          topic: q.topic,
        });
        weakTopicsSet.add(q.topic);
      }
    });

    const weakTopics = Array.from(weakTopicsSet);
    const recommendedPractice = weakTopics.map(
      (t) => `Review concept and practice 3 sample problems for: ${t}`
    );

    const submission: QuizSubmission = {
      quizTitle: quizData.quizTitle,
      classLevel: currentClass,
      subject: selectedSubject,
      chapter: selectedChapter,
      score,
      total: quizData.questions.length,
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      mistakes,
      weakTopics,
      recommendedPractice,
    };

    setQuizResult(submission);
    setIsSubmitted(true);
    onSaveQuizResult(submission);

    // Confetti celebration if 80%+
    if (score / quizData.questions.length >= 0.8) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 rounded-2xl sm:rounded-3xl p-4.5 sm:p-7 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              AI Mock Test & Diagnostics
            </span>
            <span className="bg-emerald-300 text-emerald-950 text-xs font-bold px-2 py-0.5 rounded-full">
              Class {currentClass}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            {language === "Bengali"
              ? "এআই মক টেস্ট ও অধ্যায়ভিত্তিক মূল্যায়ন"
              : "AI Mock Test & Diagnostic Quiz System"}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            {language === "Bengali"
              ? "পশ্চিমবঙ্গ বোর্ডের সিলেবাস অনুযায়ী কাস্টম কুইজ তৈরি করুন। পরীক্ষা শেষে ভুল বিশ্লেষণ ও দুর্বল অধ্যায় চিহ্নিতকরণ।"
              : "Generate real-time AI quizzes matching WBBSE & WBCHSE examination standards. Get instant diagnostic feedback, mistake review, and weak topic alerts."}
          </p>
        </div>
      </div>

      {/* Quiz Configurator (Visible when not actively taking a quiz) */}
      {!quizData && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 lg:p-7 border border-slate-200 shadow-xs space-y-5 sm:space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{language === "Bengali" ? "কুইজের বিষয় ও স্তর নির্বাচন করুন" : "Configure AI Quiz:"}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subject (বিষয়)
              </label>
              <select
                id="quiz-config-subject"
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedChapter("All Chapters");
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 sm:p-3 text-xs sm:text-sm text-slate-900 font-semibold cursor-pointer focus:ring-2 focus:ring-emerald-500"
              >
                {availableSubjects.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Chapter / Topic (অধ্যায়)
              </label>
              <select
                id="quiz-config-chapter"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 sm:p-3 text-xs sm:text-sm text-slate-900 font-semibold cursor-pointer focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All Chapters">All Chapters (সম্পূর্ণ সিলেবাস)</option>
                {chapterList.map((ch) => (
                  <option key={ch.id} value={ch.name}>
                    {ch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Difficulty Level (কঠিনতা)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Easy", "Medium", "Hard"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      difficulty === lvl
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions count */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Number of Questions
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 10].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      questionCount === cnt
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {cnt} Questions
                  </button>
                ))}
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            id="btn-generate-ai-quiz"
            disabled={isGenerating}
            onClick={handleStartQuiz}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm py-3 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>
                  {language === "Bengali"
                    ? "এআই কুইজ তৈরি করছে..."
                    : "Generating West Bengal Board Quiz..."}
                </span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>
                  {language === "Bengali"
                    ? "মক টেস্ট শুরু করুন"
                    : "Start AI-Generated Mock Test"}
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Active Quiz Question Interface */}
      {quizData && !isSubmitted && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 lg:p-7 border border-slate-200 shadow-xs space-y-5 sm:space-y-6">
          {/* Progress bar and counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>
                Question {currentQuestionIdx + 1} of {quizData.questions.length}
              </span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {quizData.subject} • {quizData.difficulty}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIdx + 1) / quizData.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Current Question */}
          {(() => {
            const q = quizData.questions[currentQuestionIdx];
            const currentSelected = selectedAnswers[currentQuestionIdx];

            return (
              <div className="space-y-5">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Topic: {q.topic}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                    {q.question}
                  </h3>
                </div>

                {/* 4 Options Grid */}
                <div className="space-y-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = currentSelected === optIdx;
                    return (
                      <button
                        key={optIdx}
                        id={`quiz-opt-btn-${optIdx}`}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/30"
                            : "bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((p) => p - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                  >
                    ← Previous
                  </button>

                  {currentQuestionIdx < quizData.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm cursor-pointer"
                    >
                      Next Question →
                    </button>
                  ) : (
                    <button
                      id="btn-submit-final-quiz"
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      Submit Test 🎯
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Post-Quiz Diagnostic Report */}
      {isSubmitted && quizResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          {/* Score Header */}
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
              🏆
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Test Completed!
            </h3>
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-sm font-extrabold text-slate-900">
              <span>Your Score: {quizResult.score} / {quizResult.total}</span>
              <span className="text-emerald-700">
                ({Math.round((quizResult.score / quizResult.total) * 100)}%)
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {quizResult.score === quizResult.total
                ? "Outstanding! You have mastered these West Bengal syllabus concepts."
                : "Great practice effort! Review your mistakes and weak topics below to score higher in your board exams."}
            </p>
          </div>

          {/* Weak Topics Diagnostic Alert */}
          {quizResult.weakTopics.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <TrendingDown className="w-4 h-4 text-rose-600" />
                <span>Identified Weak Topics to Revise:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quizResult.weakTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAskTutorWeakTopic(topic, quizResult.subject)}
                    className="bg-white hover:bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    <span>Revise: {topic}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Mistakes & Explanations Review */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Detailed Question Review & Explanations:
            </h4>

            {quizData?.questions.map((q, idx) => {
              const selectedOpt = selectedAnswers[idx];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isCorrect ? "bg-emerald-50/40 border-emerald-200" : "bg-rose-50/40 border-rose-200"
                  } space-y-2`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      Q{idx + 1}. {q.question}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 ${
                        isCorrect
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-rose-200 text-rose-900"
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{isCorrect ? "Correct (+1)" : "Incorrect"}</span>
                    </span>
                  </div>

                  <div className="text-xs space-y-1 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Your Answer:</span>
                      <span className={`font-semibold ${isCorrect ? "text-emerald-800" : "text-rose-800 line-through"}`}>
                        {selectedOpt !== undefined ? q.options[selectedOpt] : "No answer"}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Correct Answer:</span>
                        <span className="font-bold text-emerald-800">
                          {q.options[q.correctIndex]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/80 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 leading-relaxed font-sans mt-2">
                    <strong className="text-slate-900">Step Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action to create another quiz */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setQuizData(null);
                setIsSubmitted(false);
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Create New Practice Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
