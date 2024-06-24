"use client";

import { createContext } from "react";

interface DocumentContextArgs {
  handleChangeFile: (file: File | null) => void;
  handleRemoveFile: () => void;
  isLoading: boolean;
  completion: string;
  file: File | null;
}

export const documentContext = createContext<DocumentContextArgs>(
  {} as DocumentContextArgs
);
