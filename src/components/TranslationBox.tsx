import { FC, TextareaHTMLAttributes, useRef } from "react";
import { TranslationSourceActions } from "./TranslationSourceActions";
import { TranslationTargetActions } from "./TranslationTargetActions";
import { Textarea } from "./ui/textarea";
import { TranslationBoxTypes } from "@/lib/constants";
import { useAutosizeTextArea } from "@/hooks";

export interface TranslationBoxProps {
  type: TranslationBoxTypes;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const TranslationBox: FC<TranslationBoxProps> = ({
  type,
  textareaProps,
}) => {
  const value = textareaProps?.value?.toString() ?? "";

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <div className="flex flex-col gap-2 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
      <Textarea className="resize-none" {...textareaProps} ref={textAreaRef} />

      {TranslationBoxTypes.SOURCE === type && (
        <TranslationSourceActions value={value} />
      )}

      {TranslationBoxTypes.TARGET === type && value !== "" && (
        <TranslationTargetActions value={value} />
      )}
    </div>
  );
};
