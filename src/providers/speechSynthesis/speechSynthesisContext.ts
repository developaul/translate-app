"use client";

import { createContext } from "react";

export interface SpeechSynthesisContextArgs {
  isSpeaking: boolean;
  handleStartSpeaking: () => void;
  handleStopSpeaking: () => void;
}

export const speechSynthesisContext = createContext(
  {} as SpeechSynthesisContextArgs
);
