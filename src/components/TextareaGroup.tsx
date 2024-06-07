"use client";
import { useContext } from "react";
import { useCompletion } from "ai/react";
import { useDebouncedCallback } from "use-debounce";

import { Textarea } from "./ui/textarea";
import { translationContext } from "@/providers";
import { DEBOUNCE_TIME } from "@/lib/constants";

export const TextareaGroup = () => {
  const { fromLanguage, toLanguage } = useContext(translationContext);

  const { completion, complete } = useCompletion({
    api: "/api/translate",
    body: {
      fromLanguage,
      toLanguage,
    },
  });

  const handleChange = useDebouncedCallback((event) => {
    const { value } = event.target;

    if (!value.trim().length) return;

    complete(value, { body: { fromLanguage, toLanguage } });
  }, DEBOUNCE_TIME);

  return (
    <div className="flex flex-col md:flex-row md:gap-14  ">
      <Textarea
        onChange={handleChange}
        className="h-[200px] resize-none"
        placeholder="Type your text here."
      />

      <Textarea
        disabled
        value={completion}
        className="h-[200px] resize-none"
        placeholder="Translated text here."
      />
    </div>
  );
};
