import { z } from "zod";

export const enum ToolBeltType {
  TEXT = "text",
  IMAGE = "image",
  DOCUMENT = "document",
  WEB_SITE = "web-site",
}

export const validToolBeltTypes = [
  ToolBeltType.TEXT,
  ToolBeltType.IMAGE,
  ToolBeltType.DOCUMENT,
  ToolBeltType.WEB_SITE,
];

export const DEFAULT_FROM_LANGUAGE = "Spanish";
export const DEFAULT_TO_LANGUAGE = "English";

interface Language {
  value: string;
  label: string;
  lang: string;
}

export const languages: Language[] = [
  { value: "Spanish", label: "Spanish", lang: "es-ES" },
  { value: "English", label: "English", lang: "en-US" },
  { value: "German", label: "German", lang: "de-DE" },
  { value: "Arabic", label: "Arabic", lang: "ar-SA" },
  { value: "Bengali", label: "Bengali", lang: "bn-IN" },
  { value: "French", label: "French", lang: "fr-FR" },
  { value: "Hindi", label: "Hindi", lang: "hi-IN" },
  { value: "Japanese", label: "Japanese", lang: "ja-JP" },
  { value: "Mandarin", label: "Mandarin", lang: "zh-CN" },
  { value: "Portuguese", label: "Portuguese", lang: "pt-BR" },
  { value: "Russian", label: "Russian", lang: "ru-RU" },
];

export const languageByValue: Record<string, Language> = languages.reduce(
  (acc, language) => ({
    ...acc,
    [language.value]: language,
  }),
  {}
);

export const DEFAULT_LANG = "en-US";

export const DEBOUNCE_TIME = 300;

export const enum TranslationBoxTypes {
  SOURCE = "source",
  TARGET = "target",
}

export const MIN_TEXT_TO_TRANSLATE_LENGTH = 2;
export const MAX_TEXT_TO_TRANSLATE_LENGTH = 5000;
