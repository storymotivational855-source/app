import React, { useState, useRef } from "react";
import { Language, ImageAnalysisResult, DetectedQuestion } from "../types";
import { analyzeTextbookImage } from "../services/api";
import { speakText, stopSpeaking } from "../services/speech";
import {
  Camera,
  Upload,
  Sparkles,
  FileSearch,
  CheckCircle2,
  HelpCircle,
  Volume2,
  VolumeX,
  ArrowRight,
  Loader2,
  BookOpen,
  Eye,
  AlertCircle,
  FileQuestion,
  Image as ImageIcon,
} from "lucide-react";

interface ImageQuestionSolverProps {
  currentClass: string;
  language: Language;
  onAskFollowUp: (questionText: string, subject?: string) => void;
}

// Built-in Sample Page Images for instant testing (encoded SVG / lightweight canvas drawings representing West Bengal textbook pages)
const SAMPLE_PAGES = [
  {
    id: "sample_math_10",
    title: "Class 10 WBBSE Math - Quadratic Equations Page",
    bengaliTitle: "মাধ্যমিক গণিত - একচলবিশিষ্ট দ্বিঘাত সমীকরণ পাতা",
    previewText: "Textbook page containing 3 problems on discriminant and factorization",
    classLevel: "10",
    // Base64 PNG generated via clean SVG canvas
    svgData: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="#fff">
      <rect width="600" height="750" fill="#fcfbf7"/>
      <rect x="30" y="30" width="540" height="690" rx="8" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
      <text x="50" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#111827">WBBSE Class 10: গণিত প্রকাশ (Exercise 1.2)</text>
      <line x1="50" y1="85" x2="550" y2="85" stroke="#10b981" stroke-width="2"/>
      
      <text x="50" y="125" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1f2937">Q1. (2 Marks)</text>
      <text x="50" y="150" font-family="sans-serif" font-size="15" fill="#374151">Find the roots of the equation x² - 5x + 6 = 0 by factorisation method.</text>
      
      <line x1="50" y1="180" x2="550" y2="180" stroke="#e5e7eb" stroke-width="1"/>
      
      <text x="50" y="215" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1f2937">Q2. (3 Marks)</text>
      <text x="50" y="240" font-family="sans-serif" font-size="15" fill="#374151">If the roots of the equation 2x² - 8x + k = 0 are real and equal,</text>
      <text x="50" y="265" font-family="sans-serif" font-size="15" fill="#374151">find the value of k using discriminant condition.</text>
      
      <line x1="50" y1="295" x2="550" y2="295" stroke="#e5e7eb" stroke-width="1"/>
      
      <text x="50" y="330" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1f2937">Q3. (4 Marks)</text>
      <text x="50" y="355" font-family="sans-serif" font-size="15" fill="#374151">The product of two consecutive positive odd integers is 143.</text>
      <text x="50" y="380" font-family="sans-serif" font-size="15" fill="#374151">Formulate the quadratic equation and determine the integers.</text>
      
      <rect x="50" y="440" width="500" height="230" rx="6" fill="#f3f4f6" stroke="#e5e7eb"/>
      <text x="70" y="480" font-family="sans-serif" font-size="13" font-weight="bold" fill="#6b7280">Teacher's Note / পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ:</text>
      <text x="70" y="510" font-family="sans-serif" font-size="13" fill="#4b5563">• Always state Sridhar Acharya's formula x = (-b ± √(b²-4ac))/(2a)</text>
      <text x="70" y="535" font-family="sans-serif" font-size="13" fill="#4b5563">• Mention that discriminant D = b² - 4ac determine root natures.</text>
    </svg>`,
  },
  {
    id: "sample_sci_10",
    title: "Class 10 Physical Science - Gas Laws & Light",
    bengaliTitle: "ভৌত বিজ্ঞান - গ্যাসের আচরণ ও আলোর প্রতিফলন",
    previewText: "Textbook page containing Boyle's law numerical & lens refraction",
    classLevel: "10",
    svgData: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="#fff">
      <rect width="600" height="750" fill="#f8fafc"/>
      <rect x="30" y="30" width="540" height="690" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="50" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0f172a">Physical Science: ভৌত বিজ্ঞান ও পরিবেশ</text>
      <line x1="50" y1="85" x2="550" y2="85" stroke="#0284c7" stroke-width="2"/>
      
      <text x="50" y="125" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">Question 1 (2 Marks)</text>
      <text x="50" y="150" font-family="sans-serif" font-size="15" fill="#334155">At constant temperature, a gas occupies 500 mL at 1 atm pressure.</text>
      <text x="50" y="175" font-family="sans-serif" font-size="15" fill="#334155">What will be its volume if the pressure is increased to 2.5 atm?</text>
      
      <line x1="50" y1="210" x2="550" y2="210" stroke="#e2e8f0" stroke-width="1"/>
      
      <text x="50" y="245" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">Question 2 (3 Marks)</text>
      <text x="50" y="270" font-family="sans-serif" font-size="15" fill="#334155">Explain why the danger signal lights on railway tracks and vehicles</text>
      <text x="50" y="295" font-family="sans-serif" font-size="15" fill="#334155">are always red in color in terms of Rayleigh scattering.</text>
    </svg>`,
  },
];

function svgToBase64(svgString: string): string {
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
}

export const ImageQuestionSolver: React.FC<ImageQuestionSolverProps> = ({
  currentClass,
  language,
  onAskFollowUp,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<DetectedQuestion | null>(null);
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setAnalysisResult(null);
    setSelectedQuestion(null);

    const reader = new FileReader();
    reader.onload = () => {
      const resultStr = reader.result as string;
      setImagePreview(resultStr);
      setMimeType(file.type || "image/jpeg");
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof SAMPLE_PAGES[0]) => {
    setErrorMsg(null);
    setAnalysisResult(null);
    setSelectedQuestion(null);
    const b64 = svgToBase64(sample.svgData);
    setImagePreview(b64);
    setMimeType("image/svg+xml");
  };

  const handleScanAndSolve = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const result = await analyzeTextbookImage(imagePreview, mimeType, currentClass, language);
      setAnalysisResult(result);
      if (result.questions && result.questions.length > 0) {
        setSelectedQuestion(result.questions[0]);
      }
    } catch (err: any) {
      console.error("OCR Image analysis error:", err);
      setErrorMsg(err.message || "Failed to scan and detect questions. Please verify image clarity.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSpeak = (q: DetectedQuestion) => {
    if (speakingId === q.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    stopSpeaking();
    setSpeakingId(q.id);
    speakText(
      `${q.questionText}. Solution: ${q.stepByStepSolution}`,
      language,
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header card */}
      <div className="bg-gradient-to-r from-cyan-700 via-teal-700 to-emerald-800 rounded-2xl sm:rounded-3xl p-4.5 sm:p-7 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              AI Vision & OCR Engine
            </span>
            <span className="bg-cyan-300 text-cyan-950 text-xs font-bold px-2 py-0.5 rounded-full">
              Class {currentClass}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            {language === "Bengali"
              ? "পাঠ্যপুস্তক ও খাতার পাতার ছবি স্ক্যানার (Photo Solver)"
              : language === "Hindi"
              ? "पाठ्यपुस्तक और प्रश्न पत्र फोटो सॉल्वर"
              : "Textbook & Homework Page Photo Solver"}
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100 max-w-xl leading-relaxed">
            {language === "Bengali"
              ? "বই বা খাতার পাতার ছবি তুলুন। এআই স্বয়ংক্রিয়ভাবে প্রতিটি প্রশ্ন আলাদা করে চিহ্নিত করবে এবং ধাপে ধাপে নির্ভুল সমাধান দেবে।"
              : "Take or upload a photo of your West Bengal Board textbook page. Our AI detects every individual question and generates structured step-by-step solutions."}
          </p>
        </div>
      </div>

      {/* Main Upload / Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Upload / Camera / Sample Selector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-600" />
              <span>{language === "Bengali" ? "১. ছবি আপলোড বা তুলুন" : "1. Capture or Upload Photo"}</span>
            </h3>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Upload Dropzone / Preview */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-cyan-500 bg-slate-50 hover:bg-cyan-50/40 rounded-xl sm:rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[190px] relative overflow-hidden"
            >
              {imagePreview ? (
                <div className="space-y-2 w-full">
                  <img
                    src={imagePreview}
                    alt="Uploaded textbook preview"
                    className="max-h-44 mx-auto rounded-lg shadow-xs object-contain border border-slate-200 bg-white"
                  />
                  <span className="text-xs font-semibold text-cyan-700 block">
                    Click to change photo
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Click to take photo or browse image
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Supports JPG, PNG, WEBP (Textbook, Homework, Question Papers)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Scan button */}
            <button
              id="btn-scan-and-solve"
              disabled={!imagePreview || isAnalyzing}
              onClick={handleScanAndSolve}
              className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 disabled:opacity-50 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {language === "Bengali" ? "প্রশ্ন চিহ্নিত ও সমাধান করা হচ্ছে..." : "Detecting Questions & Solving..."}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {language === "Bengali" ? "পাতা স্ক্যান ও প্রশ্ন সমাধান করুন" : "Detect Questions & Solve"}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Preset Sample Textbook Pages */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <span className="text-xs font-bold text-slate-600 block mb-2">
              ⚡ {language === "Bengali" ? "নমুনা পাতা দিয়ে এখনই পরীক্ষা করুন:" : "Or try with sample textbook pages:"}
            </span>
            <div className="space-y-2">
              {SAMPLE_PAGES.map((sample) => (
                <button
                  key={sample.id}
                  id={`sample-page-${sample.id}`}
                  onClick={() => handleSelectSample(sample)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-cyan-50 hover:border-cyan-300 transition-all flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      {sample.title}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {sample.previewText}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detected Questions & Step-by-Step Resolution */}
        <div className="md:col-span-7 space-y-4">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {!analysisResult && !isAnalyzing && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 shadow-xs min-h-[350px] flex flex-col items-center justify-center">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-3">
                <FileSearch className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">
                {language === "Bengali"
                  ? "কোনো পাতার ছবি নির্বাচন করুন"
                  : "No page scanned yet"}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm">
                {language === "Bengali"
                  ? "বাঁদিকের বক্স থেকে ছবি আপলোড করুন অথবা একটি নমুনা পৃষ্ঠা নির্বাচন করে 'Detect Questions & Solve' চাপুন।"
                  : "Upload a textbook page on the left or select a sample page to let AI segment all questions and provide full solutions."}
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center shadow-xs flex flex-col items-center justify-center min-h-[350px] space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center animate-spin">
                <Loader2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {language === "Bengali" ? "এআই ছবি বিশ্লেষণ করছে..." : "AI is Reading Textbook Page..."}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Running optical character recognition (OCR) and identifying West Bengal Board syllabus questions...
                </p>
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-4">
              {/* Document Overview Banner */}
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-cyan-800 tracking-wider">
                    {language === "Bengali" ? "পাতার বিবরণ ও প্রশ্ন সংখ্যা" : "Scanned Document Overview"}
                  </span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">
                    {analysisResult.overview}
                  </p>
                </div>
                <span className="bg-cyan-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg">
                  {analysisResult.detectedQuestionsCount} Questions Detected
                </span>
              </div>

              {/* Detected Questions Tabs / Pills */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">
                  {language === "Bengali" ? "প্রশ্ন নির্বাচন করুন (Select Question to View):" : "Detected Questions from Page:"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysisResult.questions.map((q) => {
                    const isSelected = selectedQuestion?.id === q.id;
                    return (
                      <button
                        key={q.id}
                        id={`detected-q-btn-${q.id}`}
                        onClick={() => setSelectedQuestion(q)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-cyan-500/30"
                            : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                              isSelected ? "bg-slate-800 text-cyan-300" : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {q.questionNumber}
                          </span>
                          <span className="text-[10px] opacity-75 font-semibold">
                            {q.subjectGuess} {q.marksEstimate ? `(${q.marksEstimate})` : ""}
                          </span>
                        </div>
                        <p className="text-xs line-clamp-2 font-medium">
                          {q.questionText}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Question Detailed Solution Card */}
              {selectedQuestion && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-md">
                          {selectedQuestion.questionNumber}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {selectedQuestion.subjectGuess}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1.5">
                        {selectedQuestion.questionText}
                      </h4>
                    </div>

                    <button
                      id={`btn-tts-detected-${selectedQuestion.id}`}
                      onClick={() => handleSpeak(selectedQuestion)}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 ${
                        speakingId === selectedQuestion.id
                          ? "bg-cyan-600 text-white animate-pulse"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {speakingId === selectedQuestion.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === "Bengali" ? "ধাপে ধাপে সমাধান (Step-by-Step Solution):" : "Step-by-Step Board Solution:"}</span>
                    </span>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                      {selectedQuestion.stepByStepSolution}
                    </div>
                  </div>

                  {/* Final Answer Highlight */}
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-900 font-bold">
                    <span>Final Answer / উত্তর:</span>
                    <span className="text-emerald-950 font-extrabold">{selectedQuestion.finalAnswer}</span>
                  </div>

                  {/* Action to ask follow-up in AI tutor */}
                  <button
                    id="btn-ask-tutor-followup"
                    onClick={() => onAskFollowUp(selectedQuestion.questionText, selectedQuestion.subjectGuess)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>
                      {language === "Bengali"
                        ? "এই প্রশ্নে এআই গৃহশিক্ষকের কাছে আরও ব্যাখ্যা চান"
                        : "Ask AI Tutor for deeper explanation or hints on this question"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
