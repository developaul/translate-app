"use client";

import { FC, PropsWithChildren } from "react";

import { errorContext } from "./errorContext";
import { toast } from "@/components/ui/use-toast";

export const ErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const handleShowMessageError = (response: string) => {
    const { message } = JSON.parse(response);

    toast({
      variant: "destructive",
      title: message,
    });
  };

  return (
    <errorContext.Provider value={{ handleShowMessageError }}>
      {children}
    </errorContext.Provider>
  );
};
