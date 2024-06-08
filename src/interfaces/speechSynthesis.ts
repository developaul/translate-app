import { TranslationBoxTypes } from "@/lib/constants";

export interface HandleStartSpeakingArgs {
  text: string;
  language: string;
  type: TranslationBoxTypes;
}

export interface SpeakingState {
  isSpeaking: boolean;
  type: TranslationBoxTypes;
}
