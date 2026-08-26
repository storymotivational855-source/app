import { Language, LearningMode, TutorResponse, ImageAnalysisResult, QuizData } from "../types";

export interface AskTutorParams {
  question: string;
  classLevel: string;
  subject?: string;
  chapter?: string;
  language: Language;
  mode: LearningMode;
}

export class OfflineError extends Error {
  constructor(message = "You are currently offline. Please reconnect to access live AI generation, or use your saved notes and offline syllabus.") {
    super(message);
    this.name = "OfflineError";
  }
}

export async function askAITutor(params: AskTutorParams): Promise<TutorResponse> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new OfflineError();
  }

  try {
    const response = await fetch("/api/tutor/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 503 || errorData.offline) {
        throw new OfflineError(errorData.error);
      }
      throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    const result = await response.json();
    if (!result.success || !result.data) {
      throw new Error("Invalid response format received from AI Tutor.");
    }

    return result.data as TutorResponse;
  } catch (error: any) {
    if (error instanceof OfflineError) throw error;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new OfflineError();
    }
    throw error;
  }
}

export async function analyzeTextbookImage(
  imageBase64: string,
  mimeType: string,
  classLevel: string,
  language: Language
): Promise<ImageAnalysisResult> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new OfflineError();
  }

  try {
    const response = await fetch("/api/tutor/analyze-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64,
        mimeType,
        classLevel,
        language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 503 || errorData.offline) {
        throw new OfflineError(errorData.error);
      }
      throw new Error(errorData.error || `Failed to analyze image (${response.status})`);
    }

    const result = await response.json();
    if (!result.success || !result.data) {
      throw new Error("Invalid image analysis result.");
    }

    return result.data as ImageAnalysisResult;
  } catch (error: any) {
    if (error instanceof OfflineError) throw error;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new OfflineError();
    }
    throw error;
  }
}

export async function generateAIQuiz(
  classLevel: string,
  subject: string,
  chapter: string,
  difficulty: "Easy" | "Medium" | "Hard",
  language: Language,
  questionCount: number = 5
): Promise<QuizData> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new OfflineError();
  }

  try {
    const response = await fetch("/api/quiz/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        classLevel,
        subject,
        chapter,
        difficulty,
        language,
        questionCount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 503 || errorData.offline) {
        throw new OfflineError(errorData.error);
      }
      throw new Error(errorData.error || `Failed to generate quiz (${response.status})`);
    }

    const result = await response.json();
    if (!result.success || !result.data) {
      throw new Error("Invalid quiz data.");
    }

    return result.data as QuizData;
  } catch (error: any) {
    if (error instanceof OfflineError) throw error;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new OfflineError();
    }
    throw error;
  }
}

