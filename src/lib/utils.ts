import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { DEFAULT_LANG, languageByValue, languages } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstNextLanguage = (language: string) => {
  const languageOption = languages.find(({ value }) => value !== language);

  return languageOption?.value ?? languages[0].value;
};

export const getVoiceByLanguage = (language: string) => {
  const languageConfig = languageByValue[language];

  const voices = speechSynthesis.getVoices();

  const voice = voices.find(({ lang }) => lang === languageConfig.lang);

  if (voice) return voice;

  const defaultVoice = voices.find(({ lang }) => lang === DEFAULT_LANG);

  return defaultVoice ?? voices[0];
};
