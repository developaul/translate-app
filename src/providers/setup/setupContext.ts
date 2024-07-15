"use client";

import { createContext } from "react";

interface SetupContextArgs {
  setupIsOpen: boolean;
  handleOpenSetupDialog: () => void;
  handleCloseSetupDialog: () => void;
}

export const setupContext = createContext<SetupContextArgs>(
  {} as SetupContextArgs
);
