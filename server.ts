import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Support JSON body up to 25mb for image uploads
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", app: "WB Study AI", timestamp: new Date().toISOString() });
});

// 1. AI Tutor Ask Endpoint
app.post("/api/tutor/ask", async (req: Request, res: Response) => {
  try {
    const {
      question,
      classLevel,
      subject,
      chapter,
      language = "English", // "English" | "Bengali" | "Hindi"
      mode = "explain", // "explain" | "hint" | "step_by_step" | "similar_question" | "quiz_me" | "simple"
      history = [],
    } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "A valid question string is required." });
    }

    const classNum = parseInt(classLevel, 10) || 10;
    const isPrimary = classNum <= 5;
    const isMadhyamik = classNum === 10;
    const isHS = classNum >= 11;

    let targetLangPrompt = "Respond primarily in English with clear terms.";
    if (language === "Bengali") {
      targetLangPrompt = "Respond in fluent Bengali (বাংলা ভাষায় উত্তর দাও). Use Bengali script and accurate West Bengal Board terminology (e.g. WBBSE/WBCHSE terms). Keep scientific/mathematical notations clear.";
    } else if (language === "Hindi") {
      targetLangPrompt = "Respond in clear Hindi (हिंदी में उत्तर दें). Use Devanagari script and clear academic terms.";
    }

    let modeInstruction = "";
    switch (mode) {
      case "hint":
        modeInstruction = "DO NOT give the full final answer right away. Provide 2-3 gentle Socratic hints and guiding questions to help the student solve it themselves.";
        break;
      case "step_by_step":
        modeInstruction = "Provide a structured, step-by-step complete solution. Clearly label Step 1, Step 2, etc., and highlight the final conclusion or answer clearly at the end.";
        break;
      case "similar_question":
        modeInstruction = "First provide a brief 2-sentence explanation of the core concept, and then create 1 or 2 new similar practice questions tailored for West Bengal Board exams of this class level with answers hidden/at the bottom.";
        break;
      case "quiz_me":
        modeInstruction = "Present 2 quick check-for-understanding questions directly related to this topic with multiple choices (A, B, C, D) and explain the correct option after.";
        break;
      case "simple":
        modeInstruction = "Explain this concept in an extremely simple, fun way using everyday examples from West Bengal daily life (e.g. cricket, sweets, rivers, trains, mangoes), avoiding difficult jargon.";
        break;
      case "explain":
      default:
        modeInstruction = "Explain the lesson or question conceptually and thoroughly. Connect it to the West Bengal curriculum standards. Give clear reasoning, key formulas/laws if applicable, and a practical summary.";
        break;
    }

    const systemInstruction = `You are "WB Study AI", a compassionate, highly knowledgeable, and encouraging AI tutor specialized in the West Bengal Board syllabus (WBBSE - West Bengal Board of Secondary Education & WBCHSE - West Bengal Council of Higher Secondary Education).

Student Context:
- Current Class: Class ${classLevel} (${isPrimary ? "Primary Level: Keep it joyful, colorful, easy to understand, warm and encouraging" : isMadhyamik ? "Madhyamik Level (WBBSE): Focused, aligned with WBBSE question patterns, step marking, clear definitions" : isHS ? "Higher Secondary Level (WBCHSE): Deep conceptual clarity, rigorous derivations, board exam precision" : "Middle School Level"})
- Subject: ${subject || "General"}
- Chapter/Topic: ${chapter || "General"}
- Selected Language: ${language}

Guidelines:
1. ${targetLangPrompt}
2. Tone: Warm, patient, respectful, and academically rigorous.
3. ${modeInstruction}
4. Always identify 2-4 key or difficult vocabulary/concept words from the explanation and provide their simple definitions.
5. Format your output cleanly in structured JSON with:
   - "title": A short relevant title for the topic
   - "summary": A quick 1-2 sentence core takeaway
   - "content": Detailed markdown text of the explanation/solution following the requested mode
   - "difficultWords": Array of objects [{ "word": string, "meaning": string }]
   - "tips": 1-2 practical study tips or exam advice relevant for West Bengal students
   - "suggestedFollowUps": Array of 3 short questions the student might want to ask next`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Student's Question: "${question}"\nContext: Class ${classLevel}, Subject: ${subject || "General"}, Mode: ${mode}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            content: { type: Type.STRING },
            difficultWords: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ["word", "meaning"],
              },
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestedFollowUps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "summary", "content", "difficultWords", "suggestedFollowUps"],
        },
      },
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Error in /api/tutor/ask:", error);
    return res.status(500).json({
      error: "Failed to generate answer from AI Tutor. Please try again.",
      details: error?.message || String(error),
    });
  }
});

// 2. Image Question Solver Endpoint (OCR + Question Detection + Segmenting)
app.post("/api/tutor/analyze-image", async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = "image/jpeg", classLevel = "10", language = "English" } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Image base64 data is required." });
    }

    // Clean base64 string if it contains data URI header
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    const systemInstruction = `You are an expert OCR and West Bengal Board textbook & exam paper question analyzer for Class ${classLevel}.
Analyze the provided image of a textbook page, homework notebook, question paper, or worksheet.
1. Transcribe the image accurately.
2. Detect and extract EVERY individual question or problem appearing in the image.
3. For each detected question, provide:
   - "id": a number (1, 2, 3...)
   - "questionNumber": e.g. "Q1", "2(a)", "Question 4"
   - "questionText": the exact question text in its original language/script
   - "subjectGuess": estimated subject (Mathematics, Physical Science, Life Science, History, Geography, English, Bengali, etc.)
   - "marksEstimate": estimated marks if discernible (e.g. 1, 2, 3, 5, or null)
   - "stepByStepSolution": A complete, rigorous, step-by-step solution formatted in markdown in ${language}
   - "finalAnswer": A concise one-sentence final answer
4. Also provide a general "overview" of the scanned document (e.g. "Class 10 WBBSE Mathematics - Quadratic Equations worksheet").`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    };

    const textPart = {
      text: `Analyze this study image for Class ${classLevel}. Extract all individual questions, identify them, and provide step-by-step solutions for each in ${language}.`,
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: { type: Type.STRING },
            detectedQuestionsCount: { type: Type.INTEGER },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  questionNumber: { type: Type.STRING },
                  questionText: { type: Type.STRING },
                  subjectGuess: { type: Type.STRING },
                  marksEstimate: { type: Type.STRING },
                  stepByStepSolution: { type: Type.STRING },
                  finalAnswer: { type: Type.STRING },
                },
                required: ["id", "questionNumber", "questionText", "subjectGuess", "stepByStepSolution", "finalAnswer"],
              },
            },
          },
          required: ["overview", "detectedQuestionsCount", "questions"],
        },
      },
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Error in /api/tutor/analyze-image:", error);
    return res.status(500).json({
      error: "Failed to analyze image. Please ensure the image is clear and try again.",
      details: error?.message || String(error),
    });
  }
});

// 3. AI Quiz Generator Endpoint
app.post("/api/quiz/generate", async (req: Request, res: Response) => {
  try {
    const {
      classLevel = "10",
      subject = "Mathematics",
      chapter = "All Chapters",
      difficulty = "Medium", // "Easy" | "Medium" | "Hard"
      questionCount = 5,
      language = "English",
    } = req.body;

    const systemInstruction = `You are a West Bengal Board curriculum exam specialist creating a practice quiz for Class ${classLevel}, Subject: ${subject}, Chapter: ${chapter}, Difficulty: ${difficulty}.
Questions should strictly align with West Bengal Board (WBBSE for classes 1-10, WBCHSE for classes 11-12) standards.
Language required: ${language} (if Bengali, write in proper Bengali; if Hindi, in Hindi; if English, in English).

Create ${questionCount} multiple-choice questions.
For each question:
- "id": number
- "question": clear question text
- "options": array of exactly 4 strings (A, B, C, D)
- "correctIndex": integer index (0, 1, 2, or 3) indicating the correct option
- "explanation": step-by-step explanation of why this answer is correct and why other common misconceptions are wrong
- "topic": specific sub-topic or concept tested (e.g. "Pythagoras theorem", "Photosynthesis light reaction", "Santhal Rebellion")`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Generate a ${questionCount}-question quiz for Class ${classLevel}, ${subject}, Chapter: ${chapter}, Difficulty: ${difficulty} in ${language}.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            classLevel: { type: Type.STRING },
            subject: { type: Type.STRING },
            chapter: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  topic: { type: Type.STRING },
                },
                required: ["id", "question", "options", "correctIndex", "explanation", "topic"],
              },
            },
          },
          required: ["quizTitle", "questions"],
        },
      },
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Error in /api/quiz/generate:", error);
    return res.status(500).json({
      error: "Failed to generate quiz. Please try again.",
      details: error?.message || String(error),
    });
  }
});

// Vite middleware for development & Static server for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WB Study AI server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
