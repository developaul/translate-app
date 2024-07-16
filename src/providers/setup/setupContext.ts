"use client";

import { createContext } from "react";

interface SetupContextArgs {
  setupIsOpen: boolean;
  apiKey: string;
  setApiKey: (value: string) => void;
  handleOpenSetupDialog: () => void;
  handleCloseSetupDialog: () => void;
}

export const setupContext = createContext<SetupContextArgs>(
  {} as SetupContextArgs
);
