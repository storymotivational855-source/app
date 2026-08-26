export type Language = "English" | "Bengali" | "Hindi";

export type ClassCategory = "primary" | "secondary" | "madhyamik" | "hs";

export type LearningMode =
  | "explain"
  | "hint"
  | "step_by_step"
  | "similar_question"
  | "quiz_me"
  | "simple";

export interface DifficultWord {
  word: string;
  meaning: string;
}

export interface TutorResponse {
  title: string;
  summary: string;
  content: string;
  difficultWords: DifficultWord[];
  tips?: string[];
  suggestedFollowUps: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  imagePreview?: string;
  mode?: LearningMode;
  responseData?: TutorResponse;
}

export interface DetectedQuestion {
  id: number;
  questionNumber: string;
  questionText: string;
  subjectGuess: string;
  marksEstimate?: string | null;
  stepByStepSolution: string;
  finalAnswer: string;
}

export interface ImageAnalysisResult {
  overview: string;
  detectedQuestionsCount: number;
  questions: DetectedQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface QuizData {
  quizTitle: string;
  classLevel: string;
  subject: string;
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: QuizQuestion[];
}

export interface QuizSubmission {
  quizTitle: string;
  classLevel: string;
  subject: string;
  chapter: string;
  score: number;
  total: number;
  date: string;
  mistakes: {
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    explanation: string;
    topic: string;
  }[];
  weakTopics: string[];
  recommendedPractice: string[];
}

export interface PYQuestion {
  id: string;
  board: "WBBSE (Madhyamik)" | "WBCHSE (Higher Secondary)";
  classLevel: "10" | "11" | "12";
  year: number;
  subject: string;
  chapter: string;
  topic: string;
  marks: number;
  questionType: "MCQ" | "VSAQ (1 Mark)" | "SAQ (2 Marks)" | "LAQ (3-5 Marks)" | "Numerical / Long (5-8 Marks)";
  question: string;
  questionBengali?: string;
  questionHindi?: string;
  solution: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isSampleData: boolean; // clearly labeled as sample/model question paper
}

export interface Chapter {
  id: string;
  name: string;
  bengaliName: string;
  topics: string[];
  highYield?: boolean;
}

export interface SubjectInfo {
  id: string;
  name: string;
  bengaliName: string;
  hindiName: string;
  iconName?: string;
  icon?: string;
  color?: string;
  isMadhyamikCore?: boolean;
  classes: number[];
  stream?: "Science" | "Arts" | "Commerce" | "General";
  chapters: Chapter[];
}

export interface SavedQuestion {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  date: string;
  content: string;
}

export interface StudySession {
  id: string;
  subject: string;
  topic?: string;
  durationMinutes: number;
  timestamp: string;
  date: string;
  mode: "pomodoro" | "short-break" | "long-break" | "custom";
  completed: boolean;
  notes?: string;
}

export interface UserProgress {
  streakDays: number;
  questionsAsked: number;
  quizzesTaken: number;
  totalStudyMinutes?: number;
  dailyGoalMinutes?: number;
  savedNotes: SavedQuestion[];
  quizHistory: QuizSubmission[];
  studySessions?: StudySession[];
}

export interface PrimaryActivity {
  id: string;
  category: "alphabet" | "numbers" | "words" | "rhymes" | "math" | "science";
  title: string;
  bengaliTitle: string;
  icon: string;
  description: string;
  items: {
    letter?: string;
    symbol?: string;
    word: string;
    bengaliWord: string;
    hindiWord?: string;
    phonics?: string;
    meaning: string;
    emoji: string;
    audioPrompt?: string;
    funFact?: string;
  }[];
}

export interface StudentProfile {
  name: string;
  currentClass: string;
  selectedLanguage: Language;
  streakDays: number;
  lastActiveDate: string;
  completedChapters: string[];
  weakTopics: string[];
  quizHistory: QuizSubmission[];
  savedQuestions: {
    id: string;
    title: string;
    subject: string;
    classLevel: string;
    date: string;
    content: string;
  }[];
}

export interface AIPrediction2027 {
  id: string;
  subject: string;
  classLevel: "10" | "12";
  board: "WBBSE (Madhyamik)" | "WBCHSE (Higher Secondary)";
  chapter: string;
  topic: string;
  question: string;
  questionBengali?: string;
  marks: number;
  questionType: "MCQ" | "VSAQ (1 Mark)" | "SAQ (2 Marks)" | "LAQ (3-5 Marks)" | "Numerical / Long (5-8 Marks)";
  probabilityScore: number; // e.g. 96 for 96% probability
  probabilityLevel: "Certain (95%+)" | "Very High (85-94%)" | "High (75-84%)";
  repetitionReason: string;
  solution: string;
  markingScheme: string;
}

export interface BoardMockTest2027 {
  id: string;
  title: string;
  bengaliTitle: string;
  classLevel: "10" | "12";
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Board Level";
  durationMinutes: number;
  totalMarks: number;
  questionsCount: number;
  description: string;
  sections: {
    sectionName: string;
    marksPerQuestion: number;
    questions: {
      id: string;
      qNum: string;
      question: string;
      questionBengali?: string;
      options?: string[];
      correctOption?: number;
      marks: number;
      modelAnswer: string;
      explanation: string;
      aiTip: string;
    }[];
  }[];
}

export interface EducationalVideoLesson {
  id: string;
  title: string;
  bengaliTitle: string;
  classLevel: string;
  subject: string;
  chapter: string;
  duration: string;
  thumbnailEmoji: string;
  accentColor: string;
  youtubeId?: string;
  keyConcepts: string[];
  summaryBengali: string;
  summaryEnglish: string;
  practicePrompt: string;
}
