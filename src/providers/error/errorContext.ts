"use client";

import { createContext } from "react";

export interface ErrorContextArgs {
  handleShowRateLimitError: (response: string) => void;
}

export const errorContext = createContext<ErrorContextArgs>(
  {} as ErrorContextArgs
);
