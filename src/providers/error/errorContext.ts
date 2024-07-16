"use client";

import { createContext } from "react";

export interface ErrorContextArgs {
  handleShowMessageError: (response: string) => void;
}

export const errorContext = createContext<ErrorContextArgs>(
  {} as ErrorContextArgs
);
