import React, { useState, useEffect, useRef } from "react";
import { Language, LearningMode, TutorResponse, ChatMessage } from "../types";
import { askAITutor } from "../services/api";
import { speakText, stopSpeaking, createSpeechRecognizer } from "../services/speech";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Lightbulb,
  FileCode2,
  Bookmark,
  RefreshCw,
  MessageSquarePlus,
  Loader2,
  Zap,
  Tag,
  ArrowRight,
  Info,
} from "lucide-react";

interface AITutorPanelProps {
  currentClass: string;
  language: Language;
  onSaveQuestion: (question: { id: string; title: string; subject: string; classLevel: string; date: string; content: string }) => void;
  defaultQuestion?: string;
  defaultSubject?: string;
  defaultChapter?: string;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({
  currentClass,
  language,
  onSaveQuestion,
  defaultQuestion = "",
  defaultSubject = "Mathematics",
  defaultChapter = "General",
}) => {
  const [inputText, setInputText] = useState(defaultQuestion);
  const [selectedSubject, setSelectedSubject] = useState(defaultSubject);
  const [selectedMode, setSelectedMode] = useState<LearningMode>("explain");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<any>(null);

  useEffect(() => {
    if (defaultQuestion) {
      setInputText(defaultQuestion);
    }
  }, [defaultQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
    };
  }, []);

  const handleVoiceToggle = () => {
    if (isListening) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    setErrorBanner(null);
    const recognizer = createSpeechRecognizer(language, {
      onTranscript: (transcript) => {
        setInputText((prev) => (prev ? prev + " " + transcript : transcript));
      },
      onError: (err) => {
        setErrorBanner(err);
        setIsListening(false);
      },
      onStateChange: (state) => {
        setIsListening(state);
      },
    });

    if (recognizer) {
      recognizerRef.current = recognizer;
      recognizer.start();
    }
  };

  const handleSendMessage = async (textToSend?: string, overrideMode?: LearningMode) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    setErrorBanner(null);
    const mode = overrideMode || selectedMode;

    const userMessageId = "msg_user_" + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      text: query,
      timestamp: Date.now(),
      mode: mode,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const responseData = await askAITutor({
        question: query,
        classLevel: currentClass,
        subject: selectedSubject,
        chapter: defaultChapter,
        language: language,
        mode: mode,
      });

      const assistantMessageId = "msg_ai_" + Date.now();
      const newAiMessage: ChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        text: responseData.content,
        timestamp: Date.now(),
        mode: mode,
        responseData: responseData,
      };

      setMessages((prev) => [...prev, newAiMessage]);
    } catch (err: any) {
      console.error("AI Tutor Error:", err);
      setErrorBanner(err.message || "Failed to reach AI Tutor. Please verify your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (isSpeaking === msgId) {
      stopSpeaking();
      setIsSpeaking(null);
      return;
    }

    stopSpeaking();
    setIsSpeaking(msgId);
    speakText(
      text,
      language,
      () => setIsSpeaking(null),
      () => setIsSpeaking(null)
    );
  };

  const handleSave = (msg: ChatMessage) => {
    if (!msg.responseData) return;
    onSaveQuestion({
      id: msg.id,
      title: msg.responseData.title || "Study Note",
      subject: selectedSubject,
      classLevel: currentClass,
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      content: msg.responseData.content,
    });
    setSavedIds((prev) => new Set([...prev, msg.id]));
  };

  const samplePromptsByClass = () => {
    const classNum = parseInt(currentClass, 10);
    if (classNum <= 5) {
      return [
        { label: "🍎 How many legs do 3 cows have?", q: "If 1 cow has 4 legs, how many legs do 3 cows have in total? Explain with a picture story." },
        { label: "🐅 Royal Bengal Tiger in Sundarbans", q: "Tell me fun facts about the Royal Bengal Tiger living in the mangroves of Sundarbans!" },
        { label: "🌧️ Why does it rain in Bengal?", q: "Explain in very simple words why it rains during monsoon in West Bengal." },
      ];
    }
    if (classNum === 10) {
      return [
        { label: "📐 Sridhar Acharya Formula (Math)", q: "State and derive Sridhar Acharya's formula for quadratic equation ax² + bx + c = 0, and solve 2x² - 5x + 3 = 0." },
        { label: "⚗️ Boyle's Law & Graph (Physical Science)", q: "State Boyle's law regarding gases. Draw the P vs V and P vs 1/V graphs and explain." },
        { label: "🧬 Mitosis vs Meiosis (Life Science)", q: "Differentiate between Mitosis and Meiosis cell division with site of occurrence, number of daughter cells and chromosome count." },
        { label: "📜 Santhal Rebellion (History)", q: "Explain the main causes of Santhal Rebellion (1855) in Bengal and Bihar." },
      ];
    }
    if (classNum >= 11) {
      return [
        { label: "⚡ Gauss's Theorem in Electrostatics", q: "State Gauss's Theorem. Use it to find electric field near an infinitely long straight charged wire." },
        { label: "🧪 Nernst Equation & Cell EMF", q: "Derive the Nernst Equation for a galvanic cell and explain temperature dependence." },
        { label: "📈 Maxima & Minima using Calculus", q: "Explain the second derivative test for finding local maxima and local minima of a function with an example." },
      ];
    }
    return [
      { label: "🔢 Solve Linear Equation", q: "How do I solve the linear equation 3x + 7 = 22 step by step?" },
      { label: "🌿 Photosynthesis Process", q: "Explain the light and dark phases of Photosynthesis with chemical reaction." },
      { label: "🗺️ West Bengal Geography", q: "What are the major rivers of West Bengal and where do they originate?" },
    ];
  };

  const samplePrompts = samplePromptsByClass();

  const modeOptions: { id: LearningMode; label: string; icon: any; color: string; desc: string }[] = [
    { id: "explain", label: "Explain Concept", icon: BookOpen, color: "text-blue-600 bg-blue-50 border-blue-200", desc: "Complete conceptual lesson" },
    { id: "hint", label: "Give a Hint", icon: Lightbulb, color: "text-amber-600 bg-amber-50 border-amber-200", desc: "Socratic clues without spoilers" },
    { id: "step_by_step", label: "Solve Step-by-Step", icon: FileCode2, color: "text-emerald-600 bg-emerald-50 border-emerald-200", desc: "Full derivation & marked answer" },
    { id: "similar_question", label: "Similar Question", icon: RefreshCw, color: "text-purple-600 bg-purple-50 border-purple-200", desc: "Test yourself with parallel problem" },
    { id: "quiz_me", label: "Quick Quiz Me", icon: CheckCircle2, color: "text-rose-600 bg-rose-50 border-rose-200", desc: "2 check-for-understanding MCQs" },
    { id: "simple", label: "Explain More Simply", icon: Sparkles, color: "text-teal-600 bg-teal-50 border-teal-200", desc: "ELI5 easy real-world analogy" },
  ];

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 lg:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                Class {currentClass} AI Tutor
              </span>
              <span className="bg-emerald-400 text-emerald-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {language} Mode
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              {language === "Bengali"
                ? "পশ্চিমবঙ্গ বোর্ড এআই গৃহশিক্ষক"
                : language === "Hindi"
                ? "पश्चिम बंगाल बोर्ड AI शिक्षक"
                : "West Bengal Board AI Learning Tutor"}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl leading-relaxed">
              {language === "Bengali"
                ? "যেকোনো প্রশ্নের সমাধান, ধারণা ব্যাখ্যা, উচ্চারণ শোনা এবং সহজ পদ্ধতিতে শেখা।"
                : "Ask any textbook question, get step-by-step WBBSE/WBCHSE board solutions, hints, audio readout, and glossary."}
            </p>
          </div>

          {/* Subject badge select */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 w-full md:w-auto">
            <label className="block text-xs font-semibold text-emerald-200 mb-1">
              Active Subject
            </label>
            <select
              id="ai-tutor-subject-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-emerald-900/80 text-white text-xs font-medium rounded-xl px-3 py-2 border border-emerald-400/40 focus:ring-2 focus:ring-emerald-300 w-full md:w-48 cursor-pointer"
            >
              <option value="Mathematics">Mathematics (গণিত)</option>
              <option value="Physical Science">Physical Science (ভৌত বিজ্ঞান)</option>
              <option value="Life Science">Life Science (জীবন বিজ্ঞান)</option>
              <option value="History">History (ইতিহাস)</option>
              <option value="Geography">Geography (ভূগোল)</option>
              <option value="English">English (ইংরেজি)</option>
              <option value="Bengali">Bengali (বাংলা)</option>
              <option value="Physics">Physics (WBCHSE)</option>
              <option value="Chemistry">Chemistry (WBCHSE)</option>
              <option value="Biology">Biology (WBCHSE)</option>
              <option value="General">General / All Subjects</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mode Selector Pill Row */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">
          {language === "Bengali" ? "শিক্ষণ পদ্ধতি নির্বাচন করুন (Learning Mode)" : "Choose AI Learning Mode:"}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
          {modeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedMode === opt.id;
            return (
              <button
                key={opt.id}
                id={`learning-mode-${opt.id}`}
                onClick={() => setSelectedMode(opt.id)}
                className={`flex flex-col items-start p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? `${opt.color} border-current shadow-xs ring-2 ring-emerald-500/20 font-bold`
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-1.5 w-full mb-1">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold truncate">{opt.label}</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-500 leading-tight line-clamp-2">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error alert if any */}
      {errorBanner && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorBanner}</span>
          </div>
          <button
            onClick={() => setErrorBanner(null)}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Chat / Messages Stream */}
      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center shadow-xs">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {language === "Bengali"
                ? "কী শিখতে চান আজ? প্রশ্ন লিখুন বা মুখে বলুন!"
                : language === "Hindi"
                ? "आज आप क्या सीखना चाहते हैं? प्रश्न लिखें या बोलें!"
                : `Ready to master Class ${currentClass} lessons?`}
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              {language === "Bengali"
                ? "নিচের জনপ্রিয় বিষয়গুলি থেকে বেছে নিন অথবা নিজের পাঠ্যপুস্তকের প্রশ্ন টাইপ করুন।"
                : "Select an instant West Bengal syllabus question or type your homework problem below."}
            </p>

            {/* Starter Suggestion Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto text-left">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  id={`sample-prompt-${idx}`}
                  onClick={() => handleSendMessage(p.q)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 rounded-xl transition-all group flex items-start gap-2.5 cursor-pointer"
                >
                  <span className="text-base mt-0.5">{p.label.split(" ")[0]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                      {p.label.substring(p.label.indexOf(" ") + 1)}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{p.q}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === "user";
            const data = msg.responseData;
            const isSaved = savedIds.has(msg.id);

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-5 max-w-3xl ${
                    isUser
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white border border-slate-200 shadow-xs text-slate-900 w-full"
                  }`}
                >
                  {isUser ? (
                    <div>
                      <div className="text-[11px] text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                        <span>Student (Class {currentClass})</span>
                        {msg.mode && (
                          <span className="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-[10px] uppercase">
                            {msg.mode}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Response header & tools */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wide">
                            WBBSE / WBCHSE Aligned
                          </span>
                          <h4 className="text-base font-bold text-slate-900 mt-1">
                            {data?.title || "Solution & Explanation"}
                          </h4>
                          {data?.summary && (
                            <p className="text-xs text-slate-600 mt-0.5 italic">
                              "{data.summary}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {/* Speak audio button */}
                          <button
                            id={`btn-speak-${msg.id}`}
                            onClick={() => handleSpeak(msg.id, data?.content || msg.text)}
                            title="Read aloud"
                            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                              isSpeaking === msg.id
                                ? "bg-emerald-600 text-white animate-pulse"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {isSpeaking === msg.id ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Pause</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Listen</span>
                              </>
                            )}
                          </button>

                          {/* Save note button */}
                          <button
                            id={`btn-save-${msg.id}`}
                            onClick={() => handleSave(msg)}
                            title="Save to My Notes"
                            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                              isSaved
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-amber-600 text-amber-600" : ""}`} />
                            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Main solution content */}
                      <div className="prose prose-sm max-w-none text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {data?.content || msg.text}
                      </div>

                      {/* Difficult Words Glossary Chips */}
                      {data?.difficultWords && data.difficultWords.length > 0 && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                            <Tag className="w-3.5 h-3.5 text-emerald-600" />
                            <span>
                              {language === "Bengali"
                                ? "কঠিন শব্দার্থ ও পারিভাষিক অর্থ (Glossary):"
                                : "Key Vocabulary & Difficult Words Explained:"}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {data.difficultWords.map((w, idx) => (
                              <div
                                key={idx}
                                className="bg-white p-2 rounded-lg border border-slate-200 text-xs shadow-2xs"
                              >
                                <span className="font-bold text-emerald-800">{w.word}: </span>
                                <span className="text-slate-600">{w.meaning}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Practical Exam Tips */}
                      {data?.tips && data.tips.length > 0 && (
                        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-900">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block mb-0.5">Board Exam & Study Tip:</span>
                            <ul className="list-disc list-inside space-y-0.5">
                              {data.tips.map((t, idx) => (
                                <li key={idx}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Follow-up Question suggestions */}
                      {data?.suggestedFollowUps && data.suggestedFollowUps.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
                            {language === "Bengali" ? "সম্পর্কিত প্রশ্ন (Follow-up):" : "Ask follow-up question:"}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {data.suggestedFollowUps.map((q, idx) => (
                              <button
                                key={idx}
                                id={`follow-up-${msg.id}-${idx}`}
                                onClick={() => handleSendMessage(q)}
                                className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                              >
                                <MessageSquarePlus className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>{q}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs max-w-md">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center animate-spin">
              <Loader2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                {language === "Bengali" ? "এআই গৃহশিক্ষক বিশ্লেষণ করছে..." : "AI Tutor is formulating step-by-step explanation..."}
              </p>
              <p className="text-[11px] text-slate-500">
                Matching West Bengal Class {currentClass} syllabus & {selectedMode} mode.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Question Input Box with Voice & Send */}
      <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-300 shadow-xl p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex flex-col gap-2"
        >
          <div className="relative flex items-center">
            <input
              id="ai-tutor-question-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isListening
                  ? "Listening to your voice... (বলুন...)"
                  : language === "Bengali"
                  ? "যে কোনো প্রশ্ন লিখুন (যেমন: চার্লসের সূত্র কী?)..."
                  : `Ask any question for Class ${currentClass} ${selectedSubject}...`
              }
              className={`w-full bg-slate-50 focus:bg-white text-slate-900 text-sm rounded-xl pl-4 pr-24 py-3 border focus:outline-hidden transition-all ${
                isListening
                  ? "border-rose-400 ring-2 ring-rose-200 bg-rose-50/50"
                  : "border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              }`}
            />

            <div className="absolute right-2 flex items-center gap-1">
              {/* Mic Speech Button */}
              <button
                type="button"
                id="btn-voice-input"
                onClick={handleVoiceToggle}
                title={isListening ? "Stop listening" : "Speak question in Bengali/English/Hindi"}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  isListening
                    ? "bg-rose-600 text-white animate-bounce shadow-md"
                    : "text-slate-500 hover:text-emerald-600 hover:bg-slate-200/80"
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-send-question"
                disabled={isLoading || !inputText.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white px-3.5 py-2 rounded-lg font-semibold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>
                Tip: Press <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[10px]">Enter</kbd> to submit. Supports Voice & Multilingual answers.
              </span>
            </span>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setMessages([])}
                className="text-slate-400 hover:text-rose-600 underline cursor-pointer"
              >
                Clear chat
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
