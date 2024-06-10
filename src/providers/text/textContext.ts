"use client";

import { createContext } from "react";

interface TextContextArgs {
  completion: string;
  textToTranslate: string;
  handleChangeTextToTranslate: (textToTranslate: string) => void;
  handleSetTextToTranslate: (value: string) => void;
}

export const textContext = createContext<TextContextArgs>(
  {} as TextContextArgs
);
