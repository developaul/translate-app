import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { languages } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstNextLanguage = (language: string) => {
  const languageOption = languages.find(({ value }) => value !== language);

  return languageOption?.value ?? languages[0].value;
};
