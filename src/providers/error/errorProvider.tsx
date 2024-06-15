"use client";

import { FC, PropsWithChildren } from "react";
import dayjs from "dayjs";

import { errorContext } from "./errorContext";
import { toast } from "@/components/ui/use-toast";

export const ErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const handleShowRateLimitError = (response: string) => {
    const { data, message } = JSON.parse(response);

    const formattedDate = dayjs(data.reset).format("MMMM DD, YYYY HH:mm:ss");

    toast({
      variant: "destructive",
      title: message,
      description: `Try again at ${formattedDate}`,
    });
  };

  return (
    <errorContext.Provider value={{ handleShowRateLimitError }}>
      {children}
    </errorContext.Provider>
  );
};
