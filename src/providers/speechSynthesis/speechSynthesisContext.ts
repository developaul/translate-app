"use client";

import { createContext } from "react";
import { HandleStartSpeakingArgs, SpeakingState } from "@/interfaces";

export interface SpeechSynthesisContextArgs {
  speakingState: SpeakingState;
  handleStartSpeaking: (args: HandleStartSpeakingArgs) => void;
  handleStopSpeaking: () => void;
}

export const speechSynthesisContext = createContext(
  {} as SpeechSynthesisContextArgs
);
