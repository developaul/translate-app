"use client";

import { FC, PropsWithChildren, useState } from "react";

import { setupContext } from "./setupContext";

export const SetupProvider: FC<PropsWithChildren> = ({ children }) => {
  const [setupIsOpen, setSetupIsOpen] = useState(false);

  const handleCloseSetupDialog = () => setSetupIsOpen(false);

  const handleOpenSetupDialog = () => setSetupIsOpen(true);

  return (
    <setupContext.Provider
      value={{
        setupIsOpen,
        handleOpenSetupDialog,
        handleCloseSetupDialog,
      }}
    >
      {children}
    </setupContext.Provider>
  );
};
