"use client";

import { createContext } from "react";

interface TextContextArgs {
  completion: string;
  textToTranslate: string;
  handleChangeTextToTranslate: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export const textContext = createContext<TextContextArgs>(
  {} as TextContextArgs
);
