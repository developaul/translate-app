"use client";

import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useCompletion } from "ai/react";

import { imageContext } from "./imageContext";
import { languageContext } from "../language";
import { fileToBase64 } from "@/lib/utils";
import { errorContext } from "../error";
import { setupContext } from "../setup";

export const ImageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);

  const { handleShowMessageError } = useContext(errorContext);

  const { fromLanguage, toLanguage } = useContext(languageContext);

  const { apiKey } = useContext(setupContext);

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
      complete("", { body: { fromLanguage, toLanguage, image, apiKey } });
    }

    run();
  }, [complete, file, fromLanguage, toLanguage, apiKey]);

  useEffect(() => {
    if (!error) return;

    handleShowMessageError(error.message);

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
