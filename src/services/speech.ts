import { Language } from "../types";

// Clean markdown syntax for smooth speech playback
function sanitizeTextForSpeech(text: string): string {
  return text
    .replace(/[#*`_~$$]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1 over $2")
    .replace(/\\sqrt\{([^}]+)\}/g, "square root of $1")
    .replace(/\\cdot|\\times/g, " multiplied by ")
    .replace(/\\pm/g, " plus or minus ")
    .replace(/\s+/g, " ")
    .trim();
}

export function speakText(
  text: string,
  language: Language,
  onEnd?: () => void,
  onError?: (err: any) => void
): () => void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis is not supported in this browser.");
    return () => {};
  }

  // Cancel any previous speech
  window.speechSynthesis.cancel();

  const cleanText = sanitizeTextForSpeech(text);
  if (!cleanText) return () => {};

  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Set language code
  let langCode = "en-IN";
  if (language === "Bengali") {
    langCode = "bn-IN";
  } else if (language === "Hindi") {
    langCode = "hi-IN";
  }
  utterance.lang = langCode;
  utterance.rate = 0.95; // slightly slower for educational clarity
  utterance.pitch = 1.0;

  // Try to pick appropriate voice
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find(
    (v) => v.lang.toLowerCase().includes(langCode.toLowerCase()) || (language === "Bengali" && v.name.toLowerCase().includes("bengali"))
  );
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn("Speech synthesis error:", e);
    if (onError) onError(e);
  };

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

// Browser Web Speech Recognition
export interface SpeechRecognitionResultHandler {
  onTranscript: (transcript: string) => void;
  onError: (error: string) => void;
  onStateChange: (isListening: boolean) => void;
}

export function createSpeechRecognizer(
  language: Language,
  handlers: SpeechRecognitionResultHandler
) {
  if (typeof window === "undefined") return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    handlers.onError("Speech recognition is not supported in your browser. Please use Google Chrome, Edge, or Safari.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;

  if (language === "Bengali") {
    recognition.lang = "bn-IN";
  } else if (language === "Hindi") {
    recognition.lang = "hi-IN";
  } else {
    recognition.lang = "en-IN";
  }

  recognition.onstart = () => {
    handlers.onStateChange(true);
  };

  recognition.onresult = (event: any) => {
    let current = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      current += event.results[i][0].transcript;
    }
    handlers.onTranscript(current);
  };

  recognition.onerror = (event: any) => {
    handlers.onStateChange(false);
    if (event.error === "not-allowed") {
      handlers.onError("Microphone access was denied. Please allow microphone permissions.");
    } else if (event.error !== "no-speech") {
      handlers.onError(`Speech recognition error: ${event.error}`);
    }
  };

  recognition.onend = () => {
    handlers.onStateChange(false);
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch (e) {
        console.warn("Recognition already started or error:", e);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (e) {
        // ignore
      }
    },
  };
}
