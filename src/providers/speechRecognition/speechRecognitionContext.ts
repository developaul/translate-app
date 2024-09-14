"use client";

import { createContext } from "react";

interface SpeechRecognitionContextArgs {
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  isRecording: boolean;
}

export const speechRecognitionContext =
  createContext<SpeechRecognitionContextArgs>(
    {} as SpeechRecognitionContextArgs
  );
