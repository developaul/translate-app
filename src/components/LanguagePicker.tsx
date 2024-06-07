"use client";
import { useContext } from "react";
import { WidthIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import { languages } from "@/lib/constants";
import { translationContext } from "@/providers";

export const LanguagePicker = () => {
  const {
    fromLanguage,
    toLanguage,
    handleChangeToLanguage,
    handleChangeFromLanguage,
    handleSwitchLanguage,
  } = useContext(translationContext);

  return (
    <div className="flex items-center gap-2">
      <Combobox
        options={languages}
        value={fromLanguage}
        onChange={handleChangeFromLanguage}
      />

      <Button onClick={handleSwitchLanguage} variant="ghost" size="sm">
        <WidthIcon />
      </Button>

      <Combobox
        options={languages}
        value={toLanguage}
        onChange={handleChangeToLanguage}
      />
    </div>
  );
};
