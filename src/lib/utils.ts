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

const BASE64_MARKER = ";base64,";

export async function fileToBase64(file: File) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target === null) return reject(new Error("No target"));
      resolve(event.target.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export function base64ToUint8Array(dataURI: string) {
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

export function convertUint8ArrayToBase64(array: any) {
  let latin1string = "";
  for (let i = 0; i < array.length; i++) {
    latin1string += String.fromCodePoint(array[i]);
  }
  return globalThis.btoa(latin1string);
}
