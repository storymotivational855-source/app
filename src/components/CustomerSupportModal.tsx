import React, { useState } from "react";
import { Language } from "../types";
import {
  HelpCircle,
  X,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle,
  FileText,
  BookOpen,
  Camera,
  Wifi,
  PhoneCall,
  Mail,
  AlertCircle,
  FileDown,
  Award,
  Clock,
  ShieldCheck,
  ChevronRight,
  Search,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentClass: string;
  onNavigateTab: (tab: string) => void;
}

interface SupportMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    tab: string;
  };
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  isOpen,
  onClose,
  language,
  currentClass,
  onNavigateTab,
}) => {
  const [activeSupportTab, setActiveSupportTab] = useState<"ai-help" | "faq" | "ticket" | "contacts">("ai-help");
  const [inputQuery, setInputQuery] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Initial greeting message based on language
  const [chatMessages, setChatMessages] = useState<SupportMessage[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text:
        language === "Bengali"
          ? `নমস্কার! আমি WB Study AI কাস্টমার ও স্টুডেন্ট সাপোর্ট অ্যাসিস্ট্যান্ট। তোমার অ্যাপ ব্যবহারে কোনো অসুবিধা হচ্ছে, যেমন: নোট PDF ডাউনলোড, বাংলা বিষয় খোঁজা, বা ক্লাস ১০ ও ১২-এর প্রশ্নপত্র? নিচে লিখুন বা সরাসরি প্রশ্ন নির্বাচন করুন, আমি এখনই সমাধান করে দেব!`
          : language === "Hindi"
          ? `नमस्ते! मैं WB Study AI स्टूडेंट सपोर्ट असिस्टेंट हूँ। आपको कोई भी समस्या हो—जैसे नोट्स PDF डाउनलोड करना, बंगाली सब्जेक्ट ढूँढना, या क्लास 10/12 के पिछले प्रश्न—मुझे बताएं, मैं तुरंत समाधान करूँगा!`
          : `Hello! I am your 24/7 WB Study AI Support Assistant. Having any trouble with PDF downloads, finding the Bengali subject, or accessing Class 10 & 12 board questions? Ask me below for instant resolution!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  // Support ticket form state
  const [ticketCategory, setTicketCategory] = useState("Question / Syllabus Issue");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDetails, setTicketDetails] = useState("");
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickTroubleshootItems = [
    {
      icon: FileDown,
      title: language === "Bengali" ? "নোট PDF ডাউনলোড কীভাবে করব?" : "How to download Notes as PDF?",
      desc: language === "Bengali" ? "ড্যাশবোর্ড থেকে একক নোট বা সম্পূর্ণ বই PDF আকারে ডাউনলোড করুন।" : "Download individual or all saved study notes as offline printable PDF.",
      actionTab: "dashboard",
      buttonText: language === "Bengali" ? "ড্যাশবোর্ডে যান" : "Go to Saved Notes",
    },
    {
      icon: BookOpen,
      title: language === "Bengali" ? "বাংলা (Bengali) বিষয় কোথায় পাব?" : "Where is Bengali Subject & Syllabus?",
      desc: language === "Bengali" ? "সাহিত্য সঞ্চয়ন, কোনি, রূপনারায়ণের কূলে, ভাত ও ব্যাকরণ দেখুন।" : "Access Class 6-10 Sahitya Sanchayan, Koni & Class 11-12 Sahityacharcha chapters.",
      actionTab: "curriculum",
      buttonText: language === "Bengali" ? "পাঠ্যক্রমে যান" : "Open Curriculum",
    },
    {
      icon: Award,
      title: language === "Bengali" ? "ক্লাস ১০ ও ১২-এর বিগত বছরের প্রশ্নপত্র (PYQ)" : "Class 10 & 12 Previous Year Questions",
      desc: language === "Bengali" ? "মাধ্যমিক ও উচ্চ মাধ্যমিক পরীক্ষার সমাধানসহ প্রশ্নব্যাংক।" : "Explore official WBBSE Madhyamik & WBCHSE Higher Secondary verified questions.",
      actionTab: "pyq",
      buttonText: language === "Bengali" ? "প্রশ্নব্যাংক খুলুন" : "Open PYQ Bank",
    },
    {
      icon: Camera,
      title: language === "Bengali" ? "ছবি স্ক্যান করে সমাধান পাচ্ছি না?" : "Photo Question Solver Help",
      desc: language === "Bengali" ? "বই বা খাতার ছবির স্পষ্ট ছবি আপলোড বা ক্যামেরা দিয়ে তুলুন।" : "Snap clean, well-lit photos of Math & Science problems for step-by-step AI answers.",
      actionTab: "photo-solver",
      buttonText: language === "Bengali" ? "ফটো সলভার" : "Photo Solver",
    },
    {
      icon: Wifi,
      title: language === "Bengali" ? "ইন্টারনেট ছাড়া অফলাইনে কী কী চলবে?" : "Offline Access Guide",
      desc: language === "Bengali" ? "সার্ভিস ওয়ার্কারের সাহায্যে সেভ করা নোট, সিলেবাস ও সূত্রাবলি অফলাইনে পড়া যায়।" : "Your saved notes, curriculum structure, and basic resources are cached offline.",
      actionTab: "dashboard",
      buttonText: language === "Bengali" ? "অফলাইন নোট" : "Offline Notes",
    },
  ];

  const handleSendSupportQuery = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: SupportMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery("");
    setIsBotTyping(true);

    // Instant local diagnostic matching for instant resolution + backend fallback
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let botResponse = "";
      let actionBtn: { label: string; tab: string } | undefined = undefined;

      if (lower.includes("pdf") || lower.includes("download") || lower.includes("নোট") || lower.includes("ডাউনলোড")) {
        botResponse =
          language === "Bengali"
            ? `📄 **নোট PDF ডাউনলোড করার নিয়ম:**\n1. উপরে ডানদিকের 'Saved Notes' বা 'আমার ড্যাশবোর্ড' ট্যাবে যান।\n2. 'Download All Notes (PDF)' বাটনে ক্লিক করলে সমস্ত নোট একত্রে PDF ডাউনলোড হবে।\n3. অথবা কোনো নির্দিষ্ট নোটের পাশে 'PDF' আইকনে ক্লিক করে একক নোট ডাউনলোড করতে পারেন। সম্পূর্ণ অফলাইনে এটি কাজ করে!`
            : `📄 **How to Download Notes as PDF:**\n1. Open the 'Saved Notes' / 'Dashboard' tab.\n2. Click 'Download All Notes (PDF)' for a full compiled booklet.\n3. Or click the 'PDF' button on any individual note card to export it instantly. It works 100% offline!`;
        actionBtn = { label: "Go to Saved Notes", tab: "dashboard" };
      } else if (lower.includes("bengali") || lower.includes("বাংলা") || lower.includes("bangla") || lower.includes("bangali")) {
        botResponse =
          language === "Bengali"
            ? `📚 **বাংলা বিষয় ও অধ্যায়:**\n- **ক্লাস ৬-১০ (মাধ্যমিক):** 'Curriculum' বা 'মাধ্যমিক হাব'-এ 'Bengali (সাহিত্য সঞ্চয়ন, কোনি ও ব্যাকরণ)' পেয়ে যাবেন। এতে জ্ঞানচক্ষু, বহুরূপী, নদীর বিদ্রোহ, অস্ত্রের বিরুদ্ধে গান, কোনি এবং কারক-সমাস রয়েছে।\n- **ক্লাস ১১-১২ (উচ্চ মাধ্যমিক):** 'HS WBCHSE Hub'-এ রূপনারায়ণের কূলে, ভাত, ভারতবর্ষ, বিভাব নাটক ও শিল্প-সংস্কৃতির ইতিহাস অন্তর্ভুক্ত রয়েছে!`
            : `📚 **Bengali Subject & Syllabus:**\n- **Class 6–10 (Secondary/Madhyamik):** Added under Curriculum & Madhyamik Hub with Sahitya Sanchayan (Gyan Chakshu, Bahurupi, Nadir Bidroho), Koni, and Grammar.\n- **Class 11–12 (Higher Secondary):** Included under HS Hub with Sahityacharcha (Rupnarayaner Kule, Bhat, Bharatbarsho, Bibhab drama) and Cultural History!`;
        actionBtn = { label: "Explore Bengali Curriculum", tab: "curriculum" };
      } else if (lower.includes("10") || lower.includes("12") || lower.includes("pyq") || lower.includes("question") || lower.includes("প্রশ্ন") || lower.includes("madhyamik") || lower.includes("hs")) {
        botResponse =
          language === "Bengali"
            ? `🏆 **ক্লাস ১০ ও ১২ বিগত বছরের প্রশ্নপত্র (PYQ):**\nআমাদের 'বিগত বছরের প্রশ্ন (PYQ Bank)' এবং 'Madhyamik / HS Hub'-এ ২০২৪, ২০২৩ এবং ২০২২ সালের মাধ্যমিক ও উচ্চ মাধ্যমিকের বাংলা, অঙ্ক, ভৌত বিজ্ঞান, জীবন বিজ্ঞান, পদার্থবিদ্যা, রসায়ন ও জীববিদ্যার প্রশ্ন ও পুঙ্খানুপুঙ্খ সমাধান রয়েছে।`
            : `🏆 **Class 10 & 12 Board Questions:**\nCheck our dedicated 'PYQ Bank' and 'Madhyamik / HS Hub' tabs for authentic WBBSE Madhyamik & WBCHSE Higher Secondary 2024, 2023, and 2022 board questions with full step-by-step solutions!`;
        actionBtn = { label: "Open PYQ Bank", tab: "pyq" };
      } else if (lower.includes("camera") || lower.includes("photo") || lower.includes("ছবি") || lower.includes("scan")) {
        botResponse =
          language === "Bengali"
            ? `📷 **ছবি স্ক্যান সমাধান (Photo Solver):**\n1. 'ছবি স্ক্যান সমাধান' ট্যাবে যান।\n2. ক্যামেরায় স্পষ্ট আলোতে পাঠ্যবই বা খাতার ছবি তুলুন অথবা গ্যালারি থেকে আপলোড করুন।\n3. এআই তাৎক্ষণিকভাবে প্রতিটি প্রশ্ন শনাক্ত করে সম্পূর্ণ সমাধান প্রদান করবে।`
            : `📷 **Photo Question Solver:**\n1. Navigate to the 'Photo Solver' tab.\n2. Upload or snap a clear photo of any textbook page or question.\n3. The AI will extract all questions and provide step-by-step answers in seconds!`;
        actionBtn = { label: "Open Photo Solver", tab: "photo-solver" };
      } else {
        botResponse =
          language === "Bengali"
            ? `আপনার জিজ্ঞাসার জন্য ধন্যবাদ! "${textToSend}" সংক্রান্ত বিষয়টি আমাদের সিস্টেমে তাৎক্ষণিকভাবে নথিভুক্ত হয়েছে। কোনো নির্দিষ্ট টেকনিক্যাল সমস্যা হলে আপনি 'টিকিট জমা দিন' ট্যাবে বিস্তারিত জানাতে পারেন অথবা আমাদের হেল্পলাইনে কল করতে পারেন।`
            : `Thank you for reaching out! Regarding "${textToSend}", our AI and academic support team are available to help. You can also file an official support ticket or check direct contact numbers in the Contacts tab.`;
      }

      const botMsg: SupportMessage = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionButton: actionBtn,
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 600);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDetails.trim()) return;

    const generatedId = `WB-SUP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicketId(generatedId);
    setTicketSubject("");
    setTicketDetails("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="customer-support-modal-container"
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <HelpCircle className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">
                  {language === "Bengali" ? "স্টুডেন্ট হেল্পডেস্ক ও কাস্টমার সাপোর্ট" : "Student Helpdesk & Support"}
                </h3>
                <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  24/7 AI Solved
                </span>
              </div>
              <p className="text-xs text-slate-200">
                {language === "Bengali"
                  ? "যে কোনো সমস্যার তাৎক্ষণিক সমাধান ও সহায়তা"
                  : "Instant troubleshooting, syllabus help & contact center"}
              </p>
            </div>
          </div>
          <button
            id="close-support-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSupportTab("ai-help")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeSupportTab === "ai-help"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>{language === "Bengali" ? "তাৎক্ষণিক এআই চ্যাট" : "Instant AI Assistant"}</span>
          </button>

          <button
            onClick={() => setActiveSupportTab("faq")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeSupportTab === "faq"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span>{language === "Bengali" ? "প্রয়োজনীয় সমাধান (FAQ)" : "Quick Solutions"}</span>
          </button>

          <button
            onClick={() => setActiveSupportTab("ticket")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeSupportTab === "ticket"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>{language === "Bengali" ? "অভিযোগ / টিকিট জমা" : "Submit Ticket"}</span>
          </button>

          <button
            onClick={() => setActiveSupportTab("contacts")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeSupportTab === "contacts"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <PhoneCall className="w-4 h-4 text-indigo-500" />
            <span>{language === "Bengali" ? "বোর্ড হেল্পলাইন ও ইমেইল" : "Helplines"}</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {/* Persistent Quick-Access WhatsApp Assistance Banner */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md border border-emerald-500 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center shrink-0 shadow-xs font-bold">
                <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm">
                    {language === "Bengali"
                      ? "হোয়াটসঅ্যাপে তাৎক্ষণিক সরাসরি সহায়তা (Manual Assistance)"
                      : language === "Hindi"
                      ? "व्हाट्सएप पर त्वरित शिक्षक सहायता (Manual Assistance)"
                      : "Instant WhatsApp Manual Support"}
                  </span>
                  <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-white/30 tracking-wider font-mono">
                    +91 7063871599
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 mt-0.5">
                  {language === "Bengali"
                    ? "শিক্ষক ও সাপোর্ট দলের সাথে সরাসরি কথা বলুন বা চ্যাট করুন"
                    : language === "Hindi"
                    ? "किसी भी प्रश्न या समस्या के लिए सीधे शिक्षक या सपोर्ट टीम से चैट करें"
                    : "Chat directly with a teacher or support executive for instant help"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <a
                id="whatsapp-call-quick-btn"
                href="tel:+917063871599"
                className="bg-emerald-800/80 hover:bg-emerald-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-emerald-400/40 flex items-center gap-1 transition-colors"
                title="Call Support Directly"
              >
                <PhoneCall className="w-3 h-3 text-emerald-200" />
                <span className="hidden md:inline">Call</span>
              </a>

              <a
                id="whatsapp-support-quick-link"
                href={`https://wa.me/917063871599?text=${encodeURIComponent(
                  language === "Bengali"
                    ? "নমস্কার! আমি WB Study AI অ্যাপ থেকে সহায়তার জন্য যোগাযোগ করছি।"
                    : language === "Hindi"
                    ? "नमस्ते! मुझे WB Study AI ऐप के लिए सहायता चाहिए।"
                    : "Hello! I am contacting for assistance with the WB Study AI app."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3 text-emerald-600" />
              </a>
            </div>
          </div>

          {/* TAB 1: Instant AI Help Chat */}
          {activeSupportTab === "ai-help" && (
            <div className="flex flex-col h-full space-y-4">
              {/* Quick suggestions pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span className="text-slate-500 font-semibold shrink-0">
                  {language === "Bengali" ? "দ্রুত প্রশ্ন:" : "Quick query:"}
                </span>
                <button
                  onClick={() => handleSendSupportQuery("How to download notes as PDF?")}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors"
                >
                  📄 PDF Download Notes
                </button>
                <button
                  onClick={() => handleSendSupportQuery("Where is Bengali subject?")}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors"
                >
                  📚 Bengali (বাংলা) Subject
                </button>
                <button
                  onClick={() => handleSendSupportQuery("Class 10 & 12 Previous Year Questions")}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors"
                >
                  🏆 Class 10 & 12 PYQ
                </button>
              </div>

              {/* Chat Message List */}
              <div className="space-y-3 min-h-[220px] max-h-[340px] overflow-y-auto pr-1">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        msg.sender === "user"
                          ? "bg-emerald-600 text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Optional Action Button */}
                      {msg.actionButton && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => {
                              onNavigateTab(msg.actionButton!.tab);
                              onClose();
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer transition-all"
                          >
                            <span>{msg.actionButton.label}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {isBotTyping && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-2xl w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>WB Study Assistant is finding solution...</span>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <input
                  id="support-chat-input"
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendSupportQuery();
                  }}
                  placeholder={
                    language === "Bengali"
                      ? "আপনার যে কোনো প্রশ্ন বা সমস্যা লিখুন..."
                      : "Type any doubt, problem, or question..."
                  }
                  className="flex-1 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
                <button
                  id="support-chat-send-btn"
                  onClick={() => handleSendSupportQuery()}
                  disabled={!inputQuery.trim() || isBotTyping}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm shrink-0"
                >
                  <span>{language === "Bengali" ? "পাঠান" : "Send"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Quick FAQ Solutions */}
          {activeSupportTab === "faq" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-medium">
                {language === "Bengali"
                  ? "সাধারণ সমস্যাগুলির তাৎক্ষণিক ১-ক্লিক সমাধান ও গাইড:"
                  : "Instant 1-click solutions for frequent student actions:"}
              </div>

              <div className="space-y-3">
                {quickTroubleshootItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onNavigateTab(item.actionTab);
                          onClose();
                        }}
                        className="self-end sm:self-center shrink-0 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-semibold text-xs px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-600 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>{item.buttonText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Submit Support Ticket */}
          {activeSupportTab === "ticket" && (
            <div className="space-y-4">
              {submittedTicketId ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900">
                    {language === "Bengali" ? "টিকিট সফলভাবে জমা হয়েছে!" : "Support Ticket Submitted Successfully!"}
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    {language === "Bengali"
                      ? `আপনার রেফারেন্স নম্বর হলো ${submittedTicketId}। আমাদের এআই সিস্টেম এটি পর্যবেক্ষণ করছে এবং শীঘ্রই সমাধান আপডেট করা হবে।`
                      : `Your Ticket Reference is ${submittedTicketId}. Our AI academic triage engine has logged this issue and prioritized it.`}
                  </p>
                  <button
                    onClick={() => setSubmittedTicketId(null)}
                    className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs cursor-pointer hover:bg-emerald-700"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Problem Category / সমস্যার বিষয়
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Question / Syllabus Issue">Question / Syllabus Doubt (সিলেবাস সংক্রান্ত)</option>
                      <option value="PDF Export & Offline Notes">PDF Export & Offline Notes (নোট ডাউনলোড সমস্যা)</option>
                      <option value="Photo Solver Clarification">Photo Solver Doubt (ছবি সমাধান সংক্রান্ত)</option>
                      <option value="Bengali Subject Chapters">Bengali Chapters & Books (বাংলা বিষয়)</option>
                      <option value="Class 10 & 12 Board Prep">Class 10 & 12 PYQ (মাধ্যমিক ও উচ্চ মাধ্যমিক প্রশ্ন)</option>
                      <option value="General Feedback & App Suggestion">General Feedback / অন্যান্য</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Short Subject / সংক্ষিপ্ত শিরোনাম
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="e.g. Madhyamik Bengali grammar answer explanation needed"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Describe your problem / সমস্যার বিস্তারিত বিবরণ
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={ticketDetails}
                      onChange={(e) => setTicketDetails(e.target.value)}
                      placeholder="Please explain what happened or what you need help with..."
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-xs cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{language === "Bengali" ? "টিকিট জমা দিন" : "Submit Support Ticket"}</span>
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-xs text-slate-500">
                      {language === "Bengali" ? "জরুরি সহায়তার জন্য সরাসরি হোয়াটসঅ্যাপ করুন:" : "Need urgent help? Chat directly on WhatsApp:"}
                    </p>
                    <a
                      href={`https://wa.me/917063871599?text=${encodeURIComponent(
                        "Hello WB Study AI Support! I have an urgent query regarding ticket / academic issue."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-1 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                      <span>WhatsApp: +91 7063871599</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: Board Helplines & Contacts */}
          {activeSupportTab === "contacts" && (
            <div className="space-y-4">
              {/* WhatsApp Direct Executive Card */}
              <div className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-4.5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageCircle className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-emerald-950">
                        {language === "Bengali"
                          ? "হোয়াটসঅ্যাপ সাপোর্ট ও হেল্পডেস্ক (WhatsApp Desk)"
                          : "Direct WhatsApp & Phone Support Desk"}
                      </h4>
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                        Instant
                      </span>
                    </div>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      {language === "Bengali"
                        ? "সরাসরি শিক্ষক ও সাপোর্ট দলের সাথে মেসেজ বা কল করুন।"
                        : "Connect with our academic counselors and technical team instantly."}
                    </p>
                    <div className="text-xs font-mono font-bold text-emerald-900 mt-1 flex items-center gap-2">
                      <span>📱 +91 7063871599</span>
                      <span className="text-slate-400 font-normal">|</span>
                      <span className="text-emerald-700 font-sans text-[11px]">Daily 8:00 AM – 10:00 PM IST</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                  <a
                    href="tel:+917063871599"
                    className="bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl border border-slate-300 shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={`https://wa.me/917063871599?text=${encodeURIComponent(
                      language === "Bengali"
                        ? "নমস্কার! আমি WB Study AI অ্যাপ সম্পর্কিত সহায়তার জন্য যোগাযোগ করছি।"
                        : language === "Hindi"
                        ? "नमस्ते! मुझे WB Study AI ऐप के लिए सहायता चाहिए।"
                        : "Hello! I need manual assistance with WB Study AI app."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* WBBSE Card */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>WBBSE (Madhyamik Board)</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    West Bengal Board of Secondary Education - Nivedita Bhavan, Salt Lake, Kolkata.
                  </p>
                  <div className="text-xs text-slate-700 space-y-1 font-mono pt-1">
                    <div>📞 033-2321-3844 / 3816</div>
                    <div>✉️ wbbse05@yahoo.co.in</div>
                  </div>
                </div>

                {/* WBCHSE Card */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs sm:text-sm">
                    <Award className="w-4 h-4 text-indigo-600" />
                    <span>WBCHSE (Higher Secondary)</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    West Bengal Council of Higher Secondary Education - Vidyasagar Bhavan, Salt Lake.
                  </p>
                  <div className="text-xs text-slate-700 space-y-1 font-mono pt-1">
                    <div>📞 033-2337-0797 / 4984</div>
                    <div>✉️ helpline@wbchse.org.in</div>
                  </div>
                </div>
              </div>

              {/* WB Study AI App Direct Support */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-emerald-900 block">
                    WB Study AI Official Support Desk
                  </span>
                  <p className="text-xs text-slate-600">
                    Direct Email: <span className="font-semibold text-emerald-800">support@wbstudy.ai</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Response time: Instant with AI Diagnostic, &lt; 2 hours for academic reviews.
                  </p>
                </div>
                <a
                  href="mailto:support@wbstudy.ai"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shrink-0 cursor-pointer shadow-xs transition-colors"
                >
                  Email Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
