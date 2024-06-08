"use client";

import { useState, PropsWithChildren, FC, useEffect, useContext } from "react";
import { useCompletion } from "ai/react";
import { useDebouncedCallback } from "use-debounce";

import { textContext } from "./textContext";
import {
  DEBOUNCE_TIME,
  MAX_TEXT_TO_TRANSLATE_LENGTH,
  MIN_TEXT_TO_TRANSLATE_LENGTH,
} from "@/lib/constants";
import { languageContext } from "../language";

export const TextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { fromLanguage, toLanguage } = useContext(languageContext);

  const [textToTranslate, setTextToTranslate] = useState("");

  const { completion, complete, setCompletion } = useCompletion({
    api: "/api/translate",
    body: {
      fromLanguage,
      toLanguage,
    },
  });

  const handleDebouncedTextChange = useDebouncedCallback((value: string) => {
    complete(value, { body: { fromLanguage, toLanguage } });
  }, DEBOUNCE_TIME);

  const handleChangeTextToTranslate = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    if (value.trim().length > MAX_TEXT_TO_TRANSLATE_LENGTH) return;

    setTextToTranslate(value);

    if (value.trim().length < MIN_TEXT_TO_TRANSLATE_LENGTH)
      return setCompletion("");

    handleDebouncedTextChange(value);
  };

  const handleSetCompletion = () => {
    setTextToTranslate(completion);
  };

  useEffect(() => {
    if (textToTranslate.trim().length < MIN_TEXT_TO_TRANSLATE_LENGTH) return;

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
