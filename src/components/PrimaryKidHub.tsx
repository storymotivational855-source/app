import React, { useState } from "react";
import { Language } from "../types";
import { speakText, stopSpeaking } from "../services/speech";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Smile,
  Star,
  Award,
  Music,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Calculator,
  Languages,
  Gamepad2,
  Image as ImageIcon,
  RotateCcw,
  Clock,
  Shapes,
  Heart,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PrimaryKidHubProps {
  currentClass: string;
  language: Language;
  onAskTutor: (q: string) => void;
}

type KidTab =
  | "abcd"
  | "numbers"
  | "english"
  | "bengali"
  | "hindi"
  | "maths"
  | "pictures"
  | "games"
  | "quiz";

export const PrimaryKidHub: React.FC<PrimaryKidHubProps> = ({
  currentClass,
  language,
  onAskTutor,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<KidTab>("abcd");
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Numbers state
  const [numberMode, setNumberMode] = useState<"en" | "bn">("bn");
  const [numberRange, setNumberRange] = useState<"1-20" | "21-50" | "51-100">("1-20");

  // Picture Dictionary Category
  const [picCategory, setPicCategory] = useState<"animals" | "fruits" | "birds" | "vehicles" | "flowers">("animals");

  // Game state
  const [selectedGame, setSelectedGame] = useState<"memory" | "balloon" | "shape">("memory");
  const [memoryCards, setMemoryCards] = useState(() =>
    generateMemoryCards()
  );
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [balloonScore, setBalloonScore] = useState<number>(0);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);

  // Quiz state
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleSpeak = (text: string, id: string) => {
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    stopSpeaking();
    setSpeakingId(id);
    speakText(
      text,
      language,
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  // ABCD Data
  const abcdData = [
    { letter: "A a", word: "Apple", bengali: "আপেল", emoji: "🍎", phonics: "/æ/ Apple", prompt: "A for Apple, /æ/ /æ/ Apple!" },
    { letter: "B b", word: "Ball", bengali: "বল", emoji: "⚽", phonics: "/b/ Ball", prompt: "B for Ball, /b/ /b/ Ball!" },
    { letter: "C c", word: "Cat", bengali: "বিড়াল", emoji: "🐱", phonics: "/k/ Cat", prompt: "C for Cat, /k/ /k/ Cat!" },
    { letter: "D d", word: "Duck", bengali: "হাঁস", emoji: "🦆", phonics: "/d/ Duck", prompt: "D for Duck, /d/ /d/ Duck!" },
    { letter: "E e", word: "Elephant", bengali: "হাতি", emoji: "🐘", phonics: "/e/ Elephant", prompt: "E for Elephant!" },
    { letter: "F f", word: "Fish", bengali: "মাছ", emoji: "🐟", phonics: "/f/ Fish", prompt: "F for Fish in Bengal rivers!" },
    { letter: "G g", word: "Grapes", bengali: "আঙুর", emoji: "🍇", phonics: "/ɡ/ Grapes", prompt: "G for Grapes, juicy bunch!" },
    { letter: "H h", word: "Hat", bengali: "টুপি", emoji: "🎩", phonics: "/h/ Hat", prompt: "H for Hat!" },
    { letter: "I i", word: "Ice Cream", bengali: "আইসক্রিম", emoji: "🍦", phonics: "/aɪ/ Ice cream", prompt: "I for delicious Ice Cream!" },
    { letter: "J j", word: "Jug", bengali: "জগ", emoji: "🫖", phonics: "/dʒ/ Jug", prompt: "J for Jug of pure water!" },
    { letter: "K k", word: "Kite", bengali: "ঘুড়ি", emoji: "🪁", phonics: "/k/ Kite", prompt: "K for Kite flying in blue sky!" },
    { letter: "L l", word: "Lion", bengali: "সিংহ", emoji: "🦁", phonics: "/l/ Lion", prompt: "L for Lion, King of Jungle!" },
    { letter: "M m", word: "Mango", bengali: "আম", emoji: "🥭", phonics: "/m/ Mango", prompt: "M for Malda Mango, King of Fruits!" },
    { letter: "N n", word: "Nest", bengali: "পাখির বাসা", emoji: "🪺", phonics: "/n/ Nest", prompt: "N for Nest on green tree!" },
    { letter: "O o", word: "Owl", bengali: "পেঁচা", emoji: "🦉", phonics: "/aʊ/ Owl", prompt: "O for wise Owl at night!" },
    { letter: "P p", word: "Peacock", bengali: "ময়ূর", emoji: "🦚", phonics: "/p/ Peacock", prompt: "P for Peacock dancing in rain!" },
    { letter: "Q q", word: "Queen", bengali: "রানী", emoji: "👑", phonics: "/kw/ Queen", prompt: "Q for royal Queen!" },
    { letter: "R r", word: "Rainbow", bengali: "রংধনু", emoji: "🌈", phonics: "/r/ Rainbow", prompt: "R for 7-color Rainbow!" },
    { letter: "S s", word: "Sun", bengali: "সূর্য", emoji: "☀️", phonics: "/s/ Sun", prompt: "S for bright morning Sun!" },
    { letter: "T t", word: "Tiger", bengali: "বাঘ", emoji: "🐯", phonics: "/t/ Tiger", prompt: "T for Royal Bengal Tiger!" },
    { letter: "U u", word: "Umbrella", bengali: "ছাতা", emoji: "☂️", phonics: "/ʌ/ Umbrella", prompt: "U for Umbrella in monsoon!" },
    { letter: "V v", word: "Violin", bengali: "বেহালা", emoji: "🎻", phonics: "/v/ Violin", prompt: "V for sweet melody Violin!" },
    { letter: "W w", word: "Watch", bengali: "ঘড়ি", emoji: "⌚", phonics: "/w/ Watch", prompt: "W for Watch ticking on wrist!" },
    { letter: "X x", word: "Xylophone", bengali: "জাইলোফোন", emoji: "🎼", phonics: "/z/ Xylophone", prompt: "X for joyful Xylophone!" },
    { letter: "Y y", word: "Yak", bengali: "চমরী গাই", emoji: "🐂", phonics: "/j/ Yak", prompt: "Y for Himalayan Yak in Darjeeling!" },
    { letter: "Z z", word: "Zebra", bengali: "জেব্রা", emoji: "🦓", phonics: "/z/ Zebra", prompt: "Z for black and white striped Zebra!" },
  ];

  // Bengali Varnamala Data
  const bengaliVarnamala = [
    { letter: "অ", word: "অজগর", phrase: "অজগর আসছে তেড়ে", emoji: "🐍", prompt: "অ-এ অজগর আসছে তেড়ে!" },
    { letter: "আ", word: "আম", phrase: "আমটি আমি খাব পেড়ে", emoji: "🥭", prompt: "আ-এ আমটি আমি খাব পেড়ে!" },
    { letter: "ই", word: "ইঁদুর", phrase: "ইঁদুর ছানা ভয়ে মরে", emoji: "🐭", prompt: "ই-এ ইঁদুর ছানা ভয়ে মরে!" },
    { letter: "ঈ", word: "ঈগল", phrase: "ঈগল পাখি পাছে ধরে", emoji: "🦅", prompt: "ঈ-এ ঈগল পাখি পাছে ধরে!" },
    { letter: "উ", word: "উট", phrase: "উট চলেছে মুখটি তুলে", emoji: "🐫", prompt: "উ-এ উট চলেছে মুখটি তুলে!" },
    { letter: "ঊ", word: "ঊষা", phrase: "ঊষা হাসে পুবের কোণে", emoji: "🌅", prompt: "ঊ-এ ঊষা হাসে পুবের কোণে!" },
    { letter: "ঋ", word: "ঋষি", phrase: "ঋষি মশাই বসেন পূজায়", emoji: "🧘", prompt: "ঋ-এ ঋষি মশাই বসেন পূজায়!" },
    { letter: "এ", word: "এক্কাগাড়ি", phrase: "এক্কাগাড়ি খুব ছুটেছে", emoji: "🐎", prompt: "এ-এ এক্কাগাড়ি খুব ছুটেছে!" },
    { letter: "ঐ", word: "ঐরাবত", phrase: "ঐ দেখো ভাই চাঁদ উঠেছে", emoji: "🐘", prompt: "ঐ-এ ঐরাবত চলে হেলেদুলে!" },
    { letter: "ও", word: "ওল", phrase: "ওল খেয়ো না ধরবে গলা", emoji: "🥔", prompt: "ও-এ ওল খেয়ো না ধরবে গলা!" },
    { letter: "ঔ", word: "ঔষধ", phrase: "ঔষধ খেতে মিছে বলা", emoji: "💊", prompt: "ঔ-এ ঔষধ খেতে মিছে বলা!" },
    { letter: "ক", word: "কাকাতুয়া", phrase: "কাকাতুয়ার মাথায় ঝুঁটি", emoji: "🦜", prompt: "ক-এ কাকাতুয়ার মাথায় ঝুঁটি!" },
    { letter: "খ", word: "খরগোশ", phrase: "খেঁকশিয়ালী পালায় ছুটি", emoji: "🐰", prompt: "খ-এ খরগোশ ছানা লাফিয়ে চলে!" },
    { letter: "গ", word: "গরু", phrase: "গরু বাছুর দাঁড়িয়ে আছে", emoji: "🐄", prompt: "গ-এ গরু বাছুর দাঁড়িয়ে আছে!" },
    { letter: "ঘ", word: "ঘোড়া", phrase: "ঘোড়া ছুটিয়ে চলছে বীরে", emoji: "🐎", prompt: "ঘ-এ ঘোড়া ছুটিয়ে চলছে বীরে!" },
    { letter: "ঙ", word: "ব্যাঙ", phrase: "ঙ নৌকো চালায় ভাই", emoji: "🐸", prompt: "ঙ-এ কোলাব্যাঙ ডাকে বর্ষায়!" },
    { letter: "চ", word: "চিতাবাঘ", phrase: "চিতাবাঘের সরু ঠ্যাং", emoji: "🐆", prompt: "চ-এ চিতাবাঘের সরু ঠ্যাং!" },
    { letter: "ছ", word: "ছাগল", phrase: "ছাগল ছানা লাফিয়ে চলে", emoji: "🐐", prompt: "ছ-এ ছাগল ছানা লাফিয়ে চলে!" },
    { letter: "জ", word: "জাহাজ", phrase: "জাহাজ ভাসে সাগর জলে", emoji: "🚢", prompt: "জ-এ জাহাজ ভাসে সাগর জলে!" },
    { letter: "ঝ", word: "ঝাঁটা", phrase: "ঝাঁটা হাতে ঘর সাফাই", emoji: "🧹", prompt: "ঝ-এ ঝাঁটা হাতে ঘর সাফাই!" },
    { letter: "ট", word: "টিয়া", phrase: "টিয়ার ঠোঁটটি লাল", emoji: "🦜", prompt: "ট-এ টিয়া পাখির ঠোঁটটি লাল!" },
    { letter: "ঠ", word: "ঠাকুরদা", phrase: "ঠাকুরদাদার শুকনো গাল", emoji: "👴", prompt: "ঠ-এ ঠাকুরদাদার শুকনো গাল!" },
    { letter: "ড", word: "ডালিম", phrase: "ডালিম গাছে মৌমাছি", emoji: "🍎", prompt: "ড-এ ডালিম ফল মিষ্টি বড়!" },
    { letter: "ঢ", word: "ঢোলক", phrase: "ঢোলক বাজে তালে তালে", emoji: "🪘", prompt: "ঢ-এ ঢোলক বাজে তালে তালে!" },
    { letter: "প", word: "পাখি", phrase: "পাখি সব করে রব", emoji: "🕊️", prompt: "প-এ পাখি সব করে রব রাতি পোহাইল!" },
    { letter: "ফ", word: "ফুল", phrase: "ফুল ফুটেছে বাগান আলো", emoji: "🌸", prompt: "ফ-এ ফুল ফুটেছে বাগান আলো করে!" },
    { letter: "ব", word: "বই", phrase: "বই পড়ে যে জ্ঞান বাড়ে", emoji: "📚", prompt: "ব-এ বই পড়ে যে বড় হয় সে!" },
    { letter: "ভ", word: "ভালুক", phrase: "ভালুক নাচে মনের সুখে", emoji: "🐻", prompt: "ভ-এ ভালুক নাচে মনের সুখে!" },
    { letter: "ম", word: "ময়ূর", phrase: "ময়ূর নাচে পেখম তুলে", emoji: "🦚", prompt: "ম-এ ময়ূর নাচে পেখম মেলে!" },
    { letter: "র", word: "রাজহাঁস", phrase: "রাজহাঁসের সুন্দর ডানা", emoji: "🦢", prompt: "র-এ রাজহাঁসের লম্বা গলা!" },
  ];

  // Hindi Varnamala Data
  const hindiVarnamala = [
    { letter: "अ", word: "अनार", hindiWord: "अनार (मीठा फल)", emoji: "🍎", prompt: "अ से अनार, लाल-लाल मीठा अनार!" },
    { letter: "आ", word: "आम", hindiWord: "आम (फलों का राजा)", emoji: "🥭", prompt: "आ से आम, फलों का राजा आम!" },
    { letter: "इ", word: "इमली", hindiWord: "इमली (खट्टी मीठी)", emoji: "🌿", prompt: "इ से इमली, खट्टी-मीठी इमली!" },
    { letter: "ई", word: "ईख", hindiWord: "ईख (गन्ना)", emoji: "🎋", prompt: "ई से ईख, मीठा गन्ना!" },
    { letter: "उ", word: "उल्लू", hindiWord: "उल्लू (रात का पक्षी)", emoji: "🦉", prompt: "उ से उल्लू, रात में जागे उल्लू!" },
    { letter: "ऊ", word: "ऊन", hindiWord: "ऊन (गर्म धागा)", emoji: "🧶", prompt: "ऊ से ऊन, सर्दियों का स्वेटर!" },
    { letter: "ऋ", word: "ऋषि", hindiWord: "ऋषि (तपस्वी)", emoji: "🧘", prompt: "ऋ से ऋषि, ज्ञान के सागर!" },
    { letter: "ए", word: "एड़ी", hindiWord: "एड़ी (पैर का भाग)", emoji: "🦶", prompt: "ए से एड़ी, पैर की चाल!" },
    { letter: "ऐ", word: "ऐनक", hindiWord: "ऐनक (चश्मा)", emoji: "👓", prompt: "ऐ से ऐनक, साफ दिखाई दे!" },
    { letter: "ओ", word: "ओखली", hindiWord: "ओखली (अनाज कूटने की)", emoji: "🥣", prompt: "ओ से ओखली, धान कूटो!" },
    { letter: "औ", word: "औरत", hindiWord: "औरत (माता)", emoji: "👩", prompt: "औ से औरत, ममता की मूरत!" },
    { letter: "क", word: "कमल", hindiWord: "कमल (हमारा राष्ट्रीय फूल)", emoji: "🪷", prompt: "क से कमल, खिलता जल में!" },
    { letter: "ख", word: "खरगोश", hindiWord: "खरगोश (सफेद प्यारा)", emoji: "🐰", prompt: "ख से खरगोश, दौड़े सरपट!" },
    { letter: "ग", word: "गमला", hindiWord: "गमला (फूलों का पात्र)", emoji: "🪴", prompt: "ग से गमला, पौधे लगाओ!" },
    { letter: "घ", word: "घर", hindiWord: "घर (हमारा प्यारा घर)", emoji: "🏠", prompt: "घ से घर, प्यारा घर!" },
    { letter: "च", word: "चम्मच", hindiWord: "चम्मच (खाने का साधन)", emoji: "🥄", prompt: "च से चम्मच, खीर खाओ!" },
    { letter: "छ", word: "छाता", hindiWord: "छाता (बारिश में साथी)", emoji: "☂️", prompt: "छ से छाता, बारिश में काम आए!" },
  ];

  // Picture Dictionary Data
  const pictureDictionary = {
    animals: [
      { name: "Royal Bengal Tiger", bengali: "রয়্যাল বেঙ্গল টাইগার", hindi: "बाघ", emoji: "🐯", sound: "Roar! রয়েল বেঙ্গল টাইগার সুন্দরবনে বাস করে।" },
      { name: "Elephant", bengali: "হাতি", hindi: "हाथी", emoji: "🐘", sound: "Trumpet! হাতি সবচেয়ে বড় স্থলচর প্রাণী।" },
      { name: "Deer", bengali: "হরিণ", hindi: "हिरण", emoji: "🦌", sound: "হরিণ দ্রুত দৌড়ায় ও ঘাস খায়।" },
      { name: "Cow", bengali: "গরু (দুধ দেয়)", hindi: "गाय", emoji: "🐄", sound: "গরু আমাদের সুস্বাদু দুধ দেয়।" },
      { name: "Monkey", bengali: "বানর", hindi: "बंदर", emoji: "🐒", sound: "বানর গাছে গাছে লাফিয়ে ফল খায়।" },
      { name: "Rabbit", bengali: "খরগোশ", hindi: "खरगोश", emoji: "🐰", sound: "সাদা খরগোশ মিষ্টি গাজর ভালোবাসে।" },
    ],
    fruits: [
      { name: "Himsagar Mango", bengali: "হিমসাগর আম", hindi: "आम", emoji: "🥭", sound: "মালদার সুস্বাদু মিষ্টি হিমসাগর আম।" },
      { name: "Banana", bengali: "কলা", hindi: "केला", emoji: "🍌", sound: "কলা ভিটামিন ও শক্তিতে ভরপুর।" },
      { name: "Apple", bengali: "আপেল", hindi: "सेब", emoji: "🍎", sound: "প্রতিদিন একটি আপেল খেলে ডাক্তার দূরে থাকে।" },
      { name: "Watermelon", bengali: "তরমুজ", hindi: "तरबूज", emoji: "🍉", sound: "গ্রীষ্মকালের ঠান্ডা রসালো তরমুজ।" },
      { name: "Grapes", bengali: "আঙুর", hindi: "अंगूर", emoji: "🍇", sound: "মিষ্টি থোকা থোকা আঙুর।" },
      { name: "Pineapple", bengali: "আনারস", hindi: "अनानास", emoji: "🍍", sound: "উত্তরবঙ্গের রসালো আনারস।" },
    ],
    birds: [
      { name: "Peacock", bengali: "ময়ূর (ভারতের জাতীয় পাখি)", hindi: "मोर", emoji: "🦚", sound: "ময়ূর মেঘ দেখে পেখম তুলে নাচে।" },
      { name: "Parrot / Tia", bengali: "টিয়া পাখি", hindi: "तोता", emoji: "🦜", sound: "টিয়ার ঠোঁট লাল এবং কথা বলতে পারে।" },
      { name: "Kingfisher", bengali: "মাছরাঙা (পশ্চিমবঙ্গের রাজ্য পাখি)", hindi: "किलकिला", emoji: "🪶", sound: "সাদা গলা মাছরাঙা পশ্চিমবঙ্গের রাজ্য পাখি!" },
      { name: "Pigeon", bengali: "পায়রা / কবুতর", hindi: "कबूतर", emoji: "🕊️", sound: "বাকবাকুম পায়রা শান্তির প্রতীক।" },
      { name: "Duck", bengali: "হাঁস", hindi: "बतख", emoji: "🦆", sound: "পুকুরের জলে হাঁস প্যাক প্যাক করে সাঁতার কাটে।" },
      { name: "Owl", bengali: "লক্ষ্মী পেঁচা", hindi: "उल्लू", emoji: "🦉", sound: "লক্ষ্মী পেঁচা রাতে দেখতে পায়।" },
    ],
    vehicles: [
      { name: "Yellow Taxi", bengali: "কলকাতার হলুদ ট্যাক্সি", hindi: "पीली टैक्सी", emoji: "🚕", sound: "কলকাতার ঐতিহ্যবাহী হলুদ ট্যাক্সি।" },
      { name: "Tram", bengali: "কলকাতার ট্রাম", hindi: "ट्राम", emoji: "🚋", sound: "এশিয়ার সবচেয়ে প্রাচীন পরিবেশবান্ধব ট্রাম।" },
      { name: "Train", bengali: "রেলগাড়ি (ঝমাঝম)", hindi: "रेलगाड़ी", emoji: "🚆", sound: "হাওড়া ও শিয়ালদহ স্টেশনের দ্রুতগামী ট্রেন।" },
      { name: "School Bus", bengali: "স্কুল বাস", hindi: "स्कूल बस", emoji: "🚌", sound: "হলুদ স্কুল বাস বাচ্চাদের স্কুলে নিয়ে যায়।" },
      { name: "Aeroplane", bengali: "উড়োজাহাজ", hindi: "हवाई जहाज", emoji: "✈️", sound: "আকাশে মেঘের উপর উড়ে চলে উড়োজাহাজ।" },
      { name: "Bicycle", bengali: "সবুজ সাথী সাইকেল", hindi: "साइकिल", emoji: "🚲", sound: "বেল বাজিয়ে সাইকেল চালানো স্বাস্থ্যকর।" },
    ],
    flowers: [
      { name: "Night-flowering Jasmine / Shiuli", bengali: "শিউলি ফুল (পশ্চিমবঙ্গের রাজ্য ফুল)", hindi: "पारिजात", emoji: "🌼", sound: "শরৎকালে দুর্গাপূজার সময় সুগন্ধি শিউলি ফোটে।" },
      { name: "Lotus", bengali: "পদ্মফুল (জাতীয় ফুল)", hindi: "कमल", emoji: "🪷", sound: "পবিত্র নীলপদ্ম ও লালপদ্ম জলে ফোটে।" },
      { name: "Rose", bengali: "গোলাপ", hindi: "गुलाब", emoji: "🌹", sound: "গোলাপ ফুলের সুবাস ও রঙ অপূর্ব।" },
      { name: "Marigold", bengali: "গাঁদা ফুল", hindi: "गेंदा", emoji: "🏵️", sound: "উৎসবের মালায় হলুদ গাঁদা ফুল।" },
    ],
  };

  // Math Fun Data
  const mathConcepts = [
    { title: "2D Shapes (জ্যামিতিক আকার)", icon: "Shapes", items: [
      { name: "Circle (বৃত্ত)", emoji: "🔴", desc: "Round like a coin, sun or football!", formula: "Zero corners, 1 curved line" },
      { name: "Square (বর্গক্ষেত্র)", emoji: "🟩", desc: "Carrom board, ludo dice with 4 equal sides!", formula: "4 equal sides, 4 corners" },
      { name: "Triangle (ত্রিভুজ)", emoji: "🔺", desc: "Slice of pizza, yummy Singara (স samosa)!", formula: "3 sides, 3 corners" },
      { name: "Rectangle (আয়তক্ষেত্র)", emoji: "🚪", desc: "Door, notebook, chalkboard!", formula: "Opposite sides equal, 4 corners" },
    ]},
    { title: "Fun Multiplication Tables (নামতা ১ থেকে ৫)", icon: "Calculator", items: [
      { name: "Table of 2 (২-এর নামতা)", emoji: "✌️", desc: "২ × ১ = ২, ২ × ২ = ৪, ২ × ৩ = ৬, ২ × ৪ = ৮, ২ × ৫ = ১০", formula: "Skip counting by 2" },
      { name: "Table of 3 (৩-এর নামতা)", emoji: "☘️", desc: "৩ × ১ = ৩, ৩ × ২ = ৬, ৩ × ৩ = ৯, ৩ × ৪ = ১২, ৩ × ৫ = ১৫", formula: "Skip counting by 3" },
      { name: "Table of 5 (৫-এর নামতা)", emoji: "🖐️", desc: "৫ × ১ = ৫, ৫ × ২ = ১০, ৫ × ৩ = ১৫, ৫ × ৪ = ২০, ৫ × ৫ = ২৫", formula: "Ends in 0 or 5" },
    ]},
  ];

  // Kid Quiz Data
  const kidQuiz = [
    {
      q: "Which fruit is called the 'King of Fruits' in West Bengal?",
      qBengali: "পশ্চিমবঙ্গের কোন ফলকে 'ফলের রাজা' বলা হয়?",
      options: ["🍎 Apple", "🥭 Mango (আম)", "🍌 Banana", "🍇 Grapes"],
      correct: 1,
      fact: "Malda and Murshidabad in West Bengal are world-famous for Himsagar and Langra mangoes!",
    },
    {
      q: "What is the official State Bird of West Bengal?",
      qBengali: "পশ্চিমবঙ্গের রাজ্য পাখি কোনটি?",
      options: ["🦜 Parrot (টিয়া)", "🦚 Peacock (ময়ূর)", "🕊️ White-throated Kingfisher (সাদা গলা মাছরাঙা)", "🦅 Eagle (ঈগল)"],
      correct: 2,
      fact: "The White-throated Kingfisher (মাছরাঙা) is the official state bird of West Bengal!",
    },
    {
      q: "What is 4 + 3?",
      qBengali: "৪ + ৩ = কত হয়?",
      options: ["6 (ছয়)", "7 (সাত)", "8 (আট)", "9 (নয়)"],
      correct: 1,
      fact: "4 stars + 3 stars = 7 shining stars in total!",
    },
    {
      q: "Where does the Royal Bengal Tiger live in West Bengal?",
      qBengali: "রয়্যাল বেঙ্গল টাইগার পশ্চিমবঙ্গের কোথায় বাস করে?",
      options: ["🏔️ Darjeeling", "🌊 Sundarbans (সুন্দরবন)", "🏛️ Kolkata", "🌾 Burdwan"],
      correct: 1,
      fact: "Sundarbans is the largest mangrove delta in the world!",
    },
  ];

  // Helper to generate memory cards
  function generateMemoryCards() {
    const raw = ["🐯", "🍎", "🦜", "⚽", "🐘", "🥭"];
    const pairs = [...raw, ...raw];
    return pairs
      .map((value, id) => ({ id, value, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
  }

  const handleCardClick = (idx: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(idx) || matchedPairs.includes(idx)) return;

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (memoryCards[firstIdx].value === memoryCards[secondIdx].value) {
        setMatchedPairs((prev) => [...prev, firstIdx, secondIdx]);
        setFlippedIndices([]);
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
        } catch (e) {}
      } else {
        setTimeout(() => setFlippedIndices([]), 900);
      }
    }
  };

  const resetMemoryGame = () => {
    setMemoryCards(generateMemoryCards());
    setFlippedIndices([]);
    setMatchedPairs([]);
  };

  const handlePopBalloon = (idx: number, letter: string) => {
    if (poppedBalloons.includes(idx)) return;
    setPoppedBalloons((prev) => [...prev, idx]);
    setBalloonScore((s) => s + 10);
    handleSpeak(`${letter}! Pop!`, `pop_${idx}`);
    try {
      confetti({ particleCount: 30, spread: 40 });
    } catch (e) {}
  };

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckQuiz = () => {
    let score = 0;
    kidQuiz.forEach((item, idx) => {
      if (selectedQuizAnswers[idx] === item.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score === kidQuiz.length) {
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Friendly Top Header */}
      <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide">
              <span>🎈 WB Study AI Primary School</span>
              <span className="bg-amber-900/40 text-amber-100 px-2 py-0.5 rounded-full">
                Class 1–5 Kids
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-xs">
              {language === "Bengali"
                ? "আনন্দ পাঠশালা (Class 1–5 Kids Learning)"
                : "Joyful Primary Learning Hub (Class 1–5)"}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-white/90 max-w-xl">
              {language === "Bengali"
                ? "ABCD, ১-১০০ গণনা, বাংলা ও হিন্দি বর্ণমালা, ছবি দেখে শেখা, মজার খেলা ও কুইজ!"
                : "Explore ABCD Phonics, Bengali & Hindi Alphabets, Picture Math, Flashcards, Interactive Games, and Star Quizzes!"}
            </p>
          </div>

          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-white/40">
            🌟
          </div>
        </div>
      </div>

      {/* 9 Kids Learning Navigation Sub-Tabs matching required tree */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {[
          { id: "abcd" as KidTab, label: "ABCD Phonics", bengaliLabel: "ABCD", icon: "🔤" },
          { id: "numbers" as KidTab, label: "1–100 Numbers", bengaliLabel: "১–১০০ সংখ্যা", icon: "🔢" },
          { id: "english" as KidTab, label: "English Rhymes", bengaliLabel: "ইংরেজি ছড়া", icon: "📖" },
          { id: "bengali" as KidTab, label: "বাংলা বর্ণমালা", bengaliLabel: "বাংলা অ আ", icon: "🦜" },
          { id: "hindi" as KidTab, label: "हिंदी वर्णमाला", bengaliLabel: "হিন্দি অ-आ", icon: "🕉️" },
          { id: "maths" as KidTab, label: "Picture Maths", bengaliLabel: "মজার অঙ্ক ও নামতা", icon: "🧮" },
          { id: "pictures" as KidTab, label: "Picture Dict", bengaliLabel: "ছবির ডিকশনারি", icon: "🖼️" },
          { id: "games" as KidTab, label: "Kids Games", bengaliLabel: "মজার খেলা", icon: "🎮" },
          { id: "quiz" as KidTab, label: "Star Quiz", bengaliLabel: "স্টার কুইজ", icon: "⭐" },
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`kid-nav-${tab.id}`}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-[1.03]"
                  : "bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200/80"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{language === "Bengali" ? tab.bengaliLabel : tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. ABCD TAB */}
      {activeSubTab === "abcd" && (
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>🔤 ABCD Phonics & Vocabulary Flashcards</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">
                  A to Z
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any letter to listen to its phonics sound, word pronunciation, and Bengali translation.
              </p>
            </div>
            <button
              onClick={() => handleSpeak("A B C D E F G H I J K L M N O P Q R S T U V W X Y Z", "all_abcd")}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer self-start"
            >
              <Music className="w-3.5 h-3.5 text-amber-700" />
              <span>Sing Alphabet Song 🎵</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {abcdData.map((item, idx) => {
              const isSpeaking = speakingId === `abcd_${idx}`;
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-amber-50/60 to-orange-50/40 hover:to-amber-100/70 border border-amber-200 rounded-2xl p-3.5 transition-all hover:scale-105 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-lg font-black text-amber-700 bg-white px-2 py-0.5 rounded-lg border border-amber-200 shadow-xs">
                      {item.letter}
                    </span>
                  </div>

                  <div className="my-2 text-center">
                    <h4 className="text-sm font-extrabold text-slate-900">{item.word}</h4>
                    <p className="text-xs font-bold text-amber-800">{item.bengali}</p>
                    <span className="text-[10px] text-slate-500 block italic">{item.phonics}</span>
                  </div>

                  <button
                    onClick={() => handleSpeak(item.prompt, `abcd_${idx}`)}
                    className={`w-full py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      isSpeaking
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-white hover:bg-amber-100 text-amber-900 border border-amber-300"
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    <span>{isSpeaking ? "Stop" : "🔊 Listen"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. NUMBERS TAB */}
      {activeSubTab === "numbers" && (
        <div className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>🔢 Numbers & Counting (১ থেকে ১০০ এবং 1 to 100)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice counting with pronunciation in Bengali (বাংলা) and English!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setNumberMode("bn")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  numberMode === "bn" ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                }`}
              >
                বাংলা (১–১০০)
              </button>
              <button
                onClick={() => setNumberMode("en")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  numberMode === "en" ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                }`}
              >
                English (1–100)
              </button>
            </div>
          </div>

          {/* Number range selection */}
          <div className="flex gap-2">
            {(["1-20", "21-50", "51-100"] as const).map((rng) => (
              <button
                key={rng}
                onClick={() => setNumberRange(rng)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  numberRange === rng
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {rng}
              </button>
            ))}
          </div>

          {/* Render Numbers */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {Array.from(
              {
                length:
                  numberRange === "1-20" ? 20 : numberRange === "21-50" ? 30 : 50,
              },
              (_, i) => {
                const start = numberRange === "1-20" ? 1 : numberRange === "21-50" ? 21 : 51;
                const num = start + i;
                const bengaliNums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
                const bnSymbol = num
                  .toString()
                  .split("")
                  .map((d) => bengaliNums[parseInt(d)])
                  .join("");
                const isSpeaking = speakingId === `num_${num}`;

                return (
                  <button
                    key={num}
                    onClick={() =>
                      handleSpeak(
                        numberMode === "bn" ? `${bnSymbol}!` : `${num}!`,
                        `num_${num}`
                      )
                    }
                    className={`p-3 rounded-2xl border text-center transition-all hover:scale-105 cursor-pointer shadow-xs ${
                      isSpeaking
                        ? "bg-rose-500 text-white border-rose-600 animate-pulse"
                        : "bg-indigo-50/50 hover:bg-indigo-100 border-indigo-200 text-indigo-950"
                    }`}
                  >
                    <span className="text-xl font-black block">
                      {numberMode === "bn" ? bnSymbol : num}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
                      {numberMode === "bn" ? `${num}` : `${bnSymbol}`}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* 3. ENGLISH TAB */}
      {activeSubTab === "english" && (
        <div className="bg-white rounded-3xl p-6 border-2 border-blue-100 shadow-lg space-y-6">
          <div className="border-b border-blue-100 pb-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>📖 Butterfly & Wings - English Rhymes & Stories</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fun English rhymes, sight words, and short stories for Primary Students!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Twinkle Twinkle Little Star (মিষ্টি তারা)",
                poem: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.",
                bengaliMeaning: "ঝিকমিক ঝিকমিক ছোট্ট তারা, তুমি যে কী আমি ভাবি অবাক হয়ে! আকাশের ওপরে হিরের মতো জ্বলছ তুমি।",
                emoji: "✨",
              },
              {
                title: "Early to Bed (সুস্থ থাকার নিয়ম)",
                poem: "Early to bed and early to rise,\nMakes a child healthy, wealthy, and wise.",
                bengaliMeaning: "তাড়াতাড়ি ঘুমানো এবং ভোরে ঘুম থেকে ওঠা বাচ্চাকে সুস্থ, সুন্দর ও জ্ঞানী করে তোলে।",
                emoji: "🌅",
              },
              {
                title: "Rain, Rain, Go Away (বৃষ্টি ও খেলা)",
                poem: "Rain, rain, go away,\nCome again another day,\nLittle Johnny wants to play,\nRain, rain, go away!",
                bengaliMeaning: "বৃষ্টি তুমি চলে যাও, অন্য একদিন এসো! ছোট্ট খোকা খেলবে এখন, বৃষ্টি তুমি চলে যাও!",
                emoji: "🌧️",
              },
              {
                title: "Old MacDonald Had a Farm (মজার খামার)",
                poem: "Old MacDonald had a farm, E-I-E-I-O!\nAnd on his farm he had some cows, E-I-E-I-O!\nWith a moo moo here and a moo moo there!",
                bengaliMeaning: "ম্যাকডোনাল্ডের একটি সুন্দর খামার ছিল, যেখানে অনেক গরু থাকত যারা হাম্বা হাম্বা ডাকত!",
                emoji: "🚜",
              },
            ].map((rhyme, idx) => (
              <div
                key={idx}
                className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{rhyme.emoji}</span>
                    <button
                      onClick={() => handleSpeak(rhyme.poem, `poem_${idx}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Sing Rhyme</span>
                    </button>
                  </div>
                  <h4 className="text-sm font-extrabold text-blue-950 mt-2">{rhyme.title}</h4>
                  <pre className="text-xs font-medium text-slate-800 whitespace-pre-wrap font-sans mt-2 bg-white p-3 rounded-xl border border-blue-100">
                    {rhyme.poem}
                  </pre>
                  <p className="text-[11px] text-blue-800 mt-2 font-medium">
                    <span className="font-bold">অর্থ:</span> {rhyme.bengaliMeaning}
                  </p>
                </div>

                <button
                  onClick={() => onAskTutor(`Tell me an interactive funny story based on the rhyme "${rhyme.title}" in Bengali & English for Class ${currentClass}!`)}
                  className="w-full bg-white hover:bg-blue-100 text-blue-800 text-xs font-bold py-2 rounded-xl border border-blue-200 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI গল্পের মাধ্যমে বোঝাও</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. BENGALI TAB */}
      {activeSubTab === "bengali" && (
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>🦜 বাংলা বর্ণমালা (সহজ পাঠ ও স্বরবর্ণ-ব্যঞ্জনবর্ণ)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                রবীন্দ্রনাথ ঠাকুরের সহজ পাঠের সুমধুর ছন্দে অ আ ক খ শিখি!
              </p>
            </div>
            <button
              onClick={() => handleSpeak("অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ", "all_bn")}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>শুনুন</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {bengaliVarnamala.map((item, idx) => {
              const isSpeaking = speakingId === `bn_${idx}`;
              return (
                <div
                  key={idx}
                  className="bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl p-3.5 transition-all hover:scale-105 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-2xl font-black text-emerald-800 bg-white px-2.5 py-0.5 rounded-xl border border-emerald-200 shadow-xs">
                      {item.letter}
                    </span>
                  </div>

                  <div className="my-2 text-center">
                    <h4 className="text-sm font-extrabold text-slate-900">{item.word}</h4>
                    <p className="text-[11px] text-emerald-800 font-bold mt-0.5">{item.phrase}</p>
                  </div>

                  <button
                    onClick={() => handleSpeak(item.prompt, `bn_${idx}`)}
                    className={`w-full py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      isSpeaking
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300"
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    <span>{isSpeaking ? "Stop" : "🔊 শুনুন"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. HINDI TAB */}
      {activeSubTab === "hindi" && (
        <div className="bg-white rounded-3xl p-6 border-2 border-rose-100 shadow-lg space-y-6">
          <div className="border-b border-rose-100 pb-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>🕉️ हिंदी वर्णमाला (स्वर एवं व्यंजन ज्ञान)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              चित्रों एवं उच्चारण के साथ हिंदी के सरल अक्षर एवं शब्द सीखें!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {hindiVarnamala.map((item, idx) => {
              const isSpeaking = speakingId === `hi_${idx}`;
              return (
                <div
                  key={idx}
                  className="bg-rose-50/60 hover:bg-rose-100/70 border border-rose-200 rounded-2xl p-3.5 transition-all hover:scale-105 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-2xl font-black text-rose-800 bg-white px-2.5 py-0.5 rounded-xl border border-rose-200 shadow-xs">
                      {item.letter}
                    </span>
                  </div>

                  <div className="my-2 text-center">
                    <h4 className="text-sm font-extrabold text-slate-900">{item.word}</h4>
                    <p className="text-[11px] text-rose-800 font-bold mt-0.5">{item.hindiWord}</p>
                  </div>

                  <button
                    onClick={() => handleSpeak(item.prompt, `hi_${idx}`)}
                    className={`w-full py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      isSpeaking
                        ? "bg-rose-600 text-white animate-pulse"
                        : "bg-white hover:bg-rose-100 text-rose-900 border border-rose-300"
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    <span>{isSpeaking ? "Stop" : "🔊 सुनें"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. MATHS TAB */}
      {activeSubTab === "maths" && (
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-lg space-y-6">
          <div className="border-b border-amber-100 pb-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>🧮 Picture Maths & Geometry Shapes</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Shapes, visual addition, multiplication tables, and clock time reading!
            </p>
          </div>

          <div className="space-y-6">
            {mathConcepts.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-3">
                <h4 className="text-sm font-extrabold text-amber-900 flex items-center gap-2">
                  <span>{sec.title}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {sec.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{item.emoji}</span>
                        <h5 className="text-sm font-black text-slate-900">{item.name}</h5>
                      </div>
                      <p className="text-xs text-slate-700 font-medium">{item.desc}</p>
                      <div className="bg-white px-2.5 py-1 rounded-xl text-[11px] font-bold text-amber-800 border border-amber-100">
                        {item.formula}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. PICTURES TAB */}
      {activeSubTab === "pictures" && (
        <div className="bg-white rounded-3xl p-6 border-2 border-teal-100 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>🖼️ Visual Picture Dictionary (ছবি দেখে শব্দ শেখা)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore West Bengal wildlife, birds, seasonal fruits, flowers and vehicles with sound!
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(["animals", "fruits", "birds", "vehicles", "flowers"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPicCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize cursor-pointer transition-all ${
                    picCategory === cat
                      ? "bg-teal-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {pictureDictionary[picCategory].map((item, idx) => (
              <div
                key={idx}
                className="bg-teal-50/60 border border-teal-200 rounded-2xl p-4 text-center space-y-2 shadow-xs hover:scale-105 transition-all"
              >
                <span className="text-5xl block">{item.emoji}</span>
                <h4 className="text-sm font-extrabold text-slate-900">{item.name}</h4>
                <p className="text-xs font-bold text-teal-800">{item.bengali}</p>
                <button
                  onClick={() => handleSpeak(item.sound, `dict_${idx}`)}
                  className="w-full bg-white hover:bg-teal-100 text-teal-900 border border-teal-300 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio Info</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. GAMES TAB */}
      {activeSubTab === "games" && (
        <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>🎮 Interactive Kids Learning Games (মজার খেলা)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Brain memory match, alphabet balloon pop, and sound tap games!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedGame("memory")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  selectedGame === "memory" ? "bg-purple-600 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                }`}
              >
                🃏 Memory Match
              </button>
              <button
                onClick={() => setSelectedGame("balloon")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  selectedGame === "balloon" ? "bg-purple-600 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                }`}
              >
                🎈 Balloon Pop
              </button>
            </div>
          </div>

          {selectedGame === "memory" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  Matched: {matchedPairs.length / 2} / 6 pairs
                </span>
                <button
                  onClick={resetMemoryGame}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Game</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {memoryCards.map((card, idx) => {
                  const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(idx);
                  return (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(idx)}
                      className={`h-24 rounded-2xl text-3xl font-bold flex items-center justify-center transition-all cursor-pointer shadow-xs border-2 ${
                        isFlipped
                          ? "bg-purple-50 border-purple-400 rotate-0"
                          : "bg-gradient-to-br from-purple-500 to-indigo-600 border-purple-700 text-white hover:scale-105"
                      }`}
                    >
                      {isFlipped ? card.value : "❓"}
                    </button>
                  );
                })}
              </div>

              {matchedPairs.length === memoryCards.length && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl text-center font-bold text-sm">
                  🎉 Congratulations! You solved the entire Memory Puzzle! 🌟
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  Score: <strong className="text-purple-700 text-sm">{balloonScore}</strong> points
                </span>
                <button
                  onClick={() => {
                    setPoppedBalloons([]);
                    setBalloonScore(0);
                  }}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Balloons</span>
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 py-4">
                {["A 🍎", "B ⚽", "C 🐱", "D 🦆", "E 🐘", "F 🐟"].map((balloon, idx) => {
                  const isPopped = poppedBalloons.includes(idx);
                  return (
                    <button
                      key={idx}
                      disabled={isPopped}
                      onClick={() => handlePopBalloon(idx, balloon)}
                      className={`h-24 rounded-full flex flex-col items-center justify-center font-black text-sm transition-all cursor-pointer shadow-md ${
                        isPopped
                          ? "opacity-20 scale-75 bg-slate-200"
                          : "bg-gradient-to-t from-pink-500 via-rose-400 to-amber-300 text-white hover:scale-110 hover:-translate-y-1"
                      }`}
                    >
                      <span>🎈</span>
                      <span>{balloon}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 9. QUIZ TAB */}
      {activeSubTab === "quiz" && (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-indigo-200 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md">
                ⭐
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {language === "Bengali" ? "ছোটদের স্টার কুইজ (Kid's Mini Quiz)" : "Kid's Star Quiz"}
                </h3>
                <p className="text-xs text-slate-600">Answer 4 fun questions and collect shiny stars!</p>
              </div>
            </div>

            {quizSubmitted && (
              <div className="bg-emerald-600 text-white px-4 py-1.5 rounded-full font-extrabold text-sm shadow-md flex items-center gap-1.5">
                <span>Score: {quizScore} / {kidQuiz.length}</span>
                {quizScore === kidQuiz.length && <span>🎉 Perfect!</span>}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {kidQuiz.map((item, qIdx) => {
              const chosen = selectedQuizAnswers[qIdx];
              return (
                <div key={qIdx} className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      Q{qIdx + 1}. {language === "Bengali" ? item.qBengali : item.q}
                    </span>
                    <button
                      onClick={() => handleSpeak(language === "Bengali" ? item.qBengali : item.q, `quiz_q_${qIdx}`)}
                      className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {item.options.map((opt, optIdx) => {
                      const isSelected = chosen === optIdx;
                      let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50";

                      if (quizSubmitted) {
                        if (optIdx === item.correct) {
                          btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold";
                        } else if (isSelected && optIdx !== item.correct) {
                          btnStyle = "bg-rose-100 border-rose-400 text-rose-900 line-through";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs";
                      }

                      return (
                        <button
                          key={optIdx}
                          id={`kid-quiz-${qIdx}-opt-${optIdx}`}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectQuiz(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIdx === item.correct && (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-2.5 text-xs text-indigo-900 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{item.fact}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3">
            {quizSubmitted ? (
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setSelectedQuizAnswers({});
                  setQuizScore(0);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer transition-colors"
              >
                Play Again 🔄
              </button>
            ) : (
              <button
                id="btn-submit-kid-quiz"
                onClick={handleCheckQuiz}
                disabled={Object.keys(selectedQuizAnswers).length < kidQuiz.length}
                className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 disabled:opacity-50 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md cursor-pointer transition-all"
              >
                Check My Answers 🌟
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
