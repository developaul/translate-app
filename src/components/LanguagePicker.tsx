"use client";
import { useContext } from "react";
import { WidthIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import { ToolBeltType, languages } from "@/lib/constants";
import {
  languageContext,
  speechSynthesisContext,
  textContext,
  toolBeltContext,
} from "@/providers";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const LanguagePicker = () => {
  const {
    fromLanguage,
    toLanguage,
    handleChangeToLanguage,
    handleChangeFromLanguage,
    handleSwitchLanguage,
  } = useContext(languageContext);

  const { handleSetTextToTranslate, completion } = useContext(textContext);

  const { toolBeltType } = useContext(toolBeltContext);

  const { handleStopSpeaking } = useContext(speechSynthesisContext);

  const _handleSwitchLanguage = () => {
    handleSwitchLanguage(completion);
    handleStopSpeaking();

    if (toolBeltType === ToolBeltType.TEXT)
      handleSetTextToTranslate(completion);
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

      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={_handleSwitchLanguage} variant="ghost" size="sm">
            <WidthIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Exchange languages</p>
        </TooltipContent>
      </Tooltip>

      <Combobox
        options={languages}
        value={toLanguage}
        onChange={_handleChangeToLanguage}
      />
    </div>
  );
};
