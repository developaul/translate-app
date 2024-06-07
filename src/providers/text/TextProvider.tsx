"use client";

import { useState, PropsWithChildren, FC, useEffect, useContext } from "react";
import { useCompletion } from "ai/react";
import { useDebouncedCallback } from "use-debounce";

import { textContext } from "./textContext";
import { DEBOUNCE_TIME } from "@/lib/constants";
import { languageContext } from "../language/languageContext";

export const TextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { fromLanguage, toLanguage } = useContext(languageContext);

  const [textToTranslate, setTextToTranslate] = useState("");

  const { completion, complete } = useCompletion({
    api: "/api/translate",
    body: {
      fromLanguage,
      toLanguage,
    },
  });

  const handleDebouncedTextChange = useDebouncedCallback(() => {
    complete(textToTranslate, { body: { fromLanguage, toLanguage } });
  }, DEBOUNCE_TIME);

  const handleChangeTextToTranslate = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setTextToTranslate(value);

    handleDebouncedTextChange();
  };

  const handleSetCompletion = () => {
    setTextToTranslate(completion);
  };

  useEffect(() => {
    if (!textToTranslate.trim().length) return;

    complete(textToTranslate, { body: { fromLanguage, toLanguage } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, fromLanguage, toLanguage]);

  return (
    <textContext.Provider
      value={{
        completion,
        textToTranslate,
        handleSetCompletion,
        handleChangeTextToTranslate,
      }}
    >
      {children}
    </textContext.Provider>
  );
};
