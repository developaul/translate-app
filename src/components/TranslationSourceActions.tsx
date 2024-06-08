import React, { FC } from "react";
import { Button } from "./ui/button";
import { KeyboardIcon } from "@radix-ui/react-icons";
import { MAX_TEXT_TO_TRANSLATE_LENGTH } from "@/lib/constants";

interface TranslationSourceActionsProps {
  value: string;
}

export const TranslationSourceActions: FC<TranslationSourceActionsProps> = ({
  value,
}) => {
  return (
    <footer className="flex items-center justify-end">
      {/* TODO: add suport for transform audio to text */}

      <div className="flex items-center gap-2">
        <p className="text-xs">
          {value.length} / {MAX_TEXT_TO_TRANSLATE_LENGTH}
        </p>

        <Button disabled variant="ghost" size="icon">
          <KeyboardIcon />
        </Button>
      </div>
    </footer>
  );
};
