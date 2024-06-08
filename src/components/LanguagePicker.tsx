"use client";
import { useContext } from "react";
import { WidthIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import { languages } from "@/lib/constants";
import {
  languageContext,
  speechSynthesisContext,
  textContext,
} from "@/providers";

export const LanguagePicker = () => {
  const {
    fromLanguage,
    toLanguage,
    handleChangeToLanguage,
    handleChangeFromLanguage,
    handleSwitchLanguage,
  } = useContext(languageContext);

  const { handleSetCompletion } = useContext(textContext);

  const { handleStopSpeaking } = useContext(speechSynthesisContext);

  const _handleSwitchLanguage = () => {
    handleSwitchLanguage();
    handleSetCompletion();
    handleStopSpeaking();
  };

  const _handleChangeFromLanguage = (fromLanguage: string) => {
    handleChangeFromLanguage(fromLanguage);
    handleStopSpeaking();
  };

  const _handleChangeToLanguage = (toLanguage: string) => {
    handleChangeToLanguage(toLanguage);
    handleStopSpeaking();
  };

  return (
    <div className="flex items-center gap-2">
      <Combobox
        options={languages}
        value={fromLanguage}
        onChange={_handleChangeFromLanguage}
      />

      <Button onClick={_handleSwitchLanguage} variant="ghost" size="sm">
        <WidthIcon />
      </Button>

      <Combobox
        options={languages}
        value={toLanguage}
        onChange={_handleChangeToLanguage}
      />
    </div>
  );
};
