"use client";

import { createContext } from "react";

export interface LanguageContextArgs {
  fromLanguage: string;
  toLanguage: string;
  handleChangeFromLanguage: (fromLanguage: string) => void;
  handleChangeToLanguage: (toLanguage: string) => void;
  handleSwitchLanguage: (completion: string) => void;
}

export const languageContext = createContext({} as LanguageContextArgs);
