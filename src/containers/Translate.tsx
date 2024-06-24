import { useContext } from "react";
import {
  LanguagePicker,
  ToolBelt,
  TextareaGroup,
  ImageGroup,
  DocumentGroup,
} from "@/components";
import { ToolBeltType } from "@/lib/constants";
import { toolBeltContext } from "@/providers";

export const Translate = () => {
  const { toolBeltType } = useContext(toolBeltContext);

  return (
    <main className="container px-3 mb-6 max-w-[1000px]">
      <ToolBelt />

      <LanguagePicker />

      {toolBeltType === ToolBeltType.TEXT && <TextareaGroup />}

      {toolBeltType === ToolBeltType.IMAGE && <ImageGroup />}

      {toolBeltType === ToolBeltType.DOCUMENT && <DocumentGroup />}
    </main>
  );
};
