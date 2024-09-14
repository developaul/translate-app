"use client";

import { createContext } from "react";

interface ErrorContextArgs {
  handleShowMessageError: (response: string) => void;
}

export const errorContext = createContext<ErrorContextArgs>(
  {} as ErrorContextArgs
);
