import { FC, TextareaHTMLAttributes, useContext } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { TranslationSourceActions } from "./TranslationSourceActions";
import { TranslationTargetActions } from "./TranslationTargetActions";
import { Textarea } from "./ui/textarea";
import { TranslationBoxTypes } from "@/lib/constants";
import { Button } from "./ui/button";
import { textContext } from "@/providers";

interface TranslationBoxProps {
  type: TranslationBoxTypes;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const TranslationBox: FC<TranslationBoxProps> = ({
  type,
  textareaProps,
}) => {
  const { handleChangeTextToTranslate } = useContext(textContext);

  const value = textareaProps?.value?.toString().trim() ?? "";

  const handleCleanTextToTranslate = () => {
    handleChangeTextToTranslate("");
  };

  return (
    <div className="flex flex-col gap-2 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
      <div className="flex gap-2 flex-1">
        <Textarea className="resize-none min-h-full" {...textareaProps} />

        {TranslationBoxTypes.SOURCE === type && value !== "" && (
          <Button
            onClick={handleCleanTextToTranslate}
            variant="ghost"
            size="icon"
          >
            <Cross1Icon />
          </Button>
        )}
      </div>

      {TranslationBoxTypes.SOURCE === type && (
        <TranslationSourceActions value={value} />
      )}

      {TranslationBoxTypes.TARGET === type && value !== "" && (
        <TranslationTargetActions value={value} />
      )}
    </div>
  );
};
