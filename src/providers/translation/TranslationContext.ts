"use client";

import { createContext } from "react";

interface TranslationContextArgs {
  fromLanguage: string;
  toLanguage: string;
  handleChangeToLanguage: (toLanguage: string) => void;
  handleChangeFromLanguage: (fromLanguage: string) => void;
  handleSwitchLanguage: () => void;
}

export const translationContext = createContext<TranslationContextArgs>(
  {} as TranslationContextArgs
);
