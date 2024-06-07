"use client";

import { createContext } from "react";

export interface LanguageContextArgs {
  fromLanguage: string;
  toLanguage: string;
  handleChangeFromLanguage: (fromLanguage: string) => void;
  handleChangeToLanguage: (toLanguage: string) => void;
  handleSwitchLanguage: () => void;
}

export const languageContext = createContext({} as LanguageContextArgs);
