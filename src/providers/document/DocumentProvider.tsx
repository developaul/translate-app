"use client";

import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useCompletion } from "ai/react";

import { fileToBase64 } from "@/lib/utils";
import { documentContext } from "./documentContext";
import { languageContext } from "../language";
import { errorContext } from "../error";

export const DocumentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);

  const { handleShowRateLimitError } = useContext(errorContext);

  const { fromLanguage, toLanguage } = useContext(languageContext);

  const { completion, complete, isLoading, setCompletion, error } =
    useCompletion({
      api: "/api/translate-document",
    });

  const handleChangeFile = (file: File | null) => {
    setFile(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setCompletion("");
  };

  useEffect(() => {
    async function run() {
      if (file === null) return;

      const document = await fileToBase64(file);

      complete("", { body: { fromLanguage, toLanguage, document } });
    }

    run();
  }, [complete, file, fromLanguage, toLanguage]);

  useEffect(() => {
    if (!error) return;

    handleShowRateLimitError(error.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <documentContext.Provider
      value={{
        handleChangeFile,
        handleRemoveFile,
        completion,
        isLoading,
        file,
      }}
    >
      {children}
    </documentContext.Provider>
  );
};
