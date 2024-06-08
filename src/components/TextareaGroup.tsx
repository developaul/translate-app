"use client";
import { useContext } from "react";

import { textContext } from "@/providers";
import { TranslationBox } from "./TranslationBox";
import { TranslationBoxTypes } from "@/lib/constants";

export const TextareaGroup = () => {
  const { completion, textToTranslate, handleChangeTextToTranslate } =
    useContext(textContext);

  return (
    <div className="flex flex-col md:flex-row md:gap-14  ">
      <TranslationBox
        textareaProps={{
          placeholder: "Type your text here.",
          value: textToTranslate,
          onChange: handleChangeTextToTranslate,
        }}
        type={TranslationBoxTypes.SOURCE}
      />

      <TranslationBox
        textareaProps={{
          readOnly: true,
          placeholder: "Translated text here.",
          value: completion,
        }}
        type={TranslationBoxTypes.TARGET}
      />
    </div>
  );
};
