"use client";

import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useCompletion } from "ai/react";

import { imageContext } from "./imageContext";
import { languageContext } from "../language";
import { errorContext } from "../error";
import { fileToBase64 } from "@/lib/utils";

export const ImageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);

  const { handleShowRateLimitError } = useContext(errorContext);

  const { fromLanguage, toLanguage } = useContext(languageContext);

  const { completion, complete, isLoading, setCompletion, error } =
    useCompletion({
      api: "/api/translate-image",
    });

  const handleImageChange = (file: File | null) => {
    setFile(file);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setCompletion("");
  };

  useEffect(() => {
    async function run() {
      if (file === null) return;
      const image = await fileToBase64(file);
      complete("", { body: { fromLanguage, toLanguage, image } });
    }

    run();
  }, [complete, file, fromLanguage, toLanguage]);

  useEffect(() => {
    if (!error) return;

    handleShowRateLimitError(error.message);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <imageContext.Provider
      value={{
        handleImageChange,
        handleRemoveImage,
        completion,
        isLoading,
        file,
      }}
    >
      {children}
    </imageContext.Provider>
  );
};
