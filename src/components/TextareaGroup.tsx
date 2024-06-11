"use client";
import { ChangeEvent, useContext } from "react";

import { speechRecognitionContext, textContext } from "@/providers";
import { TranslationBox } from "./TranslationBox";
import { TranslationBoxTypes } from "@/lib/constants";

export const TextareaGroup = () => {
  const { completion, textToTranslate, handleChangeTextToTranslate } =
    useContext(textContext);

  const { isRecording } = useContext(speechRecognitionContext);

  const _handleChangeTextToTranslate = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeTextToTranslate(target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-14  ">
      <TranslationBox
        textareaProps={{
          readOnly: isRecording,
          placeholder: isRecording ? "Speak now" : "Type your text here.",
          value: textToTranslate,
          onChange: _handleChangeTextToTranslate,
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
