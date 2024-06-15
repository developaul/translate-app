import { SpeakingState } from "@/interfaces";

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

export const DEFAULT_FROM_QUERY_LANGUAGE = "es";
export const DEFAULT_TO_QUERY_LANGUAGE = "en";

interface Language {
  value: string;
  label: string;
  lang: string;
  query: string;
}

export const languages: Language[] = [
  { value: "Spanish", label: "Spanish", lang: "es-ES", query: "es" },
  { value: "English", label: "English", lang: "en-US", query: "en" },
  { value: "German", label: "German", lang: "de-DE", query: "de" },
  { value: "Arabic", label: "Arabic", lang: "ar-SA", query: "ar" },
  { value: "Bengali", label: "Bengali", lang: "bn-IN", query: "bn" },
  { value: "French", label: "French", lang: "fr-FR", query: "fr" },
  { value: "Hindi", label: "Hindi", lang: "hi-IN", query: "hi" },
  { value: "Japanese", label: "Japanese", lang: "ja-JP", query: "ja" },
  { value: "Mandarin", label: "Mandarin", lang: "zh-CN", query: "zh" },
  { value: "Portuguese", label: "Portuguese", lang: "pt-BR", query: "pt" },
  { value: "Russian", label: "Russian", lang: "ru-RU", query: "ru" },
];

export const querylanguages: string[] = languages.map(({ query }) => query);

export const languageByValue: Record<string, Language> = languages.reduce(
  (acc, language) => ({
    ...acc,
    [language.value]: language,
  }),
  {}
);

export const languageByQueryLanguage: Record<string, Language> =
  languages.reduce(
    (acc, language) => ({
      ...acc,
      [language.query]: language,
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

export const defaultSpeakingState: SpeakingState = {
  isSpeaking: false,
  type: TranslationBoxTypes.SOURCE,
};

export const DEFAULT_TOOLTIP_DELAY_DURATION = 600;

export const enum SearchParams {
  FROM_LANGUAGE = "sl",
  TO_LANGUAGE = "tl",
  OPTION = "op",
  TEXT = "text",
}

export const RATE_LIMIT_REQUESTS = 1;
export const RATE_LIMIT_TIME = "10m";
