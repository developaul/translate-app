"use client";

import { FC, PropsWithChildren, useContext } from "react";

import { errorContext } from "./errorContext";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { setupContext } from "../setup";

export const ErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const { handleOpenSetupDialog } = useContext(setupContext);

  const handleShowMessageError = (response: string) => {
    const { message } = JSON.parse(response);

    toast({
      variant: "destructive",
      title: "There was an error",
      description: message,
      action: (
        <ToastAction onClick={handleOpenSetupDialog} altText="Try again">
          Configure
        </ToastAction>
      ),
    });
  };

  return (
    <errorContext.Provider value={{ handleShowMessageError }}>
      {children}
    </errorContext.Provider>
  );
};
