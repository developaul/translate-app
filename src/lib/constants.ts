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

export const languages = [
  { value: "Spanish", label: "Spanish" },
  { value: "English", label: "English" },
  { value: "German", label: "German" },
  { value: "Arabic", label: "Arabic" },
  { value: "Bengali", label: "Bengali" },
  { value: "French", label: "French" },
  { value: "Hindi", label: "Hindi" },
  { value: "Japanese", label: "Japanese" },
  { value: "Mandarin", label: "Mandarin" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Russian", label: "Russian" },
];

export const DEBOUNCE_TIME = 300;
