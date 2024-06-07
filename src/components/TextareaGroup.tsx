"use client";
import { useContext } from "react";

import { Textarea } from "./ui/textarea";
import { textContext } from "@/providers";

export const TextareaGroup = () => {
  const { completion, textToTranslate, handleChangeTextToTranslate } =
    useContext(textContext);

  return (
    <div className="flex flex-col md:flex-row md:gap-14  ">
      <Textarea
        onChange={handleChangeTextToTranslate}
        value={textToTranslate}
        className="h-[200px] resize-none"
        placeholder="Type your text here."
      />

      <Textarea
        value={completion}
        readOnly
        className="h-[200px] resize-none"
        placeholder="Translated text here."
      />
    </div>
  );
};
