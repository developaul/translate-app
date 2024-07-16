"use client";

import { FC, PropsWithChildren, useState } from "react";

import { setupContext } from "./setupContext";
import { useLocalStorage } from "@/hooks";

export const SetupProvider: FC<PropsWithChildren> = ({ children }) => {
  const [setupIsOpen, setSetupIsOpen] = useState(false);

  const [apiKey, setApiKey] = useLocalStorage<string>("apiKey", "");

  const handleCloseSetupDialog = () => setSetupIsOpen(false);

  const handleOpenSetupDialog = () => setSetupIsOpen(true);

  return (
    <setupContext.Provider
      value={{
        apiKey,
        setApiKey,
        setupIsOpen,
        handleOpenSetupDialog,
        handleCloseSetupDialog,
      }}
    >
      {children}
    </setupContext.Provider>
  );
};
