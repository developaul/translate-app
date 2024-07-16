"use client";

import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useCompletion } from "ai/react";

import { documentContext } from "./documentContext";
import { languageContext } from "../language";
import { fileToBase64 } from "@/lib/utils";
import { errorContext } from "../error";
import { setupContext } from "../setup";

export const DocumentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);

  const { handleShowMessageError } = useContext(errorContext);

  const { fromLanguage, toLanguage } = useContext(languageContext);

  const { apiKey } = useContext(setupContext);

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

      complete("", { body: { fromLanguage, toLanguage, document, apiKey } });
    }

    run();
  }, [complete, file, fromLanguage, toLanguage, apiKey]);

  useEffect(() => {
    if (!error) return;

    handleShowMessageError(error.message);
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
