"use client";

import { createContext } from "react";

export interface ImageContextArgs {
  handleImageChange: (file: File) => void;
  completion: string;
  isLoading: boolean;
  file: File | null;
}

export const imageContext = createContext({} as ImageContextArgs);
